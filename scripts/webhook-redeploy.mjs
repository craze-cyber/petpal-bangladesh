// Tiny webhook listener for auto-redeploy on `git push`.
// Runs as its own container alongside the app. GitHub sends a signed POST,
// we verify the HMAC signature, then run: git pull && docker compose up -d --build
//
// Env vars (set in .env):
//   GITHUB_WEBHOOK_SECRET   the secret you also paste into GitHub webhook UI
//   REPO_DIR                absolute path to the repo on the host (default /repo)
//   WEBHOOK_PORT            default 9000
//   WEBHOOK_BRANCH          default refs/heads/main

import { createServer } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import { execFile } from "node:child_process";

const SECRET = process.env.GITHUB_WEBHOOK_SECRET || "";
const REPO_DIR = process.env.REPO_DIR || "/repo";
const PORT = Number(process.env.WEBHOOK_PORT || 9000);
const BRANCH = process.env.WEBHOOK_BRANCH || "refs/heads/main";

if (!SECRET) {
  console.error("GITHUB_WEBHOOK_SECRET is required");
  process.exit(1);
}

let deploying = false;
let queued = false;

function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = execFile(cmd, args, { cwd, env: process.env }, (err, stdout, stderr) => {
      if (err) reject(Object.assign(err, { stdout, stderr }));
      else resolve({ stdout, stderr });
    });
    child.stdout?.on("data", (d) => process.stdout.write(`[${cmd}] ${d}`));
    child.stderr?.on("data", (d) => process.stderr.write(`[${cmd}] ${d}`));
  });
}

async function deploy() {
  if (deploying) {
    queued = true;
    return;
  }
  deploying = true;
  try {
    console.log(`[deploy] git pull in ${REPO_DIR}`);
    await run("git", ["pull", "--ff-only"], REPO_DIR);
    console.log("[deploy] docker compose up -d --build");
    await run("docker", ["compose", "up", "-d", "--build"], REPO_DIR);
    console.log("[deploy] done");
  } catch (err) {
    console.error("[deploy] failed:", err);
  } finally {
    deploying = false;
    if (queued) {
      queued = false;
      deploy();
    }
  }
}

function verify(sigHeader, body) {
  if (!sigHeader?.startsWith("sha256=")) return false;
  const sig = Buffer.from(sigHeader.slice(7), "hex");
  const expected = createHmac("sha256", SECRET).update(body).digest();
  return sig.length === expected.length && timingSafeEqual(sig, expected);
}

createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/webhook") {
    res.writeHead(404).end();
    return;
  }
  const chunks = [];
  req.on("data", (c) => chunks.push(c));
  req.on("end", () => {
    const body = Buffer.concat(chunks);
    if (!verify(req.headers["x-hub-signature-256"], body)) {
      res.writeHead(401).end("bad signature");
      return;
    }
    const event = req.headers["x-github-event"];
    if (event === "ping") {
      res.writeHead(200).end("pong");
      return;
    }
    if (event !== "push") {
      res.writeHead(200).end("ignored");
      return;
    }
    try {
      const payload = JSON.parse(body.toString("utf8"));
      if (payload.ref !== BRANCH) {
        res.writeHead(200).end(`ignored ref ${payload.ref}`);
        return;
      }
    } catch {
      res.writeHead(400).end("bad json");
      return;
    }
    res.writeHead(202).end("deploying");
    deploy();
  });
}).listen(PORT, () => console.log(`webhook listening on :${PORT}`));

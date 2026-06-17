# Auto-Redeploy on `git push` (GitHub Webhook)

Every push to `main` → VPS pulls the new code and rebuilds containers automatically. No GitHub Actions, no SSH key juggling.

## How it works

A small `webhook` container runs alongside `app` + `caddy`:
- Listens on port `9000` for GitHub's `push` webhook
- Verifies the HMAC signature using your shared secret
- Runs `git pull && docker compose up -d --build` inside `/opt/bpac`

The container has the docker CLI and uses the host's docker socket, so it can rebuild its siblings.

---

## 1. Generate a webhook secret

On your laptop or VPS:

```bash
openssl rand -hex 32
```

Copy the output — you'll paste it in two places below.

## 2. Add the secret to `.env` on the VPS

```bash
cd /opt/bpac
echo "GITHUB_WEBHOOK_SECRET=PASTE_THE_SECRET_HERE" >> .env
```

## 3. Rebuild with the webhook container

```bash
cd /opt/bpac
git pull   # pull the new Dockerfile.webhook + compose changes
docker compose up -d --build
docker compose logs -f webhook   # should print "webhook listening on :9000"
```

## 4. Open port 9000 (or proxy it through Caddy)

**Option A — open the port directly** (simplest):

```bash
ufw allow 9000/tcp
```

Your webhook URL is: `http://YOUR_VPS_IP:9000/webhook`

**Option B — proxy through Caddy on HTTPS** (recommended). Edit `Caddyfile`:

```
deploy.bpacvet.com {
    reverse_proxy webhook:9000
}
```

Add a DNS A-record for `deploy.bpacvet.com` → VPS IP, then `docker compose restart caddy`.
Webhook URL becomes: `https://deploy.bpacvet.com/webhook`

## 5. Add the webhook in GitHub

GitHub repo → **Settings → Webhooks → Add webhook**:

| Field | Value |
|---|---|
| Payload URL | `http://YOUR_VPS_IP:9000/webhook` (or the Caddy HTTPS URL) |
| Content type | `application/json` |
| Secret | the same secret from step 1 |
| SSL verification | Enable (only if using HTTPS) |
| Which events | **Just the push event** |
| Active | ✓ |

Click **Add webhook**. GitHub immediately sends a `ping` — you should see a green checkmark. If red, click the delivery → check the response body.

## 6. Test it

Make any small change, commit, push:

```bash
git commit --allow-empty -m "test webhook"
git push
```

On the VPS:

```bash
docker compose logs -f webhook
```

You should see:
```
[deploy] git pull in /repo
[deploy] docker compose up -d --build
[deploy] done
```

Visit your site — the change is live.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| GitHub shows `401 bad signature` | Secret in GitHub ≠ secret in `.env`. Re-paste both. |
| `permission denied` on docker.sock | Webhook container needs the socket mount (already in compose). Recreate: `docker compose up -d --force-recreate webhook` |
| `git pull` fails: "Permission denied (publickey)" | Repo was cloned with SSH but container has no key. Re-clone with HTTPS: `cd /opt/bpac && git remote set-url origin https://github.com/USER/REPO.git` |
| Deploys overlap | The script queues a second deploy if one is in-flight — no action needed. |
| Want to disable temporarily | `docker compose stop webhook` |

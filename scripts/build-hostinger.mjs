#!/usr/bin/env node
/**
 * Builds a minimal static `public_html/` folder for Hostinger Apache shared hosting.
 *
 * IMPORTANT: This project is TanStack Start (SSR + server functions + Supabase auth
 * middleware). Apache cannot execute the SSR server bundle. Hostinger shared hosting
 * is therefore NOT a supported runtime for the full app.
 *
 * What this script produces:
 *   public_html/
 *     index.html   – meta-refresh redirect to the working Lovable deployment
 *     .htaccess    – SPA-style rewrite + security headers
 *
 * If/when you migrate to plain Vite SPA (no SSR, no server functions), replace the
 * "redirect" body below with a real `vite build` copy step.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "public_html");
const TARGET = process.env.HOSTINGER_TARGET_URL || "https://pet-bond-bd.lovable.app";

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

writeFileSync(
  join(OUT, "index.html"),
  `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>BPAC Vet — Birds and Pet Animal Clinic</title>
  <meta name="description" content="Expert veterinary care for birds and all pet animals in Bangladesh." />
  <meta http-equiv="refresh" content="0; url=${TARGET}" />
  <link rel="canonical" href="${TARGET}" />
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:flex;
      align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f8fafc;color:#334155}
    a{color:#3b82f6}
  </style>
</head>
<body>
  <main style="text-align:center;padding:2rem">
    <h1 style="font-size:1.5rem;margin:0 0 .5rem">Redirecting to BPAC Vet…</h1>
    <p>If you are not redirected, <a href="${TARGET}">click here</a>.</p>
  </main>
  <script>location.replace(${JSON.stringify(TARGET)});</script>
</body>
</html>
`,
);

writeFileSync(
  join(OUT, ".htaccess"),
  `# BPAC Vet – Hostinger Apache config
Options -Indexes
DirectoryIndex index.html

<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

ErrorDocument 403 /index.html
ErrorDocument 404 /index.html
`,
);

console.log(`✔ Built static landing in ${OUT}`);
console.log(`  Redirect target: ${TARGET}`);

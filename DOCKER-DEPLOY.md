# Hostinger VPS — Docker Manager Deployment

You have **Hostinger VPS (srv1763317)** with Docker Manager. This is the easiest path: one compose file deploys the entire app (TanStack Start SSR + Caddy reverse proxy with auto-HTTPS).

---

## 1. Push these files to GitHub

The repo now contains:
- `Dockerfile` — builds the SSR app
- `docker-compose.yml` — runs app + Caddy
- `Caddyfile` — HTTPS reverse proxy (edit domain inside)
- `.dockerignore`

Commit & push to your GitHub repo. (Lovable auto-syncs if connected.)

---

## 2. SSH into your VPS (one-time setup)

In hPanel → VPS → **Browser terminal** (or use any SSH client):

```bash
# Clone your repo into a stable folder
mkdir -p /opt/bpac && cd /opt/bpac
git clone https://github.com/<your-username>/<your-repo>.git .

# Create the env file Docker Compose will read
cat > .env <<'EOF'
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...your-anon-key...
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...same-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...service-role-key...
EOF
chmod 600 .env
```

Get those keys from your **Supabase dashboard → Project Settings → API**.

---

## 3. Edit `Caddyfile` with your real domain

```bash
nano Caddyfile
# Replace bpacvet.com with your actual domain, save
```

Then in **Hostinger → Domains → DNS** (or your registrar) point:
- `A` record `@` → your VPS IP
- `A` record `www` → your VPS IP

---

## 4. Deploy via Hostinger Docker Manager

In the screen you screenshotted (**hPanel → VPS → Docker Manager → Compose a project**):

1. **Project name**: `bpac_vet_clinic` ✓ (you already have this)
2. Click **`.yaml editor`** tab
3. Paste the **entire contents of `docker-compose.yml`** from this repo
4. **Set the working directory** to `/opt/bpac` (so it finds the Dockerfile + .env)
   - If the UI doesn't expose this, instead skip the visual editor and run from terminal:
   ```bash
   cd /opt/bpac
   docker compose up -d --build
   ```
5. Click **Deploy**

Hostinger will build the image and start both containers (`bpac_app` + `bpac_caddy`).

---

## 5. Verify

```bash
docker compose ps                 # both containers "running"
docker compose logs -f app        # watch SSR logs
curl http://localhost:3000        # should return HTML
```

Visit `https://yourdomain.com` — Caddy auto-issues an SSL cert on first request (takes ~30s).

---

## 6. Future updates (auto-deploy)

After the initial setup, every change is one command:

```bash
cd /opt/bpac
git pull
docker compose up -d --build
```

Want **fully automatic on git push**? Add a webhook script — ask me and I'll wire it up.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `502 Bad Gateway` | App container crashed → `docker compose logs app` |
| SSL not issuing | DNS hasn't propagated yet, or port 80/443 blocked by firewall → `ufw allow 80,443/tcp` |
| Env vars undefined inside app | `.env` not in same folder as `docker-compose.yml`, or missing `chmod 600 .env` |
| Build out of memory | VPS has <2GB RAM → upgrade plan or build image locally + `docker save` / `docker load` |

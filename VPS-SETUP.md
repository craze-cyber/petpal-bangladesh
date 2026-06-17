# BPAC Vet — Hostinger VPS Deployment Guide

Full setup: GitHub → auto-deploy → VPS (Node + PM2 + Nginx + free SSL) + Supabase Cloud.

---

## 1. One-time VPS setup (run on the VPS via SSH)

```bash
ssh root@YOUR_VPS_IP

# Node 20 + build tools
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs nginx git unzip

# Bun (used by the build & install)
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc

# PM2 (keeps Node app alive)
npm install -g pm2
pm2 startup systemd -u root --hp /root   # copy/paste the command it prints

# App directory
mkdir -p /var/www/bpacvet/logs
chown -R root:root /var/www/bpacvet
```

## 2. Nginx + free SSL (Let's Encrypt)

```bash
# Copy nginx config from this repo (or paste contents of nginx/bpacvet.conf)
cp /var/www/bpacvet/nginx/bpacvet.conf /etc/nginx/sites-available/bpacvet.conf
ln -sf /etc/nginx/sites-available/bpacvet.conf /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

mkdir -p /var/www/certbot
nginx -t && systemctl reload nginx

# Point bpacvet.com  + www.bpacvet.com A-records → VPS IP in Hostinger DNS first!
# Then get SSL (free, auto-renews):
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d bpacvet.com -d www.bpacvet.com \
  --redirect --agree-tos -m you@example.com --non-interactive

# Auto-renewal cron is installed by certbot. Verify:
systemctl status certbot.timer
```

After this, both `http://bpacvet.com` and `https://bpacvet.com` work — HTTP redirects to HTTPS automatically.

## 3. GitHub → VPS automatic deploy

On the **VPS**, create an SSH key for GitHub Actions to use:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_deploy   # copy this PRIVATE key (full output)
```

In **GitHub → your repo → Settings → Secrets and variables → Actions → New repository secret**, add:

| Name | Value |
|---|---|
| `VPS_HOST` | your VPS IP (e.g. `123.45.67.89`) |
| `VPS_USER` | `root` |
| `VPS_PORT` | `22` |
| `VPS_SSH_KEY` | paste the private key from above |
| `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | your Supabase anon/publishable key |
| `SUPABASE_URL` | same as `VITE_SUPABASE_URL` |
| `SUPABASE_PUBLISHABLE_KEY` | same as the publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key (Supabase → Project Settings → API) |

That's it. Every `git push` to `main` will now:
1. Build the SSR bundle on GitHub
2. Upload `.output/` to the VPS
3. Restart PM2
4. Site is live at `https://bpacvet.com`

## 4. Supabase Cloud connection

You said you already have a Supabase project. Here's exactly where to find each key:

1. Open https://supabase.com/dashboard → your project
2. **Project Settings → API**:
   - `Project URL` → goes into `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - `anon / public` key → goes into `VITE_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_PUBLISHABLE_KEY`
   - `service_role` key → goes into `SUPABASE_SERVICE_ROLE_KEY` (NEVER expose this in browser code)
3. Paste them into the GitHub Secrets table above.

### Running this project's migrations on YOUR Supabase

The repo has SQL migrations under `supabase/migrations/`. To apply them to your own Supabase project:

```bash
# On your local machine (one time)
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF   # find it in Supabase URL: xxxxx.supabase.co
supabase db push                                # runs every migration in order
```

Or paste each `.sql` file's contents into **Supabase Dashboard → SQL Editor → Run**.

### Auth redirect URLs

In Supabase → **Authentication → URL Configuration**, set:
- **Site URL**: `https://bpacvet.com`
- **Redirect URLs**: add `https://bpacvet.com/**`

Otherwise Google sign-in / email confirm links will bounce back to localhost.

## 5. Verify

```bash
# On VPS
pm2 status              # bpacvet should be "online"
pm2 logs bpacvet        # tail logs
curl -I https://bpacvet.com   # expect HTTP/2 200
```

## 6. Common issues

| Symptom | Fix |
|---|---|
| 502 Bad Gateway | Node app not running. `pm2 logs bpacvet` to see why. Usually missing env var. |
| 403 Forbidden | Old Apache/nginx default config still active. `rm /etc/nginx/sites-enabled/default && systemctl reload nginx` |
| SSL fails | DNS A-records not pointing to VPS yet. Wait 5–30 min for propagation, retry certbot. |
| `Expected 3 parts in JWT` | Wrong Supabase key format. Use the `anon` key from Project Settings → API, not a `sb_secret_*` key. |
| GitHub Action fails on SSH | `VPS_SSH_KEY` secret must be the **private** key, full file contents including `-----BEGIN/END-----` lines. |
| Site shows old content after deploy | `pm2 restart bpacvet --update-env` then hard-refresh browser. |

## Costs

- Hostinger VPS: what you already pay
- Domain SSL: **$0** (Let's Encrypt)
- Supabase free tier: **$0** (500 MB DB, 1 GB storage, 50k monthly active users)
- GitHub Actions: **$0** (2000 min/month free on public repos, plenty for this)

**Total extra cost: $0/month.**

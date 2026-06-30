# 06 — Deployment (Self-hosted VPS)

Target: a Linux VPS running the app as a long-lived **Node.js** process behind a
reverse proxy (Nginx or Caddy) with TLS.

> **Adapter:** Selected at scaffold = **Nitro** (`nitro/vite` plugin in
> `vite.config.ts`). Nitro's default Node-server preset outputs a standalone
> server at `.output/server/index.mjs`, which is exactly what we run on the VPS.
> If targeting a specific host later, Nitro can switch presets (the CLI also
> supports `--deployment cloudflare|netlify|railway`).

## Build & run

```bash
pnpm install
pnpm build           # produces the server build (e.g. .output / dist)
pnpm start           # runs the Node server, e.g. on PORT=3000
```

Environment:
- `PORT` (e.g. `3000`)
- `NODE_ENV=production`
- (none required for v1 — no secrets, links-only contact)

## Process management

### Option A — systemd (recommended)

`/etc/systemd/system/portfolio.service`:
```ini
[Unit]
Description=Dev Portfolio (TanStack Start)
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/dev-portfolio
ExecStart=/usr/bin/node .output/server/index.mjs   # adjust to actual build entry
Environment=NODE_ENV=production
Environment=PORT=3000
Restart=always
RestartSec=3
User=www-data

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio
sudo systemctl status portfolio
```

### Option B — PM2
```bash
pm2 start "node .output/server/index.mjs" --name portfolio
pm2 save && pm2 startup
```

## Reverse proxy + TLS

### Nginx
```nginx
server {
  server_name yourdomain.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```
TLS via Certbot: `sudo certbot --nginx -d yourdomain.com`.

### Caddy (simpler, auto-TLS)
```
yourdomain.com {
  reverse_proxy 127.0.0.1:3000
}
```

## Deploy workflow (manual, v1)

1. SSH to VPS.
2. `git pull` (or push image / rsync build).
3. `pnpm install --frozen-lockfile && pnpm build`.
4. `sudo systemctl restart portfolio`.

A `deploy.sh` script can wrap these.

## CI/CD (optional, later)

GitHub Actions on push to `main`:
- install → typecheck → lint → build,
- then deploy via SSH (`appleboy/ssh-action`) running the steps above,
- or build a Docker image and `docker compose up -d` on the VPS.

## Dockerfile (optional)

Multi-stage: build with pnpm, run a slim Node image serving the build. Compose
file maps port 3000 and restarts unless-stopped. (Defer unless you want it.)

## Hardening / ops checklist

- [ ] Firewall: only 80/443 (+ SSH) open; app port bound to localhost.
- [ ] Auto-renew TLS (certbot timer / Caddy auto).
- [ ] Gzip/Brotli at the proxy.
- [ ] Cache static assets (`public/`) with long max-age + immutable hashing.
- [ ] Log rotation; `systemctl` restart-on-failure.
- [ ] Uptime check (e.g. simple cron + healthcheck route).

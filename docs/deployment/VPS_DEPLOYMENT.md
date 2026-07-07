# VPS Deployment Guide

## System Requirements
- **OS**: Ubuntu 22.04 LTS or Debian 12
- **Node.js**: 18.x or 20.x LTS
- **npm**: 9+
- **PostgreSQL**: 14+ (or use Neon cloud — recommended)
- **RAM**: Minimum 1 GB (2 GB recommended)
- **Disk**: 10 GB minimum

## 1. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Should be 20.x
```

## 2. Clone and Install

```bash
git clone <your-repo-url> /opt/mytutor
cd /opt/mytutor
npm install
cp .env.example .env
# Edit .env with production values
nano .env
```

## 3. Database Setup

```bash
npx prisma db push
```

## 4. Build

```bash
npm run build
```

## 5. PM2 Process Management

```bash
# Install PM2 globally
npm install -g pm2

# Start the app
pm2 start npm --name "mytutor" -- start

# Save process list for auto-restart on reboot
pm2 save
pm2 startup

# View logs
pm2 logs mytutor

# Restart after deploy
pm2 restart mytutor
```

## 6. Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/mytutor /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 7. SSL with Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
# Certbot auto-renews via cron
```

## 8. Deployment Update Script

```bash
#!/bin/bash
cd /opt/mytutor
git pull origin main
npm install
npm run build
pm2 restart mytutor
echo "Deploy complete"
```

## Environment Variables for Production
Set `NODE_ENV=production` in your `.env` or system environment.
The app validates required env vars on startup in production mode.

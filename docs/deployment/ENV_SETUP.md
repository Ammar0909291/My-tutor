# Environment Variable Setup

## Full Variable Matrix

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `DATABASE_URL` | **Required** | — | PostgreSQL connection (pooled for Neon) |
| `DIRECT_URL` | Recommended | — | Direct PostgreSQL URL (for prisma db push) |
| `POSTGRES_PRISMA_URL` | Optional | — | Vercel/Neon integration alias for DATABASE_URL |
| `POSTGRES_URL_NON_POOLING` | Optional | — | Vercel/Neon integration alias for DIRECT_URL |
| `AUTH_SECRET` | **Required** | — | NextAuth v5 session signing secret (min 32 chars) |
| `NEXTAUTH_URL` | **Required** | `http://localhost:3000` | Full URL of the deployed app |
| `GOOGLE_CLIENT_ID` | Optional | — | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Optional | — | Google OAuth client secret |
| `GROQ_API_KEY` | **Required** | — | Groq AI provider (free tier at console.groq.com) |
| `REDIS_URL` | Optional | — | Redis connection URL (rate limiting; app works without it) |
| `SMTP_HOST` | Optional | `smtp.gmail.com` | SMTP server for email |
| `SMTP_PORT` | Optional | `587` | SMTP port |
| `SMTP_SECURE` | Optional | `false` | Use TLS (true for port 465) |
| `SMTP_USER` | Optional | — | SMTP username/email |
| `SMTP_PASS` | Optional | — | SMTP password or app password |
| `SMTP_FROM` | Optional | — | From address for emails |
| `CRON_SECRET` | Optional | — | Secret for Vercel cron job authentication |
| `TELEGRAM_BOT_TOKEN` | Optional | — | Telegram bot for study reminders |
| `TELEGRAM_WEBHOOK_SECRET` | Optional | — | Telegram webhook validation secret |
| `SENTRY_DSN` | Optional | — | Sentry error tracking DSN |
| `MONITORING_WEBHOOK_URL` | Optional | — | Webhook URL for error notifications |
| `AI_GLOBAL_RPM` | Optional | disabled | Global AI rate limit (requests/minute) |
| `NEXT_PUBLIC_APP_URL` | Optional | `http://localhost:3000` | Public app URL (used in emails/links) |
| `ADMIN_EMAILS` | Optional | — | Comma-separated admin email addresses |
| `YANDEX_API_KEY` | Optional | — | YandexGPT API key (Russian region) |
| `YANDEX_FOLDER_ID` | Optional | — | Yandex Cloud folder ID |
| `OPENROUTER_API_KEY` | Optional | — | OpenRouter API key (primary AI provider) |

## Quick Setup

```bash
cp .env.example .env
# Edit .env with your values
openssl rand -base64 32  # Generate AUTH_SECRET
```

## Required for Production
These variables MUST be set or the app will refuse to start:
- `DATABASE_URL`
- `AUTH_SECRET`

## Generating Secrets
```bash
# AUTH_SECRET
openssl rand -base64 32

# CRON_SECRET
openssl rand -hex 32

# TELEGRAM_WEBHOOK_SECRET
openssl rand -hex 32
```

# PostgreSQL Setup Guide

## Option 1: Neon Cloud (Recommended)

Neon is a serverless PostgreSQL provider with a generous free tier.

### Setup Steps
1. Go to [console.neon.tech](https://console.neon.tech) and create an account
2. Create a new project and database
3. Go to **Connection Details** → toggle **Pooled connection**
4. Copy the connection strings:

```env
# Pooled URL (use for app runtime — prevents connection exhaustion)
DATABASE_URL="postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech:5432/neondb?sslmode=require&connection_limit=1&pool_timeout=20"

# Direct URL (use only for prisma db push/migrate)
DIRECT_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech:5432/neondb"
```

### Neon-Specific Settings
Add these params to your `DATABASE_URL` for reliability:
- `sslmode=require` — required for Neon
- `connection_limit=1` — prevents serverless connection exhaustion  
- `pool_timeout=20` — wait up to 20s for a connection

---

## Option 2: Local PostgreSQL

### Install (Ubuntu/Debian)
```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Create Database
```bash
sudo -u postgres psql
CREATE USER mytutor WITH PASSWORD 'yourpassword';
CREATE DATABASE mytutor OWNER mytutor;
\q
```

### Connection String (local)
```env
DATABASE_URL="postgresql://mytutor:yourpassword@localhost:5432/mytutor"
DIRECT_URL="postgresql://mytutor:yourpassword@localhost:5432/mytutor"
```

---

## DATABASE_URL vs DIRECT_URL

| Variable | When Used | Connection Type |
|----------|-----------|-----------------|
| `DATABASE_URL` | App runtime (all queries) | Pooled (pgbouncer) |
| `DIRECT_URL` | `prisma db push`, `prisma migrate` | Direct (no proxy) |

Prisma migrations require a direct connection because pgbouncer doesn't support the protocol extensions used during schema changes.

---

## pgbouncer Pooling Configuration

If using Vercel/Neon integration, use these aliases:

```env
# pgbouncer-compatible pooled URL (Vercel Postgres / Neon integration)
POSTGRES_PRISMA_URL="postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech:5432/neondb?pgbouncer=true&connect_timeout=15"

# Direct URL for migrations
POSTGRES_URL_NON_POOLING="postgresql://user:pass@ep-xxx.region.aws.neon.tech:5432/neondb"
```

The `?pgbouncer=true` parameter tells Prisma to use pgbouncer-compatible mode (no `SET` statements that break pooling).

---

## Schema Management

```bash
# Push schema to database (dev and production)
npx prisma db push

# View data in browser
npx prisma studio

# Pull schema from existing database
npx prisma db pull
```

This project uses `db push` (not `migrate`) — there are no migration files to track.

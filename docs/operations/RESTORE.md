# Restore Procedures

## Estimated Recovery Times
| Scenario | Estimated Time |
|----------|---------------|
| Neon PITR restore | 5–15 minutes |
| Schema-only restore | 2–5 minutes |
| Full dump restore | 10–30 minutes (data-size dependent) |
| Environment recovery | 15–30 minutes |

## 1. Full Database Restore from Neon Console
1. Go to [console.neon.tech](https://console.neon.tech)
2. Select your project → **Restore** tab
3. Choose restore point (date/time within PITR window)
4. Click **Restore** — Neon creates a new branch with the restored data
5. Update `DATABASE_URL` and `DIRECT_URL` in your environment to point to the restored branch
6. Verify: `npx prisma db pull` to confirm schema matches

## 2. Schema-Only Restore (Empty Database)
If you have an empty database and need to rebuild the schema:
```bash
# Push schema from prisma/schema.prisma
npx prisma db push

# Verify tables exist
npx prisma studio
```

## 3. Seed Data Restore
```bash
# Run seed script if available
npm run seed

# Or manually import from a dump file
pg_restore -d "$DATABASE_URL" --no-owner -Fc backup_YYYYMMDD.dump
```

## 4. Full Dump Restore
```bash
# Restore from pg_dump -Fc format
pg_restore -d "$DATABASE_URL" --no-owner --no-acl -Fc backup_YYYYMMDD.dump

# For plain SQL format
psql "$DATABASE_URL" < backup_YYYYMMDD.sql
```

## 5. Environment Recovery
If deploying to a new server or recovering from total loss:
1. Clone the repository: `git clone <repo-url>`
2. Copy `.env.example` to `.env`: `cp .env.example .env`
3. Fill in all required variables (see `docs/deployment/ENV_SETUP.md`)
4. Install dependencies: `npm install`
5. Push schema: `npx prisma db push`
6. Build: `npm run build`
7. Start: `npm start`

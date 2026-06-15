# Backup Strategy

## Neon Automatic Backups (Recommended)
Neon provides point-in-time recovery (PITR) for all databases. Backups are continuous and automatic.

- **Free tier**: 7-day PITR window
- **Pro tier**: 30-day PITR window
- Access: Neon Console → Your Project → Restore

## Schema Backup
The Prisma schema at `prisma/schema.prisma` is the source of truth for the database structure.
Always commit schema changes to version control before applying them.

## Manual Data Export

```bash
# Export full database (requires pg_dump installed)
pg_dump "$DATABASE_URL" --no-owner --no-acl -Fc -f backup_$(date +%Y%m%d).dump

# Export schema only
pg_dump "$DATABASE_URL" --schema-only -f schema_$(date +%Y%m%d).sql

# Export specific table
pg_dump "$DATABASE_URL" -t users -f users_$(date +%Y%m%d).sql
```

## Recommended Retention Policy
| Backup Type | Retention |
|-------------|-----------|
| Daily full dumps | 30 days |
| Weekly dumps | 6 months |
| Schema snapshots | Indefinitely (version controlled) |

## Automated Backup Script
Set up a cron job to run daily exports:
```bash
# crontab -e
0 2 * * * pg_dump "$DATABASE_URL" --no-owner -Fc -f /backups/mytutor_$(date +\%Y\%m\%d).dump
```

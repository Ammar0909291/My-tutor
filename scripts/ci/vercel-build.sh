#!/usr/bin/env bash
# Vercel build command — the one place that decides whether a deployment
# is allowed to migrate the database.
#
# Why this exists: vercel.json's buildCommand applies to EVERY deployment,
# so `prisma migrate deploy` ran on Preview builds too — against the same
# DATABASE_URL as Production, because Preview inherits Production's env
# vars. Preview therefore applied pending migrations to the production
# database ahead of the Production deploy, which then reported "No pending
# migrations". Migrations must be applied by Production deployments only.
#
# VERCEL_ENV is "production" | "preview" | "development" (set by Vercel).
# Unset means we are not on Vercel at all — skip migrations there too;
# local schema changes go through `npm run db:migrate` / `db:push`.
set -euo pipefail

prisma generate

if [ "${VERCEL_ENV:-}" = "production" ]; then
  echo "VERCEL_ENV=production — applying migrations (prisma migrate deploy)"
  prisma migrate deploy
else
  echo "VERCEL_ENV=${VERCEL_ENV:-unset} — skipping prisma migrate deploy (production deployments only)"
fi

next build

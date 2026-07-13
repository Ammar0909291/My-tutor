# Learn window E2E tests

Manual/local harness — **not** part of `.github/workflows/validate.yml`, which
is deliberately DB-independent today. These tests need a real Postgres
database and a seeded test user, matching the scenarios verified by hand
during the Learn window stabilization work.

## One-time setup

```bash
# Postgres running locally, DATABASE_URL/DIRECT_URL pointed at it in .env
npx prisma generate
npx prisma db push

# Seed a test user enrolled in physics/mathematics/english
npx tsx e2e/seed-test-user.ts
```

## Running

```bash
npm run dev &                 # dev server on :3000
npx playwright test           # runs everything in e2e/*.spec.ts
```

Set `E2E_BASE_URL` to point at a different server (staging, etc).

## Wiring into CI (not done yet)

Requires: a `postgres` service container in `validate.yml`, `prisma db push`
against it, the seed script above, `npx playwright install --with-deps
chromium`, and either a real `GROQ_API_KEY` secret or accepting that AI-reply
content itself is untested (everything here works fine with the "AI service
temporarily unavailable" fallback message, since these tests assert on UI
behavior — Start Lesson gating, bookmark persistence, Quick Check placement —
not on tutor response content). Left as a separate follow-up per
`docs/architecture/VALIDATION_FRAMEWORK_P10.md` §6 step 5.

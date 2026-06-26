# My Tutor — Project Memory

## Reporting preference (ALWAYS follow)
- After EVERY prompt/task — including non-coding tasks (audits, Q&A, memory updates) — ALWAYS
  produce a **detailed report** at the end of the turn.
- ALWAYS include **running instructions for the local computer** (install, env setup,
  `npx prisma db push`, `npm run dev`, `npm run build`, type-check) in that report when the task
  touched code; otherwise still close with a report summarizing what was done.
- ALWAYS deliver the report as a **single copy-able block of plain text** (a fenced code block),
  so it can be copied in one action. No exceptions.

## Architecture facts
- Next.js 14 App Router, NextAuth v5 (JWT), Prisma + PostgreSQL (`db push`, no migration files).
- AI: Groq primary (`openai/gpt-oss-20b`), YandexGPT fallback (Russia only, `country === 'ru'`;
  itself falls back to Groq on missing credentials or any error). Redis optional (app runs without it).
- KnowledgeNode: `{ id, domain, title, description, difficulty, prerequisites[] }`.
  Misconception data is runtime (`MistakeRecord`), NOT in the static KG type.
- Admin gated by `ADMIN_EMAILS` env var (not a DB flag).

## Run locally
```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), GROQ_API_KEY
                        # optional: YANDEX_API_KEY, YANDEX_FOLDER_ID (Russia-only fallback)
npm install
npx prisma db push
npm run dev            # http://localhost:3000
npm run build          # prisma generate && next build
npx tsc --noEmit       # pre-existing stripe/subscription errors are expected on feature branches
```

## Constraints
- Branch for current work (canonical): `claude/my-tutor-foundation-KDSUO`.
- Do NOT create PRs unless explicitly asked. Do NOT push to other branches.
- Do NOT redesign UI, navigation, or touch Hindi/Sanskrit subject architecture.

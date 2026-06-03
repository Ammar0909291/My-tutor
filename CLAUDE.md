# My Tutor — Project Notes

## Run Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL database running
- Copy `.env.example` to `.env` and fill in required values (at minimum: `DATABASE_URL`, `AUTH_SECRET`, `OPENROUTER_API_KEY` or `GEMINI_API_KEY`)

### Setup (first time)
```bash
npm install
npx prisma db push       # push schema to DB
npx prisma db seed       # optional: seed data
```

### Development
```bash
npm run dev              # starts Next.js dev server on http://localhost:3000
```

### Build
```bash
npm run build            # prisma generate + next build
```

### Production
```bash
npm run start            # starts production server
```

### Database helpers
```bash
npm run db:generate      # regenerate Prisma client
npm run db:push          # push schema changes to DB (no migration file)
npm run db:migrate       # create & apply a migration
npm run db:studio        # open Prisma Studio GUI
npm run db:seed          # seed the database
```

### Other
```bash
npm run lint             # ESLint
npm run type-check       # TypeScript check (no emit)
```

## Key Dependencies
- **Framework**: Next.js 14 (App Router)
- **Auth**: NextAuth v5 (`AUTH_SECRET` env var, not `NEXTAUTH_SECRET`)
- **DB ORM**: Prisma + PostgreSQL
- **AI**: OpenRouter (primary), Gemini (fallback)
- **Email**: Nodemailer (SMTP — see `.env.example` for Gmail config)
- **Payments**: Stripe
- **Cache**: Redis (optional — app works without it)

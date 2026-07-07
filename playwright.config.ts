import { defineConfig } from '@playwright/test'

// Local/manual E2E harness for the Learn window (English/Mathematics/Physics
// only — the three live curriculums). NOT wired into .github/workflows/validate.yml:
// that job is deliberately DB-independent (see its header comment and
// docs/architecture/VALIDATION_FRAMEWORK_P10.md §6 step 5, "Tier 3a fixture
// replay with a Postgres service... intentionally absent... lands with the
// first fixtures per the spec"). Adding a live Postgres service + seeded test
// user + GROQ secret to CI is a separate, larger infra step — this config
// exists so the same scenarios verified manually during development are
// captured as repeatable code, run locally with:
//   npx playwright test
// against a local `npm run dev` + local Postgres with a seeded test user
// (see e2e/README.md).
export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
})

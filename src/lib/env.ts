/**
 * Required-env-var check — single source of truth for what
 * docs/DEPLOYMENT.md §1 calls "Required — the app is broken or unsafe
 * without these". Pure, no I/O: read by /api/health so a misconfigured
 * deployment is discoverable from the outside instead of surfacing as a
 * mysterious 500 the first time a feature is used.
 *
 * REDIS_URL is deliberately excluded — the app fails open without it
 * (rate limiting off, /api/health already reports redis status
 * separately) rather than being broken or unsafe.
 */

export const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'AUTH_SECRET',
  'GROQ_API_KEY',
  'NEXT_PUBLIC_APP_URL',
  'CRON_SECRET',
] as const

/** Names of required env vars that are unset or empty. Empty array = fully configured. */
export function missingRequiredEnv(): string[] {
  return REQUIRED_ENV_VARS.filter((name) => !process.env[name])
}

export type EnvValidationResult = {
  valid: boolean
  missing: string[]
  warnings: string[]
}

const REQUIRED_VARS = ['DATABASE_URL', 'AUTH_SECRET']

export function validateEnv(): EnvValidationResult {
  const missing: string[] = []
  const warnings: string[] = []

  for (const varName of REQUIRED_VARS) {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  }

  const valid = missing.length === 0

  if (!valid) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}. ` +
          'The application cannot start without these variables set.'
      )
    } else {
      console.warn(
        `[env] Warning: Missing required environment variables: ${missing.join(', ')}. ` +
          'The app may not function correctly.'
      )
    }
  }

  return { valid, missing, warnings }
}

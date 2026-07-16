/**
 * missingRequiredEnv() — pure logic test. Backs /api/health's new
 * `config.missing` field (production-readiness: a misconfigured
 * deployment should be discoverable from the outside, not just a later
 * mysterious 500).
 */
import { describe, it, expect } from 'vitest'
import { missingRequiredEnv, REQUIRED_ENV_VARS } from '@/lib/env'

const ORIGINAL_ENV = { ...process.env }

function resetEnv() {
  process.env = { ...ORIGINAL_ENV }
}

describe('missingRequiredEnv', () => {
  it('returns an empty array when every required var is set', () => {
    resetEnv()
    for (const name of REQUIRED_ENV_VARS) process.env[name] = 'set'
    expect(missingRequiredEnv()).toEqual([])
    resetEnv()
  })

  it('names every unset required var', () => {
    resetEnv()
    for (const name of REQUIRED_ENV_VARS) delete process.env[name]
    expect(missingRequiredEnv().sort()).toEqual([...REQUIRED_ENV_VARS].sort())
    resetEnv()
  })

  it('treats an empty string the same as unset', () => {
    resetEnv()
    for (const name of REQUIRED_ENV_VARS) process.env[name] = 'set'
    process.env.AUTH_SECRET = ''
    expect(missingRequiredEnv()).toEqual(['AUTH_SECRET'])
    resetEnv()
  })

  it('does not list REDIS_URL — the app fails open without it, not broken/unsafe', () => {
    expect(REQUIRED_ENV_VARS).not.toContain('REDIS_URL')
  })
})

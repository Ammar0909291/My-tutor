import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const schema = readFileSync(join(process.cwd(), 'prisma/schema.prisma'), 'utf-8')

describe('Prisma schema constraint validation', () => {
  it('User.email has @unique constraint', () => {
    expect(schema).toMatch(/email\s+String\s+@unique/)
  })

  it('User.referralCode has @unique constraint', () => {
    expect(schema).toMatch(/referralCode\s+String\?\s+@unique/)
  })

  it('PracticeSession.idempotencyKey has @unique constraint (HIGH-6)', () => {
    expect(schema).toMatch(/idempotencyKey\s+String\?\s+@unique/)
  })

  it('VerificationToken has @@unique([identifier, token]) (MED-11)', () => {
    expect(schema).toMatch(/@@unique\(\[identifier, token\]\)/)
  })

  it('VerificationToken.token has @unique', () => {
    // token field must be unique so hash lookups work
    const tokenBlock = schema.slice(schema.indexOf('model VerificationToken'), schema.indexOf('\n}', schema.indexOf('model VerificationToken')))
    expect(tokenBlock).toMatch(/token\s+String\s+@unique/)
  })

  it('TopicProgress has @@unique([userId, subjectSlug, topicSlug])', () => {
    expect(schema).toMatch(/@@unique\(\[userId, subjectSlug, topicSlug\]\)/)
  })

  it('Profile.userId has @unique (one profile per user)', () => {
    expect(schema).toMatch(/userId\s+String\s+@unique/)
  })

  it('Subscription.userId has @unique (one subscription per user)', () => {
    // Check that subscription model has @unique userId
    const subBlock = schema.slice(schema.indexOf('model Subscription'), schema.indexOf('\n}', schema.indexOf('model Subscription')))
    expect(subBlock).toMatch(/userId\s+String\s+@unique/)
  })

  it('Subject.slug has @unique', () => {
    expect(schema).toMatch(/slug\s+String\s+@unique/)
  })

  it('PracticeSession model exists with completedAt field (HIGH-8)', () => {
    const psBlock = schema.slice(schema.indexOf('model PracticeSession'), schema.indexOf('\n}', schema.indexOf('model PracticeSession')))
    expect(psBlock).toMatch(/completedAt/)
  })

  it('User has passwordHash field (not plaintext password)', () => {
    const userBlock = schema.slice(schema.indexOf('model User'), schema.indexOf('\n}', schema.indexOf('model User')))
    expect(userBlock).toMatch(/passwordHash/)
    expect(userBlock).not.toMatch(/password\s+String/)
  })

  it('User has isDeleted flag for ban enforcement (MED-8)', () => {
    const userBlock = schema.slice(schema.indexOf('model User'), schema.indexOf('\n}', schema.indexOf('model User')))
    expect(userBlock).toMatch(/isDeleted/)
  })

  it('ProfileSubject has @@unique([profileId, subjectId])', () => {
    expect(schema).toMatch(/@@unique\(\[profileId, subjectId\]\)/)
  })

  // Production applies schema changes via `prisma migrate deploy`
  // (vercel.json buildCommand), which only replays committed migration
  // files — it never runs `prisma db push`. A model added to schema.prisma
  // via `db push` alone (as SpineEvent originally was) validates fine
  // locally/in CI but silently never creates its table in production.
  // This guards every @@map'd table name against that exact drift class.
  it('every @@map table name has a CREATE TABLE in some committed migration (prevents db-push-only schema drift reaching production)', () => {
    const mapNames = Array.from(schema.matchAll(/@@map\("([a-zA-Z0-9_]+)"\)/g)).map((m) => m[1])
    expect(mapNames.length).toBeGreaterThan(0)

    const migrationsDir = join(process.cwd(), 'prisma/migrations')
    const migrationFiles = readdirSync(migrationsDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => join(migrationsDir, e.name, 'migration.sql'))
    const migrationsSql = migrationFiles
      .map((f) => { try { return readFileSync(f, 'utf-8') } catch { return '' } })
      .join('\n')

    const missing = mapNames.filter((name) => !new RegExp(`CREATE TABLE "?${name}"?`, 'i').test(migrationsSql))
    expect(missing).toEqual([])
  })
})

/**
 * C4 — Guard AST compiler.
 *
 * Converts a declarative predicate AST into a total, pure, deterministic
 * function over PolicyInputs. Two consumers:
 *   1. The compiler validates the AST (fields legal, ops well-formed).
 *   2. The runtime loader compiles the AST to a function attached to a
 *      Rule (`RuleGuard.match`) that the K4 engine can execute.
 *
 * No arbitrary code execution. No eval(). No side effects.
 *
 * The set of legal fields is the intersection of PolicyInputs keys and
 * the guardable-fields whitelist below. Rules referencing unknown fields
 * are rejected at validate time (never runtime), preserving determinism.
 */
import type { PolicyInputs } from '@/lib/kernel/policy/types'
import type { GuardAST, GuardClause } from './types'

/** The closed set of fields a rule guard may read. Adding a field is a
 *  spec/pack-version event, not an ad-hoc extension (RS §5.1 reads[]). */
export const GUARDABLE_FIELDS: readonly (keyof PolicyInputs)[] = [
  'contentRegister', 'profileLevel', 'sessionFailureCount', 'isFirstLessonContext',
  'phase', 'stageCeiling', 'demonstrated', 'consecutiveFailures',
  'interruptActive', 'failureStateKey', 'autonomyRequested',
  'retroWinOwed', 'dueReviewCount', 'freshBoundary',
  'lastSignalCorrect', 'lastSignalConfidence', 'currentConceptId',
] as const

export function isGuardableField(name: string): name is keyof PolicyInputs {
  return (GUARDABLE_FIELDS as readonly string[]).includes(name)
}

/** Extract the set of fields the AST reads. Pure. */
export function fieldsRead(ast: GuardClause): string[] {
  const out = new Set<string>()
  const walk = (c: GuardClause): void => {
    switch (c.kind) {
      case 'true': case 'false': return
      case 'eq': case 'neq': case 'gt': case 'gte': case 'lt': case 'lte':
        out.add(c.field); return
      case 'in': case 'nin':
        out.add(c.field); return
      case 'all': case 'any':
        c.clauses.forEach(walk); return
    }
  }
  walk(ast)
  return [...out].sort()
}

/** Build a human-readable description string. */
export function describeGuard(ast: GuardClause): string {
  const rec = (c: GuardClause): string => {
    switch (c.kind) {
      case 'true': return 'true'
      case 'false': return 'false'
      case 'eq': return `${c.field}=${JSON.stringify(c.value)}`
      case 'neq': return `${c.field}!=${JSON.stringify(c.value)}`
      case 'gt': return `${c.field}>${JSON.stringify(c.value)}`
      case 'gte': return `${c.field}>=${JSON.stringify(c.value)}`
      case 'lt': return `${c.field}<${JSON.stringify(c.value)}`
      case 'lte': return `${c.field}<=${JSON.stringify(c.value)}`
      case 'in': return `${c.field} in ${JSON.stringify(c.values)}`
      case 'nin': return `${c.field} not in ${JSON.stringify(c.values)}`
      case 'all': return `(all ${c.clauses.map(rec).join(' & ')})`
      case 'any': return `(any ${c.clauses.map(rec).join(' | ')})`
    }
  }
  return rec(ast)
}

/** Compile the AST to a total predicate over PolicyInputs. Pure. */
export function compileGuard(ast: GuardClause): (i: PolicyInputs) => boolean {
  const readField = (i: PolicyInputs, f: string): unknown =>
    (i as unknown as Record<string, unknown>)[f]
  const compile = (c: GuardClause): (i: PolicyInputs) => boolean => {
    switch (c.kind) {
      case 'true': return () => true
      case 'false': return () => false
      case 'eq': {
        const f = c.field; const v = c.value
        return (i) => readField(i, f) === v
      }
      case 'neq': {
        const f = c.field; const v = c.value
        return (i) => readField(i, f) !== v
      }
      case 'gt': {
        const f = c.field; const v = c.value as number
        return (i) => { const x = readField(i, f); return typeof x === 'number' && x > v }
      }
      case 'gte': {
        const f = c.field; const v = c.value as number
        return (i) => { const x = readField(i, f); return typeof x === 'number' && x >= v }
      }
      case 'lt': {
        const f = c.field; const v = c.value as number
        return (i) => { const x = readField(i, f); return typeof x === 'number' && x < v }
      }
      case 'lte': {
        const f = c.field; const v = c.value as number
        return (i) => { const x = readField(i, f); return typeof x === 'number' && x <= v }
      }
      case 'in': {
        const f = c.field; const set = new Set(c.values as unknown[])
        return (i) => set.has(readField(i, f))
      }
      case 'nin': {
        const f = c.field; const set = new Set(c.values as unknown[])
        return (i) => !set.has(readField(i, f))
      }
      case 'all': {
        const fs = c.clauses.map(compile)
        return (i) => fs.every((fn) => fn(i))
      }
      case 'any': {
        const fs = c.clauses.map(compile)
        return (i) => fs.some((fn) => fn(i))
      }
    }
  }
  return compile(ast)
}

/** Attach the compiled function to a GuardAST — used by the loader. */
export function toRuntimeGuard(ast: GuardAST): { reads: (keyof PolicyInputs)[]; match: (i: PolicyInputs) => boolean; describe: string } {
  return {
    reads: ast.reads.filter(isGuardableField),
    match: compileGuard(ast.ast),
    describe: ast.describe,
  }
}

/** Validate the AST structure. Returns a list of error strings; empty = ok. */
export function validateAst(ast: GuardClause): string[] {
  const errors: string[] = []
  const walk = (c: GuardClause, path: string): void => {
    if (c === null || typeof c !== 'object' || !('kind' in c)) {
      errors.push(`${path}: missing 'kind'`); return
    }
    switch (c.kind) {
      case 'true': case 'false': return
      case 'eq': case 'neq': case 'gt': case 'gte': case 'lt': case 'lte':
        if (typeof (c as { field?: unknown }).field !== 'string') errors.push(`${path}.field must be a string`)
        if (!isGuardableField((c as { field: string }).field)) errors.push(`${path}.field "${(c as { field: string }).field}" is not a guardable input`)
        if (!('value' in c)) errors.push(`${path}.value required`)
        return
      case 'in': case 'nin':
        if (typeof (c as { field?: unknown }).field !== 'string') errors.push(`${path}.field must be a string`)
        else if (!isGuardableField((c as { field: string }).field)) errors.push(`${path}.field "${(c as { field: string }).field}" is not a guardable input`)
        if (!Array.isArray((c as { values?: unknown }).values)) errors.push(`${path}.values must be an array`)
        return
      case 'all': case 'any':
        if (!Array.isArray((c as { clauses?: unknown }).clauses)) { errors.push(`${path}.clauses must be an array`); return }
        (c as { clauses: GuardClause[] }).clauses.forEach((cl, idx) => walk(cl, `${path}.clauses[${idx}]`))
        return
      default:
        errors.push(`${path}: unknown clause kind "${(c as { kind: string }).kind}"`)
    }
  }
  walk(ast, 'guard')
  return errors
}

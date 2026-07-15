/**
 * C4 — Canonical hashing. Pure. Deterministic.
 *
 * canonicalJsonHash: sorts keys at every level, strips insignificant
 * whitespace, then sha256s. Same content → identical hash across any
 * two builds anywhere (EBC D-1 byte reproducibility).
 */
import { createHash } from 'node:crypto'

export function canonicalize(value: unknown): string {
  const stringify = (v: unknown): string => {
    if (v === null) return 'null'
    if (typeof v === 'number' || typeof v === 'boolean') return JSON.stringify(v)
    if (typeof v === 'string') return JSON.stringify(v)
    if (Array.isArray(v)) return '[' + v.map(stringify).join(',') + ']'
    if (typeof v === 'object') {
      const keys = Object.keys(v as Record<string, unknown>).sort()
      return '{' + keys.map((k) => JSON.stringify(k) + ':' + stringify((v as Record<string, unknown>)[k])).join(',') + '}'
    }
    return 'null'  // functions, symbols, undefined — never in compiled pack
  }
  return stringify(value)
}

export function canonicalJsonHash(value: unknown): string {
  return 'sha256:' + createHash('sha256').update(canonicalize(value), 'utf8').digest('hex')
}

export function hashSource(source: string): string {
  return 'sha256:' + createHash('sha256').update(source, 'utf8').digest('hex')
}

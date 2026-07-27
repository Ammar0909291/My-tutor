/**
 * C1 — canonical form and revision identity (CEKR §9, §10).
 *
 * REUSES `canonicalJsonHash` from brain-compiler/hash. That function already
 * implements the exact contract CEKR needs — sorted keys at every level,
 * insignificant whitespace stripped, sha256 — and was written for EBC's
 * byte-reproducibility requirement. Two canonicalisers in one repo would be
 * two answers to "what is this content's identity", which is the duplication
 * this milestone is forbidden from creating.
 *
 * The only thing added here is WHAT gets hashed: CEKR §10 defines the
 * revision as a hash of the canonical BODY plus the fields that make the
 * entity that entity — never of the mutable lifecycle fields, or a status
 * change would mint a new revision and break the SUPERSEDES chain.
 */
import { canonicalize, canonicalJsonHash } from '@/lib/brain-compiler/hash'
import type { CekrEdge, CekrEnvelope, CekrRecord, RevisionHash } from './types'
import { isEdge } from './types'

export { canonicalize }

/**
 * The revision basis (CEKR §10.1): identity + schema + content.
 *
 * DELIBERATELY EXCLUDED and the reason for each:
 *   status      lifecycle moves (DRAFT→ACTIVE) must not change identity, or
 *               review would invalidate every reference to the entity.
 *   provenance  who authored it is not what it says.
 *   citations   where it came from is not what it says.
 *   tags        "discovery only, never semantics" (CEKR §2.1).
 *   rev         self-referential by construction.
 */
export function revisionBasis(record: CekrRecord): Record<string, unknown> {
  if (isEdge(record)) {
    const e = record as CekrEdge
    return {
      id: e.id, kind: 'Edge', edgeKind: e.edgeKind, schemaVersion: e.schemaVersion,
      from: e.from, to: e.to, attrs: e.attrs,
    }
  }
  const n = record as CekrEnvelope
  return { id: n.id, kind: n.kind, schemaVersion: n.schemaVersion, body: n.body }
}

/** Compute the revision hash. Pure; deterministic across machines. */
export function revisionHash(record: CekrRecord): RevisionHash {
  return canonicalJsonHash(revisionBasis(record))
}

/** Return the record with a freshly computed `rev`. Never mutates input. */
export function withRevision<T extends CekrRecord>(record: T): T {
  return { ...record, rev: revisionHash(record) }
}

/** Does the stored `rev` match the content? V-2's integrity half. */
export function revisionMatches(record: CekrRecord): boolean {
  return record.rev === revisionHash(record)
}

/**
 * Canonical serialisation for the store (CEKR §9). Sorted keys, no
 * insignificant whitespace, newline-terminated so the files are diffable in
 * git — the store is git-backed in v1, and a file that cannot be reviewed in
 * a diff defeats the point of authoring in a repository.
 */
export function serialize(record: CekrRecord): string {
  return canonicalize(record) + '\n'
}

/** Inverse of serialize. Total: returns null rather than throwing on garbage,
 *  because a corrupt file must be reported as one bad entity, not crash a
 *  whole snapshot load. */
export function deserialize(text: string): CekrRecord | null {
  try {
    const v = JSON.parse(text)
    if (!v || typeof v !== 'object' || Array.isArray(v)) return null
    return v as CekrRecord
  } catch {
    return null
  }
}

/** Round-trip identity: serialize→deserialize→serialize is a fixed point.
 *  Exported because it is the C1 Definition of Done, not just a test helper. */
export function roundTrips(record: CekrRecord): boolean {
  const back = deserialize(serialize(record))
  return back !== null && serialize(back) === serialize(record)
}

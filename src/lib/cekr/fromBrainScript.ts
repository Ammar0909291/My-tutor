/**
 * C2 — BrainScript → CEKR lowering.
 *
 * REUSES the existing parser. `brain-compiler/parser.ts` already turns a .bs
 * file into RawBlock[] (BIR-H, faithful syntactic parse) and is exercised by
 * the live `brain/physics-mechanics.bs` source. Writing a second parser for
 * the same grammar would be the duplication this milestone is forbidden from
 * creating, so this module starts where that one stops.
 *
 * ── Why a second LOWERING is not a second architecture ───────────────────
 * `brain-compiler/lowering.ts` lowers `::rule` blocks to a CompiledPack —
 * the runtime policy artifact, C4's back end. This module lowers AUTHORING
 * blocks to CEKR entities and edges. They are different targets of the same
 * front end, and CEKR §12 states the intended relationship: the compiler's
 * BIR-M is "the in-memory projection of CEKR", and the compiler MUST NOT
 * write CEKR (one-way flow). Nothing in lowering.ts is touched.
 *
 *   .bs ──parse()──► RawBlock[] ──┬── lowering.ts ──► CompiledPack   (C4/K4)
 *                                 └── this module ──► CEKR records   (C1/C2)
 *
 * ── The block grammar this module recognises ─────────────────────────────
 *   ::<kind> <slug>            an entity; <kind> must be a registered Kind
 *     field: <json>            becomes body.field
 *     @status / @author /      envelope directives, distinguished by the `@`
 *     @cite / @tags            prefix so they can never collide with a body
 *   ::end                      field name
 *
 *   ::edge <EDGE_KIND> <from> -> <to>
 *     attr: <json>             becomes attrs.attr
 *   ::end
 *
 * Unknown block kinds are DIAGNOSED, never guessed — the parser's own rule,
 * kept.
 */
import { parse } from '@/lib/brain-compiler/parser'
import type { Diagnostic, RawBlock } from '@/lib/brain-compiler/types'
import { withRevision } from './canonical'
import {
  KINDS, isEdgeKind, isKind, makeEntityId,
  type CekrEdge, type CekrEnvelope, type CekrRecord, type Kind, type SourceSpan, type Status,
} from './types'

export interface LowerResult {
  records: CekrRecord[]
  diagnostics: Diagnostic[]
}

const ENVELOPE_PREFIX = '@'
const EDGE_HEADER_RE = /^([A-Z_]+)\s+(\S+)\s*->\s*(\S+)$/

function diag(code: string, message: string, block?: RawBlock, severity: 'E' | 'W' = 'E'): Diagnostic {
  return { code, severity, message, span: block?.span }
}

function citationFrom(block: RawBlock, file: string): SourceSpan {
  return { file, heading: block.header || undefined, line: block.span?.startLine }
}

function splitFields(fields: Record<string, unknown>): {
  body: Record<string, unknown>
  directives: Record<string, unknown>
} {
  const body: Record<string, unknown> = {}
  const directives: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(fields)) {
    if (k.startsWith(ENVELOPE_PREFIX)) directives[k.slice(1)] = v
    else body[k] = v
  }
  return { body, directives }
}

function statusOf(directives: Record<string, unknown>): Status {
  const s = directives.status
  return s === 'REVIEW' || s === 'ACTIVE' || s === 'DEPRECATED' || s === 'RETIRED' ? s : 'DRAFT'
}

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === 'string')
  if (typeof v === 'string' && v.length > 0) return [v]
  return []
}

/**
 * Lower one parsed file. `authoredAt` is injected rather than read from the
 * clock so that lowering is PURE and a re-run produces byte-identical
 * records — the property the content-addressed store depends on.
 */
export function lowerBlocks(
  blocks: readonly RawBlock[],
  opts: { file: string; authorRef?: string; authoredAt?: string },
): LowerResult {
  const diagnostics: Diagnostic[] = []
  const records: CekrRecord[] = []
  const createdAt = opts.authoredAt ?? '1970-01-01T00:00:00.000Z'
  const authorRef = opts.authorRef ?? 'unknown'
  let edgeSeq = 0

  for (const block of blocks) {
    const { body, directives } = splitFields(block.fields)
    const citations = [citationFrom(block, opts.file), ...asStringArray(directives.cite).map((f) => ({ file: f }))]
    const envelopeBase = {
      rev: '',
      schemaVersion: 1,
      status: statusOf(directives),
      provenance: {
        authorType: (directives.author === 'IMPORTED' ? 'IMPORTED' : 'HUMAN') as 'HUMAN' | 'IMPORTED',
        authorRef: typeof directives.authorRef === 'string' ? directives.authorRef : authorRef,
        createdAt,
      },
      citations,
      tags: asStringArray(directives.tags),
    }

    // ── edges ────────────────────────────────────────────────────────────
    if (stripMarker(block.kind) === 'edge') {
      const m = EDGE_HEADER_RE.exec(block.header.trim())
      if (!m) {
        diagnostics.push(diag('E2001', `edge header must be "<EDGE_KIND> <from> -> <to>", got "${block.header}"`, block))
        continue
      }
      const [, edgeKind, from, to] = m
      if (!isEdgeKind(edgeKind)) {
        diagnostics.push(diag('E2002', `unknown edge kind '${edgeKind}'`, block))
        continue
      }
      const edge: CekrEdge = withRevision({
        ...envelopeBase,
        id: `cekr:Edge/${edgeKind.toLowerCase()}-${edgeSeq++}`,
        kind: 'Edge',
        edgeKind,
        from, to,
        attrs: body,
      } as CekrEdge)
      records.push(edge)
      continue
    }

    // ── entities ─────────────────────────────────────────────────────────
    // The parser's block kind is lower-case by convention; CEKR kinds are
    // PascalCase. Match case-insensitively, then use the REGISTERED spelling
    // so the id and the kind field can never disagree (V-2).
    const kind = resolveKind(stripMarker(block.kind))
    if (!kind) {
      // Blocks belonging to the OTHER lowering target (::pack, ::rule) are
      // skipped silently — one source file may legitimately feed both.
      const bare = stripMarker(block.kind)
      if (bare === 'pack' || bare === 'rule') continue
      diagnostics.push(diag('E2003', `unknown block kind '${block.kind}'`, block))
      continue
    }
    const slug = block.header.trim().split(/\s+/)[0]
    if (!slug) {
      diagnostics.push(diag('E2004', `${block.kind} needs a slug in its header`, block))
      continue
    }
    records.push(withRevision({
      ...envelopeBase,
      id: makeEntityId(kind, slug),
      kind,
      body,
    } as CekrEnvelope))
  }

  return { records, diagnostics }
}

/** Built from the registry, so a new kind never needs a second list. */
const KIND_BY_LOWER: ReadonlyMap<string, Kind> =
  new Map(KINDS.map((k) => [k.toLowerCase(), k]))

/** The parser emits kinds WITH their `::` marker; CEKR names them without. */
function stripMarker(kind: string): string {
  return kind.startsWith('::') ? kind.slice(2) : kind
}

function resolveKind(raw: string): Kind | null {
  const hit = KIND_BY_LOWER.get(raw.toLowerCase())
  return hit && isKind(hit) ? hit : null
}

/** Parse + lower one source file. The C2 entry point. */
export function fromBrainScript(
  source: string,
  opts: { file: string; authorRef?: string; authoredAt?: string },
): LowerResult {
  const parsed = parse(opts.file, source)
  const lowered = lowerBlocks(parsed.blocks, opts)
  return {
    records: lowered.records,
    diagnostics: [...parsed.diagnostics, ...lowered.diagnostics],
  }
}

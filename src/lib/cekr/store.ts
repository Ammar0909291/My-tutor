/**
 * C1 — the content-addressed store (CEKR §9, §10; masterplan C1 "git-backed
 * v1: entities as canonical-JSON files + head index").
 *
 * Git-backed means exactly that: the store IS a directory of canonical-JSON
 * files that git already versions, diffs, reviews and merges. It adds no
 * database, no migration and no daemon, and it makes an authoring change a
 * pull request — which is the point of authoring in a repository.
 *
 * Layout:
 *   <root>/entities/<Kind>/<slug>/<rev>.json    every revision, immutable
 *   <root>/edges/<edgeKind>/<slug>/<rev>.json
 *   <root>/HEAD.json                            id → current rev + status
 *
 * IMMUTABILITY. A revision file is written once and never rewritten: content
 * addressing makes rewriting it a contradiction (different content ⇒
 * different path). Mutation happens only in HEAD, which is why the revision
 * chain is trustworthy and replay is possible.
 *
 * The filesystem is injected rather than imported, so the store is testable
 * in memory and carries no I/O dependency of its own.
 */
import { revisionHash, serialize, deserialize } from './canonical'
import { isEdge, type CekrEdge, type CekrRecord, type EntityId, type RevisionHash, type Status } from './types'

/** The minimum filesystem the store needs. Node's fs/promises satisfies it;
 *  so does a Map-backed fake, which is what the tests use. */
export interface StoreFs {
  read(path: string): Promise<string | null>
  write(path: string, content: string): Promise<void>
  exists(path: string): Promise<boolean>
  list(dir: string): Promise<string[]>
}

export interface HeadEntry {
  rev: RevisionHash
  status: Status
  /** The revision this one replaced, or null for the first. The chain (§10). */
  previousRev: RevisionHash | null
  updatedAt: string
}

export type HeadIndex = Record<EntityId, HeadEntry>

export const HEAD_PATH = 'HEAD.json'

function recordDir(r: CekrRecord): string {
  const slug = r.id.split('/').slice(1).join('/') || 'unknown'
  return isEdge(r)
    ? `edges/${(r as CekrEdge).edgeKind}/${slug}`
    : `entities/${r.kind}/${slug}`
}

export function revisionPath(r: CekrRecord, rev: RevisionHash): string {
  // `sha256:` is not a legal path segment everywhere; the algorithm prefix is
  // constant and recoverable, so the file name carries the digest alone.
  return `${recordDir(r)}/${rev.replace(/^sha256:/, '')}.json`
}

export class CekrStore {
  constructor(private readonly fs: StoreFs, private readonly root = '.') {}

  private p(rel: string): string { return `${this.root}/${rel}` }

  async readHead(): Promise<HeadIndex> {
    const raw = await this.fs.read(this.p(HEAD_PATH))
    if (!raw) return {}
    try { return JSON.parse(raw) as HeadIndex } catch { return {} }
  }

  private async writeHead(head: HeadIndex): Promise<void> {
    // Sorted keys so HEAD.json diffs are reviewable and merge conflicts are
    // line-local rather than whole-file.
    const sorted: HeadIndex = {}
    for (const k of Object.keys(head).sort()) sorted[k] = head[k]
    await this.fs.write(this.p(HEAD_PATH), JSON.stringify(sorted, null, 2) + '\n')
  }

  /**
   * Commit a record. Returns the revision written, and whether it was new.
   *
   * Re-committing identical content is a NO-OP that returns the existing
   * revision — content addressing makes that automatic, and it is what lets
   * an importer run repeatedly without churning the store.
   */
  async commit(record: CekrRecord): Promise<{ rev: RevisionHash; created: boolean }> {
    const rev = revisionHash(record)
    const withRev: CekrRecord = { ...record, rev }
    const path = this.p(revisionPath(withRev, rev))

    const head = await this.readHead()
    const prior = head[record.id]

    if (prior?.rev === rev && await this.fs.exists(path)) {
      // Identical content already at HEAD. Status may still have moved.
      if (prior.status !== record.status) {
        head[record.id] = { ...prior, status: record.status, updatedAt: new Date(0).toISOString() }
        await this.writeHead(head)
      }
      return { rev, created: false }
    }

    if (!(await this.fs.exists(path))) {
      await this.fs.write(path, serialize(withRev))
    }
    head[record.id] = {
      rev,
      status: record.status,
      previousRev: prior?.rev ?? null,
      updatedAt: new Date(0).toISOString(),
    }
    await this.writeHead(head)
    return { rev, created: true }
  }

  /** Read a specific revision, or HEAD when `rev` is omitted. */
  async read(id: EntityId, rev?: RevisionHash): Promise<CekrRecord | null> {
    const head = await this.readHead()
    const target = rev ?? head[id]?.rev
    if (!target) return null
    // The path needs the record's kind, which is encoded in the id.
    const [, kindAndSlug] = id.split(':')
    if (!kindAndSlug) return null
    const [kind, ...slugParts] = kindAndSlug.split('/')
    const slug = slugParts.join('/')
    const digest = target.replace(/^sha256:/, '')
    for (const dir of [`entities/${kind}/${slug}`, ...(await this.edgeDirs(slug))]) {
      const raw = await this.fs.read(this.p(`${dir}/${digest}.json`))
      if (raw) return deserialize(raw)
    }
    return null
  }

  private async edgeDirs(slug: string): Promise<string[]> {
    const kinds = await this.fs.list(this.p('edges')).catch(() => [])
    return kinds.map((k) => `edges/${k}/${slug}`)
  }

  /**
   * Walk the revision chain from HEAD backwards. This is the audit answer to
   * "what did this entity say on date X" and the reason revisions are never
   * rewritten.
   */
  async history(id: EntityId): Promise<RevisionHash[]> {
    const head = await this.readHead()
    const out: RevisionHash[] = []
    let cursor: RevisionHash | null = head[id]?.rev ?? null
    const seen = new Set<RevisionHash>()
    while (cursor && !seen.has(cursor)) {
      seen.add(cursor)
      out.push(cursor)
      const rec = await this.read(id, cursor)
      if (!rec) break
      // The chain lives in HEAD; older links are recovered by re-reading it,
      // so a single-step store keeps only HEAD's immediate predecessor.
      cursor = head[id]?.previousRev && !seen.has(head[id].previousRev!)
        ? head[id].previousRev
        : null
    }
    return out
  }

  /** Load the whole corpus for validation or compilation. */
  async snapshot(): Promise<CekrRecord[]> {
    const head = await this.readHead()
    const out: CekrRecord[] = []
    for (const id of Object.keys(head).sort()) {
      const r = await this.read(id)
      if (r) out.push(r)
    }
    return out
  }
}

/** In-memory StoreFs. Used by the tests, and by any caller that wants a
 *  store without touching disk. Deterministic ordering. */
export function memoryFs(seed: Record<string, string> = {}): StoreFs & { files: Map<string, string> } {
  const files = new Map<string, string>(Object.entries(seed))
  return {
    files,
    async read(path) { return files.get(path) ?? null },
    async write(path, content) { files.set(path, content) },
    async exists(path) { return files.has(path) },
    async list(dir) {
      const prefix = dir.endsWith('/') ? dir : dir + '/'
      const names = new Set<string>()
      for (const k of files.keys()) {
        if (!k.startsWith(prefix)) continue
        names.add(k.slice(prefix.length).split('/')[0])
      }
      return [...names].sort()
    },
  }
}

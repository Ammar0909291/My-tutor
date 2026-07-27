import { prisma } from '@/lib/db/prisma'
import { AssetStatus, AssetFamily, AuthorKind } from '@prisma/client'
import { AssetActions, BulkApproveButton } from './_components/AssetActions'

const SUBJECT_PREFIXES: { prefix: string; label: string }[] = [
  { prefix: 'math', label: 'Mathematics' },
  { prefix: 'phys', label: 'Physics' },
  { prefix: 'eng',  label: 'English' },
  { prefix: 'chem', label: 'Chemistry' },
  { prefix: 'bio',  label: 'Biology' },
  { prefix: 'cs',   label: 'Computer Science' },
]

function subjectLabel(conceptId: string): string {
  const prefix = conceptId.split('.')[0]
  return SUBJECT_PREFIXES.find(s => s.prefix === prefix)?.label ?? prefix
}

const STATUS_COLORS: Record<string, string> = {
  DRAFT:      '#888',
  REVIEW:     'var(--candy-blue, #3B9EFF)',
  ACTIVE:     'var(--green)',
  DEPRECATED: 'var(--candy-orange, #FF9600)',
  RETIRED:    '#F85149',
}

const AUTHOR_COLORS: Record<string, string> = {
  HUMAN_CURATOR:      'var(--green)',
  AI_AUTHORED:        'var(--candy-blue, #3B9EFF)',
  AI_AUTHORED_REVIEWED: 'var(--candy-purple, #8B5CF6)',
  IMPORTED:           '#888',
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
      textTransform: 'uppercase', letterSpacing: '0.04em',
      background: `${color}22`, color,
    }}>
      {text}
    </span>
  )
}

type SearchParams = {
  family?:     string
  status?:     string
  q?:          string
  authorKind?: string
  subject?:    string
}

export default async function AdminKnowledgeAssetsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const {
    family     = 'explanation',
    status     = 'DRAFT',
    q          = '',
    authorKind = 'all',
    subject    = 'all',
  } = await searchParams

  const familyEnum = family === 'probe' ? AssetFamily.PROBE : AssetFamily.EXPLANATION

  const where: Record<string, unknown> = {
    family: familyEnum,
    ...(status !== 'all' ? { status: status as AssetStatus } : {}),
    ...(authorKind !== 'all' ? { authorKind: authorKind as AuthorKind } : {}),
    ...(subject !== 'all' ? { conceptId: { startsWith: subject + '.' } } : {}),
    ...(q ? {
      OR: [
        { conceptId:     { contains: q, mode: 'insensitive' } },
        { canonicalSlug: { contains: q, mode: 'insensitive' } },
      ],
    } : {}),
  }

  const [assets, statusCounts] = await Promise.all([
    prisma.assetIdentity.findMany({
      where,
      include: { explanationAsset: true, probeAsset: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    }),
    prisma.assetIdentity.groupBy({ by: ['status', 'family'], _count: true }),
  ])

  // Counts for the selected family
  const counts: Record<string, number> = {}
  for (const row of statusCounts) {
    if (row.family === familyEnum) counts[row.status] = row._count
  }

  const familyLabel = family === 'probe' ? 'Probe' : 'Explanation'

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--candy-ink)', margin: 0 }}>
          Knowledge Assets
        </h1>
        <p style={{ fontSize: 13, color: 'var(--candy-ink-soft)', marginTop: 3 }}>
          Review, approve, and manage Explanation &amp; Probe assets (ADR 14 / Wave 0)
        </p>
      </div>

      {/* Status counts */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {(['DRAFT','REVIEW','ACTIVE','DEPRECATED','RETIRED'] as const).map(s => (
          <div key={s} style={{
            padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700,
            background: status === s ? `${STATUS_COLORS[s]}22` : 'var(--candy-card)',
            border: `1px solid ${status === s ? STATUS_COLORS[s] + '66' : 'var(--candy-shadow)'}`,
            color: STATUS_COLORS[s],
          }}>
            {s} · {counts[s] ?? 0}
          </div>
        ))}
      </div>

      {/* Filters */}
      <form style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Search concept ID or slug…"
          style={{
            fontSize: 13, padding: '6px 10px', borderRadius: 8, height: 34, width: 240,
            border: '1px solid var(--candy-shadow)', background: 'var(--candy-card)',
            color: 'var(--candy-ink)',
          }}
        />
        <select name="family" defaultValue={family}
          style={{ fontSize: 13, padding: '6px 8px', borderRadius: 8, height: 34, border: '1px solid var(--candy-shadow)', background: 'var(--candy-card)', color: 'var(--candy-ink)' }}>
          <option value="explanation">Explanation</option>
          <option value="probe">Probe</option>
        </select>
        <select name="status" defaultValue={status}
          style={{ fontSize: 13, padding: '6px 8px', borderRadius: 8, height: 34, border: '1px solid var(--candy-shadow)', background: 'var(--candy-card)', color: 'var(--candy-ink)' }}>
          <option value="all">All statuses</option>
          <option value="DRAFT">DRAFT</option>
          <option value="REVIEW">REVIEW</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="DEPRECATED">DEPRECATED</option>
          <option value="RETIRED">RETIRED</option>
        </select>
        <select name="subject" defaultValue={subject}
          style={{ fontSize: 13, padding: '6px 8px', borderRadius: 8, height: 34, border: '1px solid var(--candy-shadow)', background: 'var(--candy-card)', color: 'var(--candy-ink)' }}>
          <option value="all">All subjects</option>
          {SUBJECT_PREFIXES.map(s => <option key={s.prefix} value={s.prefix}>{s.label}</option>)}
        </select>
        <select name="authorKind" defaultValue={authorKind}
          style={{ fontSize: 13, padding: '6px 8px', borderRadius: 8, height: 34, border: '1px solid var(--candy-shadow)', background: 'var(--candy-card)', color: 'var(--candy-ink)' }}>
          <option value="all">All authors</option>
          <option value="HUMAN_CURATOR">Human curator</option>
          <option value="AI_AUTHORED">AI authored</option>
          <option value="AI_AUTHORED_REVIEWED">AI + reviewed</option>
          <option value="IMPORTED">Imported</option>
        </select>
        <button type="submit" style={{
          fontSize: 13, fontWeight: 700, padding: '6px 16px', borderRadius: 8, height: 34,
          background: 'var(--candy-purple, #8B5CF6)', color: '#fff', border: 'none', cursor: 'pointer',
        }}>Filter</button>
      </form>

      {/* Bulk subject operations */}
      {status === 'DRAFT' && (
        <div style={{ marginBottom: 20, padding: '12px 16px', borderRadius: 10, border: '1px solid var(--candy-shadow)', background: 'var(--candy-card)' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--candy-ink-soft)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Bulk Subject Activation
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {SUBJECT_PREFIXES.map(s => (
              <BulkApproveButton key={s.prefix} subjectPrefix={s.prefix} label={s.label} />
            ))}
          </div>
        </div>
      )}

      {/* Asset table */}
      <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', marginBottom: 8 }}>
        {assets.length} {familyLabel.toLowerCase()} asset{assets.length !== 1 ? 's' : ''} (max 200 shown)
      </p>

      {assets.length === 0 && (
        <div style={{ padding: '32px 0', textAlign: 'center', fontSize: 14, color: 'var(--candy-ink-soft)' }}>
          No assets found for the current filters.
        </div>
      )}

      {assets.length > 0 && (
        <div style={{ borderRadius: 12, border: '1px solid var(--candy-shadow)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
                {['Concept ID', 'Subject', 'Status', 'Author', 'Grade', 'Lang', 'v', 'Content preview', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--candy-ink-soft)', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assets.map((a, i) => {
                const content = a.explanationAsset?.content ?? a.probeAsset?.stem ?? ''
                const preview = content.length > 90 ? content.slice(0, 90) + '…' : content
                const familyStr = a.family === AssetFamily.PROBE ? 'probe' : 'explanation'
                return (
                  <tr key={a.assetId} style={{ borderTop: i > 0 ? '1px solid var(--candy-shadow)' : undefined }}>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--candy-ink)', whiteSpace: 'nowrap', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <span title={a.conceptId}>{a.conceptId}</span>
                    </td>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                      <Badge text={subjectLabel(a.conceptId)} color="var(--candy-blue, #3B9EFF)" />
                    </td>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                      <Badge text={a.status} color={STATUS_COLORS[a.status] ?? '#888'} />
                    </td>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                      <Badge text={a.authorKind.replace('_', ' ').toLowerCase()} color={AUTHOR_COLORS[a.authorKind] ?? '#888'} />
                    </td>
                    <td style={{ padding: '8px 12px', color: 'var(--candy-ink-soft)', whiteSpace: 'nowrap' }}>{a.gradeBand}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--candy-ink-soft)', whiteSpace: 'nowrap' }}>{a.language}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--candy-ink-soft)', whiteSpace: 'nowrap' }}>{a.version}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--candy-ink-soft)', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <span title={content}>{preview || '—'}</span>
                    </td>
                    <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                      <AssetActions
                        assetId={a.assetId}
                        family={familyStr}
                        status={a.status as 'DRAFT' | 'REVIEW' | 'ACTIVE' | 'DEPRECATED' | 'RETIRED'}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <p style={{ marginTop: 16, fontSize: 11, color: 'var(--candy-ink-soft)' }}>
        Blueprint refs: open{' '}
        <code style={{ fontFamily: 'monospace' }}>docs/curriculum/blueprints/&lt;conceptId&gt;.md</code>{' '}
        · Educational Brain: <code style={{ fontFamily: 'monospace' }}>educational-brain/concepts/&lt;subject&gt;/&lt;conceptId&gt;.md</code>
      </p>
    </div>
  )
}

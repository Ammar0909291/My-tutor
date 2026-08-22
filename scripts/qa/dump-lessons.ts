/**
 * List a subject's live lessons (optionally filtered), so verification targets
 * the REAL lessonOrder/topicSlug the product serves rather than a guessed one.
 * Run: NODE_USE_ENV_PROXY=1 npx tsx scripts/qa/dump-lessons.ts <subject> [needle]
 */
import { createQaAccount, deleteQaAccount, BASE } from './liveAccount'
async function main() {
  const subject = process.argv[2] ?? 'physics'
  const needle = (process.argv[3] ?? '').toLowerCase()
  const acct = await createQaAccount('dump')
  try {
    const res = await fetch(`${BASE}/api/curriculum?subject=${subject}`, { headers: { cookie: acct.cookie } })
    const b = await res.json() as { lessons?: Array<Record<string, unknown>> }
    const ls = b.lessons ?? []
    console.log(`lessons: ${ls.length}`)
    for (const l of ls) {
      const t = String(l.lessonTitle ?? '')
      if (!needle || t.toLowerCase().includes(needle)) {
        console.log(`  order=${String(l.order)} topicSlug=${String(l.topicSlug)} title=${t} unit=${String(l.unitTitle ?? '')}`)
      }
    }
  } finally {
    const d = await deleteQaAccount(acct); console.log(`cleanup: deleted=${d.deleted} reloginBlocked=${d.reloginBlocked}`)
  }
}
main().catch(e => { console.error('FAILED:', e.message); process.exit(1) })

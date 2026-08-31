/**
 * TRIAGE THE EXPLANATION DRAFT QUEUE.
 *
 * ── THE PROBLEM THIS ANSWERS ────────────────────────────────────────────────
 * `captureGeneratedExplanation` writes a DRAFT after EVERY successful LLM turn,
 * and `/admin/knowledge-assets` presents the result as a review queue with an
 * Approve button per row. Measured against production on 2026-08-30:
 *
 *   ACTIVE   1,592   all HUMAN_CURATOR, 683 concepts   <- served to learners
 *   DRAFT    4,759   all AI_AUTHORED,   426 concepts   <- never served
 *
 * A queue is only a queue if someone can finish it. 4,759 rows growing by
 * ~600/day under test load, at the yield measured below, is not a workflow —
 * and reading the rows shows why. A DRAFT is whatever the tutor said on some
 * turn, so most of them are turn-scoped by construction: praise for an answer
 * ("You got it — great job spotting the leading zero"), a reply to a tap ("You
 * chose B — that means you're saying..."), a question, a worked example using
 * numbers from that one session, or an ASCII sketch. Served to a different
 * learner as "the explanation" for a concept, those are nonsense.
 *
 * ── WHAT THIS SCRIPT DOES ───────────────────────────────────────────────────
 * Classifies every DRAFT and reports the split. With --apply it moves the
 * clearly-unusable ones to DEPRECATED, a state the schema already has, so the
 * admin queue shows only plausible candidates.
 *
 * NOTHING IS DELETED, EVER. DEPRECATED is reversible and keeps the provenance;
 * a mistake here costs a status flip, not a corpus. There is no delete path in
 * this file on purpose.
 *
 *   npx tsx scripts/assets/triageExplanationDrafts.ts            # report only
 *   npx tsx scripts/assets/triageExplanationDrafts.ts --sample   # + examples
 *   npx tsx scripts/assets/triageExplanationDrafts.ts --apply    # writes
 *
 * ── WHY NOT JUST TIGHTEN CAPTURE AND LEAVE THE BACKLOG ──────────────────────
 * Both are needed and they are different jobs. Tightening capture stops the
 * inflow; it cannot reach 4,759 rows already written. This is the backlog half.
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Each rule is a MEASURED failure mode, not a style preference, and each says
 * what it is protecting against. A rule that only makes text "nicer" does not
 * belong here — the cost of a false positive is a good explanation buried.
 */
const RULES: { id: string; why: string; test: (c: string) => boolean }[] = [
  {
    id: 'praise-reply',
    why: 'Congratulates an answer. Replayed, it congratulates a learner who never answered.',
    test: (c) => /\b(that'?s right|that'?s correct|you got it|well done|great job|nice work|exactly!|correct!|you nailed it|spot on)\b/i.test(c),
  },
  {
    id: 'addresses-this-turn',
    why: 'Refers to something only that learner did on that turn.',
    test: (c) => /\b(you'?re pointing|you (?:just )?(?:said|chose|picked|selected|wrote)|your answer|how did you (?:decide|arrive|work|figure)|what made you think)\b/i.test(c),
  },
  {
    id: 'session-discourse',
    why: 'Conversation management — meaningless outside the exchange that produced it.',
    test: (c) => /\b(good question|great question|now,? back to|let'?s (?:get |head |go )?back to|as (?:i|we) (?:mentioned|said|explained) (?:earlier|before)|to answer your question)\b/i.test(c),
  },
  {
    id: 'is-a-question',
    why: 'A question is a probe, not an explanation. It belongs to the PROBE family or nowhere.',
    test: (c) => /\?\s*$/.test(c.trim()) || /^(what|which|why|how|can you|do you|is it|are the)\b/i.test(c.trim()),
  },
  {
    id: 'ascii-figure',
    why: 'A text sketch stands in for a diagram the engine can now draw properly.',
    test: (c) => /```/.test(c) || /[─│┌┐└┘├┤▲▼]/.test(c),
  },
  {
    id: 'too-short',
    why: 'A fragment of a turn. Below 200 characters there is no explanation to reuse.',
    test: (c) => c.trim().length < 200,
  },
  {
    id: 'learner-name',
    why: 'Verbatim learner identity inside a SHARED asset. Historical — the capture gate now blocks these — but any still sitting in the queue must never be approvable.',
    test: (c) => /\b(mohammad|suaib)\b/i.test(c),
  },
]

async function main() {
  const apply = process.argv.includes('--apply')
  const sample = process.argv.includes('--sample')

  const drafts = await prisma.assetIdentity.findMany({
    where: { family: 'EXPLANATION', status: 'DRAFT' },
    select: { assetId: true, conceptId: true, version: true, explanationAsset: { select: { content: true } } },
  })

  const counts = new Map<string, number>(RULES.map((r) => [r.id, 0]))
  const examples = new Map<string, string>()
  const rejected: string[] = []
  const kept: { conceptId: string; content: string }[] = []

  for (const d of drafts) {
    const content = d.explanationAsset?.content ?? ''
    const hit = RULES.filter((r) => r.test(content))
    if (hit.length === 0) { kept.push({ conceptId: d.conceptId, content }); continue }
    rejected.push(d.assetId)
    for (const r of hit) {
      counts.set(r.id, (counts.get(r.id) ?? 0) + 1)
      if (!examples.has(r.id)) examples.set(r.id, content.replace(/\s+/g, ' ').slice(0, 110))
    }
  }

  console.log(`DRAFT explanations: ${drafts.length}`)
  console.log(`  not reusable    : ${rejected.length} (${Math.round((100 * rejected.length) / drafts.length)}%)`)
  console.log(`  plausible       : ${kept.length} (${Math.round((100 * kept.length) / drafts.length)}%)\n`)
  console.log('by rule (a draft can trip several):')
  for (const r of RULES) {
    console.log(`  ${r.id.padEnd(22)} ${String(counts.get(r.id)).padStart(5)}   ${r.why}`)
    if (sample && examples.has(r.id)) console.log(`      e.g. ${JSON.stringify(examples.get(r.id))}`)
  }

  if (sample) {
    console.log('\nplausible candidates, at random:')
    for (const k of kept.sort(() => Math.random() - 0.5).slice(0, 5)) {
      console.log(`  [${k.conceptId}] ${k.content.replace(/\s+/g, ' ').slice(0, 150)}`)
    }
  }

  if (!apply) {
    console.log('\nReport only. Re-run with --apply to move the not-reusable rows to DEPRECATED.')
    console.log('Nothing is ever deleted; DEPRECATED is reversible and keeps provenance.')
    return
  }

  // Batched, so one oversized statement cannot fail the whole triage.
  let done = 0
  for (let i = 0; i < rejected.length; i += 500) {
    const batch = rejected.slice(i, i + 500)
    const r = await prisma.assetIdentity.updateMany({
      where: { assetId: { in: batch } },
      data: { status: 'DEPRECATED', deprecationReason: 'triage: not reusable as a shared explanation' },
    })
    done += r.count
    console.log(`  deprecated ${done}/${rejected.length}`)
  }
  console.log(`\nDone. ${kept.length} drafts remain in the review queue.`)
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1 })
  .finally(() => prisma.$disconnect())

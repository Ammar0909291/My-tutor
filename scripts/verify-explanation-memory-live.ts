/**
 * LIVE runtime verification — P0 Explanation Memory routing fix.
 *
 * Not static analysis. Calls the REAL production functions
 * (buildStudentState, assembleLesson -> findBestExplanation -> scoreMatch)
 * against a REAL Postgres database seeded via the REAL seed script
 * (scripts/brain/seed-knowledge-assets.ts). No mocks, no stubs.
 *
 * Run: DATABASE_URL=... DIRECT_URL=... npx tsx scripts/verify-explanation-memory-live.ts
 */
import { PrismaClient } from '@prisma/client'
import { buildStudentState, assembleLesson } from '../src/lib/teaching/assets'
import { getKnowledgeGraph } from '../src/lib/curriculum/knowledgeGraph'

const prisma = new PrismaClient()

interface Sample {
  subject: 'physics' | 'english'
  conceptId: string
  message: string
  gradeSignal: 'grade10' | 'library-no-grade'
}

function pickSamples(subject: 'physics' | 'english', n: number): Sample[] {
  const graph = getKnowledgeGraph(subject)!
  const nodes = graph.modules.flatMap((m) => m.nodes)
  const step = Math.floor(nodes.length / n)
  const out: Sample[] = []
  for (let i = 0; i < n; i++) {
    const node = nodes[i * step]
    out.push({
      subject,
      conceptId: node.slug,
      message: `Can you explain ${node.title}?`,
      gradeSignal: i % 2 === 0 ? 'library-no-grade' : 'grade10',
    })
  }
  return out
}

async function main() {
  const samples = [...pickSamples('physics', 10), ...pickSamples('english', 10)]

  console.log('LESSON | SUBJECT | CONCEPT_ID | RESOLVED | ASSET_FOUND | CONFIDENCE | PROVIDER | GROQ_CALLED')
  console.log('-'.repeat(120))

  let memoryServed = 0
  let groqWouldBeCalled = 0
  const results: any[] = []

  for (const s of samples) {
    const grade = s.gradeSignal === 'grade10' ? 10 : null

    const state = buildStudentState({
      conceptId: s.conceptId,
      subjectSlug: s.subject,
      teachingLanguage: 'en',
      grade,
      currentLevel: null,
      targetLevel: null,
      userMessage: s.message,
    })

    const assembled = await assembleLesson(state)

    const provider = assembled ? 'memory' : 'groq(would-be-called)'
    if (assembled) memoryServed++
    else groqWouldBeCalled++

    results.push({
      subject: s.subject,
      conceptId: s.conceptId,
      message: s.message,
      gradeBand: state.gradeBand,
      assetFound: !!assembled,
      confidence: assembled?.explanationConfidence ?? null,
      assetIds: assembled?.usedAssetIds ?? [],
      provider,
    })

    console.log(
      `${s.message.padEnd(45)} | ${s.subject.padEnd(8)} | ${s.conceptId.padEnd(35)} | ` +
      `gradeBand=${state.gradeBand.padEnd(13)} | ${(!!assembled).toString().padEnd(11)} | ` +
      `${(assembled?.explanationConfidence?.toFixed(3) ?? 'n/a').padEnd(10)} | ${provider.padEnd(22)} | ${(!assembled).toString()}`
    )
  }

  console.log('-'.repeat(120))
  console.log(`TOTAL: ${samples.length} | memory=${memoryServed} (${((memoryServed/samples.length)*100).toFixed(1)}%) | groq=${groqWouldBeCalled} (${((groqWouldBeCalled/samples.length)*100).toFixed(1)}%)`)

  const physResults = results.filter((r) => r.subject === 'physics')
  const engResults = results.filter((r) => r.subject === 'english')
  console.log(`PHYSICS: memory=${physResults.filter(r=>r.assetFound).length}/${physResults.length}`)
  console.log(`ENGLISH: memory=${engResults.filter(r=>r.assetFound).length}/${engResults.length}`)

  console.log('\n=== SPECIFIC PROMPTS FROM THE TICKET ===')
  const specific = [
    { subject: 'english' as const, conceptId: 'eng.grammar.nouns', message: 'What is a noun?' },
    { subject: 'physics' as const, conceptId: 'phys.mech.newtons-first-law', message: "Explain Newton's First Law." },
    { subject: 'physics' as const, conceptId: 'phys.mech.velocity', message: 'What is velocity?' },
    { subject: 'english' as const, conceptId: 'eng.grammar.adjectives', message: 'What is an adjective?' },
  ]
  for (const q of specific) {
    // Resolve the real concept id by searching the KG for a plausible match
    // if the guessed slug above doesn't exist.
    const graph = getKnowledgeGraph(q.subject)
    const nodes = graph ? graph.modules.flatMap((m) => m.nodes) : []
    const exists = nodes.find((n) => n.slug === q.conceptId)
    const conceptId = exists ? q.conceptId : (nodes.find((n) =>
      n.title.toLowerCase().includes(q.message.toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter(w=>w.length>3).slice(-1)[0] ?? '')
    )?.slug ?? q.conceptId)

    const state = buildStudentState({
      conceptId, subjectSlug: q.subject, teachingLanguage: 'en',
      grade: null, currentLevel: null, targetLevel: null, userMessage: q.message,
    })
    const assembled = await assembleLesson(state)
    console.log(`"${q.message}" -> conceptId=${conceptId} provider=${assembled ? 'memory' : 'groq'} confidence=${assembled?.explanationConfidence ?? 'n/a'}`)
  }

  await prisma.$disconnect()
}

main().catch((e) => { console.error(e); process.exit(1) })

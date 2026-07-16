/**
 * Evidence Loop report CLI — reads the existing evidence tables and prints
 * the deterministic authoring-feedback + per-package feedback reports.
 *
 *   npm run evidence:report                      # full report to stdout
 *   npm run evidence:report -- --since 2026-07-01
 *   npm run evidence:report -- --package phys.therm.entropy
 *   npm run evidence:report -- --out docs/evidence-reports   # write files
 *
 * Read-only: never writes to the database, never edits packages or
 * blueprints. Requires DATABASE_URL (run against a live/local DB).
 */
import fs from 'fs'
import path from 'path'
import {
  loadEvidenceCorpus, readLessonEvidence, computeLearningAnalytics,
  buildAuthoringFeedback, renderAuthoringFeedbackMarkdown,
  buildPackageFeedback, renderPackageFeedbackMarkdown,
  artifactPackageInspector,
} from '../../src/lib/teaching/evidence'

async function main(): Promise<void> {
  const args = process.argv.slice(2).filter((a) => a !== '--')
  const flag = (name: string): string | null => {
    const i = args.indexOf(`--${name}`)
    return i !== -1 && args[i + 1] ? args[i + 1] : null
  }
  const since = flag('since')
  const onlyPackage = flag('package')
  const outDir = flag('out')

  const corpus = await loadEvidenceCorpus({ since: since ? new Date(since) : undefined })
  const lessons = readLessonEvidence(corpus)
  const analytics = computeLearningAnalytics(lessons)
  const authoring = buildAuthoringFeedback(analytics, lessons, artifactPackageInspector)
  const packages = buildPackageFeedback(lessons, artifactPackageInspector)
    .filter((p) => !onlyPackage || p.conceptId === onlyPackage)

  const authoringMd = renderAuthoringFeedbackMarkdown(authoring)
  const packageMds = packages.map((p) => ({ conceptId: p.conceptId, md: renderPackageFeedbackMarkdown(p) }))

  if (outDir) {
    fs.mkdirSync(path.join(process.cwd(), outDir), { recursive: true })
    fs.writeFileSync(path.join(process.cwd(), outDir, 'AUTHORING_FEEDBACK.md'), authoringMd)
    for (const p of packageMds) {
      fs.writeFileSync(path.join(process.cwd(), outDir, `${p.conceptId}.feedback.md`), p.md)
    }
    console.log(`wrote ${outDir}/AUTHORING_FEEDBACK.md + ${packageMds.length} package feedback file(s)`)
  } else {
    console.log(authoringMd)
    for (const p of packageMds) console.log(p.md)
  }

  console.log(`— evidence base: ${lessons.length} lessons, ${analytics.conceptsSeen} concepts, ${corpus.events.length} raw events`)
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })

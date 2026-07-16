/**
 * Efficacy Study Report Generator (Claude Recommendation #11, Phase 5 entry
 * point). Loads real evidence for an operator-supplied, consented cohort,
 * runs the analysis pipeline, and writes all four report types to disk.
 *
 * This script NEVER invents a participant list, a date range, or any
 * data — every input comes from a config file the study operator supplies
 * (see docs/research/EFFICACY_STUDY_PROTOCOL.md §6/§10 for why the
 * participant list must be an explicit, consented allowlist rather than
 * "every user in the database").
 *
 * Usage:
 *   npx tsx scripts/generate-efficacy-report.ts <config.json> [outDir]
 *
 * config.json shape:
 *   {
 *     "participantUserIds": ["<real consented userIds>"],
 *     "studyStart": "2026-01-01T00:00:00Z",
 *     "studyEnd": "2026-06-01T00:00:00Z",
 *     "minLessonsPerLearner": 3,           // optional
 *     "subjects": ["physics"],              // optional
 *     "followUpWindow": {                    // optional (H4 retention trend)
 *       "start": "2026-06-01T00:00:00Z",
 *       "end": "2026-07-01T00:00:00Z"
 *     }
 *   }
 *
 * outDir defaults to ./efficacy-report-<studyEnd date>/
 */
import fs from 'fs'
import path from 'path'
import { loadEfficacyStudyReport, type StudyEligibilityCriteria } from '../src/lib/research/efficacyAnalysis'
import {
  renderResearcherReport, renderEducatorReport, renderExecutiveSummary, renderRawMetricsExport,
} from '../src/lib/research/reportGeneration'

interface ConfigFile {
  participantUserIds: string[]
  studyStart: string
  studyEnd: string
  minLessonsPerLearner?: number
  subjects?: string[]
  followUpWindow?: { start: string; end: string }
}

async function main() {
  const configPath = process.argv[2]
  if (!configPath) {
    console.error('Usage: npx tsx scripts/generate-efficacy-report.ts <config.json> [outDir]')
    process.exit(1)
  }

  const raw = fs.readFileSync(path.resolve(configPath), 'utf-8')
  const config = JSON.parse(raw) as ConfigFile

  if (!Array.isArray(config.participantUserIds) || config.participantUserIds.length === 0) {
    console.error('config.participantUserIds must be a non-empty array of real, consented user IDs — refusing to run against an implicit "everyone" cohort.')
    process.exit(1)
  }

  const criteria: StudyEligibilityCriteria = {
    participantUserIds: config.participantUserIds,
    studyStart: new Date(config.studyStart),
    studyEnd: new Date(config.studyEnd),
    minLessonsPerLearner: config.minLessonsPerLearner,
    subjects: config.subjects,
  }

  const report = await loadEfficacyStudyReport({
    criteria,
    followUpWindow: config.followUpWindow
      ? { start: new Date(config.followUpWindow.start), end: new Date(config.followUpWindow.end) }
      : undefined,
  })

  const outDir = process.argv[3] ?? path.join(process.cwd(), `efficacy-report-${config.studyEnd.slice(0, 10)}`)
  fs.mkdirSync(outDir, { recursive: true })

  const raw_export = renderRawMetricsExport(report)
  fs.writeFileSync(path.join(outDir, 'researcher-report.md'), renderResearcherReport(report))
  fs.writeFileSync(path.join(outDir, 'educator-report.md'), renderEducatorReport(report))
  fs.writeFileSync(path.join(outDir, 'executive-summary.md'), renderExecutiveSummary(report))
  fs.writeFileSync(path.join(outDir, 'raw-metrics.json'), raw_export.json)
  fs.writeFileSync(path.join(outDir, 'raw-metrics.csv'), raw_export.csv)

  console.log(`Efficacy study report written to ${outDir}`)
  console.log(`Cohort: ${report.cohort.participantsIncluded} included, ${report.cohort.participantsExcluded} excluded, ${report.cohort.totalLessons} lessons analyzed.`)
  if (report.caveats.length > 0) {
    console.log('Caveats:')
    for (const c of report.caveats) console.log(`  - ${c}`)
  }
}

main().catch((err) => {
  console.error('Efficacy report generation failed:', err)
  process.exit(1)
})

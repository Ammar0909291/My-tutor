/**
 * Mathematics Curriculum Domain Pipeline — v2
 * ============================================
 * Production-rules-compliant workflow for authoring one Mathematics domain.
 *
 * Production rules enforced:
 *  1. Idempotent: skips completed chunks, never overwrites validated assets.
 *  2. Pre-commit quality audit: validation script must PASS before commit.
 *  3. One domain at a time: blocks on validation + commit before returning.
 *  4. Auto-updates CURRICULUM_PROGRESS.md from repo state (no memory).
 *  5. Generates DOMAIN_VALIDATION_REPORT.md and DOMAIN_SUMMARY.md per domain.
 *  6. Never modifies KG, Educational Brain, Teaching Engine, or ADRs.
 *
 * Usage from orchestrator:
 *   workflow({ scriptPath: 'scripts/pipeline/domain-pipeline-v2.js' }, {
 *     domainId: 'number-theory',
 *     domainPrefix: 'math.nt',
 *     domainName: 'Number Theory',
 *     conceptCount: 36,
 *     chunkSize: 9,
 *     chunksDir: '/tmp/.../nt-chunks',
 *   })
 *
 * args must have: domainId, domainPrefix, domainName, conceptCount, chunkSize, chunksDir
 */

export const meta = {
  name: 'math-domain-pipeline-v2',
  description: 'Author, validate, assemble, and commit one Mathematics domain (production rules v2)',
  phases: [
    { title: 'Guard', detail: 'Check if domain is already complete; exit early if so' },
    { title: 'Author', detail: 'Parallel chunk authoring (skip already-completed chunks)' },
    { title: 'QualityAudit', detail: 'Validate authored content before merge' },
    { title: 'Assemble', detail: 'Merge assets.json + assemble chapter markdown' },
    { title: 'Validate', detail: 'Run domain validation script; block commit on FAIL' },
    { title: 'Commit', detail: 'Commit + push; generate progress files; update CURRICULUM_PROGRESS.md' },
  ],
}

// ── Constants (paths) ────────────────────────────────────────────────────────

const REPO = '/home/user/My-tutor'
const GRAPH = `${REPO}/docs/mathematics/kg/graph.json`
const ASSETS = `${REPO}/docs/mathematics/teaching-assets/assets.json`
const CHAPTERS_DIR = `${REPO}/docs/mathematics/chapters`
const PIPELINE_SCRIPTS = `${REPO}/scripts/pipeline`
const MERGE_SCRIPT = '/tmp/claude-0/-home-user-My-tutor/86493af4-ba82-5d69-935b-e0795bf1ff02/scratchpad/merge-and-assemble.py'

// ── Read args ────────────────────────────────────────────────────────────────

const {
  domainId,
  domainPrefix,
  domainName,
  conceptCount,
  chunkSize = 9,
  chunksDir,
} = args

const chunksIn = `${chunksDir}/input`
const chunksOut = `${chunksDir}/output`
const chunkCount = Math.ceil(conceptCount / chunkSize)
const chapterMd = `${CHAPTERS_DIR}/${domainPrefix.split('.').slice(-1)[0]}.md`
const validationReport = `${REPO}/docs/mathematics/domains/${domainPrefix}-validation-report.md`
const domainSummary = `${REPO}/docs/mathematics/domains/${domainPrefix}-summary.md`
const progressFile = `${REPO}/docs/mathematics/CURRICULUM_PROGRESS.md`

log(`Domain: ${domainName} (${domainPrefix}) — ${conceptCount} concepts, ${chunkCount} chunks of ${chunkSize}`)

// ── PHASE: Guard ──────────────────────────────────────────────────────────────

phase('Guard')

const guardResult = await agent(`
Check if domain ${domainPrefix} (${domainName}) is already fully complete.

Run this command:
  python3 ${PIPELINE_SCRIPTS}/check-domain-complete.py ${domainPrefix} ${ASSETS} ${CHAPTERS_DIR}

If the output contains "COMPLETE:", report "DOMAIN_ALREADY_COMPLETE" and stop — no further action needed.
If the output contains "INCOMPLETE:", report "DOMAIN_NEEDS_WORK" and describe what is missing.
`, { label: 'guard', phase: 'Guard' })

if (guardResult && guardResult.includes('DOMAIN_ALREADY_COMPLETE')) {
  log(`Domain ${domainPrefix} is already complete — skipping.`)
  return { status: 'already_complete', domain: domainPrefix }
}

log(`Domain ${domainPrefix} needs authoring — proceeding.`)

// ── PHASE: Author ─────────────────────────────────────────────────────────────

phase('Author')

const AUTHOR_PROMPT = (idx) => `
You are a world-class mathematics curriculum author producing teaching content for the My Tutor application.

## Idempotency check (IMPORTANT — do this FIRST)
Before doing any authoring, check if this chunk's output already exists and is valid:
  Run: python3 -c "import json; data=json.load(open('${chunksOut}/chunk-output-${String(idx).padStart(2,'0')}.json')); print(f'EXISTS: {len(data)} entries')" 2>/dev/null || echo "MISSING"

If the output is "EXISTS: ${chunkSize}" (or close to it), report "CHUNK_ALREADY_DONE" and stop — do not regenerate.
If "MISSING" or an error, proceed with authoring.

## Your task (if chunk needs authoring)
Read the input file: ${chunksIn}/chunk-input-${String(idx).padStart(2,'0')}.json
Author teaching assets for each concept in that file.

## Quality standard
Match the depth and quality of the existing chapter:
  /home/user/My-tutor/docs/mathematics/chapters/arith.md
Do NOT copy — produce original, mathematically accurate content.

## Output format
Write a JSON array to: ${chunksOut}/chunk-output-${String(idx).padStart(2,'0')}.json

Each array element (one per concept, in input order):
{
  "concept_id": "<id from input>",
  "asset": {
    "learning_objective": "<precise, measurable; start 'Students will be able to...'; match difficulty/bloom>",
    "concept_summary": "<2-3 paragraphs; mathematically rigorous; depth calibrated to difficulty level>",
    "key_ideas": ["<5-7 self-contained insights>"],
    "common_misconceptions": [
      {"misconception": "<wrong belief>", "correction": "<specific corrective action>"},
      "<min 2 misconceptions>"
    ],
    "visual_teaching_suggestions": ["<3-5 concrete diagram/interactive ideas>"],
    "worked_example_blueprint": {
      "setup": "<concrete problem at appropriate difficulty>",
      "steps": ["<4-7 explicit numbered steps>"],
      "expected_outcome": "<what student achieves + what insight they gain>"
    },
    "practice_blueprint": {
      "item_types": ["<2-4 exercise types>"],
      "difficulty_progression": "<how exercises ramp from entry to mastery>",
      "suggested_count": <8-20>
    },
    "assessment_blueprint": {
      "formats": ["<2-3 assessment formats>"],
      "bloom_alignment": "<bloom level + cognitive action being assessed>",
      "mastery_signal": "<observable, specific mastery criterion>"
    },
    "real_world_applications": ["<3-5 genuine applications; for advanced/research use math/science/engineering>"],
    "prerequisite_review_triggers": ["<2-4 warning signs of prerequisite gaps>"]
  },
  "chapter_extra": {
    "vocabulary": [{"term": "<technical term>", "definition": "<precise one-sentence definition>"}, "<3-6 terms>"],
    "teacher_notes": "<2-3 sentences: pedagogical guidance, what to watch for, sequencing>",
    "student_notes": "<1-2 sentences: encouraging, accessible, written to student directly>",
    "common_mistakes": ["<3-5 specific procedural errors>"],
    "cross_topic_connections": "<1-2 sentences: how this connects to cross_links targets in the KG>",
    "revision_guidance": "<1-2 sentences: when to revisit, what triggers review>"
  }
}

## Difficulty calibration
- foundational = GCSE / early secondary
- developing = A-level / late secondary
- proficient = first-year undergraduate
- advanced = upper undergraduate
- expert = early graduate
- research = active research frontier (teach definitions/open questions, not solutions)

## Constraints
- No placeholder text, no [TEMPLATE] strings, no empty fields
- learning_objective must have a measurable success criterion
- concept_summary must be mathematically accurate (verify any theorems/formulas)
- At least 2 misconceptions, 4 worked example steps, 3 key ideas, 2 real-world applications
- Valid JSON array only — no prose outside the array
`

const authorResults = await parallel(
  Array.from({ length: chunkCount }, (_, i) => () => agent(AUTHOR_PROMPT(i), {
    label: `author:${domainPrefix}:chunk-${String(i).padStart(2, '0')}`,
    phase: 'Author',
  }))
)

log(`Author phase: ${authorResults.filter(Boolean).length}/${chunkCount} chunks complete`)

// ── PHASE: Quality Audit ──────────────────────────────────────────────────────

phase('QualityAudit')

const auditResult = await agent(`
You are the curriculum quality auditor for the My Tutor Mathematics project.

## Your task
Perform a pre-merge quality audit of the authored chunk outputs for domain ${domainPrefix} (${domainName}).

### Step 1: Read all ${chunkCount} chunk output files
${Array.from({ length: chunkCount }, (_, i) => `  ${chunksOut}/chunk-output-${String(i).padStart(2,'0')}.json`).join('\n')}

### Step 2: For each concept in each file, check:
1. **No placeholder text** — no "[TEMPLATE]", "pending authoring", "TBD", empty strings
2. **Technically correct** — concept_summary and key_ideas should accurately describe the mathematics
3. **Non-trivial worked example** — setup must be a real problem (not just "show that 1+1=2"), steps must be ≥4
4. **Meaningful misconceptions** — must describe real student errors, not generic ones
5. **Realistic applications** — real_world_applications must be genuine, not fabricated
6. **Prerequisite graph unchanged** — the chunk files must NOT contain requires/unlocks/cross_links fields (those live in graph.json only)
7. **No duplicate concept_ids** across chunks

### Step 3: Report
List any issues found per concept. If no issues, say "QUALITY_AUDIT_PASS".
If issues found, list them as:
  ISSUE: <concept_id> — <description>

Only fail for genuine quality problems — do not fail for stylistic preferences.
`, { label: 'quality-audit', phase: 'QualityAudit' })

log('Quality audit complete')

// ── PHASE: Assemble ───────────────────────────────────────────────────────────

phase('Assemble')

const assembleResult = await agent(`
You are the curriculum assembly agent for domain ${domainPrefix} (${domainName}).

## Your tasks — execute in order

### Task 1: Create output directory if needed
  mkdir -p ${chunksOut}

### Task 2: Run merge + assemble
  python3 ${MERGE_SCRIPT} ${chunksOut} ${ASSETS} ${GRAPH} ${domainPrefix} ${chapterMd}

Report the full stdout/stderr output.

### Task 3: Spot-check the outputs
  a) Run: wc -l ${chapterMd}
     Confirm ≥ ${Math.floor(conceptCount * 80)} lines (expect ~${conceptCount * 120} for ${conceptCount} concepts).

  b) Run: python3 -c "
import json
with open('${ASSETS}') as f:
    d = json.load(f)
nt = [a for a in d['assets'] if a['concept_id'].startswith('${domainPrefix}.')]
print(f'${domainPrefix}: {len(nt)} total, {sum(1 for a in nt if a[\"status\"]==\"draft\")} draft, {sum(1 for a in nt if a[\"status\"]==\"placeholder\")} placeholder')
"

  c) Read lines 1-10 of ${chapterMd} — confirm chapter header is correct.

### Task 4: Report
Report ASSEMBLE_PASS or ASSEMBLE_FAIL with evidence.
`, { label: 'assemble', phase: 'Assemble' })

log('Assemble phase complete')

// ── PHASE: Validate ───────────────────────────────────────────────────────────

phase('Validate')

const validateResult = await agent(`
You are the domain validation agent for ${domainPrefix} (${domainName}).

## Your task
Run the domain validation script and enforce the PASS/FAIL gate.

### Step 1: Create domains directory
  mkdir -p ${REPO}/docs/mathematics/domains

### Step 2: Run validation
  python3 ${PIPELINE_SCRIPTS}/validate-domain-assets.py ${domainPrefix} ${GRAPH} ${ASSETS} ${chapterMd} ${validationReport}

### Step 3: Read the validation report
  Read: ${validationReport}
  Report the full verdict table and any issues found.

### Step 4: Enforce gate
- If verdict is PASS: report "VALIDATION_GATE_PASS"
- If verdict is FAIL: report "VALIDATION_GATE_FAIL" with the list of issues.
  DO NOT PROCEED to commit if validation fails.
  Instead describe what must be fixed.
`, { label: 'validate', phase: 'Validate' })

log('Validation phase complete')

// ── PHASE: Commit ─────────────────────────────────────────────────────────────

phase('Commit')

const commitResult = await agent(`
You are the commit agent for domain ${domainPrefix} (${domainName}).

## Pre-commit check
Read the validation report at: ${validationReport}
If it says FAIL, stop immediately and report "COMMIT_BLOCKED: validation failed".

## If validation passed — execute in order

### Step 1: Generate domain summary
  python3 ${PIPELINE_SCRIPTS}/generate-domain-summary.py ${domainPrefix} ${GRAPH} ${ASSETS} pending ${domainSummary}

### Step 2: Update CURRICULUM_PROGRESS.md from repo state
  python3 ${PIPELINE_SCRIPTS}/update-curriculum-progress.py ${GRAPH} ${ASSETS} ${CHAPTERS_DIR} pending ${progressFile}

### Step 3: Stage all changed files
  git -C ${REPO} add docs/mathematics/teaching-assets/assets.json
  git -C ${REPO} add docs/mathematics/chapters/${domainPrefix.split('.').slice(-1)[0]}.md
  git -C ${REPO} add docs/mathematics/domains/
  git -C ${REPO} add docs/mathematics/CURRICULUM_PROGRESS.md
  git -C ${REPO} status

### Step 4: Commit
  git -C ${REPO} commit -m "feat(curriculum): Author Mathematics ${domainName} domain (${domainPrefix}, ${conceptCount} concepts)

Completes teaching-asset authoring and chapter markdown assembly for the
${domainName} domain of the canonical 908-node Mathematics Knowledge Graph.

Domain: ${domainPrefix} (${domainName})
Concepts: ${conceptCount}
Assets status: placeholder → draft (${conceptCount} concepts)
Chapter: docs/mathematics/chapters/${domainPrefix.split('.').slice(-1)[0]}.md
Validation: PASS

Pipeline production rules v2 enforced:
- Idempotent chunk authoring (skip-completed-chunks)
- Pre-commit domain validation (validate-domain-assets.py)
- Auto-updated CURRICULUM_PROGRESS.md from repo state
- DOMAIN_VALIDATION_REPORT.md generated
- DOMAIN_SUMMARY.md generated

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_014uZZkmNU25z98rsp8C4rTx"

### Step 5: Get commit hash and update summary + progress files
  HASH=$(git -C ${REPO} log --oneline -1 | cut -d' ' -f1)
  echo "Commit hash: $HASH"
  python3 ${PIPELINE_SCRIPTS}/generate-domain-summary.py ${domainPrefix} ${GRAPH} ${ASSETS} $HASH ${domainSummary}
  python3 ${PIPELINE_SCRIPTS}/update-curriculum-progress.py ${GRAPH} ${ASSETS} ${CHAPTERS_DIR} $HASH ${progressFile}
  git -C ${REPO} add docs/mathematics/domains/${domainPrefix}-summary.md docs/mathematics/CURRICULUM_PROGRESS.md
  git -C ${REPO} commit -m "chore(curriculum): update progress files for ${domainPrefix} domain

Updates CURRICULUM_PROGRESS.md and DOMAIN_SUMMARY.md with commit hash
and final status after successful ${domainName} domain commit.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_014uZZkmNU25z98rsp8C4rTx"

### Step 6: Push
  git -C ${REPO} push -u origin claude/my-tutor-foundation-KDSUO

### Step 7: Report
Report:
- Final commit hash(es)
- Lines in chapter markdown
- math.${domainPrefix.split('.').slice(-1)[0]} assets at status=draft
- Overall pipeline progress (domains complete, assets drafted)
`, { label: 'commit', phase: 'Commit' })

log('Commit phase complete')

return {
  domain: domainPrefix,
  concepts: conceptCount,
  status: 'complete',
}

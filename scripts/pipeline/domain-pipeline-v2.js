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
Every concept you author will be learned by millions of students. Write accordingly.

## Idempotency check (IMPORTANT — do this FIRST)
Before doing any authoring, check if this chunk's output already exists and is valid:
  Run: python3 -c "import json; data=json.load(open('${chunksOut}/chunk-output-${String(idx).padStart(2,'0')}.json')); print(f'EXISTS: {len(data)} entries')" 2>/dev/null || echo "MISSING"

If the output is "EXISTS: ${chunkSize}" (or close to it), report "CHUNK_ALREADY_DONE" and stop — do not regenerate.
If "MISSING" or an error, proceed with authoring.

## Your task (if chunk needs authoring)
Read the input file: ${chunksIn}/chunk-input-${String(idx).padStart(2,'0')}.json

Each concept in the input has: id, name, description, difficulty, bloom, requires[], unlocks[], cross_links[], estimated_hours.

## Educational philosophy (non-negotiable)
1. **First-principles before formulas.** Begin every concept_summary by explaining WHY this concept
   exists — what problem it solves, what question it answers, what becomes impossible without it.
   Never lead with a formula or definition. The definition follows from the intuition.

2. **Conceptual understanding over procedural fluency.** A student who memorizes the quadratic
   formula but doesn't understand completing-the-square has learned nothing durable. Every
   concept_summary must build a mental model, not just state facts.

3. **Build toward downstream concepts.** Read the concept's \`unlocks\` array. The concept_summary's
   final paragraph and the teacher_notes must explicitly name 1-2 of those unlocked concepts and
   explain what becomes learnable once this concept is mastered. This is how curriculum forms a
   living knowledge graph in the student's mind.

4. **Research-backed misconceptions.** Common_misconceptions must describe genuine cognitive errors
   that students actually make — errors that have been documented in mathematics education research
   or that a thoughtful teacher would recognize immediately. Not surface-level mistakes like
   "forgetting a negative sign." Dig deeper: why does the wrong intuition feel right?

5. **Motivating, honest applications.** Real_world_applications must show concretely HOW the concept
   is used — name the field, name the tool, describe the computation. For foundational concepts,
   everyday examples are fine. For advanced/expert/research concepts, use mathematics, physics,
   computer science, or engineering — do not invent vague "applications."

6. **Worked examples reveal thinking, not just procedure.** Each step in worked_example_blueprint.steps
   must explain WHY that step is taken, not just what is done. A student reading the worked example
   should finish with a new mental model, not just a solved problem.

## Output format
Write a JSON array to: ${chunksOut}/chunk-output-${String(idx).padStart(2,'0')}.json

Each array element (one per concept, in input order):
{
  "concept_id": "<id from input>",
  "asset": {
    "learning_objective": "<precise, measurable; start 'Students will be able to...'; verb matches bloom level; ends with a success criterion>",
    "concept_summary": "<3 paragraphs: (1) motivation — the problem this concept solves and why it matters; (2) the concept itself — built up from first principles, definitions from intuition; (3) forward bridge — what this unlocks and why mastering it prepares the learner for the next concepts in the unlocks[] list>",
    "key_ideas": ["<5-7 insights; each a complete thought that stands alone; reveal structure, not just facts>"],
    "common_misconceptions": [
      {"misconception": "<the wrong belief, stated precisely as a student would hold it>", "correction": "<why the wrong belief feels right, and the specific corrective insight that breaks it>"},
      "<min 3 misconceptions, each revealing a different type of conceptual error>"
    ],
    "visual_teaching_suggestions": ["<3-5 concrete diagram/interactive/kinesthetic ideas; describe the specific visual structure, not just 'draw a graph'>"],
    "worked_example_blueprint": {
      "setup": "<a real, non-trivial problem at appropriate difficulty — not a textbook copy, not 'let x=1'>",
      "steps": ["<Step 1: [action]. Why: [the mathematical reason this step is valid/useful]>", "<min 5 steps, each with the why>"],
      "expected_outcome": "<what the student has solved AND what new insight about the concept they now have>"
    },
    "practice_blueprint": {
      "item_types": ["<2-4 exercise types that probe different aspects of understanding>"],
      "difficulty_progression": "<concrete description: what the easiest item tests vs. what the hardest item tests>",
      "suggested_count": <8-20>
    },
    "assessment_blueprint": {
      "formats": ["<2-3 assessment formats; at least one must probe understanding not just recall>"],
      "bloom_alignment": "<bloom level name + the specific cognitive action being assessed>",
      "mastery_signal": "<an observable, specific criterion — what a student who truly understands will be able to do that a student who merely memorized cannot>"
    },
    "real_world_applications": ["<3-5 applications; each names a field, a use-case, and the specific role this concept plays; for advanced/research difficulty use STEM fields exclusively>"],
    "prerequisite_review_triggers": ["<2-4 specific observable gaps — if a student cannot do X, they are missing prerequisite Y; be concrete, not generic>"]
  },
  "chapter_extra": {
    "vocabulary": [{"term": "<technical term>", "definition": "<one-sentence definition that builds from the concept_summary's intuition, not just a dictionary entry>"}, "<4-6 terms>"],
    "teacher_notes": "<3 sentences: (1) the most common place students get stuck and why; (2) the pedagogical sequencing advice (what to establish first before introducing the formal definition); (3) one concrete classroom activity or discussion prompt>",
    "student_notes": "<2 sentences: written directly to the student; encouraging without being condescending; connects this concept to something they already know well>",
    "common_mistakes": ["<4-6 specific procedural or conceptual errors; each described as what a student does wrong and what correct action replaces it>"],
    "cross_topic_connections": "<2 sentences: names specific concepts from cross_links[] and explains the mathematical relationship — not just 'this is related to X' but 'this appears in X because...' >",
    "revision_guidance": "<2 sentences: specific trigger for when to revisit (what failure mode signals this concept needs review) and what the review session should focus on>"
  }
}

## Difficulty calibration
- foundational = GCSE / early secondary (ages 14-16; build strong intuition, avoid heavy notation)
- developing = A-level / late secondary (ages 16-18; introduce formal definitions, light proof)
- proficient = first-year undergraduate (formal definitions, proof by example/induction/contradiction)
- advanced = upper undergraduate (proof-first; assume mathematical maturity)
- expert = early graduate (research-adjacent; definitions precise, connections to active research areas)
- research = active research frontier (teach the open question, the state of known results, not fabricated solutions)

## Constraints
- No placeholder text, no [TEMPLATE] strings, no empty fields, no vague language
- concept_summary paragraph 1 must open with motivation, never with a definition or formula
- concept_summary paragraph 3 must explicitly name at least one concept from the \`unlocks\` array
- At least 3 misconceptions per concept, each revealing a different type of error
- At least 5 worked example steps, each with an explicit "why"
- real_world_applications must name a specific field and describe the mechanism, not just claim relevance
- Valid JSON array only — no prose, no markdown, no comments outside the array
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

### Step 1: Stamp provenance on domain assets
  KG_COMMIT=$(git -C ${REPO} log --oneline -- docs/mathematics/kg/graph.json | head -1 | cut -d' ' -f1)
  VALIDATION_COMMIT=$(git -C ${REPO} log --oneline -1 | cut -d' ' -f1)
  # Use the merge commit for math.found and math.arith retroactively; for new domains use the authoring run
  GENERATION_COMMIT=$VALIDATION_COMMIT
  python3 ${PIPELINE_SCRIPTS}/stamp-asset-provenance.py \\
    ${domainPrefix} ${GRAPH} ${ASSETS} \\
    $GENERATION_COMMIT $VALIDATION_COMMIT $KG_COMMIT \\
    --generator-version pipeline-v2 --validation-version 1.1.0

### Step 2: Generate domain manifest (checksums computed after provenance stamp)
  python3 ${PIPELINE_SCRIPTS}/generate-domain-manifest.py \\
    ${domainPrefix} ${GRAPH} ${ASSETS} ${chapterMd} ${validationReport} \\
    $GENERATION_COMMIT $VALIDATION_COMMIT $KG_COMMIT \\
    pipeline-v2 ${validationReport.replace('validation-report', 'manifest').replace('.md', '.json')}

### Step 3: Generate domain summary
  python3 ${PIPELINE_SCRIPTS}/generate-domain-summary.py ${domainPrefix} ${GRAPH} ${ASSETS} pending ${domainSummary}

### Step 4: Update MATHEMATICS_MANIFEST.json
  python3 ${PIPELINE_SCRIPTS}/generate-mathematics-manifest.py \\
    ${GRAPH} ${ASSETS} ${CHAPTERS_DIR} \\
    ${REPO}/docs/mathematics/domains pending \\
    ${REPO}/docs/mathematics/MATHEMATICS_MANIFEST.json

### Step 5: Update CANONICAL_CURRICULUM_MANIFEST.json
  python3 ${PIPELINE_SCRIPTS}/generate-canonical-manifest.py \\
    ${REPO} pending ${REPO}/docs/CANONICAL_CURRICULUM_MANIFEST.json

### Step 6: Update CURRICULUM_PROGRESS.md from repo state
  python3 ${PIPELINE_SCRIPTS}/update-curriculum-progress.py ${GRAPH} ${ASSETS} ${CHAPTERS_DIR} pending ${progressFile}

### Step 7: Stage all changed files
  git -C ${REPO} add docs/mathematics/teaching-assets/assets.json
  git -C ${REPO} add docs/mathematics/chapters/${domainPrefix.split('.').slice(-1)[0]}.md
  git -C ${REPO} add docs/mathematics/domains/
  git -C ${REPO} add docs/mathematics/MATHEMATICS_MANIFEST.json
  git -C ${REPO} add docs/CANONICAL_CURRICULUM_MANIFEST.json
  git -C ${REPO} add docs/mathematics/CURRICULUM_PROGRESS.md
  git -C ${REPO} status

### Step 8: Commit
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
- Asset provenance stamped (stamp-asset-provenance.py)
- Domain manifest with SHA-256 checksums (generate-domain-manifest.py)
- MATHEMATICS_MANIFEST.json updated (generate-mathematics-manifest.py)
- CANONICAL_CURRICULUM_MANIFEST.json updated (generate-canonical-manifest.py)
- Auto-updated CURRICULUM_PROGRESS.md from repo state

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_014uZZkmNU25z98rsp8C4rTx"

### Step 9: Get commit hash and finalize all manifests with real hash
  HASH=$(git -C ${REPO} log --oneline -1 | cut -d' ' -f1)
  echo "Commit hash: $HASH"
  python3 ${PIPELINE_SCRIPTS}/generate-domain-manifest.py \\
    ${domainPrefix} ${GRAPH} ${ASSETS} ${chapterMd} ${validationReport} \\
    $HASH $HASH $KG_COMMIT \\
    pipeline-v2 ${validationReport.replace('validation-report', 'manifest').replace('.md', '.json')}
  python3 ${PIPELINE_SCRIPTS}/generate-domain-summary.py ${domainPrefix} ${GRAPH} ${ASSETS} $HASH ${domainSummary}
  python3 ${PIPELINE_SCRIPTS}/generate-mathematics-manifest.py \\
    ${GRAPH} ${ASSETS} ${CHAPTERS_DIR} \\
    ${REPO}/docs/mathematics/domains $HASH \\
    ${REPO}/docs/mathematics/MATHEMATICS_MANIFEST.json
  python3 ${PIPELINE_SCRIPTS}/generate-canonical-manifest.py \\
    ${REPO} $HASH ${REPO}/docs/CANONICAL_CURRICULUM_MANIFEST.json
  python3 ${PIPELINE_SCRIPTS}/update-curriculum-progress.py ${GRAPH} ${ASSETS} ${CHAPTERS_DIR} $HASH ${progressFile}
  git -C ${REPO} add \\
    docs/mathematics/domains/ \\
    docs/mathematics/MATHEMATICS_MANIFEST.json \\
    docs/CANONICAL_CURRICULUM_MANIFEST.json \\
    docs/mathematics/CURRICULUM_PROGRESS.md
  git -C ${REPO} commit -m "chore(curriculum): finalize manifests and progress for ${domainPrefix}

Stamps final commit hash into domain manifest, MATHEMATICS_MANIFEST.json,
CANONICAL_CURRICULUM_MANIFEST.json, and CURRICULUM_PROGRESS.md.

Checksums in domain manifest reflect committed state (post-provenance-stamp).
Run verify-curriculum-integrity.py to confirm all checksums pass.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_014uZZkmNU25z98rsp8C4rTx"

### Step 10: Push
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

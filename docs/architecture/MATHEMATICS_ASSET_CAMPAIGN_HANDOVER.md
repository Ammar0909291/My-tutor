# Mathematics Asset-Contract Campaign — Handover

**Account**: PAPPU. **Subject**: Mathematics ONLY. Do not touch Biology (owned by the Mohd
account, actively progressing on shared `main` — see "Shared-repo discipline" below).

**Status as of this handover**: paused mid-campaign at explicit owner request ("stop after this
batch"), not because the work is finished. **This file is the complete pickup point for the next
session/account.** Read this file in full before touching any Mathematics asset code.

**Last commit touching this campaign**: `c73fe19` (Batch 30 content), merged as `889b051`.
**Verify this is still current** — another PAPPU/Mathematics session may have continued after
this handover was written; always re-run the measurement commands in Phase 0 below before
trusting any number in this file.

---

## 0. What this campaign actually is

Mathematics has TWO separate, non-conflatable layers, and this campaign is about the SECOND one
only:

1. **Educational Brain (EB) authoring** — `educational-brain/concepts/mathematics/*.md`. This is
   **COMPLETE: 908/908**, all 24 domains EB-certified. **Do NOT resume EB authoring.** Verify with
   `npx tsx scripts/math/state.ts` (never trust a hard-coded number in this file or in
   `CLAUDE.md`).
2. **Asset-contract authoring (this campaign)** — turning each EB entry into actual servable
   teaching content: a `SeedExplanation` (core understanding prose) and ≥3 `SeedProbe` gradeable
   questions per concept, registered so the runtime and seed pipeline can actually serve them.
   Having an EB `.md` file does **not** mean a concept has servable assets. This campaign closes
   that gap, concept by concept, domain by domain.

Do not confuse "EB entry exists" with "servable asset exists" with "reaches production" with
"learner-certified." Report all four separately, always (see Phase 4 discipline below).

---

## 1. Phase 0 — ALWAYS reconcile before continuing

Never assume the numbers in this file are current. Before writing a single new asset:

```bash
git fetch origin main -q
git status --short                          # must be clean before starting
git log --oneline -10                       # see what's landed since this file was written
npx tsx scripts/math/state.ts               # confirm EB is still 908/908, 24/24 domains certified
npx tsx scripts/assets/contract-audit.ts --subject mathematics
npx tsx scripts/assets/contract-audit.ts --all   # also see Biology's own counters — do not touch them, just don't regress them
```

`contract-audit.ts` reads the **seed corpus on disk** (pure static TypeScript source), not the
database — it has zero DB/egress footprint and is safe to run constantly. It is the single source
of truth for "how many concepts are servable," never a hand-maintained count in a markdown file.

**Per-domain breakdown** (recompute, don't trust this table — it was accurate at the time this
file was written, immediately after Batch 30):

```
domain       done / total   remaining
math.found     82 / 82      COMPLETE
math.geom      69 / 69      COMPLETE
math.arith     58 / 58      COMPLETE
math.abst      37 / 37      COMPLETE
math.nt        36 / 36      COMPLETE
math.cat       15 / 15      COMPLETE
math.alg       24 / 59      35 remaining   <-- ACTIVE FRONTIER
math.calc       4 / 76      72 remaining
math.linalg     2 / 61      59 remaining
math.prob       3 / 49      46 remaining
math.func       1 / 29      28 remaining
math.trig       3 / 25      22 remaining
math.de         0 / 56      56 remaining
math.stats      0 / 40      40 remaining
math.disc       0 / 32      32 remaining
math.cx         0 / 31      31 remaining
math.real       0 / 30      30 remaining
math.top        0 / 23      23 remaining
math.seq        0 / 21      21 remaining
math.fnal       0 / 18      18 remaining
math.num        0 / 16      16 remaining
math.opt        0 / 16      16 remaining
math.graph      0 / 16      16 remaining
math.meas       0 / 13      13 remaining

TOTAL: 334/908 authored, 343 (concept, gradeBand) pairs, all 343 at contract, 0 short, 0 never-quizzable.
```

To regenerate this table yourself (it is NOT a KG/DB query — it's a static scan of what's actually
referenced in `src/lib/teaching/assets/*.ts`):

```python
import json, re, glob
from collections import defaultdict

kg = json.load(open('docs/mathematics/kg/graph.json'))
concepts = kg['concepts']

authored = set()
for f in glob.glob('src/lib/teaching/assets/*.ts'):
    if 'repositoryStats' in f: continue
    content = open(f).read()
    for m in re.finditer(r"'(math\.[a-zA-Z]+\.[a-zA-Z0-9\-]+)'", content):
        authored.add(m.group(1))

by_domain_total = defaultdict(int)
by_domain_done = defaultdict(int)
for c in concepts:
    domain = c['id'].split('.')[1]
    by_domain_total[domain] += 1
    if c['id'] in authored:
        by_domain_done[domain] += 1

for d in sorted(by_domain_total, key=lambda x: -by_domain_total[x]):
    done, tot = by_domain_done[d], by_domain_total[d]
    print(f"math.{d:<8} {done:>5} / {tot:>5}")
```

**Production status**: `scripts/math/state.ts` will report `serving: UNAVAILABLE — no
DATABASE_URL in this environment` in most sandboxed sessions. This is expected. Do NOT attempt to
fake, skip, or route around this — if you don't have `DATABASE_URL`, you cannot verify production
convergence, runtime behavior, or learner certification, and you must say so explicitly rather
than inferring it from static files. **Certified/production-ready count in any environment without
DB access is 0/908, always** — this is not a defect, it's an honest scope boundary.

---

## 2. The exact registration pattern (mechanical, proven across 25 batches this campaign)

Every new asset file must be wired into **four** places or it silently does nothing (it will pass
`tsc` and even the vitest suite while never actually being reachable by the seed pipeline — this
happened once, in the very first batch of this campaign, caught and documented below in
"Known pitfalls"). For each new file `mathematicsXyzAssets.ts` exporting
`MATHEMATICS_XYZ_EXPLANATIONS` and `MATHEMATICS_XYZ_PROBES`:

1. **The asset file itself** — `src/lib/teaching/assets/mathematicsXyzAssets.ts`. See any of the
   30 batch files already in that directory (e.g. `mathematicsAlgebraSystemsLogarithmAssets.ts`,
   the most recent one) as the exact template. Structure:
   - A `SeedExplanation[]` array: one entry per concept, `familyKind: 'core_explanation'`,
     `gradeBand` matching the concept's actual difficulty (see grade-band convention below),
     `content` transcribing the EB entry's "Core Understanding" section (verbatim facts, not
     paraphrased loosely — see Phase 5 mathematical-quality discipline), `targetedMisconceptions`
     listing every `MC-n` id the EB file defines, `source` citing the EB file path + a one-line
     description of which EB section it came from.
   - A `SeedProbe[]` array: **exactly 3 probes per concept**, one per misconception, at
     `ProbeDifficulty.FOUNDATIONAL` / `DEVELOPING` / `PROFICIENT` in that order, each `mcq` or
     `misconception_probe`, with exactly one `isCorrect: true` choice and 2 distractors each
     tagged `misconceptionId`. If an EB entry has only 2 misconceptions (rare), reuse one MC across
     two probes at different difficulty/framing rather than inventing a fake third misconception.

2. **`src/instrumentation.ts`** (production cold-start bootstrap) — THREE edits:
   - Add `const { MATHEMATICS_XYZ_EXPLANATIONS, MATHEMATICS_XYZ_PROBES } = await
     import('./lib/teaching/assets/mathematicsXyzAssets')` immediately after the previous batch's
     import line.
   - Append `...MATHEMATICS_XYZ_EXPLANATIONS` to the `ALL_EXPLANATIONS` array.
   - Append `...MATHEMATICS_XYZ_PROBES` to the `ALL_PROBES` array.
   - **Both array appends are mandatory — missing the `ALL_PROBES` one is the exact defect that
     happened in Batch 1 of this campaign** (see "Known pitfalls" below). Always grep-verify both
     landed: `grep -c "MATHEMATICS_XYZ_EXPLANATIONS\|MATHEMATICS_XYZ_PROBES" src/instrumentation.ts`
     should return at least 3 (one import + two array appends).

3. **`src/tests/mathematicsAssetContract.test.ts`** (regression guard) — FOUR edits:
   - An import block (mirrors the instrumentation.ts import, but as a static `import { ... } from
     '@/lib/teaching/assets/mathematicsXyzAssets'`).
   - Append `...MATHEMATICS_XYZ_PROBES` to the `const ALL = [...]` array (~line 150s at the time of
     writing, search for the previous batch's own entry to find the exact line).
   - Append `...MATHEMATICS_XYZ_PROBES` to the inline array inside the `it('every asset cites the
     Educational Brain entry it came from', ...)` test (~line 300s).
   - Append `...MATHEMATICS_XYZ_EXPLANATIONS` to the `ALL_EXPLANATIONS` array (~line 420s) AND
     `...MATHEMATICS_XYZ_PROBES` to `ALL_NEW_PROBES` (~line 450s) — these are two separate arrays,
     both need the new batch.

4. **`scripts/brain/seed-knowledge-assets.ts`** (the actual production seed script) — TWO edits:
   - Add the import line (same pattern, relative path `'../../src/lib/teaching/assets/...'`).
   - Append to both `ALL_EXPLANATIONS` and `ALL_PROBES` in that file's own aggregate arrays.
   - `src/tests/mathematicsBandContract.test.ts` has its own test ("the seed script imports every
     asset module on disk, so none is authored and forgotten") that will fail CI if this step is
     skipped — that test is your safety net, but don't rely on it catching the mistake; do the edit
     correctly the first time.

### Efficient registration technique (established from Batch 3 onward)

Doing this by hand with the Edit tool is slow and error-prone (this is exactly how the Batch 1
`ALL_PROBES` omission happened). Instead, use a small Python script via Bash for each file, with
explicit `assert count == 1` checks before every replacement so a silent no-op (e.g. because the
anchor string appears twice, or doesn't exist) fails loudly instead of silently:

```python
p = 'src/instrumentation.ts'
s = open(p).read()
old = "      const { <PREVIOUS_BATCH>_EXPLANATIONS, <PREVIOUS_BATCH>_PROBES } =\n        await import('./lib/teaching/assets/<previousBatchFile>')\n"
assert s.count(old) == 1
new = old + "      const { MATHEMATICS_XYZ_EXPLANATIONS, MATHEMATICS_XYZ_PROBES } =\n        await import('./lib/teaching/assets/mathematicsXyzAssets')\n"
s = s.replace(old, new, 1)

old_exp = "...<PREVIOUS_BATCH>_EXPLANATIONS]"
assert s.count(old_exp) == 1
s = s.replace(old_exp, "...<PREVIOUS_BATCH>_EXPLANATIONS, ...MATHEMATICS_XYZ_EXPLANATIONS]", 1)

old_probe = "...<PREVIOUS_BATCH>_PROBES]"
assert s.count(old_probe) == 1
s = s.replace(old_probe, "...<PREVIOUS_BATCH>_PROBES, ...MATHEMATICS_XYZ_PROBES]", 1)

open(p, 'w').write(s)
```

Repeat the analogous pattern for the test file (4 anchors) and the seed script (2 anchors). Always
chain off the **previous batch's own constant name** as the anchor, since it is guaranteed unique
(appears exactly once per array) and immediately follows in the file.

### Known pitfalls (already hit and fixed once each — don't repeat)

- **Missing `ALL_PROBES` append in `instrumentation.ts`** (Batch 1 of this campaign): the probes
  were imported and even passed `contract-audit.ts` + the vitest suite (which both read the module
  directly, not through the bootstrap), but were never actually reachable by production. Always
  grep-count both `_EXPLANATIONS]` and `_PROBES]` occurrences after editing, expecting them to
  match the batch count exactly.
- **Ambiguous string replacement matching more than one location**: e.g. a bare `...FOO_PROBES]`
  pattern can match both the `const ALL = [...]` line ending in `]` AND an inline array ending in
  `]) {`. When `assert count == 1` fails, don't loosen it to `count >= 1` — instead anchor on a
  longer, more specific substring (include trailing context like `]\n` vs `]) {`) until the count
  is genuinely 1.
- **Transient vitest timeout on `ebKnowledgeContract.test.ts`** when run as part of the full
  7-file targeted suite (seen once, in Batch 29): this is a resource-contention artifact from
  running all 7 files together as the corpus has grown (Biology's own EB additions make the shared
  full-corpus scan slower). If it times out, re-run that one file in isolation
  (`npx vitest run src/tests/ebKnowledgeContract.test.ts --testTimeout=30000`) to confirm it's not
  a real regression, then re-run the full 7-file suite once more — it should pass cleanly the
  second time. Do not skip validation because of this; do not increase the global test timeout
  permanently without checking with the user first.

---

## 3. Grade-band and content conventions

- **`GradeBand`** (from `@prisma/client`): `EARLY | ELEMENTARY | MIDDLE | HIGH | UNDERGRADUATE |
  ADULT`. Convention observed across all prior batches:
  - `math.abst`, `math.cat` (abstract algebra, category theory — expert/research-tier): always
    `GradeBand.UNDERGRADUATE`.
  - `math.alg` (standard high-school algebra — proficient/developing-tier): `GradeBand.HIGH` for
    most content; `GradeBand.MIDDLE` for genuinely middle-school-level sub-concepts (e.g.
    `math.alg.simplification`, `math.alg.linear-equation-2var` used `MIDDLE`).
  - Match whatever an existing sibling file in the same domain already uses — check with
    `grep -n "GradeBand\." src/lib/teaching/assets/mathematicsAlgebra*.ts | head` before guessing.

- **`ProbeDifficulty`**: `FOUNDATIONAL | DEVELOPING | PROFICIENT | ADVANCED`. Standard pattern:
  exactly one probe per misconception, at FOUNDATIONAL/DEVELOPING/PROFICIENT respectively (never
  ADVANCED unless deliberately signaling exceptional depth — no batch so far has needed it).

- **`ProbeKind`**: `'mcq' | 'misconception_probe'` are the two kinds used throughout this
  campaign. Alternate them per taste; both are treated identically by the grading contract as long
  as `choices` has ≥2 entries with exactly one `isCorrect: true`.

- **Source citation format**: `` `educational-brain/concepts/mathematics/${id}.md — ${one-line
  description of the EB section this content is transcribed from}` ``. Always cite the exact EB
  file, never paraphrase-without-citation.

- **Content must be TRANSCRIBED from the EB entry's own "Core Understanding" section**, not
  independently re-derived. The EB entry is the frozen, already-vetted source of truth; the asset
  file's job is packaging that content into the `SeedExplanation`/`SeedProbe` schema, not
  re-deriving mathematics from scratch. This is also why Phase 5 (mathematical quality) below is
  largely already satisfied by construction — the EB entries went through their own verification
  pass when originally authored — but you must still sanity-check every transcribed claim, since
  transcription errors (sign flips, mismatched variable names, dropped qualifiers like "never" vs
  "always") are a real and previously-seen risk.

---

## 4. Per-batch validation checklist (mandatory, in this exact order)

```bash
# 1. Confirm clean start
git status --short   # must be empty
git fetch origin main -q && git log --oneline HEAD..origin/main   # see what landed since last batch

# 2. If Biology (or anyone else) pushed since your last fetch, merge BEFORE editing further:
git merge origin/main -m "Merge origin/main (<describe what landed>) into mathematics Batch N"
# Never rebase. Never force-push. If a real conflict occurs in a shared array (instrumentation.ts,
# the seed script, or the test file), resolve by keeping BOTH sides' additions — never drop either
# campaign's entries. Conflicts in these files are rare because Biology and Mathematics batches
# append to the same arrays at different textual positions, so git's line-based merge usually
# succeeds automatically; only genuine simultaneous edits to the exact same line will conflict.

# 3. Write the new asset file + do all 4 registration edits (§2 above).

# 4. Validate, in this order, stopping and fixing root cause on any failure:
npx tsc --noEmit
npx vitest run src/tests/curriculumKgRegistration.test.ts src/tests/mathematicsAssetContract.test.ts src/tests/mathPackageCorpus.test.ts src/tests/masteryReachability.test.ts src/tests/mathematicsBandContract.test.ts src/tests/ebKnowledgeContract.test.ts src/tests/ebKnowledgeDelivery.test.ts
# expect: 7 files, 561/561 passing (this count may have grown if math or another subject added
# more parameterized cases since this handover — don't be alarmed if it's now >561, only if it's
# LOWER or any file fails)
npx tsx scripts/assets/contract-audit.ts --subject mathematics
# expect: authored count +N (N = concepts in this batch), pairs count increased correspondingly,
# "at contract" == total pairs, "short" == 0, "never quizzable" == 0

# 5. Inspect diff before committing — should touch exactly 4 files (1 new + 3 modified):
git status --short

# 6. Commit (NOT --amend, always a new commit):
git add -A -- <the 4 files>
git commit -m "feat(assets): author seed assets for <concept-1>, <concept-2> (Batch N/635)

mathematics asset-contract: <before>->\<after> authored concepts, <before>-><after> pairs at
contract (<after>/<after>, 0 short, 0 never-quizzable). math.alg coverage: <before>/59 ->
<after>/59. Registered across instrumentation.ts (bootstrap), the asset-contract
regression suite, and the seed script's own aggregate arrays.

Co-Authored-By: <your attribution line>"

# 7. Fetch + re-check for a race BEFORE pushing (Biology pushes frequently, every few minutes):
git fetch origin main -q && git log --oneline HEAD..origin/main
# if non-empty, merge (step 2's process) and RE-RUN step 4's full validation before pushing —
# never push an unvalidated merge commit.

# 8. Push:
git push -u origin main

# 9. Confirm clean state:
git status --short   # must be empty again
```

The "635" in "Batch N/635" commit messages is a rough historical estimate of remaining
concept-count-divided-by-2-per-batch from early in the campaign — it is NOT a hard target and NOT
worth correcting retroactively; just keep incrementing N. What matters is the actual
authored/pairs counts in the commit body, which must always be freshly measured, never carried
forward from a stale mental count.

---

## 5. Domain progression strategy

**Current frontier: `math.alg`, 24/59, 35 remaining.** Continue there next unless a fresh owner
instruction redirects. The exact ready-to-author (dependency-satisfied) concepts as of this
handover:

```
READY NOW (no missing prerequisite within math.alg's own remaining set):
  math.alg.absolute-value-equations
  math.alg.binomial-theorem
  math.alg.elimination-method
  math.alg.exponential-equations
  math.alg.fractional-exponent
  math.alg.inequality-2var
  math.alg.logarithm-properties
  math.alg.natural-logarithm
  math.alg.quadratic-formula
  math.alg.radical-equations
  math.alg.remainder-theorem
  math.alg.simplifying-radicals
  math.alg.substitution-method
  math.alg.system-3var

BLOCKED (waiting on a sibling above to be authored first):
  math.alg.change-of-base            <- needs logarithm-properties
  math.alg.complex-polynomial-roots  <- needs fundamental-theorem-algebra
  math.alg.discriminant              <- needs quadratic-formula
  math.alg.factor-theorem            <- needs remainder-theorem
  math.alg.factoring                 <- needs factor-theorem
  math.alg.factoring-gcf             <- needs factoring
  math.alg.factoring-special         <- needs factoring
  math.alg.factoring-trinomials      <- needs factoring-gcf
  math.alg.fundamental-theorem-algebra <- needs polynomial-roots
  math.alg.logarithmic-equations     <- needs logarithm-properties + exponential-equations
  math.alg.pascals-triangle          <- needs binomial-theorem
  math.alg.polynomial-inequality     <- needs polynomial-roots
  math.alg.polynomial-roots          <- needs factor-theorem
  math.alg.rational-equations        <- needs rational-expressions
  math.alg.rational-expressions      <- needs factoring
  math.alg.rational-expressions-addition       <- needs rational-expressions
  math.alg.rational-expressions-multiplication <- needs rational-expressions
  math.alg.rational-inequality       <- needs rational-expressions + polynomial-inequality
  math.alg.rational-root-theorem     <- needs polynomial-roots
  math.alg.rationalizing-denominators <- needs simplifying-radicals
  math.alg.vietas-formulas           <- needs polynomial-roots
```

Recompute this list yourself (don't trust it blindly) with:

```python
import json
kg = json.load(open('docs/mathematics/kg/graph.json'))
concepts = {c['id']: c for c in kg['concepts']}
# ... (paste your current `authored` set computation from Phase 0, then:)
alg_missing = sorted(c['id'] for c in concepts.values() if c['id'].startswith('math.alg.') and c['id'] not in authored)
for m in alg_missing:
    reqs = concepts[m]['requires']
    ready = all(r not in alg_missing for r in reqs)
    print(m, reqs, "READY" if ready else "blocked")
```

**Priority order recommendation**: `remainder-theorem` → `factor-theorem` → `polynomial-roots` →
`factoring`/`factoring-gcf`/`factoring-trinomials`/`factoring-special` unblocks the largest
downstream chain (rational expressions, rational inequalities, the Vieta's/rational-root/complex-
roots cluster). `quadratic-formula` → `discriminant` is a short, high-value chain. The
logarithm-family (`logarithm-properties`, `natural-logarithm`, `change-of-base`,
`logarithmic-equations`) is another self-contained cluster now that `math.alg.logarithm` itself is
done. Pick whichever cluster makes sense; there's no single mandated order, just "resolve
dependencies before their dependents."

**Once math.alg is exhausted**, the next domains in size order are `math.calc` (72 remaining),
`math.linalg` (59 remaining), `math.prob` (46 remaining) — each already has a handful of concepts
authored from an earlier pre-pause era of this campaign (`math.calc` 4/76, `math.linalg` 2/61,
`math.prob` 3/49, `math.func` 1/29, `math.trig` 3/25) — check what's already there with
`grep -l "math.calc\." src/lib/teaching/assets/*.ts` etc. before assuming a domain is
untouched. Everything else (`math.de`, `math.stats`, `math.disc`, `math.cx`, `math.real`,
`math.top`, `math.seq`, `math.fnal`, `math.num`, `math.opt`, `math.graph`, `math.meas`) is at a
clean 0 — pick based on prerequisite readiness (most of these only require `math.found`,
already 100% complete, so most are immediately startable).

---

## 6. Shared-repo discipline (binding — repeat every batch, not just once)

The repository's `main` branch is shared live with the Mohd/Biology campaign, which pushes
frequently (multiple commits per hour observed during this session). Every batch in this campaign
followed, and every future batch must follow:

1. **Fetch before starting, fetch again before pushing** — never assume the remote hasn't moved
   between your last fetch and your commit.
2. **Never revert, reset, or cherry-pick Biology's commits.** If `git status` or a diff shows
   Biology files you didn't expect, that's normal — leave them alone.
3. **Never rebase, never force-push.** Repository policy (see root `CLAUDE.md`) forbids rewriting
   shared history. Always merge with a genuine merge commit when the remote has moved.
4. **Conflicts, when they occur, are almost always in the four shared registration files**
   (`src/instrumentation.ts`, `scripts/brain/seed-knowledge-assets.ts`,
   `src/tests/mathematicsAssetContract.test.ts`, occasionally `CLAUDE.md` itself). Resolve by
   keeping **both** campaigns' additions — never let one campaign's array-append silently drop the
   other's. In practice, git's line-based merge auto-resolves these cleanly almost every time,
   because Biology appends to biology-prefixed constants and Mathematics appends to
   mathematics-prefixed constants at different textual positions in the same array; a real
   conflict only arises if both campaigns' most recent entries happen to be adjacent in the file
   (rare, but check the auto-merge result's diff before trusting it silently).
5. **Re-validate (tsc + 561-test suite + contract-audit) AFTER every merge, before every push** —
   a clean pre-merge validation does not guarantee a clean post-merge one.
6. **`CLAUDE.md` itself gets touched by both campaigns** (each campaign's own status-line updates
   its own paragraph). When merging, keep both paragraphs; do not let one campaign's edit
   overwrite the other's status line. If you need to update this campaign's own status line in
   `CLAUDE.md`, edit only the Mathematics-relevant lines, never Biology's paragraph.
7. **Do not modify Biology content to make Mathematics easier**, and do not modify shared runtime
   infrastructure (`src/instrumentation.ts`'s bootstrap logic itself, not just its array-append
   lines) without first proving the change is genuinely required for Mathematics, checking it
   doesn't regress Biology's own bootstrap path, and adding regression coverage. No such change has
   been needed so far in this campaign — every batch's `instrumentation.ts` edit has been a pure
   array-append, never a logic change.

---

## 7. Definition of done (do not declare success early)

Per the owner's own final-definition-of-done checklist (unchanged since it was issued), do **not**
declare "Mathematics complete" or "Mathematics end-user ready" on the basis of any single layer.
Track and report these SEPARATELY, always:

```
[x] 908/908 KG           (already true, unrelated to this campaign)
[x] 908/908 EB           (already true — do NOT re-author)
[ ] complete servable asset coverage      <- THIS CAMPAIGN'S JOB (334/908 at last count)
[ ] assessment contract satisfied          <- satisfied for the 334 already authored; not yet for the rest
[ ] mathematical correctness verified      <- transcription-verified for the 334 authored (content comes
                                               from already-vetted EB entries); no independent third-party
                                               review has been performed
[ ] visual/representation coverage audited <- NOT STARTED, out of scope for this campaign so far
[ ] production corpus verified             <- BLOCKED, no DATABASE_URL in typical sandbox sessions
[ ] runtime verified                       <- BLOCKED, same reason
[ ] question lifecycle verified            <- BLOCKED, same reason
[ ] liveness verified                      <- BLOCKED, same reason
[ ] mastery verified                       <- BLOCKED, same reason
[ ] real learner QA completed              <- BLOCKED, same reason
[ ] P0 = 0                                 <- no P0s discovered or tracked this campaign; not the same as "verified none exist"
[ ] blocking P1 = 0                        <- same caveat
[ ] regression suite passes                <- TRUE for the 561-test targeted suite, at every batch boundary
[ ] TypeScript passes                      <- TRUE, at every batch boundary
[ ] build passes                           <- NOT independently re-verified this campaign (only tsc --noEmit,
                                               not a full `npm run build`) — worth doing periodically
[ ] production smoke tests pass            <- BLOCKED, no production access
[ ] final certification 908/908            <- 0/908, honestly, until the above are all checked off
```

If a future session has actual `DATABASE_URL`/production access, Phases 6-8 of the original
owner brief (shared infrastructure, production convergence, end-user readiness: runtime
retrieval, lesson initialization, explanation, assessment, grading, misconception handling,
question lifecycle, visual integrity, liveness, mastery, real learner QA) become newly
actionable and should be picked up from there — but that is a materially different task from
"author more seed assets," and should be scoped as such explicitly with the owner before
starting, not assumed as an automatic continuation of this file's own asset-authoring loop.

---

## 8. Quick-start for the next session

```bash
cd /home/user/My-tutor   # or wherever this repo is checked out
git fetch origin main -q
git status --short                 # must be clean
git log --oneline -5               # sanity check you're where you expect
npx tsx scripts/math/state.ts      # confirm EB still 908/908
npx tsx scripts/assets/contract-audit.ts --subject mathematics   # get the CURRENT authored/pairs count
```

Then pick 2 concepts from §5's "READY NOW" list (re-verify it's still accurate — another session
may have advanced it), read their EB `.md` files in
`educational-brain/concepts/mathematics/<id>.md`, author the asset file following the template in
§2-3, register in all 4 places, validate per §4, and push per §6.

**This campaign is explicitly re-authorized** (see git history around commit `ae294a8` /
the merge preceding `43f59b5` for the exact re-authorization instruction, reproduced in full in
that session's transcript if ever needed) — the root `CLAUDE.md`'s own "computer_science/
mathematics content work remains explicitly PAUSED" line is a DEFAULT the owner has already
overridden for this specific campaign, in this specific chat thread. If a fresh session sees that
CLAUDE.md line and isn't sure whether the override still holds, **ask the owner explicitly**
rather than assuming either way — do not resume purely on the strength of this handover file
without also either (a) seeing a fresh re-authorization message in the current session, or (b)
asking. This file documents HOW to continue; it does not by itself constitute authorization to
start a new session's work without checking.

---

## 9. File index (what this campaign has touched so far)

30 batches, 60 concepts authored, spanning 3 domains to completion (`math.cat` 15/15, `math.abst`
36/36 -> 37/37 corrected count, both fully complete) plus `math.alg` opened to 24/59. Every asset
file:

```
src/lib/teaching/assets/mathematicsCategoryFoundationsAssets.ts       (math.cat, Batch 1)
src/lib/teaching/assets/mathematicsCategoryMorphismAssets.ts          (math.cat, Batch 2)
src/lib/teaching/assets/mathematicsCategoryStructureAssets.ts         (math.cat, Batch 3)
src/lib/teaching/assets/mathematicsCategoryLimitsAssets.ts            (math.cat, Batch 4)
src/lib/teaching/assets/mathematicsCategoryAdjunctionAssets.ts        (math.cat, Batch 5)
src/lib/teaching/assets/mathematicsCategoryMonadAssets.ts             (math.cat, Batch 6)
src/lib/teaching/assets/mathematicsCategoryClosureAssets.ts           (math.cat, Batch 7 — DOMAIN COMPLETE 15/15)
src/lib/teaching/assets/mathematicsAbstractAlgebraFoundationsAssets.ts (math.abst, Batch 8)
src/lib/teaching/assets/mathematicsAbstractAlgebraGroupOpsAssets.ts    (math.abst, Batch 9)
src/lib/teaching/assets/mathematicsAbstractAlgebraSubgroupAssets.ts    (math.abst, Batch 10)
src/lib/teaching/assets/mathematicsAbstractAlgebraOrderAssets.ts       (math.abst, Batch 11)
src/lib/teaching/assets/mathematicsAbstractAlgebraRingHomAssets.ts     (math.abst, Batch 12)
src/lib/teaching/assets/mathematicsAbstractAlgebraActionAssets.ts      (math.abst, Batch 13)
src/lib/teaching/assets/mathematicsAbstractAlgebraQuotientAssets.ts    (math.abst, Batch 14)
src/lib/teaching/assets/mathematicsAbstractAlgebraIdealAssets.ts       (math.abst, Batch 15)
src/lib/teaching/assets/mathematicsAbstractAlgebraPrimeEuclidAssets.ts (math.abst, Batch 16)
src/lib/teaching/assets/mathematicsAbstractAlgebraFieldPidAssets.ts    (math.abst, Batch 17)
src/lib/teaching/assets/mathematicsAbstractAlgebraUfdQuotientRingAssets.ts (math.abst, Batch 18)
src/lib/teaching/assets/mathematicsAbstractAlgebraHomIsoAssets.ts      (math.abst, Batch 19)
src/lib/teaching/assets/mathematicsAbstractAlgebraFitLagrangeAssets.ts (math.abst, Batch 20)
src/lib/teaching/assets/mathematicsAbstractAlgebraIsoFiniteFieldAssets.ts (math.abst, Batch 21)
src/lib/teaching/assets/mathematicsAbstractAlgebraAltGroupFieldExtAssets.ts (math.abst, Batch 22)
src/lib/teaching/assets/mathematicsAbstractAlgebraBurnsideSylowAssets.ts (math.abst, Batch 23)
src/lib/teaching/assets/mathematicsAbstractAlgebraAlgExtGaloisAssets.ts (math.abst, Batch 24)
src/lib/teaching/assets/mathematicsAbstractAlgebraGaloisGroupCorrespondenceAssets.ts (math.abst, Batch 25 — DOMAIN COMPLETE 36/36 -> 37/37)
src/lib/teaching/assets/mathematicsAlgebraSimplifyLinearAssets.ts      (math.alg, Batch 26 — domain opened)
src/lib/teaching/assets/mathematicsAlgebraInequalityRadicalsAssets.ts  (math.alg, Batch 27)
src/lib/teaching/assets/mathematicsAlgebraPolyOpsExpFuncAssets.ts      (math.alg, Batch 28)
src/lib/teaching/assets/mathematicsAlgebraCompleteSquarePolyDivAssets.ts (math.alg, Batch 29)
src/lib/teaching/assets/mathematicsAlgebraSystemsLogarithmAssets.ts    (math.alg, Batch 30 — MOST RECENT, HEAD OF CAMPAIGN)
```

Plus one pre-existing file from an earlier era of the overall Mathematics campaign,
`src/lib/teaching/assets/mathematicsAlgebraVocabAssets.ts` (part of math.alg's original 20/59
baseline before this specific session's 4 new batches).

---

## 10. Commit trail (for full session-level detail if ever needed)

Batches 1-25 (math.cat + math.abst): commits between the campaign's opening and `8c0c944`
(math.abst domain-completing commit). Batches 26-30 (math.alg): `680a795`, `d4d0802`, `1ebf835`,
`43f59b5`/`ff2ca69` (merge), `c73fe19`/`889b051` (merge). Every commit message states exact
before/after authored and pairs counts — `git log --oneline --grep="Batch" -- 'src/lib/teaching/
assets/mathematics*'` will list the full campaign trail if needed.

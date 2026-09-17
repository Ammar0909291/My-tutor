# Mastery Integrity & Knowledge Exposure Fixes (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Mastery cannot certify while a claim challenge is unresolved (2026-09-13, commit `0260240a`)

**Root cause of "false teaching certified as mastery" (chem.bond.resonance real-student audit)
found and closed, cross-subject, without touching any curriculum/EB/KG content.** The tutor
taught a wrong CO3^2- formal-charge rule, the learner challenged it twice in the two most
natural real-student phrasings ("i thought oxygen has 6", "that's what my teacher said before"),
the tutor defended the false claim with escalating fabricated detail, and the lesson still
reached `mastery.verified=true`. Traced the full pipeline: `claimChallengeGuard.ts`'s
`isClaimChallenge` never matched EITHER reproduced phrasing (neither contains "wrong"/"not
right"/anchored "actually"/"read...not..."), so its humility directive never even injected; and
even when it does fire, the directive is purely advisory prose with zero downstream enforcement
— nothing checks the model complied. Separately, `masteryVerifiedStrict`/`conceptMasteryVerdict`
answer "was the GRADING trustworthy" (authored keys, no contradictions) — a totally disconnected
axis from "was the TEACHING trustworthy." A lesson can answer every authored MCQ correctly while
the explanations along the way taught something false and were never retracted under challenge.
Confirmed via git/grep: no "Physics Verifier" exists anywhere in this repo; the built K5 Output
Verifier (`src/lib/kernel/verifier/`) is structural/pedagogical only (15 rule codes, none check
factual correctness); the only prior-art for a generic correctness verifier or a "Turn Contract"
is the unbuilt, explicitly non-binding EOS v3 clean-sheet proposal (`docs/architecture/eos-v3/`).
- **Fix 1 — detection.** `CHALLENGE_RE` widened with two new semantic categories (a remembered
  counter-fact, "i thought X"; a remembered authority, "my teacher/book/notes said X"), kept
  narrow per the module's own asymmetric-risk philosophy (a false positive costs one extra
  sentence; a false negative lets a fabricated defence stand). New `CHALLENGE_ACKNOWLEDGED_RE`
  reuses the injected directive's own suggested phrasing ("I may have gotten that wrong...") to
  ask a narrow, decidable question — did the reply take the dispute seriously — never "was it
  correct," which the module's own header already disclaims as undecidable here.
- **Fix 2 — enforcement.** New `vChallenge` rule (`kernel/verifier/rules.ts`, `V-CHALLENGE`,
  REJECT), an unconditional safety floor mirroring the proven `vAffirm` mechanism exactly (same
  repair-then-fallback shape, wired right next to it in `route.ts`, running whether or not the
  flagged EOS verifier is enabled — that flag is unset in production). REJECTs and regenerates
  once only the safely-decidable case (a short, unacknowledged reply under an active challenge —
  the exact T2 filler shape); on second failure, falls back to a deliberately neither-sided
  honest-uncertainty template (contrast `vAffirm`'s fallback, which confidently asserts the
  curriculum's own answer — there is no authored answer to fall back to here). A long,
  confidently-wrong, unacknowledging reply (the actual T3/T4 shape) is NOT rejected — this module
  cannot tell a correct confident defence from an incorrect one, stated explicitly rather than
  guessed at.
- **Fix 3 — mastery safety.** New `ConversationState.teachingIntegrityUncertain` (set from the
  FINAL served text via `CHALLENGE_ACKNOWLEDGED_RE`, independent of whether Fix 2's REJECT fired —
  this is what closes the T3/T4 gap Fix 2 structurally cannot). `conceptMasteryVerdict` — the
  single authority every mastery consumer (completion gate, client payload, permanent record)
  already routes through — now refuses to certify while this flag is set, monotone-tighter
  exactly like every other condition already in that function. Set once, never auto-cleared
  within a concept (matching `sawModernGrading`'s own policy) since there is no safe way to detect
  the dispute was later resolved; clears only on a fresh attempt at the concept. Touches zero
  grading-integrity checks, erases zero evidence counters, makes zero DB/curriculum changes.
- **Cross-subject by construction**: every touched module was already subject-agnostic; nothing
  Chemistry-specific was added anywhere.
- **Tests**: 79 new/updated assertions (`claimChallengeGuard.test.ts`,
  `challengeDefendedVerifier.test.ts`, `teachingIntegrityMastery.test.ts`), each with a
  non-vacuity proof against the verbatim reproduced production strings (the pre-widening
  `CHALLENGE_RE` genuinely misses both; `masteryVerifiedStrict` alone genuinely still certifies
  the incident's exact evidence shape). 15 pre-existing "routeAI call site count" tests updated
  4->5 (the repair regeneration is one real new call site) with reasoning comments.
  `replayDrift`'s structural guard extended to REPLAY the new evidence field (a transcript's own
  learner/tutor text is sufficient to derive it exactly as route.ts does) rather than excuse it.
- **Live-verified in production** (real account, fresh `chem.bond.resonance` session): the exact
  challenge phrasing from the root-cause analysis ("wait, i thought resonance structures could
  also move atoms sometimes, thats what my teacher told me last year") triggered the widened
  detector on the deployed app, and the model's own reply — unprompted beyond the injected
  directive — opened with "I may have gotten that part a little too quick—let's sort it out
  together," matching `CHALLENGE_ACKNOWLEDGED_RE` exactly; the lesson went on to reach genuine
  `mastery.verified=true` normally, confirming a properly-acknowledged challenge does NOT
  falsely block mastery. **Honest limit**: the escalation path (REJECT->regenerate->fallback) and
  the mastery-BLOCKED path were not independently reproduced live — this incident's failure mode
  is non-deterministic LLM behaviour that cannot be forced to fail on demand; those paths are
  proven via offline tests against the verbatim original bad text instead.
- Full suite 655 files / 13,581 passed / 9 skipped (post-merge with the concurrent Mathematics EB
  campaign, zero file-content conflicts); tsc clean; build clean. Merge commit `d9022e20`, fix
  commit `0260240a`, both on `main`, deployed `dpl_GcYqqVJjmsq5TJxkAsGTGrKfP25r` READY on
  `my-tutor-flame.vercel.app`.


## Authored knowledge now reaches the runtime, or fails observably (2026-09-13, `4f3ebaf`)

**Read `src/lib/curriculum/ebKnowledge.ts`'s header before changing the
misconception grammar or the Core Understanding budget.** It records the trap
that was hit while writing it.

### Two silent-loss defects between the corpus and the prompt
Measured over all 1,169 EB entries with the production extractor, not sampled:

| | before | after |
|---|---|---|
| misconception candidates authored | 3,052 | 3,052 |
| parsed | **1,220** | **3,052** |
| files parsing to ZERO | **706 (60%)** | **0** |
| Core Understanding chars exposed | **22.7%** | **80.3%** |
| entries silently dropping governing language | **794** | **0 (188 REPORTED)** |

Per subject, misconceptions before → after: chem 198→430, eng 5→444,
math 798→1,528, phys 219→650.

**Cause 1:** blueprintLoader's inline grammar was stricter than the corpus in
three independent ways — a parenthetical type qualifier where it demanded a
dash (`**MC-3 (Type 2 — perceptual intuition)**:`), a non-bold `### MC-1:`
head, and non-numeric ids (`MC-A`, descriptive slugs). **Cause 2:** the only
path from the authored `## Core Understanding` section to the model was the
opening hook's first paragraph cut at 400 chars.

### Why the budget was NOT simply raised
400 → 1200 moves the boundary; it does not remove it. `packCoreUnderstanding`
packs whole logical units and runs a second pass that RESCUES units carrying
governing language (only if / must / never / conserved / sign convention /
breaks down / domain of validity …). What still will not fit is reported, not
lost.

### The trap, and the test that caught it
`countMisconceptionCandidates` and `parseAuthoritativeMisconceptions` share
`MC_HEAD_RE`, so `authored === parsed` holds **by construction** — that
equality therefore CANNOT catch a grammar narrowing. It is the 2,800-record
**volume floor** in `ebKnowledgeContract.test.ts` that catches it, and it did:
a first draft required a hyphenated slug and silently dropped 157 genuine
`MC-A`/`MC-B` entries across `eng.communication.*`. Narrowing the definition of
"authored" until it matches the parser is the same defect this module exists to
stop, one level up. **Do not delete that floor.**

### What is deliberately NOT done
The runtime never invents a condition the corpus does not state.
`KnowledgeExposureFailure` has no field that could carry a substitute claim, and
the CORE UNDERSTANDING prompt channel says so in the prompt itself. Grading,
mastery and assessment authority are untouched; `claimChallengeGuard`,
`V-CHALLENGE`, `teachingIntegrityUncertain` and the mastery gate are connected
to, not duplicated. Provenance is internal and asserted never to reach
learner-facing text. Failures log `[learn/chat] KNOWLEDGE_EXPOSURE_FAILURE=`
per the existing `*_EVENT` convention — **no DB write** (Supabase egress quota).

### Calibration case — the content/architecture split
`chem.bond.resonance`: its formal-charge formula and three
dominant-contributor ranking rules were authored all along and never reached
the model; they now do (1,720 of 2,636 chars). Its formal-charge **checksum**
("formal charges sum to the species charge") is genuinely absent from both the
EB entry and the Blueprint — a CONTENT gap owned by the Curriculum Production
Pipeline, correctly not synthesised by the runtime. Recorded in
`docs/qa/PHYSICS_CHEMISTRY_MASTER_DEFECT_BACKLOG.md` with the general form of
that split.

### Guard-test discipline
17 pre-existing assertions in two files needed updating; **none deleted** —
each keeps its original assertion verbatim in a dated comment and re-asserts
the same invariant against the new shape. One of them
(`chem.bond.hybridization` expected `[]`) had frozen a parse FAILURE as
expected behaviour: that file authors four misconceptions the old parser could
not read.

Non-vacuity proven by neutering and restoring: reverting the parser grammar
fails 6 tests; reverting the packer to `slice(0, 400)` fails 4.
Suite 659 files / 13,696 passed / 9 skipped; tsc clean; build clean
(middleware 79.7 kB, unchanged).


## The 188 governing-knowledge residues were an ORDERING defect (2026-09-13, `7dde649`)

**Read `packCoreUnderstanding`'s header and `BACKREF_RE` before touching the
1,800-char budget.** The budget was never the problem and raising it is still
the wrong move.

### What they actually were
Not a budget shortage. The packer filled the budget in **authored order** and
only then rescued whatever governing unit still fitted, so admission depended
on **POSITION**: an early descriptive paragraph could consume the budget a
later, SMALLER condition needed. Measured over all 1,166 entries carrying the
section, with the SAME whole units and the SAME budget:

| | before | after |
|---|---|---|
| residue entries | **188** | **44** |
| residue units | 235 | 48 |
| exposure | 80.3% | **80.4%** (up) |
| english residues | 1 | **0** |
| abbreviation-cut fragments | **21** | **0** |

Governing-first ordering. Nothing summarised, paraphrased, or cut mid-sentence;
no unit split further than the authored structure already splits it. Only WHICH
whole units are admitted changed — which is why exposure went UP, not down: the
rescue pass no longer works against a budget already spent.

### The adjacency rule — why governing-first is not enough on its own
Ordering by governing-first can strand a condition from the statement it
governs. Measured: `phys.rel.length-contraction` kept *"It is emphatically NOT
the case that…"* while dropping the sentence it contradicts. A unit that OPENS
with a back-reference (`BACKREF_RE`, a closed list of discourse connectives)
states no subject of its own and is admitted **only together with its
antecedent** — the whole group fits, or none of it is taken. 1 stranded
back-reference → 0. `BACKREF_RE` decides ADJACENCY only, never importance.

### A second, pre-existing defect found on the way
The sentence splitter broke on any `.`, so **21 fragments already reached the
model cut at an abbreviation** — "ethanol bp 78°C vs." is a comparison missing
the thing compared. That is arbitrary truncation, which this contract forbids.
`splitSentences` now refuses a boundary after a known abbreviation, a
single-letter initial, a decimal, or before a lowercase continuation. It COSTS
2 residue entries (42 → 44), and that is the correct direction: a complete
sentence that does not fit is REPORTED; a mangled one that fits is a contract
violation.

### NO EB CONTENT WAS EDITED, and the measurement says none should be
**Zero of the 48 remaining units are redundant** — maximum content-word overlap
with already-exposed text is 53%, median 28%. So there is no unambiguous
"redundant/overlong authored wording" edit to make; the omitted units carry
distinct content. My own `C-OVERLONG` size heuristic is REFUTED by that
measurement — those units are long because they carry a lot, not because they
repeat. Residue sections run 1.7–3.9× the budget (chemistry median 4,772 chars).
Any change here is Curriculum-Production-Pipeline / Curriculum-Completion-Program
territory: **report, do not edit.**

### Deliberately declined, with the number
A lead-plus-governing **sub-unit rescue** would clear 8 more entries. Declined:
it admits a discontinuous excerpt as authoritative knowledge, and 8 entries do
not justify that when all 44 are already observable. This is the "do NOT
optimize for 188 → 0 at any cost" instruction applied, not an oversight.

### The instrument walked into this module's own trap
`scripts/knowledge/residueReport.ts` kept a LOCAL copy of the unit split and
reported a sentence fragment the real packer never produces — the same "two
parsers that drift" defect the module header warns about, hit in the measuring
tool. It calls `splitSentences` directly now. **Measure with the production
functions or the number is about your script.**

### Verification
Non-vacuity proven three ways: reverting the packer fails N; removing only the
adjacency rule fails M and K; restoring the abbreviation-blind splitter fails O.
Production-verified on `dpl_FyZRAEEjFhy7ruZHBVASmkdPxaxM`: all 8 live cases
echoed newly-exposed authored vocabulary, and the three residue concepts emitted
`KNOWLEDGE_EXPOSURE_FAILURE` with counts **byte-identical to the offline
prediction** (schrodinger 2464/1607, limits 2774/1719, spectroscopy 4462/1761).
No mastery certified; disposable QA account deleted, re-login blocked.
Suite 660 files / 13,719 passed / 9 skipped; tsc clean; build clean
(middleware 79.7 kB, unchanged).



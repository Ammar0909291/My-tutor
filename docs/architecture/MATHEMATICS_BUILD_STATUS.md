# Mathematics Build — measured status and the corrected plan

**Last measured 2026-08-19.** Every number here is produced by
`npx tsx scripts/math/state.ts`. Do not hand-edit them and do not re-derive them
in a session — run the script. Three figures in project memory were stale at
once when this was written (Blueprints recorded 529/908 when complete at
908/908; Educational Brain 224 when 257; `math.geom` 56/69 when certified), and
decisions were being made on all three.

## Where the subject actually stands

| Layer | State |
|---|---|
| Knowledge Graph | 908 / 908, frozen, validator PASS |
| Blueprints | 908 / 908 files |
| Educational Brain | 257 / 908 (`math.found`, `math.arith`, `math.geom`, `math.nt` certified = 245) |
| Serving assets | 43 / 908 concepts, ~1.93 closed-choice probes each |
| Concepts meeting the asset contract | **0** |

## The finding that corrected the strategy

The build plan assumed Blueprints could feed the serving layer by mechanical
transcription, on the strength of "Blueprints 908/908". That is a **file** count.
Measured against the real parser (`loadBlueprintContent`, not a regex — a
hand-rolled scan of one heading format reported 7 usable blueprints where the
loader finds 908, because the corpus carries three schema generations):

- **908 / 908** carry a Misconception Registry — 2,595 rows, median 3 per
  concept. This is genuine, and it is why Blueprints remain the primary
  authoring source.
- **711 / 908** yield some "explanation" block, but **728 of those 2,205 blocks
  are Learning Objectives or Mastery statements** — assessment criteria written
  *about* the student, in the third person ("A student who achieves mastery
  identifies which thinking move they are using"). Serving one to a learner
  would be nonsense.
- **199 / 908** carry a block actually labelled `Core Explanation` with real
  teaching prose (median 739 chars). Only **69 of those are on the 245 spine**.

Blueprints are written for the **tutor**, as teaching source material. They are
not a learner-facing corpus, and they cannot be transcribed into serving assets
by extraction alone.

### What this changes

| | concepts | on the 245 spine |
|---|---|---|
| **Extractable** — has learner-facing prose | 199 | 69 |
| **Authorable** — has >= 3 misconceptions, no prose | 675 | 165 |
| **Neither** — needs Blueprint or EB work first | 34 | 11 |

Serving assets must be **authored** for ~675 concepts, grounded in the
misconception registry the Blueprint does supply. Authoring is an offline,
batched, human-reviewed step — it does not touch the per-turn serving path, so
Permanent Rule 9 (one LLM call per turn) is unaffected.

The `Neither` list is small and concrete: 34 concepts, 11 of them on the spine.
Those are the first Blueprint/EB gaps worth closing.

## The asset contract

`src/lib/teaching/assetContract.ts`, version `v1`: **>= 1 explanation and >= 3
closed-choice probes per served band.**

Three is the mastery bar itself (`correctAtCheck >= 1` plus
`correctAtPractice >= 2`) with no re-asking of a spent probe — the minimum that
lets a perfect learner finish without the model volunteering a question. It is
not a margin. Physics already meets it (~3.13 closed-choice probes per concept
across 238 concepts), which is the proof the shortfall elsewhere is a property
of the seed template, not of the subject.

Today **0 of 43** serving mathematics concepts meet it. That single fact is why
`math.found.logic` could not close for a learner who answered correctly.

## Certification

A concept is ready when the harness says so, never when a count does.
`npx tsx scripts/math/certify.ts` drives the **real** endpoint and asserts:

- **D1** taught before quizzed
- **D2** every mastery-phase question carries a structured, gradeable MCQ
- **D3** CHECK -> TRANSFER reachable without unbounded repetition
- **D4** `masteryVerified` agrees with the lesson attempt and topic progress
- **D5** band-appropriate content *(requires a database; reported, never guessed)*
- **D6** no referenced-but-missing figure, no malformed LaTeX

`ACTIVE != certified`. An asset that validates is not a lesson that teaches.

## Certification — the first complete measurement (2026-08-19)

All 43 serving concepts, real lessons against the deployed app on the test
learner. Raw result committed at
`docs/architecture/MATHEMATICS_CERTIFICATION_2026-08-19.json`.

|                                  |        |
|----------------------------------|--------|
| PASS                             | 36 / 43 |
| reached verified mastery         | 43 / 43 |
| median turns to mastery          | 7 |

**Every concept completed.** No lesson left a learner stuck — the failures are
quality flags raised on the way through, which is the distinction the harness
exists to draw. A coverage count would have reported 43/43 and said nothing.

The 7 remaining failures are all `D2-ungradeable` — a mastery-phase question
with nothing to grade it — on these concepts:

    math.abst.group-theory · math.alg.expression ·
    math.arith.fraction-multiplication · math.arith.ratios ·
    math.found.set · math.func.function-concept · math.geom.slope

This is the asset contract gap appearing exactly where the model predicted:
production still serves the two-probe pools, because the 58 authored probes that
fix it are in git and **unseeded**.

### The falsifiable prediction

Seeding clears all seven. Run:

```
npx tsx scripts/brain/seed-knowledge-assets.ts --draft
MATH_CERT_COOKIE="…" npx tsx scripts/math/certify.ts scripts/math/targets.json
```

and diff the table against the committed baseline. If seven `D2-ungradeable`
failures do not become PASS, the contract model is wrong and should be revised
rather than defended.

### What the harness got wrong, recorded so it is not re-litigated

Six corrections in one session, every one the same root cause — it was built
from a model of the product rather than from the product: a bare `?` for D2; a
110-character slice instead of the offending turn; held figures treated as
absent; two figure channels read out of four; no evidence captured on the LaTeX
path; and a currency `$2` read as a maths delimiter. Two real product defects
were found in the same period. The ratio is not flattering, and it is stated
here so the next reader weighs a fresh failure accordingly — read the captured
turn before believing the verdict.

## What blocks progress, in order

1. **Authoring capability.** ~675 concepts need composed explanations and probes.
   Requires a provider key in the environment that runs the generator.
2. **A database.** `DATABASE_URL` for `scripts/brain/seed-knowledge-assets.ts`.
   **Verified 2026-08-19, not assumed:** the Supabase MCP surface available to
   these sessions is a READ-ONLY transaction — `CREATE TABLE` returns
   `25006: cannot execute CREATE TABLE in a read-only transaction`. So seeding
   cannot be done from a session at all, by batching or otherwise. It needs a
   real `DATABASE_URL`, and one idempotent run finishes it.
3. **Review throughput.** ~908 concepts x ~4 assets is a queue no one reads
   asset-by-asset. Acceptance sampling per domain batch, with the harness as the
   exhaustive gate, is the proposed answer.

## Standing rules

- The mastery bar is frozen: `correctAtCheck >= 1` AND `correctAtPractice >= 2`.
- `short_answer` probes are never converted to MCQ and never counted at a gate.
  They are served as prose follow-ups.
- Nothing auto-promotes to `ACTIVE`. Human review is the only path.
- Deprecated assets are checked for reusable content before anything new is
  authored. Mathematics currently has none; physics has 184 concepts' worth.
- The engineering account is never used for certification. `certify.ts` refuses
  it outright rather than relying on discipline.

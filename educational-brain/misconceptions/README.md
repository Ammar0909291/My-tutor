# Misconception Evolution — Delivery 2 §4 Transcription

## The single question this iteration asked

Per the continuous-mode protocol: re-abstracted the entire Brain (all
prior deliveries, `validation/*`, the Migration Blueprint, the
Architecture Audit, `concepts/COVERAGE.md`), then asked **"what is the
single highest-impact weakness preventing the Educational Brain from
becoming a 9/10 human teaching system?"** — not "what's the next delivery
number."

Ranked candidates considered (by educational impact, not delivery order):
concept coverage (3/1,800 concepts — quantitatively the largest gap),
Misconception Evolution (Delivery 2 §4 — generic taxonomy, still
missing), Mental Model Library (Delivery 2 §1), Cognitive Load Engine
(Delivery 2 §5), runtime dependency (0/52 layers retrieved — but this is
explicitly a runtime-implementation gap, not a Brain-authoring one, and
the loop's own stop condition 2 excludes it from this track).

**Why Misconception Evolution over concept coverage**, the strongest
competing candidate: writing one more concept entry (concept #4) helps
students studying that ONE concept out of ~1,800 — additive, non-
transferable impact. Misconception Evolution is a **force multiplier**:
every misconception library ever written, past and future, gets more
rigorous and more consistent once the general theory exists, and —
critically — expanding concept coverage RIGHT NOW without this theory
first would lock in ad hoc, inconsistent misconception treatment across
a growing set of entries, each one improvising its own birth-type logic
from scratch (exactly the inconsistency risk the standing instructions
warn against). This is the identical reasoning that made Universal
Teaching Principles (Delivery 11) the right call before Teaching Actions
(Delivery 12): author the generic engine content is dispatched into
before scaling the content itself.

## Reuse-first check — grep evidence before writing anything

Grepped every "birth type," "regrowth," and "Delivery 2 §4" citation
across the tree before authoring a single line. Result: **the taxonomy is
already ~80% reconstructable from scattered citations**, exactly the
pattern that made Universal Principles low-risk to formalize:

| Birth type already cited | Where | What's already stated |
|---|---|---|
| Type 1 — Overgeneralization | `concepts/mathematics/math.arith.fractions.md` | "correct inductions from the old domain," mult-makes-bigger, add-across, bigger-denominator-bigger-fraction |
| Type 2 — Perceptual intuition | `concepts/physics/phys.mech.newtons-first-law.md` | "the deepest kind," friction-always-observed → impetus theory, "never fully dies" |
| Type 3 — Language contamination | `student-state/03-misconception-ledger.md §3` | named in the regression-prior table only, never explained |
| Type 4 — Notation-induced | `concepts/mathematics/math.arith.fractions.md` | fraction bar reads as "two numbers stacked" |
| Type 5 — Instruction-induced | `concepts/mathematics/math.arith.fractions.md` | "every early example was a piece of one pizza," no shelf-life warning given |
| Type 6 — Analogy overextension | `decision-engine/05 §2`, `assessment/08 §1` | "silent import of unmapped features," "a fresh misconception" |

And `student-state/03 §3`'s own regression-prior table states plainly:
"The misconception's birth type **(Delivery 2 §4 taxonomy)** predicts its
regrowth" — a direct, explicit dependency on content that did not exist
anywhere in Git before this delivery.

## What this delivery does NOT do (avoiding duplication)

- **The per-learner ledger** (entry structure, strength categories,
  status lifecycle ACTIVE→REPAIRED-FRAGILE→INHIBITED→DORMANT-VERIFIED,
  the regression-prior table itself) is fully owned by
  `../student-state/03-misconception-ledger.md` — not restated here.
  This delivery is referenced BY that file; it does not re-author it.
- **Per-concept misconception libraries** (the actual M1/M2/M3 entries
  for fractions, the impetus entry for Newton's First Law) are owned by
  `../concepts/`. This delivery gives the general theory an author uses
  to WRITE a new per-concept entry; it contains no concept-specific
  content of its own.
- **The 12-persona table** and **Cognitive Load theory** remain out of
  scope (Delivery 2 §9 and §5, still planned) — misconception birth is a
  distinct mechanism from motivation or load, and conflating them would
  duplicate ownership.

## Directory contents

```
misconceptions/
  README.md                ← this file
  01-birth-taxonomy.md     ← the 6 birth types: generic mechanism,
                              diagnostic signature, cross-subject
                              examples, and the "identify a new
                              misconception's birth type" procedure
  02-the-repair-sequence.md ← the full generic 7-step repair sequence,
                              per-birth-type collision design rules,
                              the precise "burned collision" definition,
                              and metastasis-chain mechanics
```

## Audit map — every existing citation this delivery resolves

| Citing file | What it cites | Resolved by |
|---|---|---|
| `student-state/03 §3` | "the misconception's birth type (Delivery 2 §4 taxonomy) predicts its regrowth" | `01-birth-taxonomy.md` |
| `student-state/03 §4` | "the metastasis chains, Delivery 2 §4" | `02-the-repair-sequence.md §4` |
| `student-state/03 §1` | "a SECOND repair pass must not reuse a burned collision case" | `02-the-repair-sequence.md §3`'s precise definition |
| `validation/01-session-simulations.md` | "[GAP: full sequence belongs to Delivery 2 §4... referenced but not authored]" | `02-the-repair-sequence.md §1` |
| `validation/03-ai-dependency-audit.md` | "Regrowth rates by birth type; what 'burned collision' means precisely; the re-rating rules at 2+ regrowths" | `01-birth-taxonomy.md`, `02-the-repair-sequence.md §3` (re-rating rule itself stays in `student-state/03 §3`, already authored — not duplicated) |
| `validation/06-highest-roi-recommendation.md` | "Misconception Evolution science — extends the repair track beyond the 3 seed concepts; adds regrowth/regression rules" | Both files |
| `decision-engine/05 §2` | "a fresh misconception, birth type 6" | `01-birth-taxonomy.md §6` |
| `assessment/08 §1` | "misconception birth type 6, Delivery 2 §4" | `01-birth-taxonomy.md §6` |
| `concepts/TEMPLATE.md` | "why it happens (birth type, Delivery 2 §4)" | `01-birth-taxonomy.md` (the authoring tool concept-entry writers now use) |

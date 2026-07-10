# Category Mastery and the Never-Reteach Law

A category is a cluster of related concepts. Category mastery is a
verdict about whether that cluster is solid enough that the system
should never enter it as a teaching target again.

This verdict is the engine's most consequential output. A false positive
(claiming mastery when mastery is absent) builds curriculum on sand.
A false negative (denying mastery when it exists) wastes the learner's
time and trust. This file defines exactly how the verdict is reached,
what it means, and how it decays and recovers.

---

## 1. The never-reteach law

> **A category that has been mastered is never entered again as a
> teaching target. It may be reviewed, used as a prerequisite tool,
> and warmed up — but it is never taught as if the learner does not
> know it.**

This law is the architectural center of the placement engine. Every
progression rule, every demotion trigger, every repair protocol exists
to enforce it from a different direction.

**What the law permits:**
- Scheduled spaced retrieval of mastered category concepts (the Memory
  Engine, Delivery 2 §8 — intervals expand, concepts stay in rotation)
- Using a mastered concept as a prerequisite anchor in a new concept's
  INTRODUCTION (`../decision-engine/01 §3`)
- Brief warm-up retrieval when a mastered category's gate concepts
  show FRAGILE status (see §4 — this is review, not reteaching)
- Misconception repair within the category if a new misconception is
  discovered (misconception repair is REPLACEMENT teaching, not
  reteaching — it runs the elicit→commit→collide sequence on the WRONG
  model, which is a different object from teaching the concept itself)

**What the law prohibits:**
- Opening a session "let's review fractions today" as if fractions are
  the lesson's purpose (they are review only, and review is invisible
  infrastructure, not content)
- Re-teaching from INTRODUCTION when a gate concept decays to FORGOTTEN
  (the correct response is cued-recovery, not re-introduction — storage
  survives, `../student-state/07 §1 FORGOTTEN`)
- Treating a rusty concept as an unknown concept because it was missed
  on a single probe
- Marking a category "incomplete" because one non-gate concept in the
  category is still below INDEPENDENT (categories are mastered by their
  gate concepts, not by every concept within them)

---

## 2. The category mastery definition

A category reaches MASTERED status when all three conditions hold:

**Condition 1 — Gate concepts at AUTOMATIC or above** (not just INDEPENDENT):
The category's load-bearing concepts — those that serve as prerequisites
for everything downstream — must be at rung 5 (AUTOMATIC, `../student-state/02 §1`):
fast + flat + correct, latency at personal baseline, surviving as a step
inside larger tasks. INDEPENDENT (rung 4) is the concept's own completion;
AUTOMATIC is when it is safe to build on.

Why AUTOMATIC rather than INDEPENDENT: a concept gated at INDEPENDENT
still costs working-memory slots (`../student-state/07 §1 AUTOMATIC`
definition). A learner who can do fractions independently but not
fluently will be cognitively taxed when fractions appear as a step inside
algebraic manipulation — the non-automaticity of the tool leaks into
the load of the next concept. AUTOMATIC is the fluency level that
makes the concept invisible as a step.

**Condition 2 — Gate concepts with STABLE (or better) memory status**
(`../student-state/07 §1`):
AUTOMATIC concepts that are RECENTLY-LEARNED are not yet proven against
time. STABLE means the concept has survived its expanding intervals:
it has been retrieved successfully at the 3-day, 7-day, and 21-day
marks (or this learner's equivalent). Only STABLE-or-better gate
concepts qualify as mastered for category promotion.

**Condition 3 — At least one concept in the category shows TRANSFER evidence**
(`../student-state/07 §1 TRANSFERABLE`):
A category where every concept is used only in its home surface has
not yet been proven as durable, generalized knowledge. Transfer is
the strongest evidence of real understanding
(`../assessment/05 §2` level 10). One concept with spontaneous-use
or far-transfer evidence is sufficient for the whole category.

**Summary**: category mastered = gate concepts AUTOMATIC + STABLE, plus
any one transfer event. All three conditions must hold simultaneously.

---

## 3. Category confidence levels — the operational representation

| Confidence | Definition | What it means for the session |
|---|---|---|
| ANCHORED | All mastery conditions met; evidence spans sessions | Use freely as a prerequisite. Never enter as content. Skip without announcement. |
| PROBABLE | Gate concepts at INDEPENDENT, not FRAGILE; no transfer evidence yet | Assume mastery for planning. Brief warm-up (one retrieval item) at session open if it's been more than 2 weeks. |
| UNCERTAIN | Some gate concepts below INDEPENDENT, or evidence is old, or flagged patchy history | Verify with one probe before building on. If probe fails: repair the specific gate concept before continuing. |
| UNKNOWN | Never assessed for this learner | Placement probe required before using as a prerequisite. |

These are NOT permanent labels. They are the current best estimate,
updated by every teaching interaction.

---

## 4. Decay and the ANCHORED/PROBABLE distinction

Memory decay (Delivery 2 §8, `../student-state/07`) affects category
confidence, but it does **NOT** demote a mastered category to unmastered.
The high-water mark is preserved (`../student-state/02 §2 law 3`). The
distinction is critical:

**Decay changes the confidence level, not the mastery history:**

| Memory status of gate concepts | Category confidence effect | Instructional response |
|---|---|---|
| STABLE | ANCHORED unchanged | No action; the interval expands at next review |
| FRAGILE (slipping) | ANCHORED → PROBABLE | One warm-up item at next session open; if it passes, remains PROBABLE (not re-ANCHORED until STABLE again) |
| FORGOTTEN (retrieval fails outright) | ANCHORED → UNCERTAIN | Cued-recovery (NOT re-introduction); expect cascade unlock; high-water mark predicts fast recovery |
| RECOVERED (relearned after FORGOTTEN) | UNCERTAIN → PROBABLE (faster than first learning) | Resume from PROBABLE protocol; interval restarts dense but expands quicker than original learning |

The key rule: **FORGOTTEN does NOT equal UNKNOWN.** A forgotten concept
retains its storage trace — the knowledge is there, inactive. Cued
recovery activates it. Re-teaching from INTRODUCTION would spend 20
minutes recovering something that a well-designed cued probe recovers
in 2. The UNKNOWN-treatment for a forgotten concept is a waste of the
learner's time and an insult to their history.

---

## 5. What counts as a category, operationally

For subjects with an explicit domain/topic structure in the KG
(mathematics, English, physics), the category maps to the KG's domain
grouping. For subjects where the grouping is less explicit, the
following rule applies:

**A category boundary is drawn wherever a substantial shift in conceptual
prerequisites occurs** — where a cluster of concepts BEFORE the boundary
is required to understand a cluster AFTER it, but the reverse is not
true. This is the formal definition of a prerequisite boundary.

In practice, this means:
- A single continuous prerequisite chain (A → B → C → D) within one
  topic is ONE category, not four
- When the chain branches (A → B → C AND A → B → D, where C and D
  require no shared knowledge) the two branches are separate categories
  for placement purposes (they are independently placeable)
- When two separate chains converge (A + B → C) and the convergence
  marks a genuine jump in cognitive demands, C and everything after it
  constitute a new category

---

## 6. Category mastery is asymmetric — easier to lose than to earn

**Earning mastery requires all three conditions** (§2): it is a high bar
deliberately. The system should be slow to certify a category as mastered
and slow to conclude that a mastered category is unmastered.

**Losing mastery confidence requires only decay in gate concepts**:
the three-condition bar is for initial certification; a single gate
concept falling to FRAGILE status reduces the label from ANCHORED to
PROBABLE immediately. This asymmetry is the same build-slow/collapse-steep
asymmetry in the confidence model (`../student-state/04`) applied at
the category level.

Why: a system that is slow to grant mastery (conservative certification)
is mildly inefficient — it re-verifies things it could have trusted.
A system that is slow to detect decay is dangerous — it builds on
unstable foundations without warning. Conservative certification is
the cheaper error.

---

## 7. The gate concept list — who authors it

The gate concepts for each category are not invented here. They are
identified by the Curriculum Production Pipeline as the cut-nodes of
each subject's KG. The placement engine reads this list; it does not
define it. For subjects without an explicit cut-node list (currently
all subjects except mathematics, whose `learner_tracks.json` documents
difficulty progression), the rule in §3 of `03-placement-protocol.md`
(the >15% downstream-disconnection threshold) provides a derivable
proxy.

When the placement engine runs a category probe and the concept being
probed is a gate concept, the fluency verdict carries the full weight
of the category verdict. When the concept is a leaf concept (downstream
from the gate, not upstream of anything important), the verdict updates
the within-category estimate but not the category-level confidence.

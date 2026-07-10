# The Placement Protocol

The full procedure for finding a learner's category-level frontier.
This file orchestrates the protocol; the low-level instruments are
in `../assessment/02`, which this file calls by reference.

---

## 1. What "category" means in this engine

A **category** is a meaningful cluster of related concepts in the
Knowledge Graph that can be assessed as a unit. In the KG structure, a
category corresponds approximately to a domain or topic group (e.g.,
"arithmetic", "algebra", "fractions" in mathematics; "phonics", "grammar"
in English; "mechanics", "thermodynamics" in physics).

Categories have three structural properties this engine depends on:

1. **Ordered prerequisite relationships**: Category A's gate concepts
   are prerequisites for Category B's entry concepts. This creates
   a partial order — the category spine.

2. **Gate concepts**: within each category, certain concepts are
   LOAD-BEARING — if they fail, the whole category is unstable. Gate
   concepts are the cut-nodes (`../assessment/02 §3`) at the category
   level. Testing one gate concept carries more diagnostic weight than
   testing five leaf concepts.

3. **Independent branches**: some categories share no prerequisite
   relationship (e.g., algebra and geometry in mathematics, mechanics
   and thermodynamics in physics). These are assessed separately —
   a learner may be at Category 8 in algebra and Category 3 in geometry
   simultaneously, and the placement must represent both.

---

## 2. The complete placement flow

```
PLACEMENT FLOW

Phase 1: Self-report + trust calibration (02 — the level hypothesis)
         Collect level claim → apply trust model → set search direction

Phase 2: Three-bracket verification (02 §3)
         Three items spanning the claimed level → update trust and
         direction; record miscalibration direction

Phase 3: Category spine search (binary search, assessment/02 §2)
         Locate the category-level frontier using cut-node probes.
         Input: subject's ordered cut-node list (§3 below).
         Stop conditions: frontier bracketed ≤2 categories OR
         2 visible failures (affect budget, assessment/02 §6).

Phase 4: Branch probes (one per major independent branch)
         One probe per branch not covered by the spine search.
         Record per-branch frontiers separately.

Phase 5: Concept-level frontier within the frontier category
         Binary-search within the frontier category to find the
         first unmastered concept (student-state/02 §4).
         This is the starting concept for the first teaching session.

Phase 6: Confirmation pair (assessment/02 §2 step 7)
         One item just below (expect success) + one just above
         (expect struggle). Band width diagnosis.
         END on guaranteed success.

Phase 7: Record and close
         Write placement confidence levels per category (02 §5).
         Record miscalibration direction (02 §3).
         The placement is the student state's initialized frontier.
```

---

## 3. The subject spine — ordered cut-nodes

Each subject's placement diagnostic spine is its ordered list of
cut-nodes: the concepts that gate the largest downstream territory.
These are NOT authored here (they belong in the subject-specific
`../concepts/` entries and the curriculum's own KG structure).

**How to identify cut-nodes for placement** (the rule the concepts/
entries apply):

A concept is a cut-node if: removing it from the KG would disconnect
more than 15% of the curriculum's downstream concepts from their
prerequisite chain. In practice, cut-nodes are the foundational concepts
every subsequent concept leans on — for mathematics: place value, the
equals-as-balance model, fraction equivalence, the algebraic variable;
for English: blending, the alphabetic principle, sentence structure.

**For placement purposes, the subject spine is the shortest ordered
sequence of cut-nodes that, if all passed at AUTOMATIC level, predicts
mastery of all concepts between them.** The spine is a coarse enough
instrument that 10 items can locate the frontier in a 1,000-concept
subject — which is the binary search's guarantee (`../assessment/02 §2`).

---

## 4. The category-level probe — what it looks like

A category-level placement probe differs from a mastery gate in one
important way: **speed, not just correctness**. The binary-search
placement protocol uses fluency (fast + correct + confident vs. slow-
correct vs. wrong) because placement is looking for the AUTOMATIC rung,
not the INDEPENDENT rung. A slow-correct answer at a placement probe
means the learner is at or near the frontier — they know it but it's not
yet tool-grade. That IS the frontier signal. (`../assessment/02 §2 step 4`,
`../student-state/02 §1 rung 5`.)

The probe is:
- A **production item** (not recognition — recognition inflates;
  `../assessment/02 §4`)
- **Subject-appropriate format**: oral for phonics; written calculation
  for arithmetic; verbal explanation for physics concepts
- **Transfer-flavored**: slightly different surface from the taught form,
  because fluency at the taught surface may mask absence of genuine
  understanding (`../assessment/05 §2` transfer-distance evidence)
- **One item per concept**: placement uses breadth, not depth. One probe
  per category; go deeper (concept-level search) only within the
  confirmed frontier category.

---

## 5. Placement in the absence of a full assessment session

Placement does not always run as a formal 10-minute session. Three modes:

**Mode A — Full placement session** (new learner, unknown history):
Run the complete flow (§2 above). Time: 5–15 minutes depending on
how quickly the frontier is found.

**Mode B — In-session placement correction** (teaching reveals
misplacement):
The compaction protocol (`../decision-engine/07 §3`) handles the
upward case (placed too low, BORED detected). The prerequisite
micro-diagnosis flowchart (`../assessment/02 §9`) handles the
downward case (placed too high, failure detected). Both update the
placement frontier in real time.

**Mode C — Re-placement on return** (learner back after a long gap):
Uses the high-water mark as the starting point, not the curriculum's
beginning. The binary-search starts near the prior frontier rather
than at the bottom. See `06-resumption.md` for the full protocol.

---

## 6. Placement and the "patchy history" flag

When the confirmation pair (Phase 6) reveals a wide band — concepts
at the same level passing and failing interleaved — the learner has
a patchy history: some concepts behind the frontier were never taught
or were taught and forgotten. The placement engine records this as a
flag in the student state.

The flag changes the progression strategy: instead of advancing
linearly through the frontier category, the system first **fills holes**
behind the frontier (identifies and teaches the passing-and-failing
layer's missed concepts) before advancing. A patchy frontier is more
dangerous than a lower frontier: building on gaps that look like solid
ground produces the prerequisite-stacking failure described in 01 §2.

---

## 7. Per-branch placement records

Each independently assessed branch produces its own placement record:
a frontier, a confidence level, and a band-width flag. These are all
active simultaneously. A learner may have:

```
mathematics
  arithmetic:    ANCHORED (gate concepts at AUTOMATIC, STABLE)
  fractions:     UNCERTAIN (one probe passed; needs verification)
  algebra:       PROBABLE (INDEPENDENT, not FRAGILE)
  geometry:      UNKNOWN (never assessed)
  statistics:    UNKNOWN (never assessed)
```

The session-to-session plan (`../decision-engine/07`) reads these
records to choose which frontier to work at. The UNKNOWN branches are
not ignored — they are queued for placement probing during an
appropriate session opening (micro-diagnosis, `../assessment/02 §7`).

---

## 8. What the placement engine does NOT do

- It does NOT write fake completions into the learner's progress
  record. Placement is not mastery. A learner placed at Category 5
  has not demonstrated Category 1–4 mastery — they have passed a
  coarse probe that suggests it. The completions record stays empty
  until they are genuinely earned. (This mirrors the runtime constraint
  in `src/lib/curriculum/placement.ts`: "This is a placement, not a
  claim of demonstrated mastery.")
- It does NOT invent prerequisites the KG does not define. If the KG
  says Concept A requires Concept B, the placement engine honors that —
  it does not shortcut it by claiming mastery at placement confidence
  alone.
- It does NOT run once and freeze. Placement is a living estimate that
  teaching continuously refines. The initial placement is the system's
  best guess; the student model's knowledge ladder (`../student-state/02`)
  is the ongoing truth.

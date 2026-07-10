# Diagnostic Assessment: Placement, Prerequisite Diagnosis, Binary Search

## 1. The diagnostic goal, stated precisely

Locate the learner's **frontier** — the boundary between what is fluent and
what is not — in the minimum number of items, at the minimum affect cost.
Knowledge is graph-structured (concepts have prerequisites), so diagnosis is a
**search problem on a directed acyclic graph**, and everything known about
efficient search applies.

Two different targets, often conflated:

- **Placement** — a coarse frontier for a whole subject ("start around here").
  Runs once, at entry. Tolerance: ±1–2 concepts is fine; teaching self-corrects.
- **Prerequisite diagnosis** — a precise verdict on the specific floor under
  one concept that is about to be taught or just failed. Runs constantly, in
  micro form. Tolerance: exact — the whole point is finding *the* missing piece.

## 2. Binary-search diagnosis — the core protocol

Given a target concept and its prerequisite chain (from the knowledge graph),
linearize the chain and search it:

```
PROTOCOL: BINARY-SEARCH PLACEMENT
1. Linearize the prerequisite path to the target concept
   (for whole-subject placement: the subject's spine — the chain
   of cut-nodes, see §3).
2. Choose the starting probe slightly BELOW the learner's
   self-reported level (success-first opening — the first item of
   any diagnostic session should be near-certain success; it
   calibrates the learner's nerves, not just the estimate).
3. Probe with one 30-second PRODUCTION item (not recognition —
   recognition inflates; see 01 §4).
4. Judge the result on FLUENCY, not bare correctness:
     fast + correct + confident  → frontier is above; jump up.
     slow-but-correct            → at the frontier's edge; step up ONE.
     wrong or "I don't know"     → frontier is below; jump down.
5. Halve the interval and repeat. log2(n) items locate the
   frontier in an n-concept chain (10 items for 1,000 concepts).
6. STOP when any of:
     • frontier bracketed within 1–2 concepts;
     • two visible failures have occurred (affect budget — see §6);
     • the placement decision would not change with more items.
7. CONFIRM with one item just below the found frontier (expect
   success) and one just above (expect struggle). The frontier is
   a band, not a line; the confirmation pair measures the band's
   width. Wide band (success and failure interleaved over many
   concepts) = patchy history — record it; teaching will need to
   fill holes behind the frontier, not just advance it.
```

Why fluency and not correctness as the pass signal: a slow, effortful success
means the concept is at the frontier, not behind it. Placing a learner *above*
their fluency line stacks new load on non-automatized parts — the precise
mechanism of overwhelm (Delivery 2 §5). When in doubt, place lower: the cost
of placing low is mild boredom, quickly corrected by fast advancement; the
cost of placing high is failure, which costs affect and trust.

## 3. Searching a graph, not a list

Real prerequisite structures are DAGs, not chains. Two adaptations:

- **Probe cut-nodes first.** A cut-node (articulation point) is a concept
  that gates a large fraction of everything downstream — in arithmetic, place
  value; in algebra, the relational equals sign; in reading, blending. One
  cut-node probe carries more information than five leaf probes, because its
  failure predicts failure across the whole region it gates. Every subject's
  diagnostic spine should be its ordered list of cut-nodes.
- **Branches are independent.** After the spine locates the general frontier,
  parallel branches (e.g., geometry vs. statistics) each get one probe —
  frontiers are rarely uniform across branches, and a single scalar
  "level" is always a lie in detail. Record per-branch frontiers.

## 4. Distinguishing absence from corruption

Prerequisite diagnosis answers "is the floor *there*?" Misconception detection
(03) answers "is the floor *wrong*?" The probes differ:

- A **production item** finds absence: the learner cannot produce.
- A **prediction probe** finds corruption: the learner produces —
  confidently — the wrong thing (fast-wrong on the latency grid).

A failed production item must always be followed by the question the wrong
answer poses: was it absence (slow, effortful, "I don't know") or corruption
(fast, confident, systematic)? The two have opposite treatments — absence is
taught, corruption is repaired (Delivery 2 §4) — and treating one as the
other fails: explaining at a misconception bounces off; running the repair
sequence on a mere gap wastes the collision on nothing.

## 5. Cold-start diagnosis (new learner)

```
PROTOCOL: COLD START
1. Take the self-report (level, history, goals) — then DISCOUNT it.
   Self-reports are miscalibrated in both directions: anxiety
   under-reports ("I'm terrible at maths" from a competent adult),
   and inexperience over-reports (not knowing what one doesn't
   know). Treat the self-report as a search HINT, never a verdict.
2. Spot-check with three items bracketing the reported level:
   one clearly below (expected success — the nerve-settler),
   one at, one just above.
3. All three fluent → the report was an underestimate; binary-search
   upward. First two only → report roughly right; place there.
   Struggle at or below the report → overestimate; binary-search
   downward WITH EXTRA AFFECT CARE (discovering you're "below your
   level" stings; frame all items as "finding your fast lane",
   never as testing the report).
4. Record: placement frontier per branch + band width + which
   self-report direction the learner miscalibrates in (this last
   is persistent, diagnostic gold for calibration work — see 04).
```

## 6. The affect budget — diagnosis's hard constraint

A diagnostic session may surface at most **two visible failures**. Beyond
that, measurement corrupts (order effects: each failure degrades the next
response) and trust drains. Techniques that stretch the budget:

- Success-first opening (§2 step 2), success-last closing (always end on an
  item the frontier estimate says they'll pass — Universal Principle 14).
- Frame everything as *finding the right starting point*, never as testing:
  "I'm going to find where the interesting stuff starts for you."
- Failures don't look like failures when the tutor treats them as answers:
  "Perfect — that tells me exactly where to start" is literally true and
  lands completely differently from silence and a next question.
- Binary search itself is affect-efficient: it wastes no items, so it meets
  the budget where linear testing ("start at chapter 1 and quiz forward")
  never can.

## 7. Ongoing micro-diagnosis — the cheapest diagnosis is free

After placement, diagnosis never runs as an event again; it runs as a
by-product. Every teaching interaction is diagnostic if instrumented:

- Distractor-mapped items make every practice answer a diagnosis (03).
- The latency × correctness grid classifies every spoken answer at zero cost.
- Hesitation location during explanations localizes gaps mid-lesson.
- Systematic-vs-random error patterns across normal work distinguish
  misconception from slip without a single dedicated probe.

Dedicated diagnostic sessions after placement are a symptom of
un-instrumented teaching.

## 8. Placement decision tree

```
NEW LEARNER, SUBJECT S
│
├─ Self-report collected? ──no──► collect (level, history, goal)
│
├─ Spot-check 3 items around reported level
│     │
│     ├─ all fluent ────────► binary-search UP the spine
│     ├─ mixed as expected ─► place at report; confirm pair
│     └─ struggle at/below ─► binary-search DOWN (extra affect care)
│
├─ Binary search on spine (cut-nodes), fluency-judged,
│  stop at band ≤2 concepts OR 2 visible failures
│
├─ One probe per major branch off the spine
│  (record per-branch frontiers separately)
│
├─ Confirmation pair (below: expect pass / above: expect struggle)
│     │
│     └─ band WIDE (interleaved pass/fail) ─► flag "patchy
│        history": schedule hole-filling behind the frontier
│
└─ END on a guaranteed-success item.
   Output: frontier per branch + band width + miscalibration
   direction + any fast-wrong answers routed to misconception
   detection (03).
```

## 9. Prerequisite micro-diagnosis flowchart (run on any failure)

```
CONCEPT C FAILED
│
├─ Was the failure fast-wrong (confident)? ──yes──► misconception
│                                                   protocol (03/09)
├─ Item defect ruled out? ──no──► fix/discard item, re-derive (09 §2)
│
├─ List C's direct prerequisites P1..Pk (knowledge graph)
├─ Probe the LOAD-BEARING prerequisite first (the one C's failed
│  step actually used — the work shown tells you which)
│     │
│     ├─ Pi fails ──► recurse on Pi (this loop IS binary search
│     │               down the ancestry; depth >2 levels is rare
│     │               and means placement was wrong — re-place)
│     └─ all Pi fluent ──► the gap is C itself: teach C differently
│                          (changed representation), not the floor
│
└─ Teach located floor → return to C LATER (not same-session;
   consolidation) via an isomorph, never the failed item.
```

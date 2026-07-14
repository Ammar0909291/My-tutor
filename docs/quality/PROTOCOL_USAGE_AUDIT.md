# Protocol Usage Audit — Forward-Compatible

> **CONDITIONAL ACTIVATION.** A "Teaching Protocol Library" (multi-turn
> authored sequences, retrieved by id) is **not part of the current
> authored framework** as a distinct construct. Verified: no
> `educational-brain/protocols/` directory; the word "protocol" appears
> only informally in the tree (repair protocol, recovery protocol,
> warm-up protocol — each owned by its home library). The Runtime ↔
> Educational Brain Contract §11 designates a Protocol Library FUTURE.
> **This audit is DORMANT** for the standalone-protocol construct and
> must never fail an existing blueprint for lacking a "protocols"
> section. Its §3 rules that apply to the authored sequences that DO
> exist today are live and cross-referenced from
> `TEACHING_ACTION_CONSISTENCY.md` T9.

---

## 1. Framework note (the genuine observation)

The task brief lists "Teaching Protocols" among mandatory blueprint
sections. The real template has no such section. What exists today are
*named sequences owned by their libraries* — the 7-step misconception
repair (`misconceptions/02`), the fading ladder (`decision-engine`,
`foundations`), the discovery 6-step design (`teaching-actions` / concept
discovery section), the warm-up and placement protocols. There is no
free-standing, id-addressable Protocol Library. This audit defines the
standard a future Protocol Library must meet, and separately enforces
correct use of the sequences that already exist.

---

## 2. Future Protocol Library rules (activate when authored)

Per Contract §11, a Protocol will be an ordered list of steps, each
resolvable to an action/primitive key plus a completion criterion the
runtime can evaluate. When authored:

**PR1 — Approved-only.** Blueprints invoke protocols by canonical id;
unknown id → FAIL.
**PR2 — Sequencing intact.** A blueprint that invokes a protocol does not
reorder or drop its steps → FAIL on drift.
**PR3 — Prerequisites honored.** A protocol that declares a precondition
(e.g. "correct schema must be stable" before an Error-Analysis protocol)
is only invoked where the blueprint establishes that precondition → FAIL
otherwise.
**PR4 — Transition legality.** Protocol-to-protocol transitions follow
any authored transition table; an illegal jump → FAIL.
**PR5 — No inline protocol authoring.** A blueprint may not define a new
multi-turn protocol inline; missing protocols are library feedback.

---

## 3. Live rules — the authored sequences that exist TODAY

These apply now, to every blueprint, because these sequences are real:

**PR6 — Repair sequence fidelity.** Any misconception repair in a
blueprint that references the 7-step sequence uses all seven in order
(elicit→commit→collide→replace→contrast→apply→re-probe); a dropped or
reordered step → FAIL. (Same check as `TEACHING_ACTION_CONSISTENCY.md`
T9; owned here for repair specifically.)

**PR7 — Fading-ladder fidelity.** Any guided-practice fading uses the
authored ladder (echo→supported→prompted→solo); skipping a rung with no
justification → FAIL.

**PR8 — Discovery-design fidelity.** A blueprint choosing guided
discovery uses the 6-step structure (need→playground→invention→
collision→formalization→compression) or explicitly argues a variant;
an incomplete discovery design that claims to be full → FAIL.

**PR9 — Preemption respected.** No blueprint sequence overrides the
recovery preemption rule — a blueprint that prescribes "continue teaching
through distress" contradicts `decision-engine/03 §0` and → FAIL.

---

## 4. Output

```
PROTOCOL USAGE: {kg-id}
[Future Protocol Library: N/A — not yet authored]
PR6 repair fidelity     PASS|FAIL
PR7 fading fidelity     PASS|FAIL
PR8 discovery fidelity  PASS|FAIL
PR9 preemption respected PASS|FAIL
RESULT: PASS | FAIL (live rules only, until the Protocol Library exists)
```

PR6 and PR9 are hard acceptance gates (a broken repair sequence or a
violated preemption rule harms learners). PR7/PR8 are quality gates.

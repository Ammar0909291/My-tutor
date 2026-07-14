# Teaching Action Consistency Audit

Permanent review rules that keep the use of Teaching Actions consistent
across every blueprint, so that at thousands of concepts the same action
always means the same thing. The action namespace is
`educational-brain/teaching-actions/` — the 27-action, 6-family catalog
(SHOW / TELL / DO / TEST-THINKING / ORGANIZE / SOCIAL). This audit never
edits that catalog or any blueprint; it detects drift against them.

---

## 1. The canonical namespace

The ONLY valid teaching actions are the 27 in `teaching-actions/`
(01–06 family files). Each has one canonical name, one family, one
knowledge-type fit, one setup-cost tier. A blueprint's "Teaching actions"
section (`TEMPLATE.md` §9) dispatches into this namespace.

**Reviewer holds the catalog open** while auditing a blueprint's action
section. Every named action is checked against it.

---

## 2. Detections (each a FAIL condition)

**T1 — Unknown action.** A blueprint names an action not in the 27. FAIL:
the author either invented one (framework change — out of bounds, route
to Pappu) or renamed an existing one (T3).

**T2 — Family mislabel.** A blueprint places an action in the wrong
family (e.g. calls Worked Example a TELL action; it is SHOW). FAIL —
family drift corrupts the action selector's state-legality filter
(`decision-engine/04` Filter 3).

**T3 — Renamed action (terminology drift).** The same action appears
under different names across blueprints ("Faded Practice" here,
"Scaffolded Practice" there, "Fading" elsewhere). FAIL both/all — one
canonical name per action. The audit maintains a **synonym watchlist**
(below) seeded from observed drift; any watchlist term other than the
canonical name is an automatic FAIL.

**T4 — Duplicated action within one blueprint.** The same action listed
twice in the dispatch order with no distinct purpose. FAIL — collapse to
one (or justify the two occurrences as genuinely different phases).

**T5 — Conflicting dispatch.** Two actions prescribed for the same
teaching moment that the catalog marks incompatible (e.g. a Game used for
first teaching of a new concept, which the catalog forbids —
chocolate-covered-broccoli guard; a public Role-Play for a fearful
persona, a hard veto). FAIL against the catalog's stated vetoes.

**T6 — Knowledge-type mismatch.** An action prescribed for a knowledge
type the catalog says it does not fit (e.g. pure Analogy for a physical
procedure, where enactment has no substitute). FAIL.

**T7 — Missing concept-specific reason.** `TEMPLATE.md` §9 requires each
action carry a concept-specific reason. An action listed with a generic
or absent reason FAILS (also caught by V31 in blueprint validation).

**T8 — Repair-strategy duplication.** Across blueprints, the same
misconception-repair collision described as a bespoke action when it is
actually the standard 7-step repair (`misconceptions/02`). FAIL —
reference the sequence; do not re-author it per concept (de-dup rule
V30).

---

## 3. Protocol drift (within the current framework)

"Protocol" as a distinct authored construct is FUTURE (see
`PROTOCOL_USAGE_AUDIT.md`). Within the current framework, the only
multi-step sequences are the authored ones: the 7-step misconception
repair, the fading ladder (echo→supported→prompted→solo), the discovery
6-step design. This audit checks:

**T9 — Sequence fidelity.** Where a blueprint invokes one of these
authored sequences, its steps appear in the authored order with no step
silently dropped or reordered. A repair that skips CONTRAST, or a fading
ladder that jumps echo→solo, FAILS.

---

## 4. The synonym watchlist (living)

Seeded from the catalog's own canonical names; grown by the reviewer each
time real drift is caught. Any non-canonical term below → automatic T3
FAIL, replaced by the canonical name.

| Canonical (from catalog) | Non-canonical variants to reject |
|---|---|
| Worked Example | worked problem, solved example, model problem |
| Faded Practice | scaffolded practice, fading, guided-to-independent |
| Completion Problem | half-solved problem, fill-in problem |
| Demonstration | show-and-tell, modelling (when it means the action) |
| Retrieval-Schedule Prompt | spaced review, flashcard review, recall drill |
| Error Analysis | find-the-mistake, buggy-example |
| Self-Explanation Prompt | explain-your-reasoning (when it names the action) |
| Teach-Back | Feynman, explain-to-someone |

(The watchlist is append-only; entries are never removed, mirroring the
misconception-ledger no-delete rule.)

---

## 5. Output

```
TEACHING ACTION CONSISTENCY: {kg-id}
Actions named: {list}
T1 unknown action        PASS|FAIL {which}
T2 family mislabel       PASS|FAIL
T3 renamed/terminology   PASS|FAIL {watchlist hits}
T4 duplicated            PASS|FAIL
T5 conflicting dispatch  PASS|FAIL {which veto}
T6 knowledge-type match  PASS|FAIL
T7 concept-specific reason PASS|FAIL
T8 repair de-duplication PASS|FAIL
T9 sequence fidelity     PASS|FAIL
RESULT: CONSISTENT | INCONSISTENT (any FAIL)
```

T1, T2, T5, T6 are hard acceptance gates (they corrupt the runtime action
selector if wrong). T3/T4/T7/T8/T9 are quality gates (scored, must be
resolved before acceptance but do not indicate framework corruption).

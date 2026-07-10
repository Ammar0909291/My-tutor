# Knowledge State — the Per-Concept Ladder

For every canonical KG concept the learner has touched, the model holds a
position on an 8-rung ladder. The KG supplies the concepts and their
structure (`../concepts/README.md` — curriculum is WHAT); this ladder is
the per-learner overlay on it — never a second curriculum, never a second
hierarchy.

## 1. The eight rungs

| Rung | Name | The learner can... | Established by (evidence) | Machine entry point it implies |
|---|---|---|---|---|
| 0 | **UNKNOWN** | nothing observable; concept untouched or untested | absence of evidence (recorded as absence, not assumed as zero) | INTRODUCTION |
| 1 | **RECOGNIZED** | identify it when shown ("I've seen this") | recognition items only; lights-up-without-production (`../first-lesson/01 §4`) | INTRODUCTION (fast anchor) or DEMONSTRATION |
| 2 | **IMITATES** | do it simultaneously with the tutor (echo) | successful echo, nothing unprompted | GUIDED at echo |
| 3 | **ASSISTED** | do it with support — launched, cued, or prompted | supported/prompted successes; fails solo | GUIDED at supported/prompted |
| 4 | **INDEPENDENT** | do it alone, effortfully | unprompted solo production, slow-but-correct legal here | INDEPENDENT (consolidation reps) |
| 5 | **AUTOMATIC** | do it alone, fluently — tool-grade | latency flatlined at personal baseline; survives being a step inside bigger tasks | practice as a TOOL inside higher concepts; fluency-burst maintenance |
| 6 | **TRANSFER** | apply it unprompted on new surfaces/contexts | mixed/unannounced items passed; far-transfer items; spontaneous use (the strongest — `../assessment/05 §2` levels 7–10) | stretch items; use as an ANCHOR for teaching neighbors |
| 7 | **EXPERT** | teach it, generate examples/counterexamples, state its boundaries | teach-back with planted misconception caught and repaired; generative items (`../assessment/05 §2` level 11, `10 §5`) | peer-teaching duties; the concept becomes an asset, not a subject |

## 2. Ladder laws

1. **Position is per-concept and evidence-established** — never inferred
   from time spent, lessons attended, or age. The rung IS its evidence.
2. **Rungs map one-to-one onto the machine** (third column): a learner at
   ASSISTED enters teaching at GUIDED-prompted, not at INTRODUCTION.
   This is the structural ban on re-teaching from zero — the single most
   common human and AI tutoring waste. Equally: a learner at RECOGNIZED
   does NOT enter at INDEPENDENT because they nodded along yesterday
   (the echo-advancement anti-pattern, `../first-lesson/06` AL-5,
   enforced by the ladder's evidence requirements).
3. **Positions move down.** Rungs decay under the memory state (07): an
   AUTOMATIC concept gone unpracticed for months whose retrieval now
   fails reads as *effective* ASSISTED until recovered — the ladder
   position is modulated by memory status, and the modulated value is
   what the machine consumes. (The un-modulated high-water mark is kept
   too: it predicts relearning speed — `../first-lesson/01 §5`.)
4. **Rungs 0–4 are certified within sessions; 5–7 only across them.**
   AUTOMATIC needs latency history; TRANSFER needs delayed and mixed
   evidence; EXPERT needs a teach-back. No same-session shortcut exists
   (Universal Principle 17 embedded structurally).
5. **The gate (`../assessment/05 §3`) is the rung-4→5–6 boundary made
   formal**: "mastered" in gate language = INDEPENDENT verified into
   AUTOMATIC/TRANSFER territory with the delayed component. The ladder
   gives the gate its address space.
6. **Misconceptions are not low rungs.** A learner confidently doing the
   WRONG thing is not at rung 2 — they may be at rung 5 of a wrong
   procedure. Competing wrong knowledge lives in the ledger (03), and a
   concept with an ACTIVE ledger entry displays its rung WITH that flag:
   rung-4-with-active-M1 is a different teaching object than clean
   rung 4, and the matrix treats it so.

## 3. What each rung asks of teaching (the decisions the ladder drives)

- **0→1**: anchor + demonstration (INTRODUCTION's whole job).
- **1→2**: modeled production, echo invitation — the click moment for
  voice-shaped concepts (`../first-lesson/07 §1`).
- **2→3**: fade within the rep — launched → cued → prompted
  (scaffolding with its removal plan, Delivery 2 §5).
- **3→4**: the first solo, staged for success, banked when it lands
  (`../first-lesson/04 §1` generalizes: the rung-4 crossing is
  identity-relevant at every age).
- **4→5**: consolidation reps + fluency bursts for tool concepts
  (Delivery 2 §8 automaticity); the enemy here is premature advancement
  on slow-correct (Universal Principle 22).
- **5→6**: transfer diet — vary surface, hold structure; mixed sets;
  the noticing practice (Delivery 2 §7 rules 1, 5).
- **6→7**: generative work and teach-backs; the concept starts paying
  rent (used as anchor and analogy source for its neighbors — 08's
  breakthrough reuse).

## 4. The knowledge-state view the planner reads

From the per-concept rungs, three derived views (computed, not stored
truths — LAW 3's convenience-view discipline):

- **The frontier**: per domain, the boundary between rung-4+ territory
  and below — where placement pointed on day one
  (`../assessment/02 §2`) and where teaching lives now.
- **The floor report**: prerequisites of the current concept with their
  (memory-modulated) rungs — read before every INTRODUCTION; any
  prerequisite below ASSISTED is taught first
  (`../decision-engine/03 §1`).
- **The tool audit**: concepts used as steps inside current work that
  sit below AUTOMATIC — each one is a working-memory tax on everything
  above it (Delivery 2 §5 chunking) and a standing candidate for
  fluency bursts.

# Phase 6 P2 — Cross-Domain Visual Archetype Collision Audit

**Verdict: CLOSED — NO REACHABLE DEFECT. Severity P4 for every live path.**

The collisions Phase 6 flagged are **real as function output and unreachable as
learner-visible behaviour**. Every path that can reach a learner is
subject-scoped by construction, proven exhaustively over all 1,775 concepts. One
regression guard was added — no production code changed.

---

## 1. Executive verdict

| path | can it carry an archetype across subject lines? | severity |
|---|---|---|
| curated `CONCEPT_VISUALS` (exact id) | **No** — keyed by conceptId | P4 |
| `DOMAIN_VISUALS` (prefix) | **No** — all 16 prefixes subject-scoped; 0/500 violations | P4 |
| APPROVED (promoted assets) | **No** — admission gate, exact id equality | P4 |
| GENERATED (live: kill switch unset ⇒ permitted) | **No** — asset built with `ctx.conceptId`, same gate | P4 |
| model's `VISUAL:<type>` tag (post-model) | **No** — clamp nulls it; survives only within `decision.allowed` | P4 |
| `conceptRepresentations()` keyword table | **Yes — but it has NO production caller** | P4 (unreachable) |

**The one genuine risk is a future one**, and it is now guarded: the keyword
table that produces the collisions is dead code that a single `import` would
re-arm.

---

## 2. Complete visual pipeline trace (Step 1)

```
learner message
  └─ resolveVisualTarget(message, lessonConceptId, subject)      ← concept identity (A)
       └─ resolveRequestedConceptId  (shared with the Teaching Engine)
  └─ resolveVisual(input)                    THE SYNCHRONOUS AUTHORITY
       ├─ isRetiredVisualBinding(conceptId)  ← suppression, BEFORE any tier
       ├─ Tier 0  getConceptSceneGenerator(conceptId)      exact id
       ├─ Tier 1  lookupConceptVisualBinding(conceptId)    exact id, else prefix
       │            └─ offer(asset, purpose, 'registry', binding.entry.all)
       │                 └─ admitVisualAsset  ← THE IDENTITY GATE (B)
       └─ NO TIER 2   (the Educational Archetype Engine was removed here)
  └─ resolveVisualForTurn(...)               = the above, plus async tiers
       ├─ 2. APPROVED   promoted asset for THIS concept → same admission gate
       └─ 3. GENERATED  buildConceptScenePrompt(ctx) → figureCritic → same gate
  └─ visualContract   tells the model what IS / IS NOT on screen
  └─ [model turn]
  └─ resolveResponseVisual(...)              ← post-model writer (D)
  └─ THE AUTHORITY CLAMP                     ← single writer of every channel (E)
       responseVisual = detectedVisualSpec = detectedSceneSpec = null
       refilled ONLY from decision.payload; llmTag kept only if
       decision.allowed.includes(llmTag)
  └─ learner-visible payload
```

### Decision-ownership map

| # | question | owner | can it be inferred / lost? |
|---|---|---|---|
| A | which concept? | `resolveVisualTarget` → `resolveRequestedConceptId` | shared with the Teaching Engine by construction — the figure cannot depict a concept the teaching layer did not agree was asked for |
| B | is this asset allowed to represent it? | `admitVisualAsset` | **no** — `asset.conceptId !== intent.conceptId` ⇒ `identity-mismatch` |
| C | which archetype? | the registry row / the generator, both keyed by conceptId | **not inferred** — the keyword table is unwired |
| D | may the model override? | authority clamp | only within `decision.allowed` |
| E | who writes the channels? | the clamp, unconditionally | single writer; a resolver that threw or never ran ⇒ NO VISUAL |

---

## 3. Exhaustive matrix (Step 2) — enumerated, not sampled

`scripts/qa/phase6-p2-archetype-collision-matrix.ts`, all 1,775 concepts in all
six registered subjects.

| subject | concepts | curated binding | retired |
|---|---|---|---|
| english | 216 | **0** | 0 |
| chemistry | 186 | 35 | 12 |
| physics | 238 | 76 | 10 |
| mathematics | 908 | 330 | 0 |
| biology | 108 | 23 | 12 |
| computer_science | 119 | 36 | 3 |

**Cross-subject shared archetypes: 2 of 33 bound visual types.**

| type | subjects | classification |
|---|---|---|
| `number_line` | math (59), phys (4) | **SAFE** — a number line for `phys.mech.displacement` *is* a number line; the archetype is domain-neutral and correct in both |
| `coordinate_plane` | math (176), phys (6) | **SAFE** — a coordinate plane for `phys.mech.kinematics-2d` *is* a coordinate plane |

No type is shared between a STEM subject and English, and none is shared in a
way that makes the figure depict a different *thing*.

**Binding-scope sweep — the decisive one:** 500 bindings resolved across 1,775
concepts, **0 cross-subject violations**. Every `DOMAIN_VISUALS` prefix actually
matched is subject-scoped (`bio.cell`, `chem.atomic`, `cs.algo`, `math.arith`,
… 16 in total), so `conceptId.startsWith(prefix)` cannot reach across subjects.

---

## 4. Identity vs archetype (Step 3) — the question answered directly

> **Does the current visual architecture guarantee semantic visual identity, or
> does it merely guarantee contract-valid visuals?**

**It guarantees identity, and it guarantees archetype provenance — but it does
not, by itself, guarantee semantic FIDELITY.** Precisely:

- **Guaranteed by `admitVisualAsset`:** the asset belongs to the intended
  concept (exact string equality), the renderer agrees with its payload, and the
  payload has something to draw. A figure of *another concept* is impossible.
- **Guaranteed by the registry:** the archetype was named by a human for this
  concept (`tier: 'exact'`, provenance `curated`) or widened from a
  subject-scoped prefix (`tier: 'domain'`, provenance `domain-default`) — and
  the two are recorded distinctly rather than presented alike.
- **NOT guaranteed structurally:** that the named archetype is a *good picture
  of that concept*. `isDrawablePayload` is explicitly "structural floor only …
  not a semantic check".

That residual is not unowned. It is handled by **two** deliberate mechanisms:

1. **`retired.ts`** — a suppression register from the prior M3-A audit, which
   inspected what every graphical concept would *actually paint* and found **29
   bindings depicting a different situation entirely** (e.g.
   `phys.mech.keplers-laws` drawing a *circular* orbit, contradicting the law
   it was attached to). It is consulted **before any tier**, yielding NO FIGURE.
   Verified wired: `resolveVisual.ts` imports `isRetiredVisualBinding`.
2. **`figureCritic.ts`** — for generated figures, a separate model call, never
   shown the generation rules, judging `relevance` / `correctness` /
   `explanatoryValue` / `claimSupport`. **Uncertainty resolves to HOLD, never
   to promote** — including an unreachable or timed-out judge.

So: identity is a structural guarantee; fidelity is an audited-and-gated
property. That is the honest answer, and it is stronger than "contract-valid".

---

## 5. Registry vs generation (Step 5)

| path | archetype source | identity check | semantic check |
|---|---|---|---|
| curated / domain-default | human-authored registry row | admission gate | M3-A audit + retirement register |
| APPROVED | a human promoted a figure for THIS concept | admission gate | human review + re-validation |
| GENERATED | `buildConceptScenePrompt(ctx)` — **conceptId, title, description only** | admission gate | figureCritic, fail-safe to HOLD |

The generation prompt is built **from the concept, never from the tutor's
prose** and never from the keyword table — `visualEngine.ts` documents that
choice explicitly, naming the keyword table as "the archetype keyword table that
produced a quantum wavefunction for English phonics" and refusing to feed it
back in.

**Correction to the Phase 6 report:** it stated generation is "disabled in
production pending an env var". That is **wrong under the current
`flag.ts`** — `ENABLE_AI_SCENE_GENERATION` is a **kill switch**: only
`false`/`0`/`off`/`no` disables it, and *unset permits*. Generation is therefore
a **live** path, bounded instead by grounding, budget and the turn deadline.
This makes the audit more important, not less — and the result is unchanged,
because generation is identity-gated by the same admission rule.

---

## 6. Post-model override (Step 6)

`resolveResponseVisual` (`visualRegistry.ts`) **is** a post-model writer, called
at `route.ts:4577`. It cannot force a foreign visual, and the reason is
structural rather than incidental:

```ts
// THE authority clamp — the single writer of every visual channel
responseVisual = null; detectedVisualSpec = null; detectedSceneSpec = null; …
case 'card': {
  const legal = decision.allowed ?? [decision.payload.visualType]
  responseVisual = llmTag && legal.includes(llmTag) ? llmTag : decision.payload.visualType
}
```

The clamp runs **unconditionally**, discards everything the post-model writer
produced, and refills only from the resolver's decision. The model's tag
survives *only* as a refinement inside `decision.allowed`, which for a curated
binding is `binding.entry.all` — **that concept's own legal set**.

> upstream concept = A, model prose mentions B ⇒ **B cannot be selected.**
> `PROVEN` structurally; not modified, as instructed.

---

## 7. Negative controls (Step 7)

| control | result |
|---|---|
| a concept's own asset is still admitted | ✅ no over-blocking |
| physics keeps its bindings (>50) | ✅ the English 0-binding check is meaningful, not vacuous |
| an ordinary concept is not retired | ✅ register is targeted, not blanket |
| `number_line` / `coordinate_plane` shared use | ✅ retained — legitimate generic vocabulary is not broken |
| **the structural guard actually fails when the table is wired** | ✅ **see below** |
| P0 discourse fix intact | ✅ 90 cases, 0 false positives, 0 cross-subject |
| visual + resolver batteries | ✅ 411/411 |

**Guard negative control, executed:** temporarily importing and calling
`conceptRepresentations` from `visual/visualNeed.ts` made the guard fail and
name the offending file; restoring the file made it pass, with a clean tree.
A guard that cannot fail is decorative — this one is not.

---

## 8. Live verification (Step 8)

Not re-run. The visual certification harness was already executed live **twice**
— before and after the P0 fix — against `dpl_DEVbxLA…` (commit `55cee14e`), and
`git diff --name-only 55cee14e..HEAD` over production paths returns **nothing**:
every commit since is docs/tests only, so the deployed runtime is current for
visual behaviour. Re-running would spend provider quota for no new information.

Live evidence, from that run (disposable account, deleted,
`reloginBlocked: true`):

- **physics** `phys.mech.newtons-first-law` → a **correct force diagram**
  (gravity and normal-force arrows on a resting body).
- **chemistry** and **english** → `NO-FIGURE`, with honest inline ASCII and an
  acknowledgement; **0 phantom claims across 11 measurable turns**.
- No turn in any subject received a figure belonging to another subject.

This matches the enumeration exactly: English has 0 bindings, so it correctly
received no figure; physics has a curated binding, and received its own.

Scene generation was **not** enabled or altered for testing.

---

## 9. Severity ledger

| finding | severity | status |
|---|---|---|
| curated / domain / approved / generated paths carry no cross-subject archetype | **P4** | PROVEN exhaustively (1,775 concepts, 0 violations) |
| post-model override cannot inject a foreign visual | **P4** | PROVEN structurally |
| `conceptRepresentations()` produces 37 foreign archetypes for English | **P4** | real output, **unreachable**; now guarded |
| semantic *fidelity* is audited-and-gated rather than structurally guaranteed | **P3** | owned by `retired.ts` + `figureCritic`; no demonstrated harm |
| Phase 6 report said generation is disabled | — | **corrected here**: it is a kill switch; unset permits |

**No P0, P1 or P2 defect found.** The Phase 6 P2 item is downgraded to P4 on
evidence.

---

## 10. Files changed

| file | kind |
|---|---|
| `scripts/qa/phase6-p2-archetype-collision-matrix.ts` | new — exhaustive matrix |
| `src/tests/visualArchetypeCollision.test.ts` | new — 13 tests incl. the structural guard |
| `docs/architecture/PHASE6_P2_VISUAL_ARCHETYPE_COLLISION.md` | new — this report |

**No production code changed.** No KG, Educational Brain, Blueprint, curriculum,
teaching content, mastery threshold, masteryGate, progression logic, detector
regex, provider config or DB schema touched. The visual identity / critic /
contract architecture is unmodified.

---

## 11. Validation

| | |
|---|---|
| `npx tsc --noEmit` | clean |
| `npx vitest run` | **427 files, 9,176 passed, 9 skipped, 0 failed** |
| `npm run build` | clean |
| P0 discourse battery | 0 false positives / 0 cross-subject |
| visual + resolver batteries | 411/411 |

---

## 12. Remaining unknowns

| item | status |
|---|---|
| whether a *generated* figure is semantically faithful in production at scale | **UNKNOWN** — depends on live generation volume; the critic gates it, but n is small. Not manufactured for this audit. |
| production DB visual-asset rows | **UNKNOWN** — Supabase MCP lists 0 projects this session |
| within-subject archetype fidelity beyond the 29 audited bindings | **INFERRED** — the M3-A audit covered every graphical concept; not independently re-derived here |

---

## 13. Recommendation for after Phase 6

1. **Do not delete `conceptArchetype.ts`.** It is dead but now guarded, and the
   guard documents *why* — deleting it would remove the record of a retired
   failure. Revisit only with owner sign-off.
2. **Correct the operational note** that says generation is disabled — it is a
   kill switch, and unset means permitted.
3. The two remaining Phase-6 items are unchanged and still owner-gated:
   **P1** (214 English probes — content) and **real-student validation**.

# Hard-concept learner run and its fixes (2026-10-20)

Owner request: "Test8 ... Study physics chemistry English and mathematics biology each. 1 difficult concept. Share your exp n rating... examine the visuals. Also share defects", then "Fix all defects including visuals."
Driver: `scripts/qa/chemistryLearnerExperience.ts` (credentials only from `QA_EMAIL` / `QA_PASSWORD` in the environment of one invocation; never written or logged; nothing deleted). Concepts (KG difficulty "expert", Chemistry "advanced"): `phys.qm.quantum-tunneling`, `chem.bond.mo-theory`, `eng.composition.rhetorical-analysis` (then `eng.linguistics.discourse-analysis-intro`), `math.calc.stokes-theorem`, `bio.mol.gene-regulation`. 5.8 / 10 overall.

## Measured on the deployed app
| Concept | Result | Rating | What the learner got |
|---|---|---|---|
| phys.qm.quantum-tunneling | 20 turns, not mastered (65 %) | 6 | animated wave/barrier visual; repeated cards |
| chem.bond.mo-theory | mastered, 16 turns | 6 | a generated six-box PROCEDURE flowchart, no MO energy diagram |
| eng.linguistics.discourse-analysis-intro | 20 turns, not mastered (65 %, 12 attempts) | 5 | generated five-box flowchart; two cards cycled |
| math.calc.stokes-theorem | mastered, 15 turns | 6 | NO figure ("I don't have a picture for this one") |
| bio.mol.gene-regulation | mastered, 16 turns | 6 | two coloured pins ("Lactose absent / present"), no operon; the tutor named an operator, repressor and RNA polymerase that were not drawn |

## Fixed here (code; each with a regression test and a mutation check)
| Defect | Fix | Test |
|---|---|---|
| MO theory served a flowchart of the steps, not the diagram | New generator `sceneGenerators/moDiagram.ts` (`buildMoDiagramScene`, `checkMoDiagramConsistency`, `moBondOrder`): H2 energy-level diagram (1s, sigma, sigma*, four combination lines, paired electrons in sigma, bond order derived from the drawn arrows); the narration extends it to He2 (bond order 0) and O2 (paramagnetic). Registered for `chem.bond.mo-theory`. Chemistry audit re-rendered for the new instance (`scene:mo-diagram-h2`: 24 PASS, 2 REVIEW = the expanded-view scroll, R15), `audit-summary.json` / `render-states.json` merged, `semantic-review.json` entry rebound (the Tier-3 entry removed). | `moDiagram.test.ts` (10; 4 mutations) |
| Gene regulation served two pins with no operon | New generator `sceneGenerators/lacOperon.ts`: the lac operon in both states (repressor on the operator and polymerase blocked / allolactose binds the repressor, polymerase transcribes, mRNA). Consistency derived from the drawn positions. Registered for `bio.mol.gene-regulation`. Rendered with the Biology harness (desktop + mobile, every stage): 9 labels, 0 overlaps, 0 outside the canvas, min font 11.5 px (mobile). | `lacOperon.test.ts` (10; 4 mutations) |
| Stokes' theorem served no figure | New `sceneGenerators/mathCoreScenesB44.ts` (`buildStokesTheoremScene`, batch 44): the upper unit hemisphere S, its boundary circle C, the normal n, F = (-y, x, 0) along C (counter-clockwise) and curl F = (0, 0, 2); circulation = 2 pi, flux of the curl = 2 x pi = 2 pi. Math render audit (390 px dark/light, 1280 px, column): PASS; `audit-summary.json` merged (545 PASS / 12 REVIEW_REQUIRED, 557 served); campaign floor 511 -> 512. | `mathCoreScenesBatch44.test.ts` (15; the integral and the curl are evaluated from the DRAWN arrows and curve; two real generator mutations fail it) |

Side effects of the MO figure, handled in the same change: `chem.bond.mo-theory` was a RETIRED binding (the old card showed a localised shared pair, the valence-bond picture MO theory replaces), so its row was removed from `RETIRED_VISUAL_BINDINGS` and `RETIRED_ASSET_FINGERPRINTS` once it owned a faithful figure, as the physics rows and `chem.bond.ionic-bonding` were (`retired.ts`); the pins that count retired concepts (14 -> 13) and chemistry figures served (55 -> 56) and the semantic-moat defect list were updated with comments. Gates after the change: full suite 1,009 files, the only failures in the first run were the ten retirement/admission assertions that named this concept, all green on re-run; `tsc` 0 errors; `validate:visuals` exit 0.

## Not changed, with the reason
- **Quantum tunneling "nothing emerges on the right".** Not a defect: `QuantumTunneling.tsx` reveals the transmitted wave at step 4 (progressive reveal); the harness frame was taken before it. The caption wording is the same at every step.
- **English "never finishes" (discourse analysis), Physics 65 % after 20 turns.** Cause: a small authored pool on the deployed content at the time (2-3 distinct cards, the re-ask rule re-spends them). Source now holds >= 4 cards per English pair (card-depth batches 1-24); re-running the same lesson on production finished at once (a new card was served, MASTERED). 194 English pairs are at 4, not the 5 the other subjects hold (`contract-audit --min 5`): a content-depth item, not started here.
- **`on pause` when reopening a REVISION concept (rhetorical analysis).** The harness opens with mode `next`, which the runtime answers with the honest "on pause" close; the app's Resume / Restart / Review modes (commit 5139e6903) reopen teaching. Not a product defect.
- **Raw LaTeX in the Stokes reply.** The API text is `\[ ... \]`; `MessageContent` renders it with KaTeX (`DISPLAY_MATH_RE`). Not a defect.
- **Discourse-analysis flowchart (generated, Tier 2/3).** Legible and correct; the only static English figure is `eng.grammar.nouns` and a new one needs the English static-figure audit. Not authored.
- **Repeated analogies, 12-29 s replies, prose re-reading the figure's labels.** Model wording and Groq latency. Not code.
- **Numeric accuracy, the re-ask rule, Educational Brain / KG:** untouched (closed or owner-decided).

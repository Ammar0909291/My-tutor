# Physics Educational Package Migration — Compile & QA Report

**Date:** 2026-07-16
**Compiler:** `blueprint-frontend@0.3.0-physics-migration`
**Command:** `npm run compile:package -- --prefix phys.` (batch mode; `--check` for the determinism gate)
**Result: 217/217 physics blueprints compiled to DRAFT Educational Packages.**

## 1. What was migrated

Every file matching `docs/curriculum/blueprints/phys.*.md` (217 blueprints) is now
compiled into a committed artifact `brain/packages/phys.*.package.json`. Each artifact
carries the two layers of an Educational Package:

- **Rule layer** — a `CompiledPack` produced by the EXISTING brain-compiler
  (`lowerToAST` → `emitCompiledPack`, unchanged), one `B3.dispatch.<concept>.<TA>`
  rule per teaching action. Total: **1,183 rules** (avg 5.5/package).
- **Knowledge layer** — typed `AssetNode`s extracted verbatim from the blueprint.
  Total: **3,489 assets** (avg 16.1/package).

All packages are **DRAFT**. Nothing is activated; `packRegistry.activate()` is never
called from any packageRuntime path (test-asserted). Serving stays behind
`ENABLE_PACKAGE_RUNTIME=1` (default off) with automatic fallback to the legacy
blueprint path.

## 2. Runtime audit (Phase 1 result)

Exactly **one** serving-time blueprint-markdown read site exists in the runtime:

| Site | Role |
|---|---|
| `src/app/api/learn/chat/route.ts` ~1476 via `src/lib/curriculum/blueprintLoader.ts` | Legacy blueprint-context injection (Concept Spine / MC library / EB concept entry) |
| `src/app/api/learn/chat/route.ts` ~1457 via `src/lib/curriculum/packageRuntime` | Package path — preempts the legacy path when `ENABLE_PACKAGE_RUNTIME=1` and a valid artifact exists |

No other production module reads blueprint markdown at lesson time. With the flag on,
all 217 physics concepts serve from packages; markdown becomes authoring-only for them.

## 3. Format coverage added (Phase 2/3 work)

The Blueprint Front-End parser was extended (format-agnostically, by title keyword and
header shape — never per-file logic) to cover every structural variant found in the
physics corpus:

| Variant | Markers | Files (approx.) |
|---|---|---|
| Compact expert format | `## CN — Title`, padded `key : value` C0, `\| TA-N \| P## \| … \|` TA tables, MC register tables | 16 |
| Section format | `## Section N — Title`, table-form C0 (`\| Field \| Value \|`, incl. bold labels), numbered priority TA tables | 58 |
| Session Flow Script | `[TA-N — Title]` bracket lines inside a fenced script | ~50 |
| Lesson Composition Grammar | `[P##: label]` stanzas in a fenced grammar block (TAs synthesized per stanza) | 19 |
| Bracket-bold TAs | `**TA-N [P## — Title]**` and `**TA-N [EXPLAIN]:** …` | ~26 |
| Bullet/bare metadata | `- **Concept ID**: …` bullets; unfenced `concept_id:` blocks | ~45 |
| Numbered-bold-list TAs | `1. **Title**: …` under a Teaching Actions section | ~24 |

MC cross-references are resolved when a TA cites a misconception loosely (truncated id,
slug-as-label, dropped word) and the mapping is **unique**; ambiguous references still
fail BFV04. Two genuine authoring typos were corrected in the blueprints themselves
(`phys.therm.heat-transfer`, `phys.therm.second-law` — shorthand MC ids replaced with
the defined ids).

## 4. QA results (Phase 4)

All 217 artifacts pass the full loader validation chain: structural schema, conceptId
match, compiler allowlist, semver, DRAFT status, rule-layer hash (same check as the
`.bs` loader), and whole-package hash. Determinism verified byte-for-byte via
`--prefix phys. --check` (also wired into CI).

Asset-kind coverage (packages containing ≥1 of the kind):

| Kind | Coverage | Note |
|---|---|---|
| misconception | 217/217 | required baseline ✓ |
| teaching_action_meta | 217/217 | required baseline ✓ |
| mastery_probe | 217/217 | required baseline ✓ |
| core_explanation | 197/217 | the other 20 carry `learning_objective` instead (Protocol-format authors no explanation prose); **every** package has ≥1 explanation surface |
| worked_example | 111/217 | present exactly where the blueprint authors examples as WE/Example blocks; formats that embed examples in protocols keep them inside those assets |
| teaching_note | 114/217 | where authored |
| session_flow | 100/217 | where authored |
| adaptive_rule | 66/217 | where authored |
| learning_objective | 23/217 | where authored |
| reference | 50/217 | where authored |

Metadata coverage: name 217/217, bloom 217/217, difficulty 217/217,
prerequisites 216/217 (`phys.meas.units` is a root concept with none),
masteryThreshold 191/217 (absent in blueprints that don't author it; the
package stores `null`, consumers fall back to the platform default).

KG alignment: 216/217 package conceptIds exist in `docs/physics/kg/graph.json`;
`phys.mech.collisions` has a blueprint but no KG node (pre-existing corpus
discrepancy — flagged, not "fixed", since the Curriculum Production Pipeline owns KGs).

## 5. Proof of teaching from a package (Phase 5)

`packageRuntime.test.ts` (single concept) plus the new corpus gate
`physicsPackageCorpus.test.ts` assert:

- every artifact loads, validates, and assembles a >200-char lesson context with
  zero blueprint-markdown reads (fs-spy asserted on the PoC concept);
- the package rule layer drives the existing K4 `decide()` engine;
- `ENABLE_PACKAGE_RUNTIME` is default-off and the legacy path is intact.

A live demonstration (flag on, `phys.therm.entropy` — one of the formats first
supported today) produced a 9.4 KB package-sourced prompt block and a K4 decision
with package-rule provenance.

## 6. Remaining work before physics is production-ready

1. **Activation decision (G2-gated):** packages are DRAFT by design. Serving them to
   real users requires the owner to set `ENABLE_PACKAGE_RUNTIME=1` (env change, no
   code) after review — and, later, a real DRAFT→ACTIVE lifecycle if per-package
   promotion is wanted rather than the global flag.
2. **Content gaps are authoring work, not compiler work:** 106 packages have no
   worked-example blocks and 117 no session flow because their blueprints don't
   author them in an extractable shape. The packages faithfully reflect the corpus.
3. **`phys.mech.collisions`** blueprint has no KG node (or the KG node is named
   differently) — needs a Curriculum Pipeline decision.
4. **Student-state depth:** the assembler consumes register + active-misconception
   ids today; wiring richer TeachingMemorySnapshot fields is a future, gated step.
5. Mathematics/English corpora can be migrated with the same
   `--prefix math.` / `--prefix eng.` batch command when directed; the front-end
   already parses both.

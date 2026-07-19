# Teaching Blueprint: Surface Area (`math.geom.surface-area`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.surface-area` |
| name | Surface Area |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.geom.area`, `math.geom.solid-3d` |
| unlocks | none |
| cross_links | `math.calc.surface-area-integral` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — computing the total surface area of one specific solid by summing its faces before naming the general "total area of all faces" concept |
| description (KG) | The total area of all faces of a three-dimensional solid; for curved surfaces computed via surface integrals. |

## Component 1 — Learning Objectives

- LO1: Define **surface area** as the SUM of the areas of ALL faces of a solid, computing each individual face's area via `math.geom.area`'s own 2D area formulas, then adding them together — recognizing surface area as an APPLICATION of 2D area computation to every face of a 3D solid (from `math.geom.solid-3d`), not a separate new kind of measurement.
- LO2: Correctly identify and count ALL distinct faces of a solid (including faces that are easy to overlook, such as a cylinder's two circular ends alongside its curved lateral surface) before summing their areas — recognizing that MISSING a face produces a systematically UNDERCOUNTED total.
- LO3 (orientation level — full surface-integral derivation deferred): recognize, without full derivation, that for CURVED surfaces without flat faces to sum directly (e.g. a sphere), surface area is instead computed via a SURFACE INTEGRAL — a genuinely different technique from "add up the flat faces," previewing the general method deferred to `math.calc.surface-area-integral`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.area` (2D area, including curved regions via integration) and `math.geom.solid-3d` (prisms, pyramids, cones, cylinders, spheres, and their faces/edges/vertices).

## Component 3 — Core Explanation

**Surface area is 2D area computation, applied to every face and summed**: for a solid made of FLAT faces (like a rectangular prism or pyramid), surface area is computed by finding EACH face's individual area — using `math.geom.area`'s own 2D formulas (rectangle, triangle, etc.) — and adding all of them together. No new area-computation technique is needed beyond what `math.geom.area` already covers; the only new content is applying it repeatedly, once per face, and combining the results.

**Every face must be counted — omitting one systematically undercounts the total**: a solid's TOTAL surface area requires accounting for EVERY face, including faces that are easy to overlook. A cylinder, for instance, has THREE distinct surfaces: the top circle, the bottom circle, and the curved LATERAL surface connecting them — forgetting either circular end, or the lateral surface, produces a systematically incomplete (undercounted) total, not merely a rounding error.

**Curved solids without flat faces require a genuinely different technique — the surface integral (orientation level)**: a sphere has NO flat faces to sum at all — there is no finite list of "faces" whose individual areas can simply be added. Computing its surface area requires a SURFACE INTEGRAL, a fundamentally different technique from "sum the flat faces" (though the sphere's own formula, $4\pi r^2$, is a known closed-form RESULT of that integral, usable directly once established). Full development of the surface-integral technique is deferred to `math.calc.surface-area-integral`.

## Component 4 — Worked Examples

**Example 1 (LO1 — summing individual face areas via `math.geom.area`, breaking MC-1)**: for a rectangular prism (box) with dimensions $l=5,w=3,h=4$: it has 3 PAIRS of congruent rectangular faces: top/bottom ($5\times3=15$ each), front/back ($5\times4=20$ each), left/right ($3\times4=12$ each). Total surface area $=2(15)+2(20)+2(12)=30+40+24=94$. Each individual face's area was computed via `math.geom.area`'s ordinary rectangle-area formula; the only new step was summing all 6 faces.

**Example 2 (LO2 — correctly identifying and counting every face of a cylinder, breaking MC-2)**: for a cylinder with radius $r=3$ and height $h=7$: the TWO circular ends each have area $\pi r^2=\pi(9)=9\pi$, contributing $2(9\pi)=18\pi$ together. The LATERAL (curved side) surface, when "unrolled," is a rectangle of width $2\pi r$ (the circle's circumference) and height $h$, giving lateral area $2\pi r\cdot h=2\pi(3)(7)=42\pi$. TOTAL surface area $=18\pi+42\pi=60\pi\approx188.5$. Omitting either circular end (a common error) would give an INCOMPLETE total of only $42\pi\approx131.9$ — a systematic undercount, not a rounding issue, from missing genuine surface area the solid actually has.

**Example 3 (LO3, orientation level — the sphere requiring a surface integral, not face-summing, breaking MC-3)**: a sphere has NO flat faces at all — there is nothing to "list and sum" the way the prism's 6 faces or the cylinder's 3 surfaces were listed. Its surface area formula $4\pi r^2$ is instead the RESULT of a surface integral over the entire curved sphere, parameterizing the surface and integrating an area element across it — a fundamentally different computational technique from Examples 1–2's face-summing approach, even though the FINAL formula ($4\pi r^2$) can still be applied directly once known, just as the prism's and cylinder's formulas were.

## Component 5 — Teaching Actions

### Teaching Action A01 — Surface Area Is 2D Area Applied Repeatedly, Not a New Technique (Primitive P11: Representation Shift)

State: "computing surface area doesn't require any new area-finding technique beyond what `math.geom.area` already taught you — you're just applying it to EACH face individually, then adding the results." Walk Example 1's face-by-face computation and summation.

- **MC-1 hook**: ask "does computing a solid's surface area require a fundamentally new area-computation technique, distinct from ordinary 2D area formulas?" — a "yes" answer reveals MC-1 (missing that surface area is simply 2D area computation applied to each face and summed).

### Teaching Action A02 — Missing a Face Genuinely Undercounts, Not a Rounding Error (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: omitting the cylinder's circular ends would give $42\pi\approx131.9$ instead of the correct $60\pi\approx188.5$ — a genuine, substantial gap, not a small discrepancy. State: "forgetting a face doesn't produce a slightly-off answer — it produces a systematically incomplete total, missing genuine surface area the solid actually has."

- **MC-2 hook**: ask "would forgetting one face of a solid (e.g. a cylinder's circular end) produce only a small, rounding-level error in the total surface area?" — a "yes" answer reveals MC-2 (missing that omitting a face produces a substantial, systematic undercount).

### Teaching Action A03 — Curved Solids Without Flat Faces Need a Genuinely Different Method (Primitive P06: Contrast Pair)

Contrast the prism's and cylinder's FACE-SUMMING approach (Examples 1–2) against the sphere's requirement for a SURFACE INTEGRAL (Example 3), since it has no flat faces at all to list. State: "when a solid has no flat faces to enumerate, 'sum the faces' simply doesn't apply — you need the fundamentally different technique of a surface integral instead."

- **MC-3 hook**: ask "can a sphere's surface area be computed the same way as a prism's or cylinder's, by listing and summing its individual flat faces?" — a "yes" answer reveals MC-3 (missing that a sphere has no flat faces at all, requiring the genuinely different surface-integral technique).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the total surface area of a rectangular prism with dimensions $6\times2\times5$.
  2. Compute the total surface area of a cylinder with radius $4$ and height $10$, explicitly listing all THREE surfaces before summing.
  3. Explain, with a specific numeric consequence, why omitting a cylinder's circular end from the surface-area computation is a substantial error rather than a minor one.
  4. Explain why a sphere's surface area cannot be computed via the same "list and sum the flat faces" method used for a prism or cylinder.
- **P76 (Transfer Probe, mode = independence)**: "A can of soup is shaped like a cylinder with radius $3.5$cm and height $11$cm, and needs a paper label covering the ENTIRE outer surface (top, bottom, and the curved side). (a) Compute the total surface area needed for the label material, explicitly identifying and computing each of the three surfaces. (b) A colleague argues 'the label only needs to cover the curved side, since that's what people see' — explain the mathematical distinction between the TOTAL surface area (all faces) and just the lateral surface area, and how the correct quantity to compute depends on which physical question is actually being asked. (c) If the can's ends were instead hemispherical caps rather than flat circles, explain — without computing it — why you could no longer simply use `math.geom.area`'s flat-area formulas for those caps, and what technique would be needed instead."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SURFACE-AREA-ASSUMED-NEW-TECHNIQUE | Believing surface area requires a fundamentally new area-computation technique, missing that it is 2D area computation applied to each face and summed | Foundational |
| MC-2 | MISSED-FACE-ASSUMED-MINOR-ERROR | Believing omitting one face from a surface-area computation produces only a small, rounding-level error, missing that it produces a substantial, systematic undercount | High |
| MC-3 | SPHERE-ASSUMED-COMPUTABLE-BY-FACE-SUMMING | Believing a sphere's surface area can be computed the same way as a prism's or cylinder's by summing flat faces, missing that it has no flat faces and requires a surface integral | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Surface Area Assumed New Technique") → P41 (detect: ask whether surface area requires a fundamentally new area-computation technique) → P64 (conceptual shift: re-walk Example 1's face-by-face computation, re-anchoring on "2D area applied repeatedly and summed").
- **B02 (targets MC-2)**: P27 (name it: "Missed Face Assumed Minor Error") → P41 (detect: ask whether omitting one face produces only a small error) → P64 (conceptual shift: re-walk Example 2's cylinder undercount ($131.9$ vs. $188.5$), re-anchoring on "a substantial, systematic undercount, not a rounding issue").
- **B03 (targets MC-3)**: P27 (name it: "Sphere Assumed Computable by Face-Summing") → P41 (detect: ask whether a sphere's surface area can be computed by summing flat faces) → P64 (conceptual shift: re-walk Example 3's no-flat-faces observation, re-anchoring on "a surface integral is required instead").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.area` (2D area formulas, applied face-by-face here) and `math.geom.solid-3d` (the solid types and their face/edge/vertex structure this concept sums over).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.calc.surface-area-integral`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (face-by-face summation and the complete-enumeration requirement) and LO3 kept orientation-level, appropriately flagging the surface-integral requirement for curved solids without deriving it.
- **Division of labor**: `math.geom.area` owns 2D area computation generally; `math.geom.solid-3d` owns the classification of solid types and their face structure. This concept owns APPLYING 2D area repeatedly across a solid's faces and summing — deliberately choosing the cylinder for Example 2 (rather than a purely flat-faced solid) because its "unrolled lateral rectangle" trick and its easily-overlooked circular ends make both MC-1 and MC-2 concretely testable in one worked example.
- Example 3's deliberate choice to explicitly note the sphere formula ($4\pi r^2$) is still USABLE directly (just not derivable via face-summing) was chosen to avoid the false impression that curved solids are entirely inaccessible without full calculus — the formula itself remains applicable, only its DERIVATION method differs.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.surface-area-integral` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: face-by-face computation on a specific solid precedes the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |

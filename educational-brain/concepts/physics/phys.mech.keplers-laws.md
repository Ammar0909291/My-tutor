# Kepler's Laws of Planetary Motion — `phys.mech.keplers-laws`

## Identity

- **Concept ID**: `phys.mech.keplers-laws` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 10.
- **Prerequisites**: `phys.mech.orbital-mechanics` — Kepler's laws
  generalize the already-secure CIRCULAR orbital case to the fully
  general ELLIPTICAL case, with the circular orbit as one special
  instance (eccentricity zero).
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: advanced · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly state that planetary orbits are ELLIPSES
with the Sun at one FOCUS, not the center — and correctly explain a
circle is merely the special case of an ellipse with eccentricity e=0;
most real orbits are measurably non-circular (Earth e≈0.017, Mars
e≈0.093, Pluto e≈0.248); (2) correctly explain that Kepler's Second Law
(equal areas in equal times) means orbital SPEED varies throughout an
elliptical orbit — fastest at perihelion (closest approach), slowest at
aphelion (farthest point) — NOT constant speed, a direct consequence of
angular momentum conservation (r×v_⊥=constant).

## Core Understanding

Kepler's First Law states planetary orbits are ELLIPSES with the Sun at
one FOCUS — genuinely NOT at the center, and the other focus is empty. A
circle is simply the special-case ellipse where eccentricity e=0 (both
foci coincide at the center) — the circular orbit already studied in the
prerequisite concept is this special case, not the general rule; most
actual planetary orbits have small but measurably nonzero eccentricity
(Earth e≈0.017, nearly circular but not exactly; Mars e≈0.093, noticeably
elongated; Pluto e≈0.248, strongly elliptical), and comet orbits can have
e approaching 1 (highly elongated). Kepler's Second Law states a planet
sweeps out EQUAL AREAS in EQUAL TIMES as it orbits — critically, this is
NOT the same as constant speed or constant distance traveled: near
perihelion (closest to the Sun), the planet moves FAST, sweeping a wide
but short sector; near aphelion (farthest from the Sun), it moves SLOWLY,
sweeping a narrow but long sector — both sectors have equal AREA despite
unequal shapes, meaning orbital speed genuinely varies (for Earth,
v_perihelion≈30.3 km/s vs. v_aphelion≈29.3 km/s — a small but measurable
difference). This is a direct geometric expression of angular momentum
conservation: with no tangential torque from a purely central
(radial) force, L=mr×v_⊥=constant, so as r decreases near the Sun, v
must increase to keep L constant — equal areas in equal times is
precisely this conservation law expressed geometrically.

## Mental Models

**Beginner**: "Planets move in circular orbits with the Sun at the
center; orbital speed is constant throughout an orbit." Upgrade trigger:
examining actual measured eccentricities (Mars e≈0.093, clearly
non-circular) directly confronts the circular-orbit assumption;
computing actual perihelion vs. aphelion speeds for Earth (30.3 vs. 29.3
km/s) directly confronts the constant-speed assumption.

**Intermediate**: "Orbits are ellipses, Sun at one focus (circle is the
e=0 special case); speed varies — fastest at perihelion, slowest at
aphelion, following r×v_⊥=constant (angular momentum conservation)."
This model correctly captures both core results, but sometimes still
conflates "equal areas in equal times" with "equal distances in equal
times" (constant speed), since the geometric statement can be
misremembered as a distance rather than area statement.

**Advanced**: "Kepler's Second Law is a direct geometric consequence of
angular momentum conservation for a purely central force — treat 'equal
areas' and 'varying speed with r' as the same physical fact expressed two
different ways, never as separate or competing claims."

**Expert**: Kepler's Third Law (T²∝r³ for the semi-major axis, extending
the already-secure circular-orbit relationship) and the full derivation
of all three laws from Newton's law of gravitation — a natural
consolidation, not required for mastery.

## Why Students Fail

The dominant failure is retaining the circular-orbit picture (Sun at
center, constant speed) as the GENERAL case rather than recognizing it
as a special (e=0) instance of the more general elliptical orbit; a
second, distinct failure is conflating "equal areas" with "equal
distances" (constant speed), missing that orbital speed genuinely varies
with position.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.keplers-laws.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-KEPLER-CIRCULAR**: believing planets move in circular orbits, or
  treating the Sun as being at the center of the orbit. **Birth type**:
  overgeneralization (Type 1) — the circular orbit special case (studied
  first, in the prerequisite concept, and a reasonable approximation for
  several planets) is incorrectly assumed to be the GENERAL rule for all
  orbits, rather than one specific (e=0) instance. Probe: "Is the Sun
  located at the center of a planet's elliptical orbit, or somewhere
  else?"
- **MC-SPEED-CONSTANT-ELLIPSE**: assuming constant orbital speed
  throughout an elliptical orbit, or confusing Kepler's Second Law with
  constant speed. **Birth type**: overgeneralization (Type 1) — the
  circular-orbit special case (where speed genuinely IS constant) is
  incorrectly extended to the general elliptical case, where "equal
  areas" specifically implies VARYING speed, not constant speed. Probe:
  "Does a planet move at the same speed throughout its elliptical orbit,
  or does its speed change depending on its distance from the Sun?"

## Analogies

**Best**: a skater pulling in their arms during a spin, speeding up
(conservation of angular momentum) — a planet approaching perihelion is
analogous, "pulling in" toward the Sun and speeding up for the same
underlying conservation reason — directly targets
MC-SPEED-CONSTANT-ELLIPSE by connecting to an already-familiar
angular-momentum-conservation precedent.

**Anti-analogy**: do NOT say "planets orbit the Sun in circles" as a
simplifying shorthand — this directly installs MC-KEPLER-CIRCULAR by
presenting the special case as the general rule.

## Demonstrations

Data-based: compare actual measured eccentricities for Earth (0.017),
Mars (0.093), and Pluto (0.248), showing genuinely non-circular orbits —
directly targets MC-KEPLER-CIRCULAR. Worked-example: compute Earth's
actual perihelion and aphelion speeds (30.3 vs. 29.3 km/s) from angular
momentum conservation — directly targets
MC-SPEED-CONSTANT-ELLIPSE.

## Discovery Questions

Discovery-style: "as a planet gets closer to the Sun in its orbit, does
it speed up, slow down, or maintain the same speed?" — learner reasons
through angular momentum conservation, directly confronting
MC-SPEED-CONSTANT-ELLIPSE.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-KEPLER-CIRCULAR is addressed first (establishing ellipses, not
circles, as the general orbital shape), before
MC-SPEED-CONSTANT-ELLIPSE, since correctly picturing the elliptical
geometry (varying distance from the Sun) is the prerequisite for then
correctly reasoning about how orbital speed must vary correspondingly.

## Tutor Actions

WORKED-EXAMPLE (eccentricity comparison across planets; perihelion/
aphelion speed calculation from angular momentum conservation);
ANALOGY (skater arm-pulling speed-up mapped onto perihelion approach).

## Voice Teaching Notes

Listen for "planets orbit in circles" or an assumption of constant
orbital speed — the two direct misconception tells. Load-bearing
sentence: "orbits are ellipses with the Sun at one focus, not the
center — and a planet speeds up near the Sun and slows down far away,
it's never constant." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing orbits as circular with the Sun centered signals
MC-KEPLER-CIRCULAR (MISCONCEIVING, full repair via the eccentricity data
comparison). A learner assuming constant orbital speed signals
MC-SPEED-CONSTANT-ELLIPSE (full repair via the perihelion/aphelion speed
calculation). Mastery trigger: correctly stating orbits are ellipses
with the Sun at a focus, AND correctly explaining speed variation via
angular momentum conservation. Blueprint's assessment component cited
for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget speed for a second — is a planet's distance
from the Sun always the same throughout its orbit, or does it change?"
(isolating the elliptical, varying-distance geometry before discussing
speed). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (elliptical geometry with Sun at a focus; speed-distance
trade-off via angular momentum conservation) bound to procedure
(perihelion/aphelion speed calculation). Interleave with
`phys.mech.orbital-mechanics` and `phys.mech.satellites` (sibling
concept at this same dependency level).

## Transfer Connections

Near: any elliptical-orbit speed or geometry problem, including comet
trajectories. Far: astronomy (exoplanet orbital characterization relies
directly on Kepler's laws) and spacecraft trajectory design (Hohmann
transfer orbits exploit elliptical-orbit mechanics). Real-world:
understanding why Earth is slightly closer to the Sun (and moving
slightly faster) in January than in July. Expert: Kepler's Third Law
(T²∝a³) and the full derivation of all three laws from Newton's
gravitation.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
discrimination-pairs component by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 10): initial authoring.

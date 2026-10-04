# Rectilinear Propagation: Shadows, Eclipses and the Pinhole Camera — `phys.opt.rectilinear-propagation`

## Identity

- **Concept ID**: `phys.opt.rectilinear-propagation`
- **Curriculum location**: physics / optics (entry node of the domain)
- **Prerequisites** (from KG `requires`, with the load-bearing part): none — this
  is a root concept. It assumes only everyday experience of light sources and
  shadows. The luminous / non-luminous distinction is built inside the lesson.
- **Unlocks** (from KG): none listed. The straight-ray model is the working
  assumption of all geometric optics — `phys.opt.reflection`, `phys.opt.mirrors`,
  `phys.opt.refraction` and `phys.opt.lenses` all draw straight rays between
  surfaces.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery threshold**: 0.70 ·
  **Est. hours**: 2 · **References**: NCERT Science Class 6 Ch. 11; NCERT Science Class 7

## Learning Objective

After this concept, the learner can:

1. State that light travels in straight lines in a uniform medium and give
     evidence for it.
2. Predict a shadow's position and size by drawing straight rays from the source
     past the object's edges.
3. Distinguish umbra and penumbra and use them to explain total and partial solar
     eclipses and lunar eclipses.
4. Explain the pinhole camera's inverted image, compute its size with similar
     triangles, and predict the effect of a larger hole.

## Core Understanding

Light leaves a source — a luminous object such as the Sun, a flame or a torch — and travels in straight lines through a uniform medium such as air until something stops it. We see non-luminous objects, like the Moon or a page, only because light from a source bounces off them into our eyes. The evidence for straight-line travel is everyday: you cannot see a candle through a bent pipe, and three cards with holes show the flame only when the holes are exactly in line.

A shadow follows directly. An opaque object blocks the straight rays that hit it, so the region behind it receives no light from the source. Draw rays from the source grazing the object's edges and you have the shadow's outline. With a small (point) source the shadow is sharp and its size grows as the object moves toward the source: shadow size / object size = (source-to-screen distance) / (source-to-object distance). With a large (extended) source, the shadow has two parts: the umbra, where no part of the source can be seen, and the penumbra around it, where part of the source is blocked and part is visible. A shadow is not a picture of the object — it is missing light, so it has no colour.

Eclipses are shadows on an astronomical scale. In a solar eclipse the Moon is between the Sun and the Earth: people in the Moon's umbra see a total eclipse, people in its penumbra a partial one. In a lunar eclipse the Earth is between the Sun and the Moon, and the Moon passes through the Earth's shadow — which can only happen at full Moon. Eclipses are rare because the Moon's orbit is tilted about 5° to the Earth's, so the three bodies usually do not line up. The Moon's monthly phases are something else entirely: half the Moon is always sunlit, and the phase is how much of that half faces us.

A pinhole camera uses the same rule. A ray from the top of an object passes straight through the tiny hole and lands at the bottom of the screen; a ray from the bottom lands at the top. So the image is inverted, and by similar triangles image height / object height = image distance / object distance: a 10 m tree 50 m away gives a 4 cm image in a 20 cm box. A larger hole lets in more light but each point of the object now makes a small patch, the patches overlap, and the image blurs.

## Mental Models

- **Beginner (arriving)**: light "fills" a room; shadows are dark shapes that
  objects have; the Moon's phases are the Earth's shadow.
- **Intermediate**: light travels in straight rays from a source; a shadow is the
  region rays cannot reach; umbra and penumbra come from point vs extended
  sources; the pinhole camera inverts by crossing rays.
- **Advanced**: shadow and image sizes follow from similar triangles; eclipse
  geometry (umbra cone of the Moon just reaching the Earth) explains why total
  solar eclipses are seen only along a narrow track; the orbital tilt explains
  eclipse seasons.
- **Expert**: the ray model is the short-wavelength limit of wave optics. At
  sharp edges and small holes, diffraction blurs shadows and limits how small a
  pinhole can usefully be (`phys.opt.diffraction`).
- **Versioning note**: install the intermediate model with the similar-triangle
  calculation; signal that ray diagrams in reflection and lenses use the same
  straight rays.

## Why Students Fail

Learners treat a shadow as a thing the object casts out, like a dark copy, rather
than as missing light; then they cannot predict how its size changes with
distance. The pinhole camera's inverted image contradicts the expectation that a
"camera" shows the world as it is, so learners guess upright. And the Moon's
phases are almost universally explained by the Earth's shadow, a confusion with
lunar eclipses.

## Misconceptions

**M1 — A shadow is a dark copy of the object**
- *Why*: shadows look like silhouettes and move with the object, so they seem to
  belong to it (type 1, perceptual).
- *Symptom / phrases*: "a red ball makes a reddish shadow"; draws shadows without
  reference to the light source.
- *Detection probe (verbatim)*: "A torch shines on a red ball and a blue ball of
  the same size. What colour are their shadows?"
- *Recovery*: make both shadows — both are dark. A shadow is where light does not
  arrive; blocked light has no colour.
- *Verification*: predict shadow size and position for two source–object–screen
  arrangements by drawing rays.

**M2 — The Moon's phases are caused by the Earth's shadow**
- *Why*: the curved edge of a lunar eclipse looks like a phase (type 4,
  conflation of two phenomena).
- *Symptom*: "the crescent is the Earth's shadow on the Moon".
- *Detection probe*: "Why does the Moon look like a crescent some nights?"
- *Recovery*: at a crescent the Moon is near the Sun in the sky — the Earth is not
  between them, so its shadow cannot be on the Moon. A lamp and a ball moved round
  the learner's head shows phases with no shadow involved.
- *Verification*: classify crescent, half, full and eclipsed Moons by cause.

**M3 — The pinhole camera shows an upright image**
- *Why*: everyday cameras and screens show upright pictures (type 2, everyday
  experience).
- *Symptom*: draws the image upright; cannot say where a ray from the top lands.
- *Detection probe*: "A pinhole camera faces a candle. Upright or inverted image —
  show why with two rays."
- *Recovery*: trace one ray from the top of the flame through the hole — it lands
  low. One from the bottom lands high. Crossing rays invert the image.
- *Verification*: two image-orientation items and one similar-triangle calculation.

**M4 — A bigger pinhole gives a bigger, sharper image**
- *Why*: "bigger opening, more of the picture" (type 4, overgeneralisation).
- *Symptom*: says a larger hole makes the image larger or clearer.
- *Detection probe*: "Make the pinhole bigger. Brighter or dimmer? Sharper or
  blurrier? Bigger or smaller?"
- *Recovery*: each point of the object now sends a cone through the wider hole and
  makes a patch, not a point; overlapping patches blur. The size depends on the
  distances only.
- *Verification*: predict brightness, sharpness and size for two hole sizes.

## Analogies

- **Best analogy**: rays as tennis balls thrown in straight lines from a machine.
  Put a box in the way and there is a region behind it that no ball reaches —
  that is a shadow.
  *Breaking point*: balls bounce off and roll around; in the shadow, no light
  arrives at all (apart from light reflected from other surfaces).
- **Alternative**: the pinhole as a crossing point, like a seesaw — the top end
  going down puts the other end up.
  *Breaking point*: a seesaw rotates; rays simply cross. Use only for the inversion.
- **Anti-analogy to avoid**: "a shadow is the object's dark reflection." This
  installs M1 and confuses shadows with mirror images.

## Demonstrations

- **Home, no equipment**: hand shadows from a phone torch held near and far from
  the hand — the shadow grows as the hand nears the light. Then with a frosted
  bulb, the fuzzy penumbra appears.
- **Teacher demo**: three cards with holes and a candle; a bent and a straight pipe.
- **Pinhole camera**: a shoebox, foil with a pinhole, tracing paper at the back,
  pointed at a window — the scene appears inverted. Widen the hole to show the
  blur.
- **Eclipse model**: a lamp (Sun), a large ball (Earth) and a small ball (Moon) in
  a line, umbra and penumbra visible on the small ball.
- **Prediction before demo**: "upright or inverted?" before the pinhole camera.

## Discovery Questions

Guided discovery fits this concept well — every result follows from one rule.

**Structure**:
1. *Need*: "Why does your hand's shadow grow when you move it towards the torch?"
2. *Discovery*: draw the grazing rays for two hand positions and compare.
3. *Extend*: "What if the light were a big frosted bulb?" → umbra and penumbra.
4. *Apply*: eclipses and the pinhole camera from the same straight rays.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): torch, ball, wall; cards with holes.
2. **Worked examples** (high fit): shadow size by ratio; pinhole image size by
   similar triangles.
3. **Error exposure** (high fit for M1/M2/M3): coloured balls; crescent vs eclipse;
   the upright-image prediction.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Shadow: point source 1 m from a 5 cm coin, wall 3 m from the source →
       shadow 5 × 3/1 = 15 cm.
   (b) Pinhole: tree 10 m tall, 50 m away, box 20 cm → image 10 × 0.2/50 = 0.04 m
       = 4 cm, inverted.
   (c) Eclipse: Sun–Moon–Earth line; umbra → total, penumbra → partial.

2. **ERROR-ANALYSIS** — a student writes "the crescent Moon is the Earth's shadow".
   Ask where the Earth would have to be for that, and where the Moon appears in
   the sky at a crescent.

3. **PREDICTION-BEFORE-DEMO** — before the pinhole camera, ask upright or inverted.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "Draw the shadow of a ball near a torch" → "solar or lunar eclipse: which has
   the Moon in the middle?" → "why is the pinhole image upside down?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "straight line from the source"
every time a shadow or image is located; calls a shadow "missing light", never
"the object's dark shape"; separates "phase" and "eclipse" deliberately.

*Load-bearing sentence to slow down on*: "A shadow is not something the object
makes — it is the region the straight rays from the source cannot reach."

*What to listen for*: "coloured shadow" → M1; "Earth's shadow makes the crescent"
→ M2; "the image is the right way up" → M3; "bigger hole, clearer picture" → M4.

## Assessment Signals

**Diagnostic — golden probe**: "A torch shines on a ball in front of a wall. Draw
or describe where the shadow falls and why it is that size." Correct: straight
rays from the torch grazing the ball's edges mark the shadow's outline.

**Distractor-mapped items**:
- "Cause of a crescent Moon?" Options: Earth's shadow, Moon's rotation, how much
  of the sunlit half faces us, clouds. Answer: how much of the sunlit half faces
  us. Distractor "Earth's shadow" targets M2.
- "Pinhole camera image of a candle?" Options: upright and same size, inverted,
  upright and blurred, no image. Answer: inverted. Distractor "upright" targets M3.

**Guided practice → independent practice fading ladder**:
1. Shadow drawings for a point source (3 arrangements).
2. Shadow size by ratio (3 problems).
3. Umbra and penumbra with an extended source (2 drawings).
4. Eclipse diagrams and phase classification (4 items).
5. (Unscaffolded) pinhole image size and the effect of hole size.

**Mastery gate set** (per assessment/05):
- *Production*: 2 shadow calculations and 2 pinhole calculations.
- *New surface*: an extended source of unusual shape (a long tube light).
- *Mixed*: phase vs eclipse classification interleaved with calculations.
- *Delayed*: one-week check — why no eclipse every month.

**Calibration note**: the topic feels like primary-school content, so learners are
confident. The check that reveals miscalibration is the phases question — many
confident learners still give the Earth's-shadow explanation.

## Tutor Recovery Strategy

*Likeliest utterance*: "isn't the shadow just the dark part of the object?" (M1);
"the Earth blocks the light — that's the crescent" (M2).

*Concept-specific smaller question*: "Put your finger on the torch. Now draw a line
from it past the top of the ball. Where does it hit the wall?" The learner
generates the shadow edge themselves.

*M2 recovery*: "When the Moon is a thin crescent at sunset, which side of the sky
is it on — near the Sun or opposite?" (Near.) "Then can the Earth be between them?"

## Memory Hooks

- **Concept type**: principle (straight-line propagation) + applications
  (shadows, eclipses, pinhole camera).
- **Review form** (per Delivery 2 §8): principle → one ray drawing per review;
  applications → contrast pairs (phase vs eclipse; point vs extended source).
- **Automaticity target**: drawing grazing rays to find a shadow should be
  automatic before `phys.opt.reflection` ray diagrams.
- **Interleaving partners**: `phys.opt.reflection`, `phys.opt.mirrors`.

## Transfer Connections

- *Near*: `phys.opt.reflection` and `phys.opt.mirrors` — the same straight rays,
  now bouncing.
- *Near*: `phys.opt.lenses` — a lens does what the pinhole does, without the
  dimness, by bending many rays to the same point.
- *Far*: `phys.opt.diffraction` — where the straight-ray model fails, at very small
  holes and sharp edges.
- *Real-world*: sundials, shadow-based height measurement, camera obscura rooms,
  safe eclipse viewing with a pinhole projector.
- *Expert transfer*: transits of planets across the Sun and exoplanet detection
  by the dip in a star's light — eclipses again.

## Cross-Subject Connections

- **Mathematics**: similar triangles give shadow and image sizes directly; the
  same method measures the height of a tree or a pyramid from its shadow.
- **Geography**: day and night, shadow length through the day and seasons follow
  from straight rays from the Sun meeting a curved Earth.
- **Biology**: the eye's pupil acts like a pinhole aperture; some molluscs
  (Nautilus) have pinhole eyes with no lens.
- **History of science / Astronomy**: the shape of the Earth's shadow during lunar
  eclipses is round, one early evidence that the Earth is a sphere.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.opt.rectilinear-propagation.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 16). The optics domain
previously opened at `phys.opt.nature-of-light` (proficient), with no
middle-school entry point; this node is that entry point and a second root of the
physics KG.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.

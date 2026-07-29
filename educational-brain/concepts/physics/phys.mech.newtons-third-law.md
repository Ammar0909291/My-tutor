# phys.mech.newtons-third-law — Newton's Third Law of Motion

## Identity
- **Canonical KG ID**: `phys.mech.newtons-third-law`
- **Canonical name**: Newton's Third Law of Motion
- **Curriculum domain**: Mechanics
- **Difficulty tier**: developing
- **Bloom level**: understand
- **Prerequisites**: `phys.mech.newtons-second-law`
- **Unlocks**: (none in current KG)
- **Estimated study hours**: 3
- **KG description**: For every action force there is an equal and opposite reaction force acting on a different body.

---


## Learning Objective

See Blueprint (`docs/curriculum/blueprints/phys.mech.newtons-third-law.md §1 Learning Objective`) for the full graded objective with accuracy thresholds and protocol assignments.


## Core Understanding

If forces always come in equal and opposite pairs, how does anything ever accelerate? This is the question that reveals whether a learner truly understands Newton's Third Law — or has only memorised it.

The law: when object A exerts a force on object B, object B simultaneously exerts an equal and opposite force on object A. These two forces are equal in magnitude, opposite in direction, and act on different objects. They always exist simultaneously and always disappear simultaneously. You cannot have one without the other.

The resolution to the "nothing should accelerate" confusion: Newton's Third Law pairs act on different objects; Newton's Second Law applies to the forces on one object. When you push a box, the box pushes back on you with equal force — but the box accelerates forward and you stay still (mostly) because the net force on the box is your push minus friction, while the net force on you includes the box's push plus your legs' friction with the floor. The two objects experience different net forces even though each force has an equal-and-opposite partner somewhere.

Three specific examples of Third Law pairs that confuse learners:

The book on the table: the book pushes down on the table with its weight (gravitational force), and the table pushes up on the book with a normal force. These look like a Third Law pair but are not — they happen to cancel because the book is in equilibrium, but they are different TYPES of forces (gravity and contact). The actual Third Law pairs are: Earth's gravity pulls book down ↔ book's gravity pulls Earth up; table pushes book up ↔ book pushes table down.

The rocket in space: "there's nothing to push against" is the misconception. The rocket pushes exhaust gas backward; exhaust gas pushes rocket forward. The reaction is not with the environment — it is with the exhaust.

Walking: you push backward on the ground with your foot; the ground pushes forward on you. You accelerate forward because of the ground's push on you, not because of your own push — you cannot push yourself forward directly.

## Mental Models

**Stage 1 — Concrete (pushing a wall)**
Push a wall with your hand. The wall pushes back — you feel it. If you stand on a skateboard and push the wall, you roll away. The wall exerts an equal and opposite force on you. You cannot push something without it pushing you back. This mutual pushing is Newton's Third Law: forces always come in equal and opposite pairs.

**Stage 2 — Statement and structure**
Newton's Third Law: If object A exerts a force F⃗ on object B, then object B exerts a force −F⃗ on object A simultaneously.

Action-reaction pair properties:
1. Equal in magnitude
2. Opposite in direction
3. Same type of force (both contact, or both gravitational, or both electric — never "push from A" paired with "pull from B" of a different type)
4. Act on DIFFERENT objects (never on the same object)
5. Simultaneous (both exist at the same instant — no causal delay)

**Stage 3 — Why objects have different accelerations**
If A and B exert equal and opposite forces on each other, why do they accelerate differently? Because their masses differ.
- F_AB = −F_BA (Newton's 3rd: equal magnitudes)
- a_A = F_BA/m_A; a_B = F_AB/m_B
- a_A/a_B = m_B/m_A

A heavy truck and a light car collide. Forces on each are equal (Newton's 3rd). The car (small m) gets large acceleration; the truck (large m) gets small acceleration. Both experience the SAME force magnitude.

**Stage 4 — System analysis (when to include vs. exclude action-reaction pairs)**
Action-reaction pairs ALWAYS act on different objects. For the free-body diagram of a SINGLE object, you include forces FROM other objects acting ON it — not the reaction forces it exerts on others.

For a SYSTEM of objects, internal action-reaction pairs cancel (Newton's 3rd law pairs sum to zero internally), leaving only external forces to drive the system's centre of mass:
F_ext = M_total × a_cm (Newton's 2nd law for a system)

This is the foundation of momentum conservation: if F_ext = 0 → Δp = 0.

**Mental-model versioning**: Stage 1 for conceptual entry; Stage 2 for identifying valid action-reaction pairs; Stage 3 for why unequal accelerations occur despite equal forces; Stage 4 for system thinking and the link to momentum.

---

## Why Students Fail

1. **Action-reaction on same object**: Students draw FBDs with both the action and reaction force on the same object. The law requires the pair to act on DIFFERENT objects. Any force on object A's FBD comes FROM another object — not from A itself.
2. **"The heavier object exerts more force"**: Students think the truck hits the car harder than the car hits the truck. By Newton's 3rd law, the force magnitudes are equal. The truck is harder to stop (more momentum), but the force exerted on the car equals the force exerted on the truck.
3. **Action comes before reaction**: "Action-reaction" implies a time sequence. In fact, the forces are simultaneous — there is no cause-effect delay between the pair. The naming is historical, not temporal.
4. **Mixed-type pairs**: Students pair a normal force from the floor on a book with the weight of the book (gravity from Earth). These are NOT an action-reaction pair: normal force is contact, gravity is gravitational; they act on the same object (book). The real pair for normal force: floor pushes book UP; book pushes floor DOWN (same contact-type, on different objects).

---

## Misconceptions

**M1 — "The heavier object pushes harder"**
- Probe: "A 5000 kg truck collides with a 1000 kg car. Which object experiences a larger force during the collision?"
- Characteristic phrase: "The truck is so much bigger — it must push the car much harder than the car pushes it."
- Recovery: Newton's 3rd law is absolute: F_truck-on-car = −F_car-on-truck. Same magnitude. What differs is acceleration: a_car = F/m_car (large); a_truck = F/m_truck (small). The car gets thrown around more because of its small mass, not because it receives a larger force. The driver's risk comes from their body's acceleration, not from the force alone.

**M2 — "Normal force from floor and weight are an action-reaction pair"**
- Probe: "I place a book on the table. The book's weight pulls it down; the table's normal force pushes it up. These are Newton's 3rd law pair, right?"
- Characteristic phrase: "They're equal and opposite — they must be Newton's 3rd law."
- Recovery: Newton's 3rd law pairs are the SAME TYPE of force acting on DIFFERENT objects. Weight (gravitational) acts on the book FROM Earth; normal force (contact) acts on the book FROM table — two different force types, both on the book → NOT a pair. The real Newton's 3rd law pairs are: (1) Earth pulls book down (gravity) ↔ book pulls Earth up (gravity) — gravitational pair; (2) Table pushes book up (contact) ↔ book pushes table down (contact) — contact pair. Two separate pairs; four forces total; no two from the same pair act on the same object.

**M3 — "Action causes reaction (there's a time delay)"**
- Probe: "Does the reaction force happen after the action force?"
- Characteristic phrase: "First you push, then the wall reacts."
- Recovery: Both forces exist simultaneously as long as the interaction exists. The moment your hand touches the wall, both forces appear: hand on wall and wall on hand — at exactly the same instant. When you lift your hand, both vanish simultaneously. No causal ordering. The "action-reaction" terminology is historical (Newton's Principia used "action" to mean force applied); it does not imply a time sequence.

**M4 — "If forces are equal and opposite they cancel, so nothing moves"**
- Probe: "Newton's 3rd law says the car pushes the truck with an equal and opposite force to what the truck exerts on the car. So the net force is zero and neither object accelerates."
- Characteristic phrase: "Equal and opposite forces cancel out."
- Recovery: The cancellation rule applies only to forces on the SAME object (Newton's 2nd law: F_net on one object). Newton's 3rd law pairs act on DIFFERENT objects. The force on the car is not balanced by the force on the truck — they act on separate objects with separate F = ma equations. Each object has its own FBD with its own net force. Equal and opposite forces on different objects ≠ zero net force on either object.

---

## Analogies

**Primary analogy — Two ice skaters**
Two skaters push off each other from rest. They fly apart. Small skater flies far; large skater moves less. Same force on each (Newton's 3rd law). Different accelerations (Newton's 2nd law). The force pair is easy to identify — each skater exerts a contact force on the other. Neither is "cause" or "effect" — the push is mutual and simultaneous.

**Breaking point**: The skater analogy involves two agents who intentionally push. Many Newton's 3rd law situations (gravity between Earth and book, magnetic attraction) involve no intentional action. The word "action" in the law is not intentional action — it is any force interaction. Don't let the skater analogy imply the law only applies to contact forces.

**Anti-analogy — Cause and effect**: Newton's 3rd law is NOT a cause-effect law (A causes B to respond). It is a simultaneous symmetry of force interactions. Using a causal mental model produces M3 (time-delay misconception) and leads to wrong reasoning about which force "starts" the interaction.

---

## Demonstrations

**D1 — Two carts on a track with spring bumper**
Place two carts on a frictionless track, one heavy and one light, with a compressed spring between them. Release: both fly apart. Measure velocities. Verify: m₁v₁ = m₂v₂ (magnitudes equal = equal impulse = equal force × time = Newton's 3rd law). The small cart moves faster — different accelerations from equal forces (Newton's 2nd).

**D2 — Force sensor pair (Vernier or Pasco)**
Connect two force sensors with a string. Pull from both ends. No matter what combination of forces you apply, both sensors always read the same magnitude. Even when one end is attached to a wall: sensor in hand equals sensor on wall — proves that the wall exerts a force equal to what you exert on it.

**D3 — Balloon rocket**
Inflate a balloon and release it. Air jets backward; balloon flies forward. Action = balloon pushes air backward; reaction = air pushes balloon forward. No propeller, no external push, no ground contact — pure Newton's 3rd law in action. The demonstration is simple, surprising, and directly analogous to rocket propulsion.

---

## Discovery Questions

*Guided discovery is highly effective for Newton's 3rd law*:

1. Hold two force sensors facing each other between two students. Ask each student to push gently. Observe readings — they match.
2. Ask: "What if one person pushes harder?" → Readings still match.
3. Ask: "What if one sensor is fixed to a wall?" → Reading on hand = reading on wall.
4. State: "The forces are always equal in magnitude and opposite in direction. This is Newton's Third Law."
5. Ask: "So why do things accelerate differently?" → Two carts demo with different masses. → Answer: equal forces, different masses → different accelerations (Newton's 2nd law).
6. The students discover the law empirically before it is stated formally.

---

## Teaching Sequence

| Situation | Action |
|---|---|
| Student draws action-reaction pair on same FBD | Ask: "This FBD is for object X. Can object X exert a force on itself?" (No.) "Every force on this FBD must come FROM a different object." Remove the self-force. |
| Student says truck exerts more force on car | Ask: "If Newton's 3rd law gives equal forces, what accounts for the car being thrown around more?" → mass difference → acceleration difference (Newton's 2nd). |
| Student identifies weight and normal as a pair | Ask: "What type is weight?" (gravitational) "What type is normal force?" (contact). "Are they the same type?" (No.) "Newton's 3rd law pairs must be the same type." Find the real pairs: Earth-book gravity pair; book-table contact pair. |
| Student says forces cancel so nothing moves | Draw two separate FBDs: one for the car, one for the truck. Each has its own net force. The forces are on different objects — they don't cancel each other on either object's diagram. |
| Student ready for momentum | Show that Newton's 3rd law + 2nd law → conservation of momentum: F_AB = −F_BA → m_A a_A = −m_B a_B → m_A Δv_A = −m_B Δv_B → Δ(m_A v_A + m_B v_B) = 0. |

---


## Tutor Actions

Priority dispatch (in order):

1. **PREDICTION-BEFORE-DEMO** — truck-and-car collision prediction: "A 20-tonne truck
   and a 1-tonne car collide head-on. During the collision, which object exerts the
   greater force on the other?" Require a written/spoken answer before any explanation.
   Most learners say the truck. After discussion: the forces are equal in magnitude,
   opposite in direction. Ask: "Why is the car destroyed and the truck undamaged?"
   (Answer: same force, very different masses → very different accelerations.)

2. **DECISION-TABLE** — use the Teaching Sequence table for the specific situational
   responses: same-FBD error, weight-normal confusion as a pair, "forces cancel" error.
   Each row is one learner error and one clarifying question — ask the question, don't
   correct the error directly.

3. **PAIR-IDENTIFICATION DRILL** — five interaction scenarios; learner names the
   Newton's-third-law pair for each force:
   (a) Earth pulls book down → book pulls Earth up (same type: gravitational)
   (b) Table pushes book up → book pushes table down (contact)
   (c) Foot pushes ground backward → ground pushes foot forward (contact — propulsion)
   (d) Magnet attracts iron → iron attracts magnet (magnetic)
   (e) Rocket exhaust pushes backward → exhaust gas pushes rocket forward (contact)

4. **RETRIEVAL-SCHEDULE-PROMPT** — three session openers:
   "Name the Newton's-third-law partner of the normal force on a book from a table" →
   "Why don't action-reaction pairs cancel?" → "A horse pulls a cart forward. Why does
   anything move if the cart pulls the horse backward with equal force?"

## Voice Teaching Notes

"Newton's Third Law: every force has a partner force, equal in magnitude, opposite in direction, acting on a different object. Always on a different object — that's the crucial part.

When you push a wall, the wall pushes you back. Same size, opposite direction. If you're on skates, you roll away — the wall's reaction force accelerates you. The wall barely moves because its mass is enormous. Equal forces, different accelerations — that's Newton's 2nd doing the work.

The classic trap: students say weight and normal force are a Newton's 3rd law pair. They're equal and opposite, yes — but they're both on the same object (the book). Newton's Third never puts the pair on the same object. The actual pairs are: Earth pulls book down, book pulls Earth up (gravity pair). Table pushes book up, book pushes table down (contact pair). Four forces, two pairs, each pair on different objects.

And the action-reaction language is misleading — it sounds like A acts and then B reacts. No. They happen simultaneously. The moment contact is made, both forces appear. The moment contact breaks, both forces vanish. No cause-effect delay, no time sequence."

---

## Assessment Signals

**Mastery gate**: Student correctly identifies Newton's 3rd law pair for a given force (same type, opposite direction, different object), draws a FBD with no self-forces, explains why action-reaction pairs do not cancel in Newton's 2nd law applications, and correctly predicts which object accelerates more when forces are equal. Three multi-step problems including at least one FBD identification task.

**Formative golden probe**: "A horse pulls a cart forward with force F. The cart pulls the horse backward with force F (Newton's 3rd law). These forces are equal and opposite — so how does the horse-cart system ever move?"
- The system DOES accelerate because the ground pushes the horse forward (friction on horse's hooves) and friction pushes the cart backward (between wheels and ground, but rolling friction is small). The net external force on the SYSTEM is the friction from the ground on the horse minus the rolling resistance. The horse-cart interaction is internal — it cancels within the system.
- This is the famous "horse-and-cart paradox" — its resolution requires distinguishing internal from external forces.

**Confidence calibration**: After the horse-cart problem, ask: "Does the horse exert more, less, or equal force on the cart compared to the cart on the horse?" If student says "more" (overriding Newton's 3rd law), probe until they can state the law correctly and apply it to this case.

**Delayed retrieval (1–2 weeks)**: "Identify the Newton's 3rd law pair for: the gravitational force Earth exerts on the Moon. State the type, magnitude relationship, direction, and which objects the pair acts on."

---

## Tutor Recovery Strategy

**If weight-normal pair confusion persists**:
Make the type distinction explicit: gravitational forces act between any two masses over any distance. Contact forces require physical contact. Weight and normal force are different types. The Newton's 3rd law weight partner is NOT a contact force — it is the gravitational pull the book exerts on the Earth. Draw this carefully, including the Earth as a body with an upward gravitational pull from the book.

**If "forces cancel" confusion persists**:
Practice single-object FBDs rigorously before combining Newton's laws. A clear FBD habit — where each arrow represents one real force from one external source — prevents the "self-cancellation" error. The cancellation argument requires both forces to act on the same object; FBD discipline makes the objects explicit.

**If students cannot identify action-reaction pairs**:
Use the sentence template: "Object A exerts a [type] force on Object B." The Newton's 3rd law pair is: "Object B exerts a [same type] force on Object A." Fill in the template for each force in the problem before writing any equations.

---

## Memory Hooks

**Memory type**: Declarative (the law statement + pair properties) + conceptual (why unequal accelerations occur, why pairs don't cancel)
**Forgetting risk**: Medium — the law is easily stated but misapplied. The weight-normal pair error and the "forces cancel" error are highly persistent.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "A book sits on a table. Identify all Newton's 3rd law pairs involving the book. For each pair, state: type of force, magnitude relationship, direction, and which objects it acts on."

---

## Transfer Connections

**Near transfer**: Momentum conservation (Newton's 3rd law + 2nd law → Δp_total = 0 when F_ext = 0). Impulse-momentum theorem for collisions.
**Medium transfer**: Rocket propulsion (ejected mass provides reaction thrust — Newton's 3rd law in vacuum). Walking, swimming, flying (all locomotion involves Newton's 3rd law reaction forces from the environment).
**Far transfer**: Electromagnetic radiation reaction force (radiation pressure on a laser cavity mirror — photon momentum exchange). Ion thruster design (exhaust ion velocity × mass flow rate = thrust from Newton's 3rd law).
**Cross-domain**: Economics — every transaction has a buyer and seller; the value exchanged is equal in both directions (transactional Newton's 3rd law — structurally analogous, not physically identical).

---


## Cross-Subject Connections

Mathematics: kinematics uses calculus (differentiation for velocity/acceleration, integration for displacement); vectors use linear algebra; energy methods use algebra and trigonometry. Chemistry: thermochemistry uses energy and work; reaction kinetics connects to activation energy. Biology: biomechanics (muscle force, gait), fluid mechanics in circulation (blood pressure, flow), and structural biology (bone stress) apply mechanics.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mech.newtons-third-law.md` (authoritative for Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite sections by reference, never restate here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages runtime-served explanation and probe assets. Authored seed assets for this concept are in `src/lib/teaching/assets/authoredSeedAssets.ts`.

- **Explanation assets**: multiple grade-band variants (MIDDLE / HIGH / ADULT) — core_explanation, worked_example, misconception_repair kinds
- **Probe assets**: MCQ and misconception_probe kinds, distractor-mapped to this entry's misconception IDs  
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database required to activate

## Curriculum Feedback

- KG prerequisite `phys.mech.newtons-second-law` is necessary — students need F_net = ma before the question "why do the objects accelerate differently despite equal forces?" can be answered.
- No unlocks listed in the current KG; natural future extensions are `phys.mech.momentum` and `phys.mech.impulse`, for which Newton's 3rd law is the foundational derivation.
- Difficulty `developing`/`understand` is correct — the statement is simple, but genuine understanding (pairs on different objects, no cancellation of different-object forces) requires careful instruction.
- This concept has one of the richest misconception histories in all of introductory physics. The three classic errors (weight-normal pair, forces cancel, heavier exerts more) should be directly and explicitly addressed in every lesson.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*

## Version History

- **v1.0** (2026-07-29): Migrated from pre-standard format to EDUCATIONAL_BRAIN_STANDARD.md v1.0 21-section structure. All sections verified against Quality Gates 1–8.

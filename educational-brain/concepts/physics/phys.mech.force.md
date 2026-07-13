# Force and Interaction — `phys.mech.force`

## Identity

- **Concept ID**: `phys.mech.force`
- **Curriculum location**: physics / classical mechanics
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.meas.scalars-vectors` — the load-bearing part is that vectors have
    both magnitude AND direction, and that two quantities with the same magnitude
    in opposite directions are different quantities (they can cancel). This is the
    minimum prerequisite for understanding why a force is not complete without a
    direction — and why two forces of equal magnitude can produce zero NET force.
- **Unlocks** (from KG): `phys.mech.newtons-first-law`, `phys.mech.newtons-second-law`
  — and via these, all of classical dynamics. Force is the central concept of
  Newtonian mechanics: every dynamical argument is about forces — their identification,
  their vector sum (net force), and their relationship to motion. A learner who
  does not understand force as an INTERACTION between two objects (not a property
  of one object) will systematically misapply Newton's third law.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery threshold**: 0.70 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 9 Ch. 9
- **Learning objectives** — the learner can:
  1. Define force as a vector quantity representing an INTERACTION between two
     objects, requiring both an agent (what exerts the force) and a recipient
     (what experiences it).
  2. Classify forces as contact forces (normal, friction, tension, applied) or
     field forces (gravity, electric, magnetic) and give examples of each.
  3. Identify all forces acting ON a single object in a given scenario and draw
     a free-body diagram showing them as vectors.
  4. Explain why net force (vector sum of all forces on an object) — not any
     individual force — determines the change in motion.

## Mental models

- **Beginner (arriving)**: a force is a push or pull exerted by a person or
  a visible agent. Forces are things that cause motion. An object at rest has
  no forces on it. Forces are not "real" unless they come from a physical contact.
  Gravity is a property of objects ("things fall"), not a force.
- **Intermediate**: a force is a vector interaction between two identifiable
  objects — always from something specific, on something specific. Contact forces
  require physical touching; field forces act at a distance. The NET force (vector
  sum) determines the change in motion — not any individual force. An object can
  have multiple forces acting on it simultaneously; these add as vectors. An object
  at rest can have multiple forces acting on it — they simply balance (net force = 0).
- **Advanced**: forces are the fundamental dynamical quantities in Newtonian
  mechanics. They appear in Newton's second law as F_net = ma. Every force has a
  third-law pair (equal and opposite force on the OTHER object in the interaction).
  The concept of force is frame-dependent: in non-inertial frames, "fictitious
  forces" (centrifugal, Coriolis) appear that have no third-law partner. Free-body
  diagrams are the standard tool for isolating one object and identifying all
  forces on it.
- **Expert**: forces emerge from fundamental interactions (gravitational, electromagnetic,
  strong nuclear, weak nuclear). The force concept is classical; in quantum field
  theory, forces are mediated by boson exchange. The concept of force is replaced
  by field gradients and potentials in Lagrangian/Hamiltonian mechanics.
- **Versioning note**: install the intermediate model here — force as a vector
  interaction with two parties; net force as the relevant quantity; contact vs.
  field classification. Signal the Newton's-law connection: "once you know the
  net force, Newton's second law tells you the acceleration — and that's the next
  step."

## Why beginners fail here

The "force as a property of one object" belief (forces are STORED in objects,
not exchanged between them) is the root of most Newton's-third-law failures.
"The book pushes down on the table with gravity" (wrong framing — gravity
is between Earth and book, not book and table) confuses the agent and
the recipient. The second major failure: "an object at rest has no forces"
— the learner doesn't accept that the book on a table has two forces acting
on it (gravity down, normal force up) because "it's not moving, nothing is
happening." The third: "force causes motion" rather than "force causes CHANGE
in motion" — this causes misidentification of forces as the source of constant
velocity (the impetus error from Newton's first law).

## Misconception library

**M1 — Force is a property of one object, not an interaction between two**
- *Why*: "pushing" and "pulling" are described from one person's perspective;
  the other object is a passive recipient (type 2, egocentric language of force).
- *Symptom / phrases*: "the book has a gravity force"; "the force is in the ball
  after it's thrown"; "the force belongs to the stronger object."
- *Detection probe (verbatim)*: "A book rests on a table. Earth pulls the book
  down. What is the AGENT of this force? What is the RECIPIENT?" Correct: Earth
  is the agent; the book is the recipient. Wrong: "the book" or "gravity is just
  there" — missing the two-object structure.
- *Recovery*: draw every force as an arrow with TWO labels — "WHO pushes/pulls"
  and "ON WHAT." Practice naming both for every force in a scenario before drawing
  the arrow. "The Earth pulls the book downward" → agent: Earth; recipient: book;
  direction: down. Enforce this labelling for every force in every problem.
- *Verification*: given 5 scenarios, learner names agent, recipient, and direction
  for every force listed.

**M2 — An object at rest has no forces on it**
- *Why*: "no change in motion → nothing happening → no forces" — a plausible
  inference from M1 (force causes motion) (type 2, casual causal reasoning).
- *Symptom / phrases*: "the book is just sitting there — no forces"; "if there
  were forces, it would move"; "the normal force doesn't exist unless something
  is pushing."
- *Detection probe*: "A book rests on a table. List all forces on the book."
  Wrong: "gravity (or nothing)." Correct: gravity downward (Earth-book) AND
  normal force upward (table-book). Both are real; they balance.
- *Recovery*: the hand-on-palm demonstration — hold the book on your palm. Do you
  feel a force? (Yes — the book's weight.) Is your hand exerting a force? (Yes —
  upward, to hold it.) "The table does exactly what your hand does — it exerts
  an upward force. When the book is on the table rather than in your hand, the
  force doesn't vanish — the table exerts it instead." This makes the normal force
  tactile and real.
- *Verification*: free-body diagrams for five at-rest objects — learner must
  include all forces (including normal forces and tension).

**M3 — Forces cause motion (not change in motion)**
- *Why*: the impetus model (motion needs a cause) — this is the same root as
  Newton's first law M1, now manifesting as a force-concept error (type 2).
  The two concepts (force and Newton's first law) teach the same misconception
  from two sides.
- *Symptom / phrases*: "the force keeps it moving"; "you need a force to maintain
  velocity"; equates force with velocity rather than with acceleration.
- *Detection probe*: "A hockey puck slides on frictionless ice after being hit.
  What force keeps it moving?" Wrong: "the force of the hit is still in it."
  Correct: "nothing — no force is needed to maintain constant velocity."
- *Recovery*: connect to Newton's first law. Forces do not CAUSE motion; forces
  CHANGE motion. A puck moving without friction has no forces (approximately) —
  and maintains its velocity because no force is changing it. The reason things
  stop on Earth is friction and air resistance — those are forces.
- *Verification*: five scenarios — two where there IS a force (object accelerating),
  two where there is no NET force (object at constant velocity), one where the
  learner must distinguish.

**M4 — Net force = arithmetic sum of force magnitudes**
- *Why*: same as displacement/velocity M1 — numbers add as scalars by default
  (type 4, overgeneralisation from arithmetic).
- *Symptom*: for 3 N north and 4 N east, says net force = 7 N without direction.
- *Detection probe*: "Forces of 3 N north and 4 N east act on an object. What
  is the net force?" Wrong: 7 N. Correct: 5 N at 53° north of east.
- *Recovery*: net force is a VECTOR sum — the same vector addition the learner
  learned in `phys.meas.vector-addition`. Draw the force vectors, apply the
  triangle law or component method. The net force is the resultant.
- *Verification*: three net-force calculations with forces at various angles.

## Explanation library

- **Age 12–14 (story)**: "A force is always from something, to something —
  never just 'in the air.' When you push a door, you are the agent; the door
  is the recipient. The door pushes back on you (Newton's third law — we'll get
  to that). Forces are invisible, but they always come in pairs: a pusher and a
  thing being pushed. Gravity is the Earth pulling the book; not the book 'having'
  gravity. The normal force is the table pushing back on the book — just like your
  hand would if you held the book up."
- **Age 14+**: "A force is a vector interaction between two objects. Every force
  has an agent (what exerts it) and a recipient (what experiences it). The NET
  force on an object — the vector sum of all forces on it — is what determines
  how the object's motion changes. Two large forces can cancel to give zero net
  force (object doesn't accelerate). One tiny force with no opposing force gives
  a nonzero net force (object accelerates). The magnitude of individual forces
  is less important than their vector sum."
- **Adult returning learner**: "Newton's breakthrough was realising that forces
  are not what keep objects moving — they are what change the motion. A satellite
  in orbit is constantly pulled by gravity (centripetal force), which continuously
  changes the direction of its velocity. But nothing 'keeps it moving' — it would
  keep moving forever without gravity; gravity just bends the straight path into
  a circle. Forces cause acceleration, not velocity."

## Analogy library

- **Best analogy**: a tug-of-war rope. The rope has TWO agents pulling on it —
  both exert forces on the rope (and through the rope, on each other). The rope's
  motion depends on the NET force (which team wins). A stationary rope has equal
  and opposite forces — net force zero. This shows: forces from both sides; net
  force determines motion; balance = zero net force = no acceleration.
  *Breaking point*: in tug-of-war, the rope deforms; in rigid-body force problems,
  the object is treated as a point. The deformation aspect is not part of the
  kinematic model.
- **Alternative**: arrows in a vector diagram — the net force is the single arrow
  that would replace all the individual force arrows and produce the same effect.
  This is the physical interpretation of vector addition of forces.
  *Breaking point*: this analogy is only useful once the learner already understands
  vector addition — it is more a representation tool than a conceptual bridge.
- **Anti-analogy to avoid**: "force is energy" or "the ball has the force of the
  throw inside it." Both install M1 and the impetus model. Always say: "force is
  an interaction between two objects at this moment — not a stored substance."

## Demonstration library

- **Home, no equipment**: hold a heavy book in your palm. Feel the forces — your
  hand pushes up (you feel the effort); the book pushes down (you feel the weight).
  "These are two real forces. When you put the book on a table, the table does
  what your hand was doing — pushes up. The book doesn't 'lose' its force; the
  table just takes over."
- **Teacher demo**: a spring scale measuring the weight of an object. Then place
  the same object on a table — the scale reads zero, but gravity still acts.
  Slide a pressure sensor between the object and the table — it reads the normal
  force, equal to the weight. The force IS there; just not visible.
- **Interactive**: a simulation with adjustable forces on an object. Add forces
  in different directions and magnitudes — observe the net force vector and the
  resulting acceleration.
- **Prediction before**: show a book on a table. "How many forces act on this
  book? Name them." Collect predictions before any teaching. Most learners say
  one (gravity). Reveal two. Then explain the normal force.

## Discovery lesson

**Guided discovery** is appropriate for the agent-recipient structure of force
and for the concept of net force.

**Discovery sequence**:
1. *Need*: push two objects simultaneously in opposite directions. "Which way
   does the object move?" (Depends on which force is larger.) "Why?" → the object
   responds to the COMBINATION of forces, not just one.
2. *Playground*: spring scales. Measure individual forces on an object from multiple
   directions. Observe that the object's acceleration is determined by the vector
   combination.
3. *Invention*: "net force" — the vector sum of all forces. The object "doesn't
   know" about individual forces; only the sum matters.
4. *Collision*: the book on the table — list the forces. If only gravity, why
   doesn't the book fall? → normal force discovered. Now the net force = 0
   explains the no-acceleration result.
5. *Formalization*: force as a vector interaction (agent, recipient, direction,
   magnitude); classification (contact/field); net force as the dynamically
   relevant quantity.

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Guided discovery** (high fit): the net-force concept and the normal-force
   discovery.
2. **Concrete-then-abstract** (high fit): spring scale measurements before
   algebraic definitions.
3. **Error exposure** (high fit for M2): the normal force on a resting object
   must be explicitly demonstrated before it is accepted.
4. **Free-body diagram practice** (high fit): drawing free-body diagrams is
   the primary procedural tool for identifying forces.

## Voice teaching

*How it sounds when taught well*: every force is spoken with its two-party
structure ("the EARTH pulls the BOOK downward"); the word "net force" appears
early and is distinguished from "force" by using it consistently; the tutor
draws a free-body diagram for every scenario, no exceptions.

*Load-bearing sentence to slow down on*: "The net force — the vector sum of ALL
forces on the object — is what determines whether the object accelerates. One
force alone tells you almost nothing without knowing the other forces." Slow.

*What to listen for*: "the book has gravity" (without naming Earth as agent) → M1;
"no forces because it's not moving" → M2; "force keeps it moving" → M3;
"3 N + 4 N = 7 N" (magnitude arithmetic on forces at angles) → M4.

## Assessment

**Diagnostic — golden probe**: "Draw and label all forces on a book resting on a
table." Correct: gravity downward (Earth on book) + normal force upward (table on book).
Missing normal force = M2; labelling gravity as "book's weight" without naming
Earth as agent = M1. This is the simplest real-physics free-body diagram.

**Distractor-mapped items**:
- "A book rests on a table. The net force on the book is: (A) gravity, (B) zero,
  (C) the normal force, (D) gravity plus normal force." Answer: B. Distractor A
  targets M2 (only gravity seen); distractor D (correct forces but wrong net —
  they cancel) reveals partial understanding.
- "What keeps a hockey puck moving after it is hit on frictionless ice? (A) the
  force of the hit stored in the puck, (B) nothing — no force is needed, (C) the
  puck's momentum as a force, (D) air pushing it." Answer: B. Targets M3.

**Guided practice → independent practice fading ladder**:
1. Name agent, recipient, and direction for 6 forces in described scenarios.
2. Draw free-body diagrams for 4 objects (at rest, in motion, on a slope, in air).
3. Calculate net force (vector) for 3 scenarios with forces at known angles.
4. Identify whether net force is zero or nonzero in 5 scenarios; predict
   whether the object accelerates.
5. (Delayed, 1 week): free-body diagram for an object on a slope with friction.

**Mastery gate set** (per assessment/05):
- *Production*: free-body diagram for two scenarios (one at rest, one accelerating),
  with every force named by agent, recipient, direction.
- *New surface*: net force calculation for three forces at arbitrary angles
  (using component method).
- *Mixed*: 6 scenarios — classify forces, draw FBDs, calculate net force.
- *Delayed*: one-week — FBD for a hanging object; net force on an accelerating object.

**Calibration note**: learners who can draw correct FBDs for standard cases (book
on table, hanging object) often fail on novel cases (object on slope, object in
circular motion). The mastery gate should include at least one non-trivial scenario.

## Recovery notes

*Likeliest utterance*: "the normal force isn't real, is it? Nothing is pushing
it" (M2); "the force keeps it moving, I just don't know which force" (M3).

*Concept-specific smaller question for M2*: "Put your hand flat under the book.
Are you exerting a force on it?" (Yes — upward.) "Now slowly lower the book onto
the table without removing your hand. The table touches the book — does the table
now exert an upward force?" (Yes — same thing your hand was doing.) Build from
tactile experience to invisible normal force.

*M3 recovery*: "Name the force that 'keeps the puck moving.'" When the learner
struggles to name an agent, point out: "there is no agent. No agent = no force.
No force = no change in motion = constant velocity. That's Newton's first law."

## Memory & review

- **Concept type**: concept (force as a vector interaction) + procedure (free-body
  diagrams).
- **Review form** (per Delivery 2 §8): concept — elaborative questioning ("who
  is the agent of the normal force in this scenario?"); procedure — free-body
  diagram practice embedded in every dynamics problem.
- **Automaticity target**: drawing a correct FBD (all forces, correct agents,
  correct directions) should be the automatic first step in every dynamics problem
  before Newton's second law is applied.
- **Interleaving partners**: `phys.mech.newtons-first-law` (force and the
  impetus misconception — the two concepts address the same root error from
  different angles); `phys.mech.newtons-second-law` (net force → acceleration);
  `phys.mech.free-body-diagram` (FBD as a formalised procedure).

## Transfer map

- *Near*: `phys.mech.newtons-first-law`, `phys.mech.newtons-second-law` —
  both are about net force and its relation to motion.
- *Near*: `phys.mech.free-body-diagram` — formal procedure for identifying forces.
- *Far*: `phys.mech.friction`, `phys.mech.tension`, `phys.mech.normal-force` —
  specific force types with more detailed analysis.
- *Cross-subject*: maths (vector addition — same operation applied to forces);
  chemistry (intermolecular forces — different scale, same vector concept).
- *Real-world*: structural engineering (identifying all loads on a bridge);
  sports (the multiple forces on a ball in flight: gravity, drag, lift, spin);
  medicine (forces on bones and joints).
- *Expert transfer*: in quantum field theory, forces are replaced by exchange of
  virtual bosons. The concept of "two-party interaction" remains — the boson is
  exchanged between two particles. Understanding forces as interactions is the
  classical foundation for the QFT picture.

## Curriculum feedback

The KG `requires` correctly lists `phys.meas.scalars-vectors` — force is the first
major vector quantity in mechanics. The `unlocks` list (Newton's first and second
laws) is correct. Missing from the KG relationship graph: `phys.mech.free-body-diagram`
should be a direct unlock of `phys.mech.force` — the FBD is the operational tool
for applying force concepts and cannot precede its understanding. The
`estimated_hours: 2` is appropriate for the concept; FBD automaticity requires
significantly more practice across subsequent dynamics topics.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

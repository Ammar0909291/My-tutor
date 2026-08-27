/**
 * REMEDIATION CARDS (Phase H6).
 *
 * ── WHAT A CARD IS ──────────────────────────────────────────────────────────
 * The small, plain account of a concept that a tutor gives when a learner says
 * "I don't understand". Not the reference explanation, not the misconception
 * register, not the teaching plan — the words themselves.
 *
 * Five phases established that the engine around this turn is sound and the
 * AUTHOR is not: the model writes the physics fresh every time, and it can be
 * wrong while being simple, concrete, on-concept and structurally perfect. A
 * card removes the author from the loop for the concepts it covers.
 *
 * ── THE PROMOTION CONTRACT — READ BEFORE CHANGING ANY `status` ──────────────
 * EVERY CARD IN THIS FILE WAS DRAFTED BY AN LLM. All are
 * `authorKind: 'AI_AUTHORED'`, `status: 'DRAFT'`, and NONE of them is
 * authoritative or reachable by a learner.
 *
 * `findRemediationCard` refuses anything that is not ACTIVE **and** authored or
 * signed off by a human. Flipping `status` to 'ACTIVE' while leaving
 * `authorKind: 'AI_AUTHORED'` does NOT make a card servable — that laundering
 * route is closed in code and pinned by test, because a guardrail written by
 * the same kind of system it guards is not a guardrail.
 *
 * TO PROMOTE A CARD, a human must:
 *   1. read the card and satisfy themselves the teaching is correct;
 *   2. set `status: 'ACTIVE'`;
 *   3. set `authorKind: 'AI_AUTHORED_REVIEWED'` (kept the draft's words) or
 *      'HUMAN_CURATOR' (rewrote them), and say so in `provenance`.
 * The act is a reviewed commit, which is a better review surface for prose
 * than an API call: the words being promoted are visible in the diff.
 *
 * ── WHY THIS IS NOT IN THE DATABASE (audited, not assumed) ──────────────────
 * `AssetIdentity` has exactly the right lifecycle — `authorKind`, `status`,
 * and a working admin promotion endpoint. It was evaluated first and rejected,
 * because the ONLY write path into it available here is the cold-start
 * bootstrap in `src/instrumentation.ts`, which writes
 * `authorKind: HUMAN_CURATOR, status: ACTIVE` for everything in the seed
 * corpus and additionally promotes seed-owned DRAFT rows to ACTIVE unless
 * `DISABLE_SEED_ACTIVATION=true`. Putting AI-drafted cards there would
 * relabel them as human-curated and serve them without any human reading
 * them — the precise outcome this phase's stop rule forbids.
 *
 * ── WHAT THE FIELDS ARE FOR ─────────────────────────────────────────────────
 *   canonicalIdea     the concept in one sentence, for the reviewer
 *   concreteAnchor    the everyday thing the explanation is built on
 *   plainExplanation  THE TEACHING. This is what the learner reads.
 *   antiAnalogy       the tempting comparison that teaches a false mapping.
 *                     NEVER shown to a learner — naming a wrong idea to
 *                     someone who had not thought of it teaches it. It exists
 *                     to constrain a renderer and to be checked by a reviewer.
 *   microCheck        one short question that shows whether the idea landed.
 *                     A comprehension prompt, NOT an assessment: it is not
 *                     graded, it awards no mastery, and it is not an MCQ.
 *
 * Pure data and two pure functions. No model call, no database, no I/O.
 */

export type RemediationCardStatus = 'DRAFT' | 'ACTIVE'
export type RemediationCardAuthorKind = 'AI_AUTHORED' | 'AI_AUTHORED_REVIEWED' | 'HUMAN_CURATOR'

export interface RemediationCard {
  conceptId: string
  subject: 'physics' | 'chemistry'
  canonicalIdea: string
  concreteAnchor: string
  plainExplanation: string
  antiAnalogy: { tempting: string; whyItFails: string }
  microCheck: string
  status: RemediationCardStatus
  authorKind: RemediationCardAuthorKind
  provenance: string
}

/** Shorthand for the pilot's uniform, unpromoted provenance. */
const DRAFTED = {
  status: 'DRAFT',
  authorKind: 'AI_AUTHORED',
  provenance: 'Drafted by Claude in Phase H6. NOT reviewed. NOT authoritative. Awaiting human promotion.',
} as const

export const REMEDIATION_CARDS: readonly RemediationCard[] = [
  // ── The five concepts whose live failures drove H2–H5 ────────────────────
  {
    conceptId: 'phys.mech.friction',
    subject: 'physics',
    canonicalIdea:
      'Friction between two surfaces grows with how hard they are pressed together, not with how big they are.',
    concreteAnchor: 'a book you slide across a table',
    plainExplanation:
      'Push a book across a table and something resists you. That resistance is friction. Two things '
      + 'decide how strong it is: what the two surfaces are made of, and how hard they are pressed '
      + 'together. Press harder — stack another book on top — and the resistance goes up, because the '
      + 'surfaces are squeezed into closer contact. The push holding them together is called the normal '
      + 'force, and friction rises and falls with it. Notice what is missing from that list: how big the '
      + 'book is. A wide book and a narrow book of the same weight are equally hard to slide.',
    antiAnalogy: {
      tempting: 'saying friction depends only on how rough the surfaces are',
      whyItFails:
        'roughness is only half of it. Leaving out the pressing-together force makes the learner predict '
        + 'that a heavy box and an empty one slide equally easily, which is the opposite of what they see.',
    },
    microCheck: 'You put a heavy bag on top of the book. Is it easier or harder to slide now?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.sol.vapour-pressure',
    subject: 'chemistry',
    canonicalIdea:
      'Dissolving something in a liquid lowers its vapour pressure, because a smaller share of the liquid is now the solvent that can evaporate.',
    concreteAnchor: 'a glass of water next to a glass of sugar-water',
    plainExplanation:
      'Leave a glass of water out and some of it escapes into the air. The push those escaping molecules '
      + 'make on the air above is the vapour pressure. Now stir sugar into the water. The sugar itself '
      + 'does not escape into the air — only water does. But now only nine in every ten particles in the '
      + 'liquid are water instead of ten in ten, so a smaller share of the liquid is the kind that can '
      + 'leave. Fewer escape each second, and the vapour pressure drops. It is the share that matters, '
      + 'not what the sugar is.',
    antiAnalogy: {
      tempting: 'saying the sugar sits on the surface and physically blocks water from getting out',
      whyItFails:
        'the effect depends only on the share of particles that are solvent, not on anything covering a '
        + 'surface. The blocking picture predicts that bigger solute particles would block more, and they '
        + 'do not.',
    },
    microCheck: 'Which one escapes into the air above the glass — the water or the sugar?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.kinet.catalysis',
    subject: 'chemistry',
    canonicalIdea:
      'A catalyst gives a reaction an easier route so it goes faster, and comes out of the reaction unchanged.',
    concreteAnchor: 'a mountain pass instead of climbing over the summit',
    plainExplanation:
      'A reaction has to get over an energy hill before it can happen. A big hill means the reaction '
      + 'crawls. A catalyst opens a lower pass through the mountain instead of over the top, so far more '
      + 'of the reacting particles have enough energy to get across, and the reaction speeds up. Two '
      + 'things stay exactly the same: where the reaction starts and where it ends, and the catalyst '
      + 'itself. It takes part along the way and is handed back at the end, so a small amount keeps '
      + 'working over and over.',
    antiAnalogy: {
      tempting: 'sugar dissolving faster when you stir hot tea',
      whyItFails:
        'dissolving is not a chemical reaction, the stirring is not a catalyst, and the sugar is consumed '
        + 'into the solution rather than handed back. Every part of the mapping is wrong.',
    },
    microCheck: 'After the reaction finishes, is the catalyst still there?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.equil.kc-kp',
    subject: 'chemistry',
    canonicalIdea:
      'In a closed container an equilibrium settles at a fixed ratio of products to reactants, and that ratio is the equilibrium constant.',
    concreteAnchor: 'a sealed bottle of fizzy drink',
    plainExplanation:
      'Seal a fizzy drink and leave it. Gas keeps leaving the liquid and gas keeps dissolving back in, '
      + 'both at once. After a while the two happen at the same rate, so nothing you can measure changes '
      + 'any more, even though molecules are still moving both ways. That balance point is equilibrium. '
      + 'If you compare how much product to how much reactant sits there at balance, you get the same '
      + 'number every time you run it at that temperature. That number is the equilibrium constant. It '
      + 'only means anything while the container stays closed.',
    antiAnalogy: {
      tempting: 'opening the bottle and saying the balance is still the same',
      whyItFails:
        'opening it lets gas escape, so the two rates are no longer equal and the system is no longer at '
        + 'that equilibrium at all. The example only works sealed.',
    },
    microCheck: 'At balance, has everything stopped moving, or is it still going both ways?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.kinet.mechanism',
    subject: 'chemistry',
    canonicalIdea:
      'A mechanism is the list of single collisions a reaction really goes through, and the slowest one sets the overall speed.',
    concreteAnchor: 'a queue through a building with one slow door',
    plainExplanation:
      'A balanced equation tells you what goes in and what comes out. It does not tell you how. The real '
      + 'reaction usually happens as a short series of single events — one collision, one bond breaking — '
      + 'and that series is the mechanism. Think of people moving through a building with several doors. '
      + 'One door is narrow and slow. Widening any of the other doors changes nothing; the slow door sets '
      + 'the rate for everyone. In a reaction that slowest step is the one that decides how fast the '
      + 'whole thing goes.',
    antiAnalogy: {
      tempting: 'presenting an ordinary reaction as initiation, propagation and termination',
      whyItFails:
        'that chain vocabulary belongs to one particular family of reactions, where a reactive fragment '
        + 'keeps regenerating itself. Applied to an ordinary mechanism it invents stages that are not '
        + 'there and hides the slow step that actually matters.',
    },
    microCheck: 'If you speed up a fast step, does the whole reaction get faster?',
    ...DRAFTED,
  },

  // ── The fifteen highest-traffic concepts, from production topic_progress ──
  {
    conceptId: 'chem.found.matter',
    subject: 'chemistry',
    canonicalIdea: 'Matter is anything that takes up space and has mass, and it is built from particles too small to see.',
    concreteAnchor: 'a balloon you blow up',
    plainExplanation:
      'Blow up a balloon and it gets bigger and very slightly heavier. Something went in, even though you '
      + 'cannot see it. That is the test for matter: it takes up room and it has mass. Air passes both, so '
      + 'air is matter. Everything you can touch is made of particles far too small to see, and what makes '
      + 'one substance different from another is which particles it is made of and how they are arranged. '
      + 'Heat, light and sound are not matter — they carry energy but take up no room of their own.',
    antiAnalogy: {
      tempting: 'saying matter is anything you can see or touch',
      whyItFails:
        'air is matter and you cannot see it, while light is not matter and you can. Sight and touch are '
        + 'the wrong test; space and mass are the right one.',
    },
    microCheck: 'Is the air inside the balloon matter?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.meas.units',
    subject: 'physics',
    canonicalIdea: 'A measurement is a number together with the unit that says what the number counts.',
    concreteAnchor: 'telling someone a table is "two" long',
    plainExplanation:
      'A table described as just "two" long tells nobody anything. Two metres is a table; two centimetres '
      + 'is a toy. The number alone carries no information — it only means something once the size being '
      + 'counted is named. That is what a unit is: an agreed size that everyone measures against. '
      + 'Scientists agree on a small set of these so that a result measured in one place means the same '
      + 'in another. Without the unit, the number stops being a measurement.',
    antiAnalogy: {
      tempting: 'treating the unit as a label you add at the end for tidiness',
      whyItFails:
        'the unit is half the measurement, not decoration. Two of a bigger unit is a different quantity, '
        + 'not the same quantity written differently.',
    },
    microCheck: 'Your friend says the rope is "five". What do you need to ask?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.newtons-first-law',
    subject: 'physics',
    canonicalIdea: 'An object keeps doing what it is already doing unless a force acts on it.',
    concreteAnchor: 'a puck sliding on ice',
    plainExplanation:
      'Slide a book across a table and it stops, so it feels obvious that moving things need a push to '
      + 'keep going. Now slide a puck across smooth ice. It goes much further. Make the ice smoother and '
      + 'it goes further still. The pattern points somewhere: with nothing rubbing at all, it would never '
      + 'stop. So stopping is not what moving things naturally do — stopping is what friction does to '
      + 'them. Left alone, something still stays still and something moving keeps moving at the same '
      + 'speed in the same direction.',
    antiAnalogy: {
      tempting: 'saying that motion needs a continuous force to keep it going',
      whyItFails:
        'that is the everyday impression, and it is exactly the idea this law overturns. The force is '
        + 'needed to CHANGE motion, not to maintain it.',
    },
    microCheck: 'The ice gets perfectly smooth. When does the puck stop?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.meas.vector-products',
    subject: 'physics',
    canonicalIdea:
      'Two vectors can be combined in two different ways: one gives a plain number, the other gives a new vector.',
    concreteAnchor: 'pushing a trolley and turning a spanner',
    plainExplanation:
      'Sometimes you want to know how much of one push acts along another direction. Pushing a trolley '
      + 'forwards at an angle, only part of your push moves it along. Combining the two directions that '
      + 'way gives a plain number with no direction of its own. Other times direction is the whole point. '
      + 'Turning a spanner, the force and the handle are both in the flat plane, but the turning happens '
      + 'about an axis pointing out of it. Combining them that way gives a new vector pointing along that '
      + 'axis. Same two inputs, two questions, two kinds of answer.',
    antiAnalogy: {
      tempting: 'treating the two ways of combining vectors as different notations for the same operation',
      whyItFails:
        'one answer has no direction and the other does. They answer different questions and are not '
        + 'interchangeable.',
    },
    microCheck: 'Which one gives you an answer that points somewhere?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.conservative-forces',
    subject: 'physics',
    canonicalIdea:
      'A conservative force gives back exactly the energy it took, so the route you took does not matter.',
    concreteAnchor: 'carrying a bag up to the first floor',
    plainExplanation:
      'Carry a bag upstairs and you put energy in. Come back down and gravity gives it all back, whether '
      + 'you took the stairs or the lift, quickly or slowly. Only where you started and where you ended '
      + 'matter. Gravity is like that, and so is a stretched spring. Friction is not. Drag the bag along '
      + 'the floor and back, and you get none of that energy back — it left as heat, and taking a longer '
      + 'route costs you more. That is the dividing line: does the route change the bill, or only the '
      + 'endpoints?',
    antiAnalogy: {
      tempting: 'saying a conservative force is one that conserves energy',
      whyItFails:
        'energy is conserved either way — friction does not destroy it, it turns it into heat. The real '
        + 'test is whether the energy comes back usable and whether the path matters.',
    },
    microCheck: 'You take the long way up instead of the short way. Does gravity charge you more?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.found.pure-substances',
    subject: 'chemistry',
    canonicalIdea:
      'A pure substance is made of one kind of particle throughout; a mixture holds more than one kind, unchanged.',
    concreteAnchor: 'salt water and salt',
    plainExplanation:
      'Stir salt into water and you get salt water. Nothing new was made — the salt and the water are '
      + 'both still there, just mixed, and you can boil the water off and get your salt back. That is a '
      + 'mixture, and how much salt you put in is up to you. Pure water is different: every particle in '
      + 'it is the same kind, the proportions are fixed, and you cannot separate it by boiling or '
      + 'filtering. That is a pure substance. The test is whether the parts kept their own identity or '
      + 'became something else.',
    antiAnalogy: {
      tempting: 'saying pure means clean, healthy or unmixed with anything harmful',
      whyItFails:
        'pure here is a statement about one kind of particle, not about quality. Pure carbon monoxide is '
        + 'pure and would kill you.',
    },
    microCheck: 'Can you get the salt back out of salt water?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.meas.scalars-vectors',
    subject: 'physics',
    canonicalIdea: 'Some quantities need only a size; others need a size and a direction.',
    concreteAnchor: 'giving directions to a lost visitor',
    plainExplanation:
      'A lost visitor told to walk three hundred metres still cannot find the station — they need the '
      + 'direction too. Told instead that the temperature is thirty degrees, they need no direction; the '
      + 'number is the whole story. That is the split. Some quantities are complete with just a size: '
      + 'temperature, mass, time. Others are only complete with a size and a direction: a push, a '
      + 'displacement, a velocity. It matters because they add differently. Walking three hundred metres '
      + 'out and three hundred back covers six hundred metres but moves you nowhere.',
    antiAnalogy: {
      tempting: 'saying vectors are just quantities with a plus or minus sign',
      whyItFails:
        'a sign only covers directions along one line. In two or three dimensions the direction needs '
        + 'more than a sign, which is exactly why vectors exist.',
    },
    microCheck: 'You walk 300 m out and 300 m back. How far are you from where you started?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.found.states-of-matter',
    subject: 'chemistry',
    canonicalIdea:
      'Solid, liquid and gas differ in how tightly the particles are held and how freely they move.',
    concreteAnchor: 'ice, water and steam from the same kettle',
    plainExplanation:
      'Ice, water and steam are all the same stuff. What changes is the particles. In ice they are packed '
      + 'close and locked in place, only vibrating, so it holds its shape. Heat it and they gain enough '
      + 'energy to slide past each other while staying touching — now it flows and takes the shape of the '
      + 'container, but still takes up about the same room. Heat it more and they break away entirely and '
      + 'fly apart, spreading to fill whatever they are in. Same particles the whole time; what changed is '
      + 'how strongly they are held together.',
    antiAnalogy: {
      tempting: 'saying the particles themselves get bigger or softer when something melts',
      whyItFails:
        'the particles are unchanged. Only their spacing and how freely they move changes, which is why '
        + 'melting and freezing are reversible.',
    },
    microCheck: 'When ice melts, do the particles change, or does something else?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.atomic.quantum-numbers',
    subject: 'chemistry',
    canonicalIdea:
      'Quantum numbers are a short address that says which region of an atom an electron occupies.',
    concreteAnchor: 'a seat number in a large theatre',
    plainExplanation:
      'A theatre ticket does not say where you are in metres. It says a floor, a block, a row and a seat, '
      + 'and that is enough to find exactly one place. An electron in an atom is described the same way. '
      + 'One number says how far out the shell is and roughly how much energy it has. Another says what '
      + 'shape the region is. Another says how that shape is turned. The last distinguishes the two '
      + 'electrons that can share one region. Together they pick out one electron, and no two electrons in '
      + 'an atom share the whole address.',
    antiAnalogy: {
      tempting: 'reading the numbers as coordinates giving the electron\'s exact position',
      whyItFails:
        'they name a region and a state, not a point. The electron does not have a definite position to '
        + 'give, which is the whole reason this labelling exists.',
    },
    microCheck: 'Can two electrons in one atom have exactly the same set of numbers?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.bond.mo-theory',
    subject: 'chemistry',
    canonicalIdea:
      'When atoms bond, their electron regions combine into new regions belonging to the whole molecule.',
    concreteAnchor: 'two ropes tied together and shaken',
    plainExplanation:
      'Shake one rope and it has its own pattern of waves. Tie two ropes together and shake, and you no '
      + 'longer get two separate patterns — you get new ones belonging to the joined rope. Electrons work '
      + 'the same way. Bring two atoms close and their electron regions stop being two separate things and '
      + 'combine into new regions spread over both atoms. Some of these new regions are lower in energy '
      + 'than the originals and hold the atoms together. Others are higher and push them apart. Which ones '
      + 'the electrons fill decides whether a bond forms at all.',
    antiAnalogy: {
      tempting: 'picturing the bond as two electrons parked in the gap between the atoms',
      whyItFails:
        'the new regions spread over both whole atoms rather than sitting in the gap, which is why this '
        + 'picture can explain molecules the simple gap picture cannot.',
    },
    microCheck: 'After the atoms join, do the electron regions still belong to one atom each?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.found.mole-concept',
    subject: 'chemistry',
    canonicalIdea:
      'A mole is a counting word for a fixed, very large number of particles, so masses can be turned into counts.',
    concreteAnchor: 'buying eggs by the dozen',
    plainExplanation:
      'You do not buy eggs one at a time, you buy a dozen — a word that means twelve, whatever it is a '
      + 'dozen of. A mole is the same idea for particles: it names one fixed, enormous number of them. It '
      + 'is needed because reactions happen particle by particle, but you can only weigh things out on a '
      + 'balance. The mole is the bridge. Weigh a substance, and knowing what one mole of it weighs tells '
      + 'you how many moles you have, which tells you how many particles are in your hand.',
    antiAnalogy: {
      tempting: 'treating a mole as a unit of mass, like a heavy gram',
      whyItFails:
        'it counts particles, not weight. A mole of hydrogen and a mole of lead contain the same number of '
        + 'particles and have very different masses.',
    },
    microCheck: 'A mole of hydrogen and a mole of lead — same count, or same weight?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.momentum',
    subject: 'physics',
    canonicalIdea: 'Momentum is how much motion something carries: its mass together with its velocity.',
    concreteAnchor: 'catching a tennis ball, then a medicine ball',
    plainExplanation:
      'Catch a tennis ball thrown at you and it is easy. Catch a medicine ball at the same speed and it '
      + 'is not. Same speed, very different job — because how hard something is to stop depends on its '
      + 'mass as well as how fast it goes. That combination is momentum. A slow lorry can carry more of it '
      + 'than a fast bicycle. It has a direction too, the same direction as the motion, which matters when '
      + 'things collide head-on rather than catching up with each other.',
    antiAnalogy: {
      tempting: 'using momentum and speed as if they were the same word',
      whyItFails:
        'two objects at the same speed can be wildly different to stop. Leaving mass out removes the part '
        + 'that explains why.',
    },
    microCheck: 'A slow lorry or a fast bicycle — which is harder to stop?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.found.concentration',
    subject: 'chemistry',
    canonicalIdea: 'Concentration is how much solute sits in a given amount of solution, not how much there is in total.',
    concreteAnchor: 'one spoon of squash in a cup versus in a bucket',
    plainExplanation:
      'Put one spoon of squash in a cup and it tastes strong. Put the same spoon in a bucket of water and '
      + 'you can barely taste it. The amount of squash never changed — what changed is how much water it '
      + 'is spread through. Concentration is that ratio: how much of the dissolved stuff per amount of '
      + 'liquid. It is why you can make a solution weaker by adding water without removing anything, and '
      + 'why two containers holding the same total amount of salt can taste completely different.',
    antiAnalogy: {
      tempting: 'reading a more concentrated solution as simply one containing more solute',
      whyItFails:
        'a bucket of weak squash contains more squash than a cup of strong squash. Total amount and '
        + 'concentration can point in opposite directions.',
    },
    microCheck: 'You add water to the cup without removing any squash. Stronger or weaker?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.found.stoichiometry',
    subject: 'chemistry',
    canonicalIdea:
      'A balanced equation gives the fixed ratio in which substances react, so one amount tells you the others.',
    concreteAnchor: 'a sandwich recipe: two slices of bread per filling',
    plainExplanation:
      'A sandwich takes two slices of bread and one filling. That ratio is fixed. With ten slices you can '
      + 'make five sandwiches, and if you only have three fillings then bread is not your limit — filling '
      + 'is, and you will have bread left over. Reactions work the same way. The balanced equation gives '
      + 'the ratio the substances combine in, and it never changes. So if you know how much of one you '
      + 'have, the ratio tells you how much of the others you need and how much product you can get.',
    antiAnalogy: {
      tempting: 'assuming reactants combine one-for-one unless told otherwise',
      whyItFails:
        'the ratio comes from the balanced equation and is often not one-to-one. Assuming it is gives '
        + 'answers that are wrong by exactly that factor.',
    },
    microCheck: 'Ten slices of bread and three fillings. How many sandwiches?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.found.measurement',
    subject: 'chemistry',
    canonicalIdea:
      'A measurement carries both a value and how precisely it is known, and the precision travels with it.',
    concreteAnchor: 'two balances, one showing 2.5 g and one showing 2.500 g',
    plainExplanation:
      'Two balances weigh the same sample. One reads 2.5 g, the other 2.500 g. They do not say the same '
      + 'thing. The first promises the mass is somewhere near 2.5; the second promises it much more '
      + 'tightly. The extra zeros are a claim about how well the instrument knows the answer, not '
      + 'decoration. That is why you cannot invent precision later: if you measured to the nearest tenth, '
      + 'writing more digits afterwards claims something you never measured. A result is only ever as '
      + 'precise as the roughest measurement that went into it.',
    antiAnalogy: {
      tempting: 'treating trailing zeros as tidy-looking padding you may add or drop freely',
      whyItFails:
        'they carry information about the instrument. Adding them claims a precision you do not have, and '
        + 'dropping them throws away precision you paid for.',
    },
    microCheck: 'Which balance was more precise, the one reading 2.5 g or 2.500 g?',
    ...DRAFTED,
  },
]

export type RemediationCardLookup =
  | { servable: true; card: RemediationCard }
  | { servable: false; reason: 'no-card' | 'draft-not-promoted' | 'unreviewed-author' }

/** A human has read it and signed it off. AI_AUTHORED alone never qualifies. */
function humanApproved(authorKind: RemediationCardAuthorKind): boolean {
  return authorKind === 'HUMAN_CURATOR' || authorKind === 'AI_AUTHORED_REVIEWED'
}

/**
 * The one door. Two independent conditions, both required, and the second is
 * the one that cannot be flipped by editing a status field alone.
 *
 * `corpus` is injectable for tests only; the route never passes it.
 */
export function findRemediationCard(
  conceptId: string,
  corpus: readonly RemediationCard[] = REMEDIATION_CARDS,
): RemediationCardLookup {
  try {
    const found = corpus.find((c) => c.conceptId === conceptId)
    if (!found) return { servable: false, reason: 'no-card' }
    if (found.status !== 'ACTIVE') return { servable: false, reason: 'draft-not-promoted' }
    if (!humanApproved(found.authorKind)) return { servable: false, reason: 'unreviewed-author' }
    return { servable: true, card: found }
  } catch {
    return { servable: false, reason: 'no-card' }
  }
}

/**
 * The learner-visible turn, built deterministically from the card.
 *
 * The explanation and the micro-check, and nothing else. No labels, no
 * headings, no field names — H4 measured the model rendering an ordered
 * instruction list as literal markdown headings in front of a learner, and a
 * card with visible field names would be a standing invitation to the same.
 *
 * The anti-analogy is deliberately absent: naming a wrong idea to a learner who
 * had not thought of it teaches it to them.
 */
export function renderRemediationCard(card: RemediationCard): string {
  return `${card.plainExplanation.trim()}\n\n${card.microCheck.trim()}`
}

/**
 * The card as CONSTRAINED SOURCE for a turn the model still writes — the
 * continuity turn, where re-serving the same words verbatim is what the
 * already-served guard exists to prevent.
 *
 * It hands over the authored account and forbids replacing it. This is a
 * weaker guarantee than deterministic serving and is described as such: the
 * strongest result remains card text reaching the learner untouched.
 */
export function buildRemediationCardSourceBlock(card: RemediationCard): string {
  return (
    '\n\nAUTHORED ACCOUNT OF THIS CONCEPT (a human curator approved these exact '
    + 'claims; you are re-voicing them, not deciding them).\n'
    + `${card.plainExplanation.trim()}\n`
    + 'Stay inside that account. Do not introduce a different mechanism, a '
    + 'different comparison, a new formula or any claim it does not make. You '
    + 'may reword it, shorten it, or ask the learner about it. If you would need '
    + 'a fact it does not contain, ask the learner a question instead.\n'
    + `Never reach for this comparison: ${card.antiAnalogy.tempting} — ${card.antiAnalogy.whyItFails}`
  )
}

/** DRAFT and ACTIVE reported separately, never blended into one coverage number. */
export function cardCoverage(): { total: number; draft: number; active: number } {
  return {
    total: REMEDIATION_CARDS.length,
    draft: REMEDIATION_CARDS.filter((c) => c.status === 'DRAFT').length,
    active: REMEDIATION_CARDS.filter((c) => c.status === 'ACTIVE' && humanApproved(c.authorKind)).length,
  }
}

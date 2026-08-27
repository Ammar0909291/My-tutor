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

/**
 * OWNER PROMOTION, 2026-08-27 — the physics build-out.
 *
 * The owner reviewed the physics set and approved it in full: the complete
 * measurement domain and the mechanics entry spine. AI_AUTHORED_REVIEWED, not
 * HUMAN_CURATOR — the teaching words are the drafts', and the provenance
 * records who signed them off rather than who wrote them.
 *
 * Chemistry is deliberately NOT in this batch. Its thirteen cards remain DRAFT,
 * and chem.sol.vapour-pressure remains frozen behind the unresolved curriculum
 * conflict about the surface-occupancy mechanism.
 */
const OWNER_PROMOTED_PHYSICS = {
  status: 'ACTIVE',
  authorKind: 'AI_AUTHORED_REVIEWED',
  provenance: 'Reviewed and promoted by owner, 2026-08-27 (physics build-out).',
} as const

export const REMEDIATION_CARDS: readonly RemediationCard[] = [
  // ── The five concepts whose live failures drove H2–H5 ────────────────────
  {
    conceptId: 'phys.mech.friction',
    subject: 'physics',
    canonicalIdea:
      'Friction depends on how strongly the two surfaces press on each other, which is not the same thing as the object\'s weight.',
    concreteAnchor: 'a book on a table that you press down on with your hand',
    plainExplanation:
      'Push a book across a table and something resists you. That resistance is friction. Two things '
      + 'decide how strong it is: what the two surfaces are made of, and how strongly they are pressed '
      + 'against each other. Now hold the book down with your hand and try again. It is much harder to '
      + 'slide, and the book has not become any heavier. So what matters is not the book\'s weight, it is '
      + 'how hard the two surfaces are being pushed together. That pushing-together force has a name: the '
      + 'normal force. On a flat table with nothing else pressing, it happens to match the weight, which '
      + 'is why weight seems to work — but the moment anything else presses down, or the surface tilts, '
      + 'the two part company.',
    antiAnalogy: {
      tempting: 'saying friction depends only on how rough the surfaces are',
      whyItFails:
        'roughness is only half of it, and the other half is the normal force. Reaching for the object\'s '
        + 'weight instead is the substitution the curriculum\'s own note singles out: it is right only on '
        + 'a flat surface with nothing else pushing, and silently wrong everywhere else.',
    },
    microCheck: 'You press down on the book with your hand. Easier or harder to slide?',
    // PROMOTED BY THE OWNER, 2026-08-27 — the first card in this file to become
    // learner-servable. Explicitly approved: the normal-force framing, the
    // hand-press example, the horizontal-table weight equality restricted to
    // that case, and the omission of the microscopic mechanism, of
    // area-independence and of the static/kinetic distinction.
    // AI_AUTHORED_REVIEWED, not HUMAN_CURATOR: the words are the draft's, and
    // the provenance says who signed them off rather than who wrote them.
    status: 'ACTIVE',
    authorKind: 'AI_AUTHORED_REVIEWED',
    provenance: 'Reviewed and promoted by owner, 2026-08-27.',
  },
  {
    conceptId: 'chem.sol.vapour-pressure',
    subject: 'chemistry',
    canonicalIdea:
      'Dissolving a solute that cannot evaporate lowers the solvent\'s vapour pressure, in proportion to the share of the liquid that is still solvent.',
    concreteAnchor: 'a sealed jar of water beside a sealed jar of sugar-water',
    plainExplanation:
      'Seal a jar half full of water. Water leaves the liquid and water returns to it, and before long '
      + 'those two settle into balance, so the amount of water vapour above stops changing. The push that '
      + 'vapour makes is the vapour pressure. Now do the same with sugar-water. The sugar cannot leave the '
      + 'liquid — only the water can — so it is still the water\'s vapour pressure you are talking about. '
      + 'What has changed is that the liquid is no longer all water. The vapour pressure follows the share '
      + 'of the liquid that is still water: cut that share, and the vapour pressure falls in the same '
      + 'proportion. What the sugar is makes no difference. Only how many particles of it there are.',
    antiAnalogy: {
      tempting: 'saying the sugar escapes into the air along with the water',
      whyItFails:
        'the curriculum\'s own note singles this out: for a solute that does not evaporate, the vapour '
        + 'above the liquid is pure solvent. Letting the solute into the vapour leaves the lowering with '
        + 'nothing to follow from.',
    },
    microCheck: 'Which one leaves the liquid and fills the space above — the water or the sugar?',
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
      'In a closed system a reaction settles where the forward and reverse changes run at the same rate, and that balance point carries a fixed number built from the balanced equation.',
    concreteAnchor: 'a shop where people come in and leave at the same rate',
    plainExplanation:
      'Many reactions never finish. Reactants turn into products, and at the same time products turn back '
      + 'into reactants. Think of a shop where people are arriving and leaving at exactly the same rate: '
      + 'the number inside stops changing, although nobody has stopped moving. A reaction reaches that '
      + 'point too, and it is called equilibrium — still running both ways, but nothing you could measure '
      + 'changes any more. At that point, comparing the products against the reactants gives the same '
      + 'number every time, as long as the temperature is the same. That number is the equilibrium '
      + 'constant. It insists on two things: the container has to stay closed, and each substance counts '
      + 'as many times over as it appears in the balanced equation, not just once.',
    antiAnalogy: {
      tempting: 'opening the container and saying the balance still holds',
      whyItFails:
        'once anything can leave, the two rates are no longer equal and the system is not at that '
        + 'equilibrium at all. A second trap sits alongside it: comparing amounts one-for-one and ignoring '
        + 'how many times each substance appears in the balanced equation.',
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
    canonicalIdea:
      'Matter is sorted by what it is made of: one kind of atom, two or more kinds chemically joined in a fixed ratio, or separate substances simply mixed.',
    concreteAnchor: 'iron filings stirred into yellow sulfur powder, before and after heating',
    plainExplanation:
      'Stir iron filings into yellow sulfur powder and you can still see both of them, and a magnet drags '
      + 'the iron straight back out. Nothing has joined. You also chose how much of each to put in, and '
      + 'you could have chosen differently. That is a mixture. Now heat the same jar hard. It glows, and '
      + 'what is left is one grey solid — and the magnet does nothing, because there is no iron in there '
      + 'any more. The two have joined in a fixed ratio that is not yours to choose, and only another '
      + 'chemical change will part them. That is a compound. The iron you began with, made of a single '
      + 'kind of atom, is an element.',
    antiAnalogy: {
      tempting: 'picturing a compound as bricks clicked together that you could pull apart again',
      whyItFails:
        'the curriculum\'s own note singles this out. Unlike bricks, the joining is chemical: it cannot be '
        + 'undone by pulling, and a learner holding this picture expects to separate a compound by hand.',
    },
    microCheck: 'The magnet picks up nothing now. Mixture or compound?',
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
    ...OWNER_PROMOTED_PHYSICS,
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
    ...OWNER_PROMOTED_PHYSICS,
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
    ...OWNER_PROMOTED_PHYSICS,
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
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'chem.found.pure-substances',
    subject: 'chemistry',
    canonicalIdea:
      'A pure substance is made of one kind of particle throughout; a mixture holds more than one kind, unchanged.',
    concreteAnchor: 'salt water and salt',
    plainExplanation:
      'Stir salt into water and you get salt water. Nothing new was made — the salt and the water are '
      + 'both still there, just mixed, and you can boil the water off and get your salt back. How much '
      + 'salt went in was your choice: half as much would still have been salt water, only weaker, and it '
      + 'would boil at a different temperature. That adjustability is what makes it a mixture. Pure water '
      + 'is different. Every sample of it is the same as every other sample, wherever it came from, and '
      + 'it boils at the same temperature every time. There is no recipe to adjust. That fixed, '
      + 'unchanging make-up is what makes something a pure substance.',
    antiAnalogy: {
      tempting: 'saying pure means clean, healthy or unmixed with anything harmful',
      whyItFails:
        'pure here is a statement about one kind of particle, not about quality. Pure carbon monoxide is '
        + 'pure and would kill you.',
    },
    microCheck: 'You use half as much salt. Is it still salt water?',
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
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'chem.found.states-of-matter',
    subject: 'chemistry',
    canonicalIdea:
      'Solid, liquid and gas differ in whether the particles\' energy or the pull holding them together is winning.',
    concreteAnchor: 'beads with springs between them',
    plainExplanation:
      'Picture the particles of a substance as beads with springs between them. In a solid the springs '
      + 'win: each bead stays where it is and only jiggles, so the whole thing keeps its shape. Warm it '
      + 'and the beads gain enough energy to slide past one another while still touching — now it flows '
      + 'and takes the shape of whatever holds it. Warm it further and they break away from one another '
      + 'altogether and move independently, spreading out to fill the whole container. The beads '
      + 'themselves are the same throughout. What changed is how much energy they have against the pull '
      + 'between them, which is why cooling it puts everything back the way it was.',
    antiAnalogy: {
      tempting: 'saying the particles themselves get bigger or softer when something melts',
      whyItFails:
        'the particles are unchanged. Only how freely they move against the pull between them changes, '
        + 'which is why melting and freezing are reversible.',
    },
    microCheck: 'A solid warms until it flows. Did its particles change?',
    ...DRAFTED,
  },
  {
    conceptId: 'chem.atomic.quantum-numbers',
    subject: 'chemistry',
    canonicalIdea:
      'Quantum numbers name which of an atom\'s allowed arrangements an electron is in — not where it is.',
    concreteAnchor: 'a theatre ticket: theatre, section, row, armrest',
    plainExplanation:
      'A theatre ticket never tells you where you are in metres. It names a theatre, a section, a row and '
      + 'which armrest is yours, and that is enough for exactly one person to settle down. An electron in '
      + 'an atom is labelled the same way, with four numbers. The first says which shell it is in, and so '
      + 'roughly how much energy that means. The second says what shape of region it occupies. The third '
      + 'says how that region is turned. The fourth separates the two electrons that can share one region. '
      + 'What the four do NOT give you is a position — the electron has no definite place to report. They '
      + 'say which of the allowed arrangements it is in, and no two electrons in one atom are in the same '
      + 'one.',
    antiAnalogy: {
      tempting: 'reading the numbers as coordinates giving the electron\'s exact position',
      whyItFails:
        'they name a region and a state, not a point. The electron does not have a definite position to '
        + 'give, which is the whole reason this labelling exists — and a ticket analogy invites exactly '
        + 'this reading unless the explanation says so outright.',
    },
    microCheck: 'Do the four numbers say where the electron is?',
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
    canonicalIdea:
      'Momentum is the quantity of motion something carries: its mass multiplied by its velocity, with a direction.',
    concreteAnchor: 'a lorry and a bicycle moving at the same speed',
    plainExplanation:
      'Speed on its own does not say how much motion something is carrying. A lorry and a bicycle '
      + 'travelling at exactly the same speed are plainly not carrying the same amount of it. Mass counts '
      + 'too. Momentum is the two together: the mass multiplied by the velocity. Double the mass and the '
      + 'momentum doubles; double the velocity and it doubles again. It carries a direction as well, the '
      + 'same one the object is travelling in, which is what makes it useful when two things meet '
      + 'head-on instead of one catching up with the other. So a slow lorry can carry more momentum than '
      + 'a fast bicycle, and a fast bullet more than a slow football.',
    antiAnalogy: {
      tempting: 'defining momentum as the force of the impact, or as a heavy punch',
      whyItFails:
        'the curriculum\'s own note singles this out. Force is how fast momentum changes, and it depends '
        + 'on how long the impact lasts — a brief hard hit and a long gentle one can change momentum by '
        + 'the same amount. Momentum itself is mass times velocity.',
    },
    microCheck: 'Two balls at the same speed, one heavier. Which has more momentum?',
    ...OWNER_PROMOTED_PHYSICS,
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

  // ── PHYSICS BUILD-OUT (2026-08-27) ────────────────────────────────────────
  // The whole measurement domain (8/8) plus the mechanics entry spine — the
  // concepts a physics learner actually walks through before anything else.
  // Every anti-analogy below is the concept's OWN authored Educational Brain
  // note, quoted rather than invented; every card is notation-free, because a
  // learner who has just said they do not understand does not need symbols.
  {
    conceptId: 'phys.meas.dimensions',
    subject: 'physics',
    canonicalIdea: 'Every quantity is built from a few base kinds, and both sides of an equation must be the same kind.',
    concreteAnchor: 'trying to add two metres to three seconds',
    plainExplanation:
      'Two metres plus three seconds is not five of anything. Length and time are different KINDS of '
      + 'quantity, and you cannot add across kinds. Almost everything you measure is built from a handful '
      + 'of base kinds — length, mass, time and a few more. A speed is a length divided by a time. An area '
      + 'is a length times a length. That gives you a free check on any equation: both sides have to be '
      + 'built from the same kinds in the same combination. If they are not, the equation is wrong before '
      + 'you put a single number into it.',
    antiAnalogy: {
      tempting: 'saying dimensions and units are the same thing, so the check is just making the units match',
      whyItFails:
        'the curriculum\'s own note singles this out. A dimension is the KIND of quantity; a unit is one '
        + 'agreed size of that kind. Metres and feet are different units of the same dimension, and '
        + 'collapsing the two hides what the check is actually testing.',
    },
    microCheck: 'One side of an equation is a length, the other is a time. Can it be right?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.meas.errors',
    subject: 'physics',
    canonicalIdea: 'Every measurement carries an uncertainty, and repeating it reveals that uncertainty rather than removing it.',
    concreteAnchor: 'timing the same swing five times with a stopwatch',
    plainExplanation:
      'Time the same swing five times by hand and the five numbers will not agree. That spread is not '
      + 'carelessness. It is your reaction time, and it is part of the measurement. Two different things '
      + 'can go wrong. Some errors scatter either side of the truth, and averaging several goes shrinks '
      + 'them. Others push every reading the same way — a stopwatch that always starts late — and '
      + 'averaging never helps, because every reading is wrong by the same amount in the same direction. '
      + 'That second kind is only found by checking against something you already trust.',
    antiAnalogy: {
      tempting: 'treating an error as a mistake a careful person would have avoided',
      whyItFails:
        'uncertainty is a property of the measurement, not a personal failing. Calling it a mistake hides '
        + 'the kind that no amount of care or repetition will ever fix.',
    },
    microCheck: 'Your stopwatch always starts half a second late. Will averaging fix it?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.meas.significant-figures',
    subject: 'physics',
    canonicalIdea: 'The digits you write are a claim about how precisely you actually measured.',
    concreteAnchor: 'two balances, one reading 2.5 g and one reading 2.500 g',
    plainExplanation:
      'Two balances weigh the same sample. One reads 2.5 grams, the other reads 2.500 grams. Those are '
      + 'not the same statement. The first promises the mass is somewhere near 2.5. The second promises '
      + 'it much more tightly. The extra zeros are a claim about how well the instrument knows the '
      + 'answer, not decoration. So you cannot add precision afterwards: if you measured to the nearest '
      + 'tenth, writing more digits later claims something you never actually measured. A result is only '
      + 'ever as precise as the roughest measurement that went into it.',
    antiAnalogy: {
      tempting: 'saying more significant figures is always better',
      whyItFails:
        'the curriculum\'s own note singles this out: more figures are better ONLY when they come from '
        + 'real measurements. Invented precision is worse than acknowledged imprecision, because it '
        + 'claims a confidence nobody earned.',
    },
    microCheck: 'Which balance was more precise, the one reading 2.5 g or 2.500 g?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.meas.vector-addition',
    subject: 'physics',
    canonicalIdea: 'Vectors combine by where they take you, not by adding their sizes and their directions separately.',
    concreteAnchor: 'walking three streets east and then four streets north',
    plainExplanation:
      'Walk three streets east, then four streets north. You have walked seven streets, but you are not '
      + 'seven streets from where you started — you are five, along a diagonal. That is what makes adding '
      + 'vectors different. You cannot just add the two sizes, because the directions matter. The way to '
      + 'do it is to lay them nose to tail and see where you end up, or to split each one into how far '
      + 'east it takes you and how far north, add those two lists separately, and put the answer back '
      + 'together. Same idea, two ways of doing the arithmetic.',
    antiAnalogy: {
      tempting: 'adding the sizes and the angles separately, so three at thirty degrees plus four at sixty gives seven at ninety',
      whyItFails:
        'the curriculum\'s own note singles this out. It gets the size wrong AND invents a rule for '
        + 'direction that does not exist. Directions do not add like numbers.',
    },
    microCheck: 'Three streets east then four north. How far from where you started?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.meas.unit-conversion',
    subject: 'physics',
    canonicalIdea: 'Changing units changes the number but not the quantity, and a bigger unit needs fewer of them.',
    concreteAnchor: 'measuring the same table in centimetres and in metres',
    plainExplanation:
      'A table is one and a half metres long. The same table is a hundred and fifty centimetres long. '
      + 'Nothing about the table changed. The centimetre is a smaller unit, so it takes many more of them '
      + 'to cover the same length. That is the whole rule, and it is worth saying the way round that '
      + 'helps: a bigger unit means you need FEWER of them, so the number gets smaller. Switching to '
      + 'kilometres would give a much smaller number for the same table. The prefixes — kilo, centi, '
      + 'milli — are just agreed names for how much bigger or smaller the unit is.',
    antiAnalogy: {
      tempting: 'saying a larger unit gives a larger number',
      whyItFails:
        'the curriculum\'s own note singles this out and gives the framing to use instead: larger unit, '
        + 'fewer of them needed, smaller number. Getting this backwards inverts every conversion the '
        + 'learner will ever do.',
    },
    microCheck: 'You measure the table in kilometres instead of metres. Bigger number or smaller?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.mech.displacement',
    subject: 'physics',
    canonicalIdea: 'Displacement is where you ended up relative to your start; distance is how much ground you covered.',
    concreteAnchor: 'one lap of a running track',
    plainExplanation:
      'Run one full lap of a four-hundred-metre track. You have covered four hundred metres of ground, '
      + 'and you are standing exactly where you started. Those are two different questions, and they have '
      + 'two different answers. How much ground did you cover is the distance: four hundred. Where did '
      + 'you end up compared with your start is the displacement: nowhere, zero. Displacement also needs '
      + 'a direction — two hundred metres north is a different answer from two hundred metres south. '
      + 'Distance can only ever grow as you move; displacement can shrink back to nothing.',
    antiAnalogy: {
      tempting: 'saying displacement is always shorter than distance',
      whyItFails:
        'the curriculum\'s own note singles this out. Displacement is less than OR EQUAL TO distance, and '
        + 'they are equal whenever the motion is in a straight line without turning back. Saying "always '
        + 'shorter" stops the learner recognising the equal case.',
    },
    microCheck: 'You run one full lap of the track. What is your displacement?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.mech.velocity',
    subject: 'physics',
    canonicalIdea: 'Speed says how fast; velocity says how fast AND which way.',
    concreteAnchor: 'two cars on a motorway at the same speed, driving in opposite directions',
    plainExplanation:
      'Two cars are both doing sixty. One is heading north, the other south. Their speed is the same. '
      + 'Their velocity is not, because velocity carries the direction with it. That sounds like a small '
      + 'difference until the two cars meet, and then it is the whole story. Speed is a single number: '
      + 'how much ground you cover each second. Velocity is that number together with the direction you '
      + 'are going. A car going round a roundabout at a steady sixty has a constant speed and a changing '
      + 'velocity the whole way round, because its direction keeps changing.',
    antiAnalogy: {
      tempting: 'saying velocity is just speed with a plus or minus sign in front',
      whyItFails:
        'the curriculum\'s own note allows that shorthand for motion along a single line ONLY, and warns '
        + 'that it breaks completely in two dimensions, where a direction needs more than a sign. Used '
        + 'unflagged it teaches a rule the learner will have to unlearn.',
    },
    microCheck: 'A car goes round a roundabout at a steady sixty. Is its velocity changing?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.mech.acceleration',
    subject: 'physics',
    canonicalIdea: 'Acceleration is how quickly velocity is changing — speeding up, slowing down or turning.',
    concreteAnchor: 'a bus pulling away, braking, and going round a bend',
    plainExplanation:
      'Stand on a bus. When it pulls away you are pushed back into the seat. When it brakes you are '
      + 'thrown forward. When it goes round a bend you lean to the side. All three are acceleration, '
      + 'because in all three the velocity is changing. That is the part people miss: acceleration is not '
      + 'about going fast, it is about CHANGING. A bus at a steady sixty in a straight line has no '
      + 'acceleration at all, however fast sixty feels. Slowing down is acceleration too — it is just '
      + 'change in the opposite direction to the motion.',
    antiAnalogy: {
      tempting: 'treating acceleration and deceleration as two opposite things',
      whyItFails:
        'the curriculum\'s own note singles this out. They are one quantity, not two phenomena. Slowing '
        + 'down is acceleration pointing against the motion, and splitting them stops the sign convention '
        + 'ever taking root.',
    },
    microCheck: 'A bus holds a steady sixty in a straight line. Is it accelerating?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.mech.force',
    subject: 'physics',
    canonicalIdea: 'A force is a push or pull between two things, happening now — not something an object carries around.',
    concreteAnchor: 'a hand pushing a shopping trolley',
    plainExplanation:
      'Push a shopping trolley and it moves. The push is a force. Notice that it takes TWO things: your '
      + 'hand and the trolley. A force is always an interaction between two objects, and it only exists '
      + 'while they are interacting. Let go, and your push is gone. The trolley is still rolling, but '
      + 'nothing is pushing it any more — it is simply carrying on until something else, like friction, '
      + 'acts on it. Forces change how things move: they start motion, stop it, speed it up, slow it '
      + 'down, or turn it.',
    antiAnalogy: {
      tempting: 'saying the ball has the force of the throw inside it, or that force is a kind of energy',
      whyItFails:
        'the curriculum\'s own note singles both out. They turn a force into a substance an object stores '
        + 'and spends, which is the oldest wrong idea in mechanics. A force is an interaction between two '
        + 'objects at a moment, not a thing carried.',
    },
    microCheck: 'You let go of the trolley and it keeps rolling. Is your push still on it?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.mech.newtons-third-law',
    subject: 'physics',
    canonicalIdea: 'Whenever one thing pushes another, the second pushes back just as hard, at the same moment, on the first.',
    concreteAnchor: 'pushing off a wall on a skateboard',
    plainExplanation:
      'Stand on a skateboard and push against a wall. You roll backwards. The wall did not decide to '
      + 'push you — the push you gave it and the push it gave you are one single interaction, seen from '
      + 'two ends. They are equal in size and opposite in direction, and they happen at the same instant. '
      + 'The important part is that the two pushes act on DIFFERENT things: yours acts on the wall, the '
      + 'wall\'s acts on you. That is why they never cancel each other out. Two forces only cancel when '
      + 'they act on the same object.',
    antiAnalogy: {
      tempting: 'telling it as a story where your push happens first and the wall then responds',
      whyItFails:
        'the curriculum\'s own note singles this out. It is not cause and effect with a delay; it is one '
        + 'interaction with two ends, simultaneous by definition. The causal telling produces a learner '
        + 'who thinks the reaction arrives late.',
    },
    microCheck: 'You push the wall and roll back. Do the two pushes act on the same thing?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.mech.free-body-diagram',
    subject: 'physics',
    canonicalIdea: 'A free body diagram shows one object alone, with only the forces acting on that object.',
    concreteAnchor: 'a box sitting on a ramp',
    plainExplanation:
      'A box sits on a ramp. To work out what happens, you draw the box on its own — not the ramp, not '
      + 'the floor, not the person who put it there. Just the box, and arrows for every force acting ON '
      + 'it: gravity pulling it down, the ramp pushing back on it, friction along the surface. Anything '
      + 'the box pushes on goes on a different diagram. It feels like you are throwing away useful '
      + 'information, and that is exactly the point: once only one object is left, the forces on it are '
      + 'the only things that can decide what it does.',
    antiAnalogy: {
      tempting: 'drawing the whole scene — ramp, box, person — with arrows on everything',
      whyItFails:
        'the curriculum\'s own note singles this out. A free body diagram is not a picture of the '
        + 'situation. The scene is useful for setting the problem up, and then the diagram keeps exactly '
        + 'one object.',
    },
    microCheck: 'The box pushes down on the ramp. Does that arrow belong on the box\'s diagram?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.mech.normal-force',
    subject: 'physics',
    canonicalIdea: 'The normal force is the surface pushing back, perpendicular to itself, as hard as it needs to.',
    concreteAnchor: 'a book resting on a mattress',
    plainExplanation:
      'Rest a book on a mattress and you can see the mattress dent and push back up. A hard table does '
      + 'exactly the same thing — the dent is just far too small to see. That upward push from the '
      + 'surface is the normal force, and it always points straight out of the surface, not straight up. '
      + 'On a tilted ramp it points out of the ramp, at an angle. Its size adjusts to whatever is needed: '
      + 'press down on the book with your hand and the surface pushes back harder, without the book '
      + 'getting any heavier.',
    antiAnalogy: {
      tempting: 'saying the normal force is gravity bouncing back off the surface',
      whyItFails:
        'the curriculum\'s own note singles this out. It suggests the surface reflects gravity, which '
        + 'makes the learner expect the two to be equal always — and they are not, the moment the surface '
        + 'tilts or anything else presses down.',
    },
    microCheck: 'The book is on a tilted ramp. Does the surface push straight up?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.mech.kinetic-energy',
    subject: 'physics',
    canonicalIdea: 'Kinetic energy is the energy of moving, and it grows much faster than the speed does.',
    concreteAnchor: 'a car braking from thirty, then from sixty',
    plainExplanation:
      'A car braking from sixty does not need twice the stopping distance of one braking from thirty. '
      + 'It needs about four times. That is the surprising part of kinetic energy, and the part worth '
      + 'holding on to: doubling the speed does not double the energy of motion, it multiplies it by '
      + 'four. Three times the speed is nine times the energy. Mass matters too, and simply — twice the '
      + 'mass at the same speed is twice the energy. But speed is the one that grows fiercely, which is '
      + 'why a small increase in speed makes a crash so much worse.',
    antiAnalogy: {
      tempting: 'describing it loosely as how fast something is going, energy-wise',
      whyItFails:
        'the curriculum\'s own note singles this out: vague framing invites the learner to assume energy '
        + 'scales with speed in step. It does not, and the squared growth is the whole reason this '
        + 'concept matters.',
    },
    microCheck: 'A car doubles its speed. How much more energy of motion does it carry?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.mech.potential-energy',
    subject: 'physics',
    canonicalIdea: 'Potential energy is stored by position, and it is always counted from a starting line you choose.',
    concreteAnchor: 'a book on a shelf, measured from the desk and from the floor',
    plainExplanation:
      'Lift a book onto a shelf and you have stored energy in it. Let it go and gravity gives that '
      + 'energy back as motion. How much is stored depends on how high it is — but high compared with '
      + 'what? Measured from the desk it is half a metre up. Measured from the floor it is a metre and a '
      + 'half. Both answers are correct, because potential energy is always counted from a starting line '
      + 'somebody chose. That sounds like a problem and is not: what actually matters is the CHANGE as '
      + 'the book falls, and that comes out the same whichever line you picked.',
    antiAnalogy: {
      tempting: 'saying the energy stored tells you how much the object has, full stop',
      whyItFails:
        'the curriculum\'s own note singles this out. Without "relative to a reference point you choose", '
        + 'the learner believes there is one true absolute value, and then cannot handle a problem where '
        + 'somebody measures from a different height.',
    },
    microCheck: 'Measured from the floor instead of the desk, does the stored energy change?',
    ...OWNER_PROMOTED_PHYSICS,
  },
  {
    conceptId: 'phys.mech.work-energy-theorem',
    subject: 'physics',
    canonicalIdea: 'The energy of motion changes by exactly the total work done by ALL the forces, not just the one you are pushing with.',
    concreteAnchor: 'shoving a crate across a rough floor',
    plainExplanation:
      'Shove a crate across a rough floor and it speeds up less than you might expect. You did work on '
      + 'it by pushing, and friction did work on it in the opposite direction at the same time. What the '
      + 'crate ends up with is the net of the two. That is the whole idea: add up the work done by every '
      + 'force acting, and the answer is exactly how much the energy of motion changed. If the total is '
      + 'positive the crate speeds up. If friction wins, it slows down. Nothing else needs to be tracked '
      + 'to know how fast it ends up going.',
    antiAnalogy: {
      tempting: 'saying the work done by your push equals the change in the energy of motion',
      whyItFails:
        'the curriculum\'s own note singles this out. That is true only when no other force does work, '
        + 'and it is exactly wrong in every problem involving friction — which is most of them.',
    },
    microCheck: 'You push a crate along a rough floor. Whose work counts, yours or everyone\'s?',
    ...OWNER_PROMOTED_PHYSICS,
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
 *
 * ── H6.3: THE FIGURE CLAUSE, AND WHAT IT IS WORTH ───────────────────────────
 * The measured leak (the KG description) is closed by withholding that source
 * — see `cardIsSoleTeachingSource`. One carrier CANNOT be closed the same way:
 * a curated figure may be on screen, the learner can see it, and the visual
 * contract necessarily tells the model what is drawn on it. In H6.2 the model
 * read the arrows and derived a teaching point the card does not make.
 * Removing the figure is a visual-resolver decision, out of this phase's scope,
 * and would take a picture away from a learner mid-explanation. So the figure
 * is handled by instruction instead: point at it, do not teach from it.
 *
 * BE CLEAR ABOUT THE STRENGTH OF THAT. An instruction is not a guarantee. The
 * KG sentence is now genuinely unavailable; the figure is merely fenced. If a
 * card-absent fact still arrives, this is the likeliest remaining route, and it
 * is reported as an open boundary rather than counted as closed.
 */
export function buildRemediationCardSourceBlock(card: RemediationCard): string {
  return (
    '\n\nAUTHORED ACCOUNT OF THIS CONCEPT (a human curator approved these exact '
    + 'claims; you are re-voicing them, not deciding them).\n'
    + `${card.plainExplanation.trim()}\n`
    + 'That account is the ONLY thing you may teach this turn. Do not introduce '
    + 'a different mechanism, a different comparison, a new formula, a new '
    + 'property or any claim it does not make. A fact being true is not enough: '
    + 'if it is not in the account above, it is not yours to teach here. You '
    + 'may reword it, shorten it, or ask the learner about it. If you would need '
    + 'a fact it does not contain, ask the learner a question instead.\n'
    + 'If a figure is on the learner\'s screen, you may point at what it shows '
    + 'to orient them — but do not read a new teaching point off it, and do not '
    + 'state a property of this concept that the account above does not state.\n'
    + `Never reach for this comparison: ${card.antiAnalogy.tempting} — ${card.antiAnalogy.whyItFails}`
  )
}

/**
 * Which of the three serving sources produced this remediation turn. Declared
 * here rather than in the route so the authority rule below and the route's own
 * logging cannot drift apart.
 */
export type RemediationSource = 'CURATED_CARD' | 'EXISTING_GROUNDING' | 'LLM_GENERATED'

/**
 * WHEN A PROMOTED CARD OWNS THE TURN IT IS THE ONLY TEACHING SOURCE (H6.3).
 *
 * ── THE DEFECT THIS CLOSES, MEASURED IN PRODUCTION ──────────────────────────
 * H6.2's continuity turn taught "friction always acts against the direction
 * you're trying to move an object". That claim is TRUE and it is in the
 * Knowledge Graph — and the approved card does not contain it. Where it came
 * from is not a guess: the H5 grounding block quotes the KG description to the
 * model, and this concept's description is, verbatim, "Friction is a contact
 * force that opposes relative motion between surfaces in contact." The model
 * was handed the sentence and taught from it.
 *
 * TRUE IS NOT AUTHORISED. H5's grounding exists to constrain a turn that has no
 * authored account; when there IS one, the same block becomes a second,
 * competing teaching authority. So on a card turn it is not sent at all.
 *
 * This is SOURCE ISOLATION, not another instruction: the competing source is
 * withheld rather than argued with. The card's own block still says "stay
 * inside that account", but that sentence is now the second line of defence
 * instead of the only one.
 */
export function cardIsSoleTeachingSource(source: RemediationSource | null | undefined): boolean {
  return source === 'CURATED_CARD'
}

/**
 * IS THE CARD STILL IN CHARGE?
 *
 * ── THE DEFECT, MEASURED TWICE IN PRODUCTION ────────────────────────────────
 *   T1  "sir i not understand this" → the approved card, served deterministically
 *   T2  "ok sir"                    → f_s ≤ μ_s N, f_k = μ_k N, static vs kinetic
 *
 * All three of those are things the owner named as deliberate omissions when
 * they approved that card. Nothing was violated: the card only ever owned
 * CONFUSION and REPHRASE_REQUEST turns, so one acknowledgement handed the
 * concept straight back to the ordinary engine.
 *
 * ── AN ACKNOWLEDGEMENT IS NOT UNDERSTANDING ─────────────────────────────────
 * This repository already knows that. `isBareAcknowledgement` says so, and the
 * mastery counters refuse to move for "ok sir". Then the lesson moved on
 * anyway. The window closes on EVIDENCE — a graded correct answer through the
 * existing counters — and there is deliberately no way to tell this function
 * that the learner was polite.
 *
 * ── WHY THERE IS NO TURN LIMIT, STATED PLAINLY ──────────────────────────────
 * A bound would need a counter, and a counter would be new learner state. The
 * honest consequence: a learner who never answers correctly is held on this
 * concept. That is the right default for a tutor — you do not walk past a
 * concept nobody has shown they hold — but it IS a hold, and the session's own
 * budgets and close behaviour remain the only thing that ends it.
 *
 * Derived entirely from state that already exists. No new field, no migration.
 */
export interface RemediationWindowInput {
  /** The card's words have already reached this learner this session. */
  cardServed: boolean
  correctAtCheck: number
  correctAtPractice: number
}

export function remediationWindowOpen(input: RemediationWindowInput): boolean {
  try {
    if (!input || input.cardServed !== true) return false
    const check = input.correctAtCheck
    const practice = input.correctAtPractice
    // A counter that cannot be read is not evidence of confusion — it is no
    // evidence at all, and a hold must not open on a malformed snapshot.
    if (!Number.isFinite(check) || !Number.isFinite(practice)) return false
    return check + practice === 0
  } catch {
    return false
  }
}

/**
 * What the model is told on a turn the card still governs but did not open.
 *
 * Distinct from `buildRemediationCardSourceBlock`, which answers "re-voice this
 * account because they asked again". This one answers a different question:
 * they said "ok" and they have shown nothing. Its whole job is to stop the
 * lesson walking forward over an unverified concept, and to hand over the
 * card's OWN micro-check so the next move is checking rather than advancing.
 */
export function buildRemediationCardHoldBlock(card: RemediationCard): string {
  return (
    '\n\nTHIS CONCEPT IS STILL OPEN. A human-approved account of it was given to '
    + 'this learner, and they have not yet shown they hold it.\n'
    + `${card.plainExplanation.trim()}\n`
    + 'The learner acknowledging you — "ok", "yes sir", "I see" — does not mean '
    + 'they understand it. It means they are being polite. Do not treat it as '
    + 'understanding and do not move on to the next idea because of it.\n'
    + 'So: do not introduce a new formula, a new sub-topic, a new distinction or '
    + 'any material the account above does not contain. Stay on this one idea. '
    + 'The useful move now is to find out whether it landed — ask them this, in '
    + 'your own words if you prefer:\n'
    + `${card.microCheck.trim()}\n`
    + `And never reach for this comparison: ${card.antiAnalogy.tempting}.`
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

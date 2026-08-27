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

  // ── MECHANICS CORE (2026-08-27, batch 1 of the physics completion) ────────
  {
    conceptId: 'phys.mech.kinematics-1d',
    subject: 'physics',
    canonicalIdea: 'When acceleration is steady, a few relationships tie together how far, how fast, and how long.',
    concreteAnchor: 'a car pulling away from traffic lights at a steady rate',
    plainExplanation:
      'A car pulls away from the lights and gains speed steadily. Four things describe what happens: how '
      + 'fast it started, how fast it ends up, how quickly it gained speed, and how long it took. Once you '
      + 'know any three of those, the fourth is fixed — you do not need to watch, you can work it out. '
      + 'That is all the kinematic relationships are. The one thing that trips people up is direction: '
      + 'pick which way counts as positive at the start and stick to it, because a car slowing down has '
      + 'the same numbers as one speeding up backwards, and only the signs tell them apart.',
    antiAnalogy: {
      tempting: 'telling the learner to use common sense for the signs',
      whyItFails:
        'the curriculum\'s own note singles this out. Signs must be algebraic, decided once at the start. '
        + 'Intuition fails on an upward throw and on anything still slowing after it has passed zero.',
    },
    microCheck: 'You call rightwards positive. A car slows while moving right. Positive or negative acceleration?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.kinematics-2d',
    subject: 'physics',
    canonicalIdea: 'Motion in a plane is two separate one-dimensional motions happening at once.',
    concreteAnchor: 'a boat crossing a river while the current carries it downstream',
    plainExplanation:
      'A boat points straight across a river and the current carries it downstream at the same time. Its '
      + 'path is a diagonal, which looks complicated. It is not. The across-ness and the down-stream-ness '
      + 'do not interfere with each other at all: the boat crosses in exactly the time it would have '
      + 'taken with no current, and the current moves it downstream exactly as if it were sitting still. '
      + 'So you handle each direction on its own, with the ordinary one-dimensional rules, and put the two '
      + 'answers together at the end. Time is the one thing the two directions share.',
    antiAnalogy: {
      tempting: 'treating the diagonal path as a single motion needing its own new rules',
      whyItFails:
        'it hides the independence that makes the problem easy, and leaves the learner looking for a rule '
        + 'that does not exist instead of using the two they already have.',
    },
    microCheck: 'The current gets faster. Does the boat take longer to reach the far bank?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.projectile-motion',
    subject: 'physics',
    canonicalIdea: 'A thrown object keeps its sideways motion unchanged while gravity works on the up-down motion alone.',
    concreteAnchor: 'a ball rolled off the edge of a table',
    plainExplanation:
      'Roll a ball off a table and drop a second ball from the same height at the same instant. They hit '
      + 'the floor together. That surprises almost everyone, and it is the whole idea: gravity pulls '
      + 'downwards, so it changes the up-down motion and does nothing at all to the sideways motion. The '
      + 'rolled ball keeps its sideways speed the entire time, unchanged, while falling exactly like the '
      + 'dropped one. The curved path is those two simple motions seen together. Going faster sideways '
      + 'makes it land further away, never later.',
    antiAnalogy: {
      tempting: 'saying a faster throw stays up longer because it travels further',
      whyItFails:
        'sideways speed has no effect on falling. Tying the two together is what makes learners predict '
        + 'the flat-out-fired bullet stays airborne longer than the dropped one.',
    },
    microCheck: 'One ball rolls off the table, one is dropped beside it. Which lands first?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.relative-motion',
    subject: 'physics',
    canonicalIdea: 'How fast something is moving depends on who is watching, and both answers are correct.',
    concreteAnchor: 'walking down the aisle of a moving train',
    plainExplanation:
      'Walk down the aisle of a train at a comfortable pace. To another passenger you are strolling. To '
      + 'someone standing on the platform you are moving at the speed of the train plus your walking '
      + 'speed. Neither of them is wrong. Speed is always measured against something, and once you name '
      + 'what you are measuring against, the answer is definite. Change the thing you measure against and '
      + 'the number changes. This is why an aeroplane\'s speed through the air and its speed over the '
      + 'ground are different numbers on a windy day.',
    antiAnalogy: {
      tempting: 'saying one of the two observers has the real answer and the other is mistaken',
      whyItFails:
        'there is no privileged observer to appeal to. Looking for the true speed stops the learner ever '
        + 'naming a reference, which is the only thing that makes a speed meaningful.',
    },
    microCheck: 'You walk forward on a train. Is your speed different for a passenger and for the platform?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.circular-motion',
    subject: 'physics',
    canonicalIdea: 'Going round a circle at steady speed still needs a force, pointing at the centre the whole way.',
    concreteAnchor: 'a ball whirled on a string',
    plainExplanation:
      'Whirl a ball on a string and you can feel the string pulling on your hand. The ball is going at a '
      + 'steady speed, so it is easy to assume nothing is changing — but its DIRECTION is changing every '
      + 'instant, and changing direction is a change in motion just as much as speeding up is. Something '
      + 'has to cause it, and here it is the string, pulling the ball towards your hand the whole time. '
      + 'Let go and the ball does not fly outwards; it carries straight on from wherever it was, which is '
      + 'the clearest sign that the pull was always inwards.',
    antiAnalogy: {
      tempting: 'saying something flings the ball outwards while it goes round',
      whyItFails:
        'nothing pushes outwards. What the learner feels is the string resisting their own inward pull, '
        + 'and the outward story predicts the released ball flies away sideways, which it does not.',
    },
    microCheck: 'The string snaps. Does the ball fly outwards or carry straight on?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.newtons-second-law',
    subject: 'physics',
    canonicalIdea: 'The NET force on something decides how quickly its motion changes, and heavier things change less.',
    concreteAnchor: 'pushing an empty trolley, then the same trolley loaded',
    plainExplanation:
      'Push an empty shopping trolley and it picks up speed quickly. Load it and push just as hard, and '
      + 'it picks up speed slowly. Same push, more mass, less change of motion. Push twice as hard and the '
      + 'change doubles. That is the relationship. The word doing the quiet work is NET: what matters is '
      + 'everything pushing and pulling added together, not just your push. A trolley you push while '
      + 'friction drags backwards responds to the difference between them, which is why a hard push can '
      + 'produce no movement at all.',
    antiAnalogy: {
      tempting: 'using the force you apply instead of the total of all the forces',
      whyItFails:
        'it silently assumes nothing else is acting, which is almost never true. The learner then cannot '
        + 'explain why a heavy box refuses to move under a strong push.',
    },
    microCheck: 'You push a box and friction pushes back just as hard. Does it speed up?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.tension',
    subject: 'physics',
    canonicalIdea: 'A rope can only pull, and it pulls equally on the things at both of its ends.',
    concreteAnchor: 'towing a broken-down car with a rope',
    plainExplanation:
      'Tow a car on a rope and the rope pulls the towed car forwards while pulling back on the tow car '
      + 'just as hard. That is what tension is: the pull carried along the rope, the same size at both '
      + 'ends when the rope is light. The limit worth remembering is that a rope can only ever PULL. Push '
      + 'a rope and it goes slack and does nothing. That is the difference between a rope and a rod, and '
      + 'it decides which way the tension arrow points in every problem you will meet.',
    antiAnalogy: {
      tempting: 'describing a rope as a flexible version of a rigid stick',
      whyItFails:
        'the curriculum\'s own note singles this out. A stick pushes, a rope cannot, and the comparison '
        + 'quietly gives the rope a power it does not have.',
    },
    microCheck: 'You try to push a car with a rope instead of pulling. What happens?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.inclined-plane',
    subject: 'physics',
    canonicalIdea: 'On a slope, only part of gravity pulls the object down the slope, and the surface handles the rest.',
    concreteAnchor: 'a book on a tilted tray',
    plainExplanation:
      'Tilt a tray gently with a book on it and nothing happens. Tilt it more and the book slides. '
      + 'Gravity has not changed. What changed is how much of that downward pull acts ALONG the slope. On '
      + 'a flat tray, none of it does. As you tilt, more of the pull acts down the slope and less presses '
      + 'the book into the surface — which is why the friction available drops at the same time as the '
      + 'pull down the slope grows. Two things moving in opposite directions at once, which is why the '
      + 'book lets go quite suddenly.',
    antiAnalogy: {
      tempting: 'saying friction always resists the slope',
      whyItFails:
        'the curriculum\'s own note singles this out for being vague about WHICH motion friction opposes. '
        + 'Friction opposes the object\'s actual or attempted motion, and on a book being pushed UP a '
        + 'slope it points down it.',
    },
    microCheck: 'You tilt the tray further. Does the surface press on the book more or less?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.work',
    subject: 'physics',
    canonicalIdea: 'Work is done only when a force actually moves something along the direction it is pushing.',
    concreteAnchor: 'carrying a heavy bag along a level corridor',
    plainExplanation:
      'Carry a heavy bag down a corridor and your arm aches, but in the physics sense you have done no '
      + 'work on the bag at all. You are holding it UP while it moves SIDEWAYS, and a force does work '
      + 'only when the thing moves along the direction of that force. Lift the bag onto a shelf and you '
      + 'have done work, because now it moves the way you are pushing. Hold it perfectly still and again '
      + 'there is no work, however tired you get. Work is a transfer of energy, and nothing was '
      + 'transferred to a bag that stayed at the same height.',
    antiAnalogy: {
      tempting: 'treating effort or tiredness as the measure of work done',
      whyItFails:
        'your muscles burn energy holding a weight still, and the object receives none of it. Tying work '
        + 'to how hard it feels makes the carried-bag case impossible to accept.',
    },
    microCheck: 'You carry a bag along a flat corridor. Is work done on the bag?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.conservation-of-energy',
    subject: 'physics',
    canonicalIdea: 'Without friction, energy just moves between stored and moving forms and the total stays put.',
    concreteAnchor: 'a skateboarder rolling down one side of a ramp and up the other',
    plainExplanation:
      'A skateboarder drops into a ramp and rolls up the far side to almost the same height. Coming down, '
      + 'stored height turns into motion. Going up, motion turns back into height. Nothing is created and '
      + 'nothing vanishes; it changes form. Almost the same height, though, not the same — a little went '
      + 'into friction and sound and warming the wheels, and it will not come back as motion. That is why '
      + 'the neat swap only holds when friction is small enough to ignore, and why a real skater has to '
      + 'keep pumping.',
    antiAnalogy: {
      tempting: 'saying energy is conserved, full stop, while discussing a moving object',
      whyItFails:
        'the curriculum\'s own note singles this out. Total energy is always conserved, but the tidy '
        + 'height-to-motion swap is MECHANICAL energy and holds only without friction. Dropping the '
        + 'condition makes friction look like a violation instead of a transfer.',
    },
    microCheck: 'The skater comes up slightly lower than they started. Where did that energy go?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.power',
    subject: 'physics',
    canonicalIdea: 'Power is how FAST energy is delivered, not how much of it there is.',
    concreteAnchor: 'two people carrying identical loads upstairs, one running',
    plainExplanation:
      'Two people carry identical boxes up the same staircase. One strolls, one runs. They do exactly the '
      + 'same amount of work — same box, same height — but the one who ran did it in less time, and that '
      + 'is what more power means. Power is work divided by the time it took. A powerful engine is not '
      + 'one that holds more energy; it is one that can deliver energy quickly. A small battery can store '
      + 'plenty of energy and still be useless for starting a car, because it cannot hand that energy '
      + 'over fast enough.',
    antiAnalogy: {
      tempting: 'describing a powerful device as one that has a lot of energy',
      whyItFails:
        'the curriculum\'s own note singles this out. It conflates power with energy content, and then a '
        + 'learner cannot explain why a big battery still fails to turn an engine.',
    },
    microCheck: 'Two people lift the same box the same height, one faster. Same work? Same power?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.impulse',
    subject: 'physics',
    canonicalIdea: 'How much motion changes depends on the size of the force AND how long it acts.',
    concreteAnchor: 'catching a cricket ball with your hands moving back',
    plainExplanation:
      'Catch a hard ball with stiff hands and it stings. Catch the same ball while drawing your hands '
      + 'back and it does not. The ball had the same motion to lose either way, so the change was '
      + 'identical — but drawing your hands back stretched that change over more time, and stretching it '
      + 'over more time means a smaller force at every instant. That trade is why cars have crumple '
      + 'zones, why you bend your knees when you land, and why an airbag works. The total is fixed; the '
      + 'time is what you get to choose.',
    antiAnalogy: {
      tempting: 'describing it as a sudden hit',
      whyItFails:
        'the curriculum\'s own note singles this out. A gentle push lasting a long time delivers exactly '
        + 'the same change as a hard brief one, and calling it a hit hides the time half of the idea — '
        + 'which is the useful half.',
    },
    microCheck: 'You draw your hands back as you catch. Does the ball change motion by less?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.conservation-of-momentum',
    subject: 'physics',
    canonicalIdea: 'If nothing pushes in from outside, the total motion of a group of objects is unchanged by what they do to each other.',
    concreteAnchor: 'two skaters pushing off each other on ice',
    plainExplanation:
      'Two skaters stand still facing each other and push apart. Before, nothing was moving. After, both '
      + 'are moving — in opposite directions, and the lighter one faster. Add their motions together '
      + 'taking direction into account and you get nothing again, exactly what you started with. That '
      + 'holds because the only pushes involved were between the two of them. Bring in something from '
      + 'outside — a wall, a hand, friction with rough ground — and the total changes, because that '
      + 'outside push is not part of the pair.',
    antiAnalogy: {
      tempting: 'saying momentum is always conserved, without conditions',
      whyItFails:
        'the curriculum\'s own note singles this out. It holds for an isolated system only, and dropping '
        + 'that condition makes a learner apply it to situations with an unacknowledged outside push.',
    },
    microCheck: 'Two skaters push apart on ice. What was the total motion before, and after?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.collisions-elastic',
    subject: 'physics',
    canonicalIdea: 'In an elastic collision nothing bounces away as heat or sound — the motion energy survives intact.',
    concreteAnchor: 'two snooker balls clicking off each other',
    plainExplanation:
      'Two snooker balls hit and click apart, and almost nothing is lost — they carry on with nearly as '
      + 'much motion energy between them as before. That is what makes a collision elastic: not that the '
      + 'objects bounce, but that the energy of motion is still all there afterwards. Very few real '
      + 'collisions are perfectly elastic; the click you hear is a little of the energy leaving as sound. '
      + 'Snooker balls, steel bearings and gas particles come close enough to treat as elastic. A '
      + 'dropped ball of putty does not.',
    antiAnalogy: {
      tempting: 'saying the energy of motion is conserved in collisions',
      whyItFails:
        'the curriculum\'s own note singles this out. Without the word elastic that sentence is false for '
        + 'most collisions, and it is exactly how a learner comes to believe every crash preserves motion '
        + 'energy.',
    },
    microCheck: 'You hear a loud click when the balls hit. Was the collision perfectly elastic?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.collisions-inelastic',
    subject: 'physics',
    canonicalIdea: 'In a crash the motion energy scatters into damage, heat and sound, but the total motion is still accounted for.',
    concreteAnchor: 'two trolleys that stick together on impact',
    plainExplanation:
      'Two trolleys collide and lock together, moving off as one. A lot of the energy of motion has gone '
      + 'into bending metal and making noise, and it is not coming back. But the total motion, counted '
      + 'with direction, is the same as before the crash — that part is untouched. These are two '
      + 'different books being kept. Energy of motion can drain away; total motion cannot, as long as '
      + 'nothing pushed in from outside. Sticking together is the extreme case, where the most possible '
      + 'motion energy is lost.',
    antiAnalogy: {
      tempting: 'saying a crash destroys momentum along with the energy',
      whyItFails:
        'the curriculum\'s own note singles this out. The two are independent, and conflating them '
        + 'removes the one tool that actually solves crash problems.',
    },
    microCheck: 'The trolleys crumple and stick. Is the total motion afterwards the same as before?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.center-of-mass',
    subject: 'physics',
    canonicalIdea: 'Every object has one balance point, weighted by where its mass actually sits.',
    concreteAnchor: 'balancing a hammer on one finger',
    plainExplanation:
      'A hammer balances on one finger, but not halfway along — the balance point sits close to the '
      + 'heavy head. That point is the centre of mass: the average position of the object\'s mass, with '
      + 'the heavy parts counting for more. It is useful because the whole object moves as though all its '
      + 'mass were concentrated there. Throw the hammer and it tumbles messily, but that one point traces '
      + 'the same smooth arc a simple thrown stone would. It does not have to be inside the object at '
      + 'all — for a ring, it sits in the empty middle.',
    antiAnalogy: {
      tempting: 'calling it the middle of the object',
      whyItFails:
        'the curriculum\'s own note singles this out. Middle is a statement about shape; centre of mass is '
        + 'a statement about where the mass is, and the two only agree when the object is uniform.',
    },
    microCheck: 'Where does a hammer balance — halfway along, or nearer the head?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.torque',
    subject: 'physics',
    canonicalIdea: 'A turning effect depends on the force, how far out it acts, and which way it points.',
    concreteAnchor: 'undoing a tight bolt with a short then a long spanner',
    plainExplanation:
      'A tight bolt will not shift with a short spanner and gives way with a long one, even though you '
      + 'push just as hard. Pushing further from the pivot produces more turning effect. Direction matters '
      + 'as much as distance: push along the spanner, straight towards the bolt, and nothing turns at all, '
      + 'however hard you shove. The turning effect is greatest when you push square to the spanner, and '
      + 'falls away as your push swings round towards pointing along it. Same force, same distance, '
      + 'completely different result.',
    antiAnalogy: {
      tempting: 'saying it is just force times distance',
      whyItFails:
        'the curriculum\'s own note singles this out. That shorthand quietly assumes you are pushing '
        + 'square to the spanner, and it predicts a turning effect for a push aimed straight at the '
        + 'bolt, which produces none.',
    },
    microCheck: 'You push along the spanner, straight at the bolt. Does it turn?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.equilibrium',
    subject: 'physics',
    canonicalIdea: 'Something is in balance when the pushes cancel AND the turning effects cancel.',
    concreteAnchor: 'a ladder leaning against a wall',
    plainExplanation:
      'A ladder leans against a wall and stays put. Two separate things are true at once. First, all the '
      + 'pushes cancel: the ground and the wall together hold up its weight and stop it sliding. Second, '
      + 'all the turning effects cancel, or the ladder would rotate even while its pushes balanced. Both '
      + 'conditions are needed — a see-saw with equal weights at unequal distances has balanced pushes and '
      + 'still tips. When you check the turning effects you may take any point as the pivot you like; a '
      + 'genuinely balanced object balances about all of them.',
    antiAnalogy: {
      tempting: 'saying to balance the turning effects around the support',
      whyItFails:
        'the curriculum\'s own note singles this out. It implies the support is the only legal pivot, and '
        + 'a learner who believes that cannot solve the problems where choosing a different point removes '
        + 'the unknown force entirely.',
    },
    microCheck: 'The forces on a see-saw cancel but it still tips. What else must balance?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.universal-gravitation',
    subject: 'physics',
    canonicalIdea: 'Every mass pulls every other mass, more for bigger masses and much less as they get further apart.',
    concreteAnchor: 'the Earth pulling the Moon, and the Moon pulling back',
    plainExplanation:
      'The Earth pulls the Moon, and the Moon pulls the Earth just as hard — that is why the tides '
      + 'happen. Every pair of masses does this, including you and the person next to you, far too '
      + 'faintly to notice. Two things set the strength. More mass means more pull, straightforwardly. '
      + 'Distance is the fierce one: double the separation and the pull drops to a quarter, triple it and '
      + 'it drops to a ninth. That steep fall is why the Sun, enormously more massive than the Earth, '
      + 'still pulls on you far less.',
    antiAnalogy: {
      tempting: 'saying the bigger object pulls harder than the smaller one pulls back',
      whyItFails:
        'the two pulls are always equal in size. What differs is the effect: the same pull moves a small '
        + 'mass a lot and a huge one imperceptibly.',
    },
    microCheck: 'Earth pulls the Moon. Does the Moon pull Earth as hard?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.hookes-law',
    subject: 'physics',
    canonicalIdea: 'A spring pulls back in proportion to how far you have stretched it, and always towards where it started.',
    concreteAnchor: 'hanging weights on a spring',
    plainExplanation:
      'Hang a weight on a spring and it stretches. Hang two identical weights and it stretches twice as '
      + 'far. That simple proportion is the useful thing about springs. The pull is always back towards '
      + 'the spring\'s resting length — stretch it and it pulls in, squash it and it pushes out — which '
      + 'is what makes springs bounce rather than simply give way. The proportion only holds while the '
      + 'spring is behaving: stretch it far enough and it deforms permanently, and the neat doubling '
      + 'stops being true.',
    antiAnalogy: {
      tempting: 'assuming the doubling continues however far you stretch it',
      whyItFails:
        'past its elastic limit the spring stays stretched and the relationship breaks. Treating the rule '
        + 'as unconditional is what makes a learner extrapolate a graph well past where it is straight.',
    },
    microCheck: 'One weight stretches it 2 cm. What do two identical weights do?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.pressure-fluids',
    subject: 'physics',
    canonicalIdea: 'Pressure in a liquid grows with depth and pushes equally in every direction.',
    concreteAnchor: 'ears hurting at the deep end of a swimming pool',
    plainExplanation:
      'Swim to the bottom of the deep end and your ears hurt. Swim across at the same depth and the '
      + 'feeling does not change. Pressure in a liquid depends on how far down you are, not on how wide '
      + 'the pool is or how much water it holds in total — a narrow tube of water the same height presses '
      + 'just as hard. And it pushes in every direction at once, not only downwards, which is why your '
      + 'ears hurt whichever way you turn your head. That is also why a dam is built thick at the bottom '
      + 'and thin at the top.',
    antiAnalogy: {
      tempting: 'saying more water means more pressure',
      whyItFails:
        'depth is what counts, not volume. A learner holding the volume idea cannot explain why a thin '
        + 'pipe of water bursts a barrel as effectively as a lake would.',
    },
    microCheck: 'A narrow tube and a wide tank, same depth. Which presses harder at the bottom?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.buoyancy',
    subject: 'physics',
    canonicalIdea: 'The upward push on something in a fluid equals the weight of the fluid it shoved out of the way.',
    concreteAnchor: 'pushing a beach ball under water',
    plainExplanation:
      'Push a beach ball under water and it fights back hard. Push a stone of the same size under and it '
      + 'barely resists. Both shoved aside the same amount of water, so both get the same upward push — '
      + 'the difference is entirely in how heavy they are themselves. That is why floating and sinking is '
      + 'a comparison, not a property: the object floats when the water it displaces weighs more than the '
      + 'object does. A steel ship floats because its hull shape shoves aside an enormous amount of '
      + 'water, far more than a solid lump of the same steel would.',
    antiAnalogy: {
      tempting: 'saying heavy things sink and light things float',
      whyItFails:
        'a steel ship is far heavier than a pebble and floats. Weight alone decides nothing without the '
        + 'weight of the displaced water to compare it against.',
    },
    microCheck: 'A beach ball and a stone of the same size go under. Same upward push?',
    ...DRAFTED,
  },

  // ── ROTATION, GRAVITY AND FLUIDS (batch 2 of the physics completion) ──────
  {
    conceptId: 'phys.mech.angular-kinematics',
    subject: 'physics',
    canonicalIdea: 'Everything on a spinning object turns at the same rate, but the outer parts travel much further.',
    concreteAnchor: 'two children on a roundabout, one near the middle and one at the edge',
    plainExplanation:
      'Two children ride a playground roundabout, one near the centre and one at the rim. They go round '
      + 'together — one full turn each, at the same moment. In that sense they move identically. But the '
      + 'child at the rim covers a far bigger circle in that same time, so she is travelling much faster '
      + 'through the air. Those are two different things worth naming: how fast the whole thing TURNS, '
      + 'which is shared by every part of it, and how fast a particular point MOVES, which grows the '
      + 'further out you sit.',
    antiAnalogy: {
      tempting: 'saying everything on a spinning object moves together',
      whyItFails:
        'the curriculum\'s own note singles this out. They share the angular rate, not the speed, and the '
        + 'bare phrase makes a learner expect the rim and the centre to be doing the same thing.',
    },
    microCheck: 'Two children on a roundabout, one at the rim. Who is moving faster?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.moment-of-inertia',
    subject: 'physics',
    canonicalIdea: 'How hard something is to spin up depends on how far its mass sits from the axis, not just how much there is.',
    concreteAnchor: 'spinning a hammer about its handle end, then about its middle',
    plainExplanation:
      'Hold a hammer by the very end of the handle and swing it — heavy work. Hold it in the middle and '
      + 'swing it — much easier. Same hammer, same mass. What changed is how far the mass sits from the '
      + 'point you are turning it about, and distance from the axis counts enormously: mass twice as far '
      + 'out resists four times as much. That is why a figure skater pulls her arms in to spin faster, '
      + 'and why a tightrope walker carries a long pole. This resistance is not a property of the object '
      + 'alone; change the axis and it changes.',
    antiAnalogy: {
      tempting: 'quoting a formula for a rod without saying which axis it turns about',
      whyItFails:
        'the curriculum\'s own note singles this out. It makes the number look like a fixed property of '
        + 'the rod, when the same rod has a completely different value about its end than about its '
        + 'centre.',
    },
    microCheck: 'Same hammer, held at the end or in the middle. Which is easier to swing?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.rotational-dynamics',
    subject: 'physics',
    canonicalIdea: 'A turning effect changes how fast something spins, in proportion to how hard it is to spin.',
    concreteAnchor: 'a heavy door and a light one on the same hinges',
    plainExplanation:
      'Push a heavy door and a light one with the same force at the same place. The light one swings open '
      + 'quickly, the heavy one slowly. This is the same story as pushing a trolley, told for turning: a '
      + 'turning effect produces a change in spin, and the harder the object is to spin, the less change '
      + 'you get. Everything you know about pushes and motion carries across — you just swap force for '
      + 'turning effect, mass for resistance-to-spinning, and speeding up for spinning up faster.',
    antiAnalogy: {
      tempting: 'saying a rolling object\'s energy is just like any moving object\'s',
      whyItFails:
        'the curriculum\'s own note singles this out. A rolling object carries energy in its spin as well '
        + 'as in its travel, and the vague equivalence hides that second store entirely.',
    },
    microCheck: 'Same push on a heavy door and a light one. Which speeds up more?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.angular-momentum',
    subject: 'physics',
    canonicalIdea: 'Spinning things carry a quantity of turning that depends on both the spin rate and where the mass sits.',
    concreteAnchor: 'a spinning office chair with your arms out, then pulled in',
    plainExplanation:
      'Spin on an office chair with your arms stretched out, then pull them in. You speed up sharply, '
      + 'without pushing on anything. What stayed the same through that is the amount of turning you '
      + 'carry — it depends on your spin rate AND on how far your mass is from the axis. Pull the mass '
      + 'in, and the rate must rise to keep the total unchanged. This is why a diver tucks to somersault '
      + 'faster and opens out to slow down before entering the water.',
    antiAnalogy: {
      tempting: 'saying a turning effect speeds spinning up or slows it down, just as a force does for straight-line motion',
      whyItFails:
        'the curriculum\'s own note singles this out. The parallel is only complete if you also say where '
        + 'the mass sits, which has no counterpart in the straight-line story and is exactly what makes '
        + 'the skater speed up with no push at all.',
    },
    microCheck: 'You pull your arms in while spinning. Why do you speed up?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.conservation-of-angular-momentum',
    subject: 'physics',
    canonicalIdea: 'With nothing twisting it from outside, the amount of turning a system carries cannot change.',
    concreteAnchor: 'a skater pulling in her arms mid-spin',
    plainExplanation:
      'A skater spins with her arms out and pulls them in. She speeds up dramatically, and nobody pushed '
      + 'her. The amount of turning she carries could not change, because nothing outside was twisting '
      + 'her — so bringing her mass closer to the axis forced the spin rate up to compensate. The same '
      + 'rule explains why a cat can right itself falling, why a spinning planet keeps spinning for '
      + 'billions of years, and why a helicopter needs a tail rotor. Something outside must twist the '
      + 'system before that total can move at all.',
    antiAnalogy: {
      tempting: 'saying energy is conserved, so the skater\'s spinning energy stays the same too',
      whyItFails:
        'the curriculum\'s own note singles this out. Her spinning energy actually INCREASES when she '
        + 'pulls in — the work comes from her muscles. Two different quantities, and only one of them is '
        + 'unchanged.',
    },
    microCheck: 'The skater pulls her arms in. Does anything push her to make her spin faster?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.rolling-motion',
    subject: 'physics',
    canonicalIdea: 'A rolling object is travelling and spinning at once, and its contact point is momentarily still.',
    concreteAnchor: 'a ball and a block released together down a slope',
    plainExplanation:
      'Release a ball and a sliding block from the top of a slope together and the block wins. Both '
      + 'started with the same height to spend, but the ball has to put some of it into spinning as well '
      + 'as travelling, so less is left for going fast. That is the thing to hold on to: a rolling object '
      + 'carries energy in two places at once. There is one more oddity worth knowing — the point of the '
      + 'ball actually touching the ground is, for that instant, not moving at all, which is why rolling '
      + 'does not scuff.',
    antiAnalogy: {
      tempting: 'saying a rolling object\'s energy is just like a sliding object\'s',
      whyItFails:
        'the curriculum\'s own note singles this out. Erasing the spinning share makes the ball and the '
        + 'block look identical, and then the race down the slope has no explanation.',
    },
    microCheck: 'A ball and a sliding block race down a slope. Which reaches the bottom first?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.gravitational-field',
    subject: 'physics',
    canonicalIdea: 'A field is the pull a mass would feel at a place, described before anything is put there.',
    concreteAnchor: 'the pull you would feel at different heights above the ground',
    plainExplanation:
      'Gravity is usually described as a pull between two things. It is often more useful to describe the '
      + 'space instead: at every point around the Earth there is a certain strength and direction of pull '
      + 'waiting for whatever is placed there. That description is the field, and it belongs to the '
      + 'Earth, not to the object. A heavy object and a light one at the same spot feel the same field '
      + 'and get different forces from it, in proportion to their mass — which is exactly why they fall '
      + 'at the same rate.',
    antiAnalogy: {
      tempting: 'picturing the field as something the falling object carries with it',
      whyItFails:
        'the field is a property of the place, made by the Earth. Attaching it to the object makes it '
        + 'impossible to say why a feather and a hammer fall together in a vacuum.',
    },
    microCheck: 'A heavy and a light object at the same spot. Same field? Same force?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.gravitational-potential',
    subject: 'physics',
    canonicalIdea: 'Lifting a mass stores energy, and near the ground the simple height rule works only because gravity barely changes.',
    concreteAnchor: 'lifting a box onto a shelf, and lifting a satellite into orbit',
    plainExplanation:
      'Lift a box onto a shelf and the energy stored is simply weight times height. That rule is reliable '
      + 'in a room, and it works for a reason worth knowing: gravity is essentially the same strength at '
      + 'the floor and at the ceiling. Go far enough up and that stops being true — gravity weakens with '
      + 'distance — so the simple rule quietly fails for satellites and rockets, where each extra metre '
      + 'of height costs less than the last. Near the ground, use the simple rule with confidence. Far '
      + 'from it, it will mislead you.',
    antiAnalogy: {
      tempting: 'using weight times height as a universal rule',
      whyItFails:
        'the curriculum\'s own note singles this out. It holds only near a surface where gravity is '
        + 'effectively constant, and applying it to orbital distances gives badly wrong answers.',
    },
    microCheck: 'Does the simple height rule still work for a satellite far above Earth?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.orbital-mechanics',
    subject: 'physics',
    canonicalIdea: 'An orbiting object is falling continuously, and a higher orbit means moving slower, not faster.',
    concreteAnchor: 'a cannonball fired horizontally, harder and harder',
    plainExplanation:
      'Fire a cannonball horizontally and it curves to the ground. Fire it harder and it lands further '
      + 'away. Fire it hard enough and the ground curves away beneath it as fast as it falls — it never '
      + 'lands, and that is an orbit. It is still falling the whole time; it simply keeps missing. One '
      + 'result surprises people: a satellite in a higher orbit moves SLOWER, not faster, because gravity '
      + 'is weaker out there and less speed is needed to keep missing. The Moon takes a month; a low '
      + 'satellite takes ninety minutes.',
    antiAnalogy: {
      tempting: 'saying a higher orbit is a bigger, more energetic orbit and leaving it there',
      whyItFails:
        'the curriculum\'s own note singles this out. It is more energetic overall AND slower, and '
        + 'omitting the speed half leaves the learner predicting the opposite of what happens.',
    },
    microCheck: 'A satellite moves to a higher orbit. Faster or slower?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.keplers-laws',
    subject: 'physics',
    canonicalIdea: 'Orbits are ellipses, a planet moves fastest when closest, and bigger orbits take disproportionately longer.',
    concreteAnchor: 'a comet racing past the Sun and crawling at its far point',
    plainExplanation:
      'A comet whips past the Sun in weeks and then spends decades crawling through the far end of its '
      + 'orbit. Three things are going on. Orbits are ellipses, not circles — squashed loops with the Sun '
      + 'off to one side, not in the middle. A body moves fastest when it is closest and slowest when '
      + 'furthest. And the further out an orbit is, the disproportionately longer it takes: doubling the '
      + 'distance more than doubles the year. Earth takes one year, Jupiter five times further out takes '
      + 'nearly twelve.',
    antiAnalogy: {
      tempting: 'saying planets orbit the Sun in circles',
      whyItFails:
        'the curriculum\'s own note singles this out. It presents the special case as the general rule, '
        + 'and a learner holding it cannot explain why a planet\'s speed changes at all.',
    },
    microCheck: 'A comet is closest to the Sun. Is it moving fastest or slowest?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.escape-velocity',
    subject: 'physics',
    canonicalIdea: 'Escape speed is what an unpowered object needs at launch to coast away and never fall back.',
    concreteAnchor: 'throwing a ball upwards harder and harder',
    plainExplanation:
      'Throw a ball up and it comes back. Throw it harder and it goes higher before returning. There is a '
      + 'speed — for Earth, about eleven kilometres every second — at which it would never come back at '
      + 'all, coasting away for ever with nothing pushing it. That is escape speed. The important word is '
      + 'coasting: a rocket with engines running does not need it, and never reaches it, because it keeps '
      + 'pushing all the way up. Escape speed matters for something thrown once and then left alone.',
    antiAnalogy: {
      tempting: 'saying a rocket needs to reach escape velocity to leave Earth',
      whyItFails:
        'the curriculum\'s own note singles this out. A rocket under continuous thrust leaves perfectly '
        + 'well below that speed. The number describes an unpowered coast, not a launch requirement.',
    },
    microCheck: 'A rocket keeps its engines burning. Must it reach escape speed?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.satellites',
    subject: 'physics',
    canonicalIdea: 'A satellite is held in orbit by gravity, and how high it flies fixes how long its orbit takes.',
    concreteAnchor: 'a television dish that never needs re-aiming',
    plainExplanation:
      'A satellite television dish is bolted to a wall and never moves, because the satellite it points '
      + 'at appears to hang still in the sky. It is not still — it is racing round the Earth, at exactly '
      + 'the height where one orbit takes precisely one day, so it keeps pace with the ground turning '
      + 'beneath it. Height is what decides that: low satellites go round in about ninety minutes, and '
      + 'there is only one height that gives a day. Astronauts on board float not because gravity has '
      + 'gone, but because they are falling around the Earth alongside their spacecraft.',
    antiAnalogy: {
      tempting: 'saying there is no gravity in space',
      whyItFails:
        'the curriculum\'s own note singles this out. Gravity at the space station is nearly as strong as '
        + 'on the ground — it is what holds the orbit. Floating is continuous falling, not absence of '
        + 'gravity.',
    },
    microCheck: 'Astronauts float in orbit. Is there gravity up there?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.stress-strain',
    subject: 'physics',
    canonicalIdea: 'Stiffness as a material property is separate from how stiff a particular object happens to be.',
    concreteAnchor: 'a thin steel wire and a thick steel bar',
    plainExplanation:
      'A thin steel wire stretches easily; a thick steel bar barely moves. Both are steel, and steel has '
      + 'not changed. What differs is the shape. To talk about the MATERIAL rather than the object, you '
      + 'compare the force spread over the area it acts on with the fraction of its length the thing '
      + 'stretched. Do that and the wire and the bar give the same number — because that number belongs '
      + 'to steel, not to either object. It is what lets an engineer choose a material before deciding '
      + 'what shape to make it.',
    antiAnalogy: {
      tempting: 'saying the material\'s stiffness number tells you how stiff something is',
      whyItFails:
        'the curriculum\'s own note singles this out. It describes the material independent of shape and '
        + 'size, and the loose phrasing makes the wire and the bar look like different materials.',
    },
    microCheck: 'A thin steel wire and a thick steel bar. Same material stiffness number?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.bernoulli',
    subject: 'physics',
    canonicalIdea: 'Along a smooth flow, where the fluid speeds up the pressure drops.',
    concreteAnchor: 'blowing across the top of a strip of paper and watching it rise',
    plainExplanation:
      'Hold a strip of paper below your lip and blow across the top of it. The paper lifts. Blowing did '
      + 'not push it up — the air moving fast above it presses less hard than the still air underneath, '
      + 'and the paper is pushed up into the gap. That is the trade: along a smooth flow, faster means '
      + 'lower pressure. It shows up in a shower curtain pulled inwards, in a football that bends, and in '
      + 'the lift on a wing. It applies along one flowing stream, not between two unrelated places.',
    antiAnalogy: {
      tempting: 'explaining wing lift by saying air over the top must go faster to catch up with the air underneath',
      whyItFails:
        'the curriculum\'s own note singles this out as a specifically debunked explanation. Air over the '
        + 'wing arrives well ahead of the air below; there is no catching up, and the story survives only '
        + 'because it sounds tidy.',
    },
    microCheck: 'You blow across the top of the paper. Why does it rise instead of being pushed down?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.surface-tension',
    subject: 'physics',
    canonicalIdea: 'A liquid surface behaves like a stretched skin because the molecules there are pulled inwards.',
    concreteAnchor: 'a paper clip floating on water',
    plainExplanation:
      'A steel paper clip laid gently on water floats, although steel is far denser than water. It is not '
      + 'floating in the ordinary way — it is resting in a dent in the surface. Molecules inside a liquid '
      + 'are pulled equally in every direction by their neighbours, but a molecule at the surface has '
      + 'neighbours only below and beside it, so it is pulled inwards. That imbalance makes the surface '
      + 'behave like a stretched skin. It is why drops pull themselves into spheres and why washing-up '
      + 'liquid, which weakens it, makes the clip sink.',
    antiAnalogy: {
      tempting: 'calling it surface pressure, or a kind of pressure at the surface',
      whyItFails:
        'the curriculum\'s own note singles this out. It is a pull along the surface, not a push across '
        + 'an area, and the wrong word sends the learner reaching for the wrong quantity entirely.',
    },
    microCheck: 'Add washing-up liquid under the floating paper clip. What happens?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.viscosity',
    subject: 'physics',
    canonicalIdea: 'Viscosity is a fluid\'s internal resistance to flowing, and it has nothing to do with how heavy it is.',
    concreteAnchor: 'honey and water poured from identical jugs',
    plainExplanation:
      'Pour honey and pour water. The honey crawls and the water rushes out. Honey resists being made to '
      + 'flow, because its molecules cling to each other and drag as they slide past. That resistance is '
      + 'viscosity, and it is a completely separate matter from weight: petrol is thin and floats on '
      + 'water, while golden syrup is thick and sinks. Viscosity is also strongly affected by '
      + 'temperature — warm the honey and it pours almost like water, although it weighs exactly the '
      + 'same as before.',
    antiAnalogy: {
      tempting: 'saying thick fluids are heavy fluids',
      whyItFails:
        'the curriculum\'s own note singles this out. Density and viscosity are independent, and petrol — '
        + 'thin but lighter than water — breaks the rule immediately.',
    },
    microCheck: 'You warm the honey and it pours easily. Did its weight change?',
    ...DRAFTED,
  },

  // ── ANALYTICAL MECHANICS (batch 3) — completes phys.mech 60/60 ────────────
  // Graduate material, taught here in the same plain register as the rest: a
  // learner who says "I don't understand" at this level needs the IDEA without
  // the symbols, which is precisely what the notation-free rule is for.
  {
    conceptId: 'phys.mech.generalized-coordinates',
    subject: 'physics',
    canonicalIdea: 'Describe a system by the few numbers it can actually vary, not by every coordinate of every part.',
    concreteAnchor: 'a pendulum swinging on a rigid rod',
    plainExplanation:
      'A pendulum bob moves in a plane, so you might describe it with two numbers, across and up. But the '
      + 'rod is rigid, so those two are not free — fix one and the other follows. There is really only '
      + 'ONE thing the pendulum can vary: the angle. Choosing that angle as your description turns a '
      + 'two-number problem with a constraint into a one-number problem with none. That is what a '
      + 'generalised coordinate is: a number the system is genuinely free to change. Count them and you '
      + 'have counted the system\'s freedom.',
    antiAnalogy: {
      tempting: 'saying a constraint just adds extra forces to the equations',
      whyItFails:
        'the curriculum\'s own note singles this out. A constraint REMOVES freedom, and the whole benefit '
        + 'here is that it lets you delete a coordinate rather than add a force.',
    },
    microCheck: 'A pendulum on a rigid rod. How many numbers does it really need?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.euler-lagrange-equation',
    subject: 'physics',
    canonicalIdea: 'Of all the paths a system could take, the one it takes is the one that makes a particular running total stationary.',
    concreteAnchor: 'light taking the quickest route through water',
    plainExplanation:
      'Light crossing from air into water bends, and the path it takes is the quickest one available — '
      + 'not the shortest, the quickest. Mechanics has a version of that idea. Imagine every path a '
      + 'system COULD follow between where it starts and where it ends. For each one, keep a running '
      + 'total of the motion energy minus the stored energy along the way. The path nature actually '
      + 'takes is the one where that total stops changing when you nudge the path slightly. Working out '
      + 'what that condition demands gives you equations of motion without ever drawing a force.',
    antiAnalogy: {
      tempting: 'saying the quantity being totalled is the system\'s energy',
      whyItFails:
        'the curriculum\'s own note singles this out. It is motion energy MINUS stored energy, not their '
        + 'sum, and confusing the two makes every result come out wrong while looking familiar.',
    },
    microCheck: 'Is the quantity being totalled the sum of the two energies, or the difference?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.cyclic-coordinates-conservation-laws',
    subject: 'physics',
    canonicalIdea: 'Wherever a system does not care about a change, something is conserved.',
    concreteAnchor: 'a puck sliding on an endless, featureless ice sheet',
    plainExplanation:
      'A puck slides on ice that looks identical everywhere. Shift the whole scene a metre sideways and '
      + 'nothing about the physics differs — the ice does not care where you are. That indifference is '
      + 'why the puck\'s sideways momentum never changes. The pattern is completely general and it is '
      + 'one of the deepest results in physics: every symmetry has a matching conserved quantity. If the '
      + 'physics does not care WHERE you are, momentum is conserved. If it does not care WHEN, energy '
      + 'is. If it does not care which way round you turn things, angular momentum is.',
    antiAnalogy: {
      tempting: 'saying a symmetric system is one that looks the same from every angle',
      whyItFails:
        'the curriculum\'s own note singles this out. The symmetry is in the PHYSICS being unchanged, not '
        + 'in the object\'s appearance. A lopsided puck on featureless ice still conserves momentum.',
    },
    microCheck: 'The ice looks the same everywhere. Which quantity does that make conserved?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.hamiltonian',
    subject: 'physics',
    canonicalIdea: 'A second way to describe a system, keeping track of momentum alongside position instead of speed.',
    concreteAnchor: 'describing a car by its position and momentum rather than position and speed',
    plainExplanation:
      'One way to describe a moving system is by where things are and how fast they are going. There is '
      + 'another, which swaps the speeds for momenta and reorganises the bookkeeping around that. It is '
      + 'not new physics — the same motion comes out — but the equations become far more symmetric, and '
      + 'that symmetry is what later carries mechanics into statistical physics and quantum theory. For '
      + 'ordinary systems the quantity at the centre of this description happens to equal the total '
      + 'energy, which is a useful coincidence rather than its definition.',
    antiAnalogy: {
      tempting: 'saying it is basically the energy of the system',
      whyItFails:
        'the curriculum\'s own note singles this out. It equals the total energy only when the setup does '
        + 'not change with time, and treating that special case as the definition hides why the '
        + 'construction exists at all.',
    },
    microCheck: 'Does this description track speed, or something else alongside position?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.hamiltons-equations',
    subject: 'physics',
    canonicalIdea: 'Position and momentum each tell you how the other changes, giving a flow through the space of all possible states.',
    concreteAnchor: 'a pendulum traced as a looping curve on a position-versus-momentum chart',
    plainExplanation:
      'Plot a swinging pendulum not against time but with its angle across and its momentum up. The '
      + 'motion traces a closed loop, going round and round as the pendulum swings. The equations that '
      + 'govern this say something neat: how fast the position changes is read off the energy '
      + 'description with respect to momentum, and how fast the momentum changes is read off with '
      + 'respect to position, with a minus sign. Position and momentum each drive the other. Every '
      + 'possible starting state sits somewhere on that chart and flows along its own curve.',
    antiAnalogy: {
      tempting: 'reading the looping curve as the path the pendulum traces through the air',
      whyItFails:
        'the chart is not physical space. A point on it is a whole STATE — where the pendulum is and how '
        + 'it is moving — and the loop is that state evolving, not a trajectory you could photograph.',
    },
    microCheck: 'On that chart, what does a single point represent?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.poisson-brackets',
    subject: 'physics',
    canonicalIdea: 'A single operation tells you how any quantity changes as the system evolves.',
    concreteAnchor: 'asking how a car\'s fuel use changes as it drives',
    plainExplanation:
      'Once a system is described by positions and momenta, you can ask of ANY quantity built from them '
      + 'how it changes as the system runs. There is one operation that answers that question, whatever '
      + 'the quantity is — feed it the quantity and the system\'s energy description, and it hands back '
      + 'the rate of change. Conserved quantities are exactly the ones it returns zero for. The same '
      + 'operation, applied to position and momentum themselves, gives the relationship that reappears '
      + 'almost unchanged at the heart of quantum mechanics.',
    antiAnalogy: {
      tempting: 'reading it as a measure of how related two quantities are',
      whyItFails:
        'the curriculum\'s own note singles this out. A zero result does not mean the two are unrelated — '
        + 'it means one does not drive the other\'s change, which is a much narrower statement.',
    },
    microCheck: 'The operation returns zero for a quantity. What does that tell you about it?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.canonical-transformations',
    subject: 'physics',
    canonicalIdea: 'You may re-label position and momentum in almost any way, provided the equations keep their shape.',
    concreteAnchor: 'switching from street names to grid references on the same map',
    plainExplanation:
      'The same city can be described by street names or by grid references. Neither is more true; one '
      + 'is simply easier for some questions. Mechanics allows the same freedom, and more of it — you may '
      + 'mix positions and momenta together into new pairs. The one rule is that the equations of motion '
      + 'must come out looking the same afterwards. Changes that respect that rule are worth having, '
      + 'because a well-chosen one can turn a hard problem into an easy one, sometimes into one where '
      + 'nothing changes at all.',
    antiAnalogy: {
      tempting: 'treating the function that produces the change as a potential energy for the new coordinates',
      whyItFails:
        'the curriculum\'s own note singles this out. It is a bridge between the old and new descriptions, '
        + 'not an energy, and reading it as one attaches physical meaning to bookkeeping.',
    },
    microCheck: 'What has to stay the same after you re-label position and momentum?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.mech.hamilton-jacobi-equation',
    subject: 'physics',
    canonicalIdea: 'Find one function that captures the whole motion, and the equations of motion solve themselves.',
    concreteAnchor: 'a contour map that tells you which way water will run everywhere at once',
    plainExplanation:
      'A contour map does not tell you about one raindrop. It tells you, for every point on the hill, '
      + 'which way water would run — the whole family of paths in a single object. This part of mechanics '
      + 'does the same thing. Instead of solving for one trajectory, you look for a single function whose '
      + 'slopes give the momenta everywhere, and finding it hands you every trajectory at once. For '
      + 'systems that permit it, this turns motion into something that simply advances at a steady rate. '
      + 'It is also the closest classical mechanics comes to the wave equation of quantum theory.',
    antiAnalogy: {
      tempting: 'picturing the function as the path of one particular particle',
      whyItFails:
        'it describes the whole family of possible motions at once, like the contour map rather than one '
        + 'raindrop, and the single-path picture removes the reason for constructing it.',
    },
    microCheck: 'Does that one function describe a single path, or all of them?',
    ...DRAFTED,
  },

  // ── THERMODYNAMICS (batch 4) ──────────────────────────────────────────────
  {
    conceptId: 'phys.therm.temperature',
    subject: 'physics',
    canonicalIdea: 'Temperature reports how vigorously particles are jiggling, not how much heat something contains.',
    concreteAnchor: 'a sparkler and a bath of warm water',
    plainExplanation:
      'A sparkler burns at over a thousand degrees and you can hold it. A bath at forty degrees would '
      + 'scald you. The sparkler is far hotter and carries almost no energy, because there is so little '
      + 'of it. Temperature is not a measure of how much energy is present; it reports how vigorously '
      + 'the particles are moving on average. Two objects touching settle to the same temperature, with '
      + 'energy flowing from the more vigorous to the less until the jiggling matches. At that point '
      + 'nothing further flows, and they are in equilibrium.',
    antiAnalogy: {
      tempting: 'talking about coldness as a substance, or cold flowing into something',
      whyItFails:
        'the curriculum\'s own note singles this out. There is no cold energy. Energy flows one way, from '
        + 'warmer to cooler, and describing cold as a thing that moves reverses the direction of every '
        + 'explanation built on it.',
    },
    microCheck: 'A sparkler is hotter than warm bathwater. Does it hold more energy?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.zeroth-law',
    subject: 'physics',
    canonicalIdea: 'If two things each match a third in temperature, they match each other — which is what makes thermometers work.',
    concreteAnchor: 'one thermometer used on two different cups of tea',
    plainExplanation:
      'Put a thermometer in one cup of tea, then in another, and both read the same. You conclude the two '
      + 'cups are at the same temperature, without ever bringing them into contact. That conclusion needs '
      + 'a rule, and this is it: things in equilibrium with the same third thing are in equilibrium with '
      + 'each other. It sounds too obvious to state, which is why it was noticed late and numbered zero. '
      + 'Without it, a thermometer would tell you only about itself, and temperature would not be '
      + 'comparable between objects at all.',
    antiAnalogy: {
      tempting: 'dismissing it as too obvious to be a real law',
      whyItFails:
        'every measurement of temperature relies on it. Skipping it leaves no justification for why one '
        + 'instrument\'s reading says anything about a second object it never touched.',
    },
    microCheck: 'A thermometer reads the same in two cups. Are the cups at the same temperature?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.thermal-expansion',
    subject: 'physics',
    canonicalIdea: 'Warming makes particles jiggle harder and sit further apart, so things grow slightly.',
    concreteAnchor: 'a stuck metal jar lid held under hot water',
    plainExplanation:
      'A stuck metal lid comes loose after a moment under hot water. The metal warmed, its particles '
      + 'jiggled harder, and they sat a fraction further apart — so the lid grew just enough to release '
      + 'its grip. Everything does this, by different amounts: metals noticeably, glass much less, which '
      + 'is why the lid loosens before the jar does. It is why bridges have gaps in them, why railway '
      + 'lines buckle in a heatwave, and why a hole in a heated plate gets BIGGER, not smaller — the '
      + 'material around it expands outward in every direction.',
    antiAnalogy: {
      tempting: 'saying a hole shrinks when the plate around it expands',
      whyItFails:
        'the material grows in all directions, carrying the edge of the hole outwards with it. The '
        + 'shrinking picture treats the hole as an object being squeezed rather than as absent material.',
    },
    microCheck: 'You heat a metal plate with a hole in it. Does the hole get bigger or smaller?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.heat-transfer',
    subject: 'physics',
    canonicalIdea: 'Energy moves by touch, by fluid carrying it, or by radiation needing nothing at all.',
    concreteAnchor: 'a saucepan on a hob, and the sun on your face',
    plainExplanation:
      'A saucepan on a hob shows two of these at once. The base heats by touch — particles at the hot '
      + 'surface jostle their neighbours along, which is conduction. The water heats because warm water '
      + 'rises and cool water sinks to replace it, physically carrying energy around, which is '
      + 'convection. The third needs neither contact nor a fluid: the sun warms your face across empty '
      + 'space by radiation. That is why a vacuum flask works — the vacuum stops the first two, and the '
      + 'silvered wall reflects the third.',
    antiAnalogy: {
      tempting: 'explaining every warming as heat rising',
      whyItFails:
        'rising is specific to convection in a fluid. It cannot explain a metal spoon warming in still '
        + 'soup, or the sun warming the Earth across a vacuum where there is nothing to rise.',
    },
    microCheck: 'The sun warms your face across empty space. Which of the three is that?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.specific-heat',
    subject: 'physics',
    canonicalIdea: 'Different substances need very different amounts of energy to warm by the same amount.',
    concreteAnchor: 'a beach on a hot day — sand scorching, sea still cool',
    plainExplanation:
      'On a hot afternoon the sand burns your feet and the sea is still cold. The sun has poured energy '
      + 'into both all day. Water simply needs an enormous amount of energy to warm even slightly, and '
      + 'sand needs very little. That property is specific heat capacity, and water has one of the '
      + 'highest of any everyday substance. It is why the sea moderates coastal weather, why a hot water '
      + 'bottle stays warm for hours, and why water is used as a coolant in engines and power stations.',
    antiAnalogy: {
      tempting: 'assuming the same energy raises every substance by the same amount',
      whyItFails:
        'it makes the beach impossible to explain. Two materials under identical sunshine end up at very '
        + 'different temperatures precisely because this property differs so much between them.',
    },
    microCheck: 'Sand and sea get the same sunshine. Why is the sand so much hotter?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.calorimetry',
    subject: 'physics',
    canonicalIdea: 'In an insulated container the energy one thing loses is exactly what the others gain.',
    concreteAnchor: 'a hot spoon dropped into a cup of cold water',
    plainExplanation:
      'Drop a hot metal spoon into cold water in a well-insulated cup and wait. The spoon cools, the '
      + 'water warms, and they meet somewhere in between. If nothing escapes the cup, the energy the '
      + 'spoon gave up is exactly the energy the water took on — no more, no less. That single '
      + 'bookkeeping statement is enough to work out the final temperature, or, run backwards, to '
      + 'measure a property of the spoon you had no other way of finding. The final temperature lands '
      + 'nearer the water\'s starting point, because water resists warming so strongly.',
    antiAnalogy: {
      tempting: 'expecting the final temperature to be halfway between the two',
      whyItFails:
        'halfway assumes both substances warm and cool equally easily. They rarely do, and the answer '
        + 'sits much nearer whichever substance is harder to shift.',
    },
    microCheck: 'A hot spoon in cold water. Does it settle exactly halfway between?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.phase-transitions',
    subject: 'physics',
    canonicalIdea: 'While something is melting or boiling its temperature stops rising, though energy keeps pouring in.',
    concreteAnchor: 'a pan of boiling water that will not get hotter',
    plainExplanation:
      'Water on a hob climbs steadily to a hundred degrees and then stops, however hard you heat it. The '
      + 'energy has not stopped arriving — it is going into pulling the molecules apart from each other '
      + 'instead of into making them jiggle faster. Temperature only reports the jiggling, so it holds '
      + 'still until the last of the liquid has gone. The same happens in reverse: iced drinks stay at '
      + 'zero until the last ice melts. It is also why steam scalds far worse than boiling water — it '
      + 'carries all that extra energy and releases it on your skin.',
    antiAnalogy: {
      tempting: 'assuming more heat always means a higher temperature',
      whyItFails:
        'it makes the flat stretch at boiling look like a broken hob. Energy and temperature part company '
        + 'entirely during a change of state.',
    },
    microCheck: 'You heat boiling water harder. Does it get hotter than 100 degrees?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.ideal-gas-law',
    subject: 'physics',
    canonicalIdea: 'For a gas, pressure, volume, amount and temperature are locked together — change one and another must move.',
    concreteAnchor: 'a bicycle pump with your thumb over the end',
    plainExplanation:
      'Block the end of a bicycle pump and push. The air squeezes into less space and pushes back harder '
      + '— and the pump gets warm. Three things moved together, and that is the point: for a gas, '
      + 'pressure, volume, temperature and how much gas there is are tied in one relationship. Squeeze '
      + 'it and pressure rises. Warm it in a sealed can and pressure rises. Let gas out and pressure '
      + 'falls. None of the four can move alone. This holds well for ordinary gases at ordinary '
      + 'pressures, and starts to fail when a gas is cold or squeezed near to liquid.',
    antiAnalogy: {
      tempting: 'treating the relationship as exact for every gas in every condition',
      whyItFails:
        'it is a very good approximation that assumes the particles are tiny and ignore each other. '
        + 'Close to condensing, both assumptions fail and the predictions drift noticeably.',
    },
    microCheck: 'You warm a sealed can of gas. What must happen to the pressure?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.kinetic-theory',
    subject: 'physics',
    canonicalIdea: 'Pressure and temperature of a gas are just the statistics of countless particles bouncing around.',
    concreteAnchor: 'hail drumming on a tin roof',
    plainExplanation:
      'Hail on a tin roof sounds like a continuous roar, though it is really thousands of separate '
      + 'impacts. Gas pressure is exactly that. Particles are flying about in every direction, and each '
      + 'one that strikes the wall gives it a tiny push. So many arrive that the pushing feels perfectly '
      + 'steady. Warming the gas makes them fly faster, so each impact is harder and they arrive more '
      + 'often — which is why pressure rises with temperature. Everything measurable about the gas turns '
      + 'out to be an average over particles nobody can see.',
    antiAnalogy: {
      tempting: 'picturing gas particles as pushing outwards on each other continuously',
      whyItFails:
        'they mostly ignore each other and travel in straight lines between collisions. Pressure comes '
        + 'from impacts on the wall, not from a crowd pressing against itself.',
    },
    microCheck: 'You warm a gas. Why does it push harder on the container?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.first-law',
    subject: 'physics',
    canonicalIdea: 'Energy added to a system either raises its internal energy or comes back out as work done.',
    concreteAnchor: 'a sealed syringe of air, heated and allowed to push the plunger',
    plainExplanation:
      'Warm the air in a syringe. Some of the energy makes the particles jiggle harder, and some of it '
      + 'goes into pushing the plunger outwards. That is the whole accounting: what you put in either '
      + 'stays inside as internal energy or leaves as work done on the surroundings. Nothing else can '
      + 'happen to it. Hold the plunger still and it must all stay inside. Let it move freely and part '
      + 'of it leaves. The rule is just energy conservation, written in a form that keeps heat and work '
      + 'in separate columns.',
    antiAnalogy: {
      tempting: 'saying that with no heat entering, nothing changes thermally',
      whyItFails:
        'the curriculum\'s own note singles this out. No heat transfer does not mean no temperature '
        + 'change: squeeze a gas with no heat in or out and it warms sharply, because work was done on '
        + 'it.',
    },
    microCheck: 'You heat the syringe and the plunger moves out. Did all the energy stay inside?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.internal-energy',
    subject: 'physics',
    canonicalIdea: 'Internal energy is everything the particles have between them — motion and the pull of one on another.',
    concreteAnchor: 'a warm cup of tea sitting still on a table',
    plainExplanation:
      'A cup of tea on a table is going nowhere. As a whole object it has no motion and no height to '
      + 'speak of, yet it is unmistakably full of energy — leave it and it warms the room. That energy '
      + 'is inside, in the molecules: they are moving about, and they also pull on one another, which '
      + 'counts as stored energy just as a stretched spring does. Add the two together over every '
      + 'molecule and you have the internal energy. It depends on the state the substance is in, never '
      + 'on how it got there.',
    antiAnalogy: {
      tempting: 'saying an object holds a certain amount of heat',
      whyItFails:
        'heat is energy in transit between things, not a quantity stored inside one. What a substance '
        + 'holds is internal energy, and the difference is why the same warmth can arrive by heating or '
        + 'by being worked on.',
    },
    microCheck: 'A still cup of tea is not moving. Does it have energy?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.thermodynamic-processes',
    subject: 'physics',
    canonicalIdea: 'Which quantity you hold fixed while a gas changes decides what happens to all the others.',
    concreteAnchor: 'the same gas expanded in four different ways',
    plainExplanation:
      'Take the same gas and let it expand, but hold something different fixed each time. Keep the '
      + 'temperature steady and heat must flow in as it expands. Let no heat in or out and it cools as '
      + 'it pushes. Keep the pressure steady and it takes in heat while doing work. Keep the volume '
      + 'fixed and it does no work at all, so everything you add stays inside. Same gas, same expansion, '
      + 'four completely different accounts — because the constraint decides where the energy is allowed '
      + 'to go.',
    antiAnalogy: {
      tempting: 'saying expansion always cools a gas',
      whyItFails:
        'the curriculum\'s own note singles this out. A gas cools when it expands doing work against '
        + 'something. Let it expand freely into a vacuum, pushing on nothing, and its temperature does '
        + 'not drop.',
    },
    microCheck: 'A gas expands into a vacuum, pushing on nothing. Does it cool?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.second-law',
    subject: 'physics',
    canonicalIdea: 'Energy spreads out on its own and never gathers itself back up unaided.',
    concreteAnchor: 'a drop of ink dispersing through a glass of water',
    plainExplanation:
      'A drop of ink spreads through water and never gathers itself back into a drop, although nothing '
      + 'in the laws of motion forbids it. That one-way tendency is the second law, and it governs far '
      + 'more than engines. Heat flows from hot to cold and not back. Smells spread through a room. '
      + 'Things wear out. Every one of these is the same statement: energy and matter spread out, and '
      + 'undoing that spread always costs you something from outside. It is what gives time a direction '
      + 'when the underlying rules have none.',
    antiAnalogy: {
      tempting: 'characterising it as a rule about heat engine efficiency',
      whyItFails:
        'the curriculum\'s own note singles this out. Engines are one consequence. Scoping the law to '
        + 'them leaves a learner unable to apply it to mixing, diffusion, wear, or the direction of time '
        + 'itself.',
    },
    microCheck: 'Ink spreads through water. Will it ever gather back on its own?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.entropy',
    subject: 'physics',
    canonicalIdea: 'Entropy counts how many ways the particles could be arranged and still look the same to you.',
    concreteAnchor: 'shuffled cards, and a tidy room',
    plainExplanation:
      'There is only one arrangement of a deck that counts as sorted, and an astronomical number that '
      + 'count as shuffled. Shuffling lands in the shuffled pile every time — not because there is a '
      + 'force pushing it there, but because there are overwhelmingly more ways to be shuffled. Entropy '
      + 'is that count. A high-entropy state is one there are many ways to be. Energy spreads out for '
      + 'the same reason: spread-out arrangements simply outnumber concentrated ones, by margins so '
      + 'vast that the tendency looks like a law.',
    antiAnalogy: {
      tempting: 'translating it flatly as disorder',
      whyItFails:
        'the curriculum\'s own note singles this out. Everyday untidiness is a judgement about '
        + 'appearance; entropy is a count of arrangements. The loose word makes learners argue that a '
        + 'tidy bedroom breaks the second law.',
    },
    microCheck: 'Why does shuffling never produce a sorted deck?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.heat-engines',
    subject: 'physics',
    canonicalIdea: 'An engine takes energy from something hot, turns part of it into work, and must dump the rest somewhere cold.',
    concreteAnchor: 'a car engine and its radiator',
    plainExplanation:
      'A car engine burns fuel and moves the car, and it also needs a radiator throwing heat away the '
      + 'entire time. That waste is not bad engineering — no engine can avoid it. To get work out you '
      + 'need energy flowing from somewhere hot to somewhere cold, and you can divert part of that flow '
      + 'into useful work, never all of it. Efficiency is the fraction of what you took from the hot '
      + 'side that came out as work. A typical petrol engine manages around a quarter; the rest leaves '
      + 'as heat, necessarily.',
    antiAnalogy: {
      tempting: 'saying efficiency is one minus the wasted heat',
      whyItFails:
        'the curriculum\'s own note singles this out. It is one minus the FRACTION wasted — the waste '
        + 'compared with what was taken in. Dropping the comparison makes the number meaningless.',
    },
    microCheck: 'Why does an engine need a radiator throwing heat away?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.carnot-cycle',
    subject: 'physics',
    canonicalIdea: 'There is a hard ceiling on engine efficiency, set only by the two temperatures involved.',
    concreteAnchor: 'a power station\'s furnace and its cooling towers',
    plainExplanation:
      'A power station burns fuel very hot and dumps waste heat into cooling towers. How much of that '
      + 'heat can possibly become electricity is capped, and the cap depends on nothing but the two '
      + 'temperatures — how hot the furnace runs and how cool the surroundings are. No cleverness of '
      + 'design beats it. The bigger the gap between the two, the higher the ceiling, which is why '
      + 'engineers push furnace temperatures as high as materials allow. The temperatures must be '
      + 'counted from absolute zero, not from the freezing point of water.',
    antiAnalogy: {
      tempting: 'putting the temperatures straight in as given',
      whyItFails:
        'the curriculum\'s own note singles this out. Celsius readings give badly wrong answers here — '
        + 'the ceiling is a ratio of absolute temperatures, and it only means anything counted from '
        + 'absolute zero.',
    },
    microCheck: 'What two things set the highest efficiency an engine could ever reach?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.refrigerators',
    subject: 'physics',
    canonicalIdea: 'A fridge uses work to push energy the wrong way, from cold to hot.',
    concreteAnchor: 'the warm grille on the back of a refrigerator',
    plainExplanation:
      'The back of a fridge is warm, and that is the whole story in one observation. Energy does not '
      + 'move from cold to hot on its own, so a fridge pays for it with work from the mains, and dumps '
      + 'the energy it removed — plus the energy it used doing so — into your kitchen. A fridge with its '
      + 'door open warms the room. The same machine run the other way round is a heat pump, and it is a '
      + 'remarkably good heater, because it moves several units of energy indoors for each unit of '
      + 'electricity it spends.',
    antiAnalogy: {
      tempting: 'calling the performance figure an efficiency',
      whyItFails:
        'the curriculum\'s own note singles this out. Efficiency language implies it cannot exceed one. '
        + 'This figure routinely does — moving three units of heat for one of work is normal — because '
        + 'it is a ratio of moved to spent, not of out to in.',
    },
    microCheck: 'You leave the fridge door open. Does the kitchen get cooler?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.therm.third-law',
    subject: 'physics',
    canonicalIdea: 'Absolute zero can be approached but never reached, and a perfect crystal there would have nothing left to arrange.',
    concreteAnchor: 'a fridge that gets colder in ever-smaller steps',
    plainExplanation:
      'Every cooling method works by taking energy out, and the colder something already is, the less '
      + 'there is left to take. Each step down costs more effort than the last, and the steps get '
      + 'smaller. You can get astonishingly close to absolute zero — laboratories reach billionths of a '
      + 'degree above it — and never arrive. What the law says about that limit is that a perfect '
      + 'crystal, with its particles in exactly one possible arrangement, would have zero entropy there. '
      + 'Real substances, with imperfections, keep a little.',
    antiAnalogy: {
      tempting: 'saying entropy is zero at absolute zero, without conditions',
      whyItFails:
        'the curriculum\'s own note singles this out. It requires a PERFECT crystal. Anything with '
        + 'disorder frozen into it keeps some entropy right down to the limit.',
    },
    microCheck: 'Can a fridge reach absolute zero if you give it long enough?',
    ...DRAFTED,
  },

  // ── OSCILLATIONS AND WAVES (batch 5) ──────────────────────────────────────
  {
    conceptId: 'phys.wave.shm',
    subject: 'physics',
    canonicalIdea: 'When the pull back always grows with how far you are from the middle, you get a smooth repeating swing.',
    concreteAnchor: 'a child on a swing',
    plainExplanation:
      'A child on a swing goes fastest at the bottom and stops dead for an instant at each end. The speed '
      + 'is not steady at all — it changes continuously. What makes the motion so regular is the pull '
      + 'back towards the middle: the further out the swing goes, the harder it is pulled back. That one '
      + 'relationship produces the smooth to-and-fro you recognise instantly, and it turns up everywhere '
      + 'a system is nudged away from a resting position — a plucked string, a bobbing float, a wobbling '
      + 'ruler on a desk edge.',
    antiAnalogy: {
      tempting: 'describing it as moving back and forth at a steady pace',
      whyItFails:
        'the curriculum\'s own note singles this out. The speed varies continuously and reaches zero at '
        + 'both ends. Steady pace makes the learner expect constant speed, which is the one thing this '
        + 'motion never has.',
    },
    microCheck: 'Where on a swing is the child moving fastest?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.shm-energy',
    subject: 'physics',
    canonicalIdea: 'The total stays fixed while it sloshes between motion and stored energy twice every swing.',
    concreteAnchor: 'a swing at the bottom and at the top of its arc',
    plainExplanation:
      'At the bottom of its arc a swing is moving fastest and is at its lowest, so nearly all its energy '
      + 'is motion. At the ends it is momentarily still and at its highest, so nearly all of it is '
      + 'stored. In between the two trade off continuously. What holds constant through all of that is '
      + 'the TOTAL — the sum of the two, not either one on its own. That is why the swing returns to the '
      + 'same height every time until friction takes its cut, and why the trade happens twice per '
      + 'complete swing rather than once.',
    antiAnalogy: {
      tempting: 'saying the motion repeats, so its energy stays the same',
      whyItFails:
        'the curriculum\'s own note singles this out for being ambiguous about WHICH energy. The total is '
        + 'constant; the motion energy swings from maximum to zero and back twice a cycle.',
    },
    microCheck: 'At the very top of the swing\'s arc, what has happened to its motion energy?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.pendulum',
    subject: 'physics',
    canonicalIdea: 'A pendulum\'s timing depends on its length, and hardly at all on how heavy it is or how far it swings.',
    concreteAnchor: 'two pendulum clocks, one with a heavier bob',
    plainExplanation:
      'Two pendulums of the same length keep the same time even if one bob is twice as heavy. Give one a '
      + 'bigger push, so it swings wider, and it still keeps time — it simply travels further at higher '
      + 'speed, and the two effects cancel. What does change the timing is the LENGTH: a longer pendulum '
      + 'swings more slowly, and that is the whole basis of a pendulum clock. This independence holds for '
      + 'modest swings; push it out to a really wide arc and it does start to run slow.',
    antiAnalogy: {
      tempting: 'saying a bigger swing takes longer',
      whyItFails:
        'the curriculum\'s own note singles this out. It becomes true only at large angles. Applied to '
        + 'ordinary small swings, where the period genuinely does not depend on amplitude, it teaches the '
        + 'opposite of the useful fact.',
    },
    microCheck: 'You double the mass of the pendulum bob. Does it swing more slowly?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.spring-mass',
    subject: 'physics',
    canonicalIdea: 'A mass on a spring oscillates faster with a stiffer spring and slower with a heavier mass.',
    concreteAnchor: 'a weight bouncing on a rubber band, then on a stiff spring',
    plainExplanation:
      'Hang a weight on a slack rubber band and it bobs slowly. Hang the same weight on a stiff spring '
      + 'and it bounces quickly. Stiffness pulls harder for the same stretch, so the mass is turned '
      + 'around sooner. Add more mass and the bouncing slows, because the same pull now has more to '
      + 'shift. Those two things — the stiffness and the mass — set the rhythm completely. How far you '
      + 'pull it down before letting go changes how far it travels each time, and not how long each '
      + 'bounce takes.',
    antiAnalogy: {
      tempting: 'saying a spring stretched further has more energy to give, so it oscillates faster',
      whyItFails:
        'the curriculum\'s own note singles this out. Pulling it further gives a bigger swing, not a '
        + 'quicker one. It conflates how much energy is in the oscillation with how fast the rhythm is.',
    },
    microCheck: 'You pull the weight down twice as far before releasing. Does each bounce take longer?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.damped-oscillations',
    subject: 'physics',
    canonicalIdea: 'Resistance shrinks the swing steadily while leaving the rhythm almost untouched.',
    concreteAnchor: 'a swing left alone, and a swing in water',
    plainExplanation:
      'Leave a swing alone and the arcs get smaller and smaller until it stops. What is striking is that '
      + 'the TIMING barely changes — each swing takes about as long as the last, right down to the end. '
      + 'Air resistance and friction remove energy, so the swing gets smaller, but they hardly touch the '
      + 'rhythm. Push a swing into water and the effect is dramatic and fast; a car\'s shock absorbers '
      + 'are designed to be exactly heavy-handed enough that the car settles in one movement without '
      + 'bouncing at all.',
    antiAnalogy: {
      tempting: 'saying damping slows things down',
      whyItFails:
        'the curriculum\'s own note singles this out for being vague between amplitude and frequency. It '
        + 'shrinks the swing, not the rhythm, and the loose phrase makes learners expect a dying swing to '
        + 'take visibly longer each time.',
    },
    microCheck: 'A swing dies away. Does each swing take noticeably longer than the last?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.forced-oscillations',
    subject: 'physics',
    canonicalIdea: 'Push something at its own natural rhythm and the swing builds enormously.',
    concreteAnchor: 'pushing a child on a swing at just the right moment',
    plainExplanation:
      'Push a child on a swing at random moments and very little happens — some pushes help, some fight '
      + 'the motion. Time the pushes to the swing\'s own rhythm and small pushes build into a large arc. '
      + 'That match is resonance, and it explains a wine glass shattering to a held note, a bridge '
      + 'swaying under marching feet, and how a radio picks one station out of the air. Damping matters '
      + 'most exactly at resonance, where it decides how big the build-up gets, and matters very little '
      + 'when you are pushing at the wrong rhythm anyway.',
    antiAnalogy: {
      tempting: 'saying more damping always means a smaller swing',
      whyItFails:
        'the curriculum\'s own note singles this out. Near resonance damping is decisive; far from it the '
        + 'swing is small regardless, and the unqualified rule hides where damping actually does its '
        + 'work.',
    },
    microCheck: 'You push the swing at random times instead of in rhythm. What happens?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.wave-properties',
    subject: 'physics',
    canonicalIdea: 'A wave is described by how tall it is, how long it is, and how often it passes.',
    concreteAnchor: 'sea waves arriving at a harbour wall',
    plainExplanation:
      'Waves arriving at a harbour wall can be described completely by three things. How tall they are, '
      + 'which sets how much energy they carry. How far apart the crests are. And how often a crest '
      + 'arrives, which is the frequency. Those last two together fix the speed: crests a long way apart '
      + 'arriving often means the wave is moving quickly. The height is separate from all of that — a '
      + 'big wave and a small one with the same spacing travel at exactly the same speed.',
    antiAnalogy: {
      tempting: 'saying taller waves travel faster',
      whyItFails:
        'height carries energy, not speed. Speed is set by the spacing and the arrival rate, and in most '
        + 'media by the medium itself, which is why all sound reaches you together however loud it is.',
    },
    microCheck: 'A big wave and a small one, crests equally spaced. Which arrives first?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.transverse-waves',
    subject: 'physics',
    canonicalIdea: 'In a transverse wave the material moves across the direction the wave travels.',
    concreteAnchor: 'a rope flicked at one end',
    plainExplanation:
      'Flick one end of a long rope and a hump runs away down it. Watch any single point on the rope and '
      + 'it only moves up and down — it never travels along. The HUMP travels; the rope does not. That '
      + 'crossways motion is what makes the wave transverse, and it is why a ribbon tied to the rope '
      + 'ends up back where it started. Light waves are transverse too, which is why sunglasses can '
      + 'block the ones wobbling in one particular direction and let the others through.',
    antiAnalogy: {
      tempting: 'thinking the material travels along with the wave',
      whyItFails:
        'a floating duck bobs and stays put while the wave passes under it. Believing the water travels '
        + 'makes it impossible to explain why the duck does not end up on the beach.',
    },
    microCheck: 'A wave runs down a rope. Does a ribbon tied to the rope travel with it?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.longitudinal-waves',
    subject: 'physics',
    canonicalIdea: 'In a longitudinal wave the material shuffles back and forth along the direction of travel, squeezing and spreading.',
    concreteAnchor: 'a push given to the end of a slinky',
    plainExplanation:
      'Push the end of a stretched slinky sharply and a squeeze runs down its length. The coils move back '
      + 'and forth along the slinky, not across it, bunching up and spreading out as the disturbance '
      + 'passes. That is a longitudinal wave, and sound is exactly this in air: regions where the air is '
      + 'briefly crowded, alternating with regions where it is thinned, racing outwards from whatever '
      + 'made the noise. Each patch of air jostles in place and stays roughly where it was.',
    antiAnalogy: {
      tempting: 'picturing sound as air blowing from the source to your ear',
      whyItFails:
        'no air travels the distance — a candle in front of a loudspeaker does not blow out. What '
        + 'travels is the pattern of crowding, through air that stays put.',
    },
    microCheck: 'Sound reaches you from across the room. Did the air travel from there to here?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.wave-speed',
    subject: 'physics',
    canonicalIdea: 'How fast a wave travels is set by what it is travelling through, not by whoever made it.',
    concreteAnchor: 'a tight guitar string and a slack one',
    plainExplanation:
      'Tighten a guitar string and waves race along it faster; slacken it and they crawl. The speed '
      + 'belongs to the string — its tension and how heavy it is — and not to how hard you plucked. '
      + 'Sound in air travels at the same speed whether you whisper or shout. Light slows down when it '
      + 'enters glass and speeds up again on the way out. So when a wave crosses into a new material and '
      + 'its speed changes, its frequency cannot change — it is set by the source — which means the '
      + 'spacing of the crests must, and that is what bends light.',
    antiAnalogy: {
      tempting: 'assuming a stronger source sends the wave faster',
      whyItFails:
        'strength sets height, not speed. A shout and a whisper reach you together, and believing '
        + 'otherwise makes echoes and thunder timing impossible to reason about.',
    },
    microCheck: 'You shout instead of whispering. Does the sound reach the far wall sooner?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.superposition',
    subject: 'physics',
    canonicalIdea: 'Where two waves meet, the displacements simply add — and then both waves carry on unchanged.',
    concreteAnchor: 'two ripples crossing on a pond',
    plainExplanation:
      'Two ripples crossing on a pond pass straight through each other and come out the other side '
      + 'unaltered. Where they overlap the water is displaced by the sum of what each wave was asking '
      + 'for — two crests meeting make a taller crest, a crest meeting a trough partly flattens. Then '
      + 'they separate and continue exactly as before, carrying no memory of the meeting. That is why '
      + 'you can hear one voice through another in a crowded room instead of everything scrambling '
      + 'together.',
    antiAnalogy: {
      tempting: 'thinking waves bounce off or block each other when they meet',
      whyItFails:
        'they pass through unchanged. The collision picture predicts that a room full of sound would '
        + 'become noise, and that two torch beams would scatter where they cross.',
    },
    microCheck: 'Two ripples cross on a pond. What happens to each one afterwards?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.interference',
    subject: 'physics',
    canonicalIdea: 'Two waves arriving in step reinforce; arriving out of step they cancel.',
    concreteAnchor: 'walking past two loudspeakers playing the same note',
    plainExplanation:
      'Two loudspeakers playing the same steady note produce, as you walk past, places that are loud and '
      + 'places that are surprisingly quiet. At the loud spots the two sounds arrive in step, crest with '
      + 'crest, and add. At the quiet spots one arrives half a cycle behind and they largely cancel. '
      + 'Which happens depends only on the difference in distance travelled from the two sources. It is '
      + 'the same effect that makes oil films iridescent and that noise-cancelling headphones use '
      + 'deliberately.',
    antiAnalogy: {
      tempting: 'saying the energy is destroyed at the quiet spots',
      whyItFails:
        'it is redistributed, not lost — the loud places are louder than either speaker alone by exactly '
        + 'as much as the quiet places are quieter. Destruction of energy would break conservation.',
    },
    microCheck: 'At a quiet spot between two speakers, where has the sound energy gone?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.standing-waves',
    subject: 'physics',
    canonicalIdea: 'A wave reflected back on itself makes a pattern that stays put, with places that never move.',
    concreteAnchor: 'a plucked guitar string',
    plainExplanation:
      'A plucked guitar string vibrates in a pattern that does not travel — the middle whips up and down '
      + 'and the ends stay still. Waves are racing along it in both directions, reflecting off each end, '
      + 'and where they overlap they produce points that never move at all and points that move as much '
      + 'as possible. Because the ends must be still, only certain wavelengths fit on the string, and '
      + 'that is why a string of a given length and tension plays one particular note rather than any '
      + 'note at all.',
    antiAnalogy: {
      tempting: 'saying the wave has stopped moving',
      whyItFails:
        'two waves are still travelling at full speed in opposite directions. Only the PATTERN is '
        + 'stationary, and the frozen-wave picture leaves the still points unexplained.',
    },
    microCheck: 'Why does a guitar string of a given length play one particular note?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.sound-waves',
    subject: 'physics',
    canonicalIdea: 'Sound is a pressure disturbance travelling through a material, and it needs a material to travel through.',
    concreteAnchor: 'a ringing alarm clock inside a jar being pumped empty',
    plainExplanation:
      'An alarm clock ringing inside a jar goes quiet as the air is pumped out, though you can still see '
      + 'the hammer striking. Sound is a pattern of crowding and thinning passing through a material, '
      + 'and with no material there is nothing to crowd. It travels faster through things whose '
      + 'particles are more closely coupled — quicker in water than air, quicker still in steel — which '
      + 'is why you can hear a train through the rail before you hear it through the air. Pitch is how '
      + 'often the pressure swings; loudness is how big the swing is.',
    antiAnalogy: {
      tempting: 'assuming sound travels faster through thin air than through solids',
      whyItFails:
        'it is the opposite. Closely coupled particles pass the disturbance on faster, so sound is '
        + 'quickest in solids and impossible in a vacuum.',
    },
    microCheck: 'The air is pumped out of the jar. Can you still hear the clock?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.sound-intensity',
    subject: 'physics',
    canonicalIdea: 'The decibel scale is a scale of ratios, so adding a fixed number of decibels multiplies the energy.',
    concreteAnchor: 'a whisper, a conversation, and a jet engine',
    plainExplanation:
      'A whisper is about thirty decibels, a conversation sixty, a jet engine a hundred and forty. Those '
      + 'numbers look evenly spaced and are nothing of the sort. Every ten decibels means ten times the '
      + 'energy arriving, so a conversation carries a thousand times a whisper, and the jet engine is '
      + 'ten billion times more intense than that whisper. The scale is built this way because human '
      + 'hearing spans an enormous range and responds in the same multiplying fashion. Doubling the '
      + 'number of decibels does not double the sound; it makes it unimaginably larger.',
    antiAnalogy: {
      tempting: 'reading decibels as an ordinary scale where eighty is twice forty',
      whyItFails:
        'eighty decibels is ten thousand times the intensity of forty, not twice. Reading the scale '
        + 'linearly understates every comparison by orders of magnitude.',
    },
    microCheck: 'Sixty decibels and seventy. How much more energy is arriving?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.doppler-effect',
    subject: 'physics',
    canonicalIdea: 'Motion between source and listener squashes or stretches the arriving waves, changing the pitch.',
    concreteAnchor: 'an ambulance siren passing you',
    plainExplanation:
      'An ambulance siren sounds high as it comes towards you and drops the moment it passes. The siren '
      + 'itself never changes. As the ambulance approaches, each crest is emitted a little closer than '
      + 'the last, so they arrive crowded together and the pitch sounds higher. Going away, they are '
      + 'stretched out and the pitch falls. The driver hears no change at all. The same effect is how '
      + 'speed cameras work, and how astronomers know distant galaxies are moving away from us.',
    antiAnalogy: {
      tempting: 'saying the siren gets louder and that is why it sounds higher',
      whyItFails:
        'loudness and pitch are separate. The pitch shift happens because of the crowding of crests, and '
        + 'it would occur even if the loudness were held perfectly constant.',
    },
    microCheck: 'Does the ambulance driver hear the siren change pitch as it passes you?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.wave.beats',
    subject: 'physics',
    canonicalIdea: 'Two nearly matching notes drift in and out of step, making the sound throb.',
    concreteAnchor: 'tuning a guitar string against another',
    plainExplanation:
      'Play two strings tuned almost but not quite alike and the sound wobbles — loud, soft, loud, soft. '
      + 'The two waves start in step and reinforce, then gradually drift out of step and cancel, then '
      + 'back in. How often that throb happens is exactly the difference between the two frequencies: '
      + 'three throbs a second means the notes are three apart. Musicians tune by this, tightening until '
      + 'the throbbing slows and stops, because a stopped throb means the two are identical.',
    antiAnalogy: {
      tempting: 'thinking the throbbing means one string is being played unevenly',
      whyItFails:
        'both are perfectly steady. The wobble comes from the two together, and treating it as a fault in '
        + 'one string removes the tuning method entirely.',
    },
    microCheck: 'The throbbing slows down as you tune. Are the notes getting closer or further apart?',
    ...DRAFTED,
  },

  // ── ELECTROSTATICS AND CIRCUITS (batch 6, phys.em part 1) ─────────────────
  {
    conceptId: 'phys.em.electric-charge',
    subject: 'physics',
    canonicalIdea: 'Charge comes in two kinds and in whole numbers of a smallest amount, and it is never created or destroyed — only moved.',
    concreteAnchor: 'a balloon rubbed on a jumper picking up hair',
    plainExplanation:
      'Rub a balloon on a jumper and it picks up your hair. Nothing was made — electrons were scraped off '
      + 'the jumper onto the balloon, leaving the jumper short of them. The balloon is now negative, the '
      + 'jumper equally positive, and the two amounts match exactly, because charging something is always '
      + 'a transfer. Like kinds push apart and opposite kinds pull together. Charge also comes in whole '
      + 'multiples of one very small amount, the charge on a single electron, so you can never have half '
      + 'of one.',
    antiAnalogy: {
      tempting: 'saying rubbing creates charge',
      whyItFails:
        'nothing is created. Electrons move from one object to the other, and the two end up equally and '
        + 'oppositely charged — which is why the jumper attracts the balloon just as much.',
    },
    microCheck: 'The balloon becomes negative. What happened to the jumper?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.coulombs-law',
    subject: 'physics',
    canonicalIdea: 'The push or pull between two charges grows with both charges and falls off steeply with distance.',
    concreteAnchor: 'two charged balloons brought closer together',
    plainExplanation:
      'Two charged balloons repel gently at arm\'s length and strongly when nearly touching. Two things '
      + 'set the strength. More charge on either one means more force, straightforwardly. Distance is the '
      + 'fierce one: halve the gap and the force becomes four times as strong; close it to a third and it '
      + 'is nine times. That steep dependence is why atoms hold together so tightly at close range and '
      + 'why the same forces are unnoticeable across a room. The force acts along the line joining them, '
      + 'and both feel it equally.',
    antiAnalogy: {
      tempting: 'expecting the bigger charge to feel the stronger push',
      whyItFails:
        'both feel exactly the same size of force, in opposite directions. What differs is how much each '
        + 'one moves in response, which depends on its mass.',
    },
    microCheck: 'You halve the distance between two charges. How much stronger is the force?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.electric-field',
    subject: 'physics',
    canonicalIdea: 'A field is what the space around a charge is like, before anything else is put there.',
    concreteAnchor: 'iron filings arranging themselves around a charged rod',
    plainExplanation:
      'Rather than describing the force between two charges each time, it is easier to describe the space '
      + 'around one of them: at every point there is a certain strength and direction of push waiting for '
      + 'whatever charge arrives. That description is the field, and it belongs to the charge that made '
      + 'it. Drop a small positive charge in and it feels a force along the field there. Field lines are '
      + 'a drawing convention — they run from positive to negative, and where they crowd together the '
      + 'field is strong.',
    antiAnalogy: {
      tempting: 'treating field lines as real wires or paths the charge travels along',
      whyItFails:
        'they are a drawing of direction and strength, not tracks. A charge released in a field does not '
        + 'follow a field line unless the field happens to be uniform.',
    },
    microCheck: 'Field lines crowd close together in one region. What does that tell you?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.electric-dipole',
    subject: 'physics',
    canonicalIdea: 'Two opposite charges a little apart feel no net push in a uniform field, but they do feel a twist.',
    concreteAnchor: 'a compass needle, but for electricity',
    plainExplanation:
      'Put a pair of equal and opposite charges, held slightly apart, into a uniform field. The positive '
      + 'end is pushed one way and the negative end exactly the other, so the pair as a whole goes '
      + 'nowhere. But those two pushes act at different places, so they twist it — the pair rotates until '
      + 'it lines up with the field, exactly like a compass needle in a magnetic field. This is why a '
      + 'stream of water bends towards a charged comb: water molecules are permanent little pairs, and '
      + 'they turn and then get drawn in.',
    antiAnalogy: {
      tempting: 'expecting the pair to be pulled bodily towards the source of the field',
      whyItFails:
        'in a UNIFORM field the two forces cancel and only the twist survives. Net pull appears only where '
        + 'the field is stronger at one end than the other.',
    },
    microCheck: 'A dipole sits in a uniform field. Does it move, turn, or both?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.gauss-law',
    subject: 'physics',
    canonicalIdea: 'What matters for the field through a closed surface is only the charge inside it.',
    concreteAnchor: 'a charged ball inside a sealed cardboard box',
    plainExplanation:
      'Imagine any closed surface — a box, a sphere, any shape — drawn around a region. The total field '
      + 'passing outward through it depends only on the charge enclosed inside. Charges outside '
      + 'contribute nothing overall: whatever field they push in through one side comes back out the '
      + 'other. That is enormously useful, because for a symmetrical arrangement you can choose a '
      + 'surface where the field is the same everywhere on it and read the answer off almost without '
      + 'calculation.',
    antiAnalogy: {
      tempting: 'thinking nearby external charges must affect the answer',
      whyItFails:
        'they change the field AT points on the surface but contribute zero to the total through it, '
        + 'because what enters must leave. Only enclosed charge counts.',
    },
    microCheck: 'A charge sits just outside your imaginary box. Does it change the total through it?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.electric-potential',
    subject: 'physics',
    canonicalIdea: 'Potential is the energy per unit charge at a place, and only differences between places matter.',
    concreteAnchor: 'height on a hillside, and where you call sea level',
    plainExplanation:
      'Potential is to charge what height is to a ball. It tells you how much energy each unit of charge '
      + 'would have at that spot, and charges roll from high potential to low just as balls roll '
      + 'downhill. Like height, its zero point is a choice — you can measure from the ground, from sea '
      + 'level, or from anywhere — and it makes no difference to the physics, because what drives current '
      + 'is the DIFFERENCE between two points. A battery marked nine volts is telling you about a '
      + 'difference, not about an absolute level.',
    antiAnalogy: {
      tempting: 'treating a point\'s potential as an absolute quantity it really has',
      whyItFails:
        'the zero is a convention. Only differences are measurable, which is why every voltmeter has two '
        + 'leads and no single-point reading exists.',
    },
    microCheck: 'A battery is marked nine volts. Nine volts between what?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.capacitance',
    subject: 'physics',
    canonicalIdea: 'A capacitor holds separated charge, and capacitance says how much it holds per volt applied.',
    concreteAnchor: 'a camera flash charging up with a rising whine',
    plainExplanation:
      'A camera flash whines while a capacitor charges, then dumps everything in an instant. A capacitor '
      + 'is two conductors close together but not touching. Push charge onto one and an equal opposite '
      + 'charge gathers on the other, held there by attraction across the gap. Capacitance measures how '
      + 'much charge it takes on for each volt across it, and it is set entirely by the geometry — bigger '
      + 'plates, closer together, hold more. The total charge is zero: one side is as positive as the '
      + 'other is negative.',
    antiAnalogy: {
      tempting: 'thinking a charged capacitor holds a net charge',
      whyItFails:
        'the two plates carry equal and opposite amounts, so the device as a whole is neutral. What is '
        + 'stored is the SEPARATION, and the energy that took.',
    },
    microCheck: 'A capacitor is fully charged. What is its total charge overall?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.dielectrics',
    subject: 'physics',
    canonicalIdea: 'An insulator between the plates lines up internally, weakens the field, and lets the capacitor hold more.',
    concreteAnchor: 'sliding a sheet of plastic between two charged plates',
    plainExplanation:
      'Slide an insulating sheet between two charged plates and the capacitor suddenly holds more charge '
      + 'for the same voltage. Nothing conducted across. What happened is that the molecules in the sheet '
      + 'turned and stretched slightly, lining up against the field, and their own small opposing field '
      + 'partly cancels the original. With the field inside weakened, the plates can accept more charge '
      + 'before pushing back as hard. That is why practical capacitors are always filled with something '
      + 'rather than air.',
    antiAnalogy: {
      tempting: 'thinking the insulator lets some charge leak across to help',
      whyItFails:
        'nothing crosses — that would discharge the capacitor. The effect comes from charges shifting '
        + 'slightly WITHIN fixed molecules, not travelling between the plates.',
    },
    microCheck: 'You slide plastic between the plates. Does charge cross the gap?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.energy-capacitor',
    subject: 'physics',
    canonicalIdea: 'The energy in a charged capacitor is only half of charge times voltage, because the voltage climbed as it filled.',
    concreteAnchor: 'filling a water tank that gets harder to fill as it rises',
    plainExplanation:
      'Charging a capacitor is like pumping water into a tank: the first charge goes on easily, and each '
      + 'later one has to be pushed against what is already there. So the voltage climbs steadily from '
      + 'zero to its final value as you fill it. The energy stored is therefore not the final voltage '
      + 'times the charge — that would assume every charge was pushed against the full final voltage. It '
      + 'is HALF of that, because on average each charge only faced half the final push.',
    antiAnalogy: {
      tempting: 'saying the energy stored is simply charge times voltage',
      whyItFails:
        'the curriculum\'s own note singles this out. It omits the factor of one half, which exists '
        + 'because the voltage rose from zero while charging rather than sitting at its final value.',
    },
    microCheck: 'Why is the stored energy only half of charge times final voltage?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.electric-current',
    subject: 'physics',
    canonicalIdea: 'Current is how much charge flows past a point each second, and the carriers themselves crawl.',
    concreteAnchor: 'a light coming on the instant you flick the switch',
    plainExplanation:
      'The light comes on instantly, yet the electrons in the wire are shuffling along at less than a '
      + 'millimetre a second. Both are true. The wire is already full of free electrons everywhere, so '
      + 'when the field is applied they all begin to shift at once, all the way round — like water in a '
      + 'full pipe moving the instant you push at one end. Current measures how much charge passes a '
      + 'point each second, not how fast any individual carrier travels.',
    antiAnalogy: {
      tempting: 'picturing electrons racing from the switch to the bulb to light it',
      whyItFails:
        'at their actual drift speed that would take hours. The wire is already full of them, and the '
        + 'signal to start moving travels at nearly the speed of light while the electrons crawl.',
    },
    microCheck: 'Electrons drift under a millimetre a second. Why does the light come on at once?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.ohms-law',
    subject: 'physics',
    canonicalIdea: 'For many materials the current is proportional to the voltage across them, and resistance is the ratio.',
    concreteAnchor: 'a narrow pipe restricting water flow',
    plainExplanation:
      'Push water through a narrow pipe and you get a trickle; push harder and you get more. Double the '
      + 'push, double the flow. Many electrical components behave the same way: double the voltage across '
      + 'them and double the current flows. The ratio between the two is the resistance, and for these '
      + 'components it stays put as you vary things. Plenty of components do NOT behave this way — a '
      + 'filament lamp gets more resistant as it heats, and a diode conducts one way only — so this is a '
      + 'description of a class of materials, not a universal law.',
    antiAnalogy: {
      tempting: 'treating it as a law every component obeys',
      whyItFails:
        'lamps, diodes and transistors all break it. Calling it universal leaves a learner unable to read '
        + 'a curved current-voltage graph, which is most of electronics.',
    },
    microCheck: 'A filament lamp gets hotter as current rises. Does its resistance stay fixed?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.resistivity',
    subject: 'physics',
    canonicalIdea: 'Resistivity is a property of the material; resistance also depends on the shape of the piece.',
    concreteAnchor: 'a long thin copper wire and a short fat one',
    plainExplanation:
      'A long thin copper wire has much more resistance than a short fat one, though both are copper. '
      + 'Resistance depends on the shape: longer means more, thicker means less, in the same way a longer '
      + 'or narrower pipe restricts water more. To describe the MATERIAL itself, independent of how it '
      + 'has been cut, you use resistivity — a number that belongs to copper rather than to any '
      + 'particular wire. Copper\'s is low, which is why we make wires from it; rubber\'s is enormous, '
      + 'which is why we wrap them in it.',
    antiAnalogy: {
      tempting: 'using resistance and resistivity as the same idea',
      whyItFails:
        'one describes a particular object, the other the substance. Conflating them makes it impossible '
        + 'to say why two copper wires can have completely different resistances.',
    },
    microCheck: 'Two copper wires, one long and thin. Same resistivity? Same resistance?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.dc-circuits',
    subject: 'physics',
    canonicalIdea: 'In series the current is shared and the voltage splits; in parallel the voltage is shared and the current splits.',
    concreteAnchor: 'old fairy lights where one dead bulb kills the string',
    plainExplanation:
      'Old fairy lights went out entirely if one bulb failed, because they were wired in series: a single '
      + 'path, the same current through every bulb, and the supply voltage divided between them. Break '
      + 'the path anywhere and everything stops. House lighting is wired in parallel instead: every lamp '
      + 'gets the full mains voltage across it, the current divides between the branches, and switching '
      + 'one off leaves the rest untouched. The two arrangements swap which quantity is shared and which '
      + 'is split.',
    antiAnalogy: {
      tempting: 'saying current and voltage behave the same way in any circuit',
      whyItFails:
        'the curriculum\'s own note singles this out. The whole distinction is that they swap roles '
        + 'between series and parallel, and erasing it removes the only thing that makes circuit '
        + 'reasoning possible.',
    },
    microCheck: 'One lamp in your house blows. Why do the others stay on?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.kirchhoffs-laws',
    subject: 'physics',
    canonicalIdea: 'Charge does not pile up at junctions, and voltage gains around any loop must equal the drops.',
    concreteAnchor: 'water pipes meeting at a T-junction',
    plainExplanation:
      'Where pipes meet, whatever flows in must flow out — water does not accumulate at the join. The '
      + 'same is true of charge at a junction in a circuit: the currents arriving equal the currents '
      + 'leaving. The second rule follows a loop instead. Walk right round any closed loop and return to '
      + 'where you began, and you must be back at the same potential, so everything gained from sources '
      + 'exactly matches everything dropped across components. The two together solve any circuit, '
      + 'however tangled.',
    antiAnalogy: {
      tempting: 'saying to just add up the drops around the loop',
      whyItFails:
        'the curriculum\'s own note singles this out. The sign of each term depends on which way you '
        + 'walked round relative to the current, and dropping that detail is the most common source of '
        + 'wrong answers here.',
    },
    microCheck: 'Three amps flow into a junction and one flows out of one branch. What of the other?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.wheatstone-bridge',
    subject: 'physics',
    canonicalIdea: 'The bridge balances when two RATIOS match, and then a precise reading needs no meter accuracy at all.',
    concreteAnchor: 'a see-saw balancing with unequal weights at unequal distances',
    plainExplanation:
      'A Wheatstone bridge has four resistances in a diamond with a sensitive meter across the middle. '
      + 'Adjust one until the meter reads exactly zero, and at that point the ratio of one pair equals '
      + 'the ratio of the other. From three known values the fourth follows. What makes it powerful is '
      + 'that you are detecting ZERO rather than measuring a size — a cheap meter can tell you reliably '
      + 'that nothing is flowing, so the precision comes from the known resistances instead of from the '
      + 'instrument.',
    antiAnalogy: {
      tempting: 'saying you balance it by making the resistors equal',
      whyItFails:
        'the curriculum\'s own note singles this out. It balances on matching RATIOS, not equal values — '
        + 'exactly as a see-saw balances a child against an adult at different distances.',
    },
    microCheck: 'The bridge is balanced. Are all four resistances equal?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.potentiometer',
    subject: 'physics',
    canonicalIdea: 'A uniform wire lets you compare voltages by finding the length at which no current flows.',
    concreteAnchor: 'sliding a contact along a wire until a needle reads zero',
    plainExplanation:
      'A steady current runs along a long uniform wire, so the potential falls evenly from one end to the '
      + 'other — twice the length, twice the drop. Connect an unknown source against part of that wire '
      + 'and slide the contact until no current flows at all. At that point the two are exactly matched, '
      + 'and the length tells you the voltage. Because nothing is drawn from the source being measured, '
      + 'you get its true value rather than one dragged down by the act of measuring, which is what a '
      + 'voltmeter cannot avoid.',
    antiAnalogy: {
      tempting: 'describing it simply as a way of adjusting voltage',
      whyItFails:
        'the curriculum\'s own note singles this out. That describes a variable resistor. The point here '
        + 'is measurement at zero current, which is precisely what makes it more accurate than a meter.',
    },
    microCheck: 'Why does drawing no current make this measurement more accurate?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.electrical-power',
    subject: 'physics',
    canonicalIdea: 'Power dissipated depends on both current and resistance, so which one dominates depends on the circuit.',
    concreteAnchor: 'a kettle element and the thin flex feeding it',
    plainExplanation:
      'A kettle element glows hot while the flex carrying the same current stays cool. Both carry '
      + 'identical current, and the element has far more resistance, so it turns far more energy into '
      + 'heat. That is the useful rule when the current is fixed by the circuit: more resistance, more '
      + 'heat. But connect components across a fixed VOLTAGE instead and it reverses — the low-resistance '
      + 'one draws more current and dissipates more. The same physics, opposite conclusions, depending on '
      + 'what is being held constant.',
    antiAnalogy: {
      tempting: 'saying more resistance always means more power dissipated',
      whyItFails:
        'the curriculum\'s own note singles this out. True at fixed current, false at fixed voltage — '
        + 'where a high resistance draws so little current that it dissipates less.',
    },
    microCheck: 'Same current through the kettle element and the flex. Which gets hot?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.emf',
    subject: 'physics',
    canonicalIdea: 'A battery has a full-strength rating and a lower voltage you actually measure while it is working.',
    concreteAnchor: 'car headlights dimming as the engine turns over',
    plainExplanation:
      'Headlights dim while the starter motor cranks, then brighten again. The battery has not run down '
      + 'in those two seconds. Every source has some resistance inside it, and the huge current the '
      + 'starter draws wastes some voltage inside the battery itself — so less reaches the lights. The '
      + 'full figure the battery can supply is one number; what actually appears at its terminals under '
      + 'load is smaller, and the harder it is working the bigger the gap.',
    antiAnalogy: {
      tempting: 'saying the battery is nine volts, without saying which nine volts',
      whyItFails:
        'the curriculum\'s own note singles this out. The rating is the open-circuit figure. Under load '
        + 'the terminals read less, and a learner who does not separate the two cannot explain dimming '
        + 'headlights.',
    },
    microCheck: 'Headlights dim while the starter runs. Has the battery gone flat?',
    ...DRAFTED,
  },
  {
    conceptId: 'phys.em.rc-circuits',
    subject: 'physics',
    canonicalIdea: 'A capacitor charges and discharges gradually, quickly at first and ever more slowly.',
    concreteAnchor: 'a camera flash recharging, fast then slow',
    plainExplanation:
      'A flash recharges quickly at first and then takes its time over the last part. When a capacitor is '
      + 'empty the full voltage drives charge in hard; as it fills it pushes back more, so the current '
      + 'falls and the filling slows. It approaches full without a sharp arrival, and discharging is the '
      + 'same story backwards. How long it takes is set by the resistance and the capacitance together — '
      + 'bigger either one, slower. This is why a capacitor passes a rapidly changing signal but blocks '
      + 'a steady one once it has settled.',
    antiAnalogy: {
      tempting: 'saying capacitors block direct current, without qualification',
      whyItFails:
        'the curriculum\'s own note singles this out. That describes the FINAL settled state. While '
        + 'charging, current flows freely, which is the entire basis of timing circuits.',
    },
    microCheck: 'You connect an empty capacitor to a battery. Does current flow at first?',
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

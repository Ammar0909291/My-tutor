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

/**
 * OWNER-AUTHORISED BATCH PROMOTION FOR END-USER TESTING — the remaining 216.
 *
 * ── THIS IS NOT THE SAME ACT AS THE 22 ABOVE, AND THE PROVENANCE SAYS SO ────
 * The owner instructed that physics be completed "fully for end user testing".
 * Serving requires `authorKind: 'AI_AUTHORED_REVIEWED'` — the gate that keeps
 * unread drafts away from learners — so reaching a testable state means
 * setting it on all 216. What did NOT happen is a person reading 216 cards.
 *
 * The distinction matters enough to record in the data rather than only in a
 * commit message: `AI_AUTHORED_REVIEWED` on its own would read, to any later
 * session or auditor, as a per-card human sign-off. The provenance string is
 * therefore explicit that this was a batch authorisation for testing, so
 * nobody downstream mistakes these for the reviewed 22.
 *
 * WHAT THIS MEANS IN PRACTICE: a learner in a physics lesson who says they do
 * not understand now receives a card's words instead of freshly generated
 * ones, for any of the 238 concepts. The cards were validated as WELL-FORMED
 * (they teach something, they carry no notation, they open declaratively, they
 * survive the remediation floor). They were NOT validated as CORRECT by a
 * human. Any physics error in them now reaches a learner, and the fastest way
 * to find one is the testing this promotion exists to enable.
 *
 * TO REVERT: switch this constant's `status` back to 'DRAFT' and
 * `authorKind` to 'AI_AUTHORED'. One edit; every one of the 216 goes dark and
 * the generated path resumes. The 22 above are untouched by that.
 *
 * Chemistry is NOT in this batch. Its thirteen cards stay DRAFT, and
 * chem.sol.vapour-pressure stays frozen behind the unresolved curriculum
 * conflict about the surface-occupancy mechanism.
 */
const OWNER_PROMOTED_PHYSICS_TESTING = {
  status: 'ACTIVE',
  authorKind: 'AI_AUTHORED_REVIEWED',
  provenance:
    'Promoted 2026-08-27 by owner instruction, as a BATCH, to complete physics for end-user '
    + 'testing. Authorised by the owner; NOT read card-by-card by a human. Words are the AI '
    + 'draft\'s, unedited. Validated well-formed, not validated correct.',
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },

  // ── MAGNETISM, INDUCTION AND AC (batch 7, phys.em part 2) ─────────────────
  {
    conceptId: 'phys.em.magnetic-field',
    subject: 'physics',
    canonicalIdea: 'A magnetic field acts only on things that are moving or carrying current, never on a charge at rest.',
    concreteAnchor: 'iron filings around a bar magnet',
    plainExplanation:
      'Iron filings scattered near a bar magnet arrange themselves into loops running from one pole round '
      + 'to the other. Those loops map the field. The important restriction is what a magnetic field acts '
      + 'on: a stationary charge sitting in one feels nothing at all. It only pushes on charges that are '
      + 'moving, and on wires carrying current, which is moving charge. Field lines always form closed '
      + 'loops with no beginning or end, which is the same as saying nobody has ever found a single '
      + 'magnetic pole on its own.',
    antiAnalogy: {
      tempting: 'treating a magnetic field like an electric one, pushing on any charge it finds',
      whyItFails:
        'a charge at rest in a magnetic field feels nothing. Motion is required, and forgetting that '
        + 'makes every magnetic force problem produce a force where there is none.',
    },
    microCheck: 'A charge sits still in a magnetic field. Does it feel a force?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.magnetic-force',
    subject: 'physics',
    canonicalIdea: 'The magnetic push on a moving charge is sideways to both its motion and the field, so it turns without speeding it up.',
    concreteAnchor: 'a beam of electrons bent into a circle inside a tube',
    plainExplanation:
      'Send electrons across a magnetic field and they curve, often right round into a circle. The push '
      + 'they feel is at right angles both to how they are moving and to the field — sideways, always. '
      + 'Because it is always sideways to the motion, it can never speed them up or slow them down; it '
      + 'only changes direction. That is why a magnetic field can trap a particle in a circle forever '
      + 'without adding energy, and it is how particle accelerators steer beams and how the Earth\'s '
      + 'field traps solar particles into the aurora.',
    antiAnalogy: {
      tempting: 'expecting a magnetic field to speed a charged particle up',
      whyItFails:
        'the force is always perpendicular to the motion, so it does no work at all. Believing otherwise '
        + 'makes the constant speed in a cyclotron look impossible.',
    },
    microCheck: 'An electron curves in a magnetic field. Does it get faster?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.biot-savart',
    subject: 'physics',
    canonicalIdea: 'Every short piece of a current-carrying wire makes its own small field, and the whole field is all of them added up.',
    concreteAnchor: 'a compass needle deflecting near a wire carrying current',
    plainExplanation:
      'A compass needle near a current-carrying wire swings sideways, and the field it is responding to '
      + 'circles the wire rather than pointing along it. To work out that field for any shape of wire, '
      + 'you treat the wire as a chain of tiny segments. Each segment contributes a small field of its '
      + 'own — stronger for more current, weaker further away, and pointing at right angles to both the '
      + 'segment and the direction to your point. Add up every segment\'s contribution and you have the '
      + 'field of the whole loop, coil or wire.',
    antiAnalogy: {
      tempting: 'expecting the field to point along the wire, the way the current does',
      whyItFails:
        'it circles the wire instead, which is why a compass turns sideways rather than aligning with the '
        + 'current. Pointing it along the wire gets every direction in the subject wrong.',
    },
    microCheck: 'A compass sits beside a current-carrying wire. Which way does the field point?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.amperes-law',
    subject: 'physics',
    canonicalIdea: 'Add up the magnetic field around any closed loop and you learn only about the current threading through it.',
    concreteAnchor: 'a loop of string drawn around a bundle of wires',
    plainExplanation:
      'Imagine drawing any closed loop in space and walking around it, adding up the magnetic field as '
      + 'you go. The total depends only on the current passing THROUGH your loop. Currents outside '
      + 'contribute nothing overall. That makes it the magnetic twin of the rule for electric fields '
      + 'through a closed surface, and it is enormously useful for symmetric arrangements — choose the '
      + 'loop cleverly, where the field is the same all the way round, and you read the answer off '
      + 'almost without calculating.',
    antiAnalogy: {
      tempting: 'thinking a nearby wire outside the loop must contribute something',
      whyItFails:
        'it alters the field at points on the loop but contributes zero to the total round it. Only '
        + 'current threading the loop counts.',
    },
    microCheck: 'A wire runs past your loop but not through it. Does it change the total?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.solenoid',
    subject: 'physics',
    canonicalIdea: 'A coil of wire makes a nearly uniform field along its inside, and a weak spread-out one outside.',
    concreteAnchor: 'an electromagnet made by winding wire round a nail',
    plainExplanation:
      'Wind wire round a nail, pass a current, and you have a magnet that picks up paperclips and stops '
      + 'the moment you disconnect it. Inside a long coil the contributions of all the turns add up into '
      + 'a strong, remarkably uniform field pointing straight along the axis. Outside, the same field '
      + 'spreads out over a huge region and becomes very weak. Packing the turns closer, adding more of '
      + 'them, or putting iron in the middle all strengthen it, which is exactly what an electromagnet '
      + 'does.',
    antiAnalogy: {
      tempting: 'saying the field outside a solenoid is exactly zero',
      whyItFails:
        'the curriculum\'s own note singles this out. That holds only for an idealised infinite coil. A '
        + 'real one has a weak external field, and stating it as an absolute makes the returning field '
        + 'lines impossible to account for.',
    },
    microCheck: 'Is the field just outside a real solenoid exactly zero?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.magnetic-materials',
    subject: 'physics',
    canonicalIdea: 'Materials respond to a magnetic field weakly against it, weakly with it, or strongly with it and stay that way.',
    concreteAnchor: 'a magnet against a paperclip, a piece of aluminium, and a lump of copper',
    plainExplanation:
      'A magnet grabs a paperclip, ignores a piece of aluminium almost entirely, and is very slightly '
      + 'pushed away by copper. Three different behaviours. Most materials respond either very weakly '
      + 'with the field or very weakly against it, so weakly that you never notice. A few — iron, nickel, '
      + 'cobalt — respond enormously, because their atoms line up in large regions that grow when a field '
      + 'is applied and can stay lined up after it is removed. That staying-put is what makes a permanent '
      + 'magnet possible, and heating one past a certain point destroys it.',
    antiAnalogy: {
      tempting: 'thinking all metals are magnetic',
      whyItFails:
        'aluminium and copper are metals and are not attracted. Strong magnetism belongs to a short list '
        + 'of materials, not to metals as a class.',
    },
    microCheck: 'A magnet ignores an aluminium can. Is aluminium a metal?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.magnetic-dipole',
    subject: 'physics',
    canonicalIdea: 'A current loop behaves as a small magnet, and the Earth behaves as an enormous one.',
    concreteAnchor: 'a compass needle pointing north',
    plainExplanation:
      'A loop of current acts exactly like a tiny bar magnet, with a strength set by the current, the '
      + 'area enclosed and the number of turns. Put one in a field and it twists to line up, which is how '
      + 'electric motors work. The Earth is the same thing on a vast scale, its field generated by '
      + 'movement in the molten core. A compass needle lines up with that field — which is why the '
      + 'magnetic pole it points at sits in the ARCTIC and must therefore, magnetically speaking, behave '
      + 'as a south pole.',
    antiAnalogy: {
      tempting: 'assuming the Earth\'s magnetic poles sit exactly at the geographic ones',
      whyItFails:
        'they are hundreds of kilometres apart and they wander. Navigators correct for the difference, '
        + 'and treating them as identical makes that correction inexplicable.',
    },
    microCheck: 'Does a compass point at the geographic North Pole?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.magnetic-flux',
    subject: 'physics',
    canonicalIdea: 'Flux counts how much field passes through a surface, and turning the surface edge-on reduces it to nothing.',
    concreteAnchor: 'holding a hoop in falling rain, flat then edge-on',
    plainExplanation:
      'Hold a hoop out in falling rain. Held flat, plenty of rain passes through it. Tilt it and less '
      + 'gets through. Turn it fully edge-on and none does, though the rain has not changed at all. '
      + 'Magnetic flux works the same way: it counts how much field passes through a surface, and it '
      + 'depends on the field strength, the area, and the angle between them. It is not a thing that '
      + 'flows — nothing is moving — it is a measure of how much field crosses the surface you chose.',
    antiAnalogy: {
      tempting: 'picturing flux as something physically flowing through the loop',
      whyItFails:
        'nothing travels. The name is historical, and the flowing picture makes learners look for a rate '
        + 'or a speed where there is only a count.',
    },
    microCheck: 'You turn the loop edge-on to the field. What is the flux through it?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.faradays-law',
    subject: 'physics',
    canonicalIdea: 'A CHANGING amount of field through a loop drives a voltage; a steady one drives nothing.',
    concreteAnchor: 'a magnet pushed in and out of a coil connected to a meter',
    plainExplanation:
      'Push a magnet into a coil and the meter kicks. Hold it still inside and the meter reads zero, '
      + 'though the magnet is right there. Pull it out and the meter kicks the other way. What generates '
      + 'the voltage is CHANGE — the amount of field through the loop rising or falling — and the faster '
      + 'the change, the bigger the voltage. This one fact is the basis of every generator, every '
      + 'transformer, and the induction hob. Nothing is generated while things sit still, however strong '
      + 'the field.',
    antiAnalogy: {
      tempting: 'expecting a strong steady field to produce a voltage',
      whyItFails:
        'strength does nothing on its own — only change does. That is why a magnet resting inside a coil '
        + 'generates nothing at all, and why generators must keep turning.',
    },
    microCheck: 'The magnet sits still inside the coil. What does the meter read?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.lenzs-law',
    subject: 'physics',
    canonicalIdea: 'An induced current always flows the way that fights the change that produced it.',
    concreteAnchor: 'a magnet falling slowly down a copper pipe',
    plainExplanation:
      'Drop a magnet down a copper pipe and it drifts down far more slowly than gravity alone would '
      + 'allow, though copper is not magnetic. As the magnet falls, the field through each part of the '
      + 'pipe changes, currents are induced, and those currents flow in exactly the direction whose own '
      + 'field opposes the magnet\'s motion. Whatever you do, the induced effect pushes back against '
      + 'what you did. That is not a coincidence: if it helped instead, you would get energy from '
      + 'nothing, and conservation of energy forbids it.',
    antiAnalogy: {
      tempting: 'expecting the induced current to help the motion along',
      whyItFails:
        'that would create energy from nothing — a falling magnet would accelerate itself indefinitely. '
        + 'Opposition is what makes generators need driving and brakes work.',
    },
    microCheck: 'Why does a magnet fall slowly through a copper pipe?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.self-inductance',
    subject: 'physics',
    canonicalIdea: 'A coil resists changes in its own current, so current in it cannot start or stop instantly.',
    concreteAnchor: 'the spark when you unplug an electromagnet',
    plainExplanation:
      'Disconnect a big electromagnet and a spark jumps at the switch. The coil had a current through it '
      + 'and its own field; breaking the circuit tries to stop that current instantly, the field '
      + 'collapses fast, and the coil induces a large voltage of its own trying to keep the current '
      + 'going. That is self-inductance: a coil opposes any change to its own current, whether starting '
      + 'or stopping. Current in an inductor behaves rather like a heavy flywheel — hard to get going, '
      + 'and hard to stop.',
    antiAnalogy: {
      tempting: 'thinking an inductor simply resists current, like a resistor',
      whyItFails:
        'it resists CHANGE, not flow. A steady current passes through an ideal coil with no opposition '
        + 'whatever, which a resistor picture cannot account for.',
    },
    microCheck: 'A steady current already flows in a coil. Does the coil oppose it?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.mutual-inductance',
    subject: 'physics',
    canonicalIdea: 'A changing current in one coil induces a voltage in another, and a transformer trades voltage against current.',
    concreteAnchor: 'a phone charger, and the pylons outside',
    plainExplanation:
      'Two coils wound on the same iron core: a changing current in the first makes a changing field, '
      + 'and that changing field induces a voltage in the second. No wire connects them. The ratio of '
      + 'turns sets the ratio of voltages, so more turns on the second means a higher voltage out. But '
      + 'energy is not created — if the voltage goes up, the current available goes down by the same '
      + 'factor. That trade is why power is sent across country at enormous voltage and tiny current, '
      + 'because it is current that heats the cables and wastes energy.',
    antiAnalogy: {
      tempting: 'saying a transformer boosts the signal',
      whyItFails:
        'the curriculum\'s own note singles this out. Boost WHAT? Raising the voltage lowers the current '
        + 'in step, and the bare word invites the belief that a transformer creates power.',
    },
    microCheck: 'A transformer doubles the voltage. What happens to the current available?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.ac-basics',
    subject: 'physics',
    canonicalIdea: 'Mains voltage swings back and forth, and the quoted figure is the steady value that would heat things equally.',
    concreteAnchor: 'a 230-volt socket whose peak is actually about 325 volts',
    plainExplanation:
      'Mains voltage does not sit at 230 volts. It swings smoothly from positive to negative and back, '
      + 'fifty times a second, peaking around 325 volts each way. Its true average over a cycle is '
      + 'exactly zero, since it spends as long negative as positive — so the average would be a useless '
      + 'thing to quote. The quoted figure is instead the steady voltage that would deliver the same '
      + 'heating power, and it works out as the peak divided by about one and a half.',
    antiAnalogy: {
      tempting: 'describing the quoted figure as basically the average voltage',
      whyItFails:
        'the curriculum\'s own note singles this out. The true average is zero. The quoted value is an '
        + 'equivalent-heating figure, and calling it an average conflates two genuinely different '
        + 'quantities.',
    },
    microCheck: 'What is the true average of a mains voltage over a full cycle?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.lc-circuits',
    subject: 'physics',
    canonicalIdea: 'A coil and a capacitor together pass energy back and forth, oscillating at one particular rate.',
    concreteAnchor: 'tuning a radio to one station',
    plainExplanation:
      'Connect a charged capacitor to a coil and the energy sloshes between them: the capacitor '
      + 'discharges into the coil, building its field, and the coil then drives the current onward to '
      + 'charge the capacitor the other way. It is the electrical twin of a mass bouncing on a spring, '
      + 'and it happens at one particular rate set by the two components. Changing either changes the '
      + 'rate, which is precisely how tuning a radio works — you adjust a capacitor until the circuit\'s '
      + 'natural rate matches one station and ignores the rest.',
    antiAnalogy: {
      tempting: 'thinking the current simply stops when the capacitor empties',
      whyItFails:
        'the coil keeps it flowing, exactly as a mass sails past the resting point of a spring. That '
        + 'overshoot is what makes the oscillation rather than a single discharge.',
    },
    microCheck: 'The capacitor has fully discharged. Does the current stop there?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.maxwells-equations',
    subject: 'physics',
    canonicalIdea: 'Four statements tie electricity and magnetism into one thing, and a changing electric field acts like a current.',
    concreteAnchor: 'the gap between capacitor plates while it charges',
    plainExplanation:
      'Four rules cover the whole of electricity and magnetism: charges make electric fields, there are '
      + 'no isolated magnetic poles, a changing magnetic field makes an electric one, and a current '
      + 'makes a magnetic field. The last one was incomplete. While a capacitor charges, current flows '
      + 'in the wires but nothing crosses the gap — yet a magnetic field appears around the gap all the '
      + 'same. What produces it is the CHANGING electric field between the plates, which contributes '
      + 'exactly as a current would. Completing that rule predicted electromagnetic waves.',
    antiAnalogy: {
      tempting: 'saying a displacement current flows through the gap',
      whyItFails:
        'the curriculum\'s own note singles this out. Nothing crosses the gap. A changing electric field '
        + 'produces the same magnetic effect a current would, and the word invites the belief that '
        + 'charge is literally travelling.',
    },
    microCheck: 'A capacitor is charging. Does charge actually cross the gap?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.em.electromagnetic-waves',
    subject: 'physics',
    canonicalIdea: 'Changing electric and magnetic fields regenerate each other and travel through empty space at the speed of light.',
    concreteAnchor: 'sunlight crossing the vacuum between the Sun and Earth',
    plainExplanation:
      'Sunlight reaches us across a hundred and fifty million kilometres of vacuum. A changing electric '
      + 'field creates a magnetic one, which as it changes creates an electric one, and so on — each '
      + 'sustaining the other, needing nothing to travel through. They all move at the same speed, and '
      + 'differ only in how rapidly they oscillate: radio at the slow end, then microwaves, infrared, '
      + 'the narrow band our eyes detect, ultraviolet, X-rays and gamma rays. One phenomenon, one speed, '
      + 'an enormous range of rates.',
    antiAnalogy: {
      tempting: 'saying they are just like sound waves but faster',
      whyItFails:
        'the curriculum\'s own note singles this out. Sound needs a material and these need nothing — '
        + 'which is the single most important fact about them, and exactly what the comparison erases.',
    },
    microCheck: 'Sound cannot cross a vacuum. How does sunlight reach us?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.nature-of-light',
    subject: 'physics',
    canonicalIdea: 'Light is described by rays or by waves depending on the size of what it meets, and neither description is the truer one.',
    concreteAnchor: 'a shadow with a sharp edge, and the soft fringe at that edge under a magnifier',
    plainExplanation:
      'A torch beam crossing a room casts a shadow with an edge you can point to, so drawing light as '
      + 'straight lines works perfectly well. Put a magnifier on that same edge and it is not sharp at '
      + 'all: there is a narrow band of light and dark stripes. Nothing about the light changed between '
      + 'those two looks. What changed is the size of what we are comparing it to. When the openings and '
      + 'obstacles are large, straight lines predict everything. When they shrink to something near the '
      + 'spacing of the light\'s own ripples, the wave description is the one that matches.',
    antiAnalogy: {
      tempting: 'treating rays as the beginner\'s version and waves as what is really going on',
      whyItFails:
        'that turns a choice of scale into a ranking of truth. A physicist designing a telescope mirror '
        + 'uses rays, not because it is simpler but because at that size it is right.',
    },
    microCheck: 'A camera lens is drawn with straight lines, but the same light through a pinhole spreads. What decides which description you reach for?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.reflection',
    subject: 'physics',
    canonicalIdea: 'Both angles in reflection are measured from the line standing perpendicular to the surface, not from the surface itself.',
    concreteAnchor: 'aiming a torch at a mirror on the floor and watching where the spot lands on the wall',
    plainExplanation:
      'Point a torch at a mirror lying flat and the reflected spot lands somewhere on the wall. Tilt the '
      + 'torch closer to the mirror and the spot slides further away. The rule behind that is simple, but '
      + 'it is stated against a particular line: an imaginary line standing straight up out of the surface '
      + 'at the point where the light lands. Measure the incoming light\'s angle from that upright line, '
      + 'measure the outgoing one the same way, and the two are equal. Every reflection you have ever '
      + 'seen obeys it, including the scattered kind off paper, where the surface is rough enough that '
      + 'the upright line points a different way at every point.',
    antiAnalogy: {
      tempting: 'measuring both angles from the mirror surface, since that is the thing you can see',
      whyItFails:
        'the numbers still come out equal to each other, so the mistake hides — until the surface curves '
        + 'or a second surface joins it, and then every prediction is off by the amount you never noticed.',
    },
    microCheck: 'Light comes in almost grazing along a mirror. Is its angle of incidence large or small?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.mirrors',
    subject: 'physics',
    canonicalIdea: 'A curved mirror forms an image at a place set by the curvature and by how far the object sits, not on the glass itself.',
    concreteAnchor: 'the back of a spoon, and then the bowl of the same spoon',
    plainExplanation:
      'Hold the back of a spoon at arm\'s length and your face is small and the right way up. Turn it '
      + 'over to the bowl and, at that distance, your face is upside down. Same spoon, same face; the only '
      + 'difference is which way the surface bends. A curved mirror gathers the light leaving one point of '
      + 'you and sends it back to meet at some other point in space, and the position of that meeting '
      + 'place depends on how sharply the mirror curves and how far away you stand. Bring the spoon bowl '
      + 'very close and your face flips back upright and grows, because you have crossed inside the '
      + 'distance where the light can still be brought together in front.',
    antiAnalogy: {
      tempting: 'thinking of the image as painted on the mirror, the way a photograph sits on paper',
      whyItFails:
        'an image on the glass could not be caught on a card held in mid-air, and the one from a spoon '
        + 'bowl can be. Where the image sits is the thing being predicted; fixing it to the surface throws '
        + 'the question away.',
    },
    microCheck: 'The bowl of a spoon shows you upside down at arm\'s length and upright up close. What changed?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.refraction',
    subject: 'physics',
    canonicalIdea: 'Light changes direction at a boundary because its speed changes there, and the size of the bend follows from the two speeds.',
    concreteAnchor: 'a straw standing in a glass of water, looking broken at the surface',
    plainExplanation:
      'A straw in water looks snapped at the waterline. Light leaving the underwater part travels slower '
      + 'in water than in air, and at the surface it changes direction — bending away from the upright '
      + 'line as it speeds up on the way out. Your eye cannot know this happened, so it traces the light '
      + 'back along the straight line it finally arrived on, and places the lower straw where that line '
      + 'points. Going the other way, from air into water, the light slows and bends the other way, '
      + 'towards the upright. The steeper the difference in speeds between the two materials, the sharper '
      + 'the bend for the same incoming angle.',
    antiAnalogy: {
      tempting: 'picturing the light bouncing off the water surface like a ball off a kerb',
      whyItFails:
        'a bounce sends it back into the air it came from. Refraction is the light continuing on through '
        + 'the water in a new direction, which is a different event with a different answer.',
    },
    microCheck: 'Light passing from air into glass slows down. Does it bend towards the upright line or away from it?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.total-internal-reflection',
    subject: 'physics',
    canonicalIdea: 'Past a certain angle, light trying to leave a slower medium for a faster one cannot get out at all and is entirely reflected back.',
    concreteAnchor: 'the silvery mirror-like underside of a swimming pool surface, seen from below',
    plainExplanation:
      'Underwater, look up steeply and you see the sky. Look up at a shallow angle instead and the '
      + 'surface turns into a perfect mirror showing you the pool floor. As light inside the water meets '
      + 'the surface at ever flatter angles, the beam escaping into the air bends further and further '
      + 'over, until at one particular angle it would have to travel flat along the surface. Beyond that '
      + 'angle there is nowhere for it to go, and every bit of it comes back into the water. That is what '
      + 'keeps a signal inside an optical fibre for kilometres: it strikes the wall too shallowly, every '
      + 'time, to leave.',
    antiAnalogy: {
      tempting: 'reading it as the light being too weak or too tired to break through',
      whyItFails:
        'strength has nothing to do with it. A powerful laser at a shallow angle stays trapped and a '
        + 'feeble glow at a steep angle escapes, so the angle is the whole story and brightness is not '
        + 'part of it.',
    },
    microCheck: 'A fibre carries light for a kilometre without leaking. What is happening at its walls each time the light meets them?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.lenses',
    subject: 'physics',
    canonicalIdea: 'A thin lens brings the light from each point of an object back together at one place, and where that place is depends on the object distance.',
    concreteAnchor: 'a magnifying glass focusing sunlight to a dot, then held over print',
    plainExplanation:
      'A magnifying glass held in sunlight makes a tiny burning dot at one particular distance below it. '
      + 'That distance is the lens\'s own signature — the light from the Sun arrives so nearly parallel '
      + 'that the lens brings it to its tightest possible meeting point. Hold the same lens over a page '
      + 'instead and the light from each letter is spreading, not parallel, so it takes further to come '
      + 'back together and the image forms somewhere else entirely. Push the page in close and the letters '
      + 'grow and stay the right way up; pull it back past that signature distance and the image flips.',
    antiAnalogy: {
      tempting: 'expecting that covering half the lens will remove half the picture',
      whyItFails:
        'every point of the object sends light through the whole lens, so the uncovered half still '
        + 'receives light from all of it. The image goes dimmer, not half-missing — and a learner who '
        + 'predicts half a picture has the wrong idea of what a lens is doing.',
    },
    microCheck: 'You cover the top half of a camera lens with tape. What happens to the photograph?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.lens-power',
    subject: 'physics',
    canonicalIdea: 'Lenses placed together combine by adding their powers, and power is the reciprocal of focal length.',
    concreteAnchor: 'stacking two spectacle lenses and reading a line of text through both',
    plainExplanation:
      'Optometrists do not talk about focal lengths, they talk about power, and there is a practical '
      + 'reason. Stack two lenses against each other and the pair bends light more than either alone — '
      + 'and the amount is simply the two powers added. Power is what you get by turning the focal length '
      + 'upside down, measured in metres, so a strongly curved lens with a short focal length has a large '
      + 'power and a gentle one has a small power. A lens that spreads light instead of gathering it '
      + 'counts as a negative power, which is why a spreading lens stacked on a gathering one can cancel '
      + 'part of it.',
    antiAnalogy: {
      tempting: 'reaching for the resistor rule and adding the focal lengths, the way resistances in a row add',
      whyItFails:
        'the curriculum\'s own note flags this exact swap. It is the reciprocals that add here, so the '
        + 'resistor habit gives an answer that is not merely imprecise but points the wrong way for '
        + 'strong lenses.',
    },
    microCheck: 'Two lenses are held against each other. Which quantity do you add to describe the pair?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.optical-instruments',
    subject: 'physics',
    canonicalIdea: 'Instruments combine lenses so that a first one forms an image the second can work on, and what the eye finally receives is an angle, not a size.',
    concreteAnchor: 'a cheap toy telescope that magnifies hugely and shows nothing but a blur',
    plainExplanation:
      'A toy telescope boasting six hundred times magnification shows a fainter, wobblier Moon than a '
      + 'plain pair of binoculars. The reason is that magnification is only half of what an instrument '
      + 'does. The front lens gathers light and forms a small image inside the tube; the eyepiece then '
      + 'acts as a magnifier on that image, presenting it to the eye at a wider angle than the object '
      + 'itself subtends. Widening the angle is all magnification means. But the front lens can only '
      + 'gather the light that falls on it and can only separate detail down to a limit set by its own '
      + 'width, so magnifying beyond that spreads the same blur over more of your view.',
    antiAnalogy: {
      tempting: 'assuming a bigger magnification number is a better instrument',
      whyItFails:
        'magnification says how wide an angle the image arrives at, and says nothing about how much light '
        + 'was collected or how fine the detail in it is. Those come from the width of the front lens, '
        + 'which is why serious telescopes are described by their diameter.',
    },
    microCheck: 'Two telescopes magnify the same amount, but one has a much wider front lens. What does the wider one give you?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.dispersion',
    subject: 'physics',
    canonicalIdea: 'A prism separates white light because each colour is slowed by a slightly different amount and so bends by a different amount.',
    concreteAnchor: 'a band of colour thrown on the wall by the bevelled edge of a window pane',
    plainExplanation:
      'A prism does not decorate the light passing through it. White light already contains the whole '
      + 'spread of colours, laid on top of one another. Glass slows each colour by a slightly different '
      + 'amount — violet a little more than red — and since the amount of bending at each face follows '
      + 'from the slowing, the colours leave along slightly different paths and fan out. Send that fan '
      + 'into a second prism turned the other way and the colours fold back into white, which is the '
      + 'experiment that settled the matter. A rainbow is the same effect happening inside each of '
      + 'millions of raindrops at once.',
    antiAnalogy: {
      tempting: 'thinking the prism adds the colours to plain light, the way a stained window tints daylight',
      whyItFails:
        'a tint removes colours from what passes; the prism removes nothing and a second prism recombines '
        + 'the fan into white again. Adding colour cannot be undone by more glass.',
    },
    microCheck: 'A second prism turned the other way recombines the fan into white light. What does that tell you about where the colours came from?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.wave-optics',
    subject: 'physics',
    canonicalIdea: 'Treating every point of a wavefront as the source of a new little wave predicts where the wave goes next, including around edges.',
    concreteAnchor: 'ripples from a stone passing through a gap in a harbour wall',
    plainExplanation:
      'Ripples arriving at a gap in a harbour wall do not carry on as a strip the width of the gap. They '
      + 'spread into a fan on the far side. The way to see why is to stop thinking of the wave as a moving '
      + 'object and think of every point along its crest as a little source in its own right, each sending '
      + 'out a small circular ripple. Where those small ripples line up crest to crest, the next crest of '
      + 'the big wave appears; where they cancel, nothing does. In open water the sideways ones cancel and '
      + 'the wave looks like it is going straight. At the gap there is nothing left to cancel the outer '
      + 'ones, so the fan appears.',
    antiAnalogy: {
      tempting: 'expecting the wave picture to replace the ray picture as an upgrade',
      whyItFails:
        'the wave construction reproduces straight-line travel wherever the openings are wide, so rays '
        + 'are what it predicts, not what it overturns. Treating them as rivals hides that one contains '
        + 'the other.',
    },
    microCheck: 'Ripples fan out after a narrow gap but travel straight in open water. What cancels the sideways spreading in open water?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.youngs-experiment',
    subject: 'physics',
    canonicalIdea: 'Two narrow slits produce many bright and dark bands because light from the two paths arrives in step at some places and out of step at others.',
    concreteAnchor: 'two slits scratched in soot on glass, throwing a row of stripes on a wall',
    plainExplanation:
      'Light through two fine slits does not make two bright patches on the far wall. It makes a long row '
      + 'of evenly spaced stripes. Every point on that wall is reached by light from both slits, but along '
      + 'slightly different lengths of journey. Where the two journeys differ by a whole number of the '
      + 'light\'s own ripples, the two arrive in step and reinforce, giving a bright band. Where they '
      + 'differ by half a ripple, a crest meets a trough and they cancel, giving darkness. Move sideways '
      + 'along the wall and the difference in journey grows steadily, so bright and dark alternate.',
    antiAnalogy: {
      tempting: 'reading the dark bands as places where something blocked the light',
      whyItFails:
        'nothing blocks them — light from both slits is arriving there. Cover one slit and the dark bands '
        + 'fill in and brighten, which is impossible if darkness meant absence. It means arrival out of '
        + 'step.',
    },
    microCheck: 'You cover one of the two slits and a previously dark band becomes lit. What was making it dark before?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.diffraction',
    subject: 'physics',
    canonicalIdea: 'Waves spread on passing an obstacle or opening, and the spreading is noticeable only when the opening is near the size of the wave itself.',
    concreteAnchor: 'hearing someone around a corner long before you can see them',
    plainExplanation:
      'You can hear a conversation round a corner you cannot see round. Both sound and light are waves '
      + 'and both bend at the corner, but sound ripples are metres long, comparable to the doorway, while '
      + 'light ripples are smaller than a thousandth of a millimetre. Against a doorway that size, light\'s '
      + 'spreading is far too slight to notice, so it appears to travel in straight lines and casts a '
      + 'sharp shadow. Squeeze light through a slit narrow enough to approach its own scale and it fans '
      + 'out exactly as the sound did.',
    antiAnalogy: {
      tempting: 'explaining the bend as the wave glancing off the edge of the obstacle',
      whyItFails:
        'a glance off the edge would depend on what the edge is made of, and diffraction does not. The '
        + 'same fan appears past a razor blade, a card and a drop of ink, because the spreading belongs to '
        + 'the wave and not to the material.',
    },
    microCheck: 'Sound bends round a doorway and light does not, though both are waves. What is different about them?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.single-slit',
    subject: 'physics',
    canonicalIdea: 'One slit gives a wide central bright band with weaker bands beyond it, because light from different parts of the same slit cancels itself.',
    concreteAnchor: 'a bright streak with faint outriggers, seen through the gap between two fingers held close',
    plainExplanation:
      'A single narrow slit throws a broad bright band in the middle with much fainter bands to either '
      + 'side, fading quickly. The cancelling here happens between light coming from different points '
      + 'across the one slit. Consider light heading off to the side: the top part of the slit and the '
      + 'middle part have journeys differing by half a ripple, so they cancel each other, and so does '
      + 'every other such pair down the slit, leaving nothing. That is a dark band. The central bright '
      + 'band is broad because near straight ahead no pairing cancels, and it gets broader as the slit '
      + 'gets narrower.',
    antiAnalogy: {
      tempting: 'carrying over the two-slit pattern and treating it as the same thing with the same rule',
      whyItFails:
        'the curriculum\'s own note names this. The two-slit rule counts a whole ripple difference for '
        + 'brightness; here that same whole ripple difference is what produces a dark band, because it is '
        + 'the condition for the slit to cancel itself in pairs. The similar look of the formulas hides '
        + 'opposite meanings.',
    },
    microCheck: 'The central band from one slit is much wider than the stripes from two slits. Which cancellations produce the dark bands beside it?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.polarization',
    subject: 'physics',
    canonicalIdea: 'Light waves oscillate across their direction of travel, and polarization is which way across.',
    concreteAnchor: 'two pairs of polarised sunglasses, turned against each other until they go black',
    plainExplanation:
      'Hold two pairs of polarised sunglasses one behind the other and rotate one. At some angle almost '
      + 'nothing gets through. The light in an ordinary beam wobbles sideways to its travel, but in every '
      + 'sideways direction at once. A polarising filter passes only the wobble along one direction, so '
      + 'the light beyond it wobbles just one way. Send that at a second filter turned across the first '
      + 'and there is nothing left for it to pass. This works only because light wobbles across its '
      + 'travel; sound, which wobbles along its travel, has no such property and cannot be polarised at '
      + 'all.',
    antiAnalogy: {
      tempting: 'treating the filter as a dimmer that simply cuts the brightness in half',
      whyItFails:
        'a dimmer would let the second filter halve it again, never to black. What the first filter '
        + 'changes is the direction of the wobble, and it is that change, not the loss of brightness, '
        + 'that decides what the second one does.',
    },
    microCheck: 'Two polarising filters crossed against each other pass almost nothing. Why can a dimming explanation not account for that?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.opt.brewsters-law',
    subject: 'physics',
    canonicalIdea: 'Reflection off a surface at one particular angle comes out fully polarised, and a filter then passes an amount that depends on how far it is turned from that direction.',
    concreteAnchor: 'glare off a wet road vanishing when polarised sunglasses are worn upright',
    plainExplanation:
      'Glare from a wet road or a lake is largely polarised in one direction, horizontal, because of the '
      + 'angle at which it reflected off a flat surface. At one particular angle of reflection the '
      + 'reflected light is polarised completely, and that angle is set by the two materials meeting at '
      + 'the surface. Sunglasses cut the glare by passing only the upright wobble, and turning your head '
      + 'sideways brings the glare back. How much a filter passes falls off smoothly as it is turned away '
      + 'from the light\'s own direction of wobble — full when aligned, nothing when fully across, and '
      + 'part way in between.',
    antiAnalogy: {
      tempting: 'assuming that if two crossed filters block everything, a third filter can only block more',
      whyItFails:
        'slip a third filter at a slant between two crossed ones and light reappears. Each filter resets '
        + 'the direction of the wobble for whatever follows it, so the middle one hands the last filter '
        + 'something it can pass. Filters do not simply subtract.',
    },
    microCheck: 'A third filter placed at a slant between two crossed ones lets light through again. What has the middle filter done to the light?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.photoelectric-effect',
    subject: 'physics',
    canonicalIdea: 'Whether electrons come out of a metal at all depends on the colour of the light, not on how bright it is.',
    concreteAnchor: 'a dim blue lamp freeing electrons from a metal plate while a blazing red one frees none',
    plainExplanation:
      'Shine a very dim blue light on a clean metal plate and electrons come off immediately. Shine an '
      + 'enormously bright red light on the same plate and none come off at all, however long you wait. '
      + 'That was the result nobody could explain. If light delivered its energy smoothly, the bright red '
      + 'light would eventually pour in enough to free an electron. It never does. Each electron receives '
      + 'energy from light in one indivisible lump, and the size of that lump is set by the colour. Red '
      + 'lumps are too small to pay the price of escape no matter how many arrive; a single blue lump is '
      + 'large enough. Brightness only sets how many lumps arrive, and therefore how many electrons come '
      + 'out, never whether any can.',
    antiAnalogy: {
      tempting: 'reasoning that more light means more energy delivered, so the electrons should at least come out faster',
      whyItFails:
        'the curriculum\'s own note bans exactly this sentence. It is the prediction the wave picture makes '
        + 'and the experiment refutes: brighter red light produces not slower electrons but no electrons, '
        + 'and each electron\'s speed is set by colour alone.',
    },
    microCheck: 'A red lamp is made a hundred times brighter and still no electrons appear. What does that rule out?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.photons',
    subject: 'physics',
    canonicalIdea: 'Light arrives in indivisible lumps whose individual energy is fixed by frequency, while brightness counts how many lumps arrive.',
    concreteAnchor: 'a camera sensor in near-darkness registering separate specks rather than a faint even glow',
    plainExplanation:
      'Photograph something in near-darkness and the picture is not a faint even wash. It is a scatter of '
      + 'separate specks, each one a single arrival. Light is delivered in lumps, and two quite different '
      + 'things describe a beam. One is how much energy each lump carries, which is fixed entirely by the '
      + 'light\'s frequency — ultraviolet lumps are large, red lumps small, radio lumps tiny. The other is '
      + 'how many lumps per second, which is what we call brightness. A faint ultraviolet beam is few large '
      + 'lumps. A dazzling red beam is a torrent of small ones.',
    antiAnalogy: {
      tempting: 'saying brighter light means stronger, more energetic photons',
      whyItFails:
        'the curriculum\'s own note singles this out. It merges the two independent numbers into one, and '
        + 'then nothing about the photoelectric effect can be explained, because the whole result turns on '
        + 'their being separate.',
    },
    microCheck: 'You turn a red lamp up to full brightness. Which has changed, the size of each lump or the number of them?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.compton-effect',
    subject: 'physics',
    canonicalIdea: 'An X-ray bouncing off an electron comes away with less energy and a longer wavelength, exactly as a collision between two particles would give.',
    concreteAnchor: 'a cue ball striking a stationary ball and leaving slower and off its old line',
    plainExplanation:
      'Send X-rays into a block of graphite and some come out to the side with a longer wavelength than '
      + 'they went in with. The amount of lengthening depends only on the angle they came out at, not on '
      + 'the material and not on how intense the beam was. That is exactly the signature of a two-body '
      + 'collision. The X-ray behaves as a particle with momentum, strikes a loosely held electron, and '
      + 'hands over some of its energy and momentum. It leaves with less energy, and less energy for light '
      + 'means a longer wavelength. The electron recoils, and it can be detected doing so.',
    antiAnalogy: {
      tempting: 'describing it as the photon being swallowed by the electron and a new one being spat out',
      whyItFails:
        'the curriculum\'s own note names this as the one description to avoid. Absorption and re-emission '
        + 'would let the outgoing energy depend on the atom, and the measurement says it depends only on '
        + 'the scattering angle — which is what makes this a collision and the evidence it is.',
    },
    microCheck: 'The lengthening depends only on the angle, never on which material was used. Which picture does that support?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.de-broglie',
    subject: 'physics',
    canonicalIdea: 'Every moving object has a wavelength set by its momentum, and for electrons this was confirmed by experiment, not merely proposed.',
    concreteAnchor: 'electrons fired at a nickel crystal and coming off in the same ringed pattern X-rays give',
    plainExplanation:
      'De Broglie turned the photon question around and asked whether particles might behave as waves. '
      + 'He gave the wavelength: the faster and heavier the object, the shorter it is. For a thrown cricket ball the '
      + 'answer is so unimaginably small that no experiment could ever detect it, which is why the everyday '
      + 'world looks like solid objects. For an electron it comes out near the spacing between atoms in a '
      + 'crystal. Davisson and Germer fired electrons at a nickel crystal and got back the same ringed '
      + 'diffraction pattern X-rays give from the same crystal. Electrons diffract. The hypothesis is not '
      + 'a suggestion left hanging; it is a measured fact.',
    antiAnalogy: {
      tempting: 'leaving it as a lovely idea about matter waves and stopping there',
      whyItFails:
        'the curriculum\'s own note warns that omitting the Davisson and Germer confirmation is itself the '
        + 'error. Left as a proposal it sounds like speculation, and a learner has no reason to believe '
        + 'electrons really do this. They were seen to.',
    },
    microCheck: 'Electrons fired at a crystal produce the same rings X-rays do. What does that show about electrons?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.wave-particle-duality',
    subject: 'physics',
    canonicalIdea: 'A quantum object arrives whole at one place, but where it is likely to arrive is governed by something that spreads and interferes like a wave.',
    concreteAnchor: 'single electrons hitting a screen one at a time and slowly building an interference pattern',
    plainExplanation:
      'Fire electrons at a double slit slowly enough that only one is in the apparatus at a time. Each one '
      + 'lands as a single dot at a single place — never half a dot, never a smear. Leave it running and '
      + 'the accumulating dots form the striped interference pattern. So each electron arrives whole, but '
      + 'the pattern of where they arrive is the pattern a wave passing both slits would make. The wave '
      + 'is a description of where the electron is likely to be found, and it interferes with itself. '
      + 'Close one slit and the stripes vanish, even though each electron only ever landed in one spot.',
    antiAnalogy: {
      tempting: 'picturing the electron as a water wave that splits and goes through both slits',
      whyItFails:
        'the curriculum\'s own note allows this picture only alongside an immediate clarification, and '
        + 'without it the error is installed. What passes both slits is the likelihood, not the electron\'s '
        + 'substance; a split electron would land as two half-arrivals and none ever has.',
    },
    microCheck: 'Each electron lands as one dot, yet the dots build stripes. What is passing through both slits?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.bohr-model',
    subject: 'physics',
    canonicalIdea: 'Bohr\'s picture of fixed orbits with fixed energies works for hydrogen, and it is the last atom it works for.',
    concreteAnchor: 'hydrogen\'s spectral lines predicted to four figures, and helium\'s missed entirely by the same formula',
    plainExplanation:
      'Bohr proposed that the electron in hydrogen can only sit in certain particular orbits, each with a '
      + 'fixed energy, and that light is emitted when it drops from a higher one to a lower one. The '
      + 'energies of those levels come out of the model, and the spectral lines they predict match '
      + 'hydrogen\'s measured lines to several decimal places. It is one of the great successes in physics. '
      + 'Then apply the same formula to helium, which has two electrons, and it fails outright. The reason '
      + 'is that the two electrons push on each other, and the model has no way to account for anything but '
      + 'a single electron around a nucleus.',
    antiAnalogy: {
      tempting: 'saying the Bohr formula gives you the energy levels of atoms',
      whyItFails:
        'the curriculum\'s own note flags this omission specifically. Dropping the words "of hydrogen" turns '
        + 'a result about one atom into a claim about all of them, and a learner then expects it to work on '
        + 'every element in the table.',
    },
    microCheck: 'The same formula matches hydrogen beautifully and fails for helium. What does helium have that hydrogen does not?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.atomic-spectra',
    subject: 'physics',
    canonicalIdea: 'An atom emits and absorbs only at the frequencies matching gaps between its own energy levels, and those gaps come in several families.',
    concreteAnchor: 'the dark lines crossing the Sun\'s spectrum, each naming an element in its atmosphere',
    plainExplanation:
      'Spread sunlight into its colours carefully and it is crossed by narrow dark lines at particular '
      + 'places. Cool gas in the Sun\'s outer layers absorbs exactly the frequencies its atoms can use, and '
      + 'no others. Each element has its own set, fixed by the spacing of its own energy levels, and that '
      + 'is how helium was discovered in the Sun before it was found on Earth. Hydrogen alone produces '
      + 'several distinct families of lines, depending on which level the electron falls to: the group in '
      + 'visible light is one family, and there are others in ultraviolet and in infrared that the eye '
      + 'never sees.',
    antiAnalogy: {
      tempting: 'treating the visible group of lines as hydrogen\'s spectrum',
      whyItFails:
        'the curriculum\'s own note names this unqualified simplification. Those visible lines are one '
        + 'family among several, and a learner who takes them for the whole thing has no room in the '
        + 'picture for the ultraviolet and infrared families that come from the same atom.',
    },
    microCheck: 'Hydrogen produces lines you cannot see as well as ones you can. Where do the invisible ones come from?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.x-rays',
    subject: 'physics',
    canonicalIdea: 'X-rays are made by slamming fast electrons into metal, and their wavelength is short enough that a crystal\'s atomic planes act as a grating.',
    concreteAnchor: 'a chest radiograph, and the spot pattern a crystal throws in an X-ray beam',
    plainExplanation:
      'Accelerate electrons hard into a metal target and they are slammed to a stop, radiating their '
      + 'energy as light of very short wavelength. That is an X-ray tube. Because the wavelength is about '
      + 'the size of the spacing between atoms in a crystal, a crystal does to X-rays what a fine grating '
      + 'does to visible light: X-rays scattered from successive layers of atoms travel paths of slightly '
      + 'different length, and at particular angles those paths differ by a whole number of wavelengths and '
      + 'reinforce, giving sharp spots. Reading those spots is how the structures of salt, of metals, and '
      + 'eventually of DNA were determined.',
    antiAnalogy: {
      tempting: 'treating the angle at which the spots appear as an ordinary reflection angle',
      whyItFails:
        'the curriculum\'s own note bans this bridge. Reflection happens at every angle; these spots appear '
        + 'only at particular ones, because what selects them is the path difference between layers adding '
        + 'to a whole number of wavelengths, which is interference and not reflection.',
    },
    microCheck: 'A mirror reflects at every angle you present, but a crystal gives spots only at particular ones. What is selecting them?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.radioactivity',
    subject: 'physics',
    canonicalIdea: 'Unstable nuclei throw out one of three quite different things, and which one determines what stops it and what it changes into.',
    concreteAnchor: 'a source whose emission is stopped by paper, by aluminium foil, and by a slab of lead',
    plainExplanation:
      'Put a radioactive source behind a sheet of paper and one kind of emission is already gone. Behind a '
      + 'few millimetres of aluminium a second kind stops. The third needs centimetres of lead and even '
      + 'then is only weakened. They are three different objects. The first is a heavy, slow, doubly '
      + 'charged chunk of nucleus, which is why paper stops it and why it changes the element '
      + 'substantially. The second is a fast electron thrown out when a neutron turns into a proton, which '
      + 'shifts the element by one place. The third is not a particle of matter at all but very '
      + 'high-energy light, carrying away leftover energy and leaving the element unchanged.',
    antiAnalogy: {
      tempting: 'ranking them as weak, medium and strong versions of the same thing',
      whyItFails:
        'they differ in what they are, not in how much of it there is. One is matter with charge, one is an '
        + 'electron created in the decay, one is light — and only the first two change which element you '
        + 'are left with.',
    },
    microCheck: 'One emission leaves the element unchanged. Which of the three is it, and why does it change nothing?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.radioactive-decay',
    subject: 'physics',
    canonicalIdea: 'Each nucleus has a fixed chance of decaying in the next moment regardless of its age, and the half-life describes the population, not any individual.',
    concreteAnchor: 'a jar of dice, rolled repeatedly, with every six removed',
    plainExplanation:
      'Take a thousand dice, roll them all, and remove every six. Roll the rest and do it again. The number '
      + 'left falls by the same fraction each round, and after enough rounds half are gone — but no '
      + 'individual die was ageing towards its removal. On any roll each one had the same chance as on the '
      + 'first. Nuclei behave this way. A nucleus that has survived a billion years is no more likely to '
      + 'decay in the next second than a freshly made one. The half-life is simply how long it takes for '
      + 'half a large collection to have gone, and it says nothing about which ones or when.',
    antiAnalogy: {
      tempting: 'reading half-life as something like an average lifespan, the way we speak of people',
      whyItFails:
        'the curriculum\'s own note allows the comparison only with an immediate clarification. A person '
        + 'ages and their risk climbs; a nucleus does not age at all. The number describes a population\'s '
        + 'behaviour, and applied to one nucleus it means nothing.',
    },
    microCheck: 'A nucleus has survived a billion years already. Is it now closer to decaying than a new one?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.nuclear-reactions',
    subject: 'physics',
    canonicalIdea: 'Nuclear reactions balance charge and nucleon number, and the energy released or absorbed shows up as a change in total mass.',
    concreteAnchor: 'weighing everything before a reaction and after, and finding a shortfall',
    plainExplanation:
      'Two tallies must match across any nuclear reaction: the total electric charge, and the total '
      + 'number of nucleons. Those are bookkeeping rules and they never fail. The interesting thing shows '
      + 'up on the scales. For a reaction that gives out energy, the products '
      + 'together weigh slightly less than the ingredients did. The missing mass has not vanished — it is '
      + 'the energy that came out, and mass and energy are two accounts of the same thing. A reaction that '
      + 'needs energy poured in works the other way, and its products are slightly heavier.',
    antiAnalogy: {
      tempting: 'expecting mass to be conserved separately, the way it is in a chemical reaction',
      whyItFails:
        'in chemistry the energies involved are so small that the mass change is far too tiny to weigh, so '
        + 'mass appears to balance on its own. In a nuclear reaction the change is measurable, and treating '
        + 'mass as separately conserved makes the released energy come from nowhere.',
    },
    microCheck: 'The products of a reaction weigh less than what went in. Where did the missing mass go?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.binding-energy',
    subject: 'physics',
    canonicalIdea: 'A nucleus weighs less than its separated parts, and the shortfall is the energy you would have to supply to pull it apart.',
    concreteAnchor: 'weighing a helium nucleus against two free protons and two free neutrons',
    plainExplanation:
      'Weigh two protons and two neutrons separately, add the four numbers, then weigh a helium nucleus. '
      + 'The helium nucleus is lighter. The parts lost mass on being bound together, and the mass they lost '
      + 'left as energy. To take the nucleus apart again you would have to put that same energy back in, '
      + 'which is why it is called the binding energy. Doing this for every element and dividing by the '
      + 'number of nucleons gives a curve that rises steeply from hydrogen, peaks around iron, and falls '
      + 'slowly after. That single curve is why light nuclei give out energy when joined and heavy ones '
      + 'give out energy when split.',
    antiAnalogy: {
      tempting: 'imagining the binding energy as a store of energy sitting inside the nucleus, ready to be released',
      whyItFails:
        'it is the opposite sign. Binding energy is what the nucleus already gave up on forming, and what '
        + 'you must pay to undo it. A tightly bound nucleus is not a loaded spring; it is the one hardest '
        + 'to get anything out of, which is why iron neither fuses nor fissions usefully.',
    },
    microCheck: 'The peak of the curve is at iron. Why does that make iron the end of the line for energy release?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.nuclear-fission',
    subject: 'physics',
    canonicalIdea: 'A heavy nucleus splitting into two middling ones releases energy, and the spare neutrons it throws out can split further nuclei.',
    concreteAnchor: 'a reactor\'s control rods, which do nothing to the fuel but absorb neutrons',
    plainExplanation:
      'A heavy nucleus like uranium sits low on the binding-energy curve. Split it into two fragments '
      + 'nearer iron and those fragments are more tightly bound, so energy comes out — an enormous amount '
      + 'compared with any chemical process. The split also throws out two or three loose neutrons, and '
      + 'each of those can be absorbed by another heavy nucleus and split it in turn. That is a chain '
      + 'reaction. Control rods in a reactor do not touch the fuel; they soak up neutrons, so that on '
      + 'average exactly one from each split goes on to cause the next, holding the rate steady.',
    antiAnalogy: {
      tempting: 'picturing the nucleus as exploding, the way a bomb or a firework does',
      whyItFails:
        'an explosion is one event that scatters things outward. Fission is a nucleus coming apart into '
        + 'two named fragments plus loose neutrons, and it is those neutrons, not any blast, that make the '
        + 'process spread. Take the neutrons away and nothing propagates at all.',
    },
    microCheck: 'Control rods absorb neutrons and do nothing else. Why is that enough to control the reaction?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.nuclear-fusion',
    subject: 'physics',
    canonicalIdea: 'Joining light nuclei releases energy, but they must first be forced close enough to touch against their mutual electric repulsion.',
    concreteAnchor: 'the Sun\'s core at fifteen million degrees, and the difficulty of matching it on Earth',
    plainExplanation:
      'Two light nuclei joined together are more tightly bound than they were apart, so joining them '
      + 'releases energy — more per kilogram than fission does. The obstacle is getting there. Both nuclei '
      + 'carry positive charge and push each other away harder the closer they come, and the attraction '
      + 'that binds them only reaches across a distance smaller than a nucleus. So they must be hurled at '
      + 'each other hard enough to cross that barrier, which means temperatures of millions of degrees and '
      + 'a density that holds them together long enough to meet. The Sun manages it with its own weight. '
      + 'On Earth the containment, not the physics, is the hard part.',
    antiAnalogy: {
      tempting: 'thinking of the Sun as burning, the way a fire burns fuel',
      whyItFails:
        'burning is chemistry between electrons and it would have consumed the Sun in a few thousand years. '
        + 'What the Sun does happens in the nuclei, releases millions of times more per reaction, and is '
        + 'the reason it has lasted billions of years instead.',
    },
    microCheck: 'Fusion releases more energy per kilogram than fission, yet fission reactors exist and fusion ones do not. What is in the way?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.nuclear-models',
    subject: 'physics',
    canonicalIdea: 'Nucleons fill quantised shells much as electrons do, and nuclei with a full shell are unusually stable.',
    concreteAnchor: 'lead and tin having far more stable forms than their neighbours in the table',
    plainExplanation:
      'Certain nucleon counts — two, eight, twenty, twenty-eight, fifty, eighty-two — show up again and '
      + 'again as unusually stable. Nuclei with those numbers of protons or neutrons are bound more '
      + 'tightly than their neighbours, are more abundant, and resist decay. The shell model explains this '
      + 'by treating each nucleon as occupying one of a set of allowed energy levels within the nucleus, '
      + 'filling them from the bottom up. A nucleus that exactly fills a shell has no easy way to '
      + 'rearrange, and that closure is the stability. Tin, with fifty protons, has more stable forms than '
      + 'any other element.',
    antiAnalogy: {
      tempting: 'assuming the nuclear shells are the same shells the electrons occupy, just smaller',
      whyItFails:
        'they are a separate set of levels, filled by different particles, held by a different force, and '
        + 'their special numbers are not the ones that make a noble gas. Sharing the word "shell" is a '
        + 'borrowed description, not a shared structure.',
    },
    microCheck: 'Tin has fifty protons and unusually many stable forms. What does the model say fifty has done?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.energy-bands',
    subject: 'physics',
    canonicalIdea: 'In a solid the atoms\' separate energy levels broaden into bands, and between bands lies a range of energies no electron is permitted to have.',
    concreteAnchor: 'one atom\'s sharp spectral lines becoming a crystal\'s broad absorption bands',
    plainExplanation:
      'A single atom has sharp, separated energy levels. Bring a huge number of atoms together into a '
      + 'crystal and each level splits into an enormous number of very slightly different ones, so closely '
      + 'packed that they form a continuous band of allowed energies. Between one band and the next there '
      + 'is a stretch with no allowed levels at all. An electron in the solid can have an energy anywhere '
      + 'inside a band, and cannot have one in the gap — not because none happens to be there, but because '
      + 'the crystal\'s structure provides no state at that energy for it to occupy.',
    antiAnalogy: {
      tempting: 'reading the gap as an energy range where electrons simply happen not to be at the moment',
      whyItFails:
        'the curriculum\'s own note requires the gap to be described as structurally forbidden and never as '
        + 'merely unoccupied. An empty-by-chance gap could be filled by adding energy or electrons, and '
        + 'then nothing distinguishes an insulator from a conductor.',
    },
    microCheck: 'You add electrons to a crystal. Can any of them end up at an energy inside the gap?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.semiconductor-classification',
    subject: 'physics',
    canonicalIdea: 'What sorts conductors from insulators from semiconductors is the size of the forbidden gap and whether the upper band is partly filled.',
    concreteAnchor: 'copper wire, a glass rod, and a silicon chip at the same room temperature',
    plainExplanation:
      'In a metal the highest occupied band is only partly filled, so there are empty allowed states '
      + 'immediately above the occupied ones and the slightest push sets electrons moving. That is why '
      + 'copper conducts. In an insulator the lower band is completely full, the next one is empty, and the '
      + 'gap between them is far too wide for room temperature to lift anything across. In a semiconductor '
      + 'the arrangement is the insulator\'s, but the gap is small enough that ordinary warmth pushes a '
      + 'modest number of electrons up into the empty band. The difference between glass and silicon is not '
      + 'the structure; it is the width of the gap.',
    antiAnalogy: {
      tempting: 'treating a semiconductor as simply a material with a resistance halfway between the other two',
      whyItFails:
        'a middling resistance would be a metal with more obstruction, and it would conduct less as it '
        + 'warms. A semiconductor conducts more as it warms, because warmth is what puts carriers in the '
        + 'upper band at all. The behaviour, not the value, is what separates them.',
    },
    microCheck: 'Heating a copper wire makes it conduct worse; heating silicon makes it conduct better. What does that tell you about where silicon\'s carriers come from?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.intrinsic-semiconductors',
    subject: 'physics',
    canonicalIdea: 'In pure silicon, warmth lifts electrons across the gap in pairs, leaving behind vacancies that themselves carry current.',
    concreteAnchor: 'a nearly full car park where the movement you notice is the empty space shifting along the row',
    plainExplanation:
      'In pure silicon, thermal energy occasionally lifts an electron across the gap into the empty band. '
      + 'It leaves behind a vacancy in the band it came from, and the two are always created together. '
      + 'The freed electron carries current in the upper band. The vacancy also lets current flow, because '
      + 'neighbouring electrons can shuffle into it one after another — and it is far easier to track the '
      + 'moving empty place than to track the thousands of electrons taking turns to fill it. In a nearly '
      + 'full car park, what appears to move down the row is the gap. Heat the silicon and more pairs '
      + 'appear, so it conducts better as it gets hotter.',
    antiAnalogy: {
      tempting: 'taking the vacancy to be a positron living inside the semiconductor',
      whyItFails:
        'the curriculum\'s own note names this exact conflation. A positron is a genuine particle that '
        + 'exists on its own; the vacancy exists only as the absence in a crowd of electrons and has no '
        + 'meaning outside the crystal. Removing the crystal removes it.',
    },
    microCheck: 'Warming pure silicon creates carriers in pairs. What is the second member of each pair?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.extrinsic-semiconductors',
    subject: 'physics',
    canonicalIdea: 'Adding a trace of a different element gives silicon a large surplus of one kind of carrier while leaving the material electrically neutral.',
    concreteAnchor: 'one impurity atom in ten million transforming silicon\'s conductivity',
    plainExplanation:
      'Silicon\'s neighbours in the table have one electron more or one fewer in their outer shell. Replace '
      + 'a few silicon atoms with an element that has one more, and each brings an electron that no bond '
      + 'needs, sitting just below the empty band and easily freed. The material then conducts mainly by '
      + 'electrons. Use an element with one fewer instead, and each leaves a bond short, easily filled by '
      + 'a neighbouring electron, so conduction is mainly by the moving vacancies. Either way the added '
      + 'atoms are neutral atoms — they brought their own nuclear charge with them — so the material as a '
      + 'whole carries no net charge at all.',
    antiAnalogy: {
      tempting: 'assuming the type with surplus electrons must be negatively charged overall',
      whyItFails:
        'each added atom brought a matching positive nucleus along with its extra electron. The surplus is '
        + 'in which carrier moves the current, not in the total charge, and a slab of it will not attract '
        + 'a suspended ball any more than pure silicon would.',
    },
    microCheck: 'A doped slab has far more free electrons than pure silicon. Why does it not carry a net negative charge?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.pn-junction',
    subject: 'physics',
    canonicalIdea: 'Where the two doped types meet, carriers spread across, cancel each other near the boundary, and leave behind fixed charges that stop any further net flow.',
    concreteAnchor: 'a junction that has a built-in voltage across it and still cannot light the smallest lamp',
    plainExplanation:
      'Join the two doped types and, right at the boundary, surplus carriers from each side wander into '
      + 'the other and are cancelled. That leaves a thin zone near the junction stripped of carriers, and '
      + 'the impurity atoms left there are no longer balanced — one side is left positive, the other '
      + 'negative, and they cannot move because they are locked into the crystal. Those fixed charges set '
      + 'up an electric field across the zone that pushes back on any further carriers trying to cross. '
      + 'Very quickly the pushing back exactly balances the wandering across, and the net flow stops.',
    antiAnalogy: {
      tempting: 'treating the built-in voltage as a battery you could draw current from',
      whyItFails:
        'it exists precisely because the flow has stopped, and connecting a wire round the outside adds two '
        + 'more junctions whose own built-in voltages cancel it exactly. A device that produced current '
        + 'from nothing but its own equilibrium would be a perpetual motion machine.',
    },
    microCheck: 'There is a real voltage across the junction. Why can you not connect a wire and light a lamp with it?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.mod.diode-rectification',
    subject: 'physics',
    canonicalIdea: 'Pushing carriers towards the junction thins the barrier zone and current flows; pulling them away widens it and almost nothing gets through.',
    concreteAnchor: 'a mains adapter turning alternating supply into the steady one a phone needs',
    plainExplanation:
      'Connect a battery so that it drives carriers on each side towards the junction, and they crowd into '
      + 'the stripped zone, narrowing it and weakening the field that was holding them back. Past a modest '
      + 'threshold voltage the barrier is low enough that current flows freely. Reverse the battery and it '
      + 'pulls carriers away from the junction instead, widening the stripped zone and strengthening the '
      + 'field, so essentially nothing crosses. That asymmetry is the whole of rectification: feed a supply '
      + 'that alternates direction and only the halves of the cycle pushing the right way get through.',
    antiAnalogy: {
      tempting: 'thinking of it as a one-way valve that passes anything at all in the forward direction',
      whyItFails:
        'below the threshold voltage a forward-connected diode carries almost nothing, because the built-in '
        + 'barrier has not yet been overcome. A valve model predicts current for the smallest forward push '
        + 'and there is none, which is exactly what catches learners out in a real circuit.',
    },
    microCheck: 'A small forward voltage produces almost no current through a diode. What has not yet been overcome?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.wave-function',
    subject: 'physics',
    canonicalIdea: 'The wave function is not the particle; squaring it gives the chance of finding the particle in each place.',
    concreteAnchor: 'electrons arriving one at a time as separate dots that slowly build a striped pattern',
    plainExplanation:
      'Quantum mechanics describes a particle with a mathematical object spread over space. That object '
      + 'is not the particle smeared out. Whenever you look, you find a whole particle at one place, never '
      + 'a fraction of one anywhere. What the object gives you, once squared, is the chance of finding it '
      + 'at each place — large where it is likely, small where it is not, zero where it never turns up. '
      + 'The spread is a spread of likelihood. That is why a single electron lands as one dot and a '
      + 'thousand of them build a pattern: each dot is a whole arrival, and the pattern is the likelihood '
      + 'made visible.',
    antiAnalogy: {
      tempting: 'picturing it as the electron itself spread out like a cloud of substance',
      whyItFails:
        'a spread-out substance would be detected in pieces — a bit of charge here, a bit there. Every '
        + 'detector ever built finds the whole electron at one spot. What is spread is where it might be '
        + 'found, not what it is made of.',
    },
    microCheck: 'A detector never registers half an electron, yet the description is spread across the screen. What is spread?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.schrodinger-equation',
    subject: 'physics',
    canonicalIdea: 'The Schrodinger equation says how the spread of likelihood changes with time, and it never produces a path.',
    concreteAnchor: 'a weather forecast that gives the chance of rain over a region, hour by hour',
    plainExplanation:
      'The equation takes the current description of a particle and tells you what it becomes an instant '
      + 'later. It is completely deterministic in that sense: given the description now, the description '
      + 'later is fixed. What it never hands you is a trajectory. Ask it where the electron is at three '
      + 'o\'clock and it does not answer, because the thing it evolves is the spread of likelihood, not a '
      + 'position. A forecast can tell you exactly how the chance of rain over a county shifts hour by '
      + 'hour without ever naming the raindrop that falls on your roof.',
    antiAnalogy: {
      tempting: 'treating it as the quantum version of Newton\'s law, handing back the particle\'s path',
      whyItFails:
        'the curriculum\'s own note bans this comparison. Newton\'s law outputs a position at each moment; '
        + 'this outputs a distribution. A learner expecting a path then reads every solution as a '
        + 'trajectory and cannot make sense of interference, tunnelling, or measurement.',
    },
    microCheck: 'The equation is fully deterministic and yet cannot tell you where the electron will be found. What is it determining?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.uncertainty-principle',
    subject: 'physics',
    canonicalIdea: 'A particle sharply located in position simply does not possess a sharp momentum, whatever instrument you bring.',
    concreteAnchor: 'a single very short click, which has no definite pitch however carefully you listen to it',
    plainExplanation:
      'A long, steady musical note has a definite pitch. Shorten it and the pitch blurs. Shorten it to a '
      + 'single click and asking for its pitch stops making sense — a click is built from a whole spread '
      + 'of frequencies at once, and that is a fact about what a click is, not about the ear listening. '
      + 'Position and momentum stand in exactly this relation. A description confined to a narrow region '
      + 'is necessarily built from a wide spread of momenta. Squeeze the position and the momentum spread '
      + 'grows, with a floor below which the product cannot go.',
    antiAnalogy: {
      tempting: 'explaining it as the measurement knocking the particle and spoiling the other quantity',
      whyItFails:
        'that says the particle had both all along and clumsy apparatus hid one. Then a gentler instrument '
        + 'would do better, and none does. The limit is on what a particle can simultaneously have, and it '
        + 'is there before anyone measures anything.',
    },
    microCheck: 'A gentler, more careful instrument does not improve the trade-off at all. What does that rule out?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.operators',
    subject: 'physics',
    canonicalIdea: 'An observable is an instruction acting on the description, and two such instructions applied in opposite orders need not agree.',
    concreteAnchor: 'turning a book face-down then rotating it, versus rotating it then turning it face-down',
    plainExplanation:
      'Lay a book flat, turn it face-down, then rotate it a quarter turn. Start again and do the rotation '
      + 'first. The book ends in two different orientations. The operations did not commute, and that is a '
      + 'fact about the operations, not about the book. In quantum mechanics each measurable quantity is '
      + 'an instruction of this kind, acting on the particle\'s description, and the numbers a measurement '
      + 'can return are the special values that instruction picks out. Position and momentum are two such '
      + 'instructions, and applying them in the two orders does not give the same result. That mismatch is '
      + 'the whole source of the uncertainty relation between them.',
    antiAnalogy: {
      tempting: 'reading them as ordinary functions of position and momentum, to be multiplied like numbers',
      whyItFails:
        'the curriculum\'s own note names this. Ordinary numbers multiply in either order; these do not, '
        + 'and the size of the discrepancy is exactly what the theory is built on. Treating them as scalars '
        + 'quietly deletes the structure.',
    },
    microCheck: 'Two operations applied in opposite orders give different results. What does that difference produce here?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.particle-in-box',
    subject: 'physics',
    canonicalIdea: 'Confining a particle forces its description to fit the box, which allows only certain energies and forbids sitting still.',
    concreteAnchor: 'a guitar string clamped at both ends, which sounds only its own note and its overtones',
    plainExplanation:
      'A guitar string held at both ends cannot vibrate at just any frequency. Only the shapes that fit '
      + 'the length — with the ends held still — survive, so the string sounds a particular note and its '
      + 'overtones and nothing between. A particle trapped between two walls is under the same constraint: '
      + 'its description must fall to nothing at the walls, so only certain shapes fit, and each shape '
      + 'carries a particular energy. The lowest allowed one is not zero. A description that is flat and '
      + 'motionless everywhere is not a shape that fits, so the trapped particle can never be brought '
      + 'fully to rest, and squeezing the box raises that floor.',
    antiAnalogy: {
      tempting: 'expecting the lowest state to be the particle sitting still at the bottom',
      whyItFails:
        'sitting still would mean a definite position and a definite momentum at once, which the box\'s own '
        + 'confinement forbids. The leftover energy is not a flaw in the model; a narrower box raises it, '
        + 'which is measurable.',
    },
    microCheck: 'Making the box narrower raises the lowest possible energy. Why can it not simply be zero?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.harmonic-oscillator-qm',
    subject: 'physics',
    canonicalIdea: 'A particle in a smooth valley has evenly spaced allowed energies, and the lowest is above the bottom of the valley.',
    concreteAnchor: 'a crystal still trembling at temperatures a hair above absolute zero',
    plainExplanation:
      'Almost every well behaves like a smooth valley near its bottom, which is why this one model turns '
      + 'up everywhere from vibrating molecules to crystal lattices to fields. Solving it gives allowed '
      + 'energies spaced evenly apart, each rung the same distance above the last, so a molecule absorbs '
      + 'and emits at one characteristic frequency and its multiples. And the lowest rung sits above the '
      + 'valley floor rather than on it. Cool a crystal as close to absolute zero as anyone can reach and '
      + 'its atoms are still moving, because that residual motion is the lowest state the confinement '
      + 'allows, not thermal energy that could be removed.',
    antiAnalogy: {
      tempting: 'assuming the rungs crowd together higher up, the way an atom\'s levels do',
      whyItFails:
        'hydrogen\'s levels bunch towards a ceiling because its well flares out and eventually releases the '
        + 'electron. A valley of this shape has walls that keep steepening, so the rungs stay evenly '
        + 'spaced and there is no ceiling to bunch towards.',
    },
    microCheck: 'A crystal cooled almost to absolute zero is still vibrating. Which rung is it on?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.hydrogen-atom-qm',
    subject: 'physics',
    canonicalIdea: 'Solving hydrogen properly replaces orbits with shapes of likelihood, labelled by four numbers.',
    concreteAnchor: 'the dumb-bell shaped regions drawn in chemistry textbooks',
    plainExplanation:
      'The full quantum treatment of hydrogen recovers Bohr\'s energies and then adds what Bohr could not. '
      + 'Instead of an orbit there is a three-dimensional shape of likelihood: spherical for the lowest '
      + 'state, dumb-bell shaped and cloverleaf shaped for others. Four numbers label a state — one fixing '
      + 'the energy, one the amount of angular momentum, one its direction, and one the electron\'s own '
      + 'intrinsic spin. Those four are what the periodic table\'s structure ultimately rests on. The '
      + 'electron is not travelling round a track inside those shapes; the shape is where it is likely to '
      + 'be found.',
    antiAnalogy: {
      tempting: 'reading the shapes as the paths the electron runs along, like a planet on a stranger orbit',
      whyItFails:
        'the lowest state is spherical with the largest likelihood at the very centre, which no orbit could '
        + 'produce, and it carries no angular momentum at all. An orbiting electron would also radiate '
        + 'continuously and spiral in, which is the failure the quantum treatment exists to fix.',
    },
    microCheck: 'The lowest hydrogen state has no angular momentum at all. Why is that impossible for an orbit?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.spin',
    subject: 'physics',
    canonicalIdea: 'Spin is an intrinsic property with only two possible outcomes along any direction you choose to measure.',
    concreteAnchor: 'a beam of silver atoms splitting into exactly two spots on a screen, never a smear',
    plainExplanation:
      'Send silver atoms through a suitably shaped magnetic field and the beam splits into exactly two '
      + 'spots. Not a smear, not a spread — two. Measure along a different direction and you again get '
      + 'exactly two, along that new direction. Electrons carry an intrinsic magnetic property with this '
      + 'strictly two-valued character. It is not something the electron is doing; it is something the '
      + 'electron is, present in the very same amount for every electron in the universe, and it cannot be '
      + 'sped up, slowed down or stopped.',
    antiAnalogy: {
      tempting: 'imagining the electron as a tiny ball spinning on its axis',
      whyItFails:
        'the curriculum\'s own note bans this picture. A spinning ball can point any way and spin at any '
        + 'rate, so it would give a continuous smear on the screen rather than two spots; and its rate '
        + 'could be changed, while this cannot be changed at all.',
    },
    microCheck: 'Measured along any direction you choose, you get exactly two outcomes. What does a spinning ball predict instead?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.pauli-exclusion',
    subject: 'physics',
    canonicalIdea: 'No two identical fermions may occupy the same quantum state, while bosons may pile into one without limit.',
    concreteAnchor: 'a white dwarf star held up against gravity by nothing but this rule',
    plainExplanation:
      'Matter particles — electrons, protons, neutrons, the family called fermions — obey a strict rule: '
      + 'no two identical ones may share a quantum state. That is why electrons stack into successive '
      + 'shells around a nucleus instead of all dropping to the lowest one, and therefore why chemistry '
      + 'and the periodic table exist at all. It is also what holds a burnt-out star up when its fuel is '
      + 'gone: the electrons have nowhere left to go. The other family, bosons — photons among them — has '
      + 'no such restriction and will happily crowd into one state, which is what makes a laser possible.',
    antiAnalogy: {
      tempting: 'stating it flatly as particles being unable to share a state',
      whyItFails:
        'the curriculum\'s own note requires the fermion qualifier every time. Left off, the rule appears '
        + 'to apply to everything, and a laser — enormous numbers of photons in one identical state — '
        + 'becomes inexplicable.',
    },
    microCheck: 'A laser puts vast numbers of photons in the same state. Why does the exclusion rule not forbid it?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.quantum-tunneling',
    subject: 'physics',
    canonicalIdea: 'A particle can be found beyond a barrier it never had the energy to climb, because its description does not stop dead at the wall.',
    concreteAnchor: 'alpha particles escaping a nucleus that, by energy alone, should hold them forever',
    plainExplanation:
      'Classically a ball without enough energy to reach the top of a hill will never be found on the far '
      + 'side. Quantum mechanically the particle\'s description does not fall abruptly to nothing at the '
      + 'barrier — it decays away inside it, and if the barrier is thin enough some is still left on the '
      + 'far side. That leftover means a real chance of finding the whole particle there. Thicken the '
      + 'barrier or raise it and the chance falls away extremely steeply, which is why the effect is '
      + 'invisible for footballs and decisive for alpha decay, where it sets half-lives spanning many '
      + 'orders of magnitude.',
    antiAnalogy: {
      tempting: 'describing it as the particle borrowing energy briefly to get over the top',
      whyItFails:
        'nothing is borrowed and nothing is repaid; the particle arrives on the far side with exactly the '
        + 'energy it started with, never more. It was never over the top. Its description simply had not '
        + 'reached zero by the time the barrier ended.',
    },
    microCheck: 'The particle emerges with exactly the energy it began with. What does that rule out about how it crossed?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.perturbation-theory',
    subject: 'physics',
    canonicalIdea: 'When a solvable system is disturbed slightly, the corrections can be built up in order of smallness — provided the disturbance really is small compared with the gaps it must bridge.',
    concreteAnchor: 'a spectral line splitting into several when a modest magnetic field is switched on',
    plainExplanation:
      'Very few quantum systems can be solved exactly. The working strategy is to start from one that can '
      + 'be, then add the real complication as a small correction and compute its effect in successive '
      + 'layers: a first correction, then a smaller correction to that, and so on. Switching on a modest '
      + 'magnetic field splits an atom\'s single spectral line into several, and the size of that splitting '
      + 'is exactly what a first-order calculation predicts. The method works because the disturbance is '
      + 'small compared with the spacing between the original energy levels. When two of those levels sit '
      + 'very close together, the same series stops behaving and a different treatment is needed.',
    antiAnalogy: {
      tempting: 'treating it as always available, since any disturbance can be called small',
      whyItFails:
        'small has a meaning here: small relative to the energy gaps. A weak disturbance acting between '
        + 'two nearly identical levels is not small in the sense that matters, and the corrections grow '
        + 'instead of shrinking. Judging smallness by the disturbance alone is what leads people astray.',
    },
    microCheck: 'Two energy levels sit almost on top of each other. Why does a weak disturbance stop counting as small?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.selection-rules',
    subject: 'physics',
    canonicalIdea: 'Only transitions that respect the relevant conservation laws occur at appreciable rates, and the rest are suppressed rather than impossible.',
    concreteAnchor: 'the forbidden green line of oxygen, seen in aurorae and almost nowhere else',
    plainExplanation:
      'An excited atom cannot drop to just any lower level. The photon it emits carries away angular '
      + 'momentum, so the two levels involved must differ in a way that lets the books balance; the '
      + 'transitions that satisfy this happen readily, and the others are enormously slower. Slower, '
      + 'though, is not never. Oxygen has a transition of this suppressed kind that takes on the order of '
      + 'a second — an eternity by atomic standards. On Earth an atom is jostled by collisions long before '
      + 'then, so we never see it. High in the thin upper atmosphere nothing interrupts, and it produces '
      + 'the green glow of the aurora.',
    antiAnalogy: {
      tempting: 'reading forbidden as meaning the transition cannot happen',
      whyItFails:
        'the aurora is that transition. Forbidden is a statement about rate, not possibility, and reading '
        + 'it as a prohibition leaves the most familiar sight in the night sky unexplained.',
    },
    microCheck: 'The aurora\'s green light comes from a transition called forbidden. What does forbidden actually mean here?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.variational-method',
    subject: 'physics',
    canonicalIdea: 'Any guessed state gives an energy no lower than the true ground state, so lowering the guess always improves the bound.',
    concreteAnchor: 'guessing the helium ground state and getting within a fraction of a percent',
    plainExplanation:
      'The ground state is the state of lowest energy, so the average energy of any trial state you care '
      + 'to write down cannot come out below it. That single fact turns guessing into a method. Write a '
      + 'family of trial states with an adjustable knob, compute the average energy for each setting, and '
      + 'turn the knob until it is as low as it will go. Whatever number you reach is a genuine upper '
      + 'bound on the true ground energy, and a better family gives a lower one. Helium, which cannot be '
      + 'solved exactly, yields to a simple trial family within a fraction of a percent.',
    antiAnalogy: {
      tempting: 'taking the number you reach as the ground-state energy itself',
      whyItFails:
        'it is a ceiling, and the truth sits at or below it. Two different trial families give two '
        + 'different answers, both valid ceilings, and the lower one is the better bound — which makes no '
        + 'sense if either were the answer.',
    },
    microCheck: 'Two different trial families give two different numbers and both are legitimate. Which is the better result, and why?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.wkb-approximation',
    subject: 'physics',
    canonicalIdea: 'When the surroundings change slowly compared with the particle\'s own wavelength, the description can be built by accumulating the local behaviour step by step across the region.',
    concreteAnchor: 'alpha decay half-lives spanning twenty orders of magnitude, predicted from one barrier shape',
    plainExplanation:
      'The exactly solvable barrier problems all have square edges, and real barriers do not. The '
      + 'semiclassical method handles a smoothly varying one by treating each thin slice as locally simple '
      + 'and accumulating across the whole region — valid whenever the surroundings change little over one '
      + 'wavelength. In a region the particle could classically reach, this accumulates as an oscillation. '
      + 'In a forbidden region it accumulates as a steady dying away, and the total dying across the '
      + 'barrier sets the chance of getting through. Applied to the barrier holding an alpha particle in a '
      + 'nucleus, it reproduces half-lives ranging over twenty orders of magnitude.',
    antiAnalogy: {
      tempting: 'carrying over the simple exponential tunnelling result as though it applied to any barrier',
      whyItFails:
        'the curriculum\'s own note flags this. That result assumes the barrier is one constant height '
        + 'throughout. A real barrier varies, and the accumulation across it has to be taken slice by '
        + 'slice — which is precisely what produces the enormous spread in decay rates.',
    },
    microCheck: 'One barrier shape gives decay rates spanning twenty orders of magnitude. What is being accumulated across it?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.identical-particles',
    subject: 'physics',
    canonicalIdea: 'Identical particles are not merely alike but interchangeable in principle, and swapping two of them must leave the description either unchanged or exactly reversed in sign.',
    concreteAnchor: 'two electrons that no experiment can tell apart, even in principle',
    plainExplanation:
      'Two electrons are not two similar objects with different serial numbers. Nothing whatever '
      + 'distinguishes them, so swapping which is which cannot change any prediction. That leaves only two '
      + 'possibilities for the description itself: it stays exactly as it was, or it flips sign — either '
      + 'way, squaring it gives the same likelihood. Particles of the first kind are bosons and can crowd '
      + 'into one state. Particles of the second kind are fermions, and the sign flip means the '
      + 'description vanishes identically when two are put in the same state, which is the exclusion '
      + 'principle appearing as a consequence rather than a separate rule.',
    antiAnalogy: {
      tempting: 'reading identical as meaning too similar to tell apart with present instruments',
      whyItFails:
        'a better instrument would then someday label them, and the interference between the swapped '
        + 'arrangements would vanish. It does not, and that interference is measurable. The '
        + 'indistinguishability is a fact about the particles, not about our equipment.',
    },
    microCheck: 'Swapping two fermions flips the sign of the description. What happens if they are put in the same state?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.angular-momentum-addition',
    subject: 'physics',
    canonicalIdea: 'Combining two angular momenta gives a whole ladder of possible totals, from their difference up to their sum in whole steps.',
    concreteAnchor: 'two electron spins combining into one arrangement that is silent and three that are not',
    plainExplanation:
      'Two sources of angular momentum in one system do not simply add to a single number. The possible '
      + 'totals run in whole steps from the difference of the two up to their sum, and every value in '
      + 'between is available. Two electron spins, each two-valued, therefore combine into a total of one '
      + 'or a total of zero — four arrangements in all, of which three belong to the total of one and a '
      + 'single one, the arrangement where they exactly oppose, belongs to zero. That split is why some '
      + 'molecular states are magnetically active and their partner is not, and why helium\'s spectrum has '
      + 'two families of lines.',
    antiAnalogy: {
      tempting: 'expecting the two amounts simply to add up to one number',
      whyItFails:
        'adding alone would give a single answer, and the experiment shows several. The directions are '
        + 'themselves quantised, so the two can be aligned, opposed, or in between only in the permitted '
        + 'steps — which is why a range of totals appears rather than one.',
    },
    microCheck: 'Two electron spins give four arrangements split into a group of three and a lone one. What distinguishes the lone one?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.scattering-theory-born-approximation',
    subject: 'physics',
    canonicalIdea: 'How much scatters in each direction reveals the shape of what did the scattering, and for weak scattering the relationship is direct.',
    concreteAnchor: 'Rutherford\'s alpha particles bouncing back and revealing a tiny hard nucleus',
    plainExplanation:
      'A scattering experiment never sees the target. It sees how many particles come off in each '
      + 'direction, and the shape of that distribution is what has to be turned back into a description of '
      + 'the target. When the scattering is weak — the incoming particle barely disturbed, most of it '
      + 'passing straight through — the relationship becomes direct: the amount scattered through each '
      + 'angle reflects one particular component of the target\'s spatial structure, with large angles '
      + 'reporting on fine detail and small angles on the coarse overall shape. That is why Rutherford\'s '
      + 'rare large deflections meant something small and hard rather than something diffuse.',
    antiAnalogy: {
      tempting: 'assuming the weak-scattering treatment applies to any collision',
      whyItFails:
        'it is built on the incoming particle being barely disturbed, so that it can be treated as having '
        + 'passed straight through. For slow particles or strong forces the particle is thoroughly '
        + 'redirected, may scatter more than once, and the simple correspondence between angle and '
        + 'structure breaks down.',
    },
    microCheck: 'Large-angle scattering reports on fine detail, small-angle on coarse shape. What did Rutherford\'s large angles tell him?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.s-matrix-basics',
    subject: 'physics',
    canonicalIdea: 'The scattering matrix relates what went in to what came out, without describing anything in between, and its conservation of probability constrains it tightly.',
    concreteAnchor: 'a particle collider, which records only the beams before and the debris after',
    plainExplanation:
      'A collider never observes the collision. It knows what was sent in and what emerged, and everything '
      + 'else is inference. The scattering matrix is built to match that: it maps the incoming '
      + 'arrangement onto the outgoing one and makes no claim about the interval between. Its central '
      + 'constraint is that nothing is lost — whatever went in must come out as something, with total '
      + 'probability one. That requirement alone is remarkably powerful. It forces a relationship between '
      + 'how much is scattered in total and how much continues straight ahead, so measuring the '
      + 'undeflected beam tells you about scattering into every other direction.',
    antiAnalogy: {
      tempting: 'reading it as a description of what happens during the collision',
      whyItFails:
        'it deliberately contains no during. It is a relation between a before and an after, which is why '
        + 'it survives situations where the particles that emerge are not even the ones that went in — '
        + 'something no account of a trajectory through the interaction could handle.',
    },
    microCheck: 'Measuring only the straight-through beam constrains how much scattered everywhere else. Which requirement forces that?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.qm.density-matrix',
    subject: 'physics',
    canonicalIdea: 'A statistical mixture of states is a different thing from a superposition of them, and the density operator is what tells the two apart.',
    concreteAnchor: 'a beam of atoms half prepared one way and half the other, versus a beam every atom of which is in one superposed state',
    plainExplanation:
      'Two situations can give identical results on one particular measurement and differ completely on '
      + 'another. In the first, each particle is definitely in one state or the other and you simply do '
      + 'not know which — ordinary ignorance about a definite fact. In the second, every particle is in '
      + 'one and the same superposed state, and there is nothing further to know. Measure along the '
      + 'obvious axis and the two give the same answer. Measure along a different one and the superposed '
      + 'beam shows interference while the mixture does not. The density operator carries both cases, and '
      + 'a single number computed from it distinguishes them.',
    antiAnalogy: {
      tempting: 'treating a mixture as just another way of writing a superposition',
      whyItFails:
        'the superposition keeps the relative phase between the two components and the mixture has thrown '
        + 'it away. That phase is what produces interference, so measuring along a different axis '
        + 'separates them decisively — the distinction is physical, not notational.',
    },
    microCheck: 'Two beams agree on one measurement and disagree on another. What has the mixture lost that the superposition kept?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.four-forces',
    subject: 'physics',
    canonicalIdea: 'Four forces account for every interaction, and they differ in strength, in how far they reach, and in what they can touch.',
    concreteAnchor: 'a fridge magnet lifting a paperclip against the pull of the entire Earth',
    plainExplanation:
      'A small magnet picks up a paperclip while the whole planet pulls the other way and loses. That is '
      + 'how enormously weaker gravity is than electromagnetism. Yet gravity is what shapes galaxies, '
      + 'because it never cancels — there is no negative mass to balance it, while positive and negative '
      + 'charge in ordinary matter cancel almost perfectly. Two more forces act only inside the nucleus '
      + 'and reach no further: the strong one, which is stronger still than electromagnetism and holds '
      + 'quarks and nuclei together, and the weak one, which is feeble but is the only force able to '
      + 'change one kind of particle into another.',
    antiAnalogy: {
      tempting: 'ranking them by strength alone and concluding gravity hardly matters',
      whyItFails:
        'reach and cancellation decide what a force does at large scale, not raw strength. The strong '
        + 'force is the most powerful of the four and is undetectable a nuclear diameter away; gravity is '
        + 'the feeblest and runs the universe.',
    },
    microCheck: 'The strong force is far stronger than gravity, yet gravity shapes galaxies. What does gravity have that the strong force lacks?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.particle-classification',
    subject: 'physics',
    canonicalIdea: 'Particles divide by whether the strong force acts on them: hadrons are built from quarks and feel it, leptons are not and do not.',
    concreteAnchor: 'a muon punching through a mountain of rock that stops a proton dead',
    plainExplanation:
      'The dividing line is not size or mass but which forces touch a particle. Hadrons — protons, '
      + 'neutrons, and a long list of shorter-lived relatives — are built out of quarks and feel the '
      + 'strong force, which is why they clump into nuclei and why they are stopped quickly by matter. '
      + 'Leptons, the electron and its heavier relatives together with the neutrinos, have no quarks '
      + 'inside them and the strong force ignores them entirely. That is why cosmic-ray muons pass through '
      + 'hundreds of metres of rock and are detected in deep mines, while a proton of the same energy is '
      + 'stopped near the surface.',
    antiAnalogy: {
      tempting: 'reading leptons as the smallest possible particles',
      whyItFails:
        'the curriculum\'s own note bans this. Having no known substructure is not the same as being '
        + 'small or light — the tau lepton is heavier than a proton, which is itself made of quarks. The '
        + 'classification is about which force acts, not about size.',
    },
    microCheck: 'A muon crosses a mountain that stops a proton. Which force is the difference?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.antimatter',
    subject: 'physics',
    canonicalIdea: 'Every particle has a partner of identical mass and opposite charge; a pair can annihilate into energy and enough energy can create one.',
    concreteAnchor: 'a PET scanner, which images the body by detecting antimatter annihilating inside it',
    plainExplanation:
      'For each particle there is a partner with exactly the same mass and opposite electric charge. Bring '
      + 'a particle and its own partner together and both vanish, their entire mass converted into energy '
      + 'carried off as light. The reverse also runs: concentrate enough energy in a small space and a '
      + 'pair appears, always as a pair, never one alone. Hospitals use this daily. A PET scan injects a '
      + 'substance that emits the electron\'s partner; each one meets an ordinary electron within a '
      + 'millimetre or so, both annihilate, and the two flashes of light that fly out in opposite '
      + 'directions are what the scanner detects.',
    antiAnalogy: {
      tempting: 'imagining antimatter as matter with negative mass, something that would fall upwards',
      whyItFails:
        'the curriculum\'s own note rules this out. The mass is identical and positive — that is measured, '
        + 'and it is why the annihilation releases the energy it does. What is opposite is the charge. No '
        + 'experiment supports anything falling upwards.',
    },
    microCheck: 'A particle and its partner annihilate and release energy. What does that tell you about the partner\'s mass?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.quarks',
    subject: 'physics',
    canonicalIdea: 'Quarks carry fractions of the elementary charge and come in six kinds, and none has ever been seen alone.',
    concreteAnchor: 'a proton made of three quarks whose charges are thirds, adding to exactly one',
    plainExplanation:
      'Every hadron is built from quarks, which come in six kinds and carry electric charges that are '
      + 'fractions — two-thirds and minus one-third of the electron\'s charge. A proton is two of the '
      + 'first kind and one of the second, and those thirds add to exactly one. A neutron swaps the '
      + 'proportion and adds to zero. Only the two lightest kinds make up ordinary matter; the other four '
      + 'are heavier, appear in collisions, and decay in fractions of a second. No experiment has ever '
      + 'isolated a single quark, and that is not a limitation of equipment but a consequence of how the '
      + 'strong force behaves.',
    antiAnalogy: {
      tempting: 'expecting a hard enough collision to knock one quark loose so it can be examined',
      whyItFails:
        'pulling quarks apart costs more and more energy, and long before one is free the energy invested '
        + 'has created a fresh quark and partner. You end up with two hadrons instead of one loose quark, '
        + 'every time.',
    },
    microCheck: 'Hitting a proton hard enough to free a quark produces more hadrons instead. Where did the energy go?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.leptons',
    subject: 'physics',
    canonicalIdea: 'The leptons come in three generations, each a charged particle paired with its own neutrino, and decays between them conserve the pairing.',
    concreteAnchor: 'a muon lasting about two millionths of a second before turning into three particles',
    plainExplanation:
      'There are three charged leptons — the electron, and the heavier muon and tau — and each comes '
      + 'paired with a neutrino of its own type. A muon is not a fatter electron; it is a distinct '
      + 'particle, roughly two hundred times heavier, and it lives about two millionths of a second. What '
      + 'it turns into is an electron plus two neutrinos: one of the muon\'s own type and one belonging to '
      + 'the electron\'s. Both neutrinos are required, because the tally of each generation has to balance '
      + 'separately, and without them the decay would be forbidden.',
    antiAnalogy: {
      tempting: 'describing the muon as a heavy electron that eventually just shrinks into a light one',
      whyItFails:
        'the curriculum\'s own note requires the two neutrinos to be named every time. Left out, the decay '
        + 'looks like one particle losing weight, and there is no way to see why it could not simply keep '
        + 'shrinking — or why the generation tallies matter at all.',
    },
    microCheck: 'A muon decays into an electron and two neutrinos rather than into an electron alone. What are the neutrinos there for?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.neutrinos',
    subject: 'physics',
    canonicalIdea: 'Neutrinos feel only the weak force, so they pass through almost everything, and detecting them takes enormous detectors and patience.',
    concreteAnchor: 'a tank of water deep in a mine, watched for years to catch a handful of them',
    plainExplanation:
      'Neutrinos have no electric charge and the strong force ignores them, so the only way they interact '
      + 'is through the weak force — and weak means what it says. About sixty billion from the Sun pass '
      + 'through every square centimetre of you each second, day and night, and essentially all of them '
      + 'continue straight through the Earth without touching anything. Catching them means an enormous '
      + 'volume of material, deep underground to keep everything else out, watched for years. Doing it '
      + 'is worth the trouble: neutrinos come straight out of the Sun\'s core, which nothing else does.',
    antiAnalogy: {
      tempting: 'assuming they slip through because they are so small',
      whyItFails:
        'an electron is no larger and is stopped by a sheet of foil. What matters is which forces can act '
        + 'on a particle, and a neutrino has only the feeblest of them. Size is not the variable.',
    },
    microCheck: 'An electron is stopped by foil and a neutrino crosses the Earth. What is different about them?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.hadron-quark-model',
    subject: 'physics',
    canonicalIdea: 'Hadrons come in two shapes: three quarks together, or a quark paired with an antiquark, and the quark content fixes the charge.',
    concreteAnchor: 'a particle predicted from a gap in a chart, then found with exactly the predicted mass and charge',
    plainExplanation:
      'Hadrons come in exactly two arrangements. Three quarks bound together make a baryon — the proton '
      + 'and neutron among them. A quark bound to an antiquark makes a meson, which is why mesons are '
      + 'short-lived: the pair inside can annihilate. Adding up the fractional charges of the constituents '
      + 'gives the hadron\'s charge every time, and arranging the known hadrons by their quark content '
      + 'produced a chart with one conspicuous gap. The particle that would fill it was described in '
      + 'advance — its charge, its mass, how it would decay — and then found, with the predicted '
      + 'properties. That is what turned the model from bookkeeping into physics.',
    antiAnalogy: {
      tempting: 'supposing quarks can be assembled in any number, the way atoms build molecules of any size',
      whyItFails:
        'only two combinations occur, and the reason lies in the strong force\'s own charge, which must '
        + 'cancel completely in any observable particle. Three quarks cancel it one way and a quark with '
        + 'an antiquark cancels it another; nothing else does.',
    },
    microCheck: 'Only two arrangements of quarks are ever seen. What must cancel out in any particle you can observe?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.gauge-bosons',
    subject: 'physics',
    canonicalIdea: 'Each force is carried by exchanged particles, and the mass of the carrier sets how far the force reaches.',
    concreteAnchor: 'electromagnetism reaching across the galaxy while the weak force stops inside a nucleus',
    plainExplanation:
      'Forces are not transmitted by contact but by particles passed between the interacting objects. '
      + 'Electromagnetism is carried by photons, which have no mass, and that is exactly why it reaches '
      + 'without limit — starlight crosses the galaxy. The weak force is carried by particles roughly '
      + 'eighty times heavier than a proton, and a heavy carrier cannot travel far before the exchange '
      + 'must be complete, which confines that force inside the nucleus. The strong force is carried by '
      + 'gluons, massless like photons, but they carry the strong charge themselves and interact with '
      + 'each other, which limits its reach for a different reason.',
    antiAnalogy: {
      tempting: 'thinking of the carriers as messengers physically thrown between the two objects',
      whyItFails:
        'thrown objects can only push things apart, and these produce attraction as readily as repulsion. '
        + 'The exchange is not a delivery; it is how the interaction is accounted for, and the carrier\'s '
        + 'mass is what fixes the range.',
    },
    microCheck: 'Electromagnetism reaches across a galaxy and the weak force stops inside a nucleus. What property of the carriers accounts for that?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.strong-interaction',
    subject: 'physics',
    canonicalIdea: 'The strong force acts on a charge that comes in three varieties, and unlike every other force it does not weaken with distance.',
    concreteAnchor: 'pulling two quarks apart and producing two new hadrons rather than two loose quarks',
    plainExplanation:
      'The strong force acts on a charge unrelated to electric charge, which comes in three varieties and '
      + 'must cancel completely in anything observable — three quarks each carrying a different variety '
      + 'cancel it, and so does a quark with the matching anticharge. What makes this force unlike the '
      + 'others is its distance behaviour. Gravity and electromagnetism fade as things separate. This one '
      + 'does not: pull two quarks apart and the force between them stays roughly constant, like a strong '
      + 'elastic band, so the energy needed keeps mounting. Eventually there is enough energy to create a '
      + 'new quark pair, the band snaps into two shorter bands, and you have two hadrons.',
    antiAnalogy: {
      tempting: 'expecting it to fade with distance like every other force you have met',
      whyItFails:
        'that expectation predicts free quarks at sufficient energy, and none has ever been seen. The '
        + 'force not fading is precisely why they cannot be separated, and it is why the energy you invest '
        + 'in pulling comes back as new particles instead.',
    },
    microCheck: 'Every other force weakens as things separate. What happens instead when you pull two quarks apart?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.weak-interaction',
    subject: 'physics',
    canonicalIdea: 'The weak force is the only one that changes a particle into a different kind, which is why it is behind beta decay.',
    concreteAnchor: 'a free neutron turning into a proton after about a quarter of an hour',
    plainExplanation:
      'A neutron outside a nucleus does not last. After about fifteen minutes on average it becomes a '
      + 'proton, emitting an electron and an antineutrino. Nothing struck it and nothing was added; one of '
      + 'the quarks inside it changed into a different kind of quark. That conversion of one flavour into '
      + 'another is something no other force can do — the strong force and electromagnetism can move '
      + 'particles and bind them, but they cannot change what a particle is. The weak force can, and beta '
      + 'decay, the Sun\'s first fusion step and every radioactive process of that family run on it.',
    antiAnalogy: {
      tempting: 'picturing the emitted electron as one that was sitting inside the neutron all along',
      whyItFails:
        'there is no electron in there to emit. It is created at the moment of the decay, along with the '
        + 'antineutrino, out of the energy released — which is why the electron comes out with a range of '
        + 'energies rather than one fixed value.',
    },
    microCheck: 'A neutron becomes a proton with nothing striking it. Which force can change what a particle is?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.electroweak-unification',
    subject: 'physics',
    canonicalIdea: 'Electromagnetism and the weak force are one force whose two faces look utterly different only because we live at low energy.',
    concreteAnchor: 'the W and Z particles, predicted with their masses before anyone found them',
    plainExplanation:
      'Electromagnetism reaches across the galaxy and the weak force barely leaves a nucleus, so they look '
      + 'like nothing alike. At sufficiently high energy they stop looking different: they are two aspects '
      + 'of one interaction, and what separates them at ordinary energies is that the weak carriers '
      + 'acquired mass while the photon did not. The theory that says so predicted the masses of those '
      + 'weak carriers before anyone had produced them, and predicted a further neutral carrier nobody had '
      + 'looked for. Both turned up at the predicted masses. That is the kind of evidence that settles the '
      + 'matter.',
    antiAnalogy: {
      tempting: 'reading unification as one force having been renamed, or two forces added together',
      whyItFails:
        'unification made a specific prediction about particles nobody had seen and got their masses '
        + 'right. Renaming predicts nothing. What was unified is the description, and the test was whether '
        + 'it forecast something new.',
    },
    microCheck: 'The two forces look nothing alike at everyday energies. What makes them differ?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.higgs-mechanism',
    subject: 'physics',
    canonicalIdea: 'Mass arises from how strongly a particle interacts with a field filling all of space, not from any substance added to it.',
    concreteAnchor: 'the weak force carriers being heavy while the photon carrying electromagnetism is not',
    plainExplanation:
      'A field fills all of space, and particles interact with it to differing degrees. A particle that '
      + 'interacts strongly with it resists being accelerated — and resistance to acceleration is exactly '
      + 'what mass is. One that does not interact with it at all, like the photon, has no mass and travels '
      + 'at the universal speed. That is why the weak force\'s carriers are heavy while the photon is not, '
      + 'though they belong to one unified interaction. The boson found in 2012 is not the source of mass; '
      + 'it is a ripple in that field, and finding it is how the field itself was confirmed to exist.',
    antiAnalogy: {
      tempting: 'picturing the boson as extra weight bolted onto a particle to make it heavy',
      whyItFails:
        'the curriculum\'s own note bans this framing. Mass here is not a substance attached but a '
        + 'consequence of how strongly a particle couples to a field that is everywhere. Nothing is '
        + 'added, and the boson is evidence of the field rather than the cargo.',
    },
    microCheck: 'The photon has no mass and the weak carriers are heavy, though they belong to one interaction. What differs between them?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.conservation-laws',
    subject: 'physics',
    canonicalIdea: 'Some reactions are forbidden by a tally that must balance, and no amount of energy makes a forbidden reaction happen.',
    concreteAnchor: 'the proton, which has never been observed to decay despite decades of watching',
    plainExplanation:
      'Alongside energy, charge and momentum, particle reactions keep two further tallies. One counts '
      + 'baryons, the three-quark particles; the other counts leptons. Both must come out the same before '
      + 'and after. This is why the proton, the lightest baryon there is, appears to be stable: anything '
      + 'it could decay into would have fewer baryons, so the books would not balance. Experiments have '
      + 'watched enormous tanks of water for decades and seen no proton decay at all. A reaction that '
      + 'breaks one of these tallies is not merely unlikely or expensive — it does not occur, however '
      + 'much energy is available.',
    antiAnalogy: {
      tempting: 'assuming a forbidden reaction just needs enough energy to force it through',
      whyItFails:
        'energy answers a different question. A reaction can be energetically comfortable and still never '
        + 'happen because a tally would not balance, and a reaction needing enormous energy happens '
        + 'readily once supplied. The two conditions are separate and both must hold.',
    },
    microCheck: 'A reaction releases energy and yet never occurs. What else has to balance?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.feynman-diagrams',
    subject: 'physics',
    canonicalIdea: 'A diagram records which particles came in, which went out, and which carrier was exchanged — not the path anything travelled.',
    concreteAnchor: 'a sketch of beta decay showing a neutron\'s quark changing kind and a carrier emitted',
    plainExplanation:
      'These diagrams are a bookkeeping notation. Lines entering from one side are the particles that came '
      + 'in, lines leaving the other are what came out, and where lines meet is a point at which the '
      + 'interaction happened, with a carrier passing between. Reading beta decay off one is quick: a quark '
      + 'line changes kind, a weak carrier line goes out from that meeting point, and it ends in an '
      + 'electron and an antineutrino. What the diagram never shows is a journey. The positions on the '
      + 'page are not places and the lines are not routes; the whole content is what met what, and what '
      + 'was exchanged.',
    antiAnalogy: {
      tempting: 'reading the lines as trajectories through space, with angles that mean directions',
      whyItFails:
        'the angles carry no information and redrawing the same diagram with different angles changes '
        + 'nothing. Reading them as paths also reintroduces the definite trajectory quantum mechanics does '
        + 'not have.',
    },
    microCheck: 'Redrawing the diagram at different angles changes nothing about what it says. What does it actually record?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.accelerators-detectors',
    subject: 'physics',
    canonicalIdea: 'Collisions convert energy into new particles, and the properties of what is created are reconstructed from what the detectors record afterwards.',
    concreteAnchor: 'a curved track in a magnetic field, whose bend gives the particle\'s charge and momentum',
    plainExplanation:
      'An accelerator does two things at once. It concentrates energy, which can turn into mass and so '
      + 'create particles too heavy to exist in ordinary matter. And it provides the conditions in which '
      + 'those particles can be studied — which never means observing them directly, since most last far '
      + 'too briefly to reach any detector. What is recorded is the debris: charged fragments curving in a '
      + 'magnetic field, with the direction of the bend giving the sign of the charge and its tightness '
      + 'giving the momentum. Applying conservation of energy and momentum backwards through the debris '
      + 'reconstructs the mass of whatever produced it.',
    antiAnalogy: {
      tempting: 'imagining the collision smashes the particles open to reveal what was inside',
      whyItFails:
        'most of what comes out was not inside anything — it was created from the collision energy. A '
        + 'collision of two protons can produce particles heavier than both protons together, which no '
        + 'account of breaking something open can allow.',
    },
    microCheck: 'A collision of two protons produces a particle heavier than both together. Where did the extra mass come from?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.particle.standard-model',
    subject: 'physics',
    canonicalIdea: 'One framework holds every known particle, classifying each by which forces act on it and which conserved numbers it carries.',
    concreteAnchor: 'a chart on which every particle ever detected has a place, and gravity has none',
    plainExplanation:
      'The Standard Model gathers the quarks, the leptons, the force carriers and the Higgs boson into a '
      + 'single framework. Each particle is fixed by a short list: its mass, its electric charge, whether '
      + 'the strong force acts on it, what generation it belongs to, and which conserved tallies it '
      + 'contributes to. From that list alone you can work out what a particle may turn into and what it '
      + 'may not. It is the most precisely tested theory in physics, agreeing with measurement to many '
      + 'decimal places. It also has known limits: it does not include gravity, it does not account for '
      + 'the dark matter astronomers infer, and it does not explain why there are three generations.',
    antiAnalogy: {
      tempting: 'taking it as a complete theory of everything because it accounts for every particle found so far',
      whyItFails:
        'gravity is not in it at all, and the matter astronomers can weigh in galaxies is largely of a '
        + 'kind it does not contain. Being complete for what has been detected in a collider is not the '
        + 'same as being complete.',
    },
    microCheck: 'The model matches every collider measurement and still leaves astronomers unsatisfied. What is missing from it?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.probability-basics',
    subject: 'physics',
    canonicalIdea: 'Enormous numbers of particles make probabilistic predictions sharper, not vaguer.',
    concreteAnchor: 'the air in a room, which never once collects in one corner though nothing forbids it',
    plainExplanation:
      'Nothing in the laws of motion forbids all the air in a room from gathering in one corner. Every '
      + 'molecule could happen to be there at the same instant. It never occurs, because the number of '
      + 'arrangements in which the air is spread out exceeds the number in which it is bunched by a factor '
      + 'so vast it has no name. Statistical mechanics works by counting arrangements. With a handful of '
      + 'particles the predictions would be loose. With the number in a room, the spread around the '
      + 'expected value is so tiny that the pressure on a wall is steady to more decimal places than any '
      + 'instrument can read.',
    antiAnalogy: {
      tempting: 'reading a probabilistic description as one that is approximate or uncertain',
      whyItFails:
        'here the large numbers work the other way. The relative wobble shrinks as the count rises, so a '
        + 'prediction about a mole of gas is among the sharpest in physics — far sharper than one about '
        + 'ten particles, which really would be uncertain.',
    },
    microCheck: 'Predictions about a roomful of air are extremely precise and ones about ten molecules are not. What does the large number do?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.boltzmann-factor',
    subject: 'physics',
    canonicalIdea: 'At a given temperature, a state of higher energy is less likely, and how much less falls away steeply as the energy rises above the thermal scale.',
    concreteAnchor: 'the thinning of the atmosphere with altitude, halving every few kilometres',
    plainExplanation:
      'In thermal equilibrium, states cost energy and the price is paid in likelihood. A state one thermal '
      + 'unit of energy above another is a few times less likely; ten units above, thousands of times less '
      + 'likely; a hundred units above, effectively never occupied. The atmosphere shows it directly: '
      + 'lifting a molecule higher costs gravitational energy, so the density falls off steadily with '
      + 'altitude, halving every few kilometres. Raise the temperature and the thermal unit grows, so '
      + 'higher states become accessible — which is why chemical reactions with a barrier speed up so '
      + 'dramatically when a mixture is warmed.',
    antiAnalogy: {
      tempting: 'treating it as another way of writing entropy',
      whyItFails:
        'the curriculum\'s own note bans this bridge. One is the likelihood of a single state given its '
        + 'energy; the other counts how many states there are. They answer different questions, and a '
        + 'system can have many states each individually improbable — which is exactly the case that '
        + 'conflating them makes impossible to think about.',
    },
    microCheck: 'Warming a mixture makes a slow reaction run fast. What has changed about the high-energy states?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.partition-function',
    subject: 'physics',
    canonicalIdea: 'Summing the likelihood weights over every state produces a single quantity from which every thermodynamic property can be recovered.',
    concreteAnchor: 'one sum yielding energy, pressure, entropy and heat capacity in turn',
    plainExplanation:
      'Add up the thermal weight of every state a system can be in and you get one number, depending on '
      + 'temperature. It looks at first like housekeeping — you do need it to turn weights into '
      + 'probabilities. But it is far more. How that sum changes as the temperature is varied gives the '
      + 'average energy. How it changes with volume gives the pressure. Combinations give the entropy, the '
      + 'heat capacity, and the free energy. Every thermodynamic property of the system is recoverable '
      + 'from this one function, which is why computing it is usually the whole of the work.',
    antiAnalogy: {
      tempting: 'dismissing it as a normalisation constant, the sort of factor that makes probabilities add to one',
      whyItFails:
        'the curriculum\'s own note names this as the misconception itself. A normalisation constant is '
        + 'discarded once used. This one is differentiated, and its derivatives are the thermodynamics. '
        + 'Discarding it throws away everything the calculation was for.',
    },
    microCheck: 'The same sum yields the pressure and the heat capacity. What would a mere normalisation constant let you do with it?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.maxwell-boltzmann',
    subject: 'physics',
    canonicalIdea: 'Molecular speeds in a gas are spread across a lopsided distribution, and its peak, its average and its root-mean-square value are three different speeds.',
    concreteAnchor: 'a jar of air in which some molecules crawl and a few move several times the average',
    plainExplanation:
      'Molecules in a gas at one temperature do not share one speed. They are spread across a distribution '
      + 'that rises from zero, peaks, and then trails off with a long tail to the right — a few molecules '
      + 'always moving several times faster than typical. Because the tail is long and one-sided, the '
      + 'distribution has no single characteristic speed. The peak is the most common speed. The plain '
      + 'average is a little higher, dragged up by the tail. The root-mean-square value, which is what '
      + 'kinetic energy calculations need, is higher still. Warming the gas shifts the whole curve right '
      + 'and flattens it.',
    antiAnalogy: {
      tempting: 'quoting the root-mean-square speed as the one molecules typically travel at',
      whyItFails:
        'the curriculum\'s own note flags this exact swap. That value exists because energy depends on the '
        + 'square of speed, and the long tail pulls it above the peak. It is not the most common speed, '
        + 'and using it as one misreads the whole shape of the distribution.',
    },
    microCheck: 'The distribution has three different characteristic speeds. Why do they not coincide?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.fermi-dirac',
    subject: 'physics',
    canonicalIdea: 'Fermions fill states from the bottom up, so even at absolute zero the topmost ones are moving fast, and warming affects only those near the top.',
    concreteAnchor: 'a metal\'s electrons contributing almost nothing to its heat capacity',
    plainExplanation:
      'Because no two fermions may share a state, they stack into the lowest available states from the '
      + 'bottom up. At absolute zero every state below a certain energy is full and every one above it is '
      + 'empty, and that dividing energy is high — in a metal, corresponding to tens of thousands of '
      + 'degrees. The electrons at the top are moving very fast with the system at zero temperature. Warm '
      + 'the metal to room temperature and only the thin sliver near the dividing line can move, since '
      + 'everything below has no empty state to move into. That is why the electrons in a metal contribute '
      + 'far less to its heat capacity than counting them would suggest.',
    antiAnalogy: {
      tempting: 'expecting the particles to slow to a stop as the temperature approaches absolute zero',
      whyItFails:
        'stopping would mean crowding into the lowest state, which the exclusion rule forbids. The stack '
        + 'is a consequence of that rule and not of temperature, which is why it survives at zero and why '
        + 'a white dwarf resists collapse when it has no heat left.',
    },
    microCheck: 'Only a thin sliver of a metal\'s electrons can absorb heat. What blocks the rest?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.bose-einstein',
    subject: 'physics',
    canonicalIdea: 'Bosons may share a state, and below a critical temperature a large fraction of them occupy the single lowest one.',
    concreteAnchor: 'a cloud of cold atoms whose velocity distribution grows a sharp spike while the cloud itself stays put',
    plainExplanation:
      'Bosons carry no exclusion rule, so any number may sit in the same state. Cool a gas of them far '
      + 'enough and something abrupt happens: below a particular temperature, a macroscopic fraction '
      + 'occupies the single lowest-energy state at once, and that fraction grows as cooling continues. '
      + 'What is being shared is a state of motion, not a location. In the laboratory the signature is a '
      + 'sharp spike appearing in the distribution of velocities — nearly all the atoms with nearly the '
      + 'same momentum — while the cloud in the trap remains a cloud, of ordinary size, in ordinary space.',
    antiAnalogy: {
      tempting: 'picturing the atoms clumping together into one spot',
      whyItFails:
        'the curriculum\'s own note bans this. The condensation happens in the distribution of momentum, '
        + 'not of position, and the actual cloud stays spread across the trap. Expecting a clump means '
        + 'looking for the effect in the wrong measurement entirely.',
    },
    microCheck: 'The cloud stays the same size in the trap while a spike appears in the velocity distribution. What condensed?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.entropy-statistical',
    subject: 'physics',
    canonicalIdea: 'Entropy counts how many microscopic arrangements produce the same macroscopic state, and the count is what the definition is.',
    concreteAnchor: 'a shuffled pack of cards, where every particular order is equally improbable',
    plainExplanation:
      'Entropy is a count. Fix what you can measure about a system — its energy, its volume, its number of '
      + 'particles — and ask how many distinct microscopic arrangements are consistent with those '
      + 'measurements. Entropy is the logarithm of that number, so systems with vastly more available '
      + 'arrangements have higher entropy. This is why a gas spreads out: the spread-out arrangements '
      + 'outnumber the bunched ones overwhelmingly. Note that a shuffled pack in one particular order is '
      + 'exactly as improbable as a sorted one; what differs is how many orders we are prepared to call '
      + 'shuffled.',
    antiAnalogy: {
      tempting: 'defining it as a measure of messiness or disorder',
      whyItFails:
        'the curriculum\'s own note bans this as a bare definition. Messiness is an impression, and it '
        + 'gets cases wrong — a crystallising liquid becomes visibly more ordered while the total entropy '
        + 'rises, because the heat released opens up far more arrangements elsewhere. Counting settles it; '
        + 'the impression does not.',
    },
    microCheck: 'A liquid crystallising looks more ordered, yet total entropy rises. What are you counting to see that?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.free-energy',
    subject: 'physics',
    canonicalIdea: 'What a system at fixed temperature settles into is decided by a balance between lowering its energy and increasing its entropy, not by energy alone.',
    concreteAnchor: 'ice melting on its own above zero and freezing on its own below it',
    plainExplanation:
      'A system held at a fixed temperature does not simply seek its lowest energy. It settles where a '
      + 'particular combination is smallest: its energy, minus its entropy multiplied by the temperature. '
      + 'Two effects therefore compete, and temperature sets the exchange rate between them. Below zero, '
      + 'the energy saving of forming ice wins and water freezes by itself. Above zero, the entropy gain '
      + 'of the liquid wins and ice melts by itself. Nothing about either substance changed at the '
      + 'crossing point; the balance did. Whichever combination applies — at fixed volume or at fixed '
      + 'pressure — the structure is the same.',
    antiAnalogy: {
      tempting: 'treating it as the system\'s energy budget, the part of its energy available to spend',
      whyItFails:
        'the curriculum\'s own note requires the temperature-entropy trade-off to be named. Read as a '
        + 'budget it predicts that a system always drops to lowest energy, and then ice melting on a warm '
        + 'day — which raises energy — has no explanation at all.',
    },
    microCheck: 'Ice melts on its own above zero although melting takes energy in. What is paying for it?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.grand-canonical-ensemble',
    subject: 'physics',
    canonicalIdea: 'When a system can exchange particles as well as heat with its surroundings, the particle count fluctuates and a second control parameter is needed alongside temperature.',
    concreteAnchor: 'a small region inside a gas, whose molecule count drifts up and down while the whole gas sits still',
    plainExplanation:
      'Draw an imaginary box inside a gas. Molecules cross its walls constantly, so its energy fluctuates '
      + 'and so does the number of particles inside it. Describing such a region needs two knobs from the '
      + 'surroundings, not one: the temperature, controlling the exchange of energy, and a second quantity '
      + 'controlling the exchange of particles. Summing the weights over all states and all particle '
      + 'numbers gives a master function from which averages follow — and, remarkably, working it through '
      + 'for fermions and for bosons produces the occupation rules for each directly, rather than their '
      + 'having to be assumed.',
    antiAnalogy: {
      tempting: 'reading the particle-exchange parameter as telling you how likely a state is to be occupied',
      whyItFails:
        'the curriculum\'s own note names this conflation. That parameter is a property of the reservoir, '
        + 'set by the surroundings. The occupation of a state is a separate result derived from it '
        + 'together with the state\'s own energy and the temperature.',
    },
    microCheck: 'A region inside a gas needs two knobs from its surroundings, not one. What is the second knob controlling?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.chemical-potential',
    subject: 'physics',
    canonicalIdea: 'The chemical potential is the free-energy cost of adding one more particle, and particles flow until it is equal on both sides.',
    concreteAnchor: 'a sugar cube dissolving until the solution is uniform and then stopping',
    plainExplanation:
      'Temperature governs the flow of heat: put two bodies in contact and energy moves until their '
      + 'temperatures match. The chemical potential does the same job for particles. It is what adding one '
      + 'more particle costs in free energy, and particles cross a boundary until the cost is the same on '
      + 'both sides. That is what diffusion actually is, and why a sugar cube dissolves until the solution '
      + 'is uniform and then stops even though the sugar molecules keep moving. The name is historical and '
      + 'unhelpful: nothing chemical is required, and for the electrons in a metal at absolute zero this '
      + 'quantity is exactly the energy dividing the filled states from the empty ones.',
    antiAnalogy: {
      tempting: 'taking it for a kind of stored energy the particles carry with them',
      whyItFails:
        'it is a cost per particle added, not a possession, and its value depends on the whole system\'s '
        + 'state — density, temperature, what else is present. Two identical molecules in different '
        + 'solutions have different values, which no property carried by the molecule could give.',
    },
    microCheck: 'Sugar stops dissolving although its molecules are still moving. What has equalised?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.fluctuations-correlations',
    subject: 'physics',
    canonicalIdea: 'The size of a system\'s spontaneous fluctuations tells you how strongly it responds when pushed.',
    concreteAnchor: 'the sky being blue because air density fluctuates on small scales',
    plainExplanation:
      'A system in equilibrium is not still. Its energy, density and magnetisation all wobble continually '
      + 'about their averages. Those wobbles are not noise obscuring the physics — they are the physics. '
      + 'The size of the energy fluctuation is directly related to the heat capacity, so a system that '
      + 'wobbles a lot in energy is one that absorbs a lot of heat for a small temperature rise. The same '
      + 'link holds generally: how much a quantity fluctuates by itself determines how much it responds to '
      + 'being pushed. Near a critical point the fluctuations grow enormous and so, correspondingly, do '
      + 'the responses.',
    antiAnalogy: {
      tempting: 'treating the fluctuations as random error to be averaged away',
      whyItFails:
        'averaging them away discards the response functions, because those are computed from precisely '
        + 'the quantity being discarded. The wobble is not a measurement imperfection; it is where the '
        + 'heat capacity and the susceptibility come from.',
    },
    microCheck: 'A system that fluctuates a lot in energy has a large heat capacity. Which of those is easier to measure, and what does that buy you?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.phase-transitions',
    subject: 'physics',
    canonicalIdea: 'A phase transition is a sudden change in the collective state, described by a quantity that is zero on one side and grows on the other.',
    concreteAnchor: 'a magnet losing its magnetism entirely above a particular temperature',
    plainExplanation:
      'Heat a magnet and above a particular temperature it stops being magnetic — not gradually fading '
      + 'away over a wide range, but with the magnetisation reaching zero at one point and staying there. '
      + 'That quantity, zero in the disordered phase and growing below the transition, is the order '
      + 'parameter, and it is what a description of the transition is built around. The standard approach '
      + 'writes the free energy as a series in that quantity and lets the temperature control the sign of '
      + 'the leading term. When the sign flips, the lowest point of the curve moves away from zero, and '
      + 'the system orders.',
    antiAnalogy: {
      tempting: 'expecting the change to happen because individual particles change at the transition',
      whyItFails:
        'no individual atom is different above and below the temperature; the same atoms, the same forces. '
        + 'What changes is what the collection does, and that is why the effect is sharp for a large system '
        + 'and smeared out for a small one.',
    },
    microCheck: 'No individual atom changes at the transition temperature. What does change?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.ising-model',
    subject: 'physics',
    canonicalIdea: 'The simplest possible model of interacting spins has no transition in one dimension and a genuine one in two, so dimension itself decides.',
    concreteAnchor: 'a line of magnets that never stays aligned, and a sheet of the same magnets that does',
    plainExplanation:
      'Strip a magnet down to the barest model: sites on a grid, each carrying an arrow that points up or '
      + 'down, each preferring to agree with its immediate neighbours. In one dimension this can be solved '
      + 'exactly, and the answer is that no ordered phase survives at any temperature above zero — a '
      + 'single flipped stretch costs almost nothing and destroys alignment along the whole line. Put the '
      + 'same sites on a two-dimensional sheet and a flipped region must pay for its whole boundary, which '
      + 'grows with its size. That is enough to hold order together, and the two-dimensional model has a '
      + 'real transition at a definite temperature.',
    antiAnalogy: {
      tempting: 'assuming that if the rule is the same, the behaviour must be the same in any dimension',
      whyItFails:
        'the rule is identical and the outcomes are opposite. What differs is the cost of a boundary: in a '
        + 'line it is two sites regardless of size, in a sheet it grows with the region. Dimension is not '
        + 'a detail here; it decides whether order can exist at all.',
    },
    microCheck: 'The same rule gives no transition in a line and a real one in a sheet. What costs more in the sheet?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.phase-transitions-critical-phenomena',
    subject: 'physics',
    canonicalIdea: 'Close to a critical point quantities follow power laws, and wildly different materials share the same exponents.',
    concreteAnchor: 'a fluid at its critical point and a magnet at its own, obeying numerically identical laws',
    plainExplanation:
      'Approaching a critical point, quantities do not vary smoothly — they follow power laws in the '
      + 'distance from the critical temperature, some diverging, some vanishing. The striking result is '
      + 'that the powers themselves are shared. A fluid at its critical point and a magnet at its own obey '
      + 'laws with numerically identical exponents, though one is about density and the other about '
      + 'magnetisation. Materials fall into a small number of classes, and membership depends only on the '
      + 'dimension of space and the nature of the order parameter, not on what the substance is made of. '
      + 'Very near the critical point the correlated regions grow without bound, and at that scale the '
      + 'microscopic details wash out.',
    antiAnalogy: {
      tempting: 'reading universality as saying the materials themselves are somehow alike',
      whyItFails:
        'they are not alike in any other respect — different critical temperatures, different densities, '
        + 'different chemistry. What they share is the behaviour of the singular part near the critical '
        + 'point, and only there. A few degrees away they have nothing in common.',
    },
    microCheck: 'A fluid and a magnet share exponents but nothing else. Where does that shared behaviour hold?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.stat.monte-carlo-basics',
    subject: 'physics',
    canonicalIdea: 'Rather than sum over every configuration, sample them with the right acceptance rule and the averages come out correct.',
    concreteAnchor: 'a modest lattice with more configurations than there are atoms in the universe',
    plainExplanation:
      'A lattice of a few hundred sites, each with two possible values, has more configurations than there '
      + 'are atoms in the observable universe. No sum over all of them is possible. The alternative is to '
      + 'wander through configuration space: propose a small change, accept it outright if it lowers the '
      + 'energy, and accept it with a probability set by the thermal weight if it raises it. That '
      + 'acceptance rule is chosen so the wandering visits each configuration in proportion to its '
      + 'equilibrium likelihood, and simple averages over the visits then give the right answers. Near a '
      + 'critical point the method slows dramatically, because correlated regions grow and single-site '
      + 'changes stop moving the system anywhere.',
    antiAnalogy: {
      tempting: 'reading it as sampling configurations at random and averaging',
      whyItFails:
        'uniform random sampling would almost never land on a configuration the system actually occupies, '
        + 'since the likely ones are a vanishing fraction of the total. The acceptance rule is what makes '
        + 'the sampling land where the weight is, and without it the average is meaningless.',
    },
    microCheck: 'Picking configurations uniformly at random gives a useless average. What does the acceptance rule fix?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.rel.postulates',
    subject: 'physics',
    canonicalIdea: 'The laws of physics are the same in every frame moving steadily, and the speed of light is one of those laws, so everyone measures it the same.',
    concreteAnchor: 'a ball thrown straight up inside a smoothly flying aircraft, landing back in your hand',
    plainExplanation:
      'Inside a smoothly flying aircraft you can throw a ball straight up and catch it, pour a drink, walk '
      + 'about — everything works exactly as on the ground, and no experiment done inside can tell you how '
      + 'fast you are going. That is the first postulate, and it was old news. The second is the shock: the '
      + 'speed of light is one of those laws, so it comes out the same for everybody. Chase a light beam at '
      + 'nearly its own speed and it still recedes from you at the full speed. Everything strange in '
      + 'relativity follows from taking those two statements together and refusing to abandon either.',
    antiAnalogy: {
      tempting: 'summarising the whole theory as everything being relative',
      whyItFails:
        'the curriculum\'s own note bans this phrasing. The theory\'s core claim is that something is '
        + 'absolutely not relative — the speed of light, and the laws themselves — and that is precisely '
        + 'what forces time and length to give way instead.',
    },
    microCheck: 'Chasing a light beam does not reduce its measured speed at all. Which of the two postulates is that?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.rel.simultaneity',
    subject: 'physics',
    canonicalIdea: 'Whether two separated events happen at the same time genuinely depends on who is asking, and no correction removes the disagreement.',
    concreteAnchor: 'lightning striking both ends of a moving train, judged simultaneous by one observer and not by the other',
    plainExplanation:
      'Lightning strikes both ends of a moving train. Someone standing on the embankment, exactly midway, '
      + 'sees the two flashes arrive together and concludes the strikes were simultaneous. A passenger at '
      + 'the middle of the train is moving towards one flash and away from the other, and concludes the '
      + 'front strike happened first. Both have already accounted for the travel time of the light. Both '
      + 'are right. There is no fact of the matter about which strike came first, because whether two '
      + 'separated events are simultaneous depends on the frame, and no frame is privileged.',
    antiAnalogy: {
      tempting: 'putting the disagreement down to light taking time to reach each observer',
      whyItFails:
        'the curriculum\'s own note bans this reduction. Both observers subtract the travel time and still '
        + 'disagree. A delay you can correct for is a bookkeeping matter; this survives the correction, '
        + 'which is what makes it a fact about time rather than about seeing.',
    },
    microCheck: 'Both observers correct for how long the light took and still disagree about the order. What does that rule out?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.rel.time-dilation',
    subject: 'physics',
    canonicalIdea: 'A clock moving relative to you is measured to run slow, while by its own reckoning it keeps perfectly ordinary time.',
    concreteAnchor: 'cosmic-ray muons reaching the ground although they should decay far above it',
    plainExplanation:
      'Muons created high in the atmosphere live about two millionths of a second, which even at nearly '
      + 'light speed should take them only a few hundred metres. Enormous numbers of them reach sea level '
      + 'anyway. From the ground\'s point of view their internal clocks are running slow, so they survive '
      + 'the trip. From the muon\'s own point of view nothing is odd about its lifetime at all — it is the '
      + 'atmosphere that is rushing past, thinner than the ground says. The shortest time between two '
      + 'events is always the one measured by a clock present at both, and every other clock reads longer.',
    antiAnalogy: {
      tempting: 'calling the moving clock\'s own reading the true time without saying it is the shorter one',
      whyItFails:
        'the curriculum\'s own note requires that clarification. Left vague, true sounds like the one '
        + 'everyone should agree on, and there is no such reading. Its own time is simply the shortest of '
        + 'them, and naming which one keeps the comparison straight.',
    },
    microCheck: 'The muon reaches the ground and finds nothing odd about its own lifetime. What does it find odd instead?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.rel.length-contraction',
    subject: 'physics',
    canonicalIdea: 'An object in motion relative to you is measured shorter along its direction of travel, though nothing has happened to the object.',
    concreteAnchor: 'the same muon\'s journey, described as a thinner atmosphere rather than a slower clock',
    plainExplanation:
      'Measure a fast-moving object along its direction of travel and it comes out shorter than its length '
      + 'at rest. Nothing has been squeezed and nothing inside it has changed; an observer travelling '
      + 'alongside measures the full rest length and sees your laboratory contracted instead. The two '
      + 'descriptions are two accounts of one situation. The muon reaching sea level is the clearest case: '
      + 'from the ground the muon\'s clock runs slow, and from the muon the atmosphere is much thinner than '
      + 'the ground claims. Both accounts predict the muon arrives, and they agree on everything anyone '
      + 'can actually measure.',
    antiAnalogy: {
      tempting: 'saying the fast-moving object shrinks, full stop',
      whyItFails:
        'the curriculum\'s own note requires naming who is measuring. Shrinking on its own implies '
        + 'something happened to the object, and then it should be shorter for everyone — while an '
        + 'observer riding along measures it entirely unchanged.',
    },
    microCheck: 'An observer riding alongside measures the object at full length. What does that say about the contraction?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.rel.lorentz-transform',
    subject: 'physics',
    canonicalIdea: 'The rules for translating an event\'s time and place between two frames mix time into space and space into time.',
    concreteAnchor: 'two observers assigning different times and positions to the very same flash',
    plainExplanation:
      'Everyday intuition says that if two observers disagree about where something happened they at least '
      + 'agree about when. Keeping the speed of light the same for both makes that impossible. The correct '
      + 'translation between their measurements mixes the two: one observer\'s time depends on both the '
      + 'other\'s time and the other\'s position, and the same in reverse. That mixing is where time '
      + 'dilation, length contraction and the disagreement about simultaneity all come from — they are not '
      + 'three separate effects but three readings of one relationship. At everyday speeds the mixing is '
      + 'far too slight to notice and the familiar rules return.',
    antiAnalogy: {
      tempting: 'expecting them to be the ordinary rules with a small correction bolted on for high speed',
      whyItFails:
        'the change is structural, not a correction term. Time and position stop being separately '
        + 'translatable, and no adjustment to the old rules produces a disagreement about simultaneity, '
        + 'which those rules cannot express at all.',
    },
    microCheck: 'Two observers disagree about when a flash happened, not only where. Which everyday assumption has gone?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.rel.relativistic-momentum',
    subject: 'physics',
    canonicalIdea: 'Momentum and energy both grow without limit as speed approaches that of light, which is why nothing with mass ever reaches it.',
    concreteAnchor: 'an accelerator pouring in more and more energy for a smaller and smaller speed increase',
    plainExplanation:
      'Push a particle harder and harder and its speed does not climb without limit. As it approaches the '
      + 'speed of light, its momentum and its energy grow steeply while its speed creeps closer to that '
      + 'ceiling and never reaches it. Accelerator operators see this daily: the machine pours in energy '
      + 'and the particles gain very little speed, but a great deal of momentum and energy. That is why no '
      + 'object with mass can reach light speed — it would take an infinite amount of energy — and why a '
      + 'particle with no mass at all travels at exactly that speed and no other.',
    antiAnalogy: {
      tempting: 'reading the mass-energy relation as saying matter turns into pure energy',
      whyItFails:
        'the curriculum\'s own note bans this unqualified reading. In a nuclear reaction less than a '
        + 'percent of the mass is converted and the rest remains as ordinary matter. Total conversion '
        + 'happens only when a particle meets its own antiparticle, which is a specific and rare event.',
    },
    microCheck: 'An accelerator adds enormous energy and the speed barely rises. What is receiving the energy?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.rel.mass-energy',
    subject: 'physics',
    canonicalIdea: 'Mass is a form of energy, so a system that gives out energy weighs less afterwards — including systems that are not nuclear.',
    concreteAnchor: 'a wound clock spring weighing very slightly more than a slack one',
    plainExplanation:
      'Mass and energy are the same quantity in different units, and the conversion factor is the speed of '
      + 'light squared — an enormous number, which is why a tiny mass corresponds to a vast energy. This '
      + 'is not confined to nuclear physics. A wound clock spring weighs very slightly more than the same '
      + 'spring slack, and a hot object weighs slightly more than a cold one. The differences are far too '
      + 'small to weigh in those cases. In a nuclear reaction the energies are large enough that the mass '
      + 'change is measurable, which is why the relation is met there first and often mistaken for a '
      + 'nuclear rule.',
    antiAnalogy: {
      tempting: 'treating it as a rule that applies only inside nuclei',
      whyItFails:
        'it applies to every system that stores or releases energy, chemical and mechanical alike. What is '
        + 'special about nuclear reactions is not the physics but the scale — the mass change is finally '
        + 'big enough to detect.',
    },
    microCheck: 'A wound spring weighs more than a slack one. Why is that never noticed?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.rel.spacetime',
    subject: 'physics',
    canonicalIdea: 'Observers disagree about times and distances separately but agree exactly on one combination of them.',
    concreteAnchor: 'two people measuring a stick along different axes and still agreeing on its length',
    plainExplanation:
      'Two people using differently oriented axes assign different sideways and forwards components to the '
      + 'same stick, yet both compute the same length from them. Relativity has a counterpart. Observers '
      + 'in relative motion disagree about the time between two events and about the distance between '
      + 'them, but one particular combination of those two — with the time part entering with the opposite '
      + 'sign to the space part — comes out identical for everyone. That invariant is the real geometric '
      + 'fact about the pair of events, and its sign says whether one event could have influenced the '
      + 'other or whether nothing, not even light, could have travelled between them.',
    antiAnalogy: {
      tempting: 'treating time as simply a fourth direction just like the three of space',
      whyItFails:
        'it enters the invariant with the opposite sign, and that difference is everything. It is what '
        + 'separates pairs of events with a possible cause-and-effect link from those without, and a '
        + 'fourth ordinary direction would make no such distinction.',
    },
    microCheck: 'Observers disagree on the time and on the distance but agree on one combination. What does its sign tell you?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.astro.stellar-structure',
    subject: 'physics',
    canonicalIdea: 'A star is a balance between gravity pulling in and pressure from fusion pushing out, and that balance is self-correcting.',
    concreteAnchor: 'the Sun holding the same size for billions of years without a container',
    plainExplanation:
      'A star has no container. It holds itself together because gravity pulls every layer inward while '
      + 'pressure from the hot interior pushes outward, and at every depth those two exactly balance. The '
      + 'balance regulates itself: if fusion in the core ran faster, the extra heat would expand the star, '
      + 'the core would cool, and fusion would slow again. That thermostat is why stars are stable for '
      + 'billions of years, and why the main sequence is a narrow band rather than a scatter — a star\'s '
      + 'mass essentially fixes its brightness, its temperature and its lifetime. More massive stars burn '
      + 'far hotter and die far sooner.',
    antiAnalogy: {
      tempting: 'picturing a star as a ball of fire, burning like a bonfire',
      whyItFails:
        'burning is a chemical reaction between electrons and would exhaust the Sun in a few thousand '
        + 'years. What sustains it happens in the nuclei, releases millions of times more per reaction, '
        + 'and requires the crushing pressure that gravity alone provides.',
    },
    microCheck: 'If the Sun\'s core briefly ran faster, the star would expand and the core would cool. What does that do to the rate?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.astro.stellar-evolution',
    subject: 'physics',
    canonicalIdea: 'What a star becomes at the end is decided by its mass, and each end state is held up by a different mechanism.',
    concreteAnchor: 'a teaspoon of white dwarf weighing tonnes, and a teaspoon of neutron star weighing a billion of them',
    plainExplanation:
      'When a star exhausts the fuel in its core the balance fails and it collapses until something new '
      + 'stops it. For a modest star like the Sun, the electrons are packed so tightly that the exclusion '
      + 'rule itself resists further compression, and what remains is a white dwarf. Above a certain mass '
      + 'that resistance is overwhelmed and something different happens: the electrons are forced into the '
      + 'protons, converting them to neutrons, and the object that remains is made of different matter '
      + 'entirely, supported by the neutrons resisting compression instead. Heavier still and nothing '
      + 'stops the collapse at all.',
    antiAnalogy: {
      tempting: 'describing a neutron star as a white dwarf squeezed a bit further',
      whyItFails:
        'the curriculum\'s own note requires naming the conversion. It is not the same material more '
        + 'compressed — the electrons and protons have combined into neutrons, so the composition changed '
        + 'and so did what holds the object up. A continuous squeeze cannot produce either.',
    },
    microCheck: 'A neutron star is not simply a smaller white dwarf. What happened to the electrons?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.astro.cosmology',
    subject: 'physics',
    canonicalIdea: 'The universe began hot and dense and has been expanding and cooling since; the expansion is of space itself, with no centre.',
    concreteAnchor: 'the faint microwave glow arriving from every direction of the sky at once',
    plainExplanation:
      'Distant galaxies recede from us, and the further away they are the faster they go — in every '
      + 'direction. That is not us sitting at a centre; it is what expansion looks like from any point in '
      + 'it, since every observer everywhere sees the same thing. Running it backwards gives a hot dense '
      + 'beginning, and that prediction can be checked. When the universe had cooled enough for atoms to '
      + 'form, the light then present was set free, and it has been stretching ever since. It arrives '
      + 'today as a faint microwave glow from every direction, at the temperature the theory predicted '
      + 'before it was found.',
    antiAnalogy: {
      tempting: 'imagining an explosion at a particular point, with galaxies flying outward through space',
      whyItFails:
        'an explosion has a centre and an edge, and the glow arrives equally from every direction with no '
        + 'sign of either. What expands is space between the galaxies, not the galaxies rushing through '
        + 'it — which is also why distant ones can recede faster than light without anything overtaking a '
        + 'light beam.',
    },
    microCheck: 'The microwave glow arrives equally from every direction. What would an explosion at a point have produced instead?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.astro.dark-matter',
    subject: 'physics',
    canonicalIdea: 'Two separate observations require far more gravitating matter than we can see, and a repulsive effect driving the expansion faster — and neither is understood.',
    concreteAnchor: 'a galaxy whose outer stars orbit as fast as its inner ones',
    plainExplanation:
      'Stars in the outskirts of a galaxy should orbit more slowly than the inner ones, the way outer '
      + 'planets do. They do not — the speed stays roughly flat far out, which means far more mass than '
      + 'the visible stars provide, distributed well beyond them. The same conclusion arrives '
      + 'independently from how clusters bend light and from the pattern in the microwave glow. Separately, '
      + 'measurements of distant supernovae showed the expansion is not slowing under gravity but '
      + 'speeding up, which requires something else again. Both are named for what we do not know about '
      + 'them, and neither name is an explanation.',
    antiAnalogy: {
      tempting: 'treating dark matter as ordinary matter that is simply too faint to see',
      whyItFails:
        'ordinary matter that dim would still absorb and scatter light from behind it, and the amount '
        + 'needed is ruled out by how much helium the early universe produced. Whatever it is, it '
        + 'interacts gravitationally and essentially not otherwise.',
    },
    microCheck: 'Outer stars in a galaxy orbit as fast as inner ones. What does that require?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.astro.black-holes',
    subject: 'physics',
    canonicalIdea: 'A black hole is a region from which no path leads outward, bounded by a surface that is not made of anything.',
    concreteAnchor: 'stars orbiting an invisible object at the centre of our galaxy, tracked for decades',
    plainExplanation:
      'Concentrate enough mass in a small enough region and the curvature of spacetime becomes so extreme '
      + 'that every path leading away from the centre curves back in — including the paths light would '
      + 'take. The boundary of that region is the horizon. It is not a wall or a surface of any material; '
      + 'nothing marks it locally, and an infalling observer crosses it without noticing. Its radius '
      + 'depends only on the mass. At the centre of our galaxy, stars have been tracked for decades '
      + 'orbiting something with millions of times the Sun\'s mass and no light of its own.',
    antiAnalogy: {
      tempting: 'thinking of it as a cosmic vacuum cleaner that sucks in everything nearby',
      whyItFails:
        'at a distance its gravity is exactly that of any object of the same mass. Replace the Sun with a '
        + 'black hole of the Sun\'s mass and Earth\'s orbit would not change at all — it would only go '
        + 'dark. Falling in requires getting close, and nothing does the pulling that ordinary gravity '
        + 'would not.',
    },
    microCheck: 'Swapping the Sun for a black hole of the same mass leaves Earth\'s orbit unchanged. What does that tell you about its pull?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
  },
  {
    conceptId: 'phys.astro.gravitational-waves',
    subject: 'physics',
    canonicalIdea: 'Accelerating masses send ripples through spacetime itself, which stretch and squeeze everything they pass through.',
    concreteAnchor: 'detector arms four kilometres long, changing length by a fraction of a proton\'s width',
    plainExplanation:
      'A mass that accelerates unevenly sends out ripples in the geometry of spacetime, travelling at the '
      + 'speed of light. As one passes, distances stretch slightly in one direction and squeeze in the '
      + 'perpendicular one, then reverse. The effect is almost unimaginably small: the strongest events '
      + 'known — two black holes spiralling together — change the length of a four-kilometre detector arm '
      + 'by a fraction of the width of a proton. Measuring that was done by bouncing laser light along two '
      + 'perpendicular arms and watching for the difference. The first detection came in 2015, a century '
      + 'after the prediction.',
    antiAnalogy: {
      tempting: 'picturing them as waves travelling through space, the way sound moves through air',
      whyItFails:
        'there is no medium being disturbed. What oscillates is the separation between things — the '
        + 'geometry itself — which is why a detector measures its own arms changing length rather than '
        + 'something arriving and pushing on them.',
    },
    microCheck: 'The detector measures its own arms changing length. What is passing through, if not something in a medium?',
    ...OWNER_PROMOTED_PHYSICS_TESTING,
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
  /**
   * EVERY graded-correct answer this concept, at whatever rung it was given.
   *
   * MEASURED (phys.mech.friction, 2026-09-01, real account, studied as a
   * learner). The learner answered an authored probe CORRECTLY —
   * `[mcq-grade] chosen: 0, correct: true` — and the reply they received was
   * the curated card, verbatim, for the second time in three turns:
   *
   *   [remediation-floor] { heldOnCard: true, violation: 'went-beyond-card' }
   *   [remediation-card]  { remediationSource: 'CURATED_CARD', mode: 'hold' }
   *   [remediation-floor] repaired { accepted: false, usedHeldCard: true }
   *
   * The server REPLACED the turn with the held card, over the top of a
   * correct answer.
   *
   * WHY THE HOLD DID NOT RELEASE: it read only the two mastery counters, and
   * that answer was given at GUIDE, where the ladder advances the rung and
   * credits no counter — BY DESIGN, because hollow-advancement protection
   * lives at the gates. So `correctAtCheck + correctAtPractice` stayed 0 and
   * the window stayed open while the learner was demonstrably not stuck.
   *
   * `correctAnswersTotal` exists for exactly this question, and its own
   * documentation describes this identical dead-end for a DIFFERENT reader:
   * "a learner who answers correctly at GUIDE advances the ladder, earns no
   * gate credit BY DESIGN, and is then denied the very extension written for
   * them because their credit is zero." Same trap, one function over.
   *
   * Reading it here cannot weaken the mastery bar: this window gates whether
   * a card is re-served, never whether a lesson certifies. The gates still
   * read only the two counters, untouched.
   *
   * Optional, defaulting to 0, so a snapshot written before the field existed
   * behaves exactly as before.
   */
  correctAnswersTotal?: number
}

export function remediationWindowOpen(input: RemediationWindowInput): boolean {
  try {
    if (!input || input.cardServed !== true) return false
    const check = input.correctAtCheck
    const practice = input.correctAtPractice
    // A counter that cannot be read is not evidence of confusion — it is no
    // evidence at all, and a hold must not open on a malformed snapshot.
    if (!Number.isFinite(check) || !Number.isFinite(practice)) return false
    if (check + practice > 0) return false
    // ANY graded-correct answer closes the window, at whatever rung. See
    // `correctAnswersTotal` above for the measured failure this repairs.
    // Read defensively: a malformed value is not evidence of anything, and
    // must not close a hold that should stay open.
    const total = input.correctAnswersTotal
    if (typeof total === 'number' && Number.isFinite(total) && total > 0) return false
    return true
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

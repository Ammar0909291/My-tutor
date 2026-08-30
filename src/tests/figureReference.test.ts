/**
 * The captured turn is the test.
 *
 * `PRIME_NUMBER_TURN` below is verbatim tutor output from a real lesson on the
 * test learner's account (math.nt.prime-number, 2026-08-18), on a turn that
 * carried no visual, no visualSpec and no sceneSpec. The learner was told twice
 * to read a number line that did not exist and then asked a question about it.
 */
import { describe, it, expect } from 'vitest'
import { stripUnbackedFigureReferences } from '@/lib/teaching/figureReference'

const PRIME_NUMBER_TURN = `Look at the number line displayed on your screen, which highlights the numbers 2, 3, 5, 7, 11, and 13.

Notice how these specific numbers cannot be formed by multiplying smaller whole numbers together (except for 1 times themselves), making them the fundamental building blocks of all other positive integers.

claudeTest, look at the highlighted points on the number line — why can't the number 2 be divided evenly into any smaller equal groups other than 1 and 2?`

describe('the captured production turn', () => {
  const r = stripUnbackedFigureReferences(PRIME_NUMBER_TURN, false)

  it('strips both references to the figure that was never attached', () => {
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/on your screen/i)
    expect(r.text).not.toMatch(/look at the highlighted points/i)
    expect(r.removed).toHaveLength(2)
  })

  it('KEEPS the question — the learner is still asked what they were asked', () => {
    expect(r.text).toMatch(/why can't the number 2 be divided evenly/i)
    expect(r.text.trim().endsWith('?')).toBe(true)
  })

  it('keeps the teaching paragraph, which never mentioned a figure', () => {
    expect(r.text).toContain('fundamental building blocks of all other positive integers')
  })

  it('leaves the turn alone when the figure IS attached', () => {
    const withFigure = stripUnbackedFigureReferences(PRIME_NUMBER_TURN, true)
    expect(withFigure.stripped).toBe(false)
    expect(withFigure.text).toBe(PRIME_NUMBER_TURN)
  })
})

describe('what it must not touch', () => {
  it('leaves ordinary teaching prose alone', () => {
    const t = 'A prime number has exactly two divisors: 1 and itself. Notice that 1 fails this test.'
    expect(stripUnbackedFigureReferences(t, false).stripped).toBe(false)
  })

  it('does not fire on "notice" without a figure noun', () => {
    const t = 'Notice how these numbers cannot be formed by multiplying smaller whole numbers.'
    expect(stripUnbackedFigureReferences(t, false).text).toBe(t)
  })

  it('never removes a question, even one that mentions a figure', () => {
    const t = 'What does the diagram on your screen tell you about the slope?'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.text).toContain('?')
  })

  it('never returns an empty turn when the reference was the whole message', () => {
    const t = 'Look at the diagram on your screen.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.text.trim().length).toBeGreaterThan(0)
    expect(r.stripped).toBe(false)
  })

  it('is idempotent', () => {
    const once = stripUnbackedFigureReferences(PRIME_NUMBER_TURN, false)
    const twice = stripUnbackedFigureReferences(once.text, false)
    expect(twice.text).toBe(once.text)
    expect(twice.stripped).toBe(false)
  })

  it('never throws, whatever it is handed', () => {
    for (const bad of [null, undefined, 42, {}, []]) {
      expect(() => stripUnbackedFigureReferences(bad as unknown as string, false)).not.toThrow()
    }
  })

  it('does not mangle a dash used for ordinary emphasis', () => {
    const t = 'A prime — unlike a composite — has exactly two divisors.'
    expect(stripUnbackedFigureReferences(t, false).text).toBe(t)
  })
})

/**
 * The interaction that nearly shipped a regression.
 *
 * `visualFired` is false on a CONTINUITY turn: the figure was introduced by an
 * earlier message and is deliberately not re-attached to this one, yet it IS on
 * the learner's screen and the visual-contract block tells the model its prose
 * may refer to it. Keying the repair on `visualFired` alone would have stripped
 * a TRUE reference on every held turn.
 *
 * The route now passes `visualFired || session.turns > 0`. These pin the
 * behaviour the caller must preserve.
 */
describe('a held figure is still a figure', () => {
  const HELD_TURN =
    'Look at the circuit on your screen — what happens to the current when the ' +
    'second resistor is added?'

  it('leaves the reference intact when a figure is on screen, however it got there', () => {
    const r = stripUnbackedFigureReferences(HELD_TURN, true)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(HELD_TURN)
  })

  it('the route must not ask "did THIS message send a figure" — only "is one on screen"', () => {
    const fs = require('fs') as typeof import('fs')
    const route = fs.readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')
    // The call site passes a computed on-screen flag, never the bare fired flag.
    expect(route).toMatch(/stripUnbackedFigureReferences\(cleanText,\s*figureOnScreen\)/)
    expect(route).toMatch(/visualFired \|\| \(visualDecisionHoisted\?\.session\?\.turns \?\? 0\) > 0/)
  })
})

/**
 * The second production run — two turns the first version of this repair missed
 * or mangled. Both verbatim from certification runs on the test learner.
 */
describe('second production run', () => {
  const WORKED_EXAMPLE = `Yes — parentheses always take top priority because they act like a spotlight.

Let's look at a complete worked example on your screen using the expression (2 + 3)^2 div 5 - 1. First, we evaluate inside the parentheses: 2 + 3 gives us 5.

claudeTest, look at the worked example — what happens if we ignore the parentheses?`

  const INTERRUPTING_CLAUSE = `A natural number greater than 1 whose only positive divisors are 1 and itself is called a prime number.

When we look at the numbers highlighted on the number line on your screen—2, 3, 5, 7, 11, and 13—each of these numbers can only be divided evenly by 1 and by itself.

What is the only even prime number?`

  it('catches "worked example on your screen" — a weak noun with a locator', () => {
    const r = stripUnbackedFigureReferences(WORKED_EXAMPLE, false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/on your screen/i)
  })

  it('still keeps the question and the teaching around it', () => {
    const r = stripUnbackedFigureReferences(WORKED_EXAMPLE, false)
    expect(r.text).toMatch(/what happens if we ignore the parentheses\?/i)
    expect(r.text).toMatch(/parentheses always take top priority/i)
  })

  it('never leaves a sentence starting mid-thought', () => {
    const r = stripUnbackedFigureReferences(INTERRUPTING_CLAUSE, false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/on your screen/i)
    // The old repair left "2, 3, 5, 7, 11, and 13—each of these numbers…".
    for (const line of r.text.split('\n')) {
      const t = line.trim()
      if (t.length > 0) expect(t[0]).toMatch(/[A-Za-z*_]/)
    }
  })

  it('a weak noun WITHOUT a locator is prose, not a figure', () => {
    const t = 'Look at this example — 3 + 4 × 2. What do you do first?'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('"here is a table of values" in prose is untouched without a locator', () => {
    const t = 'Consider the steps we just used to simplify the expression.'
    expect(stripUnbackedFigureReferences(t, false).stripped).toBe(false)
  })
})

/**
 * The opening turn lives behind a DIFFERENT endpoint, and that is how it was
 * missed. `/api/learn/lesson-init` has no visual pipeline at all — no
 * visualFired, no sceneSpec, no responseVisual — so its message is structurally
 * incapable of carrying a figure, whatever the model writes.
 */
/**
 * The third production run — a bare "look at the diagram" with NO on-screen
 * locator, captured on math.found.problem-solving-strategies, 2026-08-22.
 * `isPointer` required ON_SCREEN even for a STRONG noun, which `namesAFigure`
 * itself does not — this is the gap DIRECT_POINTER_RE closes.
 */
describe('third production run — no locator at all', () => {
  const PUZZLE_TURN = `Imagine a jigsaw puzzle that you're about to assemble. You have a bag of 12 small, square pieces that need to fit together to reveal a picture.

This act of placing the puzzle pieces on a table is a concrete example of the draw a diagram strategy. It turns an abstract idea into a visible arrangement that you can examine, adjust, and use to answer the question. When you look at the diagram, you can count rows, columns, and even spot missing pieces, all without doing any calculations on paper.

So, drawing a diagram lets you see the structure of a problem at a glance, revealing patterns and relationships that are hard to spot otherwise.`

  it('strips the bare pointer with no locator', () => {
    const r = stripUnbackedFigureReferences(PUZZLE_TURN, false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/when you look at the diagram/i)
  })

  it('keeps the surrounding teaching content — the whole POINTER sentence goes, not the paragraph', () => {
    const r = stripUnbackedFigureReferences(PUZZLE_TURN, false)
    // Shape 1 drops the WHOLE sentence it fires on (documented behaviour,
    // identical to the existing PRIME_NUMBER_TURN case) — "count rows,
    // columns" lived only inside the stripped sentence and goes with it.
    // What must survive is every OTHER sentence in the turn.
    expect(r.text).toContain('draw a diagram strategy')
    expect(r.text).toContain('drawing a diagram lets you see the structure')
  })

  it('leaves it alone when a figure genuinely is attached', () => {
    const r = stripUnbackedFigureReferences(PUZZLE_TURN, true)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(PUZZLE_TURN)
  })

  // Embedded in a multi-sentence paragraph, matching the "never hand back an
  // empty turn" guard that a single-sentence message would otherwise trip
  // (see 'never returns an empty turn when the reference was the whole
  // message' above) — these variants prove DIRECT_POINTER_RE fires without
  // an on-screen locator, not that a bare one-line message gets emptied.
  for (const [label, sentence] of [
    ['look at the diagram', 'Now, look at the diagram to see how the pieces connect. This is the key step.'],
    ['see the figure', 'Next, see the figure and count how many sides it has. That count matters.'],
    ['notice the chart', 'Now notice the chart before we continue. It will guide the next step.'],
    ['examine the graph', 'Let us examine the graph together. Then we will discuss what it shows.'],
    ['study the picture', 'Study the picture for a moment. Afterward, tell me what you noticed.'],
  ] as const) {
    it(`catches the natural variant: "${label}"`, () => {
      const r = stripUnbackedFigureReferences(sentence, false)
      expect(r.stripped).toBe(true)
    })
  }

  it('NEGATIVE CONTROL: ordinary strategy prose about diagrams is untouched', () => {
    const t = 'When learners draw a diagram, they can see relationships more clearly than in words alone.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('NEGATIVE CONTROL: "consider the strategy" is not a figure reference', () => {
    const t = 'Consider the strategy of drawing a diagram whenever a problem feels abstract.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('NEGATIVE CONTROL: a question naming a diagram is still never removed', () => {
    const t = 'What would you look at the diagram for, if you wanted to count the rows?'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.text).toContain('?')
  })

  it('a genuinely attached figure keeps a bare "look at the diagram" reference', () => {
    const t = 'Now look at the diagram and count the rows.'
    const r = stripUnbackedFigureReferences(t, true)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('is idempotent on the new shape', () => {
    const once = stripUnbackedFigureReferences(PUZZLE_TURN, false)
    const twice = stripUnbackedFigureReferences(once.text, false)
    expect(twice.text).toBe(once.text)
    expect(twice.stripped).toBe(false)
  })
})

describe('the opening turn', () => {
  const OPENING = `Let's look at the numbers displayed on your screen: the highlighted points are 2, 3, 5, 7, 11, and 13. Each of these can only be divided evenly by 1 and itself.`

  it('strips the reference the harness captured on the first turn of a lesson', () => {
    const r = stripUnbackedFigureReferences(OPENING, false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/on your screen/i)
    expect(r.text).toMatch(/divided evenly by 1 and itself/i)
  })

  it('lesson-init applies it, and can only ever pass false', () => {
    const fs = require('fs') as typeof import('fs')
    const route = fs.readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf-8')
    expect(route).toMatch(/stripUnbackedFigureReferences\(routed\.text,\s*false\)/)
    // That endpoint has no visual pipeline, which is WHY false is unconditional.
    // Asserted as code rather than prose — the first version of this check
    // matched the word inside the comment above the call and failed on itself.
    expect(route).not.toMatch(/(?:const|let|var)\s+visualFired/)
    expect(route).not.toMatch(/detectedSceneSpec\s*=/)
  })
})

/**
 * The fourth production run — a substantive PREPOSED POINTER CLAUSE, captured
 * live on a Newton's Third Law turn, 2026-08-22, on a turn with no visual, no
 * visualSpec and no sceneSpec attached:
 *
 *     "In the picture on your screen you can see gravity pulling on an
 *      object and the normal force pushing upward on that same object—those
 *      two are action-reaction partners acting on the object and the Earth,
 *      respectively, even though they're drawn together."
 *
 * Distinct from the third production run above (a bare "look at the
 * diagram" with no locator) and from the original captured turn (whose
 * clause happens to contain a POINTING_VERB before its dash): this shape's
 * pointer clause is introduced by a PREPOSITION ("In the picture on your
 * screen"), and the verb that follows it varies — "you can see", "is
 * shown", or none at all ("shown above") — so a detector keyed only to
 * POINTING_VERB misses most of the family. See PREPOSED_LOCATOR_RE and
 * findPointerClauseHead in figureReference.ts for the fix.
 */
describe('fourth production run — a preposed pointer clause', () => {
  const CAPTURED_TURN = `Newton's Third Law says that every action has an equal and opposite reaction force.

In the picture on your screen you can see gravity pulling on an object and the normal force pushing upward on that same object—those two are action-reaction partners acting on the object and the Earth, respectively, even though they're drawn together.

Can you think of another everyday example of this principle?`

  it('strips the exact captured production sentence', () => {
    const r = stripUnbackedFigureReferences(CAPTURED_TURN, false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/in the picture on your screen/i)
    expect(r.text).not.toMatch(/you can see gravity pulling/i)
  })

  it('keeps the teaching content on either side of the removed clause', () => {
    const r = stripUnbackedFigureReferences(CAPTURED_TURN, false)
    expect(r.text).toMatch(/equal and opposite reaction force/i)
    expect(r.text).toMatch(/action-reaction partners/i)
    expect(r.text).toMatch(/another everyday example/i)
  })

  it('never leaves a sentence starting mid-thought', () => {
    const r = stripUnbackedFigureReferences(CAPTURED_TURN, false)
    for (const line of r.text.split('\n')) {
      const t = line.trim()
      if (t.length > 0) expect(t[0]).toMatch(/[A-Za-z*_]/)
    }
  })

  it('leaves the turn byte-identical when a figure genuinely is attached', () => {
    const r = stripUnbackedFigureReferences(CAPTURED_TURN, true)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(CAPTURED_TURN)
  })

  it('is idempotent', () => {
    const once = stripUnbackedFigureReferences(CAPTURED_TURN, false)
    const twice = stripUnbackedFigureReferences(once.text, false)
    expect(twice.text).toBe(once.text)
    expect(twice.stripped).toBe(false)
  })

  // Every construction the task specifically named, each embedded in a real
  // multi-sentence turn (a lone sentence trips the "never empty" guard,
  // which is its own already-tested behaviour, not this shape's).
  const wrap = (sentence: string) =>
    `Let's talk about forces.\n\n${sentence}\n\nWhat else acts in pairs like this?`

  for (const [label, sentence] of [
    [
      'em dash, no POINTING_VERB at all ("shown above")',
      'In the diagram shown above—gravity pulls down and the normal force pushes up—these are action-reaction partners.',
    ],
    [
      'comma, passive "is shown"',
      'In the diagram on your screen, gravity is shown pulling on the block and the normal force is pushing up on it, and these two are action-reaction partners.',
    ],
    [
      'comma, "you can see"',
      'In the figure shown above, you can see gravity pulling down and the normal force pushing up, and these are action-reaction pairs.',
    ],
    [
      'conjunction after the pointer clause',
      'In the picture on your screen you can see gravity pulling down and the normal force pushing up, and these are action-reaction pairs acting on different bodies.',
    ],
    [
      'longer pointer clause with substantive content before the boundary',
      'In the picture on your screen you can see gravity pulling on an object and the normal force pushing upward on that same object, and those two are action-reaction partners.',
    ],
  ] as const) {
    it(`catches: ${label}`, () => {
      const turn = wrap(sentence)
      const r = stripUnbackedFigureReferences(turn, false)
      expect(r.stripped).toBe(true)
      // THE INVARIANT: no sentence left behind may claim a specific figure
      // is present or visible — a figure noun co-occurring with an
      // on-screen locator, in any surviving sentence, is exactly that claim.
      for (const line of r.text.split(/\n+/)) {
        if (!line.trim()) continue
        const namesFigureWithLocator =
          /\b(diagram|figure|picture|image|chart|number ?line|animation|illustration|visual|simulation|plot|sketch|graph)\b/i.test(
            line,
          ) && /\b(on (?:your|the) screen|displayed|shown (?:above|below|here)?)\b/i.test(line)
        expect(namesFigureWithLocator).toBe(false)
      }
      // The classification survives — it is never the false part of the claim.
      expect(r.text).toMatch(/action-reaction/i)
      // The rest of the turn is untouched.
      expect(r.text).toMatch(/let's talk about forces/i)
      expect(r.text).toMatch(/what else acts in pairs/i)
    })

    it(`leaves it alone when a figure genuinely is attached: ${label}`, () => {
      const turn = wrap(sentence)
      const r = stripUnbackedFigureReferences(turn, true)
      expect(r.stripped).toBe(false)
      expect(r.text).toBe(turn)
    })
  }

  it('NEGATIVE CONTROL: ordinary prose about diagrams is untouched', () => {
    for (const t of [
      'Diagrams are useful for organizing information.',
      'A picture is one way to represent the idea.',
      'Students can draw a graph to compare values.',
      'When you draw a diagram, relationships become easier to see.',
    ]) {
      const r = stripUnbackedFigureReferences(t, false)
      expect(r.stripped).toBe(false)
      expect(r.text).toBe(t)
    }
  })

  it('NEGATIVE CONTROL: a conceptual mention of "in the diagram" without an on-screen locator is untouched', () => {
    const t = 'In the diagram, arrows usually represent force direction and magnitude.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('NEGATIVE CONTROL: an ordinary opener that is not about a figure at all is untouched', () => {
    const t = 'On the other hand, some students prefer working through the algebra directly.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('NEGATIVE CONTROL: a question about a diagram that does not claim one is present is untouched', () => {
    const t = 'Would a diagram help you understand this better?'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toContain('?')
  })

  it('NEGATIVE CONTROL: ordinary teaching prose with an em dash, no figure claim, is untouched', () => {
    const t = "Force is a vector—it has both magnitude and direction."
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('NEGATIVE CONTROL: generic strategy prose using "see" and "diagram" across a comma is untouched', () => {
    // The exact shape that regressed while building this fix: a comma
    // boundary let a POINTING_VERB and a figure noun co-occur in the same
    // "head" purely by coincidence, with no on-screen claim anywhere.
    const t =
      'So, drawing a diagram lets you see the structure of a problem at a glance, revealing patterns and relationships that are hard to spot otherwise.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('does not mangle a hyphenated compound word into a false clause boundary', () => {
    // The bug this fix's dash-boundary correction closes: "action-reaction"
    // is not a clause boundary, and must never be read as one.
    const t =
      'In the figure shown above, you can see gravity pulling down and the normal force pushing up, and these are action-reaction pairs.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.text).not.toMatch(/^reaction pairs\.?$/i)
    expect(r.text).toMatch(/action-reaction pairs/i)
  })

  it('a genuine whitespace-bounded hyphen still counts as a clause boundary', () => {
    const t = 'Look at the diagram on your screen - it shows two forces in equilibrium.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/on your screen/i)
    expect(r.text).toMatch(/it shows two forces in equilibrium/i)
  })

  it('a leading vocative before the real pointer clause still finds the clause after it', () => {
    // Regression guard: adding comma as a boundary type must not stop the
    // search at an early, irrelevant comma (e.g. a name) when the real
    // pointer clause sits after a later dash.
    const t =
      "claudeTest, in the diagram on your screen you can see the two forces — which one is larger?"
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.text).toContain('?')
  })

describe('visibility deixis with no figure attached (chem.bond.resonance, 2026-08-28)', () => {
  it('strips "Here you see …" and keeps the content that follows', () => {
    const t = 'Here you see a central nitrogen atom bonded to three oxygens. Each structure has one double bond.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/here you see/i)
    expect(r.text).toMatch(/central nitrogen atom bonded to three oxygens/i)
    expect(r.text).toMatch(/each structure has one double bond/i)
  })

  it('strips a leading "As you can see," claim', () => {
    const r = stripUnbackedFigureReferences('As you can see, momentum is conserved but kinetic energy is not.', false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/as you can see/i)
    expect(r.text).toMatch(/momentum is conserved/i)
  })

  it('LEAVES the deixis intact when a figure IS attached — the claim is true then', () => {
    const t = 'Here you see a central nitrogen atom bonded to three oxygens.'
    const r = stripUnbackedFigureReferences(t, true)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('does NOT touch ordinary teaching prose that never claims a figure', () => {
    for (const t of [
      'Notice that the pattern repeats every three terms.',
      'We get the same answer either way.',
      'You can think of it as a seesaw balancing.',
    ]) {
      const r = stripUnbackedFigureReferences(t, false)
      expect(r.stripped).toBe(false)
      expect(r.text).toBe(t)
    }
  })

  it('drops a claim-only sentence rather than leaving a bare fragment', () => {
    const r = stripUnbackedFigureReferences('Here you see it. The bond length is equal all around.', false)
    expect(r.text).not.toMatch(/^it\.?/i)
    expect(r.text).toMatch(/bond length is equal all around/i)
  })

  it('never removes a question', () => {
    const t = 'What do you see here?'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.text).toBe(t)
  })
})


describe('figure-noun subject claim with no figure (chem.bond.resonance T3, 2026-08-28)', () => {
  it('drops "The diagram shows …" and keeps the sentence that follows', () => {
    const t = 'The diagram shows nitrogen in the center with three oxygens around it. Each of the three resonance structures has a different double bond and charge distribution.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/the diagram shows/i)
    expect(r.text).toMatch(/each of the three resonance structures/i)
  })

  it('drops "This figure illustrates …"', () => {
    const r = stripUnbackedFigureReferences('This figure illustrates the two forces. They cancel out.', false)
    expect(r.stripped).toBe(true)
    expect(r.text).toBe('They cancel out.')
  })

  it('does NOT strip the idiom "figure of speech"', () => {
    const t = 'The figure of speech we call a metaphor is powerful. It adds colour to writing.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('does NOT strip an abstract graph reference (graph is excluded)', () => {
    const t = 'The graph is a parabola with vertex at the origin. Notice the symmetry.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('does NOT strip a general statement about diagrams', () => {
    const t = 'A diagram can help you see the structure. Try drawing one.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })

  it('LEAVES the claim intact when a figure IS attached', () => {
    const t = 'The diagram shows the water cycle from evaporation to rain.'
    const r = stripUnbackedFigureReferences(t, true)
    expect(r.stripped).toBe(false)
    expect(r.text).toBe(t)
  })
})

})

describe('an embedded locator — "the histogram in the figure"', () => {
  // Owner-reported from a live second-law lesson, 2026-08-30. No figure was
  // attached and two turns asked about one anyway.
  const Q1 = 'Which part of the histogram in the figure shows which outcome is most likely?'
  const Q2 = 'What do you notice about the shape of the histogram in the figure?'

  it('removes the false claim and keeps the question', () => {
    const r = stripUnbackedFigureReferences(Q1, false)
    expect(r.stripped).toBe(true)
    expect(r.text).toBe('Which part of the histogram shows which outcome is most likely?')
    expect(r.text).not.toMatch(/in the figure/i)
  })

  it('handles the second captured turn the same way', () => {
    expect(stripUnbackedFigureReferences(Q2, false).text)
      .toBe('What do you notice about the shape of the histogram?')
  })

  it('does NOT fire when a figure IS attached — the reference is then true', () => {
    for (const q of [Q1, Q2]) {
      const r = stripUnbackedFigureReferences(q, true)
      expect(r.stripped).toBe(false)
      expect(r.text).toBe(q)
    }
  })

  it('leaves a SENTENCE-OPENING locator to the rules that already handle it', () => {
    // The regression the lookbehind exists for: without it, removing "In the
    // figure" left "you can see one bar…", which is worse than the input
    // because the visibility-deixis rule is anchored per sentence.
    const t = 'The tallest bar is the outcome that shows up most often. '
      + 'In the figure you can see one bar that stands out— that is the most probable macrostate.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.text).toContain('The tallest bar is the outcome that shows up most often.')
    expect(r.text).not.toMatch(/^you can see|\. you can see/)
    // The pointing clause goes; the teaching after it survives, re-capitalised
    // by the existing clause handling.
    expect(r.text).toContain('That is the most probable macrostate')
  })

  it('is idempotent', () => {
    const once = stripUnbackedFigureReferences(Q1, false)
    const twice = stripUnbackedFigureReferences(once.text, false)
    expect(twice.text).toBe(once.text)
  })

  it('does not eat a FUTURE figure — the reference is not a claim one exists', () => {
    // Caught by this test before shipping: the first version produced
    // "Draw the forces you are about to make", which is worse than the input.
    // A relative clause opening on a pronoun marks the hypothetical reading.
    for (const t of [
      'Draw the forces in the diagram you are about to make.',
      'Label the axes on the graph we will build together.',
      'A histogram in statistics groups values into bins.',
      'The figure of speech here is a metaphor.',
    ]) {
      expect(stripUnbackedFigureReferences(t, false).text).toBe(t)
    }
  })
})

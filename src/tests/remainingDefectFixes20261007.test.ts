/**
 * The last code-fixable defects from the real-learner logs (2026-10-07 pass):
 * lesson drift (CHEM-133 / BIO-023 / CHEM-073), a verdict on "ok" (CHEM-031),
 * praise for a corrected answer (CHEM-103), a dropped title word (CHEM-047),
 * process-flow lists (CHEM-083), the electroplating label (CHEM-092), one
 * analogy for every subject (CHEM-040 / CHEM-055), lesson scope (CHEM-042),
 * authored teaching during an outage (CHEM-101 / CHEM-107 / MATH-006 /
 * BIO-008) and the dashboard at phone width (CHEM-100). Strings are the
 * replies the runs actually received.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { isOffLesson, conceptAnchors, mentionsConcept, isContinuationMessage, lessonScopeRule } from '@/lib/teaching/lessonDriftGuard'
import { dropVerdictOnUngradedRequest, isPlainAcknowledgement, dropPraiseOfCorrectedAnswer, restoreTitleWords } from '@/lib/teaching/replyHygiene'
import { processFlowIsAList } from '@/lib/teaching/visual/figureCritic'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const INIT = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')
const CRYSTAL = { title: 'Crystal Systems', description: "Seven crystal systems; Bravais lattices; unit cells; Bragg's law (qualitative)." }
const REPRO = { title: 'Human Reproductive System', description: 'Male and female reproductive anatomy; gametogenesis — spermatogenesis and oogenesis; menstrual cycle and hormonal regulation.' }

describe('lesson drift (CHEM-133 / BIO-023)', () => {
  it('a reply to "ok" about metallic bonding in Crystal Systems is off the lesson', () => {
    expect(isOffLesson({
      learnerMessage: 'ok',
      reply: 'Metallic bonding is the attraction that holds metal atoms together in a solid. The atoms give up their outer electrons to a shared sea of electrons that can move freely through the metal, which is why metals conduct.',
      conceptTitle: CRYSTAL.title, conceptDescription: CRYSTAL.description,
    })).toBe(true)
  })
  it('stress-timed English rhythm in Human Reproduction is off the lesson', () => {
    expect(isOffLesson({
      learnerMessage: 'give me example',
      reply: 'Imagine you’re listening to the sentence “The cat chased the mouse.” In English stress‑timed rhythm, the beats fall on the stressed syllables, so cat, chased and mouse land on the beat while the others squeeze in.',
      conceptTitle: REPRO.title, conceptDescription: REPRO.description,
    })).toBe(true)
  })
  it('a reply about unit cells is on the lesson', () => {
    const reply = 'A cubic crystal has three equal edges at right angles. Sodium chloride is a good example: its unit cell repeats in all three directions, and the lattice points sit at the corners and face centres of each cube.'
    expect(isOffLesson({ learnerMessage: 'ok', reply, conceptTitle: CRYSTAL.title, conceptDescription: CRYSTAL.description })).toBe(false)
    expect(mentionsConcept(reply, conceptAnchors(CRYSTAL.title, CRYSTAL.description))).toBe(true)
  })
  it('only continuation messages are checked; a learner question may change topic', () => {
    expect(isContinuationMessage('next question please')).toBe(true)
    expect(isContinuationMessage('maybe yes?')).toBe(true)
    expect(isContinuationMessage('how is this related to metallic bonding?')).toBe(false)
    expect(isOffLesson({ learnerMessage: 'how does metallic bonding work?', reply: 'Metallic bonding is the attraction that holds metal atoms together in a solid, with a sea of shared electrons moving freely through the whole metal lattice of ions.', conceptTitle: CRYSTAL.title, conceptDescription: CRYSTAL.description })).toBe(false)
  })
  it('the route regenerates once with the lesson stated and keeps it only on the lesson', () => {
    expect(ROUTE).toMatch(/dg\.isOffLesson\(/)
    expect(ROUTE).toMatch(/regenerateWithAppendix\(dg\.stayOnLessonAppendix\(/)
    expect(ROUTE).toMatch(/\[lesson-drift\]/)
  })
})

describe('lesson scope (CHEM-042 / CHEM-073)', () => {
  it('the syllabus line is in the chat and opening prompts', () => {
    expect(lessonScopeRule('Emulsions and Gels', 'Emulsions; gels; sol–gel transitions.')).toMatch(/Teach every part of that list/)
    expect(lessonScopeRule(null, 'x')).toBe('')
    expect(ROUTE).toMatch(/lessonScopeRule\(/)
    expect(INIT).toMatch(/lessonScopeRule\(/)
  })
})

describe('a verdict on "ok" (CHEM-031)', () => {
  it('"ok" answers nothing; "yes" may answer a yes/no question', () => {
    expect(isPlainAcknowledgement('ok')).toBe(true)
    expect(isPlainAcknowledgement('next question please')).toBe(true)
    expect(isPlainAcknowledgement('yes')).toBe(false)
  })
  it('a leading name no longer hides the verdict', () => {
    const r = dropVerdictOnUngradedRequest("test2, that's correct—iron fills the 3d subshell, which is an n minus 1 shell compared to its period number 4. Let's look at how the periodic table is organized into blocks, from s to p to d to f.")
    expect(r.dropped).toMatch(/^test2, that's correct/)
    expect(r.text).toMatch(/^Let's look at how the periodic table/)
  })
  it('the route treats a plain acknowledgement as a turn that graded nothing', () => {
    expect(ROUTE).toMatch(/hy\.isPlainAcknowledgement\(learnerAuthoredMessage\)/)
  })
})

describe('praise for a corrected answer (CHEM-103)', () => {
  it('the praising sentence and its "solid start" go; the teaching stays', () => {
    const r = dropPraiseOfCorrectedAnswer(
      'I hear you—let’s take a moment. You’ve already written the basic rate‑law expression `rate = k[A][B]`, which is exactly the correct form for a reaction that is first order in each reactant. That’s a solid start! Now, the exponents come from experiment, not from the coefficients of the balanced equation.',
      ['rate = k[A][B]'],
    )
    expect(r.dropped).toHaveLength(2)
    expect(r.text).not.toMatch(/correct form|solid start/)
    expect(r.text).toMatch(/exponents come from experiment/)
  })
  it('a quote without praise, or praise for something else, stays', () => {
    const t = 'Your answer rate = k[A][B] treats each order as one, but the data show [A] doubling quadruples the rate. So the order in A is two.'
    expect(dropPraiseOfCorrectedAnswer(t, ['rate = k[A][B]']).dropped).toHaveLength(0)
    expect(dropPraiseOfCorrectedAnswer(t, []).dropped).toHaveLength(0)
  })
})

describe('a dropped title word (CHEM-047)', () => {
  it('"van Waals" becomes "van der Waals" from the lesson title', () => {
    const r = restoreTitleWords("**Real Gases and the van Waals Equation** – In this lesson we'll learn the van Waals equation.", 'Real Gases and van der Waals Equation')
    expect(r.repaired).toBe(true)
    expect(r.text).not.toMatch(/van Waals/)
    expect((r.text.match(/van der Waals/g) ?? []).length).toBe(2)
  })
  it('text already right, or a different title, is untouched', () => {
    const ok = 'The van der Waals equation corrects for volume and attraction.'
    expect(restoreTitleWords(ok, 'Real Gases and van der Waals Equation')).toEqual({ text: ok, repaired: false })
    expect(restoreTitleWords('Rate law and order of reaction.', 'Rate Law and Order').repaired).toBe(false)
  })
  it('both the opening and the chat reply are repaired', () => {
    expect(INIT).toMatch(/restoreTitleWords\(/)
    expect(ROUTE).toMatch(/hy\.restoreTitleWords\(/)
  })
})

describe('figures (CHEM-083 / CHEM-092)', () => {
  it('a process flow for a catalogue of separate reactions is rejected', () => {
    expect(processFlowIsAList({
      title: 'Key Reactions Involving Ethers',
      steps: [
        { title: 'Williamson synthesis: alkyl halide + alkoxide → ether' },
        { title: 'Cleavage with HX: ether + HX → alkyl halide + alcohol' },
        { title: 'Epoxide ring opening: epoxide + base → diol' },
        { title: 'Diethyl ether as common solvent' },
      ],
    })).toBe(true)
  })
  it('a real sequence is kept, even when each step is a reaction', () => {
    expect(processFlowIsAList({
      title: 'The Contact Process',
      steps: [{ title: 'S + O₂ → SO₂' }, { title: '2SO₂ + O₂ → 2SO₃' }, { title: 'SO₃ + H₂SO₄ → H₂S₂O₇' }],
    })).toBe(false)
    expect(processFlowIsAList({ title: 'Solving a linear equation', steps: [{ title: 'Add 7' }, { title: 'Divide by 4' }, { title: 'Check' }] })).toBe(false)
  })
  it('the electroplating anode is labelled Cu, not the refining description', () => {
    const src = readFileSync('src/lib/teaching/visual/conceptSceneParams.ts', 'utf8')
    expect(src).not.toMatch(/material: 'Cu \(pure, impure at cathode\)'/)
  })
})

describe('one analogy in four replies for every subject (CHEM-040 / CHEM-055)', () => {
  it('the cap no longer depends on the subject', () => {
    expect(ROUTE).toMatch(/caps\.analogyCapReached\(priorTutor, 1\)/)
    expect(ROUTE).not.toMatch(/analogyCapReached\(priorTutor, learnSession\.subject\.slug === 'mathematics' \? 1 : 2\)/)
  })
})

describe('authored teaching during an outage (CHEM-101 / CHEM-107 / MATH-006 / BIO-008)', () => {
  it('chat and lesson-init serve an unseen authored explanation before the outage copy', () => {
    expect(ROUTE).toMatch(/authoredOutage = await findUnseenExplanationContent\(/)
    expect(ROUTE).toMatch(/consecutiveOutagesHoisted = authoredOutage \? prevOutages : prevOutages \+ 1/)
    expect(INIT).toMatch(/\[outage-authored\]/)
  })
})

describe('dashboard at phone width (CHEM-100)', () => {
  it('the single column cannot grow past the viewport', () => {
    const css = readFileSync('src/components/dashboard/v2/dashboard.module.css', 'utf8')
    expect(css).toMatch(/\.wrap \{ grid-template-columns: minmax\(0, 1fr\); \}/)
    expect(css).toMatch(/\.wrap > \* \{ min-width: 0; \}/)
    expect(css).toMatch(/@media \(max-width: 480px\)/)
  })
})

describe('authored figures replace live-generated ones (CHEM-095 / CHEM-013 / CHEM-082)', () => {
  it('Ionic Bonding shows the electron transfer; Nature of Matter shows three different classes', async () => {
    const { resolveVisual } = await import('@/lib/teaching/visual/resolveVisual')
    for (const id of ['chem.bond.ionic-bonding', 'chem.found.matter']) {
      const d = resolveVisual({ message: '', lessonConceptId: id })
      expect(d.graphical).toBe(true)
      expect(d.provenance).toBe(`generator:${id}:concept-authored`)
    }
    const ionic = resolveVisual({ message: '', lessonConceptId: 'chem.bond.ionic-bonding' })
    const text = JSON.stringify(ionic.payload)
    expect(text).toMatch(/Electron transferred/)
    expect(text).not.toMatch(/Born|sublimation/i)
  })
  it('a long process step keeps its full wording in the note', async () => {
    const { extractSteps } = await import('@/lib/teaching/visual/conceptText')
    const steps = extractSteps('Identify all non-zero digits. Check for trapped zeros between non-zero digits. Evaluate leading zeros as never significant. Determine trailing zeros based on decimal presence.')
    expect(steps).toContain('Check for trapped zeros between non-zero digits')
  })
})

describe('live re-drive 2026-10-10 findings', () => {
  it('a step-by-step reply opening with markdown bold or a bullet is not a stub', async () => {
    const { isStubReply } = await import('@/lib/teaching/replyHygiene')
    expect(isStubReply('**Step 1** – Start with the given value, 72 km/h.\n\n**Step 2** – Replace each kilometre with 1000 metres.\n\n**Step 3** – Replace each hour with 3600 seconds, giving 20 m/s.')).toBe(false)
    expect(isStubReply('* Start with 72 km/h.\n* Multiply by 1000 m per km.\n* Divide by 3600 s per h to get 20 m/s.')).toBe(false)
    expect(isStubReply('*x = 3 so the')).toBe(true)
  })
  it('a content-free confirm-back is a stub', async () => {
    const { isStubReply } = await import('@/lib/teaching/replyHygiene')
    expect(isStubReply('It sounds like you’re ready to continue and feel the unit‑analysis point is clear—did I understand that correctly? Please let me know if that’s right or if anything needs fixing.')).toBe(true)
  })
  it('the drift guard keeps a retry only if it teaches, and a mid-lesson "ok" is owed teaching', () => {
    expect(ROUTE).toMatch(/&& !hy\.isStubReply\(retry\) && \(retry\.match\(\/\\S\+\/g\) \?\? \[\]\)\.length >= 25/)
    expect(ROUTE).toMatch(/const wantsTeaching = openingTurn \|\| hy\.isPlainAcknowledgement\(learnerAuthoredMessage\)/)
  })
})

describe('CHEM-082 truncated step labels are refused on every tier', () => {
  it('the approved sig-figs labels seen live are truncated; whole labels are not', async () => {
    const { hasTruncatedStepLabel } = await import('@/lib/teaching/visual/visualEngine')
    expect(hasTruncatedStepLabel({ steps: [{ title: 'Identify all non‑zero digits' }, { title: 'Check for trapped zeros between' }] })).toBe(true)
    expect(hasTruncatedStepLabel({ steps: [{ title: 'Determine trailing zeros based on' }] })).toBe(true)
    expect(hasTruncatedStepLabel({ steps: [{ title: 'Identify mixture type (homogeneous or' }] })).toBe(true)
    expect(hasTruncatedStepLabel({ steps: [{ title: 'Check for trapped zeros between non-zero digits' }, { title: 'Divide by 4' }, { title: 'Check (substitute back)' }] })).toBe(false)
  })
})

describe('"explain simpler" with a card on screen (re-drive 2026-10-10)', () => {
  it('a reply that is only a card lead-in is a stub', async () => {
    const { isStubReply } = await import('@/lib/teaching/replyHygiene')
    expect(isStubReply("I see you arrived at x = 7—that’s a common slip.  Here's a question — take your time with it.")).toBe(true)
  })
  it('the teaching floor runs on an ungraded adaptation request even when the card stays', () => {
    expect(ROUTE).toMatch(/const adaptationAskedWithCard = servedMcq && mcqGradeHoisted === null/)
    expect(ROUTE).toMatch(/if \(\(!servedMcq \|\| adaptationAskedWithCard\) && !serveLessonComplete/)
  })
})

describe('CHEM-082 the figure description carries whole step labels', () => {
  it('the approved sig-figs flow is described with its full labels', async () => {
    const { describeVisualPayload } = await import('@/lib/teaching/visual/visualSemantics')
    const d = JSON.stringify(describeVisualPayload({ renderer: 'spec', visualSpec: { type: 'process_flow', title: 'Determining Significant Figures in a Measurement', steps: [
      { title: 'Identify all non-zero digits' }, { title: 'Check for trapped zeros between non-zero digits' },
      { title: 'Evaluate leading zeros as never significant' }, { title: 'Determine trailing zeros based on decimal presence' },
    ] } } as never))
    expect(d).toContain('Check for trapped zeros between non-zero digits')
    expect(d).toContain('Determine trailing zeros based on decimal presence')
  })
})

describe('comfort plus counter-questions is a stub (re-drive 2026-10-10)', () => {
  it('"I see you got x = 5.5." followed only by questions teaches nothing', async () => {
    const { isStubReply } = await import('@/lib/teaching/replyHygiene')
    expect(isStubReply('I see you got \\(x = 5.5\\). Could you walk me through the steps you took to reach that number? How did you handle the “ 2 ” and the “ – 1 ” in the equation?')).toBe(true)
    expect(isStubReply('Subtract 5 from both sides to get 3x = 15, then divide by 3. What do you get for x?')).toBe(false)
  })
})

describe('drift anchors split hyphenated words (re-drive 2026-10-10, chem.pblock.trends)', () => {
  it('"inert‑pair" with a non-breaking hyphen matches the anchor "Inert-pair"', () => {
    const a = conceptAnchors('Trends Across p-Block', 'Inert-pair effect; metallic character; anomalous first-member behaviour; diagonal relationships.')
    expect(mentionsConcept('Alright, let’s check how the inert‑pair effect shows up in oxidation states for Group 14.', a)).toBe(true)
  })
})

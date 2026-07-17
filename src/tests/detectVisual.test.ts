/**
 * P0 regression — Incorrect Visualization Selection.
 *
 * Root cause: SCIENCE_RULES' force_diagram keyword group conflated
 * kinematics DESCRIPTIVE quantities (displacement, velocity, acceleration,
 * speed) with genuine force/dynamics vocabulary (force, newton, friction,
 * momentum). A lesson titled "Displacement and Distance" matched purely on
 * the word "displacement" and got a Force Diagram — an educationally
 * incorrect visual for a concept with no force analysis at all.
 *
 * This is the Tier-3 (title-keyword) layer of the visualization pipeline;
 * visualRegistry.test.ts covers the Tier-1/Tier-2 (registry) fix for the
 * same bug. Both layers had to be fixed — the registry fix alone would not
 * have been sufficient, since detectVisual() is called independently in
 * places that don't go through the registry at all (e.g. the advisory
 * visual-aids prompt block).
 */
import { describe, it, expect } from 'vitest'
import { detectVisual } from '@/lib/school/visuals/detectVisual'

describe('detectVisual — P0 fix: kinematics vocabulary no longer triggers force_diagram', () => {
  it.each([
    'Displacement and Distance',
    'Speed and Velocity',
    'Acceleration',
    'Kinematics in One Dimension',
  ])('lesson titled %j does not resolve to force_diagram', (lessonTitle) => {
    const visual = detectVisual({ subjectSlug: 'physics', chapterTitle: '', lessonTitle })
    expect(visual).not.toBe('force_diagram')
  })

  it('a chapter that mixes kinematics and dynamics wording still does not force-match on the kinematics words alone', () => {
    const visual = detectVisual({
      subjectSlug: 'physics',
      chapterTitle: 'Motion and Measurement',
      lessonTitle: 'Displacement and Distance',
    })
    // "Motion" is retained (still force/dynamics-adjacent vocabulary in this
    // codebase's existing keyword set) — this asserts the fix specifically
    // targeted displacement/velocity/acceleration/speed, not a wholesale
    // removal of the force_diagram rule.
    expect(visual).toBe('force_diagram')
  })
})

describe('detectVisual — genuine force/dynamics lessons still get Force Diagram (regression check)', () => {
  it.each([
    'Force and Interaction',
    "Newton's First Law — Inertia",
    'Linear Momentum',
  ])('lesson titled %j still resolves to force_diagram', (lessonTitle) => {
    const visual = detectVisual({ subjectSlug: 'physics', chapterTitle: '', lessonTitle })
    expect(visual).toBe('force_diagram')
  })

  // These two match MECHANICS_3D_RULES (checked before SCIENCE_RULES for
  // subjectSlug 'physics') on 'friction'/"newton laws" and resolve to the
  // more specific three_newton_forces — pre-existing behavior, unrelated to
  // and unaffected by this fix. Asserted here so any future change to
  // MECHANICS_3D_RULES that accidentally weakens force/dynamics matching is
  // caught, not just the SCIENCE_RULES change this bug fix made.
  it.each([
    'Friction Forces',
    "Newton's Laws of Motion",
  ])('lesson titled %j resolves to the more specific three_newton_forces (3D upgrade, pre-existing)', (lessonTitle) => {
    const visual = detectVisual({ subjectSlug: 'physics', chapterTitle: '', lessonTitle })
    expect(visual).toBe('three_newton_forces')
  })
})

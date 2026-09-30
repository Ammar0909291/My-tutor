/**
 * What a concept's own AUTHORED figure (CONCEPT_SCENES) says, as plain text.
 *
 * Its own module so the concept layer can read it without importing the
 * visual target resolver (which imports the concept layer).
 */

import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from './conceptSceneParams'

/**
 * The label text of the concept's own AUTHORED scene, or ''. Shared by the
 * visual layer and the route's excursion check, so both agree that a word the
 * lesson's own figure labels is the lesson's term.
 */
export function authoredFigureLabelText(conceptId: string | null | undefined): string {
  try {
    if (!conceptId || !CONCEPT_SCENE_OVERRIDES.includes(conceptId)) return ''
    const scene = buildCanonicalScene(null, conceptId)
    return (scene?.steps ?? []).flatMap((st) =>
      (st.objects as Array<{ text?: unknown }>).map((o) => (typeof o.text === 'string' ? o.text : ''))).join(' ')
  } catch {
    return ''
  }
}

/**
 * Everything the lesson's own authored figure says — its labels AND its step
 * narration — or ''. Read as LESSON VOCABULARY by requestedConcept's rules, so
 * the teaching target and the figure (which share that resolver) agree.
 *
 * MEASURED 2026-09-30: once Nature of Light gained a figure, a Total Internal
 * Reflection learner asking "show me a ray diagram" was about to be shown
 * "Light: rays or waves?" — "ray" matched math "Ray", which the same-subject
 * re-read turned into "Nature of Light: Ray and Wave Models". The TIR figure
 * never LABELS a ray, but its narration says "ray" three times: the word is the
 * lesson's own, and requestedConcept's L3 rule already keeps a lesson's own
 * one-word term from opening a detour once it can see it.
 */
export function authoredFigureText(conceptId: string | null | undefined): string {
  try {
    if (!conceptId || !CONCEPT_SCENE_OVERRIDES.includes(conceptId)) return ''
    const scene = buildCanonicalScene(null, conceptId)
    const narration = (scene?.steps ?? []).map((st) => (typeof st.narration === 'string' ? st.narration : '')).join(' ')
    return `${authoredFigureLabelText(conceptId)} ${narration}`.trim()
  } catch {
    return ''
  }
}

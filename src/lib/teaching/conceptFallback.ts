/**
 * WHAT TO SAY WHEN A REPAIR LEAVES NOTHING — from the concept, never invented.
 *
 * Several output repairs can remove a turn's whole text (a pointer at a figure
 * that is not there, a check announced and never asked, a question withheld
 * because no server answer key exists). The old fallback, "Let's stay with this
 * idea for a moment.", claims nothing and teaches nothing; the learner pilot
 * (2026-09-24) saw it three turns running. The Knowledge Graph description is
 * the concept's own authored statement, so it is the one thing that can be said
 * truthfully with no model call.
 *
 * KG descriptions come in two shapes: a sentence ("An LC circuit oscillates at
 * resonant frequency…") and a syllabus list ("Balancing chemical equations;
 * mole ratios; limiting reagent…"). The list reads as a fragment on its own, so
 * it is introduced as what the lesson covers. Pure.
 */
export function conceptFallbackText(title: string, description: string): string {
  const d = description.trim().replace(/\s+/g, ' ')
  const t = title.trim()
  if (d.length === 0) return t
  const isList = d.includes(';') || !/[.!?]$/.test(d)
  return isList ? `${t} covers: ${d.replace(/[.;]\s*$/, '')}.` : d
}

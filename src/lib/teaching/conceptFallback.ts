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
 * it is said as one plain sentence about what the lesson looks at. Pure.
 */
export function conceptFallbackText(title: string, description: string): string {
  const d = description.trim().replace(/\s+/g, ' ')
  const t = title.trim()
  if (d.length === 0) return t
  const isList = d.includes(';') || !/[.!?]$/.test(d)
  // BIO-010 (2026-10-05, biology run #61, #2, #22): "Fossil record, comparative
  // anatomy — homologous and analogous structures, embryology, biogeography and
  // molecular evidence supporting common descent." was the whole reply — a
  // syllabus phrase with a full stop, not a sentence. Only a description that
  // reads as a sentence (it has a verb) is said as it is.
  const isSentence = /\b(?:is|are|was|were|has|have|can|cannot|means?|describes?|explains?|shows?|refers?|happens?|occurs?|forms?|moves?|makes?|uses?|gives?|depends?)\b/i.test(d)
  const isSyllabus = !isSentence && (d.match(/,/g) ?? []).length >= 2 && /^[^,.]{1,40},/.test(d)
  if (!isList && !isSyllabus) return d
  if (!isList) return `In this lesson on ${t} we will look at ${d.charAt(0).toLowerCase()}${d.slice(1).replace(/[.!?]+$/, '')}.`
  // CHEM-064 (2026-10-05, chemistry real-learner run): "Pure Substances and
  // Mixtures covers: Elements and compounds as pure substances; homogeneous and
  // heterogeneous mixtures; separation techniques." reached learners as a
  // reply — a syllabus line, with its machine-looking "covers:" label. The list
  // is now said as one plain sentence: "In this lesson on X we will look at a,
  // b and c."
  const items = d.replace(/[.;]\s*$/, '').split(/\s*;\s*/).filter(Boolean)
    .map((item, i) => (i === 0 ? item.charAt(0).toLowerCase() + item.slice(1) : item))
  const list = items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : items[0]
  return `In this lesson on ${t} we will look at ${list}.`
}

/** Said instead of repeating the concept fallback on consecutive turns (see route.ts). */
export const FALLBACK_REPEAT_TEXT =
  'Which part of this would you like me to explain more — the idea itself, a worked example, or where it is used?'

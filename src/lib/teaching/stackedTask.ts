/**
 * A STACKED EXERCISE IN A TEACHING REPLY IS REMOVED.
 *
 * ── THE DEFECT (production, 2026-11-03, chem.bond.polar-molecules, learner run on Test6, twice on two deploys) ───────────────────────────
 * The learner answered "Okay, I follow. Please continue." and the reply opened:
 *
 *   "Looking at the figure that illustrates how the bond-dipole vectors add in CO₂ (linear, cancel) and H₂O (bent, add), draw the Lewis structure and
 *    VSEPR shape of SF₄, identify the position of the lone pair and the four S–F bonds, and determine whether SF₄ is polar or non-polar by showing the
 *    vector addition of its bond dipoles."
 *
 * That is the Educational Brain entry's assessment item, copied into the reply as an instruction to a learner who has not been taught the shape of SF₄. On the
 * first deploy the model went on to answer it itself and got the geometry wrong ("three bonds in the equatorial plane"). Only AUTHORED cards are asked
 * (owner decision 2026-10-07); a three-part exercise with no card and no answer key is a question in imperative form.
 *
 * ── WHAT THIS DOES ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 * Drops a sentence that opens with a task verb (after at most one short lead clause such as "Looking at the figure, …") and strings THREE OR MORE different task
 * verbs together (draw / sketch / identify / determine / calculate / predict / explain / compare …). A single imperative ("Identify the independent clause") and
 * a two-step instruction are ordinary procedure steps and are kept. Never rewrites: a sentence is removed whole or left alone.
 *
 * Pure and total.
 */

const TASK_VERBS = ['draw', 'sketch', 'identify', 'determine', 'calculate', 'compute', 'predict', 'explain', 'compare', 'show', 'find', 'decide', 'work out', 'label', 'derive', 'write']
const LEAD_WORD = /^(?:looking at|using|based on|given|from|with|after studying|now that you have seen)\b/i
const VERB_ALT = TASK_VERBS.join('|')
const startsWithTask = (sentence: string): boolean => {
  const body = sentence.trim().replace(/^[*_>\-\s\d.)]+/, '')
  if (new RegExp(`^(?:${VERB_ALT})\\b`, 'i').test(body)) return true
  // "Looking at the figure …, draw …": a lead clause (it may hold parentheses and commas of its own), then the task verb after a comma.
  return LEAD_WORD.test(body) && new RegExp(`,\\s*(?:${VERB_ALT})\\b`, 'i').test(body)
}
const distinctTaskVerbs = (sentence: string): number => TASK_VERBS.filter((v) => new RegExp(`(?:^|[\\s,;(])${v}\\b`, 'i').test(sentence)).length

export const isStackedTask = (sentence: string): boolean => startsWithTask(sentence) && distinctTaskVerbs(sentence) >= 3

export function dropStackedTasks(text: string): { text: string; dropped: string[] } {
  const dropped: string[] = []
  const paragraphs = (typeof text === 'string' ? text : '').split(/\n{2,}/).map((para) => para.split(/(?<=[.!?])\s+(?=\S)/).filter((s) => {
    if (isStackedTask(s)) { dropped.push(s); return false }
    return true
  }).join(' ').trim())
  if (dropped.length === 0) return { text, dropped }
  return { text: paragraphs.filter((p) => p.length > 0).join('\n\n'), dropped }
}

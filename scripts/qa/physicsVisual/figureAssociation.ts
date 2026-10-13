/**
 * WHICH FIGURE ON THE LESSON PAGE IS THE ONE UNDER TEST?
 *
 * `/learn` lists the lesson's messages from EVERY session of the learner (history is lesson-scoped, and ending a
 * session does not hide it), so a retry, or a restored session, leaves one figure per reply on the page. Two earlier
 * harness defects came from choosing by DOM position:
 *   - `querySelector` took the FIRST figure: 18 retries kept measuring the first, short reply, so the fifth step of
 *     the normal-force card was never seen and the report blamed the diagram;
 *   - "the last figure" fixed that case and would be wrong the moment anything else sat after the target (a later
 *     reply, a restored older session rendered after it, a second figure in the same lesson).
 *
 * So the figure is chosen by what it BELONGS to: the reply the harness asked for. The lesson page marks every
 * message block with `data-message-id` (LessonScreen); a figure belongs to the block it sits in, and the block is the
 * one whose own text holds the reply. The reply text is the only identity the API and the page share (the API does
 * not return the message id the page keys on). A first version inferred the block from the DOM alone (smallest
 * ancestor holding the text and exactly one figure) and was wrong when the reply's own message had no figure and a
 * neighbour's was the only one on the page — the marker removes the inference.
 *
 * The result carries enough to detect a wrong-figure measurement afterwards (how many figures were on the page,
 * which one was taken, how it was chosen, whether the match was ambiguous), and a figure that cannot be tied to the
 * reply THROWS: a harness that cannot tell what it measured must not report a verdict.
 */
import type { Page } from 'playwright'

export interface FigureSelection {
  /** Position in document order among all figure roots on the page (cards first-class, scenes not inside a card). */
  index: number
  total: number
  kind: 'card' | 'scene'
  /** How the figure was chosen: tied to the reply text, or explicitly by index. */
  selection: 'association' | 'explicit'
  /** More than one figure sits in a block that contains the reply text (the same text was replied twice): the last one is taken. */
  ambiguous: boolean
  /** The normalised text snippet used to tie the figure to its reply. */
  key: string
  /** The page's id of the message the figure belongs to (evidence: record it with the screenshot). */
  messageId: string | null
}

/** Longest run of plain words (no markdown, no digits-only noise) in the reply, lower-cased: stable across how the page renders it. */
export function replyKey(replyText: string): string {
  const norm = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()
  const runs = replyText.split(/[.!?:;\n]+/).map(norm).filter((r) => r.length >= 12)
  const longest = runs.sort((a, b) => b.length - a.length)[0] ?? norm(replyText)
  return longest.slice(0, 60)
}

/** Plain JS, evaluated in the page (a transpiled callback can carry helper wrappers the page does not have). */
const SELECT_JS = `(function (opts) {
  var norm = function (s) { return (s || '').toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, ' ').trim(); };
  var cards = Array.prototype.slice.call(document.querySelectorAll('[aria-label^="Visual aid:"]'));
  var scenes = Array.prototype.slice.call(document.querySelectorAll('[data-scene-box]')).filter(function (b) { return !b.closest('[aria-label^="Visual aid:"]'); });
  var roots = cards.concat(scenes).sort(function (a, b) { return (a.compareDocumentPosition(b) & 4) ? -1 : 1; });
  var out = { total: roots.length, roots: roots.length };
  if (!roots.length) return Object.assign(out, { error: 'NO_FIGURE' });
  var isRoot = function (e) { return roots.indexOf(e) >= 0; };
  var pick = function (index, selection, ambiguous) {
    var r = roots[index];
    var m = r.closest('[data-message-id]');
    return Object.assign(out, { index: index, kind: r.matches('[aria-label^="Visual aid:"]') ? 'card' : 'scene', selection: selection, ambiguous: !!ambiguous, key: opts.key, messageId: m ? m.getAttribute('data-message-id') : null });
  };
  if (typeof opts.index === 'number') {
    if (opts.index < 0 || opts.index >= roots.length) return Object.assign(out, { error: 'INDEX_OUT_OF_RANGE' });
    return pick(opts.index, 'explicit', false);
  }
  var key = norm(opts.key);
  var owned = [];
  var unmarked = 0;
  roots.forEach(function (r, i) {
    var m = r.closest('[data-message-id]');
    if (!m) { unmarked++; return; }
    if (norm(m.innerText).indexOf(key) >= 0) owned.push(i);
  });
  if (unmarked === roots.length) return Object.assign(out, { error: 'NO_MESSAGE_MARKERS' });
  if (!owned.length) return Object.assign(out, { error: 'NO_FIGURE_TIED_TO_REPLY', key: opts.key });
  return pick(owned[owned.length - 1], 'association', owned.length > 1);
})`

export async function selectTargetFigure(page: Page, opts: { replyText?: string; index?: number }): Promise<FigureSelection> {
  const key = opts.replyText ? replyKey(opts.replyText) : ''
  if (opts.index === undefined && !key) throw new Error('WRONG_FIGURE: no reply text and no explicit index — cannot tell which figure to measure')
  const res = await page.evaluate(`${SELECT_JS}(${JSON.stringify({ key, index: opts.index })})`) as Partial<FigureSelection> & { error?: string; roots: number }
  if (res.error) throw new Error(`WRONG_FIGURE: ${res.error} (figures on page: ${res.roots}, key: "${key}")`)
  return res as FigureSelection
}

/** In-page marker: gives the chosen root the audit frame attribute (cards: the root itself; scenes: the control container). */
export async function markFigure(page: Page, index: number): Promise<boolean> {
  return page.evaluate(`(function (index) {
    var cards = Array.prototype.slice.call(document.querySelectorAll('[aria-label^="Visual aid:"]'));
    var scenes = Array.prototype.slice.call(document.querySelectorAll('[data-scene-box]')).filter(function (b) { return !b.closest('[aria-label^="Visual aid:"]'); });
    var roots = cards.concat(scenes).sort(function (a, b) { return (a.compareDocumentPosition(b) & 4) ? -1 : 1; });
    var root = roots[index];
    if (!root) return false;
    document.querySelectorAll('[data-audit-frame]').forEach(function (n) { n.removeAttribute('data-audit-frame'); });
    if (root.matches('[aria-label^="Visual aid:"]')) { root.setAttribute('data-audit-frame', ''); root.scrollIntoView({ block: 'start' }); return true; }
    var el = root;
    while (el && el.parentElement) {
      el = el.parentElement;
      if (el.querySelector('input[type="range"]') || /Play the stages|Play the motion/.test(el.textContent || '')) break;
    }
    if (!el) return false;
    el.setAttribute('data-audit-frame', '');
    el.scrollIntoView({ block: 'start' });
    return true;
  })(${JSON.stringify(index)})`) as Promise<boolean>
}

'use client'

/**
 * The ACTIVE three.js VisualCard corpus, rendered through the real VisualCard.
 *
 * Every type listed here is reachable from `VisualCard`'s own switch, which is
 * the component-selection path a learner's visual takes. The list is derived
 * from `VISUAL_META` rather than hand-written, so a new three.js card cannot
 * quietly escape the harness.
 *
 * `autoPlay` is on, so each figure runs to its final reveal step — the step
 * that carries the most labels, and the one worth measuring.
 */

import { VisualCard } from '@/components/school/visuals/VisualCard'
import { VISUAL_META, type VisualType } from '@/lib/school/visuals/visualTypes'

/** Cards whose figure is drawn with three.js, by the `three_` naming the registry uses. */
const THREE_JS_CARDS = (Object.keys(VISUAL_META) as VisualType[])
  .filter((type) => type.startsWith('three_'))
  .sort()

/**
 * `only` renders ONE card. A browser caps how many live WebGL contexts a page
 * may hold — below the size of this corpus — so on the full page the later
 * canvases lose their context and paint nothing, which is fine for measuring
 * labels (they are React DOM, not WebGL) but useless for LOOKING at a figure.
 *
 * It is a route segment rather than a query string on purpose: reading a
 * search param forces the tree through Suspense, and measured in Chromium the
 * canvas then never leaves its 300x150 default — react-three-fiber misses the
 * layout pass and the whole scene, labels included, never renders.
 */
export function VisualCardsHarness({ only }: { only?: string }) {
  const shown = only ? THREE_JS_CARDS.filter((t) => t === only) : THREE_JS_CARDS

  return (
    <main style={{ padding: 16, maxWidth: 1100, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>three.js VisualCard label harness</h1>
      <p style={{ color: 'var(--text-dim)', marginBottom: 20, fontSize: 13 }}>
        Dev-only. {shown.length} of {THREE_JS_CARDS.length} card types, each painted by the production renderer.
      </p>

      {shown.map((type) => (
        <section key={type} data-visual-type={type} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 13, margin: '0 0 4px', fontFamily: 'ui-monospace, monospace', color: 'var(--text-dim)' }}>
            {type}
          </h2>
          <VisualCard type={type} autoPlay speed={4} />
        </section>
      ))}
    </main>
  )
}

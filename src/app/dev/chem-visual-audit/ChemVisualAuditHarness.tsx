'use client'

/**
 * CHEMISTRY VISUAL AUDIT HARNESS — dev-only mount point for ONE manifest entry.
 *
 * WHAT THIS IS. A thin host. It owns no renderer, no layout engine and no
 * registry: every figure is painted by the SAME component LessonScreen mounts
 * for the SAME response field, inside the SAME container classes, so a browser
 * measuring this page is measuring what a learner sees.
 *
 *   response field (route.ts -> client)    component LessonScreen mounts
 *   -------------------------------------  ---------------------------------
 *   `visual`      (VisualType string)      VisualCard      (SVG card | three.js)
 *   `visualSpec`  (parseVisualSpec'd)      VisualRenderer  (graph | number_line
 *                                                           | geometry | process_flow)
 *   `sceneSpec`   (validateSceneSpec'd)    SceneSpecFigure -> ExplainerFigure
 *                                                           -> SceneSpecRenderer
 *   `dynamicVisualizationCode`             DynamicVisualRenderer (sandboxed iframe)
 *
 * Two behaviours are copied from LessonScreen deliberately, because they
 * decide whether a learner sees anything at all: a `visualSpec` that fails
 * `parseVisualSpec` and a `sceneSpec` that fails `validateSceneSpec` are
 * DROPPED by the client, and are dropped here too (and reported, rather than
 * silently rendering nothing).
 *
 * CONTAINER. LessonScreen puts a figure in `.teachingCanvas > .canvasVisual >
 * CANVAS_VISUAL_FRAME` (LessonScreen.module.css is imported as-is, so its
 * 900px breakpoint, its 22px gutter and its `clamp()` inset are the real
 * ones). The chat column is measured at 32px of total side padding on a phone
 * (LessonScreen.module.css, "viewport 390 -> 358px"); the 16px per side here
 * reproduces that. Resulting figure widths: ~560px at a 1280px window,
 * ~358px at 390px.
 *
 * INPUT. `window.__CHEM_AUDIT__` (set by the runner via addInitScript) or
 * `#entry=<encodeURIComponent(JSON)>` in the URL hash, for a human opening the
 * page by hand. Nothing is fetched and no file is read, so nothing here can
 * reach a database, a provider or the network.
 *
 * Adds no route, component or behaviour to production (page.tsx 404s there).
 */

import dynamic from 'next/dynamic'
import { Component, useEffect, useState, type ReactNode } from 'react'
import styles from '@/components/learn/LessonScreen.module.css'
import { VisualCard } from '@/components/school/visuals/VisualCard'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import { VisualPreparing } from '@/components/learn/ThinkingBrain'
import { VISUAL_META, type VisualType } from '@/lib/school/visuals/visualTypes'
import { parseVisualSpec } from '@/lib/visuals/visualSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

// Same lazy, client-only mounts LessonScreen uses (SceneSpecFigure pulls in
// react-three-fiber; DynamicVisualRenderer renders in a sandboxed iframe).
const SceneSpecFigure = dynamic(
  () => import('@/components/school/visuals/SceneSpecFigure').then((m) => m.SceneSpecFigure),
  { ssr: false, loading: () => <VisualPreparing /> },
)
const DynamicVisualRenderer = dynamic(
  () => import('@/components/learn/DynamicVisualRenderer').then((m) => m.DynamicVisualRenderer),
  { ssr: false, loading: () => <VisualPreparing /> },
)

/** LessonScreen's CANVAS_VISUAL_FRAME / VISUAL_FRAME, verbatim. */
const CANVAS_VISUAL_FRAME: React.CSSProperties = {
  width: '100%',
  maxWidth: '100%',
  animation: 'fadeIn 300ms ease-out both',
}
const VISUAL_FRAME: React.CSSProperties = {
  width: '100%',
  maxWidth: 'min(100%, 720px)',
  animation: 'fadeIn 300ms ease-out both',
}

export interface AuditEntry {
  instanceId?: string
  /** The exact response field the learn/chat route attaches, and the JSON the client receives. */
  payload: { field: string; value: unknown }
  /** `route.ts` also sends `learnerLevel`; absent = the intermediate default. */
  learnerLevel?: string | null
  /** VisualCard animation speed. Defaults to 1, the learner's default voice speed (it decides which speed chip is active). */
  speed?: number
  /** 'canvas' (default, what a figure-carrying turn uses) or 'plain' (VISUAL_FRAME's 720px reading width). */
  surface?: 'canvas' | 'plain'
}

declare global {
  interface Window {
    __CHEM_AUDIT__?: AuditEntry
    __CHEM_AUDIT_STATUS__?: { dropped?: string; errors?: string[]; field?: string; error?: string }
  }
}

function readEntry(): AuditEntry | null {
  if (typeof window === 'undefined') return null
  if (window.__CHEM_AUDIT__) return window.__CHEM_AUDIT__
  const m = /[#&]entry=([^&]+)/.exec(window.location.hash)
  if (m) {
    try { return JSON.parse(decodeURIComponent(m[1])) as AuditEntry } catch { return null }
  }
  return null
}

/**
 * A figure that throws would, in the real app, take the lesson with it. Here it
 * is caught so the runner can report RENDER_ERROR instead of timing out. The
 * message lives in a `data-audit-ignore` node so the text scans never mistake it
 * for figure content.
 */
class AuditBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null as string | null }
  static getDerivedStateFromError(e: unknown) {
    return { error: e instanceof Error ? `${e.name}: ${e.message}` : String(e) }
  }
  componentDidCatch(e: unknown) {
    if (typeof window !== 'undefined') {
      window.__CHEM_AUDIT_STATUS__ = {
        ...(window.__CHEM_AUDIT_STATUS__ ?? {}),
        error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      }
    }
  }
  render() {
    if (this.state.error) {
      return <div data-audit-ignore data-audit-error={this.state.error} style={{ fontSize: 0 }} />
    }
    return this.props.children
  }
}

function Figure({ entry }: { entry: AuditEntry }) {
  const { field, value } = entry.payload

  switch (field) {
    case 'visual':
    case 'registryKey': {
      // route.ts sends the VisualType string; LessonScreen passes it straight to VisualCard.
      const type = value as VisualType
      if (typeof value !== 'string' || !(type in VISUAL_META)) {
        window.__CHEM_AUDIT_STATUS__ = { dropped: `visual:unknown-type:${String(value)}` }
        return null
      }
      // speed 1 = LessonScreen's default `voiceSpeed`, so the "1x" chip is the active (accent-filled) one exactly as a learner first sees it
      return <VisualCard type={type} autoPlay speed={entry.speed ?? 1} hasNarration />
    }

    case 'visualSpec': {
      const parsed = parseVisualSpec(value)
      if (!parsed) {
        window.__CHEM_AUDIT_STATUS__ = { dropped: 'visualSpec:parseVisualSpec-rejected' }
        return null
      }
      return <VisualRenderer spec={parsed} />
    }

    case 'sceneSpec': {
      const result = validateSceneSpec(value as SceneSpec)
      if (!result.valid) {
        window.__CHEM_AUDIT_STATUS__ = {
          dropped: 'sceneSpec:validateSceneSpec-rejected',
          errors: (result.errors ?? []).map((e) => `${e.path}: ${e.message}`).slice(0, 12),
        }
        return null
      }
      return <SceneSpecFigure spec={value as SceneSpec} learnerLevel={entry.learnerLevel ?? undefined} />
    }

    case 'dynamicVisualizationCode':
      return typeof value === 'string' && value.trim()
        ? <DynamicVisualRenderer code={value} />
        : null

    // HARNESS SELF-TEST ONLY (`render-measure.mjs --selftest`): raw markup, no
    // legibility pass, so a deliberately broken sample stays broken. Never used
    // for a chemistry payload, which always goes through a real component above.
    case '__selftest_html':
      return <div data-audit-selftest dangerouslySetInnerHTML={{ __html: String(value) }} />

    default:
      window.__CHEM_AUDIT_STATUS__ = { dropped: `unsupported-payload-field:${field}` }
      return null
  }
}

export function ChemVisualAuditHarness() {
  const [entry, setEntry] = useState<AuditEntry | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    window.__CHEM_AUDIT_STATUS__ = undefined
    setEntry(readEntry())
    setChecked(true)
  }, [])

  const plain = entry?.surface === 'plain'

  return (
    <main
      data-audit-surface
      data-audit-ready={checked ? (entry ? 'entry' : 'empty') : 'pending'}
      data-audit-field={entry?.payload.field ?? ''}
      // The lesson's message area: --bg-void behind a dot-grid, 12px padding
      // inside the chat column's own gutter (16px a side in total here; see header).
      className="dot-grid"
      style={{ background: 'var(--bg-void)', padding: '12px 16px', minHeight: '100vh', boxSizing: 'border-box' }}
    >
      {checked && !entry && (
        <p data-audit-ignore style={{ color: 'var(--text-dim)', fontSize: 13 }}>
          No audit entry. The runner sets window.__CHEM_AUDIT__; by hand, open this page with
          #entry=&lt;encodeURIComponent(JSON)&gt; where the JSON is {'{'} payload: {'{'} field, value {'}'} {'}'}.
        </p>
      )}

      {entry && (
        <div className={styles.teachingCanvas} data-audit-canvas>
          {/* The tutor's words sit in the other column. Empty here: it only
              holds the grid's first track so the figure gets its real width. */}
          <div className={styles.canvasText} data-audit-ignore aria-hidden="true" style={{ minHeight: 8 }} />
          <div className={styles.canvasVisual}>
            <div data-audit-frame style={plain ? VISUAL_FRAME : CANVAS_VISUAL_FRAME}>
              <AuditBoundary>
                <Figure entry={entry} />
              </AuditBoundary>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

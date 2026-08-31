'use client'
/**
 * ExplainerFigure — the teaching instrument the figure sits inside.
 *
 * BEFORE: a canvas, a 13px title, and a caption. Everything a learner needed in
 * order to READ the picture — what the colours mean, what the givens were, how
 * the result follows, what to take away — lived only in the tutor's prose
 * beside it, and was gone the moment they scrolled.
 *
 * This component is the frame the reference design calls for, and it is built
 * from the scene's own declared content (`deriveExplainer`), so it applies to
 * every figure in the corpus rather than to the ones somebody remembered to
 * dress up. It composes four existing, independently-testable pure layers and
 * adds no teaching logic of its own:
 *
 *   deriveExplainer   header, givens, result chip, legend, panels, insight
 *   stageView         which stage, what is in focus, what this mode withholds
 *   rebuildScene      re-derive the figure when a learner moves a variable
 *   SceneSpecRenderer draws it, exactly as before
 *
 * ── EVERY CONTROL DOES SOMETHING ────────────────────────────────────────────
 * The stepper appears only for a staged scene, the mode chips only for modes
 * the scene can honestly offer (`availableModes`), and the sliders only for a
 * scene whose generator is registered as parametric. A control that cannot
 * change the figure is never drawn — which is why nothing here needs to know
 * what subject it is showing.
 *
 * ── ACCESSIBILITY IS STRUCTURAL, NOT ADDED ──────────────────────────────────
 * Every meaning carried by colour is also carried by text: the legend names
 * each colour, focus is announced in words, each slider states the causal claim
 * it makes, and the withheld count is written out. The figure remains
 * understandable with the canvas ignored entirely.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Pause, Play } from 'lucide-react'
import { SceneSpecRenderer } from './SceneSpecRenderer'
import styles from './ExplainerFigure.module.css'
import { useTheme } from '@/components/Providers'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { deriveExplainer } from '@/lib/teaching/visual/explainer'
import { availableModes, stageView, type SceneMode } from '@/lib/teaching/visual/sceneStage'
import { defaultValueOf, rebuildScene, variablesFor, type SceneParams, type SceneVariable } from '@/lib/teaching/visual/parametricScenes'
import { themeColor } from '@/lib/teaching/sceneGenerators/visualDesign'
import {
  availableAnimations, stageAt, sweepFrame, traceObjects, tracePlayhead,
  type SceneAnimation,
} from '@/lib/teaching/visual/sceneAnimation'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { availableContrasts, type MisconceptionContrast } from '@/lib/teaching/visual/misconceptionContrast'
import {
  availableRepresentations, decorForView, focusForView, linkSymbols, objectsForView,
  workingLines, type RepresentationView,
} from '@/lib/teaching/visual/representation'
import { budgetLabels, complexityFor, labelsHeldBack } from '@/lib/teaching/visual/visualComplexity'
import { normalizeToCanonicalLevel } from '@/lib/curriculum/levels'

const MODE_LABEL: Record<SceneMode, string> = {
  explain: 'Explain',
  predict: 'Predict',
  practice: 'Practice',
  assess: 'Test me',
}

/** What each mode withholds, said plainly rather than left to be discovered. */
const MODE_HINT: Record<SceneMode, string> = {
  explain: '',
  predict: 'The outcome is hidden — say what you expect before revealing it.',
  practice: 'The answer is hidden. Work it out from what is drawn.',
  assess: 'Every stated value is hidden. Read the figure alone.',
}

export function ExplainerFigure({
  spec, learnerLevel,
}: {
  spec: SceneSpec
  learnerLevel?: string | null
}) {
  const { theme } = useTheme()

  // ── adaptive complexity ────────────────────────────────────────────────────
  // What is shown AT ONCE, never what is true. The geometry, the numbers and
  // the relationship are identical at every level; a beginner meets fewer of
  // them at a time and is given more guidance. An absent level is the
  // intermediate default — the behaviour every figure had before this existed.
  const policy = useMemo(
    () => complexityFor(learnerLevel ? normalizeToCanonicalLevel(learnerLevel) : null),
    [learnerLevel],
  )

  // ── the learner's own parameter values ────────────────────────────────────
  // Seeded from what the scene was built with, so the figure opens exactly as
  // the tutor sent it and only moves when the learner moves it.
  const [params, setParams] = useState<SceneParams | null>(null)
  const allVariables = variablesFor(spec.parametric?.kind)
  const variables = useMemo(
    () => allVariables.slice(0, policy.maxControls),
    [allVariables, policy.maxControls],
  )
  const live = params ?? spec.parametric?.params ?? {}

  /**
   * The figure being shown. A rebuild that fails — a value the generator's own
   * validator refuses — falls back to the scene as sent rather than drawing
   * something the generator would not stand behind.
   */
  // The last figure that survived validation, so a value that cannot produce a
  // valid scene (one body at rest in a collision, say) holds the figure steady
  // instead of dropping the learner back to the original or, worse, drawing a
  // degenerate one.
  const lastGood = useRef<SceneSpec>(spec)
  const shown = useMemo(() => {
    if (!spec.parametric || !params) return spec
    const rebuilt = rebuildScene(spec.parametric.kind, params)
    if (rebuilt) lastGood.current = rebuilt
    return rebuilt ?? lastGood.current
  }, [spec, params])

  const explainer = useMemo(() => deriveExplainer(shown), [shown])
  const modes = useMemo(
    () => (policy.offerChallengeModes ? availableModes(shown) : ['explain' as const]),
    [shown, policy.offerChallengeModes],
  )

  const [mode, setMode] = useState<SceneMode>('explain')
  // A beginner opens ON the first stage and walks; everyone else opens
  // complete, which is the pre-existing behaviour.
  const [stage, setStage] = useState<number | null>(policy.openStaged ? 1 : null)
  const [revealed, setRevealed] = useState(false)
  // A colour the learner has chosen to isolate, from the legend.
  const [pinnedColor, setPinnedColor] = useState<string | null>(null)

  // ── animation ──────────────────────────────────────────────────────────────
  const reducedMotion = usePrefersReducedMotion()
  const animations = useMemo(() => availableAnimations(shown, variables), [shown, variables])
  const [playing, setPlaying] = useState<SceneAnimation | null>(null)
  const [progress, setProgress] = useState(0)

  // One clock, owned here; the animation module stays pure. Under reduced
  // motion nothing is ever driven — the same animations remain available, but
  // only as a scrub the learner moves themselves, which shows the identical
  // information without motion.
  useEffect(() => {
    if (!playing || reducedMotion) return
    let frame = 0
    let start = 0
    const tick = (now: number) => {
      if (!start) start = now
      const elapsed = (now - start) % playing.durationMs
      setProgress(elapsed / playing.durationMs)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, reducedMotion])

  // An animation belongs to the figure it was derived from. If the learner
  // moves a slider or switches concept mid-play, stop rather than drive a
  // stale animation against a new scene.
  useEffect(() => {
    if (playing && !animations.some((a) => a.id === playing.id)) {
      setPlaying(null)
      setProgress(0)
    }
  }, [animations, playing])

  const sweep = playing?.kind === 'sweep' ? sweepFrame(shown, playing, progress) : null

  /**
   * THE CAMERA MUST NOT FOLLOW A SWEEP.
   *
   * Every rebuilt frame carries its own fitted camera distance, so a sweep that
   * re-framed each frame would keep the figure the same size on screen while
   * the quantity behind it doubled — the learner would watch a sweep of the
   * force and see nothing move. The camera is therefore pinned, for the length
   * of the sweep, to the WIDEST of its two endpoints, so growth reads as
   * growth. Outside a sweep the ordinary per-figure fit applies unchanged.
   */
  const sweepCamera = useMemo(() => {
    if (!playing || playing.kind !== 'sweep' || !playing.variable) return null
    const ends = [0, 1].map((t) => sweepFrame(shown, playing, t)?.spec.cameraDistance ?? 0)
    const widest = Math.max(...ends)
    return widest > 0 ? widest : null
  }, [playing, shown])

  // ── misconception contrast ─────────────────────────────────────────────────
  // Offered only where the engine has BUILT both figures and confirmed they
  // differ (misconceptionContrast.ts). Neither figure is drawn wrongly: they
  // are two correct renderings of two different situations, and what is wrong
  // is the expectation that they would look the same.
  const contrasts = useMemo(
    () => (policy.offerContrast ? availableContrasts(shown) : []),
    [shown, policy.offerContrast],
  )
  const [contrast, setContrast] = useState<MisconceptionContrast | null>(null)
  const [contrastRevealed, setContrastRevealed] = useState(false)

  // A contrast belongs to the figure it was derived from; a slider move
  // invalidates it rather than leaving a stale comparison on screen.
  useEffect(() => {
    if (contrast && !contrasts.some((c) => c.misconception.id === contrast.misconception.id)) {
      setContrast(null)
      setContrastRevealed(false)
    }
  }, [contrasts, contrast])

  const drawn = contrast
    ? (contrastRevealed ? contrast.actual : contrast.believed)
    : sweep
      ? (sweepCamera ? { ...sweep.spec, cameraDistance: sweepCamera } : sweep.spec)
      : shown

  const total = Math.max(1, drawn.steps.length)
  const walking = stage !== null
  const animatedStage = playing?.kind === 'stages' ? stageAt(drawn, progress) : null
  const stageState = stageView(drawn, animatedStage ?? (walking ? stage! : Infinity), mode)
  const stageObjects = stageState.objects

  // Legend focus and stage focus are the same mechanism, so they cannot
  // disagree: a pinned colour names the ids drawn in it.
  const focusName = pinnedColor
    ? explainer.legend?.find((l) => l.color === pinnedColor)?.label ?? null
    : null

  const setVar = useCallback((key: string, value: number | string) => {
    setParams((prev) => ({ ...(prev ?? spec.parametric?.params ?? {}), [key]: value }))
  }, [spec])

  // ── representation ─────────────────────────────────────────────────────────
  const [view, setView] = useState<RepresentationView>('spatial')
  const representations = useMemo(
    () => (policy.offerRepresentations ? availableRepresentations(drawn, explainer) : []),
    [drawn, explainer, policy.offerRepresentations],
  )
  // A view the current figure cannot support must not stay selected — a
  // contrast or a slider can change what the scene states.
  useEffect(() => {
    if (!representations.some((r) => r.view === view)) setView('spatial')
  }, [representations, view])

  const focusIds = useMemo(() => {
    if (!pinnedColor) {
      const byView = focusForView(stageObjects, view)
      return stageState.focusIds.size > 0 ? stageState.focusIds : byView
    }
    const ids = drawn.steps
      .flatMap((s) => s.objects)
      .filter((o) => o.color === pinnedColor && o.id)
      .map((o) => o.id as string)
    return ids.length ? new Set(ids) : stageState.focusIds
  }, [pinnedColor, drawn, stageState.focusIds, stageObjects, view])

  // A trace draws its path up to the marker, so the route appears over time
  // rather than sitting there complete while a dot slides along it.
  const drawnObjects = useMemo(() => {
    // Order matters: the stage decides what has been REVEALED, the mode decides
    // what is WITHHELD, and the representation decides what is FOREGROUNDED.
    // Each narrows the last; none of them rewrites an object.
    const staged = budgetLabels(objectsForView(stageObjects, view), policy)
    if (playing?.kind !== 'trace') return staged
    const walked = traceObjects(staged, playing.objectId, progress)
    const head = tracePlayhead(drawn, playing.objectId, progress)
    return head ? [...walked, head] : walked
  }, [playing, stageObjects, view, drawn, progress, policy])

  const working = useMemo(() => workingLines(explainer), [explainer])
  const heldBackLabels = labelsHeldBack(objectsForView(stageObjects, view), policy)

  const predicting = mode === 'predict' && !revealed
  /** True in any mode whose whole point is that the learner works it out. */
  const answerWithheld = predicting || mode === 'practice' || mode === 'assess'
    || (contrast !== null && !contrastRevealed)

  /**
   * STUDY MODE — the TOP LAYER, not a fixed overlay.
   *
   * The first version used `position: fixed; inset: 16px`. That is correct only
   * while no ancestor establishes a containing block, and in the real lesson
   * one does: a fixed element is positioned against the nearest ancestor with a
   * transform, filter, backdrop-filter, perspective, contain or will-change,
   * and the lesson's message column has one. Reported and reproduced from the
   * deployed app: expanding left the figure trapped inside the message row,
   * clipped at the bottom of the scrolling messages area, with the scene below
   * the cut and NO WAY TO SCROLL TO IT. It looked fine on the dev harness,
   * whose ancestors are plain — which is exactly why it shipped.
   *
   * `requestFullscreen()` puts the element in the browser's top layer, which is
   * outside the whole ancestor chain by construction, so no ancestor property
   * can trap it. It does NOT move the node and does NOT remount the React
   * subtree, so the canvas keeps its WebGL context and the learner keeps their
   * stage, mode, focus and slider values — the property that made the class
   * approach right in the first place is kept.
   *
   * Where the API is unavailable (notably iOS Safari, which allows fullscreen
   * on <video> only) the fallback is an IN-FLOW expansion: the figure simply
   * takes a much larger scene budget and the lesson's own scroll container
   * reaches all of it. That cannot be trapped either, because it never tries to
   * escape anything.
   */
  const frameRef = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState(false)
  const canFullscreen = typeof document !== 'undefined'
    && typeof HTMLElement !== 'undefined'
    && typeof HTMLElement.prototype.requestFullscreen === 'function'
    && (document.fullscreenEnabled ?? false)

  const toggleExpanded = useCallback(() => {
    const el = frameRef.current
    if (!canFullscreen || !el) { setExpanded((v) => !v); return }
    if (document.fullscreenElement === el) void document.exitFullscreen()
    else void el.requestFullscreen().catch(() => setExpanded(true))
  }, [canFullscreen])

  // The browser owns Escape and the system fullscreen affordances, so the flag
  // follows the DOM rather than the other way round — otherwise leaving
  // fullscreen by any route the button did not initiate would desynchronise it.
  useEffect(() => {
    if (!canFullscreen) return
    const sync = () => setExpanded(document.fullscreenElement === frameRef.current)
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [canFullscreen])

  // Escape for the in-flow fallback only; in fullscreen the browser handles it.
  useEffect(() => {
    if (!expanded || canFullscreen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpanded(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded, canFullscreen])

  /**
   * What stays in front of the learner, and what waits behind a disclosure.
   *
   * The split is by ROLE, not by length or by count: everything needed to READ
   * the figure stays visible — the first explanation panel, the legend, the
   * result, the controls. What moves into the tail is what is only useful once
   * it HAS been read: the key insight, and any further explanation panels.
   * Nothing is dropped at any width, which is the rule this frame was built on.
   */
  const panels = explainer.panels ?? []
  const primaryPanels = panels.slice(0, 1)
  const tailPanels = panels.slice(1)
  const hasTail = tailPanels.length > 0 || Boolean(explainer.insight)

  return (
    <figure
      ref={frameRef}
      className={`${styles.frame}${expanded ? ` ${styles.frameExpanded}` : ''}`}
      role="figure"
      aria-label={shown.ariaLabel ?? shown.title}
      style={{ margin: 0 }}
    >
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>{explainer.title}</h3>
          {explainer.givens && <p className={styles.givens}>{explainer.givens}</p>}
          {/* The result chip states the answer, so it is withheld by exactly
              the modes that withhold the answer inside the figure. Without
              this the challenge layer was defeated by its own header: measured
              in the browser, practice mode hid the label on the canvas and
              printed the same number in the chip above it. */}
          {explainer.result && !answerWithheld && (
            <p className={styles.result}>
              <span>{explainer.result.expression}</span>
              {explainer.result.value && <span className={styles.resultValue}>{explainer.result.value}</span>}
            </p>
          )}
        </div>

        <button
          type="button"
          className={styles.expandBtn}
          aria-label={expanded ? 'Return the figure to the lesson' : 'Expand the figure'}
          aria-pressed={expanded}
          title={expanded ? 'Close (Esc)' : 'Expand'}
          onClick={toggleExpanded}
        >
          {expanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>

      </header>

      <div className={styles.body}>
        <div className={styles.stage}>
          <SceneSpecRenderer
            spec={drawn}
            objects={drawnObjects}
            focusIds={focusIds}
            decor={decorForView(view)}
          />

          {/* ── REPRESENTATION ──────────────────────────────────────────
              The same objects, told four ways. Offered only as far as this
              figure can honestly go: a scene with no apparatus has no
              schematic step, and one that states no relationship has no
              symbolic one. */}
          {representations.length > 1 && (
            <div className={styles.bar} style={{ marginTop: 10 }} role="group" aria-label="How this is shown">
              {representations.map((r, i) => (
                <span key={r.view} className={styles.bar}>
                  {i > 0 && <span className={styles.arrow} aria-hidden="true">→</span>}
                  <button
                    type="button"
                    className={`${styles.chip}${view === r.view ? ` ${styles.chipActive}` : ''}`}
                    aria-pressed={view === r.view}
                    onClick={() => setView(r.view)}
                    title={r.teaches}
                  >
                    {r.label}
                  </button>
                </span>
              ))}
            </div>
          )}

          {view !== 'spatial' && (
            <p className={styles.note}>
              {representations.find((r) => r.view === view)?.teaches}
            </p>
          )}

          {/* The working, raised beside the figure, with each symbol painted in
              the colour of the object it stands for — the mapping a learner is
              otherwise asked to make in their head. */}
          {(view === 'symbolic' || view === 'numeric') && working.length > 0 && (
            <div className={styles.working}>
              {working.map((line, i) => (
                <p key={`${line}-${i}`} className={styles.workingLine}>
                  {linkSymbols(line, explainer.legend ?? []).map((token, j) => (
                    <span key={j} style={token.color ? { color: themeColor(token.color, theme), fontWeight: 800 } : undefined}>
                      {token.text}
                    </span>
                  ))}
                </p>
              ))}
              {view === 'numeric' && explainer.result?.value && !answerWithheld && (
                <p className={styles.workingResult}>{explainer.result.value}</p>
              )}
            </div>
          )}

          <div className={styles.bar} style={{ marginTop: 10 }}>
            {total > 1 && (
              <>
                <button
                  type="button"
                  className={styles.stepBtn}
                  aria-label="Previous stage"
                  disabled={walking && stage === 1}
                  onClick={() => setStage((s) => (s === null ? total - 1 : Math.max(1, s - 1)))}
                >
                  <ChevronLeft size={14} />
                </button>
                <span className={styles.stageMeta}>
                  {walking ? `Stage ${stageState.stage} of ${total}` : `${total} stages`}
                  {stageState.intent ? ` · ${stageState.intent}` : ''}
                </span>
                <button
                  type="button"
                  className={styles.stepBtn}
                  aria-label="Next stage"
                  disabled={walking && stage === total}
                  onClick={() => setStage((s) => (s === null ? 1 : Math.min(total, s + 1)))}
                >
                  <ChevronRight size={14} />
                </button>
                {walking && (
                  <button type="button" className={styles.chip} onClick={() => setStage(null)}>
                    Show all
                  </button>
                )}
              </>
            )}

            {modes.length > 1 && (
              <div className={styles.bar} style={{ marginLeft: 'auto' }} role="group" aria-label="How this figure is being used">
                {modes.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`${styles.chip}${mode === m ? ` ${styles.chipActive}` : ''}`}
                    aria-pressed={mode === m}
                    onClick={() => { setMode(m); setRevealed(false) }}
                  >
                    {MODE_LABEL[m]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── MISCONCEPTION CONTRAST ──────────────────────────────────
              Predict, then reveal, then correct — in that order. The
              correction is not rendered at all until the learner has
              committed, because reading the answer first is what turns a
              contrast back into a demonstration. */}
          {contrasts.length > 0 && !contrast && (
            <div className={styles.bar} style={{ marginTop: 8 }} role="group" aria-label="Check a common idea">
              {contrasts.map((c) => (
                <button
                  key={c.misconception.id}
                  type="button"
                  className={styles.chip}
                  onClick={() => { setContrast(c); setContrastRevealed(false); setPlaying(null) }}
                >
                  Check a common idea
                </button>
              ))}
            </div>
          )}

          {contrast && (
            <div className={styles.contrast}>
              <p className={styles.contrastClaim}>
                <span className={styles.contrastTag}>A common idea</span>
                {contrast.misconception.claim}
              </p>

              {!contrastRevealed ? (
                <>
                  <p className={styles.panelBody} style={{ color: 'var(--text-primary)' }}>
                    {contrast.misconception.prompt}
                  </p>
                  <p className={styles.effect} style={{ margin: '4px 0 0' }}>
                    Showing the case that idea predicts. Decide what you expect before revealing.
                  </p>
                  <div className={styles.predictOptions}>
                    <button
                      type="button"
                      className={`${styles.chip} ${styles.chipActive}`}
                      onClick={() => setContrastRevealed(true)}
                    >
                      Reveal what actually happens
                    </button>
                    <button type="button" className={styles.chip} onClick={() => setContrast(null)}>
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className={styles.panelBody} style={{ color: 'var(--text-primary)' }} role="status">
                    {contrast.misconception.correction}
                  </p>
                  <div className={styles.predictOptions}>
                    <button type="button" className={styles.chip} onClick={() => setContrastRevealed(false)}>
                      Show the other case again
                    </button>
                    <button
                      type="button"
                      className={styles.chip}
                      onClick={() => { setContrast(null); setContrastRevealed(false) }}
                    >
                      Back to the figure
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── ANIMATION ────────────────────────────────────────────────
              Offered only where the engine has established that the motion
              changes the figure (see sceneAnimation.ts). Each control states
              what its motion teaches, in text, so the claim survives reduced
              motion and a screen reader. */}
          {animations.length > 0 && !contrast && (
            <div className={styles.bar} style={{ marginTop: 8 }} role="group" aria-label="Animations">
              {animations.map((a) => {
                const active = playing?.id === a.id
                return (
                  <button
                    key={a.id}
                    type="button"
                    className={`${styles.chip}${active ? ` ${styles.chipActive}` : ''}`}
                    aria-pressed={active}
                    onClick={() => {
                      setPlaying(active ? null : a)
                      setProgress(0)
                    }}
                  >
                    <span className={styles.chipIcon} aria-hidden="true">
                      {active && !reducedMotion ? <Pause size={11} /> : <Play size={11} />}
                    </span>
                    {a.label}
                  </button>
                )
              })}
            </div>
          )}

          {playing && (
            <div className={styles.animationPanel}>
              <p className={styles.effect} style={{ margin: 0 }}>
                {reducedMotion ? 'Motion is off — drag to step through it. ' : ''}
                This shows {playing.teaches}.
              </p>
              <div className={styles.control} style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(70px, auto)', marginTop: 6 }}>
                <input
                  className={styles.slider}
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={progress}
                  aria-label={`Position in ${playing.label}`}
                  onChange={(e) => setProgress(Number(e.target.value))}
                />
                <output className={styles.controlValue}>
                  {sweep ? `${playing.variable?.key ? '' : ''}${sweep.value}` : `${Math.round(progress * 100)}%`}
                </output>
              </div>
            </div>
          )}

          {heldBackLabels > 0 && (
            <p className={styles.note}>
              {heldBackLabels} more {heldBackLabels === 1 ? 'label is' : 'labels are'} on this figure —
              walk the stages to meet them one at a time.
            </p>
          )}

          {focusName && (
            <p className={styles.note} role="status">
              Focused on <strong>{focusName}</strong>. The rest of the figure is dimmed, not removed.
            </p>
          )}

          {mode !== 'explain' && (
            <p className={styles.note}>
              {MODE_HINT[mode]}
              {stageState.withheldCount > 0 && ` (${stageState.withheldCount} hidden)`}
            </p>
          )}

          {walking && stageState.narration && <p className={styles.narration} style={{ marginTop: 8 }}>{stageState.narration}</p>}

          {predicting && (
            <div className={styles.predict} style={{ marginTop: 10 }}>
              <p className={styles.panelBody} style={{ color: 'var(--text-primary)' }}>
                {stageState.predict?.question ?? 'What do you think the result will be?'}
              </p>
              <div className={styles.predictOptions}>
                {stageState.predict?.options?.map((opt) => (
                  <button key={opt} type="button" className={styles.chip} onClick={() => setRevealed(true)}>
                    {opt}
                  </button>
                ))}
                <button type="button" className={`${styles.chip} ${styles.chipActive}`} onClick={() => setRevealed(true)}>
                  Reveal
                </button>
              </div>
            </div>
          )}
        </div>

        {(primaryPanels.length > 0 || variables.length > 0 || (explainer.legend?.length ?? 0) > 0) && (
          <div className={styles.rail}>
            {/* The legend reads with the explanation, not above the picture.
                In the header it was a five-row column that either doubled the
                header's height or wrapped onto a line of its own and spanned
                the full width; here it is one more compact block in the same
                grid, and it sits next to the prose that refers to it. */}
            {explainer.legend && explainer.legend.length > 0 && (
              <div className={styles.legend} aria-label="What the colours mean">
                {explainer.legend.map((row) => {
                  const active = pinnedColor === row.color
                  return (
                    <button
                      key={row.color}
                      type="button"
                      className={`${styles.legendRow}${active ? ` ${styles.legendRowActive}` : ''}`}
                      aria-pressed={active}
                      onClick={() => setPinnedColor(active ? null : row.color)}
                      title={active ? 'Show the whole figure again' : `Focus on ${row.label}`}
                    >
                      <Swatch shape={row.shape} color={themeColor(row.color, theme) ?? row.color} />
                      <span>{row.label}</span>
                    </button>
                  )
                })}
              </div>
            )}

            {primaryPanels.map((panel) => (
              <section key={panel.heading} className={styles.panel}>
                <h4 className={styles.panelHeading}>{panel.heading}</h4>
                {panel.body && <p className={styles.panelBody}>{panel.body}</p>}
                {panel.lines && (
                  <div className={styles.panelLines}>
                    {panel.lines.map((linetext, i) => (
                      <span
                        key={`${linetext}-${i}`}
                        className={linetext === panel.emphasis ? styles.panelLineEmphasis : undefined}
                      >
                        {linetext}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* The controls are how this figure teaches cause and effect, so
                they stay in front of the learner at every width and are never
                what gets collapsed. They share the grid row with the
                explanation rather than starting a second full-width band under
                it — two bands is how the frame grew past a viewport. */}
            {variables.length > 0 && (
              <section className={`${styles.panel} ${styles.railWide}`}>
                <h4 className={styles.panelHeading}>Try changing values</h4>
                <div className={styles.controls}>
                  {variables.map((v) => (
                    <Control
                      key={v.key}
                      variable={v}
                      value={live[v.key] ?? defaultValueOf(v)}
                      idPrefix={shown.id}
                      showEffect={policy.showEffects}
                      onChange={setVar}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {hasTail && (
        <details className={styles.more}>
          <summary className={styles.moreSummary}>
            <ChevronRight size={14} className={styles.moreChevron} aria-hidden="true" />
            More insights
          </summary>
          <div className={styles.moreBody}>
            {explainer.insight && (
              <section className={styles.panel}>
                <h4 className={styles.panelHeading}>{explainer.insight.heading ?? 'Key insight'}</h4>
                {explainer.insight.bullets.length > 0 && (
                  <ul className={styles.insightList}>
                    {explainer.insight.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
                {explainer.insight.note && <p className={styles.note}>{explainer.insight.note}</p>}
              </section>
            )}
            {tailPanels.map((panel) => (
              <section key={panel.heading} className={styles.panel}>
                <h4 className={styles.panelHeading}>{panel.heading}</h4>
                {panel.body && <p className={styles.panelBody}>{panel.body}</p>}
                {panel.lines && (
                  <div className={styles.panelLines}>
                    {panel.lines.map((linetext, i) => (
                      <span
                        key={`${linetext}-${i}`}
                        className={linetext === panel.emphasis ? styles.panelLineEmphasis : undefined}
                      >
                        {linetext}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </details>
      )}

      {shown.teachingGoal && !explainer.insight && (
        <figcaption className={styles.note}>{shown.teachingGoal}</figcaption>
      )}
    </figure>
  )
}


/**
 * One variable, drawn as the control its TYPE calls for.
 *
 * A continuous quantity gets a slider; a set of named cases gets buttons. The
 * causal claim is printed either way, because that sentence — not the movement
 * — is what makes the control teach, and it is the only part of the interaction
 * that survives a screen reader or `prefers-reduced-motion`.
 */
function Control({
  variable, value, idPrefix, showEffect, onChange,
}: {
  variable: SceneVariable
  value: number | string
  idPrefix: string
  /**
   * Print the causal claim under the control. On for a beginner, who needs the
   * guidance; off for an advanced learner, for whom that sentence states the
   * thing they are there to work out. The claim is never DELETED — it stays on
   * the control as its accessible description either way.
   */
  showEffect: boolean
  onChange: (key: string, value: number | string) => void
}) {
  const id = `${idPrefix}-${variable.key}`

  if (variable.kind === 'choice') {
    return (
      <div className={styles.control} style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
        <span className={styles.controlLabel} id={`${id}-label`}>{variable.label}</span>
        <div className={styles.predictOptions} role="group" aria-labelledby={`${id}-label`} aria-describedby={`${id}-effect`}>
          {variable.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.chip}${value === opt.value ? ` ${styles.chipActive}` : ''}`}
              aria-pressed={value === opt.value}
              onClick={() => onChange(variable.key, opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p id={`${id}-effect`} className={styles.effect} hidden={!showEffect}>{variable.effect}</p>
      </div>
    )
  }

  const numeric = typeof value === 'number' ? value : variable.min
  return (
    <div className={styles.control}>
      <label className={styles.controlLabel} htmlFor={id}>
        {variable.label}{variable.unit ? ` (${variable.unit})` : ''}
      </label>
      <input
        id={id}
        className={styles.slider}
        type="range"
        min={variable.min}
        max={variable.max}
        step={variable.step}
        value={numeric}
        aria-describedby={`${id}-effect`}
        onChange={(e) => onChange(variable.key, Number(e.target.value))}
      />
      <output className={styles.controlValue} htmlFor={id}>{numeric}</output>
      <p id={`${id}-effect`} className={styles.effect} hidden={!showEffect}>{variable.effect}</p>
    </div>
  )
}

/**
 * The legend mark. Its SHAPE matches how the thing is drawn — a line for a rod,
 * an arrow for a vector, a disc for a body — so the legend is readable without
 * relying on the colour, which is the accessibility rule this engine already
 * applies inside the canvas.
 */
function Swatch({ shape, color }: { shape: 'line' | 'arrow' | 'dot'; color: string }) {
  if (shape === 'dot') {
    return (
      <svg className={styles.swatch} width="22" height="10" aria-hidden="true">
        <circle cx="11" cy="5" r="4.5" fill={color} />
      </svg>
    )
  }
  return (
    <svg className={styles.swatch} width="22" height="10" aria-hidden="true">
      <line x1="1" y1="5" x2={shape === 'arrow' ? 15 : 21} y2="5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {shape === 'arrow' && <polygon points="15,1.5 21,5 15,8.5" fill={color} />}
    </svg>
  )
}

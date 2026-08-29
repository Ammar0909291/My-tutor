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
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
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

export function ExplainerFigure({ spec }: { spec: SceneSpec }) {
  const { theme } = useTheme()

  // ── the learner's own parameter values ────────────────────────────────────
  // Seeded from what the scene was built with, so the figure opens exactly as
  // the tutor sent it and only moves when the learner moves it.
  const [params, setParams] = useState<SceneParams | null>(null)
  const variables = variablesFor(spec.parametric?.kind)
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
  const modes = useMemo(() => availableModes(shown), [shown])

  const [mode, setMode] = useState<SceneMode>('explain')
  const [stage, setStage] = useState<number | null>(null)
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
  const contrasts = useMemo(() => availableContrasts(shown), [shown])
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
  const view = stageView(drawn, animatedStage ?? (walking ? stage! : Infinity), mode)

  // Legend focus and stage focus are the same mechanism, so they cannot
  // disagree: a pinned colour names the ids drawn in it.
  const focusIds = useMemo(() => {
    if (!pinnedColor) return view.focusIds
    const ids = drawn.steps
      .flatMap((s) => s.objects)
      .filter((o) => o.color === pinnedColor && o.id)
      .map((o) => o.id as string)
    return ids.length ? new Set(ids) : view.focusIds
  }, [pinnedColor, drawn, view.focusIds])

  const focusName = pinnedColor
    ? explainer.legend?.find((l) => l.color === pinnedColor)?.label ?? null
    : null

  const setVar = useCallback((key: string, value: number | string) => {
    setParams((prev) => ({ ...(prev ?? spec.parametric?.params ?? {}), [key]: value }))
  }, [spec])

  // A trace draws its path up to the marker, so the route appears over time
  // rather than sitting there complete while a dot slides along it.
  const drawnObjects = useMemo(() => {
    if (playing?.kind !== 'trace') return view.objects
    const walked = traceObjects(view.objects, playing.objectId, progress)
    const head = tracePlayhead(drawn, playing.objectId, progress)
    return head ? [...walked, head] : walked
  }, [playing, view.objects, drawn, progress])

  const predicting = mode === 'predict' && !revealed
  /** True in any mode whose whole point is that the learner works it out. */
  const answerWithheld = predicting || mode === 'practice' || mode === 'assess'
    || (contrast !== null && !contrastRevealed)

  return (
    <figure
      className={styles.frame}
      role="figure"
      aria-label={shown.ariaLabel ?? shown.title}
      style={{ margin: 0 }}
    >
      <header className={styles.header}>
        <div style={{ minWidth: 0 }}>
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
      </header>

      <div className={styles.body}>
        <div className={styles.stage}>
          <SceneSpecRenderer spec={drawn} objects={drawnObjects} focusIds={focusIds} />

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
                  {walking ? `Stage ${view.stage} of ${total}` : `${total} stages`}
                  {view.intent ? ` · ${view.intent}` : ''}
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

          {focusName && (
            <p className={styles.note} role="status">
              Focused on <strong>{focusName}</strong>. The rest of the figure is dimmed, not removed.
            </p>
          )}

          {mode !== 'explain' && (
            <p className={styles.note}>
              {MODE_HINT[mode]}
              {view.withheldCount > 0 && ` (${view.withheldCount} hidden)`}
            </p>
          )}

          {walking && view.narration && <p className={styles.narration} style={{ marginTop: 8 }}>{view.narration}</p>}

          {predicting && (
            <div className={styles.predict} style={{ marginTop: 10 }}>
              <p className={styles.panelBody} style={{ color: 'var(--text-primary)' }}>
                {view.predict?.question ?? 'What do you think the result will be?'}
              </p>
              <div className={styles.predictOptions}>
                {view.predict?.options?.map((opt) => (
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

        {explainer.panels && explainer.panels.length > 0 && (
          <div className={styles.rail}>
            {explainer.panels.map((panel) => (
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
        )}
      </div>

      {(explainer.insight || variables.length > 0) && (
        <div className={styles.footer}>
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

          {variables.length > 0 && (
            <section className={styles.panel}>
              <h4 className={styles.panelHeading}>Try changing values</h4>
              {variables.map((v) => (
                <Control
                  key={v.key}
                  variable={v}
                  value={live[v.key] ?? defaultValueOf(v)}
                  idPrefix={shown.id}
                  onChange={setVar}
                />
              ))}
            </section>
          )}
        </div>
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
  variable, value, idPrefix, onChange,
}: {
  variable: SceneVariable
  value: number | string
  idPrefix: string
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
        <p id={`${id}-effect`} className={styles.effect}>{variable.effect}</p>
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
      <p id={`${id}-effect`} className={styles.effect}>{variable.effect}</p>
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

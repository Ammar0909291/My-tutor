'use client'
// ─── Tutor Max "thinking" indicator ─────────────────────────────────────────
// Replaces the old blinking `•••` dots (bounceDot / .typing-dot in
// globals.css — now unused by this component; left in place only in case
// another surface still references it, see the search note in the CSS
// module). A breathing brain glyph with two orbiting sparkle particles and a
// soft pulsing glow, built entirely from CSS animation on lucide-react's
// already-shipped Brain/Sparkle icons — no GIF, no new SVG paths to author
// and risk looking amateurish, no new dependency.
//
// ONE ATOMIC, NON-WRAPPING ELEMENT (see the root-cause note in
// LessonScreen.module.css's `.thinkingBrain` rule): the icon stage is
// `flex-shrink: 0` so it is never the thing that gives way, and only the
// trailing label is allowed to ellipsis if space is ever genuinely
// insufficient — the indicator can shrink, but it can never split onto a
// second line.
//
// `compact` renders the icon alone, for spots with no room for text (the
// full-screen lesson-loading state). The per-message empty-streaming-bubble
// slot below intentionally uses the NON-compact (icon + label) form: the
// "Tutor Max" avatar/name row just above it is explicitly hidden while
// `msg.streaming` is true (see the `!msg.streaming` guard on that row), so
// during exactly the window this indicator is visible there is no other
// "Tutor Max" affiliation shown at all — the label here is load-bearing, not
// redundant. (An earlier version of this component ALSO rendered a second,
// separate "between-turns" Pill with its own label immediately after the
// message list, on the theory that it covered a different moment than this
// one. It didn't: both `setIsStreaming(true)` and the empty placeholder
// message are appended in the same synchronous update in every send path,
// so the two conditions were always true at once — a visible double-brain
// render, not two indicators for two moments. That second Pill was removed;
// this is the only "thinking" indicator in the message stream.)
// Both pass `label` explicitly because this is a module-level, pure,
// presentational function — it has no hook access to `useLanguage()`'s `t`,
// by the same design as every other helper in this file (AiBadge,
// MessageContent, ...) — and that keeps it trivially testable in isolation.
//
// MOVED OUT OF LessonScreen.tsx so the "preparing a figure" state below can
// share the same visual language without importing the lesson screen — which
// would be a cycle, since the lesson screen lazily imports the figure this
// indicator stands in for. `LessonScreen` re-exports `ThinkingBrain` under its
// old name, so every existing import and the regression suite are unchanged.
import { Brain, Sparkle } from 'lucide-react'
import styles from './ThinkingBrain.module.css'

export function ThinkingBrain({ label, compact = false, size = 34 }: { label: string; compact?: boolean; size?: number }) {
  return (
    <span className={styles.thinkingBrain} role="status" aria-label={label}>
      <span
        className={styles.brainStage}
        style={{ width: size, height: size, ['--orbit-radius' as string]: `${Math.round(size * 0.46)}px` }}
        aria-hidden="true"
      >
        <span className={styles.brainGlow} />
        <span className={styles.orbitTrack} />
        <Brain size={Math.round(size * 0.6)} strokeWidth={1.75} className={styles.brainIcon} />
        <span className={`${styles.orbitRing} ${styles.orbitRing1}`}>
          <span className={styles.particleDot}><Sparkle size={Math.max(9, Math.round(size * 0.26))} strokeWidth={1.5} /></span>
        </span>
        <span className={`${styles.orbitRing} ${styles.orbitRing2}`}>
          <span className={styles.particleDot}><Sparkle size={Math.max(7, Math.round(size * 0.18))} strokeWidth={1.5} /></span>
        </span>
        <span className={styles.spark} />
      </span>
      {!compact && <span className={styles.thinkingLabel}>{label}</span>}
    </span>
  )
}

/**
 * "Preparing the figure" — a different moment, said differently.
 *
 * The tutor's reply has already arrived. What the learner is waiting for is the
 * 3D renderer's own chunk and its canvas mount, which on a cold cache is a real
 * and visible pause. Before this existed that pause was an unexplained blank
 * that then jumped to full height when the figure landed.
 *
 * It reserves the FIGURE'S OWN box, so what replaces it is the same size as
 * what it stood in for and nothing on the page moves. Deliberately quieter than
 * the thinking indicator — smaller glyph, its own words — because the tutor is
 * no longer thinking, and an identical indicator would say it was.
 */
export function VisualPreparing({ label = 'Preparing the figure…' }: { label?: string }) {
  return (
    <div className={styles.preparing} role="status" aria-live="polite" aria-label={label}>
      <ThinkingBrain compact size={30} label={label} />
      <span className={styles.preparingLabel}>{label}</span>
    </div>
  )
}

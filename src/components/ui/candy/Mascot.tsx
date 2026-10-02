/**
 * Tutor mascot — a sharp-suited human with a cockroach's head (owner-directed 2026-10-01,
 * replacing the earlier bald-eagle artwork). Artwork follows the owner-supplied reference
 * illustration: elongated glossy brown head, faceted black eyes, heavy brows, long antennae with
 * blue sensor tips and "signal" arcs, dark suit with a pale shirt V.
 *
 * ONE drawing, four moods. Every facial feature is a separate layer and the mood is a plain
 * `data-mood` attribute, so changing the prop cross-fades/tweens (brows, eyes, mouth, props)
 * in CSS with no re-mount and no JS timers — the component is a pure function and works in both
 * server and client trees. Motion lives in Mascot.module.css.
 *
 *  - serious  (default) — heavy brows, level mouth, slow breathing, the odd blink, antennae sway.
 *  - thinking — one brow up, eyes glance up-right, wry mouth, head tilted, thought bubble.
 *  - confused — mismatched brows, wavy mouth, head tilting side to side, eyes scanning,
 *               drooping antennae, sweat drop and a floating "?".
 *  - laughing — eyes squeezed shut, brows up, wide open mouth, head and shoulders bouncing,
 *               antennae wiggling, tears of joy and laugh lines.
 *
 * Variants (same drawing, different crop):
 *  - 'hero' — larger (default 110px), shoulders and mood props visible.
 *  - 'logo' — small (default 38px) head-and-antennae crop for top bars / chat avatars; no props.
 * NEVER STATIC (owner requirement): in every mood and at every size the head, antennae and eyes
 * always move, and the eyes blink like a human (fast, irregular, with an occasional double-blink).
 * There is deliberately no prop to freeze it. Under prefers-reduced-motion the big motion is
 * dropped but a soft breath and the blink remain.
 */
import styles from './Mascot.module.css'

export type MascotMood = 'serious' | 'thinking' | 'confused' | 'laughing'

export interface CockroachMascotProps {
  /** Which crop/presentation to render. */
  variant: 'logo' | 'hero'
  /**
   * Rendered width/height in px (the SVG scales uniformly via its viewBox). Defaults to each
   * variant's natural size: 38 for 'logo', 110 for 'hero'.
   */
  size?: number
  /** Facial expression. Defaults to 'serious'. */
  mood?: MascotMood
  /** Soft round backdrop behind the figure. Default true. */
  halo?: boolean
  className?: string
}

const BROW = '#2A120B'
const INK = '#140A06'
const SENSOR = '#6B9BC8'
const SIGNAL = '#6C93B6'
// App brand accent (chalk-yellow in dark, marker-green in light) — defined globally in src/styles/tokens.css.
const BRAND = 'var(--coral, #E8B84B)'

/** Mirror an x coordinate about the face's vertical axis (x = 630). */
const mx = (x: number) => 1260 - x

export function CockroachMascot({
  variant,
  size,
  mood = 'serious',
  halo = true,
  className,
}: CockroachMascotProps) {
  const s = size ?? (variant === 'logo' ? 38 : 110)
  const viewBox = variant === 'logo' ? '130 20 1000 1000' : '30 30 1200 1200'
  const cls = [
    styles.roach,
    variant === 'logo' ? styles.logo : styles.hero,
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <svg viewBox={viewBox} width={s} height={s} className={cls} data-mood={mood} aria-hidden="true" focusable="false">
      {halo && (
        <g>
          <circle cx="630" cy="640" r="500" fill="rgba(127,127,127,0.10)" />
          <circle cx="630" cy="634" r="345" fill="rgba(127,127,127,0.12)" />
        </g>
      )}

      {/* ── "signal" arcs beside the antennae ── */}
      <g className={styles.signals} fill="none" stroke={SIGNAL} strokeWidth="7" strokeLinecap="round">
        <path d="M 234 275 Q 195 215 234 162" />
        <path d="M 270 258 Q 245 215 270 180" />
        <path d={`M ${mx(234)} 275 Q ${mx(195)} 215 ${mx(234)} 162`} />
        <path d={`M ${mx(270)} 258 Q ${mx(245)} 215 ${mx(270)} 180`} />
      </g>

      {/* ── head + neck (pivot = base of the neck) ── */}
      <g transform="translate(630 1070)">
        <g className={`${styles.head} ${styles.pivot}`}>
          <g transform="translate(-630 -1070)">
            {/* antennae (behind the head) */}
            <g transform="translate(604 300)">
              <g className={`${styles.antL} ${styles.pivot}`}>
                <g transform="translate(-604 -300)">
                  <path d="M 604 300 C 560 150 470 62 392 60 C 346 58 322 100 324 138" fill="none" stroke="#8A5A36" strokeWidth="10" strokeLinecap="round" />
                  <circle cx="324" cy="138" r="8" fill={SENSOR} />
                </g>
              </g>
            </g>
            <g transform="translate(656 300)">
              <g className={`${styles.antR} ${styles.pivot}`}>
                <g transform="translate(-656 -300)">
                  <path d="M 656 300 C 700 150 790 62 868 60 C 914 58 938 100 936 138" fill="none" stroke="#8A5A36" strokeWidth="10" strokeLinecap="round" />
                  <circle cx="936" cy="138" r="8" fill={SENSOR} />
                </g>
              </g>
            </g>

            {/* neck */}
            <rect x="570" y="955" width="120" height="135" rx="24" fill="#502C18" />

            {/* head shell */}
            <ellipse cx="630" cy="618" rx="228" ry="333" fill="#6A3C1F" />
            <ellipse cx="630" cy="600" rx="180" ry="318" fill="#82502E" />
            <path d="M 515 312 Q 630 268 745 312" fill="none" stroke="#5C3418" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="557" cy="415" rx="28" ry="106" transform="rotate(-12 557 415)" fill="#A86F45" />
            <ellipse cx="570" cy="372" rx="12" ry="38" transform="rotate(-12 570 372)" fill="#E0B48A" />
            <path d="M 702 413 L 738 443" fill="none" stroke="#5A331B" strokeWidth="5" strokeLinecap="round" />
            <path d="M 612 568 L 630 690 L 656 703" fill="none" stroke="#5A331B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 512 877 Q 630 912 748 877" fill="none" stroke="#5C3418" strokeWidth="4" strokeLinecap="round" opacity="0.5" />

            {/* eyes — open (serious / thinking / confused) */}
            <g className={`${styles.eyeOpen}`}>
              <path d="M 403 562 C 402 520 436 505 478 505 C 520 505 548 528 565 556 C 545 600 505 632 462 632 L 436 632 C 414 612 403 590 403 562 Z" fill={INK} />
              <g className={styles.glint}>
                <circle cx="462" cy="557" r="12" fill="#2E2012" />
                <circle cx="504" cy="570" r="12" fill="#2E2012" />
                <circle cx="480" cy="600" r="12" fill="#2E2012" />
                <path d="M 427 551 Q 460 535 495 540" fill="none" stroke="#D8D2C8" strokeWidth="6" strokeLinecap="round" />
              </g>
            </g>
            <g className={`${styles.eyeOpen}`}>
              <path d="M 857 562 C 858 520 824 505 782 505 C 740 505 712 528 695 556 C 715 600 755 632 798 632 L 824 632 C 846 612 857 590 857 562 Z" fill={INK} />
              <g className={styles.glint}>
                <circle cx="798" cy="557" r="12" fill="#2E2012" />
                <circle cx="756" cy="570" r="12" fill="#2E2012" />
                <circle cx="780" cy="600" r="12" fill="#2E2012" />
                <path d="M 833 551 Q 800 535 765 540" fill="none" stroke="#D8D2C8" strokeWidth="6" strokeLinecap="round" />
              </g>
            </g>
            {/* eyes — squeezed shut with laughter */}
            <g className={styles.eyeShut} fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round">
              <path d="M 418 592 Q 482 520 548 592" />
              <path d={`M ${mx(418)} 592 Q ${mx(482)} 520 ${mx(548)} 592`} />
            </g>

            {/* brows */}
            <line className={`${styles.brow} ${styles.browL}`} x1="372" y1="442" x2="558" y2="515" stroke={BROW} strokeWidth="24" strokeLinecap="round" />
            <line className={`${styles.brow} ${styles.browR}`} x1="888" y1="442" x2="702" y2="515" stroke={BROW} strokeWidth="24" strokeLinecap="round" />

            {/* mouths — one visible per mood */}
            <g className={styles.mSerious} fill="none" stroke={BROW} strokeLinecap="round">
              <path d="M 525 770 Q 545 835 620 833" strokeWidth="18" />
              <path d="M 735 770 Q 715 835 640 833" strokeWidth="18" />
              <path d="M 573 798 L 687 798" strokeWidth="8" />
            </g>
            <path className={styles.mThink} d="M 566 806 Q 606 786 648 802 Q 676 812 698 794" fill="none" stroke={BROW} strokeWidth="15" strokeLinecap="round" />
            <path className={styles.mConfused} d="M 538 810 q 25 -30 50 0 t 50 0 t 50 0 t 34 -6" fill="none" stroke={BROW} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
            <g className={styles.mLaugh}>
              <path d="M 520 756 Q 630 734 740 756 Q 732 884 630 894 Q 528 884 520 756 Z" fill="#1A0905" />
              <ellipse cx="630" cy="866" rx="56" ry="26" fill="#B5483A" />
              <path d="M 536 762 Q 630 746 724 762 L 720 792 Q 630 778 540 792 Z" fill="#E8DCC8" />
            </g>

            {/* sweat drop (confused) */}
            <g transform="translate(414 340)">
              <path className={styles.sweat} d="M 0 -30 Q 20 2 0 16 Q -20 2 0 -30 Z" fill="#7EC8E8" />
            </g>
            {/* tears of joy (laughing) */}
            <g transform="translate(392 612)">
              <path className={styles.tearL} d="M 0 -22 Q 15 2 0 12 Q -15 2 0 -22 Z" fill="#7EC8E8" />
            </g>
            <g transform={`translate(${mx(392)} 612)`}>
              <path className={styles.tearR} d="M 0 -22 Q 15 2 0 12 Q -15 2 0 -22 Z" fill="#7EC8E8" />
            </g>
          </g>
        </g>
      </g>

      {/* ── suit (shoulders bounce when laughing) ── */}
      <g transform="translate(630 1230)">
        <g className={`${styles.body} ${styles.pivot}`}>
          <g transform="translate(-630 -1230)">
            <path d="M 185 1240 C 190 1150 300 1085 450 1066 L 810 1066 C 960 1085 1070 1150 1075 1240 L 1075 1270 L 185 1270 Z" fill="#0B0D12" />
            <path d="M 185 1240 C 190 1150 300 1085 450 1066 L 810 1066 C 960 1085 1070 1150 1075 1240" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="4" />
            <path d="M 362 962 L 512 1020 L 632 1330 L 560 1090 L 452 1064 Z" fill="#151922" />
            <path d={`M ${mx(362)} 962 L ${mx(512)} 1020 L ${mx(632)} 1330 L ${mx(560)} 1090 L ${mx(452)} 1064 Z`} fill="#151922" />
            <path d="M 575 1094 L 685 1094 L 630 1330 Z" fill="#2B2F38" />
            <path d="M 630 1094 L 630 1330" stroke="#4A505C" strokeWidth="3" />
          </g>
        </g>
      </g>

      {/* ── mood props (hidden unless the mood calls for them) ── */}
      <g className={`${styles.prop} ${styles.bubble}`}>
        <circle className={styles.trail1} cx="905" cy="346" r="10" fill={BRAND} />
        <circle className={styles.trail2} cx="948" cy="302" r="15" fill={BRAND} />
        <ellipse cx="1030" cy="228" rx="88" ry="54" fill="rgba(127,127,127,0.14)" stroke={BRAND} strokeWidth="8" />
        <circle className={styles.dot1} cx="990" cy="228" r="11" fill={BRAND} />
        <circle className={styles.dot2} cx="1030" cy="228" r="11" fill={BRAND} />
        <circle className={styles.dot3} cx="1070" cy="228" r="11" fill={BRAND} />
      </g>
      <g className={`${styles.prop} ${styles.question}`} transform="translate(1010 238)">
        <g className={styles.qmark}>
          <path d="M -39 -51 Q -39 -99 6 -99 Q 54 -99 54 -57 Q 54 -27 21 -6 Q 6 6 6 33" fill="none" stroke={BRAND} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="78" r="12" fill={BRAND} />
        </g>
      </g>
      <g className={`${styles.prop} ${styles.laughLines}`} fill="none" stroke={BRAND} strokeWidth="10" strokeLinecap="round">
        <g className={styles.llL}>
          <path d="M 336 430 L 290 404" />
          <path d="M 322 506 L 268 506" />
          <path d="M 336 582 L 290 608" />
        </g>
        <g className={styles.llR}>
          <path d={`M ${mx(336)} 430 L ${mx(290)} 404`} />
          <path d={`M ${mx(322)} 506 L ${mx(268)} 506`} />
          <path d={`M ${mx(336)} 582 L ${mx(290)} 608`} />
        </g>
      </g>
    </svg>
  )
}

/**
 * Bald-eagle mascot SVGs — white head, yellow eyes, hooked golden beak, dark
 * brown body. (Earlier artwork here was round-faced with huge forward eyes
 * and no hook, reading as an owl despite the "eagle" name — owls are
 * culturally inappropriate for Indian students, so this was redrawn.)
 * Two distinct illustrations are available via the `variant` prop:
 *  - 'logo' — the small 38x38 (viewBox 0 0 100 100) mark used in the top bar.
 *  - 'hero' — the larger 110x110 (viewBox 0 0 200 200) mark used in banners.
 */

export interface EagleMascotProps {
  /** Which illustration to render. */
  variant: 'logo' | 'hero'
  /**
   * Rendered width/height in px (the SVG scales uniformly via its
   * viewBox). Defaults to each variant's natural size: 38 for 'logo',
   * 110 for 'hero'.
   */
  size?: number
  className?: string
}

/** Reusable eagle mascot, sized via the `size` prop. */
export function EagleMascot({ variant, size, className }: EagleMascotProps) {
  if (variant === 'logo') {
    const s = size ?? 38
    return (
      <svg viewBox="0 0 100 100" width={s} height={s} className={className}>
        <g transform="translate(50,54) scale(0.5)">
          <ellipse cx="0" cy="74" rx="44" ry="8" fill="#000000" opacity="0.12" />
          <path d="M -70 -8 Q -86 12 -70 34 Q -56 31 -46 14 Q -54 -1 -70 -8 Z" fill="#3D2A1A" />
          <path d="M -68 -2 Q -78 14 -70 28 M -60 -4 Q -68 14 -62 29 M -54 1 Q -60 16 -56 28" stroke="#241509" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 70 -8 Q 86 12 70 34 Q 56 31 46 14 Q 54 -1 70 -8 Z" fill="#3D2A1A" />
          <path d="M 68 -2 Q 78 14 70 28 M 60 -4 Q 68 14 62 29 M 54 1 Q 60 16 56 28" stroke="#241509" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 0 10 Q -36 8 -34 42 Q -32 68 0 68 Q 32 68 34 42 Q 36 8 0 10 Z" fill="#3D2A1A" />
          <path d="M 0 22 Q -20 22 -20 44 Q -20 62 0 62 Q 20 62 20 44 Q 20 22 0 22 Z" fill="#5A4736" />
          <path d="M -10 60 Q -14 69 -17 68 Q -15 63 -12 59 Z" fill="#F5A623" />
          <path d="M -5 62 Q -6 71 -9 71 Q -8 65 -6 60 Z" fill="#F5A623" />
          <path d="M 10 60 Q 14 69 17 68 Q 15 63 12 59 Z" fill="#F5A623" />
          <path d="M 5 62 Q 6 71 9 71 Q 8 65 6 60 Z" fill="#F5A623" />
          <path d="M 0 -58 Q 36 -58 36 -18 Q 36 12 0 14 Q -36 12 -36 -18 Q -36 -58 0 -58 Z" fill="#FFFFFF" />
          <path d="M -36 -18 Q -34 -38 0 -40 Q 34 -38 36 -18 Q 28 -30 0 -31 Q -28 -30 -36 -18 Z" fill="#EDEDED" />
          <path d="M -28 -28 Q -16 -36 -4 -26" stroke="#D4A017" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 4 -26 Q 16 -36 28 -28" stroke="#D4A017" strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx="-14" cy="-16" rx="9" ry="10" fill="#FFD23C" />
          <ellipse cx="14" cy="-16" rx="9" ry="10" fill="#FFD23C" />
          <circle cx="-12" cy="-15" r="5" fill="#241509" />
          <circle cx="16" cy="-15" r="5" fill="#241509" />
          <circle cx="-10" cy="-17" r="1.6" fill="#FFFFFF" />
          <circle cx="18" cy="-17" r="1.6" fill="#FFFFFF" />
          <path d="M -10 -2 Q 0 -6 10 -2 Q 12 8 6 14 Q 10 16 8 20 Q 2 24 -4 18 Q -10 14 -10 6 Z" fill="#F5A623" />
          <path d="M 6 14 Q 10 16 8 20 Q 2 24 -4 18 Z" fill="#D4881A" />
        </g>
      </svg>
    )
  }

  const s = size ?? 110
  return (
    <svg viewBox="0 0 200 200" width={s} height={s} className={className}>
      <g transform="translate(100,100)">
        <ellipse cx="0" cy="74" rx="44" ry="8" fill="#000000" opacity="0.12" />
        <path d="M -70 -8 Q -86 12 -70 34 Q -56 31 -46 14 Q -54 -1 -70 -8 Z" fill="#3D2A1A" />
        <path d="M -68 -2 Q -78 14 -70 28 M -60 -4 Q -68 14 -62 29 M -54 1 Q -60 16 -56 28" stroke="#241509" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 70 -8 Q 86 12 70 34 Q 56 31 46 14 Q 54 -1 70 -8 Z" fill="#3D2A1A" />
        <path d="M 68 -2 Q 78 14 70 28 M 60 -4 Q 68 14 62 29 M 54 1 Q 60 16 56 28" stroke="#241509" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 0 10 Q -36 8 -34 42 Q -32 68 0 68 Q 32 68 34 42 Q 36 8 0 10 Z" fill="#3D2A1A" />
        <path d="M 0 22 Q -20 22 -20 44 Q -20 62 0 62 Q 20 62 20 44 Q 20 22 0 22 Z" fill="#5A4736" />
        <path d="M -10 60 Q -14 69 -17 68 Q -15 63 -12 59 Z" fill="#F5A623" />
        <path d="M -5 62 Q -6 71 -9 71 Q -8 65 -6 60 Z" fill="#F5A623" />
        <path d="M 10 60 Q 14 69 17 68 Q 15 63 12 59 Z" fill="#F5A623" />
        <path d="M 5 62 Q 6 71 9 71 Q 8 65 6 60 Z" fill="#F5A623" />
        <path d="M 0 -58 Q 36 -58 36 -18 Q 36 12 0 14 Q -36 12 -36 -18 Q -36 -58 0 -58 Z" fill="#FFFFFF" />
        <path d="M -36 -18 Q -34 -38 0 -40 Q 34 -38 36 -18 Q 28 -30 0 -31 Q -28 -30 -36 -18 Z" fill="#EDEDED" />
        <path d="M -28 -28 Q -16 -36 -4 -26" stroke="#D4A017" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 4 -26 Q 16 -36 28 -28" stroke="#D4A017" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="-14" cy="-16" rx="9" ry="10" fill="#FFD23C" />
        <ellipse cx="14" cy="-16" rx="9" ry="10" fill="#FFD23C" />
        <circle cx="-12" cy="-15" r="5" fill="#241509" />
        <circle cx="16" cy="-15" r="5" fill="#241509" />
        <circle cx="-10" cy="-17" r="1.6" fill="#FFFFFF" />
        <circle cx="18" cy="-17" r="1.6" fill="#FFFFFF" />
        <path d="M -10 -2 Q 0 -6 10 -2 Q 12 8 6 14 Q 10 16 8 20 Q 2 24 -4 18 Q -10 14 -10 6 Z" fill="#F5A623" />
        <path d="M 6 14 Q 10 16 8 20 Q 2 24 -4 18 Z" fill="#D4881A" />
      </g>
    </svg>
  )
}

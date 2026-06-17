/**
 * Shared color-band lookup for school presentation surfaces (Sprint F).
 * Consolidates the ~8 duplicated `Record<string, { color, bg, border }>`
 * style-lookup objects that previously lived inline in the chapter detail
 * page (one per insight card: mastery, transfer, confidence, momentum,
 * teaching strategy, narrative, etc.) into a single semantic band palette
 * built on candy tokens. Each call site maps its own enum to one of these
 * bands instead of repeating the color triple.
 */

export type Band = 'green' | 'blue' | 'yellow' | 'red' | 'purple' | 'neutral'

export interface BandStyle {
  color: string
  bg: string
  border: string
}

const BAND_STYLES: Record<Band, BandStyle> = {
  green: { color: 'var(--candy-green-d)', bg: 'rgba(125, 224, 41, 0.16)', border: 'var(--candy-green)' },
  blue: { color: 'var(--candy-blue-d)', bg: 'rgba(78, 168, 255, 0.16)', border: 'var(--candy-blue)' },
  yellow: { color: 'var(--candy-yellow-d)', bg: 'rgba(255, 209, 70, 0.20)', border: 'var(--candy-yellow)' },
  red: { color: 'var(--candy-red)', bg: 'rgba(255, 90, 95, 0.14)', border: 'var(--candy-red)' },
  purple: { color: 'var(--candy-purple-d)', bg: 'rgba(139, 92, 246, 0.14)', border: 'var(--candy-purple)' },
  neutral: { color: 'var(--candy-ink-soft)', bg: 'var(--candy-card)', border: 'var(--candy-shadow)' },
}

export function bandStyle(band: Band): BandStyle {
  return BAND_STYLES[band]
}

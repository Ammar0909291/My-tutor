/**
 * Lightweight navigation event logger.
 *
 * Fires fire-and-forget to /api/learn/nav-event. Never throws, never blocks.
 * Uses sendBeacon when available (survives page unload), falls back to fetch.
 */

export type NavEventKind =
  | 'lesson_switch_requested'
  | 'lesson_switch_confirmed'
  | 'lesson_switch_cancelled'
  | 'lesson_restart'
  | 'lesson_resume'
  | 'lesson_review'

export interface NavEvent {
  kind: NavEventKind
  fromLessonId?: number
  toLessonId?: number
  completed?: boolean
  mastered?: boolean
  locked?: boolean
  trigger: 'roadmap' | 'previous_card' | 'current_card' | 'next_card' | 'deep_link' | 'intent_detector'
}

export function logNavEvent(event: NavEvent): void {
  try {
    const body = JSON.stringify(event)
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/learn/nav-event', new Blob([body], { type: 'application/json' }))
    } else {
      fetch('/api/learn/nav-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      }).catch(() => {})
    }
  } catch {
    // Never throw from analytics
  }
}

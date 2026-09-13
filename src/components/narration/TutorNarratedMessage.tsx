'use client'

/**
 * TutorNarratedMessage — hook boundary for ONE narrated message.
 *
 * React hooks cannot be called conditionally inside a `.map()` callback, so
 * this tiny wrapper exists purely to give `useNarrationPlayback` its own
 * component instance per rendered message — the standard "extract a child
 * component to get one hook per list item" pattern. It renders nothing of
 * its own; the caller's `children` render-prop receives the full narration
 * result and decides layout, exactly matching whatever surrounding JSX
 * (bubble, timestamp, read-more toggle, canvas layout) already exists there.
 * This is what keeps the integration a small, additive change inside
 * LessonScreen.tsx rather than a rewrite of the message-row renderer.
 */
import type { ReactNode } from 'react'
import { useNarrationPlayback, type UseNarrationPlaybackResult } from '@/hooks/useNarrationPlayback'
import type { TeachingLang, VoiceType } from '@/lib/tts'

export interface TutorNarratedMessageProps {
  id: string
  text: string
  lang: TeachingLang
  voiceType: VoiceType
  speed: number
  country?: string
  children: (narration: UseNarrationPlaybackResult) => ReactNode
}

export function TutorNarratedMessage({ id, text, lang, voiceType, speed, country, children }: TutorNarratedMessageProps) {
  const narration = useNarrationPlayback({ id, text, lang, voiceType, speed, country })
  return <>{children(narration)}</>
}

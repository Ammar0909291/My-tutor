'use client'
import { useEffect, useState } from 'react'

export interface LastLesson {
  subjectSlug: string
  topicSlug?: string
  lessonIndex?: number
  subjectName?: string
  lessonOrder?: number
  lessonTitle?: string
}

export function useLastLesson() {
  const [lastLesson, setLastLesson] = useState<LastLesson | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('lastLesson')
    if (stored) setLastLesson(JSON.parse(stored))
  }, [])

  function saveLastLesson(lesson: LastLesson) {
    setLastLesson(lesson)
    sessionStorage.setItem('lastLesson', JSON.stringify(lesson))
  }

  return { lastLesson, saveLastLesson }
}

export function recordLastLesson(lesson: LastLesson): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('lastLesson', JSON.stringify(lesson))
  }
}

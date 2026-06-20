'use client'
// useTeachingPlayback — Sprint R.1
// requestAnimationFrame-driven playback over the Sprint R teachingTimeline engine.
// Drives a `revealStep` integer (1..stepCount) that visual components use to progressively
// mount their elements. Lightweight, mobile-safe, deterministic for a given speed.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  createTimeline,
  totalDuration,
  type Timeline,
} from '@/lib/visuals/teachingTimeline'

export interface UseTeachingPlaybackOptions {
  /** Auto-start the animation on mount / when stepCount becomes available. */
  autoPlay?: boolean
  /** Initial playback speed multiplier (0.5–1.5). */
  speed?: number
  /** Per-step duration in ms before speed scaling. */
  stepDurationMs?: number
  /**
   * Sprint S — optional, additive: fired whenever the revealed step changes
   * (including 0 → 1 and the final step). Lets a synchronization layer react to
   * animation progress without touching the renderer or animation logic.
   */
  onStepChange?: (step: number) => void
}

export interface TeachingPlayback {
  /** 1-based count of steps currently revealed (0 before playback begins). */
  revealStep: number
  isPlaying: boolean
  isComplete: boolean
  speed: number
  play: () => void
  pause: () => void
  replay: () => void
  setSpeed: (speed: number) => void
}

export function useTeachingPlayback(
  stepCount: number,
  options: UseTeachingPlaybackOptions = {}
): TeachingPlayback {
  const { autoPlay = true, speed: initialSpeed = 1, stepDurationMs = 700, onStepChange } = options

  const timeline: Timeline = useMemo(
    () =>
      createTimeline(
        Array.from({ length: Math.max(0, stepCount) }, () => ({
          action: 'show' as const,
          target: '',
        })),
        stepDurationMs
      ),
    [stepCount, stepDurationMs]
  )

  const [revealStep, setRevealStep] = useState(autoPlay ? 0 : stepCount)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isComplete, setIsComplete] = useState(!autoPlay)
  const [speed, setSpeedState] = useState(initialSpeed)

  const elapsedRef = useRef(0)
  const lastTsRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const speedRef = useRef(speed)
  speedRef.current = speed

  const total = totalDuration(timeline)

  const stop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    lastTsRef.current = null
  }, [])

  const frame = useCallback(
    (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts
      const delta = ts - lastTsRef.current
      lastTsRef.current = ts
      elapsedRef.current += delta * speedRef.current

      const stepsShown = Math.min(
        stepCount,
        Math.floor(elapsedRef.current / stepDurationMs) + 1
      )
      setRevealStep(stepsShown)

      if (elapsedRef.current >= total || stepsShown >= stepCount) {
        setRevealStep(stepCount)
        setIsComplete(true)
        setIsPlaying(false)
        stop()
        return
      }
      rafRef.current = requestAnimationFrame(frame)
    },
    [stepCount, stepDurationMs, total, stop]
  )

  // Drive the rAF loop whenever we're playing.
  useEffect(() => {
    if (!isPlaying || stepCount <= 0) return
    rafRef.current = requestAnimationFrame(frame)
    return stop
  }, [isPlaying, stepCount, frame, stop])

  // Cleanup on unmount.
  useEffect(() => stop, [stop])

  // Sprint S — additive: notify an optional listener when the revealed step changes.
  useEffect(() => {
    onStepChange?.(revealStep)
  }, [revealStep, onStepChange])

  const play = useCallback(() => {
    if (isComplete) {
      elapsedRef.current = 0
      setIsComplete(false)
    }
    lastTsRef.current = null
    setIsPlaying(true)
  }, [isComplete])

  const pause = useCallback(() => {
    setIsPlaying(false)
    stop()
  }, [stop])

  const replay = useCallback(() => {
    stop()
    elapsedRef.current = 0
    setRevealStep(0)
    setIsComplete(false)
    lastTsRef.current = null
    setIsPlaying(true)
  }, [stop])

  const setSpeed = useCallback((next: number) => setSpeedState(next), [])

  return { revealStep, isPlaying, isComplete, speed, play, pause, replay, setSpeed }
}

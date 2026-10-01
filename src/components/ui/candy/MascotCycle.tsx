'use client'

import { useEffect, useState } from 'react'
import { CockroachMascot, type CockroachMascotProps, type MascotMood } from './Mascot'

const ORDER: MascotMood[] = ['serious', 'thinking', 'confused', 'laughing']

export interface CockroachMascotCycleProps extends Omit<CockroachMascotProps, 'mood'> {
  /** Moods to rotate through, in order. Defaults to serious → thinking → confused → laughing. */
  moods?: MascotMood[]
  /** How long each mood is held. Default 4200 ms. */
  intervalMs?: number
}

/**
 * The mascot, cycling through its moods on a timer — for idle showcase spots (dashboard banner).
 * Stays on the first mood (no timer) when the user prefers reduced motion.
 * Client-only wrapper: <CockroachMascot> itself stays a pure function usable from server trees.
 */
export function CockroachMascotCycle({ moods = ORDER, intervalMs = 4200, ...rest }: CockroachMascotCycleProps) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (moods.length < 2) return
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI((n) => (n + 1) % moods.length), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs, moods.length])

  return <CockroachMascot {...rest} mood={moods[i % moods.length]} />
}

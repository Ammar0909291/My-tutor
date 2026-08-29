'use client'
/**
 * The learner's OS-level reduced-motion preference.
 *
 * Extracted from `ThreeDVisual`, which had the only copy, so the animation
 * player and the 3D host cannot disagree about whether motion is permitted —
 * two answers to that question is exactly how a "reduced motion" setting ends
 * up half-respected.
 */
import { useEffect, useState } from 'react'

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return reduced
}

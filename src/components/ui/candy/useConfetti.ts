'use client'

import { useCallback } from 'react'
import styles from './primitives.module.css'

const CONFETTI_COLORS = ['#E8B84B', '#8FD1C4', '#6FCF87', '#F4D37A', '#E08B79', '#E59A5A']

/**
 * Candy confetti burst — ported from design/dashboard-approved.html's inline
 * <script>. Returns a callback that spawns 40 particles (using the shared
 * `.confetti` class from ./primitives.module.css), animated via the Web
 * Animations API and appended to `document.body`.
 */
export function useConfetti() {
  return useCallback(() => {
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div')
      particle.className = styles.confetti
      particle.style.left = `${Math.random() * 100}vw`
      particle.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
      particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
      document.body.appendChild(particle)

      const duration = 2 + Math.random() * 2
      const delay = Math.random() * 0.5
      particle.animate(
        [
          { transform: 'translateY(0) rotate(0)', opacity: 1 },
          { transform: `translateY(105vh) rotate(${360 + Math.random() * 360}deg)`, opacity: 1 },
        ],
        { duration: duration * 1000, delay: delay * 1000, easing: 'cubic-bezier(0.4,0,1,1)' }
      )
      setTimeout(() => particle.remove(), (duration + delay) * 1000)
    }
  }, [])
}

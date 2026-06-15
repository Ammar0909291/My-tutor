'use client'

import { useCallback } from 'react'

const CONFETTI_COLORS = ['#8B5CF6', '#3B9EFF', '#58CC02', '#FFC800', '#FF5FA2', '#FF9600']

/**
 * Confetti burst ported from design/dashboard-approved.html's inline
 * <script> — 40 particles animated via the Web Animations API and appended
 * to document.body using the caller-supplied `.confetti` module class.
 */
export function useConfetti(confettiClassName: string) {
  return useCallback(() => {
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div')
      particle.className = confettiClassName
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
  }, [confettiClassName])
}

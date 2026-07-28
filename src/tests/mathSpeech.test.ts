import { describe, it, expect } from 'vitest'
import { isStemSubject, buildMathSpeechBlock } from '@/lib/teaching/mathSpeech'

describe('C.18-22 — Math Speech layer', () => {
  describe('isStemSubject', () => {
    it.each(['physics', 'mathematics', 'chemistry', 'computer_science', 'biology'])(
      'recognises %s as STEM', (slug) => {
        expect(isStemSubject(slug)).toBe(true)
      },
    )

    it.each(['english', 'hindi', 'sanskrit', null, undefined, ''])(
      'does NOT recognise %j as STEM', (slug) => {
        expect(isStemSubject(slug as string)).toBe(false)
      },
    )
  })

  describe('buildMathSpeechBlock', () => {
    const block = buildMathSpeechBlock()

    it('contains SI unit expansion examples', () => {
      expect(block).toContain('J → joules')
      expect(block).toContain('N → newtons')
      expect(block).toContain('kg → kilograms')
    })

    it('contains equation reading instructions', () => {
      expect(block).toContain('F = ma')
      expect(block).toContain('force equals mass times acceleration')
    })

    it('contains fraction reading rules', () => {
      expect(block).toContain('over')
      expect(block).toContain('divided by')
    })

    it('contains power/exponent reading rules', () => {
      expect(block).toContain('squared')
      expect(block).toContain('cubed')
    })

    it('contains negative vs minus distinction', () => {
      expect(block).toContain('negative')
      expect(block).toContain('minus')
    })

    it('contains Greek letter pronunciation guide', () => {
      expect(block).toContain('theta')
      expect(block).toContain('delta')
    })

    it('contains subscript/superscript reading rules', () => {
      expect(block).toContain('sub')
      expect(block).toContain('v-nought')
    })

    it('instructs never to leave bare symbols', () => {
      expect(block).toContain('NEVER leave a bare symbol')
    })
  })
})

import { describe, it, expect } from 'vitest'
import {
  hasVisualBeenShown,
  stripRawImageUrls,
  buildVisualIntelligenceBlock,
} from '@/lib/teaching/visualIntelligence'

describe('D.23-30 — Visual Intelligence layer', () => {
  describe('hasVisualBeenShown (D.27)', () => {
    it('returns false when visualType is null', () => {
      expect(hasVisualBeenShown(null, ['force_diagram'])).toBe(false)
    })

    it('returns false when visual not in recent list', () => {
      expect(hasVisualBeenShown('force_diagram', ['coordinate_plane', 'number_line'])).toBe(false)
    })

    it('returns true when visual was already shown', () => {
      expect(hasVisualBeenShown('force_diagram', ['coordinate_plane', 'force_diagram'])).toBe(true)
    })

    it('handles nulls and undefineds in the recent list', () => {
      expect(hasVisualBeenShown('force_diagram', [null, undefined, 'force_diagram'])).toBe(true)
    })

    it('returns false for empty recent list', () => {
      expect(hasVisualBeenShown('force_diagram', [])).toBe(false)
    })
  })

  describe('stripRawImageUrls (D.28)', () => {
    it('strips markdown image syntax', () => {
      const input = 'Look at this: ![diagram](https://example.com/img.png) and continue'
      expect(stripRawImageUrls(input)).toBe('Look at this:  and continue')
    })

    it('strips raw image URLs', () => {
      const input = 'See the image https://cdn.example.com/photo.jpg for reference'
      const result = stripRawImageUrls(input)
      expect(result).not.toContain('https://cdn.example.com/photo.jpg')
      expect(result).toContain('See the image')
      expect(result).toContain('for reference')
    })

    it('strips multiple image references', () => {
      const input = '![a](http://x.com/a.png) text ![b](http://x.com/b.svg)'
      expect(stripRawImageUrls(input)).toBe('text')
    })

    it('leaves non-image URLs alone', () => {
      const input = 'Visit https://example.com/page for more info'
      expect(stripRawImageUrls(input)).toBe('Visit https://example.com/page for more info')
    })

    it('handles text with no images', () => {
      const input = 'Pure text with no images at all'
      expect(stripRawImageUrls(input)).toBe('Pure text with no images at all')
    })

    it('collapses excessive newlines after stripping', () => {
      const input = 'Before\n\n\n![img](http://x.com/img.png)\n\n\nAfter'
      const result = stripRawImageUrls(input)
      expect(result).not.toContain('\n\n\n')
    })
  })

  describe('buildVisualIntelligenceBlock (D.23-30)', () => {
    it('returns no-visual rules when availableVisual is null', () => {
      const block = buildVisualIntelligenceBlock(null, null, false)
      expect(block).toContain('no matching visual')
      expect(block).toContain('Do NOT emit a VISUAL tag')
      expect(block).toContain('Do NOT include markdown image links')
    })

    it('includes the available visual type', () => {
      const block = buildVisualIntelligenceBlock('force_diagram', 'Newton\'s First Law', false)
      expect(block).toContain('force_diagram')
      expect(block).toContain('Newton\'s First Law')
    })

    it('D.23: contains teaching-objective alignment rule', () => {
      const block = buildVisualIntelligenceBlock('force_diagram', null, false)
      expect(block).toContain('TEACHING-OBJECTIVE ALIGNMENT')
      expect(block).toContain('directly serves what you are teaching THIS turn')
    })

    it('D.24-26: contains concept relevance rules', () => {
      const block = buildVisualIntelligenceBlock('force_diagram', null, false)
      expect(block).toContain('CONCEPT RELEVANCE')
      expect(block).toContain('matched to the current concept')
    })

    it('D.27: warns about already-shown visual', () => {
      const block = buildVisualIntelligenceBlock('force_diagram', null, true)
      expect(block).toContain('ALREADY shown')
      expect(block).toContain('Do NOT re-emit')
    })

    it('D.27: no repeat warning when not shown before', () => {
      const block = buildVisualIntelligenceBlock('force_diagram', null, false)
      expect(block).not.toContain('ALREADY shown')
    })

    it('D.28: contains no-raw-URL rule', () => {
      const block = buildVisualIntelligenceBlock('force_diagram', null, false)
      expect(block).toContain('NO RAW URLS')
      expect(block).toContain('NEVER include markdown image syntax')
    })

    it('D.29: contains narration sync rules', () => {
      const block = buildVisualIntelligenceBlock('coordinate_plane', null, false)
      expect(block).toContain('NARRATION SYNC')
      expect(block).toContain('Introduce what the student will see')
      expect(block).toContain('Reference specific parts')
    })

    it('D.30: contains relevance gate', () => {
      const block = buildVisualIntelligenceBlock('force_diagram', null, false)
      expect(block).toContain('RELEVANCE GATE')
      expect(block).toContain('absent visual is better than an irrelevant one')
    })

    it('contains the VISUAL tag instruction', () => {
      const block = buildVisualIntelligenceBlock('number_line', null, false)
      expect(block).toContain('VISUAL: number_line')
    })
  })
})

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

    // ── The url-less placeholder (live capture, Lesson 39 Angular Kinematics).
    // MD_IMAGE_RE requires the `(url)` half, so `![alt]` passed through and the
    // learner's whole reply to "Can you give me a diagram?" was markup.
    describe('![alt] with no (url) — the live Lesson 39 defect', () => {
      const LIVE = '![Angular displacement diagram: a circle with a point moving from angle 0 to angle π⁄2, showing radius r, arc s, and angle θ]'

      it('no longer leaves the raw placeholder in learner-facing text', () => {
        const out = stripRawImageUrls(LIVE)
        expect(out).not.toContain('![')
        expect(out).not.toContain(']')
      })

      it('does NOT answer the learner with an empty message', () => {
        // cleanText has no emptiness guard on any return site, so deleting the
        // only content on the turn would serve a blank tutor message.
        const out = stripRawImageUrls(LIVE)
        expect(out.length).toBeGreaterThan(40)
        expect(out).toContain('angular displacement diagram'.replace('angular', 'Angular'))
        expect(out).toContain('radius r')
      })

      it('unwraps an inline placeholder without eating the sentence', () => {
        expect(stripRawImageUrls('Here it is ![a circle diagram] and that is all.'))
          .toBe('Here it is a circle diagram and that is all.')
      })

      it('handles an empty alt text without leaving markup', () => {
        expect(stripRawImageUrls('before ![] after')).toBe('before  after')
      })

      // Negative controls — the discriminator is the leading '!', so ordinary
      // markdown and bracketed prose must be untouched.
      it('leaves ordinary markdown links and bracketed prose alone', () => {
        expect(stripRawImageUrls('See [the notes](https://x.test/n) for more.'))
          .toBe('See [the notes](https://x.test/n) for more.')
        expect(stripRawImageUrls('The set [1, 2, 3] has three members.'))
          .toBe('The set [1, 2, 3] has three members.')
        expect(stripRawImageUrls('Solve f[x] = 2 for x.')).toBe('Solve f[x] = 2 for x.')
      })

      // The shipped url-carrying branch must be byte-for-byte unchanged: the
      // two branches are kept disjoint by the negative lookahead.
      it('the (url) form still deletes, exactly as before', () => {
        expect(stripRawImageUrls('Look at this: ![diagram](https://example.com/img.png) and continue'))
          .toBe('Look at this:  and continue')
        expect(stripRawImageUrls('![a](http://x.com/a.png) text ![b](http://x.com/b.svg)'))
          .toBe('text')
      })
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

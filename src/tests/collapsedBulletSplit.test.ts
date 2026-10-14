import { createElement as h } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { MessageContent, splitCollapsedBullets } from '@/components/learn/MessageContent'

describe('a list the model wrote on one line is shown as separate bullets (chemistry QA 2026-10-14)', () => {
  it('the live case: two items collapsed into one bullet', () => {
    const line = 'In the s-block (groups 1 and 2) the elements tend to lose 1 or 2 electrons, so their common valency is +1 or +2. - When you enter the p-block (starting with group 13), the number of electrons is related to the octet.'
    expect(splitCollapsedBullets(line)).toEqual([
      'In the s-block (groups 1 and 2) the elements tend to lose 1 or 2 electrons, so their common valency is +1 or +2.',
      'When you enter the p-block (starting with group 13), the number of electrons is related to the octet.',
    ])
  })
  it('splits on ? and ! and on a bullet glyph too', () => {
    expect(splitCollapsedBullets('Is it a metal? - No, it is not. • Hydrogen is a gas.')).toEqual(['Is it a metal?', 'No, it is not.', 'Hydrogen is a gas.'])
  })
  it('leaves a dash inside a sentence, a hyphenated word, a range and a lower-case continuation alone', () => {
    for (const t of ['Group 1 - the alkali metals - all have one valence electron', 'a well-known rule. Then x-ray', 'groups 13 - 18 give the count', 'It is large. - and then lower case', 'No marker here.']) {
      expect(splitCollapsedBullets(t)).toEqual([t])
    }
  })
  it('renders one bullet per item and leaves ordinary bullets and paragraphs as they were', () => {
    const html = renderToStaticMarkup(h(MessageContent, { text: '- First idea ends here. - Second idea starts here.\n- A normal bullet\nPlain paragraph. - not a bullet line', isUser: false }))
    expect(html.match(/▸/g)?.length).toBe(3)
    expect(html).toContain('Second idea starts here.')
    expect(html).toContain('Plain paragraph. - not a bullet line')
  })
})

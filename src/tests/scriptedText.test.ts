/**
 * SUBSCRIPTS AND SUPERSCRIPTS IN FIGURE TEXT (live defect 2026-10-14: "T_h = 500 K: heat in", "e^(iπ) = −1" shown with
 * the keyboard's underscore and caret). The parser is narrow on purpose: it must turn real scripts into scripts and leave
 * everything else byte-for-byte as it was, so no existing label changes.
 */
import { describe, expect, it } from 'vitest'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { splitScripts, hasScripts } from '@/lib/teaching/visual/scriptedText'
import { ScriptedText } from '@/components/school/visuals/ScriptedText'

const flat = (t: string) => splitScripts(t).map((s) => (s.kind === 'plain' ? s.text : `<${s.kind}>${s.text}</${s.kind}>`)).join('')

describe('real scripts become scripts', () => {
  it.each([
    ['T_h = 500 K: heat in', 'T<sub>h</sub> = 500 K: heat in'],
    ['T_c = 300 K: heat out', 'T<sub>c</sub> = 300 K: heat out'],
    ['η = 1 − T_c/T_h = 1 − 300/500 = 0.4', 'η = 1 − T<sub>c</sub>/T<sub>h</sub> = 1 − 300/500 = 0.4'],
    ['heat Q_h is taken in and Q_c released.', 'heat Q<sub>h</sub> is taken in and Q<sub>c</sub> released.'],
    ['x_1 + x_2 = 5', 'x<sub>1</sub> + x<sub>2</sub> = 5'],
    ['a_{n+1} = 2a_n', 'a<sub>n+1</sub> = 2a<sub>n</sub>'],
    ['K_sp = [Ag⁺][Cl⁻]', 'K<sub>sp</sub> = [Ag⁺][Cl⁻]'],
    ['e^(iπ) = −1', 'e<sup>iπ</sup> = −1'],
    ['e^(iθ) = cos θ + i sin θ', 'e<sup>iθ</sup> = cos θ + i sin θ'],
    ['x^2 + y^2 = r^2', 'x<sup>2</sup> + y<sup>2</sup> = r<sup>2</sup>'],
    ['1.6 × 10^-19 C', '1.6 × 10<sup>-19</sup> C'],
    ['e^{-x}', 'e<sup>-x</sup>'],
    ['v_0 t + ½ a t^2', 'v<sub>0</sub> t + ½ a t<sup>2</sup>'],
  ])('%s', (input, expected) => {
    expect(flat(input)).toBe(expected)
    expect(hasScripts(input)).toBe(true)
  })

  it('the markers are removed and every other character is kept, in order', () => {
    const t = 'η = 1 − T_c/T_h = 0.4'
    expect(splitScripts(t).map((s) => s.text).join('')).toBe('η = 1 − Tc/Th = 0.4')
  })
})

describe('everything else is left exactly as it was', () => {
  it.each([
    'snake_case_name', 'file_name.txt', 'a_b_c', 'linked_list', 'my_variable_1', 'T_ambient', 'array_index',
    'a lone ^ caret', 'ends with ^', 'plain text with no markers at all', 'price is $3.50', '', 'x_', '_x', 'under_score and more',
  ])('%j is unchanged', (t) => {
    expect(splitScripts(t)).toEqual([{ kind: 'plain', text: t }])
    expect(hasScripts(t)).toBe(false)
  })
})

describe('the component', () => {
  it('draws a subscript and a superscript as <sub> and <sup>, with line-height 0 so the line box does not grow', () => {
    const html = renderToStaticMarkup(createElement(ScriptedText, { text: 'T_h and e^(iπ)' }))
    expect(html).toContain('<sub')
    expect(html).toContain('<sup')
    expect(html).toContain('line-height:0')
    expect(html.replace(/<[^>]+>/g, '')).toBe('Th and eiπ')
  })

  it('returns plain text with NO wrapper element when there is no script (every other label renders as before)', () => {
    expect(renderToStaticMarkup(createElement(ScriptedText, { text: 'F = 10 N' }))).toBe('F = 10 N')
    expect(renderToStaticMarkup(createElement(ScriptedText, { text: 'snake_case' }))).toBe('snake_case')
  })
})

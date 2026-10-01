import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice, type TutorMCQ } from '@/lib/teaching/mcq'

const N2L:TutorMCQ={question:'A 5 kg box is pushed along a smooth floor. What is its acceleration?',options:['2 m/s²','50 m/s²','0.5 m/s²','15 m/s²'],correctIndex:0}
const HEAT:TutorMCQ={question:'What is the specific heat capacity?',options:['450 J kg⁻¹ K⁻¹','900 J kg⁻¹ K⁻¹','180 J kg⁻¹ K⁻¹','720 000 J kg⁻¹ K⁻¹'],correctIndex:0}

describe('GB+ numeric answer protection',()=>{
  // BEFORE: '0.5 m/s2' was in this list. AFTER: it normalises to option C's exact text
  // ('0.5 m/s²'), so Stage E grades it as that option — asserted separately below.
  it('the typed exact text of an option (superscript folded) is that option', () => {
    expect(gradeMcqAnswer('0.5 m/s2',N2L)).toEqual({chosenIndex:2,correct:false})
  })
  it.each(['2','i think 2 m/s2','a = 2 m/s^2','50','c = 450','450'])('does not infer a numeric choice: %s',(message)=>{
    expect(gradeMcqAnswer(message,N2L).correct).toBeNull()
  })
  it('C, 0 m resolves from the explicit C only',()=>{
    expect(resolveMcqChoice('C, 0 m',N2L)).toBe(2)
  })
  it('exact numeric option text remains gradeable',()=>{
    expect(gradeMcqAnswer('2 m/s²',N2L)).toEqual({chosenIndex:0,correct:true})
    expect(gradeMcqAnswer('450 J kg⁻¹ K⁻¹',HEAT)).toEqual({chosenIndex:0,correct:true})
  })
  it('explicit letter plus explanation remains gradeable',()=>{
    expect(gradeMcqAnswer('A because F/m gives 2 m/s²',N2L)).toEqual({chosenIndex:0,correct:true})
  })
  it('a wrong explicit letter remains wrong',()=>{
    expect(gradeMcqAnswer('B because multiplying F by m',N2L)).toEqual({chosenIndex:1,correct:false})
  })
  it('bare value with no exact option text is null',()=>{
    expect(gradeMcqAnswer('7 m/s²',N2L)).toEqual({chosenIndex:null,correct:null})
  })
})

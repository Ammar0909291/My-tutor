import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice } from '@/lib/teaching/mcq'
import type { TutorMCQ } from '@/lib/teaching/mcq'

const TORQUE:TutorMCQ={question:'q',options:['zero point five newton-metres','five newton-metres','ten newton-metres','twenty newton-metres'],correctIndex:1}

describe('GB+ answer contract',()=>{
  it('does not infer a bare value',()=>{
    for(const reply of ['5','five']) expect(gradeMcqAnswer(reply,TORQUE)).toEqual({chosenIndex:null,correct:null})
  })
  it('accepts an explicit letter',()=>expect(gradeMcqAnswer('B',TORQUE)).toEqual({chosenIndex:1,correct:true}))
  it('accepts the exact option text',()=>expect(gradeMcqAnswer('five newton-metres',TORQUE)).toEqual({chosenIndex:1,correct:true}))
  it('letter plus explanation grades from the letter only',()=>expect(gradeMcqAnswer('B because 10 times 0.5 is 5',TORQUE)).toEqual({chosenIndex:1,correct:true}))
  it('explanation without a letter is not interpreted',()=>expect(gradeMcqAnswer('5 because 10 times 0.5',TORQUE)).toEqual({chosenIndex:null,correct:null}))
  it('ambiguous value is refused',()=>{
    const q:TutorMCQ={question:'q',options:['5 metres per second','5 metres per second squared'],correctIndex:1}
    expect(resolveMcqChoice('5',q)).toBeNull()
  })
})

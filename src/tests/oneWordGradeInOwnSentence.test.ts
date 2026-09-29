import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, type TutorMCQ } from '@/lib/teaching/mcq'

const THEOREM:TutorMCQ={question:'State the work–energy theorem.',options:['The net work done on an object equals its total energy','The net work done on an object equals the change in its potential energy','The net work done on an object equals its change in momentum','The NET work done on an object equals the change in its kinetic energy'],correctIndex:3}

describe('GB+ rejects keyword and paraphrase inference',()=>{
  it('the old keyword false-positive is ungraded',()=>{
    expect(gradeMcqAnswer('I think it is at rest — zero work means zero kinetic energy',THEOREM)).toEqual({chosenIndex:null,correct:null})
  })
  it('the old paraphrase is ungraded',()=>{
    expect(gradeMcqAnswer('the change in kinetic energy',THEOREM)).toEqual({chosenIndex:null,correct:null})
  })
  it('exact option text remains gradeable',()=>{
    expect(gradeMcqAnswer(THEOREM.options[3],THEOREM)).toEqual({chosenIndex:3,correct:true})
  })
  it('explicit letter plus explanation remains gradeable',()=>{
    expect(gradeMcqAnswer('D because net work changes kinetic energy',THEOREM)).toEqual({chosenIndex:3,correct:true})
  })
})

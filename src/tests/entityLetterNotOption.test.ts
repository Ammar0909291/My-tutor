import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, type TutorMCQ } from '@/lib/teaching/mcq'

const IMPULSE:TutorMCQ={question:'Force A = 800 N for 0.002 s; Force B = 8 N for 0.2 s. Which delivers more impulse?',options:['Equal — J_A = 1.6 N·s = J_B = 1.6 N·s','A, because it is a much bigger force'],correctIndex:0}

describe('letters used as names/symbols are not choices',()=>{
  it('Force A / Force B prose is ungraded',()=>{
    expect(gradeMcqAnswer('I think force A — it is a much bigger force, so it must deliver more impulse',IMPULSE)).toEqual({chosenIndex:null,correct:null})
  })
  it('an explicit label still chooses',()=>{
    expect(gradeMcqAnswer('A',IMPULSE)).toEqual({chosenIndex:0,correct:true})
    expect(gradeMcqAnswer('B',IMPULSE)).toEqual({chosenIndex:1,correct:false})
    expect(gradeMcqAnswer('B because it is the larger force',IMPULSE)).toEqual({chosenIndex:1,correct:false})
  })
  it('a quantity variable is not a label',()=>{
    expect(gradeMcqAnswer('A = 800 N',IMPULSE)).toEqual({chosenIndex:null,correct:null})
    expect(gradeMcqAnswer('c = 450',IMPULSE)).toEqual({chosenIndex:null,correct:null})
  })
})

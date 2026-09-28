/**
 * GB+ answer-intake matrix.
 *
 * BEFORE: the resolver inferred ordinals, values, answer halves, distinctive
 * words and paraphrases from free prose. Those inference paths produced the
 * measured false-credit classes this matrix now removes.
 *
 * AFTER: only exact option text or an explicit A-D choice label may grade.
 * The explanation following an explicit label is opaque and never evaluated.
 */
import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice } from '@/lib/teaching/mcq'
import type { TutorMCQ } from '@/lib/teaching/mcq'

const Q:TutorMCQ={
  question:'At which point does the pendulum reach its maximum speed?',
  options:['At the highest point on the left','At the highest point on the right','At the lowest point in the middle','It moves at a constant speed'],
  correctIndex:2,
}
const grade=(m:string)=>gradeMcqAnswer(m,Q)

describe('accepted forms',()=>{
  it.each([['C',2],['c',2],['C.',2],['C)',2],['(C)',2],['option C',2],['answer is C',2],['I think C',2],['C because it is the lowest point',2],['C) because it is the lowest point',2],['C, 0 m',2]] as const)('%s -> %s',(m,i)=>expect(resolveMcqChoice(m,Q)).toBe(i))
  it('exact option text is still accepted',()=>expect(resolveMcqChoice(Q.options[2],Q)).toBe(2))
  it('a wrong explicit choice remains wrong',()=>expect(grade('A')).toEqual({chosenIndex:0,correct:false}))
})

describe('removed inference classes',()=>{
  it.each([
    'the third one','third','number 3','3','0 m','zero',
    'the lowest point in the middle','I think it is the lowest point',
    'lowest point','the answer is the lowest point',
    'maybe C','I think maybe C','A or B','B vs C',
  ])('%s -> null',(m)=>expect(grade(m)).toEqual({chosenIndex:null,correct:null}))
})

describe('questions, requests and confusion never grade',()=>{
  it.each([
    'why is C correct?','which one is correct?','C? Can you explain?',
    'can you explain the left one?','what does C mean?',
    'please show me why C is correct','I do not understand C',
    'I am confused about C','i dont know but maybe C',
  ])('%s -> null',(m)=>expect(grade(m)).toEqual({chosenIndex:null,correct:null}))
})

describe('entity letters and quantity symbols never become labels',()=>{
  it.each([
    'Force A did more work','crane B did more work','point C is higher',
    'A = 450','c = 450','d = 5 m',
  ])('%s -> null',(m)=>expect(grade(m)).toEqual({chosenIndex:null,correct:null}))
})

describe('explanations are opaque',()=>{
  it('does not search the explanation for another option',()=>{
    expect(resolveMcqChoice('B because C is also mentioned and A is not',Q)).toBe(1)
  })
  it('does not choose from answer vocabulary without a label',()=>{
    expect(resolveMcqChoice('the lowest point is confusing',Q)).toBeNull()
  })
})

describe('null protection',()=>{
  it('null grade is never false',()=>{
    for(const m of ['2','the third one','why?','A or B','0 m']){
      const g=grade(m)
      expect(g.chosenIndex).toBeNull()
      expect(g.correct).toBeNull()
      expect(g.correct).not.toBe(false)
    }
  })
})

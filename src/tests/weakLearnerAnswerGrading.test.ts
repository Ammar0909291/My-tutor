import { describe, it, expect } from 'vitest'
import { gradeMcqAnswer, resolveMcqChoice } from '@/lib/teaching/mcq'
import type { TutorMCQ } from '@/lib/teaching/mcq'

const LENS:TutorMCQ={question:'If the focal length f is 20 cm, what is 1/f?',options:['0.05 cm⁻¹','20 cm','1/20 cm','0.5 cm⁻¹'],correctIndex:0}
const SHM:TutorMCQ={question:'At which point does the pendulum reach its maximum speed?',options:['At the highest point on the left','At the highest point on the right','At the lowest point in the middle','It moves at a constant speed throughout the swing'],correctIndex:2}

describe('GB+ weak-learner answer boundary',()=>{
  it('explicit letter plus explanation remains gradeable',()=>{
    expect(gradeMcqAnswer('A because 1/f is 0.05 cm⁻¹',LENS)).toEqual({chosenIndex:0,correct:true})
    expect(gradeMcqAnswer('C. so the ball is fastest in the middle',SHM)).toEqual({chosenIndex:2,correct:true})
  })
  it('an explicit labelled letter at the start is graded even when a request follows',()=>{
    // BEFORE (remote GB+ draft): ungraded. AFTER (approved GB+ spec, LABELLED form):
    // "i think A." names option A explicitly at the start; the rest is opaque and is
    // never read to pick an option. No "?" is present, so it is not a question.
    expect(gradeMcqAnswer('ok i think A. but sir i still not understand lens. can you show picture please',LENS))
      .toEqual({chosenIndex:0,correct:true})
  })
  it('paraphrase is deliberately ungraded',()=>{
    expect(gradeMcqAnswer('i think it is the lowest point sir',SHM))
      .toEqual({chosenIndex:null,correct:null})
  })
  it('exact option text remains gradeable',()=>{
    expect(gradeMcqAnswer(SHM.options[2],SHM)).toEqual({chosenIndex:2,correct:true})
  })
  it('questions, requests and confusion stay null',()=>{
    for(const m of ['why is the lowest point fastest?','can you explain the left one?','I am confused about C','not sure, maybe C'])
      expect(gradeMcqAnswer(m,SHM)).toEqual({chosenIndex:null,correct:null})
  })
  it('ordinal and value inference stay null',()=>{
    for(const m of ['the third one','3','0 m','the lowest point'])
      expect(gradeMcqAnswer(m,SHM)).toEqual({chosenIndex:null,correct:null})
  })
  it('ambiguous alternatives stay null',()=>{
    expect(resolveMcqChoice('A or B',SHM)).toBeNull()
    expect(resolveMcqChoice('C vs D',SHM)).toBeNull()
  })
})

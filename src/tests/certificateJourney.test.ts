import { describe, it, expect } from 'vitest'

function isCertificateEligible(params: {
  score: number
  passMark: number
  allTopicsAttempted: boolean
  minSessionsCompleted: boolean
}): boolean {
  return params.score >= params.passMark && params.allTopicsAttempted && params.minSessionsCompleted
}

describe('Certificate journey', () => {
  it('passing student with all topics → eligible', () => {
    expect(isCertificateEligible({ score: 80, passMark: 60, allTopicsAttempted: true, minSessionsCompleted: true })).toBe(true)
  })

  it('failing student → not eligible', () => {
    expect(isCertificateEligible({ score: 50, passMark: 60, allTopicsAttempted: true, minSessionsCompleted: true })).toBe(false)
  })

  it('passing score but not all topics → not eligible', () => {
    expect(isCertificateEligible({ score: 90, passMark: 60, allTopicsAttempted: false, minSessionsCompleted: true })).toBe(false)
  })

  it('exact pass mark → eligible', () => {
    expect(isCertificateEligible({ score: 60, passMark: 60, allTopicsAttempted: true, minSessionsCompleted: true })).toBe(true)
  })

  it('one below pass mark → not eligible', () => {
    expect(isCertificateEligible({ score: 59, passMark: 60, allTopicsAttempted: true, minSessionsCompleted: true })).toBe(false)
  })

  it('no sessions completed → not eligible', () => {
    expect(isCertificateEligible({ score: 100, passMark: 60, allTopicsAttempted: true, minSessionsCompleted: false })).toBe(false)
  })

  it('score 100, all conditions met → eligible', () => {
    expect(isCertificateEligible({ score: 100, passMark: 60, allTopicsAttempted: true, minSessionsCompleted: true })).toBe(true)
  })

  it('score 0, all conditions met → not eligible', () => {
    expect(isCertificateEligible({ score: 0, passMark: 60, allTopicsAttempted: true, minSessionsCompleted: true })).toBe(false)
  })
})

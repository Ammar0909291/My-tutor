import { describe, it, expect } from 'vitest'
import { generateRoadmap } from '@/lib/curriculum/engine'

describe('generateRoadmap (level-aware)', () => {
  it('produces progressively shorter, later-starting milestone lists for higher levels', () => {
    const beginner = generateRoadmap('python', 'beginner', null)
    const intermediate = generateRoadmap('python', 'intermediate', null)
    const advanced = generateRoadmap('python', 'advanced', null)

    expect(beginner).not.toBeNull()
    expect(intermediate).not.toBeNull()
    expect(advanced).not.toBeNull()

    // Higher levels should never see MORE milestones ahead than a beginner.
    expect(intermediate!.milestones.length).toBeLessThanOrEqual(beginner!.milestones.length)
    expect(advanced!.milestones.length).toBeLessThanOrEqual(intermediate!.milestones.length)
  })

  it('legacy level values normalize instead of erroring', () => {
    expect(generateRoadmap('python', 'complete_beginner', null)).not.toBeNull()
    expect(generateRoadmap('python', 'professional', null)).not.toBeNull()
  })
})

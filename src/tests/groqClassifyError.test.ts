import { describe, it, expect } from 'vitest'
import { classifyError } from '@/lib/ai/providers/groq'
import { AIQuotaError, AIRateLimitError } from '@/lib/ai/providers/types'

describe('groq classifyError', () => {
  it('classifies a daily-token-quota 429 as AIQuotaError (non-retryable)', () => {
    const err = {
      status: 429,
      message:
        'Rate limit reached for model `openai/gpt-oss-20b` in organization `org_x` service tier `on_demand` on tokens per day (TPD): Limit 200000, Used 199489, Requested 5043. Please try again in 32m37.824s.',
    }
    const result = classifyError(err)
    expect(result).toBeInstanceOf(AIQuotaError)
    expect(result.retryable).toBe(false)
  })

  it('classifies a plain 429 with no TPD/quota wording as AIRateLimitError (retryable)', () => {
    const err = { status: 429, message: 'Rate limit reached for model on requests per minute (RPM)' }
    const result = classifyError(err)
    expect(result).toBeInstanceOf(AIRateLimitError)
    expect(result.retryable).toBe(true)
  })
})

export interface AIMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface AICompletionRequest {
  messages: AIMessage[]
  systemPrompt: string
  maxTokens: number
  temperature: number
}

export interface AICompletionResult {
  text: string
  finishReason: string | null
  provider: string
}

export interface AIProvider {
  readonly name: string
  complete(req: AICompletionRequest): Promise<AICompletionResult>
  healthCheck(): Promise<boolean>
}

export class AIProviderError extends Error {
  constructor(
    message: string,
    public readonly provider: string,
    public readonly statusCode?: number,
    public readonly retryable: boolean = false,
    public readonly cause?: Error,
  ) {
    super(message)
    this.name = 'AIProviderError'
  }
}

export class AIRateLimitError extends AIProviderError {
  constructor(provider: string, cause?: Error) {
    super(`Rate limit exceeded on ${provider}`, provider, 429, true, cause)
    this.name = 'AIRateLimitError'
  }
}

export class AITimeoutError extends AIProviderError {
  constructor(provider: string, cause?: Error) {
    super(`Request timed out on ${provider}`, provider, undefined, true, cause)
    this.name = 'AITimeoutError'
  }
}

export class AIQuotaError extends AIProviderError {
  constructor(provider: string, cause?: Error) {
    super(`Quota exhausted on ${provider}`, provider, 429, false, cause)
    this.name = 'AIQuotaError'
  }
}

export class AIServerError extends AIProviderError {
  constructor(provider: string, statusCode: number, cause?: Error) {
    super(`Server error (${statusCode}) on ${provider}`, provider, statusCode, true, cause)
    this.name = 'AIServerError'
  }
}

export class AINetworkError extends AIProviderError {
  constructor(provider: string, cause?: Error) {
    super(`Network error on ${provider}`, provider, undefined, true, cause)
    this.name = 'AINetworkError'
  }
}

export class AIEmptyResponseError extends AIProviderError {
  constructor(provider: string) {
    super(`Empty response from ${provider}`, provider, undefined, true)
    this.name = 'AIEmptyResponseError'
  }
}

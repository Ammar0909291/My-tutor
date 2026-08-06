/**
 * Phase 2 — provider adapter.
 *
 *   PromptPackage -> provider messages -> routeAI()
 *
 * Flattens an assembled `PromptPackage` into the exact argument shape
 * `routeAI()` already accepts. It does not redesign routeAI, does not select
 * a provider, and does not call anything — it only converts.
 *
 * Pure and deterministic: same package always yields the same request.
 */

import type { PromptPackage } from './promptPackage'

/** Message shape `routeAI()` already takes. Mirrors its signature exactly. */
export interface ProviderMessage {
  role: 'user' | 'assistant'
  content: string
}

/** The argument set for one `routeAI(messages, systemPrompt, country, maxTokens, lang)` call. */
export interface ProviderRequest {
  messages: readonly ProviderMessage[]
  systemPrompt: string
  maxTokens: number
  /** The learner's teaching language — routeAI's actual routing signal. */
  language: string
  /** Logged by routeAI, never a routing signal. Passed through unchanged. */
  country: string
}

export interface ProviderAdapterOptions {
  /** Prior turns to include, oldest first. Defaults to none. */
  history?: readonly ProviderMessage[]
  maxTokens?: number
  country?: string
}

/** Renders the response schema as a field list. Deliberately NOT a JSON
 *  example — the schema is described, never demonstrated. */
function renderResponseSchema(pkg: PromptPackage): string[] {
  const lines = ['Return these fields:']
  const walk = (fields: PromptPackage['responseSchema']['fields'], indent: string) => {
    for (const field of fields) {
      lines.push(`${indent}- ${field.name} (${field.type}${field.required ? ', required' : ', optional'}): ${field.description}`)
      if (field.fields?.length) walk(field.fields, `${indent}  `)
    }
  }
  walk(pkg.responseSchema.fields, '')
  return lines
}

/** The assembled system prompt: stance, hard rules, context sections, schema.
 *  Section order comes from the package and is not re-derived here. */
export function renderSystemPrompt(pkg: PromptPackage): string {
  const blocks: string[] = [pkg.systemPrompt]

  blocks.push(['RULES', ...pkg.developerInstructions.map(i => `- ${i}`)].join('\n'))

  for (const section of pkg.sections) {
    blocks.push([section.heading, ...section.lines.map(l => `- ${l}`)].join('\n'))
  }

  blocks.push(['RESPONSE FORMAT', ...renderResponseSchema(pkg)].join('\n'))
  return blocks.join('\n\n')
}

/**
 * Convert a PromptPackage into one provider request. The learner's message
 * is taken from the package's own conversation section via `history` plus the
 * caller-supplied turn; nothing is invented here.
 */
export function toProviderRequest(
  pkg: PromptPackage,
  userMessage: string,
  options: ProviderAdapterOptions = {},
): ProviderRequest {
  return {
    messages: [...(options.history ?? []), { role: 'user', content: userMessage }],
    systemPrompt: renderSystemPrompt(pkg),
    maxTokens: options.maxTokens ?? 800,
    language: pkg.generationConstraints.language,
    country: options.country ?? 'unknown',
  }
}

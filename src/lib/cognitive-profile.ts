export type CognitiveSignalType = 'confused' | 'mastered' | 'struggling' | 'confident'

export function detectCognitiveSignal(message: string, responseTimeMs: number): CognitiveSignalType {
  const msg = message.toLowerCase().trim()

  if (
    msg.includes('не понял') || msg.includes('не понимаю') || msg.includes('непонятно') ||
    msg.includes("don't understand") || msg.includes('confused') || msg.includes('what?') ||
    msg === 'нет' || msg === 'no' || msg.includes('समझ नहीं') ||
    (msg.length < 10 && (msg.includes('нет') || msg.includes('no') || msg.includes('?')))
  ) return 'confused'

  if (
    msg.includes('понял') || msg.includes('понятно') || msg.includes('ясно') ||
    msg.includes('understood') || msg.includes('got it') || msg.includes('clear') ||
    msg === 'да' || msg === 'yes' || msg.includes('समझ गया') || msg.includes('ok')
  ) return 'mastered'

  if (responseTimeMs > 45000 && msg.length < 15) return 'struggling'

  return 'confident'
}

export function buildMemoryContext(profile: {
  confusedTopics?: string[]
  masteredTopics?: string[]
  lastStudiedTopic?: string | null
  totalSessions?: number
  streakDays?: number
}, sessions: Array<{ summary?: string | null; startedAt: Date }>): string {
  const confused = profile.confusedTopics?.length ? profile.confusedTopics.join(', ') : null
  const mastered = profile.masteredTopics?.length ? profile.masteredTopics.join(', ') : null
  const lastTopic = profile.lastStudiedTopic

  const parts: string[] = []

  if (mastered) parts.push(`Усвоенные темы: ${mastered}`)
  if (confused) parts.push(`Темы с трудностями: ${confused} — попробуй объяснить по-другому если снова встретятся`)
  if (lastTopic) parts.push(`Последняя тема: ${lastTopic} — продолжи с этого места`)

  const summaries = sessions.filter(s => s.summary).map(s => s.summary!)
  if (summaries.length) parts.push(`Предыдущие сессии:\n${summaries.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}`)

  return parts.length ? parts.join('\n') : ''
}

import { ai, TUTOR_MODEL } from './client'

export type MoodAnalysis = {
  engagement: 'high' | 'medium' | 'low'
  confusion: 'none' | 'slight' | 'moderate' | 'high'
  suggestedAction: 'continue' | 'simplify' | 'switch_example' | 'take_break' | 'encourage'
  notes: string
}

export async function analyzeStudentMood(
  recentMessages: Array<{ role: string; content: string }>
): Promise<MoodAnalysis> {
  const prompt = `Проанализируй последние сообщения студента и определи его эмоциональное состояние и уровень понимания.

Сообщения:
${recentMessages.map((m) => `[${m.role}]: ${m.content}`).join('\n')}

Верни ТОЛЬКО валидный JSON (без markdown):
{
  "engagement": "high|medium|low",
  "confusion": "none|slight|moderate|high",
  "suggestedAction": "continue|simplify|switch_example|take_break|encourage",
  "notes": "краткое объяснение"
}`

  try {
    const completion = await ai.chat.completions.create({
      model: TUTOR_MODEL,
      messages: [
        { role: 'system', content: 'Return only valid JSON, no markdown.' },
        { role: 'user', content: prompt },
      ],
    })
    const text = completion.choices[0].message.content ?? ''
    return JSON.parse(text) as MoodAnalysis
  } catch {
    return {
      engagement: 'medium',
      confusion: 'none',
      suggestedAction: 'continue',
      notes: 'Could not parse mood analysis',
    }
  }
}

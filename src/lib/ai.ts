// Convenience re-export — Groq AI helpers at a flat path
export {
  groq,
  TUTOR_MODEL,
  buildTutorSystemPrompt,
  buildCurriculumPrompt,
} from '@/lib/ai/client'
export { analyzeStudentMood } from '@/lib/ai/mood'
export type { MoodAnalysis } from '@/lib/ai/mood'

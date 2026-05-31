// Convenience re-export — Gemini AI helpers at a flat path
export {
  getGeminiModel,
  TUTOR_MODEL,
  buildTutorSystemPrompt,
  buildCurriculumPrompt,
} from '@/lib/ai/client'
export { analyzeStudentMood } from '@/lib/ai/mood'
export type { MoodAnalysis } from '@/lib/ai/mood'

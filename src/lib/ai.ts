// Convenience re-export — OpenRouter AI helpers at a flat path
export {
  ai,
  TUTOR_MODEL,
  buildTutorSystemPrompt,
  buildCurriculumPrompt,
} from '@/lib/ai/client'
export { analyzeStudentMood } from '@/lib/ai/mood'
export type { MoodAnalysis } from '@/lib/ai/mood'

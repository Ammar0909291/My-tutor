// Convenience re-export — AI helpers at a flat path
export {
  generateAIResponse,
  generateJSON,
  summarizeSession,
  buildTutorSystemPrompt,
  buildCurriculumPrompt,
} from '@/lib/ai/client'
export { analyzeStudentMood } from '@/lib/ai/mood'
export type { MoodAnalysis } from '@/lib/ai/mood'

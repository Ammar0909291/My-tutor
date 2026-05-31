// Convenience re-export — keep Claude/Anthropic helpers at a flat path
export {
  anthropic,
  TUTOR_MODEL,
  buildTutorSystemPrompt,
  buildCurriculumPrompt,
} from "@/lib/ai/client";
export { analyzeStudentMood } from "@/lib/ai/mood";
export type { MoodAnalysis } from "@/lib/ai/mood";

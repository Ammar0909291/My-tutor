import { anthropic, TUTOR_MODEL } from "./client";

export type MoodAnalysis = {
  engagement: "high" | "medium" | "low";
  confusion: "none" | "slight" | "moderate" | "high";
  suggestedAction: "continue" | "simplify" | "switch_example" | "take_break" | "encourage";
  notes: string;
};

export async function analyzeStudentMood(
  recentMessages: Array<{ role: string; content: string }>
): Promise<MoodAnalysis> {
  const prompt = `Проанализируй последние сообщения студента и определи его эмоциональное состояние и уровень понимания.

Сообщения:
${recentMessages.map((m) => `[${m.role}]: ${m.content}`).join("\n")}

Верни ТОЛЬКО валидный JSON (без markdown):
{
  "engagement": "high|medium|low",
  "confusion": "none|slight|moderate|high",
  "suggestedAction": "continue|simplify|switch_example|take_break|encourage",
  "notes": "краткое объяснение"
}`;

  const response = await anthropic.messages.create({
    model: TUTOR_MODEL,
    max_tokens: 256,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "{}";

  try {
    return JSON.parse(text) as MoodAnalysis;
  } catch {
    return {
      engagement: "medium",
      confusion: "none",
      suggestedAction: "continue",
      notes: "Could not parse mood analysis",
    };
  }
}

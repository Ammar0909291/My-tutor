import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export const GEO_BLOCK_MSG = "GEO_BLOCKED"

export async function transcribeAudio(audioBlob: Blob, language = "ru"): Promise<string> {
  const file = new File([audioBlob], "audio.webm", { type: audioBlob.type });

  try {
    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      language,
      response_format: "text",
    });

    return transcription as unknown as string;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes("403") || msg.toLowerCase().includes("country") || msg.toLowerCase().includes("region") || msg.toLowerCase().includes("territory")) {
      throw new Error(GEO_BLOCK_MSG)
    }
    throw err
  }
}


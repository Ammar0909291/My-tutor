import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function transcribeAudio(audioBlob: Blob, language = "ru"): Promise<string> {
  const file = new File([audioBlob], "audio.webm", { type: audioBlob.type });

  const transcription = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
    language,
    response_format: "text",
  });

  return transcription as unknown as string;
}

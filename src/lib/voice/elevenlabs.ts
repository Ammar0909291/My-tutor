const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

// Default Russian voice — can be overridden per user preference
const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? "pNInz6obpgDQGcFmaJgB";

export async function synthesizeSpeech(
  text: string,
  voiceId = DEFAULT_VOICE_ID
): Promise<ArrayBuffer> {
  const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": process.env.ELEVENLABS_API_KEY!,
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.3,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
  }

  return response.arrayBuffer();
}

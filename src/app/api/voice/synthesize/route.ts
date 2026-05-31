import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { synthesizeSpeech } from "@/lib/voice/elevenlabs";

const schema = z.object({ text: z.string().min(1).max(5000) });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { text } = schema.parse(body);

    const audioBuffer = await synthesizeSpeech(text);

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(audioBuffer.byteLength),
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 });
    }
    console.error("[voice/synthesize]", err);
    return NextResponse.json({ success: false, error: "Speech synthesis failed" }, { status: 500 });
  }
}

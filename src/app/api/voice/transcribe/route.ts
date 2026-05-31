import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { transcribeAudio } from "@/lib/voice/whisper";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio");

    if (!audioFile || !(audioFile instanceof Blob)) {
      return NextResponse.json({ success: false, error: "No audio file provided" }, { status: 400 });
    }

    const language = (formData.get("language") as string | null) ?? "ru";
    const transcript = await transcribeAudio(audioFile, language);

    return NextResponse.json({ success: true, data: { transcript } });
  } catch (err) {
    console.error("[voice/transcribe]", err);
    return NextResponse.json({ success: false, error: "Transcription failed" }, { status: 500 });
  }
}

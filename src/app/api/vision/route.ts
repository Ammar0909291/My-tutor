import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const schema = z.object({
  imageBase64: z.string().min(1),
  mimeType: z.string().default('image/jpeg'),
  question: z.string().max(2000).default(''),
  subject: z.string().max(64).default('programming'),
  lang: z.enum(['ru', 'en', 'hi']).default('en'),
})

const PROMPTS: Record<string, string> = {
  ru: 'Студент прислал изображение (код, ошибку компилятора или задачу). Проанализируй и объясни: если это код — что он делает и как работает; если это ошибка — в чём причина и как исправить; если это задача — реши пошагово. Отвечай как живой репетитор, кратко и по делу.',
  en: 'The student sent an image (code, compiler error, or a problem). Analyze and explain: if it is code — what it does and how it works; if it is an error — what caused it and how to fix it; if it is a problem — solve it step by step. Reply like a live tutor, brief and to the point.',
  hi: 'छात्र ने एक छवि भेजी है (कोड, compiler error, या कोई समस्या)। विश्लेषण करें: अगर कोड है — क्या करता है और कैसे; अगर error है — कारण और सुधार; अगर समस्या है — step by step हल करें। एक जीवंत ट्यूटर की तरह जवाब दें।',
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ success: false, error: 'GEMINI_API_KEY not configured' }, { status: 500 })

  try {
    const body = await req.json()
    const { imageBase64, mimeType, question, lang } = schema.parse(body)

    const basePrompt = PROMPTS[lang]
    const fullPrompt = question ? `${basePrompt}\n\nStudent question: ${question}` : basePrompt

    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: fullPrompt }] },
        contents: [{
          role: 'user',
          parts: [
            { inlineData: { mimeType, data: imageBase64 } },
            { text: question || 'Analyze this image.' },
          ],
        }],
        generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
      }),
    })

    if (!res.ok) {
      const errBody = await res.text()
      return NextResponse.json({ success: false, error: `Gemini ${res.status}: ${errBody}` }, { status: 500 })
    }

    const result = await res.json()
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    return NextResponse.json({ success: true, text })
  } catch (err) {
    console.error('[vision]', err)
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ success: false, error: msg }, { status: 500 })
  }
}

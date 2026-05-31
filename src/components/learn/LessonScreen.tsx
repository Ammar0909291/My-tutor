'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, Loader2, Mic, Send, Volume2, VolumeX } from 'lucide-react'

// Monaco must be loaded client-side only
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// ─── Constants ────────────────────────────────────────────────────────────────

const LANG_MAP: Record<string, string> = {
  c: 'c',
  cpp: 'cpp',
  python: 'python',
  english: 'markdown',
}

const LANG_LABELS: Record<string, string> = {
  c: 'C',
  cpp: 'C++',
  python: 'Python',
  english: 'English / Markdown',
}

const INITIAL_CODE: Record<string, string> = {
  c: '// Здесь появится код от репетитора\n',
  cpp: '// Здесь появится код от репетитора\n',
  python: '# Здесь появится код от репетитора\n',
  english: '<!-- Заметки репетитора -->\n',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractLastCodeBlock(text: string): string | null {
  const regex = /```(?:\w*)\n([\s\S]*?)```/g
  let match: RegExpExecArray | null
  let last: string | null = null
  while ((match = regex.exec(text)) !== null) last = match[1].trim()
  return last
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  streaming?: boolean
}

interface Props {
  subjectSlug: string
  subjectName: string
  levelDescription: string
  voiceChoice: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LessonScreen({ subjectSlug, subjectName, levelDescription, voiceChoice }: Props) {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [code, setCode] = useState(INITIAL_CODE[subjectSlug] ?? '// ...\n')
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [initError, setInitError] = useState('')
  const [speakingId, setSpeakingId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initializedRef = useRef(false)

  // ── TTS state ─────────────────────────────────────────────────────────────
  const ttsQueueRef = useRef<Array<{ id: string; text: string }>>([])
  const isPlayingRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const voiceChoiceRef = useRef(voiceChoice)
  useEffect(() => { voiceChoiceRef.current = voiceChoice }, [voiceChoice])

  const language = LANG_MAP[subjectSlug] ?? 'plaintext'
  const langLabel = LANG_LABELS[subjectSlug] ?? subjectSlug.toUpperCase()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // ── TTS: stop current audio and clear queue ────────────────────────────────

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.onended = null
      audioRef.current.onerror = null
      audioRef.current = null
    }
    ttsQueueRef.current = []
    isPlayingRef.current = false
    setSpeakingId(null)
  }, [])

  // ── TTS: play next item in queue ───────────────────────────────────────────

  const processNextTTS = useCallback(() => {
    if (isPlayingRef.current || ttsQueueRef.current.length === 0) return

    const item = ttsQueueRef.current.shift()!
    isPlayingRef.current = true
    setSpeakingId(item.id)

    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: item.text, voiceId: voiceChoiceRef.current }),
    })
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(`TTS ${r.status}`))))
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audioRef.current = audio

        const done = () => {
          URL.revokeObjectURL(url)
          audioRef.current = null
          isPlayingRef.current = false
          setSpeakingId(null)
          processNextTTS()
        }
        audio.onended = done
        audio.onerror = done
        audio.play().catch(done)
      })
      .catch(() => {
        isPlayingRef.current = false
        setSpeakingId(null)
      })
  }, []) // stable — uses only refs and itself

  // ── TTS: enqueue a message ─────────────────────────────────────────────────

  const enqueueTTS = useCallback((id: string, text: string) => {
    ttsQueueRef.current.push({ id, text })
    processNextTTS()
  }, [processNextTTS])

  // ── Stream a message from the AI ──────────────────────────────────────────

  const streamMessage = useCallback(async (sid: string, text: string, showInUI = true) => {
    setIsStreaming(true)

    if (showInUI) {
      setMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, role: 'user', content: text },
      ])
    }

    const assistantId = `a-${Date.now()}`
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: 'assistant', content: '', streaming: true },
    ])

    try {
      const res = await fetch('/api/learn/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid, message: text }),
      })

      if (!res.ok || !res.body) throw new Error('Bad response')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const payload = line.slice(6).trim()
          if (payload === '[DONE]') break
          try {
            const parsed = JSON.parse(payload)
            if (parsed.text) {
              fullText += parsed.text
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: fullText } : m
                )
              )
              const extracted = extractLastCodeBlock(fullText)
              if (extracted) setCode(extracted)
            }
          } catch {
            // incomplete JSON chunk — wait for next iteration
          }
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, streaming: false } : m
        )
      )

      if (fullText) enqueueTTS(assistantId, fullText)
    } catch (err) {
      console.error('[streamMessage]', err)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: 'Ошибка соединения. Попробуй ещё раз.', streaming: false }
            : m
        )
      )
    } finally {
      setIsStreaming(false)
      inputRef.current?.focus()
    }
  }, [enqueueTTS])

  // ── Init: create session → send opening trigger ───────────────────────────

  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    async function init() {
      try {
        const res = await fetch('/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subjectSlug }),
        })
        const data = await res.json()

        if (!data.success) {
          setInitError(data.code === 'UPGRADE_REQUIRED' ? 'upgrade' : (data.error ?? 'Ошибка'))
          return
        }

        const sid = data.data.id
        setSessionId(sid)

        await streamMessage(
          sid,
          `Начни первый урок по предмету "${subjectName}". Уровень студента: "${levelDescription}". Представься, поприветствуй студента и дай первое объяснение с примером кода.`,
          false
        )
      } catch {
        setInitError('Не удалось подключиться. Обнови страницу.')
      }
    }

    init()
  }, [subjectSlug, subjectName, levelDescription, streamMessage])

  // ── Send user message ─────────────────────────────────────────────────────

  async function handleSend() {
    const text = input.trim()
    if (!text || isStreaming || !sessionId) return
    setInput('')
    await streamMessage(sessionId, text, true)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // ── Error states ──────────────────────────────────────────────────────────

  if (initError === 'upgrade') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-md text-center border border-slate-700">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-white mb-2">Бесплатный урок использован</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Ты уже прошёл бесплатный урок. Оформи подписку, чтобы продолжить обучение.
          </p>
          <Link
            href="/billing"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
          >
            Оформить подписку
          </Link>
          <Link href="/dashboard" className="block mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    )
  }

  if (initError) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="bg-slate-800 rounded-2xl p-8 max-w-sm text-center border border-slate-700">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-400 text-sm mb-5">{initError}</p>
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
            ← Назад
          </Link>
        </div>
      </div>
    )
  }

  // ── Main layout ───────────────────────────────────────────────────────────

  return (
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden">

      {/* Top bar */}
      <div className="h-12 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-3 shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Назад</span>
        </Link>
        <div className="w-px h-4 bg-slate-700" />
        <span className="text-slate-200 text-sm font-medium">{subjectName}</span>
        <div className="ml-auto flex items-center gap-3">
          {speakingId && (
            <button
              onClick={stopAudio}
              className="flex items-center gap-1.5 text-emerald-400 text-xs hover:text-emerald-300 transition-colors"
            >
              <Volume2 size={12} className="animate-pulse" />
              говорит...
            </button>
          )}
          {isStreaming && (
            <div className="flex items-center gap-2 text-indigo-400 text-xs">
              <Loader2 size={12} className="animate-spin" />
              Репетитор печатает...
            </div>
          )}
        </div>
      </div>

      {/* Split screen */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Monaco Editor (60%) ── */}
        <div className="relative border-r border-slate-700" style={{ width: '60%' }}>
          <div className="absolute top-3 right-4 z-10 px-2.5 py-1 bg-slate-700 text-slate-300 text-xs font-mono rounded select-none">
            {langLabel}
          </div>

          <MonacoEditor
            height="100%"
            language={language}
            value={code}
            theme="vs-dark"
            options={{
              readOnly: true,
              fontSize: 14,
              lineHeight: 22,
              fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              padding: { top: 16, bottom: 16 },
              renderLineHighlight: 'none',
              hideCursorInOverviewRuler: true,
              overviewRulerBorder: false,
              folding: false,
              glyphMargin: false,
              contextmenu: false,
              lineNumbers: 'on',
              automaticLayout: true,
            }}
          />
        </div>

        {/* ── Conversation panel (40%) ── */}
        <div className="flex flex-col bg-slate-900" style={{ width: '40%' }}>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <Loader2 size={28} className="animate-spin text-indigo-400" />
                <p className="text-slate-500 text-sm">Репетитор готовится к уроку...</p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="group relative max-w-[88%]">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-sm'
                        : 'bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700'
                    } ${speakingId === msg.id ? 'ring-1 ring-emerald-500/40' : ''}`}
                  >
                    {msg.content || <TypingDots />}
                  </div>

                  {/* Speaker button — visible on hover or while speaking */}
                  {msg.role === 'assistant' && !msg.streaming && msg.content && (
                    <button
                      onClick={() =>
                        speakingId === msg.id
                          ? stopAudio()
                          : enqueueTTS(msg.id, msg.content)
                      }
                      title={speakingId === msg.id ? 'Остановить' : 'Прослушать'}
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all border ${
                        speakingId === msg.id
                          ? 'bg-emerald-500 border-emerald-400 text-white opacity-100'
                          : 'bg-slate-700 border-slate-600 text-slate-400 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {speakingId === msg.id ? <VolumeX size={10} /> : <Volume2 size={10} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="px-4 py-3 border-t border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming || !sessionId}
                placeholder={isStreaming ? 'Репетитор печатает...' : 'Напиши свой вопрос...'}
                className="flex-1 bg-slate-800 text-slate-100 placeholder-slate-500 px-4 py-2.5 rounded-xl text-sm border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
              />
              <button
                disabled
                title="Голосовой ввод — скоро"
                className="w-9 h-9 flex items-center justify-center bg-slate-800 text-slate-500 rounded-xl border border-slate-700 cursor-not-allowed opacity-50"
              >
                <Mic size={15} />
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming || !sessionId}
                className="w-9 h-9 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={15} />
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2 text-center">Enter — отправить · Shift+Enter — новая строка</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <span className="flex gap-1 items-center py-0.5">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  )
}

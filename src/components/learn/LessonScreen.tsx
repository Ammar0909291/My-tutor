'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, Loader2, Mic, Pause, Play, Send, Volume2, VolumeX } from 'lucide-react'

// Monaco must be loaded client-side only
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// ─── Voice presets (current ElevenLabs premade voices) ───────────────────────

const VOICE_PRESETS = [
  { id: 'nPczCjzI2devNBz1zQrb', label: 'Мужской', hint: 'Brian — уверенный, глубокий'   },
  { id: '9BWtsMINqrJLrRacOk9x', label: 'Женский', hint: 'Aria — энергичный, живой'      },
  { id: 'IKne3meq5aSn9XLyUdCD', label: 'Тёплый',  hint: 'Charlie — живой, разговорный'  },
] as const

const ONBOARDING_VOICE_MAP: Record<string, string> = {
  alexei: 'nPczCjzI2devNBz1zQrb',
  maria:  '9BWtsMINqrJLrRacOk9x',
  dmitry: 'IKne3meq5aSn9XLyUdCD',
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LANG_MAP: Record<string, string> = {
  c: 'c', cpp: 'cpp', python: 'python', english: 'markdown',
}
const LANG_LABELS: Record<string, string> = {
  c: 'C', cpp: 'C++', python: 'Python', english: 'English / Markdown',
}
const INITIAL_CODE: Record<string, string> = {
  c: '// Здесь появится код от репетитора\n',
  cpp: '// Здесь появится код от репетитора\n',
  python: '# Здесь появится код от репетитора\n',
  english: '<!-- Заметки репетитора -->\n',
}

// ─── AudioWaveform ────────────────────────────────────────────────────────────

function AudioWaveform({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[2px] ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="inline-block w-[3px] h-3 bg-current rounded-full origin-bottom"
          style={{ animation: `audioBar 0.8s ease-in-out ${i * 0.12}s infinite` }}
        />
      ))}
    </span>
  )
}

function StaticWaveform({ className = '' }: { className?: string }) {
  const bars = [30, 55, 75, 45, 65, 80, 40, 60]
  return (
    <span className={`inline-flex items-center gap-[2px] ${className}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="inline-block w-[2px] bg-current rounded-full opacity-30"
          style={{ height: `${h * 0.1}px` }}
        />
      ))}
    </span>
  )
}

function formatTime(sec: number): string {
  const s = Math.floor(sec)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripTextForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]+`/g, '')
    .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_\n]+)_{1,3}/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

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
type MicState = 'idle' | 'recording' | 'transcribing' | 'error'

interface Props {
  subjectSlug: string
  subjectName: string
  levelDescription: string
  voiceChoice: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LessonScreen({ subjectSlug, subjectName, levelDescription, voiceChoice }: Props) {
  const [sessionId, setSessionId]       = useState<string | null>(null)
  const [messages, setMessages]         = useState<ChatMessage[]>([])
  const [code, setCode]                 = useState(INITIAL_CODE[subjectSlug] ?? '// ...\n')
  const [input, setInput]               = useState('')
  const [isStreaming, setIsStreaming]   = useState(false)
  const [initError, setInitError]       = useState('')
  const [speakingId, setSpeakingId]     = useState<string | null>(null)
  const [playbackProgress, setPlaybackProgress] = useState(0)   // 0–1
  const [audioDuration, setAudioDuration]       = useState(0)   // seconds
  const [micState, setMicState]         = useState<MicState>('idle')
  const [micError, setMicError]         = useState<string>('')
  const [ttsEngine, setTtsEngine]       = useState<'elevenlabs' | 'browser' | ''>('')
  const [ttsError, setTtsError]         = useState<string>('')
  const [selectedVoiceId, setSelectedVoiceId] = useState(
    () => ONBOARDING_VOICE_MAP[voiceChoice] ?? VOICE_PRESETS[0].id
  )

  const messagesEndRef   = useRef<HTMLDivElement>(null)
  const inputRef         = useRef<HTMLInputElement>(null)
  const initializedRef   = useRef(false)

  // ── TTS refs ──────────────────────────────────────────────────────────────
  const ttsQueueRef      = useRef<Array<{ id: string; text: string }>>([])
  const isPlayingRef     = useRef(false)
  const audioCtxRef      = useRef<AudioContext | null>(null)
  const sourceNodeRef    = useRef<AudioBufferSourceNode | null>(null)
  const progressRafRef   = useRef<number | null>(null)
  const voiceChoiceRef   = useRef(selectedVoiceId)
  useEffect(() => { voiceChoiceRef.current = selectedVoiceId }, [selectedVoiceId])

  // ── Mic refs ──────────────────────────────────────────────────────────────
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef   = useRef<Blob[]>([])

  const language = LANG_MAP[subjectSlug] ?? 'plaintext'
  const langLabel = LANG_LABELS[subjectSlug] ?? subjectSlug.toUpperCase()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  // ── Audio: unlock AudioContext during user gesture ────────────────────────
  const ensureAudioContext = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
  }, [])

  // ── TTS: stop + clear progress ────────────────────────────────────────────
  const stopAudio = useCallback(() => {
    if (progressRafRef.current !== null) {
      cancelAnimationFrame(progressRafRef.current)
      progressRafRef.current = null
    }
    setPlaybackProgress(0)
    if (sourceNodeRef.current) {
      sourceNodeRef.current.onended = null
      try { sourceNodeRef.current.stop() } catch { /* already stopped */ }
      sourceNodeRef.current = null
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    ttsQueueRef.current = []
    isPlayingRef.current = false
    setSpeakingId(null)
  }, [])

  // ── TTS: play next — ElevenLabs + progress bar, Web Speech fallback ───────
  const processNextTTS = useCallback(() => {
    if (isPlayingRef.current || ttsQueueRef.current.length === 0) return

    const item = ttsQueueRef.current.shift()!
    isPlayingRef.current = true
    setSpeakingId(item.id)

    const finish = () => {
      if (progressRafRef.current !== null) {
        cancelAnimationFrame(progressRafRef.current)
        progressRafRef.current = null
      }
      setPlaybackProgress(0)
      sourceNodeRef.current = null
      isPlayingRef.current = false
      setSpeakingId(null)
      processNextTTS()
    }

    const speakFallback = (reason: string) => {
      console.warn('[TTS] ElevenLabs failed, using browser fallback. Reason:', reason)
      setTtsEngine('browser')
      setTtsError(reason)
      if (!('speechSynthesis' in window)) { finish(); return }
      window.speechSynthesis.cancel()
      const utt = new SpeechSynthesisUtterance(stripTextForSpeech(item.text).slice(0, 500))
      utt.lang = 'ru-RU'
      utt.rate = 0.9
      utt.onend = finish
      utt.onerror = finish
      window.speechSynthesis.speak(utt)
    }

    const ctx = audioCtxRef.current
    if (!ctx) { speakFallback('no AudioContext'); return }

    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: item.text, voiceId: voiceChoiceRef.current }),
    })
      .then(async (r) => {
        if (!r.ok) {
          const body = await r.text().catch(() => '')
          throw new Error(`TTS HTTP ${r.status}: ${body}`)
        }
        return r.arrayBuffer()
      })
      .then((buf) => {
        if (buf.byteLength === 0) throw new Error('TTS returned empty audio')
        return ctx.decodeAudioData(buf)
      })
      .then((audioBuf) => {
        setTtsEngine('elevenlabs')
        const source = ctx.createBufferSource()
        source.buffer = audioBuf
        source.connect(ctx.destination)
        sourceNodeRef.current = source

        const startTime = ctx.currentTime
        const duration  = audioBuf.duration || 1
        setAudioDuration(duration)

        const tick = () => {
          if (!isPlayingRef.current) return
          const progress = Math.min((ctx.currentTime - startTime) / duration, 1)
          setPlaybackProgress(progress)
          if (progress < 1) progressRafRef.current = requestAnimationFrame(tick)
        }
        progressRafRef.current = requestAnimationFrame(tick)

        source.onended = finish
        source.start()
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err)
        speakFallback(msg)
      })
  }, []) // stable — only refs

  const enqueueTTS = useCallback((id: string, text: string) => {
    ttsQueueRef.current.push({ id, text })
    processNextTTS()
  }, [processNextTTS])

  // ── Stream a message ──────────────────────────────────────────────────────
  const streamMessage = useCallback(async (sid: string, text: string, showInUI = true) => {
    setIsStreaming(true)

    if (showInUI) {
      setMessages((prev) => [
        ...prev, { id: `u-${Date.now()}`, role: 'user', content: text },
      ])
    }

    const assistantId = `a-${Date.now()}`
    setMessages((prev) => [
      ...prev, { id: assistantId, role: 'assistant', content: '', streaming: true },
    ])

    try {
      const res = await fetch('/api/learn/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid, message: text }),
      })
      if (!res.ok || !res.body) throw new Error('Bad response')

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      let buf      = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const payload = line.slice(6).trim()
          if (payload === '[DONE]') break
          try {
            const parsed = JSON.parse(payload)
            if (parsed.text) {
              fullText += parsed.text
              setMessages((prev) =>
                prev.map((m) => m.id === assistantId ? { ...m, content: fullText } : m)
              )
              const extracted = extractLastCodeBlock(fullText)
              if (extracted) setCode(extracted)
            }
          } catch { /* incomplete chunk */ }
        }
      }

      setMessages((prev) =>
        prev.map((m) => m.id === assistantId ? { ...m, streaming: false } : m)
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

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    async function init() {
      try {
        const res  = await fetch('/api/sessions', {
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

  // ── Send ──────────────────────────────────────────────────────────────────
  function handleSend() {
    const text = input.trim()
    if (!text || isStreaming || !sessionId) return
    ensureAudioContext()
    setInput('')
    streamMessage(sessionId, text, true)
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  // ── Mic ───────────────────────────────────────────────────────────────────
  async function startRecording() {
    setMicError('')
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError('Микрофон не поддерживается браузером')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : ''
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {})
      mediaRecorderRef.current = recorder
      audioChunksRef.current = []
      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
      recorder.start(100)
      setMicState('recording')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Ошибка микрофона'
      console.error('[mic start]', err)
      setMicError(msg.includes('Permission') || msg.includes('NotAllowed') ? 'Нет разрешения на микрофон' : `Микрофон: ${msg}`)
      setMicState('idle')
    }
  }

  async function stopRecordingAndTranscribe() {
    const recorder = mediaRecorderRef.current
    if (!recorder) return
    setMicState('transcribing')
    setMicError('')
    await new Promise<void>((resolve) => {
      recorder.onstop = () => { recorder.stream.getTracks().forEach((t) => t.stop()); resolve() }
      recorder.stop()
    })
    try {
      if (!audioChunksRef.current.length) {
        setMicError('Аудио не записано — попробуй ещё раз')
        setMicState('idle'); return
      }
      const mimeType = audioChunksRef.current[0].type || 'audio/webm'
      const blob = new Blob(audioChunksRef.current, { type: mimeType })
      if (blob.size < 100) {
        setMicError('Слишком короткая запись')
        setMicState('idle'); return
      }
      const ext = mimeType.includes('mp4') ? 'mp4' : 'webm'
      const fd  = new FormData()
      fd.append('audio', blob, `recording.${ext}`)
      const res  = await fetch('/api/whisper', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) {
        setMicError(`Whisper error ${res.status}: ${data.error ?? 'unknown'}`)
        return
      }
      if (data.text) {
        setInput((p) => p ? `${p} ${data.text}` : data.text)
        inputRef.current?.focus()
      } else {
        setMicError('Речь не распознана — говори чётче')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[whisper]', err)
      setMicError(`Ошибка: ${msg}`)
    } finally {
      mediaRecorderRef.current = null
      setMicState('idle')
    }
  }

  function handleMicClick() {
    if (micState === 'recording') stopRecordingAndTranscribe()
    else if (micState === 'idle') startRecording()
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
          <Link href="/billing" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">
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
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">← Назад</Link>
        </div>
      </div>
    )
  }

  // ── Main layout ───────────────────────────────────────────────────────────
  return (
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden">

      {/* Top bar */}
      <div className="h-12 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-3 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors">
          <ArrowLeft size={14} /><span>Назад</span>
        </Link>
        <div className="w-px h-4 bg-slate-700" />
        <span className="text-slate-200 text-sm font-medium">{subjectName}</span>

        {/* Voice picker */}
        <div className="ml-auto flex items-center gap-1 bg-slate-900/60 rounded-lg p-0.5 border border-slate-700/50">
          {VOICE_PRESETS.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVoiceId(v.id)}
              title={v.hint}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedVoiceId === v.id ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {speakingId && (
            <button onClick={stopAudio} title="Остановить" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
              <AudioWaveform />
              <VolumeX size={12} />
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
              readOnly: true, fontSize: 14, lineHeight: 22,
              fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
              minimap: { enabled: false }, scrollBeyondLastLine: false,
              wordWrap: 'on', padding: { top: 16, bottom: 16 },
              renderLineHighlight: 'none', hideCursorInOverviewRuler: true,
              overviewRulerBorder: false, folding: false, glyphMargin: false,
              contextmenu: false, lineNumbers: 'on', automaticLayout: true,
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
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`group max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap transition-all ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700'
                } ${speakingId === msg.id ? 'ring-1 ring-emerald-500/40' : ''}`}>

                  {msg.content || <TypingDots />}

                  {/* ── Audio player bar ── */}
                  {msg.role === 'assistant' && !msg.streaming && msg.content && (() => {
                    const isThis  = speakingId === msg.id
                    const pct     = isThis ? playbackProgress * 100 : 0
                    const elapsed = isThis ? playbackProgress * audioDuration : 0
                    return (
                      <div className={`mt-3 transition-opacity ${isThis ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${
                          isThis ? 'bg-emerald-600/20 border border-emerald-500/30' : 'bg-slate-700/50 border border-slate-600/40'
                        }`}>

                          {/* Play / Pause */}
                          <button
                            onClick={() => { ensureAudioContext(); isThis ? stopAudio() : enqueueTTS(msg.id, msg.content) }}
                            className={`flex-shrink-0 transition-colors ${isThis ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-400 hover:text-white'}`}
                          >
                            {isThis
                              ? <Pause size={13} fill="currentColor" strokeWidth={0} />
                              : <Play  size={13} fill="currentColor" strokeWidth={0} className="translate-x-px" />
                            }
                          </button>

                          {/* Elapsed time */}
                          <span className={`text-[11px] tabular-nums flex-shrink-0 w-7 ${isThis ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {formatTime(elapsed)}
                          </span>

                          {/* Progress track + thumb */}
                          <div className="relative flex-1 h-[3px] bg-slate-600/60 rounded-full cursor-pointer">
                            <div
                              className={`absolute inset-y-0 left-0 rounded-full ${isThis ? 'bg-emerald-400' : 'bg-slate-600'}`}
                              style={{ width: `${pct}%`, transition: 'none' }}
                            />
                            {isThis && (
                              <div
                                className="absolute top-1/2 w-2.5 h-2.5 bg-white rounded-full shadow"
                                style={{ left: `${pct}%`, transform: 'translate(-50%,-50%)', transition: 'none' }}
                              />
                            )}
                          </div>

                          {/* Volume icon */}
                          <Volume2 size={13} className={`flex-shrink-0 ${isThis ? 'text-emerald-400' : 'text-slate-500'}`} />
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="px-4 py-3 border-t border-slate-800 shrink-0">

            {/* Error / status row */}
            {(micError || ttsEngine === 'browser') && (
              <div className="mb-2 flex items-center gap-2">
                {micError && (
                  <span className="flex-1 text-xs text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-1.5">
                    🎤 {micError}
                  </span>
                )}
                {ttsEngine === 'browser' && !micError && (
                  <span className="flex-1 text-xs text-amber-400 bg-amber-900/20 border border-amber-800/40 rounded-lg px-3 py-1.5">
                    ⚠️ ElevenLabs: {ttsError || 'неизвестная ошибка'}
                  </span>
                )}
              </div>
            )}

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
                onClick={() => { setMicError(''); handleMicClick() }}
                disabled={isStreaming || !sessionId || micState === 'transcribing'}
                title={micState === 'recording' ? 'Остановить запись' : micState === 'transcribing' ? 'Распознаю...' : 'Голосовой ввод'}
                className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-colors ${
                  micState === 'recording'
                    ? 'bg-red-600 border-red-500 text-white animate-pulse'
                    : micState === 'transcribing'
                    ? 'bg-slate-700 border-slate-600 text-slate-300'
                    : micError
                    ? 'bg-red-900/30 text-red-400 border-red-700'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200 hover:border-slate-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {micState === 'transcribing' ? <Loader2 size={15} className="animate-spin" /> : <Mic size={15} />}
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
        <span key={delay} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </span>
  )
}

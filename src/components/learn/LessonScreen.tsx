'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, Loader2, Mic, Pause, Play, Send, Volume2, VolumeX } from 'lucide-react'

// Monaco must be loaded client-side only
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// ─── Web Speech API typings (not in standard lib.dom) ────────────────────────
interface SpeechRecognitionLike {
  lang: string
  interimResults: boolean
  continuous: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onend: (() => void) | null
  onerror: ((event: { error: string }) => void) | null
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike

function getSpeechRecognition(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

// ─── Voice presets (ElevenLabs premade voices) ──────────────────────────────
const VOICE_PRESETS = [
  { id: 'nPczCjzI2devNBz1zQrb', label: 'Мужской', hint: 'Brian — уверенный, глубокий' },
  { id: '9BWtsMINqrJLrRacOk9x', label: 'Женский', hint: 'Aria — энергичный, живой' },
  { id: 'IKne3meq5aSn9XLyUdCD', label: 'Тёплый',  hint: 'Charlie — живой, разговорный' },
] as const

const ONBOARDING_VOICE_MAP: Record<string, string> = {
  alexei: 'nPczCjzI2devNBz1zQrb',
  maria:  '9BWtsMINqrJLrRacOk9x',
  dmitry: 'IKne3meq5aSn9XLyUdCD',
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LANG_MAP: Record<string, string> = { c: 'c', cpp: 'cpp', python: 'python', english: 'markdown' }
const LANG_LABELS: Record<string, string> = { c: 'C', cpp: 'C++', python: 'Python', english: 'English / Markdown' }
const SUBJECT_ICONS: Record<string, string> = { c: '⚙️', cpp: '🔷', python: '🐍', english: '🇬🇧' }
const INITIAL_CODE: Record<string, string> = {
  c: '// Здесь появится код от репетитора\n',
  cpp: '// Здесь появится код от репетитора\n',
  python: '# Здесь появится код от репетитора\n',
  english: '<!-- Заметки репетитора -->\n',
}

// ─── Small UI helpers ───────────────────────────────────────────────────────
function AudioWaveform({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[2px] ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="inline-block w-[3px] h-3 bg-current rounded-full origin-bottom"
          style={{ animation: `audioBar 0.8s ease-in-out ${i * 0.12}s infinite` }} />
      ))}
    </span>
  )
}
function formatTime(sec: number): string {
  const s = Math.floor(sec)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
function formatClock(ts: number): string {
  return new Date(ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}
function stripTextForSpeech(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]+`/g, '')
    .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, '$1').replace(/_{1,3}([^_\n]+)_{1,3}/g, '$1')
    .replace(/^#{1,6}\s+/gm, '').replace(/^[-*+]\s+/gm, '').replace(/\n{3,}/g, '\n\n').trim()
}
function extractLastCodeBlock(text: string): string | null {
  const regex = /```(?:\w*)\n([\s\S]*?)```/g
  let match: RegExpExecArray | null
  let last: string | null = null
  while ((match = regex.exec(text)) !== null) last = match[1].trim()
  return last
}

// ─── Types ────────────────────────────────────────────────────────────────────
type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string; ts: number; streaming?: boolean }
type MicState = 'idle' | 'recording'

interface Props {
  subjectSlug: string
  subjectName: string
  levelDescription: string
  voiceChoice: string
  memoryContext?: string | null
  pastSessionsSummary?: string | null
  subjects?: { slug: string; name: string }[]
  displayName?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
export function LessonScreen({
  subjectSlug, subjectName, levelDescription, voiceChoice,
  memoryContext, pastSessionsSummary, subjects = [], displayName,
}: Props) {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [code, setCode] = useState(INITIAL_CODE[subjectSlug] ?? '// ...\n')
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [initError, setInitError] = useState('')
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [playbackProgress, setPlaybackProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [micState, setMicState] = useState<MicState>('idle')
  const [speechSupported, setSpeechSupported] = useState(false)
  const [ttsEngine, setTtsEngine] = useState<'elevenlabs' | 'browser' | ''>('')
  const [ttsError, setTtsError] = useState('')
  const [selectedVoiceId, setSelectedVoiceId] = useState(
    () => ONBOARDING_VOICE_MAP[voiceChoice] ?? VOICE_PRESETS[0].id
  )

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initializedRef = useRef(false)

  // TTS refs
  const ttsQueueRef = useRef<Array<{ id: string; text: string }>>([])
  const isPlayingRef = useRef(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const progressRafRef = useRef<number | null>(null)
  const voiceChoiceRef = useRef(selectedVoiceId)
  useEffect(() => { voiceChoiceRef.current = selectedVoiceId }, [selectedVoiceId])

  // Speech recognition refs
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const speechBaseRef = useRef('')

  const language = LANG_MAP[subjectSlug] ?? 'plaintext'
  const langLabel = LANG_LABELS[subjectSlug] ?? subjectSlug.toUpperCase()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  // Detect Web Speech API support once
  useEffect(() => { setSpeechSupported(getSpeechRecognition() !== null) }, [])

  // ── Audio context unlock (during user gesture) ─────────────────────────────
  const ensureAudioContext = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext()
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume().catch(() => {})
  }, [])

  const stopAudio = useCallback(() => {
    if (progressRafRef.current !== null) { cancelAnimationFrame(progressRafRef.current); progressRafRef.current = null }
    setPlaybackProgress(0)
    if (sourceNodeRef.current) {
      sourceNodeRef.current.onended = null
      try { sourceNodeRef.current.stop() } catch { /* already stopped */ }
      sourceNodeRef.current = null
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
    ttsQueueRef.current = []
    isPlayingRef.current = false
    setSpeakingId(null)
  }, [])

  // ── TTS: play next (ElevenLabs → browser fallback) ─────────────────────────
  const processNextTTS = useCallback(() => {
    if (isPlayingRef.current || ttsQueueRef.current.length === 0) return
    const item = ttsQueueRef.current.shift()!
    isPlayingRef.current = true
    setSpeakingId(item.id)

    const finish = () => {
      if (progressRafRef.current !== null) { cancelAnimationFrame(progressRafRef.current); progressRafRef.current = null }
      setPlaybackProgress(0)
      sourceNodeRef.current = null
      isPlayingRef.current = false
      setSpeakingId(null)
      processNextTTS()
    }

    const speakFallback = (reason: string, silent = false) => {
      if (!silent && reason) { setTtsEngine('browser'); setTtsError(reason) }
      if (!('speechSynthesis' in window)) { finish(); return }
      window.speechSynthesis.cancel()
      const utt = new SpeechSynthesisUtterance(stripTextForSpeech(item.text).slice(0, 500))
      utt.lang = 'ru-RU'; utt.rate = 0.9; utt.onend = finish; utt.onerror = finish
      window.speechSynthesis.speak(utt)
    }

    const ctx = audioCtxRef.current
    if (!ctx) { isPlayingRef.current = false; setSpeakingId(null); return }

    fetch('/api/tts', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: item.text, voiceId: voiceChoiceRef.current }),
    })
      .then(async (r) => {
        if (!r.ok) {
          if (r.status === 403) { speakFallback('', true); return null }
          const body = await r.text().catch(() => '')
          throw new Error(`TTS HTTP ${r.status}: ${body}`)
        }
        return r.arrayBuffer()
      })
      .then(async (buf) => {
        if (buf === null) return null
        if (buf.byteLength === 0) throw new Error('TTS returned empty audio')
        try {
          return await ctx.decodeAudioData(buf.slice(0))
        } catch {
          // decodeAudioData failed — buffer is likely a JSON error from ElevenLabs
          const text = new TextDecoder().decode(buf).slice(0, 300)
          throw new Error(`Audio decode failed. ElevenLabs response: ${text}`)
        }
      })
      .then((audioBuf) => {
        if (!audioBuf) return
        setTtsEngine('elevenlabs'); setTtsError('')
        const source = ctx.createBufferSource()
        source.buffer = audioBuf
        source.connect(ctx.destination)
        sourceNodeRef.current = source
        const startTime = ctx.currentTime
        const duration = audioBuf.duration || 1
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
      .catch((err: unknown) => speakFallback(err instanceof Error ? err.message : String(err)))
  }, [])

  const enqueueTTS = useCallback((id: string, text: string) => {
    ttsQueueRef.current.push({ id, text }); processNextTTS()
  }, [processNextTTS])

  // ── Stream a message ────────────────────────────────────────────────────────
  const streamMessage = useCallback(async (sid: string, text: string, showInUI = true) => {
    setIsStreaming(true)
    if (showInUI) {
      setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', content: text, ts: Date.now() }])
    }
    const assistantId = `a-${Date.now()}`
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '', ts: Date.now(), streaming: true }])

    try {
      const res = await fetch('/api/learn/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid, message: text }),
      })
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(errBody.error ?? `HTTP ${res.status}`)
      }
      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      let buf = ''
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
          let parsed: Record<string, unknown> | null = null
          try { parsed = JSON.parse(payload) } catch { /* incomplete chunk */ }
          if (!parsed) continue
          if (parsed.error) throw new Error(String(parsed.error))
          if (parsed.text) {
            fullText += parsed.text as string
            setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: fullText } : m))
            const extracted = extractLastCodeBlock(fullText)
            if (extracted) setCode(extracted)
          }
        }
      }

      if (!fullText) throw new Error('Репетитор не ответил. Попробуй ещё раз.')
      setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, streaming: false } : m))
      enqueueTTS(assistantId, fullText)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[streamMessage]', err)
      setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: `Ошибка: ${msg}`, streaming: false } : m))
    } finally {
      setIsStreaming(false)
      inputRef.current?.focus()
    }
  }, [enqueueTTS])

  // ── End session on leave ────────────────────────────────────────────────────
  const sessionIdRef = useRef<string | null>(null)
  useEffect(() => { sessionIdRef.current = sessionId }, [sessionId])
  useEffect(() => {
    function endSession() {
      const sid = sessionIdRef.current
      if (!sid) return
      const blob = new Blob([JSON.stringify({ sessionId: sid })], { type: 'application/json' })
      navigator.sendBeacon('/api/sessions/end', blob)
    }
    window.addEventListener('beforeunload', endSession)
    return () => window.removeEventListener('beforeunload', endSession)
  }, [])

  // ── Init session ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    async function init() {
      try {
        const res = await fetch('/api/sessions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subjectSlug, memoryContext: memoryContext ?? undefined }),
        })
        const data = await res.json()
        if (!data.success) {
          setInitError(data.code === 'UPGRADE_REQUIRED' ? 'upgrade' : (data.error ?? 'Ошибка'))
          return
        }
        const sid = data.data.id
        setSessionId(sid)
        const openingMessage = pastSessionsSummary
          ? `Привет! В прошлый раз мы изучали: "${pastSessionsSummary}". Продолжим с того места? Уровень студента: "${levelDescription}". Кратко напомни что проходили и продолжи урок.`
          : `Начни первый урок по предмету "${subjectName}". Уровень студента: "${levelDescription}". Представься, поприветствуй студента и дай первое объяснение с примером кода.`
        await streamMessage(sid, openingMessage, false)
      } catch {
        setInitError('Не удалось подключиться. Обнови страницу.')
      }
    }
    init()
  }, [subjectSlug, subjectName, levelDescription, memoryContext, pastSessionsSummary, streamMessage])

  // ── Send ──────────────────────────────────────────────────────────────────
  function handleSend() {
    const text = input.trim()
    if (!text || isStreaming || !sessionId) return
    ensureAudioContext()
    if (micState === 'recording') stopRecording()
    setInput('')
    streamMessage(sessionId, text, true)
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  // ── Mic: Web Speech API (no server, region-free) ───────────────────────────
  function stopRecording() {
    recognitionRef.current?.stop()
  }
  function startRecording() {
    const SR = getSpeechRecognition()
    if (!SR) { setSpeechSupported(false); return }
    ensureAudioContext()
    const recognition = new SR()
    recognition.lang = 'ru-RU'
    recognition.interimResults = true
    recognition.continuous = false
    speechBaseRef.current = input ? input.trim() + ' ' : ''
    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript
      setInput(speechBaseRef.current + transcript)
    }
    recognition.onerror = () => { setMicState('idle') }
    recognition.onend = () => { setMicState('idle'); recognitionRef.current = null; inputRef.current?.focus() }
    recognitionRef.current = recognition
    try { recognition.start(); setMicState('recording') }
    catch { setMicState('idle') }
  }
  function handleMicClick() {
    if (micState === 'recording') stopRecording()
    else startRecording()
  }
  useEffect(() => () => { recognitionRef.current?.abort() }, [])

  // ── Error states ────────────────────────────────────────────────────────────
  if (initError === 'upgrade') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="glass rounded-2xl p-8 max-w-md text-center animate-scale-in">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-white mb-2">Бесплатный урок использован</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">Ты уже прошёл бесплатный урок. Оформи подписку, чтобы продолжить обучение.</p>
          <Link href="/billing" className="inline-block px-6 py-3 bg-accent-600 hover:bg-accent-500 text-white font-semibold rounded-xl transition-all hover:scale-[1.02]">Оформить подписку</Link>
          <Link href="/dashboard" className="block mt-4 text-sm text-slate-500 hover:text-slate-300 transition-colors">← Вернуться на главную</Link>
        </div>
      </div>
    )
  }
  if (initError) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="glass rounded-2xl p-8 max-w-sm text-center animate-scale-in">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-300 text-sm mb-5">{initError}</p>
          <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">← Назад</Link>
        </div>
      </div>
    )
  }

  const initializing = messages.length === 0

  // ── Main layout: subject sidebar · editor · chat ────────────────────────────
  return (
    <div className="h-screen bg-slate-900 text-slate-100 flex overflow-hidden">

      {/* ── Subject sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-white/10 bg-slate-900/80">
        <div className="h-14 flex items-center gap-2.5 px-4 border-b border-white/10">
          <div className="w-7 h-7 bg-gradient-to-br from-accent-500 to-accent-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">MT</span>
          </div>
          <span className="font-semibold text-white text-sm">My Tutor</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <p className="px-2 text-xs uppercase tracking-wide text-slate-500 mb-2">Мои программы</p>
          {subjects.length === 0 ? (
            <p className="px-2 text-xs text-slate-500">Нет предметов</p>
          ) : (
            <ul className="space-y-1">
              {subjects.map((s) => {
                const active = s.slug === subjectSlug
                return (
                  <li key={s.slug}>
                    <div className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                      active ? 'bg-accent-600/15 border border-accent-500/30 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                    }`}>
                      <span className="text-base">{SUBJECT_ICONS[s.slug] ?? '📘'}</span>
                      <span className="truncate">{s.name}</span>
                      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-400" />}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="p-3 border-t border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            <ArrowLeft size={15} /> На дашборд
          </Link>
          <div className="flex items-center gap-2.5 px-2.5 py-2 mt-1">
            <div className="w-7 h-7 rounded-full bg-accent-600/20 border border-accent-500/30 flex items-center justify-center text-xs font-semibold text-accent-200">
              {(displayName ?? 'С').charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-slate-300 truncate">{displayName ?? 'Студент'}</span>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="h-14 glass border-b border-white/10 flex items-center px-4 gap-3 shrink-0">
          <Link href="/dashboard" className="md:hidden flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors">
            <ArrowLeft size={14} />
          </Link>
          <div className="flex items-center gap-2">
            <GraduationCap size={16} className="text-accent-400" />
            <span className="text-white text-sm font-medium">{subjectName}</span>
          </div>

          {/* Voice picker */}
          <div className="ml-auto flex items-center gap-1 bg-slate-800/60 rounded-lg p-0.5 border border-white/10">
            {VOICE_PRESETS.map((v) => (
              <button key={v.id} onClick={() => setSelectedVoiceId(v.id)} title={v.hint}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedVoiceId === v.id ? 'bg-accent-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}>
                {v.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {speakingId && (
              <button onClick={stopAudio} title="Остановить" className="flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors">
                <AudioWaveform /><VolumeX size={12} />
              </button>
            )}
            {isStreaming && (
              <div className="flex items-center gap-2 text-accent-400 text-xs">
                <Loader2 size={12} className="animate-spin" /> Печатает...
              </div>
            )}
          </div>
        </div>

        {/* Split: editor + chat */}
        <div className="flex flex-1 overflow-hidden">

          {/* Monaco editor */}
          <div className="relative hidden lg:block border-r border-white/10" style={{ width: '52%' }}>
            <div className="absolute top-3 right-4 z-10 px-2.5 py-1 bg-slate-800/80 border border-white/10 text-slate-300 text-xs font-mono rounded select-none">
              {langLabel}
            </div>
            <MonacoEditor
              height="100%" language={language} value={code} theme="vs-dark"
              options={{
                readOnly: true, fontSize: 14, lineHeight: 22,
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: 'on',
                padding: { top: 16, bottom: 16 }, renderLineHighlight: 'none',
                hideCursorInOverviewRuler: true, overviewRulerBorder: false, folding: false,
                glyphMargin: false, contextmenu: false, lineNumbers: 'on', automaticLayout: true,
              }}
            />
          </div>

          {/* Chat panel */}
          <div className="flex flex-col bg-slate-900 flex-1 min-w-0">
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
              {initializing && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-accent-600/15 border border-accent-500/30 flex items-center justify-center">
                        <GraduationCap size={22} className="text-accent-400" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent-500 animate-pulse-ring" />
                    </div>
                    <p className="text-slate-400 text-sm">Репетитор готовится к уроку...</p>
                  </div>
                  {/* Skeleton bubbles */}
                  <div className="flex justify-start"><div className="skeleton h-16 w-3/4 rounded-2xl" /></div>
                  <div className="flex justify-start"><div className="skeleton h-10 w-1/2 rounded-2xl" /></div>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col animate-slide-up ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`group max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap transition-all ${
                    msg.role === 'user'
                      ? 'bg-accent-600 text-white rounded-br-md'
                      : 'glass text-slate-100 rounded-bl-md'
                  } ${speakingId === msg.id ? 'ring-1 ring-accent-400/50' : ''}`}>
                    {msg.content || <TypingDots />}

                    {/* Audio player bar */}
                    {msg.role === 'assistant' && !msg.streaming && msg.content && (() => {
                      const isThis = speakingId === msg.id
                      const pct = isThis ? playbackProgress * 100 : 0
                      const elapsed = isThis ? playbackProgress * audioDuration : 0
                      return (
                        <div className={`mt-3 transition-opacity ${isThis ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${
                            isThis ? 'bg-accent-600/20 border border-accent-500/30' : 'bg-slate-800/60 border border-white/10'
                          }`}>
                            <button onClick={() => { ensureAudioContext(); isThis ? stopAudio() : enqueueTTS(msg.id, msg.content) }}
                              className={`flex-shrink-0 transition-colors ${isThis ? 'text-accent-300 hover:text-accent-200' : 'text-slate-400 hover:text-white'}`}>
                              {isThis ? <Pause size={13} fill="currentColor" strokeWidth={0} /> : <Play size={13} fill="currentColor" strokeWidth={0} className="translate-x-px" />}
                            </button>
                            <span className={`text-[11px] tabular-nums flex-shrink-0 w-7 ${isThis ? 'text-accent-300' : 'text-slate-500'}`}>{formatTime(elapsed)}</span>
                            <div className="relative flex-1 h-[3px] bg-slate-600/60 rounded-full">
                              <div className={`absolute inset-y-0 left-0 rounded-full ${isThis ? 'bg-accent-400' : 'bg-slate-600'}`} style={{ width: `${pct}%` }} />
                              {isThis && <div className="absolute top-1/2 w-2.5 h-2.5 bg-white rounded-full shadow" style={{ left: `${pct}%`, transform: 'translate(-50%,-50%)' }} />}
                            </div>
                            <Volume2 size={13} className={`flex-shrink-0 ${isThis ? 'text-accent-300' : 'text-slate-500'}`} />
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                  {/* Timestamp */}
                  {msg.content && !msg.streaming && (
                    <span className="text-[10px] text-slate-600 mt-1 px-1">{formatClock(msg.ts)}</span>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="px-4 py-3 border-t border-white/10 shrink-0">
              {ttsEngine === 'browser' && ttsError && (
                <div className="mb-2">
                  <span className="block text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5">
                    ⚠️ Озвучка через браузер (ElevenLabs недоступен)
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  ref={inputRef} type="text" value={input}
                  onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  disabled={isStreaming || !sessionId}
                  placeholder={micState === 'recording' ? '🎙️ Говори...' : isStreaming ? 'Репетитор печатает...' : 'Напиши свой вопрос...'}
                  className="flex-1 bg-slate-800/60 text-white placeholder-slate-500 px-4 py-2.5 rounded-xl text-sm border border-white/10 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all disabled:opacity-50"
                />

                {speechSupported && (
                  <button
                    onClick={handleMicClick}
                    disabled={isStreaming || !sessionId}
                    title={micState === 'recording' ? 'Остановить запись' : 'Голосовой ввод'}
                    className={`relative w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
                      micState === 'recording'
                        ? 'bg-accent-600 border-accent-500 text-white animate-pulse-ring'
                        : 'bg-slate-800/60 text-slate-400 border-white/10 hover:text-white hover:border-accent-500/50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Mic size={16} />
                  </button>
                )}

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming || !sessionId}
                  className="w-10 h-10 flex items-center justify-center bg-accent-600 hover:bg-accent-500 text-white rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-2 text-center">
                Enter — отправить · Shift+Enter — новая строка{speechSupported ? ' · 🎙️ — голосовой ввод' : ''}
              </p>
            </div>
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
        <span key={delay} className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </span>
  )
}

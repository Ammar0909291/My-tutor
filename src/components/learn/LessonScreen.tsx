'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, Loader2, Mic, Pause, Play, Send, Volume2, VolumeX } from 'lucide-react'
import { cleanTextForTTS } from '@/lib/tts-cleaner'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// ─── Web Speech API typings ───────────────────────────────────────────────────
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
  const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

// ─── Voice presets ────────────────────────────────────────────────────────────
const VOICE_PRESETS = [
  { id: 'ErXwobaYiN019PkySvjV', label: 'Мужской', hint: 'Antoni — уверенный, выразительный' },
  { id: 'EXAVITQu4vr4xnSDxMaL', label: 'Женский', hint: 'Bella — мягкий, приятный' },
  { id: 'TxGEqnHWrfWFTfGW9XjX', label: 'Тёплый',  hint: 'Josh — тёплый, разговорный' },
] as const

const ONBOARDING_VOICE_MAP: Record<string, string> = {
  alexei: 'ErXwobaYiN019PkySvjV',
  maria:  'EXAVITQu4vr4xnSDxMaL',
  dmitry: 'TxGEqnHWrfWFTfGW9XjX',
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
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
function extractLastCodeBlock(text: string): string | null {
  const regex = /```(?:\w*)\n([\s\S]*?)```/g
  let match: RegExpExecArray | null
  let last: string | null = null
  while ((match = regex.exec(text)) !== null) last = match[1].trim()
  return last
}

// ─── Inline markdown renderer ─────────────────────────────────────────────────
function renderInline(text: string, prefix: string, codeClass: string): React.ReactNode {
  const regex = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let idx = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    const raw = match[0]
    if (raw.startsWith('**')) {
      parts.push(<strong key={`${prefix}-b${idx}`} className="font-bold">{raw.slice(2, -2)}</strong>)
    } else if (raw.startsWith('*')) {
      parts.push(<em key={`${prefix}-i${idx}`}>{raw.slice(1, -1)}</em>)
    } else {
      parts.push(<code key={`${prefix}-c${idx}`} className={`px-1.5 py-0.5 rounded text-xs font-mono ${codeClass}`}>{raw.slice(1, -1)}</code>)
    }
    lastIndex = match.index + raw.length
    idx++
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts.length === 0 ? text : parts
}

function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
  // Code blocks go to Monaco — strip them from chat display
  const display = text.replace(/```[\s\S]*?```/g, '').trim()
  const codeClass = isUser ? 'bg-white/20 text-white' : 'bg-black/40 text-accent-300'
  const lines = display.split('\n')
  const accentDot = isUser ? 'text-white/60' : 'text-accent-400'

  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1.5" />
        if (line.match(/^-{3,}$/) || line.match(/^_{3,}$/) || line.match(/^\*{3,}$/)) {
          return <hr key={i} className="border-white/10 my-2" />
        }
        if (line.startsWith('### ')) return <p key={i} className="font-bold mt-2 mb-0.5">{renderInline(line.slice(4), `${i}`, codeClass)}</p>
        if (line.startsWith('## ')) return <p key={i} className="font-bold text-base mt-2 mb-0.5">{renderInline(line.slice(3), `${i}`, codeClass)}</p>
        if (line.startsWith('# ')) return <p key={i} className="font-bold text-lg mt-2 mb-0.5">{renderInline(line.slice(2), `${i}`, codeClass)}</p>
        const bulletMatch = line.match(/^[-•*]\s+(.*)$/)
        if (bulletMatch) return (
          <div key={i} className="flex gap-2 items-start">
            <span className={`mt-0.5 shrink-0 text-xs ${accentDot}`}>•</span>
            <span>{renderInline(bulletMatch[1], `${i}`, codeClass)}</span>
          </div>
        )
        const numMatch = line.match(/^(\d+)\.\s+(.*)$/)
        if (numMatch) return (
          <div key={i} className="flex gap-2 items-start">
            <span className={`tabular-nums text-xs mt-0.5 shrink-0 font-mono ${accentDot}`}>{numMatch[1]}.</span>
            <span>{renderInline(numMatch[2], `${i}`, codeClass)}</span>
          </div>
        )
        return <p key={i}>{renderInline(line, `${i}`, codeClass)}</p>
      })}
    </div>
  )
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

  const ttsQueueRef = useRef<Array<{ id: string; text: string }>>([])
  const isPlayingRef = useRef(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const progressRafRef = useRef<number | null>(null)
  const voiceChoiceRef = useRef(selectedVoiceId)
  useEffect(() => { voiceChoiceRef.current = selectedVoiceId }, [selectedVoiceId])

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const speechBaseRef = useRef('')

  const language = LANG_MAP[subjectSlug] ?? 'plaintext'
  const langLabel = LANG_LABELS[subjectSlug] ?? subjectSlug.toUpperCase()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  useEffect(() => { setSpeechSupported(getSpeechRecognition() !== null) }, [])

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
      const utt = new SpeechSynthesisUtterance(cleanTextForTTS(item.text).slice(0, 500))
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

  const sessionIdRef = useRef<string | null>(null)
  useEffect(() => { sessionIdRef.current = sessionId }, [sessionId])
  useEffect(() => {
    function endSession() {
      const sid = sessionIdRef.current
      if (!sid) return
      navigator.sendBeacon('/api/sessions/end', new Blob([JSON.stringify({ sessionId: sid })], { type: 'application/json' }))
    }
    window.addEventListener('beforeunload', endSession)
    return () => window.removeEventListener('beforeunload', endSession)
  }, [])

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

  function stopRecording() { recognitionRef.current?.stop() }
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

  // ── Error states ──────────────────────────────────────────────────────────────
  if (initError === 'upgrade') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0A0A0F' }}>
        <div className="gradient-border">
          <div className="p-8 max-w-md text-center rounded-[1.25rem]" style={{ background: '#0F0F18' }}>
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-xl font-black text-white mb-2 tracking-tight">Бесплатный урок использован</h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: '#71717A' }}>Оформи подписку, чтобы продолжить обучение.</p>
            <Link href="/billing" className="btn-gradient inline-block px-6 py-3 rounded-xl text-white font-bold text-sm">Оформить подписку</Link>
            <Link href="/dashboard" className="block mt-4 text-sm transition-colors" style={{ color: '#3F3F46' }}>← Вернуться на главную</Link>
          </div>
        </div>
      </div>
    )
  }
  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0A0A0F' }}>
        <div className="gradient-border">
          <div className="p-8 max-w-sm text-center rounded-[1.25rem]" style={{ background: '#0F0F18' }}>
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-red-400 text-sm mb-5">{initError}</p>
            <Link href="/dashboard" className="text-sm transition-colors" style={{ color: '#52525B' }}>← Назад</Link>
          </div>
        </div>
      </div>
    )
  }

  const initializing = messages.length === 0

  return (
    <div className="h-screen flex overflow-hidden text-white" style={{ background: '#0A0A0F' }}>

      {/* ── Subject sidebar ─────────────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-white/[0.06]" style={{ background: '#0A0A0F' }}>
        <div className="h-14 flex items-center gap-2.5 px-4 border-b border-white/[0.06]">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
            <span className="text-white font-black text-xs">MT</span>
          </div>
          <span className="font-bold text-white text-sm">My Tutor</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <p className="px-2 text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: '#3F3F46' }}>Мои программы</p>
          {subjects.length === 0 ? (
            <p className="px-2 text-xs" style={{ color: '#3F3F46' }}>Нет предметов</p>
          ) : (
            <ul className="space-y-0.5">
              {subjects.map((s) => {
                const active = s.slug === subjectSlug
                return (
                  <li key={s.slug}>
                    <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150"
                      style={{
                        background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
                        border: active ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
                        color: active ? '#FAFAFA' : '#52525B',
                      }}>
                      <span className="text-base">{SUBJECT_ICONS[s.slug] ?? '📘'}</span>
                      <span className="truncate">{s.name}</span>
                      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#818CF8' }} />}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="p-3 border-t border-white/[0.06]">
          <Link href="/dashboard" className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
            style={{ color: '#52525B' }}>
            <ArrowLeft size={14} /> На дашборд
          </Link>
          <div className="flex items-center gap-2.5 px-2.5 py-2 mt-1">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
              {(displayName ?? 'С').charAt(0).toUpperCase()}
            </div>
            <span className="text-sm truncate" style={{ color: '#71717A' }}>{displayName ?? 'Студент'}</span>
          </div>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="h-14 flex items-center px-4 gap-3 shrink-0 border-b border-white/[0.06]"
          style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)' }}>
          <Link href="/dashboard" className="md:hidden text-sm transition-colors" style={{ color: '#52525B' }}>
            <ArrowLeft size={14} />
          </Link>
          <div className="flex items-center gap-2">
            <GraduationCap size={15} className="text-accent-400" />
            <span className="text-white text-sm font-medium">{subjectName}</span>
          </div>

          {/* Voice picker */}
          <div className="ml-auto flex items-center gap-0.5 rounded-lg p-0.5 border border-white/[0.07]"
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            {VOICE_PRESETS.map((v) => (
              <button key={v.id} onClick={() => setSelectedVoiceId(v.id)} title={v.hint}
                className="px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150"
                style={{
                  background: selectedVoiceId === v.id ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'transparent',
                  color: selectedVoiceId === v.id ? '#fff' : '#52525B',
                }}>
                {v.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {speakingId && (
              <button onClick={stopAudio} title="Остановить"
                className="flex items-center gap-1.5 text-xs transition-colors text-accent-400 hover:text-accent-300">
                <AudioWaveform /><VolumeX size={12} />
              </button>
            )}
            {isStreaming && !speakingId && (
              <div className="flex items-center gap-1.5 text-xs text-accent-400">
                <Loader2 size={12} className="animate-spin" /> Печатает...
              </div>
            )}
          </div>
        </div>

        {/* Split: editor + chat */}
        <div className="flex flex-1 overflow-hidden">

          {/* Monaco editor */}
          <div className="relative hidden lg:block border-r border-white/[0.06]" style={{ width: '52%', background: '#0D0D14' }}>
            <div className="absolute top-3 right-4 z-10 px-2.5 py-1 rounded-md border border-white/[0.07] text-xs font-mono select-none"
              style={{ background: 'rgba(255,255,255,0.04)', color: '#52525B' }}>
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

          {/* ── Chat panel ──────────────────────────────────────────────────────── */}
          <div className="flex flex-col flex-1 min-w-0" style={{ background: '#0A0A0F' }}>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">

              {initializing && (
                <div className="animate-fade-in">
                  <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
                        <GraduationCap size={22} className="text-accent-400" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent-500 animate-pulse-ring" />
                    </div>
                    <p className="text-sm" style={{ color: '#52525B' }}>Репетитор готовится к уроку...</p>
                  </div>
                  <div className="flex justify-start mb-3"><div className="skeleton h-16 w-3/4 rounded-2xl" /></div>
                  <div className="flex justify-start"><div className="skeleton h-10 w-1/2 rounded-2xl" /></div>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`group flex flex-col animate-slide-up ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed transition-all duration-200 ${
                      msg.role === 'user' ? 'rounded-br-md text-white' : 'rounded-bl-md border-l-2'
                    } ${speakingId === msg.id ? 'ring-1 ring-accent-400/40' : ''}`}
                    style={msg.role === 'user'
                      ? { background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }
                      : { background: '#1A1A2E', borderLeftColor: 'rgba(99,102,241,0.4)', color: '#E4E4F0' }
                    }>

                    {msg.content
                      ? <MessageContent text={msg.content} isUser={msg.role === 'user'} />
                      : <TypingDots />
                    }

                    {/* Audio player — assistant only, after streaming */}
                    {msg.role === 'assistant' && !msg.streaming && msg.content && (() => {
                      const isThis = speakingId === msg.id
                      const pct = isThis ? playbackProgress * 100 : 0
                      const elapsed = isThis ? playbackProgress * audioDuration : 0
                      return (
                        <div className={`mt-3 transition-opacity duration-200 ${isThis ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
                            style={{
                              background: isThis ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                              border: `1px solid ${isThis ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)'}`,
                            }}>
                            <button onClick={() => { ensureAudioContext(); isThis ? stopAudio() : enqueueTTS(msg.id, msg.content) }}
                              className="flex-shrink-0 transition-colors"
                              style={{ color: isThis ? '#818CF8' : '#52525B' }}>
                              {isThis
                                ? <Pause size={13} fill="currentColor" strokeWidth={0} />
                                : <Play size={13} fill="currentColor" strokeWidth={0} className="translate-x-px" />
                              }
                            </button>
                            <span className="text-[11px] tabular-nums flex-shrink-0 w-7"
                              style={{ color: isThis ? '#818CF8' : '#3F3F46' }}>
                              {formatTime(elapsed)}
                            </span>
                            <div className="relative flex-1 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                              <div className="absolute inset-y-0 left-0 rounded-full transition-all"
                                style={{ width: `${pct}%`, background: isThis ? '#818CF8' : 'rgba(255,255,255,0.15)' }} />
                              {isThis && (
                                <div className="absolute top-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-lg"
                                  style={{ left: `${pct}%`, transform: 'translate(-50%,-50%)' }} />
                              )}
                            </div>
                            <Volume2 size={12} className="flex-shrink-0" style={{ color: isThis ? '#818CF8' : '#3F3F46' }} />
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                  {/* Timestamp on hover */}
                  {msg.content && !msg.streaming && (
                    <span className="text-[10px] mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: '#3F3F46' }}>
                      {formatClock(msg.ts)}
                    </span>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="px-4 py-3 border-t border-white/[0.06] shrink-0" style={{ background: '#0A0A0F' }}>
              {ttsEngine === 'browser' && ttsError && (
                <div className="mb-2 px-3 py-1.5 rounded-xl border text-xs text-amber-300"
                  style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.15)' }}>
                  Озвучка через браузер (ElevenLabs недоступен)
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* Input wrapper — rounded pill */}
                <div className="flex-1 flex items-center gap-2 px-4 rounded-full border transition-all duration-200 focus-within:border-accent-500/50"
                  style={{ background: '#0F0F18', borderColor: 'rgba(255,255,255,0.07)', height: '48px' }}>
                  <input
                    ref={inputRef} type="text" value={input}
                    onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                    disabled={isStreaming || !sessionId}
                    placeholder={
                      micState === 'recording' ? 'Говори...' :
                      isStreaming ? 'Репетитор отвечает...' :
                      'Напиши вопрос или нажми Enter...'
                    }
                    className="flex-1 bg-transparent text-white text-sm focus:outline-none disabled:opacity-40"
                    style={{ color: '#FAFAFA' }}
                  />
                  <span className="text-xs" style={{ color: '#3F3F46', fontVariantNumeric: 'tabular-nums' }}>
                    {input.length > 0 && `${input.length}`}
                  </span>
                </div>

                {/* Mic button */}
                {speechSupported && (
                  <button
                    onClick={handleMicClick}
                    disabled={isStreaming || !sessionId}
                    title={micState === 'recording' ? 'Остановить' : 'Голосовой ввод'}
                    className="w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: micState === 'recording' ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : '#0F0F18',
                      borderColor: micState === 'recording' ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.07)',
                      color: micState === 'recording' ? '#fff' : '#52525B',
                      boxShadow: micState === 'recording' ? '0 0 20px rgba(99,102,241,0.4)' : 'none',
                    }}>
                    <Mic size={16} />
                  </button>
                )}

                {/* Send button */}
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming || !sessionId}
                  className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', boxShadow: input.trim() ? '0 0 20px rgba(99,102,241,0.4)' : 'none' }}>
                  <Send size={15} className="translate-x-px" />
                </button>
              </div>

              <p className="text-xs text-center mt-2" style={{ color: '#3F3F46' }}>
                Enter — отправить{speechSupported ? ' · Микрофон — голосовой ввод' : ''}
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
    <div className="flex items-center gap-1.5 py-1 px-0.5">
      {[0, 180, 360].map((delay) => (
        <span key={delay}
          className="w-2 h-2 rounded-full"
          style={{
            background: 'rgba(99,102,241,0.6)',
            animation: `bounce 1.2s ease-in-out ${delay}ms infinite`,
          }}
        />
      ))}
    </div>
  )
}

'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, Loader2, Mic, Play, Send, Square } from 'lucide-react'
import { cleanTextForTTS } from '@/lib/tts-cleaner'
import { speakText, stopSpeaking, type VoiceType } from '@/lib/tts'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// ─── Web Speech API typings ───────────────────────────────────────────────────
interface SpeechRecognitionLike {
  lang: string; interimResults: boolean; continuous: boolean
  start: () => void; stop: () => void; abort: () => void
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

// ─── Voice config ─────────────────────────────────────────────────────────────
const VOICE_PRESETS: { type: VoiceType; label: string; hint: string }[] = [
  { type: 'male',   label: 'Мужской', hint: 'Низкий, уверенный' },
  { type: 'female', label: 'Женский', hint: 'Высокий, мягкий' },
  { type: 'warm',   label: 'Тёплый',  hint: 'Нейтральный, разговорный' },
]

const VOICE_MAP: Record<string, VoiceType> = {
  male: 'male', female: 'female', warm: 'warm',
  // Legacy onboarding keys
  alexei: 'male', maria: 'female', dmitry: 'warm',
}
function resolveVoice(choice: string): VoiceType {
  return VOICE_MAP[choice] ?? 'male'
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
function formatClock(ts: number): string {
  return new Date(ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}
function extractLastCodeBlock(text: string): string | null {
  const regex = /```(?:\w*)\n([\s\S]*?)```/g
  let match: RegExpExecArray | null; let last: string | null = null
  while ((match = regex.exec(text)) !== null) last = match[1].trim()
  return last
}

// ─── Inline markdown renderer ─────────────────────────────────────────────────
function renderInline(text: string, prefix: string, codeClass: string): React.ReactNode {
  const regex = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0; let match: RegExpExecArray | null; let idx = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    const raw = match[0]
    if (raw.startsWith('**')) parts.push(<strong key={`${prefix}-b${idx}`} className="font-bold">{raw.slice(2, -2)}</strong>)
    else if (raw.startsWith('*')) parts.push(<em key={`${prefix}-i${idx}`}>{raw.slice(1, -1)}</em>)
    else parts.push(<code key={`${prefix}-c${idx}`} className={`px-1.5 py-0.5 rounded text-xs font-mono ${codeClass}`}>{raw.slice(1, -1)}</code>)
    lastIndex = match.index + raw.length; idx++
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts.length === 0 ? text : parts
}

function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
  const display = text.replace(/```[\s\S]*?```/g, '').trim()
  const codeClass = isUser ? 'bg-white/20 text-white' : 'bg-black/40 text-accent-300'
  const accentDot = isUser ? 'text-white/60' : 'text-accent-400'
  return (
    <div className="space-y-0.5">
      {display.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1.5" />
        if (line.match(/^[-_*]{3,}$/)) return <hr key={i} className="border-white/10 my-2" />
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
  subjectSlug: string; subjectName: string; levelDescription: string; voiceChoice: string
  memoryContext?: string | null; pastSessionsSummary?: string | null
  subjects?: { slug: string; name: string }[]; displayName?: string
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
  const [micState, setMicState] = useState<MicState>('idle')
  const [speechInputSupported, setSpeechInputSupported] = useState(false)
  const [voiceType, setVoiceType] = useState<VoiceType>(() => resolveVoice(voiceChoice))

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initializedRef = useRef(false)
  const voiceTypeRef = useRef<VoiceType>(voiceType)
  const speakingIdRef = useRef<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const speechBaseRef = useRef('')

  useEffect(() => { voiceTypeRef.current = voiceType }, [voiceType])

  const language = LANG_MAP[subjectSlug] ?? 'plaintext'
  const langLabel = LANG_LABELS[subjectSlug] ?? subjectSlug.toUpperCase()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  useEffect(() => { scrollToBottom() }, [messages, scrollToBottom])

  useEffect(() => { setSpeechInputSupported(getSpeechRecognition() !== null) }, [])

  // ── TTS ────────────────────────────────────────────────────────────────────
  const handleStopSpeech = useCallback(() => {
    stopSpeaking()
    speakingIdRef.current = null
    setSpeakingId(null)
  }, [])

  const handleSpeak = useCallback((id: string, text: string) => {
    const clean = cleanTextForTTS(text)
    if (!clean) return
    speakingIdRef.current = id
    setSpeakingId(id)
    speakText(clean, voiceTypeRef.current, undefined, () => {
      if (speakingIdRef.current === id) {
        speakingIdRef.current = null
        setSpeakingId(null)
      }
    })
  }, [])

  // ── Stream a message ────────────────────────────────────────────────────────
  const streamMessage = useCallback(async (sid: string, text: string, showInUI = true) => {
    setIsStreaming(true)
    if (showInUI) setMessages((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', content: text, ts: Date.now() }])
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
      let fullText = ''; let buf = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        const lines = buf.split('\n'); buf = lines.pop() ?? ''
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
      handleSpeak(assistantId, fullText)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[streamMessage]', err)
      setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: `Ошибка: ${msg}`, streaming: false } : m))
    } finally {
      setIsStreaming(false)
      inputRef.current?.focus()
    }
  }, [handleSpeak])

  // ── Session lifecycle ───────────────────────────────────────────────────────
  const sessionIdRef = useRef<string | null>(null)
  useEffect(() => { sessionIdRef.current = sessionId }, [sessionId])
  useEffect(() => {
    function endSession() {
      const sid = sessionIdRef.current; if (!sid) return
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
        if (!data.success) { setInitError(data.code === 'UPGRADE_REQUIRED' ? 'upgrade' : (data.error ?? 'Ошибка')); return }
        const sid = data.data.id; setSessionId(sid)
        const openingMessage = pastSessionsSummary
          ? `Привет! В прошлый раз мы изучали: "${pastSessionsSummary}". Продолжим с того места? Уровень студента: "${levelDescription}". Кратко напомни что проходили и продолжи урок.`
          : `Начни первый урок по предмету "${subjectName}". Уровень студента: "${levelDescription}". Представься, поприветствуй студента и дай первое объяснение с примером кода.`
        await streamMessage(sid, openingMessage, false)
      } catch { setInitError('Не удалось подключиться. Обнови страницу.') }
    }
    init()
  }, [subjectSlug, subjectName, levelDescription, memoryContext, pastSessionsSummary, streamMessage])

  // ── Send ────────────────────────────────────────────────────────────────────
  function handleSend() {
    const text = input.trim()
    if (!text || isStreaming || !sessionId) return
    if (micState === 'recording') stopRecording()
    setInput('')
    streamMessage(sessionId, text, true)
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  // ── Mic ─────────────────────────────────────────────────────────────────────
  function stopRecording() { recognitionRef.current?.stop() }
  function startRecording() {
    const SR = getSpeechRecognition(); if (!SR) { setSpeechInputSupported(false); return }
    const recognition = new SR()
    recognition.lang = 'ru-RU'; recognition.interimResults = true; recognition.continuous = false
    speechBaseRef.current = input ? input.trim() + ' ' : ''
    recognition.onresult = (event) => {
      let t = ''; for (let i = 0; i < event.results.length; i++) t += event.results[i][0].transcript
      setInput(speechBaseRef.current + t)
    }
    recognition.onerror = () => setMicState('idle')
    recognition.onend = () => { setMicState('idle'); recognitionRef.current = null; inputRef.current?.focus() }
    recognitionRef.current = recognition
    try { recognition.start(); setMicState('recording') } catch { setMicState('idle') }
  }
  function handleMicClick() { if (micState === 'recording') stopRecording(); else startRecording() }
  useEffect(() => () => { recognitionRef.current?.abort() }, [])

  // ── Error states ────────────────────────────────────────────────────────────
  if (initError === 'upgrade') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0A0A0F' }}>
        <div className="gradient-border">
          <div className="p-8 max-w-md text-center rounded-[1.25rem]" style={{ background: '#0F0F18' }}>
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-xl font-black text-white mb-2">Бесплатный урок использован</h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: '#71717A' }}>Оформи подписку, чтобы продолжить обучение.</p>
            <Link href="/billing" className="btn-gradient inline-block px-6 py-3 rounded-xl text-white font-bold text-sm">Оформить подписку</Link>
            <Link href="/dashboard" className="block mt-4 text-sm" style={{ color: '#3F3F46' }}>← Вернуться на главную</Link>
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
            <Link href="/dashboard" className="text-sm" style={{ color: '#52525B' }}>← Назад</Link>
          </div>
        </div>
      </div>
    )
  }

  const initializing = messages.length === 0

  return (
    <div className="h-screen flex overflow-hidden text-white" style={{ background: '#0A0A0F' }}>

      {/* ── Subject sidebar ── */}
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
          <Link href="/dashboard" className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm transition-colors hover:bg-white/5" style={{ color: '#52525B' }}>
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

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="h-14 flex items-center px-4 gap-3 shrink-0 border-b border-white/[0.06]"
          style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)' }}>
          <Link href="/dashboard" className="md:hidden" style={{ color: '#52525B' }}>
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
              <button key={v.type} onClick={() => setVoiceType(v.type)} title={v.hint}
                className="px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150"
                style={{
                  background: voiceType === v.type ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'transparent',
                  color: voiceType === v.type ? '#fff' : '#52525B',
                }}>
                {v.label}
              </button>
            ))}
          </div>

          {/* Speaking indicator */}
          {speakingId && (
            <button onClick={handleStopSpeech}
              className="flex items-center gap-1.5 text-xs transition-colors text-accent-400 hover:text-accent-300">
              <AudioWaveform /> <Square size={10} fill="currentColor" strokeWidth={0} />
            </button>
          )}
          {isStreaming && !speakingId && (
            <div className="flex items-center gap-1.5 text-xs text-accent-400">
              <Loader2 size={12} className="animate-spin" /> Печатает...
            </div>
          )}
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
                hideCursorInOverviewRuler: true, overviewRulerBorder: false,
                folding: false, glyphMargin: false, contextmenu: false,
                lineNumbers: 'on', automaticLayout: true,
              }}
            />
          </div>

          {/* ── Chat panel ── */}
          <div className="flex flex-col flex-1 min-w-0" style={{ background: '#0A0A0F' }}>

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
                    className={`max-w-[88%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' ? 'rounded-br-md text-white' : 'rounded-bl-md border-l-2'
                    } ${speakingId === msg.id ? 'ring-1 ring-accent-400/40' : ''}`}
                    style={msg.role === 'user'
                      ? { background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }
                      : { background: '#1A1A2E', borderLeftColor: 'rgba(99,102,241,0.4)', color: '#E4E4F0' }
                    }>
                    {msg.content ? <MessageContent text={msg.content} isUser={msg.role === 'user'} /> : <TypingDots />}

                    {/* Speak / stop button */}
                    {msg.role === 'assistant' && !msg.streaming && msg.content && (() => {
                      const isThis = speakingId === msg.id
                      return (
                        <div className={`mt-3 transition-opacity duration-200 ${isThis ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          <button
                            onClick={() => isThis ? handleStopSpeech() : handleSpeak(msg.id, msg.content)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                            style={{
                              background: isThis ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.05)',
                              border: `1px solid ${isThis ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.07)'}`,
                              color: isThis ? '#818CF8' : '#52525B',
                            }}>
                            {isThis
                              ? <><AudioWaveform className="text-accent-400" /><span>Говорит...</span><Square size={10} fill="currentColor" strokeWidth={0} /></>
                              : <><Play size={11} fill="currentColor" strokeWidth={0} className="translate-x-px" /><span>Слушать</span></>
                            }
                          </button>
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
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-4 rounded-full border transition-all duration-200 focus-within:border-accent-500/50"
                  style={{ background: '#0F0F18', borderColor: 'rgba(255,255,255,0.07)', height: '48px' }}>
                  <input
                    ref={inputRef} type="text" value={input}
                    onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                    disabled={isStreaming || !sessionId}
                    placeholder={micState === 'recording' ? 'Говори...' : isStreaming ? 'Репетитор отвечает...' : 'Напиши вопрос...'}
                    className="flex-1 bg-transparent text-white text-sm focus:outline-none disabled:opacity-40"
                  />
                </div>

                {speechInputSupported && (
                  <button onClick={handleMicClick} disabled={isStreaming || !sessionId}
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

                <button onClick={handleSend} disabled={!input.trim() || isStreaming || !sessionId}
                  className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', boxShadow: input.trim() ? '0 0 20px rgba(99,102,241,0.4)' : 'none' }}>
                  <Send size={15} className="translate-x-px" />
                </button>
              </div>
              <p className="text-xs text-center mt-2" style={{ color: '#3F3F46' }}>
                Enter — отправить{speechInputSupported ? ' · Микрофон — голосовой ввод' : ''}
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
        <span key={delay} className="w-2 h-2 rounded-full"
          style={{ background: 'rgba(99,102,241,0.6)', animation: `bounce 1.2s ease-in-out ${delay}ms infinite` }} />
      ))}
    </div>
  )
}

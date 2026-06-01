'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, Check, ChevronDown, Copy, GraduationCap, Loader2, Mic, Play, Send, Square, Volume2 } from 'lucide-react'
import { cleanTextForTTS } from '@/lib/tts-cleaner'
import { speakText, stopSpeaking, type VoiceType } from '@/lib/tts'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// ─── Web Speech API typings (mic input) ───────────────────────────────────────
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
const VOICE_PRESETS: { type: VoiceType; label: string }[] = [
  { type: 'male',   label: 'Мужской' },
  { type: 'female', label: 'Женский' },
  { type: 'warm',   label: 'Тёплый' },
]
const VOICE_MAP: Record<string, VoiceType> = {
  male: 'male', female: 'female', warm: 'warm',
  alexei: 'male', maria: 'female', dmitry: 'warm',
}
function resolveVoice(choice: string): VoiceType {
  return VOICE_MAP[choice] ?? 'male'
}

// ─── Subject metadata ─────────────────────────────────────────────────────────
const LANG_MAP: Record<string, string> = { c: 'c', cpp: 'cpp', python: 'python', english: 'markdown' }
const LANG_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  c:       { label: 'C',       color: '#60A5FA', bg: 'rgba(59,130,246,0.15)' },
  cpp:     { label: 'C++',     color: '#22D3EE', bg: 'rgba(34,211,238,0.15)' },
  python:  { label: 'Python',  color: '#FBBF24', bg: 'rgba(251,191,36,0.15)' },
  english: { label: 'English', color: '#A78BFA', bg: 'rgba(167,139,250,0.15)' },
}
const FILENAME: Record<string, string> = { c: 'урок.c', cpp: 'урок.cpp', python: 'урок.py', english: 'урок.md' }
const SUBJECT_ICONS: Record<string, string> = { c: '⚙️', cpp: '🔷', python: '🐍', english: '🇬🇧' }
const INITIAL_CODE: Record<string, string> = {
  c: '// Здесь появится код от репетитора\n',
  cpp: '// Здесь появится код от репетитора\n',
  python: '# Здесь появится код от репетитора\n',
  english: '<!-- Заметки репетитора -->\n',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatClock(ts: number): string {
  return new Date(ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}
function extractLastCodeBlock(text: string): string | null {
  const regex = /```(?:\w*)\n([\s\S]*?)```/g
  let match: RegExpExecArray | null; let last: string | null = null
  while ((match = regex.exec(text)) !== null) last = match[1].trim()
  return last
}
function stripCodeBlocks(text: string): string {
  return text.replace(/```[\s\S]*?```/g, '').trim()
}

// First N sentences, where a sentence ends with ., !, ? followed by whitespace/end.
function truncateToSentences(text: string, n: number): { preview: string; hasMore: boolean } {
  const matches: number[] = []
  const re = /[.!?…]+[\s)]?/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) matches.push(m.index + m[0].length)
  if (matches.length <= n) return { preview: text, hasMore: false }
  const cut = matches[n - 1]
  return { preview: text.slice(0, cut).trim(), hasMore: true }
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
    else parts.push(<code key={`${prefix}-c${idx}`} className={`px-1.5 py-0.5 rounded text-[0.85em] font-mono ${codeClass}`}>{raw.slice(1, -1)}</code>)
    lastIndex = match.index + raw.length; idx++
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts.length === 0 ? text : parts
}

function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
  const codeClass = isUser ? 'bg-white/20 text-white' : 'bg-black/40 text-purple-300'
  const accentDot = isUser ? 'text-white/70' : 'text-purple-400'
  return (
    <div className="space-y-1">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        if (line.match(/^[-_*]{3,}$/)) return <hr key={i} className="border-white/10 my-1.5" />
        if (line.startsWith('### ')) return <p key={i} className="font-bold mt-1.5">{renderInline(line.slice(4), `${i}`, codeClass)}</p>
        if (line.startsWith('## ')) return <p key={i} className="font-bold text-[15px] mt-1.5">{renderInline(line.slice(3), `${i}`, codeClass)}</p>
        if (line.startsWith('# ')) return <p key={i} className="font-bold text-base mt-1.5">{renderInline(line.slice(2), `${i}`, codeClass)}</p>
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initializedRef = useRef(false)
  const voiceTypeRef = useRef<VoiceType>(voiceType)
  const speakingIdRef = useRef<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const speechBaseRef = useRef('')

  useEffect(() => { voiceTypeRef.current = voiceType }, [voiceType])

  const language = LANG_MAP[subjectSlug] ?? 'plaintext'
  const langBadge = LANG_BADGE[subjectSlug] ?? { label: subjectSlug.toUpperCase(), color: '#A78BFA', bg: 'rgba(167,139,250,0.15)' }
  const filename = FILENAME[subjectSlug] ?? 'урок.txt'

  // Smooth scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

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
    speakText(
      clean,
      voiceTypeRef.current,
      undefined,
      () => {
        if (speakingIdRef.current === id) {
          speakingIdRef.current = null
          setSpeakingId(null)
        }
      },
    )
  }, [])

  // When voice changes mid-playback, restart with the new voice
  const handleVoiceChange = useCallback((newVoice: VoiceType) => {
    setVoiceType(newVoice)
    if (speakingIdRef.current) {
      const id = speakingIdRef.current
      const msg = messages.find((m) => m.id === id)
      stopSpeaking()
      if (msg) {
        // small delay so the previous cancel is processed
        setTimeout(() => {
          voiceTypeRef.current = newVoice
          handleSpeak(id, msg.content)
        }, 50)
      }
    }
  }, [messages, handleSpeak])

  // ── Copy code ──────────────────────────────────────────────────────────────
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(() => { /* ignore */ })
  }, [code])

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
        const opening = pastSessionsSummary
          ? `Привет! В прошлый раз мы изучали: "${pastSessionsSummary}". Продолжим? Уровень студента: "${levelDescription}". Кратко напомни что проходили и продолжи урок. Отвечай коротко — 3-4 предложения.`
          : `Начни первый урок по предмету "${subjectName}". Уровень студента: "${levelDescription}". Представься как "Репетитор Макс", поприветствуй студента и дай первое объяснение с примером кода. Отвечай коротко — 3-4 предложения.`
        await streamMessage(sid, opening, false)
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

  // ── Memoize the long-message preview cutoff per message ────────────────────
  const previewCache = useMemo(() => {
    const cache: Record<string, { preview: string; full: string; hasMore: boolean }> = {}
    for (const m of messages) {
      if (m.role !== 'assistant' || m.streaming) continue
      const full = stripCodeBlocks(m.content)
      if (full.length < 280) { cache[m.id] = { preview: full, full, hasMore: false }; continue }
      const { preview, hasMore } = truncateToSentences(full, 3)
      cache[m.id] = { preview, full, hasMore }
    }
    return cache
  }, [messages])

  // ── Error states ────────────────────────────────────────────────────────────
  if (initError === 'upgrade') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0F0F1A' }}>
        <div className="p-8 max-w-md text-center rounded-2xl border border-white/10" style={{ background: '#181828' }}>
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-black text-white mb-2">Бесплатный урок использован</h2>
          <p className="text-sm mb-6 leading-relaxed text-zinc-400">Оформи подписку, чтобы продолжить обучение.</p>
          <Link href="/billing" className="inline-block px-6 py-3 rounded-xl text-white font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}>Оформить подписку</Link>
          <Link href="/dashboard" className="block mt-4 text-sm text-zinc-500">← Назад</Link>
        </div>
      </div>
    )
  }
  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0F0F1A' }}>
        <div className="p-8 max-w-sm text-center rounded-2xl border border-white/10" style={{ background: '#181828' }}>
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-red-400 text-sm mb-5">{initError}</p>
          <Link href="/dashboard" className="text-sm text-zinc-500">← Назад</Link>
        </div>
      </div>
    )
  }

  const initializing = messages.length === 0

  return (
    <div className="h-screen flex overflow-hidden text-white" style={{ background: '#0F0F1A' }}>

      {/* ── Subject sidebar ── */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-white/[0.06]" style={{ background: '#0F0F1A' }}>
        <div className="h-14 flex items-center gap-2.5 px-4 border-b border-white/[0.06]">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}>
            <span className="text-white font-black text-xs">MT</span>
          </div>
          <span className="font-bold text-white text-sm">My Tutor</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <p className="px-2 text-[10px] uppercase tracking-wider mb-2 font-bold text-zinc-600">Мои программы</p>
          <ul className="space-y-0.5">
            {subjects.map((s) => {
              const active = s.slug === subjectSlug
              return (
                <li key={s.slug}>
                  <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm transition-all"
                    style={{
                      background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
                      border: active ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
                      color: active ? '#FFF' : '#52525B',
                    }}>
                    <span className="text-base">{SUBJECT_ICONS[s.slug] ?? '📘'}</span>
                    <span className="truncate">{s.name}</span>
                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="p-3 border-t border-white/[0.06]">
          <Link href="/dashboard" className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-sm transition-colors hover:bg-white/5 text-zinc-500">
            <ArrowLeft size={14} /> На дашборд
          </Link>
          <div className="flex items-center gap-2.5 px-2.5 py-2 mt-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}>
              {(displayName ?? 'С').charAt(0).toUpperCase()}
            </div>
            <span className="text-sm truncate text-zinc-300">{displayName ?? 'Студент'}</span>
          </div>
        </div>
      </aside>

      {/* ── Main split: editor (55%) + chat (45%) ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Code editor ──────────────────────────────────────────── */}
        <div className="hidden lg:flex flex-col border-r border-white/[0.06]" style={{ width: '55%', background: '#0D0D17' }}>

          {/* Editor header */}
          <div className="h-14 flex items-center gap-3 px-4 border-b border-white/[0.06] shrink-0" style={{ background: '#0F0F1A' }}>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide"
              style={{ background: langBadge.bg, color: langBadge.color }}>
              {langBadge.label}
            </span>
            <span className="text-sm font-mono text-zinc-300">{filename}</span>
            <button onClick={handleCopy}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105 active:scale-95"
              style={{
                background: copied
                  ? 'linear-gradient(135deg, #10B981, #059669)'
                  : 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                color: '#FFF',
                boxShadow: copied
                  ? '0 0 20px rgba(16,185,129,0.35)'
                  : '0 0 20px rgba(124,58,237,0.25)',
              }}>
              {copied ? <><Check size={13} /> Скопировано!</> : <><Copy size={13} /> Копировать</>}
            </button>
          </div>

          {/* Monaco — fixed height via flex-1 + overflow */}
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%" language={language} value={code} theme="vs-dark"
              options={{
                readOnly: true, fontSize: 15, lineHeight: 1.6,
                fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
                minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: 'on',
                padding: { top: 16, bottom: 16 }, renderLineHighlight: 'none',
                hideCursorInOverviewRuler: true, overviewRulerBorder: false,
                folding: false, glyphMargin: false, contextmenu: false,
                lineNumbers: 'on', automaticLayout: true,
              }}
            />
          </div>

          {/* Editor footer hint */}
          <div className="px-4 py-2.5 border-t border-white/[0.06] text-xs text-center text-zinc-500 shrink-0" style={{ background: '#0F0F1A' }}>
            Нажми кнопку выше чтобы скопировать код
          </div>
        </div>

        {/* ── Right: Chat panel ──────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 min-w-0" style={{ background: '#0F0F1A' }}>

          {/* Chat header — tutor identity + voice */}
          <div className="flex items-center gap-3 px-4 h-14 border-b border-white/[0.06] shrink-0" style={{ background: '#13131F' }}>
            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-white text-xs shadow-lg"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 4px 12px rgba(124,58,237,0.35)' }}>
                МТ
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                style={{ background: '#10B981', borderColor: '#13131F' }} />
            </div>

            {/* Name + status */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">Репетитор Макс</div>
              <div className="flex items-center gap-1.5 text-[11px]">
                {speakingId ? (
                  <span className="inline-flex items-center gap-1 text-purple-400">
                    <Volume2 size={10} /> говорит...
                  </span>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-zinc-500">онлайн · {subjectName}</span>
                  </>
                )}
              </div>
            </div>

            {/* Voice picker */}
            <div className="flex items-center gap-0.5 rounded-full p-0.5 border border-white/[0.07]"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              {VOICE_PRESETS.map((v) => (
                <button key={v.type} onClick={() => handleVoiceChange(v.type)}
                  className="px-3 py-1 rounded-full text-[11px] font-semibold transition-all"
                  style={{
                    background: voiceType === v.type ? 'linear-gradient(135deg, #7C3AED, #3B82F6)' : 'transparent',
                    color: voiceType === v.type ? '#fff' : '#71717A',
                  }}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scroll-smooth">

            {initializing && (
              <div className="animate-fade-in">
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>
                      <GraduationCap size={22} className="text-purple-400" />
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500">Репетитор готовится к уроку...</p>
                </div>
              </div>
            )}

            {messages.map((msg) => {
              const isUser = msg.role === 'user'
              const isSpeaking = speakingId === msg.id
              const cached = previewCache[msg.id]
              const isExpanded = expanded[msg.id] ?? false
              const displayText = cached
                ? (cached.hasMore && !isExpanded ? cached.preview : cached.full)
                : stripCodeBlocks(msg.content)

              return (
                <div key={msg.id} className={`group flex flex-col animate-slide-up ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Avatar + name (assistant only) */}
                  {!isUser && !msg.streaming && (
                    <div className="flex items-center gap-2 mb-1 ml-1">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                        style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}>МТ</div>
                      <span className="text-xs font-semibold text-zinc-500">Репетитор Макс</span>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed transition-all ${
                      isUser ? 'rounded-br-sm text-white shadow-lg' : 'rounded-bl-sm'
                    } ${isSpeaking ? 'ring-2 ring-purple-500/40' : ''}`}
                    style={isUser
                      ? { background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 4px 16px rgba(124,58,237,0.25)' }
                      : { background: '#1E1E2E', border: '1px solid rgba(255,255,255,0.05)', color: '#E4E4F0' }
                    }>

                    {msg.content
                      ? <MessageContent text={displayText} isUser={isUser} />
                      : <TypingDots />
                    }

                    {/* Read more */}
                    {!isUser && cached?.hasMore && (
                      <button onClick={() => setExpanded((prev) => ({ ...prev, [msg.id]: !isExpanded }))}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                        {isExpanded ? <>Свернуть</> : <>Читать далее</>}
                        <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}

                    {/* Speak / stop button (assistant, after streaming) */}
                    {!isUser && !msg.streaming && msg.content && (() => {
                      return (
                        <div className={`mt-3 transition-opacity ${isSpeaking ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          <button
                            onClick={() => isSpeaking ? handleStopSpeech() : handleSpeak(msg.id, msg.content)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                            style={{
                              background: isSpeaking ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)',
                              border: `1px solid ${isSpeaking ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`,
                              color: isSpeaking ? '#C4B5FD' : '#71717A',
                            }}>
                            {isSpeaking
                              ? <><Square size={10} fill="currentColor" strokeWidth={0} /> Остановить</>
                              : <><Play size={11} fill="currentColor" strokeWidth={0} className="translate-x-px" /> Слушать</>
                            }
                          </button>
                        </div>
                      )
                    })()}
                  </div>

                  {/* Timestamp on hover */}
                  {msg.content && !msg.streaming && (
                    <span className="text-[10px] mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-700">
                      {formatClock(msg.ts)}
                    </span>
                  )}
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="px-4 py-3.5 border-t border-white/[0.06] shrink-0" style={{ background: '#13131F' }}>
            <div className="flex items-center gap-2">
              {/* Input pill */}
              <div className="flex-1 flex items-center px-5 rounded-full border transition-all focus-within:border-purple-500/50"
                style={{ background: '#1E1E2E', borderColor: 'rgba(255,255,255,0.08)', height: '48px' }}>
                <input
                  ref={inputRef} type="text" value={input}
                  onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                  disabled={isStreaming || !sessionId}
                  placeholder={
                    micState === 'recording' ? 'Говори...' :
                    isStreaming ? 'Репетитор отвечает...' :
                    'Напиши вопрос или нажми микрофон...'
                  }
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none disabled:opacity-40 placeholder-zinc-600"
                />
                {isStreaming && <Loader2 size={14} className="text-purple-400 animate-spin shrink-0" />}
              </div>

              {/* Mic */}
              {speechInputSupported && (
                <button onClick={handleMicClick} disabled={isStreaming || !sessionId}
                  title={micState === 'recording' ? 'Остановить' : 'Голосовой ввод'}
                  className="relative w-12 h-12 flex items-center justify-center rounded-full border transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: micState === 'recording' ? 'linear-gradient(135deg, #EC4899, #7C3AED)' : '#1E1E2E',
                    borderColor: micState === 'recording' ? 'rgba(236,72,153,0.5)' : 'rgba(255,255,255,0.08)',
                    color: micState === 'recording' ? '#fff' : '#71717A',
                    boxShadow: micState === 'recording' ? '0 0 24px rgba(236,72,153,0.4)' : 'none',
                  }}>
                  {micState === 'recording' && (
                    <span className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(236,72,153,0.4)' }} />
                  )}
                  <Mic size={17} className="relative z-10" />
                </button>
              )}

              {/* Send */}
              <button onClick={handleSend} disabled={!input.trim() || isStreaming || !sessionId}
                className="w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                  boxShadow: input.trim() ? '0 0 24px rgba(124,58,237,0.5)' : 'none',
                }}>
                <Send size={16} className="translate-x-px text-white" />
              </button>
            </div>
            <p className="text-[11px] text-center mt-2 text-zinc-600">
              Enter — отправить{speechInputSupported ? ' · Микрофон — голосовой ввод' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TypingDots() {
  const colors = ['#7C3AED', '#3B82F6', '#EC4899']
  return (
    <div className="flex items-center gap-1.5 py-2 px-1">
      {colors.map((color, i) => (
        <span key={color}
          className="w-2 h-2 rounded-full"
          style={{
            background: color,
            animation: `bounce 1.2s ease-in-out ${i * 180}ms infinite`,
          }}
        />
      ))}
    </div>
  )
}

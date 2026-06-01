'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Check, ChevronDown, Copy, Hexagon, Loader2, Mic, Play, Send, Square, User } from 'lucide-react'
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
const VOICE_PRESETS: { type: VoiceType; code: string; label: string }[] = [
  { type: 'male',   code: 'М-01', label: 'Мужской' },
  { type: 'female', code: 'Ж-01', label: 'Женский' },
  { type: 'warm',   code: 'Т-01', label: 'Тёплый' },
]
const VOICE_MAP: Record<string, VoiceType> = {
  male: 'male', female: 'female', warm: 'warm',
  alexei: 'male', maria: 'female', dmitry: 'warm',
}
function resolveVoice(choice: string): VoiceType { return VOICE_MAP[choice] ?? 'male' }

// ─── Subject metadata ─────────────────────────────────────────────────────────
const LANG_MAP: Record<string, string> = { c: 'c', cpp: 'cpp', python: 'python', english: 'markdown' }
const LANG_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  c:       { label: 'C',       color: '#FF6B35', bg: 'rgba(255,107,53,0.15)' },
  cpp:     { label: 'C++',     color: '#7B2FFF', bg: 'rgba(123,47,255,0.18)' },
  python:  { label: 'PYTHON',  color: '#00D4FF', bg: 'rgba(0,212,255,0.15)'  },
  english: { label: 'ENGLISH', color: '#00FF88', bg: 'rgba(0,255,136,0.12)'  },
}
const FILENAME: Record<string, string> = { c: 'урок.c', cpp: 'урок.cpp', python: 'урок.py', english: 'урок.md' }
const INITIAL_CODE: Record<string, string> = {
  c: '// > СИСТЕМА ГОТОВА. Ожидание инструкций от репетитора...\n',
  cpp: '// > СИСТЕМА ГОТОВА. Ожидание инструкций от репетитора...\n',
  python: '# > СИСТЕМА ГОТОВА. Ожидание инструкций от репетитора...\n',
  english: '<!-- > СИСТЕМА ГОТОВА. Ожидание заметок от репетитора... -->\n',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTimer(secs: number): string {
  const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}
function extractLastCodeBlock(text: string): string | null {
  let last: string | null = null
  const tripleRe = /```(?:\w*)\n([\s\S]*?)```/g
  let m: RegExpExecArray | null
  while ((m = tripleRe.exec(text)) !== null) last = m[1].trim()
  const tagRe = /\[CODE\]([\s\S]*?)\[\/CODE\]/gi
  while ((m = tagRe.exec(text)) !== null) last = m[1].trim()
  return last
}
function stripCodeBlocks(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[CODE\][\s\S]*?\[\/CODE\]/gi, '')
    .trim()
}
function truncateToSentences(text: string, n: number): { preview: string; hasMore: boolean } {
  const matches: number[] = []
  const re = /[.!?…]+[\s)]?/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) matches.push(m.index + m[0].length)
  if (matches.length <= n) return { preview: text, hasMore: false }
  return { preview: text.slice(0, matches[n - 1]).trim(), hasMore: true }
}

// ─── Inline markdown → React ──────────────────────────────────────────────────
function renderInline(text: string, prefix: string, codeClass: string): React.ReactNode {
  const regex = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0; let match: RegExpExecArray | null; let idx = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    const raw = match[0]
    if (raw.startsWith('**')) parts.push(<strong key={`${prefix}-b${idx}`} className="font-bold text-cyan-300">{raw.slice(2, -2)}</strong>)
    else if (raw.startsWith('*')) parts.push(<em key={`${prefix}-i${idx}`} className="text-cyan-200">{raw.slice(1, -1)}</em>)
    else parts.push(<code key={`${prefix}-c${idx}`} className={`px-1.5 py-0.5 rounded text-[0.85em] font-mono ${codeClass}`}>{raw.slice(1, -1)}</code>)
    lastIndex = match.index + raw.length; idx++
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts.length === 0 ? text : parts
}
function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
  const codeClass = isUser ? 'bg-black/30 text-white' : 'bg-black/50 text-emerald-300'
  return (
    <div className="space-y-1">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        if (line.match(/^[-_*]{3,}$/)) return <hr key={i} className="border-cyan-500/15 my-1.5" />
        if (line.startsWith('### ')) return <p key={i} className="font-bold mt-1.5 text-cyan-200">{renderInline(line.slice(4), `${i}`, codeClass)}</p>
        if (line.startsWith('## ')) return <p key={i} className="font-bold mt-1.5 text-cyan-200">{renderInline(line.slice(3), `${i}`, codeClass)}</p>
        if (line.startsWith('# ')) return <p key={i} className="font-bold mt-1.5 text-cyan-200">{renderInline(line.slice(2), `${i}`, codeClass)}</p>
        const bullet = line.match(/^[-•*]\s+(.*)$/)
        if (bullet) return (
          <div key={i} className="flex gap-2 items-start">
            <span className="mt-0.5 shrink-0 text-xs text-cyan-400">▸</span>
            <span>{renderInline(bullet[1], `${i}`, codeClass)}</span>
          </div>
        )
        const num = line.match(/^(\d+)\.\s+(.*)$/)
        if (num) return (
          <div key={i} className="flex gap-2 items-start">
            <span className="tabular-nums text-xs mt-0.5 shrink-0 font-mono text-cyan-400">{num[1]}.</span>
            <span>{renderInline(num[2], `${i}`, codeClass)}</span>
          </div>
        )
        return <p key={i}>{renderInline(line, `${i}`, codeClass)}</p>
      })}
    </div>
  )
}

// ─── Decorative pieces ────────────────────────────────────────────────────────
function Starfield() {
  const stars = useMemo(() => {
    const n = 80
    return Array.from({ length: n }, (_, i) => ({
      key: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      dur: 2 + Math.random() * 3,
      size: Math.random() < 0.85 ? 1.5 : 2.5,
    }))
  }, [])
  return (
    <div className="scifi-starfield">
      {stars.map((s) => (
        <span key={s.key} className="scifi-star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
function Waveform4() {
  return (
    <span className="inline-flex items-end gap-[2px] h-3.5">
      {[0, 0.15, 0.3, 0.45].map((d, i) => (
        <span key={i} className="scifi-wf-bar" style={{ animationDelay: `${d}s`, height: '12px' }} />
      ))}
    </span>
  )
}
function TypingEqualizer() {
  return (
    <span className="inline-flex items-end gap-1 h-4">
      {[0, 0.15, 0.3].map((d, i) => (
        <span key={i} className="scifi-eq-bar" style={{ animationDelay: `${d}s` }} />
      ))}
    </span>
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
  memoryContext, pastSessionsSummary, displayName,
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
  const [elapsed, setElapsed] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initializedRef = useRef(false)
  const voiceTypeRef = useRef<VoiceType>(voiceType)
  const speakingIdRef = useRef<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const speechBaseRef = useRef('')

  useEffect(() => { voiceTypeRef.current = voiceType }, [voiceType])

  const language = LANG_MAP[subjectSlug] ?? 'plaintext'
  const langBadge = LANG_BADGE[subjectSlug] ?? { label: subjectSlug.toUpperCase(), color: '#00D4FF', bg: 'rgba(0,212,255,0.12)' }
  const filename = FILENAME[subjectSlug] ?? 'урок.txt'
  const lineCount = code.split('\n').length

  // Session timer (starts when sessionId exists)
  useEffect(() => {
    if (!sessionId) return
    const start = Date.now()
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000)
    return () => clearInterval(id)
  }, [sessionId])

  // Smooth scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  useEffect(() => { setSpeechInputSupported(getSpeechRecognition() !== null) }, [])

  // ── TTS ────────────────────────────────────────────────────────────────────
  const handleStopSpeech = useCallback(() => {
    stopSpeaking(); speakingIdRef.current = null; setSpeakingId(null)
  }, [])
  const handleSpeak = useCallback((id: string, text: string) => {
    const clean = cleanTextForTTS(text)
    if (!clean) return
    speakingIdRef.current = id; setSpeakingId(id)
    speakText(clean, voiceTypeRef.current, undefined, () => {
      if (speakingIdRef.current === id) { speakingIdRef.current = null; setSpeakingId(null) }
    })
  }, [])
  const handleVoiceChange = useCallback((newVoice: VoiceType) => {
    setVoiceType(newVoice)
    if (speakingIdRef.current) {
      const id = speakingIdRef.current
      const msg = messages.find((m) => m.id === id)
      stopSpeaking()
      if (msg) setTimeout(() => { voiceTypeRef.current = newVoice; handleSpeak(id, msg.content) }, 50)
    }
  }, [messages, handleSpeak])

  // ── Copy code ──────────────────────────────────────────────────────────────
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1800)
    }).catch(() => { /* ignore */ })
  }, [code])

  // ── Monaco custom theme (quantum) ──────────────────────────────────────────
  const handleEditorWillMount = useCallback((monaco: typeof import('monaco-editor')) => {
    monaco.editor.defineTheme('quantum', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '',                 foreground: '00FF88' },
        { token: 'comment',          foreground: '4A7FA5', fontStyle: 'italic' },
        { token: 'keyword',          foreground: '00D4FF', fontStyle: 'bold' },
        { token: 'keyword.flow',     foreground: '00D4FF' },
        { token: 'string',           foreground: 'FFD789' },
        { token: 'number',           foreground: 'FF6B35' },
        { token: 'type',             foreground: '7B2FFF' },
        { token: 'function',         foreground: '00FF88' },
        { token: 'variable',         foreground: 'E8F4FD' },
        { token: 'identifier',       foreground: 'E8F4FD' },
        { token: 'delimiter',        foreground: '4A7FA5' },
        { token: 'operator',         foreground: '00D4FF' },
        { token: 'punctuation',      foreground: '4A7FA5' },
        { token: 'tag',              foreground: '00D4FF' },
        { token: 'attribute.name',   foreground: 'FF6B35' },
      ],
      colors: {
        'editor.background':                    '#020408',
        'editor.foreground':                    '#00FF88',
        'editorCursor.foreground':              '#00D4FF',
        'editorLineNumber.foreground':          '#1E4A6E',
        'editorLineNumber.activeForeground':    '#00D4FF',
        'editor.selectionBackground':           '#00D4FF33',
        'editor.inactiveSelectionBackground':   '#00D4FF1A',
        'editor.lineHighlightBackground':       '#0A162888',
        'editorGutter.background':              '#020408',
        'editorIndentGuide.background':         '#0A1628',
        'editorIndentGuide.activeBackground':   '#1E4A6E',
        'scrollbarSlider.background':           '#00D4FF22',
        'scrollbarSlider.hoverBackground':      '#00D4FF44',
        'scrollbarSlider.activeBackground':     '#00D4FF66',
      },
    })
  }, [])

  // ── Stream message ──────────────────────────────────────────────────────────
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
            // Code persistence: only replace when a new block actually exists
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

  // ── Session lifecycle ──────────────────────────────────────────────────────
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

  // ── Long message preview ──────────────────────────────────────────────────
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
      <div className="min-h-screen flex items-center justify-center p-6 relative" style={{ background: '#020408' }}>
        <Starfield />
        <div className="relative z-10 p-8 max-w-md text-center rounded-2xl scifi-border" style={{ background: 'rgba(10,22,40,0.85)', backdropFilter: 'blur(20px)' }}>
          <div className="text-5xl mb-4">⏻</div>
          <h2 className="text-xl font-black scifi-text-glow mb-2 font-mono">ДОСТУП ОГРАНИЧЕН</h2>
          <p className="text-sm mb-6 leading-relaxed text-cyan-200/70">Бесплатный сеанс использован. Активируй подписку.</p>
          <Link href="/billing" className="inline-block px-6 py-3 rounded-lg text-white font-bold text-sm scifi-send">АКТИВИРОВАТЬ</Link>
          <Link href="/dashboard" className="block mt-4 text-xs text-cyan-500/70 font-mono">← БАЗА</Link>
        </div>
      </div>
    )
  }
  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative" style={{ background: '#020408' }}>
        <Starfield />
        <div className="relative z-10 p-8 max-w-sm text-center rounded-2xl scifi-border" style={{ background: 'rgba(10,22,40,0.85)' }}>
          <div className="text-4xl mb-4 text-red-400">⚠</div>
          <p className="text-red-300 text-sm mb-5 font-mono">{initError}</p>
          <Link href="/dashboard" className="text-xs text-cyan-500/70 font-mono">← БАЗА</Link>
        </div>
      </div>
    )
  }

  const initializing = messages.length === 0

  return (
    <div className="h-screen flex flex-col overflow-hidden text-cyan-50 relative font-sans" style={{ background: '#020408' }}>

      {/* Decorative layers */}
      <Starfield />
      <div className="scifi-scanlines" />

      {/* ── MISSION CONTROL TOP BAR ───────────────────────────────────────── */}
      <header className="relative z-10 h-[52px] flex items-center px-5 gap-4 shrink-0 border-b"
        style={{ background: 'rgba(6,13,31,0.95)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,212,255,0.25)', boxShadow: '0 1px 0 rgba(0,212,255,0.15), 0 6px 24px rgba(0,212,255,0.08)' }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <Hexagon size={18} className="text-cyan-400" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.7))' }} />
          <span className="font-mono font-black text-sm tracking-[0.18em] scifi-text-glow">MY TUTOR</span>
        </div>

        {/* Vertical separator */}
        <div className="h-6 w-px" style={{ background: 'rgba(0,212,255,0.2)' }} />

        {/* Session status */}
        <div className="flex items-center gap-2.5 text-xs font-mono">
          <span className="w-2 h-2 rounded-full scifi-blink" style={{ background: '#00FF88', boxShadow: '0 0 10px rgba(0,255,136,0.8)' }} />
          <span className="text-emerald-300 tracking-wider">СЕССИЯ АКТИВНА</span>
          <span className="text-cyan-500/60">·</span>
          <span className="tabular-nums text-cyan-300 tracking-wider">{formatTimer(elapsed)}</span>
        </div>

        <div className="flex-1" />

        {/* Voice toggles */}
        <div className="flex items-center gap-1.5">
          {VOICE_PRESETS.map((v) => (
            <button key={v.type} onClick={() => handleVoiceChange(v.type)} title={v.label}
              className={`scifi-toggle font-mono text-[10px] font-bold tracking-wider px-3 py-1.5 rounded ${voiceType === v.type ? 'active' : ''}`}>
              {v.code}
            </button>
          ))}
        </div>

        <div className="h-6 w-px" style={{ background: 'rgba(0,212,255,0.2)' }} />

        {/* Back to base */}
        <Link href="/dashboard" className="font-mono text-xs tracking-wider text-cyan-400/80 hover:text-cyan-300 transition-colors">
          ← БАЗА
        </Link>
      </header>

      {/* ── Main split: editor 58% / chat 42% ─────────────────────────────── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">

        {/* ── LEFT: QUANTUM CODE TERMINAL ─────────────────────────────────── */}
        <section className="hidden lg:flex flex-col border-r relative"
          style={{ width: '58%', background: '#020408', borderColor: 'rgba(0,212,255,0.15)' }}>

          {/* Terminal header */}
          <div className="h-12 flex items-center gap-3 px-4 shrink-0 border-b"
            style={{ background: 'rgba(6,13,31,0.95)', borderColor: 'rgba(0,212,255,0.15)' }}>
            <span className="font-mono text-[10px] font-black tracking-[0.18em] px-2.5 py-1 rounded border"
              style={{ background: langBadge.bg, color: langBadge.color, borderColor: `${langBadge.color}55`, boxShadow: `0 0 12px ${langBadge.color}33` }}>
              {langBadge.label}
            </span>
            <div className="flex items-center font-mono text-sm text-cyan-100">
              <span>{filename}</span>
              <span className="scifi-cursor ml-0.5 text-cyan-400" style={{ textShadow: '0 0 8px rgba(0,212,255,0.8)' }}>█</span>
            </div>
            <button onClick={handleCopy}
              className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-[10px] font-black tracking-wider transition-all border ${copied ? 'text-emerald-300' : 'text-cyan-300 hover:text-cyan-200'}`}
              style={{
                background: copied ? 'rgba(0,255,136,0.12)' : 'rgba(0,212,255,0.06)',
                borderColor: copied ? 'rgba(0,255,136,0.6)' : 'rgba(0,212,255,0.4)',
                boxShadow: copied ? '0 0 16px rgba(0,255,136,0.45)' : '0 0 12px rgba(0,212,255,0.2)',
              }}>
              {copied ? <><Check size={12} strokeWidth={3} /> СКОПИРОВАНО ✓</> : <><Copy size={12} strokeWidth={2.5} /> КОПИРОВАТЬ КОД</>}
            </button>
          </div>

          {/* Monaco + scanning line overlay */}
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <div className="scifi-scan-line" />
            <MonacoEditor
              height="100%" language={language} value={code} theme="quantum"
              beforeMount={handleEditorWillMount}
              options={{
                readOnly: true, fontSize: 14, lineHeight: 1.7,
                fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: 'on',
                padding: { top: 16, bottom: 16 }, renderLineHighlight: 'none',
                hideCursorInOverviewRuler: true, overviewRulerBorder: false, overviewRulerLanes: 0,
                folding: false, glyphMargin: false, contextmenu: false,
                lineNumbers: 'on', automaticLayout: true,
                cursorBlinking: 'phase', cursorStyle: 'line', cursorWidth: 2,
                renderWhitespace: 'none',
              }}
            />
          </div>

          {/* Status bar */}
          <div className="h-8 flex items-center px-4 shrink-0 border-t font-mono text-[10px] tracking-wider"
            style={{ background: 'rgba(6,13,31,0.95)', borderColor: 'rgba(0,212,255,0.15)' }}>
            {isStreaming ? (
              <span className="flex items-center gap-2 text-cyan-300">
                <Loader2 size={11} className="animate-spin" />
                ⟳ РЕПЕТИТОР ПИШЕТ...
              </span>
            ) : (
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 scifi-blink" />
                ● ГОТОВО
              </span>
            )}
            <span className="ml-auto flex items-center gap-4 text-cyan-500/70">
              <span>LN {lineCount}</span>
              <span className="text-cyan-500/40">|</span>
              <span>{langBadge.label}</span>
              <span className="text-cyan-500/40">|</span>
              <span>UTF-8</span>
            </span>
          </div>
        </section>

        {/* ── RIGHT: NEURAL COMMUNICATION INTERFACE ────────────────────────── */}
        <section className="flex flex-col flex-1 min-w-0 relative" style={{ background: '#020408' }}>

          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 h-12 shrink-0 border-b"
            style={{ background: 'rgba(6,13,31,0.95)', borderColor: 'rgba(0,212,255,0.15)' }}>

            {/* Hexagon avatar */}
            <div className="relative w-9 h-9 shrink-0">
              <div className="absolute inset-0 scifi-hex"
                style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)', boxShadow: '0 0 18px rgba(0,212,255,0.5)' }} />
              <div className="absolute inset-0 flex items-center justify-center font-mono font-black text-[11px] text-white"
                style={{ textShadow: '0 0 6px rgba(255,255,255,0.6)' }}>МТ</div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-mono text-sm font-bold tracking-wider scifi-text-glow truncate">РЕПЕТИТОР МАКС</div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full scifi-blink" style={{ background: '#00FF88', boxShadow: '0 0 6px #00FF88' }} />
                <span className="text-emerald-400">● ОНЛАЙН</span>
                <span className="text-cyan-700">·</span>
                <span className="text-cyan-500/70 uppercase">{subjectName}</span>
              </div>
            </div>

            {/* Audio waveform — when TTS is speaking */}
            {speakingId && (
              <div className="flex items-center gap-2 px-3 py-1 rounded border font-mono text-[10px] tracking-wider"
                style={{ background: 'rgba(0,212,255,0.08)', borderColor: 'rgba(0,212,255,0.4)', color: '#7DF0FF' }}>
                <Waveform4 />
                <span>ГОВОРИТ</span>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 scifi-grid scroll-smooth">

            {initializing && (
              <div className="animate-fade-in flex flex-col items-center justify-center py-12 gap-4">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 scifi-hex"
                    style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)', boxShadow: '0 0 24px rgba(0,212,255,0.6)' }} />
                  <div className="absolute inset-0 flex items-center justify-center font-mono font-black text-sm text-white">МТ</div>
                </div>
                <p className="font-mono text-xs tracking-wider text-cyan-400/80">
                  ИНИЦИАЛИЗАЦИЯ НЕЙРОННОГО КАНАЛА...
                </p>
                <TypingEqualizer />
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

                  {/* Assistant avatar/name */}
                  {!isUser && !msg.streaming && (
                    <div className="flex items-center gap-2 mb-1.5 ml-0.5">
                      <div className="relative w-5 h-5 shrink-0">
                        <div className="absolute inset-0 scifi-hex" style={{ background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)' }} />
                        <div className="absolute inset-0 flex items-center justify-center font-mono font-black text-[8px] text-white">МТ</div>
                      </div>
                      <span className="font-mono text-[10px] tracking-wider text-cyan-500/80">РЕПЕТИТОР МАКС</span>
                    </div>
                  )}

                  {!isUser ? (
                    /* TUTOR bubble */
                    <div
                      className={`max-w-[92%] px-4 py-3 rounded-r-lg text-[13px] leading-relaxed transition-all hover:bg-cyan-500/[0.07] ${
                        isSpeaking ? 'shadow-[0_0_24px_rgba(0,212,255,0.25)]' : ''
                      }`}
                      style={{
                        background: 'rgba(0,212,255,0.05)',
                        borderLeft: '3px solid #00D4FF',
                        color: '#E8F4FD',
                        boxShadow: isSpeaking ? '0 0 24px rgba(0,212,255,0.3), inset 0 0 12px rgba(0,212,255,0.04)' : undefined,
                      }}>
                      {msg.content
                        ? <MessageContent text={displayText} isUser={false} />
                        : <TypingEqualizer />
                      }

                      {cached?.hasMore && (
                        <button onClick={() => setExpanded((prev) => ({ ...prev, [msg.id]: !isExpanded }))}
                          className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                          {isExpanded ? 'СВЕРНУТЬ' : 'РАЗВЕРНУТЬ'}
                          <ChevronDown size={11} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}

                      {!msg.streaming && msg.content && (
                        <div className={`mt-2.5 transition-opacity ${isSpeaking ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          <button
                            onClick={() => isSpeaking ? handleStopSpeech() : handleSpeak(msg.id, msg.content)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[10px] font-bold tracking-wider border transition-all"
                            style={{
                              background: isSpeaking ? 'rgba(0,212,255,0.15)' : 'rgba(0,212,255,0.04)',
                              borderColor: isSpeaking ? 'rgba(0,212,255,0.55)' : 'rgba(0,212,255,0.25)',
                              color: isSpeaking ? '#7DF0FF' : '#4A7FA5',
                            }}>
                            {isSpeaking
                              ? <><Square size={9} fill="currentColor" strokeWidth={0} /> СТОП</>
                              : <><Play size={10} fill="currentColor" strokeWidth={0} className="translate-x-px" /> ВОСПРОИЗВЕСТИ</>
                            }
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* STUDENT bubble */
                    <div className="flex items-center gap-2 max-w-[92%]">
                      <div className="px-4 py-2.5 rounded-full text-[13px] leading-relaxed text-white font-medium shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)',
                          boxShadow: '0 4px 16px rgba(123,47,255,0.35), 0 0 24px rgba(0,212,255,0.15)',
                        }}>
                        <MessageContent text={displayText} isUser={true} />
                      </div>
                      <div className="relative w-6 h-6 shrink-0">
                        <div className="absolute inset-0 scifi-hex"
                          style={{ background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)', boxShadow: '0 0 10px rgba(123,47,255,0.5)' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <User size={9} className="text-white" strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timestamp on hover */}
                  {msg.content && !msg.streaming && (
                    <span className="font-mono text-[9px] mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-700 tracking-wider">
                      {new Date(msg.ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  )}
                </div>
              )
            })}

            {/* Active typing indicator */}
            {isStreaming && messages[messages.length - 1]?.streaming && !messages[messages.length - 1]?.content && (
              <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-wider text-cyan-400">
                <TypingEqualizer />
                <span>РЕПЕТИТОР ДУМАЕТ...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="px-4 py-3.5 shrink-0 border-t"
            style={{ background: 'rgba(6,13,31,0.98)', borderColor: 'rgba(0,212,255,0.2)' }}>
            <div className="flex items-center gap-2">

              {/* Input */}
              <input
                ref={inputRef} type="text" value={input}
                onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                disabled={isStreaming || !sessionId}
                placeholder={
                  micState === 'recording' ? '● ЗАПИСЬ...' :
                  isStreaming ? 'РЕПЕТИТОР ОТВЕЧАЕТ...' :
                  'ВВЕДИ ВОПРОС ИЛИ ГОВОРИ...'
                }
                className="scifi-input flex-1 h-12 px-4 rounded-lg text-sm font-mono placeholder-cyan-700 tracking-wide disabled:opacity-40"
              />

              {/* Mic */}
              {speechInputSupported && (
                <button onClick={handleMicClick} disabled={isStreaming || !sessionId}
                  title={micState === 'recording' ? 'Остановить' : 'Голосовой ввод'}
                  className={`relative w-12 h-12 flex items-center justify-center rounded-lg border transition-all font-mono text-[9px] font-bold disabled:opacity-40 disabled:cursor-not-allowed
                    ${micState === 'recording' ? 'scifi-rec' : ''}`}
                  style={micState === 'recording' ? undefined : {
                    background: 'rgba(0,212,255,0.04)',
                    borderColor: 'rgba(0,212,255,0.25)',
                    color: '#4A7FA5',
                  }}>
                  {micState === 'recording'
                    ? <span className="flex flex-col items-center gap-0.5"><Mic size={14} /><span className="tracking-wider">REC</span></span>
                    : <Mic size={17} />
                  }
                </button>
              )}

              {/* Send */}
              <button onClick={handleSend} disabled={!input.trim() || isStreaming || !sessionId}
                className="scifi-send h-12 px-4 inline-flex items-center gap-2 rounded-lg font-mono text-xs font-black tracking-wider text-white">
                <span className="hidden sm:inline">ОТПРАВИТЬ</span>
                <Send size={15} className="translate-x-px" />
              </button>
            </div>
            <p className="mt-2.5 font-mono text-[9px] text-center text-cyan-700 tracking-[0.2em]">
              ENTER — ОТПРАВИТЬ{speechInputSupported ? ' · SHIFT+ENTER — НОВАЯ СТРОКА' : ''}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

// keep export shape stable; sidebar removed from this file

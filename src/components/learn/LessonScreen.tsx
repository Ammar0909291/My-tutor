'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Check, ChevronDown, ChevronUp, Copy, Loader2, Mic, Paperclip, Play, Send, Square, X } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { useCountry } from '@/components/Providers'
import { speakText, stopSpeaking, type VoiceType, type TeachingLang } from '@/lib/tts'
import { FinalAssessmentModal } from '@/components/learn/FinalAssessmentModal'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// ─── Config ───────────────────────────────────────────────────────────────────
const VOICE_LABELS_BY_LANG: Record<TeachingLang, Record<VoiceType, string>> = {
  ru: { male: 'Мужской', female: 'Женский', warm: 'Тёплый' },
  en: { male: 'Male',    female: 'Female',  warm: 'Warm'    },
  hi: { male: 'पुरुष',   female: 'महिला',   warm: 'मधुर'   },
}
const LANG_FLAG: Record<TeachingLang, string> = { ru: '🇷🇺', en: '🇬🇧', hi: '🇮🇳' }
const VOICE_MAP: Record<string, VoiceType> = {
  male: 'male', female: 'female', warm: 'warm',
  alexei: 'male', maria: 'female', dmitry: 'warm',
}
function resolveVoice(choice: string): VoiceType { return VOICE_MAP[choice] ?? 'male' }

const LANG_BADGE: Record<string, { label: string; accent: string }> = {
  c:       { label: 'C',       accent: '#F78166' },
  cpp:     { label: 'C++',     accent: '#79C0FF' },
  python:  { label: 'Python',  accent: '#56D364' },
  english: { label: 'English', accent: '#E3B341' },
}
const LANG_MAP: Record<string, string> = { c: 'c', cpp: 'cpp', python: 'python', english: 'markdown' }
const FILENAME: Record<string, string> = { c: 'lesson.c', cpp: 'lesson.cpp', python: 'lesson.py', english: 'lesson.md' }
const INITIAL_CODE: Record<string, string> = {
  c:       '// Waiting for first lesson...\n',
  cpp:     '// Waiting for first lesson...\n',
  python:  '# Waiting for first lesson...\n',
  english: '<!-- Waiting for first lesson... -->\n',
}
const EXT_LANG: Record<string, string> = { py: 'python', c: 'c', cpp: 'cpp', txt: 'text' }

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTimer(s: number) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60
  const p = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${p(h)}:${p(m)}:${p(sec)}` : `${p(m)}:${p(sec)}`
}
function extractLastCodeBlock(text: string): string | null {
  let last: string | null = null
  const re1 = /```(?:\w*)\n([\s\S]*?)```/g; let m: RegExpExecArray | null
  while ((m = re1.exec(text)) !== null) last = m[1].trim()
  const re2 = /\[CODE\]([\s\S]*?)\[\/CODE\]/gi
  while ((m = re2.exec(text)) !== null) last = m[1].trim()
  return last
}
function stripCode(text: string) {
  return text.replace(/```[\s\S]*?```/g, '').replace(/\[CODE\][\s\S]*?\[\/CODE\]/gi, '').trim()
}
function truncate(text: string, n: number): { preview: string; hasMore: boolean } {
  const idx: number[] = []
  const re = /[.!?…]+[\s)]?/g; let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) idx.push(m.index + m[0].length)
  if (idx.length <= n) return { preview: text, hasMore: false }
  return { preview: text.slice(0, idx[n - 1]).trim(), hasMore: true }
}

// ─── MessageContent ───────────────────────────────────────────────────────────
function renderInline(text: string, key: string, codeStyle: string): React.ReactNode {
  const re = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g
  const parts: React.ReactNode[] = []; let last = 0; let i = 0; let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const raw = m[0]
    if (raw.startsWith('**')) parts.push(<strong key={`${key}-b${i}`} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{raw.slice(2,-2)}</strong>)
    else if (raw.startsWith('*')) parts.push(<em key={`${key}-i${i}`} style={{ color: 'var(--text-secondary)' }}>{raw.slice(1,-1)}</em>)
    else parts.push(<code key={`${key}-c${i}`} className={codeStyle}>{raw.slice(1,-1)}</code>)
    last = m.index + raw.length; i++
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 0 ? text : parts
}

function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
  const codeStyle = `px-1.5 py-0.5 rounded text-[0.82em] font-mono ${isUser ? 'bg-white/20' : 'bg-black/30'} ${isUser ? '' : 'text-[#F78166]'}`
  return (
    <div className="space-y-1">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        if (line.match(/^#+\s/)) return <p key={i} className="font-bold" style={{ color: 'var(--text-primary)' }}>{renderInline(line.replace(/^#+\s/, ''), `${i}`, codeStyle)}</p>
        const bullet = line.match(/^[-•*]\s+(.*)$/)
        if (bullet) return (
          <div key={i} className="flex gap-2">
            <span className="mt-0.5 shrink-0 text-xs" style={{ color: '#F78166' }}>▸</span>
            <span>{renderInline(bullet[1], `${i}`, codeStyle)}</span>
          </div>
        )
        const num = line.match(/^(\d+)\.\s+(.*)$/)
        if (num) return (
          <div key={i} className="flex gap-2">
            <span className="tabular-nums text-xs mt-0.5 shrink-0 font-mono" style={{ color: '#F78166' }}>{num[1]}.</span>
            <span>{renderInline(num[2], `${i}`, codeStyle)}</span>
          </div>
        )
        return <p key={i}>{renderInline(line, `${i}`, codeStyle)}</p>
      })}
    </div>
  )
}

function TypingDots() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex gap-1.5 items-center">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────
type ChatMsg = { id: string; role: 'user'|'assistant'; content: string; ts: number; streaming?: boolean }
type MicState = 'idle' | 'recording'
type AttachedFile = { name: string; content: string; language: string }
type ActiveTab = 'curriculum' | 'code' | 'chat'
type CurriculumLesson = { id: string; subjectCode: string; unit: number; unitTitle: string; lesson: number; lessonTitle: string; lessonGoal: string; order: number }
type CurriculumProgress = { currentLesson: number; completedLessons: number[]; isCompleted?: boolean; completedAt?: string | null; completionPercent?: number }

interface Props {
  subjectSlug: string; subjectName: string; levelDescription: string; voiceChoice: string
  teachingLanguage?: TeachingLang
  memoryContext?: string | null; pastSessionsSummary?: string | null
  subjects?: {slug:string;name:string}[]; displayName?: string; userId?: string
  resumeLessonTitle?: string; resumeUnitTitle?: string
}

// ─── Panel wrapper ────────────────────────────────────────────────────────────
function Panel({ children, style, accentColor = '#F78166' }: { children: React.ReactNode; style?: React.CSSProperties; accentColor?: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0D1117',
        border: `2px solid ${hovered ? accentColor + 'B3' : accentColor + '66'}`,
        borderRadius: 16,
        boxShadow: `0 4px 24px rgba(0,0,0,0.4)${hovered ? `, 0 0 16px ${accentColor}18` : ''}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'border-color 200ms ease, box-shadow 200ms ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function PanelHeader({ children, tall }: { children: React.ReactNode; tall?: boolean }) {
  return (
    <div style={{
      height: tall ? 56 : 40,
      background: '#161B22',
      borderBottom: '1px solid #21262D',
      borderRadius: '16px 16px 0 0',
      display: 'flex',
      alignItems: 'center',
      padding: '0 14px',
      gap: 8,
      flexShrink: 0,
    }}>
      {children}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export function LessonScreen({ subjectSlug, subjectName, levelDescription, voiceChoice, teachingLanguage = 'en', memoryContext, pastSessionsSummary, displayName, userId }: Props) {
  const { t, lang: uiLang } = useLanguage()
  const { country } = useCountry()

  // Core state
  const [sessionId, setSessionId] = useState<string|null>(null)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [code, setCode] = useState(INITIAL_CODE[subjectSlug] ?? '// ...\n')
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [initError, setInitError] = useState('')
  const [speakingId, setSpeakingId] = useState<string|null>(null)
  const [micState, setMicState] = useState<MicState>('idle')
  const [micSupported, setMicSupported] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState<Record<string,boolean>>({})
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat')
  const [atBottom, setAtBottom] = useState(true)

  // Voice
  const [voiceType, setVoiceType] = useState<VoiceType>(() => resolveVoice(voiceChoice))
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // File attachment
  const [attachedFile, setAttachedFile] = useState<AttachedFile|null>(null)

  // Image input
  const [selectedImage, setSelectedImage] = useState<{ base64: string; mimeType: string; preview: string } | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    if (file.size > 5 * 1024 * 1024) { alert('Файл слишком большой. Максимум 5MB'); e.target.value = ''; return }
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setSelectedImage({ base64: result.split(',')[1], mimeType: file.type, preview: result })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  // Curriculum
  const [curriculumLessons, setCurriculumLessons] = useState<CurriculumLesson[]>([])
  const [curriculumProgress, setCurriculumProgress] = useState<CurriculumProgress>({ currentLesson: 1, completedLessons: [] })
  const [xpCelebration, setXpCelebration] = useState(false)
  const [expandedUnits, setExpandedUnits] = useState<number[]>([1])
  const [finalAssessmentOpen, setFinalAssessmentOpen] = useState(false)

  // Terminal
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState('')
  const [terminalIsError, setTerminalIsError] = useState(false)
  const [terminalDone, setTerminalDone] = useState(false)
  const [stdinInput, setStdinInput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const initializedRef = useRef(false)
  const speakingIdRef = useRef<string|null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sessionIdRef = useRef<string|null>(null)

  // Derived
  const language = LANG_MAP[subjectSlug] ?? 'plaintext'
  const badge = LANG_BADGE[subjectSlug] ?? { label: subjectSlug.toUpperCase(), accent: '#F78166' }
  const filename = FILENAME[subjectSlug] ?? 'lesson.txt'
  const terminalCmd = subjectSlug === 'python' ? `python ${filename}` :
    subjectSlug === 'c' ? `gcc ${filename} -o lesson && ./lesson` :
    subjectSlug === 'cpp' ? `g++ ${filename} -o lesson && ./lesson` :
    filename
  const showTerminal = subjectSlug !== 'english'
  const studentAvatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName ?? 'Student')}&background=79C0FF&color=fff&bold=true&size=64`

  // Timer
  useEffect(() => {
    if (!sessionId) return
    const start = Date.now()
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000)
    return () => clearInterval(id)
  }, [sessionId])

  // Scroll bottom detection
  useEffect(() => {
    const el = messagesAreaRef.current; if (!el) return
    const handler = () => setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 60)
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [])

  // Auto scroll
  useEffect(() => {
    if (atBottom) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, atBottom])

  useEffect(() => { setMicSupported(typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia) }, [])

  // Fetch curriculum
  useEffect(() => {
    fetch(`/api/curriculum?subject=${subjectSlug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const lessons: CurriculumLesson[] = data.lessons ?? []
          const progress: CurriculumProgress = data.progress ?? { currentLesson: 1, completedLessons: [] }
          setCurriculumLessons(lessons)
          setCurriculumProgress(progress)
          // Auto-expand the unit containing the current lesson
          const currentLes = lessons.find((l) => l.order === progress.currentLesson)
          if (currentLes) setExpandedUnits([currentLes.unit])
        }
      })
      .catch(() => {})
  }, [subjectSlug])

  // Detect lesson completion
  const handleLessonComplete = useCallback(async (lessonOrder: number) => {
    try {
      const res = await fetch('/api/curriculum/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectCode: subjectSlug, completedLesson: lessonOrder, totalLessons: curriculumLessons.length || undefined }),
      })
      const data = await res.json()
      if (data.success) {
        setCurriculumProgress(data.progress)
        setXpCelebration(true)
        setTimeout(() => setXpCelebration(false), 3000)
      }
    } catch { /* ignore */ }
  }, [subjectSlug, curriculumLessons.length])

  // TTS
  const handleStopSpeech = useCallback(() => {
    stopSpeaking(); speakingIdRef.current = null; setSpeakingId(null)
  }, [])
  const handleSpeak = useCallback((id: string, text: string) => {
    speakingIdRef.current = id; setSpeakingId(id)
    speakText(text, teachingLanguage, voiceType, () => {
      if (speakingIdRef.current === id) { speakingIdRef.current = null; setSpeakingId(null) }
    }, country)
  }, [teachingLanguage, voiceType, country])
  const handleVoiceChange = useCallback((v: VoiceType) => {
    setVoiceType(v)
    if (speakingIdRef.current) {
      const id = speakingIdRef.current
      const msg = messages.find((m) => m.id === id)
      stopSpeaking()
      if (msg) setTimeout(() => handleSpeak(id, msg.content), 50)
    }
  }, [messages, handleSpeak])

  // Copy
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) }).catch(() => {})
  }, [code])

  // Monaco theme
  const handleEditorBeforeMount = useCallback((monaco: typeof import('monaco-editor')) => {
    monaco.editor.defineTheme('mytutor', {
      base: 'vs-dark', inherit: true,
      rules: [
        { token: 'comment',  foreground: '6E7681', fontStyle: 'italic' },
        { token: 'keyword',  foreground: 'FF7B72', fontStyle: 'bold'   },
        { token: 'string',   foreground: 'A5D6FF'                      },
        { token: 'number',   foreground: 'F2CC60'                      },
        { token: 'type',     foreground: '79C0FF'                      },
        { token: 'function', foreground: 'D2A8FF'                      },
        { token: 'variable', foreground: 'F0F6FC'                      },
        { token: 'operator', foreground: 'FF7B72'                      },
      ],
      colors: {
        'editor.background':                 '#0D1117',
        'editor.foreground':                 '#F0F6FC',
        'editorCursor.foreground':           '#F78166',
        'editorLineNumber.foreground':       '#484F58',
        'editorLineNumber.activeForeground': '#8B949E',
        'editor.selectionBackground':        '#264F78',
        'editor.lineHighlightBackground':    '#161B22',
        'editorGutter.background':           '#0D1117',
        'scrollbarSlider.background':        '#21262D',
        'scrollbarSlider.hoverBackground':   '#30363D',
      },
    })
  }, [])

  // Run code
  const handleRunCode = useCallback(async () => {
    if (isRunning) return
    setIsRunning(true); setTerminalOutput(''); setTerminalIsError(false); setTerminalDone(false)
    try {
      const res = await fetch('/api/learn/run', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, stdin: stdinInput }),
      })
      const data = await res.json() as { success?: boolean; output?: string; error?: string }
      if (!data.success) {
        setTerminalOutput(data.error ?? '(error)')
        setTerminalIsError(true)
      } else {
        setTerminalOutput(data.output ?? '(no output)')
        setTerminalIsError(false)
      }
    } catch (err) {
      setTerminalOutput(`Error: ${err instanceof Error ? err.message : String(err)}`)
      setTerminalIsError(true)
    } finally { setIsRunning(false); setTerminalDone(true) }
  }, [code, language, stdinInput, isRunning])

  // Send message
  const sendMessage = useCallback(async (sid: string, text: string, showInUI = true) => {
    setIsStreaming(true)
    if (showInUI) setMessages((p) => [...p, { id: `u-${Date.now()}`, role: 'user', content: text, ts: Date.now() }])
    const aid = `a-${Date.now()}`
    setMessages((p) => [...p, { id: aid, role: 'assistant', content: '', ts: Date.now(), streaming: true }])
    try {
      const res = await fetch('/api/learn/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid, message: text, userId: userId ?? 'anonymous' }),
      })
      const data = await res.json().catch(() => ({})) as { success?: boolean; text?: string; error?: any }
      const errMsg = typeof data.error === 'string' ? data.error : data.error?.message ?? `HTTP ${res.status}`
      if (!res.ok || !data.success || !data.text) throw new Error(errMsg)
      let full = data.text
      const COMPLETION_KEYWORDS = [
        '[LESSON_COMPLETE]',
        'следующий урок', 'урок завершён', 'урок завершен',
        'next lesson', 'lesson complete', 'lesson completed',
        'अगला पाठ', 'पाठ पूरा',
      ]
      const hasCompletion = COMPLETION_KEYWORDS.some((kw) => full.toLowerCase().includes(kw.toLowerCase()))
      if (hasCompletion) {
        full = full.replace('[LESSON_COMPLETE]', '').trim()
        const currentLessonData = curriculumLessons.find((l) => l.order === curriculumProgress.currentLesson)
        if (currentLessonData) handleLessonComplete(currentLessonData.order)
      }
      setMessages((p) => p.map((m) => m.id === aid ? { ...m, content: full, streaming: false } : m))
      const codeBlock = extractLastCodeBlock(full)
      if (codeBlock) setCode(codeBlock)
      handleSpeak(aid, full)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setMessages((p) => p.map((m) => m.id === aid ? { ...m, content: `Error: ${msg}`, streaming: false } : m))
    } finally { setIsStreaming(false); textareaRef.current?.focus() }
  }, [handleSpeak, curriculumLessons, curriculumProgress.currentLesson, handleLessonComplete, userId])

  // Navigate to a previous lesson for review
  const navigateToLesson = useCallback(async (lessonOrder: number) => {
    if (lessonOrder >= curriculumProgress.currentLesson) return
    const lesson = curriculumLessons.find((l) => l.order === lessonOrder)
    if (!lesson || !sessionId) return
    const reviewMsg = teachingLanguage === 'ru'
      ? `Давай повторим урок ${lessonOrder}: ${lesson.lessonTitle}`
      : teachingLanguage === 'hi'
      ? `Lesson ${lessonOrder} repeat karte hain: ${lesson.lessonTitle}`
      : `Let's review lesson ${lessonOrder}: ${lesson.lessonTitle}`
    await sendMessage(sessionId, reviewMsg, true)
  }, [curriculumLessons, curriculumProgress.currentLesson, sessionId, teachingLanguage, sendMessage])

  // Session init + lifecycle
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
          body: JSON.stringify({ subjectSlug, memoryContext: memoryContext ?? undefined, userId: userId ?? undefined }),
        })
        const data = await res.json()
        if (!data.success) { setInitError(data.error ?? 'Error'); return }
        const sid = data.data.id; setSessionId(sid)
        const opening = teachingLanguage === 'ru'
          ? (pastSessionsSummary
            ? `Привет! В прошлый раз мы изучали: "${pastSessionsSummary}". Продолжим? Уровень: "${levelDescription}".Кратко напомни и продолжи. 3-4 предложения.`
            : `Начни урок по "${subjectName}". Уровень: "${levelDescription}".Представься как "Репетитор Макс", поприветствуй и начни объяснение. 3-4 предложения.`)
          : teachingLanguage === 'hi'
          ? (pastSessionsSummary
            ? `Namaste! Pichli baar humne "${pastSessionsSummary}" padha tha. Continue karein? Level: "${levelDescription}".Brief reminder do aur aage badho. 3-4 sentences.`
            : `"${subjectName}" ka lesson shuru karo. Level: "${levelDescription}".Apna parichay do aur pehla explanation with code do. 3-4 sentences.`)
          : (pastSessionsSummary
            ? `Hi! Last time we studied: "${pastSessionsSummary}". Continue? Level: "${levelDescription}".Briefly remind and continue. 3-4 sentences.`
            : `Start the lesson on "${subjectName}". Level: "${levelDescription}".Introduce yourself and begin teaching. 3-4 sentences.`)
        await sendMessage(sid, opening, false)
      } catch { setInitError('Connection failed. Please refresh the page.') }
    }
    init()
  }, [subjectSlug, subjectName, levelDescription, memoryContext, pastSessionsSummary, sendMessage, teachingLanguage, userId])

  // Vision send
  async function sendImageMessage(sid: string) {
    if (!selectedImage) return
    const question = input.trim()
    const imgData = selectedImage
    setSelectedImage(null)
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setIsStreaming(true)
    const uid = `u-${Date.now()}`
    setMessages((p) => [...p, { id: uid, role: 'user', content: `📸 [Изображение]${question ? '\n' + question : ''}`, ts: Date.now() }])
    const aid = `a-${Date.now()}`
    setMessages((p) => [...p, { id: aid, role: 'assistant', content: '', ts: Date.now(), streaming: true }])
    try {
      const res = await fetch('/api/vision', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: imgData.base64, mimeType: imgData.mimeType, question, subject: subjectSlug, lang: teachingLanguage }),
      })
      const data = await res.json() as { success?: boolean; text?: string; error?: any }
      const visionErr = typeof data.error === 'string' ? data.error : data.error?.message ?? 'Vision error'
      if (!data.success || !data.text) throw new Error(visionErr)
      const full = data.text
      setMessages((p) => p.map((m) => m.id === aid ? { ...m, content: full, streaming: false } : m))
      const codeBlock = extractLastCodeBlock(full)
      if (codeBlock) setCode(codeBlock)
      handleSpeak(aid, full)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setMessages((p) => p.map((m) => m.id === aid ? { ...m, content: `Analysis error: ${msg}`, streaming: false } : m))
    } finally { setIsStreaming(false); textareaRef.current?.focus() }
  }

  // Send handler
  function handleSend() {
    if (isStreaming || !sessionId) return
    if (micState === 'recording') stopRecording()
    if (selectedImage) { sendImageMessage(sessionId); return }
    const text = input.trim()
    if (!text && !attachedFile) return
    let msg = text
    if (attachedFile) {
      msg += (text ? '\n' : '') + `\`\`\`${attachedFile.language}\n${attachedFile.content}\n\`\`\``
      setAttachedFile(null)
    }
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    sendMessage(sessionId, msg, true)
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }
  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`
  }

  // Mic
  function stopRecording() {
    if (mediaRecorderRef.current && micState === 'recording') mediaRecorderRef.current.stop()
  }
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1, sampleRate: 16000 },
      })
      const mimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg', 'audio/mp4']
        .find((t) => MediaRecorder.isTypeSupported(t)) ?? 'audio/webm'
      const recorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = recorder
      audioChunksRef.current = []
      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType })
        stream.getTracks().forEach((t) => t.stop())
        if (audioBlob.size < 500) { setMicState('idle'); textareaRef.current?.focus(); return }
        const formData = new FormData()
        formData.append('audio', audioBlob, 'recording.webm')
        formData.append('lang', teachingLanguage || 'en')
        try {
          console.log('[STT-CLIENT] blob size (bytes):', audioBlob.size)
          console.log('[STT-CLIENT] blob mime type:', audioBlob.type)
          console.log('[STT-CLIENT] lang sent:', teachingLanguage || 'en')
          const res = await fetch('/api/stt', { method: 'POST', body: formData })
          console.log('[STT-CLIENT] response status:', res.status)
          const rawBody = await res.text()
          console.log('[STT-CLIENT] response body:', rawBody)
          if (res.ok) {
            let parsed: { text?: string } = {}
            try { parsed = JSON.parse(rawBody) } catch { /* non-JSON */ }
            if (parsed.text?.trim()) setInput((prev) => prev ? prev + ' ' + parsed.text! : parsed.text!)
          } else {
            let errBody: { error?: string } = {}
            try { errBody = JSON.parse(rawBody) } catch { /* non-JSON */ }
            console.error('STT error:', errBody.error)
            alert(teachingLanguage === 'ru'
              ? 'Не удалось распознать речь. Попробуйте ещё раз.'
              : 'Speech recognition failed. Please try again.')
          }
        } catch (err) { console.error('STT request error:', err) }
        setMicState('idle')
        textareaRef.current?.focus()
      }
      recorder.onerror = () => { stream.getTracks().forEach((t) => t.stop()); setMicState('idle') }
      recorder.start(250)
      setMicState('recording')
    } catch (err: any) {
      console.error('Microphone access error:', err.message)
      setMicState('idle')
      if (err.name === 'NotAllowedError') {
        alert(teachingLanguage === 'ru'
          ? 'Доступ к микрофону запрещён. Разрешите доступ в настройках браузера.'
          : 'Microphone permission denied. Please allow microphone access in browser settings.')
      }
    }
  }
  function handleMicClick() { if (micState === 'recording') stopRecording(); else startRecording() }
  useEffect(() => () => { mediaRecorderRef.current?.stop() }, [])

  // File attachment
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    if (file.size > 50 * 1024) { alert('Файл слишком большой (макс. 50 КБ)'); e.target.value = ''; return }
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'txt'
    const lang = EXT_LANG[ext] ?? 'text'
    const reader = new FileReader()
    reader.onload = (ev) => setAttachedFile({ name: file.name, content: (ev.target?.result as string) ?? '', language: lang })
    reader.readAsText(file)
    e.target.value = ''
  }

  // Preview cache
  const previewCache = useMemo(() => {
    const c: Record<string, { preview: string; full: string; hasMore: boolean }> = {}
    for (const m of messages) {
      if (m.role !== 'assistant' || m.streaming) continue
      const full = stripCode(m.content)
      if (full.length < 300) { c[m.id] = { preview: full, full, hasMore: false }; continue }
      const { preview, hasMore } = truncate(full, 4)
      c[m.id] = { preview, full, hasMore }
    }
    return c
  }, [messages])

  // Curriculum derived
  const currentLessonData = curriculumLessons.find((l) => l.order === curriculumProgress.currentLesson) ?? curriculumLessons[0] ?? null
  const nextLessonData = curriculumLessons.find((l) => l.order === (curriculumProgress.currentLesson + 1)) ?? null
  const totalLessons = curriculumLessons.length
  const xpProgress = totalLessons > 0 ? Math.round((curriculumProgress.completedLessons.length / totalLessons) * 100) : 0

  // Group lessons into units for the roadmap tree
  const curriculumUnits = (() => {
    const unitMap = new Map<number, { number: number; title: string; lessons: CurriculumLesson[]; completedCount: number; totalLessons: number }>()
    for (const lesson of curriculumLessons) {
      if (!unitMap.has(lesson.unit)) {
        unitMap.set(lesson.unit, { number: lesson.unit, title: lesson.unitTitle, lessons: [], completedCount: 0, totalLessons: 0 })
      }
      const unit = unitMap.get(lesson.unit)!
      unit.lessons.push(lesson)
      unit.totalLessons++
      if (curriculumProgress.completedLessons.includes(lesson.order)) unit.completedCount++
    }
    return Array.from(unitMap.values()).sort((a, b) => a.number - b.number)
  })()

  // Sprint N — TASK 2: current unit's progress %, for the "Unit N progress: Z%" display
  const currentUnit = curriculumUnits.find((u) => u.number === currentLessonData?.unit) ?? null
  const currentUnitPct = currentUnit && currentUnit.totalLessons > 0
    ? Math.round((currentUnit.completedCount / currentUnit.totalLessons) * 100)
    : 0

  const backLabel = teachingLanguage === 'ru' ? '← Главная' : '← Home'

  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#080B10' }}>
        <div className="text-center">
          <div className="text-4xl mb-4 text-red-400">⚠</div>
          <p className="text-sm mb-5" style={{ color: '#8B949E' }}>{initError}</p>
          <Link href="/dashboard" className="text-sm" style={{ color: '#F78166' }}>{t('lesson_back_base')}</Link>
        </div>
      </div>
    )
  }

  // ── Voice buttons (short labels) ──────────────────────────────────────────
  const voiceShortLabel = { male: 'M', female: 'F', warm: 'W' }
  if (mounted && teachingLanguage === 'ru') {
    voiceShortLabel.male = 'М'; voiceShortLabel.female = 'Ж'; voiceShortLabel.warm = 'Т'
  }

  // ── Layout ────────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#080B10', color: '#E6EDF3', overflow: 'hidden' }}>

      {/* XP Celebration */}
      {xpCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="text-center animate-bounce">
            <div className="text-5xl mb-2">🎉</div>
            <div className="text-2xl font-bold" style={{ color: '#F78166' }}>+10 XP</div>
            <div className="text-sm mt-1" style={{ color: '#8B949E' }}>
              {teachingLanguage === 'ru' ? 'Урок завершён!' : 'Lesson complete!'}
            </div>
          </div>
        </div>
      )}

      {/* Final Assessment modal (Sprint N — TASK 5/6) */}
      {finalAssessmentOpen && (
        <FinalAssessmentModal
          subjectSlug={subjectSlug}
          subjectName={subjectName}
          lessonTitles={curriculumLessons.map((l) => l.lessonTitle)}
          onClose={() => setFinalAssessmentOpen(false)}
        />
      )}

      {/* ══ TOP BAR (52px) ══════════════════════════════════════════════════ */}
      <header style={{
        height: 52, flexShrink: 0,
        background: '#0D1117',
        borderBottom: '1px solid #21262D',
        padding: '0 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        {/* Left */}
        <Link href="/dashboard"
          style={{ color: '#8B949E', textDecoration: 'none', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#F78166' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#8B949E' }}>
          {backLabel}
        </Link>

        {/* Center */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
          <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${badge.accent}22`, color: badge.accent, border: `1px solid ${badge.accent}44`, flexShrink: 0 }}>
            {badge.label}
          </span>
          <span style={{ color: '#484F58', fontSize: 12 }}>·</span>
          <span style={{ fontSize: 12, color: '#8B949E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 240 }}>
            {currentLessonData ? currentLessonData.lessonTitle : subjectName}
          </span>
          <span style={{ color: '#484F58', fontSize: 12 }}>·</span>
          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', color: '#8B949E', flexShrink: 0 }}>
            {formatTimer(elapsed)}
          </span>
          <span style={{ fontSize: 14 }}>{LANG_FLAG[teachingLanguage]}</span>
        </div>

        {/* Right — voice buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {(['male', 'female', 'warm'] as VoiceType[]).map((k) => {
            const isActive = voiceType === k
            return (
              <button key={k} onClick={() => handleVoiceChange(k)}
                title={VOICE_LABELS_BY_LANG[uiLang as TeachingLang]?.[k] ?? VOICE_LABELS_BY_LANG.en[k]}
                style={{
                  width: 28, height: 28, borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  background: isActive ? 'rgba(247,129,102,0.15)' : 'transparent',
                  color: isActive ? '#F78166' : '#484F58',
                  border: `1px solid ${isActive ? 'rgba(247,129,102,0.4)' : '#30363D'}`,
                  transition: 'all 150ms',
                }}>
                {mounted ? voiceShortLabel[k] : { male: 'M', female: 'F', warm: 'W' }[k]}
              </button>
            )
          })}
        </div>
      </header>

      {/* ══ MOBILE TABS ════════════════════════════════════════════════════ */}
      <div className="flex md:hidden shrink-0" style={{ background: '#0D1117', borderBottom: '1px solid #21262D' }}>
        {(['curriculum', 'code', 'chat'] as ActiveTab[]).map((tab, i) => {
          const icons = ['📚', '💻', '💬']
          const labels = teachingLanguage === 'ru' ? ['Урок', 'Код', 'Чат'] : ['Lesson', 'Code', 'Chat']
          return (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, height: 44, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: 'transparent',
              color: activeTab === tab ? '#F78166' : '#8B949E',
              borderTop: `2px solid ${activeTab === tab ? '#F78166' : 'transparent'}`,
              borderBottom: 'none', borderLeft: 'none', borderRight: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
              <span>{icons[i]}</span> {labels[i]}
            </button>
          )
        })}
      </div>

      {/* ══ 3-PANEL GRID ══════════════════════════════════════════════════ */}
      <div style={{
        flex: 1, minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '25% 45% 30%',
        gap: 12,
        padding: 12,
      }}>

        {/* ══ PANEL 1 — CURRICULUM ROADMAP (25%) ══════════════════════════ */}
        <Panel style={{ overflow: 'hidden' }} accentColor="#F78166">
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            className={activeTab !== 'curriculum' ? 'hidden md:flex' : 'flex'}>
            {/* Header */}
            <PanelHeader>
              <span style={{ fontSize: 14 }}>📚</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#E6EDF3', flex: 1 }}>
                {teachingLanguage === 'ru' ? 'Программа' : 'Roadmap'}
              </span>
              <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 10, fontWeight: 700, background: `${badge.accent}22`, color: badge.accent }}>
                {badge.label}
              </span>
            </PanelHeader>

            {/* Goal card for current lesson */}
            {currentLessonData?.lessonGoal && (
              <div style={{ padding: '10px 12px', borderBottom: '1px solid #21262D', background: 'rgba(247,129,102,0.05)' }}>
                <p style={{ fontSize: 10, color: '#F78166', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  🎯 {teachingLanguage === 'ru' ? 'Цель' : 'Goal'}
                </p>
                <p style={{ fontSize: 11, color: '#E6EDF3', marginTop: 3, lineHeight: 1.4 }}>{currentLessonData.lessonGoal}</p>
              </div>
            )}

            {/* Complete Lesson button (Sprint N — TASK 1/2) */}
            {currentLessonData && totalLessons > 0 && (
              <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-dim)', fontWeight: 600 }}>
                    {t('progress_lesson_label')} {currentLessonData.order} / {totalLessons}
                  </span>
                </div>
                {curriculumProgress.completedLessons.includes(currentLessonData.order) ? (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    padding: '7px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                    background: 'rgba(63,185,80,0.1)', color: 'var(--green)', border: '1px solid rgba(63,185,80,0.3)',
                  }}>
                    {t('lesson_completed_btn')}
                  </div>
                ) : (
                  <button
                    onClick={() => handleLessonComplete(currentLessonData.order)}
                    style={{
                      width: '100%', padding: '8px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      background: 'var(--coral)', color: '#fff', border: 'none',
                    }}>
                    {t('complete_lesson_btn')}
                  </button>
                )}
              </div>
            )}

            {/* Subject completed banner + Final Assessment (Sprint N — TASK 4/5) */}
            {curriculumProgress.isCompleted && (
              <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(86,211,100,0.06)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)' }}>{t('subject_complete_title')}</p>
                <p style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>{t('subject_complete_sub')}</p>
                <button onClick={() => setFinalAssessmentOpen(true)}
                  style={{
                    marginTop: 8, width: '100%', padding: '8px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    background: 'rgba(86,211,100,0.15)', color: 'var(--green)', border: '1px solid rgba(86,211,100,0.35)',
                  }}>
                  🏆 {t('take_final_assessment')}
                </button>
              </div>
            )}

            {/* Curriculum tree */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
              {curriculumUnits.length === 0 ? (
                <div style={{ padding: 16, fontSize: 12, color: '#484F58', textAlign: 'center' }}>
                  {teachingLanguage === 'ru' ? 'Загрузка программы...' : 'Loading curriculum...'}
                </div>
              ) : curriculumUnits.map((unit) => {
                const unitComplete = unit.totalLessons > 0 && unit.completedCount === unit.totalLessons
                const unitPct = unit.totalLessons > 0 ? Math.round((unit.completedCount / unit.totalLessons) * 100) : 0
                return (
                <div key={unit.number}>
                  {/* Unit header */}
                  <div
                    onClick={() => setExpandedUnits((prev) =>
                      prev.includes(unit.number) ? prev.filter((n) => n !== unit.number) : [...prev, unit.number]
                    )}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '7px 12px', cursor: 'pointer',
                      borderBottom: '1px solid #21262D',
                      background: 'rgba(22,27,34,0.5)',
                    }}
                  >
                    <span style={{
                      fontSize: 9, color: '#484F58', flexShrink: 0,
                      transform: expandedUnits.includes(unit.number) ? 'rotate(90deg)' : 'none',
                      transition: 'transform 200ms', display: 'inline-block',
                    }}>▶</span>
                    <span style={{
                      background: unitComplete ? 'rgba(63,185,80,0.15)' : 'rgba(247,129,102,0.15)',
                      color: unitComplete ? '#3FB950' : '#F78166',
                      borderRadius: 4, padding: '1px 5px', fontSize: 9, fontWeight: 700, flexShrink: 0,
                    }}>{unitComplete ? '✅' : `U${unit.number}`}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: '#8B949E',
                      textTransform: 'uppercase', letterSpacing: '0.04em', flex: 1,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{unit.title}</span>
                    <span style={{ fontSize: 10, color: unitComplete ? '#3FB950' : '#484F58', flexShrink: 0 }}>
                      {unitComplete ? t('unit_complete_badge') : `${unit.completedCount}/${unit.totalLessons} · ${unitPct}%`}
                    </span>
                  </div>

                  {/* Lessons list */}
                  {expandedUnits.includes(unit.number) && (
                    <div style={{ paddingLeft: 8, paddingBottom: 4 }}>
                      {unit.lessons.map((lesson) => {
                        const isCompleted = curriculumProgress.completedLessons.includes(lesson.order)
                        const isCurrent = lesson.order === curriculumProgress.currentLesson
                        const isPrevious = lesson.order < curriculumProgress.currentLesson
                        const canNavigate = (isCompleted || isPrevious) && !isCurrent
                        return (
                          <div
                            key={lesson.order}
                            onClick={() => canNavigate && navigateToLesson(lesson.order)}
                            style={{
                              display: 'flex', alignItems: 'flex-start', gap: 6,
                              padding: '5px 8px', borderRadius: 6,
                              cursor: canNavigate ? 'pointer' : 'default',
                              background: isCurrent ? 'rgba(247,129,102,0.1)' : 'transparent',
                              border: isCurrent ? '1px solid rgba(247,129,102,0.3)' : '1px solid transparent',
                              marginBottom: 2, transition: 'all 150ms',
                            }}
                          >
                            <span style={{
                              fontSize: 11, marginTop: 1, flexShrink: 0,
                              color: isCompleted ? '#3FB950' : isCurrent ? '#F78166' : '#484F58',
                            }}>
                              {isCompleted ? '✅' : isCurrent ? '→' : '○'}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                fontSize: 11, lineHeight: 1.3,
                                fontWeight: isCurrent ? 600 : 400,
                                color: isCompleted ? '#6E7681'
                                  : isCurrent ? '#F78166'
                                  : isPrevious ? '#8B949E'
                                  : '#484F58',
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                              }}>
                                {lesson.order}. {lesson.lessonTitle}
                              </div>
                              {isCurrent && (
                                <div style={{ fontSize: 9, color: '#484F58', marginTop: 1 }}>
                                  {teachingLanguage === 'ru' ? 'Текущий' : 'Current'}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )})}
            </div>

            {/* Overall progress bar */}
            {totalLessons > 0 && (
              <div style={{ padding: '10px 12px', borderTop: '1px solid #21262D', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: '#6E7681' }}>
                    {teachingLanguage === 'ru' ? 'Завершено' : 'Complete'}
                  </span>
                  <span style={{ fontSize: 10, color: '#8B949E' }}>
                    {curriculumProgress.completedLessons.length} / {totalLessons}
                  </span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: '#21262D', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${xpProgress}%`,
                    background: 'linear-gradient(90deg, #F78166, #FF9E88)',
                    borderRadius: 3, transition: 'width 600ms ease',
                  }} />
                </div>
                {/* Sprint N — TASK 2: Subject / Unit progress % summary */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, gap: 8 }}>
                  <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>
                    {currentUnit ? `${t('unit_progress_label')} (U${currentUnit.number}): ${currentUnitPct}%` : ''}
                  </span>
                  <span style={{ fontSize: 9, color: 'var(--text-dim)', fontWeight: 700 }}>
                    {t('subject_progress_label')}: {xpProgress}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </Panel>

        {/* ══ PANEL 2 — CODE EDITOR (45%) ═══════════════════════════════ */}
        <Panel accentColor="#79C0FF">
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            className={activeTab !== 'code' ? 'hidden md:flex' : 'flex'}>
            {/* Header */}
            <PanelHeader>
              <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: `${badge.accent}22`, color: badge.accent }}>{badge.label}</span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#8B949E' }}>{filename}</span>
              <span style={{ color: '#F78166', fontSize: 12, animation: 'blink 1s infinite' }}>_</span>
              <div style={{ flex: 1 }} />
              <button onClick={handleCopy}
                style={{
                  padding: '3px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                  background: 'transparent',
                  color: copied ? '#3FB950' : '#8B949E',
                  border: `1px solid ${copied ? 'rgba(63,185,80,0.4)' : '#30363D'}`,
                  display: 'flex', alignItems: 'center', gap: 4, transition: 'all 150ms',
                }}
                onMouseEnter={(e) => { if (!copied) { (e.currentTarget as HTMLButtonElement).style.borderColor = '#F78166'; (e.currentTarget as HTMLButtonElement).style.color = '#F78166' } }}
                onMouseLeave={(e) => { if (!copied) { (e.currentTarget as HTMLButtonElement).style.borderColor = '#30363D'; (e.currentTarget as HTMLButtonElement).style.color = '#8B949E' } }}>
                {copied ? <><Check size={10} strokeWidth={3} /> ✓ {teachingLanguage === 'ru' ? 'Скопировано!' : 'Copied!'}</> : <><Copy size={10} /> {teachingLanguage === 'ru' ? 'Копировать' : 'Copy'}</>}
              </button>
            </PanelHeader>

            {/* Monaco */}
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <MonacoEditor
                height="100%" language={language} value={code} theme="mytutor"
                beforeMount={handleEditorBeforeMount}
                options={{
                  readOnly: true, fontSize: 14, lineHeight: 1.7,
                  fontFamily: 'var(--font-mono), "JetBrains Mono", "Fira Code", monospace',
                  fontLigatures: true,
                  minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: 'on',
                  padding: { top: 12, bottom: 12 }, renderLineHighlight: 'all',
                  lineNumbers: 'on', automaticLayout: true,
                  folding: false, glyphMargin: false, contextmenu: false,
                  renderWhitespace: 'none', hideCursorInOverviewRuler: true,
                  overviewRulerBorder: false, overviewRulerLanes: 0,
                }}
              />
            </div>

            {/* Status bar */}
            <div style={{
              height: 28, display: 'flex', alignItems: 'center', padding: '0 12px',
              background: '#161B22', borderTop: '1px solid #21262D',
              fontSize: 11, fontFamily: 'var(--font-mono)', color: '#6E7681',
              justifyContent: 'space-between', flexShrink: 0,
            }}>
              <span>
                {isStreaming
                  ? <span style={{ color: '#F78166', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', border: '1.5px solid #F78166', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                      {teachingLanguage === 'ru' ? 'Репетитор пишет...' : 'Tutor is writing...'}
                    </span>
                  : <span style={{ color: '#3FB950' }}>● {teachingLanguage === 'ru' ? 'Готово' : 'Ready'}</span>
                }
              </span>
              <span style={{ display: 'flex', gap: 8, color: '#484F58' }}>
                <span>{badge.label}</span>
                <span>·</span>
                <span>UTF-8</span>
              </span>
            </div>

            {/* Terminal toggle */}
            {showTerminal && <div
              onClick={() => setTerminalOpen((o) => !o)}
              style={{
                height: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 12px', background: '#080B10', borderTop: '1px solid #21262D',
                cursor: 'pointer', fontSize: 12, color: '#6E7681', flexShrink: 0,
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.color = '#E6EDF3' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.color = '#6E7681' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)' }}>
                {terminalOpen ? <ChevronDown size={11} /> : <ChevronUp size={11} />}
                {teachingLanguage === 'ru' ? '▶ Терминал' : '▶ Terminal'}
              </span>
              {terminalOpen && (
                <button onClick={(e) => { e.stopPropagation(); handleRunCode() }}
                  disabled={isRunning}
                  style={{
                    padding: '2px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                    background: 'rgba(247,129,102,0.1)', color: '#F78166', border: '1px solid rgba(247,129,102,0.3)',
                    display: 'flex', alignItems: 'center', gap: 4, opacity: isRunning ? 0.5 : 1,
                  }}>
                  {isRunning
                    ? <><Loader2 size={10} className="animate-spin" />{teachingLanguage === 'ru' ? 'Запуск...' : 'Running...'}</>
                    : <><Play size={10} fill="currentColor" strokeWidth={0} />{teachingLanguage === 'ru' ? 'Запустить' : 'Run'}</>}
                </button>
              )}
            </div>}

            {/* Terminal panel */}
            {showTerminal && terminalOpen && (
              <div style={{
                height: 180, background: '#000', borderTop: '1px solid #21262D',
                borderRadius: '0 0 16px 16px', display: 'flex', flexDirection: 'column', flexShrink: 0,
              }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6 }}>
                  {isRunning
                    ? <span style={{ color: '#E3B341' }}>{`> ${teachingLanguage === 'ru' ? 'Выполнение...' : 'Running...'}`}</span>
                    : terminalOutput
                    ? <>
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: terminalIsError ? '#F85149' : '#3FB950', margin: 0 }}>{terminalOutput}</pre>
                        {terminalDone && <div style={{ marginTop: 8, paddingTop: 8, color: '#484F58', borderTop: '1px solid #21262D' }}>
                          {t('lesson_terminal_done')}
                        </div>}
                      </>
                    : <span style={{ color: '#484F58' }}>$ {terminalCmd}</span>
                  }
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderTop: '1px solid #21262D', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#484F58' }}>stdin:</span>
                  <input
                    type="text"
                    value={stdinInput}
                    onChange={(e) => setStdinInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleRunCode() } }}
                    placeholder={t('lesson_terminal_stdin')}
                    style={{ flex: 1, background: 'transparent', fontFamily: 'var(--font-mono)', fontSize: 11, outline: 'none', color: '#E6EDF3', caretColor: '#3FB950', border: 'none' }}
                  />
                </div>
              </div>
            )}
          </div>
        </Panel>

        {/* ══ PANEL 3 — TUTOR CHAT (30%) ════════════════════════════════ */}
        <Panel accentColor="#3FB950">
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            className={activeTab !== 'chat' ? 'hidden md:flex' : 'flex'}>

            {/* Header (taller) */}
            <PanelHeader tall>
              {/* Avatar */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #F78166, #E05A4E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff',
              }}>МТ</div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#E6EDF3' }}>
                  {teachingLanguage === 'ru' ? 'Репетитор Макс' : 'Tutor Max'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3FB950', animation: 'blink 2s infinite', display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: '#8B949E' }}>{teachingLanguage === 'ru' ? 'онлайн' : 'online'}</span>
                </div>
              </div>

              {/* Waveform — shows when speaking */}
              {speakingId && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 20 }}>
                  {[0, 0.15, 0.3, 0.45].map((d, i) => (
                    <span key={i} className="wave-bar" style={{ animationDelay: `${d}s`, height: 12 }} />
                  ))}
                </div>
              )}
            </PanelHeader>

            {/* Messages */}
            <div
              ref={messagesAreaRef}
              className="dot-grid"
              style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 14, background: '#080B10', position: 'relative' }}>

              {/* Loading state */}
              {messages.length === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 12, paddingTop: 40 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #F78166, #E05A4E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#fff', boxShadow: '0 0 24px rgba(247,129,102,0.4)' }}>МТ</div>
                  <p style={{ fontSize: 13, color: '#8B949E' }}>{t('lesson_init')}</p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  </div>
                </div>
              )}

              {messages.map((msg) => {
                const isUser = msg.role === 'user'
                const isSpeaking = speakingId === msg.id
                const cached = previewCache[msg.id]
                const isExpanded = expanded[msg.id] ?? false
                const displayText = cached ? (cached.hasMore && !isExpanded ? cached.preview : cached.full) : stripCode(msg.content)

                return (
                  <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', animation: 'fadeUp 200ms ease-out both' }}>

                    {/* Tutor avatar row */}
                    {!isUser && !msg.streaming && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg, #F78166, #E05A4E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: '#fff', flexShrink: 0 }}>МТ</div>
                        <span style={{ fontSize: 10, fontWeight: 600, color: '#6E7681' }}>{teachingLanguage === 'ru' ? 'Репетитор Макс' : 'Tutor Max'}</span>
                      </div>
                    )}

                    {/* Tutor bubble */}
                    {!isUser && (
                      <div className="group/bubble" style={{
                        maxWidth: '90%',
                        background: isSpeaking ? '#1C2128' : '#0D1117',
                        border: '1px solid #21262D',
                        borderLeft: '2px solid #F78166',
                        borderRadius: '0 12px 12px 12px',
                        padding: '10px 12px',
                        boxShadow: isSpeaking ? '0 0 20px rgba(247,129,102,0.15)' : 'none',
                        transition: 'all 200ms',
                      }}>
                        {msg.content
                          ? <div className="animate-message" style={{ fontSize: 13, lineHeight: 1.6, color: '#E6EDF3' }}>
                              <MessageContent text={displayText} isUser={false} />
                            </div>
                          : <TypingDots />
                        }

                        {cached?.hasMore && (
                          <button onClick={() => setExpanded((p) => ({ ...p, [msg.id]: !isExpanded }))}
                            style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: '#F78166', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            {isExpanded ? t('lesson_collapse') : t('lesson_read_more')}
                            <ChevronDown size={11} style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }} />
                          </button>
                        )}

                        {!msg.streaming && msg.content && (
                          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 10, color: '#484F58', fontFamily: 'var(--font-mono)' }}>
                              {new Date(msg.ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </span>
                            <button onClick={() => isSpeaking ? handleStopSpeech() : handleSpeak(msg.id, msg.content)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 8,
                                fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 150ms',
                                background: isSpeaking ? 'rgba(247,129,102,0.12)' : 'transparent',
                                color: isSpeaking ? '#F78166' : '#484F58',
                                border: `1px solid ${isSpeaking ? 'rgba(247,129,102,0.4)' : 'transparent'}`,
                              }}>
                              {isSpeaking
                                ? <><Square size={8} fill="currentColor" strokeWidth={0} />{t('lesson_stop')}</>
                                : <><Play size={8} fill="currentColor" strokeWidth={0} />{t('lesson_play')}</>}
                            </button>
                          </div>
                        )}

                        {/* Comprehension buttons after tutor message */}
                        {!msg.streaming && msg.content && (
                          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                            <button
                              onClick={() => sessionId && sendMessage(sessionId, teachingLanguage === 'ru' ? 'Понял' : 'Got it', true)}
                              disabled={isStreaming || !sessionId}
                              style={{
                                padding: '3px 10px', borderRadius: 20, fontSize: 11, cursor: 'pointer',
                                background: 'rgba(63,185,80,0.1)', color: '#3FB950',
                                border: '1px solid rgba(63,185,80,0.3)', transition: 'background 150ms',
                              }}>
                              ✓ {teachingLanguage === 'ru' ? 'Понял' : 'Got it'}
                            </button>
                            <button
                              onClick={() => sessionId && sendMessage(sessionId, teachingLanguage === 'ru' ? 'Не понял, объясни по-другому' : "I don't understand, explain differently", true)}
                              disabled={isStreaming || !sessionId}
                              style={{
                                padding: '3px 10px', borderRadius: 20, fontSize: 11, cursor: 'pointer',
                                background: 'rgba(248,81,73,0.1)', color: '#F85149',
                                border: '1px solid rgba(248,81,73,0.3)', transition: 'background 150ms',
                              }}>
                              ✗ {teachingLanguage === 'ru' ? 'Не понял' : 'Not clear'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Student bubble */}
                    {isUser && (
                      <div style={{ animation: 'slideInRight 200ms ease-out both', maxWidth: '75%' }}>
                        <div style={{
                          padding: '10px 12px', borderRadius: '12px 12px 0 12px', fontSize: 13, lineHeight: 1.5,
                          background: 'linear-gradient(135deg, #F78166, #E05A4E)', color: '#fff',
                        }}>
                          <MessageContent text={displayText} isUser={true} />
                        </div>
                        <p style={{ fontSize: 10, color: '#484F58', textAlign: 'right', marginTop: 3, fontFamily: 'var(--font-mono)' }}>
                          {new Date(msg.ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Thinking */}
              {isStreaming && messages.at(-1)?.streaming && !messages.at(-1)?.content && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#8B949E' }}>
                  <TypingDots />
                  <span>{teachingLanguage === 'ru' ? 'Думает...' : 'Thinking...'}</span>
                </div>
              )}

              <div ref={messagesEndRef} />

              {/* Scroll to bottom */}
              {!atBottom && (
                <button onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })}
                  style={{
                    position: 'sticky', bottom: 8, alignSelf: 'flex-end',
                    width: 26, height: 26, borderRadius: '50%',
                    background: '#F78166', color: '#fff', fontSize: 12, border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(247,129,102,0.4)',
                  }}>↓</button>
              )}
            </div>

            {/* ── Input area ──────────────────────────────────────────── */}
            <div style={{ flexShrink: 0, borderTop: '1px solid #21262D', background: '#0D1117', borderRadius: '0 0 16px 16px', padding: '10px 12px' }}>

              {/* Image preview */}
              {selectedImage && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedImage.preview} alt="preview" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6, border: '1px solid #21262D' }} />
                  <span style={{ fontSize: 11, color: '#F78166', flex: 1 }}>📸 {teachingLanguage === 'ru' ? 'Изображение выбрано' : 'Image selected'}</span>
                  <button onClick={() => setSelectedImage(null)} style={{ color: '#6E7681', background: 'none', border: 'none', cursor: 'pointer' }}><X size={13} /></button>
                </div>
              )}

              {/* File badge */}
              {attachedFile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 500, background: 'rgba(121,192,255,0.1)', color: '#79C0FF', border: '1px solid rgba(121,192,255,0.2)' }}>
                    <Paperclip size={10} /> {attachedFile.name}
                  </span>
                  <button onClick={() => setAttachedFile(null)} style={{ color: '#6E7681', background: 'none', border: 'none', cursor: 'pointer' }}><X size={13} /></button>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                {/* Attach */}
                <input ref={fileInputRef} type="file" accept=".py,.c,.cpp,.txt" className="hidden" onChange={handleFileSelect} />
                <button onClick={() => fileInputRef.current?.click()} disabled={isStreaming || !sessionId}
                  style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0, cursor: 'pointer',
                    background: attachedFile ? 'rgba(121,192,255,0.1)' : 'transparent',
                    color: attachedFile ? '#79C0FF' : '#6E7681',
                    border: `1px solid ${attachedFile ? 'rgba(121,192,255,0.3)' : '#30363D'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  <Paperclip size={13} />
                </button>

                {/* Camera */}
                <input ref={imageInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageSelect} />
                <button onClick={() => imageInputRef.current?.click()} disabled={isStreaming || !sessionId}
                  style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0, cursor: 'pointer', fontSize: 14,
                    background: selectedImage ? 'rgba(247,129,102,0.12)' : 'transparent',
                    color: selectedImage ? '#F78166' : '#6E7681',
                    border: `1px solid ${selectedImage ? 'rgba(247,129,102,0.3)' : '#30363D'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  📸
                </button>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  disabled={isStreaming || !sessionId}
                  placeholder={micState === 'recording' ? t('lesson_recording') : isStreaming ? t('lesson_responding') : t('lesson_placeholder')}
                  rows={1}
                  style={{
                    flex: 1, padding: '7px 10px', borderRadius: 10, resize: 'none', outline: 'none', fontSize: 13, lineHeight: 1.5,
                    background: '#161B22',
                    border: `1px solid ${micState === 'recording' ? '#F85149' : input ? '#F78166' : '#30363D'}`,
                    color: '#E6EDF3',
                    fontFamily: 'inherit',
                    minHeight: 34, maxHeight: 96,
                    boxShadow: input ? '0 0 0 3px rgba(247,129,102,0.1)' : 'none',
                    transition: 'border-color 150ms, box-shadow 150ms',
                  }}
                />

                {/* Mic */}
                {micSupported && (
                  <button onClick={handleMicClick} disabled={isStreaming || !sessionId}
                    className={micState === 'recording' ? 'mic-rec' : ''}
                    style={micState === 'recording' ? { width: 32, height: 32, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' } : {
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: '#161B22', color: '#6E7681', border: '1px solid #30363D',
                    }}>
                    {micState === 'recording'
                      ? <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 7, fontWeight: 700, gap: 1 }}><Mic size={11} />REC</span>
                      : <Mic size={14} />}
                  </button>
                )}

                {/* Send */}
                <button onClick={handleSend}
                  disabled={(!input.trim() && !attachedFile && !selectedImage) || isStreaming || !sessionId}
                  style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none',
                    background: '#F78166', color: '#fff',
                    boxShadow: '0 2px 8px rgba(247,129,102,0.35)',
                    opacity: (!input.trim() && !attachedFile && !selectedImage) || isStreaming || !sessionId ? 0.4 : 1,
                    transition: 'opacity 150ms',
                  }}>
                  <Send size={14} style={{ transform: 'translateX(1px)' }} />
                </button>
              </div>

              <p style={{ fontSize: 10, color: '#484F58', textAlign: 'center', marginTop: 6 }}>
                {t('lesson_hint')}{micSupported ? ' · 🎙' : ''}
              </p>
            </div>
          </div>
        </Panel>

      </div>{/* end grid */}

      {/* ══ @keyframes spin (inline) ════════════════════════════════════ */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 767px) {
          .lesson-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Check, ChevronDown, ChevronUp, Copy, Loader2, Mic, Paperclip, Play, Send, Square, X } from 'lucide-react'
import { useLanguage, LanguageToggle } from '@/components/ui/LanguageToggle'
import { speakText, stopSpeaking, type VoiceType, type TeachingLang } from '@/lib/tts'

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

const TUTOR_AVATAR_SRC = 'https://ui-avatars.com/api/?name=Max+Tutor&background=F78166&color=fff&bold=true&size=64'

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
  const codeStyle = `px-1.5 py-0.5 rounded text-[0.82em] font-mono ${isUser ? 'bg-white/20' : 'bg-black/30'}`
  return (
    <div className="space-y-1">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        if (line.match(/^#+\s/)) return <p key={i} className="font-bold" style={{ color: 'var(--text-primary)' }}>{renderInline(line.replace(/^#+\s/, ''), `${i}`, codeStyle)}</p>
        const bullet = line.match(/^[-•*]\s+(.*)$/)
        if (bullet) return (
          <div key={i} className="flex gap-2">
            <span className="mt-0.5 shrink-0 text-xs" style={{ color: 'var(--accent-primary)' }}>▸</span>
            <span>{renderInline(bullet[1], `${i}`, codeStyle)}</span>
          </div>
        )
        const num = line.match(/^(\d+)\.\s+(.*)$/)
        if (num) return (
          <div key={i} className="flex gap-2">
            <span className="tabular-nums text-xs mt-0.5 shrink-0 font-mono" style={{ color: 'var(--accent-primary)' }}>{num[1]}.</span>
            <span>{renderInline(num[2], `${i}`, codeStyle)}</span>
          </div>
        )
        return <p key={i}>{renderInline(line, `${i}`, codeStyle)}</p>
      })}
    </div>
  )
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
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
type ActiveTab = 'code' | 'chat'
type CurriculumLesson = { id: string; subjectCode: string; unit: number; unitTitle: string; lesson: number; lessonTitle: string; lessonGoal: string; order: number }
type CurriculumProgress = { currentLesson: number; completedLessons: number[] }

interface Props {
  subjectSlug: string; subjectName: string; levelDescription: string; voiceChoice: string
  teachingLanguage?: TeachingLang
  memoryContext?: string | null; pastSessionsSummary?: string | null
  subjects?: {slug:string;name:string}[]; displayName?: string; userId?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
export function LessonScreen({ subjectSlug, subjectName, levelDescription, voiceChoice, teachingLanguage = 'ru', memoryContext, pastSessionsSummary, displayName, userId }: Props) {
  const { t, lang: uiLang } = useLanguage()

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
  const filename = FILENAME[subjectSlug] ?? 'урок.txt'
  const terminalCmd = subjectSlug === 'python' ? `python ${filename}` :
    subjectSlug === 'c' ? `gcc ${filename} -o урок && ./урок` :
    subjectSlug === 'cpp' ? `g++ ${filename} -o урок && ./урок` :
    filename
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
    const subjectMap: Record<string, string> = { c: 'c', cpp: 'cpp', python: 'python', english: 'english' }
    const code = subjectMap[subjectSlug]
    if (!code) return
    fetch(`/api/curriculum?subject=${code}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setCurriculumLessons(data.lessons ?? [])
          setCurriculumProgress(data.progress ?? { currentLesson: 1, completedLessons: [] })
        }
      })
      .catch(() => {})
  }, [subjectSlug])

  // Detect lesson completion
  const handleLessonComplete = useCallback(async (lessonOrder: number) => {
    const subjectMap: Record<string, string> = { c: 'c', cpp: 'cpp', python: 'python', english: 'english' }
    const code = subjectMap[subjectSlug]
    if (!code) return
    try {
      const res = await fetch('/api/curriculum/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectCode: code, completedLesson: lessonOrder }),
      })
      const data = await res.json()
      if (data.success) {
        setCurriculumProgress(data.progress)
        setXpCelebration(true)
        setTimeout(() => setXpCelebration(false), 3000)
      }
    } catch { /* ignore */ }
  }, [subjectSlug])

  // TTS
  const handleStopSpeech = useCallback(() => {
    stopSpeaking(); speakingIdRef.current = null; setSpeakingId(null)
  }, [])
  const handleSpeak = useCallback((id: string, text: string) => {
    speakingIdRef.current = id; setSpeakingId(id)
    speakText(text, teachingLanguage, voiceType, () => {
      if (speakingIdRef.current === id) { speakingIdRef.current = null; setSpeakingId(null) }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teachingLanguage, voiceType])
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
        { token: 'comment',        foreground: '6E7681', fontStyle: 'italic' },
        { token: 'keyword',        foreground: 'FF7B72', fontStyle: 'bold'   },
        { token: 'string',         foreground: 'A5D6FF'                      },
        { token: 'number',         foreground: 'F2CC60'                      },
        { token: 'type',           foreground: '79C0FF'                      },
        { token: 'function',       foreground: 'D2A8FF'                      },
        { token: 'variable',       foreground: 'F0F6FC'                      },
        { token: 'operator',       foreground: 'FF7B72'                      },
      ],
      colors: {
        'editor.background':                  '#0D1117',
        'editor.foreground':                  '#F0F6FC',
        'editorCursor.foreground':            '#F78166',
        'editorLineNumber.foreground':        '#484F58',
        'editorLineNumber.activeForeground':  '#8B949E',
        'editor.selectionBackground':         '#264F78',
        'editor.lineHighlightBackground':     '#161B22',
        'editorGutter.background':            '#0D1117',
        'scrollbarSlider.background':         '#21262D',
        'scrollbarSlider.hoverBackground':    '#30363D',
      },
    })
  }, [])

  // Run code
  const handleRunCode = useCallback(async () => {
    if (isRunning) return
    setIsRunning(true); setTerminalOutput('> Выполнение...'); setTerminalIsError(false); setTerminalDone(false)
    try {
      const res = await fetch('/api/learn/run', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, stdin: stdinInput }),
      })
      const data = await res.json() as { success?: boolean; output?: string; error?: string }
      if (!data.success) {
        setTerminalOutput(data.error ?? '(ошибка)')
        setTerminalIsError(true)
      } else {
        setTerminalOutput(data.output ?? '(нет вывода)')
        setTerminalIsError(false)
      }
    } catch (err) {
      setTerminalOutput(`Ошибка: ${err instanceof Error ? err.message : String(err)}`)
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
      // Detect lesson completion — explicit marker or keyword fallback
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
  }, [handleSpeak, curriculumLessons, curriculumProgress.currentLesson, handleLessonComplete])

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
  }, [subjectSlug, subjectName, levelDescription, memoryContext, pastSessionsSummary, sendMessage])

  // Vision send
  async function sendImageMessage(sid: string) {
    if (!selectedImage) return
    const question = input.trim()
    const imgData = selectedImage
    setSelectedImage(null)
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setIsStreaming(true)
    // Show student message with thumbnail
    const uid = `u-${Date.now()}`
    setMessages((p) => [...p, {
      id: uid, role: 'user',
      content: `📸 [Изображение]${question ? '\n' + question : ''}`,
      ts: Date.now(),
    }])
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
    // Image takes priority
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

  // Mic — MediaRecorder + Groq Whisper STT
  function stopRecording() {
    if (mediaRecorderRef.current && micState === 'recording') {
      mediaRecorderRef.current.stop()
    }
  }
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, sampleRate: 16000 } })
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm'
      const recorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = recorder
      audioChunksRef.current = []

      recorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('audio', audioBlob, 'recording.webm')
        formData.append('lang', teachingLanguage || 'en')
        try {
          const res = await fetch('/api/stt', { method: 'POST', body: formData })
          if (res.ok) {
            const data = await res.json()
            if (data.text?.trim()) setInput((prev) => prev ? prev + ' ' + data.text : data.text)
          }
        } catch (err) { console.error('STT request error:', err) }
        stream.getTracks().forEach((t) => t.stop())
        setMicState('idle')
        textareaRef.current?.focus()
      }

      recorder.start(250)
      setMicState('recording')
    } catch (err: any) {
      console.error('Microphone access error:', err.message)
      setMicState('idle')
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

  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-base)' }}>
        <div className="text-center">
          <div className="text-4xl mb-4 text-red-400">⚠</div>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>{initError}</p>
          <Link href="/dashboard" className="text-sm" style={{ color: 'var(--accent-primary)' }}>{t('lesson_back_base')}</Link>
        </div>
      </div>
    )
  }

  // ── Main layout ──────────────────────────────────────────────────────────────
  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>

      {/* XP Celebration */}
      {xpCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="text-center animate-bounce">
            <div className="text-5xl mb-2">🎉</div>
            <div className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>+10 XP</div>
            <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {teachingLanguage === 'ru' ? 'Урок завершён!' : teachingLanguage === 'hi' ? 'Lesson complete!' : 'Lesson complete!'}
            </div>
          </div>
        </div>
      )}

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <header className="flex items-center gap-4 px-4 shrink-0" style={{ height: 52, background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)' }}>
        <Link href="/dashboard" className="text-sm font-medium transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)' }}>
          {t('lesson_back')}
        </Link>

        <div className="h-4 w-px" style={{ background: 'var(--border-default)' }} />

        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: 'var(--bg-elevated)', color: badge.accent }}>{badge.label}</span>
          <span className="text-base leading-none" title={teachingLanguage}>{LANG_FLAG[teachingLanguage]}</span>
          {curriculumLessons.length > 0 && (() => {
            const cur = curriculumLessons.find((l) => l.order === curriculumProgress.currentLesson) ?? curriculumLessons[0]
            return (
              <span className="hidden sm:inline text-xs px-2 py-0.5 rounded" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                {teachingLanguage === 'ru' ? `Урок ${cur.order}/${curriculumLessons.length}: ${cur.lessonTitle}` :
                 teachingLanguage === 'hi' ? `Lesson ${cur.order}/${curriculumLessons.length}: ${cur.lessonTitle}` :
                 `Lesson ${cur.order}/${curriculumLessons.length}: ${cur.lessonTitle}`}
              </span>
            )
          })()}
          <span style={{ color: 'var(--text-secondary)' }}>{t('lesson_with')}</span>
          <span className="font-mono tabular-nums text-xs" style={{ color: 'var(--text-secondary)' }}>{formatTimer(elapsed)}</span>
        </div>

        <div className="flex-1" />

        {/* Voice buttons */}
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
          {(['male', 'female', 'warm'] as VoiceType[]).map((k) => (
            <button key={k} onClick={() => handleVoiceChange(k)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150"
              style={{
                background: voiceType === k ? 'var(--accent-primary)' : 'transparent',
                color: voiceType === k ? '#fff' : 'var(--text-secondary)',
              }}>
              {VOICE_LABELS_BY_LANG[uiLang as TeachingLang]?.[k] ?? VOICE_LABELS_BY_LANG.en[k]}
            </button>
          ))}
        </div>

        <LanguageToggle />
      </header>

      {/* ── Mobile tabs ──────────────────────────────────────────────────────── */}
      <div className="flex lg:hidden shrink-0" style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--bg-surface)' }}>
        {(['code','chat'] as ActiveTab[]).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="flex-1 py-2.5 text-sm font-semibold transition-colors"
            style={{
              color: activeTab === tab ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === tab ? `2px solid var(--accent-primary)` : '2px solid transparent',
            }}>
            {tab === 'code' ? t('lesson_tab_code') : t('lesson_tab_chat')}
          </button>
        ))}
      </div>

      {/* ── Split layout ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Code editor ─────────────────────────────────────────────── */}
        <section className={`flex flex-col ${activeTab === 'code' ? 'flex' : 'hidden'} lg:flex`}
          style={{ width: '55%', borderRight: '1px solid var(--border-default)' }}>

          {/* Editor header */}
          <div className="flex items-center gap-3 px-4 shrink-0"
            style={{ height: 40, background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-default)' }}>
            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'var(--bg-hover)', color: badge.accent }}>{badge.label}</span>
            <span className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{filename}</span>
            <span className="animate-pulse" style={{ color: 'var(--accent-primary)' }}>_</span>
            <button onClick={handleCopy} className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: copied ? 'rgba(86,211,100,0.1)' : 'var(--bg-hover)',
                color: copied ? 'var(--accent-green)' : 'var(--text-secondary)',
                border: `1px solid ${copied ? 'rgba(86,211,100,0.3)' : 'var(--border-default)'}`,
              }}>
              {copied ? <><Check size={11} strokeWidth={3} /> {t('lesson_copied')}</> : <><Copy size={11} /> {t('lesson_copy')}</>}
            </button>
          </div>

          {/* Monaco */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <MonacoEditor
              height="100%" language={language} value={code} theme="mytutor"
              beforeMount={handleEditorBeforeMount}
              options={{
                readOnly: true, fontSize: 13, lineHeight: 1.75,
                fontFamily: 'var(--font-mono), "JetBrains Mono", "Fira Code", monospace',
                fontLigatures: true,
                minimap: { enabled: false }, scrollBeyondLastLine: false, wordWrap: 'on',
                padding: { top: 16, bottom: 16 }, renderLineHighlight: 'all',
                lineNumbers: 'on', automaticLayout: true,
                folding: false, glyphMargin: false, contextmenu: false,
                renderWhitespace: 'none', hideCursorInOverviewRuler: true,
                overviewRulerBorder: false, overviewRulerLanes: 0,
              }}
            />
          </div>

          {/* Status bar */}
          <div className="editor-statusbar">
            {isStreaming
              ? <span style={{ color: 'var(--accent-primary)' }}>{t('lesson_thinking')}</span>
              : <span style={{ color: 'var(--accent-green)' }}>{t('lesson_ready')}</span>
            }
            <span className="ml-auto flex gap-3">
              <span>{badge.label}</span>
              <span style={{ color: 'var(--text-dim)' }}>·</span>
              <span>UTF-8</span>
              <span style={{ color: 'var(--text-dim)' }}>·</span>
              <span>{filename}</span>
            </span>
          </div>

          {/* Terminal toggle */}
          <div className="flex items-center px-4 shrink-0 cursor-pointer select-none transition-colors"
            style={{ height: 36, background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-default)' }}
            onClick={() => setTerminalOpen((o) => !o)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-hover)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-elevated)' }}>
            <span className="flex items-center gap-2 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
              {terminalOpen ? <ChevronDown size={11} /> : <ChevronUp size={11} />}
              {t('lesson_terminal')}
              {terminalOpen && <span style={{ color: 'var(--text-dim)', marginLeft: 4 }}>$ {terminalCmd}</span>}
            </span>
            {terminalOpen && (
              <button onClick={(e) => { e.stopPropagation(); handleRunCode() }}
                disabled={isRunning}
                className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all disabled:opacity-40"
                style={{ background: 'rgba(86,211,100,0.08)', color: 'var(--accent-green)', border: '1px solid rgba(86,211,100,0.25)' }}>
                {isRunning ? <><Loader2 size={10} className="animate-spin" />{t('lesson_running')}</> : <><Play size={10} fill="currentColor" strokeWidth={0} />{t('lesson_run')}</>}
              </button>
            )}
          </div>
          {terminalOpen && (
            <div className="shrink-0 flex flex-col" style={{ height: 220, background: '#0D1117', borderTop: '1px solid var(--border-default)' }}>
              {/* Output area */}
              <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed">
                {terminalOutput && terminalOutput !== '> Выполнение...'
                  ? <>
                      <pre className="whitespace-pre-wrap break-words" style={{ color: terminalIsError ? '#FF6B6B' : 'var(--accent-green)' }}>{terminalOutput}</pre>
                      {terminalDone && <div className="mt-2 pt-2" style={{ color: 'var(--text-dim)', borderTop: '1px solid #21262D' }}>--- Выполнение завершено ---</div>}
                    </>
                  : terminalOutput === '> Выполнение...'
                  ? <span style={{ color: '#E3B341' }}>{terminalOutput}</span>
                  : <span style={{ color: 'var(--text-dim)' }}>$ {terminalCmd}</span>
                }
              </div>
              {/* Stdin input */}
              <div className="flex items-center gap-2 px-4 py-2 shrink-0" style={{ borderTop: '1px solid #21262D' }}>
                <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>stdin:</span>
                <input
                  type="text"
                  value={stdinInput}
                  onChange={(e) => setStdinInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleRunCode() } }}
                  placeholder="Ввод для программы..."
                  className="flex-1 bg-transparent font-mono text-xs outline-none"
                  style={{ color: 'var(--text-primary)', caretColor: 'var(--accent-green)' }}
                />
              </div>
            </div>
          )}
        </section>

        {/* ── RIGHT: Chat ──────────────────────────────────────────────────── */}
        <section className={`flex flex-col flex-1 min-w-0 ${activeTab === 'chat' ? 'flex' : 'hidden'} lg:flex`}>

          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 shrink-0"
            style={{ height: 56, background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TUTOR_AVATAR_SRC} alt="Репетитор Макс" className="w-9 h-9 rounded-full object-cover shrink-0" style={{ boxShadow: '0 0 12px rgba(247,129,102,0.35)' }} />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{t('lesson_tutor')}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="online-dot" />
                <span className="text-xs" style={{ color: 'var(--accent-green)' }}>● {t('lesson_online')}</span>
                <span style={{ color: 'var(--text-dim)' }}>·</span>
                <span className="text-xs uppercase" style={{ color: 'var(--text-dim)' }}>{subjectName}</span>
              </div>
            </div>
            {speakingId && (
              <div className="flex items-end gap-0.5 h-5">
                {[0,0.15,0.3,0.45].map((d,i) => (
                  <span key={i} className="wave-bar" style={{ animationDelay: `${d}s`, height: '12px' }} />
                ))}
                <span className="text-xs ml-2" style={{ color: 'var(--accent-primary)' }}>{t('lesson_speaking')}</span>
              </div>
            )}
          </div>

          {/* Messages */}
          <div ref={messagesAreaRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-5 dot-grid scroll-smooth relative">

            {/* Loading state */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={TUTOR_AVATAR_SRC} alt="Репетитор Макс" className="w-14 h-14 rounded-full object-cover" style={{ boxShadow: '0 0 24px rgba(247,129,102,0.4)' }} />
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('lesson_init')}</p>
                <div className="flex gap-1.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
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
                <div key={msg.id} className={`group flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>

                  {/* Tutor label */}
                  {!isUser && !msg.streaming && (
                    <div className="flex items-center gap-2 mb-1.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={TUTOR_AVATAR_SRC} alt="МТ" className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>{t('lesson_tutor')}</span>
                    </div>
                  )}

                  {/* Tutor bubble */}
                  {!isUser && (
                    <div className="max-w-[88%] relative group/bubble"
                      style={{
                        background: isSpeaking ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                        borderLeft: `3px solid var(--accent-primary)`,
                        borderRadius: '0 12px 12px 12px',
                        padding: '12px 16px',
                        boxShadow: isSpeaking ? `0 0 20px rgba(247,129,102,0.15)` : 'none',
                        transition: 'all 0.2s',
                      }}>
                      {msg.content
                        ? <div className="animate-message text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                            <MessageContent text={displayText} isUser={false} />
                          </div>
                        : <TypingDots />
                      }

                      {cached?.hasMore && (
                        <button onClick={() => setExpanded((p) => ({ ...p, [msg.id]: !isExpanded }))}
                          className="mt-2 flex items-center gap-1 text-xs font-semibold transition-colors"
                          style={{ color: 'var(--accent-primary)' }}>
                          {isExpanded ? t('lesson_collapse') : t('lesson_read_more')}
                          <ChevronDown size={11} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}

                      {!msg.streaming && msg.content && (
                        <div className={`mt-3 transition-opacity ${isSpeaking ? 'opacity-100' : 'opacity-0 group-hover/bubble:opacity-100'}`}>
                          <button onClick={() => isSpeaking ? handleStopSpeech() : handleSpeak(msg.id, msg.content)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
                            style={{
                              background: isSpeaking ? 'rgba(247,129,102,0.12)' : 'var(--bg-elevated)',
                              color: isSpeaking ? 'var(--accent-primary)' : 'var(--text-secondary)',
                              border: `1px solid ${isSpeaking ? 'var(--border-accent)' : 'var(--border-default)'}`,
                            }}>
                            {isSpeaking
                              ? <><Square size={9} fill="currentColor" strokeWidth={0} />{t('lesson_stop')}</>
                              : <><Play size={9} fill="currentColor" strokeWidth={0} />{t('lesson_play')}</>
                            }
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Student bubble */}
                  {isUser && (
                    <div className="flex items-end gap-2 max-w-[88%]">
                      <div className="px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed animate-message"
                        style={{
                          background: 'var(--accent-primary)',
                          color: '#fff',
                          boxShadow: '0 2px 12px rgba(247,129,102,0.3)',
                        }}>
                        <MessageContent text={displayText} isUser={true} />
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={studentAvatarSrc} alt={displayName ?? 'Student'} className="w-6 h-6 rounded-full object-cover shrink-0" />
                    </div>
                  )}

                  {/* Timestamp */}
                  {msg.content && !msg.streaming && (
                    <span className="font-mono text-[9px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-dim)' }}>
                      {new Date(msg.ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              )
            })}

            {/* Thinking label */}
            {isStreaming && messages.at(-1)?.streaming && !messages.at(-1)?.content && (
              <div className="flex items-center gap-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <TypingDots />
                <span>{t('lesson_thinking_label')}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Scroll-to-bottom button */}
          {!atBottom && (
            <button onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })}
              className="absolute bottom-24 right-6 w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold shadow-lg transition-all"
              style={{ background: 'var(--accent-primary)', color: '#fff', zIndex: 10 }}>
              {t('lesson_scroll_down')}
            </button>
          )}

          {/* ── Input bar ──────────────────────────────────────────────────── */}
          <div className="shrink-0 px-4 pt-3 pb-4" style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-default)' }}>

            {/* Image preview */}
            {selectedImage && (
              <div className="flex items-center gap-2 mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedImage.preview} alt="preview" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border-default)' }} />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--accent-primary)' }}>📸 Изображение выбрано</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Нажми Отправить чтобы отправить репетитору</span>
                </div>
                <button onClick={() => setSelectedImage(null)} className="ml-auto" style={{ color: 'var(--text-dim)' }}><X size={13} /></button>
              </div>
            )}

            {/* File badge */}
            {attachedFile && (
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                  style={{ background: 'rgba(121,192,255,0.1)', color: 'var(--accent-secondary)', border: '1px solid rgba(121,192,255,0.2)' }}>
                  <Paperclip size={10} /> {attachedFile.name}
                </span>
                <button onClick={() => setAttachedFile(null)} style={{ color: 'var(--text-dim)' }}><X size={13} /></button>
              </div>
            )}

            <div className="flex items-end gap-2">
              {/* Attach */}
              <input ref={fileInputRef} type="file" accept=".py,.c,.cpp,.txt" className="hidden" onChange={handleFileSelect} />
              <button onClick={() => fileInputRef.current?.click()} disabled={isStreaming || !sessionId}
                title={t('lesson_attach_hint')}
                className="flex items-center justify-center rounded-xl transition-all shrink-0 disabled:opacity-40"
                style={{
                  width: 40, height: 40,
                  background: attachedFile ? 'rgba(121,192,255,0.1)' : 'var(--bg-hover)',
                  color: attachedFile ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                  border: `1px solid ${attachedFile ? 'rgba(121,192,255,0.3)' : 'var(--border-default)'}`,
                }}>
                <Paperclip size={15} />
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
                className="flex-1 px-4 py-2.5 rounded-xl resize-none outline-none text-sm leading-relaxed transition-all disabled:opacity-40"
                style={{
                  background: 'var(--bg-surface)',
                  border: `1px solid ${micState === 'recording' ? '#EF4444' : 'var(--border-default)'}`,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  minHeight: 40, maxHeight: 96,
                  boxShadow: input ? '0 0 0 2px rgba(247,129,102,0.15)' : 'none',
                  borderColor: input ? 'var(--accent-primary)' : micState === 'recording' ? '#EF4444' : 'var(--border-default)',
                }}
              />

              {/* Camera / Image */}
              <input ref={imageInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageSelect} />
              <button onClick={() => imageInputRef.current?.click()} disabled={isStreaming || !sessionId}
                title="Сфотографировать код или ошибку"
                className="flex items-center justify-center rounded-xl shrink-0 transition-all disabled:opacity-40"
                style={{
                  width: 40, height: 40,
                  background: selectedImage ? 'rgba(247,129,102,0.12)' : 'var(--bg-hover)',
                  color: selectedImage ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${selectedImage ? 'var(--accent-primary)' : 'var(--border-default)'}`,
                  fontSize: 17,
                }}>
                📸
              </button>

              {/* Mic */}
              {micSupported && (
                <button onClick={handleMicClick} disabled={isStreaming || !sessionId}
                  className={`flex items-center justify-center rounded-xl shrink-0 transition-all disabled:opacity-40 ${micState === 'recording' ? 'mic-rec' : ''}`}
                  style={micState === 'recording' ? { width: 40, height: 40 } : {
                    width: 40, height: 40,
                    background: 'var(--bg-hover)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-default)',
                  }}>
                  {micState === 'recording'
                    ? <span className="flex flex-col items-center gap-0.5 text-[8px] font-bold"><Mic size={13} />REC</span>
                    : <Mic size={16} />
                  }
                </button>
              )}

              {/* Send */}
              <button onClick={handleSend} disabled={(!input.trim() && !attachedFile && !selectedImage) || isStreaming || !sessionId}
                className="flex items-center justify-center rounded-xl shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ width: 40, height: 40, background: 'var(--accent-primary)', color: '#fff', boxShadow: '0 2px 8px rgba(247,129,102,0.35)' }}>
                <Send size={16} className="translate-x-px" />
              </button>
            </div>

            <p className="text-center mt-2.5 text-[10px]" style={{ color: 'var(--text-dim)' }}>
              {t('lesson_hint')}{micSupported ? ' · 🎙 голосовой ввод' : ''}
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}

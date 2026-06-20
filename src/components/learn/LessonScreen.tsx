'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Check, ChevronDown, ChevronUp, Copy, Loader2, Mic, Paperclip, Play, Send, Square, X } from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { useCountry, useTheme } from '@/components/Providers'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { speakText, stopSpeaking, VOICE_SPEED_OPTIONS, type VoiceType, type TeachingLang } from '@/lib/tts'
import { useDraftMessage, clearDraft } from '@/lib/hooks/useDraftMessage'
import { LearnerPositionPanel, LockedTopicDetail } from '@/components/learn/LearnerPositionPanel'
import { recordLastLesson } from '@/lib/hooks/useLastLesson'
import { PracticePanel } from '@/components/learn/PracticePanel'
import { InsightsPanel } from '@/components/learn/InsightsPanel'
import { FinalAssessmentModal } from '@/components/learn/FinalAssessmentModal'
import { VisualCard } from '@/components/school/visuals/VisualCard'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
// Visual Learning Sprint B: data-driven visuals (graph / number_line). Additive
// to the existing Sprint BW static VisualCard path — see render block below.
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import { parseVisualSpec, type VisualSpec } from '@/lib/visuals/visualSpec'
import { Card, CandyButton, Pill, EagleMascot, useConfetti } from '@/components/ui/candy'
import styles from './LessonScreen.module.css'

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
  c:          { label: 'C',          accent: '#F78166' },
  cpp:        { label: 'C++',        accent: '#79C0FF' },
  python:     { label: 'Python',     accent: '#56D364' },
  english:    { label: 'English',    accent: '#E3B341' },
  javascript: { label: 'JavaScript', accent: '#F0DB4F' },
  typescript: { label: 'TypeScript', accent: '#3178C6' },
  java:       { label: 'Java',       accent: '#E76F00' },
  csharp:     { label: 'C#',         accent: '#A179DC' },
  go:         { label: 'Go',         accent: '#00ADD8' },
  rust:       { label: 'Rust',       accent: '#DEA584' },
  russian:    { label: 'Russian',    accent: '#F78166' },
  hindi:      { label: 'Hindi',      accent: '#FF9933' },
  german:     { label: 'German',     accent: '#FFCE00' },
  arabic:     { label: 'Arabic',     accent: '#2EA043' },
  mathematics:{ label: 'Math',       accent: '#A78BFA' },
  physics:    { label: 'Physics',    accent: '#79C0FF' },
  chemistry:  { label: 'Chemistry',  accent: '#F78166' },
  biology:    { label: 'Biology',    accent: '#2EA043' },
}
// Subjects that aren't programming languages render their lesson canvas as markdown/plaintext.
const NON_CODE_SUBJECTS = ['english', 'russian', 'hindi', 'german', 'arabic', 'mathematics', 'physics', 'chemistry', 'biology']
const LANG_MAP: Record<string, string> = {
  c: 'c', cpp: 'cpp', python: 'python', javascript: 'javascript', typescript: 'typescript',
  java: 'java', csharp: 'csharp', go: 'go', rust: 'rust',
  ...Object.fromEntries(NON_CODE_SUBJECTS.map((s) => [s, 'markdown'])),
}
const FILENAME: Record<string, string> = {
  c: 'lesson.c', cpp: 'lesson.cpp', python: 'lesson.py', javascript: 'lesson.js', typescript: 'lesson.ts',
  java: 'Lesson.java', csharp: 'Lesson.cs', go: 'lesson.go', rust: 'lesson.rs',
  ...Object.fromEntries(NON_CODE_SUBJECTS.map((s) => [s, 'lesson.md'])),
}
const INITIAL_CODE: Record<string, string> = {
  c: '// Waiting for first lesson...\n',
  cpp: '// Waiting for first lesson...\n',
  python: '# Waiting for first lesson...\n',
  javascript: '// Waiting for first lesson...\n',
  typescript: '// Waiting for first lesson...\n',
  java: '// Waiting for first lesson...\n',
  csharp: '// Waiting for first lesson...\n',
  go: '// Waiting for first lesson...\n',
  rust: '// Waiting for first lesson...\n',
  ...Object.fromEntries(NON_CODE_SUBJECTS.map((s) => [s, '<!-- Waiting for first lesson... -->\n'])),
}
const EXT_LANG: Record<string, string> = { py: 'python', c: 'c', cpp: 'cpp', js: 'javascript', ts: 'typescript', txt: 'text' }

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
  const codeStyle = `px-1.5 py-0.5 rounded text-[0.82em] font-mono ${isUser ? 'bg-white/20' : 'bg-black/30'} ${isUser ? '' : 'text-[var(--coral)]'}`
  return (
    <div className="space-y-1">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        if (line.match(/^#+\s/)) return <p key={i} className="font-bold" style={{ color: 'var(--text-primary)' }}>{renderInline(line.replace(/^#+\s/, ''), `${i}`, codeStyle)}</p>
        const bullet = line.match(/^[-•*]\s+(.*)$/)
        if (bullet) return (
          <div key={i} className="flex gap-2">
            <span className="mt-0.5 shrink-0 text-xs" style={{ color: 'var(--coral)' }}>▸</span>
            <span>{renderInline(bullet[1], `${i}`, codeStyle)}</span>
          </div>
        )
        const num = line.match(/^(\d+)\.\s+(.*)$/)
        if (num) return (
          <div key={i} className="flex gap-2">
            <span className="tabular-nums text-xs mt-0.5 shrink-0 font-mono" style={{ color: 'var(--coral)' }}>{num[1]}.</span>
            <span>{renderInline(num[2], `${i}`, codeStyle)}</span>
          </div>
        )
        return <p key={i}>{renderInline(line, `${i}`, codeStyle)}</p>
      })}
    </div>
  )
}

// ─── LessonDocument ─────────────────────────────────────────────────────────
// Eagle UI alignment sprint: renders the lesson canvas for non-programming
// subjects (NON_CODE_SUBJECTS) as a formatted learning document — headings,
// callout blocks (Concept/Example/Important/Remember/Definition/Formula),
// lists and fenced blocks — instead of raw markdown text inside Monaco.
// Programming subjects keep the unmodified Monaco code editor.
type CalloutKind = 'concept' | 'example' | 'important' | 'remember' | 'definition' | 'formula' | 'visual' | 'note'
type LessonBlock =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'callout'; kind: CalloutKind; lines: string[] }
  | { type: 'fence'; lang: string; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'paragraph'; lines: string[] }

const CALLOUT_STYLE: Record<CalloutKind, { icon: string; label: string; color: string; bg: string }> = {
  concept:    { icon: '💡', label: 'Concept',    color: 'var(--blue)',           bg: 'var(--blue-muted)' },
  example:    { icon: '✏️', label: 'Example',    color: 'var(--green)',          bg: 'var(--green-muted)' },
  important:  { icon: '⚠️', label: 'Important',  color: 'var(--coral)',          bg: 'var(--coral-muted)' },
  remember:   { icon: '🔑', label: 'Remember',   color: 'var(--purple)',         bg: 'var(--purple-muted)' },
  definition: { icon: '📖', label: 'Definition', color: 'var(--yellow)',         bg: 'var(--yellow-muted)' },
  formula:    { icon: '🧮', label: 'Formula',    color: 'var(--coral)',          bg: 'var(--coral-muted)' },
  visual:     { icon: '📊', label: 'Visual',     color: 'var(--blue)',           bg: 'var(--blue-muted)' },
  note:       { icon: '📝', label: 'Note',       color: 'var(--border-emphasis)', bg: 'var(--bg-elevated)' },
}
const CALLOUT_RE = /^\*{0,2}(concept|example|important|remember|definition|formula)\*{0,2}:?\*{0,2}\s*(.*)$/i
const CODE_LANGS = new Set(['py', 'python', 'js', 'javascript', 'ts', 'typescript', 'c', 'cpp', 'c++', 'java', 'csharp', 'cs', 'go', 'rust'])

function parseLessonBlocks(text: string): LessonBlock[] {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const blocks: LessonBlock[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }

    const heading = line.match(/^(#{1,3})\s+(.*)$/)
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length as 1 | 2 | 3, text: heading[2].trim() })
      i++; continue
    }

    const fence = line.match(/^```\s*(\w*)/)
    if (fence) {
      const lang = fence[1] ?? ''
      const body: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) { body.push(lines[i]); i++ }
      i++ // skip closing fence
      blocks.push({ type: 'fence', lang, text: body.join('\n') })
      continue
    }

    if (line.trim().startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) { quoteLines.push(lines[i].replace(/^\s*>\s?/, '')); i++ }
      const match = quoteLines[0]?.match(CALLOUT_RE)
      const kind = (match ? match[1].toLowerCase() : 'note') as CalloutKind
      if (match && match[2]) quoteLines[0] = match[2]
      else if (match) quoteLines.shift()
      blocks.push({ type: 'callout', kind, lines: quoteLines.length ? quoteLines : [''] })
      continue
    }

    const bulletMatch = line.match(/^[-•*]\s+(.*)$/)
    const numMatch = line.match(/^\d+\.\s+(.*)$/)
    if (bulletMatch || numMatch) {
      const ordered = !!numMatch
      const items: string[] = [(bulletMatch ?? numMatch)![1]]
      i++
      while (i < lines.length) {
        const m = ordered ? lines[i].match(/^\d+\.\s+(.*)$/) : lines[i].match(/^[-•*]\s+(.*)$/)
        if (!m) break
        items.push(m[1]); i++
      }
      blocks.push({ type: 'list', ordered, items })
      continue
    }

    const paraLines: string[] = [line]
    i++
    while (i < lines.length && lines[i].trim() && !lines[i].match(/^(#{1,3})\s/) && !lines[i].trim().startsWith('>') && !lines[i].trim().startsWith('```') && !lines[i].match(/^[-•*]\s+/) && !lines[i].match(/^\d+\.\s+/)) {
      paraLines.push(lines[i]); i++
    }
    blocks.push({ type: 'paragraph', lines: paraLines })
  }
  return blocks
}

function LessonDocument({ text }: { text: string }) {
  const blocks = parseLessonBlocks(text)
  const codeInline = 'px-1.5 py-0.5 rounded text-[0.85em] font-mono bg-black/20 text-[var(--coral)]'
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 36px 56px', color: 'var(--text-primary)' }}>
      {blocks.map((b, idx) => {
        if (b.type === 'heading') {
          const styles = b.level === 1
            ? { fontSize: 27, fontWeight: 800, marginTop: idx === 0 ? 0 : 28, marginBottom: 10, letterSpacing: '-0.01em' }
            : b.level === 2
            ? { fontSize: 20, fontWeight: 750, marginTop: 26, marginBottom: 10 }
            : { fontSize: 16.5, fontWeight: 700, marginTop: 18, marginBottom: 6 }
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, ...styles }}>
              {b.level === 2 && <span style={{ width: 4, height: 18, borderRadius: 2, background: 'var(--coral)', flexShrink: 0 }} />}
              <span>{renderInline(b.text, `h${idx}`, codeInline)}</span>
            </div>
          )
        }
        if (b.type === 'callout') {
          const cs = CALLOUT_STYLE[b.kind]
          return (
            <div key={idx} style={{
              margin: '16px 0', padding: '14px 16px', borderRadius: 12,
              background: cs.bg, borderLeft: `3px solid ${cs.color}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, fontSize: 12, fontWeight: 700, color: cs.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span style={{ fontSize: 14 }}>{cs.icon}</span>{cs.label}
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.7 }}>
                {b.lines.map((l, j) => l.trim()
                  ? <p key={j} style={{ margin: j === 0 ? 0 : '4px 0 0' }}>{renderInline(l, `${idx}-${j}`, codeInline)}</p>
                  : <div key={j} style={{ height: 6 }} />)}
              </div>
            </div>
          )
        }
        if (b.type === 'fence') {
          const isCode = CODE_LANGS.has(b.lang.toLowerCase())
          if (isCode) {
            return (
              <pre key={idx} style={{
                margin: '16px 0', padding: '14px 16px', borderRadius: 12,
                background: 'var(--bg-void)', border: '1px solid var(--panel-border)',
                fontFamily: 'var(--font-mono)', fontSize: 13.5, lineHeight: 1.6, overflowX: 'auto',
              }}>{b.text}</pre>
            )
          }
          const cs = CALLOUT_STYLE.visual
          return (
            <div key={idx} style={{
              margin: '16px 0', padding: '14px 16px', borderRadius: 12,
              background: cs.bg, border: `1px solid ${cs.color}33`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontSize: 12, fontWeight: 700, color: cs.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <span style={{ fontSize: 14 }}>{cs.icon}</span>{b.lang ? b.lang : cs.label}
              </div>
              <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 13.5, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--text-secondary)' }}>{b.text}</pre>
            </div>
          )
        }
        if (b.type === 'list') {
          return (
            <div key={idx} style={{ margin: '10px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {b.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.65 }}>
                  <span style={{ flexShrink: 0, color: 'var(--coral)', fontWeight: 700, fontFamily: b.ordered ? 'var(--font-mono)' : undefined }}>
                    {b.ordered ? `${j + 1}.` : '▸'}
                  </span>
                  <span>{renderInline(item, `${idx}-${j}`, codeInline)}</span>
                </div>
              ))}
            </div>
          )
        }
        return (
          <div key={idx} style={{ margin: '12px 0', fontSize: 15.5, lineHeight: 1.75 }}>
            {b.lines.map((l, j) => <p key={j} style={{ margin: j === 0 ? 0 : '6px 0 0' }}>{renderInline(l, `${idx}-${j}`, codeInline)}</p>)}
          </div>
        )
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
type ChatMsg = { id: string; role: 'user'|'assistant'; content: string; ts: number; streaming?: boolean; provider?: 'YANDEX'|'GROQ'|'FALLBACK'; visual?: string; visualSpec?: VisualSpec }
type MicState = 'idle' | 'recording' | 'processing'
type AttachedFile = { name: string; content: string; language: string }
type ActiveTab = 'curriculum' | 'code' | 'chat'
type CurriculumLesson = { id: string; subjectCode: string; unit: number; unitTitle: string; lesson: number; lessonTitle: string; lessonGoal: string; order: number; topicSlug?: string }
type CurriculumProgress = { currentLesson: number; completedLessons: number[]; isCompleted?: boolean; completedAt?: string | null; completionPercent?: number }
type TopicProgressEntry = { status: string; masteryPct: number; revisionCount?: number; lastRevisionAt?: string | null }
type RevisionTopic = { topicSlug: string; lessonTitle: string } | null
type SkipWarning = { topicSlug: string; lessonTitle: string; unlocks: { slug: string; title: string }[] } | null
type PromotionDecision = 'STAY' | 'REVIEW_REQUIRED' | 'PROMOTED'
type EvidenceItem = { type: string; score: number; weight: number; label: string }
type PromotionResult = {
  topicSlug: string
  topicTitle: string
  masteryScore: number
  decision: PromotionDecision
  explanation: { ru: string; en: string; hi: string }
  evidenceBreakdown?: EvidenceItem[]
  missingEvidence?: string[]
  method?: string
  retentionNote?: string | null
}

interface Props {
  subjectSlug: string; subjectName: string; levelDescription: string; voiceChoice: string
  teachingLanguage?: TeachingLang
  voiceSpeed?: number
  memoryContext?: string | null; pastSessionsSummary?: string | null
  subjects?: {slug:string;name:string}[]; displayName?: string; userId?: string
  resumeLessonTitle?: string; resumeUnitTitle?: string
  schoolChapterId?: string
  autoOpenPractice?: boolean
  initialPrompt?: string
}

// ─── Panel wrapper ────────────────────────────────────────────────────────────
// Sprint 1 (lesson-experience modernization): chrome only — built on the
// candy <Card> primitive (same flat 0 4px 0 shadow + 24px radius used by
// Dashboard/Coach/Quiz/Flashcards) instead of the old dark glow-border box.
function Panel({ children, style, accentColor = 'var(--coral)' }: { children: React.ReactNode; style?: React.CSSProperties; accentColor?: string }) {
  return (
    <Card
      style={{
        boxShadow: `0 4px 0 ${accentColor}, 0 4px 16px rgba(0,0,0,0.25)`,
        border: '1px solid var(--panel-border)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </Card>
  )
}

function PanelHeader({ children, tall }: { children: React.ReactNode; tall?: boolean }) {
  return (
    <div style={{
      height: tall ? 60 : 44,
      background: 'var(--bg-surface)',
      borderBottom: '2px solid var(--border-subtle)',
      borderRadius: '16px 16px 0 0',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      gap: 10,
      flexShrink: 0,
    }}>
      {children}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export function LessonScreen({ subjectSlug, subjectName, levelDescription, voiceChoice, teachingLanguage = 'en', voiceSpeed = 1, memoryContext, pastSessionsSummary, subjects, displayName, userId, resumeLessonTitle, resumeUnitTitle, schoolChapterId, autoOpenPractice, initialPrompt }: Props) {
  const { t, lang: uiLang } = useLanguage()
  const { country } = useCountry()
  const { theme } = useTheme()

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
  const [subjectMenuOpen, setSubjectMenuOpen] = useState(false)
  const [maximizedPanel, setMaximizedPanel] = useState<ActiveTab | null>(null)

  // Voice
  const [voiceType, setVoiceType] = useState<VoiceType>(() => resolveVoice(voiceChoice))
  const [speed, setSpeed] = useState(voiceSpeed)
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false)
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
  const [curriculumLoaded, setCurriculumLoaded] = useState(false)
  const [curriculumProgress, setCurriculumProgress] = useState<CurriculumProgress>({ currentLesson: 1, completedLessons: [] })
  const [xpCelebration, setXpCelebration] = useState(false)
  const fireConfetti = useConfetti()
  const [expandedUnits, setExpandedUnits] = useState<number[]>([1])
  const [topicProgressMap, setTopicProgressMap] = useState<Record<string, TopicProgressEntry>>({})
  const [availableTopicSlugs, setAvailableTopicSlugs] = useState<string[]>([])
  const [lockReasons, setLockReasons] = useState<Record<string, { missingPrereqs: { slug: string; title: string }[] }>>({})
  const [expandedLockedTopic, setExpandedLockedTopic] = useState<string | null>(null)

  // Assessment / promotion
  const [promotionResult, setPromotionResult] = useState<PromotionResult | null>(null)
  const [assessmentLoading, setAssessmentLoading] = useState(false)
  const [finalAssessmentOpen, setFinalAssessmentOpen] = useState(false)

  // Practice (Sprint O) + Adaptive (Sprint P)
  const [practiceOpen, setPracticeOpen] = useState(false)
  const [practiceScore, setPracticeScore] = useState<number | null>(null)
  const [insightsOpen, setInsightsOpen] = useState(false)
  const [practiceDifficulty, setPracticeDifficulty] = useState(2)
  const [practiceFocusCategories, setPracticeFocusCategories] = useState<string[]>([])

  // Revision & Skip (Sprint N.1)
  const [revisionTopic, setRevisionTopic] = useState<RevisionTopic>(null)
  const [skipWarning, setSkipWarning] = useState<SkipWarning>(null)

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
  const autoOpenedPracticeRef = useRef(false)
  const speakingIdRef = useRef<string|null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sessionIdRef = useRef<string|null>(null)

  // Derived
  const language = LANG_MAP[subjectSlug] ?? 'plaintext'
  const badge = LANG_BADGE[subjectSlug] ?? { label: subjectSlug.toUpperCase(), accent: '#F78166' }
  const filename = FILENAME[subjectSlug] ?? 'lesson.txt'
  // Eagle UI alignment sprint: non-programming subjects render the lesson
  // canvas as a formatted learning document instead of a raw-markdown code
  // editor view. Programming subjects are unaffected (still real code).
  const isNotebook = NON_CODE_SUBJECTS.includes(subjectSlug)
  const terminalCmd = subjectSlug === 'python' ? `python ${filename}` :
    subjectSlug === 'c' ? `gcc ${filename} -o lesson && ./lesson` :
    subjectSlug === 'cpp' ? `g++ ${filename} -o lesson && ./lesson` :
    subjectSlug === 'javascript' ? `node ${filename}` :
    subjectSlug === 'typescript' ? `npx ts-node ${filename}` :
    filename
  const showTerminal = !NON_CODE_SUBJECTS.includes(subjectSlug)
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

  // Fetch curriculum — query by the enrolled subject's own slug. The legacy
  // `Curriculum` table only has rows for c/cpp/python/english (the original 4
  // seeded subjects); the Subject Library has since grown to dozens of subjects,
  // so most lookups simply come back empty rather than erroring — the panel
  // below distinguishes "still loading" from "loaded, nothing to show".
  useEffect(() => {
    setCurriculumLoaded(false)
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
          // Load topic-level progress from the knowledge graph
          if (data.topicProgress) {
            const map: Record<string, TopicProgressEntry> = {}
            for (const tp of (data.topicProgress as Array<{ topicSlug: string; status: string; masteryPct: number }>)) {
              map[tp.topicSlug] = { status: tp.status, masteryPct: tp.masteryPct }
            }
            setTopicProgressMap(map)
          }
          setAvailableTopicSlugs(data.availableNodes ?? [])
        }
      })
      .catch(() => {})
      .finally(() => setCurriculumLoaded(true))
  }, [subjectSlug])

  // Detect lesson completion
  const handleLessonComplete = useCallback(async (lessonOrder: number, lesson?: { lessonTitle: string; lessonGoal: string }) => {
    try {
      const res = await fetch('/api/curriculum/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectCode: subjectSlug, completedLesson: lessonOrder, totalLessons: curriculumLessons.length || undefined,
          lessonTitle: lesson?.lessonTitle, lessonGoal: lesson?.lessonGoal,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setCurriculumProgress(data.progress)
        setXpCelebration(true)
        fireConfetti()
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
    }, country, speed)
  }, [teachingLanguage, voiceType, country, speed])
  const handleVoiceChange = useCallback((v: VoiceType) => {
    setVoiceType(v)
    fetch('/api/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ voiceId: v }) }).catch(() => {})
    if (speakingIdRef.current) {
      const id = speakingIdRef.current
      const msg = messages.find((m) => m.id === id)
      stopSpeaking()
      if (msg) setTimeout(() => handleSpeak(id, msg.content), 50)
    }
  }, [messages, handleSpeak])
  const handleSpeedChange = useCallback((s: number) => {
    setSpeed(s)
    setSpeedMenuOpen(false)
    fetch('/api/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ voiceSpeed: s }) }).catch(() => {})
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

  // Monaco themes — Monaco requires literal hex strings (CSS variables don't
  // work here), so we define a dark and a light variant and pick by `theme`.
  const handleEditorBeforeMount = useCallback((monaco: typeof import('monaco-editor')) => {
    monaco.editor.defineTheme('mytutor-dark', {
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
    monaco.editor.defineTheme('mytutor-light', {
      base: 'vs', inherit: true,
      rules: [
        { token: 'comment',  foreground: '6E7781', fontStyle: 'italic' },
        { token: 'keyword',  foreground: 'CF222E', fontStyle: 'bold'   },
        { token: 'string',   foreground: '0A3069'                      },
        { token: 'number',   foreground: '0550AE'                      },
        { token: 'type',     foreground: '953800'                      },
        { token: 'function', foreground: '8250DF'                      },
        { token: 'variable', foreground: '1F2328'                      },
        { token: 'operator', foreground: 'CF222E'                      },
      ],
      colors: {
        'editor.background':                 '#FFFFFF',
        'editor.foreground':                 '#1F2328',
        'editorCursor.foreground':           '#C2410C',
        'editorLineNumber.foreground':       '#8C959F',
        'editorLineNumber.activeForeground': '#656D76',
        'editor.selectionBackground':        '#B6E3FF',
        'editor.lineHighlightBackground':    '#F6F8FA',
        'editorGutter.background':           '#FFFFFF',
        'scrollbarSlider.background':        '#D0D7DE',
        'scrollbarSlider.hoverBackground':   '#AFB8C1',
      },
    })
  }, [])
  const monacoTheme = theme === 'light' ? 'mytutor-light' : 'mytutor-dark'

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
      const data = await res.json().catch(() => ({})) as { success?: boolean; text?: string; provider?: 'YANDEX'|'GROQ'|'FALLBACK'; visual?: string; visualSpec?: unknown; error?: any; lessonOrder?: number; completedLessons?: number[] }
      const errMsg = typeof data.error === 'string' ? data.error : data.error?.message ?? `HTTP ${res.status}`
      if (!res.ok || !data.success || !data.text) throw new Error(errMsg)
      let full = data.text
      const provider = data.provider
      const responseVisual = data.visual
      // Lesson-sync bug fix: reconcile the Roadmap/Learn Panel to the exact
      // lesson Tutor Max just generated content for. The server recomputes
      // this fresh from studentProgress.currentLesson on every single chat
      // turn, so treating it as authoritative here keeps Roadmap from ever
      // silently lagging behind what Tutor Max is actually teaching.
      if (typeof data.lessonOrder === 'number') {
        setCurriculumProgress((prev) =>
          prev.currentLesson === data.lessonOrder && (!data.completedLessons || prev.completedLessons.length === data.completedLessons.length)
            ? prev
            : { ...prev, currentLesson: data.lessonOrder!, completedLessons: data.completedLessons ?? prev.completedLessons })
      }
      // Sprint C: server already validated this with zod; re-validate
      // client-side too (defense in depth — never trust a network payload).
      const responseVisualSpec = parseVisualSpec(data.visualSpec) ?? undefined
      // Lesson-sync bug fix: completion must be detected ONLY from the exact
      // [LESSON_COMPLETE] control tag the system prompt instructs the AI to
      // emit. The previous keyword list also matched ordinary teaching prose
      // ("next lesson", "lesson complete", etc.), which Tutor Max says
      // constantly as normal conversational filler — every such false
      // positive silently advanced curriculumProgress.currentLesson, which is
      // exactly what caused Tutor Max's lesson context to drift ahead of the
      // Roadmap's displayed lesson.
      const hasCompletion = full.toUpperCase().includes('[LESSON_COMPLETE]')
      if (hasCompletion) {
        full = full.replace(/\[LESSON_COMPLETE\]/i, '').trim()
        const currentLessonData = curriculumLessons.find((l) => l.order === curriculumProgress.currentLesson)
        if (currentLessonData) {
          handleLessonComplete(currentLessonData.order, currentLessonData)
          // Update knowledge-graph TopicProgress and recompute unlocked nodes
          if (currentLessonData.topicSlug) {
            const topicSlug = currentLessonData.topicSlug
            fetch('/api/topic-progress', {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subjectSlug, topicSlug, action: 'complete' }),
            }).then((r) => r.json()).then((d) => {
              if (d.success) {
                setTopicProgressMap((prev) => ({
                  ...prev,
                  [topicSlug]: { status: d.topicProgress.status, masteryPct: d.topicProgress.masteryPct },
                }))
                // Re-query available nodes so newly-unlocked topics appear immediately
                fetch(`/api/topic-progress?subject=${subjectSlug}`)
                  .then((r) => r.json())
                  .then((data) => { if (data.availableNodes) setAvailableTopicSlugs(data.availableNodes) })
                  .catch(() => {})
              }
            }).catch(() => {})
          }
        }
      }

      // Collect deterministic check tags ([MATH_ANSWER] / [CODE_ANSWER]) before stripping
      const mathChecks: Array<{ expected: number; got: number }> = []
      const codeChecks: Array<{ expected: string; got: string }> = []
      const mathTagRe = /\[MATH_ANSWER\s+expected=(-?\d+(?:\.\d+)?)\s+got=(-?\d+(?:\.\d+)?)\]/gi
      const codeTagRe = /\[CODE_ANSWER\s+expected="([^"]*)"\s+got="([^"]*)"\]/gi
      let mTag: RegExpExecArray | null
      while ((mTag = mathTagRe.exec(full)) !== null) mathChecks.push({ expected: parseFloat(mTag[1]), got: parseFloat(mTag[2]) })
      while ((mTag = codeTagRe.exec(full)) !== null) codeChecks.push({ expected: mTag[1], got: mTag[2] })
      if (mathChecks.length > 0 || codeChecks.length > 0) {
        full = full.replace(/\[MATH_ANSWER[^\]]*\]/gi, '').replace(/\[CODE_ANSWER[^\]]*\]/gi, '').trim()
      }

      // Detect assessment result tag and call evaluation endpoint
      const assessMatch = full.match(/\[ASSESSMENT_RESULT\s+correctness=(\d+)\s+reasoning=(\d+)\s+confidence=(\d+)\]/i)
      if (assessMatch) {
        full = full.replace(assessMatch[0], '').trim()
        const correctness = parseInt(assessMatch[1], 10)
        const reasoning = parseInt(assessMatch[2], 10)
        const confidence = parseInt(assessMatch[3], 10)
        const currentLessonData = curriculumLessons.find((l) => l.order === curriculumProgress.currentLesson)
        const topicSlug = currentLessonData?.topicSlug
        if (topicSlug) {
          setAssessmentLoading(true)
          fetch('/api/assessment/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              subjectSlug,
              topicSlug,
              correctness,
              reasoning,
              confidence,
              mathChecks: mathChecks.length > 0 ? mathChecks : undefined,
              codeChecks: codeChecks.length > 0 ? codeChecks : undefined,
            }),
          }).then((r) => r.json()).then((d) => {
            if (d.success) {
              setPromotionResult({
                topicSlug,
                topicTitle: currentLessonData?.lessonTitle ?? topicSlug,
                masteryScore: d.evaluation.masteryScore,
                decision: d.evaluation.decision,
                explanation: d.evaluation.explanation,
                evidenceBreakdown: d.evaluation.evidenceBreakdown?.byType,
                missingEvidence: d.evaluation.requirements?.missing?.map((m: { label: string }) => m.label),
                method: d.evaluation.method,
                retentionNote: d.evaluation.retentionNote,
              })
              setTopicProgressMap((prev) => ({
                ...prev,
                [topicSlug]: { status: d.topicProgress.status, masteryPct: d.topicProgress.masteryPct },
              }))
              if (d.evaluation.decision === 'PROMOTED') {
                fetch(`/api/topic-progress?subject=${subjectSlug}`)
                  .then((r) => r.json())
                  .then((nd) => { if (nd.availableNodes) setAvailableTopicSlugs(nd.availableNodes) })
                  .catch(() => {})
              }
            }
          }).catch(() => {}).finally(() => setAssessmentLoading(false))
        }
      }

      setMessages((p) => p.map((m) => m.id === aid ? { ...m, content: full, streaming: false, provider, visual: responseVisual, visualSpec: responseVisualSpec } : m))
      const codeBlock = extractLastCodeBlock(full)
      if (codeBlock) {
        setCode(codeBlock)
      } else if (NON_CODE_SUBJECTS.includes(subjectSlug)) {
        setCode(full)
      }
      handleSpeak(aid, full)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setMessages((p) => p.map((m) => m.id === aid ? { ...m, content: `Error: ${msg}`, streaming: false } : m))
    } finally { setIsStreaming(false); textareaRef.current?.focus() }
  }, [handleSpeak, curriculumLessons, curriculumProgress.currentLesson, handleLessonComplete, userId, subjectSlug])

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

  // Start revision mode for a completed/mastered topic
  const startRevision = useCallback(async (lesson: CurriculumLesson) => {
    if (!lesson.topicSlug || !sessionId) return
    fetch('/api/topic-progress', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectSlug, topicSlug: lesson.topicSlug, action: 'start_revision' }),
    }).then((r) => r.json()).then((d) => {
      if (d.success) {
        setTopicProgressMap((prev) => ({
          ...prev,
          [lesson.topicSlug!]: { status: d.topicProgress.status, masteryPct: d.topicProgress.masteryPct, revisionCount: d.topicProgress.revisionCount },
        }))
      }
    }).catch(() => {})
    setRevisionTopic({ topicSlug: lesson.topicSlug, lessonTitle: lesson.lessonTitle })
    const msg = teachingLanguage === 'ru'
      ? `🔁 РЕЖИМ ПОВТОРЕНИЯ: Давай повторим тему "${lesson.lessonTitle}". Объясни ключевые концепции и дай практические задания.`
      : teachingLanguage === 'hi'
      ? `🔁 REVISION MODE: "${lesson.lessonTitle}" dobara padho. Key concepts explain karo aur practice exercises do.`
      : `🔁 REVISION MODE: Let's review "${lesson.lessonTitle}". Please explain the key concepts and give me practice exercises.`
    await sendMessage(sessionId, msg, false)
    setActiveTab('chat')
  }, [subjectSlug, sessionId, teachingLanguage, sendMessage])

  // Initiate a skip: check risk then confirm or warn
  const initiateSkip = useCallback(async (lesson: CurriculumLesson) => {
    if (!lesson.topicSlug) return
    const slug = lesson.topicSlug
    const doSkip = (topicSlug: string) => {
      fetch('/api/topic-progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug, topicSlug, action: 'skip' }),
      }).then((r) => r.json()).then((d) => {
        if (d.success) {
          setTopicProgressMap((prev) => ({ ...prev, [topicSlug]: { status: d.topicProgress.status, masteryPct: d.topicProgress.masteryPct } }))
          fetch(`/api/topic-progress?subject=${subjectSlug}`)
            .then((r) => r.json())
            .then((nd) => { if (nd.availableNodes) setAvailableTopicSlugs(nd.availableNodes) })
            .catch(() => {})
        }
      }).catch(() => {})
      setSkipWarning(null)
    }
    fetch(`/api/topic-progress/skip-risk?subject=${subjectSlug}&topic=${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.unlocks && d.unlocks.length > 0) {
          setSkipWarning({ topicSlug: slug, lessonTitle: lesson.lessonTitle, unlocks: d.unlocks })
        } else {
          doSkip(slug)
        }
      })
      .catch(() => doSkip(slug))
  }, [subjectSlug])

  const confirmSkip = useCallback((topicSlug: string) => {
    fetch('/api/topic-progress', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectSlug, topicSlug, action: 'skip' }),
    }).then((r) => r.json()).then((d) => {
      if (d.success) {
        setTopicProgressMap((prev) => ({ ...prev, [topicSlug]: { status: d.topicProgress.status, masteryPct: d.topicProgress.masteryPct } }))
        fetch(`/api/topic-progress?subject=${subjectSlug}`)
          .then((r) => r.json())
          .then((nd) => { if (nd.availableNodes) setAvailableTopicSlugs(nd.availableNodes) })
          .catch(() => {})
      }
    }).catch(() => {})
    setSkipWarning(null)
  }, [subjectSlug])

  const resumeTopic = useCallback((topicSlug: string) => {
    fetch('/api/topic-progress', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectSlug, topicSlug, action: 'resume' }),
    }).then((r) => r.json()).then((d) => {
      if (d.success) {
        setTopicProgressMap((prev) => ({ ...prev, [topicSlug]: { status: d.topicProgress.status, masteryPct: d.topicProgress.masteryPct } }))
        fetch(`/api/topic-progress?subject=${subjectSlug}`)
          .then((r) => r.json())
          .then((nd) => { if (nd.availableNodes) setAvailableTopicSlugs(nd.availableNodes) })
          .catch(() => {})
      }
    }).catch(() => {})
  }, [subjectSlug])

  // Session init + lifecycle
  useEffect(() => { sessionIdRef.current = sessionId }, [sessionId])
  useEffect(() => {
    function endSession() {
      const sid = sessionIdRef.current; if (!sid) return
      navigator.sendBeacon('/api/sessions/end', new Blob([JSON.stringify({ sessionId: sid })], { type: 'application/json' }))
    }
    window.addEventListener('beforeunload', endSession)
    // Also end the session on unmount (e.g. switching subjects remounts this
    // component via its `key` prop) so the previous subject's session gets
    // its summary/flashcards instead of being left open indefinitely.
    return () => {
      window.removeEventListener('beforeunload', endSession)
      endSession()
    }
  }, [])
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    async function init() {
      try {
        const res = await fetch('/api/sessions', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subjectSlug, memoryContext: memoryContext ?? undefined, userId: userId ?? undefined, schoolChapterId: schoolChapterId ?? undefined }),
        })
        const data = await res.json()
        if (!data.success) { setInitError(data.error ?? 'Error'); return }
        const sid = data.data.id; setSessionId(sid)
        const lessonRef = resumeLessonTitle
          ? (resumeUnitTitle ? `"${resumeLessonTitle}" (${resumeUnitTitle})` : `"${resumeLessonTitle}"`)
          : null
        const opening = teachingLanguage === 'ru'
          ? (pastSessionsSummary || lessonRef
            ? `Привет! ${lessonRef ? `Ты работал над темой ${lessonRef}. ` : ''}${pastSessionsSummary ? `В прошлый раз: "${pastSessionsSummary}". ` : ''}Продолжи с того места. Уровень: "${levelDescription}". 3-4 предложения.`
            : `Начни урок по "${subjectName}". Уровень: "${levelDescription}". Представься как "Репетитор Макс", поприветствуй и начни объяснение. 3-4 предложения.`)
          : teachingLanguage === 'hi'
          ? (pastSessionsSummary || lessonRef
            ? `Namaste! ${lessonRef ? `Aap ${lessonRef} par kaam kar rahe the. ` : ''}${pastSessionsSummary ? `Last session: "${pastSessionsSummary}". ` : ''}Continue karein. Level: "${levelDescription}". 3-4 sentences.`
            : `"${subjectName}" ka lesson shuru karo. Level: "${levelDescription}". Apna parichay do aur pehla explanation do. 3-4 sentences.`)
          : (pastSessionsSummary || lessonRef
            ? `Hi! ${lessonRef ? `You were working on ${lessonRef}. ` : ''}${pastSessionsSummary ? `Last session: "${pastSessionsSummary}". ` : ''}Continue from there. Level: "${levelDescription}". 3-4 sentences.`
            : `Start the lesson on "${subjectName}". Level: "${levelDescription}". Introduce yourself as "Tutor Max" and begin teaching. 3-4 sentences.`)
        await sendMessage(sid, opening, false)
        if (initialPrompt) await sendMessage(sid, initialPrompt, true)
      } catch { setInitError('Connection failed. Please refresh the page.') }
    }
    init()
  }, [subjectSlug, subjectName, levelDescription, memoryContext, pastSessionsSummary, sendMessage, teachingLanguage, userId, initialPrompt])

  // Vision send
  async function sendImageMessage(sid: string) {
    if (!selectedImage) return
    const question = input.trim()
    const imgData = selectedImage
    setSelectedImage(null)
    setInput('')
    clearDraft(`lesson_${subjectSlug}`)
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
      if (codeBlock) {
        setCode(codeBlock)
      } else if (NON_CODE_SUBJECTS.includes(subjectSlug)) {
        setCode(full)
      }
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
    clearDraft(`lesson_${subjectSlug}`)
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
      // Bug fix: sampleRate as a mandatory constraint caused OverconstrainedError on some devices
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 },
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
        setMicState('processing')
        // Bug fix: derive correct extension from actual mimeType (Firefox=ogg, Safari=mp4, Chrome=webm)
        const ext = mimeType.split(';')[0].split('/')[1] ?? 'webm'
        const formData = new FormData()
        formData.append('audio', audioBlob, `recording.${ext}`)
        formData.append('lang', teachingLanguage || 'en')
        try {
          const ext = mimeType.includes('ogg') ? 'ogg' : mimeType.includes('mp4') ? 'mp4' : 'webm'
          console.log('[STT-CLIENT] blob size (bytes):', audioBlob.size)
          console.log('[STT-CLIENT] blob mime type:', audioBlob.type)
          console.log('[STT-CLIENT] file extension used:', ext)
          console.log('[STT-CLIENT] lang sent:', teachingLanguage || 'en')
          const res = await fetch('/api/stt', { method: 'POST', body: formData })
          console.log('[STT-CLIENT] response status:', res.status)
          const rawBody = await res.text()
          console.log('[STT-CLIENT] response body:', rawBody)
          if (res.ok) {
            let errBody: { text?: string } = {}
            try { errBody = JSON.parse(rawBody) } catch { /* non-JSON */ }
            if (errBody.text?.trim()) setInput((prev) => prev ? prev + ' ' + errBody.text! : errBody.text!)
          } else {
            let errBody: { error?: string } = {}
            try { errBody = JSON.parse(rawBody) } catch { /* non-JSON */ }
            console.error('STT error:', errBody.error)
            alert(teachingLanguage === 'ru'
              ? 'Не удалось распознать речь. Попробуйте ещё раз.'
              : 'Speech recognition failed. Please try again.')
          }
        } catch (err) {
          console.error('STT request error:', err)
          alert(teachingLanguage === 'ru'
            ? 'Ошибка соединения при распознавании речи.'
            : 'Connection error during speech recognition.')
        }
        setMicState('idle')
        textareaRef.current?.focus()
      }
      recorder.onerror = () => { stream.getTracks().forEach((t) => t.stop()); setMicState('idle') }
      recorder.start(250)
      setMicState('recording')
    } catch (err: any) {
      console.error('Microphone access error:', err.name, err.message)
      setMicState('idle')
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        alert(teachingLanguage === 'ru'
          ? 'Доступ к микрофону запрещён. Разрешите доступ в настройках браузера.'
          : 'Microphone permission denied. Please allow microphone access in browser settings.')
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        alert(teachingLanguage === 'ru'
          ? 'Микрофон не найден. Подключите микрофон и попробуйте снова.'
          : 'No microphone found. Please connect a microphone and try again.')
      } else {
        alert(teachingLanguage === 'ru'
          ? 'Не удалось получить доступ к микрофону.'
          : 'Could not access the microphone.')
      }
    }
  }
  function handleMicClick() {
    if (micState === 'processing') return
    if (micState === 'recording') stopRecording(); else startRecording()
  }
  useEffect(() => () => { mediaRecorderRef.current?.stop() }, [])

  // Stop any in-flight TTS playback on unmount/route change so voice never
  // keeps speaking after the learner leaves the lesson.
  useEffect(() => () => { stopSpeaking() }, [])

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

  // Sprint BL — "Practice Chapter" deep link from the chapter workspace opens
  // straight into the practice panel once the lesson/topic data is ready.
  useEffect(() => {
    if (!autoOpenPractice || autoOpenedPracticeRef.current) return
    if (!currentLessonData?.topicSlug) return
    autoOpenedPracticeRef.current = true
    setPracticeOpen(true)
  }, [autoOpenPractice, currentLessonData])

  // Sprint F, Part 4 — session recovery: remember the learner's last position
  // so the dashboard can offer "continue where you left off" (read-only —
  // never redirects or mutates lesson state, just records).
  useEffect(() => {
    if (!currentLessonData) return
    recordLastLesson({
      subjectSlug, subjectName,
      lessonOrder: currentLessonData.order,
      lessonTitle: currentLessonData.lessonTitle,
    })
  }, [subjectSlug, subjectName, currentLessonData])

  // Fetch lock reasons so the curriculum tree can show WHY each topic is
  // locked (its unmet prerequisites). Loads once per subject.
  useEffect(() => {
    fetch(`/api/topic-progress?subject=${subjectSlug}`)
      .then((r) => r.json())
      .then((d) => { if (d.lockReasons) setLockReasons(d.lockReasons) })
      .catch(() => {})
  }, [subjectSlug])

  // Mark the current topic as IN_PROGRESS in the knowledge graph whenever the
  // learner is on a lesson that maps to a graph node (Sprint K).
  useEffect(() => {
    const topicSlug = currentLessonData?.topicSlug
    if (!topicSlug) return
    fetch('/api/topic-progress', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectSlug, topicSlug, action: 'start' }),
    }).then((r) => r.json()).then((d) => {
      if (d.success) {
        setTopicProgressMap((prev) => ({
          ...prev,
          [topicSlug]: { status: d.topicProgress.status, masteryPct: d.topicProgress.masteryPct },
        }))
      }
    }).catch(() => {})
  }, [subjectSlug, currentLessonData?.topicSlug])

  // Sprint F, Part 4 — restore/persist the chat draft so an interrupted
  // browser session never loses an in-progress message.
  useDraftMessage(sessionId ? `lesson_${subjectSlug}` : null, input, (saved) => setInput(saved))

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
      <div className={`${styles.learnCandy} min-h-screen flex items-center justify-center p-6`} style={{ background: 'var(--bg-void)' }}>
        <div className="text-center">
          <div className="text-4xl mb-4 text-red-400">⚠</div>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>{initError}</p>
          <Link href="/dashboard" className="text-sm" style={{ color: 'var(--coral)' }}>{t('lesson_back_base')}</Link>
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
    <div className={`${styles.learnCandy} pb-mobile-nav`} style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-void)', color: 'var(--text-primary)', overflow: 'hidden' }}>

      {/* XP Celebration — candy Card + EagleMascot + confetti (useConfetti fired alongside setXpCelebration above) */}
      {xpCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <Card className="animate-bounce" style={{ padding: '20px 28px', textAlign: 'center', boxShadow: '0 4px 0 var(--coral)' }}>
            <EagleMascot variant="hero" size={72} className="mx-auto mb-2" />
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--coral)', fontFamily: 'var(--font-baloo2)' }}>+10 XP</div>
            <div style={{ fontSize: 13, marginTop: 4, color: 'var(--text-secondary)' }}>
              {teachingLanguage === 'ru' ? 'Урок завершён!' : 'Lesson complete!'}
            </div>
          </Card>
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

      {/* ══ TOP BAR (56px) — candy chrome, same family as Dashboard V2's TopBar ══ */}
      <header style={{
        height: 56, flexShrink: 0,
        background: 'var(--bg-surface)',
        boxShadow: '0 4px 0 var(--border-subtle)',
        padding: '0 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        position: 'relative', zIndex: 5,
      }}>
        {/* Left */}
        <Link href="/dashboard"
          style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--coral)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)' }}>
          {backLabel}
        </Link>

        {/* Center */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'visible', flex: 1, justifyContent: 'center', minWidth: 0 }}>
          {(() => {
            const otherSubjects = (subjects ?? []).filter((s) => s.slug !== subjectSlug)
            if (otherSubjects.length === 0) {
              return (
                <span style={{ padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${badge.accent}22`, color: badge.accent, border: `1px solid ${badge.accent}44`, flexShrink: 0 }}>
                  {badge.label}
                </span>
              )
            }
            const switchLabel = t('learn_switch_subject')
            return (
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <button
                  onClick={() => setSubjectMenuOpen((v) => !v)}
                  title={switchLabel}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer',
                    padding: '2px 8px 2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                    background: `${badge.accent}22`, color: badge.accent, border: `1px solid ${badge.accent}44`,
                  }}>
                  {badge.label}
                  <ChevronDown size={12} style={{ transform: subjectMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
                </button>
                {subjectMenuOpen && (
                  <>
                    <div onClick={() => setSubjectMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 6px)', left: 0, width: 'max-content', minWidth: 160, maxWidth: 'calc(100vw - 32px)', zIndex: 50,
                      background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 12,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.4)', overflow: 'hidden',
                    }}>
                      <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dim)' }}>
                          {t('learn_select_subject')}
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>
                          {(subjects ?? []).length} {t('learn_enrolled_count_many')} {t('learn_current_subject').toLowerCase()}: {subjectName}
                        </div>
                      </div>
                      {otherSubjects.map((s) => {
                        const b = LANG_BADGE[s.slug] ?? { label: s.name, accent: '#F78166' }
                        return (
                          <Link key={s.slug} href={`/learn?subject=${s.slug}`}
                            onClick={() => setSubjectMenuOpen(false)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
                              fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--bg-hover)' }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: b.accent, flexShrink: 0 }} />
                            {s.name}
                          </Link>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            )
          })()}
          <span style={{ color: 'var(--text-dim)', fontSize: 12 }}>·</span>
          <span className="max-w-[120px] sm:max-w-[240px]" style={{ fontSize: 12, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentLessonData ? currentLessonData.lessonTitle : subjectName}
          </span>
          <span className="hidden sm:inline" style={{ color: 'var(--text-dim)', fontSize: 12 }}>·</span>
          <span className="hidden sm:inline" style={{ fontSize: 12, fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', color: 'var(--text-secondary)', flexShrink: 0 }}>
            {formatTimer(elapsed)}
          </span>
          <span className="hidden sm:inline" style={{ fontSize: 14 }}>{LANG_FLAG[teachingLanguage]}</span>
        </div>

        {/* Right — voice buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          {(['male', 'female', 'warm'] as VoiceType[]).map((k) => {
            const isActive = voiceType === k
            return (
              <button key={k} onClick={() => handleVoiceChange(k)}
                title={VOICE_LABELS_BY_LANG[uiLang as TeachingLang]?.[k] ?? VOICE_LABELS_BY_LANG.en[k]}
                style={{
                  width: 30, height: 30, borderRadius: 10, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  background: isActive ? 'var(--coral)' : 'var(--bg-elevated)',
                  color: isActive ? '#fff' : 'var(--text-dim)',
                  border: 'none',
                  boxShadow: isActive ? '0 2px 0 var(--coral-hover)' : '0 2px 0 var(--border-subtle)',
                  transition: 'all 150ms',
                }}>
                {mounted ? voiceShortLabel[k] : { male: 'M', female: 'F', warm: 'W' }[k]}
              </button>
            )
          })}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setSpeedMenuOpen((o) => !o)}
              title={t('settings_voice_speed')}
              aria-label={`${t('settings_voice_speed')}: ${speed}x`}
              style={{
                height: 28, padding: '0 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                whiteSpace: 'nowrap', flexShrink: 0,
                background: speedMenuOpen ? 'rgba(247,129,102,0.15)' : 'transparent',
                color: speedMenuOpen ? 'var(--coral)' : 'var(--text-dim)',
                border: `1px solid ${speedMenuOpen ? 'rgba(247,129,102,0.4)' : 'var(--border-default)'}`,
                transition: 'all 150ms',
              }}>
              Speed: {speed}x
            </button>
            {speedMenuOpen && (
              <>
                <div onClick={() => setSpeedMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 6px)', right: 0, width: 'max-content', zIndex: 50,
                  background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 12,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ padding: '8px 16px 6px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dim)', borderBottom: '1px solid var(--border-subtle)' }}>
                    {t('settings_voice_speed')}
                  </div>
                  {VOICE_SPEED_OPTIONS.map((s) => (
                    <button key={s} onClick={() => handleSpeedChange(s)}
                      style={{
                        padding: '8px 16px', fontSize: 12.5, fontWeight: 600, textAlign: 'left', cursor: 'pointer',
                        background: speed === s ? 'rgba(247,129,102,0.12)' : 'transparent',
                        color: speed === s ? 'var(--coral)' : 'var(--text-primary)',
                      }}
                      onMouseEnter={(e) => { if (speed !== s) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)' }}
                      onMouseLeave={(e) => { if (speed !== s) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}>
                      {s}x
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* ══ MOBILE TABS — candy segmented control ═════════════════════════ */}
      <div className="flex md:hidden shrink-0" style={{ background: 'var(--bg-surface)', padding: 8, gap: 6, boxShadow: '0 4px 0 var(--border-subtle)' }}>
        {(['curriculum', 'code', 'chat'] as ActiveTab[]).map((tab, i) => {
          const icons = ['📚', '💻', '💬']
          const labels = teachingLanguage === 'ru' ? ['Урок', 'Код', 'Чат'] : ['Lesson', 'Code', 'Chat']
          const isActive = activeTab === tab
          return (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, height: 40, fontSize: 12, fontWeight: 700, cursor: 'pointer',
              borderRadius: 14, border: 'none',
              background: isActive ? 'var(--coral)' : 'var(--bg-elevated)',
              color: isActive ? '#fff' : 'var(--text-secondary)',
              boxShadow: isActive ? '0 3px 0 var(--coral-hover)' : '0 3px 0 var(--border-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              transition: 'all 150ms',
            }}>
              <span>{icons[i]}</span> {labels[i]}
            </button>
          )
        })}
      </div>

      {/* ══ 3-PANEL GRID ══════════════════════════════════════════════════ */}
      {/* Mobile: single column, one panel visible per activeTab. Desktop (md+): all three side by side. */}
      <div
        className={maximizedPanel ? 'grid grid-cols-1' : 'grid grid-cols-1 md:grid-cols-[25%_45%_30%]'}
        style={{ flex: 1, minHeight: 0, gridTemplateRows: '1fr', gap: 16, padding: 16 }}
      >

        {/* ══ PANEL 1 — CURRICULUM ROADMAP (25%) ══════════════════════════ */}
        {/* On mobile only the active tab's panel is rendered (full width); on desktop all three sit side by side via display:contents */}
        <div className={activeTab !== 'curriculum' ? 'hidden md:contents' : 'contents'}
          style={maximizedPanel && maximizedPanel !== 'curriculum' ? { display: 'none' } : undefined}>
        <Panel style={{ overflow: 'hidden' }} accentColor="#F78166">
          <div style={{ flexDirection: 'column', height: '100%' }}
            className={activeTab !== 'curriculum' ? 'hidden md:flex' : 'flex'}>
            {/* Header */}
            <PanelHeader>
              <span style={{ fontSize: 14 }}>📚</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>
                {teachingLanguage === 'ru' ? 'Программа' : 'Roadmap'}
              </span>
              <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 10, fontWeight: 700, background: `${badge.accent}22`, color: badge.accent }}>
                {badge.label}
              </span>
              {/* Maximize/restore — desktop only */}
              <button
                className="hidden md:flex"
                onClick={() => setMaximizedPanel(maximizedPanel === 'curriculum' ? null : 'curriculum')}
                title={maximizedPanel === 'curriculum' ? t('learn_restore') : t('learn_maximize')}
                style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid var(--border-default)', background: 'transparent', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: 11, flexShrink: 0 }}>
                {maximizedPanel === 'curriculum' ? '⊡' : '⊞'}
              </button>
            </PanelHeader>

            {/* Knowledge Graph Position Panel */}
            <LearnerPositionPanel
              subjectSlug={subjectSlug}
              teachingLanguage={teachingLanguage}
              onGapClick={(topicSlug) => {
                const lesson = curriculumLessons.find((l) => l.topicSlug === topicSlug)
                if (lesson && lesson.order < curriculumProgress.currentLesson && sessionId) {
                  navigateToLesson(lesson.order)
                }
              }}
            />

            {/* Revision mode banner */}
            {revisionTopic && (
              <div style={{
                padding: '7px 12px', borderBottom: '1px solid var(--border-subtle)',
                background: 'rgba(121,192,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#79C0FF' }}>
                  {t('revision_mode')}: {revisionTopic.lessonTitle}
                </span>
                <button
                  onClick={() => setRevisionTopic(null)}
                  style={{
                    fontSize: 9, padding: '2px 6px', borderRadius: 4, cursor: 'pointer', flexShrink: 0,
                    background: 'rgba(121,192,255,0.12)', color: '#79C0FF',
                    border: '1px solid rgba(121,192,255,0.3)', fontWeight: 600,
                  }}>
                  {t('revision_end')}
                </button>
              </div>
            )}

            {/* Goal card for current lesson */}
            {currentLessonData?.lessonGoal && (
              <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(247,129,102,0.05)' }}>
                <p style={{ fontSize: 10, color: 'var(--coral)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  🎯 {teachingLanguage === 'ru' ? 'Цель' : 'Goal'}
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-primary)', marginTop: 3, lineHeight: 1.4 }}>{currentLessonData.lessonGoal}</p>
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
                    onClick={() => handleLessonComplete(currentLessonData.order, currentLessonData)}
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
                <div style={{ padding: 16, fontSize: 12, color: 'var(--text-dim)', textAlign: 'center' }}>
                  {!curriculumLoaded
                    ? (teachingLanguage === 'ru' ? 'Загрузка программы...' : 'Loading curriculum...')
                    : (teachingLanguage === 'ru' ? 'Для этого предмета пока нет структурированной программы.' : 'No structured lesson plan for this subject yet.')}
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
                      borderBottom: '1px solid var(--border-subtle)',
                      background: 'var(--bg-elevated)',
                    }}
                  >
                    <span style={{
                      fontSize: 9, color: 'var(--text-dim)', flexShrink: 0,
                      transform: expandedUnits.includes(unit.number) ? 'rotate(90deg)' : 'none',
                      transition: 'transform 200ms', display: 'inline-block',
                    }}>▶</span>
                    <span style={{
                      background: unitComplete ? 'rgba(63,185,80,0.15)' : 'rgba(247,129,102,0.15)',
                      color: unitComplete ? 'var(--green)' : 'var(--coral)',
                      borderRadius: 4, padding: '1px 5px', fontSize: 9, fontWeight: 700, flexShrink: 0,
                    }}>{unitComplete ? '✅' : `U${unit.number}`}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)',
                      textTransform: 'uppercase', letterSpacing: '0.04em', flex: 1,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{unit.title}</span>
                    <span style={{ fontSize: 10, color: unitComplete ? 'var(--green)' : 'var(--text-dim)', flexShrink: 0 }}>
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
                        const topicData = lesson.topicSlug ? topicProgressMap[lesson.topicSlug] : undefined
                        const isKnownAvailable = !lesson.topicSlug || availableTopicSlugs.includes(lesson.topicSlug)
                        const isMastered = topicData?.status === 'MASTERED'
                        const isRevision = topicData?.status === 'REVISION'
                        const isSkipped = topicData?.status === 'SKIPPED'
                        // Locked = not completed/mastered/revision/skipped, not current, has unmet prereqs
                        const isLocked = !isCompleted && !isCurrent && !isMastered && !isRevision && !isSkipped &&
                          lesson.topicSlug !== undefined && !isKnownAvailable &&
                          topicData?.status !== 'IN_PROGRESS' && topicData?.status !== 'MASTERED'
                        const isLockExpanded = expandedLockedTopic === lesson.topicSlug
                        const isSkipWarningShown = skipWarning?.topicSlug === lesson.topicSlug

                        const canNavigate = (isCompleted || isPrevious || isMastered || isRevision) && !isCurrent
                        const canReview = (isCompleted || isMastered) && !isCurrent && lesson.topicSlug !== undefined
                        const canSkip = !isLocked && !isCompleted && !isMastered && !isRevision && !isSkipped && !isCurrent && lesson.topicSlug !== undefined

                        const icon = isMastered ? '⭐'
                          : isRevision ? '🔁'
                          : isSkipped ? '⏭'
                          : isCompleted ? '✅'
                          : isCurrent ? '●'
                          : isLocked ? '🔒'
                          : '○'

                        const iconColor = (isMastered || isCompleted) ? 'var(--green)'
                          : isRevision ? '#79C0FF'
                          : isSkipped ? '#F59E0B'
                          : isCurrent ? 'var(--coral)'
                          : 'var(--text-dim)'

                        return (
                          <div key={lesson.order} style={{ marginBottom: 2 }}>
                            <div
                              onClick={() => {
                                if (isLocked && lesson.topicSlug) {
                                  setExpandedLockedTopic((prev) => prev === lesson.topicSlug ? null : lesson.topicSlug!)
                                } else if (canNavigate) {
                                  navigateToLesson(lesson.order)
                                }
                              }}
                              style={{
                                display: 'flex', alignItems: 'flex-start', gap: 6,
                                padding: '5px 8px', borderRadius: 6,
                                cursor: (canNavigate || isLocked) ? 'pointer' : 'default',
                                background: isCurrent ? 'rgba(247,129,102,0.1)'
                                  : isRevision ? 'rgba(121,192,255,0.07)'
                                  : isSkipWarningShown ? 'rgba(245,158,11,0.07)'
                                  : isLockExpanded ? 'rgba(239,68,68,0.05)'
                                  : 'transparent',
                                border: isCurrent ? '1px solid rgba(247,129,102,0.3)'
                                  : isRevision ? '1px solid rgba(121,192,255,0.2)'
                                  : isSkipWarningShown ? '1px solid rgba(245,158,11,0.25)'
                                  : isLockExpanded ? '1px solid rgba(239,68,68,0.15)'
                                  : '1px solid transparent',
                                transition: 'all 150ms',
                                opacity: isLocked ? 0.6 : 1,
                              }}
                            >
                              <span style={{ fontSize: 11, marginTop: 1, flexShrink: 0, color: iconColor }}>
                                {icon}
                              </span>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontSize: 11, lineHeight: 1.3,
                                  fontWeight: isCurrent ? 600 : 400,
                                  color: (isCompleted || isMastered) ? 'var(--border-emphasis)'
                                    : isRevision ? '#79C0FF'
                                    : isSkipped ? '#F59E0B'
                                    : isCurrent ? 'var(--coral)'
                                    : isPrevious ? 'var(--text-secondary)'
                                    : 'var(--text-dim)',
                                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                }}>
                                  {lesson.order}. {lesson.lessonTitle}
                                  {topicData && topicData.masteryPct > 0 && (isCompleted || isMastered || isRevision) && (
                                    <span style={{ marginLeft: 4, fontSize: 9, color: 'var(--text-dim)', fontWeight: 400 }}>
                                      {topicData.masteryPct}%
                                    </span>
                                  )}
                                  {isRevision && topicData?.revisionCount && topicData.revisionCount > 0 && (
                                    <span style={{ marginLeft: 4, fontSize: 9, color: '#79C0FF', fontWeight: 600 }}>
                                      ×{topicData.revisionCount}
                                    </span>
                                  )}
                                </div>
                                {/* Action row */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2, flexWrap: 'wrap' }}>
                                  {isCurrent && (
                                    <>
                                      <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>
                                        {teachingLanguage === 'ru' ? 'Текущий' : 'Current'}
                                      </span>
                                      {sessionId && !assessmentLoading && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            const msg = teachingLanguage === 'ru'
                                              ? `Оцени моё понимание темы "${lesson.lessonTitle}". Задай мне 3 вопроса по одному.`
                                              : teachingLanguage === 'hi'
                                              ? `Meri "${lesson.lessonTitle}" ki samajh assess karo. Ek ek karke 3 questions pucho.`
                                              : `Please assess my understanding of "${lesson.lessonTitle}". Ask me 3 questions one at a time.`
                                            sendMessage(sessionId, msg, true)
                                            setActiveTab('chat')
                                          }}
                                          style={{
                                            fontSize: 9, padding: '1px 5px', borderRadius: 4, cursor: 'pointer',
                                            background: 'rgba(247,129,102,0.1)', color: 'var(--coral)',
                                            border: '1px solid rgba(247,129,102,0.3)', fontWeight: 600,
                                          }}>
                                          {t('assess_start')}
                                        </button>
                                      )}
                                      {assessmentLoading && (
                                        <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>{t('assess_loading')}</span>
                                      )}
                                    </>
                                  )}
                                  {false && canReview && sessionId && (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); startRevision(lesson) }}
                                      style={{
                                        fontSize: 9, padding: '1px 5px', borderRadius: 4, cursor: 'pointer',
                                        background: 'rgba(121,192,255,0.1)', color: '#79C0FF',
                                        border: '1px solid rgba(121,192,255,0.3)', fontWeight: 600,
                                      }}>
                                      {t('revision_start')}
                                    </button>
                                  )}
                                  {canSkip && (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); initiateSkip(lesson) }}
                                      style={{
                                        fontSize: 9, padding: '1px 5px', borderRadius: 4, cursor: 'pointer',
                                        background: 'rgba(245,158,11,0.08)', color: '#F59E0B',
                                        border: '1px solid rgba(245,158,11,0.25)', fontWeight: 600,
                                      }}>
                                      {t('skip_topic')}
                                    </button>
                                  )}
                                  {isSkipped && (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); lesson.topicSlug && resumeTopic(lesson.topicSlug) }}
                                      style={{
                                        fontSize: 9, padding: '1px 5px', borderRadius: 4, cursor: 'pointer',
                                        background: 'rgba(245,158,11,0.1)', color: '#F59E0B',
                                        border: '1px solid rgba(245,158,11,0.3)', fontWeight: 600,
                                      }}>
                                      {t('skip_resume')}
                                    </button>
                                  )}
                                  {isLocked && (
                                    <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>
                                      {t('kg_prereqs_needed')} {isLockExpanded ? '▲' : '▼'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Skip warning — shown inline when user clicks Skip on a topic with dependents */}
                            {isSkipWarningShown && skipWarning && (
                              <div style={{
                                marginLeft: 22, marginRight: 4, marginBottom: 4,
                                padding: '7px 10px', borderRadius: 6,
                                background: 'rgba(245,158,11,0.07)',
                                border: '1px solid rgba(245,158,11,0.25)',
                              }}>
                                <div style={{ fontSize: 9, fontWeight: 700, color: '#F59E0B', marginBottom: 4 }}>
                                  ⚠ {t('skip_warning')}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 6 }}>
                                  {skipWarning.unlocks.map((u) => (
                                    <span key={u.slug} style={{ fontSize: 9, color: 'var(--text-dim)' }}>• {u.title}</span>
                                  ))}
                                </div>
                                <div style={{ display: 'flex', gap: 4 }}>
                                  <button
                                    onClick={() => confirmSkip(skipWarning.topicSlug)}
                                    style={{
                                      fontSize: 9, padding: '2px 7px', borderRadius: 4, cursor: 'pointer',
                                      background: 'rgba(245,158,11,0.15)', color: '#F59E0B',
                                      border: '1px solid rgba(245,158,11,0.4)', fontWeight: 700,
                                    }}>
                                    {t('skip_confirm')}
                                  </button>
                                  <button
                                    onClick={() => setSkipWarning(null)}
                                    style={{
                                      fontSize: 9, padding: '2px 7px', borderRadius: 4, cursor: 'pointer',
                                      background: 'transparent', color: 'var(--text-dim)',
                                      border: '1px solid var(--border-default)', fontWeight: 600,
                                    }}>
                                    {t('skip_cancel')}
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Lock reason detail */}
                            {isLocked && isLockExpanded && lesson.topicSlug && (
                              <div style={{ paddingLeft: 22, paddingRight: 8 }}>
                                <LockedTopicDetail
                                  topicSlug={lesson.topicSlug}
                                  lockReasons={lockReasons}
                                  teachingLanguage={teachingLanguage}
                                />
                              </div>
                            )}
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
              <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: 'var(--border-emphasis)' }}>
                    {teachingLanguage === 'ru' ? 'Завершено' : 'Complete'}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
                    {curriculumProgress.completedLessons.length} / {totalLessons}
                  </span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${xpProgress}%`,
                    background: 'linear-gradient(90deg, var(--coral), var(--coral-hover))',
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
        </div>

        {/* ══ PANEL 2 — CODE EDITOR (45%) ═══════════════════════════════ */}
        <div className={activeTab !== 'code' ? 'hidden md:contents' : 'contents'}
          style={maximizedPanel && maximizedPanel !== 'code' ? { display: 'none' } : undefined}>
        <Panel accentColor="#79C0FF">
          <div style={{ flexDirection: 'column', height: '100%' }}
            className={activeTab !== 'code' ? 'hidden md:flex' : 'flex'}>
            {/* Header */}
            <PanelHeader>
              <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: `${badge.accent}22`, color: badge.accent }}>{badge.label}</span>
              {isNotebook ? (
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  📖 {currentLessonData ? currentLessonData.lessonTitle : (teachingLanguage === 'ru' ? 'Учебный материал' : 'Lesson Notes')}
                </span>
              ) : (
                <>
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{filename}</span>
                  <span style={{ color: 'var(--coral)', fontSize: 12, animation: 'blink 1s infinite' }}>_</span>
                </>
              )}
              <div style={{ flex: 1 }} />
              <button onClick={handleCopy}
                style={{
                  padding: '3px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                  background: 'transparent',
                  color: copied ? 'var(--green)' : 'var(--text-secondary)',
                  border: `1px solid ${copied ? 'rgba(63,185,80,0.4)' : 'var(--border-default)'}`,
                  display: 'flex', alignItems: 'center', gap: 4, transition: 'all 150ms',
                }}
                onMouseEnter={(e) => { if (!copied) { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--coral)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--coral)' } }}
                onMouseLeave={(e) => { if (!copied) { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-default)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)' } }}>
                {copied ? <><Check size={10} strokeWidth={3} /> ✓ {teachingLanguage === 'ru' ? 'Скопировано!' : 'Copied!'}</> : <><Copy size={10} /> {teachingLanguage === 'ru' ? 'Копировать' : 'Copy'}</>}
              </button>
              {/* Maximize/restore — desktop only */}
              <button
                className="hidden md:flex"
                onClick={() => setMaximizedPanel(maximizedPanel === 'code' ? null : 'code')}
                title={maximizedPanel === 'code' ? t('learn_restore') : t('learn_maximize')}
                style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid var(--border-default)', background: 'transparent', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: 11, flexShrink: 0 }}>
                {maximizedPanel === 'code' ? '⊡' : '⊞'}
              </button>
            </PanelHeader>

            {/* Lesson canvas — formatted learning document for non-programming subjects, Monaco code editor otherwise */}
            <div style={{ flex: 1, minHeight: 0, overflow: isNotebook ? 'auto' : 'hidden', background: isNotebook ? 'var(--bg-card)' : undefined }}>
              {isNotebook ? (
                <LessonDocument text={code} />
              ) : (
                <MonacoEditor
                  height="100%" language={language} value={code} theme={monacoTheme}
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
              )}
            </div>

            {/* Status bar */}
            <div style={{
              height: 28, display: 'flex', alignItems: 'center', padding: '0 12px',
              background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)',
              fontSize: 11, fontFamily: isNotebook ? undefined : 'var(--font-mono)', color: 'var(--border-emphasis)',
              justifyContent: 'space-between', flexShrink: 0,
            }}>
              <span>
                {isStreaming
                  ? <span style={{ color: 'var(--coral)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', border: '1.5px solid var(--coral)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                      {teachingLanguage === 'ru' ? 'Репетитор пишет...' : 'Tutor is writing...'}
                    </span>
                  : <span style={{ color: 'var(--green)' }}>● {teachingLanguage === 'ru' ? 'Готово' : 'Ready'}</span>
                }
              </span>
              {isNotebook ? (
                <span style={{ color: 'var(--text-dim)' }}>{currentLessonData ? currentLessonData.unitTitle : subjectName}</span>
              ) : (
                <span style={{ display: 'flex', gap: 8, color: 'var(--text-dim)' }}>
                  <span>{badge.label}</span>
                  <span>·</span>
                  <span>UTF-8</span>
                </span>
              )}
            </div>

            {/* Terminal toggle */}
            {showTerminal && <div
              onClick={() => setTerminalOpen((o) => !o)}
              style={{
                height: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 12px', background: 'var(--bg-void)', borderTop: '2px solid var(--panel-border)',
                boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.2)',
                cursor: 'pointer', fontSize: 12, color: 'var(--border-emphasis)', flexShrink: 0,
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.color = 'var(--text-primary)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.color = 'var(--border-emphasis)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)' }}>
                {terminalOpen ? <ChevronDown size={11} /> : <ChevronUp size={11} />}
                {teachingLanguage === 'ru' ? '▶ Терминал' : '▶ Terminal'}
              </span>
              {terminalOpen && (
                <button onClick={(e) => { e.stopPropagation(); handleRunCode() }}
                  disabled={isRunning}
                  style={{
                    padding: '2px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                    background: 'rgba(247,129,102,0.1)', color: 'var(--coral)', border: '1px solid rgba(247,129,102,0.3)',
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
                height: 180, background: 'var(--bg-void)', borderTop: '2px solid var(--panel-border)',
                borderRadius: '0 0 16px 16px', display: 'flex', flexDirection: 'column', flexShrink: 0,
              }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6 }}>
                  {isRunning
                    ? <span style={{ color: 'var(--yellow)' }}>{`> ${teachingLanguage === 'ru' ? 'Выполнение...' : 'Running...'}`}</span>
                    : terminalOutput
                    ? <>
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: terminalIsError ? 'var(--red)' : 'var(--green)', margin: 0 }}>{terminalOutput}</pre>
                        {terminalDone && <div style={{ marginTop: 8, paddingTop: 8, color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)' }}>
                          {t('lesson_terminal_done')}
                        </div>}
                      </>
                    : <span style={{ color: 'var(--text-dim)' }}>$ {terminalCmd}</span>
                  }
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderTop: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>stdin:</span>
                  <input
                    type="text"
                    value={stdinInput}
                    onChange={(e) => setStdinInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleRunCode() } }}
                    placeholder={t('lesson_terminal_stdin')}
                    style={{ flex: 1, background: 'transparent', fontFamily: 'var(--font-mono)', fontSize: 11, outline: 'none', color: 'var(--text-primary)', caretColor: 'var(--green)', border: 'none' }}
                  />
                </div>
              </div>
            )}
          </div>
        </Panel>
        </div>

        {/* ══ PANEL 3 — TUTOR CHAT (30%) ════════════════════════════════ */}
        <div className={activeTab !== 'chat' ? 'hidden md:contents' : 'contents'}
          style={maximizedPanel && maximizedPanel !== 'chat' ? { display: 'none' } : undefined}>
        <Panel accentColor="#3FB950">
          <div style={{ flexDirection: 'column', height: '100%', position: 'relative' }}
            className={activeTab !== 'chat' ? 'hidden md:flex' : 'flex'}>

            {/* Header (taller) */}
            <PanelHeader tall>
              {/* Avatar — EagleMascot replaces the generic initials avatar */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <EagleMascot variant="logo" size={36} />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {teachingLanguage === 'ru' ? 'Репетитор Макс' : 'Tutor Max'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'blink 2s infinite', display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{teachingLanguage === 'ru' ? 'онлайн' : 'online'}</span>
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
              {/* Maximize/restore — desktop only */}
              <button
                className="hidden md:flex"
                onClick={() => setMaximizedPanel(maximizedPanel === 'chat' ? null : 'chat')}
                title={maximizedPanel === 'chat' ? t('learn_restore') : t('learn_maximize')}
                style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid var(--border-default)', background: 'transparent', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: 11, flexShrink: 0 }}>
                {maximizedPanel === 'chat' ? '⊡' : '⊞'}
              </button>
            </PanelHeader>

            {/* Insights Panel (Sprint P) */}
            {insightsOpen && (
              <InsightsPanel
                subjectSlug={subjectSlug}
                topicSlug={currentLessonData?.topicSlug}
                teachingLanguage={teachingLanguage}
                onClose={() => setInsightsOpen(false)}
                onStartTargetedPractice={(difficulty, categories) => {
                  setPracticeDifficulty(difficulty)
                  setPracticeFocusCategories(categories)
                  setInsightsOpen(false)
                  setPracticeOpen(true)
                }}
              />
            )}

            {/* Practice Panel (Sprint O + P) */}
            {practiceOpen && currentLessonData?.topicSlug && (
              <PracticePanel
                subjectSlug={subjectSlug}
                topicSlug={currentLessonData.topicSlug}
                topicTitle={currentLessonData.lessonTitle}
                lessonGoal={currentLessonData.lessonGoal}
                teachingLanguage={teachingLanguage}
                difficulty={practiceDifficulty}
                focusCategories={practiceFocusCategories}
                onClose={() => {
                  setPracticeOpen(false)
                  setPracticeDifficulty(2)
                  setPracticeFocusCategories([])
                }}
                onComplete={(score, evidenceWritten, topicProgress) => {
                  // Record the score but keep the panel open so the user sees
                  // the result screen; it closes via its Done/✕ buttons.
                  setPracticeScore(score)
                  if (evidenceWritten && currentLessonData.topicSlug && topicProgress) {
                    setTopicProgressMap((prev) => ({
                      ...prev,
                      [currentLessonData.topicSlug!]: { status: topicProgress.status, masteryPct: topicProgress.masteryPct },
                    }))
                    fetch(`/api/topic-progress?subject=${subjectSlug}`)
                      .then((r) => r.json())
                      .then((d) => { if (d.availableNodes) setAvailableTopicSlugs(d.availableNodes) })
                      .catch(() => {})
                  }
                }}
                onViewInsights={() => {
                  setPracticeOpen(false)
                  setPracticeDifficulty(2)
                  setPracticeFocusCategories([])
                  setInsightsOpen(true)
                }}
              />
            )}

            {/* Promotion / assessment result banner — hidden per UX review */}

            {/* Messages */}
            <div
              ref={messagesAreaRef}
              className="dot-grid"
              style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--bg-void)', position: 'relative' }}>

              {/* Welcome / empty state — EagleMascot replaces the generic initials avatar */}
              {messages.length === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 12, paddingTop: 40 }}>
                  <EagleMascot variant="hero" size={56} />
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t('lesson_init')}</p>
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

                    {/* Tutor avatar row — EagleMascot replaces the generic initials avatar */}
                    {!isUser && !msg.streaming && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <EagleMascot variant="logo" size={20} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--border-emphasis)' }}>{teachingLanguage === 'ru' ? 'Репетитор Макс' : 'Tutor Max'}</span>
                      </div>
                    )}

                    {/* Tutor bubble — candy Card surface (flat shadow, no glow) */}
                    {!isUser && (
                      <Card className="group/bubble" style={{
                        maxWidth: '90%',
                        background: isSpeaking ? 'var(--bg-elevated)' : 'var(--candy-card, var(--bg-base))',
                        borderRadius: '4px 18px 18px 18px',
                        padding: '12px 14px',
                        boxShadow: isSpeaking ? '0 4px 0 var(--coral)' : '0 4px 0 var(--border-subtle)',
                        transition: 'box-shadow 200ms',
                      }}>
                        {msg.content
                          ? <div className="animate-message" style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)' }}>
                              <MessageContent text={displayText} isUser={false} />
                            </div>
                          : <TypingDots />
                        }

                        {cached?.hasMore && (
                          <button onClick={() => setExpanded((p) => ({ ...p, [msg.id]: !isExpanded }))}
                            style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: 'var(--coral)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            {isExpanded ? t('lesson_collapse') : t('lesson_read_more')}
                            <ChevronDown size={11} style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }} />
                          </button>
                        )}

                        {!msg.streaming && msg.content && (
                          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                              {new Date(msg.ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </span>
                            {process.env.NODE_ENV === 'development' && msg.provider && (
                              <span title={`Answered by ${msg.provider}`} style={{
                                fontSize: 9, fontWeight: 700, letterSpacing: 0.3, fontFamily: 'var(--font-mono)',
                                padding: '2px 6px', borderRadius: 6, textTransform: 'uppercase',
                                color: msg.provider === 'YANDEX' ? 'var(--coral)' : msg.provider === 'FALLBACK' ? 'var(--yellow)' : 'var(--green)',
                                background: msg.provider === 'YANDEX' ? 'rgba(247,129,102,0.12)' : msg.provider === 'FALLBACK' ? 'rgba(210,153,34,0.12)' : 'rgba(126,231,135,0.12)',
                                border: `1px solid ${msg.provider === 'YANDEX' ? 'rgba(247,129,102,0.35)' : msg.provider === 'FALLBACK' ? 'rgba(210,153,34,0.35)' : 'rgba(126,231,135,0.35)'}`,
                              }}>
                                {msg.provider === 'YANDEX' ? 'YandexGPT' : msg.provider === 'FALLBACK' ? 'Fallback' : 'Groq'}
                              </span>
                            )}
                            <CandyButton onClick={() => isSpeaking ? handleStopSpeech() : handleSpeak(msg.id, msg.content)}
                              depth={2} activeDepth={0} shadowColor={isSpeaking ? 'var(--coral-hover)' : 'var(--border-subtle)'}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 10, border: 'none',
                                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                background: isSpeaking ? 'var(--coral)' : 'var(--bg-elevated)',
                                color: isSpeaking ? '#fff' : 'var(--text-dim)',
                              }}>
                              {isSpeaking
                                ? <><Square size={8} fill="currentColor" strokeWidth={0} />{t('lesson_stop')}</>
                                : <><Play size={8} fill="currentColor" strokeWidth={0} />{t('lesson_play')}</>}
                            </CandyButton>
                          </div>
                        )}

                        {/* Comprehension buttons after tutor message — candy pill buttons */}
                        {!msg.streaming && msg.content && (
                          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                            <CandyButton
                              onClick={() => sessionId && sendMessage(sessionId, teachingLanguage === 'ru' ? 'Понял' : 'Got it', true)}
                              disabled={isStreaming || !sessionId}
                              depth={2} activeDepth={0} shadowColor="var(--green)"
                              style={{
                                padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none',
                                background: 'var(--green)', color: '#fff',
                              }}>
                              ✓ {teachingLanguage === 'ru' ? 'Понял' : 'Got it'}
                            </CandyButton>
                            <CandyButton
                              onClick={() => sessionId && sendMessage(sessionId, teachingLanguage === 'ru' ? 'Не понял, объясни по-другому' : "I don't understand, explain differently", true)}
                              disabled={isStreaming || !sessionId}
                              depth={2} activeDepth={0} shadowColor="var(--red)"
                              style={{
                                padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none',
                                background: 'var(--red)', color: '#fff',
                              }}>
                              ✗ {teachingLanguage === 'ru' ? 'Не понял' : 'Not clear'}
                            </CandyButton>
                          </div>
                        )}
                      </Card>
                    )}

                    {/* Sprint BW: Visual Learning Aid — shown below tutor bubble when present */}
                    {!isUser && !msg.streaming && msg.visual && (
                      <div style={{ maxWidth: '90%', animation: 'fadeUp 300ms ease-out both' }}>
                        <VisualCard type={msg.visual as VisualType} autoPlay speed={speed} />
                      </div>
                    )}

                    {/* Sprint B: data-driven visual (graph / number_line). Only renders
                        when a tutor message carries a VisualSpec; absent on every
                        existing lesson, so those render exactly as before (zero regression). */}
                    {!isUser && !msg.streaming && msg.visualSpec && (
                      <div style={{ maxWidth: '90%', animation: 'fadeUp 300ms ease-out both' }}>
                        <VisualRenderer spec={msg.visualSpec} />
                      </div>
                    )}

                    {/* Student bubble */}
                    {isUser && (
                      <div style={{ animation: 'slideInRight 200ms ease-out both', maxWidth: '75%' }}>
                        <div style={{
                          padding: '12px 14px', borderRadius: '18px 18px 4px 18px', fontSize: 13, lineHeight: 1.5,
                          background: 'linear-gradient(135deg, var(--coral), var(--coral-hover))', color: 'var(--text-inverse)',
                          boxShadow: '0 4px 0 var(--coral-hover)',
                        }}>
                          <MessageContent text={displayText} isUser={true} />
                        </div>
                        <p style={{ fontSize: 10, color: 'var(--text-dim)', textAlign: 'right', marginTop: 3, fontFamily: 'var(--font-mono)' }}>
                          {new Date(msg.ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Thinking — candy Pill */}
              {isStreaming && messages.at(-1)?.streaming && !messages.at(-1)?.content && (
                <Pill style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)', background: 'var(--bg-elevated)', padding: '6px 12px' }}>
                  <TypingDots />
                  <span>{teachingLanguage === 'ru' ? 'Думает...' : 'Thinking...'}</span>
                </Pill>
              )}

              <div ref={messagesEndRef} />

              {/* Scroll to bottom */}
              {!atBottom && (
                <button onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })}
                  style={{
                    position: 'sticky', bottom: 8, alignSelf: 'flex-end',
                    width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--coral)', color: 'var(--text-inverse)', fontSize: 12, border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(247,129,102,0.4)',
                  }}>↓</button>
              )}
            </div>

            {/* ── Input area ──────────────────────────────────────────── */}
            <div style={{ flexShrink: 0, borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-base)', borderRadius: '0 0 16px 16px', padding: '10px 12px' }}>

              {/* Image preview */}
              {selectedImage && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedImage.preview} alt="preview" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border-subtle)' }} />
                  <span style={{ fontSize: 11, color: 'var(--coral)', flex: 1 }}>📸 {teachingLanguage === 'ru' ? 'Изображение выбрано' : 'Image selected'}</span>
                  <button onClick={() => setSelectedImage(null)} style={{ color: 'var(--border-emphasis)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={13} /></button>
                </div>
              )}

              {/* File badge */}
              {attachedFile && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 500, background: 'rgba(121,192,255,0.1)', color: 'var(--blue)', border: '1px solid rgba(121,192,255,0.2)' }}>
                    <Paperclip size={10} /> {attachedFile.name}
                  </span>
                  <button onClick={() => setAttachedFile(null)} style={{ color: 'var(--border-emphasis)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={13} /></button>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                {/* Attach */}
                <input ref={fileInputRef} type="file" accept=".py,.c,.cpp,.txt" className="hidden" onChange={handleFileSelect} />
                <CandyButton onClick={() => fileInputRef.current?.click()} disabled={isStreaming || !sessionId}
                  depth={2} activeDepth={0} shadowColor={attachedFile ? 'var(--blue)' : 'var(--border-subtle)'}
                  style={{
                    width: 30, height: 30, borderRadius: 10, flexShrink: 0, cursor: 'pointer', border: 'none',
                    background: attachedFile ? 'var(--blue)' : 'var(--bg-elevated)',
                    color: attachedFile ? '#fff' : 'var(--border-emphasis)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  <Paperclip size={13} />
                </CandyButton>

                {/* Camera */}
                <input ref={imageInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageSelect} />
                <CandyButton onClick={() => imageInputRef.current?.click()} disabled={isStreaming || !sessionId}
                  depth={2} activeDepth={0} shadowColor={selectedImage ? 'var(--coral-hover)' : 'var(--border-subtle)'}
                  style={{
                    width: 30, height: 30, borderRadius: 10, flexShrink: 0, cursor: 'pointer', fontSize: 14, border: 'none',
                    background: selectedImage ? 'var(--coral)' : 'var(--bg-elevated)',
                    color: selectedImage ? '#fff' : 'var(--border-emphasis)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  📸
                </CandyButton>

                {/* Practice button */}
                {currentLessonData?.topicSlug && (
                  <button
                    onClick={async () => {
                      setInsightsOpen(false)
                      // Sprint R: merge learner intelligence profile with practice analysis
                      // to auto-set difficulty and focus categories before opening.
                      if (!practiceOpen) {
                        try {
                          const [analysisRes, profileRes] = await Promise.all([
                            fetch(`/api/practice/analysis?subject=${subjectSlug}`).then((r) => r.json()).catch(() => null),
                            fetch(`/api/learner/profile-insights?subject=${subjectSlug}`).then((r) => r.json()).catch(() => null),
                          ])
                          // Learner profile takes precedence over raw analysis for difficulty
                          const difficulty = profileRes?.meta?.recommendedDifficulty
                            ?? analysisRes?.recommendedDifficulty
                            ?? 2
                          const focusFromProfile = (profileRes?.meta?.weakConcepts ?? []).slice(0, 3)
                          const focusFromAnalysis = analysisRes?.recommendedFocusCategories ?? []
                          const focus = focusFromProfile.length > 0 ? focusFromProfile : focusFromAnalysis
                          setPracticeDifficulty(difficulty)
                          setPracticeFocusCategories(focus)
                        } catch {}
                      }
                      setPracticeOpen((v) => !v)
                    }}
                    title={practiceScore !== null ? `Practice: ${practiceScore}%` : (teachingLanguage === 'ru' ? 'Практика' : teachingLanguage === 'hi' ? 'अभ्यास' : 'Practice')}
                    style={{
                      width: 30, height: 30, borderRadius: 10, flexShrink: 0, cursor: 'pointer', fontSize: 13, border: 'none',
                      background: practiceOpen ? 'var(--candy-purple)' : practiceScore !== null ? 'var(--green)' : 'var(--bg-elevated)',
                      color: practiceOpen || practiceScore !== null ? '#fff' : 'var(--border-emphasis)',
                      boxShadow: practiceOpen ? '0 2px 0 var(--candy-purple-d)' : practiceScore !== null ? '0 2px 0 var(--green)' : '0 2px 0 var(--border-subtle)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                    {practiceScore !== null ? '✓' : '✏️'}
                  </button>
                )}

                {/* Insights button (Sprint P) */}
                {currentLessonData?.topicSlug && (
                  <button
                    onClick={() => { setPracticeOpen(false); setInsightsOpen((v) => !v) }}
                    title={teachingLanguage === 'ru' ? 'Аналитика практики' : teachingLanguage === 'hi' ? 'अभ्यास विश्लेषण' : 'Practice insights'}
                    style={{
                      width: 30, height: 30, borderRadius: 10, flexShrink: 0, cursor: 'pointer', fontSize: 13, border: 'none',
                      background: insightsOpen ? 'var(--yellow)' : 'var(--bg-elevated)',
                      color: insightsOpen ? '#fff' : 'var(--border-emphasis)',
                      boxShadow: insightsOpen ? '0 2px 0 var(--yellow)' : '0 2px 0 var(--border-subtle)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                    📊
                  </button>
                )}

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  disabled={isStreaming || !sessionId}
                  placeholder={micState === 'recording' ? t('lesson_recording') : micState === 'processing' ? t('lesson_processing') : isStreaming ? t('lesson_responding') : t('lesson_placeholder')}
                  rows={1}
                  style={{
                    flex: 1, padding: '7px 10px', borderRadius: 10, resize: 'none', outline: 'none', fontSize: 13, lineHeight: 1.5,
                    background: 'var(--bg-surface)',
                    border: `1px solid ${micState === 'recording' ? 'var(--red)' : micState === 'processing' ? 'var(--border-emphasis)' : input ? 'var(--coral)' : 'var(--border-default)'}`,
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    minHeight: 34, maxHeight: 96,
                    boxShadow: input ? '0 0 0 3px rgba(247,129,102,0.1)' : 'none',
                    transition: 'border-color 150ms, box-shadow 150ms',
                  }}
                />

                {/* Mic */}
                {micSupported && (
                  <CandyButton onClick={handleMicClick} disabled={isStreaming || !sessionId || micState === 'processing'}
                    className={micState === 'recording' ? 'mic-rec' : ''}
                    depth={2} activeDepth={0}
                    shadowColor={micState === 'recording' ? 'var(--red)' : micState === 'processing' ? 'var(--border-subtle)' : 'var(--border-subtle)'}
                    style={micState === 'recording' ? { width: 32, height: 32, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'var(--red)', color: '#fff' }
                      : micState === 'processing' ? { width: 32, height: 32, borderRadius: '50%', flexShrink: 0, cursor: 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-elevated)', color: 'var(--text-dim)', border: 'none', opacity: 0.7 }
                      : { width: 32, height: 32, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-elevated)', color: 'var(--border-emphasis)', border: 'none' }}>
                    {micState === 'recording'
                      ? <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 7, fontWeight: 700, gap: 1 }}><Mic size={11} />REC</span>
                      : micState === 'processing'
                      ? <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 7, fontWeight: 700, gap: 1 }}><Mic size={11} />...</span>
                      : <Mic size={14} />}
                  </CandyButton>
                )}

                {/* Send */}
                <CandyButton onClick={handleSend}
                  disabled={(!input.trim() && !attachedFile && !selectedImage) || isStreaming || !sessionId}
                  depth={2} activeDepth={0} shadowColor="var(--coral-hover)"
                  style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none',
                    background: 'var(--coral)', color: '#fff',
                    opacity: (!input.trim() && !attachedFile && !selectedImage) || isStreaming || !sessionId ? 0.4 : 1,
                    transition: 'opacity 150ms',
                  }}>
                  <Send size={14} style={{ transform: 'translateX(1px)' }} />
                </CandyButton>
              </div>

              <p style={{ fontSize: 10, color: 'var(--text-dim)', textAlign: 'center', marginTop: 6 }}>
                {t('lesson_hint')}{micSupported ? ' · 🎙' : ''}
              </p>
            </div>
          </div>
        </Panel>
        </div>

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

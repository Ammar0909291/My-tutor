'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  Check, ChevronDown, ChevronUp, Copy, Lightbulb, Loader2, Mic, Paperclip, Play, Send, Square, X,
  BookOpen, Dumbbell, BarChart3, Library as LibraryIcon, User, Settings as SettingsIcon,
  Bookmark, MoreVertical, Sparkles, Users, ImageIcon, Trophy, Globe2, Gauge, ThumbsUp, ThumbsDown,
  Network, ListChecks, PanelRightOpen,
} from 'lucide-react'
import { useLanguage } from '@/components/ui/LanguageToggle'
import { useCountry, useTheme } from '@/components/Providers'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { speakText, stopSpeaking, VOICE_SPEED_OPTIONS, SERVER_TTS_LANGS, LANG_LOCALE, canUseSpeechRecognition, type VoiceType, type TeachingLang } from '@/lib/tts'
import type { VoiceTimingSignal } from '@/lib/voice/voiceSignal'
import { fetchWithTimeout } from '@/lib/net/timeout'
import { isFallbackResponse, pickRecoveryMessage } from '@/lib/learn/tutorRecovery'
import { useDraftMessage, clearDraft } from '@/lib/hooks/useDraftMessage'
import { LearnerPositionPanel, LockedTopicDetail } from '@/components/learn/LearnerPositionPanel'
import { recordLastLesson } from '@/lib/hooks/useLastLesson'
import { PracticePanel } from '@/components/learn/PracticePanel'
import { InsightsPanel } from '@/components/learn/InsightsPanel'
import { LessonNavigationPanel } from '@/components/learn/LessonNavigationPanel'
import {
  computeLessonLockState, findPreviousLesson, findNextLesson,
  type CurriculumLesson, type CurriculumProgress, type TopicProgressEntry,
} from '@/lib/curriculum/lessonNavigation'
import { FinalAssessmentModal } from '@/components/learn/FinalAssessmentModal'
import { VisualCard } from '@/components/school/visuals/VisualCard'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { extractNarrationSegments } from '@/lib/visuals/narrationSource'
// Visual Learning Sprint B: data-driven visuals (graph / number_line). Additive
// to the existing Sprint BW static VisualCard path — see render block below.
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { parseVisualSpec, type VisualSpec } from '@/lib/visuals/visualSpec'
import type { InlinePracticeQuestion } from '@/lib/school/practice/generateInlinePractice'
import { parseLessonCompletionTag, parseMathCodeAnswerTags, parseAssessmentResultTag } from '@/lib/school/tutoring/parseAssistantTags'
import { Card, CandyButton, Pill, EagleMascot, useConfetti } from '@/components/ui/candy'
import katex from 'katex'
import styles from './LessonScreen.module.css'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })
// react-three-fiber needs a real DOM/WebGL context — load client-only, same as Monaco.
const SceneSpecRenderer = dynamic(
  () => import('@/components/school/visuals/SceneSpecRenderer').then((m) => m.SceneSpecRenderer),
  { ssr: false },
)
// Renders inside a sandboxed iframe (see DynamicVisualRenderer.tsx) — no need
// for SSR since it has nothing to render until the AI response arrives.
const DynamicVisualRenderer = dynamic(
  () => import('@/components/learn/DynamicVisualRenderer').then((m) => m.DynamicVisualRenderer),
  { ssr: false },
)

// ─── Config ───────────────────────────────────────────────────────────────────
const VOICE_LABELS_BY_LANG: Record<TeachingLang, Record<VoiceType, string>> = {
  ru: { male: 'Мужской', female: 'Женский', warm: 'Тёплый' },
  en: { male: 'Male',    female: 'Female',  warm: 'Warm'    },
  hi: { male: 'पुरुष',   female: 'महिला',   warm: 'मधुर'   },
}
const LANG_LABEL: Record<TeachingLang, string> = { ru: 'Русский', en: 'English', hi: 'हिन्दी' }
const LANG_SHORT: Record<TeachingLang, string> = { en: 'Eng', hi: 'Hindi', ru: 'Ru' }
const VOICE_MAP: Record<string, VoiceType> = {
  male: 'male', female: 'female', warm: 'warm',
  alexei: 'male', maria: 'female', dmitry: 'warm',
}
import { isInternalOpeningPrompt } from '@/lib/learn/internalPromptFilter'

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

// ─── "My Tutor" redesign tokens (Learn window only — approved exception to the
// standing "don't redesign UI" rule, scoped to this screen) ───────────────────
// Kept as literal hex (not var(--indigo)) because many call sites append a hex
// alpha suffix directly (e.g. `${UI.indigo}18`) — CSS custom properties can't be
// suffixed that way. --indigo/--indigo-hover in src/styles/tokens.css are the
// canonical theme-token definition of this same color; keep both in sync.
const UI = {
  indigo: '#6C5CE7', indigoDark: '#5A4BD1',
  green: '#22C55E', greenBg: 'rgba(34,197,94,0.1)', greenBorder: 'rgba(34,197,94,0.3)',
  red: '#EF4444', redBg: 'rgba(239,68,68,0.08)', redBorder: 'rgba(239,68,68,0.25)',
  amber: '#F59E0B',
  card: 'var(--bg-surface)', page: 'var(--bg-void)', border: 'var(--border-subtle)',
  textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)', textDim: 'var(--text-dim)',
}

// Quick-action prompts sent verbatim as a user turn (right-panel "What would you like to do?").
const QUICK_ACTIONS: Record<TeachingLang, { key: string; icon: 'simpler'|'example'|'diagram'|'challenge'; label: string; prompt: string }[]> = {
  en: [
    { key: 'simpler',  icon: 'simpler',  label: 'Explain in simpler way',   prompt: 'Can you explain that in a simpler way?' },
    { key: 'example',  icon: 'example',  label: 'Show real-life example',  prompt: 'Can you show me a real-life example of this?' },
    { key: 'diagram',  icon: 'diagram',  label: 'Give me a diagram',       prompt: 'Can you give me a diagram to visualize this?' },
    { key: 'challenge',icon: 'challenge',label: 'Challenge me',            prompt: 'Challenge me with a harder question on this topic.' },
  ],
  ru: [
    { key: 'simpler',  icon: 'simpler',  label: 'Объясни проще',            prompt: 'Можешь объяснить это проще?' },
    { key: 'example',  icon: 'example',  label: 'Пример из жизни',          prompt: 'Покажи пример из реальной жизни.' },
    { key: 'diagram',  icon: 'diagram',  label: 'Дай диаграмму',            prompt: 'Дай диаграмму для наглядности.' },
    { key: 'challenge',icon: 'challenge',label: 'Испытай меня',             prompt: 'Дай мне более сложный вопрос по этой теме.' },
  ],
  hi: [
    { key: 'simpler',  icon: 'simpler',  label: 'Aasan tarike se samjhao',  prompt: 'Isse aasan tarike se samjha sakte ho?' },
    { key: 'example',  icon: 'example',  label: 'Real-life example dikhao',prompt: 'Isse real-life example ke saath dikhao.' },
    { key: 'diagram',  icon: 'diagram',  label: 'Diagram do',              prompt: 'Isko samjhane ke liye ek diagram do.' },
    { key: 'challenge',icon: 'challenge',label: 'Challenge do',            prompt: 'Mujhe iss topic pe ek mushkil sawal do.' },
  ],
}
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
// LaTeX math: the AI writes display math as \[...\] / $$...$$ (often spanning
// multiple lines) and inline math as \(...\). Deliberately NOT matching bare
// $...$ — that collides with plain currency mentions (economics/finance
// content). Display math is extracted from the FULL message text (via
// extractDisplayMath) before the caller splits it into lines/blocks, and
// swapped for a single-line placeholder so a multi-line \[...\] block
// survives line-splitting intact; renderInline then resolves placeholders
// (and matches inline \(...\) directly, since that never spans lines).
const DISPLAY_MATH_RE = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]/g
const PLACEHOLDER_RE = /(\d+)/
const INLINE_MATH_OR_PLACEHOLDER_RE = /(\\\([\s\S]+?\\\)|\d+)/g

function extractDisplayMath(text: string): { text: string; blocks: string[] } {
  const blocks: string[] = []
  const replaced = text.replace(DISPLAY_MATH_RE, (m) => {
    blocks.push(m)
    return `${blocks.length - 1}`
  })
  return { text: replaced, blocks }
}

function renderMath(raw: string, key: string, displayMode: boolean): React.ReactNode {
  const content = raw.slice(2, -2).trim()
  let html: string
  try {
    html = katex.renderToString(content, { throwOnError: false, displayMode })
  } catch {
    return raw
  }
  return (
    <span
      key={key}
      style={displayMode ? { display: 'block', overflowX: 'auto', margin: '4px 0' } : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function renderMarkdownSpans(text: string, key: string, codeStyle: string): React.ReactNode {
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

function renderInline(text: string, key: string, codeStyle: string, mathBlocks: string[] = []): React.ReactNode {
  const parts: React.ReactNode[] = []; let last = 0; let mi = 0; let m: RegExpExecArray | null
  INLINE_MATH_OR_PLACEHOLDER_RE.lastIndex = 0
  while ((m = INLINE_MATH_OR_PLACEHOLDER_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(renderMarkdownSpans(text.slice(last, m.index), `${key}-t${mi}`, codeStyle))
    const raw = m[0]
    const placeholder = raw.match(PLACEHOLDER_RE)
    if (placeholder) parts.push(renderMath(mathBlocks[Number(placeholder[1])] ?? '', `${key}-m${mi}`, true))
    else parts.push(renderMath(raw, `${key}-m${mi}`, false))
    last = m.index + raw.length; mi++
  }
  if (last < text.length) parts.push(renderMarkdownSpans(text.slice(last), `${key}-t${mi}`, codeStyle))
  return parts.length === 0 ? text : parts
}

function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
  const codeStyle = `px-1.5 py-0.5 rounded text-[0.82em] font-mono ${isUser ? 'bg-white/20' : 'bg-black/30'} ${isUser ? '' : 'text-[var(--coral)]'}`
  const { text: textWithPlaceholders, blocks: mathBlocks } = extractDisplayMath(text)
  return (
    <div className="space-y-1">
      {textWithPlaceholders.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        if (line.match(/^#+\s/)) return <p key={i} className="font-bold" style={{ color: 'var(--text-primary)' }}>{renderInline(line.replace(/^#+\s/, ''), `${i}`, codeStyle, mathBlocks)}</p>
        const bullet = line.match(/^[-•*]\s+(.*)$/)
        if (bullet) return (
          <div key={i} className="flex gap-2">
            <span className="mt-0.5 shrink-0 text-xs" style={{ color: 'var(--coral)' }}>▸</span>
            <span>{renderInline(bullet[1], `${i}`, codeStyle, mathBlocks)}</span>
          </div>
        )
        const num = line.match(/^(\d+)\.\s+(.*)$/)
        if (num) return (
          <div key={i} className="flex gap-2">
            <span className="tabular-nums text-xs mt-0.5 shrink-0 font-mono" style={{ color: 'var(--coral)' }}>{num[1]}.</span>
            <span>{renderInline(num[2], `${i}`, codeStyle, mathBlocks)}</span>
          </div>
        )
        return <p key={i}>{renderInline(line, `${i}`, codeStyle, mathBlocks)}</p>
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
  const { text: textWithPlaceholders, blocks: mathBlocks } = extractDisplayMath(text)
  const blocks = parseLessonBlocks(textWithPlaceholders)
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
              <span>{renderInline(b.text, `h${idx}`, codeInline, mathBlocks)}</span>
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
                  ? <p key={j} style={{ margin: j === 0 ? 0 : '4px 0 0' }}>{renderInline(l, `${idx}-${j}`, codeInline, mathBlocks)}</p>
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
                  <span>{renderInline(item, `${idx}-${j}`, codeInline, mathBlocks)}</span>
                </div>
              ))}
            </div>
          )
        }
        return (
          <div key={idx} style={{ margin: '12px 0', fontSize: 15.5, lineHeight: 1.75 }}>
            {b.lines.map((l, j) => <p key={j} style={{ margin: j === 0 ? 0 : '6px 0 0' }}>{renderInline(l, `${idx}-${j}`, codeInline, mathBlocks)}</p>)}
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

// ─── AI Badge ──────────────────────────────────────────────────────────────────
// Tiny premium pill shown next to "Tutor Max" when an AI provider actually
// answered the turn. Runtime-only: the parent gates rendering on msg.provider
// (Brain-served turns pass provider='memory' and never mount this component).
function AiBadge({ provider }: { provider: string }) {
  const model =
    provider === 'groq' ? 'Groq (GPT-OSS-20B)'
    : provider === 'yandex' ? 'YandexGPT'
    : provider === 'fallback' ? 'Fallback model'
    : 'Unknown'
  const tooltip = `AI Generated\nModel: ${model}\nReason: AI fallback used.`
  return (
    <span
      title={tooltip}
      aria-label={tooltip}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        height: 14,
        padding: '0 6px',
        borderRadius: 999,
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: 0.5,
        color: '#fff',
        background: 'linear-gradient(135deg, #4A6CF7 0%, #8B5CF6 100%)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 0 6px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
        cursor: 'help',
        userSelect: 'none',
      }}
    >
      <span aria-hidden style={{ fontSize: 7, opacity: 0.9 }}>✦</span>
      AI
    </span>
  )
}

// ─── Inline practice MCQ (Sprint W gap fix) ────────────────────────────────────
// Renders the structured InlinePracticeQuestion the route attaches alongside an
// assistant message (msg.inlinePractice) as a dedicated candy-styled card with
// real answer-capture and immediate scoring feedback, instead of the previous
// plain markdown text the AI used to write out itself. Purely local state — no
// new API call, since the question/answer pair already arrived with the message.
function InlinePracticePrompt({ practice, onAnswered }: { practice: InlinePracticeQuestion; onAnswered?: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const correct = selected !== null && selected === practice.answer

  return (
    <Card style={{ padding: 18, maxWidth: '90%' }}>
      <Pill color="var(--candy-purple, var(--coral))" style={{ marginBottom: 10 }}>
        🎯 Quick check
      </Pill>
      <p style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.5, color: 'var(--text-primary)', margin: '0 0 12px' }}>
        {practice.question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {practice.options.map((opt, i) => {
          const isSelected = selected === opt
          const isAnswer = opt === practice.answer
          const showResult = selected !== null
          const bg = showResult && isAnswer
            ? 'rgba(34,197,94,0.12)'
            : showResult && isSelected
              ? 'rgba(239,68,68,0.12)'
              : 'var(--bg-elevated, transparent)'
          const border = showResult && isAnswer
            ? '2px solid var(--green, #22c55e)'
            : showResult && isSelected
              ? '2px solid var(--red, #ef4444)'
              : '2px solid var(--border-subtle)'
          return (
            <CandyButton
              key={i}
              onClick={() => { if (selected === null) { setSelected(opt); setTimeout(() => onAnswered?.(opt === practice.answer), 1500) } }}
              disabled={selected !== null}
              shadowColor={showResult && isAnswer ? 'var(--green, #22c55e)' : showResult && isSelected ? 'var(--red, #ef4444)' : 'var(--border-subtle)'}
              style={{
                width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', borderRadius: 12, background: bg, border,
                fontSize: 13, fontWeight: 600, color: 'var(--text-primary)',
              }}
            >
              <span style={{
                width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, flexShrink: 0, background: 'var(--border-subtle)', color: 'var(--text-dim)',
              }}>
                {['A', 'B', 'C', 'D'][i]}
              </span>
              <span>{opt}</span>
              {showResult && isAnswer && <Check size={15} style={{ marginLeft: 'auto', color: 'var(--green, #22c55e)' }} />}
              {showResult && isSelected && !isAnswer && <X size={15} style={{ marginLeft: 'auto', color: 'var(--red, #ef4444)' }} />}
            </CandyButton>
          )
        })}
      </div>
      {selected !== null && (
        <p style={{ fontSize: 12, fontWeight: 700, margin: '10px 0 0', color: correct ? 'var(--green, #22c55e)' : 'var(--red, #ef4444)' }}>
          {correct ? '✓ Correct!' : `✗ Not quite — the answer is "${practice.answer}".`}
        </p>
      )}
    </Card>
  )
}

// ─── Hint action type (Sprint W gap A) ─────────────────────────────────────────
// Renders the structured [HINT] tag text as a tap-to-reveal candy card —
// collapsed by default so the student chooses whether to see it (rather than
// it landing pre-revealed inside the tutor's own prose, which would spoil it
// unconditionally). Purely local state — the hint text already arrived with
// the message.
function HintCard({ hint }: { hint: string }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <Card style={{ padding: 14, maxWidth: '90%' }}>
      <CandyButton
        onClick={() => setRevealed((r) => !r)}
        depth={0}
        hoverLift={0}
        activePush={0}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          background: 'transparent', padding: 0,
          fontSize: 13, fontWeight: 700, color: 'var(--text-primary)',
        }}
      >
        <Lightbulb size={17} style={{ flexShrink: 0, color: 'var(--candy-yellow-d)' }} />
        <span style={{ color: 'var(--text-primary)' }}>{revealed ? 'Hint' : 'Need a hint? Tap to reveal'}</span>
        {revealed ? <ChevronUp size={15} style={{ marginLeft: 'auto', color: 'var(--text-dim)' }} /> : <ChevronDown size={15} style={{ marginLeft: 'auto', color: 'var(--text-dim)' }} />}
      </CandyButton>
      {revealed && (
        <p style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.5, color: 'var(--text-primary)', margin: '10px 0 0' }}>
          {hint}
        </p>
      )}
    </Card>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────
type ChatMsg = { id: string; role: 'user'|'assistant'; content: string; ts: number; streaming?: boolean; provider?: string; visual?: string; visualSpec?: VisualSpec; sceneSpec?: SceneSpec; dynamicVisualizationCode?: string; inlinePractice?: InlinePracticeQuestion; hint?: string }
type MicState = 'idle' | 'recording' | 'processing'
type AttachedFile = { name: string; content: string; language: string }
type ActiveTab = 'curriculum' | 'code' | 'chat'
// CurriculumLesson, CurriculumProgress, TopicProgressEntry now live in
// @/lib/curriculum/lessonNavigation (imported above) — single source of
// truth shared with the Lesson Navigation Panel, no duplicate type shapes.
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
        boxShadow: `0 0 0 1px ${accentColor}22, 0 1px 3px rgba(0,0,0,0.06)`,
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

// "What would you like to do?" quick-prompt buttons — occupies the right-hand
// rail for non-programming subjects (mockup's right panel). Quick Check
// (multiple-choice) intentionally lives inline in the chat feed via
// InlinePracticePrompt, directly under the explanation/diagram it follows —
// not duplicated here.
function QuickActionsAndCheck({
  teachingLanguage, sessionId, sendMessage, setActiveTab,
}: {
  teachingLanguage: TeachingLang
  sessionId: string | null
  sendMessage: (sid: string, text: string, showInUI?: boolean, voiceSignal?: VoiceTimingSignal) => Promise<void>
  setActiveTab: (tab: ActiveTab) => void
}) {
  const ICONS = { simpler: Sparkles, example: Users, diagram: ImageIcon, challenge: Trophy }
  const actions = QUICK_ACTIONS[teachingLanguage] ?? QUICK_ACTIONS.en

  const askForAction = (prompt: string) => {
    if (!sessionId) return
    sendMessage(sessionId, prompt, true)
    setActiveTab('chat')
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* What would you like to do? */}
      <div>
        <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
          {teachingLanguage === 'ru' ? 'Что бы вы хотели сделать?' : 'What would you like to do?'}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {actions.map((a) => {
            const Icon = ICONS[a.icon]
            const palette: Record<typeof a.icon, { bg: string; fg: string }> = {
              simpler: { bg: `${UI.indigo}14`, fg: UI.indigo },
              example: { bg: 'rgba(121,192,255,0.12)', fg: '#3B82F6' },
              diagram: { bg: 'rgba(34,197,94,0.12)', fg: UI.green },
              challenge: { bg: 'rgba(245,158,11,0.12)', fg: UI.amber },
            }
            const c = palette[a.icon]
            return (
              <button key={a.key} onClick={() => askForAction(a.prompt)} disabled={!sessionId}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10,
                  background: c.bg, color: c.fg, border: 'none', cursor: sessionId ? 'pointer' : 'not-allowed',
                  fontSize: 12.5, fontWeight: 700, textAlign: 'left',
                }}>
                <Icon size={15} style={{ flexShrink: 0 }} />
                {a.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Desktop-only flyout for QuickActionsAndCheck (UI/UX P0 sprint). Root cause
// this replaces: the quick-actions rail used to be a permanent 28%-wide grid
// column on every non-code lesson, competing with the chat panel for space
// even though it's used far less often than the conversation itself. This
// renders collapsed to a small floating handle by default; hovering it (or
// the expanded panel) reveals the full action list, and moving the mouse
// away collapses it again — pure CSS transitions (width + opacity), no JS
// state, so there's no re-render or flicker on hover and no layout shift
// anywhere else on the page (this is `position: fixed`, entirely outside
// the grid's document flow — it can never push or resize the chat/curriculum
// columns). Desktop-only by design (`hidden md:block`): on mobile the
// existing "Code" tab already shows/hides this exact content on tap, which
// already satisfies "hidden until tapped" without needing a second control.
function FloatingQuickActions(props: {
  teachingLanguage: TeachingLang
  sessionId: string | null
  sendMessage: (sid: string, text: string, showInUI?: boolean, voiceSignal?: VoiceTimingSignal) => Promise<void>
  setActiveTab: (tab: ActiveTab) => void
}) {
  return (
    // Root cause of the panel never actually expanding on hover: both children
    // below are `position: absolute`, taken out of normal flow entirely — a
    // parent with no other content and no explicit size collapses to a 0×0
    // box even though its absolutely-positioned children render visibly.
    // `:hover` only ever matches an element's own painted area, so `.group`
    // could never register as hovered no matter where the pointer sat over
    // the (visually real, but geometrically parent-less) handle. Giving the
    // wrapper explicit dimensions — sized to the max expanded width AND tall
    // enough to contain the expanded panel's own content (not just the 56px
    // handle — a shorter wrapper would let the mouse "exit" the hoverable box
    // the instant it moved down into the lower part of the expanded list,
    // collapsing the panel while still visually over it), right-aligned to
    // match the handle/panel's own right:0 anchoring — makes its box
    // genuinely cover both children, so hovering the handle (or the expanded
    // panel itself) actually triggers `.group:hover` as intended.
    <div
      className="hidden md:flex group"
      style={{
        position: 'fixed', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 30,
        width: 240, height: 340, justifyContent: 'flex-end', alignItems: 'center',
      }}
    >
      {/* Handle — always visible, sits flush against the viewport edge.
          Root cause of the hover state never visually taking effect: opacity
          (here) and width (on the panel below) were originally set via the
          inline `style` prop for their COLLAPSED/default value, with only the
          HOVERED value expressed as a Tailwind `group-hover:` class. Inline
          styles always win over any class-based rule regardless of selector
          specificity (short of `!important`) — so the inline collapsed value
          permanently overrode the class-based hovered value, and the hover
          rule (confirmed present and correct in the compiled CSS) could
          never actually take visual effect. Fix: express BOTH the default
          and the hovered value as Tailwind classes (`opacity-100` here,
          `w-0 opacity-0 pointer-events-none` below) so they share the same
          origin and the hover variant's later cascade position correctly
          wins, instead of one being inline and unbeatable. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)',
          width: 34, height: 56, borderRadius: '12px 0 0 12px',
          background: UI.indigo, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '-2px 2px 8px rgba(0,0,0,0.18)',
          transition: 'opacity 180ms ease',
        }}
        className="opacity-100 group-hover:opacity-0"
      >
        <PanelRightOpen size={16} />
      </div>

      {/* Expanded panel — width/opacity animate on hover; pointer-events off
          while collapsed so the invisible expanded area never eats clicks
          meant for the chat panel behind it. See the handle comment above
          for why width/opacity/pointer-events must be Tailwind classes here
          too, not inline style values. */}
      <div
        role="region"
        aria-label={props.teachingLanguage === 'ru' ? 'Быстрые действия' : 'Quick actions'}
        style={{
          overflow: 'hidden',
          maxHeight: 340, background: 'var(--bg-surface)',
          borderRadius: '14px 0 0 14px', border: '1px solid var(--border-subtle)', borderRight: 'none',
          boxShadow: '-4px 4px 16px rgba(0,0,0,0.22)',
          transition: 'width 220ms ease, opacity 180ms ease',
        }}
        className="w-0 opacity-0 pointer-events-none group-hover:w-[240px] group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:w-[240px] group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
      >
        <div style={{ width: 240 }}>
          <QuickActionsAndCheck {...props} />
        </div>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
// WhatsApp-style history: ALL messages live in state (never trimmed); only
// the newest window is mounted in the DOM, growing as the user scrolls up.
// Keeps 5000+ message conversations smooth without any virtualization lib.
const HISTORY_RENDER_WINDOW = 100

export function LessonScreen({ subjectSlug, subjectName, levelDescription, voiceChoice, teachingLanguage: teachingLanguageProp = 'en', voiceSpeed = 1, memoryContext, pastSessionsSummary, subjects, displayName, userId, resumeLessonTitle, resumeUnitTitle, schoolChapterId, autoOpenPractice, initialPrompt }: Props) {
  const { t, lang: uiLang, setLang: setUiLang } = useLanguage()
  const { country } = useCountry()
  const { theme } = useTheme()

  // Core state
  const [sessionId, setSessionId] = useState<string|null>(null)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [code, setCode] = useState(INITIAL_CODE[subjectSlug] ?? '// ...\n')
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [initError, setInitError] = useState('')
  // FIX 1 (stabilization): gate — the Educational Brain / AI teaching only
  // begins once the learner presses "Start Lesson"; selecting a lesson alone
  // must not trigger session creation or the opening tutor message.
  const [lessonStarted, setLessonStarted] = useState(false)
  const [speakingId, setSpeakingId] = useState<string|null>(null)
  const [micState, setMicState] = useState<MicState>('idle')
  const [micSupported, setMicSupported] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState<Record<string,boolean>>({})
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat')
  const [atBottom, setAtBottom] = useState(true)
  // WhatsApp-style windowed rendering: how many of the newest messages are
  // mounted. Full history stays in `messages`; scrolling to the top reveals
  // earlier windows with a preserved scroll position.
  const [visibleCount, setVisibleCount] = useState(HISTORY_RENDER_WINDOW)
  const visibleCountRef = useRef(HISTORY_RENDER_WINDOW)
  useEffect(() => { visibleCountRef.current = visibleCount }, [visibleCount])
  const messagesLenRef = useRef(0)
  useEffect(() => { messagesLenRef.current = messages.length }, [messages.length])
  const historyScrolledRef = useRef(false)
  const [subjectMenuOpen, setSubjectMenuOpen] = useState(false)
  const [maximizedPanel, setMaximizedPanel] = useState<ActiveTab | null>(null)

  // Voice
  const [voiceType, setVoiceType] = useState<VoiceType>(() => resolveVoice(voiceChoice))
  const [speed, setSpeed] = useState(voiceSpeed)
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false)

  // Teaching language — changeable in-session, persisted to profile.teachingLanguage.
  // route.ts re-reads the profile on every chat turn, so the backend picks up the
  // new language on the next message; this local state is just for the UI/voice.
  const [teachingLanguage, setTeachingLanguage] = useState<TeachingLang>(teachingLanguageProp)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  // BUGFIX: teachingLanguage used to be initialized once from the server
  // prop and never revisited, so it silently drifted out of sync with the
  // app's actual selected language (useLanguage()'s `lang` — the single
  // source of truth, set in Settings and persisted to the SAME
  // Profile.teachingLanguage field). Any learner who changed language via
  // Settings without a full reload of /learn kept seeing "Tutor Max" and
  // every teachingLanguage-gated string in English. Reconcile: whenever the
  // app-wide language changes, follow it here too (uiLang already reflects
  // the persisted value once LanguageProvider has read it from
  // localStorage/settings, so this only fires with a real, settled value).
  useEffect(() => {
    setTeachingLanguage((prev) => (prev === uiLang ? prev : uiLang))
  }, [uiLang])
  const handleLanguageChange = useCallback((l: TeachingLang) => {
    setTeachingLanguage(l)
    setLangMenuOpen(false)
    setUiLang(l)
    fetch('/api/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ teachingLanguage: l }) }).catch(() => {})
  }, [setUiLang])
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
  // P0 (lesson-state desync): curriculumProgress.currentLesson is the single
  // scalar the header, roadmap tree, and LessonNavigationPanel all read (via
  // computeLessonLockState) — but it has 3 independent async writers (initial
  // curriculum fetch, skip/complete/restart PATCH responses, and every chat
  // turn's opportunistic data.lessonOrder sync). A chat request in flight
  // BEFORE a skip/restart, resolving AFTER it, was overwriting the freshly
  // corrected lesson pointer with the stale pre-skip value — a genuine
  // out-of-order-response race, not a "multiple sources of truth" problem
  // (there is one scalar; the bug is writers racing on it). Bumped only by
  // the authoritative, user-initiated actions (skip/complete/restart);
  // sendMessage captures the generation at dispatch and discards its own
  // opportunistic update if an authoritative action landed while it was
  // in flight. Same generation-guard idiom already used for TTS (ttsGeneration).
  const progressGenerationRef = useRef(0)
  const [xpCelebration, setXpCelebration] = useState(false)
  const fireConfetti = useConfetti()
  const [expandedUnits, setExpandedUnits] = useState<number[]>([1])
  const [topicProgressMap, setTopicProgressMap] = useState<Record<string, TopicProgressEntry>>({})
  const [availableTopicSlugs, setAvailableTopicSlugs] = useState<string[]>([])
  const [lockReasons, setLockReasons] = useState<Record<string, { missingPrereqs: { slug: string; title: string }[] }>>({})
  const [expandedLockedTopic, setExpandedLockedTopic] = useState<string | null>(null)
  const [knowledgeMapOpen, setKnowledgeMapOpen] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const [navPanelOpen, setNavPanelOpen] = useState(false)
  const navPanelCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [bookmarkedLessons, setBookmarkedLessons] = useState<Set<number>>(new Set())
  // Real cross-session minutes studied today (from StudySession rows written on
  // session end), fetched once on mount as the baseline for the "Today's Goal"
  // ring; the live current-session `elapsed` timer is added on top of this.
  const [todayBaselineMinutes, setTodayBaselineMinutes] = useState(0)

  // Accessibility: Escape closes whichever header/panel dropdown is open —
  // these menus only close today via an invisible click-outside overlay,
  // which is unreachable by keyboard.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      setSubjectMenuOpen(false)
      setLangMenuOpen(false)
      setSpeedMenuOpen(false)
      setMoreMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Assessment / promotion
  const [promotionResult, setPromotionResult] = useState<PromotionResult | null>(null)
  const [assessmentLoading, setAssessmentLoading] = useState(false)
  // Mastery gate (server-authoritative): per-turn mastery summary from
  // /api/learn/chat. verified=false gates the Complete/Next actions behind
  // an explicit Continue Learning / Skip Anyway choice — never a silent skip.
  const [masteryState, setMasteryState] = useState<{ verified: boolean; gatePending: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number } | null>(null)
  const [skipConfirm, setSkipConfirm] = useState(false)
  // Bug 8: was the last long (collapsed) tutor explanation ever expanded?
  // undefined = no collapsed explanation pending; mirrored into a ref so
  // sendMessage can read it without dependency churn.
  const lastExplanationReadRef = useRef<boolean | undefined>(undefined)
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

  // Lesson-switch confirmation dialog (P0 UX — navigation owned by UI, not LLM)
  const [lessonSwitchDialog, setLessonSwitchDialog] = useState<{
    target: CurriculumLesson
    isReview: boolean   // already completed or mastered
    isRestart: boolean  // same as the current lesson
  } | null>(null)
  // The lesson a confirmed switch is waiting to actually begin teaching for.
  // Confirming "Continue" in the switch dialog used to call callLessonInit
  // immediately, starting the conversation without the learner ever
  // pressing "Start Lesson" for the NEW lesson — the same gate every other
  // entry point respects. pendingLesson holds the target for display (its
  // title, on the Start Lesson welcome screen) while pendingLessonRunRef
  // holds the actual side-effect, deferred until that button is clicked.
  const [pendingLesson, setPendingLesson] = useState<CurriculumLesson | null>(null)
  const pendingLessonRunRef = useRef<(() => Promise<void>) | null>(null)

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
  // Stability P0: how many chat turns in a row have failed. Drives the
  // escalation from the warm "got cut off" line to a real "connection problem
  // on our side" message so the student never sees the same sentence loop.
  const consecutiveTurnFailuresRef = useRef(0)
  // Stability P0: guards against an infinite "Connecting to tutor…" — set true
  // when the connect watchdog fires (init never produced a first message).
  const [connectStalled, setConnectStalled] = useState(false)
  const autoOpenedPracticeRef = useRef(false)
  const speakingIdRef = useRef<string|null>(null)
  const serverAudioRef = useRef<HTMLAudioElement|null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const speechRecognitionRef = useRef<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sessionIdRef = useRef<string|null>(null)
  // Voice Signal Recovery (Claude Recommendation #7): the timing signal
  // recovered from the most recent Whisper transcription, attached to the
  // next sendMessage() call the same way attachedFile is — consumed and
  // cleared on send, overwritten by the next recording. Telemetry only;
  // never read by any teaching-decision code path.
  const pendingVoiceSignalRef = useRef<VoiceTimingSignal | null>(null)

  // ─── WhatsApp-style history: MOUNT-TIME restoration ───────────────────────
  // Root-cause fix: the previous implementation (commit bea64a3) placed the
  // history fetch INSIDE startLesson(), which only runs when the learner
  // presses "Start Lesson". On refresh/re-open the component mounted with
  // messages=[] and lessonStarted=false, so the welcome screen rendered and
  // history was never fetched until a manual click — exactly the reported
  // bug ("refresh page → chat becomes empty").
  //
  // WhatsApp shows history on OPEN, not on button click. This effect fetches
  // history the moment LessonScreen mounts, populates messages, skips the
  // welcome screen when prior conversation exists, and acquires a sessionId
  // so subsequent sends have a target. The "Start Lesson" gate remains for
  // truly-new subjects (empty history → welcome + button, unchanged).
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        // Fire history fetch and session creation in parallel — they are
        // independent: history populates the UI, session provides the id
        // for subsequent sends. Sequential order was the original root
        // cause of the "Loading your lesson..." delay for returning users.
        const sessionBody = JSON.stringify({
          subjectSlug,
          memoryContext: memoryContext ?? undefined,
          userId: userId ?? undefined,
          schoolChapterId: schoolChapterId ?? undefined,
        })
        const [histRes, sessionRes] = await Promise.all([
          fetchWithTimeout(`/api/sessions/history?subject=${encodeURIComponent(subjectSlug)}`, {}, 15000),
          fetchWithTimeout('/api/sessions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: sessionBody }, 15000),
        ])
        if (cancelled) return

        // Session id — non-fatal if missing, send path retries.
        try {
          const sessionData = await sessionRes.json()
          if (!cancelled && sessionData?.success && sessionData.data?.id) setSessionId(sessionData.data.id)
        } catch { /* non-fatal */ }

        const hist = await histRes.json()
        if (cancelled) return
        if (!hist?.success) return
        const raw = hist?.data?.messages
        if (!Array.isArray(raw) || raw.length === 0) return
        const restored: ChatMsg[] = (raw as Array<{ id: string; role: string; content: string; createdAt: string; provider?: string | null }>)
          .filter((m) => !(m.role === 'USER' && isInternalOpeningPrompt(m.content)))
          .map((m) => ({
            id: m.id,
            role: m.role === 'USER' ? 'user' as const : 'assistant' as const,
            content: m.content,
            ts: new Date(m.createdAt).getTime(),
            provider: m.provider ?? undefined,
          }))
        if (cancelled) return
        // All rows were internal bootstrap prompts (e.g. the only prior turn
        // failed before the tutor replied) → treat as no history at all, so
        // the welcome screen + Start Lesson gate still shows.
        if (restored.length === 0) return
        setMessages(restored)
        setLessonStarted(true) // skip the "Start Lesson" welcome screen
        // Prevent startLesson() from firing a duplicate opening prompt if
        // the (now hidden) button were somehow triggered.
        initializedRef.current = true
      } catch { /* non-fatal — welcome screen fallback stays intact */ }
    })()
    return () => { cancelled = true }
    // subjectSlug drives remount via learn/page.tsx key; other props are
    // stable across the component's lifetime. Effect runs once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectSlug])

  // Derived
  const language = LANG_MAP[subjectSlug] ?? 'plaintext'
  // "english" is a real subject name (translatable), unlike the programming-
  // language badges (C/C++/Python/... stay in Latin script in every language,
  // matching how dev communities always refer to them) — localize only that one.
  const badge = subjectSlug === 'english'
    ? { ...LANG_BADGE.english, label: t('subj_english_label') }
    : LANG_BADGE[subjectSlug] ?? { label: subjectSlug.toUpperCase(), accent: '#F78166' }
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

  // Scroll bottom detection + reveal-earlier-on-top (WhatsApp-style):
  // reaching the top of the scroll area mounts the previous window of
  // messages while pinning the viewport to the message the user was on.
  useEffect(() => {
    const el = messagesAreaRef.current; if (!el) return
    const handler = () => {
      setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 60)
      if (el.scrollTop < 80 && visibleCountRef.current < messagesLenRef.current) {
        const prevHeight = el.scrollHeight
        setVisibleCount((c) => Math.min(c + HISTORY_RENDER_WINDOW, messagesLenRef.current))
        requestAnimationFrame(() => { el.scrollTop += el.scrollHeight - prevHeight })
      }
    }
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [])

  // Auto scroll
  useEffect(() => {
    if (atBottom) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, atBottom])

  // On first history restore, jump straight to the newest message (instant,
  // not smooth — the user should open the chat AT the latest message).
  useEffect(() => {
    if (!historyScrolledRef.current && messages.length > 0) {
      historyScrolledRef.current = true
      requestAnimationFrame(() => messagesEndRef.current?.scrollIntoView({ block: 'end' }))
    }
  }, [messages.length])

  useEffect(() => { setMicSupported(typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia) }, [])

  // Today's Goal baseline — real minutes already studied today, across all
  // subjects, from completed sessions (fetched once; the live session's
  // elapsed time is added on top locally so the ring updates in real time).
  useEffect(() => {
    fetch('/api/study-time/today')
      .then((r) => r.json())
      .then((d) => { if (d.success) setTodayBaselineMinutes(d.minutesToday) })
      .catch(() => {})
  }, [])

  // Bookmarked lessons — persisted per subject (previously a client-only Set
  // that silently reset on every page refresh). bookmarksToggledRef guards
  // against a real race: if the user clicks bookmark before this initial GET
  // resolves, the optimistic click state must win — otherwise the slower,
  // now-stale GET response arrives afterward and silently reverts the click.
  const bookmarksToggledRef = useRef(false)
  useEffect(() => {
    fetch(`/api/curriculum/bookmark?subject=${subjectSlug}`)
      .then((r) => r.json())
      .then((d) => { if (d.success && !bookmarksToggledRef.current) setBookmarkedLessons(new Set<number>(d.bookmarkedLessons)) })
      .catch(() => {})
  }, [subjectSlug])

  const toggleBookmark = useCallback((lessonOrder: number) => {
    bookmarksToggledRef.current = true
    setBookmarkedLessons((prev) => {
      const next = new Set(prev)
      next.has(lessonOrder) ? next.delete(lessonOrder) : next.add(lessonOrder)
      return next
    })
    fetch('/api/curriculum/bookmark', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subjectCode: subjectSlug, lessonOrder }),
    }).catch(() => {})
  }, [subjectSlug])

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
  const handleLessonComplete = useCallback(async (lessonOrder: number, lesson?: { lessonTitle: string; lessonGoal: string; topicSlug?: string }, mastered = true) => {
    try {
      const res = await fetch('/api/curriculum/progress', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectCode: subjectSlug, completedLesson: lessonOrder, totalLessons: curriculumLessons.length || undefined,
          lessonTitle: lesson?.lessonTitle, lessonGoal: lesson?.lessonGoal,
          mastered, topicSlug: lesson?.topicSlug,
        }),
      })
      const data = await res.json()
      if (data.success) {
        // Authoritative, user-initiated action — always wins over any
        // in-flight chat response's opportunistic lessonOrder sync.
        progressGenerationRef.current += 1
        setCurriculumProgress(data.progress)
        // P0-4 fix: only celebrate a genuine completion — "Skip Anyway" is a
        // recorded knowledge gap, not an achievement.
        if (mastered) {
          setXpCelebration(true)
          fireConfetti()
          setTimeout(() => setXpCelebration(false), 3000)
        }
      }
    } catch { /* ignore */ }
  }, [subjectSlug, curriculumLessons.length])

  // P0-4 fix: "Skip Anyway" used to call handleLessonComplete directly —
  // indistinguishable from a genuine mastery-verified completion (no gap
  // recorded, and the chat session kept re-teaching the skipped concept
  // because its own concept pointer was never cleared). mastered=false
  // tells the server this was an explicit skip, not evidence of learning.
  const handleSkipAnyway = useCallback((lessonOrder: number, lesson?: { lessonTitle: string; lessonGoal: string; topicSlug?: string }) => {
    handleLessonComplete(lessonOrder, lesson, false)
  }, [handleLessonComplete])

  const handleLessonRestart = useCallback(async (lessonOrder: number, topicSlug?: string) => {
    try {
      const res = await fetch('/api/curriculum/progress', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectCode: subjectSlug, lessonOrder, topicSlug }),
      })
      const data = await res.json()
      if (data.success) {
        progressGenerationRef.current += 1
        setCurriculumProgress(data.progress)
      }
    } catch { /* ignore */ }
  }, [subjectSlug])

  // TTS
  const handleStopSpeech = useCallback(() => {
    stopSpeaking(); speakingIdRef.current = null; setSpeakingId(null)
    if (serverAudioRef.current) {
      serverAudioRef.current.pause()
      URL.revokeObjectURL(serverAudioRef.current.src)
      serverAudioRef.current = null
    }
  }, [])
  // Server-side TTS (Sarvam for Hindi, Yandex for Russian) — falls back to
  // the browser speechSynthesis path on any fetch/playback failure, so
  // worst case matches pre-existing behavior, never silence.
  const speakViaServerTTS = useCallback((id: string, text: string, onDone: () => void) => {
    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang: teachingLanguage, voice: voiceType, country }),
    })
      .then((res) => { if (!res.ok) throw new Error('tts failed'); return res.blob() })
      .then((blob) => {
        if (speakingIdRef.current !== id) return // superseded while fetching
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        serverAudioRef.current = audio
        audio.onended = () => { URL.revokeObjectURL(url); onDone() }
        audio.onerror = () => { URL.revokeObjectURL(url); onDone() }
        audio.play().catch(() => { URL.revokeObjectURL(url); onDone() })
      })
      .catch(() => {
        speakText(text, teachingLanguage, voiceType, onDone, country, speed)
      })
  }, [teachingLanguage, voiceType, country, speed])
  const handleSpeak = useCallback((id: string, text: string) => {
    speakingIdRef.current = id; setSpeakingId(id)
    const onDone = () => {
      if (speakingIdRef.current === id) { speakingIdRef.current = null; setSpeakingId(null) }
    }
    if (SERVER_TTS_LANGS.includes(teachingLanguage)) {
      speakViaServerTTS(id, text, onDone)
    } else {
      speakText(text, teachingLanguage, voiceType, onDone, country, speed)
    }
  }, [teachingLanguage, voiceType, country, speed, speakViaServerTTS])
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
  const sendMessage = useCallback(async (sid: string, text: string, showInUI = true, voiceSignal?: VoiceTimingSignal) => {
    setIsStreaming(true)
    // P0 (duplicate AI responses): captured at dispatch time, checked before
    // applying this call's opportunistic lessonOrder sync below. If a
    // skip/complete/restart landed while this request was in flight, this
    // call's view of "current lesson" is stale and must not overwrite the
    // authoritative one.
    const dispatchGeneration = progressGenerationRef.current
    if (showInUI) setMessages((p) => [...p, { id: `u-${Date.now()}`, role: 'user', content: text, ts: Date.now() }])
    const aid = `a-${Date.now()}`
    setMessages((p) => [...p, { id: aid, role: 'assistant', content: '', ts: Date.now(), streaming: true }])
    let res: Response | undefined
    let data: { success?: boolean; text?: string; provider?: 'yandex'|'groq'|'fallback'; visual?: string; visualSpec?: unknown; sceneSpec?: unknown; dynamicVisualizationCode?: unknown; inlinePractice?: unknown; hint?: unknown; error?: any; lessonOrder?: number; completedLessons?: number[]; mastery?: { verified?: boolean; gatePending?: boolean; completionSuppressed?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number } } = {}
    try {
      // P0 (duplicate AI responses — proven root cause): retry ONLY a thrown/
      // aborted fetch (a dropped connection, or fetchWithTimeout's own abort
      // — the mobile-Safari infinite-spinner fix). Do NOT retry a completed
      // response (!res.ok / a soft AI fallback) — the Groq SDK and the server
      // already own 429/5xx retry+backoff internally (groq-sdk maxRetries:2).
      // Retrying a COMPLETED failure here on top of that turns one transient
      // 429 into up to 9 real provider calls and, since route.ts persists the
      // user message unconditionally and never reads req.signal, duplicate/
      // overlapping server-side turns that can each independently produce a
      // tutor reply — the proven cause of the observed duplicate-explanation
      // bug and of the rate-limit death spiral that follows it. A clean
      // failure now fails once, fast, exactly as it did before the mobile-
      // Safari stability sprint that introduced this regression.
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          res = await fetchWithTimeout('/api/learn/chat', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId: sid, message: text, userId: userId ?? 'anonymous',
              // Voice Signal Recovery (Claude Recommendation #7): forwarded
              // only when this turn originated from voice dictation —
              // additive, telemetry-only, undefined for typed messages.
              voiceSignal,
              // Bug 8 (mastery gate): tell the engine whether the previous
              // long collapsed explanation was ever expanded — unread text
              // must never be assumed read. undefined = nothing collapsed.
              lastExplanationRead: lastExplanationReadRef.current,
            }),
          }, 30000)
          data = await res.json().catch(() => ({}))
          break
        } catch (fetchErr) {
          if (attempt === 2) throw fetchErr
          await new Promise((r) => setTimeout(r, (attempt + 1) * 1500))
        }
      }
      // A surviving soft fallback is not a real teaching turn — surface it
      // through the same recovery path as a hard error (logged, escalated),
      // never rendered raw as if the tutor had answered.
      if (isFallbackResponse(data)) throw new Error('AI temporarily unavailable (provider fallback)')
      const errMsg = typeof data.error === 'string' ? data.error : data.error?.message ?? `HTTP ${res?.status ?? 0}`
      if (!res?.ok || !data.success || !data.text) throw new Error(errMsg)
      // Real answer arrived — reset the consecutive-failure escalation counter.
      consecutiveTurnFailuresRef.current = 0
      let full = data.text
      const provider = data.provider
      const responseVisual = data.visual
      // Lesson-sync bug fix: reconcile the Roadmap/Learn Panel to the exact
      // lesson Tutor Max just generated content for. The server recomputes
      // this fresh from studentProgress.currentLesson on every single chat
      // turn, so treating it as authoritative here keeps Roadmap from ever
      // silently lagging behind what Tutor Max is actually teaching.
      // P0 (lesson-state desync): guarded by the generation captured at
      // dispatch — if a skip/complete/restart happened while this request
      // was in flight, this response's lessonOrder reflects the OLD
      // pre-action state and must not clobber the authoritative one that
      // already landed (see progressGenerationRef declaration above).
      if (typeof data.lessonOrder === 'number' && progressGenerationRef.current === dispatchGeneration) {
        setCurriculumProgress((prev) =>
          prev.currentLesson === data.lessonOrder && (!data.completedLessons || prev.completedLessons.length === data.completedLessons.length)
            ? prev
            : { ...prev, currentLesson: data.lessonOrder!, completedLessons: data.completedLessons ?? prev.completedLessons })
      }
      // Mastery gate: the server's per-turn evidence summary is the single
      // source of truth for whether Complete/Next is evidence-backed.
      if (data.mastery) {
        setMasteryState({
          verified: data.mastery.verified === true,
          gatePending: data.mastery.gatePending === true || data.mastery.completionSuppressed === true,
          phase: data.mastery.phase,
          checkCorrect: data.mastery.checkCorrect,
          practiceCorrect: data.mastery.practiceCorrect,
        })
      }
      // Sprint C: server already validated this with zod; re-validate
      // client-side too (defense in depth — never trust a network payload).
      const responseVisualSpec = parseVisualSpec(data.visualSpec) ?? undefined
      // Defense in depth, same as responseVisualSpec above — full structural
      // validation (not just a shape guess) via the deterministic SceneSpec
      // validator, since no zod schema exists for SceneSpec yet (it's plain
      // TS types). buildSceneSpec.ts only ever emits 3 fixed canned templates,
      // so this should always pass today; it's a safety net if those
      // templates drift. On failure, skip rendering and log why — never crash.
      const rawScene = data.sceneSpec as SceneSpec | undefined
      let responseSceneSpec: SceneSpec | undefined
      if (rawScene) {
        const result = validateSceneSpec(rawScene)
        if (result.valid) {
          responseSceneSpec = rawScene
        } else {
          console.warn('[sceneSpec] received invalid SceneSpec, skipping render:', result.errors)
        }
      }
      // Dynamic 2D Visualization Engine: only ever fires when neither of the
      // two deterministic pipelines above produced a visual (see route.ts),
      // so it never overrides a trusted visualSpec/sceneSpec. No structural
      // validation needed beyond "is it a non-empty string" — the server
      // already ran the denylist/export-default checks, and the code is
      // never executed here; it only ever runs inside DynamicVisualRenderer's
      // sandboxed iframe.
      const responseDynamicVisualizationCode =
        typeof data.dynamicVisualizationCode === 'string' && data.dynamicVisualizationCode.trim()
          ? data.dynamicVisualizationCode
          : undefined
      // Sprint W: defense in depth, same pattern as responseVisualSpec/responseSceneSpec
      // above — a network payload is never trusted blind. Shape-validate before render.
      const rawPractice = data.inlinePractice as InlinePracticeQuestion | undefined
      const responseInlinePractice = (
        rawPractice && typeof rawPractice.question === 'string' && Array.isArray(rawPractice.options)
        && rawPractice.options.length === 4 && rawPractice.options.every((o) => typeof o === 'string')
        && typeof rawPractice.answer === 'string'
      ) ? rawPractice : undefined
      // Sprint W gap A: defense in depth, same pattern as the fields above —
      // a network payload is never trusted blind.
      const responseHint = typeof data.hint === 'string' && data.hint.trim().length > 0 ? data.hint : undefined
      // Lesson-sync bug fix: completion must be detected ONLY from the exact
      // [LESSON_COMPLETE] control tag the system prompt instructs the AI to
      // emit. The previous keyword list also matched ordinary teaching prose
      // ("next lesson", "lesson complete", etc.), which Tutor Max says
      // constantly as normal conversational filler — every such false
      // positive silently advanced curriculumProgress.currentLesson, which is
      // exactly what caused Tutor Max's lesson context to drift ahead of the
      // Roadmap's displayed lesson.
      const { hasCompletion, cleanText: textAfterCompletion } = parseLessonCompletionTag(full)
      full = textAfterCompletion
      if (hasCompletion) {
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
      const { mathChecks, codeChecks, cleanText: textAfterChecks } = parseMathCodeAnswerTags(full)
      full = textAfterChecks

      // Detect assessment result tag and call evaluation endpoint
      const { assessment, cleanText: textAfterAssessment } = parseAssessmentResultTag(full)
      full = textAfterAssessment
      if (assessment) {
        const { correctness, reasoning, confidence } = assessment
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

      setMessages((p) => p.map((m) => m.id === aid ? { ...m, content: full, streaming: false, provider, visual: responseVisual, visualSpec: responseVisualSpec, sceneSpec: responseSceneSpec, dynamicVisualizationCode: responseDynamicVisualizationCode, inlinePractice: responseInlinePractice, hint: responseHint } : m))
      const codeBlock = extractLastCodeBlock(full)
      if (codeBlock) {
        setCode(codeBlock)
      } else if (NON_CODE_SUBJECTS.includes(subjectSlug)) {
        setCode(full)
      }
      // Voice no longer auto-plays on arrival (including the lesson-start
      // greeting) — playback only starts from the explicit play button on
      // each message (handleSpeak, wired to that button below).
    } catch (err) {
      // P1 (transcript-driven, Recovery/graceful-degradation): this used to
      // render `Error: ${msg}` directly into the chat bubble — for a pure
      // network failure (fetch never reaching the server) msg is a raw
      // browser exception ("Load failed", "TypeError: Failed to fetch"),
      // and even the server's own friendly copy ("High demand right now —
      // please try again in a minute.") got the flat "Error:" label slapped
      // on it. Either way a student sees a stack-trace-shaped line instead
      // of a teacher who got interrupted. Same root cause as the mastery-
      // gate/visual-registry fixes: a raw technical string reaching the
      // student unfiltered. console.error keeps the real message for
      // debugging; the bubble gets a warm, teacherly recovery line instead.
      const msg = err instanceof Error ? err.message : String(err)
      // Count consecutive failures so the copy escalates on repeat instead of
      // looping the same warm line — the real error is logged server-visibly.
      consecutiveTurnFailuresRef.current += 1
      console.error(`[learn/chat] turn failed (consecutive ${consecutiveTurnFailuresRef.current}):`, msg)
      const recoveryText = pickRecoveryMessage(consecutiveTurnFailuresRef.current, teachingLanguage)
      setMessages((p) => p.map((m) => m.id === aid ? { ...m, content: recoveryText, streaming: false } : m))
    } finally { setIsStreaming(false); textareaRef.current?.focus() }
  }, [handleSpeak, curriculumLessons, curriculumProgress.currentLesson, handleLessonComplete, userId, subjectSlug])

  // Lesson initialization via dedicated endpoint — does NOT persist the
  // navigation instruction as a USER message (unlike sendMessage which
  // always writes to the DB). The instruction is passed ephemerally; only
  // the ASSISTANT response is saved. Replaces sendMessage(false) for all
  // lesson navigation paths (restart / review / next).
  const callLessonInit = useCallback(async (
    sid: string,
    mode: 'restart' | 'review' | 'resume' | 'next',
    lesson: CurriculumLesson,
  ) => {
    setIsStreaming(true)
    const aid = `a-${Date.now()}`
    setMessages((p) => [...p, { id: aid, role: 'assistant' as const, content: '', ts: Date.now(), streaming: true }])
    try {
      const res = await fetch('/api/learn/lesson-init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sid,
          mode,
          lessonTitle: lesson.lessonTitle,
          lessonGoal: lesson.lessonGoal,
          lessonOrder: lesson.order,
          unitTitle: lesson.unitTitle,
          totalLessons: curriculumLessons.length,
          completedLessons: curriculumProgress.completedLessons,
          teachingLanguage,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.success || !data.text) throw new Error(data.error ?? `HTTP ${res.status}`)
      setMessages((p) => p.map((m) => m.id === aid
        ? { ...m, content: data.text as string, streaming: false, provider: data.provider }
        : m,
      ))
    } catch (err) {
      const recoveryText = teachingLanguage === 'ru'
        ? 'Ой, связь прервалась. Попробуй ещё раз.'
        : teachingLanguage === 'hi'
        ? 'Connection ruk gaya. Dobara try karo.'
        : 'Sorry, something went wrong loading the lesson. Please try again.'
      setMessages((p) => p.map((m) => m.id === aid
        ? { ...m, content: recoveryText, streaming: false }
        : m,
      ))
      console.error('[lesson-init]', err)
    } finally {
      setIsStreaming(false)
    }
  }, [teachingLanguage, curriculumLessons.length, curriculumProgress.completedLessons])

  // Start revision mode for a completed/mastered topic — the richer
  // "previous lesson" restoration: patches TopicProgress to REVISION
  // (restores/reflects mastery + progress via topicProgressMap), shows the
  // revision-mode banner (restores lesson context), and re-orients the
  // SAME conversation thread onto that concept (restores conversation
  // state) via the Teaching Engine/Explanation Memory/Student Intelligence,
  // which already read this concept's persisted mastery/misconception
  // state on every turn — no new lesson state, no per-lesson chat history.
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
    await callLessonInit(sessionId, 'review', lesson)
    setActiveTab('chat')
  }, [subjectSlug, sessionId, callLessonInit])

  // Show a confirmation dialog before switching to any lesson (P0 UX).
  // Free navigation: the Lesson Navigation Panel's Previous/Next buttons and
  // the Learning Roadmap tree are no longer lock-gated in the UI (lock state
  // is informational only, shown as a badge) — this function is the single
  // shared switch path both call, so it must not silently reject a locked
  // target anymore either. Previously it did (`if (state.isLocked) return`),
  // which meant a button could be clickable while still doing nothing —
  // exactly the "still locked" symptom this was fixed for.
  const requestLessonSwitch = useCallback((target: CurriculumLesson) => {
    const ctx = { progress: curriculumProgress, topicProgressMap, availableTopicSlugs }
    const state = computeLessonLockState(target, ctx)
    const isRestart = target.order === curriculumProgress.currentLesson
    const isReview = !isRestart && (state.isCompleted || state.isMastered)
    setLessonSwitchDialog({ target, isReview, isRestart })
  }, [curriculumProgress, topicProgressMap, availableTopicSlugs])

  // Confirming the switch dialog selects the target lesson — it must NOT
  // start teaching it. That only happens once the learner explicitly
  // presses "Start Lesson" on the resulting welcome screen, same gate as
  // every other entry point (first open, refresh, etc.). Resets to the
  // pre-start UI and stores the actual side-effect for the button to run.
  const confirmLessonSwitch = useCallback(async () => {
    if (!lessonSwitchDialog || !sessionId) return
    const { target, isRestart } = lessonSwitchDialog
    setLessonSwitchDialog(null)
    setMessages([])
    setLessonStarted(false)
    initializedRef.current = false
    setPendingLesson(target)

    if (isRestart) {
      pendingLessonRunRef.current = async () => {
        await callLessonInit(sessionId, 'restart', target)
        setActiveTab('chat')
      }
      return
    }

    // Backward navigation (a genuinely earlier lesson) is always a review —
    // the existing revision-restoration mechanism. Forward navigation must
    // NEVER be routed here (that was the bug: `|| target.topicSlug` sent
    // every KG lesson, including the very next one, into review mode).
    if (target.order < curriculumProgress.currentLesson) {
      pendingLessonRunRef.current = async () => { await startRevision(target) }
      return
    }

    // Forward navigation: if the current lesson hasn't been recorded as
    // completed yet (e.g. [LESSON_COMPLETE] never fired this turn), record
    // it now as a non-celebrated completion so curriculum progress actually
    // advances — same mechanism "Skip Anyway" already uses, just silent
    // here since the student is choosing to move on via the nav panel.
    pendingLessonRunRef.current = async () => {
      const priorOrder = target.order - 1
      if (priorOrder >= 1 && !curriculumProgress.completedLessons.includes(priorOrder)) {
        const priorLesson = curriculumLessons.find((l) => l.order === priorOrder)
        if (priorLesson) {
          await handleLessonComplete(priorOrder, priorLesson, false)
        }
      }
      await callLessonInit(sessionId, 'next', target)
      setActiveTab('chat')
    }
  }, [lessonSwitchDialog, sessionId, curriculumProgress, curriculumLessons, callLessonInit, startRevision, handleLessonComplete])

  // Open the next lesson. Free navigation: the Lesson Navigation Panel's
  // Next button is always enabled whenever a next lesson exists (matches
  // Previous, which was never lock-gated either) — locking is informational
  // only now (the "🔒 Locked" badge), not a navigation restriction.
  // StudentProgress.currentLesson has already advanced server-side the
  // moment the current
  // lesson was completed (handleLessonComplete's PATCH), and every chat
  // turn already re-resolves its active concept from that same live
  // currentLesson value (route.ts) — so this only needs to prompt Tutor
  // Max to actually start teaching it in the ongoing conversation.
  // P0 (lesson start flow): routed through the same requestLessonSwitch →
  // confirmLessonSwitch → "Start Lesson?" preview gate every other lesson
  // transition uses, instead of calling callLessonInit directly. This was
  // the one entry point where teaching began immediately with no preview —
  // now every path funnels through the single canonical gate.
  const advanceToNextLesson = useCallback(() => {
    if (!sessionId) return
    const next = findNextLesson(curriculumLessons, curriculumProgress)
    if (!next) return
    requestLessonSwitch(next)
  }, [curriculumLessons, curriculumProgress, sessionId, requestLessonSwitch])

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
  // FIX 1 (stabilization): the lesson/session no longer auto-starts on mount —
  // it only starts when the learner explicitly presses "Start Lesson" (see the
  // empty-state button below). Same session-creation + opening-message logic
  // as before, just moved from an unconditional mount effect into a callback.
  const startLesson = useCallback(async () => {
    if (initializedRef.current) return
    initializedRef.current = true
    setLessonStarted(true)
    setConnectStalled(false)
    try {
      // P0 (mobile Safari infinite "Connecting to tutor…"): the session POST
      // is the one call that runs BEFORE any message bubble exists, so a
      // stalled request here leaves the connect screen up forever. Bound it
      // with a timeout and auto-retry once — a cold-start cookie/network race
      // on Safari usually clears on the second attempt.
      const postSession = () => fetchWithTimeout('/api/sessions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug, memoryContext: memoryContext ?? undefined, userId: userId ?? undefined, schoolChapterId: schoolChapterId ?? undefined }),
      }, 15000)
      let res: Response
      try {
        res = await postSession()
      } catch {
        res = await postSession()
      }
      const data = await res.json().catch(() => ({ success: false }))
      if (!res.ok || !data.success) { setInitError(data.error ?? 'connect_failed'); return }
      const sid = data.data.id; setSessionId(sid)

      // WhatsApp-style full history: restore the COMPLETE conversation for
      // this subject — every message across ALL sessions, chronological, no
      // limit — so refreshing or reopening (even days later) never hides
      // older messages. UI-only: the AI context window is built separately
      // inside /api/learn/chat and is untouched by this restore.
      let restoredAny = false
      try {
        const histRes = await fetchWithTimeout(`/api/sessions/history?subject=${encodeURIComponent(subjectSlug)}`, {}, 15000)
        const hist = await histRes.json()
        const histMsgs = hist?.data?.messages
        if (hist.success && Array.isArray(histMsgs) && histMsgs.length > 0) {
          const restored: ChatMsg[] = (histMsgs as Array<{ id: string; role: string; content: string; createdAt: string; provider?: string | null }>)
            .filter((m) => !(m.role === 'USER' && isInternalOpeningPrompt(m.content)))
            .map((m) => ({
              id: m.id,
              role: m.role === 'USER' ? 'user' as const : 'assistant' as const,
              content: m.content,
              ts: new Date(m.createdAt).getTime(),
              provider: m.provider ?? undefined,
            }))
          if (restored.length > 0) {
            setMessages(restored)
            restoredAny = true
          }
        }
      } catch { /* fall back to the resumed-session payload below */ }

      // Fallback (history endpoint unavailable): restore the resumed active
      // session's own messages, exactly as before this feature.
      if (!restoredAny && data.resumed && Array.isArray(data.data.messages) && data.data.messages.length > 0) {
        const restored: ChatMsg[] = (data.data.messages as Array<{ id: string; role: string; content: string; createdAt: string; provider?: string | null }>)
          .filter((m) => m.role === 'USER' || m.role === 'ASSISTANT')
          .filter((m) => !(m.role === 'USER' && isInternalOpeningPrompt(m.content)))
          .map((m) => ({
            id: m.id,
            role: m.role === 'USER' ? 'user' : 'assistant',
            content: m.content,
            ts: new Date(m.createdAt).getTime(),
            provider: m.provider ?? undefined,
          }))
        setMessages(restored)
        restoredAny = true
      }

      // A resumed (still-active) session keeps its flow — no new opening
      // prompt. A NEW session with restored history still gets the opening
      // prompt so Tutor Max greets and continues, appended below the history.
      // P0: only short-circuit when messages were actually restored. A resumed
      // session whose history came back empty (e.g. a prior attempt died before
      // the tutor replied) must still fall through to the opening prompt —
      // otherwise messages stays [] and the connect screen never resolves.
      if (data.resumed && restoredAny) return

      const lessonRef = resumeLessonTitle
        ? (resumeUnitTitle ? `"${resumeLessonTitle}" (${resumeUnitTitle})` : `"${resumeLessonTitle}"`)
        : null

      // Lesson position data — available once curriculum loads; gracefully absent for
      // school mode or subjects without a KG (positionCtx stays empty string).
      const curLesson = curriculumLessons.find((l) => l.order === curriculumProgress.currentLesson) ?? curriculumLessons[0] ?? null
      const nxtLesson = findNextLesson(curriculumLessons, curriculumProgress)
      const prvLesson = findPreviousLesson(curriculumLessons, curriculumProgress)
      const ttlLessons = curriculumLessons.length

      const positionCtx = ttlLessons > 0 && curLesson
        ? `POSITION (inject into step 1): Lesson ${curLesson.order} of ${ttlLessons}.${prvLesson ? ` Previous: "${prvLesson.lessonTitle}".` : ''} Today: "${curLesson.lessonTitle}".${nxtLesson ? ` Next: "${nxtLesson.lessonTitle}".` : ''}`
        : ''
      const positionCtxRu = ttlLessons > 0 && curLesson
        ? `ПОЗИЦИЯ (вставь в шаг 1): Урок ${curLesson.order} из ${ttlLessons}.${prvLesson ? ` Предыдущий: "${prvLesson.lessonTitle}".` : ''} Сегодня: "${curLesson.lessonTitle}".${nxtLesson ? ` Следующий: "${nxtLesson.lessonTitle}".` : ''}`
        : ''
      const positionCtxHi = ttlLessons > 0 && curLesson
        ? `POSITION (step 1 mein daalo): Lesson ${curLesson.order} of ${ttlLessons}.${prvLesson ? ` Pichla: "${prvLesson.lessonTitle}".` : ''} Aaj: "${curLesson.lessonTitle}".${nxtLesson ? ` Agla: "${nxtLesson.lessonTitle}".` : ''}`
        : ''

      const opening = teachingLanguage === 'ru'
        ? (pastSessionsSummary || lessonRef
          // Returning learner — warm recap then continue
          ? `Студент вернулся. ${lessonRef ? `Тема: ${lessonRef}. ` : ''}${pastSessionsSummary ? `Прошлый раз: "${pastSessionsSummary}". ` : ''}
Поприветствуй тепло, в 1–2 предложениях напомни что было пройдено, затем продолжай обучение с того места. Если урок сменился — сначала дай краткое вступление по новому уроку. Уровень: "${levelDescription}".`
          // New learner — world-class 9-step lesson opening
          : `Начинается новый урок. Открой урок точно по этой структуре — не пропускай ни одного раздела. Весь вступительный блок — не больше 280 слов.${positionCtxRu ? `\n${positionCtxRu}` : ''}

1. ПРИВЕТСТВИЕ + ПОЗИЦИЯ — Представься как "Репетитор Макс". Назови тему урока из контекста. Скажи студенту точно, где он находится: "Сегодня — урок X из Y". Если есть данные о предыдущем и следующем уроке — назови их.
2. ВРЕМЯ — Напиши "Примерное время: X–Y минут". Оцени по сложности цели урока: простая/узкая тема → 8–10 мин; стандартная → 12–15 мин; сложная/многоконцептная → 18–20 мин.
3. ЦЕЛЬ УРОКА — 3–5 пунктов, каждый начинается с ✓. Последний пункт всегда: "✓ Объяснить это другому человеку своими словами."
4. ЗАЧЕМ ЭТО ВАЖНО — 2–3 конкретных применения из разных областей (назови области). Используй название и цель урока — никаких общих слов.
5. ЧТО НУЖНО ЗНАТЬ ЗАРАНЕЕ — перечисли предварительные знания. Если completedLessons показывает, что нужные темы пройдены — скажи об этом.
6. ПЛАН УРОКА — Интуиция → Объяснение → Примеры → Практика → Проверка → Итог.
7. КРЮЧОК ЛЮБОПЫТСТВА — одна неожиданная или контринтуитивная мысль о теме.
8. ПРОВЕРКА УВЕРЕННОСТИ — задай ОДИН вопрос: "Прежде чем начать — насколько ты знаком с этой темой? 🟢 Уже знаю / 🟡 Слышал раньше / 🔴 Совсем новое". Только один вопрос — не превращай в викторину. Если студент отвечает своими словами — принимай и двигайся дальше.
9. НАЧИНАЙ ОБУЧЕНИЕ — ориентируйся на ответ: 🟢 → быстро к проверке; 🟡 → интуиция + краткое напоминание; 🔴 или нет ответа → с нуля, с конкретного жизненного примера.

Уровень студента: "${levelDescription}". Пиши под его уровень.`)
        : teachingLanguage === 'hi'
        ? (pastSessionsSummary || lessonRef
          // Returning learner — warm recap then continue
          ? `Student wapas aa gaya. ${lessonRef ? `Topic: ${lessonRef}. ` : ''}${pastSessionsSummary ? `Last session: "${pastSessionsSummary}". ` : ''}
Warmly greet karein, 1–2 sentences mein pichla session recap karein, phir wahan se aage padhana shuru karein. Agar lesson badal gaya ho to pehle naye lesson ka brief introduction dein. Level: "${levelDescription}".`
          // New learner — world-class 9-step lesson opening
          : `Naya lesson shuru ho raha hai. Is exact structure mein lesson open karein — koi bhi section skip mat karein. Poora opening block 280 words se kam mein rakhen.${positionCtxHi ? `\n${positionCtxHi}` : ''}

1. SWAGAT + POSITION — "Tutor Max" ke roop mein parichay dein. Lesson ka topic context se batayein. Student ko exactly batayein: "Aaj aap Lesson X of Y par hain". Pichle aur agle lesson ka naam ho to woh bhi batayein.
2. SAMAY — "Estimated time: X–Y minutes" likhein. Lesson goal ki complexity se andaza lagayein: simple/focused → 8–10 min; standard → 12–15 min; complex/multi-concept → 18–20 min.
3. LESSON GOAL — 3–5 bullet points, har ek ✓ se shuru ho. Aakhri bullet hamesha: "✓ Is idea ko apne words mein kisi aur ko explain kar paana."
4. YEH KYUN ZAROORI HAI — 2–3 concrete real-world applications alag-alag fields se (fields ka naam lo). Lesson title aur goal se infer karein — generic mat bolein.
5. PREREQUISITES — pehle se kya jaanna chahiye. Agar completedLessons se pata chale ki related topics cover ho chuke hain to woh bata dein.
6. AAJ KA ROADMAP — Intuition → Explanation → Examples → Practice → Mastery Check → Summary.
7. CURIOSITY HOOK — ek aisa surprising ya counterintuitive thought jo student ko jaannaane par majboor kare.
8. CONFIDENCE CHECK — SIRF EK sawaal poochhein: "Shuru karne se pehle — is topic se aap kitne parichit hain? 🟢 Pehle se jaanta hoon / 🟡 Suna hai pehle / 🔴 Bilkul naya hai". Sirf ek sawaal — quiz mat banao. Agar student apne words mein jawab de to normal aage badho.
9. PADHANA SHURU KAREIN — jawab ke hisaab se: 🟢 → seedha verification par jao; 🟡 → intuition + brief refresher; 🔴 ya koi jawab nahin → scratch se, ek concrete real-life example se.

Student level: "${levelDescription}". Unke level ke hisaab se likhein.`)
        : (pastSessionsSummary || lessonRef
          // Returning learner — warm recap then continue
          ? `The student has returned. ${lessonRef ? `They were on: ${lessonRef}. ` : ''}${pastSessionsSummary ? `Last session: "${pastSessionsSummary}". ` : ''}
Greet them warmly. In 1–2 sentences recap what was covered last time, then continue teaching from where they left off. If the lesson has changed, give a brief opening for the new lesson first. Student level: "${levelDescription}".`
          // New learner — world-class 9-step lesson opening
          : `A new lesson is beginning. Open the lesson in exactly this structure — do not skip any section. Keep the entire opening under 280 words.${positionCtx ? `\n${positionCtx}` : ''}

1. WELCOME + LESSON POSITION — Introduce yourself as "Tutor Max". State today's topic from the lesson context. Tell the student exactly where they are: "Today you're starting Lesson X of Y." If previous and next lesson titles are available, name them: "Yesterday: [title]. Next up: [title]."
2. ESTIMATED DURATION — Write "Estimated time: X–Y minutes." Calibrate from the lesson goal complexity: short/focused topic → 8–10 min; standard lesson → 12–15 min; complex/multi-concept → 18–20 min.
3. LEARNING GOAL — 3–5 bullet points each starting with ✓. Final bullet always: "✓ Explain this to someone else in plain words."
4. WHY THIS MATTERS — 2–3 concrete real-world applications from different fields (name the fields). Use the lesson title and goal to infer — never be generic.
5. PREREQUISITES — list what the student should already know. If completedLessons shows they have covered the relevant prior topics, say so.
6. LESSON ROADMAP — Intuition → Explanation → Examples → Guided Practice → Mastery Check → Summary.
7. CURIOSITY HOOK — one surprising or counterintuitive thought that makes the student want to find out more.
8. CONFIDENCE CHECK — ask ONE question: "Before we begin — how familiar are you with this topic? 🟢 I already know it / 🟡 I've seen it before / 🔴 Completely new to me." ONE question only — do not turn it into a quiz. If the learner answers naturally instead of selecting an option, accept it and continue.
9. BEGIN TEACHING — calibrate to the answer: 🟢 → move to verification quickly; 🟡 → start from intuition with a brief refresher; 🔴 or no answer → start from scratch with a concrete, real-life scenario the student already knows.

Student level: "${levelDescription}". Write at a level appropriate for them.`)
      await sendMessage(sid, opening, false)
      if (initialPrompt) await sendMessage(sid, initialPrompt, true)
    } catch (err) { console.error('[startLesson] init failed:', err); setInitError('connect_failed') }
  }, [subjectSlug, subjectName, levelDescription, memoryContext, pastSessionsSummary, sendMessage, teachingLanguage, userId, initialPrompt, curriculumLessons, curriculumProgress])

  // P0 recovery: re-run initialization from a clean slate (used by the Retry
  // buttons on both the init-error screen and the connect-stalled screen).
  const retryInit = useCallback(() => {
    setInitError('')
    setConnectStalled(false)
    initializedRef.current = false
    startLesson()
  }, [startLesson])

  // P0 watchdog — the guarantee that "Connecting to tutor…" can NEVER be
  // terminal. Once the lesson has started but no first message has appeared,
  // give initialization a bounded window; if it still hasn't produced a
  // message, flip to the recoverable connect-stalled screen instead of
  // spinning forever. Any unforeseen hang (not just the ones timed out above)
  // is caught here.
  useEffect(() => {
    if (!lessonStarted || messages.length > 0 || initError || connectStalled) return
    const id = setTimeout(() => setConnectStalled(true), 25000)
    return () => clearTimeout(id)
  }, [lessonStarted, messages.length, initError, connectStalled])

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
      // Voice no longer auto-plays on arrival — see the sendMessage handler above.
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setMessages((p) => p.map((m) => m.id === aid ? { ...m, content: `Analysis error: ${msg}`, streaming: false } : m))
    } finally { setIsStreaming(false); textareaRef.current?.focus() }
  }

  // Chat-typed navigation intents ("go next", "I finished this lesson",
  // "next lesson", "previous lesson") must advance programmatically through
  // the SAME navigation service the panel buttons use (callLessonInit /
  // handleLessonComplete), not fall through to the LLM — the system prompt's
  // NAVIGATION RULE tells Tutor Max to defer navigation to the UI, so if we
  // don't intercept here the student is told to "use the panel" instead of
  // actually moving forward.
  const NEXT_INTENT_RE = /^(go\s*next|next\s*lesson|i\s*(?:am\s*)?(?:'m\s*)?(?:done|finished)(?:\s*with\s*this\s*lesson)?|i\s*finished\s*this\s*lesson|continue\s*(?:to\s*)?next\s*lesson|move\s*on|let'?s?\s*continue)\.?!?$/i
  const PREV_INTENT_RE = /^(go\s*(back|previous)|previous\s*lesson|go\s*to\s*(the\s*)?(previous|last)\s*lesson|back\s*to\s*(the\s*)?(previous|last)\s*lesson)\.?!?$/i

  async function handleNavigationIntent(text: string): Promise<boolean> {
    const trimmed = text.trim()
    if (NEXT_INTENT_RE.test(trimmed)) {
      // Free navigation: matches the Lesson Navigation Panel's Next button,
      // which is no longer gated by lock state (see LessonNavigationPanel.tsx).
      if (nextLessonData) {
        setInput('')
        clearDraft(`lesson_${subjectSlug}`)
        if (textareaRef.current) textareaRef.current.style.height = 'auto'
        // P0 (lesson start flow): same canonical preview-then-confirm gate
        // as the nav-panel Next button — typing "next lesson" in chat must
        // not start teaching immediately either.
        requestLessonSwitch(nextLessonData)
        return true
      }
    } else if (PREV_INTENT_RE.test(trimmed)) {
      if (previousLessonData) {
        setInput('')
        clearDraft(`lesson_${subjectSlug}`)
        if (textareaRef.current) textareaRef.current.style.height = 'auto'
        await startRevision(previousLessonData)
        return true
      }
    }
    return false
  }

  // Send handler
  function handleSend() {
    if (isStreaming || !sessionId) return
    if (micState === 'recording') stopRecording()
    if (selectedImage) { sendImageMessage(sessionId); return }
    const text = input.trim()
    if (!text && !attachedFile) return
    if (!attachedFile) {
      handleNavigationIntent(text).then((handled) => {
        if (handled) return
        let msg = text
        setInput('')
        clearDraft(`lesson_${subjectSlug}`)
        if (textareaRef.current) textareaRef.current.style.height = 'auto'
        const voiceSignal = pendingVoiceSignalRef.current
        pendingVoiceSignalRef.current = null
        sendMessage(sessionId, msg, true, voiceSignal ?? undefined)
      })
      return
    }
    let msg = text
    if (attachedFile) {
      msg += (text ? '\n' : '') + `\`\`\`${attachedFile.language}\n${attachedFile.content}\n\`\`\``
      setAttachedFile(null)
    }
    setInput('')
    clearDraft(`lesson_${subjectSlug}`)
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    // Voice Signal Recovery: consume-and-clear, same lifecycle as attachedFile.
    const voiceSignal = pendingVoiceSignalRef.current
    pendingVoiceSignalRef.current = null
    sendMessage(sessionId, msg, true, voiceSignal ?? undefined)
  }
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }
  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`
    // Voice Signal Recovery: a manual edit means the text no longer purely
    // reflects the recorded utterance — don't attribute stale timing data
    // to whatever the user ends up sending.
    pendingVoiceSignalRef.current = null
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
            let errBody: { text?: string; voiceSignal?: VoiceTimingSignal } = {}
            try { errBody = JSON.parse(rawBody) } catch { /* non-JSON */ }
            if (errBody.text?.trim()) {
              setInput((prev) => prev ? prev + ' ' + errBody.text! : errBody.text!)
              // Voice Signal Recovery: attach to whatever gets sent next.
              // Best-effort only — never blocks or alters dictation itself.
              pendingVoiceSignalRef.current = errBody.voiceSignal ?? null
            }
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
  // Browser-native speech recognition (Chrome/Edge only, English only for
  // now — see SPEECH_RECOGNITION_LANGS in lib/tts.ts). Falls through to the
  // existing Whisper pipeline (startRecording) on any error or
  // empty/very-short result, silently — no new error state for the user.
  function startSpeechRecognition() {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) { startRecording(); return }
    const recognition = new SR()
    speechRecognitionRef.current = recognition
    recognition.lang = LANG_LOCALE[teachingLanguage]
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    // Defensive fallback: some browsers don't reliably fire onend after
    // stop() when no final result was captured (a known SpeechRecognition
    // quirk). If neither onresult nor onend has cleared the ref within a
    // generous window for a short utterance, force the UI back to idle so
    // the mic button never gets stuck regardless of browser cooperation.
    const stuckTimeout = setTimeout(() => {
      if (speechRecognitionRef.current === recognition) {
        speechRecognitionRef.current = null
        setMicState((s) => (s === 'recording' ? 'idle' : s))
      }
    }, 9000)
    recognition.onresult = (e: any) => {
      clearTimeout(stuckTimeout)
      const text = e.results?.[0]?.[0]?.transcript?.trim()
      speechRecognitionRef.current = null
      if (text) {
        setInput((prev) => prev ? prev + ' ' + text : text)
        setMicState('idle')
        textareaRef.current?.focus()
      } else {
        startRecording()
      }
    }
    recognition.onerror = () => { clearTimeout(stuckTimeout); speechRecognitionRef.current = null; startRecording() }
    recognition.onend = () => {
      clearTimeout(stuckTimeout)
      if (speechRecognitionRef.current === recognition) {
        speechRecognitionRef.current = null
        setMicState((s) => (s === 'recording' ? 'idle' : s))
      }
    }
    recognition.start()
    setMicState('recording')
  }
  function handleMicClick() {
    if (micState === 'processing') return
    if (micState === 'recording') {
      if (speechRecognitionRef.current) speechRecognitionRef.current.stop()
      else stopRecording()
      return
    }
    if (canUseSpeechRecognition(teachingLanguage)) startSpeechRecognition()
    else startRecording()
  }
  useEffect(() => () => { mediaRecorderRef.current?.stop(); speechRecognitionRef.current?.stop() }, [])

  // Stop any in-flight TTS playback on unmount/route change so voice never
  // keeps speaking after the learner leaves the lesson. handleStopSpeech
  // (not stopSpeaking() alone) so the server-TTS <audio> element (Hindi/
  // Russian) gets paused/cleaned up too, not just speechSynthesis.
  useEffect(() => () => { handleStopSpeech() }, [handleStopSpeech])

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

  // WhatsApp-style windowed rendering: the slice actually mounted in the DOM.
  // Full history stays in `messages`; this is render-only.
  const visibleMessages = useMemo(() => messages.slice(-visibleCount), [messages, visibleCount])

  // Preview cache — computed over the VISIBLE window only, so a 5000-message
  // history never pays string processing for messages that aren't mounted.
  const previewCache = useMemo(() => {
    const c: Record<string, { preview: string; full: string; hasMore: boolean }> = {}
    for (const m of visibleMessages) {
      if (m.role !== 'assistant' || m.streaming) continue
      const full = stripCode(m.content)
      if (full.length < 300) { c[m.id] = { preview: full, full, hasMore: false }; continue }
      const { preview, hasMore } = truncate(full, 4)
      c[m.id] = { preview, full, hasMore }
    }
    return c
  }, [visibleMessages])

  // Bug 8 (mastery gate): track whether the newest long tutor explanation
  // is still collapsed. hasMore && never expanded → false ("not read");
  // expanded → true; nothing collapsed → undefined (field omitted).
  useEffect(() => {
    const lastAssistant = [...visibleMessages].reverse().find((m) => m.role === 'assistant' && !m.streaming)
    const cached = lastAssistant ? previewCache[lastAssistant.id] : undefined
    lastExplanationReadRef.current = cached?.hasMore ? expanded[lastAssistant!.id] === true : undefined
  }, [visibleMessages, previewCache, expanded])

  // Curriculum derived
  const currentLessonData = curriculumLessons.find((l) => l.order === curriculumProgress.currentLesson) ?? curriculumLessons[0] ?? null
  const nextLessonData = findNextLesson(curriculumLessons, curriculumProgress)
  const previousLessonData = findPreviousLesson(curriculumLessons, curriculumProgress)
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

  if (initError) {
    // 'connect_failed' is our sentinel for a bounded/hung init failure — show
    // the warm, translated recovery copy. Any other value is a server-provided
    // message, shown as-is.
    const initErrorText = initError === 'connect_failed' ? t('lesson_connect_failed') : initError
    return (
      <div className={`${styles.learnCandy} min-h-screen flex items-center justify-center p-6`} style={{ background: 'var(--bg-void)' }}>
        <div className="text-center">
          <div className="text-4xl mb-4 text-red-400">⚠</div>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>{initErrorText}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
            <button
              onClick={retryInit}
              style={{ padding: '9px 20px', borderRadius: 12, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', background: UI.indigo, color: '#fff', border: 'none' }}>
              {t('lesson_connect_retry')}
            </button>
            <Link href="/dashboard" className="text-sm" style={{ color: 'var(--coral)' }}>{t('lesson_back_base')}</Link>
          </div>
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
  // ── Left icon nav rail (Learn window redesign) ──────────────────────────
  const goalTargetMin = 60
  const goalDoneMin = Math.min(goalTargetMin, todayBaselineMinutes + Math.floor(elapsed / 60))
  const goalPct = Math.round((goalDoneMin / goalTargetMin) * 100)
  const NAV_ITEMS: { key: string; label: string; icon: React.ReactNode; href?: string; onClick?: () => void; active?: boolean }[] = [
    { key: 'learn', label: teachingLanguage === 'ru' ? 'Учёба' : 'Learn', icon: <BookOpen size={20} />, href: '/learn', active: true },
    { key: 'practice', label: teachingLanguage === 'ru' ? 'Практика' : 'Practice', icon: <Dumbbell size={20} />, onClick: () => currentLessonData?.topicSlug && setPracticeOpen((v) => !v) },
    { key: 'progress', label: teachingLanguage === 'ru' ? 'Прогресс' : 'Progress', icon: <BarChart3 size={20} />, href: '/progress' },
    { key: 'library', label: teachingLanguage === 'ru' ? 'Библиотека' : 'Library', icon: <LibraryIcon size={20} />, href: '/library' },
    { key: 'profile', label: teachingLanguage === 'ru' ? 'Профиль' : 'Profile', icon: <User size={20} />, href: '/settings' },
    { key: 'settings', label: teachingLanguage === 'ru' ? 'Настройки' : 'Settings', icon: <SettingsIcon size={20} />, href: '/settings' },
  ]

  return (
    <div className={`${styles.learnCandy} pb-mobile-nav`} style={{ height: '100vh', display: 'flex', background: 'var(--bg-void)', color: 'var(--text-primary)', overflow: 'hidden' }}>

      {/* ══ LEFT ICON NAV RAIL ══════════════════════════════════════════ */}
      <nav className="hidden md:flex" style={{
        width: 84, flexShrink: 0, flexDirection: 'column', alignItems: 'center',
        padding: '16px 8px', gap: 4, background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
      }}>
        {NAV_ITEMS.map((item) => {
          const body = (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '8px 4px', borderRadius: 10, width: '100%', cursor: 'pointer',
              color: item.active ? UI.indigo : 'var(--text-dim)',
              background: item.active ? `${UI.indigo}14` : 'transparent',
            }}>
              {item.icon}
              <span style={{ fontSize: 9.5, fontWeight: item.active ? 700 : 500, textAlign: 'center' }}>{item.label}</span>
            </div>
          )
          return item.href
            ? <Link key={item.key} href={item.href} style={{ width: '100%', textDecoration: 'none' }}>{body}</Link>
            : <button key={item.key} onClick={item.onClick} style={{ width: '100%', border: 'none', background: 'none', padding: 0 }}>{body}</button>
        })}

        <div style={{ flex: 1 }} />

        {/* Today's Goal ring — real cross-session minutes today (StudySession) + this session's live elapsed time, vs a 60-min target */}
        <div style={{ width: '100%', padding: '10px 6px', textAlign: 'center' }}>
          <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--text-dim)', marginBottom: 8 }}>
            {teachingLanguage === 'ru' ? 'Цель на день' : "Today's Goal"}
          </p>
          <div style={{ position: 'relative', width: 56, height: 56, margin: '0 auto' }}>
            <svg width={56} height={56} viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={28} cy={28} r={24} fill="none" stroke="var(--border-subtle)" strokeWidth={5} />
              <circle cx={28} cy={28} r={24} fill="none" stroke={UI.indigo} strokeWidth={5} strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 24} strokeDashoffset={2 * Math.PI * 24 * (1 - goalPct / 100)}
                style={{ transition: 'stroke-dashoffset 600ms ease' }} />
            </svg>
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'var(--text-primary)' }}>
              {goalPct}%
            </span>
          </div>
          <p style={{ fontSize: 9.5, color: 'var(--text-dim)', marginTop: 6 }}>{goalDoneMin} / {goalTargetMin} min</p>
          <Link href="/progress" style={{ fontSize: 9.5, color: UI.indigo, fontWeight: 700, textDecoration: 'none', display: 'inline-block', marginTop: 2 }}>
            {teachingLanguage === 'ru' ? 'Прогресс →' : 'View Progress →'}
          </Link>
        </div>
      </nav>

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

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

      {/* Lesson-switch confirmation dialog (P0 UX — UI-owned navigation) */}
      {lessonSwitchDialog && currentLessonData && (() => {
        const { target, isReview, isRestart } = lessonSwitchDialog
        const isRu = teachingLanguage === 'ru'
        const isHi = teachingLanguage === 'hi'
        const title = isRestart
          ? (isRu ? 'Начать урок заново?' : isHi ? 'Lesson restart karein?' : 'Restart this lesson?')
          : (isRu ? 'Перейти к другому уроку?' : isHi ? 'Dusre lesson mein jaayein?' : 'Leave current lesson?')
        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={() => setLessonSwitchDialog(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-surface)', borderRadius: 14,
                border: '1px solid var(--border-subtle)',
                padding: '24px 24px 20px',
                maxWidth: 400, width: '100%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
                {title}
              </h3>

              {isReview ? (
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 18 }}>
                  {isRu
                    ? `Вы уже завершили этот урок. Хотите повторить «${target.lessonTitle}»?`
                    : isHi
                    ? `Aapne yeh lesson pehle se complete kiya hai. Kya aap "${target.lessonTitle}" review karna chahenge?`
                    : `You have already completed this lesson. Would you like to review "${target.lessonTitle}" again?`}
                </p>
              ) : isRestart ? (
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 18 }}>
                  {isRu
                    ? `Tutor Max начнёт урок «${target.lessonTitle}» заново. Прогресс урока и освоение сохранены.`
                    : isHi
                    ? `Tutor Max "${target.lessonTitle}" dobara shuru karega. Aapka progress aur mastery save hai.`
                    : `Tutor Max will restart "${target.lessonTitle}" from the beginning. Your progress and mastery are saved.`}
                </p>
              ) : (
                <>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>
                    {isRu
                      ? <><strong style={{ color: 'var(--text-primary)' }}>Сейчас:</strong> {currentLessonData.lessonTitle}<br/><strong style={{ color: 'var(--text-primary)' }}>Перейти к:</strong> {target.lessonTitle}</>
                      : isHi
                      ? <><strong style={{ color: 'var(--text-primary)' }}>Abhi:</strong> {currentLessonData.lessonTitle}<br/><strong style={{ color: 'var(--text-primary)' }}>Jaana hai:</strong> {target.lessonTitle}</>
                      : <><strong style={{ color: 'var(--text-primary)' }}>Currently studying:</strong> {currentLessonData.lessonTitle}<br/><strong style={{ color: 'var(--text-primary)' }}>Switch to:</strong> {target.lessonTitle}</>}
                  </p>
                  <ul style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7, paddingLeft: 18, marginBottom: 18 }}>
                    {(isRu
                      ? ['ваш текущий прогресс сохранён', 'незавершённое освоение зафиксировано', 'вы можете вернуться в любое время']
                      : isHi
                      ? ['aapka current progress save hai', 'adhura mastery record mein hai', 'aap kabhi bhi resume kar sakte hain']
                      : ['your current progress is saved', 'unfinished mastery remains recorded', 'you can resume anytime']
                    ).map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </>
              )}

              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setLessonSwitchDialog(null)}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-subtle)',
                    background: 'transparent', color: 'var(--text-secondary)',
                    fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  }}
                >
                  {isRu ? 'Отмена' : isHi ? 'Cancel' : 'Cancel'}
                </button>
                <button
                  onClick={confirmLessonSwitch}
                  style={{
                    padding: '8px 18px', borderRadius: 8, border: 'none',
                    background: UI.indigo, color: '#fff',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {isRu ? 'Продолжить' : isHi ? 'Continue' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Final Assessment modal (Sprint N — TASK 5/6) */}
      {finalAssessmentOpen && (
        <FinalAssessmentModal
          subjectSlug={subjectSlug}
          subjectName={subjectName}
          lessonTitles={curriculumLessons.map((l) => l.lessonTitle)}
          onClose={() => setFinalAssessmentOpen(false)}
        />
      )}

      {/* ══ TOP BAR (56px) — "My Tutor" logo lockup redesign ══════════════ */}
      <header style={{
        height: 56, flexShrink: 0,
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        position: 'relative', zIndex: 5,
      }}>
        {/* Left — logo lockup */}
        <Link href="/dashboard"
          style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 9, flexShrink: 0,
            background: `linear-gradient(135deg, ${UI.indigo}, ${UI.indigoDark})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}>
            <BookOpen size={17} />
          </div>
          <div className="hidden sm:block" style={{ lineHeight: 1.15 }}>
            <p style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--text-primary)' }}>My Tutor</p>
            <p style={{ fontSize: 9.5, color: 'var(--text-dim)', fontWeight: 500 }}>
              {teachingLanguage === 'ru' ? 'Личный ИИ-репетитор' : 'Personal AI Tutor'}
            </p>
          </div>
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
                  aria-label={switchLabel}
                  aria-haspopup="menu"
                  aria-expanded={subjectMenuOpen}
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
                        const b = s.slug === 'english'
                          ? { ...LANG_BADGE.english, label: t('subj_english_label') }
                          : LANG_BADGE[s.slug] ?? { label: s.name, accent: '#F78166' }
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
                            {b.label}
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
          <div style={{ position: 'relative' }}>
            <button onClick={() => setLangMenuOpen((o) => !o)}
              title={t('settings_lang')}
              aria-label={t('settings_lang')}
              aria-haspopup="menu"
              aria-expanded={langMenuOpen}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5, height: 30, padding: '0 10px', borderRadius: 8,
                fontSize: 11.5, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                background: langMenuOpen ? `${UI.indigo}18` : 'var(--bg-elevated)',
                color: langMenuOpen ? UI.indigo : 'var(--text-secondary)',
                border: `1px solid ${langMenuOpen ? `${UI.indigo}55` : 'var(--border-default)'}`,
                transition: 'all 150ms',
              }}>
              <Globe2 size={13} />
              <span className="hidden sm:inline">{LANG_LABEL[teachingLanguage]}</span>
              <ChevronDown size={11} style={{ transform: langMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
            </button>
            {langMenuOpen && (
              <>
                <div onClick={() => setLangMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 6px)', right: 0, width: 'max-content', zIndex: 50,
                  background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 12,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ padding: '8px 16px 6px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-dim)', borderBottom: '1px solid var(--border-subtle)' }}>
                    {t('settings_lang')}
                  </div>
                  {(['en', 'ru', 'hi'] as TeachingLang[]).map((l) => (
                    <button key={l} onClick={() => handleLanguageChange(l)}
                      style={{
                        padding: '8px 16px', fontSize: 12.5, fontWeight: 600, textAlign: 'left', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: teachingLanguage === l ? 'rgba(247,129,102,0.12)' : 'transparent',
                        color: teachingLanguage === l ? 'var(--coral)' : 'var(--text-primary)',
                      }}>
                      <span>{LANG_LABEL[l]}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right — voice, speed, theme, avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <div className="hidden lg:flex" style={{ gap: 4 }}>
            {(['male', 'female', 'warm'] as VoiceType[]).map((k) => {
              const isActive = voiceType === k
              return (
                <button key={k} onClick={() => handleVoiceChange(k)}
                  title={VOICE_LABELS_BY_LANG[uiLang as TeachingLang]?.[k] ?? VOICE_LABELS_BY_LANG.en[k]}
                  style={{
                    width: 26, height: 26, borderRadius: 8, fontSize: 10.5, fontWeight: 700, cursor: 'pointer',
                    background: isActive ? UI.indigo : 'var(--bg-elevated)',
                    color: isActive ? '#fff' : 'var(--text-dim)',
                    border: 'none', transition: 'all 150ms',
                  }}>
                  {mounted ? voiceShortLabel[k] : { male: 'M', female: 'F', warm: 'W' }[k]}
                </button>
              )
            })}
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setSpeedMenuOpen((o) => !o)}
              title={t('settings_voice_speed')}
              aria-label={`${t('settings_voice_speed')}: ${speed}x`}
              aria-haspopup="menu"
              aria-expanded={speedMenuOpen}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                height: 30, padding: '0 10px', borderRadius: 8, fontSize: 11.5, fontWeight: 700, cursor: 'pointer',
                whiteSpace: 'nowrap', flexShrink: 0,
                background: speedMenuOpen ? `${UI.indigo}18` : 'var(--bg-elevated)',
                color: speedMenuOpen ? UI.indigo : 'var(--text-secondary)',
                border: `1px solid ${speedMenuOpen ? `${UI.indigo}55` : 'var(--border-default)'}`,
                transition: 'all 150ms',
              }}>
              <Gauge size={13} />
              <span>{speed}x</span>
              <ChevronDown size={11} style={{ transform: speedMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
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
                        background: speed === s ? `${UI.indigo}18` : 'transparent',
                        color: speed === s ? UI.indigo : 'var(--text-primary)',
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
          {/* UI/UX P0: was a plain <div> — looked like a clickable avatar
              (rounded, colored, initials — the standard convention) but had
              no onClick, no cursor:pointer, no role. Wired to /settings, the
              same destination the dashboard's own nav header already uses
              for this exact avatar (src/components/dashboard/v2/NavHeader.tsx),
              rather than inventing a second, inconsistent account surface. */}
          <Link href="/settings" title={displayName ?? 'Student'}
            aria-label={teachingLanguage === 'ru' ? 'Настройки профиля' : 'Profile settings'}
            style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              background: UI.indigo, color: '#fff', fontSize: 12.5, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', cursor: 'pointer',
            }}>
            {(displayName ?? 'S').trim().charAt(0).toUpperCase()}
          </Link>
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
      {/* Mobile: single column, one panel visible per activeTab. Desktop (md+): all three side by side.
          isNotebook (non-code subjects) is only a 2-column desktop grid: the third
          "quick actions" panel is never a permanent grid column there — see
          FloatingQuickActions below, which reclaims that width for the chat panel
          and renders quick actions as a collapsed-by-default hover flyout instead. */}
      <div
        className={
          maximizedPanel ? 'grid grid-cols-1'
          : isNotebook ? 'grid grid-cols-1 md:grid-cols-[22%_78%]'
          : 'grid grid-cols-1 md:grid-cols-[25%_45%_30%]'
        }
        style={{ flex: 1, minHeight: 0, gridTemplateRows: '1fr', gap: 16, padding: 16 }}
      >

        {/* ══ PANEL 1 — CURRICULUM ROADMAP (25%) ══════════════════════════ */}
        {/* On mobile only the active tab's panel is rendered (full width); on desktop all three sit side by side via display:contents */}
        <div className={activeTab !== 'curriculum' ? 'hidden md:contents' : 'contents'}
          style={maximizedPanel && maximizedPanel !== 'curriculum' ? { display: 'none' } : undefined}>
        <Panel style={{ overflow: 'hidden' }} accentColor={UI.indigo}>
          <div style={{ flexDirection: 'column', height: '100%' }}
            className={activeTab !== 'curriculum' ? 'hidden md:flex' : 'flex'}>
            {/* Header */}
            <PanelHeader>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', flex: 1 }}>
                {teachingLanguage === 'ru' ? 'Программа обучения' : 'Learning Roadmap'}
              </span>
              {totalLessons > 0 && currentLessonData && (
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)' }}>
                  {currentLessonData.order} {teachingLanguage === 'ru' ? 'из' : 'of'} {totalLessons}
                </span>
              )}
              {/* Maximize/restore — desktop only */}
              <button
                className="hidden md:flex"
                onClick={() => setMaximizedPanel(maximizedPanel === 'curriculum' ? null : 'curriculum')}
                title={maximizedPanel === 'curriculum' ? t('learn_restore') : t('learn_maximize')}
                style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid var(--border-default)', background: 'transparent', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: 11, flexShrink: 0 }}>
                {maximizedPanel === 'curriculum' ? '⊡' : '⊞'}
              </button>
            </PanelHeader>

            {/* Subject-wide completion — mockup's "13% Complete" strip */}
            {totalLessons > 0 && (
              <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-elevated)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${xpProgress}%`, background: UI.indigo, borderRadius: 3, transition: 'width 600ms ease' }} />
                </div>
                <p style={{ fontSize: 10.5, color: 'var(--text-dim)', fontWeight: 700, marginTop: 5 }}>
                  {xpProgress}% {teachingLanguage === 'ru' ? 'завершено' : 'Complete'}
                </p>
              </div>
            )}

            {/* Knowledge Graph Position Panel — collapsed behind the "Knowledge Map" card below by default */}
            {knowledgeMapOpen && (
              <LearnerPositionPanel
                subjectSlug={subjectSlug}
                teachingLanguage={teachingLanguage}
                onGapClick={(topicSlug) => {
                  const lesson = curriculumLessons.find((l) => l.topicSlug === topicSlug)
                  // Routed through requestLessonSwitch (the confirm dialog +
                  // deferred-start gate) instead of calling navigateToLesson
                  // directly — that bypassed "Start Lesson" the same way the
                  // nav panel used to before this fix.
                  if (lesson && lesson.order < curriculumProgress.currentLesson && sessionId) {
                    requestLessonSwitch(lesson)
                  }
                }}
              />
            )}

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
              <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', background: `${UI.indigo}0c` }}>
                <p style={{ fontSize: 10, color: UI.indigo, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
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
                  <button
                    onClick={() => handleLessonRestart(currentLessonData.order, (currentLessonData as { topicSlug?: string }).topicSlug)}
                    title={teachingLanguage === 'ru' ? 'Нажмите, чтобы начать урок заново' : 'Click to restart this lesson'}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '7px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      background: 'rgba(63,185,80,0.1)', color: 'var(--green)',
                      border: '1px solid rgba(63,185,80,0.3)',
                    }}>
                    <span>{t('lesson_completed_btn')}</span>
                    <span style={{ opacity: 0.7, fontSize: 10 }}>↺ {teachingLanguage === 'ru' ? 'Начать заново' : 'Restart'}</span>
                  </button>
                ) : skipConfirm ? (
                  /* Mastery gate (Bug 4): completion without verified mastery is
                     an explicit choice, never a silent skip. Default: Continue. */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <p style={{ fontSize: 11, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      {teachingLanguage === 'ru'
                        ? 'Вы ещё не подтвердили усвоение этого урока.'
                        : "You haven't mastered this lesson yet."}
                    </p>
                    <button
                      onClick={() => setSkipConfirm(false)}
                      autoFocus
                      style={{
                        width: '100%', padding: '8px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        background: UI.indigo, color: '#fff', border: 'none',
                      }}>
                      {teachingLanguage === 'ru' ? '📚 Продолжить обучение' : '📚 Continue Learning'}
                    </button>
                    <button
                      onClick={() => { setSkipConfirm(false); handleSkipAnyway(currentLessonData.order, currentLessonData) }}
                      style={{
                        width: '100%', padding: '7px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                        background: 'transparent', color: 'var(--text-dim)', border: '1px solid var(--border-subtle)',
                      }}>
                      {teachingLanguage === 'ru' ? 'Пропустить всё равно' : 'Skip Anyway'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => masteryState?.verified
                      ? handleLessonComplete(currentLessonData.order, currentLessonData)
                      : setSkipConfirm(true)}
                    style={{
                      width: '100%', padding: '8px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                      background: UI.indigo, color: '#fff', border: 'none',
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
                      background: unitComplete ? 'rgba(63,185,80,0.15)' : `${UI.indigo}18`,
                      color: unitComplete ? 'var(--green)' : UI.indigo,
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
                        // Shared with the Lesson Navigation Panel (computeLessonLockState) —
                        // one source of truth for completed/current/mastered/locked, so the
                        // tree and the panel can never disagree.
                        const topicData = lesson.topicSlug ? topicProgressMap[lesson.topicSlug] : undefined
                        const { isCompleted, isCurrent, isPrevious, isMastered, isRevision, isSkipped, isLocked } =
                          computeLessonLockState(lesson, { progress: curriculumProgress, topicProgressMap, availableTopicSlugs })
                        const isLockExpanded = expandedLockedTopic === lesson.topicSlug
                        const isSkipWarningShown = skipWarning?.topicSlug === lesson.topicSlug

                        // Any unlocked (non-locked, non-current) lesson is navigable —
                        // includes completed, mastered, revision, previous, and unlocked-but-unstarted.
                        const canNavigate = !isCurrent && !isLocked
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
                          : isCurrent ? UI.indigo
                          : 'var(--text-dim)'

                        return (
                          <div key={lesson.order} style={{ marginBottom: 2 }}>
                            <div
                              onClick={() => {
                                // Free navigation: every lesson is switchable now
                                // (requestLessonSwitch no longer rejects locked
                                // targets — see its own comment). A locked row's
                                // "why is this locked" detail is still available
                                // via its dedicated info affordance below, not
                                // gated behind the primary click anymore.
                                requestLessonSwitch(lesson)
                              }}
                              style={{
                                display: 'flex', alignItems: 'flex-start', gap: 6,
                                padding: '5px 8px', borderRadius: 6,
                                cursor: (canNavigate || isLocked) ? 'pointer' : 'default',
                                background: isCurrent ? `${UI.indigo}14`
                                  : isRevision ? 'rgba(121,192,255,0.07)'
                                  : isSkipWarningShown ? 'rgba(245,158,11,0.07)'
                                  : isLockExpanded ? 'rgba(239,68,68,0.05)'
                                  : 'transparent',
                                border: isCurrent ? `1px solid ${UI.indigo}4d`
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
                                    : isCurrent ? UI.indigo
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
                                      <span style={{
                                        fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 10,
                                        background: `${UI.indigo}18`, color: UI.indigo,
                                      }}>
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
                                            background: `${UI.indigo}18`, color: UI.indigo,
                                            border: `1px solid ${UI.indigo}4d`, fontWeight: 600,
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
                                  {isLocked && lesson.topicSlug && (
                                    <button
                                      onClick={(e) => {
                                        // Independent of the row's own onClick (now
                                        // always navigates, see above) — this needs
                                        // its own handler so "why is this locked"
                                        // stays reachable without blocking navigation.
                                        e.stopPropagation()
                                        setExpandedLockedTopic((prev) => prev === lesson.topicSlug ? null : lesson.topicSlug!)
                                      }}
                                      style={{
                                        fontSize: 9, color: 'var(--text-dim)', background: 'transparent',
                                        border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit',
                                      }}>
                                      {t('kg_prereqs_needed')} {isLockExpanded ? '▲' : '▼'}
                                    </button>
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
                    background: UI.indigo,
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

            {/* Knowledge Map / Unit Overview nav cards */}
            <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid var(--border-subtle)', flexShrink: 0 }}>
              <button onClick={() => setKnowledgeMapOpen((v) => !v)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 10, cursor: 'pointer',
                  background: knowledgeMapOpen ? `${UI.indigo}14` : 'var(--bg-elevated)',
                  border: `1px solid ${knowledgeMapOpen ? `${UI.indigo}55` : 'var(--border-subtle)'}`, textAlign: 'left',
                }}>
                <span style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${UI.indigo}18`, color: UI.indigo,
                }}><Network size={15} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {teachingLanguage === 'ru' ? 'Карта знаний' : 'Knowledge Map'}
                  </p>
                  <p style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                    {teachingLanguage === 'ru' ? 'Как эта тема связана' : 'See how this topic connects'}
                  </p>
                </span>
                <ChevronDown size={13} style={{ color: 'var(--text-dim)', transform: knowledgeMapOpen ? 'rotate(180deg)' : 'rotate(-90deg)', transition: 'transform 150ms', flexShrink: 0 }} />
              </button>

              <button onClick={() => setExpandedUnits(curriculumUnits.map((u) => u.number))}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 10, cursor: 'pointer',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', textAlign: 'left',
                }}>
                <span style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(63,185,80,0.15)', color: 'var(--green)',
                }}><ListChecks size={15} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {teachingLanguage === 'ru' ? 'Обзор раздела' : 'Unit Overview'}
                  </p>
                  <p style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                    {teachingLanguage === 'ru' ? 'Все темы этого раздела' : 'See all concepts in this unit'}
                  </p>
                </span>
                <ChevronDown size={13} style={{ color: 'var(--text-dim)', transform: 'rotate(-90deg)', flexShrink: 0 }} />
              </button>
            </div>
          </div>
        </Panel>
        </div>

        {/* ══ PANEL 2 — CODE EDITOR (45%) for code subjects / QUICK ACTIONS on MOBILE
             ONLY for non-code subjects ══
             isNotebook desktop: this panel is never rendered in the grid — it stays
             md:hidden unconditionally, and FloatingQuickActions (below the grid)
             renders the same content as a collapsed hover flyout instead, so the
             28% column it used to reserve goes back to the chat panel. Mobile
             behavior (tap the "Code" tab to open quick actions) is unchanged. */}
        <div className={isNotebook
            ? (activeTab !== 'code' ? 'hidden' : 'contents') + ' md:hidden'
            : (activeTab !== 'code' ? 'hidden md:contents' : 'contents')}
          style={maximizedPanel && maximizedPanel !== 'code' ? { display: 'none' } : undefined}>
        <Panel accentColor={isNotebook ? UI.indigo : '#79C0FF'} style={{ order: isNotebook ? 3 : 2 }}>
          <div style={{ flexDirection: 'column', height: '100%' }}
            className={activeTab !== 'code' ? 'hidden md:flex' : 'flex'}>
            {isNotebook ? (
              <QuickActionsAndCheck
                teachingLanguage={teachingLanguage}
                sessionId={sessionId}
                sendMessage={sendMessage}
                setActiveTab={setActiveTab}
              />
            ) : (
            <>
            {/* Header */}
            <PanelHeader>
              <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: `${badge.accent}22`, color: badge.accent }}>{badge.label}</span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{filename}</span>
              <span style={{ color: 'var(--coral)', fontSize: 12, animation: 'blink 1s infinite' }}>_</span>
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

            {/* Lesson canvas — Monaco code editor for programming subjects */}
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
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
            </>
            )}
          </div>
        </Panel>
        </div>

        {/* ══ PANEL 3 — TUTOR CHAT (promoted to center/wide for non-code subjects) ══ */}
        <div className={activeTab !== 'chat' ? 'hidden md:contents' : 'contents'}
          style={maximizedPanel && maximizedPanel !== 'chat' ? { display: 'none' } : undefined}>
        <Panel accentColor={isNotebook ? UI.indigo : '#3FB950'} style={{ order: isNotebook ? 2 : 3 }}>
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

              {/* "I get it / Not clear" — reacts to the latest tutor message (mockup's global reaction pills) */}
              {(() => {
                const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant' && !m.streaming)
                if (!lastAssistant) return null
                return (
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button
                      onClick={() => sessionId && sendMessage(sessionId, teachingLanguage === 'ru' ? 'Понял' : 'Got it', true)}
                      disabled={isStreaming || !sessionId}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 20,
                        fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${UI.indigo}44`,
                        background: `${UI.indigo}14`, color: UI.indigo,
                      }}>
                      <ThumbsUp size={12} /> {teachingLanguage === 'ru' ? 'Понял' : 'I get it'}
                    </button>
                    <button
                      onClick={() => sessionId && sendMessage(sessionId, teachingLanguage === 'ru' ? 'Не понял, объясни по-другому' : "I don't understand, explain differently", true)}
                      disabled={isStreaming || !sessionId}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 20,
                        fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${UI.red}44`,
                        background: UI.redBg, color: UI.red,
                      }}>
                      <ThumbsDown size={12} /> {teachingLanguage === 'ru' ? 'Не понял' : 'Not clear'}
                    </button>
                  </div>
                )
              })()}

              {/* Bookmark current lesson */}
              {currentLessonData && (
                <button
                  onClick={() => toggleBookmark(currentLessonData.order)}
                  title={teachingLanguage === 'ru' ? 'Сохранить урок' : 'Bookmark this lesson'}
                  aria-label={teachingLanguage === 'ru' ? 'Сохранить урок' : 'Bookmark this lesson'}
                  aria-pressed={bookmarkedLessons.has(currentLessonData.order)}
                  style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0, border: '1px solid var(--border-default)',
                    background: bookmarkedLessons.has(currentLessonData.order) ? `${UI.indigo}18` : 'transparent',
                    color: bookmarkedLessons.has(currentLessonData.order) ? UI.indigo : 'var(--text-dim)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  <Bookmark size={14} fill={bookmarkedLessons.has(currentLessonData.order) ? UI.indigo : 'none'} />
                </button>
              )}

              {/* More menu — houses Practice / Insights / Maximize, decluttering the input row */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <button onClick={() => setMoreMenuOpen((v) => !v)}
                  title={teachingLanguage === 'ru' ? 'Ещё' : 'More options'}
                  aria-label={teachingLanguage === 'ru' ? 'Ещё' : 'More options'}
                  aria-haspopup="menu"
                  aria-expanded={moreMenuOpen}
                  style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid var(--border-default)', background: 'transparent', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MoreVertical size={15} />
                </button>
                {moreMenuOpen && (
                  <>
                    <div onClick={() => setMoreMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 6px)', right: 0, width: 190, zIndex: 50,
                      background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 12,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.25)', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                    }}>
                      {currentLessonData?.topicSlug && (
                        <button onClick={() => { setInsightsOpen(false); setPracticeOpen((v) => !v); setMoreMenuOpen(false) }}
                          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                          ✏️ {teachingLanguage === 'ru' ? 'Практика' : 'Practice'}
                        </button>
                      )}
                      {currentLessonData?.topicSlug && (
                        <button onClick={() => { setPracticeOpen(false); setInsightsOpen((v) => !v); setMoreMenuOpen(false) }}
                          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                          📊 {teachingLanguage === 'ru' ? 'Аналитика' : 'Practice insights'}
                        </button>
                      )}
                      <button
                        className="hidden md:flex"
                        onClick={() => { setMaximizedPanel(maximizedPanel === 'chat' ? null : 'chat'); setMoreMenuOpen(false) }}
                        style={{ alignItems: 'center', gap: 8, padding: '9px 12px', fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                        {maximizedPanel === 'chat' ? '⊡' : '⊞'} {maximizedPanel === 'chat' ? t('learn_restore') : t('learn_maximize')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </PanelHeader>

            {/* Lesson Navigation Panel — Previous / Current / Next, inside the
                Tutor Max chat panel. Reuses curriculumLessons/curriculumProgress/
                topicProgressMap/availableTopicSlugs already fetched above; no new
                lesson state. Collapsed to a thin hover-reveal handle by default
                so it stops permanently occupying vertical space above the chat.
                Driven by React state (navPanelOpen), not pure CSS :hover: the
                expanded overlay's real footprint extends below the handle's own
                5px box, and a plain .group:hover collapses the instant the mouse
                crosses from the (tiny) handle into the (taller) overlay below it
                — verified live via Playwright, the CSS-only version was
                unclickable. State + onMouseEnter/Leave on both the handle and
                the overlay (so moving between them never closes it) is the
                correct fix. A short close delay avoids flicker at the boundary.
                Absolutely positioned so expanding it never pushes the chat
                messages down (no layout jump). The collapsed handle itself is
                pointer-events:none (purely decorative, aria-hidden) so it can
                never block clicks to content behind/below it — only the open
                overlay (when actually expanded) captures pointer events. */}
            {totalLessons > 0 && currentLessonData && (
              <div style={{ position: 'relative', flexShrink: 0, zIndex: 20 }}>
                <div
                  aria-hidden="true"
                  data-testid="lesson-nav-handle"
                  onMouseEnter={() => {
                    if (navPanelCloseTimer.current) clearTimeout(navPanelCloseTimer.current)
                    setNavPanelOpen(true)
                  }}
                  // P0 (chat navigation, item 7): touch devices have no hover
                  // state — onMouseEnter alone never fires from a tap, so the
                  // panel was unreachable on mobile even though it's already
                  // hidden-by-default. onClick toggles it explicitly; works
                  // as a harmless click-to-pin on desktop too.
                  onClick={() => setNavPanelOpen((v) => !v)}
                  style={{
                    height: 5, borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'opacity 150ms ease',
                    opacity: navPanelOpen ? 0 : 0.6,
                    cursor: 'pointer',
                    // Kept as the hover/tap trigger (default pointer-events) —
                    // its footprint is a fixed, tiny 5px strip, not the
                    // variable/taller expanded panel, so it never blocks
                    // meaningfully more than the handle itself ever visually
                    // occupies. The overlay below has its own pointer-events
                    // toggle (auto only while open) so it never blocks chat
                    // content while collapsed.
                  }}
                >
                  <div style={{ width: 36, height: 3, borderRadius: 2, background: 'var(--border-default)' }} />
                </div>
                {/* Tap-outside-to-close backdrop — only present while open,
                    so it never intercepts clicks otherwise. Mirrors the
                    existing subject-switcher dismiss pattern in this file. */}
                {navPanelOpen && (
                  <div
                    aria-hidden="true"
                    onClick={() => setNavPanelOpen(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 19 }}
                  />
                )}
                <div
                  data-testid="lesson-nav-overlay"
                  onMouseEnter={() => {
                    if (navPanelCloseTimer.current) clearTimeout(navPanelCloseTimer.current)
                    setNavPanelOpen(true)
                  }}
                  onMouseLeave={() => {
                    navPanelCloseTimer.current = setTimeout(() => setNavPanelOpen(false), 250)
                  }}
                  onFocus={() => setNavPanelOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setNavPanelOpen(false)
                  }}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)',
                    boxShadow: navPanelOpen ? '0 8px 16px rgba(0,0,0,0.18)' : 'none',
                    overflow: 'hidden',
                    maxHeight: navPanelOpen ? 120 : 5,
                    opacity: navPanelOpen ? 1 : 0,
                    pointerEvents: navPanelOpen ? 'auto' : 'none',
                    transition: 'max-height 200ms ease, opacity 180ms ease, box-shadow 200ms ease',
                  }}
                >
                  <LessonNavigationPanel
                    previousLesson={previousLessonData}
                    currentLesson={currentLessonData}
                    nextLesson={nextLessonData}
                    totalLessons={totalLessons}
                    progress={curriculumProgress}
                    topicProgressMap={topicProgressMap}
                    availableTopicSlugs={availableTopicSlugs}
                    teachingLanguage={teachingLanguage}
                    disabled={isStreaming || !sessionId}
                    onPrevious={() => previousLessonData && requestLessonSwitch(previousLessonData)}
                    onCurrent={() => currentLessonData && requestLessonSwitch(currentLessonData)}
                    onNext={() => nextLessonData && requestLessonSwitch(nextLessonData)}
                  />
                </div>
              </div>
            )}

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

              {/* FIX 1 (stabilization): "Start Lesson" gate — selecting/opening a
                  lesson only selects it; the AI does not start teaching until the
                  learner presses this button. */}
              {!lessonStarted && messages.length === 0 && (() => {
                // P0 (lesson start flow): this is the ONE chokepoint every
                // lesson-entry path funnels through before teaching begins —
                // first open, refresh, and (after the routing fix below) every
                // nav-panel/roadmap/typed "next lesson" transition too. All
                // fields shown are real, already-fetched data (lessonGoal,
                // unit, position, real prerequisite gaps from lockReasons) —
                // nothing here is invented per-lesson content.
                const previewLesson = pendingLesson ?? currentLessonData
                const totalLessons = curriculumLessons.length
                const missingPrereqs = previewLesson?.topicSlug ? lockReasons[previewLesson.topicSlug]?.missingPrereqs : undefined
                // Same complexity-banding heuristic the AI's own opening
                // prompt already commits to (see startLesson()'s "Estimated
                // Duration" instruction) — kept in sync so this preview and
                // what Tutor Max actually says never disagree.
                const goalLen = previewLesson?.lessonGoal?.length ?? 0
                const durationEstimate = goalLen === 0 ? null : goalLen < 60 ? '8–10 min' : goalLen < 160 ? '12–15 min' : '18–20 min'
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 12, paddingTop: 32, paddingBottom: 32, paddingLeft: 20, paddingRight: 20 }}>
                    <EagleMascot variant="hero" size={52} />
                    {previewLesson && (
                      <div style={{ maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'center' }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {totalLessons > 0 ? `${t('lesson_preview_lesson_label')} ${previewLesson.order} / ${totalLessons}` : `${t('lesson_preview_lesson_label')} ${previewLesson.order}`}
                          {previewLesson.unitTitle ? ` · ${previewLesson.unitTitle}` : ''}
                        </p>
                        <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                          {previewLesson.lessonTitle}
                        </p>
                        {previewLesson.lessonGoal && (
                          <div style={{ textAlign: 'left', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '10px 14px' }}>
                            <p style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                              {t('lesson_preview_about_label')}
                            </p>
                            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                              {previewLesson.lessonGoal}
                            </p>
                          </div>
                        )}
                        {missingPrereqs && missingPrereqs.length > 0 && (
                          <div style={{ textAlign: 'left', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '10px 14px' }}>
                            <p style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                              {t('lesson_preview_prereqs_label')}
                            </p>
                            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                              {missingPrereqs.map((p) => p.title).join(', ')}
                            </p>
                          </div>
                        )}
                        {durationEstimate && (
                          <p style={{ fontSize: 11.5, color: 'var(--text-dim)' }}>
                            {t('lesson_preview_duration_label')}: {durationEstimate}
                          </p>
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => {
                        // A confirmed lesson switch defers its actual start to
                        // this click (see confirmLessonSwitch) — run that
                        // instead of the normal mount-time startLesson() flow.
                        if (pendingLessonRunRef.current) {
                          const run = pendingLessonRunRef.current
                          pendingLessonRunRef.current = null
                          setPendingLesson(null)
                          setLessonStarted(true)
                          void run()
                        } else {
                          startLesson()
                        }
                      }}
                      style={{
                        padding: '10px 22px', borderRadius: 12, fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
                        background: UI.indigo, color: '#fff', border: 'none', marginTop: 4,
                      }}>
                      {t('start_lesson_btn')}
                    </button>
                  </div>
                )
              })()}

              {/* Welcome / loading state — EagleMascot replaces the generic initials avatar */}
              {lessonStarted && messages.length === 0 && !connectStalled && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 12, paddingTop: 40 }}>
                  <EagleMascot variant="hero" size={56} />
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t('lesson_init')}</p>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  </div>
                </div>
              )}

              {/* P0: connect watchdog fired — never leave the spinner up
                  forever. Offer a real recovery instead. */}
              {lessonStarted && messages.length === 0 && connectStalled && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 14, paddingTop: 40, textAlign: 'center' }}>
                  <div style={{ fontSize: 32 }}>⚠</div>
                  <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', maxWidth: 320 }}>{t('lesson_connect_failed')}</p>
                  <button
                    onClick={retryInit}
                    style={{ padding: '10px 22px', borderRadius: 12, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', background: UI.indigo, color: '#fff', border: 'none' }}>
                    {t('lesson_connect_retry')}
                  </button>
                </div>
              )}

              {/* WhatsApp-style: full history in state; only the newest window
                  mounted. Scrolling to the top (or tapping) reveals more —
                  the very first message is always reachable. */}
              {messages.length > visibleCount && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                  <button
                    onClick={() => {
                      const el = messagesAreaRef.current
                      const prevHeight = el?.scrollHeight ?? 0
                      setVisibleCount((c) => Math.min(c + HISTORY_RENDER_WINDOW, messages.length))
                      requestAnimationFrame(() => { if (el) el.scrollTop += el.scrollHeight - prevHeight })
                    }}
                    style={{ fontSize: 11, color: 'var(--text-secondary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: 999, padding: '4px 12px', cursor: 'pointer' }}
                  >
                    ↑ {messages.length - visibleCount} earlier message{messages.length - visibleCount === 1 ? '' : 's'}
                  </button>
                </div>
              )}
              {visibleMessages.map((msg) => {
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
                        {/* AI badge — shown ONLY when an AI provider actually
                            answered this turn. Brain-served turns (provider
                            === 'memory') get NO badge. See the API response
                            in src/app/api/learn/chat/route.ts: provider is
                            'memory' for assembled answers, otherwise the
                            real driver id (groq/yandex/fallback). */}
                        {msg.provider && msg.provider !== 'memory' && (
                          <AiBadge provider={msg.provider} />
                        )}
                      </div>
                    )}

                    {/* Tutor bubble — candy Card surface (flat shadow, no glow) */}
                    {!isUser && (
                      <Card className="group/bubble" style={{
                        maxWidth: '90%',
                        background: 'var(--bg-surface)',
                        borderRadius: 14,
                        border: `1px solid ${isSpeaking ? `${UI.indigo}55` : 'var(--border-subtle)'}`,
                        padding: '14px 16px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                        transition: 'border-color 200ms',
                      }}>
                        {msg.content
                          ? <div className="animate-message" style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-primary)' }}>
                              <MessageContent text={displayText} isUser={false} />
                            </div>
                          : <TypingDots />
                        }

                        {cached?.hasMore && (
                          <button onClick={() => setExpanded((p) => ({ ...p, [msg.id]: !isExpanded }))}
                            style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: UI.indigo, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            {isExpanded ? t('lesson_collapse') : t('lesson_read_more')}
                            <ChevronDown size={11} style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }} />
                          </button>
                        )}

                        {!msg.streaming && msg.content && (
                          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                              {new Date(msg.ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </span>
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

                      </Card>
                    )}

                    {/* Sprint BW: Visual Learning Aid — shown below tutor bubble when present */}
                    {!isUser && !msg.streaming && msg.visual && (
                      <div style={{ maxWidth: '90%', animation: 'fadeUp 300ms ease-out both' }}>
                        <VisualCard
                          type={msg.visual as VisualType}
                          autoPlay
                          speed={speed}
                          hasNarration
                          narrationTimeline={extractNarrationSegments(msg.content, msg.visual)}
                        />
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

                    {/* 3D scene (vectors / molecules / coordinate space) — only when
                        the deterministic detector found no 2D VisualSpec for this
                        message, so a reply never carries both. */}
                    {!isUser && !msg.streaming && msg.sceneSpec && (
                      <div style={{ maxWidth: '90%', animation: 'fadeUp 300ms ease-out both' }}>
                        <SceneSpecRenderer spec={msg.sceneSpec} />
                      </div>
                    )}

                    {/* Dynamic 2D Visualization Engine — unlimited-domain fallback when
                        no deterministic VisualSpec/SceneSpec fired for this message
                        (see route.ts). Runs the AI-generated code in a sandboxed iframe. */}
                    {!isUser && !msg.streaming && msg.dynamicVisualizationCode && (
                      <div style={{ maxWidth: '90%', animation: 'fadeUp 300ms ease-out both' }}>
                        <DynamicVisualRenderer code={msg.dynamicVisualizationCode} />
                      </div>
                    )}

                    {/* Sprint W: inline practice MCQ — structured candy card, replacing
                        the old plain-text question the AI used to type out itself. */}
                    {!isUser && !msg.streaming && msg.inlinePractice && (
                      <div style={{ animation: 'fadeUp 300ms ease-out both' }}>
                        <InlinePracticePrompt
                          practice={msg.inlinePractice}
                          onAnswered={(correct) => {
                            if (!sessionId) return
                            const text = correct
                              ? (teachingLanguage === 'ru' ? 'Правильно.' : teachingLanguage === 'hi' ? 'Sahi jawab diya.' : 'Got it right.')
                              : (teachingLanguage === 'ru' ? 'Неправильно.' : teachingLanguage === 'hi' ? 'Galat jawab diya.' : 'Got that wrong.')
                            sendMessage(sessionId, text, false)
                          }}
                        />
                      </div>
                    )}

                    {/* Sprint W gap A: structured [HINT] tag — tap-to-reveal card. */}
                    {!isUser && !msg.streaming && msg.hint && (
                      <div style={{ animation: 'fadeUp 300ms ease-out both' }}>
                        <HintCard hint={msg.hint} />
                      </div>
                    )}

                    {/* Student bubble */}
                    {isUser && (
                      <div style={{ animation: 'slideInRight 200ms ease-out both', maxWidth: '75%' }}>
                        <div style={{
                          padding: '12px 14px', borderRadius: '18px 18px 4px 18px', fontSize: 13, lineHeight: 1.5,
                          background: `linear-gradient(135deg, ${UI.indigo}, ${UI.indigoDark})`, color: '#fff',
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

              {/* Mastery gate card (Bug 4) — the learner asked to move on (or the
                  model tried to complete) before mastery was verified. Explicit
                  choice, default Continue Learning; never a silent skip. */}
              {masteryState?.gatePending && !isStreaming && currentLessonData && (
                <div style={{
                  alignSelf: 'flex-start', maxWidth: '90%', padding: '10px 12px', borderRadius: 12,
                  background: `${UI.indigo}0c`, border: `1px solid ${UI.indigo}33`,
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <p style={{ fontSize: 12, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    {teachingLanguage === 'ru'
                      ? 'Вы ещё не подтвердили усвоение этого урока. Что дальше?'
                      : "You haven't mastered this lesson yet. What next?"}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      onClick={() => {
                        setMasteryState((s) => s ? { ...s, gatePending: false } : s)
                        if (sessionId) sendMessage(sessionId, teachingLanguage === 'ru' ? 'Давай продолжим этот урок' : "Let's keep working on this lesson", true)
                      }}
                      disabled={isStreaming || !sessionId}
                      style={{
                        padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                        background: UI.indigo, color: '#fff', border: 'none',
                      }}>
                      {teachingLanguage === 'ru' ? '📚 Продолжить обучение' : '📚 Continue Learning'}
                    </button>
                    <button
                      onClick={() => {
                        setMasteryState((s) => s ? { ...s, gatePending: false } : s)
                        handleSkipAnyway(currentLessonData.order, currentLessonData)
                      }}
                      style={{
                        padding: '7px 14px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                        background: 'transparent', color: 'var(--text-dim)', border: '1px solid var(--border-subtle)',
                      }}>
                      {teachingLanguage === 'ru' ? 'Пропустить всё равно' : 'Skip Anyway'}
                    </button>
                  </div>
                </div>
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
                  <span style={{ fontSize: 11, color: UI.indigo, flex: 1 }}>📸 {teachingLanguage === 'ru' ? 'Изображение выбрано' : 'Image selected'}</span>
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

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Pill: attach + camera + textarea + mic, one rounded container */}
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center', gap: 4, padding: '4px 6px', borderRadius: 22,
                  background: 'var(--bg-surface)',
                  border: `1px solid ${micState === 'recording' ? UI.red : input ? UI.indigo : 'var(--border-default)'}`,
                  boxShadow: input ? `0 0 0 3px ${UI.indigo}18` : 'none',
                  transition: 'border-color 150ms, box-shadow 150ms',
                }}>
                  <input ref={fileInputRef} type="file" accept=".py,.c,.cpp,.txt" className="hidden" onChange={handleFileSelect} />
                  <button onClick={() => fileInputRef.current?.click()} disabled={isStreaming || !sessionId}
                    title={teachingLanguage === 'ru' ? 'Прикрепить файл' : 'Attach file'}
                    aria-label={teachingLanguage === 'ru' ? 'Прикрепить файл' : 'Attach file'}
                    style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', border: 'none',
                      background: attachedFile ? UI.indigo : 'transparent',
                      color: attachedFile ? '#fff' : 'var(--text-dim)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                    <Paperclip size={14} />
                  </button>

                  <input ref={imageInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageSelect} />
                  <button onClick={() => imageInputRef.current?.click()} disabled={isStreaming || !sessionId}
                    title={teachingLanguage === 'ru' ? 'Фото' : 'Photo'}
                    aria-label={teachingLanguage === 'ru' ? 'Фото' : 'Photo'}
                    style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', fontSize: 14, border: 'none',
                      background: selectedImage ? UI.indigo : 'transparent',
                      color: selectedImage ? '#fff' : 'var(--text-dim)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                    <ImageIcon size={14} />
                  </button>

                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleTextareaChange}
                    onKeyDown={handleKeyDown}
                    disabled={isStreaming || !sessionId}
                    placeholder={micState === 'recording' ? t('lesson_recording') : micState === 'processing' ? t('lesson_processing') : isStreaming ? t('lesson_responding') : t('lesson_placeholder')}
                    rows={1}
                    style={{
                      flex: 1, padding: '6px 4px', resize: 'none', outline: 'none', fontSize: 13, lineHeight: 1.5,
                      background: 'transparent', border: 'none', color: 'var(--text-primary)',
                      fontFamily: 'inherit', minHeight: 28, maxHeight: 96,
                    }}
                  />

                  {/* Mic */}
                  {micSupported && (
                    <button onClick={handleMicClick} disabled={isStreaming || !sessionId || micState === 'processing'}
                      className={micState === 'recording' ? 'mic-rec' : ''}
                      title={micState === 'recording' ? (teachingLanguage === 'ru' ? 'Остановить запись' : 'Stop recording') : (teachingLanguage === 'ru' ? 'Голосовой ввод' : 'Voice input')}
                      aria-label={micState === 'recording' ? (teachingLanguage === 'ru' ? 'Остановить запись' : 'Stop recording') : (teachingLanguage === 'ru' ? 'Голосовой ввод' : 'Voice input')}
                      style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0, border: 'none',
                        cursor: micState === 'processing' ? 'not-allowed' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: micState === 'recording' ? UI.red : 'transparent',
                        color: micState === 'recording' ? '#fff' : 'var(--text-dim)',
                        opacity: micState === 'processing' ? 0.6 : 1,
                      }}>
                      {micState === 'recording'
                        ? <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 6.5, fontWeight: 700, gap: 1 }}><Mic size={11} />REC</span>
                        : <Mic size={14} />}
                    </button>
                  )}
                </div>

                {/* Send — separate circular indigo button, matching the mockup */}
                <button onClick={handleSend}
                  disabled={(!input.trim() && !attachedFile && !selectedImage) || isStreaming || !sessionId}
                  title={teachingLanguage === 'ru' ? 'Отправить' : 'Send'}
                  aria-label={teachingLanguage === 'ru' ? 'Отправить' : 'Send'}
                  style={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none',
                    background: UI.indigo, color: '#fff',
                    opacity: (!input.trim() && !attachedFile && !selectedImage) || isStreaming || !sessionId ? 0.4 : 1,
                    transition: 'opacity 150ms',
                  }}>
                  <Send size={16} style={{ transform: 'translateX(1px)' }} />
                </button>
              </div>

              {/* Disclaimer + current topic breadcrumb — matches mockup's footer row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 8 }}>
                <p style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                  ⓘ {teachingLanguage === 'ru' ? 'ИИ может ошибаться. Проверяйте важное.' : 'AI can make mistakes. Check important info.'}
                </p>
                {currentUnit && (
                  <span style={{ fontSize: 10, color: 'var(--text-dim)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {currentUnit.title}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Panel>
        </div>

      </div>{/* end grid */}

      {/* Desktop-only quick-actions flyout — see FloatingQuickActions comment.
          Not rendered at all for code subjects (they use the code editor in
          Panel 2 instead) or while any panel is maximized (would sit on top
          of the maximized view for no reason). */}
      {isNotebook && !maximizedPanel && (
        <FloatingQuickActions
          teachingLanguage={teachingLanguage}
          sessionId={sessionId}
          sendMessage={sendMessage}
          setActiveTab={setActiveTab}
        />
      )}

      {/* ══ @keyframes spin (inline) ════════════════════════════════════ */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 767px) {
          .lesson-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      </div>{/* end right column (nav rail sibling) */}
    </div>
  )
}

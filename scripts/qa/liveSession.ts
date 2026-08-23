/**
 * Drive a real lesson as a real learner against the deployed app, and record
 * exactly what the learner would have received on each turn.
 *
 * This exists because every prior "LIVE BLOCKED" note in this project was
 * measured through a browser. The JSON API is reachable; only Chromium is not.
 *
 * It reads, it does not assert. A verification script decides what a payload
 * means; this file's only job is to be an honest transcript, so that a wrong
 * verdict can always be checked against what was actually said. Four separate
 * harness defects in this repo were found exactly that way.
 */
import { BASE } from './liveAccount'

export interface TurnPayload {
  text?: string
  provider?: string | null
  mcq?: { question: string; options: string[]; correctIndex: number } | null
  mastery?: { verified?: boolean; phase?: string; checkCorrect?: number; practiceCorrect?: number } | null
  lessonComplete?: { complete?: boolean } | null
  // Every figure channel the route can send. A harness that knew only some of
  // them once reported a lesson as showing nothing while the learner was
  // looking at a diagram.
  visual?: unknown
  visualSpec?: unknown
  sceneSpec?: unknown
  dynamicVisualizationCode?: unknown
  [k: string]: unknown
}

/** Did this turn put a figure in front of the learner, by ANY renderer? */
export function carriesFigure(p: TurnPayload): boolean {
  return Boolean(p.visual) || Boolean(p.visualSpec) || Boolean(p.sceneSpec)
    || Boolean(p.dynamicVisualizationCode)
}

/** A short, human-readable name for whatever figure is attached, if any. */
export function figureLabel(p: TurnPayload): string | null {
  const probe = (v: unknown): string | null => {
    if (!v || typeof v !== 'object') return null
    const o = v as Record<string, unknown>
    for (const k of ['title', 'name', 'type', 'kind', 'id', 'conceptId', 'renderer']) {
      const val = o[k]
      if (typeof val === 'string' && val.trim()) return `${k}=${val}`
    }
    return null
  }
  return probe(p.visual) ?? probe(p.visualSpec) ?? probe(p.sceneSpec)
    ?? (p.dynamicVisualizationCode ? 'dynamicVisualizationCode' : null)
}

export async function post(pathname: string, body: unknown, cookie: string): Promise<TurnPayload> {
  const res = await fetch(`${BASE}${pathname}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(`${pathname} -> HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`)
  }
  return (await res.json()) as TurnPayload
}

export async function createSession(cookie: string, subjectSlug: string): Promise<string> {
  const res = await fetch(`${BASE}/api/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ subjectSlug }),
  })
  if (!res.ok) throw new Error(`/api/sessions -> HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const body = (await res.json()) as { data?: { id?: string }; id?: string }
  const id = body.data?.id ?? body.id
  if (!id) throw new Error(`/api/sessions returned no id: ${JSON.stringify(body).slice(0, 200)}`)
  return id
}

export interface LessonRef {
  lessonTitle: string
  lessonOrder: number
  topicSlug: string
  unitTitle: string
  totalLessons: number
}

export async function openLesson(
  cookie: string, sessionId: string, lesson: LessonRef,
  /** The learner's selected teaching language. Defaults to the English path
   *  every existing probe used; ru/hi carry their own NAVIGATION RULE and
   *  their own opening instruction, so they are separately reachable. */
  teachingLanguage: 'en' | 'ru' | 'hi' = 'en',
): Promise<TurnPayload> {
  return post('/api/learn/lesson-init', {
    sessionId,
    mode: 'restart',
    lessonTitle: lesson.lessonTitle,
    lessonOrder: lesson.lessonOrder,
    topicSlug: lesson.topicSlug,
    unitTitle: lesson.unitTitle,
    totalLessons: lesson.totalLessons,
    completedLessons: [],
    teachingLanguage,
  }, cookie)
}

export async function say(cookie: string, sessionId: string, message: string): Promise<TurnPayload> {
  return post('/api/learn/chat', { sessionId, message }, cookie)
}

/** One-line transcript row: what the learner saw. */
export function describe(tag: string, p: TurnPayload): string {
  const fig = carriesFigure(p) ? (figureLabel(p) ?? 'figure') : 'NO-FIGURE'
  const m = p.mastery
  const mastery = m ? `phase=${m.phase} verified=${m.verified} check=${m.checkCorrect} practice=${m.practiceCorrect}` : 'mastery=none'
  return `[${tag}] provider=${p.provider ?? '?'} ${fig} ${mastery} mcq=${p.mcq ? 'yes' : 'no'}\n    ${(p.text ?? '').replace(/\s+/g, ' ').slice(0, 400)}`
}

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'
import { captureError } from '@/lib/monitoring'
import { decide } from '@/lib/teaching-engine'
import type { StudentState, ConceptNode, LearningHistory } from '@/lib/teaching-engine/types'

// ── Request schema ────────────────────────────────────────────────────────────

const TrackLevel  = z.enum(['T0', 'T1', 'T2', 'T3', 'T4'])
const Difficulty  = z.enum(['foundational', 'developing', 'proficient', 'advanced', 'expert', 'research'])
const ConceptType = z.enum(['conceptual', 'application', 'problem_solving', 'visual'])

const StudentStateSchema = z.object({
  level:                      TrackLevel,
  current_concepts_mastered:  z.array(z.string()),
  weak_concepts:              z.array(z.string()),
  misconceptions:             z.array(z.string()),
  retention_score:            z.number().min(0).max(100),
  learning_speed:             z.enum(['slow', 'normal', 'fast']),
  fatigue_level:              z.enum(['low', 'medium', 'high']),
})

const ConceptNodeSchema = z.object({
  id:               z.string().min(1),
  domain:           z.string().min(1),
  prerequisites:    z.array(z.string()),
  unlocks:          z.array(z.string()),
  difficulty:       z.union([Difficulty, TrackLevel]),
  concept_type:     ConceptType,
  estimated_hours:  z.number().positive().optional(),
  bloom:            z.string().optional(),
  name:             z.string().optional(),
})

const LearningHistorySchema = z.object({
  recently_attempted: z.array(z.string()),
  success_rate:       z.number().min(0).max(100),
  time_on_task:       z.number().min(0),
  error_patterns:     z.array(z.string()),
})

const RequestSchema = z.object({
  student: StudentStateSchema,
  concept: ConceptNodeSchema,
  history: LearningHistorySchema,
})

// ── POST /api/teaching-engine ─────────────────────────────────────────────────

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const { allowed } = await checkRateLimit(`rl:teaching-engine:${session.user.id}`, 60, 60)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const parsed = RequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const { student, concept, history } = parsed.data

    const decision = decide(
      student as StudentState,
      concept as ConceptNode,
      history as LearningHistory,
    )

    return NextResponse.json({ success: true, decision })
  } catch (error: any) {
    captureError(error, { route: 'api/teaching-engine', tags: { method: 'POST' } })
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

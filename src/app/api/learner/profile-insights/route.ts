import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma, withRetry } from '@/lib/db/prisma'
import { withTimeout } from '@/lib/net/timeout'
import { buildLearnerIntelligenceProfile, humanize } from '@/lib/ai/learnerProfile'

export interface ProfileInsight {
  id: string
  icon: string
  message: string
  kind: 'level' | 'strength' | 'weakness' | 'style' | 'pace' | 'focus'
  severity: 'positive' | 'info' | 'warning'
}

const COACH_INSIGHT_ICON: Record<string, string> = {
  PROGRESS: '📈',
  STREAK_RISK: '🔥',
  REVIEW_NEEDED: '🔁',
  PACE_ESTIMATE: '⏳',
  FOCUS_RECOMMENDATION: '🎯',
  GENERAL: '💡',
}

const COACH_INSIGHT_KIND: Record<string, ProfileInsight['kind']> = {
  PROGRESS: 'strength',
  STREAK_RISK: 'weakness',
  REVIEW_NEEDED: 'weakness',
  PACE_ESTIMATE: 'pace',
  FOCUS_RECOMMENDATION: 'focus',
  GENERAL: 'style',
}

function buildInsights(profile: Awaited<ReturnType<typeof buildLearnerIntelligenceProfile>>): ProfileInsight[] {
  const out: ProfileInsight[] = []

  // Level + confidence
  const levelLabel = profile.estimatedLevel === 'advanced' ? 'Advanced'
    : profile.estimatedLevel === 'intermediate' ? 'Intermediate' : 'Beginner'
  out.push({
    id: 'level',
    icon: profile.estimatedLevel === 'advanced' ? '🚀' : profile.estimatedLevel === 'intermediate' ? '📈' : '🌱',
    message: `Estimated level: ${levelLabel} · Confidence score: ${profile.confidenceScore}/100`,
    kind: 'level',
    severity: profile.confidenceScore >= 65 ? 'positive' : profile.confidenceScore >= 35 ? 'info' : 'warning',
  })

  // Learning pace
  const paceMessages: Record<string, string> = {
    FAST: 'You\'re learning at an above-average pace — your tutor increases depth automatically.',
    STEADY: 'You\'re learning at a steady pace — your tutor balances new content with reinforcement.',
    SLOW: 'You\'re taking more time to consolidate — your tutor slows down and adds more examples automatically.',
  }
  out.push({
    id: 'pace',
    icon: profile.learningPace === 'FAST' ? '⚡' : profile.learningPace === 'SLOW' ? '🐢' : '🎯',
    message: paceMessages[profile.learningPace],
    kind: 'pace',
    severity: profile.learningPace === 'FAST' ? 'positive' : 'info',
  })

  // Explanation style
  const styleMessages: Record<string, string> = {
    beginner_friendly: 'Your tutor uses beginner-friendly language with everyday analogies.',
    standard: 'Your tutor uses standard explanations with balanced terminology.',
    technical: 'Your tutor uses technical depth — precise vocabulary, edge cases, trade-offs.',
    child_friendly: 'Your tutor uses short, playful sentences with childhood analogies.',
    exam_focused: 'Your tutor focuses on exam-relevant facts, formulas, and common mistakes.',
  }
  out.push({
    id: 'style',
    icon: '🎨',
    message: styleMessages[profile.explanationStyle] ?? 'Explanation style adapts to your level.',
    kind: 'style',
    severity: 'info',
  })

  // Strong concepts
  if (profile.strongConcepts.length > 0) {
    out.push({
      id: 'strong',
      icon: '💪',
      message: `You consistently excel in: ${profile.strongConcepts.map(humanize).join(', ')}.`,
      kind: 'strength',
      severity: 'positive',
    })
  }

  // Weak concepts
  if (profile.weakConcepts.length > 0) {
    out.push({
      id: 'weak',
      icon: '🔍',
      message: `Needs reinforcement: ${profile.weakConcepts.map(humanize).join(', ')}.`,
      kind: 'weakness',
      severity: 'warning',
    })
  }

  // Mistake trend
  if (profile.mistakeTrend.length > 0) {
    const top = profile.mistakeTrend[0]
    out.push({
      id: 'mistake-trend',
      icon: '⚠️',
      message: `Most frequent mistake area: ${humanize(top.category)} (${top.count}×${top.recent ? ', recent' : ''}) — your tutor targets this automatically.`,
      kind: 'focus',
      severity: 'warning',
    })
  }

  // Recommended focus
  if (profile.recommendedFocusAreas.length > 0) {
    out.push({
      id: 'focus',
      icon: '🎯',
      message: `Recommended focus: ${profile.recommendedFocusAreas.map(humanize).slice(0, 3).join(', ')}.`,
      kind: 'focus',
      severity: 'info',
    })
  }

  // Mode message
  if (profile.mode === 'SLOW_LEARNER') {
    out.push({
      id: 'mode',
      icon: '🛟',
      message: 'Adaptive mode: extra scaffolding active — more examples, smaller steps, more repetition.',
      kind: 'pace',
      severity: 'info',
    })
  } else if (profile.mode === 'ADVANCED_LEARNER') {
    out.push({
      id: 'mode',
      icon: '🏆',
      message: 'Adaptive mode: advanced track active — less repetition, deeper challenges, harder exercises.',
      kind: 'pace',
      severity: 'positive',
    })
  }

  return out
}

/**
 * GET /api/learner/profile-insights?subject=<slug>
 * Returns the LearnerIntelligenceProfile as human-readable insight cards.
 * Used by the InsightsPanel "Learning Intelligence" section.
 */
export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const subjectSlug = searchParams.get('subject')
  if (!subjectSlug) return NextResponse.json({ error: 'subject required' }, { status: 400 })

  try {
    // P0 (production log evidence, 2026-07-22): this exact route was caught
    // live producing "prisma.profile.findUnique() ... 57014 canceling
    // statement due to statement timeout" — an unbounded query that held a
    // pool connection for however long the DATABASE's own (much longer)
    // timeout took, starving every other request's connection wait behind
    // it. withTimeout gives every DB call here an app-level budget well
    // under that; withRetry rides out a transient connection blip.
    // poolConfig.ts's statement_timeout is the general-purpose backstop for
    // routes that don't have this wrapper — this route gets it explicitly
    // too, since it's the one proven to matter in production.
    const [profile, subject] = await withTimeout(Promise.all([
      withRetry(() => prisma.profile.findUnique({ where: { userId: session.user.id } })),
      withRetry(() => prisma.subject.findUnique({ where: { slug: subjectSlug } })),
    ]), 8000, 'profile-insights-profile-subject')

    const lip = await withTimeout(
      buildLearnerIntelligenceProfile(
        session.user.id,
        subjectSlug,
        subject?.id ?? null,
        profile?.selfDescription ?? null,
        profile?.learningGoals ?? null,
      ),
      8000,
      'profile-insights-lip',
    )

    // Smart Coach insights (Sprint AM): generated by generateCoachInsights()
    // after each practice submission. Subject-scoped or general (subjectId null).
    const coachInsights = await withTimeout(withRetry(() => prisma.coachInsight.findMany({
      where: {
        userId: session.user.id,
        dismissed: false,
        ...(subject?.id ? { OR: [{ subjectId: subject.id }, { subjectId: null }] } : { subjectId: null }),
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })), 8000, 'profile-insights-coach')
    const coachProfileInsights: ProfileInsight[] = coachInsights.map((ci) => ({
      id: `coach-${ci.id}`,
      icon: COACH_INSIGHT_ICON[ci.kind] ?? '💡',
      message: ci.message,
      kind: COACH_INSIGHT_KIND[ci.kind] ?? 'focus',
      severity: ci.severity.toLowerCase() as ProfileInsight['severity'],
    }))

    return NextResponse.json({
      hasSignal: lip.hasSignal,
      insights: [...buildInsights(lip), ...coachProfileInsights],
      meta: {
        estimatedLevel: lip.estimatedLevel,
        confidenceScore: lip.confidenceScore,
        learningPace: lip.learningPace,
        mode: lip.mode,
        explanationStyle: lip.explanationStyle,
        recommendedDifficulty: lip.recommendedDifficulty,
        averageMastery: lip.averageMastery,
        weakConcepts: lip.weakConcepts,
        strongConcepts: lip.strongConcepts,
      },
    })
  } catch (err) {
    console.error('[profile-insights]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

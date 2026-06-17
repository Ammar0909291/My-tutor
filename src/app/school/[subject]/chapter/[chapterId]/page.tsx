import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Target, MessageCircle, Check, ClipboardCheck } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { chapterDisplayTitle, isSchoolSubject, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getSchoolSubjectProgress, getChapterProgressDetails } from '@/lib/school/schoolProgress'
import { getChapterContent } from '@/lib/school/chapterContent'
import { Card, CandyButton, Pill, ProgressBar, SectionTitle } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'
import { getWeakTopicsForSubject } from '@/lib/school/adaptive/weakTopics'
import { getChapterNextStep } from '@/lib/school/adaptive/nextBestAction'
import { chapterDifficultyBadge, buildLearningProfile } from '@/lib/school/adaptive/learningProfile'
import { buildLessonPlan, getLessonPlanCardItems } from '@/lib/school/adaptive/lessonPlanner'
import { getRevisionStates, getRevisionBadge } from '@/lib/school/adaptive/spacedRevision'
import { detectPrerequisiteGap } from '@/lib/school/adaptive/prerequisiteRecovery'
import { getNodesForChapter } from '@/lib/education'
import { RevisionNotesButton } from '@/components/school/RevisionNotesButton'
import { isFormulaSheetAvailable } from '@/lib/school/revision/revisionNotesTypes'
import { getLearningNavigatorAction, navigatorTitleForCurrentChapter } from '@/lib/school/navigation/learningNavigator'
import { NavigatorActionCard } from '@/components/school/NavigatorActionCard'
import { getMasteryProfile, buildStudentFacingEvidence } from '@/lib/school/adaptive/masteryIntelligence'
import { getChapterMisconceptions } from '@/lib/school/adaptive/misconceptionEngine'
import { getTransferProfile } from '@/lib/school/adaptive/conceptTransfer'
import { getConfidenceProfile } from '@/lib/school/adaptive/confidenceCalibration'
import { getLearningMomentum } from '@/lib/school/adaptive/learningMomentum'
import { getTeachingStrategy } from '@/lib/school/adaptive/teachingStrategy'
import { getLearningNarrative } from '@/lib/school/adaptive/learningNarrative'
import { bandStyle, type Band } from '@/lib/school/ui/candyBands'

/**
 * Chapter learning workspace (Sprint BL, restyled Sprint F) — the student's
 * home base for one chapter: what it's about, what they'll learn, two ways
 * to act (continue the tutor / practice), a shortcut into the tutor for
 * common questions, and a minimal at-a-glance progress readout.
 */

const BOARD_LABELS: Record<string, string> = {
  cbse: 'CBSE',
  up_board: 'UP Board',
}

const ASK_CHIPS: { key: string; label: string }[] = [
  { key: 'explain', label: 'Explain this chapter' },
  { key: 'examples', label: 'Give examples' },
  { key: 'summary', label: 'Summarize chapter' },
  { key: 'basics', label: 'Help me understand basics' },
]

function StatCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <Card style={{ padding: 16 }}>
      <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, color: 'var(--candy-ink-soft)' }}>{label}</p>
      <p style={{ fontSize: 18, fontWeight: 800, color: accent ?? 'var(--candy-ink)' }}>{value}</p>
    </Card>
  )
}

function InsightCard({ eyebrow, title, color, bg, border, children }: { eyebrow?: string; title: string; color: string; bg: string; border: string; children?: React.ReactNode }) {
  return (
    <Card style={{ padding: '12px 16px', background: bg, border: `1px solid ${border}` }}>
      {eyebrow && (
        <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2, color: 'var(--candy-ink-soft)' }}>{eyebrow}</p>
      )}
      <p style={{ fontSize: 12, fontWeight: 800, marginBottom: 2, color }}>{title}</p>
      {children}
    </Card>
  )
}

export default async function ChapterWorkspacePage({ params }: { params: { subject: string; chapterId: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const profile = await withRetry(() => prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { userType: true, educationBoard: true, grade: true },
  }))
  if (!profile?.educationBoard || !profile.grade) redirect('/dashboard')

  const { educationBoard: board, grade } = profile
  const subjectSlug = params.subject
  if (!isSchoolSubject(board, subjectSlug)) redirect('/dashboard')

  const progress = await withRetry(() => getSchoolSubjectProgress(session.user.id, board, grade, subjectSlug).catch(() => null))
  if (!progress) redirect('/dashboard')

  const chapter = progress.chapters.find((c) => c.id === params.chapterId)
  if (!chapter) redirect(`/school/${subjectSlug}`)

  const m = SCHOOL_SUBJECT_META[subjectSlug] ?? { label: subjectSlug, icon: '📘', color: 'var(--candy-red)', bg: 'rgba(255, 75, 75, 0.12)' }
  const boardLabel = BOARD_LABELS[board] ?? board
  const completed = progress.completedOrders.has(chapter.order)
  const isCurrent = chapter.id === progress.position.current.id
  const statusLabel = completed ? 'Completed' : isCurrent ? 'In progress' : 'Not started'
  const statusBand: Band = completed ? 'green' : isCurrent ? 'red' : 'neutral'
  const statusStyle = bandStyle(statusBand)

  const chapterKgNodesForPlan = getNodesForChapter(chapter)
  const [content, details, subjectWeakTopics, learnerProfile, lessonPlan, revisionStates, prereqGap, navigatorAction, masteryProfile, allMisconceptions, transferProfile, confidenceProfile, momentumProfile, teachingStrategy, learningNarrative] = await Promise.all([
    getChapterContent(board, subjectSlug, m.label, grade, chapter),
    getChapterProgressDetails(session.user.id, subjectSlug, chapter, completed),
    getWeakTopicsForSubject(session.user.id, subjectSlug).catch(() => []),
    buildLearningProfile(session.user.id, grade, subjectSlug).catch(() => null),
    buildLessonPlan(session.user.id, subjectSlug, chapter.id, chapterDisplayTitle(chapter.title), chapterKgNodesForPlan).catch(() => null),
    getRevisionStates(session.user.id, subjectSlug, chapter.kgNodeIds).catch(() => []),
    detectPrerequisiteGap(session.user.id, subjectSlug, chapter.id, chapterKgNodesForPlan).catch(() => null),
    // Sprint CO: unified Learning Navigator action
    getLearningNavigatorAction(session.user.id, board, grade).catch(() => null),
    // Sprint CR.1: mastery insight card
    getMasteryProfile(session.user.id, board, grade, subjectSlug, chapter.id, chapter.kgNodeIds).catch(() => null),
    // Sprint CS: misconception detection
    getChapterMisconceptions(session.user.id, board, grade, subjectSlug, chapter.id, chapter.kgNodeIds).catch(() => []),
    // Sprint CT: concept transfer profile
    getTransferProfile(session.user.id, board, grade, subjectSlug, chapter.id).catch(() => null),
    // Sprint CU: confidence calibration
    getConfidenceProfile(session.user.id, subjectSlug, chapter.id).catch(() => null),
    // Sprint CV: learning momentum
    getLearningMomentum(session.user.id).catch(() => null),
    // Sprint CW: unified teaching strategy
    getTeachingStrategy(session.user.id, board, grade, subjectSlug, chapter.id, chapter.kgNodeIds).catch(() => null),
    // Sprint CX: longitudinal learning narrative
    getLearningNarrative(session.user.id, board, grade, subjectSlug, chapter.id, chapter.kgNodeIds).catch(() => null),
  ])
  const revisionBadge = getRevisionBadge(revisionStates)
  const showFoundationBadge = prereqGap?.confidence === 'high'
  // Sprint BO: weak KG nodes belonging to THIS chapter (max 3 shown)
  const chapterWeakTopics = subjectWeakTopics
    .filter((t) => chapter.kgNodeIds.includes(t.nodeId))
    .slice(0, 3)

  const learnHref = `/learn?subject=${subjectSlug}&chapter=${encodeURIComponent(chapter.id)}`
  const practiceHref = `/school/${subjectSlug}/chapter/${encodeURIComponent(chapter.id)}/practice`
  const assessmentHref = `/school/${subjectSlug}/chapter/${encodeURIComponent(chapter.id)}/assessment`
  const summaryParagraphs = content.summary.split(/\n+/).filter((p) => p.trim().length > 0)

  // Next chapter for recommendation when assessment is passed
  const chapterIdx = progress.chapters.findIndex((c) => c.id === chapter.id)
  const nextChapter = chapterIdx >= 0 && chapterIdx < progress.chapters.length - 1
    ? progress.chapters[chapterIdx + 1] : null

  // Sprint BP: compact next-step recommendation. The 'next_chapter' case is
  // already covered by the green Recommended Next card below.
  const chapterNextStep = getChapterNextStep(details, !!nextChapter)

  // Sprint CO.1: when the Navigator already has a recommendation, it is the
  // single source of truth for "what's next" on this page — suppress the
  // older Recommended Next widgets below to avoid conflicting guidance.
  const navigatorTargetsThisChapter = !!navigatorAction
    && navigatorAction.subjectSlug === subjectSlug
    && navigatorAction.chapterId === chapter.id
  const navigatorTitle = navigatorTargetsThisChapter && navigatorAction
    ? navigatorTitleForCurrentChapter(navigatorAction) ?? undefined
    : undefined
  // Sprint DM.1: a continue_chapter / start_next_chapter action targeting THIS
  // chapter resolves its href back to this very overview page — a dead
  // self-link. navigatorTitle is non-null only for exactly those two action
  // types, so reuse it as the guard and send the student into the actual
  // learning interface (same target as the page's "Continue learning" CTA).
  const navigatorHref = navigatorTitle ? learnHref : undefined

  // Sprint BR: difficulty badge derived from KG node count + grade
  const diffBadge = chapterDifficultyBadge(chapter.kgNodeIds.length, grade)

  // Sprint BS: understanding level band by percent
  const understandingBand: Band = details.understandingPercent === null ? 'neutral'
    : details.understandingPercent >= 80 ? 'green'
    : details.understandingPercent >= 50 ? 'yellow'
    : 'red'
  const understandingColor = bandStyle(understandingBand).color

  // Sprint CR.1/CS/CT/CU/CV/CW/CX: insight card bands — consolidated onto the
  // shared candyBands palette (Sprint F) instead of per-card color objects.
  const MASTERY_BAND: Record<string, Band> = { TRUE_MASTERY: 'green', DEVELOPING: 'neutral', FALSE_MASTERY: 'yellow', AT_RISK: 'red' }
  const masteryStyle = masteryProfile ? bandStyle(MASTERY_BAND[masteryProfile.masteryLevel] ?? 'neutral') : null
  const masteryEvidence = masteryProfile ? buildStudentFacingEvidence(masteryProfile) : []

  // Sprint CS: show the highest-confidence misconception, hidden when LOW
  const topMisconception = allMisconceptions.find((m) => m.confidence !== 'LOW') ?? null

  const TRANSFER_BAND: Record<string, Band> = { TRANSFER_STRONG: 'green', TRANSFER_DEVELOPING: 'neutral', TRANSFER_WEAK: 'yellow' }
  const transferStyle = transferProfile ? bandStyle(TRANSFER_BAND[transferProfile.level] ?? 'neutral') : null
  const TRANSFER_DESCRIPTIONS: Record<string, string> = {
    TRANSFER_STRONG: 'You successfully apply this topic in new situations.',
    TRANSFER_DEVELOPING: 'You understand the basics but need more application practice.',
    TRANSFER_WEAK: 'Try more real-world applications of this concept.',
  }

  const CONFIDENCE_BAND: Record<string, Band> = { WELL_CALIBRATED: 'green', OVERCONFIDENT: 'red', UNDERCONFIDENT: 'purple' }
  const confidenceStyle = confidenceProfile && confidenceProfile.calibration !== 'UNCERTAIN'
    ? bandStyle(CONFIDENCE_BAND[confidenceProfile.calibration] ?? 'neutral')
    : null

  const MOMENTUM_BAND: Record<string, Band> = { STRONG_MOMENTUM: 'green', STABLE_MOMENTUM: 'neutral', DECLINING_MOMENTUM: 'yellow', DISENGAGEMENT_RISK: 'red' }
  const momentumStyle = momentumProfile ? bandStyle(MOMENTUM_BAND[momentumProfile.level] ?? 'neutral') : null

  // Sprint CW: priority 1-3 are action-oriented (red/yellow), 4-5 neutral, 6-7 positive
  const STRATEGY_BAND: Record<number, Band> = { 1: 'red', 2: 'yellow', 3: 'red', 4: 'yellow', 5: 'neutral', 6: 'purple', 7: 'green' }
  const strategyStyle = teachingStrategy ? bandStyle(STRATEGY_BAND[teachingStrategy.priority] ?? 'neutral') : null

  const NARRATIVE_BAND: Record<string, Band> = { RAPID_IMPROVEMENT: 'green', STEADY_PROGRESS: 'green', RECOVERY_PHASE: 'green', PLATEAU: 'neutral', REGRESSION_RISK: 'red' }
  const narrativeStyle = learningNarrative ? bandStyle(NARRATIVE_BAND[learningNarrative.trend] ?? 'neutral') : null

  return (
    <div className={tokenStyles.candyTheme} style={{ minHeight: '100vh', background: 'var(--candy-bg)' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--candy-card)', borderBottom: '1px solid var(--candy-shadow)' }}>
        <div style={{ maxWidth: 768, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href={`/school/${subjectSlug}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> {m.label}
          </Link>
          <span style={{ fontSize: 12, fontWeight: 800, fontFamily: 'monospace', color: 'var(--candy-ink-soft)' }}>
            Chapter {chapter.order} of {progress.position.totalCount}
          </span>
        </div>
      </nav>

      <main style={{ maxWidth: 768, margin: '0 auto', padding: '32px 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Phase 1: Chapter header */}
        <header style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, background: m.bg }}>
            {m.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, color: m.color }}>
              {m.label} · {boardLabel} · Class {grade}
            </p>
            <h1 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.3, color: 'var(--candy-ink)', margin: 0 }}>
              {chapterDisplayTitle(chapter.title)}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              <Pill color={statusStyle.bg} style={{ color: statusStyle.color, border: `1px solid ${statusStyle.border}`, fontSize: 10, textTransform: 'uppercase' }}>
                {statusLabel}
              </Pill>
              <Pill color={diffBadge.bg} style={{ color: diffBadge.color, border: `1px solid ${diffBadge.color}`, fontSize: 10, textTransform: 'uppercase' }}>
                {diffBadge.label}
              </Pill>
              {learnerProfile && learnerProfile.preferredTeachingStyle.confidence !== 'low' && (
                <Pill color="rgba(255, 75, 75, 0.12)" style={{ color: 'var(--candy-red)', border: '1px solid var(--candy-red)', fontSize: 10, textTransform: 'uppercase' }}>
                  {learnerProfile.preferredTeachingStyle.label}
                </Pill>
              )}
              {revisionBadge === 'review_due' && (
                <Pill color={bandStyle('yellow').bg} style={{ color: bandStyle('yellow').color, border: `1px solid ${bandStyle('yellow').border}`, fontSize: 10, textTransform: 'uppercase' }}>
                  Review Due
                </Pill>
              )}
              {revisionBadge === 'recently_mastered' && (
                <Pill color={bandStyle('green').bg} style={{ color: bandStyle('green').color, border: `1px solid ${bandStyle('green').border}`, fontSize: 10, textTransform: 'uppercase' }}>
                  Recently Mastered
                </Pill>
              )}
              {showFoundationBadge && (
                <Pill color={bandStyle('purple').bg} style={{ color: bandStyle('purple').color, border: `1px solid ${bandStyle('purple').border}`, fontSize: 10, textTransform: 'uppercase' }}>
                  Foundation Review Recommended
                </Pill>
              )}
            </div>
          </div>
        </header>

        {/* Sprint CR.1: Mastery Insight Card — compact, near chapter status */}
        {masteryProfile && masteryStyle && (
          <InsightCard title={masteryProfile.insight} color={masteryStyle.color} bg={masteryStyle.bg} border={masteryStyle.border}>
            <p style={{ fontSize: 12, marginBottom: 6, color: 'var(--candy-ink-soft)' }}>
              {masteryProfile.masteryLevel === 'TRUE_MASTERY' && 'You consistently perform well and retain this topic.'}
              {masteryProfile.masteryLevel === 'DEVELOPING' && 'Your understanding is improving. Continue practicing.'}
              {masteryProfile.masteryLevel === 'FALSE_MASTERY' && 'You passed assessments, but recent performance suggests review is needed.'}
              {masteryProfile.masteryLevel === 'AT_RISK' && 'Recent activity suggests this topic needs reinforcement.'}
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {masteryEvidence.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--candy-ink-soft)' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', flexShrink: 0, background: masteryStyle.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </InsightCard>
        )}

        {/* Sprint CS: Misconception insight — only MEDIUM or HIGH confidence */}
        {topMisconception && (
          <InsightCard
            title={topMisconception.confidence === 'HIGH' ? '⚠ Common Misunderstanding Detected' : '⚠ Possible Confusion'}
            color={bandStyle('yellow').color} bg={bandStyle('yellow').bg} border={bandStyle('yellow').border}
          >
            <p style={{ fontSize: 12, color: 'var(--candy-ink)' }}>{topMisconception.label}</p>
          </InsightCard>
        )}

        {/* Sprint CT: Concept Transfer card — hidden when null (insufficient evidence) */}
        {transferProfile && transferStyle && (
          <InsightCard title={transferProfile.insight} color={transferStyle.color} bg={transferStyle.bg} border={transferStyle.border}>
            <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)' }}>{TRANSFER_DESCRIPTIONS[transferProfile.level]}</p>
          </InsightCard>
        )}

        {/* Sprint CU: Confidence calibration card — hidden when null or UNCERTAIN */}
        {confidenceProfile && confidenceStyle && (
          <InsightCard title={confidenceProfile.insight} color={confidenceStyle.color} bg={confidenceStyle.bg} border={confidenceStyle.border}>
            <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)' }}>{confidenceProfile.insightDetail}</p>
          </InsightCard>
        )}

        {/* Sprint CV: Learning Momentum card */}
        {momentumProfile && momentumStyle && (
          <InsightCard title={momentumProfile.insight} color={momentumStyle.color} bg={momentumStyle.bg} border={momentumStyle.border}>
            <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)' }}>{momentumProfile.insightDetail}</p>
          </InsightCard>
        )}

        {/* Sprint CW: Adaptive Teaching Strategy card */}
        {teachingStrategy && strategyStyle && (
          <InsightCard eyebrow="Current Learning Strategy" title={teachingStrategy.insight} color={strategyStyle.color} bg={strategyStyle.bg} border={strategyStyle.border}>
            <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)' }}>{teachingStrategy.insightDetail}</p>
          </InsightCard>
        )}

        {/* Sprint CX: Learning Progress Story — longitudinal narrative, hidden when insufficient evidence */}
        {learningNarrative && narrativeStyle && (
          <InsightCard eyebrow="Learning Progress Story" title={learningNarrative.insight} color={narrativeStyle.color} bg={narrativeStyle.bg} border={narrativeStyle.border}>
            <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)' }}>{learningNarrative.story}</p>
          </InsightCard>
        )}

        {/* Sprint BO: Needs Revision alert — only when this chapter has weak nodes */}
        {chapterWeakTopics.length > 0 && (
          <Card style={{ padding: 16, background: bandStyle('red').bg, border: `1px solid ${bandStyle('red').border}` }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6, color: bandStyle('red').color }}>Needs Revision</p>
            <p style={{ fontSize: 12, marginBottom: 8, color: 'var(--candy-ink)' }}>You recently struggled with:</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {chapterWeakTopics.map((t) => (
                <li key={t.nodeId} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--candy-ink)' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', flexShrink: 0, background: bandStyle('red').color }} />
                  {t.title}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)' }}>Review this chapter before the assessment.</p>
          </Card>
        )}

        {/* Sprint CO: Next Recommended Step — unified Learning Navigator banner */}
        {navigatorAction && <NavigatorActionCard action={navigatorAction} heading="🎯 Next Recommended Step" title={navigatorTitle} href={navigatorHref} compact />}

        {/* Phase 5: Chapter summary */}
        <Card style={{ padding: 20 }}>
          <SectionTitle style={{ fontSize: 13, marginBottom: 12 }}>About this chapter</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {summaryParagraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--candy-ink)' }}>{p}</p>
            ))}
          </div>
        </Card>

        {/* Phase 2: Learning objectives */}
        <Card style={{ padding: 20 }}>
          <SectionTitle style={{ fontSize: 13, marginBottom: 12 }}>What you&apos;ll learn</SectionTitle>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {content.objectives.map((obj, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--candy-ink)' }}>
                <span style={{ marginTop: 2, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: bandStyle('green').bg, color: bandStyle('green').color }}>
                  <Check size={11} />
                </span>
                <span style={{ lineHeight: 1.4 }}>{obj}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Phase 3: Primary actions */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link href={learnHref} style={{ textDecoration: 'none' }}>
            <CandyButton
              style={{ width: '100%', background: 'var(--candy-red)', color: '#fff', borderRadius: 14, padding: '16px 24px', fontSize: 14, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              shadowColor="#C73A3A"
            >
              Continue learning <ArrowRight size={16} />
            </CandyButton>
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} className="sm:flex-row">
            <Link href={practiceHref} style={{ textDecoration: 'none', flex: 1 }}>
              <CandyButton style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', fontSize: 14, fontWeight: 800, borderRadius: 14, background: 'var(--candy-card)', border: '1px solid var(--candy-shadow)', color: 'var(--candy-ink)' }}>
                <Target size={15} /> Practice
              </CandyButton>
            </Link>
            <Link href={assessmentHref} style={{ textDecoration: 'none', flex: 1 }}>
              <CandyButton
                style={{
                  width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', fontSize: 14, fontWeight: 800, borderRadius: 14,
                  background: details.assessmentPassed ? bandStyle('green').bg : 'var(--candy-card)',
                  border: `1px solid ${details.assessmentPassed ? bandStyle('green').border : 'var(--candy-shadow)'}`,
                  color: details.assessmentPassed ? bandStyle('green').color : 'var(--candy-ink)',
                }}
              >
                <ClipboardCheck size={15} />
                {details.assessmentPassed ? 'Retake Assessment' : details.assessmentAttempts > 0 ? 'Retake Assessment' : 'Take Assessment'}
              </CandyButton>
            </Link>
          </div>
          {/* Sprint CI: on-demand revision notes */}
          <RevisionNotesButton
            subjectSlug={subjectSlug}
            chapterId={chapter.id}
            formulaAvailable={isFormulaSheetAvailable(subjectSlug)}
          />
        </section>

        {/* Sprint BP: compact next-step guidance — suppressed when the Navigator
            banner above already covers "what's next" (Sprint CO.1: avoid
            conflicting recommendations). */}
        {!navigatorAction && (chapterNextStep === 'practice' || chapterNextStep === 'assessment') && (
          <Card style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12, flex: 1, color: 'var(--candy-ink-soft)' }}>
              <span style={{ fontWeight: 800, color: 'var(--candy-ink)' }}>Recommended Next: </span>
              {chapterNextStep === 'practice' ? 'Take Practice' : 'Take Assessment'}
            </p>
            <Link href={chapterNextStep === 'practice' ? practiceHref : assessmentHref} style={{ fontSize: 12, fontWeight: 800, flexShrink: 0, color: 'var(--candy-red)', textDecoration: 'none' }}>
              Go →
            </Link>
          </Card>
        )}

        {/* Phase 4: Ask Tutor */}
        <Card style={{ padding: 20 }}>
          <SectionTitle style={{ fontSize: 13, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <MessageCircle size={13} /> Ask Tutor
          </SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ASK_CHIPS.map((chip) => (
              <Link key={chip.key} href={`${learnHref}&ask=${chip.key}`} style={{ textDecoration: 'none' }}>
                <Pill color="var(--candy-bg)" style={{ color: 'var(--candy-ink)', border: '1px solid var(--candy-shadow)', fontWeight: 700, padding: '8px 14px' }}>
                  {chip.label}
                </Pill>
              </Link>
            ))}
          </div>
        </Card>

        {/* Phase 6: Progress block */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatCard label="Chapter" value={completed ? 'Completed' : 'Not yet'} accent={completed ? bandStyle('green').color : undefined} />
          <StatCard
            label="Assessment"
            value={details.assessmentPassed ? 'Passed' : details.assessmentAttempts > 0 ? 'Not passed yet' : 'Not taken'}
            accent={details.assessmentPassed ? bandStyle('green').color : details.assessmentAttempts > 0 ? bandStyle('red').color : undefined}
          />
          <StatCard
            label="Practice"
            value={details.practiceStatus === 'mastered' ? 'Mastered' : details.practiceStatus === 'in_progress' ? 'In Progress' : 'Not Started'}
            accent={details.practiceStatus === 'mastered' ? bandStyle('green').color : details.practiceStatus === 'in_progress' ? bandStyle('red').color : undefined}
          />
          <StatCard label="Practice accuracy" value={details.accuracyPercent !== null ? `${details.accuracyPercent}%` : '—'} />
        </section>

        {/* Sprint BS: Understanding Level — blended in-session signal */}
        {details.understandingPercent !== null && (
          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
              <SectionTitle style={{ fontSize: 13 }}>Understanding Level</SectionTitle>
              <span style={{ fontSize: 14, fontWeight: 800, fontFamily: 'monospace', color: understandingColor }}>{details.understandingPercent}%</span>
            </div>
            <ProgressBar percent={details.understandingPercent} fillColor={understandingColor} />
            <p style={{ fontSize: 12, marginTop: 8, color: 'var(--candy-ink-soft)' }}>Based on understanding checks, practice, and assessments.</p>
          </Card>
        )}

        {/* Sprint BY: Learning Journey card — compact concept roadmap */}
        {(() => {
          if (!lessonPlan) return null
          const items = getLessonPlanCardItems(lessonPlan)
          if (items.length === 0) return null
          return (
            <Card style={{ padding: 20 }}>
              <SectionTitle style={{ fontSize: 13, marginBottom: 12 }}>Learning Journey</SectionTitle>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((item) => (
                  <li key={item.title} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                    {item.status === 'mastered' && (
                      <span style={{ width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, fontWeight: 800, background: bandStyle('green').bg, color: bandStyle('green').color }}>✓</span>
                    )}
                    {item.status === 'current' && (
                      <span style={{ width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 9, fontWeight: 800, background: bandStyle('red').bg, color: bandStyle('red').color, border: `1.5px solid ${bandStyle('red').border}` }}>→</span>
                    )}
                    {item.status === 'remaining' && (
                      <span style={{ width: 16, height: 16, borderRadius: '50%', flexShrink: 0, background: 'var(--candy-bg)', border: '1.5px solid var(--candy-shadow)' }} />
                    )}
                    <span style={{
                      lineHeight: 1.4,
                      color: item.status === 'mastered' ? 'var(--candy-ink-soft)' : item.status === 'current' ? 'var(--candy-ink)' : 'var(--candy-ink-soft)',
                      fontWeight: item.status === 'current' ? 800 : 400,
                    }}>
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
              {lessonPlan.estimatedCompletion > 0 && (
                <p style={{ fontSize: 10, marginTop: 12, color: 'var(--candy-ink-soft)' }}>
                  {lessonPlan.estimatedCompletion}% of chapter concepts covered
                </p>
              )}
            </Card>
          )
        })()}

        {/* Phase 6: Next chapter recommendation (when assessment passed) —
            suppressed when the Navigator banner above already covers "what's
            next" (Sprint CO.1: avoid conflicting recommendations). */}
        {!navigatorAction && details.assessmentPassed && nextChapter && (
          <Card style={{ padding: 20, border: `1px solid ${bandStyle('green').border}` }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, color: bandStyle('green').color }}>Recommended Next</p>
            <p style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: 'var(--candy-ink)' }}>{chapterDisplayTitle(nextChapter.title)}</p>
            <Link href={`/school/${subjectSlug}/chapter/${encodeURIComponent(nextChapter.id)}`} style={{ textDecoration: 'none' }}>
              <CandyButton style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 800, padding: '10px 16px', borderRadius: 12, background: 'var(--candy-green)', color: '#fff' }} shadowColor="var(--candy-green-d)">
                Go to next chapter <ArrowRight size={13} />
              </CandyButton>
            </Link>
          </Card>
        )}
      </main>
    </div>
  )
}

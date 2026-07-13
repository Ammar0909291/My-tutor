import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { generateJSON, buildCurriculumPrompt } from '@/lib/ai/client'
import { prisma } from '@/lib/db/prisma'
import type { Curriculum } from '@/types'
import { findLibrarySubject, renderCurriculumTree } from '@/lib/curriculum/subjectCatalog'
import { getKnowledgeGraph, getAvailableNodes } from '@/lib/curriculum/knowledgeGraph'
import { resolveCurriculumSource } from '@/lib/curriculum/resolveCurriculumSource'
import { computeCurriculumEntryOrder, getPlacementFloorSlugs } from '@/lib/curriculum/placement'
import { normalizeToCanonicalLevel } from '@/lib/curriculum/levels'

const schema = z.object({ subjectSlug: z.string() })

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const subject = searchParams.get('subject')
  if (!subject) return NextResponse.json({ success: false, error: 'subject param required' }, { status: 400 })

  try {
    const [lessons, progress, topicProgressRows, profile] = await Promise.all([
      prisma.curriculum.findMany({
        where: { subjectCode: subject },
        orderBy: { order: 'asc' },
      }),
      prisma.studentProgress.findUnique({
        where: { userId_subjectCode: { userId: session.user.id, subjectCode: subject } },
      }),
      prisma.topicProgress.findMany({
        where: { userId: session.user.id, subjectSlug: subject },
      }),
      prisma.profile.findUnique({
        where: { userId: session.user.id },
        select: { currentLevel: true },
      }),
    ])

    // Compute which knowledge-graph nodes are currently unlocked for the learner
    const graph = getKnowledgeGraph(subject)
    const completedSlugs = new Set(
      topicProgressRows.filter((r) => r.status === 'COMPLETED' || r.status === 'MASTERED' || r.status === 'REVISION').map((r) => r.topicSlug)
    )
    const level = normalizeToCanonicalLevel(profile?.currentLevel)
    // Placement (see src/lib/curriculum/placement.ts): nodes before the
    // learner's level-appropriate entry point are unlocked for prerequisite
    // purposes ONLY — never merged into completedSlugs/topicProgressRows,
    // which stay genuinely earned and are returned to the client unchanged.
    const placementFloorSlugs = graph && !progress ? getPlacementFloorSlugs(graph, level) : new Set<string>()
    const unlockedSlugs = new Set([...completedSlugs, ...placementFloorSlugs])
    const availableNodes = graph ? getAvailableNodes(graph, unlockedSlugs).map((n) => n.slug) : []
    const libSubject = findLibrarySubject(subject)

    // Priority: canonical KG > legacy Curriculum DB rows > Subject Library catalog.
    // See resolveCurriculumSource for why this order matters (it's the exact fix
    // for the bug where English's canonical KG was shadowed by stale legacy rows).
    const source = resolveCurriculumSource(!!graph, lessons.length, !!libSubject)

    if (source === 'kg' && graph) {
      let order = 1
      // Tier-1 subjects: synthesise from KG so topicSlug === KG node slug everywhere.
      // This is the critical connection: lesson.topicSlug → KG node → assessment → mastery.
      const syntheticLessons = graph.modules.flatMap((module, modIdx) =>
        module.nodes.map((node, nodeIdx) => ({
          id: `${subject}-${modIdx + 1}-${nodeIdx + 1}`,
          subjectCode: subject,
          unit: modIdx + 1,
          unitTitle: module.title,
          lesson: nodeIdx + 1,
          lessonTitle: node.title,
          lessonGoal: node.description,
          order: order++,
          topicSlug: node.slug,
        }))
      )
      // Only applies before any real progress row exists — once a learner has
      // genuinely completed anything, their real StudentProgress row (never
      // faked) takes over and this placement default is never consulted again.
      const defaultProgress = { currentLesson: computeCurriculumEntryOrder(graph, level), completedLessons: [] as number[] }
      return NextResponse.json({
        success: true,
        lessons: syntheticLessons,
        progress: progress ?? defaultProgress,
        topicProgress: topicProgressRows,
        availableNodes,
      })
    }

    if (source === 'library-catalog' && libSubject) {
      let order = 1
      const syntheticLessons = libSubject.modules.flatMap((module, modIdx) =>
        module.nodes.map((node, nodeIdx) => ({
          id: `${subject}-${modIdx + 1}-${nodeIdx + 1}`,
          subjectCode: subject,
          unit: modIdx + 1,
          unitTitle: module.title,
          lesson: nodeIdx + 1,
          lessonTitle: node.title,
          lessonGoal: node.title,
          order: order++,
          topicSlug: node.slug,
        }))
      )
      return NextResponse.json({
        success: true,
        lessons: syntheticLessons,
        progress: progress ?? { currentLesson: 1, completedLessons: [] },
        topicProgress: topicProgressRows,
        availableNodes,
      })
    }

    // Legacy curriculum rows (c/cpp) predate the knowledge-graph linkage and have
    // topicSlug = null. Practice/Insights are gated on a topicSlug being present,
    // so fall back to the lesson's own id — these subjects have no KG node to link
    // to anyway, and practice sessions only need a stable per-lesson identifier.
    const lessonsWithTopicSlug = lessons.map((lesson) => ({
      ...lesson,
      topicSlug: lesson.topicSlug ?? lesson.id,
    }))

    return NextResponse.json({
      success: true,
      lessons: lessonsWithTopicSlug,
      progress: progress ?? { currentLesson: 1, completedLessons: [] },
      topicProgress: topicProgressRows,
      availableNodes,
    })
  } catch (err) {
    console.error('[GET /api/curriculum]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectSlug } = schema.parse(body)

    const [profile, subject] = await Promise.all([
      prisma.profile.findUnique({ where: { userId: session.user.id } }),
      prisma.subject.findUnique({ where: { slug: subjectSlug } }),
    ])

    if (!profile) return NextResponse.json({ success: false, error: 'Profile not found' }, { status: 404 })
    if (!subject) return NextResponse.json({ success: false, error: 'Subject not found' }, { status: 404 })

    // If this subject has a known curriculum tree (Subject Library), point the
    // generator at it so it follows prerequisites instead of inventing structure.
    const librarySubject = findLibrarySubject(subjectSlug)
    const treeBlock = librarySubject ? renderCurriculumTree(librarySubject) : null
    const prompt = buildCurriculumPrompt(subject.name, profile.selfDescription, treeBlock)

    const curriculum = await generateJSON(prompt) as Curriculum
    // MED-9: validate shape before accessing .steps — an empty array [], a plain
    // object, or any other truthy non-Curriculum value would pass the null check
    // but throw TypeError on .steps.length.
    if (!curriculum || typeof curriculum !== 'object' || !Array.isArray((curriculum as Curriculum).steps) || (curriculum as Curriculum).steps.length === 0) {
      return NextResponse.json({ success: false, error: 'Failed to generate curriculum' }, { status: 502 })
    }

    const learningPath = await prisma.learningPath.create({
      data: {
        userId: session.user.id,
        subjectId: subject.id,
        title: curriculum.title,
        curriculum,
        totalSteps: curriculum.steps.length,
      },
    })

    return NextResponse.json({ success: true, data: learningPath })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[curriculum]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

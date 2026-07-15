/**
 * Stage 4 — FOLD. Owner: Model Plane (RS §4).
 *
 * K3 v1: composes the read-only StudentView from snapshot + this turn's
 * committed candidates + adapters supplied by the caller (route.ts still
 * owns the DB reads that feed profileLevel/isFirstLessonContext/etc. — a
 * follow-on milestone moves those reads into dedicated fold modules that
 * read from Evidence Spine only, closing the loop RS L4 requires).
 */
import type { KernelState, Stage, StudentView } from '../types'

export interface FoldAdapters {
  contentRegister: 'beginner' | 'intermediate' | 'expert'
  profileLevel: 'beginner' | 'intermediate' | 'advanced' | null
  sessionFailureCount: number
  currentConceptId: string | null
  hasVerifiedPlacement: boolean
  pendingPlacementProbe: string | null
  isFirstLessonContext: boolean
}

export function buildStudentView(learnerId: string, a: FoldAdapters): StudentView {
  return {
    learnerId,
    contentRegister: a.contentRegister,
    profileLevel: a.profileLevel,
    sessionFailureCount: a.sessionFailureCount,
    currentConceptId: a.currentConceptId,
    hasVerifiedPlacement: a.hasVerifiedPlacement,
    pendingPlacementProbe: a.pendingPlacementProbe,
    isFirstLessonContext: a.isFirstLessonContext,
    capabilities: {},
  }
}

export function foldStage(adapters: FoldAdapters): Stage<KernelState, KernelState> {
  return {
    name: 'FOLD',
    async run(state) {
      const view = buildStudentView(state.context.learnerId, adapters)
      return { ...state, view }
    },
  }
}

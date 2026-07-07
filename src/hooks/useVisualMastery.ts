'use client'
/**
 * useVisualMastery — Visual Learning Sprint L (Activation, Task 3).
 *
 * Client-side, in-memory collector for VisualMasterySignal events emitted by
 * the four visual renderers (via VisualRenderer's onMasteryEvent prop).
 * No persistence, no API calls — state lives only for the lifetime of the
 * component that calls this hook (e.g. one quiz session).
 *
 * Why dedup by instance key rather than just pushing signals into an array:
 * a single real-world "reached the target on the first try" moment can
 * legitimately emit two separate VisualMasterySignal objects from a renderer
 * — one from the "attempted" branch, one from the "completed" branch (see
 * docs/VISUAL_MASTERY_INTEGRATION_AUDIT.md, "duplicate-event risk"). Counting
 * both would double-count that one moment. Collapsing signals into a
 * per-instance cumulative milestone set (shown/interacted/attempted/
 * completed, each OR'd in over time) makes each milestone count at most once
 * per instance, regardless of how many signal objects carried it.
 */
import { useCallback, useMemo, useState } from 'react'
import type { VisualMasterySignal, VisualMasteryEngine } from '@/lib/visuals/visualMastery'

interface InstanceState {
  visualType: VisualMasteryEngine
  shown: boolean
  interacted: boolean
  challengeAttempted: boolean
  challengeCompleted: boolean
}

/**
 * Identifies "the same visual instance" across multiple signals. Renderers
 * don't expose a mount-instance id, so this is a best-effort key built from
 * the caller-supplied context (concept/source/subjectSlug/topicSlug/
 * sessionId) plus visualType. Two genuinely different displays of the exact
 * same concept with identical context will collapse into one instance —
 * an accepted limitation (see audit doc's "cross-cutting duplicate-event
 * risk" section).
 */
function instanceKey(signal: VisualMasterySignal): string {
  return [
    signal.visualType,
    signal.concept,
    signal.source ?? '',
    signal.subjectSlug ?? '',
    signal.topicSlug ?? '',
    signal.sessionId ?? '',
  ].join('|')
}

export interface VisualMasterySummaryEntry {
  shown: number
  interacted: number
  completed: number
}

/** Keyed by visual engine, e.g. `{ graph: { shown: 3, interacted: 2, completed: 2 }, geometry: { shown: 1, interacted: 1, completed: 1 } }`. Only engines actually observed this session appear. */
export type VisualMasterySummary = Partial<Record<VisualMasteryEngine, VisualMasterySummaryEntry>>

export function useVisualMastery() {
  const [instances, setInstances] = useState<Map<string, InstanceState>>(new Map())

  /** Pass directly as a component's `onMasteryEvent` prop, or call from within one. */
  const recordMasteryEvent = useCallback((signal: VisualMasterySignal) => {
    setInstances((prev) => {
      const key = instanceKey(signal)
      const existing = prev.get(key)
      const next: InstanceState = {
        visualType: signal.visualType,
        shown: (existing?.shown ?? false) || signal.shown,
        interacted: (existing?.interacted ?? false) || signal.interacted,
        challengeAttempted: (existing?.challengeAttempted ?? false) || signal.challengeAttempted,
        challengeCompleted: (existing?.challengeCompleted ?? false) || signal.challengeCompleted,
      }
      const unchanged = existing
        && existing.shown === next.shown
        && existing.interacted === next.interacted
        && existing.challengeAttempted === next.challengeAttempted
        && existing.challengeCompleted === next.challengeCompleted
      if (unchanged) return prev
      const updated = new Map(prev)
      updated.set(key, next)
      return updated
    })
  }, [])

  const summary = useMemo<VisualMasterySummary>(() => {
    const out: VisualMasterySummary = {}
    for (const inst of instances.values()) {
      const bucket = out[inst.visualType] ?? { shown: 0, interacted: 0, completed: 0 }
      if (inst.shown) bucket.shown += 1
      if (inst.interacted) bucket.interacted += 1
      if (inst.challengeCompleted) bucket.completed += 1
      out[inst.visualType] = bucket
    }
    return out
  }, [instances])

  const reset = useCallback(() => setInstances(new Map()), [])

  return {
    /** Pass as `onMasteryEvent` to VisualRenderer/individual renderers. */
    recordMasteryEvent,
    /** Per-engine counts, dedup'd per visual instance. */
    summary,
    /** Number of distinct visual instances observed this session. */
    instanceCount: instances.size,
    /** Clears all collected state (e.g. on starting a new quiz attempt). */
    reset,
  }
}

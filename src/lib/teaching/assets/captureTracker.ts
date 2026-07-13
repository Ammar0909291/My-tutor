/**
 * In-memory capture outcome tracker — feeds the "capture success rate /
 * rejected assets / duplicate rejection rate" health metrics (task 6).
 *
 * Deliberately NOT persisted: adding a durable capture-attempt log would
 * mean either a new table (a schema change this task says to avoid unless
 * absolutely required) or overloading EvidenceEvent with a category that
 * doesn't semantically fit its append-only per-turn evidence log. An
 * in-memory counter is the correct "smallest diff" choice for a pipeline
 * that has captured zero content so far — it resets on deploy/restart and
 * doesn't aggregate across horizontally-scaled instances, which is a real
 * limitation worth fixing once real traffic flows through this (a natural
 * follow-up: durable counters, e.g. a small dedicated capture_log table,
 * once this pipeline is actually running in production).
 */
import type { CaptureOutcome } from './versioning'

export interface CaptureHealthStats {
  totalAttempts: number
  inserted: number
  versioned: number
  duplicateSkipped: number
  rejected: number
  errored: number
  successRate: number // (inserted + versioned) / totalAttempts, 0 when no attempts yet
  duplicateRejectionRate: number // duplicateSkipped / totalAttempts
}

class CaptureTracker {
  private inserted = 0
  private versioned = 0
  private duplicateSkipped = 0
  private rejected = 0
  private errored = 0

  record(outcome: CaptureOutcome): void {
    switch (outcome.action) {
      case 'inserted': this.inserted++; break
      case 'versioned': this.versioned++; break
      case 'skipped-duplicate': this.duplicateSkipped++; break
      case 'rejected': this.rejected++; break
      case 'error': this.errored++; break
    }
  }

  recordRejection(): void {
    this.rejected++
  }

  stats(): CaptureHealthStats {
    const totalAttempts = this.inserted + this.versioned + this.duplicateSkipped + this.rejected + this.errored
    return {
      totalAttempts,
      inserted: this.inserted,
      versioned: this.versioned,
      duplicateSkipped: this.duplicateSkipped,
      rejected: this.rejected,
      errored: this.errored,
      successRate: totalAttempts > 0 ? Math.round(((this.inserted + this.versioned) / totalAttempts) * 100) : 0,
      duplicateRejectionRate: totalAttempts > 0 ? Math.round((this.duplicateSkipped / totalAttempts) * 100) : 0,
    }
  }

  /** Test-only reset — production code never needs to clear this. */
  _reset(): void {
    this.inserted = 0; this.versioned = 0; this.duplicateSkipped = 0; this.rejected = 0; this.errored = 0
  }
}

// Module-level singleton — one per Node process, matching every other
// process-local cache already in this codebase (e.g. VisualizationCache).
export const captureTracker = new CaptureTracker()

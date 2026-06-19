'use client'
/**
 * VisualErrorBoundary — Visual Learning Sprint B.
 * Fail-safe wrapper: if any visual renderer throws, render nothing so the
 * surrounding lesson/text is never broken by a visual. (Architecture rule:
 * visuals are an additive enhancement that can always degrade to nothing.)
 */
import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean }

export class VisualErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // Non-fatal: log for diagnostics, never rethrow.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[VisualErrorBoundary] visual failed to render:', error)
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

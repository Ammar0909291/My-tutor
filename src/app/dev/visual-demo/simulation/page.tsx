import { notFound } from 'next/navigation'
import { SimulationDemo } from './SimulationDemo'

/**
 * Dev-only validation page for the ADR 16 time-stepped simulation (gate G2).
 *
 * DEV-ONLY: returns 404 in production, exactly like /dev/visual-demo. It is not
 * a production route and binds no concept: it renders the Newton simulation
 * directly from the parametric registry so the browser interaction can be
 * exercised and inspected (e2e/simulation-newton.spec.ts).
 */
export const metadata = { robots: { index: false, follow: false } }

export default function SimulationDemoPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <SimulationDemo />
}

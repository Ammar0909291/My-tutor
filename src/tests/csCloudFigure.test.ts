import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

// Live 2026-10-19: Cloud Computing was served the cs.net packet-flow card.
const ask = (id: string) => resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'computer_science' } as never)
describe('the cs.net packet-flow card serves only the networking concepts it draws', () => {
  it('cloud computing gets no domain card', () => {
    expect((ask('cs.net.cloud-computing').payload as { visualType?: string } | null)?.visualType).not.toBe('three_network_packet_flow')
  })
  it.each(['cs.net.routing-congestion', 'cs.net.tcp-udp-transport', 'cs.net.networking-basics'])('%s keeps it', (id) => {
    expect((ask(id).payload as { visualType?: string } | null)?.visualType).toBe('three_network_packet_flow')
  })
})

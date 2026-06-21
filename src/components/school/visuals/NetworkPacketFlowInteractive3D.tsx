'use client'
/**
 * NetworkPacketFlowInteractive3D — Computer Science Interactive Layer Sprint, Task 4.
 * Additive: live controls (packet count, router count, transmission speed) drive the
 * routing path, multiple packets in flight, and a congestion indicator when demand
 * exceeds capacity, so the student sees packet-based routing and congestion. Does not
 * modify NetworkPacketFlow3D.tsx (untouched).
 */
import { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Bond3D } from './Bond3D'
import { SimulationControlPanel, type SimulationControl } from './SimulationControlPanel'
import { type VisualMasteryContext, type VisualMasterySignal } from '@/lib/visuals/visualMastery'
import { useControlMastery } from './useControlMastery'

const SENDER: [number, number, number] = [-4.5, 0, 0]
const DEST: [number, number, number] = [4.5, 0, 0]

function routerPositions(count: number): [number, number, number][] {
  const pts: [number, number, number][] = []
  for (let i = 0; i < count; i++) {
    const t = (i + 1) / (count + 1)
    const x = SENDER[0] + t * (DEST[0] - SENDER[0])
    const y = i % 2 === 0 ? 1.1 : -1.1
    pts.push([x, y, 0])
  }
  return pts
}

function Scene({ routerCount, packetCount, congested }: { routerCount: number; packetCount: number; congested: boolean }) {
  const routers = useMemo(() => routerPositions(routerCount), [routerCount])
  const path = useMemo(() => [SENDER, ...routers, DEST], [routers])
  const packetColor = congested ? '#FF6B6B' : '#FFD166'

  return (
    <group>
      <MolecularNode3D position={SENDER} radius={0.5} color="#81C784" label="Sender" />
      <MolecularNode3D position={DEST} radius={0.5} color="#BA68C8" label="Destination" />
      {routers.map((p, i) => <MolecularNode3D key={i} position={p} radius={0.34} color="#5B8DEF" label="Router" />)}
      {path.slice(0, -1).map((a, i) => <Bond3D key={i} atomA={a} atomB={path[i + 1]} color="#9AA5B8" />)}
      {/* Packets in flight along the first hop, spaced out. */}
      {Array.from({ length: Math.min(packetCount, 8) }).map((_, i) => {
        const t = (i + 1) / (Math.min(packetCount, 8) + 1)
        const x = SENDER[0] + t * (path[1][0] - SENDER[0])
        const y = SENDER[1] + t * (path[1][1] - SENDER[1])
        return <MolecularNode3D key={`pk${i}`} position={[x, y + 0.25, 0]} radius={0.16} color={packetColor} />
      })}
      {congested && (
        <Html position={[0, -2.6, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#FF6B6B', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
            Congestion: more packets than the link can carry at this speed
          </span>
        </Html>
      )}
    </group>
  )
}

interface NetworkPacketFlowInteractive3DProps {
  highlightedControlId?: string | null
  onMasteryEvent?: (signal: VisualMasterySignal) => void
  masteryContext?: VisualMasteryContext
}

export function NetworkPacketFlowInteractive3D({ highlightedControlId, onMasteryEvent, masteryContext }: NetworkPacketFlowInteractive3DProps = {}) {
  const [packetCount, setPacketCount] = useState(3)
  const [routerCount, setRouterCount] = useState(2)
  const [speed, setSpeed] = useState(5)

  const { mark } = useControlMastery({ defaultConcept: 'packet_routing_congestion', threshold: 3, context: masteryContext, onMasteryEvent })

  // Congested when demand (packets) outpaces capacity (speed).
  const congested = packetCount > speed

  const controls: SimulationControl[] = [
    { kind: 'slider', id: 'packetCount', label: 'Packet count', min: 1, max: 8, step: 1, value: packetCount, onChange: (v) => { setPacketCount(v); mark('packetCount') }, format: (v) => `${v}` },
    { kind: 'slider', id: 'routerCount', label: 'Router count (hops)', min: 1, max: 5, step: 1, value: routerCount, onChange: (v) => { setRouterCount(v); mark('routerCount') }, format: (v) => `${v}` },
    { kind: 'slider', id: 'speed', label: 'Transmission speed', min: 1, max: 10, step: 1, value: speed, onChange: (v) => { setSpeed(v); mark('speed') }, format: (v) => `×${v}` },
  ]

  return (
    <div>
      <ThreeDVisual cameraDistance={12} ariaLabel="Interactive 3D network packet flow: adjust packet count, router count, and transmission speed to see the routing path, packets in flight, and congestion effects">
        <Scene routerCount={routerCount} packetCount={packetCount} congested={congested} />
      </ThreeDVisual>
      <p style={{ fontSize: 12, fontWeight: 600, margin: '8px 0' }}>
        {packetCount} packet{packetCount === 1 ? '' : 's'} over {routerCount} router hop{routerCount === 1 ? '' : 's'} at speed ×{speed} — {congested ? 'the link is congested.' : 'the link keeps up.'}
      </p>
      <SimulationControlPanel
        controls={controls}
        highlightedControlId={highlightedControlId}
        onReset={() => { setPacketCount(3); setRouterCount(2); setSpeed(5) }}
      />
    </div>
  )
}

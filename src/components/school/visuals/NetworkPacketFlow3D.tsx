'use client'
/**
 * NetworkPacketFlow3D — Computer Science 3D Foundation Sprint, Task 4.
 * revealStep-gated on the Universal 3D Engine: packet-based networking —
 *   1 sender · 2 packet creation · 3 router path · 4 destination ·
 *   5 completed transmission.
 * Reuses ThreeDVisual + MolecularNode3D + Bond3D + Vector3D (no new primitives).
 */
import { useMemo } from 'react'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D, nodeLabelAnchor } from './MolecularNode3D'
import { Bond3D } from './Bond3D'
import { Vector3D } from './Vector3D'
import { SceneLabelLayer, type LayerLabel } from './SceneLabelLayer'
import type { SceneObject } from '@/lib/teaching/sceneSpec'
import { useTheme, type Theme } from '@/components/Providers'

const CAMERA_DISTANCE = 11
const SENDER: [number, number, number] = [-4, 0, 0]
const ROUTER_A: [number, number, number] = [-1.5, 1.2, 0]
const ROUTER_B: [number, number, number] = [1.5, -1.2, 0]
const DEST: [number, number, number] = [4, 0, 0]
const PACKET: [number, number, number] = [-3, 0.2, 0]

function Scene({ revealStep, theme }: { revealStep: number; theme: Theme }) {
  const showSender = revealStep >= 1
  const showPacket = revealStep >= 2
  const showRouters = revealStep >= 3
  const showDest = revealStep >= 4
  const completed = revealStep >= 5

  const { labels, obstacles } = useMemo(() => {
    const labels: LayerLabel[] = []
    const obstacles: SceneObject[] = []
    const node = (show: boolean, position: [number, number, number], radius: number, color: string, text: string) => {
      if (!show) return
      obstacles.push({ type: 'node', position, radius })
      labels.push({ text, position: nodeLabelAnchor(position, radius), color })
    }
    node(showSender, SENDER, 0.5, '#81C784', 'Sender')
    node(showPacket, PACKET, 0.22, '#FFD166', 'Packet')
    node(showRouters, ROUTER_A, 0.38, '#5B8DEF', 'Router')
    node(showRouters, ROUTER_B, 0.38, '#5B8DEF', 'Router')
    node(showDest, DEST, 0.5, '#BA68C8', 'Destination')
    if (showRouters) {
      obstacles.push({ type: 'bond', from: SENDER, to: ROUTER_A })
      obstacles.push({ type: 'bond', from: ROUTER_A, to: ROUTER_B })
    }
    if (showDest) obstacles.push({ type: 'bond', from: ROUTER_B, to: DEST })
    if (completed) {
      labels.push({ text: 'Packet delivered: sender → router → router → destination', position: [0, -2.6, 0], color: '#FFD166' })
    }
    return { labels, obstacles }
  }, [showSender, showPacket, showRouters, showDest, completed])

  return (
    <group>
      {showSender && <MolecularNode3D position={SENDER} radius={0.5} color="#81C784" />}

      {showPacket && <MolecularNode3D position={PACKET} radius={0.22} color="#FFD166" />}

      {showRouters && (
        <group>
          <MolecularNode3D position={ROUTER_A} radius={0.38} color="#5B8DEF" />
          <MolecularNode3D position={ROUTER_B} radius={0.38} color="#5B8DEF" />
          <Bond3D atomA={SENDER} atomB={ROUTER_A} color="#9AA5B8" />
          <Bond3D atomA={ROUTER_A} atomB={ROUTER_B} color="#9AA5B8" />
        </group>
      )}

      {showDest && (
        <group>
          <MolecularNode3D position={DEST} radius={0.5} color="#BA68C8" />
          <Bond3D atomA={ROUTER_B} atomB={DEST} color="#9AA5B8" />
        </group>
      )}

      {completed && (
        <group>
          <Vector3D start={SENDER} end={ROUTER_A} color="#FFD166" thickness={0.035} />
          <Vector3D start={ROUTER_A} end={ROUTER_B} color="#FFD166" thickness={0.035} />
          <Vector3D start={ROUTER_B} end={DEST} color="#FFD166" thickness={0.035} />
        </group>
      )}
      <SceneLabelLayer labels={labels} obstacles={obstacles} cameraDistance={CAMERA_DISTANCE} theme={theme} />
    </group>
  )
}

export function NetworkPacketFlow3D({ revealStep = Infinity }: { revealStep?: number }) {
  const { theme } = useTheme()
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={CAMERA_DISTANCE}
      autoRotate={false}
      ariaLabel="3D network packet flow: a sender, a created packet, a multi-hop router path, the destination, and the completed transmission"
    >
      <Scene revealStep={revealStep} theme={theme} />
    </ThreeDVisual>
  )
}

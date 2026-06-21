'use client'
/**
 * NetworkPacketFlow3D — Computer Science 3D Foundation Sprint, Task 4.
 * revealStep-gated on the Universal 3D Engine: packet-based networking —
 *   1 sender · 2 packet creation · 3 router path · 4 destination ·
 *   5 completed transmission.
 * Reuses ThreeDVisual + MolecularNode3D + Bond3D + Vector3D (no new primitives).
 */
import { Html } from '@react-three/drei'
import { ThreeDVisual } from './ThreeDVisual'
import { MolecularNode3D } from './MolecularNode3D'
import { Bond3D } from './Bond3D'
import { Vector3D } from './Vector3D'

const SENDER: [number, number, number] = [-4, 0, 0]
const ROUTER_A: [number, number, number] = [-1.5, 1.2, 0]
const ROUTER_B: [number, number, number] = [1.5, -1.2, 0]
const DEST: [number, number, number] = [4, 0, 0]
const PACKET: [number, number, number] = [-3, 0.2, 0]

function Scene({ revealStep }: { revealStep: number }) {
  const showSender = revealStep >= 1
  const showPacket = revealStep >= 2
  const showRouters = revealStep >= 3
  const showDest = revealStep >= 4
  const completed = revealStep >= 5

  return (
    <group>
      {showSender && <MolecularNode3D position={SENDER} radius={0.5} color="#81C784" label="Sender" />}

      {showPacket && <MolecularNode3D position={PACKET} radius={0.22} color="#FFD166" label="Packet" />}

      {showRouters && (
        <group>
          <MolecularNode3D position={ROUTER_A} radius={0.38} color="#5B8DEF" label="Router" />
          <MolecularNode3D position={ROUTER_B} radius={0.38} color="#5B8DEF" label="Router" />
          <Bond3D atomA={SENDER} atomB={ROUTER_A} color="#9AA5B8" />
          <Bond3D atomA={ROUTER_A} atomB={ROUTER_B} color="#9AA5B8" />
        </group>
      )}

      {showDest && (
        <group>
          <MolecularNode3D position={DEST} radius={0.5} color="#BA68C8" label="Destination" />
          <Bond3D atomA={ROUTER_B} atomB={DEST} color="#9AA5B8" />
        </group>
      )}

      {completed && (
        <group>
          <Vector3D start={SENDER} end={ROUTER_A} color="#FFD166" thickness={0.035} />
          <Vector3D start={ROUTER_A} end={ROUTER_B} color="#FFD166" thickness={0.035} />
          <Vector3D start={ROUTER_B} end={DEST} color="#FFD166" thickness={0.035} />
          <Html position={[0, -2.6, 0]} center distanceFactor={9} style={{ pointerEvents: 'none' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FFD166', whiteSpace: 'nowrap', textShadow: '0 0 3px rgba(0,0,0,0.6)' }}>
              Packet delivered: sender → router → router → destination
            </span>
          </Html>
        </group>
      )}
    </group>
  )
}

export function NetworkPacketFlow3D({ revealStep = Infinity }: { revealStep?: number }) {
  return (
    <ThreeDVisual
      revealStep={revealStep}
      cameraDistance={11}
      ariaLabel="3D network packet flow: a sender, a created packet, a multi-hop router path, the destination, and the completed transmission"
    >
      <Scene revealStep={revealStep} />
    </ThreeDVisual>
  )
}

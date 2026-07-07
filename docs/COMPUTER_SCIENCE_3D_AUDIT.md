# Computer Science 3D — Foundation Audit

Read-only audit performed before building the Computer Science 3D Foundation visuals, mirroring the
Quantum / Classical Mechanics / Chemistry / Mathematics Foundation audits. No existing architecture
is modified by this sprint.

## Primitives & framework reviewed

- **`ThreeDVisual`** — the universal scene host (Canvas, lights, OrbitControls, reduced-motion,
  responsive sizing). Reused unchanged as the host for all five CS visuals, exactly as every prior
  subject does. Accepts `revealStep`, `cameraDistance`, `ariaLabel`.
- **`MolecularNode3D`** — generic labeled sphere (`position`, `radius`, `label`, `color`). Already
  proven subject-independent (Chemistry atoms, Mathematics points). Directly reusable as a CS
  **node**: a CPU/RAM/router/array-element marker.
- **`Bond3D`** — generic connector: one-or-more cylinders between two points with an optional label
  (`atomA`, `atomB`, `bondOrder`, `label`, `color`). Subject-independent geometry; reusable as a CS
  **link/edge**: a bus between components, a linked-list pointer, a network hop.
- **`Vector3D`** — generic labeled arrow (`start`, `end`, `color`, `label`, `thickness`). Reusable
  for **directed data flow** (sender→router→destination, CPU↔memory movement).
- **`VisualCard` / `visualTypes` / `VISUAL_STEP_COUNTS`** — the registration + dispatch surface.
  Extended additively with five new `three_*` types and switch cases, following the exact pattern of
  the Mathematics/Chemistry/Mechanics/Quantum Foundation sprints (manual union member + `VISUAL_META`
  entry + `VISUAL_STEP_COUNTS: 5` + import + switch case).
- **Existing 3D subjects** — every Foundation component follows the same shape: a `Scene({ revealStep })`
  with boolean reveal gates (`show… = revealStep >= n`), wrapped by an exported component rendering
  `<ThreeDVisual><Scene/></ThreeDVisual>`. CS visuals follow this shape identically.

## Reusable primitives (no new primitive required)

| Need | Reused primitive |
|---|---|
| Component / node / element markers | `MolecularNode3D` (labeled sphere) + inline `boxGeometry` meshes for box-shaped elements (array cells, sorting bars) |
| Buses, links, pointers, network hops | `Bond3D` |
| Directed data flow | `Vector3D` |
| Labels | `Html` from `@react-three/drei` (same as all Foundation components) |
| Scene host | `ThreeDVisual` |

**New primitives required: none.** Computer Science is fully expressible with the existing universal
primitives plus the same inline `boxGeometry`/`planeGeometry` meshes every Foundation component already
uses for non-spherical shapes. This confirms the audit roadmap's prediction that CS would mostly be
"new Scene compositions over existing primitives" (graph node = `MolecularNode3D`, edge = `Bond3D`).

## Educational goals

1. **Computer architecture** — how input, CPU, memory, and storage interact and exchange data.
2. **Memory hierarchy** — why CPU/cache/RAM/storage form a speed-vs-size pyramid and how data moves
   up it.
3. **Packet-based networking** — how data is split into packets, routed hop-by-hop, and reassembled.
4. **Data structures** — the structural differences between array, linked list, stack, and queue.
5. **Algorithm execution** — the compare→swap→progress→sorted flow at the heart of sorting, taught
   as a flow (deliberately not a full algorithm engine).

## Misconception opportunities (for a future Interactive layer)

- *"RAM and storage are the same thing"* — the architecture and memory-hierarchy visuals separate
  volatile RAM/cache from persistent storage.
- *"The CPU stores data permanently"* — memory-hierarchy visual shows data movement, not residence.
- *"A packet travels in one piece along one fixed wire"* — packet-flow visual shows discrete packets
  taking a multi-hop router path.
- *"A stack and a queue are interchangeable"* — data-structure visual contrasts LIFO vs FIFO access.
- *"Sorting happens all at once"* — algorithm visual decomposes it into repeated compare/swap steps.

These are recorded as opportunities only; no Interactive layer, Guided mode, or Visual Mastery work
is done in this Foundation sprint.

## Constraints honoured

Additive only. No changes to `detectVisual.ts`, Tutor Max, Educational Intelligence, Assessment,
Curriculum, Visual Mastery, the Interactive layer, Guided mode, or production integration. No file
moves. No existing primitive or Foundation component modified.

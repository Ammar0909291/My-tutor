# Computer Science Interactive Layer — Audit

Read-only audit before building the five Computer Science interactive simulations, mirroring the
Quantum / Classical Mechanics / Chemistry / Mathematics Interactive Layer audits. Reuses existing
infrastructure only (`SimulationControlPanel`, `GuidedSimulationMode`, `useControlMastery`,
`ThreeDVisual`). No existing component or engine is modified.

## Infrastructure confirmed reusable (no modification)

- **`ThreeDVisual`** — scene host, used unchanged.
- **`SimulationControlPanel`** — generic slider/dropdown/toggle/reset panel; covers every control
  below.
- **`GuidedSimulationMode`** — generic 3-step render-prop wrapper; supplies `highlightedControlId`.
- **`useControlMastery`** — the consolidated mastery hook (`{ handleChange, mark }`, threshold,
  `'quantum_interactive'` bucket). Reused as-is; **no new mastery architecture**.

Each new component follows the proven shape established by `CrystalLatticeInteractive3D` /
`AtomicStructureInteractive3D`: local `useState` per parameter → derived values via `useMemo` →
a live `Scene` inside `ThreeDVisual` → `SimulationControlPanel` driving the same state →
`useControlMastery` wired to every control change → an optional `highlightedControlId` prop forwarded
from `GuidedSimulationMode`. The revealStep-gated Foundation components are **not** modified — these
are new standalone components.

## Per-simulation review

### ComputerArchitectureInteractive3D (from `ComputerArchitecture3D`)
- **Controls:** CPU speed (slider), memory size (slider), storage type (dropdown: HDD / SSD / NVMe).
- **Displays:** data-movement arrows, the current bottleneck component, a relative throughput readout.
- **Misconceptions:** "a faster CPU always means a faster computer" (memory/storage can bottleneck);
  "all storage is equally fast".
- **Mastery signals:** `interacted` / `challengeAttempted` / `challengeCompleted` once ≥2 distinct
  controls touched (concept `computer_architecture_bottleneck`).
- **Guided opportunity:** raise CPU speed → see memory become the bottleneck → switch storage type.

### MemoryStorageInteractive3D (from `MemoryStorage3D`)
- **Controls:** cache size (slider), RAM size (slider), storage type (dropdown).
- **Displays:** the access path up the hierarchy, relative latency per tier, the resulting hierarchy
  shape.
- **Misconceptions:** "cache and RAM are the same"; "bigger cache is free" (it is the smallest/fastest
  tier); "RAM and storage are interchangeable".
- **Mastery signals:** threshold 2, concept `memory_hierarchy_latency`.
- **Guided opportunity:** grow cache → grow RAM → change storage type and compare access latency.

### NetworkPacketFlowInteractive3D (from `NetworkPacketFlow3D`)
- **Controls:** packet count (slider), router count (slider), transmission speed (slider).
- **Displays:** the routing path, multiple packets in flight, congestion when packets > capacity.
- **Misconceptions:** "data travels as one piece"; "more routers is always faster" (more hops);
  "bandwidth is infinite" (congestion).
- **Mastery signals:** threshold 3, concept `packet_routing_congestion`.
- **Guided opportunity:** add packets → add routers (more hops) → raise speed to clear congestion.

### DataStructureInteractive3D (from `DataStructureVisualization3D`)
- **Controls:** structure type (dropdown: array / linked list / stack / queue).
- **Displays:** how insert, remove, and traversal behave for the chosen structure.
- **Misconceptions:** "stack and queue are interchangeable" (LIFO vs FIFO); "every structure inserts
  the same way".
- **Mastery signals:** threshold 1 (single-control sim, matching `MolecularShapesInteractive3D` style),
  concept `data_structure_access_rules`.
- **Guided opportunity:** array (index access) → linked list (pointer traversal) → stack/queue
  (LIFO vs FIFO).

### AlgorithmInteractive3D (from `AlgorithmVisualization3D`)
- **Controls:** dataset size (slider), speed (slider), algorithm type (dropdown: bubble / selection).
  *Educational visualization only — not a verified, fully-correct sort engine (per the spec).*
- **Displays:** which pair is compared, swaps, and overall progress toward sorted.
- **Misconceptions:** "sorting happens instantly"; "all sorts do the same work".
- **Mastery signals:** threshold 3, concept `algorithm_compare_swap_flow`.
- **Guided opportunity:** small dataset → change algorithm type → adjust speed to watch compare/swap.

## Constraints honoured

Additive only. No changes to `ThreeDVisual`, `VisualCard`, `visualTypes`, `detectVisual`, the
narration/playback engines, or the mastery-engine architecture. No production integration. The five
interactive components are rendered only in the dev demo, exactly like every prior Interactive Layer
sprint.

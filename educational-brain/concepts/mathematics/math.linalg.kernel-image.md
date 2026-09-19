# math.linalg.kernel-image

## Identity
- **KG id**: `math.linalg.kernel-image`
- **Domain**: math.linalg
- **Requires**: `math.linalg.linear-map`
- **Unlocks**: none
- **Cross-links**: `math.abst.group-homomorphism` (Blueprint's own Component 7 stated "none" — the
  live KG lists this cross-link, which the Blueprint never checked — corrected to a genuine
  cross-link probe here since the target IS authored, see Curriculum Feedback)
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Find the KERNEL $\ker(T)=\{v:T(v)=0\}$, recognizing it can contain MANY nonzero vectors (never
assumed to automatically equal just $\{0\}$); find the IMAGE $\text{im}(T)=\{T(v):v\in V\}$,
recognizing it can be a PROPER subspace of the codomain (never assumed to automatically fill it);
and apply the EXACT criteria $T$ injective $\iff\ker(T)=\{0\}$, $T$ surjective $\iff\text{im}(T)=W$
(never checking injectivity via spot-checking a few input pairs, which can miss a genuine
collision or falsely suggest injectivity).

## Core Understanding
THE KERNEL CAN CONTAIN MANY NONZERO VECTORS — NEVER ASSUMED TO AUTOMATICALLY EQUAL $\{0\}$: for
$T(x,y)=(x+y,x+y)$ on $\mathbb R^2$: $\ker(T)$ is ALL $(x,y)$ with $x+y=0$ — the ENTIRE LINE
$\{(t,-t):t\in\mathbb R\}$, NOT just $\{(0,0)\}$. Many nonzero vectors (like $(1,-1)$) map to zero
under this $T$. The reflex "$0$ maps to $0$, so the kernel is just $\{0\}$" ignores that OTHER
nonzero vectors can ALSO map to zero whenever $T$ is not injective — the kernel's actual size must
be computed directly, never assumed.

INJECTIVITY IS TESTED EXACTLY VIA THE KERNEL — NEVER BY SPOT-CHECKING SPECIFIC INPUT PAIRS: for the
same $T$: since $\ker(T)$ is the whole line (not just $\{0\}$), $T$ is NOT injective — confirmed
directly by $T(1,-1)=(0,0)=T(0,0)$, two DIFFERENT inputs giving the SAME output. Testing only a
FEW specific input pairs for collisions is an INCOMPLETE method that could miss a genuine collision
entirely (falsely suggesting injectivity) — the kernel criterion $\ker(T)=\{0\}\iff T$ injective is
EXACT and complete, replacing any need for spot-checking altogether.

THE IMAGE CAN BE A PROPER SUBSPACE — NEVER ASSUMED TO AUTOMATICALLY FILL THE CODOMAIN: for the
same $T$: $\text{im}(T)$ is ALL outputs $(x+y,x+y)$, which is ALWAYS of the form $(s,s)$ — the
DIAGONAL LINE $\{(s,s):s\in\mathbb R\}$ in $\mathbb R^2$, NOT all of $\mathbb R^2$. Since
$(1,2)$ is not on this diagonal, it is NOT achievable by any input — $T$ is therefore NOT
surjective. Assuming the image automatically fills the codomain (without checking) misses that
many linear maps have genuinely smaller, proper-subspace images.

## Mental Models
- **"The kernel isn't automatically just zero — solve T(v)=0 completely and see how large the
  solution set actually is."**
- **"The kernel criterion is exact, not a sample — ker(T)={0} settles injectivity completely,
  replacing any need to test individual pairs."**
- **"The image is whatever T can actually reach — check it directly, never assume it fills the
  whole codomain."**

## Why Students Fail

### MC-1: KERNEL-ASSUMED-TO-BE-ONLY-ZERO
- **Surface form**: believes the kernel of any linear map automatically contains only the zero
  vector, missing that non-injective maps have larger kernels.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the fact that $0$
  always maps to $0$ is over-extended into assuming NOTHING ELSE can).
- **Repair**: re-solve $T(v)=0$ explicitly as a system of equations, showing the full solution set
  is a line, not a single point.

### MC-2: INJECTIVITY-CHECKED-BY-SPOT-CHECKING-RATHER-THAN-KERNEL
- **Surface form**: tests injectivity by checking a few specific input pairs for collisions,
  rather than using the definitive $\ker(T)=\{0\}$ criterion.
- **Birth type**: Foundational severity (Blueprint's own declared severity — spot-checking feels
  like a natural, direct way to test for collisions, obscuring that the kernel criterion is both
  necessary AND exact).
- **Repair**: re-derive the kernel explicitly and apply the exact criterion directly.

### MC-3: IMAGE-ASSUMED-TO-BE-THE-ENTIRE-CODOMAIN
- **Surface form**: assumes the image of a linear map automatically fills the entire codomain,
  rather than checking whether it's actually a proper (smaller) subspace.
- **Birth type**: Moderate severity (Blueprint's own declared severity — without explicit
  verification, "outputs" can be assumed to cover everything the codomain contains).
- **Repair**: re-derive the image explicitly by characterizing all achievable outputs.

## Misconceptions

### MC-1: KERNEL-ASSUMED-TO-BE-ONLY-ZERO
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: INJECTIVITY-CHECKED-BY-SPOT-CHECKING-RATHER-THAN-KERNEL
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: IMAGE-ASSUMED-TO-BE-THE-ENTIRE-CODOMAIN
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The kernel is everything that gets erased by the map — sometimes that's just the origin,
  sometimes it's a whole line or plane worth of inputs, and you have to actually solve for it to
  know which."**
- **Anti-analogy**: checking injectivity by testing a handful of input pairs is NOT a reliable
  substitute for the kernel test — like checking a few random pages of a book for typos instead of
  proofreading it completely.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the full kernel computation for $T(x,y)=(x+y,x+y)$, finding
  the entire line $\{(t,-t)\}$.
- **Demonstration 2 (targets MC-2)**: the exact kernel-based injectivity test contrasted with a
  flawed spot-checking approach, using the same $T$.
- **Demonstration 3 (targets MC-3)**: the full image computation for the same $T$, finding the
  diagonal line and confirming $(1,2)$ is unreachable.

## Discovery Questions
1. "Does the kernel of a linear map always contain only the zero vector, or can it contain more?"
2. "Is checking a few input pairs for collisions enough to conclude a map is injective, or is
   there a more definitive test?"
3. "Does the image of a linear map always fill the entire codomain, or can it be a smaller,
   proper subspace?"

## Teaching Sequence
1. **Conceptual shift**: the full kernel computation revealing a line, not just the origin,
   working Demonstration 1, isolating MC-1.
2. **Contrast pair**: the exact kernel criterion versus flawed spot-checking, working
   Demonstration 2, isolating MC-2.
3. **Representation shift**: the image computation and direct comparison against the full
   codomain, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct kernel and image computation for a new linear map, and
   correct injectivity/surjectivity determinations using the exact criteria, at the Blueprint's
   own stated MAMR of 5/5.

## Tutor Actions
- Never accept a kernel assumed to be $\{0\}$ without direct computation.
- Never accept injectivity determined by testing only a few input pairs rather than the kernel
  criterion.
- Never accept an image assumed to be the entire codomain without direct verification.

## Voice Teaching Notes
- Say "have you actually solved T(v)=0, or are you assuming the kernel is just zero?" whenever a
  kernel is discussed.
- Ask "is that a definitive test, or just a sample of a few inputs?" whenever injectivity is
  checked.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a kernel and image for a given linear map.
- **Rung 2 (application)**: learner correctly applies the kernel/image criteria to determine
  injectivity and surjectivity.
- **Rung 3 (transfer)**: learner correctly explains why spot-checking is insufficient for
  injectivity in a dimension-reducing map (e.g. discarding a coordinate), using the exact kernel
  criterion instead.

## Tutor Recovery Strategy
- If MC-1 recurs, re-solve $T(v)=0$ explicitly.
- If MC-2 recurs, re-derive the kernel and apply the exact criterion.
- If MC-3 recurs, re-derive the image explicitly.

## Memory Hooks
- "Solve T(v)=0 completely — don't assume the kernel is just zero."
- "The kernel criterion is exact — it replaces any need to spot-check individual pairs."
- "Check the image directly — it might not fill the whole codomain."

## Transfer Connections
- `math.linalg.linear-map` (already authored, certified domain): supplies the linear-map framework
  this concept's kernel and image are defined on.
- `math.abst.group-homomorphism` (already authored, EB-certified `math.abst` domain — genuine
  cross-link, corrected from the Blueprint's stale "none" claim, see Curriculum Feedback): supplies
  the directly parallel kernel/image structure for group homomorphisms — $\ker(\varphi)=
  \{g:\varphi(g)=e_H\}$ is always a normal subgroup, $\mathrm{im}(\varphi)$ is always a subgroup,
  and injectivity is likewise determined by a TRIVIAL kernel — the identical logical structure
  (linear maps preserving vector-space structure vs. homomorphisms preserving group structure)
  appearing in a completely different algebraic setting.
- `math.linalg.rank-nullity` (not yet authored, KG's declared related concept): the dimension
  theorem directly relating kernel and image dimensions.

## Cross-Subject Connections
- Data compression/signal processing: dimension-reducing linear maps (e.g. discarding a
  coordinate) as a concrete, intuitive source of non-injective maps with nontrivial kernels.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.kernel-image.md`, reused by reference
  for its $T(x,y)=(x+y,x+y)$ worked kernel/image computation, its exact-versus-spot-check
  injectivity contrast, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own data-compression probe (originally independence mode, now
  supplemented by the genuine cross-link to `math.abst.group-homomorphism` established here),
  applying the kernel/image framework to a dimension-discarding sensor map $T(x,y,z)=(x,y)$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint metadata found and corrected**: the Blueprint's own Component 7 states
  "cross_links: (none)" — the live KG lists `math.abst.group-homomorphism` as a cross-link, which
  the Blueprint's own validation checklist (V-5) never actually checked against this specific
  field (it verified only that "no cross_links declared" internally, without cross-referencing the
  live KG's `cross_links` array). Independently verified `math.abst.group-homomorphism` IS authored
  in the EDUCATIONAL-BRAIN corpus (EB-certified `math.abst` domain) — corrected here to a genuine
  cross-link, connecting the kernel/image structure to its exact group-theoretic parallel
  (kernel-is-always-normal-subgroup, image-is-always-subgroup, trivial-kernel-iff-injective).
- All other fields (requires `math.linalg.linear-map`, unlocks none, proficient/understand,
  mastery_threshold 0.9, estimated_hours 3) matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 170): authored. Second entry this batch. Companion batch concept:
  `math.linalg.basis`.

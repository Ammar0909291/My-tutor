# Blueprint: math.nt.residue-classes

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.residue-classes |
| name | Residue Classes |
| Domain | math.nt |
| Difficulty | proficient |
| Bloom level | analyze |
| Estimated hours | 5 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.nt.congruence |
| Cross-links | math.abst.quotient-ring |
| Unlocks | math.abst.quotient-ring |

## Component 1 — Learning Objective
The student defines the residue class [a]_n = {a+kn : k∈ℤ} as the set of all integers congruent to a modulo n; proves that exactly n distinct residue classes partition ℤ; verifies that addition and multiplication of classes ([a]+[b]=[a+b], [a]·[b]=[ab]) are well-defined (independent of representative choice); identifies the resulting ring ℤ/nℤ and recognises that it is a field when n is a prime; and traces the connection to the abstract notion of a quotient ring.

## Component 2 — CPA Entry Stage
**C — Concrete** (use a 12-hour clock: all times that "are" 3 o'clock — 3, 15, 27, 39, … hours from midnight — form the residue class [3]₁₂; adding "5 hours" to "3 o'clock" always gives "8 o'clock" regardless of which representative of [3] or [5] you start from)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | RESIDUE-CLASS-IS-JUST-THE-REMAINDER | Student treats [a]_n as a single number (the remainder when a is divided by n), not as the infinite set {…,a−n, a, a+n, a+2n,…} | Type 3 — language contamination ("residue" = "remainder" in everyday usage; the class notation [a]_n appears alongside the modular remainder operation a mod n; students collapse the set to its canonical element) |
| MC-2 | OPERATIONS-ON-CLASSES-NEED-A-CANONICAL-REPRESENTATIVE | Student insists you must reduce to the canonical representative (remainder in {0,…,n−1}) before computing [a]+[b] or [a]·[b]; doesn't recognize that ANY representative gives the same class result | Type 5 — instruction-induced (teachers present "compute mod n" as a procedure; the conceptual step — any representative works because all differ by a multiple of n — is elided; students conclude the algorithm requires the canonical choice) |
| MC-3 | Z-MOD-n-IS-ALWAYS-A-FIELD | Student concludes ℤ/nℤ is a field for all n≥2 because it is a ring; doesn't recognise that zero-divisors appear for composite n | Type 1 — overgeneralization (ℤ/pℤ for prime p is the first example taught, and it is a field; the prime condition is stated but students extend the "it's a field" conclusion to composite moduli without checking) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of residue classes modulo 5:**

| Representation | Content |
|---|---|
| Explicit sets | [0]₅={…,−10,−5,0,5,10,…}; [1]₅={…,−9,−4,1,6,11,…}; [2]₅,…,[4]₅ — five disjoint infinite sets covering all of ℤ |
| Coset notation | [a]₅ = a+5ℤ (translate the subgroup 5ℤ by a) |
| Partition of ℤ | ℤ = [0]₅ ∪ [1]₅ ∪ [2]₅ ∪ [3]₅ ∪ [4]₅ (disjoint, exhaustive — every integer is in exactly one class) |
| Arithmetic table | ℤ/5ℤ addition and multiplication tables on {[0],[1],[2],[3],[4]} |

**Well-definedness proof for addition:**
Claim: if a≡a′(mod n) and b≡b′(mod n), then a+b≡a′+b′(mod n).
Proof: a=a′+kn and b=b′+ln for some k,l∈ℤ. Then a+b=a′+b′+(k+l)n, so (a+b)−(a′+b′)=(k+l)n, which is divisible by n. ✓

**Well-definedness proof for multiplication:**
a+b=(a′+kn)+(b′+ln)=a′b′+a′ln+kna+kln²... more directly: ab−a′b′=ab−a′b+a′b−a′b′=b(a−a′)+a′(b−b′)=bkn+a′ln=(bk+a′l)n. So n|(ab−a′b′). ✓

**Why exactly n classes?** Representatives 0,1,…,n−1 are pairwise non-congruent (no two differ by a multiple of n within this range), and every integer is congruent to exactly one of them by the division algorithm. So there are exactly n classes.

**P49 checkpoint:**
- CORRECT → "[a]_n = a+nℤ is an infinite set. Exactly n classes partition ℤ. Addition and multiplication are well-defined on classes. ℤ/nℤ is a commutative ring." → A02
- PARTIAL (treats residue class as just the remainder number) → "The residue class [3]₅ is NOT just the number 3. It is the infinite set {…,−7,−2,3,8,13,18,…} — all integers that leave remainder 3 when divided by 5. The number 3 is just the canonical representative (smallest non-negative member). Any member of the class can represent it for arithmetic purposes." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "List five elements of [7]₁₂. Is 31 in [7]₁₂? Is −5?" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**When is ℤ/nℤ a field?**

**Zero divisors:** [a]·[b]=[0] with [a]≠[0] and [b]≠[0] means ab≡0(mod n) with n∤a and n∤b. Example in ℤ/6ℤ: [2]·[3]=[6]=[0], but [2]≠[0] and [3]≠[0]. So 2 and 3 are zero divisors mod 6.

**Why composite n produces zero divisors:** if n=pq with 1<p,q<n, then [p]≠[0] and [q]≠[0] but [p]·[q]=[pq]=[n]=[0]. So every composite modulus introduces zero divisors.

**Why prime p gives a field:** in ℤ/pℤ, if [a]·[b]=[0] then p|ab. Since p is prime, p|a or p|b, so [a]=[0] or [b]=[0]. No zero divisors → ℤ/pℤ is an integral domain. Since it's finite, it's a field (every non-zero element has a multiplicative inverse, given by Bézout since gcd(a,p)=1).

**Field/ring table:**
| n | ℤ/nℤ | Why |
|---|---|---|
| 2 | Field (𝔽₂) | p=2 prime |
| 3 | Field (𝔽₃) | p=3 prime |
| 4 | Ring, not field | 4=2²; [2]²=[0], zero divisor |
| 5 | Field (𝔽₅) | p=5 prime |
| 6 | Ring, not field | 6=2×3; [2]·[3]=[0] |
| 7 | Field (𝔽₇) | p=7 prime |

**Connection to quotient rings:** ℤ/nℤ = ℤ modulo the ideal nℤ = {kn : k∈ℤ}. This is the canonical example of a quotient ring construction (see math.abst.quotient-ring): the ideal nℤ is the kernel of the ring homomorphism ℤ→ℤ/nℤ, a↦[a]_n.

**P49 checkpoint:**
- CORRECT → "ℤ/nℤ is a field iff n is prime. Composite n produces zero divisors: [p]·[n/p]=[0]. Connection to quotient rings: ℤ/nℤ=ℤ/nℤ by the ideal nℤ." → A03
- PARTIAL (knows prime gives field, but can't identify zero divisors in composite case) → "In ℤ/6ℤ: try pairs that multiply to 0. [2]·[3]=6≡0(mod 6). Neither [2] nor [3] is [0]. These are zero divisors — elements that 'wipe out' other non-zero elements when multiplied. A field cannot have zero divisors; a ring can. Composite moduli always have zero divisors because the factors of n become zero divisors." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "In ℤ/8ℤ, compute [4]·[2]. Is either [4] or [2] equal to [0]? What does this tell you about ℤ/8ℤ?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Well-definedness gate:**

**Gate question (MC-2):** "To compute [7]₅+[11]₅, must you first reduce 7≡2 and 11≡1 (mod 5) and then add [2]+[1]=[3]? Or can you add the unreduced representatives directly?"

Both methods give the same answer. You can compute [7]+[11]=[18]=[3] (since 18≡3 mod 5) without reducing first. Or reduce first: [2]+[1]=[3]. The result is identical because well-definedness guarantees the class of the sum depends only on the classes of the addends, not on which representatives you chose. The canonical reduction is just convenient for recognition, not mathematically required.

**P49 checkpoint:**
- CORRECT → "Any representatives work. Well-definedness means the class of a+b (or ab) is the same regardless of which a and b you pick from their classes." → Gate (P91)
- PARTIAL → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Compute [13]₅·[17]₅ two ways: first by multiplying 13×17=221 and reducing mod 5; second by reducing 13≡3 and 17≡2 first, then multiplying [3]·[2]=[6]=[1]. Do you get the same class?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 RESIDUE-CLASS-IS-JUST-THE-REMAINDER):**
Step 1 — "The notation [a]_n represents an INFINITE SET of integers, not just the number a. Every element of the set {a, a±n, a±2n, …} is an equally valid 'name' for the class. Writing [3]₅ is the same as writing [8]₅ or [−2]₅ — they all name the same infinite set." Step 2 — "When we write ℤ/5ℤ={[0],[1],[2],[3],[4]}, these are 5 SETS, not 5 numbers. We pick 0,1,2,3,4 as canonical names (representatives), but [1] and [6] and [11] are the same object." Step 3 — "The distinction matters for proofs: to show an operation on ℤ/nℤ is well-defined, you must check that the result doesn't depend on WHICH representative of each class you pick."

**TB-R02 (MC-3 Z-MOD-n-IS-ALWAYS-A-FIELD):**
Step 1 — "A field requires every non-zero element to have a multiplicative inverse. In ℤ/6ℤ: does [2] have an inverse? If [2]·[k]=[1], then 2k≡1(mod 6), i.e., 2k=6m+1 for some m. But 2k is always even and 6m+1 is always odd — impossible. [2] has NO inverse in ℤ/6ℤ, so it's not a field." Step 2 — "The failure links to zero divisors: [2]·[3]=[0] means [2] and [3] 'cancel each other to zero' — exactly what fields prohibit." Step 3 — "Rule: ℤ/nℤ is a field ↔ n is prime. Composite n always provides zero divisors (the proper factors of n)."

**TB-R03 (MC-2 OPERATIONS-ON-CLASSES-NEED-CANONICAL-REPRESENTATIVE):**
Step 1 — "The well-definedness theorem says the result of [a]+[b] or [a]·[b] depends ONLY on the classes of a and b, not on which element of each class you choose as your representative." Step 2 — "Proof sketch for addition: if a and a′ both represent [a] (so a−a′=kn), then (a+b)−(a′+b)=kn, so a+b and a′+b represent the same class. You get [a+b]=[a′+b] regardless of which a you pick." Step 3 — "In practice, reducing to canonical representatives {0,…,n−1} is a convenience that keeps numbers small. It's never required. In theoretical proofs you often work with unreduced representatives because they're cleaner to manipulate."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. List all elements of [−3]₇ that lie between −20 and 20. Determine whether [−3]₇=[4]₇. Explain.
2. Prove that addition in ℤ/nℤ is associative: ([a]+[b])+[c]=[a]+([b]+[c]). (Trace through the well-definedness issue.)
3. Find all zero divisors in ℤ/12ℤ. What is the connection between zero divisors mod 12 and the factorisation of 12?
4. Let n=p be prime. Prove that every non-zero element [a] in ℤ/pℤ has a multiplicative inverse. (Hint: gcd(a,p) and Bézout.)

**P55 — Reflect & Consolidate:** "ℤ/nℤ has exactly n residue classes; each is an infinite set. Addition and multiplication are well-defined (class of result depends only on classes of inputs, not representatives). ℤ/nℤ is a ring always; a field iff n is prime. Quotient-ring structure: nℤ is an ideal, ℤ/nℤ=ℤ/(nℤ)."

**P76 — Transfer Probe (Cross-link mode: math.abst.quotient-ring):**
The construction ℤ/nℤ generalises to any ring R and ideal I: form the quotient ring R/I. (a) The map φ: ℤ→ℤ/nℤ defined by φ(a)=[a]_n is a ring homomorphism. Verify it preserves addition and multiplication. (b) What is the kernel of φ? Express it as a set. (c) In the quotient ℝ[x]/(x²+1) (polynomials modulo x²+1): what is [x²]? What is [x]²? What familiar structure does this quotient ring resemble? (d) Explain in one sentence how ℤ/nℤ and ℝ[x]/(x²+1) are both instances of the general quotient-ring construction.

**P55 — Reflect & Consolidate:** "Quotient ring R/I: cosets r+I as elements, operations (r+I)+(s+I)=(r+s)+I. For ℤ/nℤ: I=nℤ, cosets are the residue classes. For ℝ[x]/(x²+1): [x²]=[−1] (since x²+1≡0 mod x²+1, so x²≡−1), so [x]²=[−1], giving the algebra of complex numbers (setting [x]=i). Both are the same categorical construction: a ring modulo an ideal."

**P75 — Mastery Assessment:**
"(a) Prove that [a]_n=[b]_n if and only if n|(a−b). (b) In ℤ/15ℤ, compute [7]×[13] and [7]^4. (c) Is ℤ/15ℤ a field? Find a specific pair of zero divisors. (d) Define a ring homomorphism from ℤ/6ℤ to ℤ/3ℤ. Verify the homomorphism property for addition and multiplication. What is the kernel?"

**P55 — Reflect & Consolidate:** "Ring homomorphism ℤ/6ℤ→ℤ/3ℤ: [a]₆↦[a]₃. Well-defined since 6|a−b implies 3|a−b. Kernel = {[0]₆,[3]₆} = 3ℤ/6ℤ. This is the First Isomorphism Theorem in miniature: (ℤ/6ℤ)/kernel ≅ ℤ/3ℤ."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.residue-classes complete
- Score 3/5 → REVIEW well-definedness and the field/ring distinction; replay A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.congruence; reassign

**P78 — Completion:** Residue Classes certified. Student defines residue classes as infinite sets; proves exactly n classes partition ℤ; verifies well-definedness of arithmetic operations; identifies ℤ/nℤ as a ring and field iff n prime; traces the connection to the general quotient-ring construction.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.abst.quotient-ring])
Target: Quotient ring construction; ring homomorphism; kernel; First Isomorphism Theorem; polynomial rings modulo an ideal
Skill tested: Recognise ℤ/nℤ as an instance of the general quotient-ring; generalise to polynomial rings; identify kernel and apply FIT

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |

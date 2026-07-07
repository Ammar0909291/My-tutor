# Abstract Algebra

**Domain:** `math.abst`  
**Concepts:** 37  
**Status:** Draft  
**Generated:** 2026-07-05  
**KG Version:** 1.0.1  

---

## Table of Contents

1. [Algebraic Structure](#algebraic-structure)
2. [Binary Operation](#binary-operation)
3. [Group Theory](#group-theory)
4. [Group Operation](#group-operation)
5. [Subgroup](#subgroup)
6. [Cyclic Group](#cyclic-group)
7. [Group Order](#group-order)
8. [Coset](#coset)
9. [Lagrange's Theorem](#lagranges-theorem)
10. [Normal Subgroup](#normal-subgroup)
11. [Quotient Group](#quotient-group)
12. [Group Homomorphism](#group-homomorphism)
13. [Group Isomorphism](#group-isomorphism)
14. [First Isomorphism Theorem](#first-isomorphism-theorem)
15. [Second Isomorphism Theorem](#second-isomorphism-theorem)
16. [Group Action](#group-action)
17. [Burnside's Lemma](#burnsides-lemma)
18. [Sylow Theorems](#sylow-theorems)
19. [Symmetric Group](#symmetric-group)
20. [Alternating Group](#alternating-group)
21. [Ring Theory](#ring-theory)
22. [Ideal](#ideal)
23. [Quotient Ring](#quotient-ring)
24. [Prime and Maximal Ideals](#prime-and-maximal-ideals)
25. [Ring Homomorphism](#ring-homomorphism)
26. [Polynomial Ring](#polynomial-ring)
27. [Euclidean Domain](#euclidean-domain)
28. [Principal Ideal Domain (PID)](#principal-ideal-domain)
29. [Unique Factorization Domain (UFD)](#unique-factorization-domain)
30. [Field](#field)
31. [Field Extension](#field-extension)
32. [Algebraic Extension](#algebraic-extension)
33. [Finite Field](#finite-field)
34. [Galois Theory](#galois-theory)
35. [Galois Group](#galois-group)
36. [Galois Correspondence](#galois-correspondence)
37. [Group Inverse](#group-inverse)

---

## Algebraic Structure

**Concept ID:** `math.abst.algebraic-structure`  
**Difficulty:** foundational  
**Prerequisites:** `math.found.axiom`, `math.found.set-theory`

An algebraic structure is a set equipped with one or more binary operations satisfying specified axioms. The choice of axioms defines the type of structure: groups (one associative operation with identity and inverses), rings (two operations linked by distributivity), fields (two operations where both nonzero elements have inverses). Algebraic structures are the language of modern mathematics — they abstract away specific objects (numbers, matrices, functions) to study patterns of operation that appear across all of mathematics.

**Key Ideas:**
- A binary operation on a set S is a function S × S → S (the operation is closed on S). The axioms imposed determine the structure type.
- The study of algebraic structures proceeds by: defining the axioms → finding examples → proving theorems from axioms → classifying structures up to isomorphism.
- Universal algebra unifies groups, rings, modules, lattices, etc. under one framework; the specific axioms (associativity, commutativity, identity, inverses, distributivity) appear in combinations that define each structure.

**Common Misconceptions:**
- Misconception: An algebraic structure is just a set with an operation, with no further constraints. Correction: The axioms are essential — they define what kind of structure you have. Without axioms, any set with any operation is an arbitrary "magma" with no useful theory.
- Misconception: All algebraic structures have both addition and multiplication. Correction: Groups have only one operation; rings have two; fields have two with inverses for both. The number and type of operations varies by structure.

**Real-World Applications:**
- Symmetry groups in physics: the Standard Model of particle physics is built on Lie groups (algebraic structures with smooth structure); the axioms of the group encode conservation laws via Noether's theorem.
- Cryptographic protocols: RSA, elliptic curve cryptography, and lattice-based cryptography are all built on specific algebraic structures (rings, groups, modules) whose axioms guarantee the security properties needed.

---

## Binary Operation

**Concept ID:** `math.abst.binary-operation`  
**Difficulty:** foundational  
**Prerequisites:** `math.found.function-set-theoretic`

A binary operation on a set S is a function ★: S × S → S that takes any two elements of S and produces another element of S (closure). Binary operations are the building blocks of all algebraic structures. Key properties a binary operation may satisfy: associativity ((a★b)★c = a★(b★c)), commutativity (a★b = b★a), existence of identity (e★a = a★e = a), existence of inverses (for each a, there exists a' with a★a' = e).

**Key Ideas:**
- Closure is the defining property: ★ is a binary operation on S means a★b ∈ S for all a,b ∈ S. If the operation can produce elements outside S, it is not a binary operation on S.
- The four main additional properties — associativity, commutativity, identity, inverses — are independent; each additional property defines a richer structure (semigroup → monoid → group → abelian group).
- Table representation: a finite binary operation on {a,b,c,...} can be written as a Cayley table (multiplication table) with rows and columns indexed by elements.

**Common Misconceptions:**
- Misconception: Every binary operation is associative. Correction: Many important operations are not associative. Subtraction on Z: (5-3)-1=1 ≠ 5-(3-1)=3. Exponentiation: (2³)² = 64 ≠ 2^(3²) = 512. Group theory requires associativity, so these operations don't define groups.
- Misconception: A binary operation must be commutative. Correction: Many binary operations are not commutative. Matrix multiplication, function composition, and quaternion multiplication are all non-commutative. Commutativity is an extra axiom, not a consequence of being a binary operation.

**Real-World Applications:**
- Computer science: string concatenation is a non-commutative, associative binary operation on the set of strings; it forms a monoid (with the empty string as identity).
- Voting theory: social choice functions (combining individual preferences into a group preference) can be viewed as binary operations on preference orderings; Arrow's theorem concerns when these operations can satisfy rationality axioms.

---

## Group Theory

**Concept ID:** `math.abst.group-theory`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.binary-operation`

A group is a set G together with a binary operation · satisfying four axioms: (1) Closure: a·b ∈ G; (2) Associativity: (a·b)·c = a·(b·c); (3) Identity: ∃e ∈ G with e·a = a·e = a for all a; (4) Inverses: ∀a ∈ G, ∃a⁻¹ ∈ G with a·a⁻¹ = a⁻¹·a = e. Groups are the mathematical formalization of symmetry. Examples: (Z,+), (Q\{0},×), (GL_n(R),×), symmetry groups of geometric figures.

**Key Ideas:**
- The identity and each inverse are unique: if ea = a and fa = a for all a, then fe = e and ef = f, so f = fe = ef·(e identity) = e. Uniqueness follows from the axioms.
- A group may be finite (like Z_n or S_n) or infinite (like Z or GL_n(R)). The order |G| is the number of elements; it determines much of the group's structure.
- Abelian (commutative) groups where a·b = b·a for all a,b form a special well-understood subclass; non-abelian groups (like S_n for n≥3) are richer and less classified.

**Common Misconceptions:**
- Misconception: Every group operation is commutative. Correction: Groups need not be abelian. S_3 (permutations of 3 elements) satisfies all four group axioms but (12)(23) ≠ (23)(12). Non-abelian groups are the norm at higher levels of the theory.
- Misconception: The identity element is always 0 or 1. Correction: The identity element is the element e satisfying e·a = a·e = a; its name depends on the operation. For addition, it's 0; for multiplication, it's 1; for function composition, it's the identity function; for matrices, it's the identity matrix.

**Real-World Applications:**
- Crystallography: the 230 space groups classify all repeating crystal structures; each space group is a mathematical group describing the symmetries of a crystal lattice.
- Rubik's cube: the set of all possible Rubik's cube configurations forms a finite group of order ≈ 4.3 × 10^19 under the operation of move composition; group theory shows why certain configurations are reachable from others.

---

## Group Operation

**Concept ID:** `math.abst.group-operation`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.group-theory`  
**Cross-links:** `math.linalg.vector-addition`

The group operation is the binary operation that defines a group's structure. In additive notation (used for abelian groups), the operation is written a+b with identity 0 and inverse -a. In multiplicative notation, it is written ab with identity 1 and inverse a⁻¹. The same abstract group can be studied with either notation. Key operational properties: cancellation laws (if ab=ac then b=c; if ba=ca then b=c), the equation ax=b has unique solution x=a⁻¹b.

**Key Ideas:**
- Left and right cancellation: if ab=ac, multiply on the left by a⁻¹ to get b=c. This means no row or column of a Cayley table contains repeated elements — the group operation makes the table a Latin square.
- Equations in groups: ax=b has unique solution x=a⁻¹b; ya=b has unique solution y=ba⁻¹. In a non-abelian group, these are different (a⁻¹b ≠ ba⁻¹ in general).
- Connection to vector addition: the additive group (R^n, +) is an abelian group; its operation (vector addition) satisfies all group axioms. The group operation abstracts the essential properties of vector addition to settings beyond vectors.

**Common Misconceptions:**
- Misconception: The Cayley table of a group can have repeated elements in any row or column. Correction: Each element appears exactly once in each row and each column (Latin square property), because the equation ax=b has exactly one solution for each a,b. Repeated elements would mean the operation is not injective, violating invertibility.
- Misconception: Group operations are always computationally easy. Correction: Some group operations are computationally hard in specific representations. The discrete logarithm problem (given g and g^k in a group, find k) is believed to be computationally hard in cyclic groups of large order — this is the foundation of Diffie-Hellman key exchange.

**Real-World Applications:**
- Robotics: composition of rigid motions (rotation + translation) is the group operation on the special Euclidean group SE(3); robot motion planning uses group operations to compose transformations.
- Network protocols: Diffie-Hellman key exchange performs group operations (exponentiation in Z_p*) to establish shared secrets over an insecure channel.

---

## Subgroup

**Concept ID:** `math.abst.subgroup`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.group-theory`

A subgroup H of a group G is a non-empty subset H ⊆ G that is itself a group under the same operation as G. The subgroup criterion (one-step test): H is a subgroup iff H is non-empty and for all a,b ∈ H, ab⁻¹ ∈ H. Every group has at least two subgroups: {e} (trivial subgroup) and G itself; other subgroups are called proper non-trivial subgroups. Subgroups structure the group: Lagrange's theorem says every subgroup's order divides the group's order.

**Key Ideas:**
- The one-step subgroup test: H ≤ G iff (1) H ≠ ∅ and (2) ∀a,b ∈ H, ab⁻¹ ∈ H. This is more efficient than checking all four group axioms separately (closure, associativity — inherited from G, identity — take a=b to get e, inverses — take a=e).
- Generated subgroup: the subgroup generated by a subset S ⊆ G, written ⟨S⟩, is the smallest subgroup of G containing S — the intersection of all subgroups containing S. For a single element a, ⟨a⟩ = {aⁿ : n ∈ Z} is cyclic.
- The subgroup lattice of G (ordered by inclusion) captures the internal structure of G; its complexity grows with G's size and is studied via Sylow's theorems and composition series.

**Common Misconceptions:**
- Misconception: Every subset closed under the group operation is a subgroup. Correction: Closure alone is insufficient; you also need the identity and inverses to be in the subset. The set of positive integers under addition is closed but not a subgroup of (Z,+) — it lacks 0 and negatives.
- Misconception: Subgroups of abelian groups are always normal (true) but subgroups of non-abelian groups are also normal. Correction: Subgroups of abelian groups are always normal. In non-abelian groups like S_3, the subgroup ⟨(12)⟩ = {e,(12)} is NOT normal: (123)(12)(132) = (23) ∉ ⟨(12)⟩.

**Real-World Applications:**
- Molecular symmetry: the symmetry subgroups of molecules (point groups like C_2v, D_6h) are subgroups of O(3); the subgroup lattice of the molecular point group determines which vibrations are IR or Raman active.
- Music theory: the diatonic scale is a subgroup of Z_12 (the 12-tone pitch class group); the 7-element diatonic set generates a subgroup structure that explains harmonic relationships.

---

## Cyclic Group

**Concept ID:** `math.abst.cyclic-group`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.group-theory`

A cyclic group is a group G generated by a single element g: G = ⟨g⟩ = {gⁿ : n ∈ Z}. Cyclic groups are the simplest groups and are completely classified: every cyclic group is isomorphic to either Z (infinite cyclic) or Z_n (cyclic of order n). Every subgroup of a cyclic group is cyclic. The generator of Z_n is any element k with gcd(k,n)=1; there are φ(n) generators (Euler's totient function).

**Key Ideas:**
- A finite cyclic group Z_n = ⟨g⟩ of order n has exactly one subgroup for each divisor d of n: the unique subgroup of order d is ⟨g^{n/d}⟩. The number of subgroups equals the number of divisors of n.
- The order of g^k in Z_n is n/gcd(k,n). In particular, g^k generates Z_n iff gcd(k,n)=1 — there are φ(n) generators.
- Fundamental Theorem of Finite Abelian Groups: every finite abelian group is isomorphic to a direct product of cyclic groups of prime-power order. This completely classifies all finite abelian groups.

**Common Misconceptions:**
- Misconception: Every group of prime order is cyclic with a unique generator. Correction: Every group of prime order p is cyclic (since any non-identity element generates a subgroup of order dividing p, which must be p itself). BUT it has p-1 generators (all non-identity elements), not a "unique" one — there are many choices of generator.
- Misconception: Every subgroup of Z_n is of the form ⟨k⟩ for a SPECIFIC k. Correction: Every subgroup of Z_n is cyclic, generated by some element d|n. The subgroup ⟨d⟩ in Z_n = {0,d,2d,...,n-d} has order n/d. The number of distinct subgroups equals the number of divisors of n.

**Real-World Applications:**
- Clock arithmetic and modular systems: Z_n is the abstract group underlying all modular arithmetic; clock systems, ISBN check digits, and Caesar ciphers all use cyclic groups.
- Signal processing: the discrete Fourier transform (DFT) decomposes signals using the cyclic group structure of Z_N; the group structure explains why the DFT is periodic and why the FFT works.

---

## Group Order

**Concept ID:** `math.abst.group-order`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.group-theory`

The order of a group G, denoted |G|, is the number of elements in G (∞ if G is infinite). The order of an element a ∈ G, written ord(a) or |a|, is the smallest positive integer n with aⁿ = e; if no such n exists, ord(a) = ∞. By Lagrange's theorem, ord(a) divides |G| for any a in a finite group G. The order of an element characterizes its cycle structure: ⟨a⟩ is cyclic of order ord(a).

**Key Ideas:**
- Order divides group order: in a finite group, ord(a) | |G| for every a ∈ G (consequence of Lagrange's theorem: the cyclic subgroup ⟨a⟩ has order ord(a), and |⟨a⟩| divides |G|).
- Fermat-Euler corollary: in a group G of finite order n, aⁿ = e for all a ∈ G. This generalizes Fermat's little theorem (G = Z_p*: aᵖ⁻¹ = 1 for a not divisible by p).
- Order of a product: the order of ab is NOT simply determined by ord(a) and ord(b) in general. Example in S_3: ord((12))=2, ord((23))=2, but ord((12)(23))=ord((132))=3.

**Common Misconceptions:**
- Misconception: The order of a product ab equals lcm(ord(a), ord(b)). Correction: This formula holds for COMMUTING elements in abelian groups, but fails in general. In non-abelian groups, the order of a product can be anything; there is no simple formula.
- Misconception: If |G|=n and n is prime, G is automatically cyclic. Correction: This IS true (Lagrange implies every non-identity element has order p=|G|, so G is cyclic), but it is a theorem (not a definition) that requires proof via Lagrange's theorem.

**Real-World Applications:**
- Public-key cryptography: RSA uses Euler's theorem (which generalizes Fermat's little theorem via group orders) to prove that encryption and decryption are inverse operations in (Z/nZ)*.
- Quantum computing: Shor's algorithm for integer factorization works by finding the order of elements in Z_n* using quantum Fourier transform; the group order determines the algorithm's efficiency.

---

## Coset

**Concept ID:** `math.abst.coset`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.subgroup`

For a subgroup H of a group G and an element a ∈ G, the left coset aH = {ah : h ∈ H} and right coset Ha = {ha : h ∈ H}. Cosets partition G: any two left cosets are either equal or disjoint, and G = ⊔ aᵢH for representatives aᵢ from distinct cosets. All cosets have the same size |H| (they're bijections of H). The index [G:H] = |G|/|H| is the number of distinct left cosets (Lagrange's theorem).

**Key Ideas:**
- Coset equality criterion: aH = bH iff a⁻¹b ∈ H iff a and b are in the same left coset. This gives the equivalence relation: a ~ b iff a⁻¹b ∈ H, partitioning G into left H-cosets.
- All cosets of H have the same cardinality |H|: the map h ↦ ah is a bijection from H to aH. So G is partitioned into [G:H] = |G|/|H| cosets, each of size |H|.
- Left cosets ≠ right cosets in general (for non-normal H): aH may differ from Ha for some a. When aH = Ha for all a ∈ G, H is a normal subgroup.

**Common Misconceptions:**
- Misconception: Cosets are subgroups of G. Correction: The only coset of H that is a subgroup is H itself (= eH). Other cosets aH (a ∉ H) do not contain the identity, so they cannot be subgroups.
- Misconception: Left cosets and right cosets are always the same. Correction: Left and right cosets of H in G coincide for all a iff H is a normal subgroup of G. For non-normal H (e.g., H = ⟨(12)⟩ in S_3), the left and right cosets can differ: (123)H = {(123),(13)} while H(123) = {(123),(23)}.

**Real-World Applications:**
- Error-correcting codes: the cosets of a linear code C in F_q^n are exactly the sets of codewords that differ from C by a fixed error pattern; the coset leader is the most likely error, making coset decoding equivalent to maximum-likelihood decoding.
- Physics: in quantum field theory, the coset space G/H (set of left cosets) models the space of vacua in spontaneous symmetry breaking, where G is the full symmetry group and H is the unbroken subgroup.

---

## Lagrange's Theorem

**Concept ID:** `math.abst.lagrange-theorem`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.coset`

Lagrange's Theorem: if G is a finite group and H is a subgroup of G, then |H| divides |G| and [G:H] = |G|/|H|. Proof: cosets of H partition G into equal-sized pieces of size |H|, so |G| = [G:H] · |H|. Corollaries: (1) ord(a) divides |G| for every a ∈ G; (2) if |G| = p (prime), G is cyclic; (3) aᵍ = e for all a ∈ G (where g = |G|).

**Key Ideas:**
- Proof strategy: cosets of H partition G (proved by showing the equivalence relation a~b iff a⁻¹b∈H gives equal-sized equivalence classes of size |H|). Since |G| = (number of cosets) × |H|, we get |H| | |G|.
- The converse is FALSE: if d | |G|, G need not have a subgroup of order d. Example: A_4 (order 12) has no subgroup of order 6. Cauchy's theorem gives a partial converse: if p | |G| (prime), G has a subgroup of order p.
- Fermat's little theorem is a special case: G = (Z/pZ)*, |G| = p-1. For any a not divisible by p, aᵖ⁻¹ ≡ 1 (mod p).

**Common Misconceptions:**
- Misconception: Lagrange's theorem guarantees a subgroup for every divisor of |G|. Correction: Lagrange's theorem only says subgroup orders MUST divide |G|; it does NOT guarantee existence of a subgroup for each divisor. A_4 has order 12, but no subgroup of order 6 exists.
- Misconception: The theorem applies to infinite groups. Correction: Lagrange's theorem is specifically for finite groups. For infinite groups, the notion of |G|/|H| doesn't apply directly (though the index [G:H] can still be defined and is meaningful).

**Real-World Applications:**
- Cryptography: the RSA algorithm's correctness uses Euler's theorem, a direct generalization of Fermat's little theorem, which follows from Lagrange applied to (Z/nZ)*.
- Computer science: hashing algorithms based on modular arithmetic use Fermat's little theorem (Lagrange's corollary) to ensure hash functions are well-defined over prime moduli.

---

## Normal Subgroup

**Concept ID:** `math.abst.normal-subgroup`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.coset`

A subgroup N of G is normal (written N ◁ G) if gNg⁻¹ = N for all g ∈ G, equivalently gN = Ng for all g ∈ G (left and right cosets coincide). Normal subgroups are precisely the kernels of group homomorphisms and are the subgroups for which the quotient group G/N is well-defined. Every subgroup of an abelian group is normal; in non-abelian groups, normality must be checked.

**Key Ideas:**
- Three equivalent characterizations of N ◁ G: (a) gNg⁻¹ ⊆ N for all g ∈ G; (b) gNg⁻¹ = N for all g ∈ G; (c) gN = Ng for all g ∈ G. All are equivalent for finite groups.
- Index-2 subgroups are always normal: if [G:N] = 2, then N has exactly 2 left cosets {N, G\N} and 2 right cosets {N, G\N}, which are equal. So any subgroup of index 2 is normal.
- Normal subgroups are preserved under homomorphisms: if φ: G → H is a group homomorphism and N ◁ G, then φ(N) ◁ φ(G). The kernel is always normal.

**Common Misconceptions:**
- Misconception: Normality is symmetric: if N ◁ G then G ◁ N. Correction: Normality is a relation between a subgroup and a group, not symmetric. N ◁ G means N is normal IN G; this has no implication for whether G is normal in some larger group.
- Misconception: A subgroup normal in G must be normal in every subgroup of G. Correction: Normality is not transitive: N ◁ H and H ◁ G does NOT imply N ◁ G. Example: V_4 ◁ A_4 and A_4 ◁ S_4, but ⟨(12)(34)⟩ ◁ V_4 is NOT normal in S_4.

**Real-World Applications:**
- Particle physics: the standard model gauge group SU(3)×SU(2)×U(1) has normal subgroups corresponding to each force; the quotient groups represent the symmetry-breaking pattern that gives particles their masses.
- Computer science algorithms: normal subgroups of permutation groups are used in Sims's algorithm for computing with large permutation groups efficiently.

---

## Quotient Group

**Concept ID:** `math.abst.quotient-group`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.normal-subgroup`, `math.abst.coset`

A quotient group (factor group) G/N is formed from a group G and a normal subgroup N. Its elements are the left cosets {aN : a ∈ G}, with operation (aN)(bN) = (ab)N. Well-definedness requires N to be normal. The quotient map π: G → G/N, π(a) = aN is a surjective homomorphism with kernel N. The order |G/N| = |G|/|N| (Lagrange). Quotient groups formalize the idea of "collapsing" a subgroup to a single point.

**Key Ideas:**
- Normal subgroups are exactly those for which coset multiplication is well-defined: (aN)(bN) = (ab)N requires N to be normal so that left and right cosets coincide.
- The identity element of G/N is the coset N itself, and the inverse of aN is a⁻¹N.
- The order |G/N| = |G|/|N| by Lagrange's theorem; G/N 'collapses' G by identifying elements that differ only by a factor in N.

**Common Misconceptions:**
- Misconception: Any subgroup can be used to form a quotient group. Correction: Only normal subgroups yield a well-defined quotient group. For a non-normal subgroup H, coset multiplication depends on which representatives are chosen, making the operation ill-defined.
- Misconception: G/N is a subgroup of G. Correction: G/N is a group in its own right whose elements are cosets (subsets of G), not elements of G. There is a natural surjective homomorphism G → G/N but G/N is generally not a subgroup.

**Worked Example:** Constructing Z₆/{0,3}: The three cosets are {0,3}, {1,4}, {2,5}. Coset addition gives Z₆/{0,3} ≅ Z₃.

**Real-World Applications:**
- Modular arithmetic: Z/nZ is the quotient of integers by multiples of n, foundational to cryptography and number theory.
- Symmetry reduction: in crystallography, quotient groups describe how a crystal's full symmetry group reduces when imposing periodicity constraints.

---

## Group Homomorphism

**Concept ID:** `math.abst.group-homomorphism`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.group-theory`, `math.abst.normal-subgroup`  
**Cross-links:** `math.linalg.linear-map`

A group homomorphism φ: G → H preserves the group operation: φ(ab) = φ(a)φ(b). The kernel ker(φ) = {g ∈ G : φ(g) = e_H} is always a normal subgroup of G; the image im(φ) = φ(G) is a subgroup of H. The first isomorphism theorem: G/ker(φ) ≅ im(φ). Homomorphisms are the structure-preserving maps of group theory — analogous to linear maps in linear algebra.

**Key Ideas:**
- A homomorphism φ automatically sends identity to identity: φ(e_G) = e_H, and sends inverses to inverses: φ(g⁻¹) = φ(g)⁻¹.
- The kernel ker(φ) measures how far φ is from being injective: φ is injective iff ker(φ) = {e_G}.
- The first isomorphism theorem states G/ker(φ) ≅ im(φ), factoring any homomorphism into a quotient map followed by an isomorphism.

**Real-World Applications:**
- Parity checks in coding theory use the sign homomorphism concept: even/odd parity is a Z → Z₂ homomorphism.
- Quantum mechanics: unitary representations of symmetry groups are group homomorphisms from symmetry groups to matrix groups.

---

## Group Isomorphism

**Concept ID:** `math.abst.group-isomorphism`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.group-homomorphism`

A group isomorphism is a bijective homomorphism φ: G → H. When one exists, G and H are isomorphic (G ≅ H) — algebraically identical. Isomorphism invariants (preserved under any isomorphism): order, abelianness, number of elements of each order, simplicity. Cayley's theorem: every group G is isomorphic to a subgroup of S_{|G|}.

**Key Ideas:**
- Two groups are isomorphic iff there exists a bijective group homomorphism; the inverse of an isomorphism is also an isomorphism.
- Isomorphism invariants include order, abelianness, number of elements of each order, and simplicity. If groups differ on any invariant, they cannot be isomorphic.
- Cayley's theorem: every group G is isomorphic to a subgroup of S_{|G|} via the left-regular representation.

**Worked Example:** Z₄ ≇ Z₂×Z₂ because Z₄ has an element of order 4 while Z₂×Z₂ has only elements of order 1 or 2.

**Real-World Applications:**
- Crystallography: the 32 crystal point groups are classified up to isomorphism to 18 abstract groups, reducing 3D symmetry classification.
- Network theory: graph isomorphism (whether two graphs have the same structure) is the graph-theory analogue with major implications in complexity theory.

---

## First Isomorphism Theorem

**Concept ID:** `math.abst.first-isomorphism-theorem`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.quotient-group`, `math.abst.group-homomorphism`

The First Isomorphism Theorem: if φ: G → H is a group homomorphism, then G/ker(φ) ≅ im(φ). The isomorphism ψ: G/ker(φ) → im(φ) is given by ψ(aK) = φ(a) (K = ker φ). This is the central structural result linking homomorphisms, kernels, and quotient groups. Every homomorphism factors as G →π G/K →ψ im(φ) →ι H.

**Key Ideas:**
- The theorem factors every homomorphism into three maps: the surjection π: G → G/K, the isomorphism ψ: G/K → im(φ), and the inclusion ι: im(φ) ↪ H.
- Well-definedness of ψ is the key step: if aK = bK then a⁻¹b ∈ K = ker(φ), so φ(a) = φ(b).
- Two corollaries: if φ is surjective, G/ker(φ) ≅ H; if φ is injective, G ≅ im(φ).

**Worked Example:** The sign homomorphism φ: Sₙ → Z₂ has kernel Aₙ and image Z₂, giving Sₙ/Aₙ ≅ Z₂.

**Real-World Applications:**
- Signal processing: the discrete Fourier transform is a group isomorphism from (Zₙ,+) to the group of nth roots of unity.
- Algebraic topology: the first isomorphism theorem for abelianized fundamental groups underlies the Hurewicz theorem.

---

## Second Isomorphism Theorem

**Concept ID:** `math.abst.second-isomorphism-theorem`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.first-isomorphism-theorem`

The Second Isomorphism Theorem (Diamond Theorem): if H ≤ G and N ◁ G, then HN ≤ G, H∩N ◁ H, and H/(H∩N) ≅ HN/N. The name comes from the diamond-shaped subgroup lattice: G above, HN and H∩N as the outer vertices, H and N in the middle.

**Key Ideas:**
- HN = {hn : h ∈ H, n ∈ N} is a subgroup of G whenever N is normal.
- The isomorphism H/(H∩N) ≅ HN/N is induced by the restriction of the quotient map G → G/N to H.
- The theorem gives a formula analogous to |HN| = |H||N|/|H∩N| at the level of quotient groups.

**Real-World Applications:**
- Modular arithmetic: the second isomorphism theorem underlies the Chinese Remainder Theorem.
- Algebraic geometry: intersections and products of ideals use the ring-theoretic analogue.

---

## Group Action

**Concept ID:** `math.abst.group-action`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.group-theory`, `math.found.function-set-theoretic`

A group action of G on a set X is G × X → X, (g,x) ↦ g·x, with e·x = x and (gh)·x = g·(h·x). The orbit of x is Orb(x) = {g·x : g ∈ G}; the stabilizer is Stab(x) = {g ∈ G : g·x = x}. Orbit-Stabilizer Theorem: |Orb(x)| × |Stab(x)| = |G|. Orbits partition X.

**Key Ideas:**
- Orbits partition X: any two orbits are either equal or disjoint.
- Orbit-Stabilizer Theorem: |G| = |Orb(x)| · |Stab(x)|; Orb(x) bijects with the left cosets G/Stab(x).
- A group action is equivalent to a homomorphism G → Sym(X); faithful = injective, transitive = one orbit.

**Real-World Applications:**
- Molecular symmetry: the symmetry group of a molecule acts on atoms; orbits are equivalent atoms and Burnside counts colorings.
- Computer vision: SO(3) acts on 3D shapes; understanding orbits underpins 3D object recognition.

---

## Burnside's Lemma

**Concept ID:** `math.abst.burnside-lemma`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.group-action`

Burnside's Lemma: the number of distinct orbits of G acting on X equals (1/|G|) Σ_{g∈G} |Fix(g)|, where Fix(g) = {x ∈ X : g·x = x}. It converts counting orbits (distinct objects under symmetry) to counting fixed points.

**Key Ideas:**
- The lemma rewrites orbit count as an average: |G/X| = (1/|G|) Σ_g |Fix(g)|.
- The key identity |{(g,x): g·x=x}| = Σ_g |Fix(g)| = Σ_x |Stab(x)| connects both sides.
- Applied to necklaces: Fix(rotation by k) = k^{gcd(k,n)} colorings with n positions and k colors.

**Worked Example:** 2-colored bracelets with 4 beads: use D₄ (order 8) acting on 2⁴=16 colorings; compute |Fix(g)| for each of the 8 elements and divide the sum by 8.

**Real-World Applications:**
- Chemistry: counting distinct molecular structures uses Burnside with molecular symmetry groups.
- Graph theory: counting unlabeled graphs on n vertices uses Burnside with Sₙ acting on edge-colorings.

---

## Sylow Theorems

**Concept ID:** `math.abst.sylow-theorems`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.group-action`, `math.nt.prime-number`

The Sylow Theorems: let |G| = pⁿm with gcd(p,m)=1. Sylow I: G has a Sylow p-subgroup (order pⁿ). Sylow II: all Sylow p-subgroups are conjugate. Sylow III: their count nₚ satisfies nₚ ≡ 1 (mod p) and nₚ | m. If nₚ = 1, the unique Sylow p-subgroup is normal.

**Key Ideas:**
- Sylow I (existence): every finite group has a Sylow p-subgroup for each prime p dividing |G|.
- Sylow II (conjugacy): all Sylow p-subgroups are conjugate and hence isomorphic.
- Sylow III (count): nₚ ≡ 1 (mod p) and nₚ | m; nₚ = 1 ↔ Sylow p-subgroup is normal.

**Worked Example:** Groups of order 15: both Sylow 5-subgroup and Sylow 3-subgroup are unique and normal, giving G ≅ Z₁₅.

**Real-World Applications:**
- Galois theory: Sylow's theorems classify Galois groups of polynomial extensions.
- Particle physics: classification of Lie group subgroups uses Sylow-type analysis.

---

## Symmetric Group

**Concept ID:** `math.abst.symmetric-group`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.group-theory`

The symmetric group Sₙ consists of all bijections of {1,...,n} under composition, with order n!. Every permutation factors uniquely into disjoint cycles. The order of a permutation = LCM of cycle lengths. Conjugacy classes in Sₙ are determined by cycle type. Cayley's theorem: every group of order n embeds in Sₙ.

**Key Ideas:**
- Cycle notation: (a₁ a₂ ... aₖ) means a₁↦a₂↦...↦aₖ↦a₁. Every permutation is a unique product of disjoint cycles.
- Order of permutation with cycle type (c₁,...,cₖ) = LCM(c₁,...,cₖ).
- Conjugacy class of σ in Sₙ = all permutations with the same cycle type as σ.

**Real-World Applications:**
- Cryptography: discrete logarithms in cyclic groups have roots in symmetric group theory.
- Computational group theory: algorithms for large permutation groups manipulate elements via cycle notation.

---

## Alternating Group

**Concept ID:** `math.abst.alternating-group`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.symmetric-group`, `math.abst.normal-subgroup`

The alternating group Aₙ consists of all even permutations in Sₙ. Its order is n!/2. Aₙ is always normal in Sₙ (kernel of the sign homomorphism ε: Sₙ → {±1}). For n ≥ 5, Aₙ is simple. The simplicity of A₅ (order 60) was key to Galois's proof that the general quintic is not solvable by radicals.

**Key Ideas:**
- A permutation is even if expressible as a product of an even number of transpositions; Aₙ = ker(sign map).
- Aₙ is the unique normal subgroup of Sₙ of index 2 for n ≥ 5.
- Simplicity of Aₙ for n ≥ 5: any normal subgroup containing a 3-cycle must equal Aₙ.

**Worked Example:** A₄ is NOT simple: V₄ = {e,(12)(34),(13)(24),(14)(23)} is a normal subgroup of A₄ of order 4.

**Real-World Applications:**
- Galois theory: insolvability of the quintic follows from A₅ being simple and non-abelian.
- Topology: the fundamental group of the icosahedron's symmetry group is A₅.

---

## Ring Theory

**Concept ID:** `math.abst.ring-theory`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.group-theory`  
**Cross-links:** `math.linalg.matrix-multiplication`

A ring (R, +, ×) has (R,+) an abelian group, associative multiplication, and distributivity. Key subclasses: commutative rings, rings with unity, integral domains (no zero divisors), fields. The integers Z are the canonical example. Zero divisors: nonzero a,b with ab=0 prevent cancellation.

**Key Ideas:**
- Ring axioms: (R,+) abelian group; multiplication associative; distributivity from both sides. A ring need NOT have a multiplicative identity or be commutative.
- Zero divisors: if ab=0 with a,b≠0, then a,b are zero divisors. Integral domains have none.
- In any ring, a·0 = 0 (provable from axioms: a·0 = a·(0+0) = a·0+a·0, so a·0 = 0).

**Worked Example:** Z₆ is a commutative ring with unity but not an integral domain: 2×3 = 6 ≡ 0 shows 2 and 3 are zero divisors.

**Real-World Applications:**
- Computer arithmetic: floating-point numbers form a near-ring structure.
- Coding theory: cyclic codes are ideals in the polynomial ring Fq[x]/(xⁿ-1).

---

## Ideal

**Concept ID:** `math.abst.ideal`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.ring-theory`

An ideal I of a ring R is a non-empty additive subgroup that absorbs ring multiplication: ra ∈ I and ar ∈ I for all r ∈ R, a ∈ I. Ideals are the kernels of ring homomorphisms and the building blocks for quotient rings. The principal ideal ⟨a⟩ = {ra : r ∈ R} is the smallest ideal containing a.

**Key Ideas:**
- Ideal criteria: I is an additive subgroup; for all r ∈ R and a ∈ I: ra ∈ I and ar ∈ I.
- Principal ideal ⟨a⟩ = {ra : r ∈ R}; in Z, ⟨n⟩ = nZ (multiples of n).
- Ideals are exactly the kernels of ring homomorphisms.

**Worked Example:** In Z, ideals are nZ for n ≥ 0. The ideal ⟨6,10⟩ = ⟨GCD(6,10)⟩ = ⟨2⟩ = 2Z (even integers).

**Real-World Applications:**
- Cryptography: RSA relies on Z/nZ where n=pq; ideals of Z/nZ correspond to divisors of n.
- Algebraic geometry: the vanishing ideal I(V) encodes the geometry of the variety V.

---

## Quotient Ring

**Concept ID:** `math.abst.quotient-ring`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.ideal`

Given a ring R and an ideal I, the quotient ring R/I has cosets as elements with operations (r+I)+(s+I) = (r+s)+I and (r+I)(s+I) = (rs)+I. The quotient map π: R → R/I is a surjective ring homomorphism with kernel I. First Isomorphism Theorem for rings: R/ker(φ) ≅ im(φ).

**Key Ideas:**
- Well-definedness of multiplication requires I to be a two-sided ideal.
- R/I sets all elements of I equal to zero; R/I measures how elements differ modulo I.
- First Isomorphism Theorem: R/ker(φ) ≅ im(φ) as rings.

**Worked Example:** R[x]/⟨x²+1⟩ ≅ C: in the quotient, x² = -1, so elements a+bx correspond to complex numbers a+bi.

**Real-World Applications:**
- Finite fields: GF(pⁿ) = Fₚ[x]/⟨f(x)⟩ where f is irreducible of degree n.
- Computer algebra: Gröbner basis algorithms use quotient ring structure.

---

## Prime and Maximal Ideals

**Concept ID:** `math.abst.prime-ideal`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.ideal`

In a commutative ring R with unity: P is prime if P ≠ R and ab ∈ P implies a ∈ P or b ∈ P (equivalently, R/P is an integral domain). M is maximal if no proper ideal strictly contains M (equivalently, R/M is a field). Every maximal ideal is prime; the converse fails in general.

**Key Ideas:**
- Prime ideal ↔ R/P is an integral domain; maximal ideal ↔ R/M is a field.
- In Z, prime ideals are ⟨p⟩ for primes p (and ⟨0⟩); maximal ideals are ⟨p⟩.
- Every maximal ideal is prime (fields are integral domains).

**Worked Example:** In Z: 5Z is both prime and maximal (Z/5Z = Z₅ is a field); 6Z is neither (Z/6Z = Z₆ has zero divisors).

**Real-World Applications:**
- Algebraic geometry: prime ideals correspond to irreducible algebraic varieties; Spec(R) is foundational in modern geometry.
- Number theory: factorization via prime ideals works even when element factorization fails.

---

## Ring Homomorphism

**Concept ID:** `math.abst.ring-homomorphism`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.ring-theory`

A ring homomorphism φ: R → S satisfies φ(a+b) = φ(a)+φ(b) and φ(ab) = φ(a)φ(b). The kernel ker(φ) is an ideal of R; the image im(φ) is a subring of S. First Isomorphism Theorem: R/ker(φ) ≅ im(φ).

**Key Ideas:**
- φ preserves addition and multiplication; automatically φ(0) = 0 and φ(-a) = -φ(a).
- ker(φ) is an ideal; im(φ) is a subring (not necessarily an ideal).
- Ring homomorphisms are determined by where they send generators.

**Worked Example:** Evaluation at a: φ: R[x] → R, φ(f) = f(a). Kernel = ⟨x-a⟩. R[x]/⟨x-a⟩ ≅ R.

**Real-World Applications:**
- Error-correcting codes: linear codes are ring homomorphisms from message space to codeword space.
- Computer science type theory: numeric type coercions model ring homomorphisms.

---

## Polynomial Ring

**Concept ID:** `math.abst.polynomial-ring`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.ring-theory`  
**Cross-links:** `math.alg.polynomial`

The polynomial ring R[x] = {∑aᵢxⁱ : aᵢ ∈ R} inherits properties of R. If R is an integral domain, so is R[x]; if R = F is a field, F[x] is a Euclidean domain with a division algorithm. Every ideal of F[x] is principal. Irreducibility for degree 2-3: no roots in F ↔ irreducible.

**Key Ideas:**
- deg(fg) = deg(f)+deg(g) when R is an integral domain.
- Division algorithm for F[x]: f = qg+r with deg(r) < deg(g).
- Irreducibility of f ∈ F[x]: for degree 2 or 3, f is irreducible iff f has no roots in F.

**Worked Example:** In Q[x], divide x³+2x²-5x-6 by x-2 using polynomial long division: quotient x²+4x+3 = (x+1)(x+3), so f = (x-2)(x+1)(x+3).

**Real-World Applications:**
- Error-correcting codes: Reed-Solomon codes use polynomial rings over finite fields.
- Computer algebra: polynomial GCD algorithms are at the heart of symbolic computation.

---

## Euclidean Domain

**Concept ID:** `math.abst.euclidean-domain`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.polynomial-ring`  
**Cross-links:** `math.nt.euclidean-algorithm`

A Euclidean domain has a norm N: R\{0} → Z≥0 with a division algorithm: for any a,b (b≠0), ∃q,r with a=qb+r and r=0 or N(r)<N(b). Examples: Z (norm=|n|), F[x] (norm=degree), Z[i] (norm=a²+b²). Every Euclidean domain is a PID.

**Key Ideas:**
- The Euclidean algorithm gives GCDs; Bézout's identity: GCD(a,b) = xa+yb.
- Euclidean domain ⟹ PID ⟹ UFD.
- Proof that ED ⟹ PID: take the minimum-norm nonzero element of any ideal as its generator.

**Worked Example:** In Z[i], find GCD(11+7i, 3-2i) using the Euclidean algorithm with the norm N(a+bi) = a²+b².

**Real-World Applications:**
- Cryptography: Euclidean algorithm in Z and polynomial rings is the foundation of key exchange protocols.
- Number theory: Euclidean algorithm for Gaussian integers solves sums-of-two-squares problems.

---

## Principal Ideal Domain

**Concept ID:** `math.abst.pid`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.euclidean-domain`

A PID is an integral domain where every ideal is principal. In a PID: GCD(a,b) = generator of ⟨a⟩+⟨b⟩; Bézout's identity holds; every prime is maximal; every PID is a UFD.

**Key Ideas:**
- GCD of a,b in a PID: generator of ⟨a⟩+⟨b⟩ = ⟨d⟩ where d = GCD(a,b).
- In a PID, irreducible ↔ prime, and every prime ideal is maximal.
- Every PID is a UFD (ascending chain condition on principal ideals terminates).

**Worked Example:** ⟨6,10⟩ = ⟨2⟩ in Z (Bézout: 2 = (-1)×6+1×10). Every two-element generated ideal in a PID reduces to a principal ideal generated by the GCD.

**Real-World Applications:**
- Algebraic number theory: whether the ring of integers of a number field is a PID determines unique factorization.
- Coding theory: cyclic codes classified via generator polynomials using PID property of Fq[x].

---

## Unique Factorization Domain

**Concept ID:** `math.abst.ufd`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.pid`  
**Cross-links:** `math.nt.fundamental-theorem-arithmetic`

A UFD is an integral domain where every nonzero non-unit factors uniquely into irreducibles (up to order and units). Equivalently: irreducible ↔ prime, and the ACC on principal ideals holds. Examples: Z, F[x], Z[i], Z[x] (by Gauss's Lemma). Non-example: Z[√-5] (6 = 2×3 = (1+√-5)(1-√-5) are two distinct factorizations).

**Key Ideas:**
- In a UFD, irreducible ↔ prime (primality gives uniqueness).
- Gauss's Lemma: if R is a UFD, then R[x] is also a UFD.
- Failure in Z[√-5]: 6 has two essentially different factorizations into irreducibles.

**Real-World Applications:**
- Algebraic number theory: failure of UFD motivated introduction of ideals by Kummer/Dedekind.
- Cryptography: lattice-based cryptography relies on hard problems in polynomial rings where UFD structure is fundamental.

---

## Field

**Concept ID:** `math.abst.field`  
**Difficulty:** intermediate  
**Prerequisites:** `math.abst.ring-theory`, `math.abst.prime-ideal`  
**Cross-links:** `math.linalg.vector-space`

A field is a commutative ring with unity where every nonzero element has a multiplicative inverse. Every field is an integral domain. Examples: Q, R, C, Zₚ (prime p), GF(pⁿ). Every field has characteristic 0 or prime p. Every finite integral domain is a field.

**Key Ideas:**
- Field axioms: (F,+) abelian group; (F\{0},×) abelian group; distributivity holds.
- Characteristic: smallest n with n·1=0, always 0 or prime.
- Finite fields: for each prime power pⁿ, exactly one field GF(pⁿ) exists.

**Worked Example:** Zₚ is a field for prime p: for any nonzero a, gcd(a,p)=1, so Bézout gives ax+py=1 → ax≡1 (mod p), giving the multiplicative inverse.

**Real-World Applications:**
- Linear algebra: vector spaces are defined over fields; all linear-algebraic results depend on field axioms.
- Coding theory: almost all error-correcting codes are vector spaces over finite fields.

---

## Field Extension

**Concept ID:** `math.abst.field-extension`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.field`

A field extension L/K: L is a field containing K as a subfield. The degree [L:K] = dim_K(L). Tower Law: [L:K] = [L:F][F:K] for K ⊆ F ⊆ L. Algebraic vs. transcendental elements: α is algebraic over K if it satisfies a polynomial in K[x].

**Key Ideas:**
- Degree [L:K] = dim_K(L). Examples: [C:R]=2, [Q(√2):Q]=2, [R:Q]=∞.
- Tower Law: [L:K] = [L:F]·[F:K] — constrains which extensions are possible.
- Algebraic vs. transcendental: algebraic elements satisfy polynomials; e and π are transcendental over Q.

**Worked Example:** [Q(√2,√3):Q] = [Q(√2,√3):Q(√2)] × [Q(√2):Q] = 2 × 2 = 4. Basis: {1,√2,√3,√6}.

**Real-World Applications:**
- Ruler-and-compass constructions: constructible lengths have minimal polynomials of degree a power of 2 over Q.
- Error-correcting codes: field extensions GF(pⁿ)/GF(p) are the setting for BCH codes.

---

## Algebraic Extension

**Concept ID:** `math.abst.algebraic-extension`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.field-extension`

An algebraic extension L/K has every element of L algebraic over K. The minimal polynomial of α over K is the unique monic irreducible polynomial in K[x] vanishing at α. K(α) ≅ K[x]/⟨mₐ(x)⟩ with [K(α):K] = deg(mₐ). Every finite extension is algebraic.

**Key Ideas:**
- Minimal polynomial mₐ(x): monic, irreducible in K[x], vanishes at α, divides every polynomial in K[x] vanishing at α.
- K(α) ≅ K[x]/⟨mₐ⟩; elements are {f(α) : deg(f) < deg(mₐ)}.
- Algebraic closure K̄: the algebraically closed field containing K where all polynomials factor.

**Worked Example:** Minimal polynomial of √2+√3 over Q is x⁴-10x²+1 (degree 4, irreducible); [Q(√2+√3):Q]=4.

**Real-World Applications:**
- Galois theory: algebraic extensions are the setting for the entire theory of field extensions.
- Number theory: algebraic extensions of Q are called number fields; their rings of integers are studied via algebraic number theory.

---

## Finite Field

**Concept ID:** `math.abst.finite-field`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.field`, `math.nt.prime-number`

For each prime power pⁿ, there is exactly one finite field GF(pⁿ) (up to isomorphism), constructed as Fₚ[x]/⟨f(x)⟩ for irreducible f of degree n. The multiplicative group GF(pⁿ)* is cyclic of order pⁿ-1. The Frobenius automorphism x ↦ xᵖ generates Gal(GF(pⁿ)/Fₚ) ≅ Zₙ.

**Key Ideas:**
- Classification: exactly one field of order pⁿ for each prime power; no fields of non-prime-power order.
- GF(pⁿ)* is cyclic of order pⁿ-1; a generator is called a primitive element.
- Frobenius σ: x ↦ xᵖ has order n and generates the Galois group over Fₚ.

**Worked Example:** GF(4) = F₂[x]/⟨x²+x+1⟩ with elements {0,1,α,α+1} where α²=α+1; GF(4)* = {1,α,α+1} is cyclic of order 3.

**Real-World Applications:**
- Cryptography: elliptic curves over GF(p) and GF(2ⁿ) are the foundation of elliptic curve cryptography.
- Coding theory: Reed-Solomon codes are defined over GF(2ⁿ) or GF(p).

---

## Galois Theory

**Concept ID:** `math.abst.galois-theory`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.algebraic-extension`, `math.abst.group-theory`

Galois theory studies field extensions L/K via the Galois group Gal(L/K) = {field automorphisms of L fixing K}. A Galois extension is normal + separable. Fundamental Theorem: bijection between intermediate fields K ⊆ F ⊆ L and subgroups H ≤ Gal(L/K), reversing inclusions. [L:F] = |Gal(L/F)|.

**Key Ideas:**
- Gal(L/K): field automorphisms of L fixing K; |Gal(L/K)| = [L:K] for Galois extensions.
- Fundamental Theorem: F ↦ Gal(L/F) and H ↦ L^H are inverse order-reversing bijections.
- Normality characterization: F/K is Galois iff Gal(L/F) ◁ Gal(L/K).

**Worked Example:** Gal(Q(√2,√3)/Q) ≅ V₄ = {id,σ,τ,στ}; intermediate fields Q(√2), Q(√3), Q(√6) correspond to subgroups ⟨σ⟩, ⟨τ⟩, ⟨στ⟩.

**Real-World Applications:**
- Solvability by radicals: Galois proved the general quintic is not solvable because its Galois group S₅ is not solvable.
- Cryptography: Galois representations underpin the proof of Fermat's Last Theorem.

---

## Galois Group

**Concept ID:** `math.abst.galois-group`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.galois-theory`

The Galois group Gal(f) of a polynomial f ∈ K[x] is realized as a permutation group on the roots of f: Gal(f) ≤ Sₙ (n = deg(f)). For irreducible f: Gal(f) is transitive and n | |Gal(f)|. Discriminant criterion for cubics: Gal(f) ≤ A₃ iff disc(f) is a square in K.

**Key Ideas:**
- Gal(f) permutes the roots; any σ ∈ Gal(L/K) is determined by its action on the roots.
- For irreducible f of degree n: Gal(f) is transitive and n | |Gal(f)|.
- Discriminant: disc(f) = ∏_{i<j}(αᵢ-αⱼ)²; for cubics, Gal(f) ≤ A₃ iff disc is a square.

**Worked Example:** Gal(x³-2) = S₃ (order 6): splitting field Q(∛2,ω) has degree 6 over Q, so |Gal| = 6 and Gal = S₃.

**Real-World Applications:**
- Solvability: Galois group determines solvability by radicals (solvable group ↔ solvable polynomial).
- Elliptic curve cryptography: Galois group of torsion polynomial relates to cryptographic security.

---

## Galois Correspondence

**Concept ID:** `math.abst.galois-correspondence`  
**Difficulty:** advanced  
**Prerequisites:** `math.abst.galois-group`

The Galois correspondence is the order-reversing bijection F ↔ H = Gal(L/F) between intermediate fields and subgroups of the Galois group. Larger field ↔ smaller subgroup. Degree formula: [L:F] = |H| and [F:K] = [G:H]. F/K is Galois iff H ◁ G.

**Key Ideas:**
- Order-reversing: F₁⊆F₂ implies Gal(L/F₁)⊇Gal(L/F₂).
- Degree formula: [L:F] = |Gal(L/F)| and [F:K] = [G:Gal(L/F)].
- F/K Galois iff Gal(L/F) ◁ G; then Gal(F/K) ≅ G/Gal(L/F).

**Worked Example:** For Q(ζ₈)/Q with G ≅ V₄: 5 subgroups ↔ 5 intermediate fields including Q(√2), Q(i), Q(√-2).

**Real-World Applications:**
- Classical construction impossibilities: no ruler-and-compass construction for trisection because required extensions don't correspond to index-2 subgroup chains.
- Class field theory: generalizes Galois correspondence to infinite abelian extensions.

---

## Group Inverse

**Concept ID:** `math.abst.group-inverse`  
**Difficulty:** foundational  
**Prerequisites:** `math.abst.group-theory`  
**Cross-links:** `math.linalg.matrix-inverse`

The inverse of a ∈ G is the unique a⁻¹ with a·a⁻¹ = a⁻¹·a = e. Key properties: the inverse is unique; (ab)⁻¹ = b⁻¹a⁻¹ (socks-shoes law); (a⁻¹)⁻¹ = a; ord(a) = ord(a⁻¹). In a finite group of order n, a⁻¹ = aⁿ⁻¹.

**Key Ideas:**
- Uniqueness: if ab=e and ac=e then b=c (multiply on left by a⁻¹... but we can prove without assuming uniqueness first: b=eb=(ca)b=c(ab)=ce=c).
- Socks-shoes law: (ab)⁻¹ = b⁻¹a⁻¹ (proven by showing (ab)(b⁻¹a⁻¹) = e).
- In a finite group: a⁻¹ = aⁿ⁻¹ since aⁿ = e.

**Worked Example:** Three settings: in Z₁₂, inverse of 7 is 5 (since 7+5=12≡0); in S₅, inverse of (123)(45) is (132)(45); in GL₂(R), A=[[3,1],[5,2]] has A⁻¹=[[2,-1],[-5,3]] (det=1).

**Real-World Applications:**
- Cryptography: discrete logarithm (computing inverse in cyclic groups) is computationally hard — foundation of Diffie-Hellman and elliptic curve cryptography.
- Robotics and 3D graphics: inverse of a rotation matrix (in SO(3)) gives the undo transformation; socks-shoes law governs composed rotations.

---

*Generated by the Canonical Curriculum Production Pipeline v2 · Mathematics KG v1.0.1 · 2026-07-05*

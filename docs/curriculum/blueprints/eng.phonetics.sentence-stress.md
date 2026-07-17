# Teaching Blueprint — eng.phonetics.sentence-stress

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.phonetics.sentence-stress
name: Sentence Stress
domain: english / phonetics
difficulty:
  label: proficient
  number: 3
bloom: apply
prerequisites:
  - eng.phonetics.syllable-stress
mastery_threshold: 0.75
estimated_hours: 2
cross_links: []
session_cap: 5 TAs
cpa_entry_stage: C (english/phonetics domain → concrete/auditory entry always)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-EVERY-WORD-GETS-EQUAL-STRESS
- **Trigger signal:** Student reads sentences with roughly equal emphasis on every word (a common pattern in careful, word-by-word reading or early L2 production), producing unnaturally flat or robotic-sounding speech, rather than emphasizing content words and reducing function words.
- **Conflict evidence [P28]:** "Say this sentence giving every word completely equal emphasis: 'I WANT TO GO TO THE STORE.' Now listen to a natural speaker say the same sentence. Are all the words equally loud/clear, or do some stand out more?"
- **Bridge text [P30]:** "Natural English sentences are NOT evenly stressed — content words (nouns, main verbs, adjectives, adverbs — the words carrying the core meaning) get stress, while function words (articles, prepositions, auxiliary verbs, pronouns — the grammatical 'glue') are typically unstressed and often reduced (e.g., 'to' becomes /tə/, 'the' becomes /ðə/)."
- **Replacement text [P31]:** "Before speaking a sentence, identify which words are CONTENT words (stress these) and which are FUNCTION words (reduce these) — don't give every word the same weight."
- **Discrimination pairs [P33]:**
  - "I WANT to go to the STORE" (content words WANT, STORE stressed; function words to/to/the reduced) vs. flat equal-stress reading.
  - "She's READING a BOOK" (content: READING, BOOK) vs. over-stressing "she's" and "a," which are function-word-like here.
- **s6_path:** "Equal stress on every word can feel like it's being extra clear and careful — but natural English actually relies on this uneven pattern, and flattening it out is what makes speech sound unnatural or overly formal, even when every word is pronounced correctly."

### MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD
- **Trigger signal:** Student assumes a given word is ALWAYS either stressed or unstressed regardless of context/meaning, missing that (a) the same word can shift category depending on grammatical role (e.g., "can" as a modal auxiliary is usually unstressed, but "can" as a noun, "get me a CAN," is a content word and gets stressed), and (b) speakers can deliberately stress a normally-unstressed function word for emphasis or contrast (e.g., "I did NOT say that" — stressing the auxiliary "did" for contrastive emphasis).
- **Conflict evidence [P28]:** "You said 'can' is always unstressed. Say 'I CAN swim' (a simple statement) — is 'can' stressed there? Now say 'Yes, I CAN do it!' as a strong, emphatic reply to someone who doubted you — is it stressed there?"
- **Bridge text [P30]:** "The content/function classification is a strong DEFAULT pattern, not a fixed, unchangeable label per word — a word's grammatical role (is 'can' being used as a helping verb or a noun for a container?) and the speaker's communicative intent (emphasizing or contrasting something) can both shift which words get stressed in a specific sentence."
- **Replacement text [P31]:** "Use the content/function default as a strong starting guess, but always check the word's actual grammatical role in this specific sentence and whether the speaker seems to be adding emphasis or contrast."
- **Discrimination pairs [P33]:**
  - "I CAN swim" (default: 'can' as auxiliary, usually reduced) vs. "Yes, I CAN!" (emphatic reinforcement, 'can' stressed for contrast/emphasis).
  - "put it ON the table" (default: 'on' as preposition, usually unstressed) vs. "Turn it ON, not off" (contrastive stress on 'on' to highlight the on/off distinction).
- **s6_path:** "It's a reasonable simplification to think each word has one fixed stress status — but real speakers use stress flexibly for emphasis and contrast, which is actually a powerful communicative tool once you notice it, not an exception that breaks the rule."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Word stress readiness**
Prompt: "Say 'record' as a noun, then as a verb. Where's the stress in each?"
- Pass: correctly produces the noun/verb stress shift (per `eng.phonetics.syllable-stress`).
- Fail → [P52]: brief syllable-stress refresher before proceeding. Persistent failure → route to eng.phonetics.syllable-stress for reteaching.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The stress-beat sentence walk**

> Write a simple sentence on cards, one word per card, laid out in a row (e.g., "I want to go to the store"). Walk along the row, stepping HARD (stomping) on content-word cards and stepping LIGHTLY (a quick tiptoe) on function-word cards, saying each word as you step. This anchors the uneven rhythm of sentence stress as a physical, walkable beat pattern — English is often described as "stress-timed," with roughly equal time between stressed beats regardless of how many unstressed words fall between them.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Content vs. Function Word Identification [C]**

Present simple sentences; student labels each word as content (noun, main verb, adjective, adverb) or function (article, preposition, auxiliary, pronoun, conjunction).

**TA-2 — Producing the Stress Pattern [C]**

Using the Component 3 walk technique, student says sentences aloud, correctly stressing content words and reducing function words (including using schwa reductions for common function words: "to" → /tə/, "and" → /ən/, "of" → /əv/).

**TA-3 — Equal-Stress vs. Natural-Stress Contrast [C→P]**

Student says a sentence both ways — flat/equal stress, then natural content/function stress — and identifies which sounds like natural spoken English, directly targeting MC-EVERY-WORD-GETS-EQUAL-STRESS.

**TA-4 — Contextual Stress Shift (Grammatical Role) [P]**

Present the same word used in two different grammatical roles within different sentences (e.g., "can" as auxiliary vs. noun; "record" as verb vs. noun); student identifies the correct stress pattern for each context.

**TA-5 — Contrastive/Emphatic Stress [P]**

Present sentence pairs where a normally-unstressed function word receives emphatic stress for contrast (e.g., "I said I WOULD go, not that I DID go"); student produces and explains the emphatic stress shift, directly targeting MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — content/function identification)**

> "In the sentence 'She is reading a book,' which words are content words?"

Target response: "reading" and "book" (content); "she," "is," "a" (function).

**WE-2 (Foundational — producing the pattern)**

> "Say 'I want to go to the store' with natural sentence stress."

Target response: stresses "WANT" and "STORE," reduces "to," "to," "the" (e.g., "I WANT tuh go tuh thuh STORE").

**WE-3 (Intermediate — contextual shift)**

> "Say 'I can swim' as a plain statement. Now say it as a strong reply to someone who said you couldn't."

Target response: plain statement reduces "can" (/kən/); emphatic reply stresses "CAN" for contrast.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Content/function identification, novel sentence**
"In 'The dog chased the ball quickly,' which words are content words?"
*Target:* "dog," "chased," "ball," "quickly" (content); "the," "the" (function).

**MP-2 [P36] — Producing the pattern, novel sentence**
"Say 'He is going to the market' with natural sentence stress."
*Target:* stresses "GOing" and "MARket," reduces "he," "is," "to," "the."

**MP-3 [P36] — Equal vs. natural stress judgment**
"Listen to two versions of the same sentence — one flat, one naturally stressed. Which sounds more natural, and why?"
*Target:* correctly identifies the naturally-stressed version and explains the content/function distinction as the reason.

**MP-4 [P36] — Contextual stress shift, novel example**
"Say 'I object to that' (verb). Now say 'that's quite an object' (noun). What changes?"
*Target:* correctly shifts stress for the grammatical-role change (though note: "object" here is primarily a word-stress example; ensure content-word status is still correctly assigned as a full content word in both uses at the sentence level, with the internal syllable stress shifting per `eng.phonetics.syllable-stress`).

**MP-5 [P36] — Explain sentence stress**
"In your own words: how do you decide which words to stress in a sentence, and can that ever change?"
*Target:* states or demonstrates the content/function default, and correctly notes that grammatical role and speaker emphasis/contrast can shift which words receive stress.

---

## Component 7 — Session Architecture

```
[P01] Session open — stress-beat sentence walk warm-up
  ↓
[P41] PD-1 (word stress readiness)
  ↓ PASS
[P06] Anchor: stress-beat sentence walk (stomp on content, tiptoe on function)
  ↓
TA-1: Content vs. function word identification [C]
  ↓
TA-2: Producing the stress pattern [C]
  ↓
TA-3: Equal-stress vs. natural-stress contrast [C→P]
  ↓
[P28] Conflict: flat equal-stress speech → MC-EVERY-WORD-GETS-EQUAL-STRESS (if triggered)
  ↓
TA-4: Contextual stress shift (grammatical role) [P]
  ↓
TA-5: Contrastive/emphatic stress [P]
  ↓
[P28] Conflict: rigid fixed-word-category assumption → MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD (if triggered)
  ↓
[P51] Check-in WE-1 → WE-2 → WE-3
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Tomorrow, say one sentence with natural stress and identify the content words."
[P68] Session close
[P85] Regulation tail — praise natural rhythm over word-by-word equal emphasis
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 75%; re-route to Component 3 anchor if below
```

**Protocol routing:** S0 (secure on word stress, new to sentence-level stress): dwell on TA-1's content/function labeling with simple, short sentences before producing the pattern aloud. S1 (already speaks with natural rhythm but can't yet explain why): use TA-1's explicit labeling to build metalinguistic awareness of an already-present skill. S6 (frustrated that careful/formal speech habits are being "corrected"): validate that word-by-word equal stress isn't wrong, just unnatural for conversational speech — context-appropriate register matters. S9 (L1 is syllable-timed rather than stress-timed, e.g. Spanish, French, Mandarin, or has different content/function stress conventions): expect this concept to require substantially more deliberate practice than for stress-timed-L1 speakers, since equal-interval syllable timing may be the learner's default unmarked pattern; use the physical walk-anchor extensively and be patient with the adjustment.

---

## Component 8 — Adaptive Flags

- **Content/function is the essential organizing default**: this is the single most important pattern to establish first (TA-1/TA-2) before any of the contextual nuance (TA-4/TA-5) is introduced.
- **Function-word reduction (schwa) should be explicitly taught, not left implicit**: reducing "to," "and," "the," "of," "a" to their weak schwa forms is a concrete, teachable sub-skill within this concept, directly connected to the schwa-recognition work from `eng.phonetics.syllable-stress`.
- **Grammatical-role and emphatic shifts are real, not exceptions to suppress**: teach these explicitly as legitimate, rule-governed flexibility within the content/function system (TA-4/TA-5), not as noise that undermines the default pattern.
- **Syllable-timed L1 background requires patience and extra practice**: for S9 learners whose L1 rhythm is fundamentally different (syllable-timed vs. English's stress-timed pattern), budget significantly more repetition and treat slow progress as expected, not a sign of difficulty with the underlying concept.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — eng.phonetics.sentence-stress |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — eng.phonetics.syllable-stress ✓ (authored) |
| V-3 | difficulty label matches KG | PASS — proficient |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.75 |
| V-6 | estimated_hours matches KG | PASS — 2h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-EVERY-WORD-GETS-EQUAL-STRESS, MC-CONTENT-FUNCTION-SPLIT-IS-FIXED-PER-WORD |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (word stress readiness) |
| V-10 | Concrete anchor present [P06] | PASS — stress-beat sentence walk |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 5 TAs |
| V-16 | cpa_entry_stage correctly set | PASS — C (english/phonetics domain always concrete/auditory) |
| V-17 | Student-state routing covers plausible states | PASS — S0, S1, S6, S9 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — content/function default, schwa-reduction teaching, contextual-shift legitimacy, syllable-timed-L1 patience |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |

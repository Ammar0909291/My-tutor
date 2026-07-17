# Teaching Blueprint: Etymology

## Component 0 — Concept Identity & Routing

```yaml
concept_id: eng.vocab.etymology
name: Etymology
domain: english/vocabulary
difficulty:
  label: advanced
  numeric: 4
bloom: analyze
prerequisites:
  - eng.vocab.roots-and-origins
mastery_threshold: 0.75
estimated_hours: 3
cross_links:
  - eng.vocab.semantic-fields
  - eng.linguistics.historical-linguistics-intro
session_cap: 5
cpa_entry_stage: concrete/visual
status: draft
```

## Component 1 — Misconception Register

### MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY
- **Trigger signal:** Student treats a word's historical/etymological meaning as the "real" or authoritative meaning that should override its actual current usage — insisting, for example, that "decimate" must only ever mean "to kill exactly one in ten" (its Latin military origin) and that using it to mean "to destroy a large part of" is simply wrong, rather than recognizing that word meanings legitimately change over centuries and current usage is what a word actually means today.
- **Conflict evidence [P28]:** Present "nice" (from Latin "nescius," meaning "ignorant" — its original English sense in the 1300s was closer to "foolish" or "silly") and ask the student what "nice" means today. Confirm no living English speaker uses "nice" to mean "ignorant," and that insisting on the etymological meaning would make the student impossible to understand in ordinary conversation.
- **Bridge text [P30]:** "A word's history explains WHERE it came from and is fascinating to trace, but it doesn't get a vote on what the word means today. Language changes constantly — 'nice' has drifted enormously from 'ignorant' to its modern warm, pleasant sense, and that drifted modern meaning is the real, correct meaning now. Etymology is a history lesson, not a rulebook for current usage."
- **Replacement text [P31]:** "Enjoy etymology as the story of how a word got here — but when you need to know what a word actually means today, check current usage and dictionaries, not the historical origin. The oldest meaning is rarely the 'true' one; it's just the first stop on a long journey."
- **Discrimination pairs [P33]:** (a) Etymological-meaning-as-authority (a word's original historical meaning is its true, correct meaning, and current usage that differs is an error) vs. (b) Etymology-as-history-not-authority (a word's history explains its origin and is intrinsically interesting, but current usage — however much it has drifted — is what the word actually means today).
- **s6_path:** If detected, drop to PD-1 re-check, then re-present the Concrete Anchor's river-journey framing before continuing to TA-2.

### MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING
- **Trigger signal:** Student assumes every English word traces back cleanly to one single ancestor language (usually defaulting to "it's just Old English" or "it's just Latin") and resists the idea that English has extensively borrowed and blended vocabulary from many languages throughout its history, sometimes even within a single word's journey (a Latin root arriving in English via French, for instance, rather than directly).
- **Conflict evidence [P28]:** Present "restaurant" (borrowed directly from French, itself from a French verb meaning "to restore," referring originally to a restorative broth/soup) and "khaki" (borrowed from Urdu/Hindi, meaning "dust-colored," entering English through British colonial contact in India) side by side with "house" (a native Old English word with no borrowing at all). Ask the student whether all three words "just come from English" the same way.
- **Bridge text [P30]:** "English is famous for being a huge borrower — over the centuries it has taken in enormous numbers of words from French, Latin, Greek, and dozens of other languages through trade, conquest, and contact, sometimes with a word passing through two or three languages before landing in English. Not every word has a single simple origin story; many have a genuinely international journey."
- **Replacement text [P31]:** "Don't assume a word's origin is simple or single-language just because it's used in English now. Check its actual documented history — many English words were borrowed from French, Latin, Greek, or other languages, and some passed through multiple languages before arriving in English."
- **Discrimination pairs [P33]:** (a) Single-origin assumption (every English word has one simple, direct ancestor language) vs. (b) Borrowing-and-contact recognition (English vocabulary is substantially built from historical borrowing across many languages, sometimes via multi-step paths through more than one intermediate language).
- **s6_path:** If detected, drop to PD-1, then re-present the Concrete Anchor's world-map borrowing trail before continuing to TA-3.

## Component 2 — Prerequisite Diagnostic Block

### PD-1: Roots-and-Origins Readiness
- **Tests:** Can the student already identify common Greek/Latin roots and their contribution to word meaning — the foundational skill etymology extends into full historical word-journey tracing?
- **Probe:** Ask the student to identify the root and its meaning in 2 words (e.g., "telephone," "biology") and briefly state what they already know about where these roots come from.
- **Pass condition:** Correctly identifies both roots and their core meanings.
- **Fail routing:** If root identification fails, route to `eng.vocab.roots-and-origins` review — etymology requires the same root-identification skill, extended across a word's full historical timeline and cross-language journey.

## Component 3 — Concrete Anchor [P06]

**"The Word River Journey."** Draw or present a physical winding river with labeled "tributary" points where a word picked up material or meaning changes from different language sources along its path (e.g., for "restaurant": Latin source → Old French verb "restaurer" → Modern French noun "restaurant" → borrowed into English). At the river's mouth (today), show the CURRENT meaning as what actually matters for everyday use, while the whole winding path behind it is the fascinating but non-authoritative history — directly seeding MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY's fix (the river's source doesn't control where the water ends up; only the mouth is where you drink from today). Then show a second river with THREE tributaries merging from different starting countries (representing a multi-language borrowing path) to seed MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING's fix — many English word-rivers have more than one, and more than one country's, source.

## Component 4 — Conceptual Development Sequence

### TA-1: Tracing a Simple Word History
Present 3 words with well-documented straightforward etymologies (e.g., "salary" from Latin "salarium," originally payment for salt) and have the student trace the word's journey from origin to current meaning using the river-journey diagram structure.

### TA-2: Meaning Drift Over Time
Using the discrimination pairs from MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY, present word pairs showing dramatic semantic drift ("nice": ignorant→pleasant; "awful": full of awe/inspiring awe→terrible; "silly": blessed/happy→foolish) and have the student confirm the CURRENT meaning is what matters for communication today, while the drift itself is a historically interesting fact.

### TA-3: Borrowing and Multi-Language Journeys
Using the discrimination pairs from MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING, present 3 words with documented multi-language borrowing paths (restaurant: Latin→French→English; algebra: Arabic→Latin→English; tea: Chinese (Min Nan "te")→Dutch→English) and have the student trace each full path, confirming English vocabulary is substantially built from cross-language contact.

### TA-4: Using Etymology as a Meaning Clue (With Appropriate Caution)
Reinforce the productive use of etymology (as a starting-point clue for unfamiliar words, echoing `eng.vocab.roots-and-origins`) while explicitly flagging when NOT to over-rely on it (when current usage has drifted significantly, per TA-2). Student practices using etymology as a helpful-but-checked tool on 3 new words.

### TA-5: Researching an Original Word History
Student selects one word of personal interest and researches (using provided reference material) its etymology, tracing its origin language(s), any borrowing path, and any meaning drift from origin to current usage — presenting a brief original etymology summary — the generative capstone.

## Component 5 — Worked Examples

### WE-1: Simple Word History Trace (Scaffolded)
**Word:** "salary" — from Latin "salarium" (payment enabling Roman soldiers to buy salt) → Old French "salaire" → Middle English "salarie" → Modern English "salary" (regular payment for work, no connection to salt in current meaning).
**Walkthrough:** Trace the river path, noting the meaning has narrowed from "salt-payment" specifically to "any regular pay," while confirming the modern meaning, not the salt-origin, is what "salary" actually means today.

### WE-2: Meaning Drift Confirmation (Guided)
**Word:** "awful" — originally "awe-full," meaning inspiring awe/wonder (a positive or reverent sense, as in "an awful and majestic mountain") → today means "terrible, very bad."
**Walkthrough:** Confirm that using "awful" to mean "inspiring reverent awe" today would be misunderstood by virtually all modern speakers — the drifted, current negative meaning is the real, functioning meaning of the word now, not a corruption of some "truer" original sense.

### WE-3: Multi-Language Borrowing Trace (Independent)
**Word:** "algebra" — from Arabic "al-jabr" (meaning "the reunion of broken parts," from a mathematical treatise title) → borrowed into Medieval Latin → entered English via Latin/Italian mathematical texts.
**Walkthrough:** Student traces the full path (Arabic → Latin → English), identifying this as a genuine multi-language borrowing journey, not a single-origin word, and notes how the mathematical meaning was preserved even as the word crossed three language communities.

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Confirm current meaning over historical origin**
Given a word with dramatic historical meaning drift, student states the correct current meaning and explains why the etymological origin doesn't override modern usage. *(Directly targets MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY.)*

**MP-2 [P36] — Trace a multi-language borrowing path**
Given a word with a documented multi-language origin, student correctly traces the full borrowing path across all language stages, rejecting a single-origin oversimplification. *(Directly targets MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING.)*

**MP-3 [P36] — Simple word history trace**
Given a word with a straightforward etymology, student traces its origin-to-current-meaning journey correctly.

**MP-4 [P36] — Etymology as a cautious meaning clue**
Given an unfamiliar word, student uses its etymology as an initial clue to guess meaning, then confirms or adjusts the guess against how the word is actually used in a sentence.

**MP-5 [P36] — Original etymology research**
Student researches and presents the etymology of one self-selected word, including origin language(s), any borrowing path, and any documented meaning drift.

## Component 7 — Session Architecture

```
[PD-1: Roots-and-Origins Readiness Check]
        |
        v
[Concrete Anchor: The Word River Journey]
        |
        v
[TA-1: Tracing a Simple Word History]
        |
        v
[TA-2: Meaning Drift Over Time]
        |
        v
[TA-3: Borrowing and Multi-Language Journeys]
        |
        v
[TA-4: Etymology as a Meaning Clue, With Caution]
        |
        v
[TA-5: Researching an Original Word History]
        |
        v
[WE-1] --> [WE-2] --> [WE-3]
        |
        v
[MP-1 through MP-5]
```

**Protocol routing paragraph:** At session open (S0), confirm PD-1 passes — etymology extends root identification into full historical tracing, so a student weak in root recognition will struggle to follow a word's journey across languages and time. During instruction (S1), watch for both misconception patterns: treating historical origin as authoritative over current meaning (MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY) and assuming every word has one simple single-language origin (MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING) both stem from an oversimplified view of language history — redirect both to the Word River Journey anchor's river-mouth-matters and multi-tributary framing. If the student insists on an outdated etymological meaning during TA-2 (S6), drop back to the Concrete Anchor's river-mouth demonstration before returning to independent practice. At mastery-probe stage (S9), do not certify mastery unless MP-1 and MP-2 both pass — a student who can trace simple straightforward histories (MP-3) but insists on etymological "correctness" or oversimplifies borrowing paths has not learned the core historical-linguistic judgment this concept requires.

## Component 8 — Adaptive Flags

- If the student insists an etymological meaning is more "correct" than current usage, weight remediation toward MC-A-WORDS-ORIGINAL-MEANING-IS-ITS-TRUE-OR-CORRECT-MEANING-TODAY's bridge text and re-run TA-2's meaning-drift examples before returning to independent research.
- If the student oversimplifies a word's origin to a single language, weight remediation toward MC-EVERY-WORD-CAME-FROM-A-SINGLE-CLEAR-LANGUAGE-WITH-NO-BORROWING's bridge text and TA-3's multi-language borrowing-path practice specifically.
- This concept feeds two direct downstream unlocks (`eng.vocab.semantic-fields`, `eng.linguistics.historical-linguistics-intro`) — do not certify mastery without TA-5/MP-5's original research task, since both downstream concepts assume the student can independently investigate and present a word's history rather than only recognizing pre-taught examples.
- Reuse the "word river journey" framing explicitly when introducing `eng.linguistics.historical-linguistics-intro` — that concept formalizes the same origin-tracing and language-contact concepts using proper historical-linguistic methodology and terminology.

## Component 9 — Validation Checklist

| ID | Check | Result |
|----|-------|--------|
| V-1 | Concept identity block complete (id, name, domain, difficulty, bloom, prerequisites, mastery_threshold, estimated_hours, cross_links, session_cap, cpa_entry_stage) | PASS |
| V-2 | Exactly 2 misconceptions registered | PASS |
| V-3 | Each misconception has trigger, conflict evidence, bridge, replacement, discrimination pairs, s6_path | PASS |
| V-4 | At least 1 prerequisite diagnostic block present | PASS |
| V-5 | Concrete anchor tagged [P06] and physically/visually manipulable | PASS |
| V-6 | Conceptual development sequence has 5 TAs matching session_cap | PASS |
| V-7 | TAs progress from recognition to construction (concrete → generative) | PASS |
| V-8 | 3 worked examples present (WE-1 to WE-3) | PASS |
| V-9 | Worked examples span scaffolded → guided → independent difficulty | PASS |
| V-10 | Counterexample present where appropriate (drifted meaning vs. authoritative origin) | PASS |
| V-11 | Mastery probes each tagged [P36] | PASS |
| V-12 | ≥ 5 mastery probes present | PASS |
| V-13 | Mastery probes map to both misconceptions | PASS |
| V-14 | Mastery probes include at least one generative/constructive task | PASS |
| V-15 | Session architecture diagram present with primitive tags | PASS |
| V-16 | Protocol routing paragraph covers S0/S1/S6/S9 | PASS |
| V-17 | Adaptive flags present (≥ 4 bullets) | PASS |
| V-18 | Cross-links to downstream concepts referenced in adaptive flags | PASS |
| V-19 | No modification to Knowledge Graph, schema, or runtime code | PASS |
| V-20 | Blueprint content grounded in verified KG node data (requires/unlocks/difficulty/bloom/mastery_threshold/estimated_hours) | PASS |

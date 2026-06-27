/**
 * Misconception Detection Engine (Sprint CS).
 *
 * Moves beyond "weak topic" to "specific misconception" by cross-referencing
 * MistakeRecord and LearningCheckpoint data against a deterministic rule
 * taxonomy. No new database tables — reuses existing signals.
 *
 * Detection model:
 *   1. Fetch MistakeRecords for the chapter's KG node IDs (last 30 days).
 *   2. For each taxonomy rule, count records whose topicSlug matches a
 *      primary pattern. If the rule also requires a secondary pattern
 *      (co-occurrence), require at least one matching record on a secondary
 *      topic as well.
 *   3. Supplement with LearningCheckpoint failures on matching nodes.
 *   4. Assign confidence: LOW (1–2), MEDIUM (3–4), HIGH (5+).
 *   5. Return all detected misconceptions sorted by evidenceCount descending.
 *      Callers should hide LOW-confidence results in UI.
 */

import { prisma } from '@/lib/db/prisma'

// ── Public types ──────────────────────────────────────────────────────────────

export type MisconceptionConfidence = 'HIGH' | 'MEDIUM' | 'LOW'

export interface Misconception {
  type: string
  label: string
  description: string
  confidence: MisconceptionConfidence
  evidenceCount: number
  remediationSteps: string[]
}

// ── Internal taxonomy rule ────────────────────────────────────────────────────

export interface MisconceptionRule {
  type: string
  /** Student-facing short label (shown on chapter page). */
  label: string
  /** Tutor-facing explanation of the misconception. */
  description: string
  /** One or more substrings — a topicSlug containing ANY of these triggers the rule. */
  primaryPatterns: string[]
  /**
   * Optional cross-topic co-occurrence guard. If provided, at least one mistake
   * topicSlug must ALSO match one of these secondary patterns. Used for
   * confusion-between-two-concepts misconceptions.
   */
  secondaryPatterns?: string[]
  remediationSteps: string[]
}

// ── Taxonomy ──────────────────────────────────────────────────────────────────

/** Exported read-only for test harnesses (scripts/test-misconception-rules.ts) — never mutated at runtime. */
export const RULES: readonly MisconceptionRule[] = [
  // ── Mathematics ────────────────────────────────────────────────────────
  {
    type: 'fraction_denominator',
    label: 'Larger denominator = larger value',
    description: 'Student may believe a fraction with a larger denominator is always larger (e.g. thinks 1/8 > 1/2 because 8 > 2).',
    primaryPatterns: ['fractions.'],
    remediationSteps: [
      'Draw fraction bars side-by-side: 1/2 vs 1/4 vs 1/8 — ask which piece is bigger.',
      'Use pizza slices: "If a pizza is cut into 2 pieces vs 8 pieces, which slice is larger?"',
      'Have student order 1/2, 1/3, 1/6 from largest to smallest before calculating.',
      'Verify: ask student to compare 1/3 vs 1/5 and explain their reasoning.',
    ],
  },
  {
    type: 'percent_decimal',
    label: 'Percent vs decimal confusion',
    description: 'Student confuses percentage and decimal representations — may write 45% as 45.0 instead of 0.45, or 0.3 as 30 instead of 30%.',
    primaryPatterns: ['percentages.'],
    secondaryPatterns: ['decimals.'],
    remediationSteps: [
      'Show the conversion chain: fraction → decimal → percent with the same number (e.g. 1/4 = 0.25 = 25%).',
      'Highlight that "percent" means per hundred — divide by 100 to get decimal.',
      'Give mixed problems where student must identify which form is needed before solving.',
      'Ask: "If 30% of students passed, what decimal would you enter in a spreadsheet?"',
    ],
  },
  {
    type: 'algebra_sign_error',
    label: 'Algebra sign errors',
    description: 'Student makes systematic sign errors when solving or rearranging equations — may drop negatives when transposing or multiplying both sides.',
    primaryPatterns: ['algebra.linear_equations', 'algebra.quadratic', 'algebra.inequalities', 'number_systems.integers'],
    remediationSteps: [
      'Slow down equation solving — write each operation on its own line.',
      'After each step, verify by substituting the current expression back into the original.',
      'Highlight sign change explicitly: "moving a positive term across = subtracting it on the other side."',
      'Use number line for simple integer operations before introducing variables.',
    ],
  },
  {
    type: 'area_perimeter',
    label: 'Area vs perimeter confusion',
    description: 'Student confuses area (square units — the space inside) and perimeter (linear units — the boundary length).',
    primaryPatterns: ['mensuration.perimeter_area'],
    remediationSteps: [
      'Use a physical analogy: perimeter = fence around a garden, area = grass inside.',
      'Trace the boundary of a shape with one colour, fill the inside with another.',
      'Give problems where only one is asked and student must identify which formula applies.',
      'Compare units: area answer should have units², perimeter has plain units.',
    ],
  },
  // ── Science ────────────────────────────────────────────────────────────
  {
    type: 'force_motion',
    label: 'Force and motion concepts mixed',
    description: 'Student believes constant motion requires constant force — confuses net force with motion itself (Newton\'s first law gap).',
    primaryPatterns: ['physics.forces.'],
    secondaryPatterns: ['physics.kinematics.'],
    remediationSteps: [
      'Use the ice-skater analogy: a skater keeps moving without pushing — ask why.',
      'Distinguish between "forces are balanced" (constant velocity) and "forces are unbalanced" (acceleration).',
      'Draw free-body diagrams for constant velocity vs accelerating objects side-by-side.',
      'Ask: "What force keeps Earth moving in orbit?" to probe understanding of inertia.',
    ],
  },
  {
    type: 'mass_weight',
    label: 'Mass vs weight confusion',
    description: 'Student uses mass and weight interchangeably — mass is constant; weight depends on gravitational field.',
    primaryPatterns: ['physics.gravitation.', 'physics.forces.laws_of_motion'],
    remediationSteps: [
      'Astronaut example: same mass on Earth and Moon, but weight changes.',
      'Use W = mg to show weight is mass × g, so weight changes when g changes.',
      'Ask: "What would happen to your weight vs your mass on the Moon?"',
      'Check that student uses kg for mass and N for weight consistently.',
    ],
  },
  {
    type: 'current_voltage',
    label: 'Current vs voltage confusion',
    description: 'Student conflates electric current (flow of charge) with voltage (potential difference driving the flow).',
    primaryPatterns: ['physics.electricity.current_circuits', 'physics.electricity.electrostatics'],
    remediationSteps: [
      'Water analogy: voltage = water pressure, current = flow rate.',
      'Explain: voltage is the "push," current is what flows because of that push.',
      'Ask student to trace where current flows in a circuit diagram vs where voltage is measured.',
      'Give a simple series circuit and ask: same current everywhere, but voltage drops across each component?',
    ],
  },
  {
    type: 'heat_temperature',
    label: 'Heat vs temperature confusion',
    description: 'Student treats heat and temperature as the same — heat is energy transferred, temperature is a measure of average kinetic energy.',
    primaryPatterns: ['physics.thermodynamics.'],
    remediationSteps: [
      'Compare a hot spoon vs a pot of boiling water: same temperature, but which transfers more heat?',
      'Define heat as energy in transit; temperature as a property of the object.',
      'Ask: "Can you add heat to something without changing its temperature?" (phase change — yes).',
      'Use Q = mcΔT to show that heat depends on mass and specific heat, temperature change does not.',
    ],
  },
  // ── English ────────────────────────────────────────────────────────────
  {
    type: 'subject_verb_agreement',
    label: 'Subject-verb agreement confusion',
    description: 'Student does not correctly match the verb form to the subject\'s number or person.',
    primaryPatterns: ['grammar.parts_of_speech.verbs', 'grammar.sentences.'],
    remediationSteps: [
      'Isolate the subject first — remove any phrases between subject and verb, then match.',
      'Practise with collective nouns and indefinite pronouns (everyone is, not everyone are).',
      'Use oral substitution drills: replace the subject with he/she/it/they and listen for the correct verb.',
      'Give edit-the-error exercises where student finds and fixes agreement mistakes in paragraphs.',
    ],
  },
  {
    type: 'verb_tense',
    label: 'Verb tense confusion',
    description: 'Student inconsistently selects verb tenses — mixing past/present/future within the same sentence or paragraph.',
    primaryPatterns: ['grammar.tenses.'],
    remediationSteps: [
      'Establish a "time anchor" at the start of each exercise: past, present, or future?',
      'Use timelines drawn on paper to visualise when each action occurs.',
      'Provide fill-in-the-blank exercises where only the correct tense form is accepted.',
      'Ask student to rewrite the same sentence in three different tenses to feel the contrast.',
    ],
  },
  {
    type: 'pronoun_confusion',
    label: 'Pronoun confusion',
    description: 'Student misuses pronoun case (I vs me, he vs him) or has ambiguous pronoun reference.',
    primaryPatterns: ['grammar.parts_of_speech.nouns_pronouns'],
    remediationSteps: [
      'Teach subject vs object case: "I/he/she/they" for subjects; "me/him/her/them" for objects.',
      'Remove one noun from a compound to test: "He and I went" → "I went" — does that sound right?',
      'For pronoun reference: ask "Who or what does this pronoun refer to?" for every ambiguous case.',
      'Give rewriting exercises: replace nouns with pronouns, checking case at each step.',
    ],
  },
  {
    type: 'sentence_structure',
    label: 'Sentence structure confusion',
    description: 'Student writes run-ons, fragments, or incorrectly combines clauses.',
    primaryPatterns: ['grammar.sentences.types_structure'],
    remediationSteps: [
      'Start with identifying subject + predicate in every sentence.',
      'Classify clauses as independent vs dependent before combining.',
      'Practise combining two short sentences using different conjunctions and punctuation.',
      'Read the sentence aloud — if it feels incomplete or too long without pause, revise.',
    ],
  },
  // ── Social Science ─────────────────────────────────────────────────────
  {
    type: 'cause_effect',
    label: 'Cause vs effect confusion',
    description: 'Student conflates historical causes with their effects — may list effects as causes or vice versa.',
    primaryPatterns: ['history.world_history.', 'history.modern_india.', 'history.medieval_india.'],
    remediationSteps: [
      'Use the "Because → Therefore" template: cause = because statement, effect = therefore statement.',
      'Draw a simple flowchart: cause box → arrow → effect box.',
      'Ask student to restate: "What came first?" and "What happened as a result?"',
      'Provide a list of events and have student sort them into causes vs effects for a given event.',
    ],
  },
  {
    type: 'chronology',
    label: 'Chronology confusion',
    description: 'Student has difficulty placing events in correct historical sequence.',
    primaryPatterns: ['history.ancient_india.', 'history.ancient_world.'],
    remediationSteps: [
      'Build a physical timeline — label cards and arrange them in order.',
      'Anchor events to known periods: BCE vs CE, early vs medieval vs modern.',
      'Use relative markers: "Before or after the Maurya Empire?"',
      'Draw a timeline of 5–6 key events; ask student to add new events in the right position.',
    ],
  },
  {
    type: 'geography_concepts',
    label: 'Geography concept confusion',
    description: 'Student confuses geographic concepts such as climate vs weather, location vs place, or political vs physical boundaries.',
    primaryPatterns: ['geography.'],
    remediationSteps: [
      'Distinguish climate (long-term patterns) vs weather (day-to-day conditions) with examples.',
      'Use maps: identify physical features (rivers, mountains) vs political borders separately.',
      'Practice with location questions: "What country is this city in? What river passes through it?"',
      'Compare two similar regions and ask student to identify what makes them different.',
    ],
  },
  // ── Hindi ──────────────────────────────────────────────────────────────
  {
    type: 'hindi_ling_vachan',
    label: 'लिंग-वचन की त्रुटि',
    description: 'Student applies incorrect gender (लिंग) or number (वचन) agreement — e.g. using पुल्लिंग forms for स्त्रीलिंग nouns, or singular verb with plural subject.',
    primaryPatterns: ['hindi.vyakaran.ling_vachan', 'hindi.vyakaran.sangya', 'hindi.vyakaran.vakya_shuddhi'],
    remediationSteps: [
      'List the noun and ask: does this refer to a male/female person, or have a conventional gender? Check using "वह" substitution.',
      'Verb-agreement drill: give 5 nouns (mixed gender/number), student writes the correct verb form for each.',
      'Point to lिंग-वचन rules for common problem words: पानी (पुल्लिंग), हवा (स्त्रीलिंग), दूध (पुल्लिंग).',
      'Have student re-read a paragraph they wrote and underline every verb, checking agreement each time.',
    ],
  },
  {
    type: 'hindi_sandhi_samaas',
    label: 'संधि-समास की पहचान में भ्रम',
    description: 'Student confuses sandhi (phonological joining) with samaas (compound word formation), or misidentifies the type of compound word.',
    primaryPatterns: ['hindi.vyakaran.sandhi', 'hindi.vyakaran.samaas', 'hindi.shabdavali.shabd_nirman'],
    remediationSteps: [
      'Explain the key distinction: संधि = joining sounds of two words; समास = joining meanings of two words.',
      'Give 5 examples of each and ask student to categorise before analysing further.',
      'For समास: use the विग्रह method — write the expanded form, then identify which relation connects the parts.',
      'Practise sandhi-vicchhhed with the most common स्वर-संधि patterns (दीर्घ, गुण) using colour-coding.',
    ],
  },
  {
    type: 'hindi_ras_alankar',
    label: 'रस और अलंकार की पहचान में त्रुटि',
    description: 'Student misidentifies the rasa (emotional sentiment) or alankar (figure of speech) in a passage — e.g. confusing shringar with karuna, or upma with rupak.',
    primaryPatterns: ['hindi.vyakaran.ras', 'hindi.vyakaran.alankar', 'hindi.kavya_bodh.bhav_saundarya', 'hindi.kavya_bodh.shilpa_saundarya'],
    remediationSteps: [
      'Rasa identification: ask what emotion the lines make the reader feel — सुख? दुख? वीरता? Then match to the corresponding रस.',
      'Alankar shortcut: Upma always uses "जैसे/सा/सी/से"; Rupak drops the comparison word completely ("वह शेर है"); Utpreksha uses "मानो/जनु".',
      'Give 10 poetic lines and have student label रस + अलंकार, then check against answer key.',
      'Focus revision on the three most confused pairs: उपमा-रूपक, श्रृंगार-करुण, अनुप्रास-यमक.',
    ],
  },
  {
    type: 'hindi_vishay_patra',
    label: 'विषय-वस्तु और पात्र-चित्रण में भ्रम',
    description: 'Student confuses the theme (विषय-वस्तु) of a text with a character\'s action, or gives character-level answers to theme questions and vice versa.',
    primaryPatterns: ['hindi.sahitya_vishleshan.vishay_vastu', 'hindi.sahitya_vishleshan.patra_chitran', 'hindi.gadya.kahani'],
    remediationSteps: [
      'Distinguish: "विषय-वस्तु" = the big idea the whole story is about; "पात्र" = a person in the story.',
      'Theme question tip: answer with an abstract noun (ईमानदारी, त्याग, सामाजिक न्याय) not a character name.',
      'Character question tip: describe specific traits seen in the character\'s words and actions, not the story\'s moral.',
      'Practice: give the same story extract and ask two different questions — one about theme, one about character — and compare the expected answers.',
    ],
  },
  {
    type: 'hindi_kavya_bodh',
    label: 'काव्यांश के भाव-सौंदर्य की व्याख्या में त्रुटि',
    description: 'Student gives a literal word-for-word translation instead of explaining the deeper emotional meaning (भाव) or poetic beauty (सौंदर्य) of a verse.',
    primaryPatterns: ['hindi.kavya_bodh.bhav_saundarya', 'hindi.padhna.apathit_padyansh', 'hindi.padya.bhaktikaal', 'hindi.padya.chhayavad'],
    remediationSteps: [
      'Teach the 3-step formula: (1) literal meaning in simple Hindi, (2) deeper emotion/idea the poet is expressing, (3) connection to the broader theme of the poem.',
      'Model the difference: "पानी गया" literally = water left; poetically = loss of opportunity / wasted time.',
      'Ask student to identify the emotion in the poem first (खुशी? दर्द? विरह?) before writing the explanation.',
      'Give two sample answers — one literal, one interpretive — and ask student to identify which is the better "भाव-सौंदर्य" answer.',
    ],
  },
  {
    type: 'hindi_kaarak',
    label: 'कारक-विभक्ति की त्रुटि',
    description: 'Student uses the wrong case marker (विभक्ति/परसर्ग) — e.g. writing "राम को जाता है" instead of "राम जाता है", or confusing ने, को, से, के लिए in different contexts.',
    primaryPatterns: ['hindi.vyakaran.kaarak', 'hindi.vyakaran.vakya_shuddhi', 'hindi.vyakaran.vakya_bhed'],
    remediationSteps: [
      'Learn the 8 कारक with their परसर्ग: कर्ता (ने), कर्म (को), करण (से/द्वारा), संप्रदान (के लिए), अपादान (से), संबंध (का/के/की), अधिकरण (में/पर), संबोधन (हे/अरे).',
      'Key rule: कर्ता "ने" is only used with सकर्मक verbs in past tense — "राम ने रोटी खाई" (correct), "राम ने सोया" (incorrect — अकर्मक verb).',
      'Practise by rewriting 5 sentences replacing each विभक्ति one at a time and checking if meaning changes correctly.',
      'For संबंध कारक, use the gender/number of the noun that follows: उसका भाई, उसकी बहन, उसके बच्चे.',
    ],
  },
  {
    type: 'hindi_lekhan_praaroop',
    label: 'पत्र/लेखन-प्रारूप की त्रुटि',
    description: 'Student omits or incorrectly places required format elements in formal/informal letter writing — e.g. missing प्रेषक का पता, दिनांक, विषय, संबोधन, or the closing (भवदीय/आपका).',
    primaryPatterns: ['hindi.lekhan.patra_oupcharik', 'hindi.lekhan.patra_anoupcharik', 'hindi.lekhan.sampadak_patra'],
    remediationSteps: [
      'Memorise the 7-part formal letter format: (1) प्रेषक का पता (2) दिनांक (3) प्राप्तकर्ता का पद/पता (4) विषय (5) संबोधन — महोदय/महोदया (6) मुख्य भाग (7) समाप्ति — भवदीय + हस्ताक्षर.',
      'For informal letters: (1) स्थान + दिनांक (2) संबोधन — प्रिय/आदरणीय (3) मुख्य भाग (4) समाप्ति — आपका/तुम्हारा + नाम.',
      'Common error: writing "सेवा में" for informal letters — this is only for formal/official letters.',
      'Always write "विषय:" on a separate line in formal letters; it is optional and not standard format for informal letters.',
    ],
  },
  {
    type: 'hindi_tatsam_tadbhav',
    label: 'तत्सम–तद्भव और देशज–विदेशी शब्दों में भ्रम',
    description: 'Student misclassifies word origins — confusing तत्सम (Sanskrit-origin, unchanged) with तद्भव (Sanskrit-derived but changed), or fails to identify देशज/विदेशी शब्द.',
    primaryPatterns: ['hindi.shabdavali.tatsam_tadbhav', 'hindi.shabdavali.deshaj_videshi', 'hindi.shabdavali.shabd_nirman'],
    remediationSteps: [
      'तत्सम rule: same spelling as Sanskrit original — कर्म, धर्म, अग्नि, कार्य. तद्भव rule: changed form — काम (< कर्म), धरम (< धर्म), आग (< अग्नि), काज (< कार्य).',
      'Test: if the word looks "classical" and can appear in Sanskrit directly, it is तत्सम. If it sounds colloquial/changed, it is तद्भव.',
      'देशज शब्द are native words with no Sanskrit root — e.g. लोटा, थैला, पगड़ी. विदेशी शब्द are borrowed — Arabic (किताब, औरत), Persian (बाजार, दुकान), English (स्कूल, बस).',
      'Make four-column flashcards: तत्सम | तद्भव | देशज | विदेशी — and practise sorting 10 new words each day.',
    ],
  },
  // ── Sanskrit ───────────────────────────────────────────────────────────
  {
    type: 'sanskrit_sandhi_bhed',
    label: 'संधि के भेद की पहचान में त्रुटि',
    description: 'Student confuses types of sandhi (स्वर संधि, व्यंजन संधि, विसर्ग संधि) or misapplies rules — e.g. applying गुण संधि rules where दीर्घ या यण् संधि applies.',
    primaryPatterns: ['sanskrit.sandhi.'],
    remediationSteps: [
      'स्वर संधि के तीन मुख्य प्रकार स्पष्ट करें: दीर्घ संधि (सवर्ण स्वर + सवर्ण स्वर → दीर्घ स्वर), गुण संधि (अ/आ + इ/ई/उ/ऊ/ऋ → ए/ओ/अर्/अल्), यण् संधि (इ/ई/उ/ऊ/ऋ + असमान स्वर → य्/व्/र्/ल्).',
      'विसर्ग संधि के लिए: विसर्ग के आगे आने वाला वर्ण (स्वर/घोष/अघोष व्यंजन) देखकर ही नियम चुनें — एक ही नियम सभी स्थितियों में मत लगाएँ।',
      'प्रत्येक प्रकार के 5 उदाहरण देकर पहले वर्गीकरण कराएँ, फिर संधि-विच्छेद का अभ्यास करें।',
      'सबसे अधिक भ्रम वाले युग्मों पर ध्यान दें: गुण-यण् संधि, दीर्घ-गुण संधि, व्यंजन-विसर्ग संधि।',
    ],
  },
  {
    type: 'sanskrit_samasa_bhed',
    label: 'समास के भेद की पहचान में त्रुटि',
    description: 'Student misidentifies the type of समास (तत्पुरुष, कर्मधारय, द्विगु, द्वंद्व, बहुव्रीहि, अव्ययीभाव) or cannot perform the correct विग्रह (compound expansion).',
    primaryPatterns: ['sanskrit.samasa.'],
    remediationSteps: [
      'विग्रह के आधार पर पहचान सिखाएँ: तत्पुरुष में दूसरा पद प्रधान (विभक्ति-संबंध से जुड़ा); कर्मधारय में दोनों पद विशेषण-विशेष्य/उपमा-संबंध से जुड़े; द्विगु में पहला पद संख्या-वाचक; द्वंद्व में दोनों पद प्रधान ("और" से जुड़े); बहुव्रीहि में दोनों पद किसी तीसरे (अन्य) अर्थ की ओर संकेत करते हैं; अव्ययीभाव में पहला पद अव्यय।',
      'कर्मधारय बनाम बहुव्रीहि में भ्रम दूर करने हेतु: यदि समस्त पद स्वयं के अर्थ को बताए — कर्मधारय; यदि किसी अन्य (तीसरी) वस्तु/व्यक्ति का विशेषण बने — बहुव्रीहि।',
      'प्रत्येक समास के 2-3 उदाहरण देकर विग्रह सहित वर्गीकरण का अभ्यास कराएँ।',
      'सबसे अधिक भ्रम वाले युग्मों पर ध्यान दें: कर्मधारय-बहुव्रीहि, द्विगु-कर्मधारय, तत्पुरुष-कर्मधारय।',
    ],
  },
  {
    type: 'sanskrit_shabda_roopa',
    label: 'शब्द-रूप (विभक्ति) के प्रयोग में त्रुटि',
    description: 'Student applies the wrong विभक्ति (case) endings for a noun\'s लिंग/अन्त — e.g. using अकारांत पुंलिंग (राम-प्रकार) के रूप अकारांत नपुंसकलिंग (फल) या स्त्रीलिंग (लता) शब्दों पर लगाना, or misusing सर्वनाम शब्द-रूप (तद्/यद्/एतद्, अस्मद्/युष्मद्, किम्).',
    primaryPatterns: ['sanskrit.shabda_roopa.'],
    remediationSteps: [
      'पहले शब्द का लिंग और अन्त (अकारांत/इकारांत/उकारांत आदि) पहचानें — तभी सही शब्द-रूप-सारणी चुनें।',
      'राम (पुंलिंग), फल (नपुंसकलिंग) और लता (स्त्रीलिंग) के मूल रूपों को आधार बनाकर अन्य अकारांत शब्दों के रूप बनाने का अभ्यास कराएँ।',
      'सर्वनाम शब्द-रूप के लिए: तद्/यद्/एतद् तीनों लिंगों में भिन्न-भिन्न रूप लेते हैं — तुलना-सारणी बनाकर अभ्यास कराएँ। अस्मद्/युष्मद् में लिंग-भेद नहीं होता।',
      'प्रत्येक विभक्ति (प्रथमा से सप्तमी) के एकवचन/द्विवचन/बहुवचन रूपों को मौखिक रूप से बोलकर स्मरण करने का अभ्यास कराएँ।',
    ],
  },
  {
    type: 'sanskrit_dhaatu_roopa_lakar',
    label: 'धातु-रूप (लकार) के प्रयोग में त्रुटि',
    description: 'Student uses the wrong लकार (tense/mood) for the context — e.g. using लट् लकार (वर्तमान काल) where लङ् लकार (भूत काल) या लृट् लकार (भविष्य काल) is required, or makes पुरुष/वचन agreement errors in धातु-रूप.',
    primaryPatterns: ['sanskrit.dhaatu_roopa.'],
    remediationSteps: [
      'पाँच मुख्य लकारों के अर्थ स्पष्ट करें: लट् = वर्तमान काल, लङ् = भूत काल, लृट् = भविष्य काल, लोट् = आज्ञा/प्रार्थना, विधिलिङ् = कर्तव्य/उचित (चाहिए)।',
      'वाक्य में काल-संकेतक शब्दों (अद्य, ह्यः, श्वः आदि) की पहचान कराकर उसी के अनुसार सही लकार चुनने का अभ्यास कराएँ।',
      'भू, अस्, गम्, पठ्, कृ, वद् जैसी प्रमुख धातुओं के लट्/लङ्/लृट् रूपों की तुलना-सारणी बनाकर अभ्यास करें।',
      'पुरुष (प्रथम/मध्यम/उत्तम) और वचन (एकवचन/द्विवचन/बहुवचन) के अनुसार धातु-रूप के अंत (ति/तः/अन्ति आदि) को रंग-कोड कर स्मरण कराएँ।',
    ],
  },
  {
    type: 'sanskrit_anuvad_vakya_rachana',
    label: 'अनुवाद एवं वाक्य-रचना में त्रुटि',
    description: 'Student translates word-for-word from Hindi into Sanskrit without applying the correct कारक-विभक्ति या वाच्य (कर्तृ/कर्म/भाव) — producing grammatically incorrect Sanskrit sentences.',
    primaryPatterns: ['sanskrit.gadya.hindi_se_sanskrit', 'sanskrit.gadya.sanskrit_se_hindi', 'sanskrit.vyakarana.vakya_rachana_anuvad', 'sanskrit.vyakarana.vachya'],
    remediationSteps: [
      'अनुवाद से पहले वाक्य के कर्ता, कर्म और क्रिया को अलग-अलग चिह्नित करें, फिर प्रत्येक के लिए सही विभक्ति लगाएँ।',
      'याद रखें: संस्कृत में शब्द-क्रम लचीला है, परन्तु विभक्ति का सही होना अनिवार्य है — कर्ता को प्रथमा विभक्ति, कर्म को द्वितीया विभक्ति।',
      'कर्तृवाच्य और कर्मवाच्य के वाक्यों की तुलना कराएँ — कर्मवाच्य में कर्म प्रथमा विभक्ति में आता है और क्रिया कर्म के लिंग/वचन के अनुसार होती है।',
      'सरल वाक्यों से अभ्यास आरम्भ करें — पहले कर्ता-क्रिया, फिर कर्ता-कर्म-क्रिया वाले वाक्य बनवाएँ।',
    ],
  },
  {
    type: 'sanskrit_shlok_vyakhya',
    label: 'श्लोक/पद्यांश की व्याख्या में त्रुटि',
    description: 'Student gives a literal, word-by-word (शब्दशः) translation of a श्लोक/सुभाषित instead of explaining its भावार्थ (deeper meaning) or सप्रसंग व्याख्या (contextual explanation).',
    primaryPatterns: ['sanskrit.kavya_bodh.shlok_vyakhya', 'sanskrit.kavya_bodh.bhav_saundarya', 'sanskrit.padya.apathit_padyansh', 'sanskrit.padya.shlok_arth_bodh'],
    remediationSteps: [
      'त्रिस्तरीय विधि सिखाएँ: (1) प्रत्येक शब्द का अर्थ, (2) पूरे श्लोक का सरल भावार्थ, (3) श्लोक का प्रसंग — किस पाठ से लिया गया है और उसका संदेश।',
      'सप्रसंग व्याख्या में सबसे पहले प्रसंग (कौन, कब, किससे कह रहा है) लिखने पर बल दें, फिर भावार्थ।',
      'विद्यार्थी को पहले शब्दार्थ खोजने दें, फिर बिना शब्दशः अनुवाद के अपने शब्दों में भाव लिखने का अभ्यास कराएँ।',
      'मूल श्लोक का कोई भी अंश गलत या अनुमानित रूप में न लिखें — यदि श्लोक ठीक से स्मरण न हो, तो केवल भाव और शिक्षा (संदेश) पर केंद्रित उत्तर लिखें।',
    ],
  },
  {
    type: 'sanskrit_vishay_patra',
    label: 'विषय-वस्तु और पात्र-चित्रण में भ्रम',
    description: 'Student confuses the central theme (विषय-वस्तु) of a गद्य/पद्य पाठ with a character\'s individual action, or gives पात्र-केंद्रित उत्तर for विषय-वस्तु प्रश्न and vice versa.',
    primaryPatterns: ['sanskrit.sahitya_vishleshan.vishay_vastu', 'sanskrit.sahitya_vishleshan.patra_chitran', 'sanskrit.gadya.varnan_katha'],
    remediationSteps: [
      'अंतर स्पष्ट करें: "विषय-वस्तु" सम्पूर्ण पाठ का केंद्रीय भाव/संदेश है; "पात्र-चित्रण" पाठ के किसी विशेष व्यक्ति/प्राणी के गुण-स्वभाव का वर्णन है।',
      'विषय-वस्तु प्रश्न का उत्तर भाववाचक शब्दों (परिश्रम, ईमानदारी, मित्रता आदि) में दें — किसी पात्र के नाम से नहीं।',
      'पात्र-चित्रण प्रश्न में पात्र के संवादों एवं कार्यों के आधार पर उसके विशेष गुण बताएँ, पूरे पाठ का सार नहीं।',
      'एक ही पाठ से दो भिन्न प्रश्न (विषय-वस्तु एवं पात्र-चित्रण) देकर दोनों उत्तरों की तुलना कराएँ।',
    ],
  },
  // ── Quantum Physics (Subject Library: quantum_physics) ───────────────────
  // primaryPatterns are Revision-2 lesson slugs (l<unit>-<lesson>); detection is
  // subjectSlug-scoped, so these never collide with other subjects. One rule per
  // misconception theme; remediationSteps cover every sub-misconception in the
  // QUANTUM_PHYSICS_MISCONCEPTIONS catalog for that theme.
  {
    type: 'quantum_wave_particle_duality',
    label: 'Wave–particle duality misunderstood',
    description: 'Student thinks a quantum object literally "switches" between being a classical wave and a classical particle, treats ψ as a physical wave in 3D space like water, or believes photons travel definite paths through one slit.',
    primaryPatterns: ['l6-1', 'l6-2', 'l6-3', 'l7-1', 'l9-4'],
    remediationSteps: [
      'Reframe around the measurement context, not the object: it is one quantum entity whose statistics look wave-like or particle-like depending on what is measured.',
      'Build up the single-particle double-slit pattern one detection at a time to show interference emerges statistically.',
      'Stress that ψ is a complex probability amplitude and |ψ|² is a probability density — show that for two particles ψ lives in 6D configuration space, not real 3D space.',
      'Contrast which-path information vs. interference (complementarity): measuring the path destroys the fringes.',
    ],
  },
  {
    type: 'quantum_uncertainty_principle',
    label: 'Uncertainty principle misunderstood',
    description: 'Student treats Δx·Δp ≥ ħ/2 as mere measurement disturbance (observer effect), thinks good-enough instruments could beat it, or reads energy–time uncertainty as energy non-conservation.',
    primaryPatterns: ['l11-3', 'l6-4', 'l6-3', 'l5-5', 'l18-2'],
    remediationSteps: [
      'Derive the bound from non-commuting operators / Fourier width so it is clearly intrinsic, separate from any disturbance during measurement.',
      'Use the wave-packet width tradeoff: narrowing Δx necessarily broadens Δp regardless of instrument quality.',
      'State explicitly that the bound is fundamental, not technological — no future apparatus removes it.',
      'Explain energy–time uncertainty as the linewidth–lifetime relation, not a license to violate energy conservation.',
    ],
  },
  {
    type: 'quantum_measurement_collapse',
    label: 'Measurement & collapse misunderstood',
    description: 'Student imagines collapse as a physical force/signal that propagates, believes a conscious observer is required, or thinks an observable only ever holds eigenvalues even before measurement.',
    primaryPatterns: ['l10-3', 'l9-3', 'l11-4', 'l27-3', 'l20-2'],
    remediationSteps: [
      'Frame collapse as an update of the state description on measurement that carries no usable signal (ties to no-signaling).',
      'Use decoherence: any sufficient interaction with an environment suffices — consciousness is not required.',
      'Separate superposition from measurement outcome: eigenvalues are the possible results, not the pre-measurement value of the system.',
      'Verify with a superposition example, asking what is true before vs. after a measurement.',
    ],
  },
  {
    type: 'quantum_entanglement',
    label: 'Entanglement misunderstood',
    description: 'Student thinks entanglement transmits information faster than light, that entangled particles secretly carry local hidden variables, or that measuring one causally yanks the other.',
    primaryPatterns: ['l20-1', 'l20-2', 'l20-3', 'l24-2'],
    remediationSteps: [
      'Show each party\'s marginal statistics (reduced density matrix) are unchanged — correlations only appear when results are compared over a classical channel (no-signaling).',
      'Walk through a Bell/CHSH bound and its experimental violation to rule out local hidden variables.',
      'Emphasize correlation vs. causation: frame-dependent ordering means there is no objective "first" collapse that yanks the partner.',
    ],
  },
  {
    type: 'quantum_tunneling',
    label: 'Quantum tunneling misunderstood',
    description: 'Student says the particle "borrows energy" to climb the barrier, thinks tunneling is instantaneous/faster-than-light, or believes wider/taller barriers change only speed and not transmission probability.',
    primaryPatterns: ['l8-3', 'l17-4'],
    remediationSteps: [
      'Show the wavefunction decaying exponentially inside the classically forbidden region — no energy is borrowed and there is no over-the-top trajectory.',
      'Make the parameter dependence explicit: transmission falls off exponentially with barrier width and with √(barrier height).',
      'Caution against naive speed claims — tunneling time is subtle and permits no signaling; focus on transmission probability.',
    ],
  },
  {
    type: 'quantum_computing',
    label: 'Quantum computing misunderstood',
    description: 'Student believes a quantum computer tries all answers at once and reads them out, that qubits are just probabilistic bits, that more qubits always means exponential speedup, that qubits are noise-free and copyable, or that error correction just re-measures the qubit.',
    primaryPatterns: ['l21-1', 'l21-3', 'l21-4', 'l22-1', 'l22-4', 'l22-5', 'l23-1', 'l23-2', 'l23-3', 'l25-6'],
    remediationSteps: [
      'Explain that superposition explores amplitudes but measurement yields one outcome — algorithms must engineer interference (e.g. Grover amplitude amplification) so the right answer is amplified.',
      'Contrast qubits with classical randomness: they carry complex amplitudes (phase) and can interfere and entangle — use the Bloch sphere and an interference example.',
      'Clarify that speedups are problem-specific (factoring, search, simulation); many problems get no quantum advantage — contrast Shor/Grover scope with general tasks.',
      'Motivate QEC: decoherence is the central obstacle and the no-cloning theorem forbids copying qubits to back them up.',
      'Show that direct measurement destroys the state, so error correction uses ancilla entanglement and stabilizer syndrome measurements rather than re-checking the qubit directly.',
    ],
  },
  // ── Classical Mechanics (Subject Library: classical_mechanics) ───────────
  // primaryPatterns are lesson slugs (l<unit>-<lesson>); detection is
  // subjectSlug-scoped, so these never collide with Quantum Physics or other
  // subjects despite sharing the l<unit>-<lesson> slug shape.
  {
    type: 'cm_inertia_requires_force',
    label: 'Motion requires a continuous force',
    description: 'Student believes a moving object needs a continuous applied force to keep moving, and that it stops "because the force ran out" rather than because of friction/drag — a gap in Newton\'s first law.',
    primaryPatterns: ['l4-2', 'l4-3', 'l2-3'],
    remediationSteps: [
      'Use the ice-skater / frictionless-puck analogy: ask what happens to velocity once the push stops if there is truly no friction.',
      'Distinguish "an object in motion stays in motion" (zero net force) from "an object speeds up or slows down" (nonzero net force).',
      'Draw a free-body diagram for a sliding block and ask the student to identify which force is actually responsible for it slowing down.',
      'Ask: "If you stopped applying force to a hockey puck on ice, would it stop immediately?" and connect the answer back to F = ma with friction as the net force.',
    ],
  },
  {
    type: 'cm_action_reaction_same_body',
    label: 'Newton\'s third law pairs misidentified',
    description: 'Student pairs a force with another force acting on the SAME body (e.g. weight and normal force) instead of recognizing action–reaction pairs always act on two different bodies.',
    primaryPatterns: ['l4-4', 'l4-5'],
    remediationSteps: [
      'State the rule explicitly: "object A exerts a force on B exerts an equal and opposite force on A" — always two different objects.',
      'Take a book resting on a table: weight (Earth pulls book) pairs with the book pulling Earth up — NOT with the normal force from the table.',
      'For every free-body diagram drawn, ask "what is the reaction-pair force, and on which other object does it act?"',
      'Give a contrast pair (e.g. person pushing a wall) and have the student name both forces in each Newton\'s-third-law pair separately from the unrelated forces also acting on each body.',
    ],
  },
  {
    type: 'cm_centripetal_force_outward',
    label: 'Centripetal force confused with an outward "centrifugal" push',
    description: 'Student thinks there is a real outward force flinging an object away from the center during circular motion, rather than understanding centripetal force points inward and is what keeps the object curving.',
    primaryPatterns: ['l6-1', 'l6-2', 'l6-4', 'l23-1'],
    remediationSteps: [
      'Swing a ball on a string and ask which direction the string pulls — toward the center, always.',
      'Explain that the "outward force" feeling is inertia (the object wants to go straight) combined with viewing things from the rotating frame, not a real force on the object.',
      'Have the student draw the net-force vector for an object in uniform circular motion and verify it always points toward the center.',
      'Contrast the inertial-frame view (only centripetal force acts) with the rotating-frame view (an additional pseudo-force appears) explicitly, and label which one is real.',
    ],
  },
  {
    type: 'cm_energy_conservation_sign',
    label: 'Sign and reference-point errors in energy conservation',
    description: 'Student loses track of the sign of potential energy or work, or changes the reference point for height/displacement mid-problem, producing inconsistent energy totals.',
    primaryPatterns: ['l7-3', 'l7-4', 'l12-3'],
    remediationSteps: [
      'Require the student to state the chosen zero-reference for PE explicitly before writing any equation, and keep it fixed for the whole problem.',
      'Track energy as a running ledger: KE_i + PE_i + W_other = KE_f + PE_f, and check every term has a defined sign.',
      'Ask the student to verify: "if the object loses height, should PE increase or decrease?" before substituting numbers.',
      'For elastic PE, double-check the sign of spring compression/extension separately from gravitational height.',
    ],
  },
  {
    type: 'cm_momentum_energy_confusion',
    label: 'Momentum conservation confused with energy conservation in collisions',
    description: 'Student assumes kinetic energy is always conserved in a collision (treating every collision as elastic), or applies momentum conservation incorrectly by ignoring direction (treating momentum as a scalar).',
    primaryPatterns: ['l8-3', 'l8-4'],
    remediationSteps: [
      'State the rule: momentum is ALWAYS conserved in a closed system; kinetic energy is only conserved if the collision is elastic.',
      'Have the student classify the collision (elastic vs. inelastic) before choosing which conservation law(s) to apply.',
      'Stress that momentum is a vector — for 1D problems, assign a sign convention for direction before adding velocities.',
      'Walk through a perfectly inelastic collision and show that momentum conservation alone gives the final velocity, while kinetic energy is NOT conserved — compute and compare KE before/after to make the loss concrete.',
    ],
  },
  {
    type: 'cm_torque_vs_force',
    label: 'Torque confused with force; moment of inertia confused with mass',
    description: 'Student treats torque as just "force" without accounting for lever arm and angle, or expects moment of inertia to depend only on mass and not on how that mass is distributed relative to the rotation axis.',
    primaryPatterns: ['l13-2', 'l13-3', 'l13-4'],
    remediationSteps: [
      'Use a wrench analogy: the same force applied closer to the bolt produces less torque — torque = force × perpendicular lever arm.',
      'Have the student compute torque for the same force applied at different distances and angles to see both factors matter.',
      'Compare two objects of equal mass but different mass distribution (e.g. solid disk vs. ring) and ask which is harder to spin up — same mass, different I.',
      'Connect τ = Iα explicitly back to F = ma, naming the rotational analog of each linear quantity (force↔torque, mass↔I, acceleration↔angular acceleration).',
    ],
  },
  {
    type: 'cm_angular_momentum_misuse',
    label: 'Angular momentum conservation misapplied',
    description: 'Student expects angular momentum to be conserved even when an external torque acts, or confuses angular momentum with linear momentum / angular velocity.',
    primaryPatterns: ['l14-1', 'l14-2'],
    remediationSteps: [
      'State the condition explicitly: angular momentum L = Iω is conserved only when the net external torque is zero.',
      'Use the classic spinning-skater example: as I decreases (arms pulled in), ω increases so that L = Iω stays constant — make the student compute both before/after.',
      'Distinguish L (depends on I and ω) from linear momentum p = mv — ask which quantities each one involves.',
      'Give a case with an external torque present (e.g. friction at a pivot) and ask the student to identify that L is NOT conserved there.',
    ],
  },
  {
    type: 'cm_shm_period_misconception',
    label: 'SHM period assumed to depend on amplitude',
    description: 'Student believes a larger-amplitude oscillation takes longer to complete a cycle (treating period like it depends on amplitude), rather than recognizing that for ideal SHM the period depends only on mass/spring-constant (or length/g for a pendulum).',
    primaryPatterns: ['l17-1', 'l17-3', 'l18-2'],
    remediationSteps: [
      'Show the period formulas explicitly: T = 2π√(m/k) for a spring, T = 2π√(L/g) for a small-angle pendulum — neither contains amplitude.',
      'Explain why: a larger amplitude means a larger restoring force too, so the extra distance and the extra speed cancel out, keeping the period the same.',
      'Have the student predict the period for two different amplitudes on the same spring before confirming both are equal.',
      'Caution that this only holds for ideal SHM (e.g. small-angle pendulum) — connect to where the approximation breaks down at large angles.',
    ],
  },
  // ── Computer Science (Subject Library: computer_science) ─────────────────
  // primaryPatterns are node slugs from COMPUTER_SCIENCE_TREE
  // (subjectCatalog.ts), shaped `${moduleSlug}-${topic}`; detection is
  // subjectSlug-scoped, so these never collide with other subjects.
  {
    type: 'cs_binary_representation',
    label: 'Binary treated as a separate "computer-only" number system',
    description: 'Student thinks binary is fundamentally different arithmetic rather than the same base-10 quantity written in base 2, and assumes a negative binary number is just a decimal value with a minus sign prefixed rather than understanding two\'s complement.',
    primaryPatterns: ['foundations-binary-data-representation', 'foundations-what-is-a-computer'],
    remediationSteps: [
      'Convert the same small number (e.g. 13) to binary and back, showing it is the identical quantity in a different base, not a different kind of number.',
      'Use place-value columns (128/64/32/16/8/4/2/1) the same way decimal place value works, so the pattern is recognizable rather than memorized.',
      'Walk through two\'s complement on a small bit-width example to show why a sign bit alone is not how negative binary numbers actually work.',
      'Ask the student to predict the decimal value of a given bit pattern before checking, to surface the misconception directly.',
    ],
  },
  {
    type: 'cs_complexity_misconception',
    label: 'Big-O confused with actual runtime / line count',
    description: 'Student equates "more lines of code" or "more steps written down" with worse time complexity, or assumes an algorithm with smaller Big-O is always faster in practice regardless of input size and constant factors.',
    primaryPatterns: ['algorithms-algorithmic-complexity', 'algorithms-sorting-algorithms', 'algorithms-searching-algorithms'],
    remediationSteps: [
      'Count actual operations (comparisons/swaps) for the same algorithm on inputs of size 10 vs. 100 vs. 1000 to show growth rate, not code length, is what Big-O measures.',
      'Show a concrete case where an O(n²) algorithm with a tiny constant beats an O(n log n) algorithm for small n, then crosses over for large n.',
      'Have the student trace linear search vs. binary search by hand on the same sorted list and count comparisons, not lines of pseudocode.',
      'Ask: "If this algorithm takes 1 second for 1,000 items, roughly how long for 1,000,000?" using the stated complexity class to check the growth-rate understanding.',
    ],
  },
  {
    type: 'cs_data_structure_access',
    label: 'Data structure access costs and ordering confused',
    description: 'Student assumes a linked list has O(1) indexed access like an array, or confuses which end a stack (LIFO) vs. a queue (FIFO) adds/removes from.',
    primaryPatterns: ['data_structures-arrays', 'data_structures-linked-lists', 'data_structures-stacks-queues'],
    remediationSteps: [
      'Have the student physically trace pointer-hopping from the head of a linked list to reach the 5th element, counting each hop, and contrast with array[4] being a single jump.',
      'Use a stack of plates (only the top is reachable) vs. a line at a ticket counter (first in, first out) as the working analogy for stack vs. queue.',
      'Ask the student to predict the output order of a sequence of push/pop vs. enqueue/dequeue operations before checking.',
      'Build a table of operation costs (access, insert-at-front, insert-at-end) for array vs. linked list side by side.',
    ],
  },
  {
    type: 'cs_memory_hierarchy',
    label: 'RAM, cache, and storage treated as interchangeable "memory"',
    description: 'Student conflates RAM (fast, volatile, lost on power-off) with storage (slower, persistent), and thinks cache is just "extra storage" rather than a small, fast layer that exists purely to reduce average access time.',
    primaryPatterns: ['memory_storage-memory-hierarchy', 'memory_storage-cache', 'memory_storage-ram-vs-storage'],
    remediationSteps: [
      'Ask what happens to the contents of each (RAM, cache, disk/SSD) when the power is cut, to surface the volatile-vs-persistent distinction concretely.',
      'Draw the memory hierarchy as a pyramid by speed and size, and ask why the fastest layer (cache) is also the smallest.',
      'Use a desk-vs-filing-cabinet-vs-warehouse analogy: papers on the desk (cache/RAM) are fast to reach but limited in number; the warehouse (storage) holds everything but is slow to walk to.',
      'Give a scenario (closing an unsaved document vs. a saved file) and ask the student to identify which layer each lived in and why the outcome differs.',
    ],
  },
  {
    type: 'cs_networking_misconception',
    label: '"The Internet" and "the Web" conflated; packet routing misunderstood',
    description: 'Student treats "the Internet" and "the World Wide Web" as the same thing, or believes a message travels from sender to receiver as one intact unit along a single fixed path rather than being split into independently-routed packets.',
    primaryPatterns: ['networking-networks-packets', 'networking-routers-protocols', 'networking-the-internet'],
    remediationSteps: [
      'Clarify the layering explicitly: the Internet is the underlying network of networks; the Web (HTTP/browsers) is one application that runs on top of it, alongside email, video calls, etc.',
      'Trace a single message being broken into multiple packets, each independently routed (possibly via different paths) and reassembled at the destination.',
      'Use a postal analogy: splitting a long letter into several postcards, each separately addressed and possibly carried by different routes, then reordered on arrival.',
      'Ask the student to distinguish bandwidth (how much data per second) from latency (how long one packet takes to arrive) with a concrete example of each.',
    ],
  },
  {
    type: 'cs_process_concurrency',
    label: 'Concurrency on a single core assumed to be true simultaneity',
    description: 'Student believes multiple processes on a single-core CPU literally run at the exact same instant rather than being rapidly time-sliced, or conflates a "program" (the static code) with a "process" (a running instance of it).',
    primaryPatterns: ['operating_systems-processes', 'operating_systems-concurrency'],
    remediationSteps: [
      'Walk through a timeline showing the OS scheduler switching between processes in short time slices on a single core, so "running together" looks continuous but is actually interleaved.',
      'Contrast this explicitly with true parallelism on a multi-core CPU, where separate cores genuinely execute different processes at the same instant.',
      'Use the analogy of a single chef preparing multiple dishes by quickly switching between them, versus several chefs each cooking one dish at once.',
      'Ask the student to distinguish "the same program opened twice" (two processes, one program) from "two different programs running" to check the program-vs-process distinction.',
    ],
  },
]

// ── Signal lookback ───────────────────────────────────────────────────────────

const MISTAKE_LOOKBACK_DAYS = 30
const CHECKPOINT_LOOKBACK_DAYS = 14

// ── Helpers ───────────────────────────────────────────────────────────────────

export function matchesPatterns(topicSlug: string, patterns: string[]): boolean {
  return patterns.some((p) => topicSlug.includes(p))
}

export function toConfidence(evidenceCount: number): MisconceptionConfidence {
  if (evidenceCount >= 5) return 'HIGH'
  if (evidenceCount >= 3) return 'MEDIUM'
  return 'LOW'
}

// ── Core detection ────────────────────────────────────────────────────────────

/**
 * Detects active misconceptions for a chapter given its KG node IDs.
 * All DB queries are non-fatal. Returns results sorted by evidenceCount descending.
 */
export async function detectMisconceptions(
  userId: string,
  subjectSlug: string,
  kgNodeIds: string[],
  chapterId: string,
): Promise<Misconception[]> {
  if (kgNodeIds.length === 0) return []

  const since30 = new Date(Date.now() - MISTAKE_LOOKBACK_DAYS * 86400000)
  const since14 = new Date(Date.now() - CHECKPOINT_LOOKBACK_DAYS * 86400000)

  const [mistakeRows, checkpointRows] = await Promise.all([
    prisma.mistakeRecord.findMany({
      where: { userId, subjectSlug, topicSlug: { in: kgNodeIds }, createdAt: { gte: since30 } },
      select: { topicSlug: true },
    }).catch(() => [] as { topicSlug: string }[]),
    prisma.learningCheckpoint.findMany({
      where: {
        userId, subjectSlug, chapterId, passed: false,
        createdAt: { gte: since14 },
        kgNodeId: { in: kgNodeIds },
      },
      select: { kgNodeId: true },
    }).catch(() => [] as { kgNodeId: string | null }[]),
  ])

  if (mistakeRows.length === 0 && checkpointRows.length === 0) return []

  const mistakeTopics = mistakeRows.map((r) => r.topicSlug)
  const failedCheckpointNodes = checkpointRows
    .map((r) => r.kgNodeId)
    .filter((n): n is string => n !== null)

  const results: Misconception[] = []

  for (const rule of RULES) {
    // Count mistakes matching primary patterns
    const primaryMistakes = mistakeTopics.filter((t) => matchesPatterns(t, rule.primaryPatterns))
    if (primaryMistakes.length === 0) continue

    // Co-occurrence guard: require at least one secondary match
    if (rule.secondaryPatterns && rule.secondaryPatterns.length > 0) {
      const hasSecondary = mistakeTopics.some((t) => matchesPatterns(t, rule.secondaryPatterns!))
      if (!hasSecondary) continue
    }

    // Add checkpoint failure evidence (capped at 3 to avoid over-weighting)
    const checkpointEvidence = Math.min(
      failedCheckpointNodes.filter((n) => matchesPatterns(n, rule.primaryPatterns)).length,
      3,
    )

    const evidenceCount = primaryMistakes.length + checkpointEvidence
    results.push({
      type: rule.type,
      label: rule.label,
      description: rule.description,
      confidence: toConfidence(evidenceCount),
      evidenceCount,
      remediationSteps: rule.remediationSteps,
    })
  }

  return results.sort((a, b) => b.evidenceCount - a.evidenceCount)
}

/**
 * Public chapter-level API. Wrapper around detectMisconceptions — callers
 * that have kgNodeIds already can call detectMisconceptions directly.
 */
export async function getChapterMisconceptions(
  userId: string,
  _board: string,
  _grade: number,
  subjectSlug: string,
  chapterId: string,
  kgNodeIds: string[],
): Promise<Misconception[]> {
  return detectMisconceptions(userId, subjectSlug, kgNodeIds, chapterId)
}

// ── Tutor integration ─────────────────────────────────────────────────────────

/**
 * Builds the MISCONCEPTION ALERT system prompt block.
 * Only includes MEDIUM and HIGH confidence misconceptions.
 * Returns an empty string when there are no actionable misconceptions.
 */
export function buildMisconceptionBlock(misconceptions: Misconception[]): string {
  const actionable = misconceptions.filter((m) => m.confidence !== 'LOW')
  if (actionable.length === 0) return ''

  const lines: string[] = ['\n\nMISCONCEPTION ALERT']
  for (const m of actionable.slice(0, 2)) {
    lines.push(`Possible misconception (${m.confidence} confidence): ${m.description}`)
  }
  lines.push(
    'Tutor should: directly address the misunderstanding when it surfaces, use counterexamples, and verify understanding afterward. Do not reference this alert explicitly to the student.',
  )
  return lines.join('\n')
}

/**
 * Builds a targeted remediation guidance block for the tutor for a specific
 * misconception. The tutor should receive this to know HOW to repair the gap,
 * not just that a gap exists.
 */
export function buildRemediationStrategy(misconception: Misconception): string {
  const lines: string[] = [`\n\nREMEDIATION STRATEGY — ${misconception.label}`]
  for (const step of misconception.remediationSteps) {
    lines.push(`- ${step}`)
  }
  lines.push('Apply these strategies naturally — do not recite them as a list to the student.')
  return lines.join('\n')
}

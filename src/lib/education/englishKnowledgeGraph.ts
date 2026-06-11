// Master English Knowledge Graph

import type { KnowledgeNode } from './educationTypes'

export const ENGLISH_KNOWLEDGE_GRAPH: KnowledgeNode[] = [

  // ─── GRAMMAR ─────────────────────────────────────────────────

  { id: 'grammar.alphabet_phonics.sounds', domain: 'grammar.alphabet_phonics', title: 'Alphabet, Sounds and Phonics', description: 'Letter recognition, phonemic awareness, consonant and vowel sounds, blends and digraphs, syllabication', difficulty: 'foundational', prerequisites: [] },
  { id: 'grammar.parts_of_speech.nouns_pronouns', domain: 'grammar.parts_of_speech', title: 'Nouns and Pronouns', description: 'Types of nouns (common, proper, abstract, collective, countable, uncountable), pronouns — personal, possessive, reflexive, relative', difficulty: 'foundational', prerequisites: ['grammar.alphabet_phonics.sounds'] },
  { id: 'grammar.parts_of_speech.verbs', domain: 'grammar.parts_of_speech', title: 'Verbs — Forms and Uses', description: 'Main and auxiliary verbs, transitive and intransitive verbs, infinitives, gerunds, participles', difficulty: 'developing', prerequisites: ['grammar.parts_of_speech.nouns_pronouns'] },
  { id: 'grammar.parts_of_speech.adjectives_adverbs', domain: 'grammar.parts_of_speech', title: 'Adjectives and Adverbs', description: 'Types of adjectives, degrees of comparison; types and position of adverbs', difficulty: 'developing', prerequisites: ['grammar.parts_of_speech.nouns_pronouns'] },
  { id: 'grammar.parts_of_speech.prepositions_conjunctions', domain: 'grammar.parts_of_speech', title: 'Prepositions, Conjunctions and Interjections', description: 'Types of prepositions, coordinating and subordinating conjunctions, correlative conjunctions, interjections', difficulty: 'developing', prerequisites: ['grammar.parts_of_speech.adjectives_adverbs'] },
  { id: 'grammar.articles.usage', domain: 'grammar.articles', title: 'Articles — A, An and The', description: 'Indefinite articles (a, an) and the definite article (the); rules for a vs an; definite vs indefinite usage; omission of articles; common article errors', difficulty: 'foundational', prerequisites: ['grammar.parts_of_speech.nouns_pronouns'] },
  { id: 'grammar.sentences.types_structure', domain: 'grammar.sentences', title: 'Sentences — Types and Structure', description: 'Simple, compound, complex and compound-complex sentences; subject, predicate, object, complement; sentence transformation', difficulty: 'developing', prerequisites: ['grammar.parts_of_speech.verbs'] },
  { id: 'grammar.tenses.present_past', domain: 'grammar.tenses', title: 'Tenses — Present and Past', description: 'Simple, continuous, perfect and perfect continuous — present and past; formation rules and uses', difficulty: 'developing', prerequisites: ['grammar.parts_of_speech.verbs'] },
  { id: 'grammar.tenses.future_advanced', domain: 'grammar.tenses', title: 'Future Tenses and Tense Revision', description: 'Future simple, future continuous, future perfect; sequence of tenses; common tense errors', difficulty: 'proficient', prerequisites: ['grammar.tenses.present_past'] },
  { id: 'grammar.punctuation.basics', domain: 'grammar.punctuation', title: 'Punctuation and Capitalisation', description: 'Full stop, comma, question mark, exclamation mark, apostrophe, colon, semicolon, quotation marks, hyphen; capitalisation rules', difficulty: 'foundational', prerequisites: ['grammar.sentences.types_structure'] },
  { id: 'grammar.clauses_phrases.clause_types', domain: 'grammar.clauses_phrases', title: 'Clauses and Phrases', description: 'Main and subordinate clauses, noun clauses, adjective clauses, adverb clauses; participial, infinitive and gerund phrases', difficulty: 'proficient', prerequisites: ['grammar.sentences.types_structure'] },
  { id: 'grammar.voice.active_passive', domain: 'grammar.voice', title: 'Active and Passive Voice', description: 'Transformation of sentences from active to passive and vice versa across all tenses; impersonal passive; uses of passive', difficulty: 'proficient', prerequisites: ['grammar.tenses.future_advanced', 'grammar.sentences.types_structure'] },
  { id: 'grammar.narration.direct_indirect', domain: 'grammar.narration', title: 'Direct and Indirect Speech (Narration)', description: 'Conversion of direct speech to indirect and vice versa; changes in tense, pronoun, time and place expressions; reporting verbs', difficulty: 'proficient', prerequisites: ['grammar.tenses.future_advanced'] },
  { id: 'grammar.conditionals.types', domain: 'grammar.conditionals', title: 'Conditionals', description: 'Zero, first, second, third and mixed conditionals; if clauses; wish sentences; unless, provided that', difficulty: 'proficient', prerequisites: ['grammar.tenses.future_advanced'] },
  { id: 'grammar.modals.usage', domain: 'grammar.modals', title: 'Modal Verbs', description: 'Can, could, may, might, shall, should, will, would, must, ought to, need, dare — meanings and uses in context', difficulty: 'developing', prerequisites: ['grammar.parts_of_speech.verbs'] },

  // ─── VOCABULARY ──────────────────────────────────────────────

  { id: 'vocabulary.basic_words.everyday', domain: 'vocabulary.basic_words', title: 'Basic Everyday Vocabulary', description: 'Common words for family, home, school, food, animals, places, weather, numbers, colours, days and months', difficulty: 'foundational', prerequisites: ['grammar.alphabet_phonics.sounds'] },
  { id: 'vocabulary.word_formation.affixes', domain: 'vocabulary.word_formation', title: 'Word Formation — Prefixes and Suffixes', description: 'Common prefixes (un-, dis-, re-, pre-, mis-), suffixes (-tion, -ness, -ful, -less, -ment, -ly); compound words; conversion between parts of speech', difficulty: 'developing', prerequisites: ['vocabulary.basic_words.everyday'] },
  { id: 'vocabulary.synonyms_antonyms.relationships', domain: 'vocabulary.synonyms_antonyms', title: 'Synonyms, Antonyms and Word Relationships', description: 'Synonyms, antonyms, homophones, homonyms, one-word substitution, words often confused', difficulty: 'developing', prerequisites: ['vocabulary.basic_words.everyday'] },
  { id: 'vocabulary.idioms_phrases.fixed_expressions', domain: 'vocabulary.idioms_phrases', title: 'Idioms, Proverbs and Phrases', description: 'Common idioms, proverbs and their meanings; phrasal verbs; colloquial expressions', difficulty: 'proficient', prerequisites: ['vocabulary.synonyms_antonyms.relationships'] },
  { id: 'vocabulary.academic.subject_specific', domain: 'vocabulary.academic', title: 'Academic and Subject-Specific Vocabulary', description: 'Formal register, academic word list, discipline-specific terminology, Greek and Latin roots', difficulty: 'advanced', prerequisites: ['vocabulary.word_formation.affixes'] },

  // ─── READING ─────────────────────────────────────────────────

  { id: 'reading.comprehension_basic.main_idea', domain: 'reading.comprehension_basic', title: 'Basic Reading Comprehension', description: 'Identifying main idea and supporting details, answering factual questions, sequencing events', difficulty: 'foundational', prerequisites: ['grammar.sentences.types_structure'] },
  { id: 'reading.comprehension_advanced.inference', domain: 'reading.comprehension_advanced', title: 'Advanced Reading Comprehension', description: 'Making inferences, drawing conclusions, understanding implied meaning, author\'s purpose and tone, critical reading', difficulty: 'proficient', prerequisites: ['reading.comprehension_basic.main_idea'] },
  { id: 'reading.strategies.skim_scan', domain: 'reading.strategies', title: 'Reading Strategies', description: 'Skimming for gist, scanning for specific information, SQ3R method, annotating, note-taking while reading', difficulty: 'developing', prerequisites: ['reading.comprehension_basic.main_idea'] },
  { id: 'reading.literary_analysis.elements', domain: 'reading.literary_analysis', title: 'Literary Analysis', description: 'Plot, character, setting, conflict, theme, point of view, mood and tone, symbolism; analysing prose and poetry', difficulty: 'advanced', prerequisites: ['reading.comprehension_advanced.inference'] },

  // ─── WRITING ─────────────────────────────────────────────────

  { id: 'writing.sentences_paragraphs.basics', domain: 'writing.sentences_paragraphs', title: 'Sentences and Paragraph Writing', description: 'Writing correct sentences, topic sentence, supporting sentences, concluding sentence, paragraph unity and coherence', difficulty: 'developing', prerequisites: ['grammar.punctuation.basics'] },
  { id: 'writing.essay_types.descriptive_narrative', domain: 'writing.essay_types', title: 'Descriptive and Narrative Essays', description: 'Essay structure (introduction, body, conclusion), descriptive writing techniques, narrative techniques, transition words', difficulty: 'developing', prerequisites: ['writing.sentences_paragraphs.basics'] },
  { id: 'writing.essay_types.expository_argumentative', domain: 'writing.essay_types', title: 'Expository and Argumentative Essays', description: 'Thesis statement, evidence and reasoning, counter-arguments, refutation; analytical and comparative essays', difficulty: 'advanced', prerequisites: ['writing.essay_types.descriptive_narrative'] },
  { id: 'writing.formal_informal.letters', domain: 'writing.formal_informal', title: 'Letter, Application and Report Writing', description: 'Format of formal and informal letters, job applications, complaint letters; report writing; notice and message', difficulty: 'proficient', prerequisites: ['writing.sentences_paragraphs.basics'] },
  { id: 'writing.formal_informal.advanced', domain: 'writing.formal_informal', title: 'Advanced Formal Writing', description: 'Email writing, minutes of meetings, press release, speech writing, debate writing, analytical paragraph', difficulty: 'advanced', prerequisites: ['writing.formal_informal.letters'] },
  { id: 'writing.creative.story_poem', domain: 'writing.creative', title: 'Creative Writing — Stories and Poems', description: 'Story writing using prompts, dialogue writing, writing poems (rhyming and free verse), descriptive imagery, sensory details', difficulty: 'proficient', prerequisites: ['writing.essay_types.descriptive_narrative'] },

  // ─── COMMUNICATION ────────────────────────────────────────────

  { id: 'communication.speaking.pronunciation', domain: 'communication.speaking', title: 'Speaking — Pronunciation and Fluency', description: 'Correct pronunciation, stress and intonation, clarity, pace; oral responses; picture description; role play', difficulty: 'developing', prerequisites: ['grammar.alphabet_phonics.sounds'] },
  { id: 'communication.listening.comprehension', domain: 'communication.listening', title: 'Listening Comprehension', description: 'Listening for gist and detail, identifying speaker\'s purpose, note-taking from spoken text, following instructions', difficulty: 'developing', prerequisites: ['communication.speaking.pronunciation'] },
  { id: 'communication.debate.discussion', domain: 'communication.debate', title: 'Debate, Discussion and Presentation', description: 'Group discussion norms, giving and supporting opinions, debate structure, presentation skills, interview techniques', difficulty: 'advanced', prerequisites: ['communication.listening.comprehension', 'writing.essay_types.expository_argumentative'] },

  // ─── LITERATURE ──────────────────────────────────────────────

  { id: 'literature.prose.stories', domain: 'literature.prose', title: 'Prose — Stories and Essays', description: 'Reading and analysing short stories, biographies, essays from prescribed textbooks; themes, characters, author\'s message', difficulty: 'developing', prerequisites: ['reading.comprehension_basic.main_idea'] },
  { id: 'literature.prose.advanced', domain: 'literature.prose', title: 'Prose — Advanced Analysis', description: 'Novels and longer prose texts; stylistic devices in prose; critical appreciation; comparison of texts', difficulty: 'advanced', prerequisites: ['literature.prose.stories', 'reading.literary_analysis.elements'] },
  { id: 'literature.poetry.basic', domain: 'literature.poetry', title: 'Poetry — Reading and Appreciation', description: 'Reading poems from textbook; rhyme scheme, rhythm, stanza; poetic devices: simile, metaphor, personification, alliteration, onomatopoeia', difficulty: 'developing', prerequisites: ['reading.comprehension_basic.main_idea'] },
  { id: 'literature.poetry.advanced', domain: 'literature.poetry', title: 'Poetry — Advanced Analysis', description: 'Theme and central idea, tone and mood, symbolism and imagery in poetry; critical appreciation of unseen poems', difficulty: 'advanced', prerequisites: ['literature.poetry.basic', 'reading.literary_analysis.elements'] },
  { id: 'literature.drama.plays', domain: 'literature.drama', title: 'Drama — Reading and Analysis', description: 'Structure of a play (acts and scenes), dramatic conventions, character analysis, dramatic irony, stagecraft', difficulty: 'advanced', prerequisites: ['literature.prose.advanced'] },
]

export function getEnglishNode(id: string): KnowledgeNode | undefined {
  return ENGLISH_KNOWLEDGE_GRAPH.find((n) => n.id === id)
}

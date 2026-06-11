import type { BoardSubjectCatalog } from './educationTypes'

/**
 * CBSE English — grades 5-12 (Sprint AW).
 *
 * UNLIKE UP_ENGLISH_CATALOG (which is organised around skills — grammar,
 * vocabulary, comprehension, writing — as discrete chapters), CBSE English
 * is organised around the NCERT-prescribed reader textbooks. Each grade has
 * a Main Reader and a Supplementary Reader, and the literature chapters below
 * follow those readers:
 *
 *   Grade 5  — Marigold (primary-stage NCERT reader)
 *   Grade 6  — Honeysuckle (Main) + A Pact with the Sun (Supplementary)
 *   Grade 7  — Honeycomb (Main) + An Alien Hand (Supplementary)
 *   Grade 8  — Honeydew (Main) + It So Happened (Supplementary)
 *   Grade 9  — Beehive (Main) + Moments (Supplementary)
 *   Grade 10 — First Flight (Main) + Footprints Without Feet (Supplementary)
 *   Grade 11 — Hornbill (Main) + Snapshots (Supplementary)
 *   Grade 12 — Flamingo (Main) + Vistas (Supplementary)
 *
 * Because the KG models GENRES/SKILLS (literature.prose.stories,
 * literature.poetry.basic, etc.) rather than individual stories or poems,
 * multiple short reader pieces that map to the same KG node are grouped into
 * a single catalog chapter (e.g. "Honeysuckle — 'X' and 'Y' (poem)"). This
 * keeps chapter density comparable to cbseMathCatalog / cbseScienceCatalog /
 * cbseSocialScienceCatalog while still surfacing the real reader content.
 *
 * literature.prose.stories vs literature.prose.advanced and
 * literature.poetry.basic vs literature.poetry.advanced follow the same
 * grade-11-vs-12 boundary used by UP_ENGLISH_CATALOG (Hornbill/Snapshots are
 * "stories"/"basic"; Flamingo/Vistas are "advanced"). literature.drama.plays
 * is mapped to the two CBSE-prescribed dramatic texts: "The Proposal"
 * (Class 10, First Flight) and "The Tale of Melon City" (Class 11,
 * Snapshots).
 *
 * Alongside the reader-based chapters, each grade also has the
 * grammar / vocabulary / reading / writing / speaking-listening "skill"
 * chapters that make up the rest of the CBSE English syllabus and exam
 * paper (Section A/B "Writing and Grammar" + "Literature" sections). These
 * mirror UP_ENGLISH_CATALOG's skill progression so the same KG nodes are
 * exercised at comparable grades.
 *
 * Every kgNodeId references an EXISTING node in englishKnowledgeGraph.ts —
 * verified by coverageAudit.findUnmappedChapters (Sprint AW audit).
 *
 * Maintenance note: NCERT periodically rationalises reader contents (chapters
 * are added/removed between print runs), and the NCF-2023 rollout is expected
 * to eventually replace the "Honeysuckle/Honeycomb/..." reader series at the
 * lower grades. Re-verify the chapter list against the official CBSE
 * curriculum/syllabus document each academic year.
 */
export const CBSE_ENGLISH_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'english',
  subjectName: 'English',
  grades: [
    {
      grade: 5,
      // Class 5 uses Marigold, the primary-stage NCERT reader; skill chapters
      // mirror UP's grade-5 framing.
      chapters: [
        { id: 'cbse.eng.5.ch1', order: 1, title: 'Marigold — "Ice-Cream Man" and "Wonderful Waste!"', kgNodeIds: ['literature.poetry.basic', 'literature.prose.stories'] },
        { id: 'cbse.eng.5.ch2', order: 2, title: 'Marigold — "Teamwork" and "Flying Together"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.5.ch3', order: 3, title: 'Marigold — "Robinson Crusoe Discovers a Footprint"', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.5.ch4', order: 4, title: 'Marigold — "My Shadow" and Other Poems', kgNodeIds: ['literature.poetry.basic'] },
        { id: 'cbse.eng.5.ch5', order: 5, title: 'Nouns and Pronouns', kgNodeIds: ['grammar.parts_of_speech.nouns_pronouns'] },
        { id: 'cbse.eng.5.ch6', order: 6, title: 'Adjectives — Describing Words', kgNodeIds: ['grammar.parts_of_speech.adjectives_adverbs'] },
        { id: 'cbse.eng.5.ch7', order: 7, title: 'Simple Sentences and Punctuation', kgNodeIds: ['grammar.sentences.types_structure', 'grammar.punctuation.basics'] },
        { id: 'cbse.eng.5.ch8', order: 8, title: 'Articles — A, An and The', kgNodeIds: ['grammar.articles.usage'] },
        { id: 'cbse.eng.5.ch9', order: 9, title: 'Vocabulary — Words from Marigold', kgNodeIds: ['vocabulary.basic_words.everyday'] },
        { id: 'cbse.eng.5.ch10', order: 10, title: 'Reading Short Passages', kgNodeIds: ['reading.comprehension_basic.main_idea'] },
        { id: 'cbse.eng.5.ch11', order: 11, title: 'Writing Simple Sentences and Paragraphs', kgNodeIds: ['writing.sentences_paragraphs.basics'] },
        { id: 'cbse.eng.5.ch12', order: 12, title: 'Listening and Speaking — Sounds and Pronunciation', kgNodeIds: ['grammar.alphabet_phonics.sounds', 'communication.speaking.pronunciation'] },
      ],
    },
    {
      grade: 6,
      chapters: [
        { id: 'cbse.eng.6.ch1', order: 1, title: 'Honeysuckle — "Who Did Patrick\'s Homework?" and "A House, A Home"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.6.ch2', order: 2, title: 'Honeysuckle — "How the Dog Found Himself a New Master!" and "The Kite"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.6.ch3', order: 3, title: 'Honeysuckle — "Taro\'s Reward" and "The Quarrel"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.6.ch4', order: 4, title: 'Honeysuckle — "Kalpana Chawla: An Indian-American Woman in Space" and "Beauty"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.6.ch5', order: 5, title: 'Honeysuckle — "A Different Kind of School" and "Where Do All the Teachers Go?"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.6.ch6', order: 6, title: 'Honeysuckle — "Who I Am", "Fair Play" and "A Game of Chance"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.6.ch7', order: 7, title: 'A Pact with the Sun — Folk Tales (A Tale of Two Birds, The Friendly Mongoose, The Shepherd\'s Treasure)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.6.ch8', order: 8, title: 'A Pact with the Sun — Tales of Wonder (Tansen, The Wonder Called Sleep, A Pact with the Sun)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.6.ch9', order: 9, title: 'Grammar — Nouns, Pronouns and Determiners', kgNodeIds: ['grammar.parts_of_speech.nouns_pronouns'] },
        { id: 'cbse.eng.6.ch10', order: 10, title: 'Grammar — Verbs and the Present Tense', kgNodeIds: ['grammar.parts_of_speech.verbs', 'grammar.tenses.present_past'] },
        { id: 'cbse.eng.6.ch11', order: 11, title: 'Grammar — Adjectives, Adverbs and Degrees of Comparison', kgNodeIds: ['grammar.parts_of_speech.adjectives_adverbs'] },
        { id: 'cbse.eng.6.ch12', order: 12, title: 'Grammar — Punctuation and Articles', kgNodeIds: ['grammar.punctuation.basics', 'grammar.articles.usage'] },
        { id: 'cbse.eng.6.ch13', order: 13, title: 'Vocabulary — Synonyms, Antonyms and Word Formation', kgNodeIds: ['vocabulary.synonyms_antonyms.relationships', 'vocabulary.word_formation.affixes'] },
        { id: 'cbse.eng.6.ch14', order: 14, title: 'Writing — Paragraph and Picture Composition', kgNodeIds: ['writing.sentences_paragraphs.basics'] },
        { id: 'cbse.eng.6.ch15', order: 15, title: 'Speaking and Listening Skills', kgNodeIds: ['communication.speaking.pronunciation', 'communication.listening.comprehension'] },
      ],
    },
    {
      grade: 7,
      chapters: [
        { id: 'cbse.eng.7.ch1', order: 1, title: 'Honeycomb — "Three Questions" and "The Squirrel"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.7.ch2', order: 2, title: 'Honeycomb — "A Gift of Chappals" and "The Rebel"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.7.ch3', order: 3, title: 'Honeycomb — "Gopal and the Hilsa Fish" and "The Shed"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.7.ch4', order: 4, title: 'Honeycomb — "The Ashes That Made Trees Bloom" and "Chivvy"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.7.ch5', order: 5, title: 'Honeycomb — "Quality" and "Trees"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.7.ch6', order: 6, title: 'Honeycomb — "Expert Detectives" and "Mystery of the Talking Fan"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.7.ch7', order: 7, title: 'Honeycomb — "The Invention of Vita-Wonk" and "Dad and the Cat and the Tree"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.7.ch8', order: 8, title: 'Honeycomb — "Fire: Friend and Foe", "A Bicycle in Good Repair" and "The Story of Cricket"', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.7.ch9', order: 9, title: 'An Alien Hand — Animal Stories (The Tiny Teacher, Bringing Up Kari, The Desert, A Tiger in the House)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.7.ch10', order: 10, title: 'An Alien Hand — Tales of Imagination (The Cop and the Anthem, Golu Grows a Nose, I Want Something in a Cage, Chandni, The Bear Story, An Alien Hand)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.7.ch11', order: 11, title: 'Grammar — Past and Future Tenses', kgNodeIds: ['grammar.tenses.present_past', 'grammar.tenses.future_advanced'] },
        { id: 'cbse.eng.7.ch12', order: 12, title: 'Grammar — Modals, Prepositions and Conjunctions', kgNodeIds: ['grammar.modals.usage', 'grammar.parts_of_speech.prepositions_conjunctions'] },
        { id: 'cbse.eng.7.ch13', order: 13, title: 'Grammar — Clauses and Sentence Transformation', kgNodeIds: ['grammar.clauses_phrases.clause_types', 'grammar.sentences.types_structure'] },
        { id: 'cbse.eng.7.ch14', order: 14, title: 'Vocabulary — Idioms and Phrases', kgNodeIds: ['vocabulary.idioms_phrases.fixed_expressions'] },
        { id: 'cbse.eng.7.ch15', order: 15, title: 'Writing — Descriptive Paragraphs and Informal Letters', kgNodeIds: ['writing.essay_types.descriptive_narrative', 'writing.formal_informal.letters'] },
        { id: 'cbse.eng.7.ch16', order: 16, title: 'Reading — Comprehension and Reading Strategies', kgNodeIds: ['reading.comprehension_basic.main_idea', 'reading.strategies.skim_scan'] },
      ],
    },
    {
      grade: 8,
      chapters: [
        { id: 'cbse.eng.8.ch1', order: 1, title: 'Honeydew — "The Best Christmas Present in the World" and "The Ant and the Cricket"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.8.ch2', order: 2, title: 'Honeydew — "The Tsunami" and "Geography Lesson"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.8.ch3', order: 3, title: 'Honeydew — "Glimpses of the Past" and "Macavity: The Mystery Cat"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.8.ch4', order: 4, title: 'Honeydew — "Bepin Choudhury\'s Lapse of Memory" and "The Last Bargain"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.8.ch5', order: 5, title: 'Honeydew — "The Summit Within" and "The School Boy"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.8.ch6', order: 6, title: 'Honeydew — "This is Jody\'s Fawn" and "The Duck and the Kangaroo"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.8.ch7', order: 7, title: 'Honeydew — "A Visit to Cambridge" and "When I Set Out for Lyonnesse"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.8.ch8', order: 8, title: 'Honeydew — "A Short Monsoon Diary", "The Great Stone Face — I & II" and "On the Grasshopper and Cricket"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.8.ch9', order: 9, title: 'It So Happened — Folk Tales (How the Camel Got His Hump, The Selfish Giant, The Open Window)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.8.ch10', order: 10, title: 'It So Happened — Stories of Courage (Children at Work, The Treasure Within, Princess September, The Fight, Jalebis, The Comet — I & II)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.8.ch11', order: 11, title: 'Grammar — Perfect Tenses', kgNodeIds: ['grammar.tenses.present_past'] },
        { id: 'cbse.eng.8.ch12', order: 12, title: 'Grammar — Active and Passive Voice', kgNodeIds: ['grammar.voice.active_passive'] },
        { id: 'cbse.eng.8.ch13', order: 13, title: 'Grammar — Direct and Indirect Speech', kgNodeIds: ['grammar.narration.direct_indirect'] },
        { id: 'cbse.eng.8.ch14', order: 14, title: 'Grammar — Clauses: Main and Subordinate', kgNodeIds: ['grammar.clauses_phrases.clause_types'] },
        { id: 'cbse.eng.8.ch15', order: 15, title: 'Vocabulary — Synonyms and One-Word Substitution', kgNodeIds: ['vocabulary.synonyms_antonyms.relationships'] },
        { id: 'cbse.eng.8.ch16', order: 16, title: 'Reading — Unseen Comprehension Passages', kgNodeIds: ['reading.comprehension_basic.main_idea'] },
        { id: 'cbse.eng.8.ch17', order: 17, title: 'Writing — Narrative and Descriptive Essays', kgNodeIds: ['writing.essay_types.descriptive_narrative'] },
        { id: 'cbse.eng.8.ch18', order: 18, title: 'Writing — Formal Letters and Notices', kgNodeIds: ['writing.formal_informal.letters'] },
        { id: 'cbse.eng.8.ch19', order: 19, title: 'Listening Comprehension', kgNodeIds: ['communication.listening.comprehension'] },
        { id: 'cbse.eng.8.ch20', order: 20, title: 'Creative Writing — Story Writing', kgNodeIds: ['writing.creative.story_poem'] },
      ],
    },
    {
      grade: 9,
      chapters: [
        { id: 'cbse.eng.9.ch1', order: 1, title: 'Beehive — "The Fun They Had" and "The Road Not Taken"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.9.ch2', order: 2, title: 'Beehive — "The Sound of Music" and "Wind"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.9.ch3', order: 3, title: 'Beehive — "The Little Girl" and "Rain on the Roof"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.9.ch4', order: 4, title: 'Beehive — "A Truly Beautiful Mind" and "The Lake Isle of Innisfree"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.9.ch5', order: 5, title: 'Beehive — "The Snake and the Mirror" and "A Legend of the Northland"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.9.ch6', order: 6, title: 'Beehive — "My Childhood" and "No Men Are Foreign"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.9.ch7', order: 7, title: 'Beehive — "Packing", "Reach for the Top", "The Bond of Love", "Kathmandu" and "If I Were You"', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.9.ch8', order: 8, title: 'Moments — Tales of Childhood and Friendship (The Lost Child, The Adventures of Toto, Iswaran the Storyteller, A House Is Not a Home)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.9.ch9', order: 9, title: 'Moments — Tales of Wisdom and Resilience (In the Kingdom of Fools, The Happy Prince, Weathering the Storm in Ersama, The Last Leaf, The Beggar)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.9.ch10', order: 10, title: 'Grammar — Tense Revision and Modals', kgNodeIds: ['grammar.tenses.future_advanced', 'grammar.modals.usage'] },
        { id: 'cbse.eng.9.ch11', order: 11, title: 'Grammar — Active/Passive Voice and Reported Speech', kgNodeIds: ['grammar.voice.active_passive', 'grammar.narration.direct_indirect'] },
        { id: 'cbse.eng.9.ch12', order: 12, title: 'Grammar — Conditional Sentences', kgNodeIds: ['grammar.conditionals.types'] },
        { id: 'cbse.eng.9.ch13', order: 13, title: 'Grammar — Clauses and Phrases (Advanced)', kgNodeIds: ['grammar.clauses_phrases.clause_types'] },
        { id: 'cbse.eng.9.ch14', order: 14, title: 'Vocabulary — Word Formation, Synonyms and Antonyms', kgNodeIds: ['vocabulary.word_formation.affixes', 'vocabulary.synonyms_antonyms.relationships'] },
        { id: 'cbse.eng.9.ch15', order: 15, title: 'Reading — Unseen Comprehension and Note-Making', kgNodeIds: ['reading.comprehension_advanced.inference', 'reading.strategies.skim_scan'] },
        { id: 'cbse.eng.9.ch16', order: 16, title: 'Writing — Descriptive and Expository Essays', kgNodeIds: ['writing.essay_types.descriptive_narrative', 'writing.essay_types.expository_argumentative'] },
        { id: 'cbse.eng.9.ch17', order: 17, title: 'Writing — Letters and Applications', kgNodeIds: ['writing.formal_informal.letters'] },
        { id: 'cbse.eng.9.ch18', order: 18, title: 'Creative Writing — Story and Diary Entry', kgNodeIds: ['writing.creative.story_poem'] },
        { id: 'cbse.eng.9.ch19', order: 19, title: 'Speaking and Listening Skills', kgNodeIds: ['communication.speaking.pronunciation', 'communication.listening.comprehension'] },
      ],
    },
    {
      grade: 10,
      chapters: [
        { id: 'cbse.eng.10.ch1', order: 1, title: 'First Flight — "A Letter to God" and "Dust of Snow"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.10.ch2', order: 2, title: 'First Flight — "Nelson Mandela: Long Walk to Freedom" and "Fire and Ice"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.10.ch3', order: 3, title: 'First Flight — "Two Stories About Flying" and "A Tiger in the Zoo"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.10.ch4', order: 4, title: 'First Flight — "From the Diary of Anne Frank" and "How to Tell Wild Animals"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.10.ch5', order: 5, title: 'First Flight — "The Hundred Dresses — I & II" and "The Ball Poem"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.10.ch6', order: 6, title: 'First Flight — "Glimpses of India" and "Amanda!"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.10.ch7', order: 7, title: 'First Flight — "Mijbil the Otter" and "The Trees"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.10.ch8', order: 8, title: 'First Flight — "Madam Rides the Bus" and "Fog"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.10.ch9', order: 9, title: 'First Flight — "The Sermon at Benares" and "For Anne Gregory"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.basic'] },
        { id: 'cbse.eng.10.ch10', order: 10, title: 'First Flight — "The Proposal" (Play)', kgNodeIds: ['literature.drama.plays'] },
        { id: 'cbse.eng.10.ch11', order: 11, title: 'Footprints Without Feet — Crime and Mystery (A Triumph of Surgery, The Thief\'s Story, The Midnight Visitor, A Question of Trust)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.10.ch12', order: 12, title: 'Footprints Without Feet — Courage and Determination (Footprints Without Feet, The Making of a Scientist, The Necklace, Bholi, The Book That Saved the Earth)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.10.ch13', order: 13, title: 'Grammar — Comprehensive Revision: Voice and Narration', kgNodeIds: ['grammar.voice.active_passive', 'grammar.narration.direct_indirect'] },
        { id: 'cbse.eng.10.ch14', order: 14, title: 'Grammar — Modals and Conditionals', kgNodeIds: ['grammar.modals.usage', 'grammar.conditionals.types'] },
        { id: 'cbse.eng.10.ch15', order: 15, title: 'Grammar — Editing and Error Correction', kgNodeIds: ['grammar.sentences.types_structure', 'grammar.punctuation.basics', 'grammar.articles.usage'] },
        { id: 'cbse.eng.10.ch16', order: 16, title: 'Vocabulary — Word Power: Idioms and Word Formation', kgNodeIds: ['vocabulary.idioms_phrases.fixed_expressions', 'vocabulary.word_formation.affixes'] },
        { id: 'cbse.eng.10.ch17', order: 17, title: 'Reading — Unseen Passages: Prose and Poetry', kgNodeIds: ['reading.comprehension_advanced.inference', 'reading.literary_analysis.elements'] },
        { id: 'cbse.eng.10.ch18', order: 18, title: 'Writing — Argumentative and Analytical Essays', kgNodeIds: ['writing.essay_types.expository_argumentative'] },
        { id: 'cbse.eng.10.ch19', order: 19, title: 'Writing — Formal Letters, Reports and Notices', kgNodeIds: ['writing.formal_informal.letters'] },
        { id: 'cbse.eng.10.ch20', order: 20, title: 'Speaking and Listening Skills', kgNodeIds: ['communication.speaking.pronunciation', 'communication.listening.comprehension'] },
      ],
    },
    {
      grade: 11,
      chapters: [
        { id: 'cbse.eng.11.ch1', order: 1, title: 'Hornbill — "The Portrait of a Lady" and "A Photograph"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.11.ch2', order: 2, title: 'Hornbill — "We\'re Not Afraid to Die... if We Can All Be Together" and "The Laburnum Top"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.11.ch3', order: 3, title: 'Hornbill — "Discovering Tut: the Saga Continues" and "The Voice of the Rain"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.11.ch4', order: 4, title: 'Hornbill — "Landscape of the Soul" and "Childhood"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.11.ch5', order: 5, title: 'Hornbill — "The Ailing Planet: the Green Movement\'s Role" and "Father to Son"', kgNodeIds: ['literature.prose.stories', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.11.ch6', order: 6, title: 'Hornbill — "The Browning Version"', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.11.ch7', order: 7, title: 'Hornbill — "The Adventure"', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.11.ch8', order: 8, title: 'Hornbill — "Silk Road"', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.11.ch9', order: 9, title: 'Snapshots — Coming-of-Age Stories (The Summer of the Beautiful White Horse, Ranga\'s Marriage, Albert Einstein at School)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.11.ch10', order: 10, title: 'Snapshots — Reflections on Life and Loss (The Address, Mother\'s Day, The Ghat of the Only World, Birth)', kgNodeIds: ['literature.prose.stories'] },
        { id: 'cbse.eng.11.ch11', order: 11, title: 'Snapshots — "The Tale of Melon City" (Verse Play)', kgNodeIds: ['literature.drama.plays'] },
        { id: 'cbse.eng.11.ch12', order: 12, title: 'Grammar — Advanced Clauses and Sentence Structures', kgNodeIds: ['grammar.clauses_phrases.clause_types'] },
        { id: 'cbse.eng.11.ch13', order: 13, title: 'Reading — Factual and Discursive Comprehension', kgNodeIds: ['reading.comprehension_advanced.inference', 'reading.strategies.skim_scan'] },
        { id: 'cbse.eng.11.ch14', order: 14, title: 'Reading — Note-Making and Summarising', kgNodeIds: ['reading.strategies.skim_scan'] },
        { id: 'cbse.eng.11.ch15', order: 15, title: 'Writing — Factual Description, Notice and Process', kgNodeIds: ['writing.essay_types.descriptive_narrative'] },
        { id: 'cbse.eng.11.ch16', order: 16, title: 'Writing — Analytical Paragraph, Report and Article', kgNodeIds: ['writing.formal_informal.letters', 'writing.formal_informal.advanced'] },
        { id: 'cbse.eng.11.ch17', order: 17, title: 'Vocabulary — Academic Vocabulary and Word Study', kgNodeIds: ['vocabulary.academic.subject_specific'] },
        { id: 'cbse.eng.11.ch18', order: 18, title: 'Literary Analysis — Elements of Fiction and Poetry', kgNodeIds: ['reading.literary_analysis.elements'] },
        { id: 'cbse.eng.11.ch19', order: 19, title: 'Debate, Discussion and Presentation', kgNodeIds: ['communication.debate.discussion'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'cbse.eng.12.ch1', order: 1, title: 'Flamingo — "The Last Lesson" and "My Mother at Sixty-six"', kgNodeIds: ['literature.prose.advanced', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.12.ch2', order: 2, title: 'Flamingo — "Lost Spring" and "An Elementary School Classroom in a Slum"', kgNodeIds: ['literature.prose.advanced', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.12.ch3', order: 3, title: 'Flamingo — "Deep Water" and "Keeping Quiet"', kgNodeIds: ['literature.prose.advanced', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.12.ch4', order: 4, title: 'Flamingo — "The Rattrap" and "A Thing of Beauty"', kgNodeIds: ['literature.prose.advanced', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.12.ch5', order: 5, title: 'Flamingo — "Indigo" and "A Roadside Stand"', kgNodeIds: ['literature.prose.advanced', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.12.ch6', order: 6, title: 'Flamingo — "Poets and Pancakes" and "Aunt Jennifer\'s Tigers"', kgNodeIds: ['literature.prose.advanced', 'literature.poetry.advanced'] },
        { id: 'cbse.eng.12.ch7', order: 7, title: 'Flamingo — "The Interview"', kgNodeIds: ['literature.prose.advanced'] },
        { id: 'cbse.eng.12.ch8', order: 8, title: 'Flamingo — "Going Places"', kgNodeIds: ['literature.prose.advanced'] },
        { id: 'cbse.eng.12.ch9', order: 9, title: 'Vistas — Adventure and Journey Stories (The Third Level, The Tiger King, Journey to the End of the Earth)', kgNodeIds: ['literature.prose.advanced'] },
        { id: 'cbse.eng.12.ch10', order: 10, title: 'Vistas — Moral Dilemmas and Human Nature (The Enemy, Should Wizard Hit Mommy, On the Face of It)', kgNodeIds: ['literature.prose.advanced'] },
        { id: 'cbse.eng.12.ch11', order: 11, title: 'Vistas — Memoir and Satire (Evans Tries an O-Level, Memories of Childhood)', kgNodeIds: ['literature.prose.advanced'] },
        { id: 'cbse.eng.12.ch12', order: 12, title: 'Grammar — Editing and Omission (Comprehensive Revision)', kgNodeIds: ['grammar.voice.active_passive', 'grammar.narration.direct_indirect', 'grammar.conditionals.types'] },
        { id: 'cbse.eng.12.ch13', order: 13, title: 'Reading — Unseen Prose Passages', kgNodeIds: ['reading.comprehension_advanced.inference'] },
        { id: 'cbse.eng.12.ch14', order: 14, title: 'Reading — Unseen Poetry and Appreciation', kgNodeIds: ['literature.poetry.advanced', 'reading.literary_analysis.elements'] },
        { id: 'cbse.eng.12.ch15', order: 15, title: 'Literary Analysis — Advanced Prose and Poetry', kgNodeIds: ['literature.prose.advanced', 'literature.poetry.advanced', 'reading.literary_analysis.elements'] },
        { id: 'cbse.eng.12.ch16', order: 16, title: 'Writing — Argumentative Essay', kgNodeIds: ['writing.essay_types.expository_argumentative'] },
        { id: 'cbse.eng.12.ch17', order: 17, title: 'Writing — Speech, Debate and Email', kgNodeIds: ['writing.formal_informal.advanced', 'communication.debate.discussion'] },
        { id: 'cbse.eng.12.ch18', order: 18, title: 'Academic Writing and Research Skills', kgNodeIds: ['vocabulary.academic.subject_specific', 'writing.essay_types.expository_argumentative'] },
      ],
    },
  ],
}

export function getCBSEEnglishChapters(grade: number) {
  return CBSE_ENGLISH_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSEEnglishChapter(id: string) {
  for (const grade of CBSE_ENGLISH_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

import type { BoardSubjectCatalog } from './educationTypes'

// CBSE offers Urdu as a second/third language option (Course A and Course B).
// This catalog covers grades 6–12 matching CBSE Urdu syllabi 003 (Course A) / 303 (Course B).
export const CBSE_URDU_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'urdu',
  subjectName: 'Urdu',
  grades: [
    {
      grade: 6,
      chapters: [
        { id: 'cbse.urdu.6.ch1', order: 1, title: 'Urdu Script and Sounds', kgNodeIds: ['urdu.script_nastaliq', 'urdu.phonology'] },
        { id: 'cbse.urdu.6.ch2', order: 2, title: 'Words and Vocabulary', kgNodeIds: ['urdu.vocabulary_basics'] },
        { id: 'cbse.urdu.6.ch3', order: 3, title: 'Reading Urdu Prose', kgNodeIds: ['urdu.nasr_comprehension'] },
        { id: 'cbse.urdu.6.ch4', order: 4, title: 'Simple Poems for Children', kgNodeIds: ['urdu.poetry_basics'] },
        { id: 'cbse.urdu.6.ch5', order: 5, title: 'Introduction to Grammar — Nouns and Verbs', kgNodeIds: ['urdu.grammar_parts_of_speech'] },
        { id: 'cbse.urdu.6.ch6', order: 6, title: 'Writing Practice — Imlaa', kgNodeIds: ['urdu.script_nastaliq'] },
      ],
    },
    {
      grade: 7,
      chapters: [
        { id: 'cbse.urdu.7.ch1', order: 1, title: 'Prose Reading — Stories and Fables', kgNodeIds: ['urdu.nasr_comprehension'] },
        { id: 'cbse.urdu.7.ch2', order: 2, title: 'Poetry — Nazm and Hamd', kgNodeIds: ['urdu.poetry_basics'] },
        { id: 'cbse.urdu.7.ch3', order: 3, title: 'Idioms and Proverbs', kgNodeIds: ['urdu.muhavare_lokokti'] },
        { id: 'cbse.urdu.7.ch4', order: 4, title: 'Grammar — Adjectives and Adverbs', kgNodeIds: ['urdu.grammar_parts_of_speech'] },
        { id: 'cbse.urdu.7.ch5', order: 5, title: 'Informal Letter Writing', kgNodeIds: ['urdu.khat_nigari'] },
      ],
    },
    {
      grade: 8,
      chapters: [
        { id: 'cbse.urdu.8.ch1', order: 1, title: 'Prose — Mazameen and Afsane', kgNodeIds: ['urdu.nasr_types'] },
        { id: 'cbse.urdu.8.ch2', order: 2, title: 'Introduction to Ghazal', kgNodeIds: ['urdu.ghazal'] },
        { id: 'cbse.urdu.8.ch3', order: 3, title: 'Sentence Structure and Construction', kgNodeIds: ['urdu.grammar_sentence'] },
        { id: 'cbse.urdu.8.ch4', order: 4, title: 'Formal Letter Writing', kgNodeIds: ['urdu.khat_nigari'] },
        { id: 'cbse.urdu.8.ch5', order: 5, title: 'Short Essay Writing', kgNodeIds: ['urdu.insha_nigari'] },
      ],
    },
    {
      grade: 9,
      chapters: [
        { id: 'cbse.urdu.9.ch1', order: 1, title: 'Prose — Afsana and Khutoot', kgNodeIds: ['urdu.nasr_types'] },
        { id: 'cbse.urdu.9.ch2', order: 2, title: 'Ghazal — Classical Poets', kgNodeIds: ['urdu.ghazal', 'urdu.major_poets'] },
        { id: 'cbse.urdu.9.ch3', order: 3, title: 'Nazm — Selected Modern Poems', kgNodeIds: ['urdu.nazm'] },
        { id: 'cbse.urdu.9.ch4', order: 4, title: 'Tenses and Verb Forms', kgNodeIds: ['urdu.grammar_tense'] },
        { id: 'cbse.urdu.9.ch5', order: 5, title: 'Essay Writing', kgNodeIds: ['urdu.insha_nigari'] },
        { id: 'cbse.urdu.9.ch6', order: 6, title: 'Summary Writing', kgNodeIds: ['urdu.khulasa_tafseel'] },
        { id: 'cbse.urdu.9.ch7', order: 7, title: 'Literary Devices', kgNodeIds: ['urdu.literary_devices'] },
      ],
    },
    {
      grade: 10,
      chapters: [
        { id: 'cbse.urdu.10.ch1', order: 1, title: 'Prose — Biography and Travelogue', kgNodeIds: ['urdu.nasr_types'] },
        { id: 'cbse.urdu.10.ch2', order: 2, title: 'Ghazal — Ghalib and Faiz', kgNodeIds: ['urdu.ghazal', 'urdu.major_poets'] },
        { id: 'cbse.urdu.10.ch3', order: 3, title: 'Nazm — Iqbal and Sahir', kgNodeIds: ['urdu.nazm', 'urdu.major_poets'] },
        { id: 'cbse.urdu.10.ch4', order: 4, title: 'Essay Writing — Social Issues', kgNodeIds: ['urdu.insha_nigari'] },
        { id: 'cbse.urdu.10.ch5', order: 5, title: 'Letter and Application Writing', kgNodeIds: ['urdu.khat_nigari'] },
        { id: 'cbse.urdu.10.ch6', order: 6, title: 'Translation Practice', kgNodeIds: ['urdu.translation'] },
      ],
    },
    {
      grade: 11,
      chapters: [
        { id: 'cbse.urdu.11.ch1', order: 1, title: 'Classical Urdu Literature — History and Development', kgNodeIds: ['urdu.classical_literature'] },
        { id: 'cbse.urdu.11.ch2', order: 2, title: 'Ghalib — Selected Ghazals and Letters', kgNodeIds: ['urdu.ghazal', 'urdu.major_poets'] },
        { id: 'cbse.urdu.11.ch3', order: 3, title: 'Iqbal — Nazmen and Philosophy of Khudi', kgNodeIds: ['urdu.nazm', 'urdu.major_poets'] },
        { id: 'cbse.urdu.11.ch4', order: 4, title: 'Prose — Manto and Modern Afsana', kgNodeIds: ['urdu.nasr_types', 'urdu.modern_literature'] },
        { id: 'cbse.urdu.11.ch5', order: 5, title: 'Qasida, Marsiya and Rubai', kgNodeIds: ['urdu.qasida_marsiya'] },
        { id: 'cbse.urdu.11.ch6', order: 6, title: 'Poetic Devices and Analysis', kgNodeIds: ['urdu.literary_devices'] },
        { id: 'cbse.urdu.11.ch7', order: 7, title: 'Advanced Essay and Report Writing', kgNodeIds: ['urdu.insha_nigari', 'urdu.report_writing'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'cbse.urdu.12.ch1', order: 1, title: 'Modern Urdu Literature — Progressive Movement', kgNodeIds: ['urdu.modern_literature'] },
        { id: 'cbse.urdu.12.ch2', order: 2, title: 'Faiz Ahmed Faiz — Poetry and Vision', kgNodeIds: ['urdu.ghazal', 'urdu.nazm', 'urdu.major_poets'] },
        { id: 'cbse.urdu.12.ch3', order: 3, title: 'Major Prose Writers — Premchand and Ismat', kgNodeIds: ['urdu.major_writers'] },
        { id: 'cbse.urdu.12.ch4', order: 4, title: 'Literary Criticism', kgNodeIds: ['urdu.classical_literature', 'urdu.modern_literature'] },
        { id: 'cbse.urdu.12.ch5', order: 5, title: 'Expansion, Summary and Paraphrase', kgNodeIds: ['urdu.khulasa_tafseel'] },
        { id: 'cbse.urdu.12.ch6', order: 6, title: 'Functional Urdu — Media and Communication', kgNodeIds: ['urdu.functional_language'] },
        { id: 'cbse.urdu.12.ch7', order: 7, title: 'Translation and Creative Writing', kgNodeIds: ['urdu.translation', 'urdu.insha_nigari'] },
      ],
    },
  ],
}

export function getCBSEUrduChapters(grade: number) {
  return CBSE_URDU_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSEUrduChapter(id: string) {
  for (const grade of CBSE_URDU_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

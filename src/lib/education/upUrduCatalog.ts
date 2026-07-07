import type { BoardSubjectCatalog } from './educationTypes'

export const UP_URDU_CATALOG: BoardSubjectCatalog = {
  boardId: 'up_board',
  subjectSlug: 'urdu',
  subjectName: 'Urdu',
  grades: [
    {
      grade: 6,
      chapters: [
        { id: 'up.urdu.6.ch1', order: 1, title: 'Haroof-e-Tahajji aur Awazein (Script and Sounds)', kgNodeIds: ['urdu.script_nastaliq', 'urdu.phonology'] },
        { id: 'up.urdu.6.ch2', order: 2, title: 'Alfaz aur Maanat (Words and Meanings)', kgNodeIds: ['urdu.vocabulary_basics'] },
        { id: 'up.urdu.6.ch3', order: 3, title: 'Nasr — Ibaarat Khwani (Prose Reading)', kgNodeIds: ['urdu.nasr_comprehension'] },
        { id: 'up.urdu.6.ch4', order: 4, title: 'Nazm — Bachpan ki Kavitayein (Children\'s Poems)', kgNodeIds: ['urdu.poetry_basics'] },
        { id: 'up.urdu.6.ch5', order: 5, title: 'Imlaa aur Kitaabat (Spelling and Writing)', kgNodeIds: ['urdu.script_nastaliq'] },
        { id: 'up.urdu.6.ch6', order: 6, title: 'Grammer Basics — Ism aur Fail', kgNodeIds: ['urdu.grammar_parts_of_speech'] },
      ],
    },
    {
      grade: 7,
      chapters: [
        { id: 'up.urdu.7.ch1', order: 1, title: 'Nasr — Qissay aur Daastaan (Stories and Narratives)', kgNodeIds: ['urdu.nasr_comprehension', 'urdu.nasr_types'] },
        { id: 'up.urdu.7.ch2', order: 2, title: 'Nazm — Hamd, Naat aur Manqabat', kgNodeIds: ['urdu.poetry_basics'] },
        { id: 'up.urdu.7.ch3', order: 3, title: 'Muhavare aur Lokokti', kgNodeIds: ['urdu.muhavare_lokokti'] },
        { id: 'up.urdu.7.ch4', order: 4, title: 'Kalam ke Ajza (Parts of Speech)', kgNodeIds: ['urdu.grammar_parts_of_speech'] },
        { id: 'up.urdu.7.ch5', order: 5, title: 'Khat Nigari — Ghair Rasmi Khat (Informal Letters)', kgNodeIds: ['urdu.khat_nigari'] },
        { id: 'up.urdu.7.ch6', order: 6, title: 'Alfaz ki Banaawat aur Irtiqaa (Word Formation)', kgNodeIds: ['urdu.vocabulary_basics'] },
      ],
    },
    {
      grade: 8,
      chapters: [
        { id: 'up.urdu.8.ch1', order: 1, title: 'Nasr — Mazameen aur Afsane (Essays and Stories)', kgNodeIds: ['urdu.nasr_types'] },
        { id: 'up.urdu.8.ch2', order: 2, title: 'Ghazal — Parichay aur Faham', kgNodeIds: ['urdu.ghazal'] },
        { id: 'up.urdu.8.ch3', order: 3, title: 'Jumla Sazi aur Tarkib (Sentence Construction)', kgNodeIds: ['urdu.grammar_sentence'] },
        { id: 'up.urdu.8.ch4', order: 4, title: 'Khat Nigari — Rasmi Khat (Formal Letters)', kgNodeIds: ['urdu.khat_nigari'] },
        { id: 'up.urdu.8.ch5', order: 5, title: 'Insha Nigari — Choti Ibaraat (Short Compositions)', kgNodeIds: ['urdu.insha_nigari'] },
        { id: 'up.urdu.8.ch6', order: 6, title: 'Mufrad aur Jamaa, Muzakkar aur Muannas', kgNodeIds: ['urdu.grammar_parts_of_speech'] },
      ],
    },
    {
      grade: 9,
      chapters: [
        { id: 'up.urdu.9.ch1', order: 1, title: 'Nasr — Afsana aur Kahani (Short Story)', kgNodeIds: ['urdu.nasr_types'] },
        { id: 'up.urdu.9.ch2', order: 2, title: 'Ghazal — Ghalib aur Mir ki Ghazalein', kgNodeIds: ['urdu.ghazal', 'urdu.major_poets'] },
        { id: 'up.urdu.9.ch3', order: 3, title: 'Nazm — Iqbal aur Faiz', kgNodeIds: ['urdu.nazm', 'urdu.major_poets'] },
        { id: 'up.urdu.9.ch4', order: 4, title: 'Fail ke Zamaane (Tenses)', kgNodeIds: ['urdu.grammar_tense'] },
        { id: 'up.urdu.9.ch5', order: 5, title: 'Insha Nigari — Mazmoon Nawisi (Essay Writing)', kgNodeIds: ['urdu.insha_nigari'] },
        { id: 'up.urdu.9.ch6', order: 6, title: 'Khulasa Nawisi (Summary Writing)', kgNodeIds: ['urdu.khulasa_tafseel'] },
        { id: 'up.urdu.9.ch7', order: 7, title: 'Adabi Sanaatein (Literary Devices)', kgNodeIds: ['urdu.literary_devices'] },
      ],
    },
    {
      grade: 10,
      chapters: [
        { id: 'up.urdu.10.ch1', order: 1, title: 'Nasr — Sawaneh aur Safarnama (Biography and Travelogue)', kgNodeIds: ['urdu.nasr_types', 'urdu.major_writers'] },
        { id: 'up.urdu.10.ch2', order: 2, title: 'Ghazal — Ghalib ki Ghazalein (Selected)', kgNodeIds: ['urdu.ghazal', 'urdu.major_poets'] },
        { id: 'up.urdu.10.ch3', order: 3, title: 'Nazm — Josh, Sahir aur Majaz', kgNodeIds: ['urdu.nazm', 'urdu.major_poets'] },
        { id: 'up.urdu.10.ch4', order: 4, title: 'Qafiya, Radif aur Takhallus (Poetic Terms)', kgNodeIds: ['urdu.poetry_basics'] },
        { id: 'up.urdu.10.ch5', order: 5, title: 'Insha Nigari — Islaahi aur Siyasi Mazameen (Reform and Political Essays)', kgNodeIds: ['urdu.insha_nigari'] },
        { id: 'up.urdu.10.ch6', order: 6, title: 'Khat Nigari — Darkhwast aur Shikayat (Application and Complaint)', kgNodeIds: ['urdu.khat_nigari'] },
        { id: 'up.urdu.10.ch7', order: 7, title: 'Tarjuma Nigari (Translation Practice)', kgNodeIds: ['urdu.translation'] },
      ],
    },
    {
      grade: 11,
      chapters: [
        { id: 'up.urdu.11.ch1', order: 1, title: 'Urdu Adab ka Irtiqaa — Dakkan se Delhi (Literary History)', kgNodeIds: ['urdu.classical_literature'] },
        { id: 'up.urdu.11.ch2', order: 2, title: 'Ghalib — Diwan aur Kalam (Selected Ghazals)', kgNodeIds: ['urdu.ghazal', 'urdu.major_poets'] },
        { id: 'up.urdu.11.ch3', order: 3, title: 'Iqbal — Bang-e-Dara se Nazmen', kgNodeIds: ['urdu.nazm', 'urdu.major_poets'] },
        { id: 'up.urdu.11.ch4', order: 4, title: 'Nasr — Manto aur Ismat Chughtai ke Afsane', kgNodeIds: ['urdu.nasr_types', 'urdu.modern_literature'] },
        { id: 'up.urdu.11.ch5', order: 5, title: 'Qasida aur Marsiya', kgNodeIds: ['urdu.qasida_marsiya'] },
        { id: 'up.urdu.11.ch6', order: 6, title: 'Sanaate Shairi — Tasbeeh, Istiara, Kinaya', kgNodeIds: ['urdu.literary_devices'] },
        { id: 'up.urdu.11.ch7', order: 7, title: 'Insha Nigari — Tanqeedi aur Tehqeeqi Mazmoon', kgNodeIds: ['urdu.insha_nigari'] },
        { id: 'up.urdu.11.ch8', order: 8, title: 'Khabarnama aur Report Nigari', kgNodeIds: ['urdu.report_writing'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'up.urdu.12.ch1', order: 1, title: 'Jadeed Urdu Adab — Taraqqi Pasand Tehreek (Progressive Movement)', kgNodeIds: ['urdu.modern_literature'] },
        { id: 'up.urdu.12.ch2', order: 2, title: 'Faiz Ahmed Faiz — Nazmen aur Ghazalein', kgNodeIds: ['urdu.ghazal', 'urdu.nazm', 'urdu.major_poets'] },
        { id: 'up.urdu.12.ch3', order: 3, title: 'Premchand — Urdu Afsane aur Nawal', kgNodeIds: ['urdu.major_writers'] },
        { id: 'up.urdu.12.ch4', order: 4, title: 'Tanqeed aur Tankeed-e-Adab (Literary Criticism)', kgNodeIds: ['urdu.classical_literature', 'urdu.modern_literature'] },
        { id: 'up.urdu.12.ch5', order: 5, title: 'Rubai aur Masnavi', kgNodeIds: ['urdu.qasida_marsiya'] },
        { id: 'up.urdu.12.ch6', order: 6, title: 'Tafseel Nawisi aur Khulasa (Expansion and Summary)', kgNodeIds: ['urdu.khulasa_tafseel'] },
        { id: 'up.urdu.12.ch7', order: 7, title: 'Amali Urdu — Akhbaar aur Raabitah (Functional Urdu)', kgNodeIds: ['urdu.functional_language'] },
        { id: 'up.urdu.12.ch8', order: 8, title: 'Tarjuma aur Takhleeqi Tahrir (Translation and Creative Writing)', kgNodeIds: ['urdu.translation', 'urdu.insha_nigari'] },
      ],
    },
  ],
}

export function getUPUrduChapters(grade: number) {
  return UP_URDU_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getUPUrduChapter(id: string) {
  for (const grade of UP_URDU_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

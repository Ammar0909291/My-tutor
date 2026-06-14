import type { BoardSubjectCatalog } from './educationTypes'

export const UP_PSYCHOLOGY_CATALOG: BoardSubjectCatalog = {
  boardId: 'up_board',
  subjectSlug: 'psychology',
  subjectName: 'Psychology',
  grades: [
    {
      grade: 11,
      chapters: [
        { id: 'up.psy.11.ch1', order: 1, title: 'Introduction to Psychology', kgNodeIds: ['psychology.intro'] },
        { id: 'up.psy.11.ch2', order: 2, title: 'Methods of Psychological Enquiry', kgNodeIds: ['psychology.research_methods'] },
        { id: 'up.psy.11.ch3', order: 3, title: 'Biological Basis of Behaviour', kgNodeIds: ['psychology.biological_basis'] },
        { id: 'up.psy.11.ch4', order: 4, title: 'Human Development', kgNodeIds: ['psychology.human_development'] },
        { id: 'up.psy.11.ch5', order: 5, title: 'Sensation and Perception', kgNodeIds: ['psychology.sensation', 'psychology.perception'] },
        { id: 'up.psy.11.ch6', order: 6, title: 'Learning — Classical and Operant Conditioning', kgNodeIds: ['psychology.classical_conditioning', 'psychology.operant_conditioning'] },
        { id: 'up.psy.11.ch7', order: 7, title: 'Cognitive Learning and Observational Learning', kgNodeIds: ['psychology.cognitive_learning'] },
        { id: 'up.psy.11.ch8', order: 8, title: 'Memory', kgNodeIds: ['psychology.memory_models', 'psychology.forgetting'] },
        { id: 'up.psy.11.ch9', order: 9, title: 'Thinking, Language and Problem Solving', kgNodeIds: ['psychology.thinking', 'psychology.language'] },
        { id: 'up.psy.11.ch10', order: 10, title: 'Motivation and Emotion', kgNodeIds: ['psychology.motivation', 'psychology.emotion'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'up.psy.12.ch1', order: 1, title: 'Intelligence and Its Measurement', kgNodeIds: ['psychology.intelligence'] },
        { id: 'up.psy.12.ch2', order: 2, title: 'Personality — Theories and Assessment', kgNodeIds: ['psychology.personality_theories', 'psychology.personality_assessment'] },
        { id: 'up.psy.12.ch3', order: 3, title: 'Abnormal Behaviour and Psychological Disorders', kgNodeIds: ['psychology.abnormal_psychology', 'psychology.disorders_types'] },
        { id: 'up.psy.12.ch4', order: 4, title: 'Therapeutic Approaches', kgNodeIds: ['psychology.therapies'] },
        { id: 'up.psy.12.ch5', order: 5, title: 'Attitude, Stereotypes and Prejudice', kgNodeIds: ['psychology.attitude'] },
        { id: 'up.psy.12.ch6', order: 6, title: 'Social Influence, Conformity and Obedience', kgNodeIds: ['psychology.social_influence'] },
        { id: 'up.psy.12.ch7', order: 7, title: 'Prosocial Behaviour and Aggression', kgNodeIds: ['psychology.prosocial'] },
        { id: 'up.psy.12.ch8', order: 8, title: 'Stress, Coping and Health', kgNodeIds: ['psychology.stress_health'] },
        { id: 'up.psy.12.ch9', order: 9, title: 'Applied Psychology', kgNodeIds: ['psychology.applied_fields'] },
      ],
    },
  ],
}

export function getUPPsychologyChapters(grade: number) {
  return UP_PSYCHOLOGY_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getUPPsychologyChapter(id: string) {
  for (const grade of UP_PSYCHOLOGY_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

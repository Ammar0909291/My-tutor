import type { BoardSubjectCatalog } from './educationTypes'

export const CBSE_PSYCHOLOGY_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'psychology',
  subjectName: 'Psychology',
  grades: [
    {
      grade: 11,
      chapters: [
        { id: 'cbse.psy.11.ch1', order: 1, title: 'What is Psychology?', kgNodeIds: ['psychology.intro'] },
        { id: 'cbse.psy.11.ch2', order: 2, title: 'Methods of Enquiry in Psychology', kgNodeIds: ['psychology.research_methods'] },
        { id: 'cbse.psy.11.ch3', order: 3, title: 'The Bases of Human Behaviour', kgNodeIds: ['psychology.biological_basis'] },
        { id: 'cbse.psy.11.ch4', order: 4, title: 'Human Development', kgNodeIds: ['psychology.human_development'] },
        { id: 'cbse.psy.11.ch5', order: 5, title: 'Sensory, Attentional and Perceptual Processes', kgNodeIds: ['psychology.sensation', 'psychology.perception'] },
        { id: 'cbse.psy.11.ch6', order: 6, title: 'Learning', kgNodeIds: ['psychology.classical_conditioning', 'psychology.operant_conditioning', 'psychology.cognitive_learning'] },
        { id: 'cbse.psy.11.ch7', order: 7, title: 'Human Memory', kgNodeIds: ['psychology.memory_models', 'psychology.forgetting'] },
        { id: 'cbse.psy.11.ch8', order: 8, title: 'Thinking', kgNodeIds: ['psychology.thinking'] },
        { id: 'cbse.psy.11.ch9', order: 9, title: 'Motivation and Emotion', kgNodeIds: ['psychology.motivation', 'psychology.emotion'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'cbse.psy.12.ch1', order: 1, title: 'Variations in Psychological Attributes (Intelligence)', kgNodeIds: ['psychology.intelligence'] },
        { id: 'cbse.psy.12.ch2', order: 2, title: 'Self and Personality', kgNodeIds: ['psychology.personality_theories', 'psychology.personality_assessment'] },
        { id: 'cbse.psy.12.ch3', order: 3, title: 'Meeting Life Challenges (Stress and Coping)', kgNodeIds: ['psychology.stress_health'] },
        { id: 'cbse.psy.12.ch4', order: 4, title: 'Psychological Disorders', kgNodeIds: ['psychology.abnormal_psychology', 'psychology.disorders_types'] },
        { id: 'cbse.psy.12.ch5', order: 5, title: 'Therapeutic Approaches', kgNodeIds: ['psychology.therapies'] },
        { id: 'cbse.psy.12.ch6', order: 6, title: 'Attitude and Social Cognition', kgNodeIds: ['psychology.attitude'] },
        { id: 'cbse.psy.12.ch7', order: 7, title: 'Social Influence and Group Processes', kgNodeIds: ['psychology.social_influence'] },
        { id: 'cbse.psy.12.ch8', order: 8, title: 'Psychology and Life', kgNodeIds: ['psychology.stress_health', 'psychology.applied_fields'] },
        { id: 'cbse.psy.12.ch9', order: 9, title: 'Developing Psychological Skills', kgNodeIds: ['psychology.applied_fields'] },
      ],
    },
  ],
}

export function getCBSEPsychologyChapters(grade: number) {
  return CBSE_PSYCHOLOGY_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSEPsychologyChapter(id: string) {
  for (const grade of CBSE_PSYCHOLOGY_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

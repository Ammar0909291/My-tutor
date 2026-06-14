import type { BoardSubjectCatalog } from './educationTypes'

export const CBSE_SOCIOLOGY_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'sociology',
  subjectName: 'Sociology',
  grades: [
    {
      grade: 11,
      chapters: [
        { id: 'cbse.soc.11.ch1', order: 1, title: 'Sociology and Society', kgNodeIds: ['sociology.intro', 'sociology.society'] },
        { id: 'cbse.soc.11.ch2', order: 2, title: 'Terms, Concepts and Their Use in Sociology', kgNodeIds: ['sociology.social_groups', 'sociology.culture'] },
        { id: 'cbse.soc.11.ch3', order: 3, title: 'Understanding Social Institutions', kgNodeIds: ['sociology.family', 'sociology.marriage', 'sociology.religion', 'sociology.education_institution'] },
        { id: 'cbse.soc.11.ch4', order: 4, title: 'Culture and Socialisation', kgNodeIds: ['sociology.socialisation'] },
        { id: 'cbse.soc.11.ch5', order: 5, title: 'Doing Sociology — Research Methods', kgNodeIds: ['sociology.research_methods'] },
        { id: 'cbse.soc.11.ch6', order: 6, title: 'Social Stratification — Introduction', kgNodeIds: ['sociology.stratification'] },
        { id: 'cbse.soc.11.ch7', order: 7, title: 'Introducing Indian Society', kgNodeIds: ['sociology.indian_society'] },
        { id: 'cbse.soc.11.ch8', order: 8, title: 'Demographic Structure of Indian Society', kgNodeIds: ['sociology.indian_society'] },
        { id: 'cbse.soc.11.ch9', order: 9, title: 'Social Institutions — Continuity and Change', kgNodeIds: ['sociology.caste', 'sociology.family'] },
        { id: 'cbse.soc.11.ch10', order: 10, title: 'Market as a Social Institution', kgNodeIds: ['sociology.economy_work'] },
        { id: 'cbse.soc.11.ch11', order: 11, title: 'Patterns of Social Inequality and Exclusion', kgNodeIds: ['sociology.caste', 'sociology.tribe_ethnicity', 'sociology.poverty_exclusion'] },
        { id: 'cbse.soc.11.ch12', order: 12, title: 'Challenges of Cultural Diversity', kgNodeIds: ['sociology.tribe_ethnicity', 'sociology.religion'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'cbse.soc.12.ch1', order: 1, title: 'Structural Change — Colonialism, Industrialisation, Urbanisation', kgNodeIds: ['sociology.social_change', 'sociology.urban_society'] },
        { id: 'cbse.soc.12.ch2', order: 2, title: 'Cultural Change', kgNodeIds: ['sociology.social_change', 'sociology.globalisation_society'] },
        { id: 'cbse.soc.12.ch3', order: 3, title: 'The Story of Indian Democracy', kgNodeIds: ['sociology.community_movements'] },
        { id: 'cbse.soc.12.ch4', order: 4, title: 'Change and Development in Rural Society', kgNodeIds: ['sociology.rural_society'] },
        { id: 'cbse.soc.12.ch5', order: 5, title: 'Change and Development in Industrial Society', kgNodeIds: ['sociology.economy_work', 'sociology.urban_society'] },
        { id: 'cbse.soc.12.ch6', order: 6, title: 'Globalisation and Social Change', kgNodeIds: ['sociology.globalisation_society'] },
        { id: 'cbse.soc.12.ch7', order: 7, title: 'Mass Media and Communications', kgNodeIds: ['sociology.culture', 'sociology.socialisation'] },
        { id: 'cbse.soc.12.ch8', order: 8, title: 'Social Movements', kgNodeIds: ['sociology.community_movements'] },
        { id: 'cbse.soc.12.ch9', order: 9, title: 'Environment and Society', kgNodeIds: ['sociology.environment_society'] },
        { id: 'cbse.soc.12.ch10', order: 10, title: 'Gender and Society', kgNodeIds: ['sociology.gender'] },
        { id: 'cbse.soc.12.ch11', order: 11, title: 'Class, Caste and Deviance', kgNodeIds: ['sociology.class', 'sociology.deviance'] },
      ],
    },
  ],
}

export function getCBSESociologyChapters(grade: number) {
  return CBSE_SOCIOLOGY_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSESociologyChapter(id: string) {
  for (const grade of CBSE_SOCIOLOGY_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

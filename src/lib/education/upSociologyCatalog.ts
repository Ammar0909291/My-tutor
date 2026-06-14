import type { BoardSubjectCatalog } from './educationTypes'

export const UP_SOCIOLOGY_CATALOG: BoardSubjectCatalog = {
  boardId: 'up_board',
  subjectSlug: 'sociology',
  subjectName: 'Sociology',
  grades: [
    {
      grade: 11,
      chapters: [
        { id: 'up.soc.11.ch1', order: 1, title: 'Introduction to Sociology', kgNodeIds: ['sociology.intro'] },
        { id: 'up.soc.11.ch2', order: 2, title: 'Society — Meaning and Types', kgNodeIds: ['sociology.society', 'sociology.social_groups'] },
        { id: 'up.soc.11.ch3', order: 3, title: 'Culture and Socialisation', kgNodeIds: ['sociology.culture', 'sociology.socialisation'] },
        { id: 'up.soc.11.ch4', order: 4, title: 'Social Institutions — Family, Marriage and Kinship', kgNodeIds: ['sociology.family', 'sociology.marriage'] },
        { id: 'up.soc.11.ch5', order: 5, title: 'Social Institutions — Religion and Education', kgNodeIds: ['sociology.religion', 'sociology.education_institution'] },
        { id: 'up.soc.11.ch6', order: 6, title: 'Social Stratification and Inequality', kgNodeIds: ['sociology.stratification', 'sociology.class'] },
        { id: 'up.soc.11.ch7', order: 7, title: 'Caste System in India', kgNodeIds: ['sociology.caste'] },
        { id: 'up.soc.11.ch8', order: 8, title: 'Gender and Society', kgNodeIds: ['sociology.gender'] },
        { id: 'up.soc.11.ch9', order: 9, title: 'Tribal Communities and Minorities', kgNodeIds: ['sociology.tribe_ethnicity'] },
        { id: 'up.soc.11.ch10', order: 10, title: 'Research Methods in Sociology', kgNodeIds: ['sociology.research_methods'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'up.soc.12.ch1', order: 1, title: 'Indian Society — Structure and Diversity', kgNodeIds: ['sociology.indian_society'] },
        { id: 'up.soc.12.ch2', order: 2, title: 'Rural Society in India', kgNodeIds: ['sociology.rural_society'] },
        { id: 'up.soc.12.ch3', order: 3, title: 'Urban Society and Urbanism', kgNodeIds: ['sociology.urban_society'] },
        { id: 'up.soc.12.ch4', order: 4, title: 'Social Change — Theories and Factors', kgNodeIds: ['sociology.social_change'] },
        { id: 'up.soc.12.ch5', order: 5, title: 'Economy, Work and Society', kgNodeIds: ['sociology.economy_work'] },
        { id: 'up.soc.12.ch6', order: 6, title: 'Globalisation and Indian Society', kgNodeIds: ['sociology.globalisation_society'] },
        { id: 'up.soc.12.ch7', order: 7, title: 'Social Movements in India', kgNodeIds: ['sociology.community_movements'] },
        { id: 'up.soc.12.ch8', order: 8, title: 'Deviance, Crime and Social Control', kgNodeIds: ['sociology.deviance'] },
        { id: 'up.soc.12.ch9', order: 9, title: 'Poverty and Social Exclusion', kgNodeIds: ['sociology.poverty_exclusion'] },
        { id: 'up.soc.12.ch10', order: 10, title: 'Environment and Society', kgNodeIds: ['sociology.environment_society'] },
      ],
    },
  ],
}

export function getUPSociologyChapters(grade: number) {
  return UP_SOCIOLOGY_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getUPSociologyChapter(id: string) {
  for (const grade of UP_SOCIOLOGY_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

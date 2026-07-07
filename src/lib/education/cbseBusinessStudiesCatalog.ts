import type { BoardSubjectCatalog } from './educationTypes'

export const CBSE_BUSINESS_STUDIES_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'business_studies',
  subjectName: 'Business Studies',
  grades: [
    {
      grade: 11,
      chapters: [
        { id: 'cbse.bst.11.ch1', order: 1, title: 'Nature and Purpose of Business', kgNodeIds: ['business_studies.nature_business'] },
        { id: 'cbse.bst.11.ch2', order: 2, title: 'Forms of Business Organisation', kgNodeIds: ['business_studies.forms_organisation'] },
        { id: 'cbse.bst.11.ch3', order: 3, title: 'Private, Public and Global Enterprises', kgNodeIds: ['business_studies.private_public'] },
        { id: 'cbse.bst.11.ch4', order: 4, title: 'Business Services — Banking', kgNodeIds: ['business_studies.banking'] },
        { id: 'cbse.bst.11.ch5', order: 5, title: 'Business Services — Insurance, Transport and Warehousing', kgNodeIds: ['business_studies.insurance', 'business_studies.transport_warehousing'] },
        { id: 'cbse.bst.11.ch6', order: 6, title: 'Social Responsibilities of Business and Business Ethics', kgNodeIds: ['business_studies.nature_business'] },
        { id: 'cbse.bst.11.ch7', order: 7, title: 'Formation of a Company', kgNodeIds: ['business_studies.company'] },
        { id: 'cbse.bst.11.ch8', order: 8, title: 'Sources of Business Finance', kgNodeIds: ['business_studies.financial_management'] },
        { id: 'cbse.bst.11.ch9', order: 9, title: 'Small Business and Entrepreneurship', kgNodeIds: ['business_studies.entrepreneurship'] },
        { id: 'cbse.bst.11.ch10', order: 10, title: 'Internal Trade', kgNodeIds: ['business_studies.internal_trade'] },
        { id: 'cbse.bst.11.ch11', order: 11, title: 'International Business — I', kgNodeIds: ['business_studies.international_trade'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'cbse.bst.12.ch1', order: 1, title: 'Nature and Significance of Management', kgNodeIds: ['business_studies.nature_management'] },
        { id: 'cbse.bst.12.ch2', order: 2, title: 'Principles of Management', kgNodeIds: ['business_studies.principles_management'] },
        { id: 'cbse.bst.12.ch3', order: 3, title: 'Business Environment', kgNodeIds: ['business_studies.business_environment'] },
        { id: 'cbse.bst.12.ch4', order: 4, title: 'Planning', kgNodeIds: ['business_studies.planning'] },
        { id: 'cbse.bst.12.ch5', order: 5, title: 'Organising', kgNodeIds: ['business_studies.organising'] },
        { id: 'cbse.bst.12.ch6', order: 6, title: 'Staffing', kgNodeIds: ['business_studies.staffing'] },
        { id: 'cbse.bst.12.ch7', order: 7, title: 'Directing', kgNodeIds: ['business_studies.directing'] },
        { id: 'cbse.bst.12.ch8', order: 8, title: 'Controlling', kgNodeIds: ['business_studies.controlling'] },
        { id: 'cbse.bst.12.ch9', order: 9, title: 'Financial Management', kgNodeIds: ['business_studies.financial_management'] },
        { id: 'cbse.bst.12.ch10', order: 10, title: 'Financial Markets', kgNodeIds: ['business_studies.financial_markets'] },
        { id: 'cbse.bst.12.ch11', order: 11, title: 'Marketing Management', kgNodeIds: ['business_studies.marketing'] },
        { id: 'cbse.bst.12.ch12', order: 12, title: 'Consumer Protection', kgNodeIds: ['business_studies.consumer_protection'] },
        { id: 'cbse.bst.12.ch13', order: 13, title: 'Entrepreneurship Development', kgNodeIds: ['business_studies.entrepreneurship'] },
      ],
    },
  ],
}

export function getCBSEBusinessStudiesChapters(grade: number) {
  return CBSE_BUSINESS_STUDIES_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSEBusinessStudiesChapter(id: string) {
  for (const grade of CBSE_BUSINESS_STUDIES_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

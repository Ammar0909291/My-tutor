import type { BoardSubjectCatalog } from './educationTypes'

export const UP_BUSINESS_STUDIES_CATALOG: BoardSubjectCatalog = {
  boardId: 'up_board',
  subjectSlug: 'business_studies',
  subjectName: 'Business Studies',
  grades: [
    {
      grade: 11,
      chapters: [
        { id: 'up.bst.11.ch1', order: 1, title: 'Nature and Scope of Business', kgNodeIds: ['business_studies.nature_business'] },
        { id: 'up.bst.11.ch2', order: 2, title: 'Forms of Business Organisation', kgNodeIds: ['business_studies.forms_organisation'] },
        { id: 'up.bst.11.ch3', order: 3, title: 'Public Sector and Private Sector Enterprises', kgNodeIds: ['business_studies.private_public'] },
        { id: 'up.bst.11.ch4', order: 4, title: 'Business Services — Banking and Insurance', kgNodeIds: ['business_studies.banking', 'business_studies.insurance'] },
        { id: 'up.bst.11.ch5', order: 5, title: 'Transport, Communication and Warehousing', kgNodeIds: ['business_studies.transport_warehousing', 'business_studies.communication'] },
        { id: 'up.bst.11.ch6', order: 6, title: 'Formation and Registration of a Company', kgNodeIds: ['business_studies.company'] },
        { id: 'up.bst.11.ch7', order: 7, title: 'Trade — Home Trade', kgNodeIds: ['business_studies.internal_trade'] },
        { id: 'up.bst.11.ch8', order: 8, title: 'Trade — Foreign Trade', kgNodeIds: ['business_studies.international_trade'] },
        { id: 'up.bst.11.ch9', order: 9, title: 'Sources of Business Finance', kgNodeIds: ['business_studies.financial_management'] },
        { id: 'up.bst.11.ch10', order: 10, title: 'Consumer Protection', kgNodeIds: ['business_studies.consumer_protection'] },
        { id: 'up.bst.11.ch11', order: 11, title: 'Entrepreneurship', kgNodeIds: ['business_studies.entrepreneurship'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'up.bst.12.ch1', order: 1, title: 'Management — Nature and Significance', kgNodeIds: ['business_studies.nature_management'] },
        { id: 'up.bst.12.ch2', order: 2, title: 'Principles of Management', kgNodeIds: ['business_studies.principles_management'] },
        { id: 'up.bst.12.ch3', order: 3, title: 'Business Environment', kgNodeIds: ['business_studies.business_environment'] },
        { id: 'up.bst.12.ch4', order: 4, title: 'Planning', kgNodeIds: ['business_studies.planning'] },
        { id: 'up.bst.12.ch5', order: 5, title: 'Organising', kgNodeIds: ['business_studies.organising'] },
        { id: 'up.bst.12.ch6', order: 6, title: 'Staffing', kgNodeIds: ['business_studies.staffing'] },
        { id: 'up.bst.12.ch7', order: 7, title: 'Direction', kgNodeIds: ['business_studies.directing'] },
        { id: 'up.bst.12.ch8', order: 8, title: 'Controlling', kgNodeIds: ['business_studies.controlling'] },
        { id: 'up.bst.12.ch9', order: 9, title: 'Financial Management', kgNodeIds: ['business_studies.financial_management'] },
        { id: 'up.bst.12.ch10', order: 10, title: 'Capital Market and Financial Services', kgNodeIds: ['business_studies.financial_markets'] },
        { id: 'up.bst.12.ch11', order: 11, title: 'Marketing', kgNodeIds: ['business_studies.marketing'] },
        { id: 'up.bst.12.ch12', order: 12, title: 'Social Responsibility and Business Ethics', kgNodeIds: ['business_studies.nature_management'] },
      ],
    },
  ],
}

export function getUPBusinessStudiesChapters(grade: number) {
  return UP_BUSINESS_STUDIES_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getUPBusinessStudiesChapter(id: string) {
  for (const grade of UP_BUSINESS_STUDIES_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

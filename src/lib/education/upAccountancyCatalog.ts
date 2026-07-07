import type { BoardSubjectCatalog } from './educationTypes'

export const UP_ACCOUNTANCY_CATALOG: BoardSubjectCatalog = {
  boardId: 'up_board',
  subjectSlug: 'accountancy',
  subjectName: 'Accountancy',
  grades: [
    {
      grade: 11,
      chapters: [
        { id: 'up.acc.11.ch1', order: 1, title: 'Introduction to Accounting', kgNodeIds: ['accountancy.intro_accounting'] },
        { id: 'up.acc.11.ch2', order: 2, title: 'Basic Accounting Terms and Accounting Equation', kgNodeIds: ['accountancy.accounting_equation', 'accountancy.double_entry'] },
        { id: 'up.acc.11.ch3', order: 3, title: 'Journal — Recording of Transactions', kgNodeIds: ['accountancy.source_documents', 'accountancy.journal'] },
        { id: 'up.acc.11.ch4', order: 4, title: 'Ledger', kgNodeIds: ['accountancy.ledger'] },
        { id: 'up.acc.11.ch5', order: 5, title: 'Subsidiary Books and Cash Book', kgNodeIds: ['accountancy.special_journals'] },
        { id: 'up.acc.11.ch6', order: 6, title: 'Bank Reconciliation Statement', kgNodeIds: ['accountancy.bank_reconciliation'] },
        { id: 'up.acc.11.ch7', order: 7, title: 'Trial Balance', kgNodeIds: ['accountancy.trial_balance'] },
        { id: 'up.acc.11.ch8', order: 8, title: 'Rectification of Errors', kgNodeIds: ['accountancy.errors_rectification'] },
        { id: 'up.acc.11.ch9', order: 9, title: 'Depreciation', kgNodeIds: ['accountancy.depreciation'] },
        { id: 'up.acc.11.ch10', order: 10, title: 'Provisions and Reserves', kgNodeIds: ['accountancy.depreciation'] },
        { id: 'up.acc.11.ch11', order: 11, title: 'Final Accounts — Trading and Profit & Loss Account', kgNodeIds: ['accountancy.trading_pl'] },
        { id: 'up.acc.11.ch12', order: 12, title: 'Final Accounts — Balance Sheet', kgNodeIds: ['accountancy.balance_sheet'] },
        { id: 'up.acc.11.ch13', order: 13, title: 'Accounts from Incomplete Records (Single Entry)', kgNodeIds: ['accountancy.incomplete_records'] },
        { id: 'up.acc.11.ch14', order: 14, title: 'Accounts of Non-Trading Organisations', kgNodeIds: ['accountancy.not_for_profit'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'up.acc.12.ch1', order: 1, title: 'Partnership Accounts — Fundamentals', kgNodeIds: ['accountancy.partnership_basics'] },
        { id: 'up.acc.12.ch2', order: 2, title: 'Goodwill', kgNodeIds: ['accountancy.partnership_goodwill'] },
        { id: 'up.acc.12.ch3', order: 3, title: 'Change in Profit Sharing Ratio', kgNodeIds: ['accountancy.partnership_reconstitution'] },
        { id: 'up.acc.12.ch4', order: 4, title: 'Admission of a Partner', kgNodeIds: ['accountancy.partnership_reconstitution'] },
        { id: 'up.acc.12.ch5', order: 5, title: 'Retirement of a Partner', kgNodeIds: ['accountancy.partnership_reconstitution'] },
        { id: 'up.acc.12.ch6', order: 6, title: 'Death of a Partner', kgNodeIds: ['accountancy.partnership_reconstitution'] },
        { id: 'up.acc.12.ch7', order: 7, title: 'Dissolution of Partnership', kgNodeIds: ['accountancy.dissolution'] },
        { id: 'up.acc.12.ch8', order: 8, title: 'Company Accounts — Issue of Shares', kgNodeIds: ['accountancy.shares'] },
        { id: 'up.acc.12.ch9', order: 9, title: 'Company Accounts — Issue and Redemption of Debentures', kgNodeIds: ['accountancy.debentures'] },
        { id: 'up.acc.12.ch10', order: 10, title: 'Financial Statement Analysis', kgNodeIds: ['accountancy.analysis_tools'] },
        { id: 'up.acc.12.ch11', order: 11, title: 'Ratio Analysis', kgNodeIds: ['accountancy.ratio_analysis'] },
        { id: 'up.acc.12.ch12', order: 12, title: 'Cash Flow Statement', kgNodeIds: ['accountancy.cash_flow'] },
      ],
    },
  ],
}

export function getUPAccountancyChapters(grade: number) {
  return UP_ACCOUNTANCY_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getUPAccountancyChapter(id: string) {
  for (const grade of UP_ACCOUNTANCY_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

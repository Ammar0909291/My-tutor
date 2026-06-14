import type { BoardSubjectCatalog } from './educationTypes'

export const CBSE_ACCOUNTANCY_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'accountancy',
  subjectName: 'Accountancy',
  grades: [
    {
      grade: 11,
      chapters: [
        { id: 'cbse.acc.11.ch1', order: 1, title: 'Introduction to Accounting', kgNodeIds: ['accountancy.intro_accounting'] },
        { id: 'cbse.acc.11.ch2', order: 2, title: 'Theory Base of Accounting', kgNodeIds: ['accountancy.accounting_equation', 'accountancy.double_entry'] },
        { id: 'cbse.acc.11.ch3', order: 3, title: 'Recording of Transactions — I (Journal)', kgNodeIds: ['accountancy.source_documents', 'accountancy.journal'] },
        { id: 'cbse.acc.11.ch4', order: 4, title: 'Recording of Transactions — II (Ledger & Cash Book)', kgNodeIds: ['accountancy.ledger', 'accountancy.special_journals'] },
        { id: 'cbse.acc.11.ch5', order: 5, title: 'Bank Reconciliation Statement', kgNodeIds: ['accountancy.bank_reconciliation'] },
        { id: 'cbse.acc.11.ch6', order: 6, title: 'Trial Balance and Rectification of Errors', kgNodeIds: ['accountancy.trial_balance', 'accountancy.errors_rectification'] },
        { id: 'cbse.acc.11.ch7', order: 7, title: 'Depreciation, Provisions and Reserves', kgNodeIds: ['accountancy.depreciation'] },
        { id: 'cbse.acc.11.ch8', order: 8, title: 'Bills of Exchange', kgNodeIds: ['accountancy.special_journals'] },
        { id: 'cbse.acc.11.ch9', order: 9, title: 'Financial Statements — I (Trading & P&L Account)', kgNodeIds: ['accountancy.trading_pl'] },
        { id: 'cbse.acc.11.ch10', order: 10, title: 'Financial Statements — II (Balance Sheet)', kgNodeIds: ['accountancy.balance_sheet'] },
        { id: 'cbse.acc.11.ch11', order: 11, title: 'Accounts from Incomplete Records', kgNodeIds: ['accountancy.incomplete_records'] },
        { id: 'cbse.acc.11.ch12', order: 12, title: 'Accounting for Not-for-Profit Organisations', kgNodeIds: ['accountancy.not_for_profit'] },
        { id: 'cbse.acc.11.ch13', order: 13, title: 'Computerised Accounting System', kgNodeIds: ['accountancy.computerised'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'cbse.acc.12.ch1', order: 1, title: 'Accounting for Partnership — Basic Concepts', kgNodeIds: ['accountancy.partnership_basics'] },
        { id: 'cbse.acc.12.ch2', order: 2, title: 'Goodwill — Nature and Valuation', kgNodeIds: ['accountancy.partnership_goodwill'] },
        { id: 'cbse.acc.12.ch3', order: 3, title: 'Reconstitution of Partnership — Admission of a Partner', kgNodeIds: ['accountancy.partnership_reconstitution'] },
        { id: 'cbse.acc.12.ch4', order: 4, title: 'Reconstitution of Partnership — Retirement and Death', kgNodeIds: ['accountancy.partnership_reconstitution'] },
        { id: 'cbse.acc.12.ch5', order: 5, title: 'Dissolution of Partnership Firm', kgNodeIds: ['accountancy.dissolution'] },
        { id: 'cbse.acc.12.ch6', order: 6, title: 'Accounting for Share Capital', kgNodeIds: ['accountancy.shares'] },
        { id: 'cbse.acc.12.ch7', order: 7, title: 'Issue and Redemption of Debentures', kgNodeIds: ['accountancy.debentures'] },
        { id: 'cbse.acc.12.ch8', order: 8, title: 'Financial Statements of Companies', kgNodeIds: ['accountancy.analysis_tools'] },
        { id: 'cbse.acc.12.ch9', order: 9, title: 'Analysis of Financial Statements', kgNodeIds: ['accountancy.analysis_tools', 'accountancy.ratio_analysis'] },
        { id: 'cbse.acc.12.ch10', order: 10, title: 'Accounting Ratios', kgNodeIds: ['accountancy.ratio_analysis'] },
        { id: 'cbse.acc.12.ch11', order: 11, title: 'Cash Flow Statement', kgNodeIds: ['accountancy.cash_flow'] },
      ],
    },
  ],
}

export function getCBSEAccountancyChapters(grade: number) {
  return CBSE_ACCOUNTANCY_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSEAccountancyChapter(id: string) {
  for (const grade of CBSE_ACCOUNTANCY_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

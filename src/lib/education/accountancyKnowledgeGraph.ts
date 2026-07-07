import type { KnowledgeNode } from './educationTypes'

export const ACCOUNTANCY_KNOWLEDGE_GRAPH: KnowledgeNode[] = [
  // ─── ACCOUNTING FUNDAMENTALS ─────────────────────────────────
  { id: 'accountancy.intro_accounting', domain: 'accountancy', title: 'Introduction to Accounting', description: 'Meaning, objectives and scope of accounting; accounting as an information system; qualitative characteristics of accounting information; users of accounting information', difficulty: 'foundational', prerequisites: [] },
  { id: 'accountancy.accounting_equation', domain: 'accountancy', title: 'Accounting Equation', description: 'Assets, liabilities and capital; accounting equation (Assets = Liabilities + Capital); effect of business transactions on accounting equation', difficulty: 'foundational', prerequisites: ['accountancy.intro_accounting'] },
  { id: 'accountancy.double_entry', domain: 'accountancy', title: 'Double Entry System', description: 'Meaning and features of double entry system; debit and credit rules; classification of accounts (personal, real, impersonal); golden rules of accounting', difficulty: 'foundational', prerequisites: ['accountancy.accounting_equation'] },
  { id: 'accountancy.source_documents', domain: 'accountancy', title: 'Source Documents and Vouchers', description: 'Source documents — cash memo, invoice, receipt, debit/credit note, pay-in slip; types of accounting vouchers; voucher preparation', difficulty: 'foundational', prerequisites: ['accountancy.double_entry'] },

  // ─── JOURNAL AND LEDGER ──────────────────────────────────────
  { id: 'accountancy.journal', domain: 'accountancy', title: 'Journal', description: 'Meaning and format of journal; journalising business transactions; compound journal entries; opening entry', difficulty: 'foundational', prerequisites: ['accountancy.double_entry', 'accountancy.source_documents'] },
  { id: 'accountancy.ledger', domain: 'accountancy', title: 'Ledger', description: 'Meaning and utility of ledger; posting from journal to ledger; balancing of accounts', difficulty: 'developing', prerequisites: ['accountancy.journal'] },
  { id: 'accountancy.special_journals', domain: 'accountancy', title: 'Special Purpose Books (Subsidiary Books)', description: 'Cash book (simple, double column, triple column, petty cash); purchases book, sales book, returns books; uses and advantages of subsidiary books', difficulty: 'developing', prerequisites: ['accountancy.journal'] },

  // ─── BANK RECONCILIATION ─────────────────────────────────────
  { id: 'accountancy.bank_reconciliation', domain: 'accountancy', title: 'Bank Reconciliation Statement', description: 'Need for bank reconciliation; causes of differences between cash book and pass book balances; preparation of bank reconciliation statement', difficulty: 'developing', prerequisites: ['accountancy.special_journals'] },

  // ─── TRIAL BALANCE ───────────────────────────────────────────
  { id: 'accountancy.trial_balance', domain: 'accountancy', title: 'Trial Balance', description: 'Meaning and objectives of trial balance; preparation of trial balance; errors disclosed and not disclosed by trial balance', difficulty: 'developing', prerequisites: ['accountancy.ledger'] },
  { id: 'accountancy.errors_rectification', domain: 'accountancy', title: 'Rectification of Errors', description: 'Types of errors — errors of omission, commission, principle, compensating; rectification before and after preparation of trial balance; suspense account', difficulty: 'proficient', prerequisites: ['accountancy.trial_balance'] },

  // ─── DEPRECIATION AND PROVISIONS ─────────────────────────────
  { id: 'accountancy.depreciation', domain: 'accountancy', title: 'Depreciation, Provisions and Reserves', description: 'Meaning, causes and methods of depreciation (straight line, written down value); accounting treatment; difference between provisions and reserves; secret reserves', difficulty: 'proficient', prerequisites: ['accountancy.ledger'] },

  // ─── FINANCIAL STATEMENTS ────────────────────────────────────
  { id: 'accountancy.trading_pl', domain: 'accountancy', title: 'Trading and Profit & Loss Account', description: 'Preparation of trading account; gross profit; preparation of profit and loss account; adjustments — outstanding expenses, prepaid expenses, accrued income, income received in advance, depreciation', difficulty: 'proficient', prerequisites: ['accountancy.trial_balance', 'accountancy.depreciation'] },
  { id: 'accountancy.balance_sheet', domain: 'accountancy', title: 'Balance Sheet', description: 'Meaning and format of balance sheet; marshalling of assets and liabilities; preparation with adjustments; distinction between capital and revenue expenditure', difficulty: 'proficient', prerequisites: ['accountancy.trading_pl'] },
  { id: 'accountancy.incomplete_records', domain: 'accountancy', title: 'Accounts from Incomplete Records', description: 'Meaning and limitations of single entry system; statement of affairs method; conversion method; ascertainment of profit or loss', difficulty: 'proficient', prerequisites: ['accountancy.balance_sheet'] },

  // ─── ACCOUNTING FOR NOT-FOR-PROFIT ───────────────────────────
  { id: 'accountancy.not_for_profit', domain: 'accountancy', title: 'Accounting for Not-for-Profit Organisations', description: 'Characteristics of not-for-profit organisations; receipts and payments account; income and expenditure account; balance sheet; capital fund', difficulty: 'proficient', prerequisites: ['accountancy.trading_pl'] },

  // ─── PARTNERSHIP ACCOUNTS ────────────────────────────────────
  { id: 'accountancy.partnership_basics', domain: 'accountancy', title: 'Partnership — Nature and Final Accounts', description: 'Partnership deed; capital accounts (fixed and fluctuating); profit and loss appropriation account; interest on capital and drawings; salary and commission to partners', difficulty: 'proficient', prerequisites: ['accountancy.trading_pl'] },
  { id: 'accountancy.partnership_goodwill', domain: 'accountancy', title: 'Goodwill — Nature and Valuation', description: 'Meaning and nature of goodwill; factors affecting goodwill; methods of valuation — average profit, super profit, capitalisation', difficulty: 'proficient', prerequisites: ['accountancy.partnership_basics'] },
  { id: 'accountancy.partnership_reconstitution', domain: 'accountancy', title: 'Reconstitution of Partnership', description: 'Admission of a partner — new profit sharing ratio, sacrificing ratio, revaluation of assets/liabilities, treatment of goodwill, reserves; retirement and death of a partner', difficulty: 'advanced', prerequisites: ['accountancy.partnership_goodwill'] },
  { id: 'accountancy.dissolution', domain: 'accountancy', title: 'Dissolution of Partnership Firm', description: 'Modes of dissolution; realisation account; insolvency of partners — Garner v Murray rule; piecemeal distribution', difficulty: 'advanced', prerequisites: ['accountancy.partnership_reconstitution'] },

  // ─── COMPANY ACCOUNTS ────────────────────────────────────────
  { id: 'accountancy.shares', domain: 'accountancy', title: 'Accounting for Share Capital', description: 'Nature of company; types of shares — equity and preference; issue of shares at par, premium and discount; forfeiture and reissue of shares; rights and bonus issue', difficulty: 'advanced', prerequisites: ['accountancy.balance_sheet'] },
  { id: 'accountancy.debentures', domain: 'accountancy', title: 'Issue and Redemption of Debentures', description: 'Types of debentures; issue at par, premium and discount; issue as collateral security; writing off discount; redemption methods — lump sum, instalment, purchase in open market, conversion', difficulty: 'advanced', prerequisites: ['accountancy.shares'] },

  // ─── FINANCIAL STATEMENT ANALYSIS ───────────────────────────
  { id: 'accountancy.analysis_tools', domain: 'accountancy', title: 'Analysis of Financial Statements — Tools', description: 'Objectives and limitations of analysis; tools — comparative statements, common size statements, trend analysis; schedule III of Companies Act 2013', difficulty: 'advanced', prerequisites: ['accountancy.balance_sheet'] },
  { id: 'accountancy.ratio_analysis', domain: 'accountancy', title: 'Ratio Analysis', description: 'Meaning and classification of ratios; liquidity ratios (current, quick); solvency ratios (debt-equity, proprietary); activity ratios (inventory turnover, debtors, creditors, working capital); profitability ratios (gross profit, net profit, ROI)', difficulty: 'advanced', prerequisites: ['accountancy.analysis_tools'] },
  { id: 'accountancy.cash_flow', domain: 'accountancy', title: 'Cash Flow Statement', description: 'Meaning and objectives; AS-3 cash flow statement; operating, investing and financing activities; direct and indirect method; preparation of cash flow statement', difficulty: 'advanced', prerequisites: ['accountancy.ratio_analysis'] },

  // ─── COMPUTERISED ACCOUNTING ─────────────────────────────────
  { id: 'accountancy.computerised', domain: 'accountancy', title: 'Computerised Accounting System', description: 'Advantages over manual accounting; accounting software — features, codification and grouping of accounts; database management; data entry and generation of reports', difficulty: 'developing', prerequisites: ['accountancy.journal'] },
]

export function getAccountancyNode(id: string): KnowledgeNode | undefined {
  return ACCOUNTANCY_KNOWLEDGE_GRAPH.find((n) => n.id === id)
}

export function getAccountancyNodesByDomain(domain: string): KnowledgeNode[] {
  return ACCOUNTANCY_KNOWLEDGE_GRAPH.filter((n) => n.domain === domain)
}

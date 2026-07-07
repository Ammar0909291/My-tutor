import type { KnowledgeNode } from './educationTypes'

export const BUSINESS_STUDIES_KNOWLEDGE_GRAPH: KnowledgeNode[] = [
  // ─── NATURE AND PURPOSE OF BUSINESS ─────────────────────────
  { id: 'business_studies.nature_business', domain: 'business_studies', title: 'Nature and Purpose of Business', description: 'Concept, characteristics and objectives of business; business as an economic activity; classification of business activities — industry and commerce; commerce — trade and auxiliaries', difficulty: 'foundational', prerequisites: [] },
  { id: 'business_studies.forms_organisation', domain: 'business_studies', title: 'Forms of Business Organisation', description: 'Sole proprietorship, partnership, joint Hindu family business, cooperative societies; advantages and disadvantages; choice of form; factors affecting choice', difficulty: 'foundational', prerequisites: ['business_studies.nature_business'] },
  { id: 'business_studies.private_public', domain: 'business_studies', title: 'Private, Public and Global Enterprises', description: 'Private sector enterprises — types; public sector enterprises — departmental undertakings, statutory corporations, government companies; global enterprises — MNCs, joint ventures, public-private partnership', difficulty: 'developing', prerequisites: ['business_studies.forms_organisation'] },

  // ─── COMPANY ─────────────────────────────────────────────────
  { id: 'business_studies.company', domain: 'business_studies', title: 'Business Services — Company', description: 'Nature and types of company (private, public, one person); formation stages — promotion, incorporation, subscription, commencement; memorandum and articles of association; prospectus', difficulty: 'developing', prerequisites: ['business_studies.forms_organisation'] },

  // ─── BUSINESS SERVICES ───────────────────────────────────────
  { id: 'business_studies.banking', domain: 'business_studies', title: 'Banking Services', description: 'Types of bank accounts; banking services — loans, overdraft, discounting, remittances; e-banking; cheques, demand drafts, NEFT, RTGS, IMPS', difficulty: 'developing', prerequisites: ['business_studies.nature_business'] },
  { id: 'business_studies.insurance', domain: 'business_studies', title: 'Insurance', description: 'Principles of insurance — utmost good faith, insurable interest, indemnity, subrogation, contribution, proximate cause; types — life, fire, marine, motor, health; IRDA', difficulty: 'developing', prerequisites: ['business_studies.banking'] },
  { id: 'business_studies.transport_warehousing', domain: 'business_studies', title: 'Transport and Warehousing', description: 'Modes of transport — road, rail, air, water, pipeline; factors affecting choice; warehousing — types and functions; cold storage; bonded warehouses', difficulty: 'developing', prerequisites: ['business_studies.nature_business'] },
  { id: 'business_studies.communication', domain: 'business_studies', title: 'Communication Services in Business', description: 'Postal and courier services; telecom services; role of IT in business communication; e-commerce advantages and limitations', difficulty: 'developing', prerequisites: ['business_studies.nature_business'] },

  // ─── TRADE ───────────────────────────────────────────────────
  { id: 'business_studies.internal_trade', domain: 'business_studies', title: 'Internal Trade', description: 'Types — wholesale and retail; services of wholesalers and retailers; small-scale fixed shops, large-scale retailers; departmental stores, chain stores, supermarkets, mail-order, e-tailing', difficulty: 'developing', prerequisites: ['business_studies.nature_business'] },
  { id: 'business_studies.international_trade', domain: 'business_studies', title: 'International Trade', description: 'Meaning, advantages and disadvantages; balance of trade and payments; documents in international trade; terms of trade; EXIM policy; WTO, IMF, World Bank; SEZs', difficulty: 'proficient', prerequisites: ['business_studies.internal_trade'] },

  // ─── MANAGEMENT ──────────────────────────────────────────────
  { id: 'business_studies.nature_management', domain: 'business_studies', title: 'Nature and Significance of Management', description: 'Concept, objectives and importance of management; management as an art, science and profession; levels of management; management functions; coordination as essence of management', difficulty: 'developing', prerequisites: ['business_studies.nature_business'] },
  { id: 'business_studies.principles_management', domain: 'business_studies', title: 'Principles of Management', description: 'Nature and significance of management principles; Fayol\'s 14 principles; Taylor\'s scientific management; techniques of scientific management — functional foremanship, standardisation, method study, time-and-motion study', difficulty: 'developing', prerequisites: ['business_studies.nature_management'] },
  { id: 'business_studies.business_environment', domain: 'business_studies', title: 'Business Environment', description: 'Concept and importance; dimensions — economic, social, technological, political, legal; liberalisation, privatisation and globalisation (LPG); impact of changes', difficulty: 'developing', prerequisites: ['business_studies.nature_management'] },

  // ─── PLANNING AND ORGANISING ─────────────────────────────────
  { id: 'business_studies.planning', domain: 'business_studies', title: 'Planning', description: 'Concept, importance and limitations of planning; types of plans — objectives, strategies, policies, procedures, methods, rules, programmes, budgets; planning process', difficulty: 'proficient', prerequisites: ['business_studies.principles_management'] },
  { id: 'business_studies.organising', domain: 'business_studies', title: 'Organising', description: 'Concept and process of organising; formal and informal organisation; organisation structure — functional and divisional; delegation; decentralisation vs delegation; importance of decentralisation', difficulty: 'proficient', prerequisites: ['business_studies.planning'] },

  // ─── STAFFING, DIRECTING, CONTROLLING ───────────────────────
  { id: 'business_studies.staffing', domain: 'business_studies', title: 'Staffing', description: 'Concept, importance and process of staffing; recruitment — internal and external sources; selection process; training and development — on-the-job and off-the-job methods', difficulty: 'proficient', prerequisites: ['business_studies.organising'] },
  { id: 'business_studies.directing', domain: 'business_studies', title: 'Directing', description: 'Concept and elements of directing; motivation — Maslow\'s need hierarchy, financial and non-financial incentives; leadership — styles, qualities; communication — process, formal and informal, barriers, effective communication', difficulty: 'proficient', prerequisites: ['business_studies.staffing'] },
  { id: 'business_studies.controlling', domain: 'business_studies', title: 'Controlling', description: 'Concept and process of controlling; importance; relationship with planning; techniques — budgetary control, breakeven analysis, management audit, PERT, CPM; ROI', difficulty: 'proficient', prerequisites: ['business_studies.directing'] },

  // ─── FINANCIAL MANAGEMENT ────────────────────────────────────
  { id: 'business_studies.financial_management', domain: 'business_studies', title: 'Financial Management', description: 'Meaning, role and objectives of financial management; financial decisions — investment, financing, dividend; factors affecting financial decisions; financial planning; capital structure; fixed and working capital', difficulty: 'advanced', prerequisites: ['business_studies.nature_management'] },
  { id: 'business_studies.financial_markets', domain: 'business_studies', title: 'Financial Markets', description: 'Meaning and types — money market and capital market; primary and secondary markets; stock exchange — BSE, NSE; SEBI — objectives and functions; trading procedure; depository system; securities', difficulty: 'advanced', prerequisites: ['business_studies.financial_management'] },

  // ─── MARKETING ───────────────────────────────────────────────
  { id: 'business_studies.marketing', domain: 'business_studies', title: 'Marketing', description: 'Concept, functions and role of marketing; marketing mix — product, price, place, promotion; product life cycle; branding, labelling, packaging; channels of distribution; promotion tools — advertising, personal selling, publicity, sales promotion', difficulty: 'advanced', prerequisites: ['business_studies.nature_management'] },

  // ─── CONSUMER PROTECTION ─────────────────────────────────────
  { id: 'business_studies.consumer_protection', domain: 'business_studies', title: 'Consumer Protection', description: 'Importance of consumer protection; Consumer Protection Act 2019; rights and responsibilities of consumers; consumer redressal agencies (district, state, national); consumer awareness — COPRA, ISI, Agmark, ISO, Eco-mark, FPO', difficulty: 'developing', prerequisites: ['business_studies.internal_trade'] },

  // ─── ENTREPRENEURSHIP ────────────────────────────────────────
  { id: 'business_studies.entrepreneurship', domain: 'business_studies', title: 'Entrepreneurship Development', description: 'Concept and functions of entrepreneur; entrepreneurship as career; entrepreneurial journey; government schemes — Mudra, Startup India, Make in India; social entrepreneurship', difficulty: 'advanced', prerequisites: ['business_studies.forms_organisation'] },
]

export function getBusinessStudiesNode(id: string): KnowledgeNode | undefined {
  return BUSINESS_STUDIES_KNOWLEDGE_GRAPH.find((n) => n.id === id)
}

export function getBusinessStudiesNodesByDomain(domain: string): KnowledgeNode[] {
  return BUSINESS_STUDIES_KNOWLEDGE_GRAPH.filter((n) => n.domain === domain)
}

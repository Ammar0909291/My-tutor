import type { KnowledgeNode } from './educationTypes'

export const ECONOMICS_KNOWLEDGE_GRAPH: KnowledgeNode[] = [
  // ─── INTRODUCTION ────────────────────────────────────────────
  { id: 'economics.intro', domain: 'economics', title: 'Introduction to Economics', description: 'What is economics; microeconomics vs macroeconomics; central problems of an economy; production possibility frontier; opportunity cost; economic systems — capitalist, socialist, mixed', difficulty: 'foundational', prerequisites: [] },

  // ─── CONSUMER THEORY ─────────────────────────────────────────
  { id: 'economics.utility', domain: 'economics', title: 'Consumer Behaviour and Utility', description: 'Utility — total and marginal; law of diminishing marginal utility; consumer\'s equilibrium using utility approach; indifference curves and budget constraint; consumer\'s equilibrium using IC analysis; consumer surplus', difficulty: 'developing', prerequisites: ['economics.intro'] },
  { id: 'economics.demand', domain: 'economics', title: 'Theory of Demand', description: 'Demand function and demand curve; law of demand; determinants of demand; movement vs shift of demand curve; elasticity of demand — price, income, cross; measurement of price elasticity — total expenditure, point, arc methods; factors affecting PED', difficulty: 'developing', prerequisites: ['economics.utility'] },

  // ─── PRODUCTION AND COST ─────────────────────────────────────
  { id: 'economics.production', domain: 'economics', title: 'Production and Returns', description: 'Production function; total, average and marginal product; law of variable proportions; returns to scale; isoquants; producer\'s equilibrium — cost minimisation; expansion path', difficulty: 'developing', prerequisites: ['economics.intro'] },
  { id: 'economics.costs', domain: 'economics', title: 'Theory of Cost', description: 'Fixed and variable costs; total, average and marginal cost; relationship between AC and MC; short run and long run costs; economies and diseconomies of scale; revenue — total, average, marginal; relationship between AR, MR and elasticity', difficulty: 'proficient', prerequisites: ['economics.production'] },

  // ─── MARKET STRUCTURES ───────────────────────────────────────
  { id: 'economics.perfect_competition', domain: 'economics', title: 'Perfect Competition', description: 'Features of perfect competition; price determination under perfect competition; firm\'s equilibrium — TR-TC and MR-MC approaches; supply curve; market supply; price elasticity of supply; factors affecting supply', difficulty: 'proficient', prerequisites: ['economics.costs'] },
  { id: 'economics.imperfect_competition', domain: 'economics', title: 'Monopoly, Oligopoly and Monopolistic Competition', description: 'Sources of monopoly; price and output determination under monopoly; price discrimination; monopolistic competition — product differentiation, excess capacity; oligopoly — kinked demand curve, collusion, cartels, game theory basics', difficulty: 'advanced', prerequisites: ['economics.perfect_competition'] },

  // ─── NATIONAL INCOME ─────────────────────────────────────────
  { id: 'economics.national_income', domain: 'economics', title: 'National Income and Related Aggregates', description: 'GDP, GNP, NNP — at market price and factor cost; circular flow of income; methods of measuring national income — product, income, expenditure; nominal vs real GDP; GDP deflator; GDP and welfare limitations', difficulty: 'developing', prerequisites: ['economics.intro'] },
  { id: 'economics.income_employment', domain: 'economics', title: 'Income Determination and Employment', description: 'Aggregate demand and aggregate supply; consumption function — MPC, APC; savings function — MPS, APS; investment function; equilibrium income; multiplier effect; full employment equilibrium; inflationary and deflationary gaps; paradox of thrift', difficulty: 'proficient', prerequisites: ['economics.national_income'] },

  // ─── MONEY AND BANKING ───────────────────────────────────────
  { id: 'economics.money', domain: 'economics', title: 'Money and Banking', description: 'Functions and types of money; money supply — M1, M2, M3, M4; quantity theory of money; commercial banks — functions, credit creation; central bank — Reserve Bank of India, functions, monetary policy tools — CRR, SLR, repo rate, open market operations', difficulty: 'proficient', prerequisites: ['economics.national_income'] },

  // ─── GOVERNMENT FINANCE ──────────────────────────────────────
  { id: 'economics.government_budget', domain: 'economics', title: 'Government Budget and the Economy', description: 'Government budget — revenue and capital account; budget deficit — fiscal deficit, primary deficit, revenue deficit; types of taxation — direct and indirect; GST; government expenditure; fiscal policy; FRBM Act; deficit financing and its implications', difficulty: 'proficient', prerequisites: ['economics.national_income'] },

  // ─── OPEN ECONOMY ────────────────────────────────────────────
  { id: 'economics.balance_of_payments', domain: 'economics', title: 'Balance of Payments', description: 'Current account — balance of trade, invisibles; capital account — FDI, FII, external borrowings; official reserve transactions; BoP surplus and deficit; managed float; measures to correct BoP disequilibrium', difficulty: 'proficient', prerequisites: ['economics.money'] },
  { id: 'economics.exchange_rate', domain: 'economics', title: 'Exchange Rate', description: 'Fixed vs flexible exchange rate; purchasing power parity; factors affecting exchange rate; appreciation and depreciation; devaluation; exchange rate management; IMF and World Bank roles', difficulty: 'proficient', prerequisites: ['economics.balance_of_payments'] },

  // ─── INDIAN ECONOMY ──────────────────────────────────────────
  { id: 'economics.indian_economy_overview', domain: 'economics', title: 'Indian Economy — Overview', description: 'State of Indian economy at independence; features — agricultural predominance, mass poverty, low per capita income, demographic challenge; economic planning — objectives, NITI Aayog; sectors — primary, secondary, tertiary; GDP composition', difficulty: 'developing', prerequisites: ['economics.national_income'] },
  { id: 'economics.indian_agriculture', domain: 'economics', title: 'Agriculture in India', description: 'Role of agriculture; land reforms; Green Revolution; agricultural marketing; food security — PDS, buffer stocks; issues — water, soil, credit, crop insurance; new agricultural policy; e-NAM; MSP', difficulty: 'developing', prerequisites: ['economics.indian_economy_overview'] },
  { id: 'economics.industry_infrastructure', domain: 'economics', title: 'Industry and Infrastructure', description: 'Industrial policy — 1956, LPG reforms 1991; small-scale industries; disinvestment; infrastructure — energy, transport (roads, railways, waterways, airways), telecommunications; SEZs; Make in India', difficulty: 'developing', prerequisites: ['economics.indian_economy_overview'] },
  { id: 'economics.human_capital', domain: 'economics', title: 'Human Capital and Sustainable Development', description: 'Human development — education and health investment; HDI; poverty — absolute and relative, MPCE, MGNREGA, PM-KISAN; unemployment — types, disguised, structural; sustainable development; environmental and economic trade-offs', difficulty: 'proficient', prerequisites: ['economics.indian_economy_overview'] },
  { id: 'economics.liberalisation', domain: 'economics', title: 'Liberalisation, Privatisation and Globalisation', description: 'New economic policy 1991; liberalisation — delicensing, deregulation; privatisation — disinvestment; globalisation — WTO, FDI, outsourcing, TRIPS, TRIMS; impacts on Indian economy — GDP growth, income inequality, agriculture, small industries', difficulty: 'proficient', prerequisites: ['economics.industry_infrastructure'] },

  // ─── STATISTICS ──────────────────────────────────────────────
  { id: 'economics.statistics_intro', domain: 'economics', title: 'Statistics — Collection and Organisation of Data', description: 'What is statistics; collection of data — primary and secondary; methods of collection — questionnaire, interview, observation; frequency distribution; tally marks; classification; tabulation; inclusive and exclusive classes', difficulty: 'foundational', prerequisites: ['economics.intro'] },
  { id: 'economics.measures_central', domain: 'economics', title: 'Measures of Central Tendency', description: 'Arithmetic mean — direct, assumed mean, step deviation; weighted mean; median — individual, discrete, continuous; mode — individual, discrete, continuous; relationship between mean, median and mode; partition values — quartiles, deciles, percentiles', difficulty: 'developing', prerequisites: ['economics.statistics_intro'] },
  { id: 'economics.measures_dispersion', domain: 'economics', title: 'Measures of Dispersion and Correlation', description: 'Range; quartile deviation; mean deviation; standard deviation and variance; coefficient of variation; Lorenz curve; correlation — Karl Pearson\'s, Spearman\'s rank correlation; scatter diagram; properties of correlation coefficient', difficulty: 'proficient', prerequisites: ['economics.measures_central'] },
  { id: 'economics.index_numbers', domain: 'economics', title: 'Index Numbers', description: 'Meaning and uses; price index — Laspeyre\'s, Paasche\'s, Fisher\'s ideal; Consumer Price Index; WPI; CPI vs WPI; GDP deflator; construction and limitations of index numbers; index of industrial production', difficulty: 'proficient', prerequisites: ['economics.measures_central'] },
]

export function getEconomicsNode(id: string): KnowledgeNode | undefined {
  return ECONOMICS_KNOWLEDGE_GRAPH.find((n) => n.id === id)
}

export function getEconomicsNodesByDomain(domain: string): KnowledgeNode[] {
  return ECONOMICS_KNOWLEDGE_GRAPH.filter((n) => n.domain === domain)
}

// India Education Knowledge Graph — Core Type System

export type Difficulty = 'foundational' | 'developing' | 'proficient' | 'advanced'

export type MathDomain =
  | 'arithmetic'
  | 'number_systems'
  | 'fractions'
  | 'decimals'
  | 'integers'
  | 'ratios_proportions'
  | 'percentages'
  | 'exponents_powers'
  | 'algebra'
  | 'geometry'
  | 'mensuration'
  | 'coordinate_geometry'
  | 'trigonometry'
  | 'statistics'
  | 'probability'
  | 'functions'
  | 'calculus'
  | 'vectors'
  | 'matrices'
  | 'combinatorics'

export type ScienceDomain =
  | 'physics.measurement'
  | 'physics.kinematics'
  | 'physics.forces'
  | 'physics.work_energy'
  | 'physics.rotational_motion'
  | 'physics.gravitation'
  | 'physics.mechanical_properties'
  | 'physics.thermodynamics'
  | 'physics.waves_oscillations'
  | 'physics.optics'
  | 'physics.electricity'
  | 'physics.magnetism'
  | 'physics.modern_physics'
  | 'physics.semiconductors'
  | 'chemistry.matter_mixtures'
  | 'chemistry.atomic_structure'
  | 'chemistry.periodic_table'
  | 'chemistry.chemical_bonding'
  | 'chemistry.chemical_reactions'
  | 'chemistry.acids_bases_salts'
  | 'chemistry.metals_nonmetals'
  | 'chemistry.thermochemistry'
  | 'chemistry.electrochemistry'
  | 'chemistry.organic_chemistry'
  | 'chemistry.biochemistry'
  | 'chemistry.environmental_chemistry'
  | 'biology.cell'
  | 'biology.plant_physiology'
  | 'biology.animal_physiology'
  | 'biology.reproduction'
  | 'biology.genetics'
  | 'biology.evolution'
  | 'biology.ecology'
  | 'biology.taxonomy'
  | 'biology.biotechnology'
  | 'earth_science.solar_system'
  | 'earth_science.earth_structure'
  | 'earth_science.climate_weather'
  | 'environmental_science.natural_resources'
  | 'environmental_science.pollution'
  | 'environmental_science.conservation'

export type EnglishDomain =
  | 'grammar.alphabet_phonics'
  | 'grammar.parts_of_speech'
  | 'grammar.articles'
  | 'grammar.sentences'
  | 'grammar.tenses'
  | 'grammar.punctuation'
  | 'grammar.clauses_phrases'
  | 'grammar.voice'
  | 'grammar.narration'
  | 'grammar.conditionals'
  | 'grammar.modals'
  | 'vocabulary.basic_words'
  | 'vocabulary.word_formation'
  | 'vocabulary.synonyms_antonyms'
  | 'vocabulary.idioms_phrases'
  | 'vocabulary.academic'
  | 'reading.comprehension_basic'
  | 'reading.comprehension_advanced'
  | 'reading.strategies'
  | 'reading.literary_analysis'
  | 'writing.sentences_paragraphs'
  | 'writing.essay_types'
  | 'writing.formal_informal'
  | 'writing.creative'
  | 'communication.speaking'
  | 'communication.listening'
  | 'communication.debate'
  | 'literature.prose'
  | 'literature.poetry'
  | 'literature.drama'

export type SocialScienceDomain =
  | 'history.ancient_india'
  | 'history.medieval_india'
  | 'history.modern_india'
  | 'history.world_history'
  | 'history.ancient_world'
  | 'history.post_independence'
  | 'geography.earth_globe'
  | 'geography.india_physical'
  | 'geography.india_resources'
  | 'geography.world_physical'
  | 'geography.human_geography'
  | 'geography.maps'
  | 'civics.government_systems'
  | 'civics.constitution'
  | 'civics.local_government'
  | 'civics.national_government'
  | 'civics.international_relations'
  | 'economics.basic_economics'
  | 'economics.markets'
  | 'economics.indian_economy'
  | 'economics.development'
  | 'economics.money_banking'
  | 'economics.globalisation'
  | 'economics.statistics'
  | 'society.social_institutions'
  | 'society.social_inequality'
  | 'society.social_change'

export type HindiDomain =
  | 'hindi.vyakaran'
  | 'hindi.shabdavali'
  | 'hindi.padhna'
  | 'hindi.lekhan'
  | 'hindi.gadya'
  | 'hindi.padya'
  | 'hindi.sahitya_vishleshan'
  | 'hindi.kavya_bodh'

export type SanskritDomain =
  | 'sanskrit.vyakarana'
  | 'sanskrit.sandhi'
  | 'sanskrit.samasa'
  | 'sanskrit.shabda_roopa'
  | 'sanskrit.dhaatu_roopa'
  | 'sanskrit.gadya'
  | 'sanskrit.padya'
  | 'sanskrit.sahitya_vishleshan'
  | 'sanskrit.kavya_bodh'

export type AnyDomain = MathDomain | ScienceDomain | EnglishDomain | SocialScienceDomain | HindiDomain | SanskritDomain

export interface KnowledgeNode {
  id: string
  domain: string
  title: string
  description: string
  difficulty: Difficulty
  prerequisites: string[]
}

export interface Chapter {
  id: string
  order: number
  title: string
  kgNodeIds: string[]
}

export interface GradeSubjectCatalog {
  grade: number
  chapters: Chapter[]
}

export interface BoardSubjectCatalog {
  boardId: string
  subjectSlug: string
  subjectName: string
  grades: GradeSubjectCatalog[]
}

export interface EducationBoard {
  id: string
  name: string
  shortName: string
  country: string
  state?: string
  subjects: string[]
  grades: number[]
}

export interface EducationCountry {
  id: string
  name: string
  boards: EducationBoard[]
}

export type LearningMode = 'general' | 'school'

export interface SchoolContext {
  mode: 'school'
  countryId: string
  boardId: string
  grade: number
  subjectSlug: string
}

export interface GeneralContext {
  mode: 'general'
}

export type LearningContext = SchoolContext | GeneralContext

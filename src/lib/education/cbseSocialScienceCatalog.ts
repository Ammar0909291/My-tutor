import type { BoardSubjectCatalog } from './educationTypes'

/**
 * CBSE Social Science — grades 5-10 integrated Social Science; grades 11-12
 * split into History / Geography / Political Science / Economics streams
 * (Sprint AV).
 *
 * Authored against the CURRENT rationalized CBSE/NCERT syllabus (2023-24),
 * NOT copied verbatim from UP Board. Chapters CBSE deleted in
 * rationalization are intentionally absent — every removal is commented at
 * the grade where it applies. Grades 11-12 keep UP's single-catalog
 * convention: each chapter id carries a histN/geoN/polN/ecoN segment and the
 * title is prefixed with [History]/[Geography]/[Political Science]/
 * [Economics], so the four senior-secondary subjects coexist in one
 * 'social_science' catalog (matches the validated UP structure and keeps the
 * coverage comparison apples-to-apples).
 *
 * Every kgNodeId references an EXISTING node in socialScienceKnowledgeGraph.ts
 * — verified by coverageAudit.findUnmappedChapters (Sprint AV audit).
 *
 * Maintenance note: SST rationalization lists shift between NCERT print runs,
 * and the NCF-2023 textbooks (e.g. Class 6 "Exploring Society: India and
 * Beyond") are replacing the old three-book structure from the lower grades
 * upward. Re-verify against the official CBSE syllabus PDF each academic year.
 */
export const CBSE_SOCIAL_SCIENCE_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'social_science',
  subjectName: 'Social Science',
  grades: [
    {
      grade: 5,
      // Class 5 is EVS under CBSE — modeled here as the social-studies strand,
      // mirroring UP's grade-5 framing.
      chapters: [
        { id: 'cbse.sst.5.ch1', order: 1, title: 'Our Earth — Shape and Movements', kgNodeIds: ['geography.earth_globe.basics'] },
        { id: 'cbse.sst.5.ch2', order: 2, title: 'Maps and Directions', kgNodeIds: ['geography.maps.reading'] },
        { id: 'cbse.sst.5.ch3', order: 3, title: 'Our Country India', kgNodeIds: ['geography.india_physical.relief_drainage'] },
        { id: 'cbse.sst.5.ch4', order: 4, title: 'Our Family and Community', kgNodeIds: ['society.social_institutions.family'] },
        { id: 'cbse.sst.5.ch5', order: 5, title: 'Our Government — Gram Panchayat', kgNodeIds: ['civics.local_government.panchayati_raj'] },
        { id: 'cbse.sst.5.ch6', order: 6, title: 'Ancient Civilisations', kgNodeIds: ['history.ancient_india.harappan'] },
        { id: 'cbse.sst.5.ch7', order: 7, title: 'Our Needs and Resources', kgNodeIds: ['economics.basic_economics.wants_scarcity'] },
        { id: 'cbse.sst.5.ch8', order: 8, title: 'Festivals and Traditions', kgNodeIds: ['society.social_institutions.family'] },
      ],
    },
    {
      grade: 6,
      chapters: [
        { id: 'cbse.sst.6.ch1', order: 1, title: 'The Earth and Its Movements', kgNodeIds: ['geography.earth_globe.basics'] },
        { id: 'cbse.sst.6.ch2', order: 2, title: 'Globe and Maps', kgNodeIds: ['geography.maps.reading'] },
        { id: 'cbse.sst.6.ch3', order: 3, title: 'Major Landforms', kgNodeIds: ['geography.earth_globe.landforms'] },
        { id: 'cbse.sst.6.ch4', order: 4, title: 'The Harappan Civilisation', kgNodeIds: ['history.ancient_india.harappan'] },
        { id: 'cbse.sst.6.ch5', order: 5, title: 'The Vedic Period', kgNodeIds: ['history.ancient_india.vedic_period'] },
        { id: 'cbse.sst.6.ch6', order: 6, title: 'Kingdoms, Kings and an Early Republic', kgNodeIds: ['history.ancient_india.vedic_period'] },
        { id: 'cbse.sst.6.ch7', order: 7, title: 'Diversity and Local Government', kgNodeIds: ['civics.local_government.panchayati_raj'] },
        { id: 'cbse.sst.6.ch8', order: 8, title: 'Government — Rural and Urban', kgNodeIds: ['civics.government_systems.democracy'] },
        { id: 'cbse.sst.6.ch9', order: 9, title: 'Wants, Needs and Economic Activities', kgNodeIds: ['economics.basic_economics.wants_scarcity'] },
        { id: 'cbse.sst.6.ch10', order: 10, title: 'Family and Social Life', kgNodeIds: ['society.social_institutions.family'] },
      ],
    },
    {
      grade: 7,
      chapters: [
        { id: 'cbse.sst.7.ch1', order: 1, title: 'Inside the Earth — Structure', kgNodeIds: ['geography.earth_globe.landforms'] },
        { id: 'cbse.sst.7.ch2', order: 2, title: 'Our Changing Earth and Climate', kgNodeIds: ['geography.world_physical.climate_biomes'] },
        { id: 'cbse.sst.7.ch3', order: 3, title: 'Natural Vegetation and Wildlife', kgNodeIds: ['geography.world_physical.climate_biomes'] },
        { id: 'cbse.sst.7.ch4', order: 4, title: 'The Delhi Sultanate', kgNodeIds: ['history.medieval_india.delhi_sultanate'] },
        { id: 'cbse.sst.7.ch5', order: 5, title: 'The Mughal Empire', kgNodeIds: ['history.medieval_india.mughal_empire'] },
        { id: 'cbse.sst.7.ch6', order: 6, title: 'Devotional Paths — Bhakti and Sufi', kgNodeIds: ['history.medieval_india.bhakti_sufi'] },
        { id: 'cbse.sst.7.ch7', order: 7, title: 'The Indian Constitution — Rights', kgNodeIds: ['civics.constitution.rights_duties'] },
        { id: 'cbse.sst.7.ch8', order: 8, title: 'Role of the Government in Health', kgNodeIds: ['civics.government_systems.democracy'] },
        { id: 'cbse.sst.7.ch9', order: 9, title: 'Markets Around Us', kgNodeIds: ['economics.markets.supply_demand'] },
        { id: 'cbse.sst.7.ch10', order: 10, title: 'Social Inequality and Marginalisation', kgNodeIds: ['society.social_inequality.gender_caste'] },
        { id: 'cbse.sst.7.ch11', order: 11, title: 'Human Environment and Settlement', kgNodeIds: ['geography.human_geography.population'] },
      ],
    },
    {
      grade: 8,
      chapters: [
        { id: 'cbse.sst.8.ch1', order: 1, title: 'Resources — Types and Conservation', kgNodeIds: ['geography.india_resources.minerals_energy'] },
        { id: 'cbse.sst.8.ch2', order: 2, title: 'Agriculture and Land Use', kgNodeIds: ['geography.india_resources.agriculture'] },
        { id: 'cbse.sst.8.ch3', order: 3, title: 'How, When and Where — The Colonial Period', kgNodeIds: ['history.modern_india.colonial_period'] },
        { id: 'cbse.sst.8.ch4', order: 4, title: 'Ruling the Countryside and Tribal Society', kgNodeIds: ['history.modern_india.colonial_period'] },
        { id: 'cbse.sst.8.ch5', order: 5, title: 'The Making of the National Movement', kgNodeIds: ['history.modern_india.independence_movement'] },
        { id: 'cbse.sst.8.ch6', order: 6, title: 'The Indian Constitution and the Parliament', kgNodeIds: ['civics.national_government.parliament'] },
        { id: 'cbse.sst.8.ch7', order: 7, title: 'Understanding Laws and the Judiciary', kgNodeIds: ['civics.national_government.executive_judiciary'] },
        { id: 'cbse.sst.8.ch8', order: 8, title: 'Poverty and Public Facilities', kgNodeIds: ['economics.development.poverty'] },
        { id: 'cbse.sst.8.ch9', order: 9, title: 'Social Justice and Marginalised Groups', kgNodeIds: ['society.social_change.reform'] },
        { id: 'cbse.sst.8.ch10', order: 10, title: 'Industries and Transport in India', kgNodeIds: ['geography.india_resources.industries_transport'] },
      ],
    },
    {
      grade: 9,
      chapters: [
        { id: 'cbse.sst.9.hist1', order: 1, title: '[History] The French Revolution', kgNodeIds: ['history.world_history.french_revolution'] },
        { id: 'cbse.sst.9.hist2', order: 2, title: '[History] Socialism in Europe and the Russian Revolution', kgNodeIds: ['history.world_history.industrialisation'] },
        { id: 'cbse.sst.9.hist3', order: 3, title: '[History] Nazism and the Rise of Hitler', kgNodeIds: ['history.world_history.world_wars'] },
        { id: 'cbse.sst.9.hist4', order: 4, title: '[History] Forest Society and Colonialism', kgNodeIds: ['history.modern_india.colonial_period'] },
        { id: 'cbse.sst.9.hist5', order: 5, title: '[History] Pastoralists in the Modern World', kgNodeIds: ['history.modern_india.colonial_period'] },
        { id: 'cbse.sst.9.geo1', order: 6, title: '[Geography] India — Size and Location', kgNodeIds: ['geography.india_physical.relief_drainage'] },
        { id: 'cbse.sst.9.geo2', order: 7, title: '[Geography] Physical Features of India', kgNodeIds: ['geography.india_physical.relief_drainage'] },
        { id: 'cbse.sst.9.geo3', order: 8, title: '[Geography] Drainage', kgNodeIds: ['geography.india_physical.relief_drainage'] },
        { id: 'cbse.sst.9.geo4', order: 9, title: '[Geography] Climate', kgNodeIds: ['geography.india_physical.climate_vegetation'] },
        { id: 'cbse.sst.9.geo5', order: 10, title: '[Geography] Natural Vegetation and Wildlife', kgNodeIds: ['geography.india_physical.climate_vegetation'] },
        { id: 'cbse.sst.9.geo6', order: 11, title: '[Geography] Population', kgNodeIds: ['geography.human_geography.population'] },
        { id: 'cbse.sst.9.civ1', order: 12, title: '[Political Science] What is Democracy? Why Democracy?', kgNodeIds: ['civics.government_systems.democracy'] },
        { id: 'cbse.sst.9.civ2', order: 13, title: '[Political Science] Constitutional Design', kgNodeIds: ['civics.constitution.rights_duties'] },
        { id: 'cbse.sst.9.civ3', order: 14, title: '[Political Science] Electoral Politics', kgNodeIds: ['civics.national_government.parliament'] },
        { id: 'cbse.sst.9.civ4', order: 15, title: '[Political Science] Working of Institutions', kgNodeIds: ['civics.national_government.executive_judiciary'] },
        { id: 'cbse.sst.9.eco1', order: 16, title: '[Economics] The Story of Village Palampur', kgNodeIds: ['economics.indian_economy.sectors'] },
        { id: 'cbse.sst.9.eco2', order: 17, title: '[Economics] People as Resource', kgNodeIds: ['economics.development.poverty'] },
        { id: 'cbse.sst.9.eco3', order: 18, title: '[Economics] Poverty as a Challenge', kgNodeIds: ['economics.development.poverty'] },
        { id: 'cbse.sst.9.eco4', order: 19, title: '[Economics] Food Security in India', kgNodeIds: ['economics.development.poverty'] },
        // Rationalization (Class 9): "Democratic Rights" (Civics) deleted by CBSE.
      ],
    },
    {
      grade: 10,
      chapters: [
        { id: 'cbse.sst.10.hist1', order: 1, title: '[History] The Rise of Nationalism in Europe', kgNodeIds: ['history.world_history.french_revolution'] },
        { id: 'cbse.sst.10.hist2', order: 2, title: '[History] Nationalism in India', kgNodeIds: ['history.modern_india.independence_movement'] },
        { id: 'cbse.sst.10.hist3', order: 3, title: '[History] The Making of a Global World', kgNodeIds: ['history.world_history.industrialisation'] },
        { id: 'cbse.sst.10.hist4', order: 4, title: '[History] The Age of Industrialisation', kgNodeIds: ['history.world_history.industrialisation'] },
        { id: 'cbse.sst.10.hist5', order: 5, title: '[History] Print Culture and the Modern World', kgNodeIds: ['history.world_history.industrialisation'] },
        { id: 'cbse.sst.10.geo1', order: 6, title: '[Geography] Resources and Development', kgNodeIds: ['geography.india_resources.agriculture'] },
        { id: 'cbse.sst.10.geo2', order: 7, title: '[Geography] Forest and Wildlife Resources', kgNodeIds: ['geography.india_physical.climate_vegetation'] },
        { id: 'cbse.sst.10.geo3', order: 8, title: '[Geography] Water Resources', kgNodeIds: ['geography.india_resources.agriculture'] },
        { id: 'cbse.sst.10.geo4', order: 9, title: '[Geography] Agriculture', kgNodeIds: ['geography.india_resources.agriculture'] },
        { id: 'cbse.sst.10.geo5', order: 10, title: '[Geography] Minerals and Energy Resources', kgNodeIds: ['geography.india_resources.minerals_energy'] },
        { id: 'cbse.sst.10.geo6', order: 11, title: '[Geography] Manufacturing Industries', kgNodeIds: ['geography.india_resources.industries_transport'] },
        { id: 'cbse.sst.10.geo7', order: 12, title: '[Geography] Lifelines of National Economy', kgNodeIds: ['geography.india_resources.industries_transport'] },
        { id: 'cbse.sst.10.civ1', order: 13, title: '[Political Science] Power Sharing', kgNodeIds: ['civics.constitution.federalism'] },
        { id: 'cbse.sst.10.civ2', order: 14, title: '[Political Science] Federalism', kgNodeIds: ['civics.constitution.federalism'] },
        { id: 'cbse.sst.10.civ3', order: 15, title: '[Political Science] Gender, Religion and Caste', kgNodeIds: ['society.social_inequality.gender_caste'] },
        { id: 'cbse.sst.10.civ4', order: 16, title: '[Political Science] Political Parties', kgNodeIds: ['civics.national_government.parliament'] },
        { id: 'cbse.sst.10.civ5', order: 17, title: '[Political Science] Outcomes of Democracy', kgNodeIds: ['civics.government_systems.democracy'] },
        { id: 'cbse.sst.10.eco1', order: 18, title: '[Economics] Development', kgNodeIds: ['economics.development.poverty'] },
        { id: 'cbse.sst.10.eco2', order: 19, title: '[Economics] Sectors of the Indian Economy', kgNodeIds: ['economics.indian_economy.sectors'] },
        { id: 'cbse.sst.10.eco3', order: 20, title: '[Economics] Money and Credit', kgNodeIds: ['economics.money_banking.currency'] },
        { id: 'cbse.sst.10.eco4', order: 21, title: '[Economics] Globalisation and the Indian Economy', kgNodeIds: ['economics.globalisation.trade'] },
        { id: 'cbse.sst.10.eco5', order: 22, title: '[Economics] Consumer Rights', kgNodeIds: ['economics.markets.supply_demand'] },
        // Rationalization (Class 10): "Democracy and Diversity", "Popular
        // Struggles and Movements", and "Challenges to Democracy" (Civics)
        // deleted by CBSE.
      ],
    },
    {
      grade: 11,
      chapters: [
        // ── History (Themes in World History) ──
        { id: 'cbse.sst.11.hist1', order: 1, title: '[History] From the Beginning of Time', kgNodeIds: ['history.ancient_world.greece_rome'] },
        { id: 'cbse.sst.11.hist2', order: 2, title: '[History] Writing and City Life', kgNodeIds: ['history.ancient_india.harappan'] },
        { id: 'cbse.sst.11.hist3', order: 3, title: '[History] An Empire Across Three Continents (Rome)', kgNodeIds: ['history.ancient_world.greece_rome'] },
        { id: 'cbse.sst.11.hist4', order: 4, title: '[History] The Central Islamic Lands', kgNodeIds: ['history.medieval_india.delhi_sultanate'] },
        { id: 'cbse.sst.11.hist5', order: 5, title: '[History] Changing Cultural Traditions — Renaissance', kgNodeIds: ['history.world_history.french_revolution'] },
        { id: 'cbse.sst.11.hist6', order: 6, title: '[History] The Industrial Revolution', kgNodeIds: ['history.world_history.industrialisation'] },
        { id: 'cbse.sst.11.hist7', order: 7, title: '[History] Paths to Modernisation', kgNodeIds: ['history.world_history.world_wars'] },
        // Rationalization (Class 11 History): "Nomadic Empires", "The Three
        // Orders", "Confrontation of Cultures", and "Displacing Indigenous
        // Peoples" themes deleted by CBSE.
        // ── Geography (Fundamentals of Physical Geography) ──
        { id: 'cbse.sst.11.geo1', order: 8, title: '[Geography] Geography as a Discipline', kgNodeIds: ['geography.earth_globe.basics'] },
        { id: 'cbse.sst.11.geo2', order: 9, title: '[Geography] The Origin and Evolution of the Earth', kgNodeIds: ['geography.earth_globe.landforms'] },
        { id: 'cbse.sst.11.geo3', order: 10, title: '[Geography] Interior of the Earth', kgNodeIds: ['geography.earth_globe.landforms'] },
        { id: 'cbse.sst.11.geo4', order: 11, title: '[Geography] Distribution of Oceans and Continents', kgNodeIds: ['geography.earth_globe.landforms'] },
        { id: 'cbse.sst.11.geo5', order: 12, title: '[Geography] Geomorphic Processes and Landforms', kgNodeIds: ['geography.earth_globe.landforms'] },
        { id: 'cbse.sst.11.geo6', order: 13, title: '[Geography] Composition and Structure of the Atmosphere', kgNodeIds: ['geography.world_physical.climate_biomes'] },
        { id: 'cbse.sst.11.geo7', order: 14, title: '[Geography] Solar Radiation, Heat Balance and Temperature', kgNodeIds: ['geography.world_physical.climate_biomes'] },
        { id: 'cbse.sst.11.geo8', order: 15, title: '[Geography] Atmospheric Circulation and Weather Systems', kgNodeIds: ['geography.world_physical.climate_biomes'] },
        { id: 'cbse.sst.11.geo9', order: 16, title: '[Geography] Water in the Atmosphere and World Climate', kgNodeIds: ['geography.world_physical.climate_biomes'] },
        { id: 'cbse.sst.11.geo10', order: 17, title: '[Geography] Water (Oceans) and Movements of Ocean Water', kgNodeIds: ['geography.earth_globe.landforms'] },
        { id: 'cbse.sst.11.geo11', order: 18, title: '[Geography] Life on the Earth and Biodiversity', kgNodeIds: ['geography.world_physical.climate_biomes'] },
        // ── Political Science (Political Theory + Indian Constitution at Work) ──
        { id: 'cbse.sst.11.pol1', order: 19, title: '[Political Science] Political Theory — An Introduction', kgNodeIds: ['civics.government_systems.democracy'] },
        { id: 'cbse.sst.11.pol2', order: 20, title: '[Political Science] Freedom', kgNodeIds: ['civics.constitution.rights_duties'] },
        { id: 'cbse.sst.11.pol3', order: 21, title: '[Political Science] Equality', kgNodeIds: ['civics.constitution.rights_duties'] },
        { id: 'cbse.sst.11.pol4', order: 22, title: '[Political Science] Social Justice', kgNodeIds: ['society.social_inequality.gender_caste'] },
        { id: 'cbse.sst.11.pol5', order: 23, title: '[Political Science] Rights', kgNodeIds: ['civics.constitution.rights_duties'] },
        { id: 'cbse.sst.11.pol6', order: 24, title: '[Political Science] Citizenship', kgNodeIds: ['civics.constitution.rights_duties'] },
        { id: 'cbse.sst.11.pol7', order: 25, title: '[Political Science] Nationalism', kgNodeIds: ['history.post_independence.constitution'] },
        { id: 'cbse.sst.11.pol8', order: 26, title: '[Political Science] Secularism', kgNodeIds: ['civics.constitution.rights_duties'] },
        // ── Economics (Statistics for Economics + Indian Economic Development) ──
        { id: 'cbse.sst.11.eco1', order: 27, title: '[Economics] Introduction and Collection of Data', kgNodeIds: ['economics.statistics.data'] },
        { id: 'cbse.sst.11.eco2', order: 28, title: '[Economics] Organisation and Presentation of Data', kgNodeIds: ['economics.statistics.data'] },
        { id: 'cbse.sst.11.eco3', order: 29, title: '[Economics] Measures of Central Tendency', kgNodeIds: ['economics.statistics.data'] },
        { id: 'cbse.sst.11.eco4', order: 30, title: '[Economics] Correlation and Index Numbers', kgNodeIds: ['economics.statistics.data'] },
        { id: 'cbse.sst.11.eco5', order: 31, title: '[Economics] Indian Economy on the Eve of Independence', kgNodeIds: ['economics.indian_economy.planning'] },
        { id: 'cbse.sst.11.eco6', order: 32, title: '[Economics] Indian Economy 1950–1990', kgNodeIds: ['economics.indian_economy.planning'] },
        { id: 'cbse.sst.11.eco7', order: 33, title: '[Economics] Liberalisation, Privatisation and Globalisation', kgNodeIds: ['economics.globalisation.trade'] },
        { id: 'cbse.sst.11.eco8', order: 34, title: '[Economics] Poverty and Human Capital Formation', kgNodeIds: ['economics.development.poverty'] },
        { id: 'cbse.sst.11.eco9', order: 35, title: '[Economics] Rural Development and Employment', kgNodeIds: ['economics.indian_economy.sectors'] },
        { id: 'cbse.sst.11.eco10', order: 36, title: '[Economics] Infrastructure and Sustainable Development', kgNodeIds: ['geography.human_geography.development'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        // ── History (Themes in Indian History I, II, III) ──
        { id: 'cbse.sst.12.hist1', order: 1, title: '[History] Bricks, Beads and Bones — Harappan Civilisation', kgNodeIds: ['history.ancient_india.harappan'] },
        { id: 'cbse.sst.12.hist2', order: 2, title: '[History] Kings, Farmers and Towns — Early States', kgNodeIds: ['history.ancient_india.maurya_gupta'] },
        { id: 'cbse.sst.12.hist3', order: 3, title: '[History] Kinship, Caste and Class', kgNodeIds: ['history.ancient_india.vedic_period'] },
        { id: 'cbse.sst.12.hist4', order: 4, title: '[History] Thinkers, Beliefs and Buildings — Buddhism', kgNodeIds: ['history.ancient_india.buddhism_jainism'] },
        { id: 'cbse.sst.12.hist5', order: 5, title: '[History] Through the Eyes of Travellers', kgNodeIds: ['history.medieval_india.mughal_empire'] },
        { id: 'cbse.sst.12.hist6', order: 6, title: '[History] Bhakti-Sufi Traditions', kgNodeIds: ['history.medieval_india.bhakti_sufi'] },
        { id: 'cbse.sst.12.hist7', order: 7, title: '[History] An Imperial Capital — Vijayanagara', kgNodeIds: ['history.medieval_india.regional_kingdoms'] },
        { id: 'cbse.sst.12.hist8', order: 8, title: '[History] Kings and Chronicles — The Mughal Court', kgNodeIds: ['history.medieval_india.mughal_empire'] },
        { id: 'cbse.sst.12.hist9', order: 9, title: '[History] Colonialism and the Countryside', kgNodeIds: ['history.modern_india.colonial_period'] },
        { id: 'cbse.sst.12.hist10', order: 10, title: '[History] Rebels and the Raj — 1857 Revolt', kgNodeIds: ['history.modern_india.colonial_period'] },
        { id: 'cbse.sst.12.hist11', order: 11, title: '[History] Mahatma Gandhi and the Nationalist Movement', kgNodeIds: ['history.modern_india.independence_movement'] },
        { id: 'cbse.sst.12.hist12', order: 12, title: '[History] Framing the Constitution', kgNodeIds: ['history.post_independence.constitution'] },
        // Rationalization (Class 12 History): "Colonial Cities" and
        // "Understanding Partition" themes deleted/merged by CBSE.
        // ── Geography (Fundamentals of Human Geography + India: People and Economy) ──
        { id: 'cbse.sst.12.geo1', order: 13, title: '[Geography] Human Geography — Nature and Scope', kgNodeIds: ['geography.human_geography.population'] },
        { id: 'cbse.sst.12.geo2', order: 14, title: '[Geography] The World Population — Distribution and Growth', kgNodeIds: ['geography.human_geography.population'] },
        { id: 'cbse.sst.12.geo3', order: 15, title: '[Geography] Human Development', kgNodeIds: ['geography.human_geography.development'] },
        { id: 'cbse.sst.12.geo4', order: 16, title: '[Geography] Primary Activities', kgNodeIds: ['geography.india_resources.agriculture'] },
        { id: 'cbse.sst.12.geo5', order: 17, title: '[Geography] Secondary Activities — Manufacturing', kgNodeIds: ['geography.india_resources.industries_transport'] },
        { id: 'cbse.sst.12.geo6', order: 18, title: '[Geography] Tertiary and Quaternary Activities', kgNodeIds: ['geography.india_resources.industries_transport'] },
        { id: 'cbse.sst.12.geo7', order: 19, title: '[Geography] Transport, Communication and International Trade', kgNodeIds: ['economics.globalisation.trade'] },
        { id: 'cbse.sst.12.geo8', order: 20, title: '[Geography] Human Settlements', kgNodeIds: ['geography.human_geography.population'] },
        { id: 'cbse.sst.12.geo9', order: 21, title: '[Geography] Land Resources and Agriculture in India', kgNodeIds: ['geography.india_resources.agriculture'] },
        { id: 'cbse.sst.12.geo10', order: 22, title: '[Geography] Mineral and Energy Resources', kgNodeIds: ['geography.india_resources.minerals_energy'] },
        { id: 'cbse.sst.12.geo11', order: 23, title: '[Geography] Planning and Sustainable Development', kgNodeIds: ['geography.human_geography.development'] },
        // ── Political Science (Contemporary World Politics + Politics in India Since Independence) ──
        { id: 'cbse.sst.12.pol1', order: 24, title: '[Political Science] The Cold War Era', kgNodeIds: ['civics.international_relations.cold_war'] },
        { id: 'cbse.sst.12.pol2', order: 25, title: '[Political Science] The End of Bipolarity', kgNodeIds: ['history.post_independence.contemporary'] },
        { id: 'cbse.sst.12.pol3', order: 26, title: '[Political Science] US Hegemony in World Politics', kgNodeIds: ['civics.international_relations.un'] },
        { id: 'cbse.sst.12.pol4', order: 27, title: '[Political Science] Alternative Centres of Power', kgNodeIds: ['civics.international_relations.un'] },
        { id: 'cbse.sst.12.pol5', order: 28, title: '[Political Science] Contemporary South Asia', kgNodeIds: ['civics.international_relations.un'] },
        { id: 'cbse.sst.12.pol6', order: 29, title: '[Political Science] International Organisations', kgNodeIds: ['civics.international_relations.un'] },
        { id: 'cbse.sst.12.pol7', order: 30, title: '[Political Science] Globalisation', kgNodeIds: ['economics.globalisation.trade'] },
        { id: 'cbse.sst.12.pol8', order: 31, title: '[Political Science] Challenges of Nation Building', kgNodeIds: ['history.post_independence.constitution'] },
        { id: 'cbse.sst.12.pol9', order: 32, title: '[Political Science] Era of One-Party Dominance', kgNodeIds: ['history.post_independence.contemporary'] },
        { id: 'cbse.sst.12.pol10', order: 33, title: '[Political Science] Politics of Planned Development', kgNodeIds: ['economics.indian_economy.planning'] },
        { id: 'cbse.sst.12.pol11', order: 34, title: "[Political Science] India's External Relations", kgNodeIds: ['civics.international_relations.un'] },
        { id: 'cbse.sst.12.pol12', order: 35, title: '[Political Science] Regional Aspirations', kgNodeIds: ['civics.constitution.federalism'] },
        { id: 'cbse.sst.12.pol13', order: 36, title: '[Political Science] Recent Developments in Indian Politics', kgNodeIds: ['history.post_independence.contemporary'] },
        // Rationalization (Class 12 Political Science): "Security in the
        // Contemporary World", "Environment and Natural Resources", "Crisis
        // of the Democratic Order", and "Rise of Popular Movements" deleted
        // by CBSE.
        // ── Economics (Introductory Macroeconomics + Indian Economic Development) ──
        { id: 'cbse.sst.12.eco1', order: 37, title: '[Economics] National Income Accounting', kgNodeIds: ['economics.indian_economy.sectors'] },
        { id: 'cbse.sst.12.eco2', order: 38, title: '[Economics] Money and Banking', kgNodeIds: ['economics.money_banking.currency'] },
        { id: 'cbse.sst.12.eco3', order: 39, title: '[Economics] Determination of Income and Employment', kgNodeIds: ['economics.markets.supply_demand'] },
        { id: 'cbse.sst.12.eco4', order: 40, title: '[Economics] Government Budget and the Economy', kgNodeIds: ['economics.indian_economy.planning'] },
        { id: 'cbse.sst.12.eco5', order: 41, title: '[Economics] Balance of Payments and Foreign Exchange', kgNodeIds: ['economics.globalisation.trade'] },
      ],
    },
  ],
}

export function getCBSESocialScienceChapters(grade: number) {
  return CBSE_SOCIAL_SCIENCE_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSESocialScienceChapter(id: string) {
  for (const grade of CBSE_SOCIAL_SCIENCE_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

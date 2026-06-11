import type { BoardSubjectCatalog } from './educationTypes'

/**
 * CBSE Science — grades 5-10 integrated Science, grades 11-12 split into
 * Physics / Chemistry / Biology streams (Sprint AU).
 *
 * Authored against the CURRENT rationalized CBSE/NCERT syllabus (2023-24),
 * NOT copied verbatim from UP Board. Chapters CBSE deleted in
 * rationalization are intentionally absent — every removal is commented at
 * the grade where it applies. Grades 11-12 keep UP's single-catalog
 * convention: each chapter id carries a phyN/chemN/bioN segment and the
 * title is prefixed with [Physics]/[Chemistry]/[Biology] so the three
 * senior-secondary subjects coexist in one 'science' catalog (matches the
 * validated UP structure and keeps the coverage comparison apples-to-apples).
 *
 * Every kgNodeId references an EXISTING node in scienceKnowledgeGraph.ts —
 * verified by coverageAudit.findUnmappedChapters (Sprint AU audit).
 *
 * Maintenance note: rationalization lists shift between NCERT print runs and
 * the NCF-2023 textbook rollout is replacing books from lower grades upward.
 * Re-verify against the official CBSE syllabus PDF each academic year.
 */
export const CBSE_SCIENCE_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'science',
  subjectName: 'Science',
  grades: [
    {
      grade: 5,
      // Class 5 is EVS ("Looking Around") under CBSE — modeled here as the
      // science strand, mirroring UP's grade-5 science framing.
      chapters: [
        { id: 'cbse.sci.5.ch1', order: 1, title: 'Super Senses (Animals)', kgNodeIds: ['biology.ecology.ecosystems'] },
        { id: 'cbse.sci.5.ch2', order: 2, title: 'Plants — Growth and Food', kgNodeIds: ['biology.plant_physiology.nutrition'] },
        { id: 'cbse.sci.5.ch3', order: 3, title: 'The Human Body and Health', kgNodeIds: ['biology.animal_physiology.digestion'] },
        { id: 'cbse.sci.5.ch4', order: 4, title: 'Food and Digestion', kgNodeIds: ['biology.animal_physiology.digestion'] },
        { id: 'cbse.sci.5.ch5', order: 5, title: 'Water — Sources and Conservation', kgNodeIds: ['environmental_science.natural_resources.management'] },
        { id: 'cbse.sci.5.ch6', order: 6, title: 'Air, Weather and Sky', kgNodeIds: ['earth_science.climate_weather.atmosphere'] },
        { id: 'cbse.sci.5.ch7', order: 7, title: 'Our Earth and the Solar System', kgNodeIds: ['earth_science.solar_system.planets'] },
        { id: 'cbse.sci.5.ch8', order: 8, title: 'Light, Shadows and Reflection', kgNodeIds: ['physics.optics.reflection_refraction'] },
        { id: 'cbse.sci.5.ch9', order: 9, title: 'Forces and Simple Machines', kgNodeIds: ['physics.forces.laws_of_motion'] },
        { id: 'cbse.sci.5.ch10', order: 10, title: 'Environment and Pollution', kgNodeIds: ['environmental_science.pollution.types'] },
      ],
    },
    {
      grade: 6,
      chapters: [
        { id: 'cbse.sci.6.ch1', order: 1, title: 'Food — Where Does It Come From?', kgNodeIds: ['biology.plant_physiology.nutrition'] },
        { id: 'cbse.sci.6.ch2', order: 2, title: 'Components of Food', kgNodeIds: ['biology.animal_physiology.digestion'] },
        { id: 'cbse.sci.6.ch3', order: 3, title: 'Fibre to Fabric', kgNodeIds: ['chemistry.matter_mixtures.matter'] },
        { id: 'cbse.sci.6.ch4', order: 4, title: 'Sorting Materials into Groups', kgNodeIds: ['chemistry.matter_mixtures.matter'] },
        { id: 'cbse.sci.6.ch5', order: 5, title: 'Separation of Substances', kgNodeIds: ['chemistry.matter_mixtures.matter'] },
        { id: 'cbse.sci.6.ch6', order: 6, title: 'Changes Around Us', kgNodeIds: ['chemistry.chemical_reactions.equations'] },
        { id: 'cbse.sci.6.ch7', order: 7, title: 'Getting to Know Plants', kgNodeIds: ['biology.plant_physiology.nutrition'] },
        { id: 'cbse.sci.6.ch8', order: 8, title: 'Body Movements', kgNodeIds: ['biology.animal_physiology.locomotion'] },
        { id: 'cbse.sci.6.ch9', order: 9, title: 'The Living Organisms and Their Surroundings', kgNodeIds: ['biology.cell.structure'] },
        { id: 'cbse.sci.6.ch10', order: 10, title: 'Motion and Measurement of Distances', kgNodeIds: ['physics.kinematics.motion_1d'] },
        { id: 'cbse.sci.6.ch11', order: 11, title: 'Light, Shadows and Reflections', kgNodeIds: ['physics.optics.reflection_refraction'] },
        { id: 'cbse.sci.6.ch12', order: 12, title: 'Electricity and Circuits', kgNodeIds: ['physics.electricity.current_circuits'] },
        { id: 'cbse.sci.6.ch13', order: 13, title: 'Fun with Magnets', kgNodeIds: ['physics.magnetism.permanent'] },
        { id: 'cbse.sci.6.ch14', order: 14, title: 'Water', kgNodeIds: ['environmental_science.natural_resources.management'] },
        { id: 'cbse.sci.6.ch15', order: 15, title: 'Air Around Us', kgNodeIds: ['earth_science.climate_weather.atmosphere'] },
        { id: 'cbse.sci.6.ch16', order: 16, title: 'Garbage In, Garbage Out', kgNodeIds: ['environmental_science.pollution.types'] },
      ],
    },
    {
      grade: 7,
      chapters: [
        { id: 'cbse.sci.7.ch1', order: 1, title: 'Nutrition in Plants', kgNodeIds: ['biology.plant_physiology.nutrition'] },
        { id: 'cbse.sci.7.ch2', order: 2, title: 'Nutrition in Animals', kgNodeIds: ['biology.animal_physiology.digestion'] },
        { id: 'cbse.sci.7.ch3', order: 3, title: 'Heat', kgNodeIds: ['physics.thermodynamics.heat_temperature'] },
        { id: 'cbse.sci.7.ch4', order: 4, title: 'Acids, Bases and Salts', kgNodeIds: ['chemistry.acids_bases_salts.basics'] },
        { id: 'cbse.sci.7.ch5', order: 5, title: 'Physical and Chemical Changes', kgNodeIds: ['chemistry.chemical_reactions.equations'] },
        { id: 'cbse.sci.7.ch6', order: 6, title: 'Respiration in Organisms', kgNodeIds: ['biology.animal_physiology.respiration'] },
        { id: 'cbse.sci.7.ch7', order: 7, title: 'Transportation in Animals and Plants', kgNodeIds: ['biology.plant_physiology.transport', 'biology.animal_physiology.circulation'] },
        { id: 'cbse.sci.7.ch8', order: 8, title: 'Reproduction in Plants', kgNodeIds: ['biology.reproduction.plants_animals'] },
        { id: 'cbse.sci.7.ch9', order: 9, title: 'Motion and Time', kgNodeIds: ['physics.kinematics.motion_1d'] },
        { id: 'cbse.sci.7.ch10', order: 10, title: 'Electric Current and Its Effects', kgNodeIds: ['physics.electricity.current_circuits'] },
        { id: 'cbse.sci.7.ch11', order: 11, title: 'Light', kgNodeIds: ['physics.optics.reflection_refraction'] },
        { id: 'cbse.sci.7.ch12', order: 12, title: 'Forests — Our Lifeline', kgNodeIds: ['biology.ecology.ecosystems'] },
        { id: 'cbse.sci.7.ch13', order: 13, title: 'Wastewater Story', kgNodeIds: ['environmental_science.pollution.types'] },
        // Rationalization (Class 7): Fibre to Fabric, Weather/Climate and
        // Adaptations, Winds Storms and Cyclones, Soil, and Water — A
        // Precious Resource removed/merged by CBSE.
      ],
    },
    {
      grade: 8,
      chapters: [
        { id: 'cbse.sci.8.ch1', order: 1, title: 'Crop Production and Management', kgNodeIds: ['biology.plant_physiology.nutrition'] },
        { id: 'cbse.sci.8.ch2', order: 2, title: 'Microorganisms — Friends and Foe', kgNodeIds: ['biology.taxonomy.classification'] },
        { id: 'cbse.sci.8.ch3', order: 3, title: 'Coal and Petroleum', kgNodeIds: ['chemistry.organic_chemistry.basics'] },
        { id: 'cbse.sci.8.ch4', order: 4, title: 'Combustion and Flame', kgNodeIds: ['chemistry.chemical_reactions.equations'] },
        { id: 'cbse.sci.8.ch5', order: 5, title: 'Conservation of Plants and Animals', kgNodeIds: ['environmental_science.conservation.biodiversity'] },
        { id: 'cbse.sci.8.ch6', order: 6, title: 'Reproduction in Animals', kgNodeIds: ['biology.reproduction.plants_animals'] },
        { id: 'cbse.sci.8.ch7', order: 7, title: 'Reaching the Age of Adolescence', kgNodeIds: ['biology.animal_physiology.nervous_endocrine'] },
        { id: 'cbse.sci.8.ch8', order: 8, title: 'Force and Pressure', kgNodeIds: ['physics.forces.laws_of_motion'] },
        { id: 'cbse.sci.8.ch9', order: 9, title: 'Friction', kgNodeIds: ['physics.forces.friction_circular'] },
        { id: 'cbse.sci.8.ch10', order: 10, title: 'Sound', kgNodeIds: ['physics.waves_oscillations.waves'] },
        { id: 'cbse.sci.8.ch11', order: 11, title: 'Chemical Effects of Electric Current', kgNodeIds: ['chemistry.electrochemistry.basics'] },
        { id: 'cbse.sci.8.ch12', order: 12, title: 'Some Natural Phenomena', kgNodeIds: ['earth_science.earth_structure.layers'] },
        { id: 'cbse.sci.8.ch13', order: 13, title: 'Light', kgNodeIds: ['physics.optics.reflection_refraction'] },
        // Rationalization (Class 8): Synthetic Fibres and Plastics, Materials
        // — Metals and Non-metals, Cell — Structure and Functions, Stars and
        // the Solar System, and Pollution of Air and Water removed/merged by CBSE.
      ],
    },
    {
      grade: 9,
      chapters: [
        { id: 'cbse.sci.9.ch1', order: 1, title: 'Matter in Our Surroundings', kgNodeIds: ['chemistry.matter_mixtures.matter'] },
        { id: 'cbse.sci.9.ch2', order: 2, title: 'Is Matter Around Us Pure?', kgNodeIds: ['chemistry.matter_mixtures.solutions'] },
        { id: 'cbse.sci.9.ch3', order: 3, title: 'Atoms and Molecules', kgNodeIds: ['chemistry.atomic_structure.basics'] },
        { id: 'cbse.sci.9.ch4', order: 4, title: 'Structure of the Atom', kgNodeIds: ['chemistry.atomic_structure.basics'] },
        { id: 'cbse.sci.9.ch5', order: 5, title: 'The Fundamental Unit of Life', kgNodeIds: ['biology.cell.structure'] },
        { id: 'cbse.sci.9.ch6', order: 6, title: 'Tissues', kgNodeIds: ['biology.cell.structure'] },
        { id: 'cbse.sci.9.ch7', order: 7, title: 'Motion', kgNodeIds: ['physics.kinematics.motion_1d'] },
        { id: 'cbse.sci.9.ch8', order: 8, title: 'Force and Laws of Motion', kgNodeIds: ['physics.forces.laws_of_motion'] },
        { id: 'cbse.sci.9.ch9', order: 9, title: 'Gravitation', kgNodeIds: ['physics.gravitation.universal'] },
        { id: 'cbse.sci.9.ch10', order: 10, title: 'Work and Energy', kgNodeIds: ['physics.work_energy.basics'] },
        { id: 'cbse.sci.9.ch11', order: 11, title: 'Sound', kgNodeIds: ['physics.waves_oscillations.waves'] },
        { id: 'cbse.sci.9.ch12', order: 12, title: 'Improvement in Food Resources', kgNodeIds: ['biology.plant_physiology.nutrition'] },
        // Rationalization (Class 9): Diversity in Living Organisms, Why Do We
        // Fall Ill?, and Natural Resources deleted by CBSE.
      ],
    },
    {
      grade: 10,
      chapters: [
        { id: 'cbse.sci.10.ch1', order: 1, title: 'Chemical Reactions and Equations', kgNodeIds: ['chemistry.chemical_reactions.equations'] },
        { id: 'cbse.sci.10.ch2', order: 2, title: 'Acids, Bases and Salts', kgNodeIds: ['chemistry.acids_bases_salts.basics'] },
        { id: 'cbse.sci.10.ch3', order: 3, title: 'Metals and Non-metals', kgNodeIds: ['chemistry.metals_nonmetals.reactivity'] },
        { id: 'cbse.sci.10.ch4', order: 4, title: 'Carbon and Its Compounds', kgNodeIds: ['chemistry.organic_chemistry.basics'] },
        { id: 'cbse.sci.10.ch5', order: 5, title: 'Life Processes', kgNodeIds: ['biology.animal_physiology.digestion', 'biology.plant_physiology.nutrition'] },
        { id: 'cbse.sci.10.ch6', order: 6, title: 'Control and Coordination', kgNodeIds: ['biology.animal_physiology.nervous_endocrine'] },
        { id: 'cbse.sci.10.ch7', order: 7, title: 'How Do Organisms Reproduce?', kgNodeIds: ['biology.reproduction.plants_animals'] },
        { id: 'cbse.sci.10.ch8', order: 8, title: 'Heredity', kgNodeIds: ['biology.genetics.mendel'] },
        { id: 'cbse.sci.10.ch9', order: 9, title: 'Light — Reflection and Refraction', kgNodeIds: ['physics.optics.reflection_refraction'] },
        { id: 'cbse.sci.10.ch10', order: 10, title: 'The Human Eye and the Colourful World', kgNodeIds: ['physics.optics.human_eye'] },
        { id: 'cbse.sci.10.ch11', order: 11, title: 'Electricity', kgNodeIds: ['physics.electricity.current_circuits'] },
        { id: 'cbse.sci.10.ch12', order: 12, title: 'Magnetic Effects of Electric Current', kgNodeIds: ['physics.magnetism.moving_charges'] },
        { id: 'cbse.sci.10.ch13', order: 13, title: 'Our Environment', kgNodeIds: ['biology.ecology.ecosystems'] },
        // Rationalization (Class 10): Periodic Classification of Elements,
        // Sources of Energy, and Sustainable Management of Natural Resources
        // deleted by CBSE; the Evolution half of "Heredity and Evolution"
        // removed (chapter is now "Heredity").
      ],
    },
    {
      grade: 11,
      chapters: [
        // ── Physics (Class 11) ──
        { id: 'cbse.sci.11.phy1', order: 1, title: '[Physics] Units and Measurements', kgNodeIds: ['physics.measurement.units'] },
        { id: 'cbse.sci.11.phy2', order: 2, title: '[Physics] Motion in a Straight Line and a Plane', kgNodeIds: ['physics.kinematics.motion_1d', 'physics.kinematics.motion_2d'] },
        { id: 'cbse.sci.11.phy3', order: 3, title: '[Physics] Laws of Motion', kgNodeIds: ['physics.forces.laws_of_motion'] },
        { id: 'cbse.sci.11.phy4', order: 4, title: '[Physics] Work, Energy and Power', kgNodeIds: ['physics.work_energy.basics'] },
        { id: 'cbse.sci.11.phy5', order: 5, title: '[Physics] System of Particles and Rotational Motion', kgNodeIds: ['physics.rotational_motion.torque_angular'] },
        { id: 'cbse.sci.11.phy6', order: 6, title: '[Physics] Gravitation', kgNodeIds: ['physics.gravitation.universal'] },
        { id: 'cbse.sci.11.phy7', order: 7, title: '[Physics] Mechanical Properties of Solids and Fluids', kgNodeIds: ['physics.mechanical_properties.solids_fluids'] },
        { id: 'cbse.sci.11.phy8', order: 8, title: '[Physics] Thermodynamics', kgNodeIds: ['physics.thermodynamics.laws'] },
        { id: 'cbse.sci.11.phy9', order: 9, title: '[Physics] Kinetic Theory', kgNodeIds: ['physics.thermodynamics.heat_temperature'] },
        { id: 'cbse.sci.11.phy10', order: 10, title: '[Physics] Oscillations and Waves', kgNodeIds: ['physics.waves_oscillations.shm', 'physics.waves_oscillations.waves'] },
        // Rationalization (Class 11 Physics): "Physical World" (standalone
        // introductory chapter) removed; measurement content retained above.
        // ── Chemistry (Class 11) ──
        { id: 'cbse.sci.11.chem1', order: 11, title: '[Chemistry] Some Basic Concepts of Chemistry', kgNodeIds: ['chemistry.chemical_reactions.stoichiometry'] },
        { id: 'cbse.sci.11.chem2', order: 12, title: '[Chemistry] Structure of Atom', kgNodeIds: ['chemistry.atomic_structure.quantum'] },
        { id: 'cbse.sci.11.chem3', order: 13, title: '[Chemistry] Classification of Elements and Periodicity', kgNodeIds: ['chemistry.periodic_table.trends'] },
        { id: 'cbse.sci.11.chem4', order: 14, title: '[Chemistry] Chemical Bonding and Molecular Structure', kgNodeIds: ['chemistry.chemical_bonding.ionic_covalent'] },
        { id: 'cbse.sci.11.chem5', order: 15, title: '[Chemistry] Thermodynamics', kgNodeIds: ['chemistry.thermochemistry.basics'] },
        { id: 'cbse.sci.11.chem6', order: 16, title: '[Chemistry] Equilibrium', kgNodeIds: ['chemistry.acids_bases_salts.equilibrium'] },
        { id: 'cbse.sci.11.chem7', order: 17, title: '[Chemistry] Redox Reactions', kgNodeIds: ['chemistry.chemical_reactions.equations'] },
        { id: 'cbse.sci.11.chem8', order: 18, title: '[Chemistry] Organic Chemistry — Basic Principles and Techniques', kgNodeIds: ['chemistry.organic_chemistry.basics'] },
        { id: 'cbse.sci.11.chem9', order: 19, title: '[Chemistry] Hydrocarbons', kgNodeIds: ['chemistry.organic_chemistry.basics'] },
        // Rationalization (Class 11 Chemistry): States of Matter, Hydrogen,
        // The s-Block Elements, The p-Block Elements, and Environmental
        // Chemistry deleted by CBSE.
        // ── Biology (Class 11) ──
        { id: 'cbse.sci.11.bio1', order: 20, title: '[Biology] The Living World', kgNodeIds: ['biology.taxonomy.classification'] },
        { id: 'cbse.sci.11.bio2', order: 21, title: '[Biology] Biological Classification', kgNodeIds: ['biology.taxonomy.classification'] },
        { id: 'cbse.sci.11.bio3', order: 22, title: '[Biology] Plant Kingdom', kgNodeIds: ['biology.taxonomy.classification'] },
        { id: 'cbse.sci.11.bio4', order: 23, title: '[Biology] Animal Kingdom', kgNodeIds: ['biology.taxonomy.classification'] },
        { id: 'cbse.sci.11.bio5', order: 24, title: '[Biology] Morphology of Flowering Plants', kgNodeIds: ['biology.plant_physiology.nutrition'] },
        { id: 'cbse.sci.11.bio6', order: 25, title: '[Biology] Anatomy of Flowering Plants', kgNodeIds: ['biology.plant_physiology.transport'] },
        { id: 'cbse.sci.11.bio7', order: 26, title: '[Biology] Structural Organisation in Animals', kgNodeIds: ['biology.cell.structure'] },
        { id: 'cbse.sci.11.bio8', order: 27, title: '[Biology] Cell — The Unit of Life', kgNodeIds: ['biology.cell.structure'] },
        { id: 'cbse.sci.11.bio9', order: 28, title: '[Biology] Biomolecules', kgNodeIds: ['chemistry.biochemistry.biomolecules'] },
        { id: 'cbse.sci.11.bio10', order: 29, title: '[Biology] Cell Cycle and Cell Division', kgNodeIds: ['biology.cell.division'] },
        { id: 'cbse.sci.11.bio11', order: 30, title: '[Biology] Photosynthesis in Higher Plants', kgNodeIds: ['biology.plant_physiology.nutrition'] },
        { id: 'cbse.sci.11.bio12', order: 31, title: '[Biology] Respiration in Plants', kgNodeIds: ['biology.animal_physiology.respiration'] },
        { id: 'cbse.sci.11.bio13', order: 32, title: '[Biology] Plant Growth and Development', kgNodeIds: ['biology.plant_physiology.growth'] },
        { id: 'cbse.sci.11.bio14', order: 33, title: '[Biology] Breathing and Exchange of Gases', kgNodeIds: ['biology.animal_physiology.respiration'] },
        { id: 'cbse.sci.11.bio15', order: 34, title: '[Biology] Body Fluids and Circulation', kgNodeIds: ['biology.animal_physiology.circulation'] },
        { id: 'cbse.sci.11.bio16', order: 35, title: '[Biology] Excretory Products and Their Elimination', kgNodeIds: ['biology.animal_physiology.excretion'] },
        { id: 'cbse.sci.11.bio17', order: 36, title: '[Biology] Locomotion and Movement', kgNodeIds: ['biology.animal_physiology.locomotion'] },
        { id: 'cbse.sci.11.bio18', order: 37, title: '[Biology] Neural Control and Coordination', kgNodeIds: ['biology.animal_physiology.nervous_endocrine'] },
        { id: 'cbse.sci.11.bio19', order: 38, title: '[Biology] Chemical Coordination and Integration', kgNodeIds: ['biology.animal_physiology.nervous_endocrine'] },
        // Rationalization (Class 11 Biology): Transport in Plants, Mineral
        // Nutrition, and Digestion and Absorption deleted/merged by CBSE.
      ],
    },
    {
      grade: 12,
      chapters: [
        // ── Physics (Class 12) ──
        { id: 'cbse.sci.12.phy1', order: 1, title: '[Physics] Electric Charges and Fields', kgNodeIds: ['physics.electricity.electrostatics'] },
        { id: 'cbse.sci.12.phy2', order: 2, title: '[Physics] Electrostatic Potential and Capacitance', kgNodeIds: ['physics.electricity.electrostatics'] },
        { id: 'cbse.sci.12.phy3', order: 3, title: '[Physics] Current Electricity', kgNodeIds: ['physics.electricity.current_circuits'] },
        { id: 'cbse.sci.12.phy4', order: 4, title: '[Physics] Moving Charges and Magnetism', kgNodeIds: ['physics.magnetism.moving_charges'] },
        { id: 'cbse.sci.12.phy5', order: 5, title: '[Physics] Magnetism and Matter', kgNodeIds: ['physics.magnetism.permanent'] },
        { id: 'cbse.sci.12.phy6', order: 6, title: '[Physics] Electromagnetic Induction', kgNodeIds: ['physics.electricity.electromagnetic_induction'] },
        { id: 'cbse.sci.12.phy7', order: 7, title: '[Physics] Alternating Current', kgNodeIds: ['physics.electricity.electromagnetic_induction'] },
        { id: 'cbse.sci.12.phy8', order: 8, title: '[Physics] Electromagnetic Waves', kgNodeIds: ['physics.waves_oscillations.waves'] },
        { id: 'cbse.sci.12.phy9', order: 9, title: '[Physics] Ray Optics and Optical Instruments', kgNodeIds: ['physics.optics.human_eye'] },
        { id: 'cbse.sci.12.phy10', order: 10, title: '[Physics] Wave Optics', kgNodeIds: ['physics.optics.wave_optics'] },
        { id: 'cbse.sci.12.phy11', order: 11, title: '[Physics] Dual Nature of Radiation and Matter', kgNodeIds: ['physics.modern_physics.dual_nature'] },
        { id: 'cbse.sci.12.phy12', order: 12, title: '[Physics] Atoms and Nuclei', kgNodeIds: ['physics.modern_physics.atoms_nuclei'] },
        { id: 'cbse.sci.12.phy13', order: 13, title: '[Physics] Semiconductor Electronics', kgNodeIds: ['physics.semiconductors.devices'] },
        // Rationalization (Class 12 Physics): Communication Systems deleted by CBSE.
        // ── Chemistry (Class 12) ──
        { id: 'cbse.sci.12.chem1', order: 14, title: '[Chemistry] Solutions', kgNodeIds: ['chemistry.matter_mixtures.solutions'] },
        { id: 'cbse.sci.12.chem2', order: 15, title: '[Chemistry] Electrochemistry', kgNodeIds: ['chemistry.electrochemistry.basics'] },
        { id: 'cbse.sci.12.chem3', order: 16, title: '[Chemistry] Chemical Kinetics', kgNodeIds: ['chemistry.chemical_reactions.stoichiometry'] },
        { id: 'cbse.sci.12.chem4', order: 17, title: '[Chemistry] The d- and f-Block Elements', kgNodeIds: ['chemistry.periodic_table.trends'] },
        { id: 'cbse.sci.12.chem5', order: 18, title: '[Chemistry] Coordination Compounds', kgNodeIds: ['chemistry.chemical_bonding.ionic_covalent'] },
        { id: 'cbse.sci.12.chem6', order: 19, title: '[Chemistry] Haloalkanes and Haloarenes', kgNodeIds: ['chemistry.organic_chemistry.reactions'] },
        { id: 'cbse.sci.12.chem7', order: 20, title: '[Chemistry] Alcohols, Phenols and Ethers', kgNodeIds: ['chemistry.organic_chemistry.reactions'] },
        { id: 'cbse.sci.12.chem8', order: 21, title: '[Chemistry] Aldehydes, Ketones and Carboxylic Acids', kgNodeIds: ['chemistry.organic_chemistry.reactions'] },
        { id: 'cbse.sci.12.chem9', order: 22, title: '[Chemistry] Amines', kgNodeIds: ['chemistry.organic_chemistry.reactions'] },
        { id: 'cbse.sci.12.chem10', order: 23, title: '[Chemistry] Biomolecules', kgNodeIds: ['chemistry.biochemistry.biomolecules'] },
        // Rationalization (Class 12 Chemistry): The Solid State, Surface
        // Chemistry, General Principles and Processes of Isolation of Elements,
        // The p-Block Elements, Polymers, and Chemistry in Everyday Life
        // deleted by CBSE.
        // ── Biology (Class 12) ──
        { id: 'cbse.sci.12.bio1', order: 24, title: '[Biology] Sexual Reproduction in Flowering Plants', kgNodeIds: ['biology.reproduction.plants_animals'] },
        { id: 'cbse.sci.12.bio2', order: 25, title: '[Biology] Human Reproduction', kgNodeIds: ['biology.reproduction.plants_animals'] },
        { id: 'cbse.sci.12.bio3', order: 26, title: '[Biology] Reproductive Health', kgNodeIds: ['biology.reproduction.human_health'] },
        { id: 'cbse.sci.12.bio4', order: 27, title: '[Biology] Principles of Inheritance and Variation', kgNodeIds: ['biology.genetics.mendel'] },
        { id: 'cbse.sci.12.bio5', order: 28, title: '[Biology] Molecular Basis of Inheritance', kgNodeIds: ['biology.genetics.molecular'] },
        { id: 'cbse.sci.12.bio6', order: 29, title: '[Biology] Evolution', kgNodeIds: ['biology.evolution.darwinism'] },
        { id: 'cbse.sci.12.bio7', order: 30, title: '[Biology] Human Health and Disease', kgNodeIds: ['biology.reproduction.human_health'] },
        { id: 'cbse.sci.12.bio8', order: 31, title: '[Biology] Microbes in Human Welfare', kgNodeIds: ['biology.taxonomy.classification'] },
        { id: 'cbse.sci.12.bio9', order: 32, title: '[Biology] Biotechnology — Principles and Processes', kgNodeIds: ['biology.biotechnology.basics'] },
        { id: 'cbse.sci.12.bio10', order: 33, title: '[Biology] Biotechnology and Its Applications', kgNodeIds: ['biology.biotechnology.basics'] },
        { id: 'cbse.sci.12.bio11', order: 34, title: '[Biology] Organisms and Populations', kgNodeIds: ['biology.ecology.ecosystems'] },
        { id: 'cbse.sci.12.bio12', order: 35, title: '[Biology] Ecosystem', kgNodeIds: ['biology.ecology.ecosystems'] },
        { id: 'cbse.sci.12.bio13', order: 36, title: '[Biology] Biodiversity and Conservation', kgNodeIds: ['environmental_science.conservation.biodiversity'] },
        // Rationalization (Class 12 Biology): Reproduction in Organisms,
        // Strategies for Enhancement in Food Production, and Environmental
        // Issues deleted/merged by CBSE.
      ],
    },
  ],
}

export function getCBSEScienceChapters(grade: number) {
  return CBSE_SCIENCE_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSEScienceChapter(id: string) {
  for (const grade of CBSE_SCIENCE_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

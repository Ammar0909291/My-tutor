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
 * Sprint BA (June 2026): Grades 5–8 updated to NCF-2023 textbooks:
 *   Grade 5 — Our Wondrous World (EVS, 10 chapters)
 *   Grades 6–8 — Curiosity (12/12/13 chapters)
 * Sources: ncert.nic.in eeev1ps.pdf, fecu1ps.pdf, gecu1ps.pdf, hecu1ps.pdf (2026-27)
 * Cross-ref: tiwariacademy.com, learncbse.in (2026-27 editions)
 */
export const CBSE_SCIENCE_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'science',
  subjectName: 'Science',
  grades: [
    // ─── Grade 5 — Our Wondrous World (NCF-2023 EVS, 2024 edition, 10 chapters) ─
    // Source: ncert.nic.in/textbook/pdf/eeev1ps.pdf (eeev = EVS Grade 5)
    // Cross-ref: tiwariacademy.com/ncert-solutions/class-5/evs/ (verified June 2026)
    // Replaces: old generic EVS stubs (Super Senses, Plants Growth, etc.)
    {
      grade: 5,
      chapters: [
        { id: 'cbse.sci.5.ch1', order: 1, title: 'Water — The Essence of Life', kgNodeIds: ['environmental_science.natural_resources.management'] },
        { id: 'cbse.sci.5.ch2', order: 2, title: 'Journey of a River', kgNodeIds: ['earth_science.climate_weather.atmosphere'] },
        { id: 'cbse.sci.5.ch3', order: 3, title: 'The Mystery of Food', kgNodeIds: ['biology.animal_physiology.digestion'] },
        { id: 'cbse.sci.5.ch4', order: 4, title: 'Our School — A Happy Place', kgNodeIds: ['biology.reproduction.human_health'] },
        { id: 'cbse.sci.5.ch5', order: 5, title: 'Our Vibrant Country', kgNodeIds: ['biology.ecology.ecosystems'] },
        { id: 'cbse.sci.5.ch6', order: 6, title: 'Some Unique Places', kgNodeIds: ['biology.ecology.ecosystems'] },
        { id: 'cbse.sci.5.ch7', order: 7, title: 'Energy — How Things Work', kgNodeIds: ['physics.work_energy.basics'] },
        { id: 'cbse.sci.5.ch8', order: 8, title: 'Clothes — How Things are Made', kgNodeIds: ['chemistry.matter_mixtures.matter'] },
        { id: 'cbse.sci.5.ch9', order: 9, title: 'Rhythms of Nature', kgNodeIds: ['biology.ecology.ecosystems'] },
        { id: 'cbse.sci.5.ch10', order: 10, title: 'Earth — Our Shared Home', kgNodeIds: ['environmental_science.conservation.biodiversity'] },
      ],
    },
    // ─── Grade 6 — Curiosity (NCF-2023, 2024 edition, 12 chapters) ──────────
    // Source: ncert.nic.in/textbook/pdf/fecu1ps.pdf (Reprint 2026-27)
    // Cross-ref: learncbse.in, tiwariacademy.com (verified June 2026)
    // Replaces: 16 old rationalized NCERT chapters
    {
      grade: 6,
      chapters: [
        { id: 'cbse.sci.6.ch1', order: 1, title: 'The Wonderful World of Science', kgNodeIds: ['physics.measurement.units'] },
        { id: 'cbse.sci.6.ch2', order: 2, title: 'Diversity in the Living World', kgNodeIds: ['biology.taxonomy.classification'] },
        { id: 'cbse.sci.6.ch3', order: 3, title: 'Mindful Eating: A Path to a Healthy Body', kgNodeIds: ['biology.animal_physiology.digestion'] },
        { id: 'cbse.sci.6.ch4', order: 4, title: 'Exploring Magnets', kgNodeIds: ['physics.magnetism.permanent'] },
        { id: 'cbse.sci.6.ch5', order: 5, title: 'Measurement of Length and Motion', kgNodeIds: ['physics.kinematics.motion_1d'] },
        { id: 'cbse.sci.6.ch6', order: 6, title: 'Materials Around Us', kgNodeIds: ['chemistry.matter_mixtures.matter'] },
        { id: 'cbse.sci.6.ch7', order: 7, title: 'Temperature and its Measurement', kgNodeIds: ['physics.thermodynamics.heat_temperature'] },
        { id: 'cbse.sci.6.ch8', order: 8, title: 'A Journey through States of Water', kgNodeIds: ['chemistry.matter_mixtures.matter'] },
        { id: 'cbse.sci.6.ch9', order: 9, title: 'Methods of Separation in Everyday Life', kgNodeIds: ['chemistry.matter_mixtures.matter'] },
        { id: 'cbse.sci.6.ch10', order: 10, title: 'Living Creatures: Exploring their Characteristics', kgNodeIds: ['biology.cell.structure'] },
        { id: 'cbse.sci.6.ch11', order: 11, title: "Nature's Treasures", kgNodeIds: ['environmental_science.natural_resources.management'] },
        { id: 'cbse.sci.6.ch12', order: 12, title: 'Beyond Earth', kgNodeIds: ['earth_science.solar_system.planets'] },
      ],
    },
    // ─── Grade 7 — Curiosity (NCF-2023, 2025 edition, 12 chapters) ──────────
    // Source: ncert.nic.in/textbook/pdf/gecu1ps.pdf (Reprint 2026-27)
    // Cross-ref: tiwariacademy.com chapter pages (verified June 2026)
    // Replaces: 13 old rationalized NCERT chapters
    {
      grade: 7,
      chapters: [
        { id: 'cbse.sci.7.ch1', order: 1, title: 'The Ever-Evolving World of Science', kgNodeIds: ['physics.measurement.units'] },
        { id: 'cbse.sci.7.ch2', order: 2, title: 'Exploring Substances: Acidic, Basic and Neutral', kgNodeIds: ['chemistry.acids_bases_salts.basics'] },
        { id: 'cbse.sci.7.ch3', order: 3, title: 'Electricity: Circuits and their Components', kgNodeIds: ['physics.electricity.current_circuits'] },
        { id: 'cbse.sci.7.ch4', order: 4, title: 'The World of Metals and Non-metals', kgNodeIds: ['chemistry.metals_nonmetals.reactivity'] },
        { id: 'cbse.sci.7.ch5', order: 5, title: 'Changes Around Us: Physical and Chemical', kgNodeIds: ['chemistry.chemical_reactions.equations'] },
        { id: 'cbse.sci.7.ch6', order: 6, title: 'Adolescence: A Stage of Growth and Change', kgNodeIds: ['biology.animal_physiology.nervous_endocrine'] },
        { id: 'cbse.sci.7.ch7', order: 7, title: 'Heat Transfer in Nature', kgNodeIds: ['physics.thermodynamics.heat_temperature'] },
        { id: 'cbse.sci.7.ch8', order: 8, title: 'Measurement of Time and Motion', kgNodeIds: ['physics.kinematics.motion_1d'] },
        { id: 'cbse.sci.7.ch9', order: 9, title: 'Life Processes in Animals', kgNodeIds: ['biology.animal_physiology.digestion'] },
        { id: 'cbse.sci.7.ch10', order: 10, title: 'Life Processes in Plants', kgNodeIds: ['biology.plant_physiology.nutrition'] },
        { id: 'cbse.sci.7.ch11', order: 11, title: 'Light: Shadows and Reflections', kgNodeIds: ['physics.optics.reflection_refraction'] },
        { id: 'cbse.sci.7.ch12', order: 12, title: 'Earth, Moon, and the Sun', kgNodeIds: ['earth_science.solar_system.planets'] },
      ],
    },
    // ─── Grade 8 — Curiosity (NCF-2023, 2026 edition, 13 chapters) ──────────
    // Source: ncert.nic.in/textbook/pdf/hecu1ps.pdf (Reprint 2026-27)
    // Cross-ref: tiwariacademy.com curiosity-chapter-* pages (verified June 2026)
    // Replaces: 13 old rationalized NCERT chapters (entirely different content)
    {
      grade: 8,
      chapters: [
        { id: 'cbse.sci.8.ch1', order: 1, title: 'Exploring the Investigative World of Science', kgNodeIds: ['physics.measurement.units'] },
        { id: 'cbse.sci.8.ch2', order: 2, title: 'The Invisible Living World: Beyond Our Naked Eye', kgNodeIds: ['biology.taxonomy.classification'] },
        { id: 'cbse.sci.8.ch3', order: 3, title: 'Health: The Ultimate Treasure', kgNodeIds: ['biology.reproduction.human_health'] },
        { id: 'cbse.sci.8.ch4', order: 4, title: 'Electricity: Magnetic and Heating Effects', kgNodeIds: ['physics.electricity.current_circuits', 'physics.magnetism.permanent'] },
        { id: 'cbse.sci.8.ch5', order: 5, title: 'Exploring Forces', kgNodeIds: ['physics.forces.laws_of_motion'] },
        { id: 'cbse.sci.8.ch6', order: 6, title: 'Pressure, Winds, Storms and Cyclones', kgNodeIds: ['physics.mechanical_properties.solids_fluids', 'earth_science.climate_weather.atmosphere'] },
        { id: 'cbse.sci.8.ch7', order: 7, title: 'Particulate Nature of Matter', kgNodeIds: ['chemistry.atomic_structure.basics'] },
        { id: 'cbse.sci.8.ch8', order: 8, title: 'Nature of Matter: Elements, Compounds and Mixtures', kgNodeIds: ['chemistry.matter_mixtures.matter'] },
        { id: 'cbse.sci.8.ch9', order: 9, title: 'The Amazing World of Solutes, Solvents and Solutions', kgNodeIds: ['chemistry.matter_mixtures.solutions'] },
        { id: 'cbse.sci.8.ch10', order: 10, title: 'Light: Mirrors and Lenses', kgNodeIds: ['physics.optics.reflection_refraction'] },
        { id: 'cbse.sci.8.ch11', order: 11, title: 'Keeping Time with the Skies', kgNodeIds: ['earth_science.solar_system.planets'] },
        { id: 'cbse.sci.8.ch12', order: 12, title: 'How Nature Works in Harmony', kgNodeIds: ['biology.ecology.ecosystems'] },
        { id: 'cbse.sci.8.ch13', order: 13, title: 'Our Home: Earth, a Unique Life Sustaining Planet', kgNodeIds: ['environmental_science.conservation.biodiversity'] },
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

import type { BoardSubjectCatalog } from './educationTypes'

export const CBSE_COMPUTER_SCIENCE_CATALOG: BoardSubjectCatalog = {
  boardId: 'cbse',
  subjectSlug: 'computer_science',
  subjectName: 'Computer Science',
  grades: [
    {
      grade: 9,
      chapters: [
        { id: 'cbse.cs.9.ch1', order: 1, title: 'Introduction to Computers and Its Organisation', kgNodeIds: ['cs.intro_computers', 'cs.computer_organisation'] },
        { id: 'cbse.cs.9.ch2', order: 2, title: 'Memory and Storage Devices', kgNodeIds: ['cs.memory_storage'] },
        { id: 'cbse.cs.9.ch3', order: 3, title: 'Software Concepts', kgNodeIds: ['cs.software'] },
        { id: 'cbse.cs.9.ch4', order: 4, title: 'Number Systems', kgNodeIds: ['cs.number_systems'] },
        { id: 'cbse.cs.9.ch5', order: 5, title: 'Boolean Logic and Logic Gates', kgNodeIds: ['cs.boolean_logic'] },
        { id: 'cbse.cs.9.ch6', order: 6, title: 'Problem Solving and Algorithms', kgNodeIds: ['cs.problem_solving', 'cs.algorithms'] },
        { id: 'cbse.cs.9.ch7', order: 7, title: 'Flowcharts', kgNodeIds: ['cs.flowcharts'] },
        { id: 'cbse.cs.9.ch8', order: 8, title: 'Introduction to Python Programming', kgNodeIds: ['cs.programming_intro', 'cs.python_basics'] },
        { id: 'cbse.cs.9.ch9', order: 9, title: 'Data Types, Variables and Operators', kgNodeIds: ['cs.data_types', 'cs.operators'] },
        { id: 'cbse.cs.9.ch10', order: 10, title: 'Cyber Safety and Ethics', kgNodeIds: ['cs.cyber_ethics'] },
      ],
    },
    {
      grade: 10,
      chapters: [
        { id: 'cbse.cs.10.ch1', order: 1, title: 'Review of Python Basics', kgNodeIds: ['cs.python_basics', 'cs.data_types'] },
        { id: 'cbse.cs.10.ch2', order: 2, title: 'Input, Output and Type Conversion', kgNodeIds: ['cs.input_output'] },
        { id: 'cbse.cs.10.ch3', order: 3, title: 'Conditional Statements', kgNodeIds: ['cs.conditionals'] },
        { id: 'cbse.cs.10.ch4', order: 4, title: 'Loops', kgNodeIds: ['cs.loops'] },
        { id: 'cbse.cs.10.ch5', order: 5, title: 'Strings', kgNodeIds: ['cs.strings'] },
        { id: 'cbse.cs.10.ch6', order: 6, title: 'Lists', kgNodeIds: ['cs.lists'] },
        { id: 'cbse.cs.10.ch7', order: 7, title: 'Tuples and Dictionaries', kgNodeIds: ['cs.tuples', 'cs.dictionaries'] },
        { id: 'cbse.cs.10.ch8', order: 8, title: 'Searching and Sorting', kgNodeIds: ['cs.searching_sorting'] },
        { id: 'cbse.cs.10.ch9', order: 9, title: 'Data Representation (Binary, Encoding)', kgNodeIds: ['cs.number_systems', 'cs.boolean_logic'] },
        { id: 'cbse.cs.10.ch10', order: 10, title: 'Networking Basics', kgNodeIds: ['cs.networking_basics'] },
        { id: 'cbse.cs.10.ch11', order: 11, title: 'Cyber Ethics and Data Privacy', kgNodeIds: ['cs.cyber_ethics', 'cs.data_protection'] },
      ],
    },
    {
      grade: 11,
      chapters: [
        { id: 'cbse.cs.11.ch1', order: 1, title: 'Computer System Overview', kgNodeIds: ['cs.computer_organisation', 'cs.memory_storage', 'cs.operating_system'] },
        { id: 'cbse.cs.11.ch2', order: 2, title: 'Encoding Schemes and Number Systems', kgNodeIds: ['cs.number_systems', 'cs.boolean_logic'] },
        { id: 'cbse.cs.11.ch3', order: 3, title: 'Problem Solving and Python Overview', kgNodeIds: ['cs.problem_solving', 'cs.python_basics'] },
        { id: 'cbse.cs.11.ch4', order: 4, title: 'Data Types, Variables and Operators', kgNodeIds: ['cs.data_types', 'cs.operators', 'cs.input_output'] },
        { id: 'cbse.cs.11.ch5', order: 5, title: 'Conditional and Iterative Statements', kgNodeIds: ['cs.conditionals', 'cs.loops'] },
        { id: 'cbse.cs.11.ch6', order: 6, title: 'Strings', kgNodeIds: ['cs.strings'] },
        { id: 'cbse.cs.11.ch7', order: 7, title: 'Lists, Tuples and Dictionaries', kgNodeIds: ['cs.lists', 'cs.tuples', 'cs.dictionaries'] },
        { id: 'cbse.cs.11.ch8', order: 8, title: 'Functions', kgNodeIds: ['cs.functions'] },
        { id: 'cbse.cs.11.ch9', order: 9, title: 'Recursion', kgNodeIds: ['cs.recursion'] },
        { id: 'cbse.cs.11.ch10', order: 10, title: 'File Handling', kgNodeIds: ['cs.file_handling', 'cs.csv_files', 'cs.binary_files'] },
        { id: 'cbse.cs.11.ch11', order: 11, title: 'Modules and Libraries', kgNodeIds: ['cs.modules'] },
        { id: 'cbse.cs.11.ch12', order: 12, title: 'Cyber Safety', kgNodeIds: ['cs.cyber_ethics', 'cs.data_protection'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'cbse.cs.12.ch1', order: 1, title: 'Review of Functions and Recursion', kgNodeIds: ['cs.functions', 'cs.recursion'] },
        { id: 'cbse.cs.12.ch2', order: 2, title: 'File Handling — Text, Binary and CSV', kgNodeIds: ['cs.file_handling', 'cs.csv_files', 'cs.binary_files'] },
        { id: 'cbse.cs.12.ch3', order: 3, title: 'Stacks', kgNodeIds: ['cs.stacks'] },
        { id: 'cbse.cs.12.ch4', order: 4, title: 'Queues', kgNodeIds: ['cs.queues'] },
        { id: 'cbse.cs.12.ch5', order: 5, title: 'Searching and Sorting Algorithms', kgNodeIds: ['cs.searching_sorting'] },
        { id: 'cbse.cs.12.ch6', order: 6, title: 'Database Management Systems — Concepts', kgNodeIds: ['cs.database_concepts', 'cs.relational_model'] },
        { id: 'cbse.cs.12.ch7', order: 7, title: 'SQL — DDL and DML', kgNodeIds: ['cs.sql_basics'] },
        { id: 'cbse.cs.12.ch8', order: 8, title: 'SQL — Queries and Aggregate Functions', kgNodeIds: ['cs.sql_queries'] },
        { id: 'cbse.cs.12.ch9', order: 9, title: 'SQL — Joins, Subqueries and Views', kgNodeIds: ['cs.sql_joins'] },
        { id: 'cbse.cs.12.ch10', order: 10, title: 'MySQL with Python', kgNodeIds: ['cs.mysql_python'] },
        { id: 'cbse.cs.12.ch11', order: 11, title: 'Computer Networks', kgNodeIds: ['cs.networking_basics', 'cs.network_protocols'] },
        { id: 'cbse.cs.12.ch12', order: 12, title: 'Web Services, Cloud and Cyber Security', kgNodeIds: ['cs.web_services', 'cs.data_protection'] },
      ],
    },
  ],
}

export function getCBSECSChapters(grade: number) {
  return CBSE_COMPUTER_SCIENCE_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getCBSECSChapter(id: string) {
  for (const grade of CBSE_COMPUTER_SCIENCE_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

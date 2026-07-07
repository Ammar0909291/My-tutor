import type { BoardSubjectCatalog } from './educationTypes'

export const UP_COMPUTER_SCIENCE_CATALOG: BoardSubjectCatalog = {
  boardId: 'up_board',
  subjectSlug: 'computer_science',
  subjectName: 'Computer Science',
  grades: [
    {
      grade: 9,
      chapters: [
        { id: 'up.cs.9.ch1', order: 1, title: 'Introduction to Computer', kgNodeIds: ['cs.intro_computers', 'cs.computer_organisation'] },
        { id: 'up.cs.9.ch2', order: 2, title: 'Memory and Storage Devices', kgNodeIds: ['cs.memory_storage'] },
        { id: 'up.cs.9.ch3', order: 3, title: 'Input and Output Devices', kgNodeIds: ['cs.computer_organisation'] },
        { id: 'up.cs.9.ch4', order: 4, title: 'Software — Types and Classification', kgNodeIds: ['cs.software'] },
        { id: 'up.cs.9.ch5', order: 5, title: 'Number Systems and Data Representation', kgNodeIds: ['cs.number_systems'] },
        { id: 'up.cs.9.ch6', order: 6, title: 'Problem Solving — Algorithms and Flowcharts', kgNodeIds: ['cs.problem_solving', 'cs.algorithms', 'cs.flowcharts'] },
        { id: 'up.cs.9.ch7', order: 7, title: 'Introduction to Programming and Python', kgNodeIds: ['cs.programming_intro', 'cs.python_basics', 'cs.data_types'] },
        { id: 'up.cs.9.ch8', order: 8, title: 'Operators and Expressions in Python', kgNodeIds: ['cs.operators', 'cs.input_output'] },
        { id: 'up.cs.9.ch9', order: 9, title: 'Internet and Cyber Safety', kgNodeIds: ['cs.networking_basics', 'cs.cyber_ethics'] },
      ],
    },
    {
      grade: 10,
      chapters: [
        { id: 'up.cs.10.ch1', order: 1, title: 'Conditional Statements in Python', kgNodeIds: ['cs.conditionals'] },
        { id: 'up.cs.10.ch2', order: 2, title: 'Loops in Python', kgNodeIds: ['cs.loops'] },
        { id: 'up.cs.10.ch3', order: 3, title: 'Strings and String Manipulation', kgNodeIds: ['cs.strings'] },
        { id: 'up.cs.10.ch4', order: 4, title: 'Lists', kgNodeIds: ['cs.lists'] },
        { id: 'up.cs.10.ch5', order: 5, title: 'Tuples and Dictionaries', kgNodeIds: ['cs.tuples', 'cs.dictionaries'] },
        { id: 'up.cs.10.ch6', order: 6, title: 'Boolean Logic and Logic Gates', kgNodeIds: ['cs.boolean_logic'] },
        { id: 'up.cs.10.ch7', order: 7, title: 'Searching and Sorting', kgNodeIds: ['cs.searching_sorting'] },
        { id: 'up.cs.10.ch8', order: 8, title: 'Networking and Communication', kgNodeIds: ['cs.networking_basics', 'cs.network_protocols'] },
        { id: 'up.cs.10.ch9', order: 9, title: 'Cyber Ethics and Social Issues', kgNodeIds: ['cs.cyber_ethics', 'cs.data_protection'] },
      ],
    },
    {
      grade: 11,
      chapters: [
        { id: 'up.cs.11.ch1', order: 1, title: 'Computer System and Organisation', kgNodeIds: ['cs.computer_organisation', 'cs.memory_storage', 'cs.operating_system'] },
        { id: 'up.cs.11.ch2', order: 2, title: 'Number Systems and Boolean Algebra', kgNodeIds: ['cs.number_systems', 'cs.boolean_logic'] },
        { id: 'up.cs.11.ch3', order: 3, title: 'Problem Solving and Python Introduction', kgNodeIds: ['cs.problem_solving', 'cs.algorithms', 'cs.python_basics'] },
        { id: 'up.cs.11.ch4', order: 4, title: 'Data Types, Input/Output and Operators', kgNodeIds: ['cs.data_types', 'cs.operators', 'cs.input_output'] },
        { id: 'up.cs.11.ch5', order: 5, title: 'Conditional and Iterative Statements', kgNodeIds: ['cs.conditionals', 'cs.loops'] },
        { id: 'up.cs.11.ch6', order: 6, title: 'Strings and Lists', kgNodeIds: ['cs.strings', 'cs.lists'] },
        { id: 'up.cs.11.ch7', order: 7, title: 'Tuples, Dictionaries and Sets', kgNodeIds: ['cs.tuples', 'cs.dictionaries', 'cs.sets'] },
        { id: 'up.cs.11.ch8', order: 8, title: 'Functions and Modules', kgNodeIds: ['cs.functions', 'cs.modules'] },
        { id: 'up.cs.11.ch9', order: 9, title: 'File Handling', kgNodeIds: ['cs.file_handling', 'cs.csv_files'] },
        { id: 'up.cs.11.ch10', order: 10, title: 'Internet and Web Technologies', kgNodeIds: ['cs.network_protocols', 'cs.web_services'] },
      ],
    },
    {
      grade: 12,
      chapters: [
        { id: 'up.cs.12.ch1', order: 1, title: 'Review of Python — Functions and File Handling', kgNodeIds: ['cs.functions', 'cs.recursion', 'cs.file_handling', 'cs.binary_files'] },
        { id: 'up.cs.12.ch2', order: 2, title: 'Stacks and Queues', kgNodeIds: ['cs.stacks', 'cs.queues'] },
        { id: 'up.cs.12.ch3', order: 3, title: 'Searching and Sorting Algorithms', kgNodeIds: ['cs.searching_sorting'] },
        { id: 'up.cs.12.ch4', order: 4, title: 'Database Concepts and RDBMS', kgNodeIds: ['cs.database_concepts', 'cs.relational_model'] },
        { id: 'up.cs.12.ch5', order: 5, title: 'SQL Fundamentals', kgNodeIds: ['cs.sql_basics', 'cs.sql_queries'] },
        { id: 'up.cs.12.ch6', order: 6, title: 'Advanced SQL — Joins and Subqueries', kgNodeIds: ['cs.sql_joins'] },
        { id: 'up.cs.12.ch7', order: 7, title: 'Python and MySQL Integration', kgNodeIds: ['cs.mysql_python'] },
        { id: 'up.cs.12.ch8', order: 8, title: 'Computer Networks', kgNodeIds: ['cs.networking_basics', 'cs.network_protocols'] },
        { id: 'up.cs.12.ch9', order: 9, title: 'Cloud Computing, IoT and Web Security', kgNodeIds: ['cs.web_services', 'cs.data_protection'] },
        { id: 'up.cs.12.ch10', order: 10, title: 'Emerging Trends in Technology', kgNodeIds: ['cs.numpy', 'cs.pandas', 'cs.matplotlib'] },
      ],
    },
  ],
}

export function getUPCSChapters(grade: number) {
  return UP_COMPUTER_SCIENCE_CATALOG.grades.find((g) => g.grade === grade)?.chapters ?? []
}

export function getUPCSChapter(id: string) {
  for (const grade of UP_COMPUTER_SCIENCE_CATALOG.grades) {
    const chapter = grade.chapters.find((c) => c.id === id)
    if (chapter) return chapter
  }
  return undefined
}

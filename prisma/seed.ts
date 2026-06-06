import { PrismaClient, SubjectType } from "@prisma/client";

const prisma = new PrismaClient();

const CURRICULUM: Record<string, { unit: number; unitTitle: string; lesson: number; lessonTitle: string; lessonGoal: string }[]> = {
  c: [
    { unit: 1, unitTitle: 'Getting Started', lesson: 1, lessonTitle: 'Hello, World!', lessonGoal: 'Write and run your first C program, understand main() and printf()' },
    { unit: 1, unitTitle: 'Getting Started', lesson: 2, lessonTitle: 'Variables & Data Types', lessonGoal: 'Declare int, float, char variables and understand memory sizes' },
    { unit: 1, unitTitle: 'Getting Started', lesson: 3, lessonTitle: 'Operators & Expressions', lessonGoal: 'Use arithmetic, relational and logical operators correctly' },
    { unit: 2, unitTitle: 'Control Flow', lesson: 1, lessonTitle: 'if / else Statements', lessonGoal: 'Write conditional branches and understand boolean logic in C' },
    { unit: 2, unitTitle: 'Control Flow', lesson: 2, lessonTitle: 'Loops: for & while', lessonGoal: 'Repeat code blocks using for, while, and do-while loops' },
    { unit: 2, unitTitle: 'Control Flow', lesson: 3, lessonTitle: 'switch & break', lessonGoal: 'Use switch-case for multi-branch logic and control loop flow' },
    { unit: 3, unitTitle: 'Functions', lesson: 1, lessonTitle: 'Defining Functions', lessonGoal: 'Create reusable functions with parameters and return values' },
    { unit: 3, unitTitle: 'Functions', lesson: 2, lessonTitle: 'Recursion', lessonGoal: 'Solve problems by having functions call themselves' },
    { unit: 3, unitTitle: 'Functions', lesson: 3, lessonTitle: 'Scope & Storage Classes', lessonGoal: 'Understand local, global variables and static/auto storage' },
    { unit: 4, unitTitle: 'Pointers & Memory', lesson: 1, lessonTitle: 'Pointers Basics', lessonGoal: 'Declare pointers, use & and * operators, understand addresses' },
    { unit: 4, unitTitle: 'Pointers & Memory', lesson: 2, lessonTitle: 'Pointer Arithmetic', lessonGoal: 'Navigate arrays using pointer arithmetic' },
    { unit: 4, unitTitle: 'Pointers & Memory', lesson: 3, lessonTitle: 'malloc & free', lessonGoal: 'Allocate and release heap memory safely' },
    { unit: 5, unitTitle: 'Arrays & Strings', lesson: 1, lessonTitle: 'Arrays', lessonGoal: 'Store and access collections of data with arrays' },
    { unit: 5, unitTitle: 'Arrays & Strings', lesson: 2, lessonTitle: 'Strings & string.h', lessonGoal: 'Work with C strings using strlen, strcpy, strcmp' },
    { unit: 5, unitTitle: 'Arrays & Strings', lesson: 3, lessonTitle: 'Multi-dimensional Arrays', lessonGoal: 'Create and use 2D arrays and matrices' },
  ],
  cpp: [
    { unit: 1, unitTitle: 'C++ Basics', lesson: 1, lessonTitle: 'From C to C++', lessonGoal: 'Understand differences: cout, cin, references, default args' },
    { unit: 1, unitTitle: 'C++ Basics', lesson: 2, lessonTitle: 'References & const', lessonGoal: 'Use references instead of pointers; understand const correctness' },
    { unit: 1, unitTitle: 'C++ Basics', lesson: 3, lessonTitle: 'Namespaces & Headers', lessonGoal: 'Organize code with namespaces and proper header files' },
    { unit: 2, unitTitle: 'Object-Oriented Programming', lesson: 1, lessonTitle: 'Classes & Objects', lessonGoal: 'Define classes with data members and methods; create objects' },
    { unit: 2, unitTitle: 'Object-Oriented Programming', lesson: 2, lessonTitle: 'Constructors & Destructors', lessonGoal: 'Initialize and clean up objects with constructors/destructors' },
    { unit: 2, unitTitle: 'Object-Oriented Programming', lesson: 3, lessonTitle: 'Inheritance', lessonGoal: 'Extend classes with single and multiple inheritance' },
    { unit: 2, unitTitle: 'Object-Oriented Programming', lesson: 4, lessonTitle: 'Polymorphism & virtual', lessonGoal: 'Use virtual functions and runtime polymorphism' },
    { unit: 3, unitTitle: 'STL', lesson: 1, lessonTitle: 'Vectors', lessonGoal: 'Use std::vector as a dynamic array with iterators' },
    { unit: 3, unitTitle: 'STL', lesson: 2, lessonTitle: 'Maps & Sets', lessonGoal: 'Store key-value pairs with map and unique items with set' },
    { unit: 3, unitTitle: 'STL', lesson: 3, lessonTitle: 'Algorithms', lessonGoal: 'Apply sort, find, transform and other STL algorithms' },
    { unit: 4, unitTitle: 'Modern C++', lesson: 1, lessonTitle: 'auto & Range-for', lessonGoal: 'Write cleaner code with type inference and range-based loops' },
    { unit: 4, unitTitle: 'Modern C++', lesson: 2, lessonTitle: 'Smart Pointers', lessonGoal: 'Manage memory safely with unique_ptr and shared_ptr' },
    { unit: 4, unitTitle: 'Modern C++', lesson: 3, lessonTitle: 'Lambda Functions', lessonGoal: 'Write inline anonymous functions and closures' },
  ],
  python: [
    { unit: 1, unitTitle: 'Python Basics', lesson: 1, lessonTitle: 'Hello Python!', lessonGoal: 'Run Python, use print() and understand the interpreter' },
    { unit: 1, unitTitle: 'Python Basics', lesson: 2, lessonTitle: 'Variables & Types', lessonGoal: 'Store data in variables; understand int, float, str, bool' },
    { unit: 1, unitTitle: 'Python Basics', lesson: 3, lessonTitle: 'Input & Output', lessonGoal: 'Read user input with input() and display results with print()' },
    { unit: 2, unitTitle: 'Control Flow', lesson: 1, lessonTitle: 'if / elif / else', lessonGoal: 'Make decisions in your code with conditional statements' },
    { unit: 2, unitTitle: 'Control Flow', lesson: 2, lessonTitle: 'for & while Loops', lessonGoal: 'Repeat actions with for loops over ranges and while conditions' },
    { unit: 2, unitTitle: 'Control Flow', lesson: 3, lessonTitle: 'break, continue, pass', lessonGoal: 'Control loop execution flow precisely' },
    { unit: 3, unitTitle: 'Functions', lesson: 1, lessonTitle: 'def & return', lessonGoal: 'Create reusable functions with parameters and return values' },
    { unit: 3, unitTitle: 'Functions', lesson: 2, lessonTitle: 'Default & Keyword Args', lessonGoal: 'Use default parameter values and keyword arguments' },
    { unit: 3, unitTitle: 'Functions', lesson: 3, lessonTitle: 'Recursion', lessonGoal: 'Solve problems elegantly using recursive functions' },
    { unit: 4, unitTitle: 'Data Structures', lesson: 1, lessonTitle: 'Lists', lessonGoal: 'Store ordered collections and use list methods effectively' },
    { unit: 4, unitTitle: 'Data Structures', lesson: 2, lessonTitle: 'Dictionaries', lessonGoal: 'Store and retrieve data by key with Python dicts' },
    { unit: 4, unitTitle: 'Data Structures', lesson: 3, lessonTitle: 'Tuples & Sets', lessonGoal: 'Use immutable tuples and unique-item sets' },
    { unit: 5, unitTitle: 'OOP in Python', lesson: 1, lessonTitle: 'Classes & __init__', lessonGoal: 'Define classes and initialize objects with __init__' },
    { unit: 5, unitTitle: 'OOP in Python', lesson: 2, lessonTitle: 'Inheritance', lessonGoal: 'Extend classes and override methods in Python' },
    { unit: 5, unitTitle: 'OOP in Python', lesson: 3, lessonTitle: 'Magic Methods', lessonGoal: 'Implement __str__, __repr__, __len__ and other dunder methods' },
  ],
  english: [
    { unit: 1, unitTitle: 'IT Vocabulary Foundations', lesson: 1, lessonTitle: 'Developer Daily Words', lessonGoal: 'Learn 30 essential words every developer uses daily in English' },
    { unit: 1, unitTitle: 'IT Vocabulary Foundations', lesson: 2, lessonTitle: 'Reading Error Messages', lessonGoal: 'Understand and parse common error messages and stack traces' },
    { unit: 1, unitTitle: 'IT Vocabulary Foundations', lesson: 3, lessonTitle: 'Tech Abbreviations', lessonGoal: 'Decode common IT abbreviations: API, SDK, CLI, ORM, etc.' },
    { unit: 2, unitTitle: 'Documentation & Writing', lesson: 1, lessonTitle: 'Reading Docs', lessonGoal: 'Navigate technical documentation, README files and wikis' },
    { unit: 2, unitTitle: 'Documentation & Writing', lesson: 2, lessonTitle: 'Writing Comments', lessonGoal: 'Write clear code comments and docstrings in English' },
    { unit: 2, unitTitle: 'Documentation & Writing', lesson: 3, lessonTitle: 'Commit Messages', lessonGoal: 'Write professional git commit messages and PR descriptions' },
    { unit: 3, unitTitle: 'Team Communication', lesson: 1, lessonTitle: 'Asking for Help', lessonGoal: 'Ask precise technical questions on Stack Overflow and Slack' },
    { unit: 3, unitTitle: 'Team Communication', lesson: 2, lessonTitle: 'Code Review Language', lessonGoal: 'Give and receive code review feedback professionally' },
    { unit: 3, unitTitle: 'Team Communication', lesson: 3, lessonTitle: 'Stand-up & Meetings', lessonGoal: 'Participate confidently in daily stand-ups and tech meetings' },
    { unit: 4, unitTitle: 'Career English', lesson: 1, lessonTitle: 'CV & LinkedIn', lessonGoal: 'Write a developer CV and LinkedIn profile in English' },
    { unit: 4, unitTitle: 'Career English', lesson: 2, lessonTitle: 'Tech Interviews', lessonGoal: 'Answer common technical interview questions in English' },
    { unit: 4, unitTitle: 'Career English', lesson: 3, lessonTitle: 'Salary Negotiation', lessonGoal: 'Negotiate salary and discuss compensation confidently' },
  ],
}

async function main() {
  // Subjects
  const subjects = [
    { slug: "c",       name: "C",       type: SubjectType.C,       description: "System programming in C" },
    { slug: "cpp",     name: "C++",     type: SubjectType.CPP,     description: "Object-oriented programming in C++" },
    { slug: "python",  name: "Python",  type: SubjectType.PYTHON,  description: "Python programming" },
    { slug: "english", name: "English", type: SubjectType.ENGLISH, description: "IT English for developers" },
  ]

  for (const subject of subjects) {
    await prisma.subject.upsert({ where: { slug: subject.slug }, update: {}, create: subject })
  }
  console.log("✅ Subjects seeded")

  // Curriculum
  let total = 0
  for (const [subjectCode, lessons] of Object.entries(CURRICULUM)) {
    for (let i = 0; i < lessons.length; i++) {
      const l = lessons[i]
      await prisma.curriculum.upsert({
        where: { subjectCode_order: { subjectCode, order: i + 1 } },
        update: { unitTitle: l.unitTitle, lessonTitle: l.lessonTitle, lessonGoal: l.lessonGoal },
        create: {
          subjectCode,
          unit: l.unit,
          unitTitle: l.unitTitle,
          lesson: l.lesson,
          lessonTitle: l.lessonTitle,
          lessonGoal: l.lessonGoal,
          order: i + 1,
        },
      })
      total++
    }
  }
  console.log(`✅ Curriculum seeded — ${total} lessons across 4 subjects`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

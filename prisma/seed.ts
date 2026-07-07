import { PrismaClient, SubjectType } from "@prisma/client";

const prisma = new PrismaClient();

const CURRICULUM: Record<string, { unit: number; unitTitle: string; lesson: number; lessonTitle: string; lessonGoal: string; topicSlug?: string }[]> = {
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
  // Python lessons mapped to KG node slugs (knowledgeGraph.ts → PYTHON_MODULES)
  python: [
    { unit: 1, unitTitle: 'Python Basics', lesson: 1, lessonTitle: 'Hello Python!', lessonGoal: 'Run Python, use print() and understand the interpreter', topicSlug: 'python_setup' },
    { unit: 1, unitTitle: 'Python Basics', lesson: 2, lessonTitle: 'Variables & Types', lessonGoal: 'Store data in variables; understand int, float, str, bool', topicSlug: 'variables_types' },
    { unit: 1, unitTitle: 'Python Basics', lesson: 3, lessonTitle: 'Input & Output', lessonGoal: 'Read user input with input() and display results with print()', topicSlug: 'input_output' },
    { unit: 2, unitTitle: 'Control Flow', lesson: 1, lessonTitle: 'if / elif / else', lessonGoal: 'Make decisions in your code with conditional statements', topicSlug: 'conditionals_py' },
    { unit: 2, unitTitle: 'Control Flow', lesson: 2, lessonTitle: 'for & while Loops', lessonGoal: 'Repeat actions with for loops over ranges and while conditions', topicSlug: 'loops_basic' },
    { unit: 2, unitTitle: 'Control Flow', lesson: 3, lessonTitle: 'break, continue, pass', lessonGoal: 'Control loop execution flow precisely', topicSlug: 'loops_basic' },
    { unit: 3, unitTitle: 'Functions', lesson: 1, lessonTitle: 'def & return', lessonGoal: 'Create reusable functions with parameters and return values', topicSlug: 'functions_intro' },
    { unit: 3, unitTitle: 'Functions', lesson: 2, lessonTitle: 'Default & Keyword Args', lessonGoal: 'Use default parameter values and keyword arguments', topicSlug: 'functions_intro' },
    { unit: 3, unitTitle: 'Functions', lesson: 3, lessonTitle: 'Recursion', lessonGoal: 'Solve problems elegantly using recursive functions', topicSlug: 'scope_closures' },
    { unit: 4, unitTitle: 'Data Structures', lesson: 1, lessonTitle: 'Lists', lessonGoal: 'Store ordered collections and use list methods effectively', topicSlug: 'lists_tuples' },
    { unit: 4, unitTitle: 'Data Structures', lesson: 2, lessonTitle: 'Dictionaries', lessonGoal: 'Store and retrieve data by key with Python dicts', topicSlug: 'dicts_sets' },
    { unit: 4, unitTitle: 'Data Structures', lesson: 3, lessonTitle: 'Tuples & Sets', lessonGoal: 'Use immutable tuples and unique-item sets', topicSlug: 'dicts_sets' },
    { unit: 5, unitTitle: 'OOP in Python', lesson: 1, lessonTitle: 'Classes & __init__', lessonGoal: 'Define classes and initialize objects with __init__', topicSlug: 'oop_classes' },
    { unit: 5, unitTitle: 'OOP in Python', lesson: 2, lessonTitle: 'Inheritance', lessonGoal: 'Extend classes and override methods in Python', topicSlug: 'inheritance_poly' },
    { unit: 5, unitTitle: 'OOP in Python', lesson: 3, lessonTitle: 'Magic Methods', lessonGoal: 'Implement __str__, __repr__, __len__ and other dunder methods', topicSlug: 'oop_classes' },
  ],
  // English lessons mapped to closest KG node slugs (knowledgeGraph.ts → ENGLISH_MODULES)
  // Seeded content is IT English; KG is CEFR A1–C2. Mapping is best-available alignment.
  english: [
    { unit: 1, unitTitle: 'IT Vocabulary Foundations', lesson: 1, lessonTitle: 'Developer Daily Words', lessonGoal: 'Learn 30 essential words every developer uses daily in English', topicSlug: 'core_vocabulary' },
    { unit: 1, unitTitle: 'IT Vocabulary Foundations', lesson: 2, lessonTitle: 'Reading Error Messages', lessonGoal: 'Understand and parse common error messages and stack traces', topicSlug: 'reading_strategies' },
    { unit: 1, unitTitle: 'IT Vocabulary Foundations', lesson: 3, lessonTitle: 'Tech Abbreviations', lessonGoal: 'Decode common IT abbreviations: API, SDK, CLI, ORM, etc.', topicSlug: 'core_vocabulary' },
    { unit: 2, unitTitle: 'Documentation & Writing', lesson: 1, lessonTitle: 'Reading Docs', lessonGoal: 'Navigate technical documentation, README files and wikis', topicSlug: 'reading_strategies' },
    { unit: 2, unitTitle: 'Documentation & Writing', lesson: 2, lessonTitle: 'Writing Comments', lessonGoal: 'Write clear code comments and docstrings in English', topicSlug: 'paragraph_writing' },
    { unit: 2, unitTitle: 'Documentation & Writing', lesson: 3, lessonTitle: 'Commit Messages', lessonGoal: 'Write professional git commit messages and PR descriptions', topicSlug: 'paragraph_writing' },
    { unit: 3, unitTitle: 'Team Communication', lesson: 1, lessonTitle: 'Asking for Help', lessonGoal: 'Ask precise technical questions on Stack Overflow and Slack', topicSlug: 'questions_negatives' },
    { unit: 3, unitTitle: 'Team Communication', lesson: 2, lessonTitle: 'Code Review Language', lessonGoal: 'Give and receive code review feedback professionally', topicSlug: 'essay_writing' },
    { unit: 3, unitTitle: 'Team Communication', lesson: 3, lessonTitle: 'Stand-up & Meetings', lessonGoal: 'Participate confidently in daily stand-ups and tech meetings', topicSlug: 'advanced_grammar' },
    { unit: 4, unitTitle: 'Career English', lesson: 1, lessonTitle: 'CV & LinkedIn', lessonGoal: 'Write a developer CV and LinkedIn profile in English', topicSlug: 'essay_writing' },
    { unit: 4, unitTitle: 'Career English', lesson: 2, lessonTitle: 'Tech Interviews', lessonGoal: 'Answer common technical interview questions in English', topicSlug: 'complex_structures' },
    { unit: 4, unitTitle: 'Career English', lesson: 3, lessonTitle: 'Salary Negotiation', lessonGoal: 'Negotiate salary and discuss compensation confidently', topicSlug: 'professional_discourse' },
  ],
}

async function main() {
  // Subjects
  const subjects = [
    { slug: "c",          name: "C",          type: SubjectType.C,           description: "System programming in C" },
    { slug: "cpp",        name: "C++",        type: SubjectType.CPP,         description: "Object-oriented programming in C++" },
    { slug: "python",     name: "Python",     type: SubjectType.PYTHON,      description: "Python programming" },
    { slug: "english",    name: "English",    type: SubjectType.ENGLISH,     description: "IT English for developers" },
    { slug: "javascript", name: "JavaScript", type: SubjectType.PROGRAMMING, description: "Web · Browser · Full-stack JavaScript" },
    { slug: "typescript", name: "TypeScript", type: SubjectType.PROGRAMMING, description: "Typed JavaScript for large-scale apps" },
    { slug: "russian",    name: "Russian",    type: SubjectType.LANGUAGE,    description: "Russian language from alphabet to fluency" },
    { slug: "java",       name: "Java",       type: SubjectType.PROGRAMMING, description: "Enterprise Java · Spring Boot · JVM" },
    { slug: "csharp",     name: "C#",         type: SubjectType.PROGRAMMING, description: ".NET · ASP.NET Core · Modern C#" },
    { slug: "go",         name: "Go",         type: SubjectType.PROGRAMMING, description: "Simplicity · Concurrency · Microservices" },
    { slug: "rust",       name: "Rust",       type: SubjectType.PROGRAMMING, description: "Safety · Speed · Systems programming" },
    { slug: "ai",         name: "Artificial Intelligence", type: SubjectType.AI, description: "ML · Deep Learning · Generative AI · MLOps" },
  ]

  for (const subject of subjects) {
    await prisma.subject.upsert({ where: { slug: subject.slug }, update: {}, create: subject })
  }
  console.log("✅ Subjects seeded")

  // Curriculum — upsert includes topicSlug to backfill existing rows
  let total = 0
  for (const [subjectCode, lessons] of Object.entries(CURRICULUM)) {
    for (let i = 0; i < lessons.length; i++) {
      const l = lessons[i]
      await prisma.curriculum.upsert({
        where: { subjectCode_order: { subjectCode, order: i + 1 } },
        update: { unitTitle: l.unitTitle, lessonTitle: l.lessonTitle, lessonGoal: l.lessonGoal, topicSlug: l.topicSlug ?? null },
        create: {
          subjectCode,
          unit: l.unit,
          unitTitle: l.unitTitle,
          lesson: l.lesson,
          lessonTitle: l.lessonTitle,
          lessonGoal: l.lessonGoal,
          order: i + 1,
          topicSlug: l.topicSlug ?? null,
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

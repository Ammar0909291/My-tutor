import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type LessonDef = { unit: number; unitTitle: string; lesson: number; lessonTitle: string; lessonGoal: string }

// ─── C Language — 30 lessons ─────────────────────────────────────────────────
const C_LESSONS: LessonDef[] = [
  // Unit 1 — Foundations
  { unit: 1, unitTitle: 'Foundations', lesson: 1, lessonTitle: 'What is C? History and Hello World', lessonGoal: 'Understand why C was created and write your first working program that prints to the screen' },
  { unit: 1, unitTitle: 'Foundations', lesson: 2, lessonTitle: 'How a C program works', lessonGoal: 'Understand the journey from source code → compiler → linker → executable and run a program manually' },
  { unit: 1, unitTitle: 'Foundations', lesson: 3, lessonTitle: 'Variables and data types', lessonGoal: 'Declare and use int, float, double, char variables and understand how much memory each uses' },
  { unit: 1, unitTitle: 'Foundations', lesson: 4, lessonTitle: 'Input and output — printf and scanf', lessonGoal: 'Display formatted output with printf and read user input with scanf using correct format specifiers' },
  { unit: 1, unitTitle: 'Foundations', lesson: 5, lessonTitle: 'Operators — arithmetic, comparison, logical', lessonGoal: 'Use +, -, *, /, %, ==, !=, &&, || operators and understand operator precedence' },
  { unit: 1, unitTitle: 'Foundations', lesson: 6, lessonTitle: 'Practice Project — Simple Calculator', lessonGoal: 'Build a 4-operation calculator combining variables, input/output, and operators' },
  // Unit 2 — Control Flow
  { unit: 2, unitTitle: 'Control Flow', lesson: 1, lessonTitle: 'if, else if, else — Decision making', lessonGoal: 'Make programs choose different paths using if/else chains and avoid the = vs == pitfall' },
  { unit: 2, unitTitle: 'Control Flow', lesson: 2, lessonTitle: 'switch statement — Multiple choices', lessonGoal: 'Use switch/case for clean multi-way branching and understand fall-through behavior' },
  { unit: 2, unitTitle: 'Control Flow', lesson: 3, lessonTitle: 'while and do-while loops', lessonGoal: 'Repeat code while a condition is true and understand the difference between while and do-while' },
  { unit: 2, unitTitle: 'Control Flow', lesson: 4, lessonTitle: 'for loops — Counting and iteration', lessonGoal: 'Use for loops for fixed-count repetition and write nested loops for grid patterns' },
  { unit: 2, unitTitle: 'Control Flow', lesson: 5, lessonTitle: 'break, continue, and nested loops', lessonGoal: 'Control loop execution precisely with break/continue and build a number guessing game' },
  // Unit 3 — Functions
  { unit: 3, unitTitle: 'Functions', lesson: 1, lessonTitle: 'What is a function? Why use them?', lessonGoal: 'Define and call your own functions, understand function prototypes, and apply the DRY principle' },
  { unit: 3, unitTitle: 'Functions', lesson: 2, lessonTitle: 'Parameters and return values', lessonGoal: 'Pass data into functions as parameters and return computed results to the caller' },
  { unit: 3, unitTitle: 'Functions', lesson: 3, lessonTitle: 'Scope — Local vs global variables', lessonGoal: 'Understand where variables live and why global variables are dangerous' },
  { unit: 3, unitTitle: 'Functions', lesson: 4, lessonTitle: 'Recursion — Functions calling themselves', lessonGoal: 'Write recursive functions with correct base cases and understand the call stack' },
  // Unit 4 — Arrays and Strings
  { unit: 4, unitTitle: 'Arrays and Strings', lesson: 1, lessonTitle: 'Arrays — Storing multiple values', lessonGoal: 'Declare, initialize, and traverse arrays using for loops to find min, max, and average' },
  { unit: 4, unitTitle: 'Arrays and Strings', lesson: 2, lessonTitle: 'Multi-dimensional arrays — Tables and grids', lessonGoal: 'Work with 2D arrays using nested loops for matrices and grid-based programs' },
  { unit: 4, unitTitle: 'Arrays and Strings', lesson: 3, lessonTitle: 'Strings in C — char arrays and null terminator', lessonGoal: 'Understand that strings are char arrays ending with \\0 and use fgets for safe input' },
  { unit: 4, unitTitle: 'Arrays and Strings', lesson: 4, lessonTitle: 'String functions — strlen, strcpy, strcat, strcmp', lessonGoal: 'Use the <string.h> library to manipulate strings safely and build a grade tracker' },
  // Unit 5 — Pointers
  { unit: 5, unitTitle: 'Pointers', lesson: 1, lessonTitle: 'What is a pointer? Memory addresses', lessonGoal: 'Understand memory addresses, declare pointer variables, and dereference them to read/write values' },
  { unit: 5, unitTitle: 'Pointers', lesson: 2, lessonTitle: 'Pointer arithmetic', lessonGoal: 'Move through memory using pointer arithmetic and implement functions using pointer traversal' },
  { unit: 5, unitTitle: 'Pointers', lesson: 3, lessonTitle: 'Pointers and arrays — The deep connection', lessonGoal: 'Discover that arr[i] and *(arr+i) are identical and pass arrays to functions via pointers' },
  { unit: 5, unitTitle: 'Pointers', lesson: 4, lessonTitle: 'Pointers and functions — Pass by reference', lessonGoal: 'Let functions modify caller variables via pointer parameters and return multiple values' },
  // Unit 6 — Structures and Files
  { unit: 6, unitTitle: 'Structures and Files', lesson: 1, lessonTitle: 'struct — Grouping related data', lessonGoal: 'Create custom data types with struct, access members with dot operator, and use typedef' },
  { unit: 6, unitTitle: 'Structures and Files', lesson: 2, lessonTitle: 'Nested structs and arrays of structs', lessonGoal: 'Build complex data with structs inside structs and arrays of structs with the -> operator' },
  { unit: 6, unitTitle: 'Structures and Files', lesson: 3, lessonTitle: 'File I/O — Reading and writing files', lessonGoal: 'Open, write to, read from, and close files using FILE pointer and detect end-of-file' },
  { unit: 6, unitTitle: 'Structures and Files', lesson: 4, lessonTitle: 'fopen, fprintf, fscanf, fgets', lessonGoal: 'Use the full file API to save and load structured data, building a persistent student database' },
  // Unit 7 — Memory and Advanced
  { unit: 7, unitTitle: 'Memory and Advanced', lesson: 1, lessonTitle: 'Dynamic memory — malloc, calloc, realloc, free', lessonGoal: 'Allocate memory at runtime on the heap, resize allocations with realloc, and always free memory' },
  { unit: 7, unitTitle: 'Memory and Advanced', lesson: 2, lessonTitle: 'Common bugs — Memory leaks, segfaults, undefined behavior', lessonGoal: 'Identify and fix memory leaks, segmentation faults, buffer overflows, and use-after-free bugs' },
  { unit: 7, unitTitle: 'Memory and Advanced', lesson: 3, lessonTitle: 'Final Project — Mini Contact Book Application', lessonGoal: 'Build a complete CRUD application using dynamic arrays, structs, and file persistence' },
]

// ─── C++ Language — 35 lessons ───────────────────────────────────────────────
const CPP_LESSONS: LessonDef[] = [
  // Unit 1 — C++ Basics
  { unit: 1, unitTitle: 'C++ Basics', lesson: 1, lessonTitle: 'C++ vs C — What changed and why', lessonGoal: 'Understand the key differences between C and C++ and why C++ was created' },
  { unit: 1, unitTitle: 'C++ Basics', lesson: 2, lessonTitle: 'First C++ program — cout, cin, namespace', lessonGoal: 'Write your first C++ program using cout for output and cin for input with std namespace' },
  { unit: 1, unitTitle: 'C++ Basics', lesson: 3, lessonTitle: 'Variables, types, and auto keyword', lessonGoal: 'Use C++ types including bool, use auto for type inference, and understand type safety' },
  { unit: 1, unitTitle: 'C++ Basics', lesson: 4, lessonTitle: 'String class — std::string', lessonGoal: 'Use std::string instead of char arrays for safe, easy string handling with member functions' },
  { unit: 1, unitTitle: 'C++ Basics', lesson: 5, lessonTitle: 'References — Aliases for variables', lessonGoal: 'Create references as aliases for existing variables and understand how they differ from pointers' },
  { unit: 1, unitTitle: 'C++ Basics', lesson: 6, lessonTitle: 'const and constexpr', lessonGoal: 'Use const to prevent modification and constexpr for compile-time constants' },
  // Unit 2 — Control and Functions
  { unit: 2, unitTitle: 'Control and Functions', lesson: 1, lessonTitle: 'if/else, switch, and range-based for', lessonGoal: 'Use C++ control flow improvements including range-based for loops over collections' },
  { unit: 2, unitTitle: 'Control and Functions', lesson: 2, lessonTitle: 'while loops and loop control', lessonGoal: 'Use while loops with break/continue and write a complete loop-based program' },
  { unit: 2, unitTitle: 'Control and Functions', lesson: 3, lessonTitle: 'Function overloading — Same name, different params', lessonGoal: 'Define multiple functions with the same name but different parameter types or counts' },
  { unit: 2, unitTitle: 'Control and Functions', lesson: 4, lessonTitle: 'Default parameters and inline functions', lessonGoal: 'Add default values to function parameters and understand inline function optimization' },
  { unit: 2, unitTitle: 'Control and Functions', lesson: 5, lessonTitle: 'Lambda functions — Anonymous functions', lessonGoal: 'Write lambda expressions with capture clauses and use them with STL algorithms' },
  // Unit 3 — OOP
  { unit: 3, unitTitle: 'Object-Oriented Programming', lesson: 1, lessonTitle: 'What is OOP? Classes vs structs', lessonGoal: 'Understand the four OOP pillars and the difference between class (private default) and struct (public default)' },
  { unit: 3, unitTitle: 'Object-Oriented Programming', lesson: 2, lessonTitle: 'Creating a class — Data members and methods', lessonGoal: 'Define a class with data members and member functions, then create and use objects' },
  { unit: 3, unitTitle: 'Object-Oriented Programming', lesson: 3, lessonTitle: 'Constructors and destructors', lessonGoal: 'Write constructors to initialize objects and destructors to clean up resources automatically' },
  { unit: 3, unitTitle: 'Object-Oriented Programming', lesson: 4, lessonTitle: 'this pointer — Referring to current object', lessonGoal: 'Use the this pointer to resolve name conflicts and enable method chaining' },
  { unit: 3, unitTitle: 'Object-Oriented Programming', lesson: 5, lessonTitle: 'Encapsulation — public, private, protected', lessonGoal: 'Hide internal data with private members and expose a clean interface with public getters/setters' },
  { unit: 3, unitTitle: 'Object-Oriented Programming', lesson: 6, lessonTitle: 'Inheritance — Parent and child classes', lessonGoal: 'Create derived classes that inherit data and methods from base classes' },
  { unit: 3, unitTitle: 'Object-Oriented Programming', lesson: 7, lessonTitle: 'Polymorphism — Virtual functions', lessonGoal: 'Override virtual functions so the correct method is called at runtime based on actual object type' },
  { unit: 3, unitTitle: 'Object-Oriented Programming', lesson: 8, lessonTitle: 'Abstract classes and interfaces', lessonGoal: 'Define pure virtual functions to create abstract base classes that act as interfaces' },
  { unit: 3, unitTitle: 'Object-Oriented Programming', lesson: 9, lessonTitle: 'Operator overloading', lessonGoal: 'Overload +, -, ==, << operators to make your classes work with standard syntax' },
  { unit: 3, unitTitle: 'Object-Oriented Programming', lesson: 10, lessonTitle: 'Practice — Bank Account Class System', lessonGoal: 'Build a complete bank account system with Account, SavingsAccount, and Transaction classes' },
  // Unit 4 — Memory
  { unit: 4, unitTitle: 'Memory and Pointers', lesson: 1, lessonTitle: 'Pointers in C++ — Raw vs smart', lessonGoal: 'Review raw pointers from C and understand why C++ prefers smart pointers for safety' },
  { unit: 4, unitTitle: 'Memory and Pointers', lesson: 2, lessonTitle: 'new and delete — Dynamic allocation', lessonGoal: 'Allocate objects on the heap with new and release them with delete, avoiding memory leaks' },
  { unit: 4, unitTitle: 'Memory and Pointers', lesson: 3, lessonTitle: 'Smart pointers — unique_ptr and shared_ptr', lessonGoal: 'Use unique_ptr for exclusive ownership and shared_ptr for shared ownership with automatic cleanup' },
  { unit: 4, unitTitle: 'Memory and Pointers', lesson: 4, lessonTitle: 'Move semantics — Efficient resource transfer', lessonGoal: 'Understand rvalue references, std::move, and move constructors for zero-copy transfers' },
  // Unit 5 — Standard Library
  { unit: 5, unitTitle: 'Standard Library (STL)', lesson: 1, lessonTitle: 'STL containers — vector, list, map, set', lessonGoal: 'Choose the right container for each use case and perform basic CRUD operations on each' },
  { unit: 5, unitTitle: 'Standard Library (STL)', lesson: 2, lessonTitle: 'Iterators — Navigating containers', lessonGoal: 'Use begin/end iterators to traverse any STL container uniformly' },
  { unit: 5, unitTitle: 'Standard Library (STL)', lesson: 3, lessonTitle: 'STL algorithms — sort, find, transform', lessonGoal: 'Apply standard algorithms to containers and combine them with lambdas for powerful one-liners' },
  { unit: 5, unitTitle: 'Standard Library (STL)', lesson: 4, lessonTitle: 'Streams — File reading and writing', lessonGoal: 'Use fstream, ifstream, and ofstream to read and write files with the >> << operators' },
  { unit: 5, unitTitle: 'Standard Library (STL)', lesson: 5, lessonTitle: 'Error handling — Exceptions, try/catch', lessonGoal: 'Throw and catch exceptions, use exception classes, and write exception-safe code' },
  // Unit 6 — Templates and Advanced
  { unit: 6, unitTitle: 'Templates and Advanced C++', lesson: 1, lessonTitle: 'Function templates — Generic functions', lessonGoal: 'Write a single function that works with any type using template<typename T>' },
  { unit: 6, unitTitle: 'Templates and Advanced C++', lesson: 2, lessonTitle: 'Class templates — Generic containers', lessonGoal: 'Create generic classes like Stack<T> and Pair<T,U> that work with any type' },
  { unit: 6, unitTitle: 'Templates and Advanced C++', lesson: 3, lessonTitle: 'Namespaces — Organizing code', lessonGoal: 'Create namespaces to avoid name collisions and organize large codebases' },
  { unit: 6, unitTitle: 'Templates and Advanced C++', lesson: 4, lessonTitle: 'Preprocessor directives — #define, #ifdef, #pragma', lessonGoal: 'Use header guards, conditional compilation, and macros correctly' },
  { unit: 6, unitTitle: 'Templates and Advanced C++', lesson: 5, lessonTitle: 'Modern C++ — auto, decltype, structured bindings', lessonGoal: 'Write modern C++17 code with auto, decltype, if constexpr, and structured bindings' },
  { unit: 6, unitTitle: 'Templates and Advanced C++', lesson: 6, lessonTitle: 'Final Project — Library Management System', lessonGoal: 'Build a complete library system with Book, Member, and Library classes using all OOP and STL knowledge' },
]

// ─── Python — 32 lessons ─────────────────────────────────────────────────────
const PYTHON_LESSONS: LessonDef[] = [
  // Unit 1 — Python Basics
  { unit: 1, unitTitle: 'Python Basics', lesson: 1, lessonTitle: 'Why Python? Installing and first print()', lessonGoal: 'Understand why Python is popular, install it, and write your first program using print()' },
  { unit: 1, unitTitle: 'Python Basics', lesson: 2, lessonTitle: 'Variables and types — int, float, str, bool', lessonGoal: 'Create variables of different types, use type() to inspect them, and understand dynamic typing' },
  { unit: 1, unitTitle: 'Python Basics', lesson: 3, lessonTitle: 'String operations — f-strings, methods, slicing', lessonGoal: 'Format strings with f-strings, use .upper()/.lower()/.replace(), and slice with [start:end]' },
  { unit: 1, unitTitle: 'Python Basics', lesson: 4, lessonTitle: 'User input — input() and type conversion', lessonGoal: 'Read user input with input(), convert types with int()/float(), and validate input' },
  { unit: 1, unitTitle: 'Python Basics', lesson: 5, lessonTitle: 'Operators and expressions', lessonGoal: 'Use arithmetic, comparison, and logical operators, and understand ** for power and // for integer division' },
  { unit: 1, unitTitle: 'Python Basics', lesson: 6, lessonTitle: 'Practice — Personal greeting program', lessonGoal: 'Build a program that collects user info and generates a personalized greeting using all Basics skills' },
  // Unit 2 — Control Flow
  { unit: 2, unitTitle: 'Control Flow', lesson: 1, lessonTitle: 'if/elif/else — Python indentation style', lessonGoal: 'Write conditional logic using Python indentation rules and chained elif instead of else if' },
  { unit: 2, unitTitle: 'Control Flow', lesson: 2, lessonTitle: 'for loops — Iterating over sequences', lessonGoal: 'Use for loops with range(), strings, and lists, and use enumerate() for index+value pairs' },
  { unit: 2, unitTitle: 'Control Flow', lesson: 3, lessonTitle: 'while loops and loop control', lessonGoal: 'Write while loops with break/continue/else and avoid infinite loops with proper conditions' },
  { unit: 2, unitTitle: 'Control Flow', lesson: 4, lessonTitle: 'List comprehensions — Pythonic loops', lessonGoal: 'Replace simple for loops with concise list comprehensions including conditional filtering' },
  // Unit 3 — Data Structures
  { unit: 3, unitTitle: 'Data Structures', lesson: 1, lessonTitle: 'Lists — Python\'s most useful structure', lessonGoal: 'Create and manipulate lists with append/remove/sort/reverse and slice with [::step]' },
  { unit: 3, unitTitle: 'Data Structures', lesson: 2, lessonTitle: 'Tuples — Immutable sequences', lessonGoal: 'Use tuples for fixed data, unpack them into variables, and understand when to use tuple vs list' },
  { unit: 3, unitTitle: 'Data Structures', lesson: 3, lessonTitle: 'Dictionaries — Key-value pairs', lessonGoal: 'Create, update, and query dicts with .get()/.keys()/.values()/.items() and dict comprehensions' },
  { unit: 3, unitTitle: 'Data Structures', lesson: 4, lessonTitle: 'Sets — Unique collections', lessonGoal: 'Use sets for deduplication and set operations: union, intersection, difference' },
  { unit: 3, unitTitle: 'Data Structures', lesson: 5, lessonTitle: 'Nested data structures', lessonGoal: 'Work with lists of dicts, dicts of lists, and other nested combinations to model real data' },
  { unit: 3, unitTitle: 'Data Structures', lesson: 6, lessonTitle: 'Practice — Contact book using dictionaries', lessonGoal: 'Build a contact book CRUD app using a list of dicts with search and display features' },
  // Unit 4 — Functions
  { unit: 4, unitTitle: 'Functions', lesson: 1, lessonTitle: 'Defining functions — def and return', lessonGoal: 'Write functions with def, use return to send results back, and understand docstrings' },
  { unit: 4, unitTitle: 'Functions', lesson: 2, lessonTitle: 'Arguments — positional, keyword, *args, **kwargs', lessonGoal: 'Use all four argument types and write flexible functions that accept any number of arguments' },
  { unit: 4, unitTitle: 'Functions', lesson: 3, lessonTitle: 'Scope and closures', lessonGoal: 'Understand LEGB scope rules and create closures that capture variables from outer functions' },
  { unit: 4, unitTitle: 'Functions', lesson: 4, lessonTitle: 'Lambda functions and map/filter', lessonGoal: 'Write one-line lambda functions and use them with map(), filter(), and sorted()' },
  // Unit 5 — Files and Modules
  { unit: 5, unitTitle: 'Files and Modules', lesson: 1, lessonTitle: 'Reading and writing files', lessonGoal: 'Open files with open() and with statement, read/write text and handle FileNotFoundError' },
  { unit: 5, unitTitle: 'Files and Modules', lesson: 2, lessonTitle: 'Importing modules — os, sys, math, random', lessonGoal: 'Import and use standard library modules for file paths, math operations, and random numbers' },
  { unit: 5, unitTitle: 'Files and Modules', lesson: 3, lessonTitle: 'Creating your own modules', lessonGoal: 'Split code into multiple .py files, import between them, and use __name__ == "__main__"' },
  // Unit 6 — OOP
  { unit: 6, unitTitle: 'Object-Oriented Python', lesson: 1, lessonTitle: 'Classes and objects', lessonGoal: 'Define classes, create objects, and understand that everything in Python is an object' },
  { unit: 6, unitTitle: 'Object-Oriented Python', lesson: 2, lessonTitle: '__init__, self, and instance methods', lessonGoal: 'Write __init__ constructors, use self correctly, and define instance methods' },
  { unit: 6, unitTitle: 'Object-Oriented Python', lesson: 3, lessonTitle: 'Inheritance and super()', lessonGoal: 'Create subclasses that extend parent classes and call parent methods with super()' },
  { unit: 6, unitTitle: 'Object-Oriented Python', lesson: 4, lessonTitle: 'Magic methods — __str__, __len__, __eq__', lessonGoal: 'Make your classes work with built-in functions and operators by implementing dunder methods' },
  { unit: 6, unitTitle: 'Object-Oriented Python', lesson: 5, lessonTitle: 'Dataclasses — Modern Python way', lessonGoal: 'Use @dataclass decorator to auto-generate __init__, __repr__, and __eq__ methods' },
  // Unit 7 — Practical Python
  { unit: 7, unitTitle: 'Practical Python', lesson: 1, lessonTitle: 'Error handling — try/except/finally', lessonGoal: 'Catch specific exceptions, use finally for cleanup, and raise your own exceptions' },
  { unit: 7, unitTitle: 'Practical Python', lesson: 2, lessonTitle: 'List and dict comprehensions mastery', lessonGoal: 'Write advanced comprehensions with conditions, nested comprehensions, and generator expressions' },
  { unit: 7, unitTitle: 'Practical Python', lesson: 3, lessonTitle: 'Working with JSON data', lessonGoal: 'Parse JSON with json.loads/json.dumps, read/write JSON files, and handle nested JSON' },
  { unit: 7, unitTitle: 'Practical Python', lesson: 4, lessonTitle: 'Intro to libraries — requests and datetime', lessonGoal: 'Install and use third-party libraries: fetch web data with requests, work with dates using datetime' },
  { unit: 7, unitTitle: 'Practical Python', lesson: 5, lessonTitle: 'Final Project — Personal Expense Tracker', lessonGoal: 'Build a complete expense tracker with categories, totals, file persistence, and summary reports' },
]

// ─── English — 30 lessons ────────────────────────────────────────────────────
const ENGLISH_LESSONS: LessonDef[] = [
  // Unit 1 — Foundations
  { unit: 1, unitTitle: 'Foundations', lesson: 1, lessonTitle: 'Alphabet, sounds, and greetings', lessonGoal: 'Master English alphabet pronunciation, basic greetings (hello/goodbye/how are you) and polite responses' },
  { unit: 1, unitTitle: 'Foundations', lesson: 2, lessonTitle: 'Nouns — People, places, and things', lessonGoal: 'Identify countable/uncountable nouns, use singular/plural correctly, and build vocabulary in key categories' },
  { unit: 1, unitTitle: 'Foundations', lesson: 3, lessonTitle: 'Pronouns — I, you, he, she, it, we, they', lessonGoal: 'Use subject, object, and possessive pronouns correctly in sentences' },
  { unit: 1, unitTitle: 'Foundations', lesson: 4, lessonTitle: 'Simple present tense — Actions and facts', lessonGoal: 'Form affirmative, negative, and question sentences in simple present with correct verb conjugation' },
  { unit: 1, unitTitle: 'Foundations', lesson: 5, lessonTitle: 'Basic questions — Who, what, where, when, why', lessonGoal: 'Form and answer WH-questions and yes/no questions using correct word order' },
  { unit: 1, unitTitle: 'Foundations', lesson: 6, lessonTitle: 'Practice — Introduce yourself', lessonGoal: 'Give a complete self-introduction: name, age, country, job, hobbies in clear English' },
  // Unit 2 — Everyday English
  { unit: 2, unitTitle: 'Everyday English', lesson: 1, lessonTitle: 'Numbers, dates, and time', lessonGoal: 'Say cardinal/ordinal numbers, read dates in American/British format, and tell the time correctly' },
  { unit: 2, unitTitle: 'Everyday English', lesson: 2, lessonTitle: 'Adjectives — Describing people and things', lessonGoal: 'Use adjectives in correct position, comparative forms (bigger), and degree adverbs (very, quite)' },
  { unit: 2, unitTitle: 'Everyday English', lesson: 3, lessonTitle: 'Present continuous — Actions happening now', lessonGoal: 'Form present continuous correctly and know when to use it vs simple present' },
  { unit: 2, unitTitle: 'Everyday English', lesson: 4, lessonTitle: 'Past simple — Completed actions', lessonGoal: 'Use regular and irregular past verbs, form negative/question, and narrate past events' },
  { unit: 2, unitTitle: 'Everyday English', lesson: 5, lessonTitle: 'Future — will and going to', lessonGoal: 'Distinguish between will (spontaneous decisions) and going to (plans) and use them correctly' },
  { unit: 2, unitTitle: 'Everyday English', lesson: 6, lessonTitle: 'Practice — Describe your typical day', lessonGoal: 'Write and speak about a full day using present, past, and future tenses naturally' },
  // Unit 3 — Grammar Core
  { unit: 3, unitTitle: 'Grammar Core', lesson: 1, lessonTitle: 'Articles — a, an, the', lessonGoal: 'Use a/an for first mention, the for specific reference, and zero article for generalizations' },
  { unit: 3, unitTitle: 'Grammar Core', lesson: 2, lessonTitle: 'Prepositions — in, on, at, by, for, with', lessonGoal: 'Use common prepositions of time, place, and movement without translating from your native language' },
  { unit: 3, unitTitle: 'Grammar Core', lesson: 3, lessonTitle: 'Modal verbs — can, should, must, might', lessonGoal: 'Express ability, advice, obligation, and possibility using modal verbs correctly' },
  { unit: 3, unitTitle: 'Grammar Core', lesson: 4, lessonTitle: 'Comparatives and superlatives', lessonGoal: 'Form comparative (more/–er) and superlative (most/–est) correctly for all adjective types' },
  { unit: 3, unitTitle: 'Grammar Core', lesson: 5, lessonTitle: 'Conjunctions — and, but, or, so, because', lessonGoal: 'Connect ideas with coordinating and subordinating conjunctions to write complex sentences' },
  { unit: 3, unitTitle: 'Grammar Core', lesson: 6, lessonTitle: 'Practice — Write about your city', lessonGoal: 'Produce a structured paragraph about your city using articles, prepositions, and comparatives' },
  // Unit 4 — Speaking and Listening
  { unit: 4, unitTitle: 'Speaking and Listening', lesson: 1, lessonTitle: 'Asking and giving directions', lessonGoal: 'Use imperative directions (turn left/go straight) and politely ask for help finding places' },
  { unit: 4, unitTitle: 'Speaking and Listening', lesson: 2, lessonTitle: 'Shopping and ordering food', lessonGoal: 'Handle real shopping situations: ask prices, compare products, and order at a restaurant' },
  { unit: 4, unitTitle: 'Speaking and Listening', lesson: 3, lessonTitle: 'Phone calls and email basics', lessonGoal: 'Use formal and informal phone/email language to communicate professionally in English' },
  { unit: 4, unitTitle: 'Speaking and Listening', lesson: 4, lessonTitle: 'Agreeing, disagreeing, and opinions', lessonGoal: 'Express opinions politely (I think/I believe), agree (exactly!/absolutely!) and disagree diplomatically' },
  { unit: 4, unitTitle: 'Speaking and Listening', lesson: 5, lessonTitle: 'Small talk — Starting conversations', lessonGoal: 'Start and maintain casual conversations about weather, weekend, news, and hobbies naturally' },
  // Unit 5 — Intermediate Grammar
  { unit: 5, unitTitle: 'Intermediate Grammar', lesson: 1, lessonTitle: 'Present perfect — Have you ever...?', lessonGoal: 'Use present perfect for experiences and recent events and distinguish it from past simple' },
  { unit: 5, unitTitle: 'Intermediate Grammar', lesson: 2, lessonTitle: 'Passive voice — Focus on the action', lessonGoal: 'Transform active sentences to passive and understand when passive is preferred in English' },
  { unit: 5, unitTitle: 'Intermediate Grammar', lesson: 3, lessonTitle: 'Reported speech — What did they say?', lessonGoal: 'Convert direct speech to reported speech with correct tense backshift and pronoun changes' },
  { unit: 5, unitTitle: 'Intermediate Grammar', lesson: 4, lessonTitle: 'Conditional sentences — If/when', lessonGoal: 'Use zero, first, and second conditionals correctly for facts, real situations, and hypotheticals' },
  { unit: 5, unitTitle: 'Intermediate Grammar', lesson: 5, lessonTitle: 'Relative clauses — who, which, that', lessonGoal: 'Add information to nouns with defining and non-defining relative clauses using who/which/that/where' },
  // Unit 6 — Advanced
  { unit: 6, unitTitle: 'Advanced English', lesson: 1, lessonTitle: 'Idioms and phrasal verbs', lessonGoal: 'Learn 20 high-frequency idioms and phrasal verbs and use them naturally in context' },
  { unit: 6, unitTitle: 'Advanced English', lesson: 2, lessonTitle: 'Business English — Meetings and presentations', lessonGoal: 'Use professional language for meetings, emails, and presentations in a work context' },
  { unit: 6, unitTitle: 'Advanced English', lesson: 3, lessonTitle: 'Pronunciation — Stress, rhythm, intonation', lessonGoal: 'Master word stress, sentence rhythm, and intonation patterns that make English sound natural' },
  { unit: 6, unitTitle: 'Advanced English', lesson: 4, lessonTitle: 'Final Project — 3-minute speech', lessonGoal: 'Plan, write, and deliver a 3-minute structured speech on any topic using all advanced skills' },
]

// ─── Seeder ───────────────────────────────────────────────────────────────────

type Subject = { code: string; lessons: LessonDef[] }

const ALL_SUBJECTS: Subject[] = [
  { code: 'c', lessons: C_LESSONS },
  { code: 'cpp', lessons: CPP_LESSONS },
  { code: 'python', lessons: PYTHON_LESSONS },
  { code: 'english', lessons: ENGLISH_LESSONS },
]

async function main() {
  console.log('Seeding curriculum...')

  for (const { code, lessons } of ALL_SUBJECTS) {
    // Delete existing curriculum for this subject
    await prisma.curriculum.deleteMany({ where: { subjectCode: code } })

    let globalOrder = 1
    for (const l of lessons) {
      await prisma.curriculum.create({
        data: {
          subjectCode: code,
          unit: l.unit,
          unitTitle: l.unitTitle,
          lesson: l.lesson,
          lessonTitle: l.lessonTitle,
          lessonGoal: l.lessonGoal,
          order: globalOrder++,
        },
      })
    }
    console.log(`✓ ${code.toUpperCase()}: ${lessons.length} lessons seeded`)
  }

  console.log('\nCurriculum seed complete!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())

import type { Curriculum } from '@/types'

export const C_CURRICULUM: Curriculum = {
  title: 'C Programming — Complete Course',
  estimatedWeeks: 10,
  steps: [
    // ── UNIT 1 — FOUNDATIONS ─────────────────────────────────────────────────
    {
      order: 1,
      title: 'What is C? History and Hello World',
      description: 'Learn why C was created, where it is used today, and write your very first program.',
      topics: ['History of C', 'Why learn C', 'C vs other languages', 'Hello World program', 'Basic program structure'],
      exercises: ['Write a Hello World program', 'Modify it to print your name'],
      estimatedHours: 1,
    },
    {
      order: 2,
      title: 'How a C program works',
      description: 'Understand the journey from source code to running program — compiler, linker, and execution.',
      topics: ['Source code', 'Compiler (gcc)', 'Linker', 'Executable', 'Header files', '#include <stdio.h>'],
      exercises: ['Compile a program manually with gcc', 'Observe compiler error messages'],
      estimatedHours: 1,
    },
    {
      order: 3,
      title: 'Variables and data types',
      description: 'Store data in your program using variables of different types.',
      topics: ['int', 'float', 'double', 'char', 'Variable declaration', 'Variable initialization', 'sizeof operator'],
      exercises: ['Declare variables of each type', 'Print their sizes with sizeof', 'Store your age and height'],
      estimatedHours: 1.5,
    },
    {
      order: 4,
      title: 'Input and output — printf and scanf',
      description: 'Make your program talk to the user — display output and read input.',
      topics: ['printf format specifiers (%d %f %c %s)', 'scanf', 'stdin/stdout', 'Newline \\n', 'Address-of operator &'],
      exercises: ['Program that asks for name and age and greets user', 'Temperature converter (input → output)'],
      estimatedHours: 1.5,
    },
    {
      order: 5,
      title: 'Operators',
      description: 'Perform calculations and make comparisons with arithmetic, comparison, and logical operators.',
      topics: ['Arithmetic: + - * / %', 'Increment/decrement ++ --', 'Comparison: == != < > <= >=', 'Logical: && || !', 'Assignment operators', 'Operator precedence'],
      exercises: ['Calculate area of a rectangle', 'Check if a number is even or odd', 'BMI calculator'],
      estimatedHours: 1.5,
    },
    {
      order: 6,
      title: 'Practice Project — Simple Calculator',
      description: 'Build a calculator that takes two numbers and an operator, then shows the result.',
      topics: ['Combining printf/scanf', 'Arithmetic operators in practice', 'Program structure'],
      exercises: ['4-operation calculator (+ - * /)', 'Add division by zero check', 'Add modulo operation'],
      estimatedHours: 2,
    },

    // ── UNIT 2 — CONTROL FLOW ────────────────────────────────────────────────
    {
      order: 7,
      title: 'if, else if, else — Decision making',
      description: 'Make your program choose different paths based on conditions.',
      topics: ['if statement', 'else clause', 'else if chain', 'Nested if', 'Ternary operator ?:', 'Common pitfalls (= vs ==)'],
      exercises: ['Grade classifier (A/B/C/D/F)', 'Positive/negative/zero checker', 'Leap year checker'],
      estimatedHours: 1.5,
    },
    {
      order: 8,
      title: 'switch statement',
      description: 'Handle multiple fixed choices cleanly with switch/case.',
      topics: ['switch syntax', 'case labels', 'break in switch', 'default case', 'Fall-through behavior'],
      exercises: ['Day-of-week printer', 'Simple menu system', 'Month days calculator'],
      estimatedHours: 1,
    },
    {
      order: 9,
      title: 'while and do-while loops',
      description: 'Repeat code while a condition is true.',
      topics: ['while loop', 'do-while loop', 'Infinite loops', 'Loop condition', 'Counter variables'],
      exercises: ['Count down from 10', 'Sum digits of a number', 'Repeat until valid input'],
      estimatedHours: 1.5,
    },
    {
      order: 10,
      title: 'for loops — Counting and iteration',
      description: 'The most common loop — perfect for counting and iterating a fixed number of times.',
      topics: ['for loop syntax (init; condition; update)', 'Loop variable scope', 'Counting up and down', 'Nested for loops intro'],
      exercises: ['Multiplication table (1-10)', 'Sum of 1 to N', 'Print stars in a pattern'],
      estimatedHours: 1.5,
    },
    {
      order: 11,
      title: 'break, continue, and nested loops',
      description: 'Control loop flow precisely and work with loops inside loops.',
      topics: ['break — exit loop early', 'continue — skip to next iteration', 'Nested loops', 'Loop labels (goto discussion)'],
      exercises: ['Find first prime number', 'Print multiplication table grid', 'Number Guessing Game'],
      estimatedHours: 2,
    },

    // ── UNIT 3 — FUNCTIONS ───────────────────────────────────────────────────
    {
      order: 12,
      title: 'What is a function? Why use them?',
      description: 'Break your program into reusable, named pieces of code.',
      topics: ['Function definition', 'Function call', 'void functions', 'Function prototype (declaration)', 'DRY principle'],
      exercises: ['Write a greet() function', 'Write a printLine() separator function', 'Refactor calculator into functions'],
      estimatedHours: 1.5,
    },
    {
      order: 13,
      title: 'Parameters and return values',
      description: 'Pass data into functions and get results back.',
      topics: ['Parameters vs arguments', 'Return type', 'return statement', 'Multiple parameters', 'Pass by value'],
      exercises: ['add(a, b) function', 'max(a, b) function', 'celsius_to_fahrenheit(c) converter'],
      estimatedHours: 1.5,
    },
    {
      order: 14,
      title: 'Scope — Local vs global variables',
      description: 'Understand where variables live and why it matters.',
      topics: ['Local scope', 'Global scope', 'Block scope', 'Variable shadowing', 'Why globals are dangerous', 'static variables'],
      exercises: ['Experiment with scope — guess the output', 'Counter using static variable'],
      estimatedHours: 1,
    },
    {
      order: 15,
      title: 'Recursion — Functions calling themselves',
      description: 'Solve problems by breaking them into smaller versions of themselves.',
      topics: ['Base case', 'Recursive case', 'Call stack', 'Stack overflow', 'When to use recursion vs loops'],
      exercises: ['Factorial with recursion', 'Fibonacci sequence', 'Power function x^n'],
      estimatedHours: 2,
    },

    // ── UNIT 4 — ARRAYS AND STRINGS ──────────────────────────────────────────
    {
      order: 16,
      title: 'Arrays — Storing multiple values',
      description: 'Store and work with lists of data under a single variable name.',
      topics: ['Array declaration', 'Array initialization', 'Index (0-based)', 'Array traversal with for loop', 'Array bounds (no safety!)'],
      exercises: ['Store 5 grades and find average', 'Find max and min in array', 'Reverse an array'],
      estimatedHours: 1.5,
    },
    {
      order: 17,
      title: 'Multi-dimensional arrays — Tables and grids',
      description: 'Work with data in rows and columns like a spreadsheet.',
      topics: ['2D array syntax', 'Row-major order', 'Nested loops for 2D arrays', '3D arrays (brief)', 'Matrix as 2D array'],
      exercises: ['Print a 3x3 matrix', 'Matrix addition', 'Tic-tac-toe board'],
      estimatedHours: 1.5,
    },
    {
      order: 18,
      title: 'Strings in C — char arrays and null terminator',
      description: 'Learn how C stores text — it is just an array of characters with a special ending.',
      topics: ['char array as string', 'Null terminator \\0', 'String literals', 'String input with scanf %s', 'fgets for safe input'],
      exercises: ['Store and print your name', 'Count characters manually', 'Check if string is empty'],
      estimatedHours: 1.5,
    },
    {
      order: 19,
      title: 'String functions — strlen, strcpy, strcat, strcmp',
      description: 'Use the standard library to work with strings safely and efficiently.',
      topics: ['#include <string.h>', 'strlen', 'strcpy / strncpy', 'strcat / strncat', 'strcmp', 'sprintf'],
      exercises: ['Build a greeting from first + last name', 'Palindrome checker', 'Student Grade Tracker project'],
      estimatedHours: 2,
    },

    // ── UNIT 5 — POINTERS ────────────────────────────────────────────────────
    {
      order: 20,
      title: 'What is a pointer? Memory addresses',
      description: 'The most powerful — and most misunderstood — feature of C. Understand memory directly.',
      topics: ['Memory addresses', 'Pointer declaration (*)', 'Address-of operator (&)', 'Dereferencing (*ptr)', 'NULL pointer', 'Pointer size'],
      exercises: ['Print address of a variable', 'Read and modify value through pointer', 'NULL check pattern'],
      estimatedHours: 2,
    },
    {
      order: 21,
      title: 'Pointer arithmetic',
      description: 'Move through memory by adding and subtracting from pointers.',
      topics: ['ptr + 1 moves by type size', 'ptr++ and ptr--', 'Pointer difference', 'Comparing pointers', 'void pointer'],
      exercises: ['Walk through an int array with a pointer', 'Implement your own strlen using pointer arithmetic'],
      estimatedHours: 1.5,
    },
    {
      order: 22,
      title: 'Pointers and arrays — The deep connection',
      description: 'Discover that arrays and pointers are almost the same thing in C.',
      topics: ['Array name as pointer', 'arr[i] == *(arr+i)', 'Passing arrays to functions', 'Pointer to array element', 'const pointers'],
      exercises: ['Sum array using pointer instead of index', 'Write array_max() that takes a pointer'],
      estimatedHours: 1.5,
    },
    {
      order: 23,
      title: 'Pointers and functions — Pass by reference',
      description: 'Let functions modify the caller\'s variables using pointers.',
      topics: ['Pass by value vs pass by reference', 'Pointer parameters', 'Returning multiple values via pointers', 'Function pointers (intro)'],
      exercises: ['swap(a, b) using pointers', 'minmax() that returns both min and max', 'Swap Two Numbers Practice'],
      estimatedHours: 2,
    },

    // ── UNIT 6 — STRUCTURES AND FILES ────────────────────────────────────────
    {
      order: 24,
      title: 'struct — Grouping related data',
      description: 'Create your own data types that bundle related fields together.',
      topics: ['struct definition', 'struct variables', 'Dot operator (.)', 'struct initialization', 'typedef struct', 'Passing structs to functions'],
      exercises: ['Student struct (name, age, grade)', 'Point struct with distance function', 'Rectangle struct with area/perimeter'],
      estimatedHours: 2,
    },
    {
      order: 25,
      title: 'Nested structs and arrays of structs',
      description: 'Build complex data structures by combining structs and arrays.',
      topics: ['Struct inside struct', 'Array of structs', 'Pointer to struct (->)', 'Struct as function parameter', 'Struct as return value'],
      exercises: ['Classroom of 5 students (array of structs)', 'Find top student by grade', 'Address book entry with nested address struct'],
      estimatedHours: 2,
    },
    {
      order: 26,
      title: 'File I/O — Reading and writing files',
      description: 'Make your data persist beyond the program — save to and load from disk.',
      topics: ['FILE pointer', 'fopen modes (r, w, a, r+)', 'fclose', 'End of file (EOF)', 'Error checking'],
      exercises: ['Write a message to a file', 'Read a file line by line', 'Copy one file to another'],
      estimatedHours: 1.5,
    },
    {
      order: 27,
      title: 'fopen, fclose, fprintf, fscanf',
      description: 'Use the full file I/O API to build a data storage system.',
      topics: ['fprintf', 'fscanf', 'fgets / fputs', 'fread / fwrite (binary)', 'rewind / fseek'],
      exercises: ['Save student records to file', 'Load and display saved records', 'Student Database with File Storage'],
      estimatedHours: 2,
    },

    // ── UNIT 7 — MEMORY AND ADVANCED ─────────────────────────────────────────
    {
      order: 28,
      title: 'Dynamic memory — malloc, calloc, realloc, free',
      description: 'Allocate memory at runtime — the key to flexible data structures.',
      topics: ['Stack vs Heap', 'malloc(size)', 'calloc(n, size)', 'realloc(ptr, size)', 'free(ptr)', 'NULL check after malloc'],
      exercises: ['Dynamic array of N integers', 'Grow an array with realloc', 'Dynamic string duplication'],
      estimatedHours: 2,
    },
    {
      order: 29,
      title: 'Common bugs — Memory leaks, segfaults, undefined behavior',
      description: 'Learn the most dangerous C bugs and how to avoid and debug them.',
      topics: ['Memory leaks', 'Segmentation fault', 'Buffer overflow', 'Use-after-free', 'Double free', 'Valgrind (intro)', 'Defensive programming'],
      exercises: ['Spot the bug exercises (5 buggy programs)', 'Fix each bug', 'Write a safe string copy function'],
      estimatedHours: 2,
    },
    {
      order: 30,
      title: 'Final Project — Mini Contact Book Application',
      description: 'Build a complete application combining everything learned: structs, dynamic memory, file I/O, and functions.',
      topics: ['Project architecture', 'CRUD operations (Create Read Update Delete)', 'Persistent storage with files', 'Dynamic array of contacts', 'Menu-driven UI'],
      exercises: [
        'Add a contact (name, phone, email)',
        'List all contacts',
        'Search by name',
        'Delete a contact',
        'Save to file on exit, load on start',
      ],
      estimatedHours: 4,
    },
  ],
}

export const CPP_CURRICULUM: Curriculum | null = null   // future
export const PYTHON_CURRICULUM: Curriculum | null = null // future

export function getStaticCurriculum(subjectSlug: string): Curriculum | null {
  if (subjectSlug === 'c') return C_CURRICULUM
  return null
}

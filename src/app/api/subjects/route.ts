// MED-4 review: /api/subjects is intentionally unauthenticated.
// It powers the subject picker on the landing/onboarding page where the user
// has not yet signed in. The payload is a non-sensitive product catalogue
// (subject names, slugs, descriptions) — no PII, no pricing, no internal ids
// beyond what a visitor would see on the marketing site. Keeping it public
// avoids a chicken-and-egg auth requirement during sign-up. No change needed.
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'

const FALLBACK_SUBJECTS = [
  { id: 'c',          name: 'C',          slug: 'c',          description: 'System programming · Memory · Speed',       type: 'C' },
  { id: 'cpp',        name: 'C++',        slug: 'cpp',        description: 'OOP · STL · High performance',              type: 'CPP' },
  { id: 'python',     name: 'Python',     slug: 'python',     description: 'Fast start · Readability · Versatile',      type: 'PYTHON' },
  { id: 'english',    name: 'English',    slug: 'english',    description: 'IT English · Docs · Communication',         type: 'ENGLISH' },
  { id: 'javascript', name: 'JavaScript', slug: 'javascript', description: 'Web · Browser · Full-stack',               type: 'PROGRAMMING' },
  { id: 'typescript', name: 'TypeScript', slug: 'typescript', description: 'Types · Safety · Enterprise JS',           type: 'PROGRAMMING' },
  { id: 'russian',    name: 'Russian',    slug: 'russian',    description: 'Alphabet · Grammar · Conversation',        type: 'LANGUAGE' },
  { id: 'java',       name: 'Java',       slug: 'java',       description: 'Enterprise · Spring Boot · JVM',            type: 'PROGRAMMING' },
  { id: 'csharp',     name: 'C#',         slug: 'csharp',     description: '.NET · ASP.NET Core · Modern C#',           type: 'PROGRAMMING' },
  { id: 'go',         name: 'Go',         slug: 'go',         description: 'Simplicity · Concurrency · Cloud',          type: 'PROGRAMMING' },
  { id: 'rust',       name: 'Rust',       slug: 'rust',       description: 'Safety · Speed · Systems programming',      type: 'PROGRAMMING' },
  { id: 'ai',         name: 'Artificial Intelligence', slug: 'ai', description: 'ML · Deep Learning · Generative AI · MLOps', type: 'AI' },
]

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({ orderBy: { name: 'asc' } })
    if (subjects.length > 0) {
      // Filter out hidden subjects so the onboarding subject picker never
      // shows them to new users. Enrolled users are served via profile APIs,
      // not this discovery endpoint.
      const visible = subjects.filter((s) => {
        const lib = findLibrarySubject(s.slug)
        return lib === undefined || lib.visible !== false
      })
      return NextResponse.json(visible)
    }
    return NextResponse.json(FALLBACK_SUBJECTS)
  } catch {
    return NextResponse.json(FALLBACK_SUBJECTS)
  }
}

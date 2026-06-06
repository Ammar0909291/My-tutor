import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

const FALLBACK_SUBJECTS = [
  { id: 'c',       name: 'C',       slug: 'c',       description: 'System programming · Memory · Speed', type: 'C' },
  { id: 'cpp',     name: 'C++',     slug: 'cpp',     description: 'OOP · STL · High performance',        type: 'CPP' },
  { id: 'python',  name: 'Python',  slug: 'python',  description: 'Fast start · Readability · Versatile', type: 'PYTHON' },
  { id: 'english', name: 'English', slug: 'english', description: 'IT English · Docs · Communication',    type: 'ENGLISH' },
]

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({ orderBy: { name: 'asc' } })
    if (subjects.length > 0) {
      return NextResponse.json(subjects)
    }
    return NextResponse.json(FALLBACK_SUBJECTS)
  } catch {
    return NextResponse.json(FALLBACK_SUBJECTS)
  }
}

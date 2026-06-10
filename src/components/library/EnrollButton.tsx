'use client'

interface Props {
  subjectId?: string
  subjectSlug?: string
  label?: string
  accent?: string
  enrolled?: boolean
  [key: string]: unknown
}

export function EnrollButton({ label, enrolled }: Props) {
  return (
    <button className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
      {label ?? (enrolled ? 'Enrolled' : 'Enroll')}
    </button>
  )
}

'use client'

interface Props {
  subjectSlug: string
  accent?: string
  lang?: string
}

export default function SubjectModuleTree({ subjectSlug }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">Modules for {subjectSlug}</p>
    </div>
  )
}

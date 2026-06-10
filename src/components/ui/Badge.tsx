type BadgeVariant = 'coral' | 'blue' | 'green' | 'yellow' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const cls: Record<BadgeVariant, string> = {
  coral:   'badge badge-coral',
  blue:    'badge badge-blue',
  green:   'badge badge-green',
  yellow:  'badge badge-yellow',
  default: 'badge',
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return <span className={`${cls[variant]} ${className}`}>{children}</span>
}

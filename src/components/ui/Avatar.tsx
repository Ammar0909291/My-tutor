interface AvatarProps {
  name: string
  bg?: string
  size?: number
  className?: string
}

export function Avatar({ name, bg = 'F78166', size = 64, className = '' }: AvatarProps) {
  const src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&bold=true&size=${size}`
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className={`rounded-full object-cover ${className}`}
      width={size}
      height={size}
    />
  )
}

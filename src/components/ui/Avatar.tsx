'use client'

import { useState } from 'react'
import Image from 'next/image'

interface AvatarProps {
  name: string
  bg?: string
  size?: number
  className?: string
}

/**
 * QA fix (2026-07-16, live browser pass): avatars come from the external
 * ui-avatars.com service, which showed a broken image whenever that host is
 * unreachable (offline use, restricted school/corporate networks — observed
 * live as ERR_TUNNEL_CONNECTION_FAILED). On load error this now falls back
 * to a locally-rendered initial with the same background color, identical
 * size and shape, so nothing changes visually when the CDN works.
 */
export function Avatar({ name, bg = 'F78166', size = 64, className = '' }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&bold=true&size=${size}`

  if (failed) {
    const initial = (name.trim()[0] ?? '?').toUpperCase()
    return (
      <div
        aria-label={name}
        role="img"
        className={`rounded-full ${className}`}
        style={{
          width: size,
          height: size,
          background: `#${bg}`,
          color: '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: Math.round(size * 0.45),
          flexShrink: 0,
        }}
      >
        {initial}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={name}
      className={`rounded-full object-cover ${className}`}
      width={size}
      height={size}
      unoptimized
      onError={() => setFailed(true)}
    />
  )
}

import { type HTMLAttributes } from 'react'

import { cn } from '../../utils/cn'
import { iconMap, type IconName } from '../../utils/icons'

export type AvatarType = 'image' | 'icon' | 'initials'
export type AvatarIconName = Exclude<IconName, 'none'>

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  type?: AvatarType
  icon?: AvatarIconName
  alt?: string
  src?: string
  initials?: string
  rounded?: boolean
  darkMode?: boolean
}

export function Avatar({
  type = 'icon',
  icon = 'user',
  alt = '',
  src,
  initials,
  rounded = true,
  darkMode = true,
  className,
  ...props
}: AvatarProps) {
  const sanitizedInitials = initials?.slice(0, 2).toUpperCase()

  const containerClassName = cn(
    'flex items-center justify-center overflow-hidden w-40 h-40 border-1 border-neutral-700',
    {
      'text-white bg-neutral-800': darkMode,
      'text-neutral-800 bg-neutral-200': !darkMode,
      'rounded-full': rounded,
      'rounded-8': !rounded,
    },
    className,
  )

  if (type === 'image') {
    return (
      <div className={containerClassName} {...props}>
        <img
          src={src || '/avatar.png'}
          alt={alt ?? 'Avatar'}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  if (type === 'initials') {
    return (
      <div
        className={containerClassName}
        {...props}
        aria-label={alt || sanitizedInitials || 'User'}
      >
        <span className="text-s-medium select-none">{sanitizedInitials || 'U'}</span>
      </div>
    )
  }

  return (
    <div className={containerClassName} {...props} aria-label={alt || 'Avatar'}>
      {iconMap[icon]}
    </div>
  )
}

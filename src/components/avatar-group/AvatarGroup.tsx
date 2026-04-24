import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
} from 'react'

import { cn } from '../../utils/cn'
import { type AvatarProps } from '../avatar/Avatar'

const MAX_VISIBLE = 5

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement<AvatarProps> | ReactElement<AvatarProps>[]
  max?: number
  darkMode?: boolean
}

export function AvatarGroup({
  children,
  max = MAX_VISIBLE,
  darkMode = true,
  className,
  ...props
}: AvatarGroupProps) {
  const avatars = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[]

  const visible = avatars.slice(0, max)
  const remainder = avatars.length - max

  const outlineClass = darkMode ? 'outline-neutral-900' : 'outline-white'

  const wrapperClass = cn('inline-flex shrink-0 rounded-full outline-2', outlineClass)

  const overflowClass = cn(
    'inline-flex shrink-0 items-center justify-center',
    'w-40 h-40 rounded-full outline-2',
    'text-s-medium select-none',
    outlineClass,
    {
      'bg-neutral-800 border-1 border-neutral-700 text-white': darkMode,
      'bg-neutral-200 border-1 border-neutral-300 text-neutral-800': !darkMode,
    },
  )

  return (
    <div className={cn('flex items-center', className)} role="group" {...props}>
      {visible.map((avatar, index) => (
        <div
          key={index}
          className={cn(wrapperClass, index > 0 && '-ml-8')}
          style={{ zIndex: index + 1 }}
        >
          {cloneElement(avatar, { darkMode, rounded: true })}
        </div>
      ))}

      {remainder > 0 && (
        <div className={cn(overflowClass, '-ml-8')} style={{ zIndex: avatars.length + 1 }}>
          +{remainder}
        </div>
      )}
    </div>
  )
}

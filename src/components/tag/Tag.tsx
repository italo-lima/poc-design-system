import { type HTMLAttributes, type MouseEventHandler, type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

import { iconMap, type IconName } from '../../utils/icons'
import { cn } from '../../utils/cn'

export type TagVariant =
  | 'primary'
  | 'danger'
  | 'accent'
  | 'secondary'
  | 'critical'
  | 'info'
  | 'success'

export type TagSurface = 'solid' | 'outline'
export type TagSize = 'medium' | 'small'
export type TagFormat = 'squared' | 'pill'

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  darkMode?: boolean
  variant?: TagVariant
  surface?: TagSurface
  size?: TagSize
  format?: TagFormat
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  onTrailingClick?: MouseEventHandler<HTMLButtonElement>
  text: string
}

const tag = tv({
  base: 'box-border inline-flex items-center justify-center gap-8 p-12',
  variants: {
    variant: {
      primary: '',
      danger: '',
      accent: '',
      secondary: '',
      critical: '',
      info: '',
      success: '',
    },
    surface: {
      solid: '',
      outline: '',
    },
    size: {
      medium: 'h-40 w-90',
      small: 'h-32 w-90',
    },
    format: {
      squared: 'rounded-8',
      pill: 'rounded-3xl',
    },
  },
  compoundVariants: [
    { surface: 'solid', variant: 'primary', class: 'bg-brand-600 text-black' },
    { surface: 'solid', variant: 'danger', class: 'bg-tart-orange-600 text-white' },
    { surface: 'solid', variant: 'accent', class: 'bg-crayola-600 text-black' },
    { surface: 'solid', variant: 'secondary', class: 'bg-neutral-700 text-white' },
    { surface: 'solid', variant: 'critical', class: 'bg-red-600 text-white' },
    { surface: 'solid', variant: 'info', class: 'bg-blue-700 text-black' },
    { surface: 'solid', variant: 'success', class: 'bg-green-700 text-black' },
    {
      surface: 'outline',
      variant: 'primary',
      class: 'border border-brand-500 bg-brand-500/15 text-brand-500',
    },
    {
      surface: 'outline',
      variant: 'danger',
      class: 'border border-tart-orange-500 bg-tart-orange-500/15 text-tart-orange-500',
    },
    {
      surface: 'outline',
      variant: 'accent',
      class: 'border border-crayola-500 bg-crayola-500/15 text-crayola-500',
    },
    {
      surface: 'outline',
      variant: 'secondary',
      class: 'border border-neutral-500 bg-neutral-500/15 text-neutral-300',
    },
    {
      surface: 'outline',
      variant: 'critical',
      class: 'border border-red-500 bg-red-500/15 text-red-500',
    },
    {
      surface: 'outline',
      variant: 'info',
      class: 'border border-blue-500 bg-blue-500/15 text-blue-400',
    },
    {
      surface: 'outline',
      variant: 'success',
      class: 'border border-green-500 bg-green-500/15 text-green-500',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    surface: 'solid',
    size: 'medium',
    format: 'squared',
  },
})

const iconSlot = 'inline-flex size-12 shrink-0 items-center justify-center [&_svg]:size-12'

export function Tag({
  variant = 'primary',
  surface = 'solid',
  size = 'medium',
  format = 'squared',
  leadingIcon,
  trailingIcon,
  onTrailingClick,
  text,
  className,
  ...props
}: TagProps) {
  return (
    <div className={tag({ variant, surface, size, format, class: className })} {...props}>
      {leadingIcon !== null && (
        <span className={cn(iconSlot, 'text-inherit')}>{iconMap[leadingIcon as IconName]}</span>
      )}
      <span className="min-w-0 truncate text-xs-medium text-inherit">{text}</span>
      {trailingIcon !== null &&
        (onTrailingClick !== null ? (
          <button
            type="button"
            className={cn(
              iconSlot,
              'cursor-pointer border-0 bg-transparent p-0 text-inherit',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
            )}
            aria-label="Fechar"
            onClick={onTrailingClick}
          >
            {iconMap[trailingIcon as IconName]}
          </button>
        ) : (
          <span className={cn(iconSlot, 'text-inherit')}>{iconMap[trailingIcon as IconName]}</span>
        ))}
    </div>
  )
}

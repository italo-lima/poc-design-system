import { type HTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'

export type BadgeVariant =
  | 'primary'
  | 'danger'
  | 'accent'
  | 'secondary'
  | 'critical'
  | 'info'
  | 'success'

const MAX_COUNT = 999

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  count?: number
  darkMode?: boolean
}

const badge = tv({
  variants: {
    variant: {
      primary: 'bg-brand-600 text-black',
      danger: 'bg-tart-orange-600 text-white',
      accent: 'bg-crayola-600 text-black',
      secondary: 'bg-neutral-700 text-white',
      critical: 'bg-red-600 text-white',
      info: 'bg-blue-700 text-white',
      success: 'bg-green-700 text-white',
    },
    shape: {
      dot: 'inline-block w-8 h-8 rounded-full',
      count: 'flex items-center justify-center rounded-16 w-40 h-24',
    },
  },
  defaultVariants: {
    variant: 'primary',
    shape: 'count',
  },
})

function formatCount(count: number): string {
  return count > MAX_COUNT ? `${MAX_COUNT}+` : String(count)
}

export function Badge({ variant = 'primary', count, className, ...props }: BadgeProps) {
  const hasCount = count !== undefined

  if (!hasCount) {
    return (
      <span className={badge({ variant, shape: 'dot', class: className })} aria-hidden {...props} />
    )
  }

  return (
    <div className={badge({ variant, shape: 'count', class: className })}>
      <span
        className="block text-xs-medium leading-none whitespace-nowrap"
        aria-label={`${formatCount(count)} notificações`}
        {...props}
      >
        {formatCount(count)}
      </span>
    </div>
  )
}

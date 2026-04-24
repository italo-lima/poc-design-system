import { type HTMLAttributes, type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

import { AlertTriangle, CircleAlert, CircleCheck, Info } from 'lucide-react'
import { type IconName, iconMap } from '../../utils/icons'
import { cn } from '../../utils/cn'
import { Button } from '../button/Button'

export type EmptyStateVariant = 'icon' | 'informative' | 'warning' | 'success' | 'critical'

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: EmptyStateVariant
  icon?: IconName
  title: string
  description?: string
  actionLabel?: string
  actionOnClick?: () => void
}

const emptyStateIcon = tv({
  base: 'flex items-center justify-center w-56 h-56 rounded-12 mb-24 [&>svg]:w-32 [&>svg]:h-32 border border-neutral-500 rounded-16 bg-neutral-800',
  variants: {
    variant: {
      icon: 'text-neutral-400',
      informative: '[&>svg]:fill-blue-500 [&>svg]:text-white',
      warning: '[&>svg]:fill-yellow-500 [&>svg]:text-white',
      critical: '[&>svg]:fill-red-500 [&>svg]:text-white',
      success: '[&>svg]:fill-green-500 [&>svg]:text-white',
    },
  },
  defaultVariants: { variant: 'icon' },
})

const variantIcons: Partial<Record<EmptyStateVariant, ReactNode>> = {
  informative: <Info />,
  warning: <AlertTriangle />,
  critical: <CircleAlert />,
  success: <CircleCheck />,
}

export function EmptyState({
  variant = 'icon',
  icon,
  title,
  description,
  className,
  actionLabel,
  actionOnClick,
  ...props
}: EmptyStateProps) {
  const containerClassName = cn(
    'flex flex-col items-center text-center max-w-320 w-full py-32',
    className,
  )

  const iconWrapperClassName = emptyStateIcon({ variant })

  const renderedIcon = variant === 'icon' && icon ? iconMap[icon] : variantIcons[variant]

  return (
    <div className={containerClassName} {...props}>
      <div className={iconWrapperClassName}>{renderedIcon}</div>

      <div className="flex flex-col gap-8 text-white">
        <p className="text-m-bold ">{title}</p>
        {description && <p className="text-s-regular">{description}</p>}
      </div>

      <div className="mt-24">
        <Button variant="solid" color="primary" onClick={actionOnClick}>
          {actionLabel}
        </Button>
      </div>
    </div>
  )
}

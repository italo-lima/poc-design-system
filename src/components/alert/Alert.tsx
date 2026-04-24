import { type HTMLAttributes, type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

import { AlertCircle, CircleAlert, CircleCheck, Info, X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from '../button/Button'

export type AlertVariant = 'default' | 'danger' | 'info' | 'success'
export type AlertCloseType = 'icon' | 'button'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant
  title: string
  subtitle?: string
  onClose?: () => void
  closeType?: AlertCloseType
  closeLabel?: string
  darkMode?: boolean
}

const alertRoot = tv({
  base: 'flex items-center max-w-480 w-full h-72 p-16 border rounded-8',
  variants: {
    variant: {
      default: 'bg-neutral-700 border-neutral-500',
      danger: 'bg-red-900 border-red-300',
      info: 'bg-blue-800 border-blue-200',
      success: 'bg-green-900 border-green-500',
    },
  },
  defaultVariants: { variant: 'default' },
})

const alertAccent = tv({
  variants: {
    variant: {
      default: 'text-white',
      danger: 'text-red-300',
      info: 'text-blue-200',
      success: 'text-green-500',
    },
  },
  defaultVariants: { variant: 'default' },
})

const defaultIcons: Record<AlertVariant, ReactNode> = {
  info: <Info size={20} />,
  success: <CircleCheck size={20} />,
  default: <AlertCircle size={20} />,
  danger: <CircleAlert size={20} />,
}

export function Alert({
  variant = 'default',
  title,
  subtitle,
  onClose,
  closeType = 'icon',
  closeLabel = 'Fechar',
  className,
  ...props
}: AlertProps) {
  const containerClassName = alertRoot({ variant, class: className })

  const iconClassName = cn('inline-flex shrink-0', alertAccent({ variant }))

  const titleClassName = cn('text-s-bold', alertAccent({ variant }))

  const subtitleClassName = cn('text-s-regular', alertAccent({ variant }))

  const closeButtonClassName = 'hover:bg-transparent! text-white'

  const renderedIcon = defaultIcons[variant]

  return (
    <div className={containerClassName} role="alert" {...props}>
      <span className={iconClassName} aria-hidden>
        {renderedIcon}
      </span>
      <div className="flex-1 flex justify-between items-center">
        <div className="flex flex-col ml-16 max-w-360">
          <p className={titleClassName}>{title}</p>
          {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
        </div>
        {closeType === 'icon' && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'inline-flex shrink-0 mt-2 hover:opacity-70 transition-opacity duration-150',
              alertAccent({ variant }),
            )}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        )}
        {closeType === 'button' && (
          <Button
            className={closeButtonClassName}
            variant="ghost"
            color="neutral"
            onClick={onClose}
          >
            {closeLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

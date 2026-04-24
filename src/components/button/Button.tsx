import { type ButtonHTMLAttributes } from 'react'
import { tv } from 'tailwind-variants'
import { iconMap, type IconName } from '../../utils/icons'

export type ButtonVariant = 'solid' | 'outlined' | 'ghost'
export type ButtonColor = 'primary' | 'neutral' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  fullWidth?: boolean
  leadingIcon?: IconName
  trailingIcon?: IconName
  iconOnly?: boolean
  darkMode?: boolean
  children?: string
}

const button = tv({
  base: [
    'inline-flex items-center justify-center rounded-8',
    'box-border transition-colors duration-150',
    'disabled:cursor-not-allowed',
  ],
  variants: {
    variant: {
      solid: '',
      outlined: '',
      ghost: '',
    },
    color: {
      primary: '',
      neutral: '',
      danger: '',
    },
    size: {
      sm: 'gap-6 text-s-semibold',
      md: 'gap-8 text-m-semibold',
      lg: 'gap-8 text-m-semibold',
    },
    iconOnly: {
      true: '',
      false: '',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  compoundVariants: [
    { size: 'sm', iconOnly: true, class: 'h-32 w-32 p-8' },
    { size: 'md', iconOnly: true, class: 'h-40 w-40 p-12' },
    { size: 'lg', iconOnly: true, class: 'h-48 w-48 p-16' },
    { size: 'sm', iconOnly: false, class: 'h-32 px-16 py-6' },
    { size: 'md', iconOnly: false, class: 'h-40 px-16 py-10' },
    { size: 'lg', iconOnly: false, class: 'h-48 px-16 py-14' },
    {
      variant: 'solid',
      color: 'primary',
      class:
        'bg-brand-500 text-brand-1000 hover:enabled:bg-brand-600 active:enabled:bg-brand-700 disabled:bg-neutral-200 disabled:text-neutral-400',
    },
    {
      variant: 'solid',
      color: 'neutral',
      class:
        'bg-neutral-900 text-white hover:enabled:bg-neutral-800 active:enabled:bg-neutral-700 disabled:bg-neutral-200 disabled:text-neutral-400',
    },
    {
      variant: 'solid',
      color: 'danger',
      class:
        'bg-tart-orange-500 text-white hover:enabled:bg-tart-orange-600 active:enabled:bg-tart-orange-700 disabled:bg-neutral-200 disabled:text-neutral-400',
    },
    {
      variant: 'outlined',
      color: 'primary',
      class:
        'border border-brand-500 text-brand-500 bg-transparent hover:enabled:bg-brand-50 active:enabled:bg-brand-100 disabled:border-neutral-300 disabled:text-neutral-400',
    },
    {
      variant: 'outlined',
      color: 'neutral',
      class:
        'border border-neutral-900 text-neutral-900 bg-transparent hover:enabled:bg-neutral-100 active:enabled:bg-neutral-200 disabled:border-neutral-300 disabled:text-neutral-400',
    },
    {
      variant: 'outlined',
      color: 'danger',
      class:
        'border border-tart-orange-500 text-tart-orange-500 bg-transparent hover:enabled:bg-tart-orange-50 active:enabled:bg-tart-orange-100 disabled:border-neutral-300 disabled:text-neutral-400',
    },
    {
      variant: 'ghost',
      color: 'primary',
      class:
        'text-brand-500 bg-transparent hover:enabled:bg-brand-50 active:enabled:bg-brand-100 disabled:text-neutral-400',
    },
    {
      variant: 'ghost',
      color: 'neutral',
      class:
        'text-neutral-900 bg-transparent hover:enabled:bg-neutral-100 active:enabled:bg-neutral-200 disabled:text-neutral-400',
    },
    {
      variant: 'ghost',
      color: 'danger',
      class:
        'text-tart-orange-500 bg-transparent hover:enabled:bg-tart-orange-50 active:enabled:bg-tart-orange-100 disabled:text-neutral-400',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'lg',
    iconOnly: false,
    fullWidth: false,
  },
})

export function Button({
  variant = 'solid',
  color = 'primary',
  size = 'md',
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const containerClassName = button({
    variant,
    color,
    size,
    iconOnly,
    fullWidth,
    class: className,
  })

  return (
    <button disabled={disabled} className={containerClassName} {...props}>
      {iconOnly ? (
        <>
          {leadingIcon && (
            <span className="inline-flex shrink-0">{iconMap[leadingIcon as IconName]}</span>
          )}
        </>
      ) : (
        <>
          {leadingIcon && (
            <span className="inline-flex shrink-0">{iconMap[leadingIcon as IconName]}</span>
          )}
          {children}
          {trailingIcon && (
            <span className="inline-flex shrink-0">{iconMap[trailingIcon as IconName]}</span>
          )}
        </>
      )}
    </button>
  )
}

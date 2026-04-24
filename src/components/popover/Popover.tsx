import { type HTMLAttributes, type ReactNode, useId } from 'react'
import { tv } from 'tailwind-variants'

export type PopoverPlacement = 'default' | 'left' | 'top' | 'bottom' | 'right'

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
  placement?: PopoverPlacement
  title: string
  children?: ReactNode
  darkMode?: boolean
}

const popoverRoot = tv({
  base: 'relative inline-block',
})

const popoverArrow = tv({
  base: 'pointer-events-none absolute z-10 h-0 w-0 border-solid',
  variants: {
    placement: {
      left: 'left-[-10px] top-1/2 -translate-y-1/2 border-y-8 border-y-transparent border-r-10',
      right: 'right-[-10px] top-1/2 -translate-y-1/2 border-y-8 border-y-transparent border-l-10',
      top: 'top-[-10px] left-1/2 -translate-x-1/2 border-x-8 border-x-transparent border-b-10',
      bottom:
        'bottom-[-10px] left-1/2 -translate-x-1/2 border-x-8 border-x-transparent border-t-10',
    },
    tone: {
      dark: '',
      light: '',
    },
  },
  compoundVariants: [
    { placement: 'left', tone: 'dark', class: 'border-r-neutral-900' },
    { placement: 'left', tone: 'light', class: 'border-r-neutral-100' },
    { placement: 'right', tone: 'dark', class: 'border-l-neutral-900' },
    { placement: 'right', tone: 'light', class: 'border-l-neutral-100' },
    { placement: 'top', tone: 'dark', class: 'border-b-neutral-900' },
    { placement: 'top', tone: 'light', class: 'border-b-neutral-100' },
    { placement: 'bottom', tone: 'dark', class: 'border-t-neutral-900' },
    { placement: 'bottom', tone: 'light', class: 'border-t-neutral-100' },
  ],
})

const popoverPanel = tv({
  base: 'box-border flex h-60 w-200 flex-col justify-center gap-4 rounded-4 px-16 py-8 shadow-(--shadow-popover)',
  variants: {
    tone: {
      dark: 'bg-neutral-900',
      light: 'bg-neutral-100',
    },
  },
  defaultVariants: { tone: 'dark' },
})

const popoverTitle = tv({
  base: 'text-s-bold leading-none',
  variants: {
    tone: {
      dark: 'text-white',
      light: 'text-neutral-900',
    },
  },
  defaultVariants: { tone: 'dark' },
})

const popoverBody = tv({
  base: 'text-s-regular leading-none',
  variants: {
    tone: {
      dark: 'text-neutral-400',
      light: 'text-neutral-600',
    },
  },
  defaultVariants: { tone: 'dark' },
})

export function Popover({
  placement = 'default',
  title,
  children,
  darkMode = true,
  className,
  ...props
}: PopoverProps) {
  const titleId = useId()
  const tone = darkMode ? 'dark' : 'light'

  return (
    <div
      className={popoverRoot({ class: className })}
      role="region"
      aria-labelledby={titleId}
      {...props}
    >
      {placement !== 'default' && (
        <span
          aria-hidden
          className={popoverArrow({
            placement,
            tone,
          })}
        />
      )}
      <div className={popoverPanel({ tone })}>
        <p id={titleId} className={popoverTitle({ tone })}>
          {title}
        </p>
        {children && <p className={popoverBody({ tone })}>{children}</p>}
      </div>
    </div>
  )
}

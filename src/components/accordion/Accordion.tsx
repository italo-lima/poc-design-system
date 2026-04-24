import { type HTMLAttributes, type ReactNode, useEffect, useState } from 'react'
import { tv } from 'tailwind-variants'
import { ChevronDown } from 'lucide-react'

import { cn } from '../../utils/cn'

export type AccordionAlignment = 'left' | 'flush'

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  title: string
  children?: ReactNode
  alignment?: AccordionAlignment
  disabled?: boolean
  defaultOpen?: boolean
  readOnly?: boolean
  darkMode?: boolean
}

const accordionHeaderPadding = tv({
  variants: {
    alignment: {
      left: 'p-16',
      flush: 'py-16 px-0',
    },
  },
  defaultVariants: { alignment: 'left' },
})

const accordionContentPadding = tv({
  variants: {
    alignment: {
      left: 'px-16 pb-16',
      flush: 'py-16 px-0',
    },
  },
  defaultVariants: { alignment: 'left' },
})

export function Accordion({
  title,
  children,
  alignment = 'left',
  disabled = false,
  defaultOpen = false,
  readOnly = false,
  className,
  darkMode = true,
  ...props
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  useEffect(() => {
    setIsOpen(defaultOpen)
  }, [defaultOpen])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const containerClassName = cn(
    'group w-full border-b transition-colors duration-300',
    'group-has-[button:disabled]:border-b-neutral-800',
    {
      'border-b-neutral-700': darkMode && isOpen,
      'border-b-transparent': !isOpen,
    },
    className,
  )

  const buttonClassName = cn(
    'w-full flex items-center justify-between gap-16',
    'text-left text-s-medium',
    'border-b transition-colors duration-300',
    'focus:outline-2 focus:outline-brand-500',
    'disabled:text-neutral-800',
    'aria-readonly:text-neutral-600',
    accordionHeaderPadding({ alignment }),
    {
      'text-white': darkMode,
      'border-b-neutral-700': darkMode && !isOpen,
      'disabled:border-b-neutral-800': darkMode && !isOpen,
      'border-b-transparent': isOpen,
    },
  )

  const iconClassName = cn('inline-flex shrink-0 transition-transform duration-300', {
    'rotate-180': isOpen,
  })

  const contentWrapperClassName = cn(
    'overflow-hidden transition-[max-height,color] duration-300 text-s-regular',
    'group-has-[button:disabled]:text-neutral-800',
    'group-has-[button[aria-readonly=true]]:text-neutral-600',
    {
      'text-white': darkMode,
      'max-h-0': !isOpen,
      'max-h-screen': isOpen,
    },
  )

  return (
    <div className={containerClassName} {...props}>
      <button
        type="button"
        disabled={disabled}
        aria-readonly={readOnly}
        onClick={handleClick}
        aria-expanded={isOpen}
        className={buttonClassName}
      >
        <span className="flex-1 hover:underline">{title}</span>
        <span className={iconClassName} aria-hidden>
          <ChevronDown size={20} />
        </span>
      </button>
      <div className={contentWrapperClassName}>
        <div className={accordionContentPadding({ alignment })}>{children}</div>
      </div>
    </div>
  )
}

import { type HTMLAttributes, type ReactElement } from 'react'

import { cn } from '../../utils/cn'
import { type AccordionProps } from '../accordion/Accordion'

export interface AccordionGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement<AccordionProps> | ReactElement<AccordionProps>[]
  darkMode?: boolean
  hasBackground?: boolean
  hasBorder?: boolean
}

export function AccordionGroup({
  children,
  darkMode = true,
  hasBackground = false,
  hasBorder = false,
  className,
  ...props
}: AccordionGroupProps) {
  const isDarkBg = hasBackground && darkMode
  const isLightBg = hasBackground && !darkMode
  const isDarkBorder = hasBorder && darkMode
  const isLightBorder = hasBorder && !darkMode

  const containerClassName = cn(
    'w-full',
    {
      'bg-neutral-900': isDarkBg,
      'border border-neutral-700 rounded-8': isDarkBorder,
      'bg-neutral-50': isLightBg,
      'border border-neutral-200 rounded-8': isLightBorder,
      '[&>*:last-child]:border-b-transparent': hasBorder,
      '[&>*:last-child_button]:border-b-transparent': hasBorder,
    },
    className,
  )

  return (
    <div className={containerClassName} {...props}>
      {children}
    </div>
  )
}

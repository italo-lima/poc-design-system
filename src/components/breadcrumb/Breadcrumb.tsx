import { type HTMLAttributes } from 'react'

import { cn } from '../../utils/cn'

const MAX_VISIBLE = 4

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  darkMode?: boolean
}

type VisibleItem = BreadcrumbItem | null

function getVisibleItems(items: BreadcrumbItem[]): VisibleItem[] {
  if (items.length <= MAX_VISIBLE) return items
  return [items[0], items[1], null, items[items.length - 2], items[items.length - 1]]
}

export function Breadcrumb({ items, darkMode = true, className, ...props }: BreadcrumbProps) {
  const visible = getVisibleItems(items)
  const lastIndex = visible.length - 1

  const separatorClass = cn(
    'text-m-regular select-none',
    darkMode ? 'text-neutral-600' : 'text-neutral-300',
  )

  const inactiveClass = cn(
    'text-xs-regular transition-colors duration-150',
    darkMode
      ? 'text-neutral-400 hover:text-neutral-100'
      : 'text-neutral-500 hover:text-neutral-800',
  )

  const activeClass = cn('text-xs-bold', darkMode ? 'text-white' : 'text-neutral-900')

  const ellipsisClass = cn(
    'text-m-regular tracking-widest',
    darkMode ? 'text-neutral-600' : 'text-neutral-400',
  )

  return (
    <nav aria-label="breadcrumb" className={cn('flex items-center gap-8', className)} {...props}>
      {visible.map((item, index) => {
        const isLast = index === lastIndex
        const isEllipsis = item === null

        return (
          <span key={index} className="flex items-center gap-8">
            {index > 0 && (
              <span className={separatorClass} aria-hidden>
                /
              </span>
            )}

            {isEllipsis ? (
              <span className={ellipsisClass} aria-label="mais itens">
                ···
              </span>
            ) : isLast ? (
              <span className={activeClass} aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <a href={item.href} className={inactiveClass}>
                {item.label}
              </a>
            ) : (
              <span className={inactiveClass}>{item.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

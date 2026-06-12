import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core'
import { cn } from '../../utils/cn'

const MAX_VISIBLE = 4

export interface BreadcrumbItem {
  label: string
  href?: string
}

/** Payload emitido ao clicar em um item navegável do breadcrumb. */
export interface BreadcrumbNavigateDetail {
  item: BreadcrumbItem
  index: number
}

type VisibleItem = BreadcrumbItem | null

function getVisibleItems(items: BreadcrumbItem[]): VisibleItem[] {
  if (items.length <= MAX_VISIBLE) return items
  return [items[0], items[1], null, items[items.length - 2], items[items.length - 1]]
}

@Component({
  tag: 'ds-breadcrumb',
  styleUrl: '../../styles/tailwind.generated.css',
  shadow: true,
})
export class Breadcrumb {
  /**
   * Lista de itens do breadcrumb. Como é um valor complexo (array de objetos),
   * deve ser atribuído via propriedade (property binding), não via atributo.
   * Quando há mais de 4 itens, os do meio colapsam em "···".
   */
  @Prop() items: BreadcrumbItem[] = []

  /** Flag para dark mode. */
  @Prop() darkMode = true

  /** Classes extras mescladas na raiz `<nav>` do breadcrumb (passthrough). */
  @Prop() customClass?: string

  /** Emitido ao clicar em um item navegável (com href). */
  @Event() dsNavigate!: EventEmitter<BreadcrumbNavigateDetail>

  private handleNavigate(item: BreadcrumbItem, index: number) {
    this.dsNavigate.emit({ item, index })
  }

  render() {
    const { items, darkMode, customClass } = this
    const visible = getVisibleItems(items ?? [])
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
      <Host>
        <nav aria-label="breadcrumb" class={cn('flex items-center gap-8', customClass)}>
          {visible.map((item, index) => {
            const isLast = index === lastIndex
            const isEllipsis = item === null

            return (
              <span key={index} class="flex items-center gap-8">
                {index > 0 && (
                  <span class={separatorClass} aria-hidden="true">
                    /
                  </span>
                )}

                {isEllipsis ? (
                  <span class={ellipsisClass} aria-label="mais itens">
                    ···
                  </span>
                ) : isLast ? (
                  <span class={activeClass} aria-current="page">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    class={inactiveClass}
                    onClick={() => this.handleNavigate(item, index)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <span class={inactiveClass}>{item.label}</span>
                )}
              </span>
            )
          })}
        </nav>
      </Host>
    )
  }
}

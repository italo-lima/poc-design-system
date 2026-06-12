import { Component, Prop, State, Watch, Event, EventEmitter, h, Host } from '@stencil/core'
import { tv } from 'tailwind-variants'

import { cn } from '../../utils/cn'
import { getIcon } from '../../utils/icons'

export type AccordionAlignment = 'left' | 'flush'

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

@Component({
  tag: 'ds-accordion',
  styleUrl: '../../styles/tailwind.generated.css',
  shadow: true,
})
export class Accordion {
  /** Texto exibido no cabeçalho do accordion. */
  @Prop() title!: string

  /** Alinhamento e padding do accordion. */
  @Prop() alignment: AccordionAlignment = 'left'

  /** Desabilita a interação com o accordion. */
  @Prop() disabled = false

  /** Define se o accordion inicia aberto. */
  @Prop() defaultOpen = false

  /** Flag para read only. */
  @Prop() readOnly = false

  /** Flag para dark mode. */
  @Prop() darkMode = true

  /** Classes extras mescladas na raiz do accordion (passthrough). */
  @Prop() customClass?: string

  /** Estado interno de aberto/fechado. */
  @State() isOpen = false

  /** Emitido ao alternar o estado. `detail.open` indica o novo estado. */
  @Event() dsToggle!: EventEmitter<{ open: boolean }>

  componentWillLoad() {
    this.isOpen = this.defaultOpen
  }

  @Watch('defaultOpen')
  syncDefaultOpen(newValue: boolean) {
    this.isOpen = newValue
  }

  private handleClick = () => {
    this.isOpen = !this.isOpen
    this.dsToggle.emit({ open: this.isOpen })
  }

  render() {
    const { title, alignment, disabled, readOnly, darkMode, customClass, isOpen } = this

    const containerClassName = cn(
      'group w-full border-b transition-colors duration-300',
      'group-has-[button:disabled]:border-b-neutral-800',
      {
        'border-b-neutral-700': darkMode && isOpen,
        'border-b-transparent': !isOpen,
      },
      customClass,
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
      <Host>
        <div class={containerClassName}>
          <button
            type="button"
            disabled={disabled}
            aria-readonly={readOnly ? 'true' : 'false'}
            aria-expanded={isOpen ? 'true' : 'false'}
            onClick={this.handleClick}
            class={buttonClassName}
          >
            <span class="flex-1 hover:underline">{title}</span>
            <span class={iconClassName} aria-hidden="true" innerHTML={getIcon('chevron-down')} />
          </button>
          <div class={contentWrapperClassName}>
            <div class={accordionContentPadding({ alignment })}>
              <slot />
            </div>
          </div>
        </div>
      </Host>
    )
  }
}

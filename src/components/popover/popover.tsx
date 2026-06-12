import { Component, Prop, h, Host } from '@stencil/core'
import { tv } from 'tailwind-variants'

export type PopoverPlacement = 'default' | 'left' | 'top' | 'bottom' | 'right'

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

let popoverIdCounter = 0

@Component({
  tag: 'ds-popover',
  styleUrl: '../../styles/tailwind.generated.css',
  shadow: true,
})
export class Popover {
  /** Posição da seta em relação ao painel. `default` não exibe seta. */
  @Prop() placement: PopoverPlacement = 'default'

  /** Título em destaque no topo do popover. */
  @Prop() title!: string

  /** Tema do painel e da seta. `true` → escuro, `false` → claro. */
  @Prop() darkMode = true

  /** Classes extras mescladas na raiz do popover (passthrough). */
  @Prop() customClass?: string

  private titleId!: string

  connectedCallback() {
    if (!this.titleId) {
      this.titleId = `ds-popover-title-${popoverIdCounter++}`
    }
  }

  render() {
    const { placement, title, darkMode, customClass, titleId } = this
    const tone = darkMode ? 'dark' : 'light'

    return (
      <Host>
        <div
          class={popoverRoot({ class: customClass })}
          role="region"
          aria-labelledby={titleId}
        >
          {placement !== 'default' && (
            <span aria-hidden="true" class={popoverArrow({ placement, tone })} />
          )}
          <div class={popoverPanel({ tone })}>
            <p id={titleId} class={popoverTitle({ tone })}>
              {title}
            </p>
            <p class={popoverBody({ tone })}>
              <slot />
            </p>
          </div>
        </div>
      </Host>
    )
  }
}

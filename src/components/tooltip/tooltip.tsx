import { Component, Prop, h, Host } from '@stencil/core'
import { tv } from 'tailwind-variants'

export type TooltipPlacement = 'default' | 'left' | 'top' | 'bottom' | 'right'

let tooltipCounter = 0

const tooltipRoot = tv({
  base: 'relative inline-block',
})

const tooltipArrow = tv({
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

const tooltipPanel = tv({
  base: 'box-border flex max-h-60 max-w-120 flex-col justify-center overflow-hidden rounded-4 px-16 py-8 shadow-(--shadow-popover)',
  variants: {
    tone: {
      dark: 'bg-neutral-900',
      light: 'bg-neutral-100',
    },
  },
  defaultVariants: { tone: 'dark' },
})

const tooltipContent = tv({
  base: 'wrap-break-word text-center text-xs-regular font-normal leading-none',
  variants: {
    tone: {
      dark: 'text-white',
      light: 'text-neutral-900',
    },
  },
  defaultVariants: { tone: 'dark' },
})

@Component({
  tag: 'ds-tooltip',
  styleUrl: '../../styles/tailwind.generated.css',
  shadow: true,
})
export class Tooltip {
  /** Posição da seta. `default` não renderiza seta. */
  @Prop() placement: TooltipPlacement = 'default'

  /** Tema. `true` → painel escuro, `false` → painel claro. */
  @Prop() darkMode = true

  /** Classes extras mescladas na raiz do tooltip (passthrough). */
  @Prop() customClass?: string

  private tooltipId!: string

  connectedCallback() {
    this.tooltipId = `tooltip-${++tooltipCounter}`
  }

  render() {
    const { placement, darkMode, customClass } = this
    const tone = darkMode ? 'dark' : 'light'

    return (
      <Host>
        <div id={this.tooltipId} role="tooltip" class={tooltipRoot({ class: customClass })}>
          {placement !== 'default' && (
            <span aria-hidden="true" class={tooltipArrow({ placement, tone })} />
          )}
          <div class={tooltipPanel({ tone })}>
            <div class={tooltipContent({ tone })}>
              <slot />
            </div>
          </div>
        </div>
      </Host>
    )
  }
}

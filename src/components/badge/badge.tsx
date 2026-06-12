import { Component, Prop, h, Host } from '@stencil/core'
import { tv } from 'tailwind-variants'

export type BadgeVariant =
  | 'primary'
  | 'danger'
  | 'accent'
  | 'secondary'
  | 'critical'
  | 'info'
  | 'success'

const MAX_COUNT = 999

const badge = tv({
  variants: {
    variant: {
      primary: 'bg-brand-600 text-black',
      danger: 'bg-tart-orange-600 text-white',
      accent: 'bg-crayola-600 text-black',
      secondary: 'bg-neutral-700 text-white',
      critical: 'bg-red-600 text-white',
      info: 'bg-blue-700 text-white',
      success: 'bg-green-700 text-white',
    },
    shape: {
      dot: 'inline-block w-8 h-8 rounded-full',
      count: 'flex items-center justify-center rounded-16 w-40 h-24',
    },
  },
  defaultVariants: {
    variant: 'primary',
    shape: 'count',
  },
})

function formatCount(count: number): string {
  return count > MAX_COUNT ? `${MAX_COUNT}+` : String(count)
}

@Component({
  tag: 'ds-badge',
  styleUrl: '../../styles/tailwind.generated.css',
  shadow: true,
})
export class Badge {
  /** Variante de cor do badge. */
  @Prop() variant: BadgeVariant = 'primary'

  /** Número exibido. Valores > 999 viram "999+". Ausente → ponto de 8px. */
  @Prop() count?: number

  /** Classes extras mescladas na raiz do badge (passthrough). */
  @Prop() customClass?: string

  render() {
    const { variant, count, customClass } = this
    const hasCount = count !== undefined

    if (!hasCount) {
      return (
        <Host>
          <span class={badge({ variant, shape: 'dot', class: customClass })} aria-hidden="true" />
        </Host>
      )
    }

    const label = formatCount(count)
    return (
      <Host>
        <div class={badge({ variant, shape: 'count', class: customClass })}>
          <span
            class="block text-xs-medium leading-none whitespace-nowrap"
            aria-label={`${label} notificações`}
          >
            {label}
          </span>
        </div>
      </Host>
    )
  }
}

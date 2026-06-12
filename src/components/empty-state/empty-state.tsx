import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core'
import { tv } from 'tailwind-variants'
import { getIcon, type IconName } from '../../utils/icons'

export type EmptyStateVariant = 'icon' | 'informative' | 'warning' | 'success' | 'critical'

const emptyStateIcon = tv({
  base: 'flex items-center justify-center w-56 h-56 rounded-12 mb-24 [&>svg]:w-32 [&>svg]:h-32 border border-neutral-500 rounded-16 bg-neutral-800',
  variants: {
    variant: {
      icon: 'text-neutral-400',
      informative: '[&>svg]:fill-blue-500 [&>svg]:text-white',
      warning: '[&>svg]:fill-yellow-500 [&>svg]:text-white',
      critical: '[&>svg]:fill-red-500 [&>svg]:text-white',
      success: '[&>svg]:fill-green-500 [&>svg]:text-white',
    },
  },
  defaultVariants: { variant: 'icon' },
})

/** Ícone padrão (kebab-case do getIcon) por variante semântica. */
const variantIcons: Partial<Record<EmptyStateVariant, IconName>> = {
  informative: 'info',
  warning: 'alert-triangle',
  critical: 'circle-alert',
  success: 'circle-check',
}

/** Classes do botão de ação (equivalente a Button variant="solid" color="primary" size="lg"). */
const ACTION_BUTTON_CLASS =
  'inline-flex items-center justify-center rounded-8 box-border transition-colors duration-150 h-48 px-16 py-14 text-m-semibold bg-brand-500 text-brand-1000 hover:bg-brand-600 active:bg-brand-700'

@Component({
  tag: 'ds-empty-state',
  styleUrl: '../../styles/tailwind.generated.css',
  shadow: true,
})
export class EmptyState {
  /** Variante visual do empty state. */
  @Prop() variant: EmptyStateVariant = 'icon'

  /** Ícone exibido quando `variant` é `icon`. */
  @Prop() icon?: IconName

  /** Título principal exibido no empty state. */
  @Prop() title!: string

  /** Texto descritivo exibido abaixo do título. */
  @Prop() description?: string

  /** Label do botão de ação. Quando ausente, o botão não é renderizado. */
  @Prop() actionLabel?: string

  /** Classes extras mescladas na raiz do empty state (passthrough). */
  @Prop() customClass?: string

  /** Emitido quando o botão de ação é clicado. */
  @Event() dsAction!: EventEmitter<void>

  private handleAction = () => {
    this.dsAction.emit()
  }

  render() {
    const { variant, icon, title, description, actionLabel, customClass } = this

    const iconName = variant === 'icon' ? icon : variantIcons[variant]
    const svg = iconName ? getIcon(iconName) : ''

    return (
      <Host>
        <div
          class={`flex flex-col items-center text-center max-w-320 w-full py-32${
            customClass ? ` ${customClass}` : ''
          }`}
        >
          <div class={emptyStateIcon({ variant })}>
            {svg ? <span class="inline-flex shrink-0" innerHTML={svg}></span> : null}
          </div>

          <div class="flex flex-col gap-8 text-white">
            <p class="text-m-bold">{title}</p>
            {description ? <p class="text-s-regular">{description}</p> : null}
          </div>

          {actionLabel ? (
            <div class="mt-24">
              <button type="button" class={ACTION_BUTTON_CLASS} onClick={this.handleAction}>
                {actionLabel}
              </button>
            </div>
          ) : null}
        </div>
      </Host>
    )
  }
}

import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core'
import { tv, cn } from 'tailwind-variants'
import { getIcon, type IconName } from '../../utils/icons'

export type AlertVariant = 'default' | 'danger' | 'info' | 'success'
export type AlertCloseType = 'icon' | 'button'

const alertRoot = tv({
  base: 'flex items-center max-w-480 w-full h-72 p-16 border rounded-8',
  variants: {
    variant: {
      default: 'bg-neutral-700 border-neutral-500',
      danger: 'bg-red-900 border-red-300',
      info: 'bg-blue-800 border-blue-200',
      success: 'bg-green-900 border-green-500',
    },
  },
  defaultVariants: { variant: 'default' },
})

const alertAccent = tv({
  variants: {
    variant: {
      default: 'text-white',
      danger: 'text-red-300',
      info: 'text-blue-200',
      success: 'text-green-500',
    },
  },
  defaultVariants: { variant: 'default' },
})

/** Ícone padrão por variante (mapeado para o iconMap de `utils/icons`). */
const defaultIcons: Record<AlertVariant, IconName> = {
  info: 'info',
  success: 'circle-check',
  default: 'circle-alert',
  danger: 'circle-alert',
}

@Component({
  tag: 'ds-alert',
  styleUrl: '../../styles/tailwind.generated.css',
  shadow: true,
})
export class Alert {
  /** Define a variante de cor do alert. */
  @Prop() variant: AlertVariant = 'default'

  /** Texto principal exibido no alert. */
  @Prop() title!: string

  /** Texto secundário exibido abaixo do título. */
  @Prop() subtitle?: string

  /** Define o tipo do elemento de fechar (ícone X ou botão de texto). */
  @Prop() closeType: AlertCloseType = 'icon'

  /** Rótulo exibido no botão de fechar quando `closeType` é `button`. */
  @Prop() closeLabel = 'Fechar'

  /** Flag para dark mode. */
  @Prop() darkMode = true

  /** Classes extras mescladas na raiz do alert (passthrough). */
  @Prop() customClass?: string

  /** Emitido ao clicar no elemento de fechar (ícone ou botão). */
  @Event() dsClose!: EventEmitter<void>

  private handleClose = () => {
    this.dsClose.emit()
  }

  render() {
    const { variant, title, subtitle, closeType, closeLabel, customClass } = this

    const containerClassName = alertRoot({ variant, class: customClass })
    const iconClassName = cn('inline-flex shrink-0', alertAccent({ variant }))
    const titleClassName = cn('text-s-bold', alertAccent({ variant }))
    const subtitleClassName = cn('text-s-regular', alertAccent({ variant }))
    const closeButtonClassName = 'hover:bg-transparent! text-white'

    return (
      <Host>
        <div class={containerClassName} role="alert">
          <span class={iconClassName} aria-hidden="true" innerHTML={getIcon(defaultIcons[variant])} />
          <div class="flex-1 flex justify-between items-center">
            <div class="flex flex-col ml-16 max-w-360">
              <p class={titleClassName}>{title}</p>
              {subtitle && <p class={subtitleClassName}>{subtitle}</p>}
            </div>
            {closeType === 'icon' && (
              <button
                type="button"
                onClick={this.handleClose}
                class={cn(
                  'inline-flex shrink-0 mt-2 hover:opacity-70 transition-opacity duration-150',
                  alertAccent({ variant }),
                )}
                aria-label="Fechar"
                innerHTML={getIcon('x')}
              />
            )}
            {closeType === 'button' && (
              <button
                type="button"
                onClick={this.handleClose}
                class={cn(
                  'inline-flex items-center justify-center px-12 py-8 rounded-8 transition-colors duration-150 hover:opacity-70',
                  closeButtonClassName,
                )}
              >
                {closeLabel}
              </button>
            )}
          </div>
        </div>
      </Host>
    )
  }
}

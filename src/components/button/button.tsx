import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core'
import { tv } from 'tailwind-variants'
import { getIcon, type IconName } from '../../utils/icons'

export type ButtonVariant = 'solid' | 'outlined' | 'ghost'
export type ButtonColor = 'primary' | 'neutral' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const button = tv({
  base: [
    'inline-flex items-center justify-center rounded-8',
    'box-border transition-colors duration-150',
    'disabled:cursor-not-allowed',
  ],
  variants: {
    variant: {
      solid: '',
      outlined: '',
      ghost: '',
    },
    color: {
      primary: '',
      neutral: '',
      danger: '',
    },
    size: {
      sm: 'gap-6 text-s-semibold',
      md: 'gap-8 text-m-semibold',
      lg: 'gap-8 text-m-semibold',
    },
    iconOnly: {
      true: '',
      false: '',
    },
    fullWidth: {
      true: 'w-full',
      false: 'w-auto',
    },
  },
  compoundVariants: [
    { size: 'sm', iconOnly: true, class: 'h-32 w-32 p-8' },
    { size: 'md', iconOnly: true, class: 'h-40 w-40 p-12' },
    { size: 'lg', iconOnly: true, class: 'h-48 w-48 p-16' },
    { size: 'sm', iconOnly: false, class: 'h-32 px-16 py-6' },
    { size: 'md', iconOnly: false, class: 'h-40 px-16 py-10' },
    { size: 'lg', iconOnly: false, class: 'h-48 px-16 py-14' },
    {
      variant: 'solid',
      color: 'primary',
      class:
        'bg-brand-500 text-brand-1000 hover:enabled:bg-brand-600 active:enabled:bg-brand-700 disabled:bg-neutral-200 disabled:text-neutral-400',
    },
    {
      variant: 'solid',
      color: 'neutral',
      class:
        'bg-neutral-900 text-white hover:enabled:bg-neutral-800 active:enabled:bg-neutral-700 disabled:bg-neutral-200 disabled:text-neutral-400',
    },
    {
      variant: 'solid',
      color: 'danger',
      class:
        'bg-tart-orange-500 text-white hover:enabled:bg-tart-orange-600 active:enabled:bg-tart-orange-700 disabled:bg-neutral-200 disabled:text-neutral-400',
    },
    {
      variant: 'outlined',
      color: 'primary',
      class:
        'border border-brand-500 text-brand-500 bg-transparent hover:enabled:bg-brand-50 active:enabled:bg-brand-100 disabled:border-neutral-300 disabled:text-neutral-400',
    },
    {
      variant: 'outlined',
      color: 'neutral',
      class:
        'border border-neutral-900 text-neutral-900 bg-transparent hover:enabled:bg-neutral-100 active:enabled:bg-neutral-200 disabled:border-neutral-300 disabled:text-neutral-400',
    },
    {
      variant: 'outlined',
      color: 'danger',
      class:
        'border border-tart-orange-500 text-tart-orange-500 bg-transparent hover:enabled:bg-tart-orange-50 active:enabled:bg-tart-orange-100 disabled:border-neutral-300 disabled:text-neutral-400',
    },
    {
      variant: 'ghost',
      color: 'primary',
      class:
        'text-brand-500 bg-transparent hover:enabled:bg-brand-50 active:enabled:bg-brand-100 disabled:text-neutral-400',
    },
    {
      variant: 'ghost',
      color: 'neutral',
      class:
        'text-neutral-900 bg-transparent hover:enabled:bg-neutral-100 active:enabled:bg-neutral-200 disabled:text-neutral-400',
    },
    {
      variant: 'ghost',
      color: 'danger',
      class:
        'text-tart-orange-500 bg-transparent hover:enabled:bg-tart-orange-50 active:enabled:bg-tart-orange-100 disabled:text-neutral-400',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    color: 'primary',
    size: 'lg',
    iconOnly: false,
    fullWidth: false,
  },
})

@Component({
  tag: 'ds-button',
  styleUrl: '../../styles/tailwind.generated.css',
  shadow: true,
})
export class Button {
  /** Estilo visual do botão. */
  @Prop() variant: ButtonVariant = 'solid'

  /** Esquema de cor do botão. */
  @Prop() color: ButtonColor = 'primary'

  /** Tamanho (altura e padding). */
  @Prop() size: ButtonSize = 'md'

  /** Se `true`, o botão ocupa toda a largura disponível (`w-full`). */
  @Prop() fullWidth = false

  /** Ícone à esquerda do label. */
  @Prop() leadingIcon?: IconName

  /** Ícone à direita do label. */
  @Prop() trailingIcon?: IconName

  /** Exibe apenas o ícone (formato quadrado). Oculta o label e o trailing icon. */
  @Prop() iconOnly = false

  /** Desabilita o botão e bloqueia cliques. */
  @Prop() disabled = false

  /** Classes extras mescladas na raiz do botão (passthrough). */
  @Prop() customClass?: string

  /** Emitido ao clicar no botão (não emitido quando desabilitado). */
  @Event() dsClick!: EventEmitter<MouseEvent>

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) return
    this.dsClick.emit(event)
  }

  render() {
    const { variant, color, size, fullWidth, iconOnly, leadingIcon, trailingIcon, disabled, customClass } = this

    const containerClassName = button({
      variant,
      color,
      size,
      iconOnly,
      fullWidth,
      class: customClass,
    })

    return (
      <Host>
        <button
          type="button"
          disabled={disabled}
          class={containerClassName}
          onClick={this.handleClick}
        >
          {iconOnly ? (
            leadingIcon && (
              <span class="inline-flex shrink-0" innerHTML={getIcon(leadingIcon)}></span>
            )
          ) : (
            [
              leadingIcon && (
                <span class="inline-flex shrink-0" innerHTML={getIcon(leadingIcon)}></span>
              ),
              <slot></slot>,
              trailingIcon && (
                <span class="inline-flex shrink-0" innerHTML={getIcon(trailingIcon)}></span>
              ),
            ]
          )}
        </button>
      </Host>
    )
  }
}

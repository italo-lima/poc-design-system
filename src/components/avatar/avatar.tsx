import { Component, Prop, h, Host } from '@stencil/core'
import { tv } from 'tailwind-variants'
import { getIcon, type IconName } from '../../utils/icons'

export type AvatarType = 'image' | 'icon' | 'initials'
export type AvatarIconName = IconName

const DEFAULT_IMAGE_SRC = '/avatar.png'

const avatar = tv({
  base: 'flex items-center justify-center overflow-hidden w-40 h-40 border-1 border-neutral-700',
  variants: {
    darkMode: {
      true: 'text-white bg-neutral-800',
      false: 'text-neutral-800 bg-neutral-200',
    },
    rounded: {
      true: 'rounded-full',
      false: 'rounded-8',
    },
  },
  defaultVariants: {
    darkMode: true,
    rounded: true,
  },
})

@Component({
  tag: 'ds-avatar',
  styleUrl: '../../styles/tailwind.generated.css',
  shadow: true,
})
export class Avatar {
  /** Tipo de exibição do avatar: imagem, ícone ou iniciais. */
  @Prop() type: AvatarType = 'icon'

  /** Nome do ícone em kebab-case. Usado quando `type` é "icon". */
  @Prop() icon: AvatarIconName = 'user'

  /** Texto alternativo para acessibilidade. */
  @Prop() alt = ''

  /** URL da imagem. Usado quando `type` é "image". */
  @Prop() src?: string

  /** Texto de iniciais (máx. 2 caracteres). Usado quando `type` é "initials". */
  @Prop() initials?: string

  /** Formato circular (true) ou quadrado arredondado (false). */
  @Prop() rounded = true

  /** Flag de dark mode. */
  @Prop() darkMode = true

  /** Classes extras mescladas na raiz do avatar (passthrough). */
  @Prop() customClass?: string

  private get containerClass(): string {
    const { darkMode, rounded, customClass } = this
    return avatar({ darkMode, rounded, class: customClass })
  }

  render() {
    const { type, icon, alt, src, initials } = this
    const sanitizedInitials = initials?.slice(0, 2).toUpperCase()

    if (type === 'image') {
      return (
        <Host>
          <div class={this.containerClass}>
            <img
              src={src || DEFAULT_IMAGE_SRC}
              alt={alt ?? 'Avatar'}
              class="w-full h-full object-cover"
            />
          </div>
        </Host>
      )
    }

    if (type === 'initials') {
      return (
        <Host>
          <div class={this.containerClass} aria-label={alt || sanitizedInitials || 'User'}>
            <span class="text-s-medium select-none">{sanitizedInitials || 'U'}</span>
          </div>
        </Host>
      )
    }

    return (
      <Host>
        <div class={this.containerClass} aria-label={alt || 'Avatar'}>
          <span class="inline-flex shrink-0" innerHTML={getIcon(icon)}></span>
        </div>
      </Host>
    )
  }
}

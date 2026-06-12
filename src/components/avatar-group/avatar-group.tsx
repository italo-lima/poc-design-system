import { Component, Prop, State, Element, Watch, h, Host } from '@stencil/core'
import { cn } from '../../utils/cn'

const MAX_VISIBLE = 5

@Component({
  tag: 'ds-avatar-group',
  styleUrl: '../../styles/tailwind.generated.css',
  shadow: true,
})
export class AvatarGroup {
  /** Referência ao elemento host, usada para ler os avatares projetados no slot. */
  @Element() hostElement!: HTMLElement

  /** Número máximo de avatares visíveis antes de exibir o indicador de excedente (+N). */
  @Prop() max = MAX_VISIBLE

  /** Flag para dark mode. */
  @Prop() darkMode = true

  /** Classes extras mescladas na raiz do grupo (passthrough). */
  @Prop() customClass?: string

  /** Quantidade total de avatares projetados no slot. */
  @State() total = 0

  componentDidLoad() {
    this.applyLayout()
  }

  @Watch('max')
  @Watch('darkMode')
  handlePropChange() {
    this.applyLayout()
  }

  private get slotEl(): HTMLSlotElement | null {
    return this.hostElement.shadowRoot?.querySelector('slot') ?? null
  }

  /**
   * Lê os avatares projetados. Usa `assignedElements()` quando disponível e cai
   * para `querySelectorAll` no light DOM caso o ambiente não suporte slots reais
   * (ex.: mock-doc em testes).
   */
  private getAvatars(): HTMLElement[] {
    const slot = this.slotEl
    if (slot && typeof slot.assignedElements === 'function') {
      const assigned = slot.assignedElements({ flatten: true }) as HTMLElement[]
      if (assigned.length > 0) return assigned.filter((el) => el.tagName === 'DS-AVATAR')
    }
    return Array.from(this.hostElement.querySelectorAll('ds-avatar')) as HTMLElement[]
  }

  private handleSlotChange = () => {
    this.applyLayout()
  }

  /**
   * Aplica, diretamente nos avatares do light DOM, a sobreposição (margem negativa,
   * z-index, contorno e formato), espelhando o `cloneElement` do componente React.
   * Esconde os que excedem `max` e atualiza a contagem total para renderizar o "+N".
   */
  private applyLayout() {
    const avatars = this.getAvatars()
    const { max, darkMode } = this

    const outlineClass = darkMode ? 'outline-neutral-900' : 'outline-white'
    const wrapperClass = cn('inline-flex shrink-0 rounded-full outline-2', outlineClass)

    avatars.forEach((avatar, index) => {
      const visible = index < max

      // Propaga as props do grupo para cada avatar (equivalente ao cloneElement).
      avatar.setAttribute('rounded', 'true')
      avatar.setAttribute('dark-mode', String(darkMode))

      // Estilo de sobreposição aplicado no próprio avatar (não há como envolvê-lo
      // num wrapper de shadow DOM).
      avatar.className = cn(wrapperClass, index > 0 && '-ml-8') ?? ''
      avatar.style.zIndex = String(index + 1)
      avatar.style.display = visible ? '' : 'none'
      avatar.hidden = !visible
    })

    this.total = avatars.length
  }

  render() {
    const { max, darkMode, customClass, total } = this
    const remainder = total - max

    const outlineClass = darkMode ? 'outline-neutral-900' : 'outline-white'

    const overflowClass = cn(
      'inline-flex shrink-0 items-center justify-center',
      'w-40 h-40 rounded-full outline-2 -ml-8',
      'text-s-medium select-none',
      outlineClass,
      {
        'bg-neutral-800 border-1 border-neutral-700 text-white': darkMode,
        'bg-neutral-200 border-1 border-neutral-300 text-neutral-800': !darkMode,
      },
    )

    return (
      <Host>
        <div class={cn('flex items-center', customClass)} role="group">
          <slot onSlotchange={this.handleSlotChange} />
          {remainder > 0 && (
            <div class={overflowClass} style={{ zIndex: String(total + 1) }}>
              +{remainder}
            </div>
          )}
        </div>
      </Host>
    )
  }
}

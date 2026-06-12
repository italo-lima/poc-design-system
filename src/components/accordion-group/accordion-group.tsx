import { Component, Prop, h, Host } from '@stencil/core'

import { cn } from '../../utils/cn'

@Component({
  tag: 'ds-accordion-group',
  styleUrls: ['../../styles/tailwind.generated.css', 'accordion-group.css'],
  shadow: true,
})
export class AccordionGroup {
  /** Flag para dark mode. */
  @Prop() darkMode = true

  /** Aplica cor de fundo ao container do grupo. */
  @Prop() hasBackground = false

  /**
   * Aplica borda e border-radius ao container do grupo.
   * Reflete para o atributo `has-border` para alimentar o seletor CSS
   * `:host([has-border]) ::slotted(ds-accordion:last-child)`.
   */
  @Prop({ reflect: true }) hasBorder = false

  /** Classes extras mescladas na raiz do grupo (passthrough). */
  @Prop() customClass?: string

  render() {
    const { darkMode, hasBackground, hasBorder, customClass } = this

    const isDarkBg = hasBackground && darkMode
    const isLightBg = hasBackground && !darkMode
    const isDarkBorder = hasBorder && darkMode
    const isLightBorder = hasBorder && !darkMode

    // NOTA shadow DOM: no React original havia também
    //   '[&>*:last-child]:border-b-transparent'
    //   '[&>*:last-child_button]:border-b-transparent'
    // Esses seletores arbitrários do Tailwind dependem dos filhos estarem no
    // MESMO DOM. Aqui os ds-accordion são "slotted" (vivem no light DOM), então
    // `[&>*]` não os atinge a partir do shadow DOM. A borda do último filho é
    // resolvida em accordion-group.css via ::slotted(ds-accordion:last-child).
    // A parte `_button` (border-b do <button> interno do ds-accordion) NÃO é
    // alcançável: ::slotted só atinge o elemento slotted top-level, não os nós
    // dentro do shadow root dele. Ver comentário em accordion-group.css.
    const containerClassName = cn(
      'w-full',
      {
        'bg-neutral-900': isDarkBg,
        'border border-neutral-700 rounded-8': isDarkBorder,
        'bg-neutral-50': isLightBg,
        'border border-neutral-200 rounded-8': isLightBorder,
      },
      customClass,
    )

    return (
      <Host>
        <div class={containerClassName}>
          <slot />
        </div>
      </Host>
    )
  }
}

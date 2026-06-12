import { render, h, describe, it, expect } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../avatar-group'
import '../../avatar/avatar'

/** Texto do indicador de excedente renderizado no shadow DOM (ex.: "+3"). */
function overflowText(root: HTMLElement): string | null {
  const badge = root.shadowRoot.querySelector('[role="group"] > div')
  return badge ? badge.textContent : null
}

/** Avatares visíveis = os que não estão escondidos pelo layout. */
function visibleAvatars(root: HTMLElement): Element[] {
  return Array.from(root.querySelectorAll('ds-avatar')).filter(
    (el) => !(el as HTMLElement).hidden && (el as HTMLElement).style.display !== 'none',
  )
}

describe('ds-avatar-group', () => {
  it('exposes a single group for assistive tech', async () => {
    const { root } = await render(
      <ds-avatar-group>
        <ds-avatar />
      </ds-avatar-group>,
    )
    expect(root.shadowRoot.querySelector('[role="group"]')).not.toBeNull()
  })

  it('renders a slot to project the avatars', async () => {
    const { root } = await render(
      <ds-avatar-group>
        <ds-avatar />
      </ds-avatar-group>,
    )
    expect(root.shadowRoot.querySelector('slot')).not.toBeNull()
  })

  it('keeps all avatars visible when within max', async () => {
    const { root } = await render(
      <ds-avatar-group max={5}>
        <ds-avatar />
        <ds-avatar />
      </ds-avatar-group>,
    )
    expect(root.querySelectorAll('ds-avatar').length).toBe(2)
    expect(visibleAvatars(root).length).toBe(2)
  })

  it('hides the overflow count when within max', async () => {
    const { root } = await render(
      <ds-avatar-group max={5}>
        <ds-avatar />
        <ds-avatar />
      </ds-avatar-group>,
    )
    expect(overflowText(root)).toBeNull()
  })

  it('shows an overflow count when there are more avatars than max', async () => {
    const { root } = await render(
      <ds-avatar-group max={3}>
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
      </ds-avatar-group>,
    )
    expect(overflowText(root)).toBe('+3')
  })

  it('limits the number of visible avatars to max', async () => {
    const { root } = await render(
      <ds-avatar-group max={3}>
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
      </ds-avatar-group>,
    )
    expect(visibleAvatars(root).length).toBe(3)
  })

  it('shows the overflow badge in light mode', async () => {
    const { root } = await render(
      <ds-avatar-group max={1} darkMode={false}>
        <ds-avatar />
        <ds-avatar />
      </ds-avatar-group>,
    )
    expect(overflowText(root)).toBe('+1')
    const badge = root.shadowRoot.querySelector('[role="group"] > div')
    expect(badge.className).toContain('bg-neutral-200')
  })

  it('uses the dark overflow badge by default', async () => {
    const { root } = await render(
      <ds-avatar-group max={1}>
        <ds-avatar />
        <ds-avatar />
      </ds-avatar-group>,
    )
    const badge = root.shadowRoot.querySelector('[role="group"] > div')
    expect(badge.className).toContain('bg-neutral-800')
  })

  it('defaults max to 5', async () => {
    const { root } = await render(
      <ds-avatar-group>
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
        <ds-avatar />
      </ds-avatar-group>,
    )
    expect(overflowText(root)).toBeNull()
    expect(visibleAvatars(root).length).toBe(5)
  })

  it('propagates rounded and darkMode onto each avatar', async () => {
    const { root } = await render(
      <ds-avatar-group darkMode={false}>
        <ds-avatar />
      </ds-avatar-group>,
    )
    const avatar = root.querySelector('ds-avatar')
    expect(avatar.getAttribute('rounded')).toBe('true')
    expect(avatar.getAttribute('dark-mode')).toBe('false')
  })

  it('merges customClass on the root group', async () => {
    const { root } = await render(
      <ds-avatar-group custom-class="ag-x">
        <ds-avatar />
      </ds-avatar-group>,
    )
    const group = root.shadowRoot.querySelector('[role="group"]')
    expect(group.className).toContain('ag-x')
  })
})

import { render, h, describe, it, expect, vi } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../tag'

const solidChecks = [
  ['primary', 'bg-brand-600'],
  ['danger', 'bg-tart-orange-600'],
  ['accent', 'bg-crayola-600'],
  ['secondary', 'bg-neutral-700'],
  ['critical', 'bg-red-600'],
  ['info', 'bg-blue-700'],
  ['success', 'bg-green-700'],
] as const

const outlineChecks = [
  ['primary', 'border-brand-500'],
  ['danger', 'border-tart-orange-500'],
  ['accent', 'border-crayola-500'],
  ['secondary', 'border-neutral-500'],
  ['critical', 'border-red-500'],
  ['info', 'border-blue-500'],
  ['success', 'border-green-500'],
] as const

describe('ds-tag', () => {
  it.each(solidChecks)('is solid %s with the expected background', async (variant, cls) => {
    const { root } = await render(<ds-tag text="L" variant={variant} surface="solid" />)
    const wrapper = root.shadowRoot.querySelector('div')
    expect(wrapper.className).toContain(cls)
  })

  it.each(outlineChecks)('is outline %s with the expected border', async (variant, cls) => {
    const { root } = await render(<ds-tag text="L" variant={variant} surface="outline" />)
    const wrapper = root.shadowRoot.querySelector('div')
    expect(wrapper.className).toContain(cls)
  })

  it('uses primary solid variant by default', async () => {
    const { root } = await render(<ds-tag text="D" />)
    const wrapper = root.shadowRoot.querySelector('div')
    expect(wrapper.className).toContain('bg-brand-600')
  })

  it('is small when size is small', async () => {
    const { root } = await render(<ds-tag text="S" size="small" />)
    const wrapper = root.shadowRoot.querySelector('div')
    expect(wrapper.className).toContain('h-32')
  })

  it('is pill-shaped when format is pill', async () => {
    const { root } = await render(<ds-tag text="P" format="pill" />)
    const wrapper = root.shadowRoot.querySelector('div')
    expect(wrapper.className).toContain('rounded-3xl')
  })

  it('renders the text', async () => {
    const { root } = await render(<ds-tag text="Hello" />)
    expect(root.shadowRoot.textContent).toContain('Hello')
  })

  it('omits the leading slot when leadingIcon is not provided', async () => {
    const { root } = await render(<ds-tag text="No lead" />)
    expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(0)
  })

  it('shows a leading icon when provided', async () => {
    const { root } = await render(<ds-tag text="With" leading-icon="check" />)
    expect(root.shadowRoot.querySelectorAll('svg').length).toBeGreaterThan(0)
  })

  it('uses a button for the trailing control when interactiveTrailing is set', async () => {
    const { root } = await render(
      <ds-tag text="Close me" trailing-icon="x" interactive-trailing />,
    )
    const button = root.shadowRoot.querySelector('button[aria-label="Fechar"]')
    expect(button).not.toBeNull()
  })

  it('emits dsTrailingClick when the trailing button is clicked', async () => {
    const { root } = await render(
      <ds-tag text="Close me" trailing-icon="x" interactive-trailing />,
    )
    const spy = vi.fn()
    root.addEventListener('dsTrailingClick', spy)
    const button = root.shadowRoot.querySelector('button[aria-label="Fechar"]') as HTMLButtonElement
    button.click()
    expect(spy).toHaveBeenCalled()
  })

  it('uses a non-button trailing control when interactiveTrailing is not set', async () => {
    const { root } = await render(<ds-tag text="Trail" trailing-icon="search" />)
    expect(root.shadowRoot.querySelector('button')).toBeNull()
    expect(root.shadowRoot.querySelectorAll('svg').length).toBeGreaterThan(0)
  })

  it('merges customClass on the root wrapper', async () => {
    const { root } = await render(<ds-tag text="C" custom-class="tag-x" />)
    const wrapper = root.shadowRoot.querySelector('div')
    expect(wrapper.className).toContain('tag-x')
  })
})

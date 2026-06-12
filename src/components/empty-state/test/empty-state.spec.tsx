import { render, h, describe, it, expect, vi } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../empty-state'

const semanticVariants = ['informative', 'warning', 'critical', 'success'] as const

describe('ds-empty-state', () => {
  it.each(semanticVariants)(
    'renders variant %s with its default illustration',
    async (variant) => {
      const { root } = await render(<ds-empty-state variant={variant} title={`Title ${variant}`} />)
      const title = root.shadowRoot.querySelector('p.text-m-bold')
      expect(title.textContent).toBe(`Title ${variant}`)
      expect(root.shadowRoot.querySelector('svg')).not.toBeNull()
    },
  )

  it('shows the mapped icon when variant is icon and icon is set', async () => {
    const { root } = await render(<ds-empty-state variant="icon" icon="search" title="No results" />)
    expect(root.shadowRoot.querySelector('svg')).not.toBeNull()
  })

  it('omits an illustration when variant is icon and icon is not set', async () => {
    const { root } = await render(<ds-empty-state variant="icon" title="Bare icon variant" />)
    expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(0)
  })

  it('uses the icon variant by default', async () => {
    const { root } = await render(<ds-empty-state title="T" />)
    // Sem icon definido na variante padrão (icon), nenhuma ilustração é exibida.
    expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(0)
  })

  it('shows the description when provided', async () => {
    const { root } = await render(<ds-empty-state title="T" description="Details here" />)
    const desc = root.shadowRoot.querySelector('p.text-s-regular')
    expect(desc).not.toBeNull()
    expect(desc.textContent).toBe('Details here')
  })

  it('omits the description when not provided', async () => {
    const { root } = await render(<ds-empty-state title="Only title" />)
    expect(root.shadowRoot.querySelector('p.text-s-regular')).toBeNull()
  })

  it('renders the action button only when actionLabel is provided', async () => {
    const without = await render(<ds-empty-state title="T" />)
    expect(without.root.shadowRoot.querySelector('button')).toBeNull()

    const withLabel = await render(<ds-empty-state title="T" actionLabel="Retry" />)
    const button = withLabel.root.shadowRoot.querySelector('button')
    expect(button).not.toBeNull()
    expect(button.textContent).toBe('Retry')
  })

  it('emits dsAction from the primary action', async () => {
    const { root } = await render(<ds-empty-state title="T" actionLabel="Retry" />)
    const handler = vi.fn()
    root.addEventListener('dsAction', handler)
    const button = root.shadowRoot.querySelector('button')
    button.click()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('renders the title', async () => {
    const { root } = await render(<ds-empty-state title="Hello world" />)
    const title = root.shadowRoot.querySelector('p.text-m-bold')
    expect(title.textContent).toBe('Hello world')
  })

  it('merges customClass on the root container', async () => {
    const { root } = await render(<ds-empty-state title="T" custom-class="es-x" />)
    const container = root.shadowRoot.querySelector('div')
    expect(container.className).toContain('es-x')
    expect(container.className).toContain('flex')
  })
})

import { render, h, describe, it, expect } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../popover'

const placements = ['default', 'left', 'top', 'bottom', 'right'] as const

describe('ds-popover', () => {
  it.each(placements)('renders the title for placement %s', async (placement) => {
    const { root } = await render(<ds-popover placement={placement} title={`T-${placement}`} />)
    const region = root.shadowRoot.querySelector('[role="region"]')
    expect(region).not.toBeNull()
    const title = root.shadowRoot.querySelector('p[id]')
    expect(title.textContent).toBe(`T-${placement}`)
  })

  it('does not render an arrow for the default placement', async () => {
    const { root } = await render(<ds-popover title="Solo" />)
    expect(root.shadowRoot.querySelector('span[aria-hidden="true"]')).toBeNull()
  })

  it.each(['left', 'top', 'bottom', 'right'] as const)(
    'renders an arrow for placement %s',
    async (placement) => {
      const { root } = await render(<ds-popover placement={placement} title="Arrow" />)
      const arrow = root.shadowRoot.querySelector('span[aria-hidden="true"]')
      expect(arrow).not.toBeNull()
      expect(arrow.className).toContain('absolute')
    },
  )

  it('applies the directional border for each arrow placement', async () => {
    const cases = [
      { placement: 'left', cls: 'border-r-neutral-900' },
      { placement: 'right', cls: 'border-l-neutral-900' },
      { placement: 'top', cls: 'border-b-neutral-900' },
      { placement: 'bottom', cls: 'border-t-neutral-900' },
    ] as const
    for (const { placement, cls } of cases) {
      const { root } = await render(<ds-popover placement={placement} title="A" />)
      const arrow = root.shadowRoot.querySelector('span[aria-hidden="true"]')
      expect(arrow.className).toContain(cls)
    }
  })

  it('uses the dark tone panel by default', async () => {
    const { root } = await render(<ds-popover title="Dark" />)
    const panel = root.shadowRoot.querySelector('p[id]').parentElement
    expect(panel.className).toContain('bg-neutral-900')
  })

  it('uses the light tone panel when darkMode is false', async () => {
    const { root } = await render(<ds-popover title="Light" darkMode={false} />)
    const panel = root.shadowRoot.querySelector('p[id]').parentElement
    expect(panel.className).toContain('bg-neutral-100')
  })

  it('applies the light tone arrow color when darkMode is false', async () => {
    const { root } = await render(<ds-popover placement="top" title="Light" darkMode={false} />)
    const arrow = root.shadowRoot.querySelector('span[aria-hidden="true"]')
    expect(arrow.className).toContain('border-b-neutral-100')
  })

  it('links aria-labelledby on the region to the id of the title', async () => {
    const { root } = await render(<ds-popover title="Linked" />)
    const region = root.shadowRoot.querySelector('[role="region"]')
    const title = root.shadowRoot.querySelector('p[id]')
    const labelledBy = region.getAttribute('aria-labelledby')
    expect(labelledBy).toBeTruthy()
    expect(labelledBy).toBe(title.getAttribute('id'))
  })

  it('renders body content through the slot', async () => {
    const { root } = await render(<ds-popover title="Info">Help text</ds-popover>)
    expect(root.textContent).toContain('Help text')
  })

  it('merges customClass on the root region', async () => {
    const { root } = await render(<ds-popover title="T" custom-class="pop-x" />)
    const region = root.shadowRoot.querySelector('[role="region"]')
    expect(region.className).toContain('pop-x')
  })
})

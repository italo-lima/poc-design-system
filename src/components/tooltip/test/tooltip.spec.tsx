import { render, h, describe, it, expect } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../tooltip'

const placements = ['default', 'left', 'top', 'bottom', 'right'] as const
const arrowPlacements = ['left', 'top', 'bottom', 'right'] as const

describe('ds-tooltip', () => {
  it.each(placements)('renders the tooltip role and slotted content for placement %s', async (placement) => {
    const { root } = await render(<ds-tooltip placement={placement}>Tip {placement}</ds-tooltip>)
    const tooltip = root.shadowRoot.querySelector('[role="tooltip"]')
    expect(tooltip).not.toBeNull()
    expect(root.shadowRoot.querySelector('slot')).not.toBeNull()
    expect(root.textContent).toContain(`Tip ${placement}`)
  })

  it('does not render an arrow for the default placement', async () => {
    const { root } = await render(<ds-tooltip placement="default">X</ds-tooltip>)
    expect(root.shadowRoot.querySelector('span[aria-hidden="true"]')).toBeNull()
  })

  it.each(arrowPlacements)('renders an arrow for placement %s', async (placement) => {
    const { root } = await render(<ds-tooltip placement={placement}>X</ds-tooltip>)
    const arrow = root.shadowRoot.querySelector('span[aria-hidden="true"]')
    expect(arrow).not.toBeNull()
  })

  it('uses a dark panel by default', async () => {
    const { root } = await render(<ds-tooltip>Dark</ds-tooltip>)
    const panel = root.shadowRoot.querySelector('[role="tooltip"]').firstElementChild
    expect(panel.className).toContain('bg-neutral-900')
  })

  it('uses a dark content tone by default', async () => {
    const { root } = await render(<ds-tooltip>Dark</ds-tooltip>)
    const content = root.shadowRoot.querySelector('[role="tooltip"] > div > div')
    expect(content.className).toContain('text-white')
  })

  it('uses a light panel background when darkMode is false', async () => {
    const { root } = await render(<ds-tooltip darkMode={false}>Light</ds-tooltip>)
    const panel = root.shadowRoot.querySelector('[role="tooltip"]').firstElementChild
    expect(panel.className).toContain('bg-neutral-100')
  })

  it('uses a light content tone when darkMode is false', async () => {
    const { root } = await render(<ds-tooltip darkMode={false}>Light</ds-tooltip>)
    const content = root.shadowRoot.querySelector('[role="tooltip"] > div > div')
    expect(content.className).toContain('text-neutral-900')
  })

  it('applies the dark arrow tone for an arrow placement', async () => {
    const { root } = await render(<ds-tooltip placement="top">X</ds-tooltip>)
    const arrow = root.shadowRoot.querySelector('span[aria-hidden="true"]')
    expect(arrow.className).toContain('border-b-neutral-900')
  })

  it('applies the light arrow tone when darkMode is false', async () => {
    const { root } = await render(
      <ds-tooltip placement="top" darkMode={false}>
        X
      </ds-tooltip>,
    )
    const arrow = root.shadowRoot.querySelector('span[aria-hidden="true"]')
    expect(arrow.className).toContain('border-b-neutral-100')
  })

  it('generates an id on the tooltip root', async () => {
    const { root } = await render(<ds-tooltip>X</ds-tooltip>)
    const tooltip = root.shadowRoot.querySelector('[role="tooltip"]')
    expect(tooltip.getAttribute('id')).toMatch(/^tooltip-\d+$/)
  })

  it('merges customClass on the root', async () => {
    const { root } = await render(<ds-tooltip custom-class="tt-x">X</ds-tooltip>)
    const tooltip = root.shadowRoot.querySelector('[role="tooltip"]')
    expect(tooltip.className).toContain('tt-x')
  })
})

import { render, h, describe, it, expect } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../badge'

const variants = [
  'primary',
  'danger',
  'accent',
  'secondary',
  'critical',
  'info',
  'success',
] as const

describe('ds-badge', () => {
  it.each(variants)('renders a dot for variant %s when count is omitted', async (variant) => {
    const { root } = await render(<ds-badge variant={variant} />)
    const dot = root.shadowRoot.querySelector('span[aria-hidden="true"]')
    expect(dot).not.toBeNull()
    expect(dot.className).toContain('rounded-full')
    expect(dot.className).toContain('w-8')
    expect(dot.className).toContain('h-8')
  })

  it.each(variants)('renders the count for variant %s', async (variant) => {
    const { root } = await render(<ds-badge variant={variant} count={3} />)
    const label = root.shadowRoot.querySelector('[aria-label$="notificações"]')
    expect(label.textContent).toBe('3')
  })

  it('uses primary variant by default', async () => {
    const { root } = await render(<ds-badge count={1} />)
    const wrapper = root.shadowRoot.querySelector('div')
    expect(wrapper.className).toContain('bg-brand-600')
  })

  it('renders correctly when count is 0', async () => {
    const { root } = await render(<ds-badge count={0} />)
    expect(root.shadowRoot.querySelector('[aria-label="0 notificações"]')).not.toBeNull()
  })

  it('formats count in aria-label and text', async () => {
    const { root } = await render(<ds-badge count={1000} />)
    const el = root.shadowRoot.querySelector('[aria-label="999+ notificações"]')
    expect(el).not.toBeNull()
    expect(el.textContent).toBe('999+')
  })

  it('applies count shape styles when count is present', async () => {
    const { root } = await render(<ds-badge count={1} />)
    const wrapper = root.shadowRoot.querySelector('div')
    expect(wrapper.className).toContain('w-40')
    expect(wrapper.className).toContain('h-24')
  })

  it('formats the count at the cap without a plus suffix', async () => {
    const { root } = await render(<ds-badge count={999} />)
    expect(root.shadowRoot.querySelector('[aria-label="999 notificações"]')).not.toBeNull()
  })

  it('merges customClass on the dot', async () => {
    const { root } = await render(<ds-badge custom-class="bdg" />)
    const dot = root.shadowRoot.querySelector('span[aria-hidden="true"]')
    expect(dot.className).toContain('bdg')
  })

  it('merges customClass on the count wrapper', async () => {
    const { root } = await render(<ds-badge count={1} custom-class="wrap" />)
    const wrapper = root.shadowRoot.querySelector('div')
    expect(wrapper.className).toContain('wrap')
  })
})

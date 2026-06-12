import { render, h, describe, it, expect, vi } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../alert'

const variants = ['default', 'danger', 'info', 'success'] as const

describe('ds-alert', () => {
  it.each(variants)('shows an alert for variant %s', async (variant) => {
    const { root } = await render(<ds-alert variant={variant} title={`T-${variant}`} />)
    const alert = root.shadowRoot.querySelector('[role="alert"]')
    expect(alert).not.toBeNull()
    expect(alert.textContent).toContain(`T-${variant}`)
  })

  it('shows the subtitle when it is provided', async () => {
    const { root } = await render(<ds-alert title="T" subtitle="Sub" />)
    expect(root.shadowRoot.textContent).toContain('Sub')
  })

  it('omits the subtitle when it is not provided', async () => {
    const { root } = await render(<ds-alert title="Only" />)
    expect(root.shadowRoot.textContent).not.toContain('Sub')
  })

  it('uses the default variant by default', async () => {
    const { root } = await render(<ds-alert title="T" />)
    const alert = root.shadowRoot.querySelector('[role="alert"]')
    expect(alert.className).toContain('bg-neutral-700')
  })

  it('emits dsClose when the icon close control is used', async () => {
    const { root } = await render(<ds-alert title="X" closeType="icon" />)
    const spy = vi.fn()
    root.addEventListener('dsClose', spy)
    const button = root.shadowRoot.querySelector('button[aria-label="Fechar"]') as HTMLButtonElement
    expect(button).not.toBeNull()
    button.click()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('emits dsClose when the button close control is used', async () => {
    const { root } = await render(
      <ds-alert title="T" closeType="button" closeLabel="Dismiss" />,
    )
    const spy = vi.fn()
    root.addEventListener('dsClose', spy)
    const buttons = Array.from(root.shadowRoot.querySelectorAll('button')) as HTMLButtonElement[]
    const dismiss = buttons.find((b) => b.textContent?.trim() === 'Dismiss')
    expect(dismiss).not.toBeUndefined()
    dismiss!.click()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('uses the correct surface per variant', async () => {
    const danger = await render(<ds-alert variant="danger" title="D" />)
    expect(danger.root.shadowRoot.querySelector('[role="alert"]').className).toContain('bg-red-900')

    const info = await render(<ds-alert variant="info" title="I" />)
    expect(info.root.shadowRoot.querySelector('[role="alert"]').className).toContain('bg-blue-800')

    const success = await render(<ds-alert variant="success" title="S" />)
    expect(success.root.shadowRoot.querySelector('[role="alert"]').className).toContain('bg-green-900')
  })

  it('merges customClass on the alert root', async () => {
    const { root } = await render(<ds-alert title="T" custom-class="alert-x" />)
    const alert = root.shadowRoot.querySelector('[role="alert"]')
    expect(alert.className).toContain('alert-x')
  })

  it('renders the icon close control by default', async () => {
    const { root } = await render(<ds-alert title="T" />)
    expect(root.shadowRoot.querySelector('button[aria-label="Fechar"]')).not.toBeNull()
  })

  it('renders the custom closeLabel on the button control', async () => {
    const { root } = await render(<ds-alert title="T" closeType="button" closeLabel="OK" />)
    expect(root.shadowRoot.textContent).toContain('OK')
  })
})

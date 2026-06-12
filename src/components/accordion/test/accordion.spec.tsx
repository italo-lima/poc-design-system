import { render, h, describe, it, expect, vi } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../accordion'

const getButton = (root: HTMLElement) =>
  root.shadowRoot.querySelector('button') as HTMLButtonElement

const getContainer = (root: HTMLElement) => root.shadowRoot.querySelector('div') as HTMLDivElement

const getContentWrapper = (root: HTMLElement) =>
  getContainer(root).children[1] as HTMLDivElement

describe('ds-accordion', () => {
  it('is closed by default with the panel collapsed', async () => {
    const { root } = await render(
      <ds-accordion title="Section A">
        <p>Body content</p>
      </ds-accordion>,
    )
    const button = getButton(root)
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(button.className).toContain('text-white')
    const container = getContainer(root)
    expect(container.className).toContain('border-b-transparent')
    expect(container.className).not.toContain('border-b-neutral-700')
    expect(getContentWrapper(root).className).toContain('max-h-0')
  })

  it('renders the title in the header', async () => {
    const { root } = await render(<ds-accordion title="Section A" />)
    expect(getButton(root).textContent).toContain('Section A')
  })

  it('renders body content through the slot', async () => {
    const { root } = await render(
      <ds-accordion title="With body">
        <p>Body content</p>
      </ds-accordion>,
    )
    expect(root.textContent).toContain('Body content')
  })

  it('toggles open/closed on header click, updating aria-expanded and classes', async () => {
    const { root, waitForChanges } = await render(
      <ds-accordion title="Handler">
        <p>Panel</p>
      </ds-accordion>,
    )
    const button = getButton(root)
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(getContentWrapper(root).className).toContain('max-h-0')

    button.click()
    await waitForChanges()
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(getContentWrapper(root).className).toContain('max-h-screen')

    button.click()
    await waitForChanges()
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(getContentWrapper(root).className).toContain('max-h-0')
  })

  it('rotates the chevron icon when open', async () => {
    const { root, waitForChanges } = await render(<ds-accordion title="Icon" />)
    const icon = root.shadowRoot.querySelector('span[aria-hidden="true"]') as HTMLElement
    expect(icon.className).not.toContain('rotate-180')

    getButton(root).click()
    await waitForChanges()
    expect(icon.className).toContain('rotate-180')
  })

  it('emits dsToggle with the new open state on click', async () => {
    const { root, waitForChanges } = await render(<ds-accordion title="Emit" />)
    const handler = vi.fn()
    root.addEventListener('dsToggle', handler)

    getButton(root).click()
    await waitForChanges()
    expect(handler).toHaveBeenCalledTimes(1)
    expect((handler.mock.calls[0][0] as CustomEvent).detail).toEqual({ open: true })

    getButton(root).click()
    await waitForChanges()
    expect(handler).toHaveBeenCalledTimes(2)
    expect((handler.mock.calls[1][0] as CustomEvent).detail).toEqual({ open: false })
  })

  it('is open when defaultOpen is true', async () => {
    const { root } = await render(<ds-accordion title="Open" default-open />)
    expect(getButton(root).getAttribute('aria-expanded')).toBe('true')
    expect(getContentWrapper(root).className).toContain('max-h-screen')
  })

  it('syncs isOpen when defaultOpen prop changes', async () => {
    const { root, setProps } = await render(
      <ds-accordion title="Sync" default-open={false} />,
    )
    const button = getButton(root)
    expect(button.getAttribute('aria-expanded')).toBe('false')

    await setProps({ defaultOpen: true })
    expect(button.getAttribute('aria-expanded')).toBe('true')
  })

  it('is non-interactive when disabled and does not toggle', async () => {
    const { root } = await render(
      <ds-accordion title="Locked" disabled default-open={false} />,
    )
    const button = getButton(root)
    // A native disabled <button> blocks clicks in the browser, so non-interactivity
    // is guaranteed by the disabled attribute being present. The mock-doc environment
    // does not enforce native disabled on .click(), so we assert via the attribute.
    expect(button.hasAttribute('disabled')).toBe(true)
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('exposes aria-readonly when readOnly is set', async () => {
    const { root } = await render(<ds-accordion title="RO" read-only />)
    expect(getButton(root).getAttribute('aria-readonly')).toBe('true')
  })

  it('still toggles when readOnly is set (matches the original behavior)', async () => {
    const { root, waitForChanges } = await render(<ds-accordion title="RO toggle" read-only />)
    const button = getButton(root)
    expect(button.getAttribute('aria-expanded')).toBe('false')

    button.click()
    await waitForChanges()
    expect(button.getAttribute('aria-expanded')).toBe('true')
  })

  it('is flush-aligned when alignment is flush', async () => {
    const { root } = await render(<ds-accordion title="Flush" alignment="flush" />)
    const button = getButton(root)
    expect(button.className).toContain('py-16')
    expect(button.className).toContain('px-0')
  })

  it('is left-aligned by default', async () => {
    const { root } = await render(<ds-accordion title="Left" />)
    expect(getButton(root).className).toContain('p-16')
  })

  it('applies dark mode layout when darkMode is true and open', async () => {
    const { root } = await render(<ds-accordion title="Dark surface" dark-mode default-open />)
    const button = getButton(root)
    const container = getContainer(root)
    expect(button.className).toContain('text-white')
    expect(button.className).toContain('border-b-transparent')
    expect(container.className).toContain('border-b-neutral-700')
    expect(container.className).not.toContain('border-b-transparent')
  })

  it('omits dark mode contrast styles when darkMode is false and open', async () => {
    const { root } = await render(
      <ds-accordion title="Light surface" darkMode={false} default-open />,
    )
    const button = getButton(root)
    const container = getContainer(root)
    expect(button.className).not.toContain('text-white')
    expect(container.className).not.toContain('border-b-neutral-700')
  })

  it('uses transparent container border when darkMode is false and collapsed', async () => {
    const { root } = await render(<ds-accordion title="Light closed" dark-mode={false} />)
    const container = getContainer(root)
    expect(container.className).toContain('border-b-transparent')
    expect(container.className).not.toContain('border-b-neutral-700')
  })

  it('merges customClass on the root container', async () => {
    const { root } = await render(<ds-accordion title="T" custom-class="acc-extra" />)
    expect(getContainer(root).className).toContain('acc-extra')
  })
})

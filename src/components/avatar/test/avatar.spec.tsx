import { render, h, describe, it, expect } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../avatar'

describe('ds-avatar', () => {
  it('shows the default icon avatar', async () => {
    const { root } = await render(<ds-avatar />)
    const container = root.shadowRoot.querySelector('[aria-label="Avatar"]')
    expect(container).not.toBeNull()
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('shows the chosen icon avatar', async () => {
    const { root } = await render(<ds-avatar icon="search" />)
    const container = root.shadowRoot.querySelector('[aria-label="Avatar"]')
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('shows an image with src and accessible alt', async () => {
    const { root } = await render(
      <ds-avatar type="image" src="https://example.com/a.png" alt="User photo" />,
    )
    const img = root.shadowRoot.querySelector('img')
    expect(img.getAttribute('src')).toBe('https://example.com/a.png')
    expect(img.getAttribute('alt')).toBe('User photo')
  })

  it('falls back to the default image path when src is missing', async () => {
    const { root } = await render(<ds-avatar type="image" alt="No src" />)
    const img = root.shadowRoot.querySelector('img')
    expect(img.getAttribute('src')).toBe('/avatar.png')
  })

  it('preserves an empty alt on the image when alt is an empty string', async () => {
    const { root } = await render(<ds-avatar type="image" src="/x.png" alt="" />)
    const img = root.shadowRoot.querySelector('img')
    expect(img.getAttribute('alt')).toBe('')
  })

  it('shows initials truncated to two uppercase letters', async () => {
    const { root } = await render(<ds-avatar type="initials" initials="abcd" />)
    const span = root.shadowRoot.querySelector('span')
    expect(span.textContent).toBe('AB')
  })

  it('shows U when initials are missing', async () => {
    const { root } = await render(<ds-avatar type="initials" />)
    const span = root.shadowRoot.querySelector('span')
    expect(span.textContent).toBe('U')
  })

  it('uses the provided alt as accessible name for initials', async () => {
    const { root } = await render(<ds-avatar type="initials" initials="AB" alt="Team lead" />)
    expect(root.shadowRoot.querySelector('[aria-label="Team lead"]')).not.toBeNull()
  })

  it('uses initials as accessible name when alt is omitted', async () => {
    const { root } = await render(<ds-avatar type="initials" initials="XY" />)
    expect(root.shadowRoot.querySelector('[aria-label="XY"]')).not.toBeNull()
  })

  it('falls back to User as accessible name when initials and alt are omitted', async () => {
    const { root } = await render(<ds-avatar type="initials" />)
    expect(root.shadowRoot.querySelector('[aria-label="User"]')).not.toBeNull()
  })

  it('is squared when rounded is false', async () => {
    const { root } = await render(<ds-avatar rounded={false} />)
    const container = root.shadowRoot.querySelector('[aria-label="Avatar"]')
    expect(container.className).toContain('rounded-8')
  })

  it('is circular by default', async () => {
    const { root } = await render(<ds-avatar />)
    const container = root.shadowRoot.querySelector('[aria-label="Avatar"]')
    expect(container.className).toContain('rounded-full')
  })

  it('applies dark mode styles by default', async () => {
    const { root } = await render(<ds-avatar />)
    const container = root.shadowRoot.querySelector('[aria-label="Avatar"]')
    expect(container.className).toContain('bg-neutral-800')
    expect(container.className).toContain('text-white')
  })

  it('applies light mode styles when darkMode is false', async () => {
    const { root } = await render(<ds-avatar darkMode={false} />)
    const container = root.shadowRoot.querySelector('[aria-label="Avatar"]')
    expect(container.className).toContain('bg-neutral-200')
    expect(container.className).toContain('text-neutral-800')
  })

  it('merges customClass on the root', async () => {
    const { root } = await render(<ds-avatar custom-class="av-extra" />)
    const container = root.shadowRoot.querySelector('[aria-label="Avatar"]')
    expect(container.className).toContain('av-extra')
  })
})

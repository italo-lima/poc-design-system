import { render, h, describe, it, expect } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../breadcrumb'
import type { BreadcrumbItem } from '../breadcrumb'

describe('ds-breadcrumb', () => {
  it('lists every crumb when there are at most four items', async () => {
    const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Lib' }, { label: 'Page' }]
    const { root } = await render(<ds-breadcrumb items={items} />)

    const nav = root.shadowRoot.querySelector('nav[aria-label="breadcrumb"]')
    expect(nav).not.toBeNull()

    const link = root.shadowRoot.querySelector('a')
    expect(link.textContent).toBe('Home')
    expect(link.getAttribute('href')).toBe('/')

    const current = root.shadowRoot.querySelector('[aria-current="page"]')
    expect(current.textContent).toBe('Page')
  })

  it('uses plain text for items without href when they are not current', async () => {
    const items: BreadcrumbItem[] = [
      { label: 'A' },
      { label: 'B' },
      { label: 'C' },
      { label: 'Last' },
    ]
    const { root } = await render(<ds-breadcrumb items={items} />)

    expect(root.shadowRoot.querySelector('a')).toBeNull()

    // The label 'A' must render as a plain leaf <span> (not an <a>). The component
    // wraps every crumb in an outer layout <span>, so we only count the inner
    // label spans (those without nested element children) to reflect that intent.
    const labels = Array.from(root.shadowRoot.querySelectorAll('span'))
      .filter((s) => s.children.length === 0 && s.textContent === 'A')
    expect(labels.length).toBe(1)
  })

  it('collapses the middle with an ellipsis when there are more than four items', async () => {
    const items: BreadcrumbItem[] = [
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'D', href: '/d' },
      { label: 'E', href: '/e' },
    ]
    const { root } = await render(<ds-breadcrumb items={items} />)

    const ellipsis = root.shadowRoot.querySelector('[aria-label="mais itens"]')
    expect(ellipsis).not.toBeNull()
    expect(ellipsis.textContent).toBe('···')

    const current = root.shadowRoot.querySelector('[aria-current="page"]')
    expect(current.textContent).toBe('E')
  })

  it('renders correctly when darkMode is false', async () => {
    const items: BreadcrumbItem[] = [{ label: 'H', href: '#' }, { label: 'Last' }]
    const { root } = await render(<ds-breadcrumb darkMode={false} items={items} />)

    const link = root.shadowRoot.querySelector('a')
    expect(link.textContent).toBe('H')
    expect(link.getAttribute('href')).toBe('#')
    expect(link.className).toContain('text-neutral-500')

    const current = root.shadowRoot.querySelector('[aria-current="page"]')
    expect(current.textContent).toBe('Last')
  })

  it('shows ellipsis and current item when collapsed in light mode', async () => {
    const items: BreadcrumbItem[] = [
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C' },
      { label: 'D' },
      { label: 'E' },
    ]
    const { root } = await render(<ds-breadcrumb darkMode={false} items={items} />)

    expect(root.shadowRoot.querySelector('[aria-label="mais itens"]')).not.toBeNull()

    const current = root.shadowRoot.querySelector('[aria-current="page"]')
    expect(current.textContent).toBe('E')
  })

  it('renders separators between crumbs', async () => {
    const items: BreadcrumbItem[] = [{ label: 'One', href: '#' }, { label: 'Two' }]
    const { root } = await render(<ds-breadcrumb items={items} />)

    const separators = Array.from(root.shadowRoot.querySelectorAll('span[aria-hidden="true"]'))
    expect(separators.length).toBe(1)
    expect(separators[0].textContent).toBe('/')
  })

  it('uses dark mode by default', async () => {
    const items: BreadcrumbItem[] = [{ label: 'A', href: '#' }, { label: 'B' }]
    const { root } = await render(<ds-breadcrumb items={items} />)

    const link = root.shadowRoot.querySelector('a')
    expect(link.className).toContain('text-neutral-400')
  })

  it('merges customClass on the nav', async () => {
    const items: BreadcrumbItem[] = [{ label: 'One' }]
    const { root } = await render(<ds-breadcrumb items={items} custom-class="bc" />)

    const nav = root.shadowRoot.querySelector('nav')
    expect(nav.className).toContain('bc')
  })

  it('emits dsNavigate with item and index when a link is clicked', async () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Page', href: '/page' },
      { label: 'Last' },
    ]
    const { root } = await render(<ds-breadcrumb items={items} />)

    let detail: { item: BreadcrumbItem; index: number } | undefined
    root.addEventListener('dsNavigate', (e: Event) => {
      detail = (e as CustomEvent).detail
    })

    const firstLink = root.shadowRoot.querySelector('a') as HTMLAnchorElement
    firstLink.click()

    expect(detail).toBeDefined()
    expect(detail.item.label).toBe('Home')
    expect(detail.index).toBe(0)
  })

  it('renders an empty nav when items is empty', async () => {
    const { root } = await render(<ds-breadcrumb items={[]} />)
    const nav = root.shadowRoot.querySelector('nav[aria-label="breadcrumb"]')
    expect(nav).not.toBeNull()
    expect(nav.querySelector('a')).toBeNull()
  })
})

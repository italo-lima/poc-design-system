import { render, h, describe, it, expect } from '@stencil/vitest'

// Importing the sources triggers the on-the-fly compile + customElements.define()
import '../accordion-group'
import '../../accordion/accordion'

const getContainer = (root: HTMLElement) => root.shadowRoot.querySelector('div') as HTMLDivElement

// Factory: vnodes acumulam refs ($elm$) entre renders, então gere novos a cada uso.
const items = () => [
  <ds-accordion title="One">A</ds-accordion>,
  <ds-accordion title="Two">B</ds-accordion>,
]

describe('ds-accordion-group', () => {
  it('renders a slot for its children', async () => {
    const { root } = await render(<ds-accordion-group>{items()}</ds-accordion-group>)
    expect(getContainer(root).querySelector('slot')).not.toBeNull()
  })

  it('projects the slotted ds-accordion children', async () => {
    const { root } = await render(<ds-accordion-group>{items()}</ds-accordion-group>)
    const children = root.querySelectorAll('ds-accordion')
    expect(children.length).toBe(2)
    expect((children[0] as HTMLElement).title).toBe('One')
    expect((children[1] as HTMLElement).title).toBe('Two')
  })

  it('always applies the base w-full class', async () => {
    const { root } = await render(<ds-accordion-group>{items()}</ds-accordion-group>)
    expect(getContainer(root).className).toContain('w-full')
  })

  it('uses dark surface when hasBackground and darkMode', async () => {
    const { root } = await render(
      <ds-accordion-group hasBackground={true} darkMode={true}>
        {items()}
      </ds-accordion-group>,
    )
    expect(getContainer(root).className).toContain('bg-neutral-900')
  })

  it('uses light surface when hasBackground and not darkMode', async () => {
    const { root } = await render(
      <ds-accordion-group hasBackground={true} darkMode={false}>
        {items()}
      </ds-accordion-group>,
    )
    expect(getContainer(root).className).toContain('bg-neutral-50')
  })

  it('uses dark bordered frame when hasBorder and darkMode', async () => {
    const { root } = await render(
      <ds-accordion-group hasBorder={true} darkMode={true}>
        {items()}
      </ds-accordion-group>,
    )
    const className = getContainer(root).className
    expect(className).toContain('border')
    expect(className).toContain('border-neutral-700')
    expect(className).toContain('rounded-8')
  })

  it('uses light bordered frame when hasBorder and not darkMode', async () => {
    const { root } = await render(
      <ds-accordion-group hasBorder={true} darkMode={false}>
        {items()}
      </ds-accordion-group>,
    )
    const className = getContainer(root).className
    expect(className).toContain('border')
    expect(className).toContain('border-neutral-200')
    expect(className).toContain('rounded-8')
  })

  it('combines dark surface and border when both flags are set in dark mode', async () => {
    const { root } = await render(
      <ds-accordion-group hasBackground={true} hasBorder={true} darkMode={true}>
        {items()}
      </ds-accordion-group>,
    )
    const className = getContainer(root).className
    expect(className).toContain('bg-neutral-900')
    expect(className).toContain('border-neutral-700')
  })

  it('combines light surface and border when both flags are set in light mode', async () => {
    const { root } = await render(
      <ds-accordion-group hasBackground={true} hasBorder={true} darkMode={false}>
        {items()}
      </ds-accordion-group>,
    )
    const className = getContainer(root).className
    expect(className).toContain('bg-neutral-50')
    expect(className).toContain('border-neutral-200')
  })

  it('renders without background and border when no flags are set', async () => {
    const { root } = await render(<ds-accordion-group>{items()}</ds-accordion-group>)
    const className = getContainer(root).className
    expect(className).not.toContain('bg-neutral-900')
    expect(className).not.toContain('bg-neutral-50')
    expect(className).not.toContain('border-neutral-700')
    expect(className).not.toContain('border-neutral-200')
  })

  it('defaults to darkMode = true (dark surface when only hasBackground)', async () => {
    const { root } = await render(
      <ds-accordion-group hasBackground={true}>{items()}</ds-accordion-group>,
    )
    expect(getContainer(root).className).toContain('bg-neutral-900')
  })

  it('applies only dark background without border', async () => {
    const { root } = await render(
      <ds-accordion-group hasBackground={true} darkMode={true}>
        {items()}
      </ds-accordion-group>,
    )
    const className = getContainer(root).className
    expect(className).toContain('bg-neutral-900')
    expect(className).not.toContain('border-neutral-700')
  })

  it('applies only light border without background', async () => {
    const { root } = await render(
      <ds-accordion-group hasBorder={true} darkMode={false}>
        {items()}
      </ds-accordion-group>,
    )
    const className = getContainer(root).className
    expect(className).toContain('border-neutral-200')
    expect(className).not.toContain('bg-neutral-50')
  })

  it('merges customClass on the container', async () => {
    const { root } = await render(
      <ds-accordion-group custom-class="grp">{items()}</ds-accordion-group>,
    )
    const className = getContainer(root).className
    expect(className).toContain('grp')
    expect(className).toContain('w-full')
  })
})

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Accordion } from '../../accordion/Accordion'
import { AccordionGroup } from '../AccordionGroup'

describe('AccordionGroup', () => {
  const items = (
    <>
      <Accordion title="One">A</Accordion>
      <Accordion title="Two">B</Accordion>
    </>
  )

  it('should be rendering its children', () => {
    render(<AccordionGroup>{items}</AccordionGroup>)
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })

  it('should be using dark surface when hasBackground and darkMode', () => {
    const { container } = render(
      <AccordionGroup hasBackground darkMode>
        {items}
      </AccordionGroup>,
    )
    expect(container.firstChild).toHaveClass('bg-neutral-900')
  })

  it('should be using light surface when hasBackground and not darkMode', () => {
    const { container } = render(
      <AccordionGroup hasBackground darkMode={false}>
        {items}
      </AccordionGroup>,
    )
    expect(container.firstChild).toHaveClass('bg-neutral-50')
  })

  it('should be using dark bordered frame when hasBorder and darkMode', () => {
    const { container } = render(
      <AccordionGroup hasBorder darkMode>
        {items}
      </AccordionGroup>,
    )
    expect(container.firstChild).toHaveClass('border', 'border-neutral-700', 'rounded-8')
  })

  it('should be using light bordered frame when hasBorder and not darkMode', () => {
    const { container } = render(
      <AccordionGroup hasBorder darkMode={false}>
        {items}
      </AccordionGroup>,
    )
    expect(container.firstChild).toHaveClass('border', 'border-neutral-200', 'rounded-8')
  })

  it('should be combining light surface and border when both flags are set in light mode', () => {
    const { container } = render(
      <AccordionGroup hasBackground hasBorder darkMode={false}>
        {items}
      </AccordionGroup>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('bg-neutral-50')
    expect(el).toHaveClass('border-neutral-200')
  })

  it('should be combining dark surface and border when both flags are set in dark mode', () => {
    const { container } = render(
      <AccordionGroup hasBackground hasBorder darkMode>
        {items}
      </AccordionGroup>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('bg-neutral-900')
    expect(el).toHaveClass('border-neutral-700')
  })

  it('should be forwarding className and HTML attributes', () => {
    render(
      <AccordionGroup className="grp" data-testid="grp" id="accordion-root">
        {items}
      </AccordionGroup>,
    )
    const el = screen.getByTestId('grp')
    expect(el).toHaveClass('grp', 'w-full')
    expect(el).toHaveAttribute('id', 'accordion-root')
  })

  it('should render without background and border when no flags are set', () => {
    const { container } = render(<AccordionGroup>{items}</AccordionGroup>)
    const el = container.firstChild as HTMLElement

    expect(el).not.toHaveClass('bg-neutral-900')
    expect(el).not.toHaveClass('bg-neutral-50')
    expect(el).not.toHaveClass('border')
  })

  it('should apply only border-related classes when hasBorder is true', () => {
    const { container } = render(<AccordionGroup hasBorder>{items}</AccordionGroup>)

    const el = container.firstChild as HTMLElement

    expect(el).toHaveClass('[&>*:last-child]:border-b-transparent')
    expect(el).toHaveClass('[&>*:last-child_button]:border-b-transparent')
  })

  it('should not apply border classes when hasBorder is false', () => {
    const { container } = render(<AccordionGroup hasBorder={false}>{items}</AccordionGroup>)

    const el = container.firstChild as HTMLElement

    expect(el).not.toHaveClass('border-neutral-700')
    expect(el).not.toHaveClass('border-neutral-200')
  })

  it('should default to darkMode = true', () => {
    const { container } = render(<AccordionGroup hasBackground>{items}</AccordionGroup>)

    expect(container.firstChild).toHaveClass('bg-neutral-900')
  })

  it('should not apply any conditional classes when all flags are false', () => {
    const { container } = render(
      <AccordionGroup hasBackground={false} hasBorder={false} darkMode={false}>
        {items}
      </AccordionGroup>,
    )

    const el = container.firstChild as HTMLElement

    expect(el).not.toHaveClass('bg-neutral-900')
    expect(el).not.toHaveClass('bg-neutral-50')
    expect(el).not.toHaveClass('border-neutral-700')
    expect(el).not.toHaveClass('border-neutral-200')
  })

  it('should apply only dark background without border', () => {
    const { container } = render(
      <AccordionGroup hasBackground darkMode hasBorder={false}>
        {items}
      </AccordionGroup>,
    )

    const el = container.firstChild as HTMLElement

    expect(el).toHaveClass('bg-neutral-900')
    expect(el).not.toHaveClass('border-neutral-700')
  })

  it('should apply only light border without background', () => {
    const { container } = render(
      <AccordionGroup hasBorder darkMode={false} hasBackground={false}>
        {items}
      </AccordionGroup>,
    )

    const el = container.firstChild as HTMLElement

    expect(el).toHaveClass('border-neutral-200')
    expect(el).not.toHaveClass('bg-neutral-50')
  })

  it('should apply only light background without border', () => {
    const { container } = render(
      <AccordionGroup hasBackground darkMode={false} hasBorder={false}>
        {items}
      </AccordionGroup>,
    )

    const el = container.firstChild as HTMLElement

    expect(el).toHaveClass('bg-neutral-50')
    expect(el).not.toHaveClass('border-neutral-200')
  })

  it('should fallback to default darkMode when undefined is passed', () => {
    const { container } = render(
      <AccordionGroup hasBackground darkMode={undefined}>
        {items}
      </AccordionGroup>,
    )

    expect(container.firstChild).toHaveClass('bg-neutral-900')
  })
})

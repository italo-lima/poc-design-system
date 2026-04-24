import { type MouseEventHandler, type ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import type { TagVariant } from '../Tag'
import { Tag } from '../Tag'

describe('Tag', () => {
  const solidChecks: [TagVariant, string][] = [
    ['primary', 'bg-brand-600'],
    ['danger', 'bg-tart-orange-600'],
    ['accent', 'bg-crayola-600'],
    ['secondary', 'bg-neutral-700'],
    ['critical', 'bg-red-600'],
    ['info', 'bg-blue-700'],
    ['success', 'bg-green-700'],
  ]

  it.each(solidChecks)('should be solid %s with the expected background', (variant, cls) => {
    render(<Tag text="L" variant={variant} surface="solid" />)
    expect(screen.getByText('L').parentElement).toHaveClass(cls)
  })

  const outlineChecks: [TagVariant, string][] = [
    ['primary', 'border-brand-500'],
    ['danger', 'border-tart-orange-500'],
    ['accent', 'border-crayola-500'],
    ['secondary', 'border-neutral-500'],
    ['critical', 'border-red-500'],
    ['info', 'border-blue-500'],
    ['success', 'border-green-500'],
  ]

  it.each(outlineChecks)('should be outline %s with the expected border', (variant, cls) => {
    render(<Tag text="L" variant={variant} surface="outline" />)
    expect(screen.getByText('L').parentElement).toHaveClass(cls)
  })

  it('should be small when size is small', () => {
    render(<Tag text="S" size="small" />)
    expect(screen.getByText('S').parentElement).toHaveClass('h-32')
  })

  it('should be pill-shaped when format is pill', () => {
    render(<Tag text="P" format="pill" />)
    expect(screen.getByText('P').parentElement).toHaveClass('rounded-3xl')
  })

  it('should be omitting the leading slot when leadingIcon is null', () => {
    render(<Tag text="No lead" leadingIcon={null} />)
    expect(screen.getByText('No lead').parentElement?.querySelectorAll('svg')).toHaveLength(0)
  })

  it('should be showing a leading icon when provided', () => {
    render(<Tag text="With" leadingIcon={'check' as ReactNode} />)
    expect(screen.getByText('With').parentElement?.querySelectorAll('svg').length).toBeGreaterThan(
      0,
    )
  })

  it('should be using a button for the trailing control when onTrailingClick is set', async () => {
    const onTrailingClick = vi.fn()
    render(<Tag text="Close me" trailingIcon="x" onTrailingClick={onTrailingClick} />)
    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(onTrailingClick).toHaveBeenCalled()
  })

  it('should be using a non-button trailing control when onTrailingClick is null', () => {
    render(
      <Tag
        text="Trail"
        trailingIcon="search"
        onTrailingClick={null as unknown as MouseEventHandler<HTMLButtonElement>}
      />,
    )
    expect(screen.queryByRole('button', { name: 'Fechar' })).not.toBeInTheDocument()
    expect(screen.getByText('Trail').parentElement?.querySelector('button')).toBeNull()
  })

  it('should be forwarding className and id', () => {
    render(<Tag text="C" className="tag-x" data-testid="tag" id="tag-1" />)
    const el = screen.getByTestId('tag')
    expect(el).toHaveClass('tag-x')
    expect(el).toHaveAttribute('id', 'tag-1')
  })
})

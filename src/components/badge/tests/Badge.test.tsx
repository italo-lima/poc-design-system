import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from '../Badge'

describe('Badge', () => {
  const variants = [
    'primary',
    'danger',
    'accent',
    'secondary',
    'critical',
    'info',
    'success',
  ] as const

  it.each(variants)('should be rendering a dot for variant %s when count is omitted', (variant) => {
    const { container } = render(<Badge variant={variant} />)
    const dot = container.querySelector('span[aria-hidden="true"]')
    expect(dot).toBeInTheDocument()
    expect(dot).toHaveClass('rounded-full', 'w-8', 'h-8')
  })

  it.each(variants)('should be rendering the count for variant %s', (variant) => {
    render(<Badge variant={variant} count={3} />)
    expect(screen.getByLabelText(/notificações/)).toHaveTextContent('3')
  })

  it('should use primary variant by default', () => {
    const { container } = render(<Badge count={1} />)
    expect(container.firstChild).toHaveClass('bg-brand-600')
  })

  it('should render correctly when count is 0', () => {
    render(<Badge count={0} />)
    expect(screen.getByLabelText('0 notificações')).toBeInTheDocument()
  })

  it('should render formatted count in both aria-label and text', () => {
    render(<Badge count={1000} />)

    const el = screen.getByLabelText('999+ notificações')
    expect(el).toHaveTextContent('999+')
  })

  it('should apply count shape styles when count is present', () => {
    const { container } = render(<Badge count={1} />)
    expect(container.firstChild).toHaveClass('w-40', 'h-24')
  })

  it('should be formatting counts above the cap as 999+', () => {
    render(<Badge count={1000} />)
    expect(screen.getByLabelText('999+ notificações')).toBeInTheDocument()
  })

  it('should be formatting the count at the cap without a plus suffix', () => {
    render(<Badge count={999} />)
    expect(screen.getByLabelText('999 notificações')).toBeInTheDocument()
  })

  it('should be formatting small numeric counts as text', () => {
    render(<Badge count={1} />)
    expect(screen.getByLabelText('1 notificações')).toBeInTheDocument()
  })

  it('should be merging className on the dot', () => {
    const { container } = render(<Badge className="bdg" />)
    expect(container.firstChild).toHaveClass('bdg')
  })

  it('should be merging className on the count wrapper', () => {
    render(<Badge count={1} className="wrap" />)
    expect(screen.getByText('1').parentElement).toHaveClass('wrap')
  })

  it('should be forwarding extra attributes on the dot', () => {
    const { container } = render(<Badge data-testid="dot" id="badge-dot" />)
    expect(container.querySelector('[data-testid="dot"]')).toHaveAttribute('id', 'badge-dot')
  })

  it('should be forwarding extra attributes on the count label', () => {
    render(<Badge count={2} data-testid="cnt" id="badge-count" />)
    expect(screen.getByTestId('cnt')).toHaveAttribute('id', 'badge-count')
  })

  it('should render a div wrapper when count is provided', () => {
    const { container } = render(<Badge count={1} />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })
})

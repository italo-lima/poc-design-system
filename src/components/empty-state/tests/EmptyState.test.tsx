import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { EmptyState } from '../EmptyState'

describe('EmptyState', () => {
  const semanticVariants = ['informative', 'warning', 'critical', 'success'] as const

  it.each(semanticVariants)(
    'should be rendering variant %s with its default illustration',
    (variant) => {
      render(<EmptyState variant={variant} title={`Title ${variant}`} />)
      expect(screen.getByText(`Title ${variant}`)).toBeInTheDocument()
      const title = screen.getByText(`Title ${variant}`)
      const iconHost = title.parentElement?.previousElementSibling
      expect(iconHost?.querySelector('svg')).toBeInTheDocument()
    },
  )

  it('should be showing the mapped icon when variant is icon and icon is set', () => {
    render(<EmptyState variant="icon" icon="search" title="No results" />)
    const title = screen.getByText('No results')
    const iconHost = title.parentElement?.previousElementSibling
    expect(iconHost?.querySelector('svg')).toBeInTheDocument()
  })

  it('should be omitting an illustration when variant is icon and icon is not set', () => {
    const { container } = render(<EmptyState variant="icon" title="Bare icon variant" />)
    expect(container.querySelectorAll('svg')).toHaveLength(0)
  })

  it('should be showing the description when provided', () => {
    render(<EmptyState title="T" description="Details here" />)
    expect(screen.getByText('Details here')).toBeInTheDocument()
  })

  it('should be omitting the description when not provided', () => {
    render(<EmptyState title="Only title" />)
    expect(screen.queryByText('Details here')).not.toBeInTheDocument()
  })

  it('should be invoking actionOnClick from the primary action', async () => {
    const actionOnClick = vi.fn()
    render(<EmptyState title="T" actionLabel="Retry" actionOnClick={actionOnClick} />)
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(actionOnClick).toHaveBeenCalledTimes(1)
  })

  it('should be forwarding className and id on the root', () => {
    render(<EmptyState title="T" className="es-x" data-testid="es" id="es-root" />)
    const root = screen.getByTestId('es')
    expect(root).toHaveClass('es-x')
    expect(root).toHaveAttribute('id', 'es-root')
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from '../Alert'

describe('Alert', () => {
  const variants = ['default', 'danger', 'info', 'success'] as const

  it.each(variants)('should be showing an alert for variant %s', (variant) => {
    render(<Alert variant={variant} title={`T-${variant}`} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(`T-${variant}`)).toBeInTheDocument()
  })

  it('should be showing the subtitle when it is provided', () => {
    render(<Alert title="T" subtitle="Sub" />)
    expect(screen.getByText('Sub')).toBeInTheDocument()
  })

  it('should be omitting the subtitle when it is not provided', () => {
    render(<Alert title="Only" />)
    expect(screen.queryByText('Sub')).not.toBeInTheDocument()
  })

  it('should be calling onClose when the icon close control is used', async () => {
    const onClose = vi.fn()
    render(<Alert title="X" onClose={onClose} closeType="icon" />)
    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should be calling onClose when the button close control is used', async () => {
    const onClose = vi.fn()
    render(<Alert title="T" onClose={onClose} closeType="button" closeLabel="Dismiss" />)
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should be using the correct surface per variant', () => {
    const { rerender, getByRole } = render(<Alert variant="danger" title="D" />)
    expect(getByRole('alert')).toHaveClass('bg-red-900')

    rerender(<Alert variant="info" title="I" />)
    expect(getByRole('alert')).toHaveClass('bg-blue-800')

    rerender(<Alert variant="success" title="S" />)
    expect(getByRole('alert')).toHaveClass('bg-green-900')
  })

  it('should be forwarding className and extra attributes', () => {
    render(<Alert title="T" className="alert-x" data-testid="al" id="alert-1" />)
    const el = screen.getByTestId('al')
    expect(el).toHaveClass('alert-x')
    expect(el).toHaveAttribute('id', 'alert-1')
  })
})

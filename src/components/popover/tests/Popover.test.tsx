import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Popover } from '../Popover'

describe('Popover', () => {
  const placements = ['default', 'left', 'top', 'bottom', 'right'] as const

  it.each(placements)('should be rendering for placement %s', (placement) => {
    render(<Popover placement={placement} title={`T-${placement}`} />)
    expect(screen.getByRole('region', { name: `T-${placement}` })).toBeInTheDocument()
  })

  it('should be showing body content when children are provided', () => {
    render(<Popover title="Info">Help text</Popover>)
    expect(screen.getByText('Help text')).toBeInTheDocument()
  })

  it('should be omitting body content when children are not provided', () => {
    render(<Popover title="Solo" />)
    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.queryByText('Help text')).not.toBeInTheDocument()
  })

  it('should be using light panel background when darkMode is false', () => {
    render(
      <Popover title="Light" darkMode={false}>
        C
      </Popover>,
    )
    expect(screen.getByText('Light').parentElement).toHaveClass('bg-neutral-100')
  })

  it('should be forwarding className and id', () => {
    render(<Popover title="T" className="pop-x" data-testid="pop" id="pop-1" />)
    const el = screen.getByTestId('pop')
    expect(el).toHaveClass('pop-x')
    expect(el).toHaveAttribute('id', 'pop-1')
  })
})

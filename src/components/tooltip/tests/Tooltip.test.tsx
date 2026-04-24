import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Tooltip } from '../Tooltip'

describe('Tooltip', () => {
  const placements = ['default', 'left', 'top', 'bottom', 'right'] as const

  it.each(placements)('should be rendering for placement %s', (placement) => {
    render(
      <Tooltip placement={placement} data-testid={`tp-${placement}`}>
        Tip {placement}
      </Tooltip>,
    )
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByText(`Tip ${placement}`)).toBeInTheDocument()
  })

  it('should be using a light panel background when darkMode is false', () => {
    render(
      <Tooltip darkMode={false} data-testid="tp">
        Light
      </Tooltip>,
    )
    const root = screen.getByTestId('tp')
    expect(root).toBeVisible()
    expect(screen.getByText('Light')).toBeVisible()
    expect(root.firstElementChild).toHaveClass('bg-neutral-100')
  })

  it('should be forwarding className and id', () => {
    render(
      <Tooltip className="tt-x" data-testid="tt" id="tt-1">
        X
      </Tooltip>,
    )
    const el = screen.getByTestId('tt')
    expect(el).toHaveClass('tt-x')
    expect(el).toHaveAttribute('id', 'tt-1')
  })
})

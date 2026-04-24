import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from '../../avatar/Avatar'
import { AvatarGroup } from '../AvatarGroup'

describe('AvatarGroup', () => {
  const six = [0, 1, 2, 3, 4, 5].map((i) => <Avatar key={i} />)

  it('should be exposing a single group for assistive tech', () => {
    render(
      <AvatarGroup>
        <Avatar />
      </AvatarGroup>,
    )
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('should be showing an overflow count when there are more avatars than max', () => {
    render(<AvatarGroup max={3}>{six}</AvatarGroup>)
    expect(screen.getByText('+3')).toBeInTheDocument()
  })

  it('should be hiding the overflow count when within max', () => {
    render(
      <AvatarGroup max={5}>
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
  })

  it('should be showing the overflow badge when in light mode', () => {
    render(
      <AvatarGroup max={1}>
        <Avatar />
        <Avatar />
      </AvatarGroup>,
    )
    expect(screen.getByText('+1')).toBeVisible()
  })

  it('should be rendering nested avatars inside the group', () => {
    render(
      <AvatarGroup>
        <Avatar rounded={false} />
      </AvatarGroup>,
    )
    const group = screen.getByRole('group')
    expect(group.querySelector('[aria-label="Avatar"]')).toBeInTheDocument()
    expect(group.querySelector('svg')).toBeInTheDocument()
  })

  it('should be merging className on the root', () => {
    render(
      <AvatarGroup className="ag-x" data-testid="ag">
        <Avatar />
      </AvatarGroup>,
    )
    expect(screen.getByTestId('ag')).toHaveClass('ag-x')
  })
})

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar } from '../Avatar'

describe('Avatar', () => {
  it('should be showing the default icon avatar', () => {
    render(<Avatar />)
    const root = screen.getByLabelText('Avatar')
    expect(root.querySelector('svg')).toBeInTheDocument()
  })

  it('should be showing the chosen icon avatar', () => {
    render(<Avatar icon="search" />)
    expect(screen.getByLabelText('Avatar').querySelector('svg')).toBeInTheDocument()
  })

  it('should be showing an image with src and accessible name', () => {
    render(<Avatar type="image" src="https://example.com/a.png" alt="User photo" />)
    const img = screen.getByRole('img', { name: 'User photo' })
    expect(img).toHaveAttribute('src', 'https://example.com/a.png')
  })

  it('should be falling back to the default image path when src is missing', () => {
    render(<Avatar type="image" alt="No src" />)
    const img = screen.getByRole('img', { name: 'No src' })
    expect(img).toHaveAttribute('src', '/avatar.png')
  })

  it('should be preserving an empty alt on the image when alt is an empty string', () => {
    render(<Avatar type="image" src="/x.png" alt="" />)
    const img = document.querySelector('img')
    expect(img).toHaveAttribute('alt', '')
  })

  it('should be showing initials truncated to two uppercase letters', () => {
    render(<Avatar type="initials" initials="abcd" />)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('should be showing U when initials are missing', () => {
    render(<Avatar type="initials" />)
    expect(screen.getByText('U')).toBeInTheDocument()
  })

  it('should be using the provided alt as accessible name for initials', () => {
    render(<Avatar type="initials" initials="AB" alt="Team lead" />)
    expect(screen.getByLabelText('Team lead')).toBeInTheDocument()
  })

  it('should be using initials as accessible name when alt is omitted', () => {
    render(<Avatar type="initials" initials="XY" />)
    expect(screen.getByLabelText('XY')).toBeInTheDocument()
  })

  it('should be squared when rounded is false', () => {
    render(<Avatar rounded={false} />)
    expect(screen.getByLabelText('Avatar')).toHaveClass('rounded-8')
  })

  it('should be circular by default', () => {
    render(<Avatar />)
    expect(screen.getByLabelText('Avatar')).toHaveClass('rounded-full')
  })

  it('should be merging className on the root', () => {
    render(<Avatar className="av-extra" />)
    expect(screen.getByLabelText('Avatar')).toHaveClass('av-extra')
  })

  it('should be forwarding extra attributes on the root', () => {
    render(<Avatar data-testid="av-root" id="avatar-1" />)
    const el = screen.getByTestId('av-root')
    expect(el).toHaveAttribute('id', 'avatar-1')
  })

  it('should be using the image alt fallback when alt is null', () => {
    render(<Avatar type="image" src="/y.png" alt={null as unknown as string | undefined} />)
    const img = document.querySelector('img')
    expect(img).toHaveAttribute('alt', 'Avatar')
  })
})

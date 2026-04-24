import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Breadcrumb } from '../Breadcrumb'

describe('Breadcrumb', () => {
  it('should be listing every crumb when there are at most four items', () => {
    const items = [{ label: 'Home', href: '/' }, { label: 'Lib' }, { label: 'Page' }]
    render(<Breadcrumb items={items} />)
    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByText('Lib')).toBeInTheDocument()
    expect(screen.getByText('Page')).toHaveAttribute('aria-current', 'page')
  })

  it('should be using plain text for items without href when they are not current', () => {
    const items = [{ label: 'A' }, { label: 'B' }, { label: 'C' }, { label: 'Last' }]
    render(<Breadcrumb items={items} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('A').tagName).toBe('SPAN')
  })

  it('should be collapsing the middle with an ellipsis when there are more than four items', () => {
    const items = [
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'D', href: '/d' },
      { label: 'E', href: '/e' },
    ]
    render(<Breadcrumb items={items} />)
    expect(screen.getByLabelText('mais itens')).toHaveTextContent('···')
    expect(screen.getByText('E')).toHaveAttribute('aria-current', 'page')
  })

  it('should be navigable when darkMode is false', () => {
    render(<Breadcrumb darkMode={false} items={[{ label: 'H', href: '#' }, { label: 'Last' }]} />)
    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'H' })).toHaveAttribute('href', '#')
    expect(screen.getByText('Last')).toHaveAttribute('aria-current', 'page')
  })

  it('should be showing ellipsis and inactive items when collapsed in light mode', () => {
    render(
      <Breadcrumb
        darkMode={false}
        items={[
          { label: 'A', href: '/a' },
          { label: 'B', href: '/b' },
          { label: 'C' },
          { label: 'D' },
          { label: 'E' },
        ]}
      />,
    )
    expect(screen.getByLabelText('mais itens')).toBeInTheDocument()
    expect(screen.getByText('D')).toBeInTheDocument()
    expect(screen.getByText('E')).toHaveAttribute('aria-current', 'page')
  })

  it('should be forwarding className and id', () => {
    render(<Breadcrumb className="bc" items={[{ label: 'One' }]} id="bc-1" />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('bc')
    expect(nav).toHaveAttribute('id', 'bc-1')
  })
})

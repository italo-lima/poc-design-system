import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Accordion } from '../Accordion'

describe('Accordion', () => {
  it('should be closed by default with the panel collapsed for assistive state', () => {
    render(
      <Accordion title="Section A" data-testid="section-a-root">
        <p>Body content</p>
      </Accordion>,
    )
    expect(screen.getByText('Section A')).toBeInTheDocument()
    const button = screen.getByRole('button', { name: /section a/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveClass('text-white')
    const root = screen.getByTestId('section-a-root')
    expect(root).toHaveClass('border-b-transparent')
    expect(root).not.toHaveClass('border-b-neutral-700')
  })

  it('should be expandable and collapsible when the header is activated', async () => {
    render(
      <Accordion title="Section A">
        <p>Body content</p>
      </Accordion>,
    )
    const button = screen.getByRole('button', { name: /section a/i })
    const body = screen.getByText('Body content')

    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(body).toBeInTheDocument()

    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('should toggle open state via the header click handler', async () => {
    render(
      <Accordion title="Handler" data-testid="accordion-root">
        <p>Panel</p>
      </Accordion>,
    )
    const root = screen.getByTestId('accordion-root')
    const button = screen.getByRole('button', { name: /handler/i })
    const contentPanel = root.children[1] as HTMLElement

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(contentPanel).toHaveClass('max-h-0')

    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(contentPanel).toHaveClass('max-h-screen')

    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(contentPanel).toHaveClass('max-h-0')
  })

  it('should be open when defaultOpen is true', () => {
    render(
      <Accordion title="Open" defaultOpen>
        <span>Visible</span>
      </Accordion>,
    )
    expect(screen.getByText('Visible')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('should be synced when defaultOpen changes', () => {
    const { rerender } = render(
      <Accordion title="Sync" defaultOpen={false}>
        Inner
      </Accordion>,
    )
    const inner = screen.getByText('Inner')
    const button = screen.getByRole('button', { name: /sync/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    rerender(
      <Accordion title="Sync" defaultOpen>
        Inner
      </Accordion>,
    )
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(inner).toBeInTheDocument()
  })

  it('should be non-interactive when disabled', async () => {
    render(
      <Accordion title="Locked" disabled defaultOpen={false}>
        Secret
      </Accordion>,
    )
    const secret = screen.getByText('Secret')
    const button = screen.getByRole('button', { name: /locked/i })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(secret).toBeInTheDocument()

    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('should be flush-aligned when alignment is flush', () => {
    render(
      <Accordion title="Flush" alignment="flush">
        X
      </Accordion>,
    )
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('py-16', 'px-0')
  })

  it('should be left-aligned when alignment is left', () => {
    render(<Accordion title="Left">X</Accordion>)
    expect(screen.getByRole('button')).toHaveClass('p-16')
  })

  it('should be readonly when readOnly is set', () => {
    render(
      <Accordion title="RO" readOnly>
        C
      </Accordion>,
    )
    expect(screen.getByRole('button')).toHaveAttribute('aria-readonly', 'true')
  })

  it('should be able to forward className and extra props to the root', () => {
    render(
      <Accordion title="T" className="acc-extra" data-testid="acc-root" id="acc-1">
        C
      </Accordion>,
    )
    const root = screen.getByTestId('acc-root')
    expect(root).toHaveClass('acc-extra')
    expect(root).toHaveAttribute('id', 'acc-1')
  })

  it('should apply dark mode layout when darkMode is true', () => {
    render(
      <Accordion title="Dark surface" darkMode defaultOpen data-testid="dark-acc">
        Content
      </Accordion>,
    )
    const button = screen.getByRole('button', { name: /dark surface/i })
    const root = screen.getByTestId('dark-acc')
    expect(button).toHaveClass('text-white')
    expect(button).toHaveClass('border-b-transparent')
    expect(root).toHaveClass('border-b-neutral-700')
    expect(root).not.toHaveClass('border-b-transparent')
  })

  it('should apply explicit darkMode true like the default prop', () => {
    render(
      <Accordion title="Explicit dark" darkMode={true} defaultOpen={false} data-testid="exp-dark">
        C
      </Accordion>,
    )
    expect(screen.getByRole('button')).toHaveClass('text-white')
    expect(screen.getByTestId('exp-dark')).toHaveClass('border-b-transparent')
  })

  it('should omit dark mode contrast styles when darkMode is false', () => {
    render(
      <Accordion title="Light surface" darkMode={false} defaultOpen>
        Content
      </Accordion>,
    )
    const button = screen.getByRole('button', { name: /light surface/i })
    expect(button).not.toHaveClass('text-white')
    expect(button.parentElement).not.toHaveClass('border-b-neutral-700')
  })

  it('should use neutral container border when darkMode is false and collapsed', () => {
    render(
      <Accordion title="Light closed" darkMode={false} data-testid="light-closed">
        X
      </Accordion>,
    )
    const root = screen.getByTestId('light-closed')
    expect(root).toHaveClass('border-b-transparent')
    expect(root).not.toHaveClass('border-b-neutral-700')
  })
})

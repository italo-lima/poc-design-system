import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  describe('rendering', () => {
    it('should be rendering with default props', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: 'Click me' })
      expect(button).toBeInTheDocument()
      expect(button).not.toBeDisabled()
    })

    it('should be rendering its label text', () => {
      render(<Button>Save changes</Button>)
      expect(screen.getByText('Save changes')).toBeInTheDocument()
    })

    it('should be forwarding native button attributes', () => {
      render(
        <Button data-testid="my-btn" type="submit" id="submit-btn">
          Submit
        </Button>,
      )
      const button = screen.getByTestId('my-btn')
      expect(button).toHaveAttribute('type', 'submit')
      expect(button).toHaveAttribute('id', 'submit-btn')
    })

    it('should be merging the consumer className', () => {
      render(<Button className="custom-class">Label</Button>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })
  })

  describe('variant', () => {
    it('should be solid primary by default', () => {
      render(<Button>Label</Button>)
      expect(screen.getByRole('button')).toHaveClass('bg-brand-500')
    })

    it('should be solid primary when variant and color are set explicitly', () => {
      render(
        <Button variant="solid" color="primary">
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('bg-brand-500', 'text-brand-1000')
    })

    it('should be outlined primary with border and transparent fill', () => {
      render(
        <Button variant="outlined" color="primary">
          Label
        </Button>,
      )
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border', 'border-brand-500', 'text-brand-500', 'bg-transparent')
    })

    it('should be ghost primary without a border', () => {
      render(
        <Button variant="ghost" color="primary">
          Label
        </Button>,
      )
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-brand-500', 'bg-transparent')
      expect(button).not.toHaveClass('border')
    })
  })

  describe('color', () => {
    it('should be solid primary', () => {
      render(
        <Button variant="solid" color="primary">
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('bg-brand-500')
    })

    it('should be solid neutral', () => {
      render(
        <Button variant="solid" color="neutral">
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('bg-neutral-900', 'text-white')
    })

    it('should be solid danger', () => {
      render(
        <Button variant="solid" color="danger">
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('bg-tart-orange-500', 'text-white')
    })

    it('should be outlined neutral', () => {
      render(
        <Button variant="outlined" color="neutral">
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('border-neutral-900', 'text-neutral-900')
    })

    it('should be outlined danger', () => {
      render(
        <Button variant="outlined" color="danger">
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass(
        'border-tart-orange-500',
        'text-tart-orange-500',
      )
    })

    it('should be ghost neutral', () => {
      render(
        <Button variant="ghost" color="neutral">
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('text-neutral-900')
    })

    it('should be ghost danger', () => {
      render(
        <Button variant="ghost" color="danger">
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('text-tart-orange-500')
    })
  })

  describe('sizing', () => {
    it('should be medium height by default for a text button', () => {
      render(<Button>Label</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-40', 'px-16', 'py-10')
    })

    it('should be small when size is sm', () => {
      render(<Button size="sm">Label</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-32', 'px-16', 'py-6')
    })

    it('should be large when size is lg', () => {
      render(<Button size="lg">Label</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-48', 'px-16', 'py-14')
    })

    it('should be a square icon-only button at the default size', () => {
      render(
        <Button leadingIcon="check" iconOnly>
          Label
        </Button>,
      )
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-40', 'w-40', 'p-12')
      expect(button.querySelectorAll('svg')).toHaveLength(1)
    })

    it('should be a small square icon-only button when size is sm', () => {
      render(
        <Button size="sm" leadingIcon="check" iconOnly>
          X
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('h-32', 'w-32', 'p-8')
    })

    it('should be a large square icon-only button when size is lg', () => {
      render(
        <Button size="lg" leadingIcon="check" iconOnly>
          X
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('h-48', 'w-48', 'p-16')
    })

    it('should be full width for a text button when fullWidth is true', () => {
      render(<Button fullWidth>Label</Button>)
      expect(screen.getByRole('button')).toHaveClass('h-40', 'w-full', 'px-16', 'py-10')
    })

    it('should be a fixed square icon-only button when fullWidth is true', () => {
      render(
        <Button fullWidth leadingIcon="check" iconOnly>
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('h-40', 'w-40', 'p-12')
    })
  })

  describe('disabled', () => {
    it('should be disabled when the disabled prop is true', () => {
      render(<Button disabled>Label</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('should be ignoring clicks when disabled', async () => {
      const handleClick = vi.fn()
      render(
        <Button disabled onClick={handleClick}>
          Label
        </Button>,
      )
      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('onClick', () => {
    it('should be calling onClick when activated', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Label</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('leadingIcon', () => {
    it('should be rendering leading and trailing icons for a text button', () => {
      render(
        <Button leadingIcon="check" trailingIcon="search">
          Label
        </Button>,
      )
      const button = screen.getByRole('button')
      expect(button.querySelectorAll('svg')).toHaveLength(2)
      expect(screen.getByText('Label')).toBeInTheDocument()
    })

    it('should be omitting icons when none are passed', () => {
      render(<Button>Label</Button>)
      expect(screen.getByRole('button').querySelectorAll('svg')).toHaveLength(0)
    })

    it('should be rendering only the leading icon when iconOnly', () => {
      render(<Button leadingIcon="check" iconOnly />)
      expect(screen.getByRole('button').querySelectorAll('svg')).toHaveLength(1)
    })
  })

  describe('trailingIcon', () => {
    it('should be rendering a trailing icon for a text button', () => {
      render(<Button trailingIcon="search">Label</Button>)
      expect(screen.getByRole('button').querySelectorAll('svg')).toHaveLength(1)
      expect(screen.getByText('Label')).toBeInTheDocument()
    })

    it('should be omitting a trailing icon when not passed', () => {
      render(<Button>Label</Button>)
      expect(screen.getByRole('button').querySelectorAll('svg')).toHaveLength(0)
    })

    it('should be ignoring trailing icon when iconOnly', () => {
      render(<Button trailingIcon="search" iconOnly />)
      expect(screen.getByRole('button').querySelectorAll('svg')).toHaveLength(0)
    })

    it('should be rendering only the leading icon when iconOnly with both icon props', () => {
      render(<Button leadingIcon="check" trailingIcon="search" iconOnly />)
      expect(screen.getByRole('button').querySelectorAll('svg')).toHaveLength(1)
    })
  })

  describe('iconOnly', () => {
    it('should be omitting visible label text when iconOnly', () => {
      render(
        <Button leadingIcon="check" iconOnly>
          Hidden text
        </Button>,
      )
      expect(screen.queryByText('Hidden text')).not.toBeInTheDocument()
    })

    it('should be an empty control when iconOnly and no icons', () => {
      render(<Button iconOnly>Hidden</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toBeEmptyDOMElement()
    })

    it('should be rendering two icons in text mode when both are set', () => {
      render(
        <Button leadingIcon="check" trailingIcon="search">
          Label
        </Button>,
      )
      const button = screen.getByRole('button')
      expect(button.querySelectorAll('svg')).toHaveLength(2)
      expect(screen.getByText('Label')).toBeInTheDocument()
    })
  })

  describe('re-renders', () => {
    it('should be keeping solid primary styles after identical rerenders', () => {
      const { rerender } = render(
        <Button variant="solid" color="primary" disabled={false} iconOnly={false}>
          Label
        </Button>,
      )
      rerender(
        <Button variant="solid" color="primary" disabled={false} iconOnly={false}>
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('bg-brand-500')
    })

    it('should be keeping icons after identical rerenders', () => {
      const { rerender } = render(
        <Button leadingIcon="check" trailingIcon="search">
          Label
        </Button>,
      )
      rerender(
        <Button leadingIcon="check" trailingIcon="search">
          Label
        </Button>,
      )
      expect(screen.getByRole('button').querySelectorAll('svg')).toHaveLength(2)
    })

    it('should be keeping a single leading icon after identical rerenders in iconOnly mode', () => {
      const { rerender } = render(<Button leadingIcon="check" iconOnly />)
      rerender(<Button leadingIcon="check" iconOnly />)
      expect(screen.getByRole('button').querySelectorAll('svg')).toHaveLength(1)
    })

    it('should be updating styles when variant props change', () => {
      const { rerender } = render(
        <Button variant="solid" color="primary">
          Label
        </Button>,
      )
      rerender(
        <Button variant="outlined" color="neutral">
          Label
        </Button>,
      )
      rerender(
        <Button variant="outlined" color="neutral">
          Label
        </Button>,
      )
      expect(screen.getByRole('button')).toHaveClass('border-neutral-900')
    })

    it('should be remaining enabled after identical rerenders with disabled false', () => {
      const { rerender } = render(<Button disabled={false}>Label</Button>)
      rerender(<Button disabled={false}>Label</Button>)
      expect(screen.getByRole('button')).not.toBeDisabled()
    })
  })
})

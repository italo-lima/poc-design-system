import { render, h, describe, it, expect, vi } from '@stencil/vitest'

// Importing the source triggers the on-the-fly compile + customElements.define()
import '../button'

const getButton = (root: HTMLElement) => root.shadowRoot.querySelector('button')

describe('ds-button', () => {
  describe('rendering', () => {
    it('renders with default props and is not disabled', async () => {
      const { root } = await render(<ds-button>Click me</ds-button>)
      const button = getButton(root)
      expect(button).not.toBeNull()
      expect(button.hasAttribute('disabled')).toBe(false)
    })

    it('renders its label text via the slot', async () => {
      const { root } = await render(<ds-button>Save changes</ds-button>)
      expect(root.textContent).toContain('Save changes')
    })

    it('merges the consumer customClass', async () => {
      const { root } = await render(<ds-button custom-class="custom-class">Label</ds-button>)
      expect(getButton(root).className).toContain('custom-class')
    })
  })

  describe('variant', () => {
    it('is solid primary by default', async () => {
      const { root } = await render(<ds-button>Label</ds-button>)
      expect(getButton(root).className).toContain('bg-brand-500')
    })

    it('is solid primary when variant and color are set explicitly', async () => {
      const { root } = await render(
        <ds-button variant="solid" color="primary">
          Label
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('bg-brand-500')
      expect(button.className).toContain('text-brand-1000')
    })

    it('is outlined primary with border and transparent fill', async () => {
      const { root } = await render(
        <ds-button variant="outlined" color="primary">
          Label
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('border')
      expect(button.className).toContain('border-brand-500')
      expect(button.className).toContain('text-brand-500')
      expect(button.className).toContain('bg-transparent')
    })

    it('is ghost primary without a border', async () => {
      const { root } = await render(
        <ds-button variant="ghost" color="primary">
          Label
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('text-brand-500')
      expect(button.className).toContain('bg-transparent')
      expect(button.classList.contains('border')).toBe(false)
    })
  })

  describe('color', () => {
    it('is solid neutral', async () => {
      const { root } = await render(
        <ds-button variant="solid" color="neutral">
          Label
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('bg-neutral-900')
      expect(button.className).toContain('text-white')
    })

    it('is solid danger', async () => {
      const { root } = await render(
        <ds-button variant="solid" color="danger">
          Label
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('bg-tart-orange-500')
      expect(button.className).toContain('text-white')
    })

    it('is outlined neutral', async () => {
      const { root } = await render(
        <ds-button variant="outlined" color="neutral">
          Label
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('border-neutral-900')
      expect(button.className).toContain('text-neutral-900')
    })

    it('is outlined danger', async () => {
      const { root } = await render(
        <ds-button variant="outlined" color="danger">
          Label
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('border-tart-orange-500')
      expect(button.className).toContain('text-tart-orange-500')
    })

    it('is ghost neutral', async () => {
      const { root } = await render(
        <ds-button variant="ghost" color="neutral">
          Label
        </ds-button>,
      )
      expect(getButton(root).className).toContain('text-neutral-900')
    })

    it('is ghost danger', async () => {
      const { root } = await render(
        <ds-button variant="ghost" color="danger">
          Label
        </ds-button>,
      )
      expect(getButton(root).className).toContain('text-tart-orange-500')
    })
  })

  describe('sizing', () => {
    it('is medium height by default for a text button', async () => {
      const { root } = await render(<ds-button>Label</ds-button>)
      const button = getButton(root)
      expect(button.className).toContain('h-40')
      expect(button.className).toContain('px-16')
      expect(button.className).toContain('py-10')
    })

    it('is small when size is sm', async () => {
      const { root } = await render(<ds-button size="sm">Label</ds-button>)
      const button = getButton(root)
      expect(button.className).toContain('h-32')
      expect(button.className).toContain('px-16')
      expect(button.className).toContain('py-6')
    })

    it('is large when size is lg', async () => {
      const { root } = await render(<ds-button size="lg">Label</ds-button>)
      const button = getButton(root)
      expect(button.className).toContain('h-48')
      expect(button.className).toContain('px-16')
      expect(button.className).toContain('py-14')
    })

    it('is a square icon-only button at the default size', async () => {
      const { root } = await render(
        <ds-button leading-icon="check" icon-only>
          Label
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('h-40')
      expect(button.className).toContain('w-40')
      expect(button.className).toContain('p-12')
      expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(1)
    })

    it('is a small square icon-only button when size is sm', async () => {
      const { root } = await render(
        <ds-button size="sm" leading-icon="check" icon-only>
          X
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('h-32')
      expect(button.className).toContain('w-32')
      expect(button.className).toContain('p-8')
    })

    it('is a large square icon-only button when size is lg', async () => {
      const { root } = await render(
        <ds-button size="lg" leading-icon="check" icon-only>
          X
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('h-48')
      expect(button.className).toContain('w-48')
      expect(button.className).toContain('p-16')
    })

    it('is full width for a text button when fullWidth is true', async () => {
      const { root } = await render(<ds-button full-width>Label</ds-button>)
      const button = getButton(root)
      expect(button.className).toContain('h-40')
      expect(button.className).toContain('w-full')
      expect(button.className).toContain('px-16')
      expect(button.className).toContain('py-10')
    })

    it('is a fixed square icon-only button when fullWidth is true', async () => {
      const { root } = await render(
        <ds-button full-width leading-icon="check" icon-only>
          Label
        </ds-button>,
      )
      const button = getButton(root)
      expect(button.className).toContain('h-40')
      expect(button.className).toContain('w-40')
      expect(button.className).toContain('p-12')
    })
  })

  describe('disabled', () => {
    it('is disabled when the disabled prop is true', async () => {
      const { root } = await render(<ds-button disabled>Label</ds-button>)
      expect(getButton(root).hasAttribute('disabled')).toBe(true)
    })

    it('does not emit dsClick when disabled', async () => {
      const { root } = await render(<ds-button disabled>Label</ds-button>)
      const handler = vi.fn()
      root.addEventListener('dsClick', handler)
      getButton(root).click()
      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('dsClick', () => {
    it('emits dsClick when activated', async () => {
      const { root } = await render(<ds-button>Label</ds-button>)
      const handler = vi.fn()
      root.addEventListener('dsClick', handler)
      getButton(root).click()
      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe('leadingIcon', () => {
    it('renders leading and trailing icons for a text button', async () => {
      const { root } = await render(
        <ds-button leading-icon="check" trailing-icon="search">
          Label
        </ds-button>,
      )
      expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(2)
      expect(root.textContent).toContain('Label')
    })

    it('omits icons when none are passed', async () => {
      const { root } = await render(<ds-button>Label</ds-button>)
      expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(0)
    })

    it('renders only the leading icon when iconOnly', async () => {
      const { root } = await render(<ds-button leading-icon="check" icon-only />)
      expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(1)
    })
  })

  describe('trailingIcon', () => {
    it('renders a trailing icon for a text button', async () => {
      const { root } = await render(<ds-button trailing-icon="search">Label</ds-button>)
      expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(1)
      expect(root.textContent).toContain('Label')
    })

    it('omits a trailing icon when not passed', async () => {
      const { root } = await render(<ds-button>Label</ds-button>)
      expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(0)
    })

    it('ignores the trailing icon when iconOnly', async () => {
      const { root } = await render(<ds-button trailing-icon="search" icon-only />)
      expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(0)
    })

    it('renders only the leading icon when iconOnly with both icon props', async () => {
      const { root } = await render(
        <ds-button leading-icon="check" trailing-icon="search" icon-only />,
      )
      expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(1)
    })
  })

  describe('iconOnly', () => {
    it('omits the visible label slot when iconOnly', async () => {
      const { root } = await render(
        <ds-button leading-icon="check" icon-only>
          Hidden text
        </ds-button>,
      )
      expect(root.shadowRoot.querySelector('slot')).toBeNull()
    })

    it('renders no slot or icons when iconOnly and no icons', async () => {
      const { root } = await render(<ds-button icon-only>Hidden</ds-button>)
      const button = getButton(root)
      expect(button).not.toBeNull()
      expect(root.shadowRoot.querySelector('slot')).toBeNull()
      expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(0)
    })

    it('renders two icons in text mode when both are set', async () => {
      const { root } = await render(
        <ds-button leading-icon="check" trailing-icon="search">
          Label
        </ds-button>,
      )
      expect(root.shadowRoot.querySelectorAll('svg')).toHaveLength(2)
      expect(root.textContent).toContain('Label')
    })
  })
})

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

// Custom elements registrados globalmente em .storybook/preview.ts
// (import '../dist/components'). Não importar o fonte .tsx aqui — puxaria os
// decorators do @stencil/core para o bundle do Storybook.

interface AccordionGroupArgs {
  darkMode: boolean
  hasBackground: boolean
  hasBorder: boolean
}

const LOREM = 'Lorem ipsum dolor sit amet consectetur. Sit sed dui egestas diam elit mi aenean.'

const meta: Meta<AccordionGroupArgs> = {
  title: 'Components/AccordionGroup',
  component: 'ds-accordion-group',
  tags: ['autodocs'],
  argTypes: {
    darkMode: {
      description: 'Flag para dark mode.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    hasBackground: {
      description: 'Aplica cor de fundo ao container do grupo.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    hasBorder: {
      description: 'Aplica borda e border-radius ao container do grupo.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
}

export default meta

type Story = StoryObj<AccordionGroupArgs>

const renderGroup = (args: AccordionGroupArgs) => html`
  <div class=${`h-full w-full flex ${args.darkMode ? 'bg-black' : 'bg-white'}`}>
    <div class="w-320 xs:p-8 md:p-16 lg:p-28">
      <ds-accordion-group
        ?dark-mode=${args.darkMode}
        ?has-background=${args.hasBackground}
        ?has-border=${args.hasBorder}
      >
        <ds-accordion title="Title 1" ?dark-mode=${args.darkMode}>${LOREM}</ds-accordion>
        <ds-accordion title="Title 2" ?dark-mode=${args.darkMode}>${LOREM}</ds-accordion>
        <ds-accordion title="Title 3" ?dark-mode=${args.darkMode}>${LOREM}</ds-accordion>
      </ds-accordion-group>
    </div>
  </div>
`

export const GeneralStory: Story = {
  name: 'General',
  args: {
    darkMode: true,
    hasBackground: false,
    hasBorder: false,
  },
  argTypes: {
    darkMode: { control: false },
  },
  render: renderGroup,
}

export const WithBackgroundStory: Story = {
  name: 'Background',
  args: {
    darkMode: true,
    hasBackground: true,
    hasBorder: false,
  },
  argTypes: {
    darkMode: { control: false },
  },
  render: renderGroup,
}

export const WithBorderStory: Story = {
  name: 'Border',
  args: {
    darkMode: true,
    hasBackground: false,
    hasBorder: true,
  },
  argTypes: {
    darkMode: { control: false },
  },
  render: renderGroup,
}

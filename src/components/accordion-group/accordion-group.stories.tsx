import type { Meta, StoryObj } from '@storybook/react-vite'
import { DsAccordionGroup, DsAccordion } from '@ds/react'

interface AccordionGroupArgs {
  darkMode: boolean
  hasBackground: boolean
  hasBorder: boolean
}

const LOREM = 'Lorem ipsum dolor sit amet consectetur. Sit sed dui egestas diam elit mi aenean.'

const meta: Meta<AccordionGroupArgs> = {
  title: 'Components/AccordionGroup',
  component: DsAccordionGroup,
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

const renderGroup = (args: AccordionGroupArgs) => (
  <div className={`h-full w-full flex ${args.darkMode ? 'bg-black text-white' : 'bg-white text-neutral-900'}`}>
    <div className="w-320 xs:p-8 md:p-16 lg:p-28">
      <DsAccordionGroup
        darkMode={args.darkMode}
        hasBackground={args.hasBackground}
        hasBorder={args.hasBorder}
      >
        <DsAccordion title="Title 1" darkMode={args.darkMode}>{LOREM}</DsAccordion>
        <DsAccordion title="Title 2" darkMode={args.darkMode}>{LOREM}</DsAccordion>
        <DsAccordion title="Title 3" darkMode={args.darkMode}>{LOREM}</DsAccordion>
      </DsAccordionGroup>
    </div>
  </div>
)

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

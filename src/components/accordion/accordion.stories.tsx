import type { Meta, StoryObj } from '@storybook/react-vite'
import { DsAccordion } from '@ds/react'
import type { AccordionAlignment } from './accordion'

interface AccordionArgs {
  title: string
  alignment: AccordionAlignment
  disabled: boolean
  defaultOpen: boolean
  readOnly: boolean
  darkMode: boolean
  content: string
}

const LOREM = 'Lorem ipsum dolor sit amet consectetur. Sit sed dui egestas diam elit mi aenean.'

const meta: Meta<AccordionArgs> = {
  title: 'Components/Accordion',
  component: DsAccordion,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Texto exibido no cabeçalho do accordion.',
      type: { name: 'string', required: true },
      control: 'text',
    },
    alignment: {
      description: 'Alinhamento e padding do accordion.',
      type: { name: 'string', required: false },
      options: ['left', 'flush'],
      control: 'radio',
      table: { defaultValue: { summary: 'left' } },
    },
    disabled: {
      description: 'Desabilita a interação com o accordion.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    defaultOpen: {
      description: 'Define se o accordion inicia aberto.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
      description: 'Flag para read only.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    darkMode: {
      description: 'Flag para dark mode.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    content: {
      description: 'Conteúdo exibido no corpo do accordion (slot).',
      type: { name: 'string', required: false },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<AccordionArgs>

const renderAccordion = (args: AccordionArgs) => (
  <div className={`${args.darkMode ? 'bg-black text-white' : 'bg-white text-neutral-900'} h-full w-full`}>
    <div className="w-280 flex flex-col xs:p-8 md:p-16 lg:p-28 gap-4">
      <DsAccordion
        title={args.title}
        alignment={args.alignment}
        disabled={args.disabled}
        defaultOpen={args.defaultOpen}
        readOnly={args.readOnly}
        darkMode={args.darkMode}
      >
        {args.content}
      </DsAccordion>
    </div>
  </div>
)

export const GeneralStory: Story = {
  name: 'General',
  args: {
    title: 'Title',
    alignment: 'left',
    disabled: false,
    defaultOpen: false,
    readOnly: false,
    darkMode: true,
    content: LOREM,
  },
  render: renderAccordion,
}

export const DefaultOpen: Story = {
  name: 'Default Open',
  args: {
    ...GeneralStory.args,
    defaultOpen: true,
  } as AccordionArgs,
  render: renderAccordion,
}

export const DisabledStory: Story = {
  name: 'Disabled',
  args: {
    ...GeneralStory.args,
    disabled: true,
  } as AccordionArgs,
  render: renderAccordion,
}

export const FlushStory: Story = {
  name: 'Flush',
  args: {
    ...GeneralStory.args,
    alignment: 'flush',
  } as AccordionArgs,
  render: renderAccordion,
}

export const ReadOnlyStory: Story = {
  name: 'Read Only',
  args: {
    ...GeneralStory.args,
    readOnly: true,
  } as AccordionArgs,
  render: renderAccordion,
}

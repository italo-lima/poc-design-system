import type { Meta, StoryObj } from '@storybook/react-vite'
import { DsPopover } from '@ds/react'
import type { PopoverPlacement } from './popover'

interface PopoverArgs {
  placement: PopoverPlacement
  title: string
  darkMode: boolean
  body?: string
}

const meta: Meta<PopoverArgs> = {
  title: 'Components/Popover',
  component: DsPopover,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      description: 'Posição da seta em relação ao painel. `default` não exibe seta.',
      type: { name: 'string', required: false },
      options: ['default', 'left', 'top', 'bottom', 'right'],
      control: 'radio',
      table: { defaultValue: { summary: 'default' } },
    },
    title: {
      description: 'Título em destaque no topo do popover.',
      type: { name: 'string', required: true },
      control: 'text',
    },
    darkMode: {
      description: 'Tema do painel e da seta (escuro ou claro).',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    body: {
      description: 'Conteúdo complementar abaixo do título (slot).',
      type: { name: 'string', required: false },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<PopoverArgs>

export const GeneralStory: Story = {
  name: 'General',
  args: {
    placement: 'default',
    title: 'Title',
    darkMode: true,
    body: 'Content',
  },
  render: (args) => (
    <div className="bg-neutral-700 h-full w-full">
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-20 gap-y-32 px-24 py-32">
        <DsPopover placement="left" title={args.title} darkMode={args.darkMode}>
          {args.body}
        </DsPopover>
        <DsPopover placement="top" title={args.title} darkMode={args.darkMode}>
          {args.body}
        </DsPopover>
        <DsPopover placement="default" title={args.title} darkMode={args.darkMode}>
          {args.body}
        </DsPopover>
        <DsPopover placement="bottom" title={args.title} darkMode={args.darkMode}>
          {args.body}
        </DsPopover>
        <DsPopover placement="right" title={args.title} darkMode={args.darkMode}>
          {args.body}
        </DsPopover>
      </div>
    </div>
  ),
}

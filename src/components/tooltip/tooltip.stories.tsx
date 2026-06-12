import type { Meta, StoryObj } from '@storybook/react-vite'
import { DsTooltip } from '@ds/react'
import type { TooltipPlacement } from './tooltip'

interface TooltipArgs {
  placement: TooltipPlacement
  darkMode: boolean
  content: string
}

const meta: Meta<TooltipArgs> = {
  title: 'Components/Tooltip',
  component: DsTooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      description: 'Posição da seta. `default` não renderiza seta.',
      type: { name: 'string', required: false },
      options: ['default', 'left', 'top', 'bottom', 'right'],
      control: 'radio',
      table: { defaultValue: { summary: 'default' } },
    },
    darkMode: {
      description: 'Tema. Quando `true` usa painel escuro, quando `false` usa painel claro.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    content: {
      description: 'Conteúdo complementar exibido no tooltip (slot).',
      type: { name: 'string', required: true },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<TooltipArgs>

export const GeneralStory: Story = {
  name: 'General',
  args: {
    placement: 'default',
    darkMode: true,
    content: 'Texto de ajuda curto para o usuário.',
  },
  render: (args) => (
    <div className="bg-neutral-700 h-full w-full">
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-20 gap-y-32 px-24 py-32">
        <DsTooltip placement="left" darkMode={args.darkMode}>
          {args.content}
        </DsTooltip>
        <DsTooltip placement="top" darkMode={args.darkMode}>
          {args.content}
        </DsTooltip>
        <DsTooltip placement="default" darkMode={args.darkMode}>
          {args.content}
        </DsTooltip>
        <DsTooltip placement="bottom" darkMode={args.darkMode}>
          {args.content}
        </DsTooltip>
        <DsTooltip placement="right" darkMode={args.darkMode}>
          {args.content}
        </DsTooltip>
      </div>
    </div>
  ),
}

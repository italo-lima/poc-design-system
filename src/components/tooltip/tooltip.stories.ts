import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import type { TooltipPlacement } from './tooltip'

interface TooltipArgs {
  placement: TooltipPlacement
  darkMode: boolean
  content: string
}

const meta: Meta<TooltipArgs> = {
  title: 'Components/Tooltip',
  component: 'ds-tooltip',
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
  render: (args) => html`
    <div class="bg-neutral-700 h-full w-full">
      <div class="flex flex-row flex-wrap items-center justify-center gap-x-20 gap-y-32 px-24 py-32">
        <ds-tooltip placement="left" ?dark-mode=${args.darkMode}>${args.content}</ds-tooltip>
        <ds-tooltip placement="top" ?dark-mode=${args.darkMode}>${args.content}</ds-tooltip>
        <ds-tooltip placement="default" ?dark-mode=${args.darkMode}>${args.content}</ds-tooltip>
        <ds-tooltip placement="bottom" ?dark-mode=${args.darkMode}>${args.content}</ds-tooltip>
        <ds-tooltip placement="right" ?dark-mode=${args.darkMode}>${args.content}</ds-tooltip>
      </div>
    </div>
  `,
}

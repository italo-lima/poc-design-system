import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import type { BadgeVariant } from './badge'

interface BadgeArgs {
  variant: BadgeVariant
  count?: number
}

const meta: Meta<BadgeArgs> = {
  title: 'Components/Badge',
  component: 'ds-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Define a variante de cor do badge.',
      type: { name: 'string', required: false },
      options: ['primary', 'danger', 'accent', 'secondary', 'critical', 'info', 'success'],
      control: 'radio',
      table: { defaultValue: { summary: 'primary' } },
    },
    count: {
      description:
        'Número exibido no badge. Valores ≥ 1000 são exibidos como "999+". Quando ausente, exibe um ponto de 8px.',
      type: { name: 'number', required: false },
      control: 'number',
    },
  },
}

export default meta

type Story = StoryObj<BadgeArgs>

export const GeneralStory: Story = {
  name: 'General',
  args: {
    variant: 'primary',
    count: 1000,
  },
  render: (args) => html`
    <div class="bg-neutral-900 h-full w-full p-28 flex flex-col gap-16">
      <div class="flex items-center gap-16">
        <ds-badge variant=${args.variant} count=${args.count}></ds-badge>
      </div>
    </div>
  `,
}

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'

interface AvatarGroupArgs {
  max: number
  darkMode: boolean
}

const meta: Meta<AvatarGroupArgs> = {
  title: 'Components/AvatarGroup',
  component: 'ds-avatar-group',
  tags: ['autodocs'],
  argTypes: {
    max: {
      description:
        'Número máximo de avatares visíveis antes de exibir o indicador de excedente (+N).',
      type: { name: 'number', required: false },
      control: 'number',
      table: { defaultValue: { summary: '5' } },
    },
    darkMode: {
      description: 'Flag para dark mode.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
  },
}

export default meta

type Story = StoryObj<AvatarGroupArgs>

export const GeneralStory: Story = {
  name: 'General',
  args: {
    max: 5,
    darkMode: true,
  },
  render: (args) => html`
    <div class="bg-neutral-900 h-full w-full p-28">
      <ds-avatar-group max=${args.max} ?dark-mode=${args.darkMode}>
        <ds-avatar type="image" src="/avatar.png" alt="User 1"></ds-avatar>
        <ds-avatar type="initials" initials="CR"></ds-avatar>
        <ds-avatar type="initials" initials="MK"></ds-avatar>
        <ds-avatar type="icon" icon="user"></ds-avatar>
        <ds-avatar type="initials" initials="AB"></ds-avatar>
      </ds-avatar-group>
    </div>
  `,
}

export const OverflowStory: Story = {
  name: 'Overflow',
  args: {
    max: 5,
    darkMode: true,
  },
  render: (args) => html`
    <div class="bg-neutral-900 h-full w-full p-28">
      <ds-avatar-group max=${args.max} ?dark-mode=${args.darkMode}>
        <ds-avatar type="image" src="/avatar.png" alt="User 1"></ds-avatar>
        <ds-avatar type="initials" initials="CR"></ds-avatar>
        <ds-avatar type="initials" initials="MK"></ds-avatar>
        <ds-avatar type="icon" icon="user"></ds-avatar>
        <ds-avatar type="initials" initials="AB"></ds-avatar>
        <ds-avatar type="initials" initials="PL"></ds-avatar>
        <ds-avatar type="icon" icon="user"></ds-avatar>
        <ds-avatar type="initials" initials="ZX"></ds-avatar>
      </ds-avatar-group>
    </div>
  `,
}

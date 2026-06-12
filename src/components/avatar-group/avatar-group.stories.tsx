import type { Meta, StoryObj } from '@storybook/react-vite'
import { DsAvatarGroup, DsAvatar } from '@ds/react'

interface AvatarGroupArgs {
  max: number
  darkMode: boolean
}

const meta: Meta<AvatarGroupArgs> = {
  title: 'Components/AvatarGroup',
  component: DsAvatarGroup,
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
  render: (args) => (
    <div
      className={`${args.darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} h-full w-full p-28`}
    >
      <DsAvatarGroup max={args.max} darkMode={args.darkMode}>
        <DsAvatar type="image" src="/avatar.png" alt="User 1" />
        <DsAvatar type="initials" initials="CR" />
        <DsAvatar type="initials" initials="MK" />
        <DsAvatar type="icon" icon="user" />
        <DsAvatar type="initials" initials="AB" />
      </DsAvatarGroup>
    </div>
  ),
}

export const OverflowStory: Story = {
  name: 'Overflow',
  args: {
    max: 5,
    darkMode: true,
  },
  render: (args) => (
    <div
      className={`${args.darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} h-full w-full p-28`}
    >
      <DsAvatarGroup max={args.max} darkMode={args.darkMode}>
        <DsAvatar type="image" src="/avatar.png" alt="User 1" />
        <DsAvatar type="initials" initials="CR" />
        <DsAvatar type="initials" initials="MK" />
        <DsAvatar type="icon" icon="user" />
        <DsAvatar type="initials" initials="AB" />
        <DsAvatar type="initials" initials="PL" />
        <DsAvatar type="icon" icon="user" />
        <DsAvatar type="initials" initials="ZX" />
      </DsAvatarGroup>
    </div>
  ),
}

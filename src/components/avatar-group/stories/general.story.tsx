import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'
import { AvatarGroup, type AvatarGroupProps } from '../AvatarGroup'
import { Avatar } from '../../avatar/Avatar'

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
  argTypes,
}

export default meta

type Story = StoryObj<typeof AvatarGroup>

const generalArgs: Omit<AvatarGroupProps, 'children'> = {
  darkMode: true,
  max: 5,
}

const generalArgTypes = {
  darkMode: { control: false },
} as const

export const GeneralStory: Story = {
  name: 'General',
  args: generalArgs,
  argTypes: generalArgTypes,
  render: (args) => (
    <div className="bg-neutral-900 h-full w-full p-28">
      <AvatarGroup {...args}>
        <Avatar type="image" src="/avatar.png" alt="User 1" />
        <Avatar type="initials" initials="CR" />
        <Avatar type="initials" initials="MK" />
        <Avatar type="icon" icon="user" />
        <Avatar type="initials" initials="AB" />
      </AvatarGroup>
    </div>
  ),
}

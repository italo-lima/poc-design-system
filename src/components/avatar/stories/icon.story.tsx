import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'
import { Avatar, type AvatarProps } from '../Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
  argTypes,
}

export default meta

type Story = StoryObj<typeof Avatar>

const iconArgs: AvatarProps = {
  darkMode: true,
  type: 'icon',
  icon: 'user-round',
}

const iconArgTypes = {
  darkMode: { control: false },
  type: { control: false },
  rounded: { control: false },
} as const

export const IconsStory: Story = {
  name: 'Icons',
  args: iconArgs,
  argTypes: iconArgTypes,
  render: (args) => {
    const containerClassName = cn('flex flex-row flex-wrap xs:p-8 md:p-16 lg:p-28 gap-16')

    return (
      <div className="bg-neutral-900 h-full w-full">
        <div className={containerClassName}>
          <Avatar {...args} rounded />
          <Avatar {...args} rounded={false} />
        </div>
      </div>
    )
  },
}

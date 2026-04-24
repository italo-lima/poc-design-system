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

const imageArgs: AvatarProps = {
  darkMode: true,
  type: 'image',
  alt: 'Avatar do usuário',
  src: '/avatar.png',
}

const imageArgTypes = {
  darkMode: { control: false },
  type: { control: false },
  rounded: { control: false },
} as const

export const ImageStory: Story = {
  name: 'Image',
  args: imageArgs,
  argTypes: imageArgTypes,
  render: (args) => {
    const containerClassName = cn('flex flex-row xs:p-8 md:p-16 lg:p-28 gap-16')

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

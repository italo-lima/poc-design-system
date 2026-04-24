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

const generalArgs: AvatarProps = {
  darkMode: true,
}

const generalArgTypes = {
  darkMode: { control: false },
} as const

export const GeneralStory: Story = {
  name: 'General',
  args: generalArgs,
  argTypes: generalArgTypes,
  render: (args) => {
    const containerClassName = cn('flex flex-row xs:p-8 md:p-16 lg:p-28 gap-16 flex-wrap')

    return (
      <div className="bg-neutral-900 h-full w-full">
        <div className={containerClassName}>
          <Avatar {...args} />
        </div>
      </div>
    )
  },
}

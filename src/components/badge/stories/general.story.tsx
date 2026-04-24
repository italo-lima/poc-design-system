import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'
import { Badge, type BadgeProps } from '../Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
  argTypes,
}

export default meta

type Story = StoryObj<typeof Badge>

const generalArgs: BadgeProps = {
  darkMode: true,
  count: 1000,
}

const generalArgTypes = {
  darkMode: { control: false },
} as const

export const GeneralStory: Story = {
  name: 'General',
  args: generalArgs,
  argTypes: generalArgTypes,
  render: (args) => {
    return (
      <div className="bg-neutral-900 h-full w-full p-28 flex flex-col gap-16">
        <div className="flex items-center gap-16">
          <Badge {...args} />
        </div>
      </div>
    )
  },
}

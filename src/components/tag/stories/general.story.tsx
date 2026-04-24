import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, type TagProps } from '../Tag'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
  argTypes,
}

export default meta

type Story = StoryObj<typeof Tag>

const generalArgs: TagProps = {
  format: 'squared',
  size: 'medium',
  surface: 'solid',
  variant: 'primary',
  text: 'Tag',
  leadingIcon: 'user',
  trailingIcon: 'x',
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
      <div className="h-full w-full bg-neutral-900 p-24">
        <Tag {...args}>{args.text}</Tag>
      </div>
    )
  },
}

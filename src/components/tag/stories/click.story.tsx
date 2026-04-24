import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, type TagProps } from '../Tag'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'
import { useState } from 'react'

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

const clickArgs: TagProps = {
  format: 'squared',
  size: 'medium',
  surface: 'solid',
  variant: 'primary',
  text: 'Tag',
  leadingIcon: 'user',
  trailingIcon: 'x',
}

const clickArgTypes = {
  darkMode: { control: false },
} as const

export const ClickStory: Story = {
  name: 'Click',
  args: clickArgs,
  argTypes: clickArgTypes,
  render: (args) => {
    const [clicked, setClicked] = useState(false)
    return (
      <div className="min-h-svh w-full bg-neutral-900 p-24">
        <div className="flex items-center gap-16">
          <Tag {...args} onTrailingClick={() => setClicked(true)}>
            {args.text}
          </Tag>
          {clicked && <p className="text-white text-2xl">Tag foi clicado</p>}
        </div>
      </div>
    )
  },
}

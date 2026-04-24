import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'
import { EmptyState, type EmptyStateProps } from '../EmptyState'
import { useState } from 'react'

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Empty State',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes,
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
}

export default meta

type Story = StoryObj<typeof EmptyState>

const clickArgs: EmptyStateProps = {
  variant: 'icon',
  icon: 'arrow-right',
  title: 'Empty state title',
  description: 'The quick brown fox jumps over the lazy dog.',
  actionLabel: 'Button',
}

export const ClickStory: Story = {
  name: 'Click',
  args: clickArgs,
  render: (args) => {
    const [clicked, setClicked] = useState(false)

    return (
      <div className="bg-neutral-900 flex flex-col items-center justify-center h-full p-40">
        <EmptyState {...args} actionOnClick={() => setClicked(true)} />
        {clicked && <p className="text-white text-2xl">Button clicked</p>}
      </div>
    )
  },
}

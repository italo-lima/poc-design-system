import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'
import { EmptyState, type EmptyStateProps } from '../EmptyState'

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

const generalArgs: EmptyStateProps = {
  variant: 'icon',
  icon: 'search',
  title: 'Empty state title',
  description: 'The quick brown fox jumps over the lazy dog.',
  actionLabel: 'Button',
  actionOnClick: () => console.log('clicked'),
}

export const GeneralStory: Story = {
  name: 'General',
  args: generalArgs,
  render: (args) => (
    <div className="bg-neutral-900 flex items-center justify-center h-full p-40">
      <EmptyState {...args} />
    </div>
  ),
}

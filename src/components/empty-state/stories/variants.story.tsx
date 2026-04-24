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

const variantArgs: EmptyStateProps = {
  title: 'Empty state title',
  description: 'The quick brown fox jumps over the lazy dog.',
  actionLabel: 'Button',
  actionOnClick: () => console.log('clicked'),
}

const variantArgTypes = {
  variant: { control: false },
} as const

export const VariantsStory: Story = {
  name: 'Variants',
  args: variantArgs,
  argTypes: variantArgTypes,
  render: (args) => (
    <div className="bg-neutral-900 flex items-center justify-center gap-40 flex-wrap p-40">
      <EmptyState {...args} variant="icon" icon="search" />
      <EmptyState {...args} variant="informative" />
      <EmptyState {...args} variant="warning" />
      <EmptyState {...args} variant="critical" />
      <EmptyState {...args} variant="success" />
    </div>
  ),
}

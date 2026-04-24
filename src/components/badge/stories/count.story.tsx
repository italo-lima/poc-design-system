import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'
import { Badge, type BadgeProps, type BadgeVariant } from '../Badge'

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

const countArgs: BadgeProps = {
  darkMode: true,
  count: 1000,
}

const countArgTypes = {
  darkMode: { control: false },
  variant: { control: false },
} as const

const variants: BadgeVariant[] = [
  'primary',
  'danger',
  'accent',
  'secondary',
  'critical',
  'info',
  'success',
]

export const CountStory: Story = {
  name: 'Count',
  args: countArgs,
  argTypes: countArgTypes,
  render: (args) => {
    const containerClassName = cn('flex xs:p-8 md:p-16 lg:p-28 gap-16')

    return (
      <div className="bg-black h-full w-full">
        <div className={containerClassName}>
          {variants.map((variant) => (
            <Badge {...args} key={variant} variant={variant} />
          ))}
        </div>
      </div>
    )
  },
}

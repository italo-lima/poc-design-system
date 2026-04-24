import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { Button, type ButtonProps } from '../Button'
import { argTypes } from './configs/argTypes'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

const ghostArgs: ButtonProps = {
  darkMode: true,
  children: 'Button',
  size: 'md',
  fullWidth: false,
}

const ghostArgTypes = {
  ...argTypes,
  darkMode: { control: false },
  variant: { control: false },
  color: { control: false },
} as const

export const GhostStory: Story = {
  name: 'Ghost',
  args: ghostArgs,
  argTypes: ghostArgTypes,
  render: (args) => {
    const containerClassName = cn('flex xs:p-8 md:p-16 lg:p-28 gap-16')
    return (
      <div className="min-h-full w-full bg-neutral-700">
        <div className={containerClassName}>
          <Button {...args} color="primary" onClick={() => console.log('clicked color primary')} />
          <Button {...args} color="neutral" onClick={() => console.log('clicked color neutral')} />
          <Button {...args} color="danger" onClick={() => console.log('clicked color danger')} />
        </div>
      </div>
    )
  },
}

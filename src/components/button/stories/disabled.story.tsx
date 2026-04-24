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

const disabledArgs: ButtonProps = {
  darkMode: true,
  children: 'Button',
  disabled: true,
  size: 'md',
  fullWidth: false,
}

const disabledArgTypes = {
  ...argTypes,
  darkMode: { control: false },
} as const

export const DisabledStory: Story = {
  name: 'Disabled',
  args: disabledArgs,
  argTypes: disabledArgTypes,
  render: (args) => {
    const containerClassName = cn('flex xs:p-8 md:p-16 lg:p-28')
    return (
      <div className="min-h-full w-full bg-neutral-900">
        <div className={containerClassName}>
          <Button {...args} onClick={() => console.log('clicked')} />
        </div>
      </div>
    )
  },
}

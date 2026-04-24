import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, type ButtonProps } from '../Button'
import { argTypes } from './configs/argTypes'
import { DocumentationPage } from './configs/docs-pages'

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

const generalArgs: ButtonProps = {
  darkMode: true,
  children: 'Button',
  size: 'md',
  fullWidth: false,
}

const generalArgTypes = {
  ...argTypes,
  darkMode: { control: false },
} as const

export const GeneralStory: Story = {
  name: 'General',
  args: generalArgs,
  argTypes: generalArgTypes,
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

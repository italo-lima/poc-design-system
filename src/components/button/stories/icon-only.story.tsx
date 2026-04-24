import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { Button, type ButtonProps } from '../Button'

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

const iconOnlyArgs: ButtonProps = {
  darkMode: true,
  children: 'Button',
  iconOnly: true,
  leadingIcon: 'plus',
  size: 'lg',
}

const iconOnlyArgTypes = {
  darkMode: { control: false },
  trailingIcon: { control: false },
} as const

export const IconOnlyStory: Story = {
  name: 'Icon Only',
  args: iconOnlyArgs,
  argTypes: iconOnlyArgTypes,
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

import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { Alert, type AlertProps } from '../Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
}

export default meta

type Story = StoryObj<typeof Alert>

const generalArgs: AlertProps = {
  title: 'Title',
  subtitle: 'Lorem ipsum dolor sit amet consectetur',
  darkMode: true,
  closeType: 'icon',
}

const generalArgTypes = {
  darkMode: { control: false },
  closeType: { control: false },
} as const

export const IconStory: Story = {
  name: 'Icon',
  args: generalArgs,
  argTypes: generalArgTypes,
  render: (args) => {
    const containerClassName = cn('flex flex-col xs:p-8 md:p-16 lg:p-28 gap-16')

    return (
      <div className="bg-black h-full w-full">
        <div className={containerClassName}>
          <Alert {...args} variant="default" />
          <Alert {...args} variant="danger" />
          <Alert {...args} variant="info" />
          <Alert {...args} variant="success" />
        </div>
      </div>
    )
  },
}

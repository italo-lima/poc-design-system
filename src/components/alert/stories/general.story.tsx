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
}

const generalArgTypes = {
  darkMode: { control: false },
} as const

export const GeneralStory: Story = {
  name: 'General',
  args: generalArgs,
  argTypes: generalArgTypes,
  render: (args) => {
    const containerClassName = cn('flex flex-col xs:p-8 md:p-16 lg:p-28 gap-4')

    return (
      <div className="bg-black h-full w-full">
        <div className={containerClassName}>
          <Alert {...args} />
        </div>
      </div>
    )
  },
}

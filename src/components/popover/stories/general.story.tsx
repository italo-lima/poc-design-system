import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover, type PopoverProps } from '../Popover'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
  argTypes,
}

export default meta

type Story = StoryObj<typeof Popover>

const generalArgs: PopoverProps = {
  darkMode: true,
  placement: 'default',
  title: 'Title',
  children: 'Content',
}

const generalArgTypes = {
  darkMode: { control: false },
  placement: { control: false },
} as const

export const GeneralStory: Story = {
  name: 'General',
  args: generalArgs,
  argTypes: generalArgTypes,
  render: (args) => {
    const containerClassName = cn(
      'flex flex-row flex-wrap items-center justify-center gap-x-20 gap-y-32 px-24 py-32',
    )

    return (
      <div className="bg-neutral-700 h-full w-full">
        <div className={containerClassName}>
          <Popover {...args} placement="left" />
          <Popover {...args} placement="top" />
          <Popover {...args} placement="default" />
          <Popover {...args} placement="bottom" />
          <Popover {...args} placement="right" />
        </div>
      </div>
    )
  },
}

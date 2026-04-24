import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, type TooltipProps } from '../Tooltip'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
  argTypes,
}

export default meta

type Story = StoryObj<typeof Tooltip>

const generalArgs: TooltipProps = {
  darkMode: true,
  placement: 'default',
  children: 'Texto de ajuda curto para o usuário.',
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
    const rowClassName = cn(
      'flex flex-row flex-wrap items-center justify-center gap-x-20 gap-y-32 px-24 py-32',
    )

    return (
      <div className="bg-neutral-700 h-full w-full">
        <div className={rowClassName}>
          <Tooltip {...args} placement="left" />
          <Tooltip {...args} placement="top" />
          <Tooltip {...args} placement="default" />
          <Tooltip {...args} placement="bottom" />
          <Tooltip {...args} placement="right" />
        </div>
      </div>
    )
  },
}

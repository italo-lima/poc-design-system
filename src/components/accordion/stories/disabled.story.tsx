import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, type AccordionProps } from '../Accordion'
import { DocumentationPage } from './configs/docs-pages'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
}

export default meta

type Story = StoryObj<typeof Accordion>

const disabledArgs: AccordionProps = {
  title: 'Title',
  children: 'Lorem ipsum dolor sit amet consectetur. Sit sed dui egestas diam elit mi aenean.',
  darkMode: true,
  disabled: true,
}

const disabledArgTypes = {
  darkMode: { control: false },
} as const

export const DisabledStory: Story = {
  name: 'Disabled',
  args: disabledArgs,
  argTypes: disabledArgTypes,
  render: (args) => {
    const containerClassName = cn('flex flex-col w-280 xs:p-8 md:p-16 lg:p-28 gap-8')
    return (
      <div className="bg-black h-full w-full">
        <div className={containerClassName}>
          <h1 className="text-white pl-8">Default</h1>
          <Accordion {...args} />
          <h1 className="text-white mt-16 pl-8">Default Open</h1>
          <Accordion {...args} defaultOpen />
        </div>
      </div>
    )
  },
}

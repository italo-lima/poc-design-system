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

const defaultOpenArgs: AccordionProps = {
  title: 'Title',
  children: 'Lorem ipsum dolor sit amet consectetur. Sit sed dui egestas diam elit mi aenean.',
  darkMode: true,
  defaultOpen: true,
}

const defaultOpenArgTypes = {
  darkMode: { control: false },
} as const

export const DefaultOpen: Story = {
  args: defaultOpenArgs,
  argTypes: defaultOpenArgTypes,
  render: (args: AccordionProps) => {
    const containerClassName = cn('flex flex-col w-280 xs:p-8 md:p-16 lg:p-28 gap-4')

    return (
      <div className="bg-black h-full w-full">
        <div className={containerClassName}>
          <Accordion {...args} />
        </div>
      </div>
    )
  },
}

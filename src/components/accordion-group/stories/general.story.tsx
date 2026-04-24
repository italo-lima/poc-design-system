import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { AccordionGroup, type AccordionGroupProps } from '../AccordionGroup'
import { Accordion } from '../../accordion/Accordion'

const meta: Meta<typeof AccordionGroup> = {
  title: 'Components/AccordionGroup',
  component: AccordionGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
}

export default meta

type Story = StoryObj<typeof AccordionGroup>

const generalArgs: Omit<AccordionGroupProps, 'children'> = {
  darkMode: true,
  hasBackground: false,
  hasBorder: false,
}

const generalArgTypes = {
  darkMode: { control: false },
} as const

export const GeneralStory: Story = {
  name: 'General',
  args: generalArgs,
  argTypes: generalArgTypes,
  render: (args) => {
    const containerClassName = cn('w-320 xs:p-8 md:p-16 lg:p-28')
    return (
      <div className={cn('h-full w-full flex', args.darkMode ? 'bg-black' : 'bg-white')}>
        <div className={containerClassName}>
          <AccordionGroup {...args}>
            <Accordion title="Title 1" darkMode={args.darkMode}>
              Lorem ipsum dolor sit amet consectetur. Sit sed dui egestas diam elit mi aenean.
            </Accordion>
            <Accordion title="Title 2" darkMode={args.darkMode}>
              Lorem ipsum dolor sit amet consectetur. Sit sed dui egestas diam elit mi aenean.
            </Accordion>
            <Accordion title="Title 3" darkMode={args.darkMode}>
              Lorem ipsum dolor sit amet consectetur. Sit sed dui egestas diam elit mi aenean.
            </Accordion>
          </AccordionGroup>
        </div>
      </div>
    )
  },
}

import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { Breadcrumb, type BreadcrumbProps } from '../Breadcrumb'
import { argTypes } from './configs/argTypes'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
  argTypes,
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

const generalArgs: BreadcrumbProps = {
  darkMode: true,
  items: [
    { label: '1st Link', href: '#' },
    { label: '2nd link', href: '#' },
    { label: '3rd link', href: '#' },
    { label: '4th link', href: '#' },
    { label: '5th link (active)' },
  ],
}

const generalArgTypes = {
  darkMode: { control: false },
} as const

export const GeneralStory: Story = {
  name: 'General',
  args: generalArgs,
  argTypes: generalArgTypes,
  render: (args) => {
    const containerClass = cn('flex flex-col xs:p-8 md:p-16 lg:p-28 gap-28')

    return (
      <div className="bg-black h-full w-full">
        <div className={containerClass}>
          <Breadcrumb {...args} items={args.items} />
        </div>
      </div>
    )
  },
}

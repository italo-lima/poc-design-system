import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'
import { Breadcrumb, type BreadcrumbProps } from '../Breadcrumb'

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

const collapsedArgs: BreadcrumbProps = {
  darkMode: true,
  items: [],
}

const collapsedArgTypes = {
  darkMode: { control: false },
  items: { control: false },
} as const

export const CollapsedStory: Story = {
  name: 'Collapsed',
  args: collapsedArgs,
  argTypes: collapsedArgTypes,
  render: (args) => {
    const containerClass = cn('flex flex-col xs:p-8 md:p-16 lg:p-28 gap-28')

    return (
      <div className="bg-neutral-900 h-full w-full">
        <div className={containerClass}>
          <Breadcrumb {...args} items={[{ label: '1st Link (active)' }]} />
          <Breadcrumb
            {...args}
            items={[{ label: '1st Link', href: '#' }, { label: '2nd link (active)' }]}
          />
          <Breadcrumb
            {...args}
            items={[
              { label: '1st Link', href: '#' },
              { label: '2nd link', href: '#' },
              { label: '3rd link (active)' },
            ]}
          />
          <Breadcrumb
            {...args}
            items={[
              { label: '1st Link', href: '#' },
              { label: '2nd link', href: '#' },
              { label: '3rd link', href: '#' },
              { label: '4th link (active)' },
            ]}
          />
          <Breadcrumb
            {...args}
            items={[
              { label: '1st Link', href: '#' },
              { label: '2nd link', href: '#' },
              { label: '3rd link', href: '#' },
              { label: '4th link', href: '#' },
              { label: '5th link (active)' },
            ]}
          />
        </div>
      </div>
    )
  },
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { DsBreadcrumb } from '@ds/react'
import type { BreadcrumbItem } from './breadcrumb'

interface BreadcrumbArgs {
  items: BreadcrumbItem[]
  darkMode: boolean
}

const meta: Meta<BreadcrumbArgs> = {
  title: 'Components/Breadcrumb',
  component: DsBreadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: {
      description:
        'Array de itens do breadcrumb. Quando há mais de 4 itens, os do meio são colapsados em "···". Por ser um valor complexo, é atribuído via propriedade.',
      control: 'object',
    },
    darkMode: {
      description: 'Flag para dark mode.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
  },
}

export default meta

type Story = StoryObj<BreadcrumbArgs>

export const GeneralStory: Story = {
  name: 'General',
  args: {
    darkMode: true,
    items: [
      { label: '1st Link', href: '#' },
      { label: '2nd link', href: '#' },
      { label: '3rd link', href: '#' },
      { label: '4th link', href: '#' },
      { label: '5th link (active)' },
    ],
  },
  argTypes: {
    darkMode: { control: false },
  },
  render: (args) => (
    <div
      className={`${args.darkMode ? 'bg-black text-white' : 'bg-white text-neutral-900'} h-full w-full`}
    >
      <div className="flex flex-col xs:p-8 md:p-16 lg:p-28 gap-28">
        <DsBreadcrumb items={args.items} darkMode={args.darkMode} />
      </div>
    </div>
  ),
}

export const CollapsedStory: Story = {
  name: 'Collapsed',
  args: {
    darkMode: true,
    items: [],
  },
  argTypes: {
    darkMode: { control: false },
    items: { control: false },
  },
  render: (args) => (
    <div
      className={`${args.darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} h-full w-full`}
    >
      <div className="flex flex-col xs:p-8 md:p-16 lg:p-28 gap-28">
        <DsBreadcrumb darkMode={args.darkMode} items={[{ label: '1st Link (active)' }]} />
        <DsBreadcrumb
          darkMode={args.darkMode}
          items={[{ label: '1st Link', href: '#' }, { label: '2nd link (active)' }]}
        />
        <DsBreadcrumb
          darkMode={args.darkMode}
          items={[
            { label: '1st Link', href: '#' },
            { label: '2nd link', href: '#' },
            { label: '3rd link (active)' },
          ]}
        />
        <DsBreadcrumb
          darkMode={args.darkMode}
          items={[
            { label: '1st Link', href: '#' },
            { label: '2nd link', href: '#' },
            { label: '3rd link', href: '#' },
            { label: '4th link (active)' },
          ]}
        />
        <DsBreadcrumb
          darkMode={args.darkMode}
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
  ),
}

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { iconOptions } from '../../utils/icons'
import type { EmptyStateVariant } from './empty-state'

interface EmptyStateArgs {
  variant: EmptyStateVariant
  icon?: string
  title: string
  description?: string
  actionLabel?: string
}

const meta: Meta<EmptyStateArgs> = {
  title: 'Components/Empty State',
  component: 'ds-empty-state',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Define a variante visual do empty state.',
      type: { name: 'string', required: false },
      options: ['icon', 'informative', 'warning', 'success', 'critical'],
      control: 'radio',
      table: { defaultValue: { summary: 'icon' } },
    },
    icon: {
      description: 'Define o ícone exibido quando a variante é "icon".',
      type: { name: 'string', required: false },
      options: iconOptions,
      control: 'select',
      table: { defaultValue: { summary: 'search' } },
    },
    title: {
      description: 'Título principal exibido no empty state.',
      type: { name: 'string', required: true },
      control: 'text',
    },
    description: {
      description: 'Texto descritivo exibido abaixo do título.',
      type: { name: 'string', required: false },
      control: 'text',
    },
    actionLabel: {
      description: 'Label do botão de ação. Quando ausente, o botão não é exibido.',
      type: { name: 'string', required: false },
      control: 'text',
      table: { defaultValue: { summary: 'Button' } },
    },
  },
}

export default meta

type Story = StoryObj<EmptyStateArgs>

export const GeneralStory: Story = {
  name: 'General',
  args: {
    variant: 'icon',
    icon: 'search',
    title: 'Empty state title',
    description: 'The quick brown fox jumps over the lazy dog.',
    actionLabel: 'Button',
  },
  render: (args) => html`
    <div class="bg-neutral-900 flex items-center justify-center h-full p-40">
      <ds-empty-state
        variant=${args.variant}
        icon=${args.icon}
        title=${args.title}
        description=${args.description}
        action-label=${args.actionLabel}
        @dsAction=${() => console.log('clicked')}
      ></ds-empty-state>
    </div>
  `,
}

export const IconStory: Story = {
  name: 'Icon',
  args: {
    variant: 'icon',
    icon: 'user',
    title: 'Empty state title',
    description: 'The quick brown fox jumps over the lazy dog.',
    actionLabel: 'Button',
  },
  argTypes: {
    variant: { control: false },
  },
  render: (args) => html`
    <div class="bg-neutral-900 flex items-center justify-center h-full p-40">
      <ds-empty-state
        variant=${args.variant}
        icon=${args.icon}
        title=${args.title}
        description=${args.description}
        action-label=${args.actionLabel}
        @dsAction=${() => console.log('clicked')}
      ></ds-empty-state>
    </div>
  `,
}

export const VariantsStory: Story = {
  name: 'Variants',
  args: {
    title: 'Empty state title',
    description: 'The quick brown fox jumps over the lazy dog.',
    actionLabel: 'Button',
  },
  argTypes: {
    variant: { control: false },
  },
  render: (args) => html`
    <div class="bg-neutral-900 flex items-center justify-center gap-40 flex-wrap p-40">
      <ds-empty-state
        variant="icon"
        icon="search"
        title=${args.title}
        description=${args.description}
        action-label=${args.actionLabel}
      ></ds-empty-state>
      <ds-empty-state
        variant="informative"
        title=${args.title}
        description=${args.description}
        action-label=${args.actionLabel}
      ></ds-empty-state>
      <ds-empty-state
        variant="warning"
        title=${args.title}
        description=${args.description}
        action-label=${args.actionLabel}
      ></ds-empty-state>
      <ds-empty-state
        variant="critical"
        title=${args.title}
        description=${args.description}
        action-label=${args.actionLabel}
      ></ds-empty-state>
      <ds-empty-state
        variant="success"
        title=${args.title}
        description=${args.description}
        action-label=${args.actionLabel}
      ></ds-empty-state>
    </div>
  `,
}

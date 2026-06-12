import type { Meta, StoryObj } from '@storybook/react-vite'
import { DsAlert } from '@ds/react'
import type { AlertVariant, AlertCloseType } from './alert'

interface AlertArgs {
  variant: AlertVariant
  title: string
  subtitle?: string
  closeType: AlertCloseType
  closeLabel?: string
  darkMode?: boolean
}

const meta: Meta<AlertArgs> = {
  title: 'Components/Alert',
  component: DsAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Define a variante de cor do alert.',
      type: { name: 'string', required: false },
      options: ['default', 'danger', 'info', 'success'],
      control: 'radio',
      table: { defaultValue: { summary: 'default' } },
    },
    title: {
      description: 'Texto principal exibido no alert.',
      type: { name: 'string', required: true },
      control: 'text',
    },
    subtitle: {
      description: 'Texto secundário exibido abaixo do título.',
      type: { name: 'string', required: false },
      control: 'text',
    },
    closeType: {
      description: 'Define o tipo do elemento de fechar (ícone X ou botão de texto).',
      type: { name: 'string', required: false },
      options: ['icon', 'button'],
      control: 'radio',
      table: { defaultValue: { summary: 'icon' } },
    },
    closeLabel: {
      description: 'Rótulo exibido no botão de fechar quando `closeType` é `button`.',
      type: { name: 'string', required: false },
      control: 'text',
      table: { defaultValue: { summary: 'Fechar' } },
    },
    darkMode: {
      description: 'Flag para dark mode.',
      type: { name: 'boolean', required: false },
      control: false,
      table: { defaultValue: { summary: 'true' } },
    },
  },
}

export default meta

type Story = StoryObj<AlertArgs>

export const GeneralStory: Story = {
  name: 'General',
  args: {
    title: 'Title',
    subtitle: 'Lorem ipsum dolor sit amet consectetur',
    darkMode: true,
  },
  render: (args) => (
    <div className={`${args.darkMode ? 'bg-black text-white' : 'bg-white text-neutral-900'} h-full w-full`}>
      <div className="flex flex-col xs:p-8 md:p-16 lg:p-28 gap-4">
        <DsAlert
          variant={args.variant}
          title={args.title}
          subtitle={args.subtitle}
          closeType={args.closeType}
        />
      </div>
    </div>
  ),
}

export const IconStory: Story = {
  name: 'Icon',
  args: {
    title: 'Title',
    subtitle: 'Lorem ipsum dolor sit amet consectetur',
    darkMode: true,
    closeType: 'icon',
  },
  render: (args) => (
    <div className={`${args.darkMode ? 'bg-black text-white' : 'bg-white text-neutral-900'} h-full w-full`}>
      <div className="flex flex-col xs:p-8 md:p-16 lg:p-28 gap-16">
        <DsAlert variant="default" title={args.title} subtitle={args.subtitle} closeType="icon" />
        <DsAlert variant="danger" title={args.title} subtitle={args.subtitle} closeType="icon" />
        <DsAlert variant="info" title={args.title} subtitle={args.subtitle} closeType="icon" />
        <DsAlert variant="success" title={args.title} subtitle={args.subtitle} closeType="icon" />
      </div>
    </div>
  ),
}

export const ButtonStory: Story = {
  name: 'Button',
  args: {
    title: 'Title',
    subtitle: 'Lorem ipsum dolor sit amet consectetur',
    darkMode: true,
    closeType: 'button',
  },
  render: (args) => (
    <div className={`${args.darkMode ? 'bg-black text-white' : 'bg-white text-neutral-900'} h-full w-full`}>
      <div className="flex flex-col xs:p-8 md:p-16 lg:p-28 gap-16">
        <DsAlert variant="default" title={args.title} subtitle={args.subtitle} closeType="button" />
        <DsAlert variant="danger" title={args.title} subtitle={args.subtitle} closeType="button" />
        <DsAlert variant="info" title={args.title} subtitle={args.subtitle} closeType="button" />
        <DsAlert variant="success" title={args.title} subtitle={args.subtitle} closeType="button" />
      </div>
    </div>
  ),
}

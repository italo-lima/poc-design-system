import type { Meta, StoryObj } from '@storybook/react-vite'
import { DsButton } from '@ds/react'
import { iconOptions } from '../../utils/icons'
import type { ButtonVariant, ButtonColor, ButtonSize } from './button'
import type { IconName } from '../../utils/icons'

interface ButtonArgs {
  label: string
  variant: ButtonVariant
  color: ButtonColor
  size: ButtonSize
  fullWidth: boolean
  leadingIcon?: IconName
  trailingIcon?: IconName
  iconOnly: boolean
  disabled: boolean
}

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: DsButton,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Texto do botão (renderizado no slot). Oculto quando `iconOnly`.',
      type: { name: 'string', required: false },
      control: 'text',
      table: { defaultValue: { summary: 'Button' } },
    },
    variant: {
      description: 'Estilo visual do botão.',
      type: { name: 'string', required: true },
      options: ['solid', 'outlined', 'ghost'],
      control: 'radio',
      table: { defaultValue: { summary: 'solid' } },
    },
    color: {
      description: 'Esquema de cor do botão.',
      type: { name: 'string', required: false },
      options: ['primary', 'neutral', 'danger'],
      control: 'radio',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      description:
        'Altura e padding por tamanho; largura depende de `fullWidth` e `iconOnly`.',
      type: { name: 'string', required: false },
      options: ['sm', 'md', 'lg'],
      control: 'radio',
      table: { defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      description:
        'Se `true`, aplica `w-full`. Se `false`, a largura acompanha o conteúdo (`iconOnly` quadrado usa `w-32` / `w-40` / `w-48`).',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    leadingIcon: {
      description: 'Ícone à esquerda.',
      type: { name: 'string', required: false },
      options: iconOptions,
      control: 'select',
    },
    trailingIcon: {
      description: 'Ícone à direita.',
      type: { name: 'string', required: false },
      options: iconOptions,
      control: 'select',
    },
    iconOnly: {
      description: 'Exibe apenas o ícone (formato quadrado).',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      description: 'Desabilita o botão e bloqueia cliques.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
}

export default meta

type Story = StoryObj<ButtonArgs>

const renderButton = (args: ButtonArgs) => (
  <div className="bg-neutral-900 min-h-full w-full p-28 flex">
    <DsButton
      variant={args.variant}
      color={args.color}
      size={args.size}
      fullWidth={args.fullWidth}
      leadingIcon={args.leadingIcon}
      trailingIcon={args.trailingIcon}
      iconOnly={args.iconOnly}
      disabled={args.disabled}
      onDsClick={() => console.log('clicked')}
    >
      {args.label}
    </DsButton>
  </div>
)

export const GeneralStory: Story = {
  name: 'General',
  args: {
    label: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    iconOnly: false,
    disabled: false,
  },
  render: renderButton,
}

export const SolidStory: Story = {
  name: 'Solid',
  args: {
    label: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    iconOnly: false,
    disabled: false,
  },
  render: renderButton,
}

export const OutlinedStory: Story = {
  name: 'Outlined',
  args: {
    label: 'Button',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    iconOnly: false,
    disabled: false,
  },
  render: renderButton,
}

export const GhostStory: Story = {
  name: 'Ghost',
  args: {
    label: 'Button',
    variant: 'ghost',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    iconOnly: false,
    disabled: false,
  },
  render: renderButton,
}

export const IconOnlyStory: Story = {
  name: 'Icon Only',
  args: {
    label: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'lg',
    fullWidth: false,
    leadingIcon: 'plus',
    iconOnly: true,
    disabled: false,
  },
  render: renderButton,
}

export const DisabledStory: Story = {
  name: 'Disabled',
  args: {
    label: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    iconOnly: false,
    disabled: true,
  },
  render: renderButton,
}

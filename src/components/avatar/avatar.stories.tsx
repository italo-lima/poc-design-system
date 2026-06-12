import type { Meta, StoryObj } from '@storybook/react-vite'
import { DsAvatar } from '@ds/react'
import { iconOptions } from '../../utils/icons'
import type { AvatarType, AvatarIconName } from './avatar'

interface AvatarArgs {
  type: AvatarType
  icon: AvatarIconName
  alt?: string
  src?: string
  initials?: string
  rounded: boolean
  darkMode: boolean
}

const meta: Meta<AvatarArgs> = {
  title: 'Components/Avatar',
  component: DsAvatar,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Define o tipo de exibição do avatar: imagem, ícone ou iniciais.',
      type: { name: 'string', required: false },
      options: ['image', 'icon', 'initials'],
      control: 'radio',
      table: { defaultValue: { summary: 'icon' } },
    },
    icon: {
      description: 'Nome do ícone em kebab-case. Utilizado quando type é "icon".',
      type: { name: 'string', required: false },
      options: iconOptions,
      control: 'select',
      table: { defaultValue: { summary: 'user' } },
    },
    alt: {
      description: 'Texto alternativo para acessibilidade.',
      type: { name: 'string', required: false },
      control: 'text',
    },
    src: {
      description: 'URL da imagem. Utilizado quando type é "image".',
      type: { name: 'string', required: false },
      control: 'text',
    },
    initials: {
      description:
        'Texto de iniciais exibido no avatar. Máximo de 2 caracteres. Utilizado quando type é "initials".',
      type: { name: 'string', required: false },
      control: 'text',
    },
    rounded: {
      description:
        'Define se o avatar terá formato circular (true) ou quadrado arredondado (false).',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
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

type Story = StoryObj<AvatarArgs>

export const GeneralStory: Story = {
  name: 'General',
  args: {
    type: 'icon',
    icon: 'user',
    darkMode: true,
    rounded: true,
  },
  render: (args) => (
    <div className={`${args.darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} h-full w-full`}>
      <div className="flex flex-row flex-wrap xs:p-8 md:p-16 lg:p-28 gap-16">
        <DsAvatar
          type={args.type}
          icon={args.icon}
          alt={args.alt ?? ''}
          src={args.src ?? ''}
          initials={args.initials ?? ''}
          rounded={args.rounded}
          darkMode={args.darkMode}
        />
      </div>
    </div>
  ),
}

export const ImageStory: Story = {
  name: 'Image',
  args: {
    type: 'image',
    alt: 'Avatar do usuário',
    src: '/avatar.png',
    darkMode: true,
  },
  render: (args) => (
    <div className={`${args.darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} h-full w-full`}>
      <div className="flex flex-row xs:p-8 md:p-16 lg:p-28 gap-16">
        <DsAvatar type="image" alt={args.alt ?? ''} src={args.src ?? ''} rounded={true} />
        <DsAvatar type="image" alt={args.alt ?? ''} src={args.src ?? ''} rounded={false} />
      </div>
    </div>
  ),
}

export const InitialsStory: Story = {
  name: 'Initials',
  args: {
    type: 'initials',
    initials: 'JD',
    alt: 'John Doe',
    darkMode: true,
  },
  render: (args) => (
    <div className={`${args.darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} h-full w-full`}>
      <div className="flex flex-row xs:p-8 md:p-16 lg:p-28 gap-16">
        <DsAvatar
          type="initials"
          initials={args.initials ?? ''}
          alt={args.alt ?? ''}
          rounded={true}
        />
        <DsAvatar
          type="initials"
          initials={args.initials ?? ''}
          alt={args.alt ?? ''}
          rounded={false}
        />
      </div>
    </div>
  ),
}

export const IconsStory: Story = {
  name: 'Icons',
  args: {
    type: 'icon',
    icon: 'user-round',
    darkMode: true,
  },
  render: (args) => (
    <div className={`${args.darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'} h-full w-full`}>
      <div className="flex flex-row flex-wrap xs:p-8 md:p-16 lg:p-28 gap-16">
        <DsAvatar type="icon" icon={args.icon} rounded={true} />
        <DsAvatar type="icon" icon={args.icon} rounded={false} />
      </div>
    </div>
  ),
}

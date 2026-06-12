import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import { iconOptions } from '../../utils/icons'
import type { TagVariant, TagSurface, TagSize, TagFormat } from './tag'

interface TagArgs {
  darkMode?: boolean
  variant: TagVariant
  surface: TagSurface
  size: TagSize
  format: TagFormat
  text: string
  leadingIcon?: string
  trailingIcon?: string
  interactiveTrailing?: boolean
}

const meta: Meta<TagArgs> = {
  title: 'Components/Tag',
  component: 'ds-tag',
  tags: ['autodocs'],
  argTypes: {
    darkMode: {
      description: 'Flag para dark mode',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    variant: {
      description: 'Cor do tema.',
      type: { name: 'string', required: false },
      options: ['primary', 'danger', 'accent', 'secondary', 'critical', 'info', 'success'],
      control: 'radio',
      table: { defaultValue: { summary: 'primary' } },
    },
    surface: {
      description:
        'Sólido com fundo preenchido, ou contorno com fundo suave e borda na cor do tema.',
      type: { name: 'string', required: false },
      options: ['solid', 'outline'],
      control: 'radio',
      table: { defaultValue: { summary: 'solid' } },
    },
    size: {
      description: 'Tamanho do tag.',
      type: { name: 'string', required: false },
      options: ['medium', 'small'],
      control: 'radio',
      table: { defaultValue: { summary: 'medium' } },
    },
    format: {
      description: 'Formato do tag.',
      type: { name: 'string', required: false },
      options: ['squared', 'pill'],
      control: 'radio',
      table: { defaultValue: { summary: 'squared' } },
    },
    text: {
      description: 'Texto do tag.',
      type: { name: 'string', required: true },
      control: 'text',
    },
    leadingIcon: {
      description: 'Ícone à esquerda.',
      type: { name: 'string', required: false },
      options: iconOptions,
      control: 'select',
      table: { defaultValue: { summary: 'user' } },
    },
    trailingIcon: {
      description: 'Ícone à direita',
      type: { name: 'string', required: false },
      options: iconOptions,
      control: 'select',
      table: { defaultValue: { summary: 'x' } },
    },
    interactiveTrailing: {
      description:
        'Torna o trailing clicável (renderiza um <button> e emite o evento `dsTrailingClick`). Sem ele, o trailing é apenas decorativo.',
      type: { name: 'boolean', required: false },
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
}

export default meta

type Story = StoryObj<TagArgs>

const variants: TagVariant[] = [
  'primary',
  'danger',
  'accent',
  'secondary',
  'critical',
  'info',
  'success',
]

export const GeneralStory: Story = {
  name: 'General',
  args: {
    format: 'squared',
    size: 'medium',
    surface: 'solid',
    variant: 'primary',
    text: 'Tag',
    leadingIcon: 'user',
    trailingIcon: 'x',
  },
  render: (args) => html`
    <div class="h-full w-full bg-neutral-900 p-24">
      <ds-tag
        variant=${args.variant}
        surface=${args.surface}
        size=${args.size}
        format=${args.format}
        text=${args.text}
        leading-icon=${args.leadingIcon}
        trailing-icon=${args.trailingIcon}
        ?interactive-trailing=${args.interactiveTrailing}
      ></ds-tag>
    </div>
  `,
}

export const ClickStory: Story = {
  name: 'Click',
  args: {
    format: 'squared',
    size: 'medium',
    surface: 'solid',
    variant: 'primary',
    text: 'Tag',
    leadingIcon: 'user',
    trailingIcon: 'x',
  },
  render: (args) => html`
    <div class="min-h-svh w-full bg-neutral-900 p-24">
      <div class="flex items-center gap-16">
        <ds-tag
          variant=${args.variant}
          surface=${args.surface}
          size=${args.size}
          format=${args.format}
          text=${args.text}
          leading-icon=${args.leadingIcon}
          trailing-icon=${args.trailingIcon}
          interactive-trailing
          @dsTrailingClick=${(e: Event) => {
            const note = (e.target as HTMLElement)?.parentElement?.querySelector('[data-clicked]')
            if (note) note.removeAttribute('hidden')
          }}
        ></ds-tag>
        <p data-clicked hidden class="text-white text-2xl">Tag foi clicado</p>
      </div>
    </div>
  `,
}

const grid = (surface: TagSurface, size: TagSize, format: TagFormat, text: string) => html`
  <div class="flex gap-8 mt-8">
    ${variants.map(
      (variant) => html`
        <ds-tag
          variant=${variant}
          surface=${surface}
          size=${size}
          format=${format}
          text=${text}
          leading-icon="user"
          trailing-icon="x"
        ></ds-tag>
      `,
    )}
  </div>
`

export const SquareStory: Story = {
  name: 'Square',
  args: { text: 'Tag', leadingIcon: 'user', trailingIcon: 'x' },
  render: (args) => html`
    <div class="min-h-svh w-full bg-neutral-900 p-24">
      <div class="flex flex-col">
        <h1 class="text-xl-medium text-neutral-300">Medium Size (Solid)</h1>
        ${grid('solid', 'medium', 'squared', args.text)}
      </div>
      <div class="flex flex-col mt-32">
        <h1 class="text-xl-medium text-neutral-300">Medium Size (Outline)</h1>
        ${grid('outline', 'medium', 'squared', args.text)}
      </div>
      <div class="flex flex-col mt-32">
        <h1 class="text-xl-medium text-neutral-300">Small Size (Solid)</h1>
        ${grid('solid', 'small', 'squared', args.text)}
      </div>
      <div class="flex flex-col mt-32">
        <h1 class="text-xl-medium text-neutral-300">Small Size (Outline)</h1>
        ${grid('outline', 'small', 'squared', args.text)}
      </div>
    </div>
  `,
}

export const PillStory: Story = {
  name: 'Pill',
  args: { text: 'Tag', leadingIcon: 'user', trailingIcon: 'x' },
  render: (args) => html`
    <div class="min-h-svh w-full bg-neutral-900 p-24">
      <div class="flex flex-col">
        <h1 class="text-xl-medium text-neutral-300">Medium Size (Solid)</h1>
        ${grid('solid', 'medium', 'pill', args.text)}
      </div>
      <div class="flex flex-col mt-32">
        <h1 class="text-xl-medium text-neutral-300">Medium Size (Outline)</h1>
        ${grid('outline', 'medium', 'pill', args.text)}
      </div>
      <div class="flex flex-col mt-32">
        <h1 class="text-xl-medium text-neutral-300">Small Size (Solid)</h1>
        ${grid('solid', 'small', 'pill', args.text)}
      </div>
      <div class="flex flex-col mt-32">
        <h1 class="text-xl-medium text-neutral-300">Small Size (Outline)</h1>
        ${grid('outline', 'small', 'pill', args.text)}
      </div>
    </div>
  `,
}

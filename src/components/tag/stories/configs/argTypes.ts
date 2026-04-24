import dedent from 'ts-dedent'
import { iconOptions } from '../../../../utils/icons'

export const argTypes = {
  darkMode: {
    description: dedent`
      Flag para dark mode
    `,
    type: { name: 'boolean', required: false },
    control: 'boolean',
    table: { defaultValue: { summary: 'true' } },
  },
  variant: {
    description: dedent`
      Cor do tema.
    `,
    type: { name: 'string', required: false },
    options: ['primary', 'danger', 'accent', 'secondary', 'critical', 'info', 'success'],
    control: 'radio',
    table: { defaultValue: { summary: 'primary' } },
  },
  surface: {
    description: dedent`
      Sólido com fundo preenchido, ou contorno com fundo suave e borda na cor do tema.
    `,
    type: { name: 'string', required: false },
    options: ['solid', 'outline'],
    control: 'radio',
    table: { defaultValue: { summary: 'solid' } },
  },
  size: {
    description: dedent`
      Tamanho do tag.
    `,
    type: { name: 'string', required: false },
    options: ['medium', 'small'],
    control: 'radio',
    table: { defaultValue: { summary: 'medium' } },
  },
  format: {
    description: dedent`
      Formato do tag.
    `,
    type: { name: 'string', required: false },
    options: ['squared', 'pill'],
    control: 'radio',
    table: { defaultValue: { summary: 'squared' } },
  },
  text: {
    description: dedent`
      Texto do tag.
    `,
    type: { name: 'string', required: true },
    control: 'text',
  },
  leadingIcon: {
    description: dedent`
      Ícone à esquerda.
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: iconOptions,
    control: 'select',
    table: { defaultValue: { summary: 'user' } },
  },
  trailingIcon: {
    description: dedent`
      Ícone à direita
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: iconOptions,
    control: 'select',
    table: { defaultValue: { summary: 'x' } },
  },
  onTrailingClick: {
    description: dedent`
      Clique no trailing (ex.: X). Sem handler, o trailing não é botão.
    `,
    control: false,
  },
} as const

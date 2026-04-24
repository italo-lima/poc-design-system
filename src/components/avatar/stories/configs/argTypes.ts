import dedent from 'ts-dedent'
import { iconOptions } from '../../../../utils/icons'

export const argTypes = {
  darkMode: {
    description: dedent`
      Flag para dark mode
    `,
    type: {
      name: 'boolean',
      required: false,
    },
    control: 'boolean',
    table: { defaultValue: { summary: 'true' } },
  },
  type: {
    description: dedent`
      Define o tipo de exibição do avatar: imagem, ícone ou iniciais.
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: ['image', 'icon', 'initials'],
    control: 'radio',
    table: { defaultValue: { summary: 'icon' } },
  },
  alt: {
    description: dedent`
      Texto alternativo para acessibilidade.
    `,
    type: {
      name: 'string',
      required: false,
    },
    control: 'text',
  },
  src: {
    description: dedent`
      URL da imagem. Utilizado quando type é "image".
    `,
    type: {
      name: 'string',
      required: false,
    },
    control: 'text',
  },
  initials: {
    description: dedent`
      Texto de iniciais exibido no avatar. Máximo de 2 caracteres. Utilizado quando type é "initials".
    `,
    type: {
      name: 'string',
      required: false,
    },
    control: 'text',
  },
  icon: {
    description: dedent`
      Nome do ícone em kebab-case. Utilizado quando type é "icon".
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: iconOptions,
    control: 'select',
    table: { defaultValue: { summary: 'user' } },
  },
  rounded: {
    description: dedent`
      Define se o avatar terá formato circular (true) ou quadrado arredondado (false).
    `,
    type: {
      name: 'boolean',
      required: false,
    },
    control: 'boolean',
    table: { defaultValue: { summary: 'true' } },
  },
} as const

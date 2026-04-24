import dedent from 'ts-dedent'

export const argTypes = {
  title: {
    description: dedent`
      Texto exibido no cabeçalho do accordion
    `,
    type: {
      name: 'string',
      required: true,
    },
    control: 'text',
  },
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
  readOnly: {
    description: dedent`
      Flag para read only
    `,
    type: {
      name: 'boolean',
      required: false,
    },
  },
  alignment: {
    description: dedent`
      Alinhamento e padding do accordion.
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: ['left', 'flush'],
    control: 'radio',
    table: {
      defaultValue: { summary: 'left' },
    },
  },
  disabled: {
    description: dedent`
      Desabilita a interação com o accordion
    `,
    type: {
      name: 'boolean',
      required: false,
    },
    table: { defaultValue: { summary: 'false' } },
  },
  defaultOpen: {
    description: dedent`
      Define se o accordion inicia aberto
    `,
    type: {
      name: 'boolean',
      required: false,
    },
    table: { defaultValue: { summary: 'false' } },
  },
} as const

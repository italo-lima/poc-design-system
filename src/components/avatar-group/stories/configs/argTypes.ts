import dedent from 'ts-dedent'

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
  max: {
    description: dedent`
      Número máximo de avatares visíveis antes de exibir o indicador de excedente (+N).
    `,
    type: {
      name: 'number',
      required: false,
    },
    control: 'number',
    table: { defaultValue: { summary: '5' } },
  },
  children: {
    table: { disable: true },
  },
} as const

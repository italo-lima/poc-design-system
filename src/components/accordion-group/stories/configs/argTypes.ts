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
  hasBackground: {
    description: dedent`
      Aplica cor de fundo ao container do grupo
    `,
    type: {
      name: 'boolean',
      required: false,
    },
    control: 'boolean',
    table: { defaultValue: { summary: 'false' } },
  },
  hasBorder: {
    description: dedent`
      Aplica borda e border-radius ao container do grupo
    `,
    type: {
      name: 'boolean',
      required: false,
    },
    control: 'boolean',
    table: { defaultValue: { summary: 'false' } },
  },
} as const

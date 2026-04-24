import dedent from 'ts-dedent'

export const argTypes = {
  darkMode: {
    description: dedent`
      Flag para dark mode
    `,
    type: { name: 'boolean', required: false },
    control: 'boolean',
    table: { defaultValue: { summary: 'true' } },
  },
  items: {
    description: dedent`
      Array de itens do breadcrumb.
      Quando há mais de 4 itens, os do meio são colapsados em "···".
    `,
    control: 'object',
  },
} as const

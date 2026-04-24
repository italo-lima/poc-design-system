import dedent from 'ts-dedent'

export const argTypes = {
  darkMode: {
    description: dedent`
      Tema.
    `,
    type: { name: 'boolean', required: false },
    control: 'boolean',
    table: { defaultValue: { summary: 'true' } },
  },
  placement: {
    description: dedent`
      Posição da seta \`default\` sem seta.
    `,
    type: { name: 'string', required: false },
    options: ['default', 'left', 'top', 'bottom', 'right'],
    control: 'radio',
    table: { defaultValue: { summary: 'default' } },
  },
  children: {
    description: dedent`
      Conteúdo complementar.
    `,
    type: { name: 'string', required: true },
    control: 'text',
  },
} as const

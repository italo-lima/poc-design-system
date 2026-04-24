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
  variant: {
    description: dedent`
      Define a variante de cor do badge.
    `,
    type: { name: 'string', required: false },
    options: ['primary', 'danger', 'accent', 'secondary', 'critical', 'info', 'success'],
    control: 'radio',
    table: { defaultValue: { summary: 'danger' } },
  },
  count: {
    description: dedent`
      Número exibido no badge. Valores ≥ 1000 são exibidos como "999+".
      Quando ausente, exibe um ponto de 8px.
    `,
    type: { name: 'number', required: false },
    control: 'number',
  },
} as const

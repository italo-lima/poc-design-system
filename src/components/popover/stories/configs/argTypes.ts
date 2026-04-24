import dedent from 'ts-dedent'

export const argTypes = {
  darkMode: {
    description: dedent`
      Tema do painel e da seta (escuro ou claro).
    `,
    type: { name: 'boolean', required: false },
    control: 'boolean',
    table: { defaultValue: { summary: 'true' } },
  },
  placement: {
    description: dedent`
      Posição da seta em relação ao painel. \`default\` não exibe seta.
    `,
    type: { name: 'string', required: false },
    options: ['default', 'left', 'top', 'bottom', 'right'],
    control: 'radio',
    table: { defaultValue: { summary: 'default' } },
  },
  title: {
    description: dedent`
      Título em destaque no topo do popover.
    `,
    type: { name: 'string', required: true },
    control: 'text',
  },
  children: {
    description: dedent`
      Conteúdo complementar abaixo do título.
    `,
    type: { name: 'string', required: false },
    control: 'text',
  },
} as const

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
      Estilo visual do botão
    `,
    type: {
      name: 'string',
      required: true,
    },
    options: ['solid', 'outlined', 'ghost'],
    control: 'radio',
    table: {
      defaultValue: { summary: 'solid' },
    },
  },
  color: {
    description: dedent`
      Esquema de cor do botão
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: ['primary', 'neutral', 'danger'],
    control: 'radio',
    table: { defaultValue: { summary: 'primary' } },
  },
  size: {
    description: dedent`
      Altura e padding por tamanho; largura depende de \`fullWidth\` e \`iconOnly\` (ver \`fullWidth\`).
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: ['sm', 'md', 'lg'],
    control: 'radio',
    table: { defaultValue: { summary: 'md' } },
  },
  fullWidth: {
    description: dedent`
      Se \`true\`, aplica \`w-full\`. Se \`false\`, largura acompanha o conteúdo (\`iconOnly\` quadrado usa \`w-32\` / \`w-40\` / \`w-48\`; só ícone sem largura fixa não força \`w-full\`).
    `,
    type: { name: 'boolean', required: false },
    control: 'boolean',
    table: { defaultValue: { summary: 'false' } },
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
  iconOnly: {
    description: dedent`
      Exibe apenas o ícone (formato quadrado)
    `,
    type: {
      name: 'boolean',
      required: false,
    },
    table: { defaultValue: { summary: 'false' } },
  },
} as const

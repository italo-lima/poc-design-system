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
  variant: {
    description: dedent`
      Define a variante de cor do alert.
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: ['info', 'success', 'warning', 'danger'],
    control: 'radio',
    table: { defaultValue: { summary: 'info' } },
  },
  title: {
    description: dedent`
      Texto principal exibido no alert.
    `,
    type: {
      name: 'string',
      required: true,
    },
    control: 'text',
  },
  subtitle: {
    description: dedent`
      Texto secundário exibido abaixo do título.
    `,
    type: {
      name: 'string',
      required: false,
    },
    control: 'text',
  },
  closeType: {
    description: dedent`
      Define o tipo do elemento de fechar. 
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: ['icon', 'button'],
    control: 'radio',
    table: { defaultValue: { summary: 'icon' } },
  },
  onClose: {
    description: dedent`
      Callback chamado ao clicar no elemento de fechar.
    `,
    type: {
      name: 'function',
      required: false,
    },
  },
  icon: {
    table: { disable: true },
  },
} as const

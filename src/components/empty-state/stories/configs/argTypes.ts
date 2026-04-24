import dedent from 'ts-dedent'
import { iconOptions } from '../../../../utils/icons'

export const argTypes = {
  variant: {
    description: dedent`
      Define a variante visual do empty state.
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: ['icon', 'informative', 'warning', 'success', 'critical'],
    control: 'radio',
    table: { defaultValue: { summary: 'icon' } },
  },
  icon: {
    description: dedent`
      Set the icon to be displayed when variant is icon.
    `,
    type: {
      name: 'string',
      required: false,
    },
    options: iconOptions,
    control: 'select',
    table: { defaultValue: { summary: 'search' } },
  },
  title: {
    description: dedent`
      Título principal exibido no empty state.
    `,
    type: {
      name: 'string',
      required: true,
    },
    control: 'text',
  },
  description: {
    description: dedent`
      Texto descritivo exibido abaixo do título.
    `,
    type: {
      name: 'string',
      required: false,
    },
    control: 'text',
  },
  actionLabel: {
    description: dedent`
      Label for the action button.
    `,
    type: {
      name: 'string',
      required: false,
    },
    control: 'text',
    table: { defaultValue: { summary: 'Button' } },
  },
  actionOnClick: {
    description: dedent`
      Callback called when the action button is clicked.
    `,
    type: {
      name: 'function',
      required: false,
    },
  },
} as const

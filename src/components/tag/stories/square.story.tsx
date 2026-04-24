import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, type TagProps, type TagVariant } from '../Tag'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
  argTypes,
}

export default meta

type Story = StoryObj<typeof Tag>

const variants: TagVariant[] = [
  'primary',
  'danger',
  'accent',
  'secondary',
  'critical',
  'info',
  'success',
]

const squareArgs: TagProps = {
  text: 'Tag',
  leadingIcon: 'user',
  trailingIcon: 'x',
}

const squareArgTypes = {
  darkMode: { control: false },
  variant: { control: false },
  surface: { control: false },
  size: { control: false },
} as const

export const SquareStory: Story = {
  name: 'Square',
  args: squareArgs,
  argTypes: squareArgTypes,
  render: (args) => {
    const row = cn('flex gap-8 mt-8')

    return (
      <div className="min-h-svh w-full bg-neutral-900 p-24">
        <div className="flex flex-col">
          <h1 className="text-xl-medium text-neutral-300">Medium Size (Solid)</h1>
          <div className={row}>
            {variants.map((variant) => (
              <Tag
                {...args}
                key={variant}
                variant={variant}
                surface="solid"
                format="squared"
                size="medium"
              >
                {args.text}
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-32">
          <h1 className="text-xl-medium text-neutral-300">Medium Size (Outline)</h1>
          <div className={row}>
            {variants.map((variant) => (
              <Tag
                {...args}
                key={variant}
                variant={variant}
                surface="outline"
                format="squared"
                size="medium"
              >
                {args.text}
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-32">
          <h1 className="text-xl-medium text-neutral-300">Small Size (Solid)</h1>
          <div className={row}>
            {variants.map((variant) => (
              <Tag
                {...args}
                key={variant}
                variant={variant}
                surface="solid"
                format="squared"
                size="small"
              >
                {args.text}
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-32">
          <h1 className="text-xl-medium text-neutral-300">Small Size (Outline)</h1>
          <div className={row}>
            {variants.map((variant) => (
              <Tag
                {...args}
                key={variant}
                variant={variant}
                surface="outline"
                format="squared"
                size="small"
              >
                {args.text}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

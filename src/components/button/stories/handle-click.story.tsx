import { useState } from 'react'
import { cn } from '../../../utils/cn'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, type ButtonProps } from '../Button'
import { argTypes } from './configs/argTypes'
import { DocumentationPage } from './configs/docs-pages'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

const handleClickArgs: ButtonProps = {
  darkMode: true,
  children: 'Button',
  size: 'md',
  fullWidth: false,
}

const handleClickArgTypes = {
  ...argTypes,
  darkMode: { control: false },
} as const

export const HandleClickStory: Story = {
  name: 'Handle Click',
  args: handleClickArgs,
  argTypes: handleClickArgTypes,
  render: (args) => {
    const [clicked, setClicked] = useState(false)
    const containerClassName = cn('flex items-center gap-16 xs:p-8 md:p-16 lg:p-28')
    return (
      <div className="min-h-full w-full bg-neutral-900">
        <div className={containerClassName}>
          <Button {...args} onClick={() => setClicked(true)} />
          {clicked && <p className="text-white">{args.children} foi clicado</p>}
        </div>
      </div>
    )
  },
}

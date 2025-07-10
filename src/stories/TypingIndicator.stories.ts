import type { Meta, StoryObj } from '@storybook/react'
import { TypingIndicator } from '../components/ui/StreamingText'

const meta: Meta<typeof TypingIndicator> = {
  title: 'UI/TypingIndicator',
  component: TypingIndicator,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}
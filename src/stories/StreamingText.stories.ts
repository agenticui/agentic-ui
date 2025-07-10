import type { Meta, StoryObj } from '@storybook/react'
import { StreamingText } from '../components/ui/StreamingText'

const meta: Meta<typeof StreamingText> = {
  title: 'UI/StreamingText',
  component: StreamingText,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
    },
    speed: {
      control: { type: 'range', min: 10, max: 200, step: 10 },
    },
    showCursor: {
      control: 'boolean',
    },
    streaming: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'This text appears character by character, simulating real-time AI response streaming.',
    speed: 50,
    showCursor: true,
    streaming: true,
  },
}

export const FastStreaming: Story = {
  args: {
    text: 'This text streams quickly for faster demonstration.',
    speed: 20,
    showCursor: true,
    streaming: true,
  },
}

export const SlowStreaming: Story = {
  args: {
    text: 'This text streams slowly for dramatic effect.',
    speed: 100,
    showCursor: true,
    streaming: true,
  },
}

export const WithoutCursor: Story = {
  args: {
    text: 'This text streams without a cursor indicator.',
    speed: 50,
    showCursor: false,
    streaming: true,
  },
}

export const InstantDisplay: Story = {
  args: {
    text: 'This text appears instantly when streaming is disabled.',
    speed: 50,
    showCursor: false,
    streaming: false,
  },
}


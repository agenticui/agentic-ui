import type { Meta, StoryObj } from '@storybook/react'
import { Typewriter } from '../components/ui/StreamingText'

const meta: Meta<typeof Typewriter> = {
  title: 'UI/Typewriter',
  component: Typewriter,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    words: {
      control: 'object',
    },
    speed: {
      control: { type: 'range', min: 50, max: 300, step: 50 },
    },
    deleteSpeed: {
      control: { type: 'range', min: 20, max: 200, step: 20 },
    },
    delayBetweenWords: {
      control: { type: 'range', min: 500, max: 5000, step: 500 },
    },
    loop: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    words: ['AI Assistant', 'Chat Interface', 'Smart Conversations', 'Real-time Responses'],
    speed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
    loop: true,
  },
}

export const FastTyping: Story = {
  args: {
    words: ['Quick', 'Fast', 'Rapid', 'Swift'],
    speed: 50,
    deleteSpeed: 30,
    delayBetweenWords: 1000,
    loop: true,
  },
}

export const SlowTyping: Story = {
  args: {
    words: ['Slow', 'Deliberate', 'Thoughtful'],
    speed: 200,
    deleteSpeed: 100,
    delayBetweenWords: 3000,
    loop: true,
  },
}

export const NoLoop: Story = {
  args: {
    words: ['This', 'Types', 'Once', 'Only'],
    speed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
    loop: false,
  },
}
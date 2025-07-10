import type { Meta, StoryObj } from '@storybook/react'
import { ChatMessage } from '../components/conversation/ChatMessage'

const meta: Meta<typeof ChatMessage> = {
  title: 'Conversation/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'object',
    },
    showAvatar: {
      control: 'boolean',
    },
    showTimestamp: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const UserMessage: Story = {
  args: {
    message: {
      id: '1',
      role: 'user',
      content: 'Hello! Can you help me understand how AI chat interfaces work?',
      timestamp: new Date(),
    },
    showAvatar: true,
    showTimestamp: true,
  },
}

export const AssistantMessage: Story = {
  args: {
    message: {
      id: '2',
      role: 'assistant',
      content: 'I\'d be happy to help! AI chat interfaces typically consist of several key components: message display, input handling, real-time streaming, and state management. Each message has a role (user, assistant, or system) that determines its styling and positioning.',
      timestamp: new Date(),
    },
    showAvatar: true,
    showTimestamp: true,
  },
}

export const SystemMessage: Story = {
  args: {
    message: {
      id: '3',
      role: 'system',
      content: 'Conversation started. You are now chatting with Claude AI.',
      timestamp: new Date(),
    },
    showAvatar: true,
    showTimestamp: true,
  },
}

export const LongMessage: Story = {
  args: {
    message: {
      id: '4',
      role: 'assistant',
      content: `Here's a comprehensive explanation of AI chat components:

1. **Message Display**: Each message is rendered with role-specific styling
2. **Real-time Streaming**: Text appears character by character
3. **Avatar System**: Visual identification of speakers
4. **Timestamp Support**: Optional time display
5. **Rich Content**: Support for markdown, code blocks, and more

The system handles various message types and provides a consistent, accessible interface for AI conversations.`,
      timestamp: new Date(),
    },
    showAvatar: true,
    showTimestamp: true,
  },
}

export const WithoutAvatar: Story = {
  args: {
    message: {
      id: '5',
      role: 'assistant',
      content: 'This message is displayed without an avatar for a cleaner look.',
      timestamp: new Date(),
    },
    showAvatar: false,
    showTimestamp: false,
  },
}
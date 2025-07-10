import type { Meta, StoryObj } from '@storybook/react'
import { AgentCard } from '../components/agent/AgentCard'

const meta: Meta<typeof AgentCard> = {
  title: 'Agent/AgentCard',
  component: AgentCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    agent: {
      control: 'object',
    },
    showCapabilities: {
      control: 'boolean',
    },
    showStatus: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const OnlineAgent: Story = {
  args: {
    agent: {
      id: '1',
      name: 'Claude Assistant',
      description: 'A helpful AI assistant that can answer questions, write content, and help with various tasks.',
      capabilities: ['Question Answering', 'Content Writing', 'Code Analysis', 'Research'],
      status: 'online',
    },
    showCapabilities: true,
    showStatus: true,
  },
}

export const ThinkingAgent: Story = {
  args: {
    agent: {
      id: '2',
      name: 'Code Reviewer',
      description: 'Specialized in reviewing code, finding bugs, and suggesting improvements.',
      capabilities: ['Code Review', 'Bug Detection', 'Performance Analysis', 'Security Audit'],
      status: 'thinking',
    },
    showCapabilities: true,
    showStatus: true,
  },
}

export const OfflineAgent: Story = {
  args: {
    agent: {
      id: '3',
      name: 'Research Assistant',
      description: 'Helps with research tasks, data analysis, and academic writing.',
      capabilities: ['Research', 'Data Analysis', 'Academic Writing', 'Citation Management'],
      status: 'offline',
    },
    showCapabilities: true,
    showStatus: true,
  },
}

export const BusyAgent: Story = {
  args: {
    agent: {
      id: '4',
      name: 'Creative Writer',
      description: 'Assists with creative writing, storytelling, and content creation.',
      capabilities: ['Creative Writing', 'Storytelling', 'Poetry', 'Character Development'],
      status: 'busy',
    },
    showCapabilities: true,
    showStatus: true,
  },
}

export const AgentWithAvatar: Story = {
  args: {
    agent: {
      id: '5',
      name: 'Visual Assistant',
      description: 'Specialized in image analysis, design feedback, and visual content creation.',
      avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&fit=crop&crop=face',
      capabilities: ['Image Analysis', 'Design Review', 'Visual Content'],
      status: 'online',
    },
    showCapabilities: true,
    showStatus: true,
  },
}

export const CompactVariant: Story = {
  args: {
    agent: {
      id: '6',
      name: 'Quick Helper',
      description: 'Fast responses for simple queries.',
      capabilities: ['Quick Answers', 'Basic Help'],
      status: 'online',
    },
    variant: 'compact',
    showCapabilities: true,
    showStatus: true,
  },
}

export const WithoutCapabilities: Story = {
  args: {
    agent: {
      id: '7',
      name: 'Simple Agent',
      description: 'A basic agent with minimal information displayed.',
      capabilities: ['General Help'],
      status: 'online',
    },
    showCapabilities: false,
    showStatus: true,
  },
}

export const ManyCapabilities: Story = {
  args: {
    agent: {
      id: '8',
      name: 'Super Assistant',
      description: 'A comprehensive AI assistant with many specialized capabilities.',
      capabilities: [
        'Question Answering', 'Content Writing', 'Code Analysis', 'Research',
        'Data Analysis', 'Creative Writing', 'Translation', 'Math Problem Solving',
        'Image Description', 'Document Review'
      ],
      status: 'online',
    },
    showCapabilities: true,
    showStatus: true,
  },
}
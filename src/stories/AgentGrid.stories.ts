import type { Meta, StoryObj } from '@storybook/react'
import { AgentGrid } from '../components/agent/AgentGrid'
import { Agent } from '../types'

const meta: Meta<typeof AgentGrid> = {
  title: 'Agent/AgentGrid',
  component: AgentGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
    showCapabilities: {
      control: 'boolean',
    },
    showStatus: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleAgents: Agent[] = [
  {
    id: '1',
    name: 'Claude Assistant',
    description: 'A helpful AI assistant for general tasks and questions.',
    capabilities: ['Question Answering', 'Writing', 'Analysis', 'Coding'],
    status: 'online',
  },
  {
    id: '2',
    name: 'Code Reviewer',
    description: 'Specialized in code review, debugging, and best practices.',
    capabilities: ['Code Review', 'Debugging', 'Architecture', 'Testing'],
    status: 'thinking',
  },
  {
    id: '3',
    name: 'Research Assistant',
    description: 'Helps with research, data analysis, and academic writing.',
    capabilities: ['Research', 'Data Analysis', 'Citations', 'Summarization'],
    status: 'online',
  },
  {
    id: '4',
    name: 'Creative Writer',
    description: 'Assists with creative writing, storytelling, and content creation.',
    capabilities: ['Creative Writing', 'Storytelling', 'Poetry', 'Brainstorming'],
    status: 'busy',
  },
  {
    id: '5',
    name: 'Math Tutor',
    description: 'Specialized in mathematics, problem solving, and explanations.',
    capabilities: ['Mathematics', 'Problem Solving', 'Explanations', 'Homework Help'],
    status: 'offline',
  },
  {
    id: '6',
    name: 'Language Expert',
    description: 'Helps with translation, grammar, and language learning.',
    capabilities: ['Translation', 'Grammar', 'Language Learning', 'Proofreading'],
    status: 'online',
  },
]

export const TwoColumns: Story = {
  args: {
    agents: sampleAgents.slice(0, 4),
    columns: 2,
    showCapabilities: true,
    showStatus: true,
  },
}

export const ThreeColumns: Story = {
  args: {
    agents: sampleAgents,
    columns: 3,
    showCapabilities: true,
    showStatus: true,
  },
}

export const SingleColumn: Story = {
  args: {
    agents: sampleAgents.slice(0, 3),
    columns: 1,
    showCapabilities: true,
    showStatus: true,
  },
}

export const FourColumns: Story = {
  args: {
    agents: sampleAgents,
    columns: 4,
    showCapabilities: true,
    showStatus: true,
  },
}

export const WithoutCapabilities: Story = {
  args: {
    agents: sampleAgents.slice(0, 4),
    columns: 2,
    showCapabilities: false,
    showStatus: true,
  },
}

export const WithoutStatus: Story = {
  args: {
    agents: sampleAgents.slice(0, 4),
    columns: 2,
    showCapabilities: true,
    showStatus: false,
  },
}

export const EmptyState: Story = {
  args: {
    agents: [],
    columns: 2,
    showCapabilities: true,
    showStatus: true,
  },
}
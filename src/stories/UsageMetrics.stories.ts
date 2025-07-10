import type { Meta, StoryObj } from '@storybook/react'
import { UsageMetrics } from '../components/memory/UsageMetrics'

const meta: Meta<typeof UsageMetrics> = {
  title: 'Memory/UsageMetrics',
  component: UsageMetrics,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    tokensUsed: {
      control: { type: 'number', min: 0, max: 100000, step: 100 },
    },
    tokensRemaining: {
      control: { type: 'number', min: 0, max: 100000, step: 100 },
    },
    cost: {
      control: { type: 'number', min: 0, max: 100, step: 0.01 },
    },
    requestCount: {
      control: { type: 'number', min: 0, max: 1000, step: 1 },
    },
    averageResponseTime: {
      control: { type: 'number', min: 100, max: 5000, step: 100 },
    },
    showTrends: {
      control: 'boolean',
    },
    compact: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tokensUsed: 15420,
    tokensRemaining: 84580,
    cost: 2.35,
    requestCount: 47,
    averageResponseTime: 1250,
    showTrends: true,
    compact: false,
  },
}

export const HighUsage: Story = {
  args: {
    tokensUsed: 89500,
    tokensRemaining: 10500,
    cost: 12.80,
    requestCount: 156,
    averageResponseTime: 2100,
    showTrends: true,
    compact: false,
  },
}

export const LowUsage: Story = {
  args: {
    tokensUsed: 2150,
    tokensRemaining: 97850,
    cost: 0.42,
    requestCount: 8,
    averageResponseTime: 850,
    showTrends: true,
    compact: false,
  },
}

export const CompactView: Story = {
  args: {
    tokensUsed: 15420,
    tokensRemaining: 84580,
    cost: 2.35,
    requestCount: 47,
    averageResponseTime: 1250,
    showTrends: false,
    compact: true,
  },
}

export const WithoutTokenLimit: Story = {
  args: {
    tokensUsed: 15420,
    cost: 2.35,
    requestCount: 47,
    averageResponseTime: 1250,
    showTrends: true,
    compact: false,
  },
}

export const SlowResponse: Story = {
  args: {
    tokensUsed: 25000,
    tokensRemaining: 75000,
    cost: 5.20,
    requestCount: 89,
    averageResponseTime: 3500,
    showTrends: true,
    compact: false,
  },
}
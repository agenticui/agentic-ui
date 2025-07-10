import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, MessageSkeleton, ThinkingAnimation, LoadingSpinner, PulseLoader, WaveLoader } from '../components/ui/LoadingStates'

const meta: Meta = {
  title: 'UI/Loading States',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

export const SkeletonStory: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-20 w-full rounded-lg" />
    </div>
  ),
  name: 'Skeleton Loader',
}

export const MessageSkeletonStory: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <MessageSkeleton role="assistant" />
      <MessageSkeleton role="user" />
      <MessageSkeleton role="assistant" />
    </div>
  ),
  name: 'Message Skeletons',
}

export const ThinkingAnimationStory: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <ThinkingAnimation />
      <ThinkingAnimation message="Processing your request..." />
      <ThinkingAnimation message="Analyzing code..." />
    </div>
  ),
  name: 'Thinking Animation',
}

export const LoadingSpinnerStory: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <LoadingSpinner size="sm" />
      <LoadingSpinner size="md" />
      <LoadingSpinner size="lg" />
    </div>
  ),
  name: 'Loading Spinner',
}

export const PulseLoaderStory: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <PulseLoader size="sm" count={3} />
      <PulseLoader size="md" count={4} />
      <PulseLoader size="lg" count={5} />
    </div>
  ),
  name: 'Pulse Loader',
}

export const WaveLoaderStory: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <WaveLoader count={3} />
      <WaveLoader count={5} />
      <WaveLoader count={7} />
    </div>
  ),
  name: 'Wave Loader',
}
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ToolsButton } from '../components/ui/ToolsButton'
import { Settings, Zap, Search, Database, Code, Brain, Mic, Camera, Download, Upload } from 'lucide-react'

const meta: Meta<typeof ToolsButton> = {
  title: 'Components/ToolsButton',
  component: ToolsButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onToggle: { action: 'button toggled' },
    variant: {
      control: 'select',
      options: ['default', 'active', 'success', 'warning', 'danger', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    isActive: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    showCount: { control: 'boolean' },
    count: { control: { type: 'number', min: 0, max: 99 } },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Tools',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ToolsButton size="sm" label="Small" />
      <ToolsButton size="md" label="Medium" />
      <ToolsButton size="lg" label="Large" />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <ToolsButton variant="default" label="Default" />
        <ToolsButton variant="active" label="Active" />
        <ToolsButton variant="success" label="Success" />
      </div>
      <div className="flex items-center gap-4">
        <ToolsButton variant="warning" label="Warning" />
        <ToolsButton variant="danger" label="Danger" />
        <ToolsButton variant="ghost" label="Ghost" />
        <ToolsButton variant="outline" label="Outline" />
      </div>
    </div>
  ),
}

export const IconPositions: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ToolsButton 
        icon={<Search className="w-4 h-4" />} 
        label="Search" 
        iconPosition="left" 
      />
      <ToolsButton 
        icon={<Download className="w-4 h-4" />} 
        label="Download" 
        iconPosition="right" 
      />
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ToolsButton 
        icon={<Settings className="w-4 h-4" />} 
        size="sm"
      />
      <ToolsButton 
        icon={<Search className="w-4 h-4" />} 
        size="md"
      />
      <ToolsButton 
        icon={<Zap className="w-4 h-4" />} 
        size="lg"
      />
    </div>
  ),
}

export const WithCounts: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ToolsButton label="Messages" count={3} />
      <ToolsButton label="Notifications" count={12} />
      <ToolsButton label="Tasks" count={99} />
      <ToolsButton 
        icon={<Database className="w-4 h-4" />} 
        count={5} 
      />
    </div>
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <ToolsButton 
        icon={<Zap className="w-4 h-4" />} 
        label="AI Tools"
        variant="active"
      />
      <ToolsButton 
        icon={<Brain className="w-4 h-4" />} 
        label="Smart Analysis"
        variant="success"
      />
      <ToolsButton 
        icon={<Database className="w-4 h-4" />} 
        label="Database"
        variant="outline"
      />
      <ToolsButton 
        icon={<Code className="w-4 h-4" />} 
        label="Code Editor"
        variant="ghost"
      />
      <ToolsButton 
        icon={<Mic className="w-4 h-4" />} 
        label="Voice Input"
        variant="warning"
      />
      <ToolsButton 
        icon={<Camera className="w-4 h-4" />} 
        label="Camera"
        variant="danger"
      />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <ToolsButton label="Normal" />
        <ToolsButton label="Active" isActive={true} />
        <ToolsButton label="Loading" loading={true} />
        <ToolsButton label="Disabled" disabled={true} />
      </div>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <ToolsButton 
        label="Full Width Button" 
        fullWidth={true}
        icon={<Settings className="w-4 h-4" />}
      />
      <ToolsButton 
        label="Another Full Width" 
        fullWidth={true}
        variant="active"
        icon={<Zap className="w-4 h-4" />}
      />
    </div>
  ),
}

export const SizeAndVariantMatrix: Story = {
  render: () => (
    <div className="space-y-6">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="space-y-2">
          <h4 className="font-medium capitalize">{size} Size</h4>
          <div className="flex items-center gap-2 flex-wrap">
            <ToolsButton 
              size={size} 
              variant="default" 
              label="Default"
              icon={<Settings className="w-4 h-4" />}
            />
            <ToolsButton 
              size={size} 
              variant="active" 
              label="Active"
              icon={<Zap className="w-4 h-4" />}
            />
            <ToolsButton 
              size={size} 
              variant="success" 
              label="Success"
              icon={<Brain className="w-4 h-4" />}
            />
            <ToolsButton 
              size={size} 
              variant="outline" 
              label="Outline"
              icon={<Database className="w-4 h-4" />}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Examples</h3>
        <div className="flex items-center gap-4">
          <ToolsButton 
            label="Click Me"
            onToggle={() => alert('Button clicked!')}
            icon={<Settings className="w-4 h-4" />}
          />
          <ToolsButton 
            label="Toggle Active"
            variant="active"
            onToggle={() => alert('Toggle clicked!')}
            icon={<Zap className="w-4 h-4" />}
          />
          <ToolsButton 
            label="With Count"
            count={5}
            onToggle={() => alert('Count button clicked!')}
            icon={<Database className="w-4 h-4" />}
          />
        </div>
      </div>
    )
  },
}

export const LoadingStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ToolsButton 
        label="Processing..." 
        loading={true}
        size="sm"
      />
      <ToolsButton 
        label="Loading Data" 
        loading={true}
        size="md"
        variant="active"
      />
      <ToolsButton 
        label="Please Wait" 
        loading={true}
        size="lg"
        variant="outline"
      />
    </div>
  ),
}

export const AllVariantsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="space-y-3">
        <h4 className="font-medium">Standard Variants</h4>
        <div className="space-y-2">
          <ToolsButton variant="default" label="Default" fullWidth />
          <ToolsButton variant="active" label="Active" fullWidth />
          <ToolsButton variant="outline" label="Outline" fullWidth />
          <ToolsButton variant="ghost" label="Ghost" fullWidth />
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="font-medium">Semantic Variants</h4>
        <div className="space-y-2">
          <ToolsButton variant="success" label="Success" fullWidth />
          <ToolsButton variant="warning" label="Warning" fullWidth />
          <ToolsButton variant="danger" label="Danger" fullWidth />
          <ToolsButton disabled label="Disabled" fullWidth />
        </div>
      </div>
    </div>
  ),
}
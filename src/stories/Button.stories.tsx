import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '../components/ui/Button'
import { Download, Mail, Plus, Settings, Trash, Star, ArrowRight } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
    asChild: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="icon" variant="default">
        <Settings className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline">
        <Download className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="destructive">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Email
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="secondary">
          Add Item
          <Plus className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="ghost">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline">Normal Outline</Button>
        <Button variant="outline" disabled>Disabled Outline</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="destructive">Normal Destructive</Button>
        <Button variant="destructive" disabled>Disabled Destructive</Button>
      </div>
    </div>
  ),
}

export const VariantShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="space-y-3">
        <h4 className="font-medium">Primary Actions</h4>
        <div className="space-y-2">
          <Button className="w-full">Primary Action</Button>
          <Button variant="secondary" className="w-full">Secondary Action</Button>
          <Button variant="outline" className="w-full">Outline Action</Button>
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="font-medium">Utility Actions</h4>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full">Ghost Action</Button>
          <Button variant="link" className="w-full">Link Action</Button>
          <Button variant="destructive" className="w-full">Delete Action</Button>
        </div>
      </div>
    </div>
  ),
}

export const SizeVariantMatrix: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">Small Size</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Button size="sm" variant="default">Default</Button>
          <Button size="sm" variant="outline">Outline</Button>
          <Button size="sm" variant="secondary">Secondary</Button>
          <Button size="sm" variant="ghost">Ghost</Button>
          <Button size="sm" variant="destructive">Destructive</Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Default Size</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Button size="default" variant="default">Default</Button>
          <Button size="default" variant="outline">Outline</Button>
          <Button size="default" variant="secondary">Secondary</Button>
          <Button size="default" variant="ghost">Ghost</Button>
          <Button size="default" variant="destructive">Destructive</Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Large Size</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Button size="lg" variant="default">Default</Button>
          <Button size="lg" variant="outline">Outline</Button>
          <Button size="lg" variant="secondary">Secondary</Button>
          <Button size="lg" variant="ghost">Ghost</Button>
          <Button size="lg" variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">Form Actions</h4>
        <div className="flex items-center gap-2">
          <Button type="submit">Save Changes</Button>
          <Button variant="outline" type="button">Cancel</Button>
          <Button variant="ghost" type="button">Reset</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Navigation</h4>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Previous
          </Button>
          <Button>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Actions with Icons</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline">
            <Star className="mr-2 h-4 w-4" />
            Favorite
          </Button>
          <Button variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Icon Only Actions</h4>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" title="Settings">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" title="Add">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="destructive" title="Delete">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  ),
}

export const LoadingState: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Processing...
      </Button>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Interactive Examples</h3>
      <div className="flex items-center gap-4">
        <Button onClick={() => alert('Default button clicked!')}>
          Click Me
        </Button>
        <Button 
          variant="outline" 
          onClick={() => alert('Outline button clicked!')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button 
          variant="destructive" 
          onClick={() => confirm('Are you sure you want to delete?')}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  ),
}
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Badge } from '../components/ui/Badge'
import { Check, X, Star, AlertCircle, Clock, Users, Settings, Briefcase } from 'lucide-react'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'success',
        'warning',
        'info',
        'blue-subtle',
        'green-subtle',
        'purple-subtle',
        'orange-subtle',
        'gray-subtle'
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    removable: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Standard Variants</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Subtle Variants</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="blue-subtle">Blue Subtle</Badge>
          <Badge variant="green-subtle">Green Subtle</Badge>
          <Badge variant="purple-subtle">Purple Subtle</Badge>
          <Badge variant="orange-subtle">Orange Subtle</Badge>
          <Badge variant="gray-subtle">Gray Subtle</Badge>
        </div>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Badge variant="default">
        <Check className="w-3 h-3 mr-1" />
        Completed
      </Badge>
      <Badge variant="destructive">
        <X className="w-3 h-3 mr-1" />
        Failed
      </Badge>
      <Badge variant="secondary">
        <Clock className="w-3 h-3 mr-1" />
        Pending
      </Badge>
      <Badge variant="outline">
        <Star className="w-3 h-3 mr-1" />
        Featured
      </Badge>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Task Status</h4>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
          <Badge variant="default">
            <AlertCircle className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
          <Badge variant="default" className="bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Completed
          </Badge>
          <Badge variant="destructive">
            <X className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Priority Levels</h4>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Low</Badge>
          <Badge variant="secondary">Medium</Badge>
          <Badge variant="default" className="bg-yellow-100 text-yellow-800">High</Badge>
          <Badge variant="destructive">Critical</Badge>
        </div>
      </div>
    </div>
  ),
}

export const CountBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="text-sm">Notifications</span>
          <Badge className="ml-2">3</Badge>
        </div>
        <div className="relative">
          <span className="text-sm">Messages</span>
          <Badge variant="destructive" className="ml-2">12</Badge>
        </div>
        <div className="relative">
          <span className="text-sm">Tasks</span>
          <Badge variant="secondary" className="ml-2">99+</Badge>
        </div>
      </div>
    </div>
  ),
}

export const CustomColors: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <Badge className="bg-blue-100 text-blue-800">Blue</Badge>
      <Badge className="bg-green-100 text-green-800">Green</Badge>
      <Badge className="bg-yellow-100 text-yellow-800">Yellow</Badge>
      <Badge className="bg-purple-100 text-purple-800">Purple</Badge>
      <Badge className="bg-pink-100 text-pink-800">Pink</Badge>
      <Badge className="bg-indigo-100 text-indigo-800">Indigo</Badge>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Small Size</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge size="sm" variant="default">Small Default</Badge>
          <Badge size="sm" variant="blue-subtle">Small Blue</Badge>
          <Badge size="sm" variant="success">Small Success</Badge>
          <Badge size="sm" variant="warning">Small Warning</Badge>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Medium Size (Default)</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge size="md" variant="default">Medium Default</Badge>
          <Badge size="md" variant="blue-subtle">Medium Blue</Badge>
          <Badge size="md" variant="success">Medium Success</Badge>
          <Badge size="md" variant="warning">Medium Warning</Badge>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Large Size</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge size="lg" variant="default">Large Default</Badge>
          <Badge size="lg" variant="blue-subtle">Large Blue</Badge>
          <Badge size="lg" variant="success">Large Success</Badge>
          <Badge size="lg" variant="warning">Large Warning</Badge>
        </div>
      </div>
    </div>
  ),
}

export const RemovableBadges: Story = {
  render: () => {
    const handleRemove = (name: string) => {
      console.log(`Removed: ${name}`)
    }

    return (
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Removable Tool Tags</h4>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="blue-subtle" size="sm" removable onRemove={() => handleRemove('Web Search')}>
              Web Search
            </Badge>
            <Badge variant="blue-subtle" size="sm" removable onRemove={() => handleRemove('Calculator')}>
              Calculator
            </Badge>
            <Badge variant="blue-subtle" size="sm" removable onRemove={() => handleRemove('Translator')}>
              Translator
            </Badge>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Removable Function Tags</h4>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="green-subtle" size="sm" removable onRemove={() => handleRemove('Sales Analysis')}>
              Sales Analysis
            </Badge>
            <Badge variant="green-subtle" size="sm" removable onRemove={() => handleRemove('Customer Support')}>
              Customer Support
            </Badge>
            <Badge variant="green-subtle" size="sm" removable onRemove={() => handleRemove('Marketing')}>
              Marketing
            </Badge>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Different Variants with Enhanced Hover</h4>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="purple-subtle" removable onRemove={() => handleRemove('Purple')}>
              Purple Badge
            </Badge>
            <Badge variant="orange-subtle" removable onRemove={() => handleRemove('Orange')}>
              Orange Badge
            </Badge>
            <Badge variant="gray-subtle" removable onRemove={() => handleRemove('Gray')}>
              Gray Badge
            </Badge>
            <Badge variant="success" removable onRemove={() => handleRemove('Success')}>
              Success Badge
            </Badge>
            <Badge variant="warning" removable onRemove={() => handleRemove('Warning')}>
              Warning Badge
            </Badge>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Enhanced Remove Button Hover:</strong> Each badge variant now has a specialized hover effect for the remove button:
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Subtle variants: Darker background with enhanced contrast</li>
            <li>• Solid variants: Darker shade for better visibility</li>
            <li>• Focus states: Ring indicators for accessibility</li>
            <li>• Smooth transitions: 200ms duration for polished feel</li>
          </ul>
        </div>
      </div>
    )
  },
}

export const InteractiveBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Removable Tags</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="flex items-center gap-1">
            React
            <button className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
              <X className="w-3 h-3" />
            </button>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            TypeScript
            <button className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
              <X className="w-3 h-3" />
            </button>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            Storybook
            <button className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Clickable Categories</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => alert('Frontend clicked')}
          >
            Frontend
          </Badge>
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => alert('Backend clicked')}
          >
            Backend
          </Badge>
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => alert('UI/UX clicked')}
          >
            UI/UX
          </Badge>
        </div>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">User Profile</h4>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">John Doe</span>
          <Badge variant="default" className="bg-green-100 text-green-800">
            <Check className="w-3 h-3 mr-1" />
            Verified
          </Badge>
          <Badge variant="secondary">Premium</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Article Tags</h4>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline">JavaScript</Badge>
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">Tutorial</Badge>
          <Badge variant="outline">Beginner</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Notification Center</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">New message from Alice</span>
            <Badge variant="default">New</Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">System maintenance scheduled</span>
            <Badge variant="default" className="bg-yellow-100 text-yellow-800">
              <Clock className="w-3 h-3 mr-1" />
              Scheduled
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">Payment failed</span>
            <Badge variant="destructive">
              <AlertCircle className="w-3 h-3 mr-1" />
              Error
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Team Members</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">Alice Johnson</span>
            <Badge variant="default" className="bg-blue-100 text-blue-800">Admin</Badge>
            <Badge variant="outline">
              <Users className="w-3 h-3 mr-1" />
              Team Lead
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Bob Smith</span>
            <Badge variant="secondary">Developer</Badge>
            <Badge variant="default" className="bg-green-100 text-green-800">
              <Check className="w-3 h-3 mr-1" />
              Available
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ChatInputUsage: Story = {
  name: 'ChatInput Usage Demo',
  render: () => {
    const handleRemove = (name: string) => {
      console.log(`Removed: ${name}`)
    }

    return (
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">New Improved Badge Design with Enhanced Remove Hover</h4>
          <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant="blue-subtle" 
                size="sm"
                className="flex items-center gap-1"
                removable
                onRemove={() => handleRemove('Web Search')}
              >
                <Settings className="w-3 h-3" />
                Web Search
              </Badge>
              <Badge 
                variant="blue-subtle" 
                size="sm"
                className="flex items-center gap-1"
                removable
                onRemove={() => handleRemove('Calculator')}
              >
                <Settings className="w-3 h-3" />
                Calculator
              </Badge>
              <Badge 
                variant="green-subtle" 
                size="sm"
                className="flex items-center gap-1"
                removable
                onRemove={() => handleRemove('Sales Analysis')}
              >
                <Briefcase className="w-3 h-3" />
                Sales Analysis
              </Badge>
            </div>
            
            <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
              ✨ Enhanced Badge design with variant-specific remove button hover effects and improved accessibility
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Previous Design (for comparison)</h4>
          <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm space-y-3">
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                <Settings className="w-3 h-3 mr-1" />
                Web Search
                <button className="ml-1 text-blue-600 hover:text-blue-800">
                  <X className="h-2 w-2" />
                </button>
              </div>
              <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                <Briefcase className="w-3 h-3 mr-1" />
                Sales Analysis
                <button className="ml-1 text-green-600 hover:text-green-800">
                  <X className="h-2 w-2" />
                </button>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
              Old design with manual styling and separate remove buttons
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const AllVariantsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="space-y-3">
        <h4 className="font-medium">Standard Variants</h4>
        <div className="space-y-2">
          <div><Badge variant="default">Default Badge</Badge></div>
          <div><Badge variant="secondary">Secondary Badge</Badge></div>
          <div><Badge variant="outline">Outline Badge</Badge></div>
          <div><Badge variant="destructive">Destructive Badge</Badge></div>
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="font-medium">With Icons</h4>
        <div className="space-y-2">
          <div>
            <Badge variant="default">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          </div>
          <div>
            <Badge variant="secondary">
              <Clock className="w-3 h-3 mr-1" />
              Pending
            </Badge>
          </div>
          <div>
            <Badge variant="outline">
              <Users className="w-3 h-3 mr-1" />
              Team
            </Badge>
          </div>
          <div>
            <Badge variant="destructive">
              <AlertCircle className="w-3 h-3 mr-1" />
              Alert
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
}
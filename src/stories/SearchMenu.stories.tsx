import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { SearchMenu } from '../components/ui/SearchMenu'
import { Search, Database, Code, Brain, Mic, Camera, Download, Upload, Zap, Briefcase, FileText, Globe, Lock, User } from 'lucide-react'

const meta: Meta<typeof SearchMenu> = {
  title: 'Components/SearchMenu',
  component: SearchMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onItemSelect: { action: 'item selected' },
    onAddNew: { action: 'add new clicked' },
    type: {
      control: 'select',
      options: ['tools', 'functions'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'modern', 'minimal', 'colorful'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    position: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
    },
    itemSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    highlightedIndex: { control: { type: 'number', min: 0, max: 10 } },
    showHeader: { control: 'boolean' },
    dense: { control: 'boolean' },
    searchTerm: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample tools data
const sampleTools = [
  {
    id: 'search',
    name: 'Web Search',
    description: 'Search the internet for information',
    icon: 'search'
  },
  {
    id: 'database',
    name: 'Database Query',
    description: 'Query your database with SQL',
    icon: 'database'
  },
  {
    id: 'code',
    name: 'Code Generator',
    description: 'Generate code in multiple languages',
    icon: 'code'
  },
  {
    id: 'ai',
    name: 'AI Assistant',
    description: 'Get help from AI for complex tasks',
    icon: 'brain'
  },
  {
    id: 'voice',
    name: 'Voice Recognition',
    description: 'Convert speech to text',
    icon: 'mic'
  },
  {
    id: 'camera',
    name: 'Image Analysis',
    description: 'Analyze and process images',
    icon: 'camera'
  },
  {
    id: 'download',
    name: 'File Downloader',
    description: 'Download files from URLs',
    icon: 'download'
  },
  {
    id: 'upload',
    name: 'File Uploader',
    description: 'Upload files to cloud storage',
    icon: 'upload'
  }
]

// Sample business functions data
const sampleBusinessFunctions = [
  {
    id: 'market-analysis',
    name: 'Market Analysis',
    description: 'Analyze market trends and competition',
    icon: 'briefcase',
    topic: 'Research'
  },
  {
    id: 'deep-research',
    name: 'Deep Research',
    description: 'Comprehensive research on any topic',
    icon: 'search',
    topic: 'Research'
  },
  {
    id: 'financial-modeling',
    name: 'Financial Modeling',
    description: 'Create financial models and projections',
    icon: 'database',
    topic: 'Finance'
  },
  {
    id: 'budget-analysis',
    name: 'Budget Analysis',
    description: 'Analyze budgets and spending patterns',
    icon: 'filetext',
    topic: 'Finance'
  },
  {
    id: 'user-research',
    name: 'User Research',
    description: 'Conduct user interviews and surveys',
    icon: 'user',
    topic: 'Product'
  },
  {
    id: 'product-strategy',
    name: 'Product Strategy',
    description: 'Develop product roadmaps and strategies',
    icon: 'zap',
    topic: 'Product'
  },
  {
    id: 'compliance-check',
    name: 'Compliance Check',
    description: 'Ensure regulatory compliance',
    icon: 'lock',
    topic: 'Legal'
  },
  {
    id: 'contract-review',
    name: 'Contract Review',
    description: 'Review and analyze contracts',
    icon: 'filetext',
    topic: 'Legal'
  }
]

export const Default: Story = {
  args: {
    type: 'tools',
    items: sampleTools.slice(0, 5),
    selectedItems: [],
    highlightedIndex: 0,
  },
}

export const BusinessFunctions: Story = {
  args: {
    type: 'functions',
    items: sampleBusinessFunctions,
    selectedItems: [],
    highlightedIndex: 0,
  },
}

export const WithSearch: Story = {
  args: {
    type: 'tools',
    items: sampleTools.filter(tool => tool.name.toLowerCase().includes('search')),
    selectedItems: [],
    highlightedIndex: 0,
    searchTerm: 'search',
  },
}

export const WithSelectedItems: Story = {
  args: {
    type: 'tools',
    items: sampleTools.slice(0, 6),
    selectedItems: ['search', 'database', 'ai'],
    highlightedIndex: 0,
  },
}

export const Themes: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h4 className="font-medium">Light Theme</h4>
        <div className="relative h-80">
          <SearchMenu 
            type="tools" 
            items={sampleTools.slice(0, 4)} 
            theme="light"
            position="bottom"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Dark Theme</h4>
        <div className="relative h-80">
          <SearchMenu 
            type="tools" 
            items={sampleTools.slice(0, 4)} 
            theme="dark"
            position="bottom"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Modern Theme</h4>
        <div className="relative h-80">
          <SearchMenu 
            type="tools" 
            items={sampleTools.slice(0, 4)} 
            theme="modern"
            position="bottom"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Minimal Theme</h4>
        <div className="relative h-80">
          <SearchMenu 
            type="tools" 
            items={sampleTools.slice(0, 4)} 
            theme="minimal"
            position="bottom"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Colorful Theme</h4>
        <div className="relative h-80">
          <SearchMenu 
            type="tools" 
            items={sampleTools.slice(0, 4)} 
            theme="colorful"
            position="bottom"
          />
        </div>
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h4 className="font-medium">Small</h4>
        <div className="relative h-64">
          <SearchMenu 
            type="tools" 
            items={sampleTools.slice(0, 3)} 
            size="sm"
            position="bottom"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Medium</h4>
        <div className="relative h-80">
          <SearchMenu 
            type="tools" 
            items={sampleTools.slice(0, 4)} 
            size="md"
            position="bottom"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Large</h4>
        <div className="relative h-96">
          <SearchMenu 
            type="tools" 
            items={sampleTools.slice(0, 5)} 
            size="lg"
            position="bottom"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Extra Large</h4>
        <div className="relative h-[28rem]">
          <SearchMenu 
            type="tools" 
            items={sampleTools} 
            size="xl"
            position="bottom"
          />
        </div>
      </div>
    </div>
  ),
}

export const EmptyState: Story = {
  args: {
    type: 'tools',
    items: [],
    selectedItems: [],
    highlightedIndex: 0,
    emptyMessage: 'No tools available at the moment',
  },
}

export const Interactive: Story = {
  render: () => {
    const [selectedTools, setSelectedTools] = useState<string[]>(['search'])
    const [selectedFunctions, setSelectedFunctions] = useState<string[]>(['market-analysis'])
    
    return (
      <div className="space-y-8 p-4">
        <h3 className="text-lg font-semibold">Interactive Examples</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Tools Menu (Interactive)</h4>
            <div className="relative h-80">
              <SearchMenu 
                type="tools" 
                items={sampleTools.slice(0, 6)} 
                selectedItems={selectedTools}
                highlightedIndex={0}
                onItemSelect={(item) => {
                  const isSelected = selectedTools.includes(item.id)
                  if (isSelected) {
                    setSelectedTools(selectedTools.filter(id => id !== item.id))
                  } else {
                    setSelectedTools([...selectedTools, item.id])
                  }
                }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Selected tools: {selectedTools.length > 0 ? selectedTools.join(', ') : 'None'}
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Business Functions Menu (Interactive)</h4>
            <div className="relative h-80">
              <SearchMenu 
                type="functions" 
                items={sampleBusinessFunctions} 
                selectedItems={selectedFunctions}
                highlightedIndex={0}
                theme="modern"
                onItemSelect={(item) => {
                  const isSelected = selectedFunctions.includes(item.id)
                  if (isSelected) {
                    setSelectedFunctions(selectedFunctions.filter(id => id !== item.id))
                  } else {
                    setSelectedFunctions([...selectedFunctions, item.id])
                  }
                }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Selected functions: {selectedFunctions.length > 0 ? selectedFunctions.join(', ') : 'None'}
            </p>
          </div>
        </div>
      </div>
    )
  },
}

export const AllVariantsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-4">
      <div className="space-y-3">
        <h4 className="font-medium">Standard Themes</h4>
        <div className="space-y-4">
          <div className="relative h-48">
            <SearchMenu 
              type="tools" 
              items={sampleTools.slice(0, 3)} 
              theme="light"
              showHeader={false}
            />
          </div>
          <div className="relative h-48">
            <SearchMenu 
              type="tools" 
              items={sampleTools.slice(0, 3)} 
              theme="modern"
              showHeader={false}
            />
          </div>
          <div className="relative h-48">
            <SearchMenu 
              type="tools" 
              items={sampleTools.slice(0, 3)} 
              theme="minimal"
              showHeader={false}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Accent Themes</h4>
        <div className="space-y-4">
          <div className="relative h-48">
            <SearchMenu 
              type="tools" 
              items={sampleTools.slice(0, 3)} 
              theme="dark"
              showHeader={false}
            />
          </div>
          <div className="relative h-48">
            <SearchMenu 
              type="tools" 
              items={sampleTools.slice(0, 3)} 
              theme="colorful"
              showHeader={false}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Different Sizes</h4>
        <div className="space-y-4">
          <div className="relative h-32">
            <SearchMenu 
              type="tools" 
              items={sampleTools.slice(0, 2)} 
              size="sm"
              itemSize="sm"
              showHeader={false}
            />
          </div>
          <div className="relative h-40">
            <SearchMenu 
              type="tools" 
              items={sampleTools.slice(0, 2)} 
              size="md"
              itemSize="md"
              showHeader={false}
            />
          </div>
          <div className="relative h-48">
            <SearchMenu 
              type="tools" 
              items={sampleTools.slice(0, 2)} 
              size="lg"
              itemSize="lg"
              showHeader={false}
            />
          </div>
        </div>
      </div>
    </div>
  ),
}
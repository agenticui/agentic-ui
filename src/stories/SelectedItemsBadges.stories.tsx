import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { SelectedItemsBadges } from '../components/ui/SelectedItemsBadges'
import { Settings, Search, Database, Code, Brain, Mic, Camera, Download, Upload, Zap, Briefcase, FileText, Globe, Lock, User, Tag, Hash } from 'lucide-react'

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
  }
]

// Sample business function
const sampleBusinessFunction = {
  id: 'market-analysis',
  name: 'Market Analysis',
  description: 'Analyze market trends and competition',
  icon: 'briefcase',
  topic: 'Research'
}

// Sample categories and tags
const sampleCategories = ['Development', 'Design', 'Marketing', 'Sales', 'Support']
const sampleTags = ['urgent', 'feature', 'bug', 'enhancement', 'documentation']

const meta: Meta<typeof SelectedItemsBadges> = {
  title: 'Components/SelectedItemsBadges',
  component: SelectedItemsBadges,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onRemoveTool: { action: 'tool removed' },
    onRemoveFunction: { action: 'function removed' },
    onRemoveCategory: { action: 'category removed' },
    onRemoveTag: { action: 'tag removed' },
    type: {
      control: 'select',
      options: ['tool', 'function', 'category', 'tag'],
    },
    variant: {
      control: 'select',
      options: ['default', 'solid', 'outline', 'subtle', 'gradient'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    density: {
      control: 'select',
      options: ['compact', 'normal', 'relaxed'],
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    showIcons: { control: 'boolean' },
    showCount: { control: 'boolean' },
    maxItems: { control: { type: 'number', min: 1, max: 20 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tools: sampleTools.slice(0, 3),
  },
}

export const WithBusinessFunction: Story = {
  args: {
    tools: sampleTools.slice(0, 2),
    businessFunction: sampleBusinessFunction,
  },
}

export const ToolsOnly: Story = {
  args: {
    tools: sampleTools,
  },
}

export const BusinessFunctionOnly: Story = {
  args: {
    businessFunction: sampleBusinessFunction,
  },
}

export const WithCategories: Story = {
  args: {
    categories: sampleCategories.slice(0, 3),
  },
}

export const WithTags: Story = {
  args: {
    tags: sampleTags.slice(0, 4),
  },
}

export const MixedItems: Story = {
  args: {
    tools: sampleTools.slice(0, 2),
    businessFunction: sampleBusinessFunction,
    categories: sampleCategories.slice(0, 2),
    tags: sampleTags.slice(0, 3),
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h4 className="font-medium">Small</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 3)} 
          size="sm"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Medium</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 3)} 
          size="md"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Large</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 3)} 
          size="lg"
        />
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h4 className="font-medium">Default</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 3)} 
          variant="default"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Solid</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 3)} 
          variant="solid"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Outline</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 3)} 
          variant="outline"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Subtle</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 3)} 
          variant="subtle"
        />
      </div>
    </div>
  ),
}

export const Layouts: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h4 className="font-medium">Horizontal Layout</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 4)}
          layout="horizontal"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Vertical Layout</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 4)}
          layout="vertical"
        />
      </div>
    </div>
  ),
}

export const Density: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h4 className="font-medium">Compact</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 4)}
          density="compact"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Normal</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 4)}
          density="normal"
        />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Relaxed</h4>
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 4)}
          density="relaxed"
        />
      </div>
    </div>
  ),
}

export const WithoutIcons: Story = {
  args: {
    tools: sampleTools.slice(0, 3),
    businessFunction: sampleBusinessFunction,
    showIcons: false,
  },
}

export const WithMaxItems: Story = {
  args: {
    tools: sampleTools,
    categories: sampleCategories,
    tags: sampleTags,
    maxItems: 5,
    showCount: true,
  },
}

export const CustomIcons: Story = {
  args: {
    tools: sampleTools.slice(0, 3),
    businessFunction: sampleBusinessFunction,
    toolsIcon: <Zap className="w-3 h-3" />,
    functionsIcon: <Globe className="w-3 h-3" />,
  },
}

export const WithRemoval: Story = {
  render: () => {
    const [tools, setTools] = useState(sampleTools.slice(0, 3))
    const [businessFunction, setBusinessFunction] = useState(sampleBusinessFunction)
    const [categories, setCategories] = useState(sampleCategories.slice(0, 2))
    const [tags, setTags] = useState(sampleTags.slice(0, 3))
    
    return (
      <div className="space-y-4 w-full max-w-4xl">
        <SelectedItemsBadges 
          tools={tools}
          businessFunction={businessFunction}
          categories={categories}
          tags={tags}
          onRemoveTool={(tool) => setTools(tools.filter(t => t.id !== tool.id))}
          onRemoveFunction={() => setBusinessFunction(null)}
          onRemoveCategory={(cat) => setCategories(categories.filter(c => c !== cat))}
          onRemoveTag={(tag) => setTags(tags.filter(t => t !== tag))}
        />
        <div className="text-sm text-gray-600">
          Click the × button on any badge to remove it.
        </div>
      </div>
    )
  },
}

export const ItemTypes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h4 className="font-medium">Tools</h4>
        <SelectedItemsBadges tools={sampleTools.slice(0, 3)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Business Function</h4>
        <SelectedItemsBadges businessFunction={sampleBusinessFunction} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Categories</h4>
        <SelectedItemsBadges categories={sampleCategories.slice(0, 3)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Tags</h4>
        <SelectedItemsBadges tags={sampleTags.slice(0, 4)} />
      </div>
    </div>
  ),
}

export const SizeVariantMatrix: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-6xl">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="space-y-4">
          <h3 className="text-lg font-semibold capitalize">{size} Size</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Default</h4>
              <SelectedItemsBadges 
                tools={sampleTools.slice(0, 3)} 
                size={size} 
                variant="default"
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Outline</h4>
              <SelectedItemsBadges 
                tools={sampleTools.slice(0, 3)} 
                size={size} 
                variant="outline"
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Mixed Items</h4>
              <SelectedItemsBadges 
                tools={sampleTools.slice(0, 2)}
                businessFunction={sampleBusinessFunction}
                size={size}
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Categories & Tags</h4>
              <SelectedItemsBadges 
                categories={sampleCategories.slice(0, 2)}
                tags={sampleTags.slice(0, 2)}
                size={size}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    const [selectedTools, setSelectedTools] = useState(sampleTools.slice(0, 2))
    const [selectedFunction, setSelectedFunction] = useState(sampleBusinessFunction)
    const [selectedCategories, setSelectedCategories] = useState(sampleCategories.slice(0, 2))
    const [selectedTags, setSelectedTags] = useState(sampleTags.slice(0, 3))
    
    return (
      <div className="space-y-6 w-full max-w-4xl">
        <h3 className="text-lg font-semibold">Interactive Examples</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">All Selected Items</h4>
            <SelectedItemsBadges 
              tools={selectedTools}
              businessFunction={selectedFunction}
              categories={selectedCategories}
              tags={selectedTags}
              onRemoveTool={(tool) => setSelectedTools(selectedTools.filter(t => t.id !== tool.id))}
              onRemoveFunction={() => setSelectedFunction(null)}
              onRemoveCategory={(cat) => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
              onRemoveTag={(tag) => setSelectedTags(selectedTags.filter(t => t !== tag))}
            />
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">With Maximum Items (3) and Count</h4>
            <SelectedItemsBadges 
              tools={selectedTools}
              businessFunction={selectedFunction}
              categories={selectedCategories}
              tags={selectedTags}
              maxItems={3}
              showCount={true}
            />
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Vertical Layout with Large Size</h4>
            <SelectedItemsBadges 
              tools={selectedTools}
              businessFunction={selectedFunction}
              layout="vertical"
              size="lg"
              density="relaxed"
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          Click the × button on any badge to remove it. The display will update automatically.
        </div>
      </div>
    )
  },
}

export const RealWorldExample: Story = {
  render: () => {
    const projectTools = [
      { id: 'figma', name: 'Figma', description: 'Design tool', icon: 'design' },
      { id: 'slack', name: 'Slack', description: 'Communication', icon: 'chat' },
      { id: 'github', name: 'GitHub', description: 'Version control', icon: 'code' },
    ]
    
    const researchFunction = {
      id: 'user-research',
      name: 'User Research',
      description: 'Conduct user interviews and surveys',
      icon: 'user',
      topic: 'Product'
    }
    
    const projectCategories = ['Frontend', 'Backend', 'UI/UX']
    const projectTags = ['high-priority', 'sprint-1', 'feature-request']
    
    return (
      <div className="space-y-6 w-full max-w-4xl">
        <div className="space-y-2">
          <h4 className="font-medium">Project Tools & Setup</h4>
          <SelectedItemsBadges 
            tools={projectTools}
            businessFunction={researchFunction}
            categories={projectCategories}
            tags={projectTags}
            size="md"
            density="normal"
          />
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Task Management (Compact View)</h4>
          <SelectedItemsBadges 
            categories={['Bug Fix', 'Enhancement', 'Documentation']}
            tags={['urgent', 'review-needed', 'ready-for-testing']}
            size="sm"
            density="compact"
            variant="outline"
            maxItems={4}
            showCount={true}
          />
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Team Preferences (Large Cards)</h4>
          <SelectedItemsBadges 
            tools={[{ id: 'vs-code', name: 'VS Code', description: 'Code editor' }]}
            categories={['Development', 'Design']}
            size="lg"
            density="relaxed"
            variant="subtle"
            layout="vertical"
          />
        </div>
      </div>
    )
  },
}

export const Empty: Story = {
  args: {
    tools: [],
    businessFunction: null,
    categories: [],
    tags: [],
  },
}

export const AllVariantsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4 w-full max-w-6xl">
      <div className="space-y-3">
        <h4 className="font-medium">Different Item Types</h4>
        <div className="space-y-3">
          <SelectedItemsBadges tools={[sampleTools[0]]} />
          <SelectedItemsBadges businessFunction={sampleBusinessFunction} />
          <SelectedItemsBadges categories={[sampleCategories[0]]} />
          <SelectedItemsBadges tags={[sampleTags[0]]} />
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="font-medium">Different Variants</h4>
        <div className="space-y-3">
          <SelectedItemsBadges tools={[sampleTools[0]]} variant="default" />
          <SelectedItemsBadges tools={[sampleTools[1]]} variant="solid" />
          <SelectedItemsBadges tools={[sampleTools[2]]} variant="outline" />
          <SelectedItemsBadges tools={[sampleTools[3]]} variant="subtle" />
        </div>
      </div>
    </div>
  ),
}
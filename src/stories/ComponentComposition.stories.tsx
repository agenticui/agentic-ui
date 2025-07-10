import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { 
  AttachmentButton, 
  ToolsButton, 
  SearchMenu, 
  FileDisplay, 
  SelectedItemsBadges,
  DragDropOverlay 
} from '../components/ui'
import { Zap, Brain } from 'lucide-react'

const meta: Meta = {
  title: 'Examples/Component Composition',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleTools = [
  { id: '1', name: 'Web Search', description: 'Search the web for current information' },
  { id: '2', name: 'Database Query', description: 'Query internal databases for specific data' },
  { id: '3', name: 'Code Analysis', description: 'Analyze and review code repositories' },
]

const sampleFiles = [
  {
    id: '1',
    name: 'document.pdf',
    size: 1024 * 1024,
    type: 'application/pdf',
    uploadedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'image.png',
    size: 512 * 1024,
    type: 'image/png',
    isImage: true,
    uploadedAt: new Date().toISOString(),
  },
]

export const InputControls: Story = {
  render: () => {
    const [showToolsMenu, setShowToolsMenu] = useState(false)
    const [selectedTools, setSelectedTools] = useState([sampleTools[0]])
    const [fileCount, setFileCount] = useState(2)

    return (
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Chat Input Controls</h3>
        
        <div className="flex items-center gap-2">
          <AttachmentButton
            fileCount={fileCount}
            maxFiles={5}
            tooltip="Upload files"
            onFileSelect={() => setFileCount(prev => Math.min(prev + 1, 5))}
          />
          
          <ToolsButton
            icon={<Zap className="w-4 h-4" />}
            label="AI Tools"
            isActive={showToolsMenu}
            onToggle={() => setShowToolsMenu(!showToolsMenu)}
          />
          
          <ToolsButton
            icon={<Brain className="w-4 h-4" />}
            label="Deep Research"
            variant="default"
          />
        </div>

        <SelectedItemsBadges
          tools={selectedTools}
          toolsIcon={<Zap className="w-3 h-3" />}
          onRemoveTool={(tool) => setSelectedTools(prev => prev.filter(t => t.id !== tool.id))}
        />

        {showToolsMenu && (
          <SearchMenu
            type="tools"
            items={sampleTools}
            selectedItems={selectedTools.map(t => t.id)}
            onItemSelect={(item) => {
              const tool = item as typeof sampleTools[0]
              setSelectedTools(prev => {
                const exists = prev.find(t => t.id === tool.id)
                if (exists) {
                  return prev.filter(t => t.id !== tool.id)
                }
                return [...prev, tool]
              })
            }}
            icon={<Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />}
            headerTitle="AI Tools"
          />
        )}
      </div>
    )
  },
}

export const FileManagement: Story = {
  render: () => {
    const [files, setFiles] = useState(sampleFiles)
    const [dragActive, setDragActive] = useState(false)

    return (
      <div className="space-y-4 p-4 border rounded-lg relative">
        <h3 className="text-lg font-semibold">File Management</h3>
        
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setDragActive(!dragActive)}
        >
          {dragActive ? 'Hide' : 'Show'} Drag Overlay
        </button>

        <DragDropOverlay 
          isActive={dragActive} 
          maxFileSize={10 * 1024 * 1024}
        />
        
        <FileDisplay
          files={files}
          maxFiles={5}
          onRemoveFile={(fileId) => setFiles(prev => prev.filter(f => f.id !== fileId))}
        />
      </div>
    )
  },
}

export const CompleteExample: Story = {
  render: () => {
    const [selectedTools, setSelectedTools] = useState([sampleTools[0]])
    const [showToolsMenu, setShowToolsMenu] = useState(false)
    const [files, setFiles] = useState(sampleFiles)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredTools = sampleTools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <div className="space-y-4 p-6 border rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold">Complete Chat Input Components</h3>
        
        <FileDisplay
          files={files}
          maxFiles={10}
          onRemoveFile={(fileId) => setFiles(prev => prev.filter(f => f.id !== fileId))}
        />

        <div className="bg-white border rounded-xl p-4 space-y-3">
          <SelectedItemsBadges
            tools={selectedTools}
            toolsIcon={<Zap className="w-3 h-3" />}
            onRemoveTool={(tool) => setSelectedTools(prev => prev.filter(t => t.id !== tool.id))}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AttachmentButton
                fileCount={files.length}
                maxFiles={10}
                tooltip="Upload files"
              />
              
              <ToolsButton
                icon={<Zap className="w-4 h-4" />}
                label="AI Tools"
                isActive={showToolsMenu}
                onToggle={() => setShowToolsMenu(!showToolsMenu)}
              />
            </div>
            
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 border rounded text-sm"
            />
          </div>

          {showToolsMenu && (
            <SearchMenu
              type="tools"
              items={filteredTools}
              selectedItems={selectedTools.map(t => t.id)}
              searchTerm={searchTerm}
              onItemSelect={(item) => {
                const tool = item as typeof sampleTools[0]
                setSelectedTools(prev => {
                  const exists = prev.find(t => t.id === tool.id)
                  if (exists) {
                    return prev.filter(t => t.id !== tool.id)
                  }
                  return [...prev, tool]
                })
              }}
              icon={<Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />}
              headerTitle="AI Tools"
            />
          )}
        </div>
      </div>
    )
  },
}
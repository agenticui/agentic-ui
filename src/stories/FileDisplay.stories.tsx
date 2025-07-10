import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { FileDisplay } from '../components/ui/FileDisplay'

// Sample file data for stories
const sampleFiles = [
  {
    id: '1',
    name: 'document.pdf',
    size: 2457600, // 2.4 MB
    type: 'application/pdf',
    uploadedAt: '2024-01-15T10:30:00Z',
    url: '/files/document.pdf'
  },
  {
    id: '2',
    name: 'presentation.pptx',
    size: 5242880, // 5 MB
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    uploadedAt: '2024-01-15T10:31:00Z',
    url: '/files/presentation.pptx'
  },
  {
    id: '3',
    name: 'image.jpg',
    size: 1048576, // 1 MB
    type: 'image/jpeg',
    isImage: true,
    uploadedAt: '2024-01-15T10:32:00Z',
    url: '/files/image.jpg'
  },
  {
    id: '4',
    name: 'spreadsheet.xlsx',
    size: 3145728, // 3 MB
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    uploadedAt: '2024-01-15T10:33:00Z',
    url: '/files/spreadsheet.xlsx'
  },
  {
    id: '5',
    name: 'readme.txt',
    size: 4096, // 4 KB
    type: 'text/plain',
    uploadedAt: '2024-01-15T10:34:00Z',
    url: '/files/readme.txt'
  }
]

const meta: Meta<typeof FileDisplay> = {
  title: 'Components/FileDisplay',
  component: FileDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onRemoveFile: { action: 'file removed' },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'uploading', 'warning', 'processing', 'outline', 'ghost'],
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
    showTotal: { control: 'boolean' },
    showCount: { control: 'boolean' },
    maxFiles: { control: { type: 'number', min: 1, max: 20 } },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    files: sampleFiles.slice(0, 3),
    maxFiles: 10,
  },
}

export const Empty: Story = {
  args: {
    files: [],
    maxFiles: 10,
  },
}

export const SingleFile: Story = {
  args: {
    files: [sampleFiles[0]],
    maxFiles: 10,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h4 className="font-medium">Default</h4>
        <FileDisplay variant="default" files={sampleFiles.slice(0, 2)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Success</h4>
        <FileDisplay variant="success" files={sampleFiles.slice(0, 2)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Uploading</h4>
        <FileDisplay variant="uploading" files={sampleFiles.slice(0, 2)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Warning</h4>
        <FileDisplay variant="warning" files={sampleFiles.slice(0, 2)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Error</h4>
        <FileDisplay variant="error" files={sampleFiles.slice(0, 2)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Processing</h4>
        <FileDisplay variant="processing" files={sampleFiles.slice(0, 2)} />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h4 className="font-medium">Small</h4>
        <FileDisplay size="sm" files={sampleFiles.slice(0, 3)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Medium</h4>
        <FileDisplay size="md" files={sampleFiles.slice(0, 3)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Large</h4>
        <FileDisplay size="lg" files={sampleFiles.slice(0, 3)} />
      </div>
    </div>
  ),
}

export const Layouts: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h4 className="font-medium">Horizontal Layout</h4>
        <FileDisplay layout="horizontal" files={sampleFiles.slice(0, 3)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Vertical Layout</h4>
        <FileDisplay layout="vertical" files={sampleFiles.slice(0, 3)} />
      </div>
    </div>
  ),
}

export const Density: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h4 className="font-medium">Compact</h4>
        <FileDisplay density="compact" files={sampleFiles.slice(0, 3)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Normal</h4>
        <FileDisplay density="normal" files={sampleFiles.slice(0, 3)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Relaxed</h4>
        <FileDisplay density="relaxed" files={sampleFiles.slice(0, 3)} />
      </div>
    </div>
  ),
}

export const FileTypes: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <FileDisplay files={sampleFiles} />
    </div>
  ),
}

export const WithRemoval: Story = {
  render: () => {
    return (
      <div className="w-full max-w-4xl">
        <FileDisplay 
          files={sampleFiles.slice(0, 3)} 
          onRemoveFile={(fileId) => alert(`Remove file: ${fileId}`)}
        />
      </div>
    )
  },
}

export const WithoutHeader: Story = {
  args: {
    files: sampleFiles.slice(0, 3),
    showCount: false,
    showTotal: false,
  },
}

export const MaxFilesReached: Story = {
  args: {
    files: sampleFiles,
    maxFiles: 5,
  },
}

export const LargeFiles: Story = {
  render: () => {
    const largeFiles = [
      {
        id: '1',
        name: 'large-video.mp4',
        size: 1073741824, // 1 GB
        type: 'video/mp4',
        uploadedAt: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        name: 'dataset.csv',
        size: 536870912, // 512 MB
        type: 'text/csv',
        uploadedAt: '2024-01-15T10:31:00Z',
      },
      {
        id: '3',
        name: 'archive.zip',
        size: 268435456, // 256 MB
        type: 'application/zip',
        uploadedAt: '2024-01-15T10:32:00Z',
      },
    ]
    return (
      <div className="w-full max-w-4xl">
        <FileDisplay files={largeFiles} variant="success" />
      </div>
    )
  },
}

export const SmallFiles: Story = {
  render: () => {
    const smallFiles = [
      {
        id: '1',
        name: 'config.json',
        size: 1024, // 1 KB
        type: 'application/json',
        uploadedAt: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        name: 'style.css',
        size: 2048, // 2 KB
        type: 'text/css',
        uploadedAt: '2024-01-15T10:31:00Z',
      },
      {
        id: '3',
        name: 'index.html',
        size: 4096, // 4 KB
        type: 'text/html',
        uploadedAt: '2024-01-15T10:32:00Z',
      },
    ]
    return (
      <div className="w-full max-w-4xl">
        <FileDisplay files={smallFiles} variant="success" />
      </div>
    )
  },
}

export const OutlineAndGhost: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div className="space-y-2">
        <h4 className="font-medium">Outline</h4>
        <FileDisplay variant="outline" files={sampleFiles.slice(0, 3)} />
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Ghost</h4>
        <FileDisplay variant="ghost" files={sampleFiles.slice(0, 3)} />
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
              <h4 className="font-medium">Success</h4>
              <FileDisplay size={size} variant="success" files={sampleFiles.slice(0, 2)} />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Uploading</h4>
              <FileDisplay size={size} variant="uploading" files={sampleFiles.slice(0, 2)} />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Warning</h4>
              <FileDisplay size={size} variant="warning" files={sampleFiles.slice(0, 2)} />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Error</h4>
              <FileDisplay size={size} variant="error" files={sampleFiles.slice(0, 2)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    return (
      <div className="space-y-4 w-full max-w-4xl">
        <h3 className="text-lg font-semibold">Interactive Examples</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">With File Removal</h4>
            <FileDisplay 
              files={sampleFiles.slice(0, 3)} 
              onRemoveFile={(fileId) => {
                const file = sampleFiles.find(f => f.id === fileId)
                alert(`Remove "${file?.name}" (${fileId})`)
              }}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Upload States</h4>
            <div className="space-y-2">
              <FileDisplay variant="uploading" files={[sampleFiles[0]]} />
              <FileDisplay variant="processing" files={[sampleFiles[1]]} />
              <FileDisplay variant="success" files={[sampleFiles[2]]} />
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const RealWorldExample: Story = {
  render: () => {
    const projectFiles = [
      {
        id: '1',
        name: 'project-requirements.pdf',
        size: 2457600,
        type: 'application/pdf',
        uploadedAt: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        name: 'design-mockups.sketch',
        size: 15728640,
        type: 'application/sketch',
        uploadedAt: '2024-01-15T10:31:00Z',
      },
      {
        id: '3',
        name: 'logo.svg',
        size: 52428,
        type: 'image/svg+xml',
        uploadedAt: '2024-01-15T10:32:00Z',
      },
      {
        id: '4',
        name: 'user-research.xlsx',
        size: 8388608,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        uploadedAt: '2024-01-15T10:33:00Z',
      },
    ]

    return (
      <div className="space-y-6 w-full max-w-4xl">
        <div className="space-y-2">
          <h4 className="font-medium">Project Upload</h4>
          <FileDisplay 
            files={projectFiles} 
            maxFiles={10}
            variant="success"
            onRemoveFile={(fileId) => alert(`Remove file: ${fileId}`)}
          />
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Processing Upload</h4>
          <FileDisplay 
            files={projectFiles.slice(0, 2)} 
            variant="processing"
          />
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Upload Error</h4>
          <FileDisplay 
            files={[projectFiles[0]]} 
            variant="error"
          />
        </div>
      </div>
    )
  },
}

export const AllVariantsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4 w-full max-w-6xl">
      <div className="space-y-3">
        <h4 className="font-medium">Status Variants</h4>
        <div className="space-y-3">
          <FileDisplay variant="default" files={[sampleFiles[0]]} showCount={false} showTotal={false} />
          <FileDisplay variant="success" files={[sampleFiles[1]]} showCount={false} showTotal={false} />
          <FileDisplay variant="uploading" files={[sampleFiles[2]]} showCount={false} showTotal={false} />
          <FileDisplay variant="processing" files={[sampleFiles[3]]} showCount={false} showTotal={false} />
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="font-medium">Alert Variants</h4>
        <div className="space-y-3">
          <FileDisplay variant="warning" files={[sampleFiles[0]]} showCount={false} showTotal={false} />
          <FileDisplay variant="error" files={[sampleFiles[1]]} showCount={false} showTotal={false} />
          <FileDisplay variant="outline" files={[sampleFiles[2]]} showCount={false} showTotal={false} />
          <FileDisplay variant="ghost" files={[sampleFiles[3]]} showCount={false} showTotal={false} />
        </div>
      </div>
    </div>
  ),
}
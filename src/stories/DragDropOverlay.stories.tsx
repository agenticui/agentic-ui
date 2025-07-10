import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { DragDropOverlay } from '../components/ui/DragDropOverlay'
import { Upload, FileImage, FileText, Download, Camera, Music, Video, Archive, Code, Database } from 'lucide-react'

const meta: Meta<typeof DragDropOverlay> = {
  title: 'Components/DragDropOverlay',
  component: DragDropOverlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'minimal', 'dark', 'colorful'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    animation: {
      control: 'select',
      options: ['none', 'pulse', 'bounce', 'fade'],
    },
    showFileInfo: { control: 'boolean' },
    showAnimation: { control: 'boolean' },
    maxFileSize: { control: { type: 'number', min: 0 } },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isActive: true,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Default</h4>
        <DragDropOverlay isActive={true} variant="default" />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Success</h4>
        <DragDropOverlay isActive={true} variant="success" title="Files uploaded successfully!" />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Warning</h4>
        <DragDropOverlay isActive={true} variant="warning" title="Some files may be too large" />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Error</h4>
        <DragDropOverlay isActive={true} variant="error" title="Upload failed" subtitle="Please try again" />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Minimal</h4>
        <DragDropOverlay isActive={true} variant="minimal" />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Dark</h4>
        <DragDropOverlay isActive={true} variant="dark" />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Colorful</h4>
        <DragDropOverlay isActive={true} variant="colorful" />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">Small</h4>
        <div className="relative h-32">
          <DragDropOverlay isActive={true} size="sm" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Medium</h4>
        <div className="relative h-48">
          <DragDropOverlay isActive={true} size="md" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Large</h4>
        <div className="relative h-64">
          <DragDropOverlay isActive={true} size="lg" />
        </div>
      </div>
    </div>
  ),
}

export const Animations: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">No Animation</h4>
        <DragDropOverlay isActive={true} animation="none" />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Bounce Animation</h4>
        <DragDropOverlay isActive={true} animation="bounce" showAnimation={true} />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Pulse Animation</h4>
        <DragDropOverlay isActive={true} animation="pulse" showAnimation={true} />
      </div>
    </div>
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-4">
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Image Upload</h4>
        <DragDropOverlay 
          isActive={true} 
          icon={<FileImage className="w-16 h-16 mx-auto mb-4" />}
          title="Drop your images here"
          subtitle="Supports JPG, PNG, GIF formats"
          acceptedFileTypes={['JPG', 'PNG', 'GIF']}
        />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Document Upload</h4>
        <DragDropOverlay 
          isActive={true} 
          icon={<FileText className="w-16 h-16 mx-auto mb-4" />}
          title="Drop your documents here"
          subtitle="Supports PDF, DOC, TXT formats"
          acceptedFileTypes={['PDF', 'DOC', 'TXT']}
        />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Video Upload</h4>
        <DragDropOverlay 
          isActive={true} 
          icon={<Video className="w-16 h-16 mx-auto mb-4" />}
          title="Drop your videos here"
          subtitle="Supports MP4, AVI, MOV formats"
          acceptedFileTypes={['MP4', 'AVI', 'MOV']}
          variant="colorful"
        />
      </div>
      <div className="relative h-64">
        <h4 className="mb-2 font-medium">Code Upload</h4>
        <DragDropOverlay 
          isActive={true} 
          icon={<Code className="w-16 h-16 mx-auto mb-4" />}
          title="Drop your code files here"
          subtitle="Supports JS, TS, PY, HTML formats"
          acceptedFileTypes={['JS', 'TS', 'PY', 'HTML']}
          variant="minimal"
        />
      </div>
    </div>
  ),
}

export const WithFileSize: Story = {
  args: {
    isActive: true,
    maxFileSize: 10485760, // 10 MB
    title: 'Drop files (max 10MB)',
  },
}

export const WithoutFileInfo: Story = {
  args: {
    isActive: true,
    showFileInfo: false,
    title: 'Drop files here',
  },
}

export const CustomText: Story = {
  args: {
    isActive: true,
    title: 'Upload your project files',
    subtitle: 'We accept source code, documentation, and assets',
    acceptedFileTypes: ['JS', 'TS', 'MD', 'JSON', 'CSS'],
    maxFileSize: 5242880, // 5 MB
  },
}

export const SuccessState: Story = {
  args: {
    isActive: true,
    variant: 'success',
    title: 'Files uploaded successfully!',
    subtitle: 'Your files have been processed',
    icon: <Download className="w-16 h-16 mx-auto mb-4" />,
    showFileInfo: false,
  },
}

export const ErrorState: Story = {
  args: {
    isActive: true,
    variant: 'error',
    title: 'Upload failed',
    subtitle: 'Please check your files and try again',
    showFileInfo: false,
  },
}

export const Interactive: Story = {
  render: () => {
    const [isActive, setIsActive] = useState(false)
    const [variant, setVariant] = useState<'default' | 'success' | 'error'>('default')
    
    const handleToggle = () => {
      if (isActive) {
        // Simulate upload completion
        setVariant('success')
        setTimeout(() => {
          setIsActive(false)
          setVariant('default')
        }, 2000)
      } else {
        setIsActive(true)
        setVariant('default')
      }
    }
    
    const handleError = () => {
      setVariant('error')
      setTimeout(() => {
        setIsActive(false)
        setVariant('default')
      }, 2000)
    }
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="flex gap-2">
          <button 
            onClick={handleToggle}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isActive ? 'Complete Upload' : 'Start Upload'}
          </button>
          {isActive && (
            <button 
              onClick={handleError}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Simulate Error
            </button>
          )}
        </div>
        <div className="relative h-64 border-2 border-dashed border-gray-300 rounded-lg">
          <DragDropOverlay 
            isActive={isActive} 
            variant={variant}
            title={variant === 'success' ? 'Upload successful!' : variant === 'error' ? 'Upload failed!' : 'Drop your files here'}
            subtitle={variant === 'success' ? 'Files processed successfully' : variant === 'error' ? 'Please try again' : 'Drag and drop to upload'}
            animation={variant === 'default' ? 'bounce' : 'none'}
            showAnimation={true}
          />
        </div>
      </div>
    )
  },
}

export const SizeVariantMatrix: Story = {
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="space-y-4">
          <h3 className="text-lg font-semibold capitalize">{size} Size</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className={`relative ${size === 'sm' ? 'h-32' : size === 'md' ? 'h-48' : 'h-64'}`}>
              <h4 className="mb-2 font-medium">Default</h4>
              <DragDropOverlay isActive={true} size={size} variant="default" />
            </div>
            <div className={`relative ${size === 'sm' ? 'h-32' : size === 'md' ? 'h-48' : 'h-64'}`}>
              <h4 className="mb-2 font-medium">Success</h4>
              <DragDropOverlay isActive={true} size={size} variant="success" />
            </div>
            <div className={`relative ${size === 'sm' ? 'h-32' : size === 'md' ? 'h-48' : 'h-64'}`}>
              <h4 className="mb-2 font-medium">Error</h4>
              <DragDropOverlay isActive={true} size={size} variant="error" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const RealWorldExample: Story = {
  render: () => {
    const [uploadState, setUploadState] = useState<'idle' | 'dropping' | 'uploading' | 'success' | 'error'>('idle')
    
    const scenarios = [
      {
        title: 'Profile Picture Upload',
        icon: <Camera className="w-16 h-16 mx-auto mb-4" />,
        acceptedTypes: ['JPG', 'PNG'],
        maxSize: 2097152, // 2MB
        variant: 'default' as const
      },
      {
        title: 'Document Submission',
        icon: <FileText className="w-16 h-16 mx-auto mb-4" />,
        acceptedTypes: ['PDF', 'DOC', 'DOCX'],
        maxSize: 10485760, // 10MB
        variant: 'minimal' as const
      },
      {
        title: 'Database Backup',
        icon: <Database className="w-16 h-16 mx-auto mb-4" />,
        acceptedTypes: ['SQL', 'BAK', 'ZIP'],
        maxSize: 104857600, // 100MB
        variant: 'dark' as const
      },
      {
        title: 'Media Library',
        icon: <Music className="w-16 h-16 mx-auto mb-4" />,
        acceptedTypes: ['MP3', 'MP4', 'WAV', 'AVI'],
        maxSize: 52428800, // 50MB
        variant: 'colorful' as const
      }
    ]
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Real-world Upload Scenarios</h3>
        <div className="grid grid-cols-2 gap-6">
          {scenarios.map((scenario, index) => (
            <div key={index} className="relative h-64">
              <h4 className="mb-2 font-medium">{scenario.title}</h4>
              <DragDropOverlay 
                isActive={true}
                variant={scenario.variant}
                icon={scenario.icon}
                title={`Upload ${scenario.title.toLowerCase()}`}
                acceptedFileTypes={scenario.acceptedTypes}
                maxFileSize={scenario.maxSize}
                animation="pulse"
                showAnimation={true}
              />
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const Inactive: Story = {
  args: {
    isActive: false,
  },
}

export const AllVariantsShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-4">
      <div className="space-y-3">
        <h4 className="font-medium">Standard Variants</h4>
        <div className="space-y-4">
          <div className="relative h-32">
            <DragDropOverlay isActive={true} variant="default" size="sm" />
          </div>
          <div className="relative h-32">
            <DragDropOverlay isActive={true} variant="minimal" size="sm" />
          </div>
          <div className="relative h-32">
            <DragDropOverlay isActive={true} variant="dark" size="sm" />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Status Variants</h4>
        <div className="space-y-4">
          <div className="relative h-32">
            <DragDropOverlay isActive={true} variant="success" size="sm" showFileInfo={false} />
          </div>
          <div className="relative h-32">
            <DragDropOverlay isActive={true} variant="warning" size="sm" showFileInfo={false} />
          </div>
          <div className="relative h-32">
            <DragDropOverlay isActive={true} variant="error" size="sm" showFileInfo={false} />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Special Effects</h4>
        <div className="space-y-4">
          <div className="relative h-32">
            <DragDropOverlay isActive={true} variant="colorful" size="sm" animation="bounce" showAnimation={true} />
          </div>
          <div className="relative h-32">
            <DragDropOverlay isActive={true} variant="default" size="sm" animation="pulse" showAnimation={true} />
          </div>
          <div className="relative h-32">
            <DragDropOverlay isActive={true} variant="success" size="sm" showFileInfo={false} />
          </div>
        </div>
      </div>
    </div>
  ),
}
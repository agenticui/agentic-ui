import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { AttachmentButton } from '../components/ui/AttachmentButton'
import { Upload, Paperclip, Camera, File } from 'lucide-react'

const meta: Meta<typeof AttachmentButton> = {
  title: 'Components/AttachmentButton',
  component: AttachmentButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onFileSelect: { action: 'file select clicked' },
    state: {
      control: 'select',
      options: ['default', 'uploading', 'error', 'maxFiles', 'success', 'warning'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    isUploading: { control: 'boolean' },
    fileCount: { control: { type: 'number', min: 0, max: 20 } },
    maxFiles: { control: { type: 'number', min: 1, max: 20 } },
    showCount: { control: 'boolean' },
    tooltip: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    tooltip: 'Upload files',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AttachmentButton size="sm" tooltip="Small" />
      <AttachmentButton size="md" tooltip="Medium" />
      <AttachmentButton size="lg" tooltip="Large" />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AttachmentButton variant="solid" tooltip="Solid" />
      <AttachmentButton variant="outline" tooltip="Outline" />
      <AttachmentButton variant="ghost" tooltip="Ghost" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AttachmentButton state="default" tooltip="Default" />
      <AttachmentButton state="uploading" tooltip="Uploading" />
      <AttachmentButton state="success" tooltip="Success" />
      <AttachmentButton state="warning" tooltip="Warning" />
      <AttachmentButton state="error" tooltip="Error" />
      <AttachmentButton state="maxFiles" tooltip="Max Files" />
    </div>
  ),
}

export const WithFiles: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AttachmentButton fileCount={1} maxFiles={10} tooltip="1 file" />
      <AttachmentButton fileCount={3} maxFiles={10} tooltip="3 files" />
      <AttachmentButton fileCount={7} maxFiles={10} tooltip="7 files" />
      <AttachmentButton fileCount={10} maxFiles={10} tooltip="Max files reached" />
    </div>
  ),
}

export const Uploading: Story = {
  args: {
    isUploading: true,
    fileCount: 2,
    tooltip: 'Uploading files...',
  },
}

export const MaxFiles: Story = {
  args: {
    fileCount: 5,
    maxFiles: 5,
    tooltip: 'Maximum files reached',
  },
}

export const CustomIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <AttachmentButton 
        icon={<Upload className="h-4 w-4" />} 
        tooltip="Upload" 
      />
      <AttachmentButton 
        icon={<Paperclip className="h-4 w-4" />} 
        tooltip="Attach" 
      />
      <AttachmentButton 
        icon={<Camera className="h-4 w-4" />} 
        tooltip="Photo" 
      />
      <AttachmentButton 
        icon={<File className="h-4 w-4" />} 
        tooltip="File" 
      />
    </div>
  ),
}

export const WithoutCount: Story = {
  args: {
    fileCount: 5,
    showCount: false,
    tooltip: 'Files uploaded (count hidden)',
  },
}

export const SizeAndVariantCombinations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium w-16">Small:</div>
        <AttachmentButton size="sm" variant="solid" fileCount={1} />
        <AttachmentButton size="sm" variant="outline" fileCount={2} />
        <AttachmentButton size="sm" variant="ghost" fileCount={3} />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium w-16">Medium:</div>
        <AttachmentButton size="md" variant="solid" fileCount={1} />
        <AttachmentButton size="md" variant="outline" fileCount={2} />
        <AttachmentButton size="md" variant="ghost" fileCount={3} />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium w-16">Large:</div>
        <AttachmentButton size="lg" variant="solid" fileCount={1} />
        <AttachmentButton size="lg" variant="outline" fileCount={2} />
        <AttachmentButton size="lg" variant="ghost" fileCount={3} />
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Examples</h3>
        <div className="flex items-center gap-4">
          <AttachmentButton 
            fileCount={0}
            tooltip="Click to upload files"
            onFileSelect={() => alert('File selector would open')}
          />
          <AttachmentButton 
            isUploading={true}
            fileCount={2}
            tooltip="Uploading in progress..."
          />
          <AttachmentButton 
            state="success"
            fileCount={3}
            tooltip="Files uploaded successfully"
          />
        </div>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    tooltip: 'Upload disabled',
  },
}

export const AllStatesShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-4">
      <div className="space-y-2">
        <h4 className="font-medium">Default States</h4>
        <div className="flex gap-2">
          <AttachmentButton state="default" tooltip="Default" />
          <AttachmentButton state="uploading" tooltip="Uploading" />
          <AttachmentButton state="success" tooltip="Success" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Error States</h4>
        <div className="flex gap-2">
          <AttachmentButton state="warning" tooltip="Warning" />
          <AttachmentButton state="error" tooltip="Error" />
          <AttachmentButton state="maxFiles" tooltip="Max Files" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">With Counts</h4>
        <div className="flex gap-2">
          <AttachmentButton fileCount={1} tooltip="1 file" />
          <AttachmentButton fileCount={5} tooltip="5 files" />
          <AttachmentButton fileCount={10} maxFiles={10} tooltip="Max reached" />
        </div>
      </div>
    </div>
  ),
}
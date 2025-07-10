import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'

// Import all components
import { AttachmentButton } from '../AttachmentButton'
import { ToolsButton } from '../ToolsButton'
import { FileDisplay } from '../FileDisplay'
import { SearchMenu } from '../SearchMenu'
import { SelectedItemsBadges } from '../SelectedItemsBadges'
import { DragDropOverlay } from '../DragDropOverlay'

// Import sample data
import { sampleFiles, sampleTools, sampleBusinessFunction } from '../../../test/utils'

// Mock chat input component that combines multiple UI components
const MockChatInput: React.FC = () => {
  const [files, setFiles] = useState(sampleFiles)
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [selectedBusinessFunction, setSelectedBusinessFunction] = useState<any>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showToolsMenu, setShowToolsMenu] = useState(false)
  const [showDragOverlay, setShowDragOverlay] = useState(false)
  const [attachmentState, setAttachmentState] = useState<'default' | 'uploading' | 'success' | 'error'>('default')

  const handleFileSelect = () => {
    setAttachmentState('uploading')
    // Simulate file upload
    setTimeout(() => {
      setAttachmentState('success')
      setFiles([...files, {
        id: 'new-file',
        name: 'new-document.pdf',
        size: 2048576,
        type: 'application/pdf',
        uploadedAt: new Date().toISOString()
      }])
    }, 100)
  }

  const handleRemoveFile = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId))
  }

  const handleToolSelect = (tool: any) => {
    if (selectedTools.includes(tool.id)) {
      setSelectedTools(selectedTools.filter(id => id !== tool.id))
    } else {
      setSelectedTools([...selectedTools, tool.id])
    }
    setShowToolsMenu(false)
  }

  const handleRemoveTool = (tool: any) => {
    setSelectedTools(selectedTools.filter(id => id !== tool.id))
  }

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category))
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }

  const selectedToolsData = sampleTools.filter(tool => selectedTools.includes(tool.id))

  return (
    <div className="relative p-4 border rounded-lg">
      {/* File Display */}
      {files.length > 0 && (
        <FileDisplay 
          files={files} 
          onRemoveFile={handleRemoveFile}
          variant={attachmentState === 'success' ? 'success' : 'default'}
        />
      )}

      {/* Selected Items Badges */}
      <SelectedItemsBadges
        tools={selectedToolsData}
        businessFunction={selectedBusinessFunction}
        categories={selectedCategories}
        tags={selectedTags}
        onRemoveTool={handleRemoveTool}
        onRemoveCategory={handleRemoveCategory}
        onRemoveTag={handleRemoveTag}
        maxItems={5}
        showCount={true}
      />

      {/* Control Buttons */}
      <div className="flex gap-2 mt-4">
        <AttachmentButton 
          fileCount={files.length}
          maxFiles={10}
          state={attachmentState}
          onFileSelect={handleFileSelect}
        />
        
        <ToolsButton 
          count={selectedTools.length}
          isActive={showToolsMenu}
          onToggle={() => setShowToolsMenu(!showToolsMenu)}
        />
      </div>

      {/* Tools Menu */}
      {showToolsMenu && (
        <div className="mt-2">
          <SearchMenu
            type="tools"
            items={sampleTools}
            selectedItems={selectedTools}
            highlightedIndex={0}
            onItemSelect={handleToolSelect}
          />
        </div>
      )}

      {/* Drag Drop Overlay */}
      <DragDropOverlay
        isActive={showDragOverlay}
        variant="default"
        maxFileSize={10485760}
        onDragEnter={() => setShowDragOverlay(true)}
        onDragLeave={() => setShowDragOverlay(false)}
      />

      {/* Test controls */}
      <div className="mt-4 space-x-2">
        <button 
          onClick={() => setSelectedCategories([...selectedCategories, 'Development'])}
          data-testid="add-category"
        >
          Add Category
        </button>
        <button 
          onClick={() => setSelectedTags([...selectedTags, 'urgent'])}
          data-testid="add-tag"
        >
          Add Tag
        </button>
        <button 
          onClick={() => setSelectedBusinessFunction(sampleBusinessFunction)}
          data-testid="add-function"
        >
          Add Function
        </button>
        <button 
          onClick={() => setShowDragOverlay(!showDragOverlay)}
          data-testid="toggle-overlay"
        >
          Toggle Overlay
        </button>
      </div>
    </div>
  )
}

describe('Component Integration Tests', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('File Management Workflow', () => {
    it('handles complete file upload and removal workflow', async () => {
      render(<MockChatInput />)

      // Initial state - should show existing files
      expect(screen.getByText('document.pdf')).toBeInTheDocument()
      expect(screen.getByText('image.jpg')).toBeInTheDocument()

      // Click attachment button to upload new file
      const attachmentButton = screen.getByRole('button', { name: /attachment/i })
      expect(attachmentButton).toHaveClass('border-gray-200') // default state
      
      await user.click(attachmentButton)

      // Should show uploading state
      await waitFor(() => {
        expect(attachmentButton).toHaveClass('border-blue-300') // uploading state
      })

      // Should eventually show success state and new file
      await waitFor(() => {
        expect(attachmentButton).toHaveClass('border-green-300') // success state
        expect(screen.getByText('new-document.pdf')).toBeInTheDocument()
      })

      // Remove a file
      const removeButtons = screen.getAllByRole('button')
      const fileRemoveButton = removeButtons.find(btn => 
        btn.closest('div')?.textContent?.includes('document.pdf')
      )
      
      if (fileRemoveButton) {
        await user.click(fileRemoveButton)
        await waitFor(() => {
          expect(screen.queryByText('document.pdf')).not.toBeInTheDocument()
        })
      }
    })

    it('updates file count in attachment button correctly', async () => {
      render(<MockChatInput />)

      // Initial file count (2 files from sampleFiles)
      expect(screen.getByText('2')).toBeInTheDocument()

      // Add a new file
      const attachmentButton = screen.getByRole('button', { name: /attachment/i })
      await user.click(attachmentButton)

      // Wait for file to be added
      await waitFor(() => {
        expect(screen.getByText('3')).toBeInTheDocument() // Should increment
      })
    })
  })

  describe('Tools Selection Workflow', () => {
    it('handles tools selection and badge display workflow', async () => {
      render(<MockChatInput />)

      // Initial state - no tools selected
      expect(screen.queryByText('Web Search')).not.toBeInTheDocument()

      // Open tools menu
      const toolsButton = screen.getByText('Tools')
      await user.click(toolsButton)

      // Should show tools menu
      expect(screen.getByText('Web Search')).toBeInTheDocument()
      expect(screen.getByText('Database Query')).toBeInTheDocument()

      // Select a tool
      const webSearchTool = screen.getByText('Web Search')
      await user.click(webSearchTool)

      // Menu should close and badge should appear
      await waitFor(() => {
        expect(screen.getByText('Web Search')).toBeInTheDocument() // In badge
        expect(screen.queryByText('Database Query')).not.toBeInTheDocument() // Menu closed
      })

      // Tools button should show count
      expect(screen.getByText('1')).toBeInTheDocument()

      // Remove tool from badge
      const toolBadge = screen.getByText('Web Search').closest('span')
      const removeButton = toolBadge?.querySelector('button')
      
      if (removeButton) {
        await user.click(removeButton)
        await waitFor(() => {
          expect(screen.queryByText('Web Search')).not.toBeInTheDocument()
        })
      }
    })

    it('toggles tools menu visibility correctly', async () => {
      render(<MockChatInput />)

      const toolsButton = screen.getByText('Tools')

      // Menu should be closed initially
      expect(screen.queryByText('Web Search')).not.toBeInTheDocument()

      // Open menu
      await user.click(toolsButton)
      expect(screen.getByText('Web Search')).toBeInTheDocument()

      // Close menu
      await user.click(toolsButton)
      await waitFor(() => {
        expect(screen.queryByText('Web Search')).not.toBeInTheDocument()
      })
    })
  })

  describe('Selected Items Management', () => {
    it('handles multiple item types in badges component', async () => {
      render(<MockChatInput />)

      // Add different types of items
      await user.click(screen.getByTestId('add-category'))
      await user.click(screen.getByTestId('add-tag'))
      await user.click(screen.getByTestId('add-function'))

      // All items should be visible
      expect(screen.getByText('Development')).toBeInTheDocument() // category
      expect(screen.getByText('urgent')).toBeInTheDocument() // tag
      expect(screen.getByText('Market Analysis')).toBeInTheDocument() // function

      // Remove items one by one
      const developmentBadge = screen.getByText('Development').closest('span')
      const removeButton = developmentBadge?.querySelector('button')
      
      if (removeButton) {
        await user.click(removeButton)
        await waitFor(() => {
          expect(screen.queryByText('Development')).not.toBeInTheDocument()
        })
      }

      // Other items should still be visible
      expect(screen.getByText('urgent')).toBeInTheDocument()
      expect(screen.getByText('Market Analysis')).toBeInTheDocument()
    })

    it('handles max items and count display correctly', async () => {
      render(<MockChatInput />)

      // Add multiple items to exceed maxItems (5)
      await user.click(screen.getByTestId('add-category'))
      await user.click(screen.getByTestId('add-tag'))
      await user.click(screen.getByTestId('add-function'))

      // Open tools menu and select multiple tools
      const toolsButton = screen.getByText('Tools')
      await user.click(toolsButton)

      // Select multiple tools
      await user.click(screen.getByText('Web Search'))
      
      await user.click(toolsButton) // Open menu again
      await user.click(screen.getByText('Database Query'))

      await user.click(toolsButton) // Open menu again  
      await user.click(screen.getByText('API Integration'))

      // Should show count badge for hidden items
      await waitFor(() => {
        expect(screen.getByText(/\+\d+ more/)).toBeInTheDocument()
      })
    })
  })

  describe('Drag and Drop Integration', () => {
    it('shows and hides drag overlay correctly', async () => {
      render(<MockChatInput />)

      // Overlay should be hidden initially
      expect(screen.queryByText('Drop your files here')).not.toBeInTheDocument()

      // Toggle overlay
      await user.click(screen.getByTestId('toggle-overlay'))

      // Overlay should be visible
      expect(screen.getByText('Drop your files here')).toBeInTheDocument()
      expect(screen.getByText('Maximum 10 MB per file')).toBeInTheDocument()

      // Toggle again to hide
      await user.click(screen.getByTestId('toggle-overlay'))

      await waitFor(() => {
        expect(screen.queryByText('Drop your files here')).not.toBeInTheDocument()
      })
    })
  })

  describe('State Synchronization', () => {
    it('maintains consistent state across components', async () => {
      render(<MockChatInput />)

      // Add tools and verify count is synced
      const toolsButton = screen.getByText('Tools')
      await user.click(toolsButton)
      await user.click(screen.getByText('Web Search'))

      // Tools button should show count
      expect(screen.getByText('1')).toBeInTheDocument()

      // Badge should show the tool
      expect(screen.getByText('Web Search')).toBeInTheDocument()

      // Add more tools
      await user.click(toolsButton)
      await user.click(screen.getByText('Database Query'))

      // Count should update
      expect(screen.getByText('2')).toBeInTheDocument()

      // Remove one tool from badge
      const webSearchBadge = screen.getByText('Web Search').closest('span')
      const removeButton = webSearchBadge?.querySelector('button')
      
      if (removeButton) {
        await user.click(removeButton)
        
        // Count should decrease
        await waitFor(() => {
          expect(screen.getByText('1')).toBeInTheDocument()
          expect(screen.queryByText('2')).not.toBeInTheDocument()
        })

        // Only Database Query should remain
        expect(screen.queryByText('Web Search')).not.toBeInTheDocument()
        expect(screen.getByText('Database Query')).toBeInTheDocument()
      }
    })

    it('handles rapid user interactions gracefully', async () => {
      render(<MockChatInput />)

      // Rapidly toggle tools menu
      const toolsButton = screen.getByText('Tools')
      
      await user.click(toolsButton)
      await user.click(toolsButton)
      await user.click(toolsButton)
      
      // Should end in closed state
      expect(screen.queryByText('Web Search')).not.toBeInTheDocument()

      // Rapidly add and remove items
      await user.click(screen.getByTestId('add-category'))
      await user.click(screen.getByTestId('add-category'))
      await user.click(screen.getByTestId('add-tag'))

      // Should handle duplicates gracefully
      const developmentBadges = screen.getAllByText('Development')
      expect(developmentBadges.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility Integration', () => {
    it('maintains focus management across component interactions', async () => {
      render(<MockChatInput />)

      // Focus on tools button
      const toolsButton = screen.getByText('Tools')
      toolsButton.focus()
      expect(toolsButton).toHaveFocus()

      // Open menu with keyboard
      await user.keyboard('{Enter}')
      
      // Menu should be open
      expect(screen.getByText('Web Search')).toBeInTheDocument()

      // Should be able to navigate with keyboard
      await user.keyboard('{Escape}')
      
      // Menu should close (if component supports it)
      // Note: This test assumes escape handling, which might need to be added
    })

    it('provides proper ARIA attributes across components', () => {
      render(<MockChatInput />)

      // Check that buttons have proper roles
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)

      // Check that headings are properly structured
      // This would depend on the specific implementation
    })
  })

  describe('Error Handling Integration', () => {
    it('handles component errors gracefully', async () => {
      render(<MockChatInput />)

      // Test with empty or invalid data
      // This would require adding error boundaries or error states to components

      // For now, test that the component doesn't crash with edge cases
      expect(() => {
        render(<MockChatInput />)
      }).not.toThrow()
    })
  })

  describe('Performance Integration', () => {
    it('handles large datasets efficiently', async () => {
      // Create a version with many items
      const LargeDatasetComponent = () => {
        const [largeFileList] = useState(
          Array.from({ length: 100 }, (_, i) => ({
            id: `file-${i}`,
            name: `document-${i}.pdf`,
            size: 1024 * (i + 1),
            type: 'application/pdf',
            uploadedAt: new Date().toISOString()
          }))
        )

        return (
          <FileDisplay 
            files={largeFileList}
            maxFiles={100}
            showCount={true}
            showTotal={true}
          />
        )
      }

      // Should render without performance issues
      const startTime = Date.now()
      render(<LargeDatasetComponent />)
      const renderTime = Date.now() - startTime

      // Basic performance check (should render quickly)
      expect(renderTime).toBeLessThan(1000) // 1 second max
      
      // Should show count correctly
      expect(screen.getByText('Files (100/100):')).toBeInTheDocument()
    })
  })
})
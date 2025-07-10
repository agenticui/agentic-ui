import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import { FileDisplay } from '../FileDisplay'
import { sampleFiles } from '../../../test/utils'

describe('FileDisplay', () => {
  const mockOnRemoveFile = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders nothing when files array is empty', () => {
      const { container } = render(<FileDisplay files={[]} />)
      
      expect(container.firstChild).toBeNull()
    })

    it('renders files when provided', () => {
      render(<FileDisplay files={sampleFiles} />)
      
      expect(screen.getByText('document.pdf')).toBeInTheDocument()
      expect(screen.getByText('image.jpg')).toBeInTheDocument()
    })

    it('shows file count and total size', () => {
      render(<FileDisplay files={sampleFiles} maxFiles={5} />)
      
      expect(screen.getByText('Files (2/5):')).toBeInTheDocument()
      expect(screen.getByText(/Total:/)).toBeInTheDocument()
    })

    it('hides count when showCount is false', () => {
      render(<FileDisplay files={sampleFiles} showCount={false} />)
      
      expect(screen.queryByText(/Files \(/)).not.toBeInTheDocument()
    })

    it('hides total when showTotal is false', () => {
      render(<FileDisplay files={sampleFiles} showTotal={false} />)
      
      expect(screen.queryByText(/Total:/)).not.toBeInTheDocument()
    })
  })

  describe('File Size Formatting', () => {
    it('displays file sizes correctly', () => {
      const files = [
        {
          id: '1',
          name: 'small.txt',
          size: 1024, // 1 KB
          type: 'text/plain',
          uploadedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'medium.jpg',
          size: 1048576, // 1 MB
          type: 'image/jpeg',
          uploadedAt: '2024-01-15T10:31:00Z'
        },
        {
          id: '3',
          name: 'large.zip',
          size: 1073741824, // 1 GB
          type: 'application/zip',
          uploadedAt: '2024-01-15T10:32:00Z'
        }
      ]

      render(<FileDisplay files={files} />)
      
      expect(screen.getByText('1 KB')).toBeInTheDocument()
      expect(screen.getByText('1 MB')).toBeInTheDocument()
      expect(screen.getByText('1 GB')).toBeInTheDocument()
    })

    it('handles zero bytes correctly', () => {
      const files = [{
        id: '1',
        name: 'empty.txt',
        size: 0,
        type: 'text/plain',
        uploadedAt: '2024-01-15T10:30:00Z'
      }]

      render(<FileDisplay files={files} />)
      
      expect(screen.getByText('0 Bytes')).toBeInTheDocument()
    })
  })

  describe('File Icons', () => {
    it('shows image icon for image files', () => {
      const imageFile = [{
        id: '1',
        name: 'photo.jpg',
        size: 1024,
        type: 'image/jpeg',
        uploadedAt: '2024-01-15T10:30:00Z'
      }]

      render(<FileDisplay files={imageFile} />)
      
      // Check that an image icon is rendered (would have specific classes)
      const fileItem = screen.getByText('photo.jpg').closest('div')
      expect(fileItem?.querySelector('svg')).toBeInTheDocument()
    })

    it('shows PDF icon for PDF files', () => {
      const pdfFile = [{
        id: '1',
        name: 'document.pdf',
        size: 1024,
        type: 'application/pdf',
        uploadedAt: '2024-01-15T10:30:00Z'
      }]

      render(<FileDisplay files={pdfFile} />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem?.querySelector('svg')).toBeInTheDocument()
    })

    it('shows text icon for text files', () => {
      const textFile = [{
        id: '1',
        name: 'readme.txt',
        size: 1024,
        type: 'text/plain',
        uploadedAt: '2024-01-15T10:30:00Z'
      }]

      render(<FileDisplay files={textFile} />)
      
      const fileItem = screen.getByText('readme.txt').closest('div')
      expect(fileItem?.querySelector('svg')).toBeInTheDocument()
    })

    it('shows generic icon for unknown file types', () => {
      const unknownFile = [{
        id: '1',
        name: 'unknown.xyz',
        size: 1024,
        type: 'application/unknown',
        uploadedAt: '2024-01-15T10:30:00Z'
      }]

      render(<FileDisplay files={unknownFile} />)
      
      const fileItem = screen.getByText('unknown.xyz').closest('div')
      expect(fileItem?.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Variant Styles', () => {
    it('applies default variant styling', () => {
      render(<FileDisplay files={sampleFiles} variant="default" />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem).toHaveClass('bg-gray-50', 'border-gray-200')
    })

    it('applies success variant styling', () => {
      render(<FileDisplay files={sampleFiles} variant="success" />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem).toHaveClass('bg-green-50', 'border-green-200')
    })

    it('applies error variant styling', () => {
      render(<FileDisplay files={sampleFiles} variant="error" />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem).toHaveClass('bg-red-50', 'border-red-200')
    })

    it('applies uploading variant styling', () => {
      render(<FileDisplay files={sampleFiles} variant="uploading" />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem).toHaveClass('bg-blue-50', 'border-blue-200')
    })

    it('applies warning variant styling', () => {
      render(<FileDisplay files={sampleFiles} variant="warning" />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem).toHaveClass('bg-yellow-50', 'border-yellow-200')
    })

    it('applies processing variant styling', () => {
      render(<FileDisplay files={sampleFiles} variant="processing" />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem).toHaveClass('bg-purple-50', 'border-purple-200')
    })
  })

  describe('Size Variants', () => {
    it('applies small size styling', () => {
      render(<FileDisplay files={sampleFiles} size="sm" />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem).toHaveClass('px-2', 'py-1', 'gap-1')
    })

    it('applies medium size styling', () => {
      render(<FileDisplay files={sampleFiles} size="md" />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem).toHaveClass('px-3', 'py-2', 'gap-2')
    })

    it('applies large size styling', () => {
      render(<FileDisplay files={sampleFiles} size="lg" />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem).toHaveClass('px-4', 'py-3', 'gap-3')
    })
  })

  describe('Layout Options', () => {
    it('renders horizontal layout by default', () => {
      render(<FileDisplay files={sampleFiles} />)
      
      const container = screen.getByText('document.pdf').closest('div')?.parentElement
      expect(container).toHaveClass('flex', 'flex-wrap')
    })

    it('renders vertical layout when specified', () => {
      render(<FileDisplay files={sampleFiles} layout="vertical" />)
      
      const container = screen.getByText('document.pdf').closest('div')?.parentElement
      expect(container).toHaveClass('space-y-2')
    })
  })

  describe('Density Options', () => {
    it('applies compact density spacing', () => {
      render(<FileDisplay files={sampleFiles} density="compact" />)
      
      const container = screen.getByText('Files (2/10):').closest('div')
      expect(container).toHaveClass('space-y-1')
    })

    it('applies normal density spacing', () => {
      render(<FileDisplay files={sampleFiles} density="normal" />)
      
      const container = screen.getByText('Files (2/10):').closest('div')
      expect(container).toHaveClass('space-y-2')
    })

    it('applies relaxed density spacing', () => {
      render(<FileDisplay files={sampleFiles} density="relaxed" />)
      
      const container = screen.getByText('Files (2/10):').closest('div')
      expect(container).toHaveClass('space-y-3')
    })
  })

  describe('File Removal', () => {
    it('shows remove button when onRemoveFile is provided', () => {
      render(<FileDisplay files={sampleFiles} onRemoveFile={mockOnRemoveFile} />)
      
      const removeButtons = screen.getAllByRole('button')
      expect(removeButtons).toHaveLength(2) // One for each file
    })

    it('does not show remove button when onRemoveFile is not provided', () => {
      render(<FileDisplay files={sampleFiles} />)
      
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('calls onRemoveFile when remove button is clicked', async () => {
      render(<FileDisplay files={sampleFiles} onRemoveFile={mockOnRemoveFile} />)
      
      const removeButtons = screen.getAllByRole('button')
      await user.click(removeButtons[0])
      
      expect(mockOnRemoveFile).toHaveBeenCalledTimes(1)
      expect(mockOnRemoveFile).toHaveBeenCalledWith('1') // File ID
    })

    it('shows remove button on hover', async () => {
      render(<FileDisplay files={sampleFiles} onRemoveFile={mockOnRemoveFile} />)
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      const removeButton = fileItem?.querySelector('button')
      
      expect(removeButton).toHaveClass('opacity-0')
      
      if (fileItem) {
        await user.hover(fileItem)
        expect(removeButton).toHaveClass('group-hover:opacity-100')
      }
    })
  })

  describe('Status Icons', () => {
    it('shows success icon for success variant', () => {
      render(<FileDisplay files={sampleFiles} variant="success" />)
      
      // Success variant should show check icons
      const fileItems = screen.getAllByText('document.pdf')[0].closest('div')
      expect(fileItems?.querySelector('svg')).toBeInTheDocument()
    })

    it('shows error icon for error variant', () => {
      render(<FileDisplay files={sampleFiles} variant="error" />)
      
      const fileItems = screen.getAllByText('document.pdf')[0].closest('div')
      expect(fileItems?.querySelector('svg')).toBeInTheDocument()
    })

    it('shows loading spinner for uploading variant', () => {
      render(<FileDisplay files={sampleFiles} variant="uploading" />)
      
      const fileItems = screen.getAllByText('document.pdf')[0].closest('div')
      const spinner = fileItems?.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })

    it('shows pulse animation for processing variant', () => {
      render(<FileDisplay files={sampleFiles} variant="processing" />)
      
      const fileItems = screen.getAllByText('document.pdf')[0].closest('div')
      const pulsingElement = fileItems?.querySelector('.animate-pulse')
      expect(pulsingElement).toBeInTheDocument()
    })
  })

  describe('Text Colors', () => {
    it('applies correct text colors for each variant', () => {
      const { rerender } = render(<FileDisplay files={sampleFiles} variant="success" />)
      
      let fileName = screen.getByText('document.pdf')
      expect(fileName).toHaveClass('text-green-800')
      
      rerender(<FileDisplay files={sampleFiles} variant="error" />)
      fileName = screen.getByText('document.pdf')
      expect(fileName).toHaveClass('text-red-800')
      
      rerender(<FileDisplay files={sampleFiles} variant="uploading" />)
      fileName = screen.getByText('document.pdf')
      expect(fileName).toHaveClass('text-blue-800')
    })
  })

  describe('File Name Truncation', () => {
    it('truncates long file names', () => {
      const longNameFile = [{
        id: '1',
        name: 'this-is-a-very-long-file-name-that-should-be-truncated.pdf',
        size: 1024,
        type: 'application/pdf',
        uploadedAt: '2024-01-15T10:30:00Z'
      }]

      render(<FileDisplay files={longNameFile} />)
      
      const fileName = screen.getByText(longNameFile[0].name)
      expect(fileName).toHaveClass('truncate', 'max-w-[120px]')
      expect(fileName).toHaveAttribute('title', longNameFile[0].name)
    })
  })

  describe('Accessibility', () => {
    it('provides tooltips for file names', () => {
      render(<FileDisplay files={sampleFiles} />)
      
      const fileName = screen.getByText('document.pdf')
      expect(fileName).toHaveAttribute('title', 'document.pdf')
    })

    it('has proper button roles for remove buttons', () => {
      render(<FileDisplay files={sampleFiles} onRemoveFile={mockOnRemoveFile} />)
      
      const removeButtons = screen.getAllByRole('button')
      removeButtons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button')
      })
    })

    it('is keyboard accessible for remove buttons', async () => {
      render(<FileDisplay files={sampleFiles} onRemoveFile={mockOnRemoveFile} />)
      
      const removeButtons = screen.getAllByRole('button')
      removeButtons[0].focus()
      await user.keyboard('{Enter}')
      
      expect(mockOnRemoveFile).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases', () => {
    it('handles files with missing properties gracefully', () => {
      const incompleteFile = [{
        id: '1',
        name: 'test.txt',
        size: 1024,
        type: 'text/plain',
        uploadedAt: '2024-01-15T10:30:00Z'
        // Missing optional properties
      }]

      expect(() => {
        render(<FileDisplay files={incompleteFile} />)
      }).not.toThrow()
      
      expect(screen.getByText('test.txt')).toBeInTheDocument()
    })

    it('handles very large file sizes', () => {
      const largeFile = [{
        id: '1',
        name: 'huge.zip',
        size: 1099511627776, // 1 TB
        type: 'application/zip',
        uploadedAt: '2024-01-15T10:30:00Z'
      }]

      render(<FileDisplay files={largeFile} />)
      
      // Should format TB sizes correctly
      expect(screen.getByText(/TB/)).toBeInTheDocument()
    })

    it('handles empty file names', () => {
      const emptyNameFile = [{
        id: '1',
        name: '',
        size: 1024,
        type: 'text/plain',
        uploadedAt: '2024-01-15T10:30:00Z'
      }]

      expect(() => {
        render(<FileDisplay files={emptyNameFile} />)
      }).not.toThrow()
    })

    it('calculates total size correctly', () => {
      const files = [
        { id: '1', name: 'file1.txt', size: 1000, type: 'text/plain', uploadedAt: '2024-01-15T10:30:00Z' },
        { id: '2', name: 'file2.txt', size: 2000, type: 'text/plain', uploadedAt: '2024-01-15T10:31:00Z' },
        { id: '3', name: 'file3.txt', size: 3000, type: 'text/plain', uploadedAt: '2024-01-15T10:32:00Z' }
      ]

      render(<FileDisplay files={files} />)
      
      // Total should be 6000 bytes = 5.86 KB
      expect(screen.getByText(/Total: 5\.86 KB/)).toBeInTheDocument()
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<FileDisplay files={sampleFiles} className="custom-class" />)
      
      const container = screen.getByText('Files (2/10):').closest('div')
      expect(container).toHaveClass('custom-class')
    })

    it('combines multiple variant classes correctly', () => {
      render(<FileDisplay files={sampleFiles} variant="warning" size="lg" density="relaxed" />)
      
      const container = screen.getByText('Files (2/10):').closest('div')
      expect(container).toHaveClass('space-y-3') // relaxed density
      
      const fileItem = screen.getByText('document.pdf').closest('div')
      expect(fileItem).toHaveClass('bg-yellow-50') // warning variant
      expect(fileItem).toHaveClass('px-4', 'py-3') // large size
    })
  })
})
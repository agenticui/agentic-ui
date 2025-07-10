import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import { DragDropOverlay } from '../DragDropOverlay'
import { Upload, FileImage, FileText } from 'lucide-react'

describe('DragDropOverlay', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders nothing when isActive is false', () => {
      const { container } = render(<DragDropOverlay isActive={false} />)
      
      expect(container.firstChild).toBeNull()
    })

    it('renders overlay when isActive is true', () => {
      render(<DragDropOverlay isActive={true} />)
      
      expect(screen.getByText('Drop your files here')).toBeInTheDocument()
      expect(screen.getByText('Supports PDF, images, and text files')).toBeInTheDocument()
    })

    it('renders with custom title and subtitle', () => {
      render(
        <DragDropOverlay 
          isActive={true} 
          title="Upload Documents" 
          subtitle="Drag and drop your files" 
        />
      )
      
      expect(screen.getByText('Upload Documents')).toBeInTheDocument()
      expect(screen.getByText('Drag and drop your files')).toBeInTheDocument()
    })

    it('renders with custom icon', () => {
      render(
        <DragDropOverlay 
          isActive={true} 
          icon={<FileImage data-testid="custom-icon" />} 
        />
      )
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    it('renders default upload icon when no custom icon provided', () => {
      render(<DragDropOverlay isActive={true} />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay?.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Variant Styles', () => {
    it('applies default variant correctly', () => {
      render(<DragDropOverlay isActive={true} variant="default" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'to-indigo-100', 'border-blue-400')
    })

    it('applies success variant correctly', () => {
      render(<DragDropOverlay isActive={true} variant="success" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('bg-gradient-to-br', 'from-green-50', 'to-emerald-100', 'border-green-400')
    })

    it('applies warning variant correctly', () => {
      render(<DragDropOverlay isActive={true} variant="warning" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('bg-gradient-to-br', 'from-yellow-50', 'to-amber-100', 'border-yellow-400')
    })

    it('applies error variant correctly', () => {
      render(<DragDropOverlay isActive={true} variant="error" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('bg-gradient-to-br', 'from-red-50', 'to-rose-100', 'border-red-400')
    })

    it('applies minimal variant correctly', () => {
      render(<DragDropOverlay isActive={true} variant="minimal" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('bg-gray-50', 'bg-opacity-90', 'border-gray-400')
    })

    it('applies dark variant correctly', () => {
      render(<DragDropOverlay isActive={true} variant="dark" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('bg-gradient-to-br', 'from-gray-800', 'to-gray-900', 'border-gray-600')
    })

    it('applies colorful variant correctly', () => {
      render(<DragDropOverlay isActive={true} variant="colorful" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('bg-gradient-to-br', 'from-purple-50', 'via-pink-50', 'to-indigo-50', 'border-purple-400')
    })
  })

  describe('Size Variants', () => {
    it('applies small size correctly', () => {
      render(<DragDropOverlay isActive={true} size="sm" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('rounded-md')
    })

    it('applies medium size correctly', () => {
      render(<DragDropOverlay isActive={true} size="md" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('rounded-lg')
    })

    it('applies large size correctly', () => {
      render(<DragDropOverlay isActive={true} size="lg" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('rounded-xl')
    })

    it('applies full size correctly', () => {
      render(<DragDropOverlay isActive={true} size="full" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('rounded-none')
    })
  })

  describe('Animation Variants', () => {
    it('applies no animation by default', () => {
      render(<DragDropOverlay isActive={true} animation="none" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).not.toHaveClass('animate-pulse', 'animate-bounce')
    })

    it('applies pulse animation correctly', () => {
      render(<DragDropOverlay isActive={true} animation="pulse" showAnimation={true} />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('animate-pulse')
      
      // Icon should also be pulsing
      const iconContainer = overlay?.querySelector('.animate-pulse')
      expect(iconContainer).toBeInTheDocument()
    })

    it('applies bounce animation correctly', () => {
      render(<DragDropOverlay isActive={true} animation="bounce" showAnimation={true} />)
      
      // Icon should be bouncing
      const iconContainer = screen.getByText('Drop your files here').closest('div')?.querySelector('.animate-bounce')
      expect(iconContainer).toBeInTheDocument()
    })

    it('applies fade animation correctly', () => {
      render(<DragDropOverlay isActive={true} animation="fade" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('animate-fade-in')
    })

    it('does not show animation when showAnimation is false', () => {
      render(<DragDropOverlay isActive={true} animation="pulse" showAnimation={false} />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      // Overlay should still have pulse class but icon should not animate
      expect(overlay).toHaveClass('animate-pulse')
      
      const iconContainer = overlay?.querySelector('.animate-pulse')
      expect(iconContainer).toBeNull()
    })
  })

  describe('Text Colors by Variant', () => {
    it('applies correct text colors for default variant', () => {
      render(<DragDropOverlay isActive={true} variant="default" />)
      
      const title = screen.getByText('Drop your files here')
      expect(title).toHaveClass('text-blue-700')
    })

    it('applies correct text colors for success variant', () => {
      render(<DragDropOverlay isActive={true} variant="success" />)
      
      const title = screen.getByText('Drop your files here')
      expect(title).toHaveClass('text-green-700')
    })

    it('applies correct text colors for warning variant', () => {
      render(<DragDropOverlay isActive={true} variant="warning" />)
      
      const title = screen.getByText('Drop your files here')
      expect(title).toHaveClass('text-yellow-700')
    })

    it('applies correct text colors for error variant', () => {
      render(<DragDropOverlay isActive={true} variant="error" />)
      
      const title = screen.getByText('Drop your files here')
      expect(title).toHaveClass('text-red-700')
    })

    it('applies correct text colors for minimal variant', () => {
      render(<DragDropOverlay isActive={true} variant="minimal" />)
      
      const title = screen.getByText('Drop your files here')
      expect(title).toHaveClass('text-gray-700')
    })

    it('applies correct text colors for dark variant', () => {
      render(<DragDropOverlay isActive={true} variant="dark" />)
      
      const title = screen.getByText('Drop your files here')
      expect(title).toHaveClass('text-gray-100')
    })

    it('applies correct text colors for colorful variant', () => {
      render(<DragDropOverlay isActive={true} variant="colorful" />)
      
      const title = screen.getByText('Drop your files here')
      expect(title).toHaveClass('text-purple-700')
    })
  })

  describe('File Information Display', () => {
    it('shows file info by default', () => {
      render(<DragDropOverlay isActive={true} />)
      
      expect(screen.getByText('Supports PDF, images, and text files')).toBeInTheDocument()
    })

    it('hides file info when showFileInfo is false', () => {
      render(<DragDropOverlay isActive={true} showFileInfo={false} />)
      
      expect(screen.queryByText('Supports PDF, images, and text files')).not.toBeInTheDocument()
    })

    it('displays custom accepted file types', () => {
      render(
        <DragDropOverlay 
          isActive={true} 
          acceptedFileTypes={['PNG', 'JPG', 'GIF']}
          subtitle=""
        />
      )
      
      expect(screen.getByText('Supports PNG, JPG, GIF')).toBeInTheDocument()
    })

    it('prefers custom subtitle over generated one', () => {
      render(
        <DragDropOverlay 
          isActive={true} 
          acceptedFileTypes={['PNG', 'JPG']}
          subtitle="Custom subtitle text"
        />
      )
      
      expect(screen.getByText('Custom subtitle text')).toBeInTheDocument()
      expect(screen.queryByText('Supports PNG, JPG')).not.toBeInTheDocument()
    })

    it('displays max file size when provided', () => {
      render(<DragDropOverlay isActive={true} maxFileSize={5242880} />)
      
      expect(screen.getByText('Maximum 5 MB per file')).toBeInTheDocument()
    })

    it('does not display max file size when not provided', () => {
      render(<DragDropOverlay isActive={true} />)
      
      expect(screen.queryByText(/Maximum/)).not.toBeInTheDocument()
    })
  })

  describe('File Size Formatting', () => {
    const testCases = [
      { bytes: 0, expected: '0 Bytes' },
      { bytes: 512, expected: '512 Bytes' },
      { bytes: 1024, expected: '1 KB' },
      { bytes: 1536, expected: '1.5 KB' },
      { bytes: 1048576, expected: '1 MB' },
      { bytes: 1572864, expected: '1.5 MB' },
      { bytes: 1073741824, expected: '1 GB' },
      { bytes: 1610612736, expected: '1.5 GB' },
    ]

    testCases.forEach(({ bytes, expected }) => {
      it(`formats ${bytes} bytes as ${expected}`, () => {
        render(<DragDropOverlay isActive={true} maxFileSize={bytes} />)
        
        expect(screen.getByText(`Maximum ${expected} per file`)).toBeInTheDocument()
      })
    })
  })

  describe('Icon Customization', () => {
    it('renders custom icon with correct styling', () => {
      render(
        <DragDropOverlay 
          isActive={true} 
          icon={<FileText data-testid="text-icon" />}
          variant="success"
        />
      )
      
      const icon = screen.getByTestId('text-icon')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('w-16', 'h-16', 'mx-auto', 'mb-4', 'text-green-500')
    })

    it('applies animation to custom icon when enabled', () => {
      render(
        <DragDropOverlay 
          isActive={true} 
          icon={<FileImage data-testid="image-icon" />}
          animation="bounce"
          showAnimation={true}
        />
      )
      
      const animatedContainer = screen.getByTestId('image-icon').closest('.animate-bounce')
      expect(animatedContainer).toBeInTheDocument()
    })

    it('handles non-React element icons gracefully', () => {
      render(
        <DragDropOverlay 
          isActive={true} 
          icon="custom-icon-text"
        />
      )
      
      expect(screen.getByText('custom-icon-text')).toBeInTheDocument()
    })
  })

  describe('Layout and Positioning', () => {
    it('applies absolute positioning correctly', () => {
      render(<DragDropOverlay isActive={true} />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('absolute', 'inset-0', 'z-50')
    })

    it('centers content correctly', () => {
      render(<DragDropOverlay isActive={true} />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('flex', 'items-center', 'justify-center')
    })

    it('applies backdrop blur correctly', () => {
      render(<DragDropOverlay isActive={true} />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('backdrop-blur-sm')
    })
  })

  describe('Background Colors', () => {
    it('applies default background for most variants', () => {
      render(<DragDropOverlay isActive={true} variant="default" />)
      
      const contentBox = screen.getByText('Drop your files here').closest('div')
      expect(contentBox).toHaveClass('bg-white', 'bg-opacity-80')
    })

    it('applies dark background for dark variant', () => {
      render(<DragDropOverlay isActive={true} variant="dark" />)
      
      const contentBox = screen.getByText('Drop your files here').closest('div')
      expect(contentBox).toHaveClass('bg-gray-800', 'bg-opacity-80')
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<DragDropOverlay isActive={true} />)
      
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('Drop your files here')
    })

    it('provides descriptive text for screen readers', () => {
      render(<DragDropOverlay isActive={true} />)
      
      expect(screen.getByText('Supports PDF, images, and text files')).toBeInTheDocument()
    })

    it('includes file size information for accessibility', () => {
      render(<DragDropOverlay isActive={true} maxFileSize={10485760} />)
      
      expect(screen.getByText('Maximum 10 MB per file')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty accepted file types array', () => {
      render(
        <DragDropOverlay 
          isActive={true} 
          acceptedFileTypes={[]}
          subtitle=""
        />
      )
      
      expect(screen.getByText('Supports ')).toBeInTheDocument()
    })

    it('handles very large file sizes', () => {
      const oneTerabyte = 1099511627776
      render(<DragDropOverlay isActive={true} maxFileSize={oneTerabyte} />)
      
      expect(screen.getByText(/Maximum .* per file/)).toBeInTheDocument()
    })

    it('handles zero file size', () => {
      render(<DragDropOverlay isActive={true} maxFileSize={0} />)
      
      expect(screen.getByText('Maximum 0 Bytes per file')).toBeInTheDocument()
    })

    it('handles missing title gracefully', () => {
      render(<DragDropOverlay isActive={true} title="" />)
      
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('')
    })

    it('handles very long titles', () => {
      const longTitle = 'This is a very long title that might cause layout issues in the overlay component'
      render(<DragDropOverlay isActive={true} title={longTitle} />)
      
      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<DragDropOverlay isActive={true} className="custom-overlay-class" />)
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('custom-overlay-class')
    })

    it('combines variant, size, and animation classes correctly', () => {
      render(
        <DragDropOverlay 
          isActive={true} 
          variant="success" 
          size="lg" 
          animation="fade"
        />
      )
      
      const overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('bg-gradient-to-br', 'from-green-50') // variant
      expect(overlay).toHaveClass('rounded-xl') // size
      expect(overlay).toHaveClass('animate-fade-in') // animation
    })
  })

  describe('State Management', () => {
    it('shows and hides overlay based on isActive prop changes', () => {
      const { rerender } = render(<DragDropOverlay isActive={false} />)
      
      expect(screen.queryByText('Drop your files here')).not.toBeInTheDocument()
      
      rerender(<DragDropOverlay isActive={true} />)
      
      expect(screen.getByText('Drop your files here')).toBeInTheDocument()
      
      rerender(<DragDropOverlay isActive={false} />)
      
      expect(screen.queryByText('Drop your files here')).not.toBeInTheDocument()
    })

    it('updates content when props change', () => {
      const { rerender } = render(
        <DragDropOverlay isActive={true} title="Initial Title" />
      )
      
      expect(screen.getByText('Initial Title')).toBeInTheDocument()
      
      rerender(<DragDropOverlay isActive={true} title="Updated Title" />)
      
      expect(screen.getByText('Updated Title')).toBeInTheDocument()
      expect(screen.queryByText('Initial Title')).not.toBeInTheDocument()
    })

    it('updates variant styling dynamically', () => {
      const { rerender } = render(
        <DragDropOverlay isActive={true} variant="default" />
      )
      
      let overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('border-blue-400')
      
      rerender(<DragDropOverlay isActive={true} variant="error" />)
      
      overlay = screen.getByText('Drop your files here').closest('div')?.parentElement
      expect(overlay).toHaveClass('border-red-400')
      expect(overlay).not.toHaveClass('border-blue-400')
    })
  })

  describe('Content Hierarchy', () => {
    it('displays content in correct order', () => {
      render(
        <DragDropOverlay 
          isActive={true} 
          title="Custom Title"
          subtitle="Custom Subtitle"
          maxFileSize={5242880}
        />
      )
      
      const content = screen.getByText('Custom Title').closest('div')
      const children = Array.from(content?.children || [])
      
      // Icon/animation container should be first
      expect(children[0]).toContainElement(content?.querySelector('svg') || null)
      
      // Title should be second
      expect(children[1]).toHaveTextContent('Custom Title')
      
      // Subtitle should be third
      expect(children[2]?.textContent).toContain('Custom Subtitle')
      
      // File size should be last
      expect(children[2]?.textContent).toContain('Maximum 5 MB per file')
    })
  })
})
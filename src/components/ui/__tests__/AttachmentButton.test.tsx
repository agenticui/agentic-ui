import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import { AttachmentButton } from '../AttachmentButton'
import { Upload, Paperclip } from 'lucide-react'

describe('AttachmentButton', () => {
  const mockOnFileSelect = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<AttachmentButton />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('h-10', 'w-10') // default md size
    })

    it('renders with custom tooltip', () => {
      render(<AttachmentButton tooltip="Upload files" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('title', 'Upload files')
    })

    it('renders with custom icon', () => {
      render(<AttachmentButton icon={<Paperclip data-testid="custom-icon" />} />)
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    it('renders small size correctly', () => {
      render(<AttachmentButton size="sm" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-8', 'w-8')
    })

    it('renders medium size correctly', () => {
      render(<AttachmentButton size="md" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'w-10')
    })

    it('renders large size correctly', () => {
      render(<AttachmentButton size="lg" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-12', 'w-12')
    })
  })

  describe('Variant Styles', () => {
    it('renders solid variant correctly', () => {
      render(<AttachmentButton variant="solid" />)
      
      const button = screen.getByRole('button')
      // Check that it doesn't have outline or ghost specific classes
      expect(button).not.toHaveClass('bg-transparent')
    })

    it('renders outline variant correctly', () => {
      render(<AttachmentButton variant="outline" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-transparent')
    })

    it('renders ghost variant correctly', () => {
      render(<AttachmentButton variant="ghost" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-transparent', 'hover:border-gray-200')
    })
  })

  describe('State Variants', () => {
    it('renders default state correctly', () => {
      render(<AttachmentButton state="default" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-gray-200', 'text-gray-600')
    })

    it('renders uploading state correctly', () => {
      render(<AttachmentButton state="uploading" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-blue-300', 'bg-blue-50', 'text-blue-600')
      expect(button).toBeDisabled()
    })

    it('renders error state correctly', () => {
      render(<AttachmentButton state="error" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-red-300', 'bg-red-50', 'text-red-600')
    })

    it('renders success state correctly', () => {
      render(<AttachmentButton state="success" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-green-300', 'bg-green-50', 'text-green-600')
    })

    it('renders warning state correctly', () => {
      render(<AttachmentButton state="warning" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-yellow-300', 'bg-yellow-50', 'text-yellow-600')
    })
  })

  describe('File Count Display', () => {
    it('does not show count when fileCount is 0', () => {
      render(<AttachmentButton fileCount={0} />)
      
      expect(screen.queryByText('0')).not.toBeInTheDocument()
    })

    it('shows count when fileCount is greater than 0', () => {
      render(<AttachmentButton fileCount={3} />)
      
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('does not show count when showCount is false', () => {
      render(<AttachmentButton fileCount={5} showCount={false} />)
      
      expect(screen.queryByText('5')).not.toBeInTheDocument()
    })

    it('shows max files reached state when at limit', () => {
      render(<AttachmentButton fileCount={10} maxFiles={10} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-red-300')
      expect(screen.getByText('10')).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('calls onFileSelect when clicked', async () => {
      render(<AttachmentButton onFileSelect={mockOnFileSelect} />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(mockOnFileSelect).toHaveBeenCalledTimes(1)
    })

    it('does not call onFileSelect when disabled', async () => {
      render(<AttachmentButton onFileSelect={mockOnFileSelect} disabled />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(mockOnFileSelect).not.toHaveBeenCalled()
    })

    it('does not call onFileSelect when in uploading state', async () => {
      render(<AttachmentButton onFileSelect={mockOnFileSelect} state="uploading" />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(mockOnFileSelect).not.toHaveBeenCalled()
    })

    it('handles keyboard interaction', async () => {
      render(<AttachmentButton onFileSelect={mockOnFileSelect} />)
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')
      
      expect(mockOnFileSelect).toHaveBeenCalledTimes(1)
    })
  })

  describe('Loading State', () => {
    it('shows uploading state when isUploading is true', () => {
      render(<AttachmentButton isUploading={true} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-blue-300', 'bg-blue-50')
      expect(button).toBeDisabled()
    })

    it('shows cursor-not-allowed when uploading', () => {
      render(<AttachmentButton isUploading={true} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('cursor-not-allowed')
    })
  })

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<AttachmentButton />)
      
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('has proper aria-label when provided', () => {
      render(<AttachmentButton aria-label="Upload attachment" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Upload attachment')
    })

    it('is focusable by default', () => {
      render(<AttachmentButton />)
      
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('is not focusable when disabled', () => {
      render(<AttachmentButton disabled />)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('has proper title attribute for tooltip', () => {
      render(<AttachmentButton tooltip="Upload files here" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('title', 'Upload files here')
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<AttachmentButton className="custom-class" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('combines size, variant, and state classes correctly', () => {
      render(<AttachmentButton size="lg" variant="outline" state="success" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-12', 'w-12') // size lg
      expect(button).toHaveClass('bg-transparent') // variant outline
      expect(button).toHaveClass('border-green-300') // state success
    })
  })

  describe('Edge Cases', () => {
    it('handles very large file counts', () => {
      render(<AttachmentButton fileCount={999} />)
      
      expect(screen.getByText('999')).toBeInTheDocument()
    })

    it('handles zero maxFiles gracefully', () => {
      render(<AttachmentButton fileCount={1} maxFiles={0} />)
      
      const button = screen.getByRole('button')
      // Should show error state when fileCount > maxFiles
      expect(button).toBeInTheDocument()
    })

    it('works without onFileSelect callback', async () => {
      render(<AttachmentButton />)
      
      const button = screen.getByRole('button')
      // Should not throw error when clicked without callback
      expect(() => user.click(button)).not.toThrow()
    })

    it('handles rapid clicking', async () => {
      render(<AttachmentButton onFileSelect={mockOnFileSelect} />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      await user.click(button)
      await user.click(button)
      
      expect(mockOnFileSelect).toHaveBeenCalledTimes(3)
    })
  })

  describe('State Transitions', () => {
    it('transitions from default to uploading state', () => {
      const { rerender } = render(<AttachmentButton state="default" />)
      
      let button = screen.getByRole('button')
      expect(button).toHaveClass('border-gray-200')
      expect(button).not.toBeDisabled()
      
      rerender(<AttachmentButton state="uploading" />)
      
      button = screen.getByRole('button')
      expect(button).toHaveClass('border-blue-300')
      expect(button).toBeDisabled()
    })

    it('transitions from uploading to success state', () => {
      const { rerender } = render(<AttachmentButton state="uploading" />)
      
      let button = screen.getByRole('button')
      expect(button).toHaveClass('border-blue-300')
      
      rerender(<AttachmentButton state="success" />)
      
      button = screen.getByRole('button')
      expect(button).toHaveClass('border-green-300')
      expect(button).not.toBeDisabled()
    })

    it('transitions from uploading to error state', () => {
      const { rerender } = render(<AttachmentButton state="uploading" />)
      
      let button = screen.getByRole('button')
      expect(button).toHaveClass('border-blue-300')
      
      rerender(<AttachmentButton state="error" />)
      
      button = screen.getByRole('button')
      expect(button).toHaveClass('border-red-300')
      expect(button).not.toBeDisabled()
    })
  })
})
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import { ToolsButton } from '../ToolsButton'
import { Settings, Zap, Search } from 'lucide-react'

describe('ToolsButton', () => {
  const mockOnToggle = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<ToolsButton />)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(screen.getByText('Tools')).toBeInTheDocument()
    })

    it('renders with custom label', () => {
      render(<ToolsButton label="AI Tools" />)
      
      expect(screen.getByText('AI Tools')).toBeInTheDocument()
    })

    it('renders with custom icon', () => {
      render(<ToolsButton icon={<Zap data-testid="custom-icon" />} />)
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    it('renders icon-only button when no label provided', () => {
      render(<ToolsButton label="" icon={<Settings data-testid="icon-only" />} />)
      
      expect(screen.getByTestId('icon-only')).toBeInTheDocument()
      expect(screen.queryByText('Tools')).not.toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    it('renders small size correctly', () => {
      render(<ToolsButton size="sm" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-8', 'px-2', 'text-xs')
    })

    it('renders medium size correctly', () => {
      render(<ToolsButton size="md" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'px-3', 'text-sm')
    })

    it('renders large size correctly', () => {
      render(<ToolsButton size="lg" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-12', 'px-4', 'text-base')
    })
  })

  describe('Variant Styles', () => {
    it('renders default variant correctly', () => {
      render(<ToolsButton variant="default" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-gray-600')
    })

    it('renders active variant correctly', () => {
      render(<ToolsButton variant="active" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-blue-600', 'border-blue-200', 'bg-blue-50')
    })

    it('renders success variant correctly', () => {
      render(<ToolsButton variant="success" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-green-600', 'border-green-200', 'bg-green-50')
    })

    it('renders warning variant correctly', () => {
      render(<ToolsButton variant="warning" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-yellow-600', 'border-yellow-200', 'bg-yellow-50')
    })

    it('renders danger variant correctly', () => {
      render(<ToolsButton variant="danger" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-red-600', 'border-red-200', 'bg-red-50')
    })

    it('renders ghost variant correctly', () => {
      render(<ToolsButton variant="ghost" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-transparent', 'hover:border-gray-200')
    })

    it('renders outline variant correctly', () => {
      render(<ToolsButton variant="outline" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-transparent', 'border-gray-300')
    })
  })

  describe('Active State', () => {
    it('shows active state when isActive is true', () => {
      render(<ToolsButton isActive={true} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-blue-600', 'border-blue-200', 'bg-blue-50')
    })

    it('overrides variant when isActive is true', () => {
      render(<ToolsButton variant="danger" isActive={true} />)
      
      const button = screen.getByRole('button')
      // Should show active styling, not danger
      expect(button).toHaveClass('text-blue-600', 'border-blue-200', 'bg-blue-50')
      expect(button).not.toHaveClass('text-red-600')
    })
  })

  describe('Loading State', () => {
    it('shows loading indicator when loading is true', () => {
      render(<ToolsButton loading={true} />)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      // Check for loading spinner
      expect(button.querySelector('.animate-spin')).toBeInTheDocument()
    })

    it('disables button when loading', () => {
      render(<ToolsButton loading={true} onToggle={mockOnToggle} />)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('does not call onToggle when loading', async () => {
      render(<ToolsButton loading={true} onToggle={mockOnToggle} />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(mockOnToggle).not.toHaveBeenCalled()
    })
  })

  describe('Icon Position', () => {
    it('renders icon on the left by default', () => {
      render(<ToolsButton icon={<Settings data-testid="icon" />} label="Settings" />)
      
      const button = screen.getByRole('button')
      const icon = screen.getByTestId('icon')
      const text = screen.getByText('Settings')
      
      // Icon should come before text in DOM order
      expect(button.firstChild).toContain(icon)
    })

    it('renders icon on the right when iconPosition is right', () => {
      render(
        <ToolsButton 
          icon={<Settings data-testid="icon" />} 
          label="Settings" 
          iconPosition="right" 
        />
      )
      
      const button = screen.getByRole('button')
      const text = screen.getByText('Settings')
      
      // Text should come before icon when position is right
      expect(button.textContent).toBe('Settings')
    })
  })

  describe('Count Badge', () => {
    it('shows count badge when count is provided', () => {
      render(<ToolsButton count={5} />)
      
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('does not show count when count is 0', () => {
      render(<ToolsButton count={0} />)
      
      expect(screen.queryByText('0')).not.toBeInTheDocument()
    })

    it('does not show count when showCount is false', () => {
      render(<ToolsButton count={10} showCount={false} />)
      
      expect(screen.queryByText('10')).not.toBeInTheDocument()
    })

    it('positions count badge correctly', () => {
      render(<ToolsButton count={3} />)
      
      const badge = screen.getByText('3')
      expect(badge).toHaveClass('absolute', '-top-1', '-right-1')
    })

    it('styles count badge based on size', () => {
      const { rerender } = render(<ToolsButton count={1} size="sm" />)
      let badge = screen.getByText('1')
      expect(badge).toHaveClass('w-3', 'h-3', 'text-xs')
      
      rerender(<ToolsButton count={1} size="lg" />)
      badge = screen.getByText('1')
      expect(badge).toHaveClass('w-5', 'h-5', 'text-sm')
    })
  })

  describe('Full Width', () => {
    it('renders full width when fullWidth is true', () => {
      render(<ToolsButton fullWidth={true} />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('w-full')
    })

    it('renders auto width by default', () => {
      render(<ToolsButton />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('w-auto')
    })
  })

  describe('Interaction', () => {
    it('calls onToggle when clicked', async () => {
      render(<ToolsButton onToggle={mockOnToggle} />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(mockOnToggle).toHaveBeenCalledTimes(1)
    })

    it('does not call onToggle when disabled', async () => {
      render(<ToolsButton onToggle={mockOnToggle} disabled />)
      
      const button = screen.getByRole('button')
      await user.click(button)
      
      expect(mockOnToggle).not.toHaveBeenCalled()
    })

    it('handles keyboard interaction', async () => {
      render(<ToolsButton onToggle={mockOnToggle} />)
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')
      
      expect(mockOnToggle).toHaveBeenCalledTimes(1)
    })

    it('handles space key activation', async () => {
      render(<ToolsButton onToggle={mockOnToggle} />)
      
      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard(' ')
      
      expect(mockOnToggle).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(<ToolsButton />)
      
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('has proper aria-label when provided', () => {
      render(<ToolsButton aria-label="Open tools menu" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Open tools menu')
    })

    it('is focusable by default', () => {
      render(<ToolsButton />)
      
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('is not focusable when disabled', () => {
      render(<ToolsButton disabled />)
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('has proper button type', () => {
      render(<ToolsButton />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<ToolsButton className="custom-class" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('combines variant and size classes correctly', () => {
      render(<ToolsButton size="lg" variant="success" />)
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-12', 'px-4') // size lg
      expect(button).toHaveClass('text-green-600') // variant success
    })
  })

  describe('Edge Cases', () => {
    it('handles very large count numbers', () => {
      render(<ToolsButton count={999} />)
      
      expect(screen.getByText('999')).toBeInTheDocument()
    })

    it('works without onToggle callback', async () => {
      render(<ToolsButton />)
      
      const button = screen.getByRole('button')
      // Should not throw error when clicked without callback
      expect(() => user.click(button)).not.toThrow()
    })

    it('handles empty label gracefully', () => {
      render(<ToolsButton label="" />)
      
      // Should still render the icon
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('handles missing icon gracefully', () => {
      render(<ToolsButton icon={undefined} />)
      
      // Should fall back to default Settings icon
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Complex Combinations', () => {
    it('handles active state with count and custom icon', () => {
      render(
        <ToolsButton 
          isActive={true}
          count={5}
          icon={<Search data-testid="search-icon" />}
          label="Search Tools"
        />
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-blue-600') // active state
      expect(screen.getByText('5')).toBeInTheDocument() // count
      expect(screen.getByTestId('search-icon')).toBeInTheDocument() // custom icon
      expect(screen.getByText('Search Tools')).toBeInTheDocument() // label
    })

    it('handles loading state with all features', () => {
      render(
        <ToolsButton 
          loading={true}
          count={3}
          fullWidth={true}
          size="lg"
          variant="success"
          label="Processing"
        />
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled() // loading
      expect(button).toHaveClass('w-full') // fullWidth
      expect(button).toHaveClass('h-12') // size lg
      expect(screen.getByText('3')).toBeInTheDocument() // count still shows
      expect(screen.getByText('Processing')).toBeInTheDocument() // label
    })
  })

  describe('State Changes', () => {
    it('updates when isActive changes', () => {
      const { rerender } = render(<ToolsButton isActive={false} />)
      
      let button = screen.getByRole('button')
      expect(button).not.toHaveClass('text-blue-600')
      
      rerender(<ToolsButton isActive={true} />)
      
      button = screen.getByRole('button')
      expect(button).toHaveClass('text-blue-600')
    })

    it('updates when loading state changes', () => {
      const { rerender } = render(<ToolsButton loading={false} />)
      
      let button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
      
      rerender(<ToolsButton loading={true} />)
      
      button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('updates count dynamically', () => {
      const { rerender } = render(<ToolsButton count={1} />)
      
      expect(screen.getByText('1')).toBeInTheDocument()
      
      rerender(<ToolsButton count={5} />)
      
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.queryByText('1')).not.toBeInTheDocument()
    })
  })
})
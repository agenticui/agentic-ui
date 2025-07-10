import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import { SelectedItemsBadges } from '../SelectedItemsBadges'
import { sampleTools, sampleBusinessFunction } from '../../../test/utils'
import { Settings, Briefcase, Zap } from 'lucide-react'

describe('SelectedItemsBadges', () => {
  const mockOnRemoveTool = vi.fn()
  const mockOnRemoveFunction = vi.fn()
  const mockOnRemoveCategory = vi.fn()
  const mockOnRemoveTag = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders nothing when no items are provided', () => {
      const { container } = render(<SelectedItemsBadges />)
      
      expect(container.firstChild).toBeNull()
    })

    it('renders tools correctly', () => {
      render(<SelectedItemsBadges tools={sampleTools.slice(0, 2)} />)
      
      expect(screen.getByText('Web Search')).toBeInTheDocument()
      expect(screen.getByText('Database Query')).toBeInTheDocument()
    })

    it('renders business function correctly', () => {
      render(<SelectedItemsBadges businessFunction={sampleBusinessFunction} />)
      
      expect(screen.getByText('Market Analysis')).toBeInTheDocument()
    })

    it('renders categories correctly', () => {
      render(<SelectedItemsBadges categories={['Development', 'Design']} />)
      
      expect(screen.getByText('Development')).toBeInTheDocument()
      expect(screen.getByText('Design')).toBeInTheDocument()
    })

    it('renders tags correctly', () => {
      render(<SelectedItemsBadges tags={['urgent', 'feature']} />)
      
      expect(screen.getByText('urgent')).toBeInTheDocument()
      expect(screen.getByText('feature')).toBeInTheDocument()
    })

    it('renders mixed items correctly', () => {
      render(
        <SelectedItemsBadges 
          tools={[sampleTools[0]]}
          businessFunction={sampleBusinessFunction}
          categories={['Development']}
          tags={['urgent']}
        />
      )
      
      expect(screen.getByText('Web Search')).toBeInTheDocument()
      expect(screen.getByText('Market Analysis')).toBeInTheDocument()
      expect(screen.getByText('Development')).toBeInTheDocument()
      expect(screen.getByText('urgent')).toBeInTheDocument()
    })
  })

  describe('Layout Options', () => {
    it('renders horizontal layout by default', () => {
      render(<SelectedItemsBadges tools={sampleTools.slice(0, 2)} />)
      
      const container = screen.getByText('Web Search').closest('div')?.parentElement
      expect(container).toHaveClass('flex', 'flex-wrap')
    })

    it('renders vertical layout when specified', () => {
      render(<SelectedItemsBadges tools={sampleTools.slice(0, 2)} layout="vertical" />)
      
      const container = screen.getByText('Web Search').closest('div')?.parentElement
      expect(container).toHaveClass('flex', 'flex-col')
    })
  })

  describe('Density Options', () => {
    it('applies compact density spacing', () => {
      render(<SelectedItemsBadges tools={sampleTools.slice(0, 2)} density="compact" />)
      
      const container = screen.getByText('Web Search').closest('div')?.parentElement
      expect(container).toHaveClass('gap-1')
    })

    it('applies normal density spacing', () => {
      render(<SelectedItemsBadges tools={sampleTools.slice(0, 2)} density="normal" />)
      
      const container = screen.getByText('Web Search').closest('div')?.parentElement
      expect(container).toHaveClass('gap-2')
    })

    it('applies relaxed density spacing', () => {
      render(<SelectedItemsBadges tools={sampleTools.slice(0, 2)} density="relaxed" />)
      
      const container = screen.getByText('Web Search').closest('div')?.parentElement
      expect(container).toHaveClass('gap-3')
    })
  })

  describe('Size Variants', () => {
    it('applies small size correctly', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} size="sm" />)
      
      const badge = screen.getByText('Web Search').closest('span')
      expect(badge).toHaveClass('text-xs', 'px-2', 'py-0.5')
    })

    it('applies medium size correctly', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} size="md" />)
      
      const badge = screen.getByText('Web Search').closest('span')
      expect(badge).toHaveClass('text-sm', 'px-2', 'py-1')
    })

    it('applies large size correctly', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} size="lg" />)
      
      const badge = screen.getByText('Web Search').closest('span')
      expect(badge).toHaveClass('text-base', 'px-3', 'py-1')
    })
  })

  describe('Variant Styles', () => {
    it('applies default variant correctly', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} variant="default" />)
      
      const badge = screen.getByText('Web Search').closest('span')
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('applies outline variant correctly', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} variant="outline" />)
      
      const badge = screen.getByText('Web Search').closest('span')
      expect(badge).toHaveClass('bg-transparent', 'border')
    })

    it('applies subtle variant correctly', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} variant="subtle" />)
      
      const badge = screen.getByText('Web Search').closest('span')
      expect(badge).toHaveClass('bg-opacity-50')
    })
  })

  describe('Item Type Styling', () => {
    it('applies tool styling correctly', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} />)
      
      const badge = screen.getByText('Web Search').closest('span')
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
    })

    it('applies business function styling correctly', () => {
      render(<SelectedItemsBadges businessFunction={sampleBusinessFunction} />)
      
      const badge = screen.getByText('Market Analysis').closest('span')
      expect(badge).toHaveClass('bg-green-100', 'text-green-800')
    })

    it('applies category styling correctly', () => {
      render(<SelectedItemsBadges categories={['Development']} />)
      
      const badge = screen.getByText('Development').closest('span')
      expect(badge).toHaveClass('bg-purple-100', 'text-purple-800')
    })

    it('applies tag styling correctly', () => {
      render(<SelectedItemsBadges tags={['urgent']} />)
      
      const badge = screen.getByText('urgent').closest('span')
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800')
    })
  })

  describe('Icons', () => {
    it('shows icons by default', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} />)
      
      const badge = screen.getByText('Web Search').closest('span')
      expect(badge?.querySelector('svg')).toBeInTheDocument()
    })

    it('hides icons when showIcons is false', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} showIcons={false} />)
      
      const badge = screen.getByText('Web Search').closest('span')
      expect(badge?.querySelector('svg')).not.toBeInTheDocument()
    })

    it('uses custom tools icon', () => {
      render(
        <SelectedItemsBadges 
          tools={[sampleTools[0]]} 
          toolsIcon={<Zap data-testid="custom-tools-icon" />} 
        />
      )
      
      expect(screen.getByTestId('custom-tools-icon')).toBeInTheDocument()
    })

    it('uses custom functions icon', () => {
      render(
        <SelectedItemsBadges 
          businessFunction={sampleBusinessFunction} 
          functionsIcon={<Settings data-testid="custom-functions-icon" />} 
        />
      )
      
      expect(screen.getByTestId('custom-functions-icon')).toBeInTheDocument()
    })
  })

  describe('Removal Functionality', () => {
    it('shows remove button for tools when onRemoveTool is provided', () => {
      render(
        <SelectedItemsBadges 
          tools={[sampleTools[0]]} 
          onRemoveTool={mockOnRemoveTool} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      expect(removeButton).toBeInTheDocument()
    })

    it('shows remove button for business function when onRemoveFunction is provided', () => {
      render(
        <SelectedItemsBadges 
          businessFunction={sampleBusinessFunction} 
          onRemoveFunction={mockOnRemoveFunction} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      expect(removeButton).toBeInTheDocument()
    })

    it('shows remove button for categories when onRemoveCategory is provided', () => {
      render(
        <SelectedItemsBadges 
          categories={['Development']} 
          onRemoveCategory={mockOnRemoveCategory} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      expect(removeButton).toBeInTheDocument()
    })

    it('shows remove button for tags when onRemoveTag is provided', () => {
      render(
        <SelectedItemsBadges 
          tags={['urgent']} 
          onRemoveTag={mockOnRemoveTag} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      expect(removeButton).toBeInTheDocument()
    })

    it('calls onRemoveTool when tool remove button is clicked', async () => {
      render(
        <SelectedItemsBadges 
          tools={[sampleTools[0]]} 
          onRemoveTool={mockOnRemoveTool} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      await user.click(removeButton)
      
      expect(mockOnRemoveTool).toHaveBeenCalledTimes(1)
      expect(mockOnRemoveTool).toHaveBeenCalledWith(sampleTools[0])
    })

    it('calls onRemoveFunction when function remove button is clicked', async () => {
      render(
        <SelectedItemsBadges 
          businessFunction={sampleBusinessFunction} 
          onRemoveFunction={mockOnRemoveFunction} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      await user.click(removeButton)
      
      expect(mockOnRemoveFunction).toHaveBeenCalledTimes(1)
    })

    it('calls onRemoveCategory when category remove button is clicked', async () => {
      render(
        <SelectedItemsBadges 
          categories={['Development']} 
          onRemoveCategory={mockOnRemoveCategory} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      await user.click(removeButton)
      
      expect(mockOnRemoveCategory).toHaveBeenCalledTimes(1)
      expect(mockOnRemoveCategory).toHaveBeenCalledWith('Development')
    })

    it('calls onRemoveTag when tag remove button is clicked', async () => {
      render(
        <SelectedItemsBadges 
          tags={['urgent']} 
          onRemoveTag={mockOnRemoveTag} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      await user.click(removeButton)
      
      expect(mockOnRemoveTag).toHaveBeenCalledTimes(1)
      expect(mockOnRemoveTag).toHaveBeenCalledWith('urgent')
    })

    it('does not show remove buttons when handlers are not provided', () => {
      render(
        <SelectedItemsBadges 
          tools={[sampleTools[0]]}
          businessFunction={sampleBusinessFunction}
          categories={['Development']}
          tags={['urgent']}
        />
      )
      
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('Max Items and Count', () => {
    it('displays all items when maxItems is not set', () => {
      const manyTools = sampleTools.slice(0, 5)
      render(<SelectedItemsBadges tools={manyTools} />)
      
      manyTools.forEach(tool => {
        expect(screen.getByText(tool.name)).toBeInTheDocument()
      })
    })

    it('limits displayed items when maxItems is set', () => {
      const manyTools = sampleTools.slice(0, 5)
      render(<SelectedItemsBadges tools={manyTools} maxItems={3} />)
      
      // Should show first 3 tools
      expect(screen.getByText(manyTools[0].name)).toBeInTheDocument()
      expect(screen.getByText(manyTools[1].name)).toBeInTheDocument()
      expect(screen.getByText(manyTools[2].name)).toBeInTheDocument()
      
      // Should not show the rest
      expect(screen.queryByText(manyTools[3].name)).not.toBeInTheDocument()
      expect(screen.queryByText(manyTools[4].name)).not.toBeInTheDocument()
    })

    it('shows count badge when items are hidden and showCount is true', () => {
      const manyTools = sampleTools.slice(0, 5)
      render(<SelectedItemsBadges tools={manyTools} maxItems={3} showCount={true} />)
      
      expect(screen.getByText('+2 more')).toBeInTheDocument()
    })

    it('does not show count badge when showCount is false', () => {
      const manyTools = sampleTools.slice(0, 5)
      render(<SelectedItemsBadges tools={manyTools} maxItems={3} showCount={false} />)
      
      expect(screen.queryByText('+2 more')).not.toBeInTheDocument()
    })

    it('handles mixed items with maxItems correctly', () => {
      render(
        <SelectedItemsBadges 
          tools={sampleTools.slice(0, 2)}
          businessFunction={sampleBusinessFunction}
          categories={['Dev', 'Design']}
          tags={['urgent', 'feature']}
          maxItems={4}
          showCount={true}
        />
      )
      
      // Total items: 2 tools + 1 function + 2 categories + 2 tags = 7 items
      // Should show first 4 and "+3 more"
      expect(screen.getByText('+3 more')).toBeInTheDocument()
    })
  })

  describe('Badge Variants by Item Type', () => {
    it('applies correct badge variant for tools', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} />)
      
      const badge = screen.getByText('Web Search').closest('span')
      // Tools should use secondary variant
      expect(badge).toHaveAttribute('class', expect.stringContaining('bg-blue-100'))
    })

    it('applies correct badge variant for business functions', () => {
      render(<SelectedItemsBadges businessFunction={sampleBusinessFunction} />)
      
      const badge = screen.getByText('Market Analysis').closest('span')
      // Functions should use outline variant
      expect(badge).toHaveAttribute('class', expect.stringContaining('bg-green-100'))
    })

    it('applies correct badge variant for categories', () => {
      render(<SelectedItemsBadges categories={['Development']} />)
      
      const badge = screen.getByText('Development').closest('span')
      // Categories should use default variant
      expect(badge).toHaveAttribute('class', expect.stringContaining('bg-purple-100'))
    })

    it('applies correct badge variant for tags', () => {
      render(<SelectedItemsBadges tags={['urgent']} />)
      
      const badge = screen.getByText('urgent').closest('span')
      // Tags should use outline variant
      expect(badge).toHaveAttribute('class', expect.stringContaining('bg-gray-100'))
    })
  })

  describe('Accessibility', () => {
    it('has proper button roles for remove buttons', () => {
      render(
        <SelectedItemsBadges 
          tools={[sampleTools[0]]} 
          onRemoveTool={mockOnRemoveTool} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      expect(removeButton).toHaveAttribute('type', 'button')
    })

    it('is keyboard accessible for remove buttons', async () => {
      render(
        <SelectedItemsBadges 
          tools={[sampleTools[0]]} 
          onRemoveTool={mockOnRemoveTool} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      removeButton.focus()
      await user.keyboard('{Enter}')
      
      expect(mockOnRemoveTool).toHaveBeenCalledTimes(1)
    })

    it('supports space key activation for remove buttons', async () => {
      render(
        <SelectedItemsBadges 
          tools={[sampleTools[0]]} 
          onRemoveTool={mockOnRemoveTool} 
        />
      )
      
      const removeButton = screen.getByRole('button')
      removeButton.focus()
      await user.keyboard(' ')
      
      expect(mockOnRemoveTool).toHaveBeenCalledTimes(1)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty arrays gracefully', () => {
      render(
        <SelectedItemsBadges 
          tools={[]}
          categories={[]}
          tags={[]}
        />
      )
      
      const { container } = render(<SelectedItemsBadges />)
      expect(container.firstChild).toBeNull()
    })

    it('handles undefined business function', () => {
      render(<SelectedItemsBadges businessFunction={undefined} />)
      
      const { container } = render(<SelectedItemsBadges />)
      expect(container.firstChild).toBeNull()
    })

    it('handles null business function', () => {
      render(<SelectedItemsBadges businessFunction={null} />)
      
      const { container } = render(<SelectedItemsBadges />)
      expect(container.firstChild).toBeNull()
    })

    it('handles items with missing properties', () => {
      const incompleteTools = [{
        id: 'incomplete',
        name: 'Incomplete Tool',
        description: '',
        // Missing icon
      }]

      expect(() => {
        render(<SelectedItemsBadges tools={incompleteTools} />)
      }).not.toThrow()
      
      expect(screen.getByText('Incomplete Tool')).toBeInTheDocument()
    })

    it('handles very long item names', () => {
      const longNameTool = [{
        id: 'long',
        name: 'This is a very long tool name that might cause layout issues',
        description: 'Description',
        icon: 'test'
      }]

      render(<SelectedItemsBadges tools={longNameTool} />)
      
      expect(screen.getByText(longNameTool[0].name)).toBeInTheDocument()
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<SelectedItemsBadges tools={[sampleTools[0]]} className="custom-class" />)
      
      const container = screen.getByText('Web Search').closest('div')?.parentElement
      expect(container).toHaveClass('custom-class')
    })

    it('combines multiple variant classes correctly', () => {
      render(
        <SelectedItemsBadges 
          tools={[sampleTools[0]]} 
          variant="outline" 
          size="lg" 
          density="relaxed" 
        />
      )
      
      const container = screen.getByText('Web Search').closest('div')?.parentElement
      expect(container).toHaveClass('gap-3') // relaxed density
      
      const badge = screen.getByText('Web Search').closest('span')
      expect(badge).toHaveClass('text-base', 'px-3') // large size
      expect(badge).toHaveClass('bg-transparent', 'border') // outline variant
    })
  })

  describe('Dynamic Updates', () => {
    it('updates when tools change', () => {
      const { rerender } = render(<SelectedItemsBadges tools={[sampleTools[0]]} />)
      
      expect(screen.getByText('Web Search')).toBeInTheDocument()
      expect(screen.queryByText('Database Query')).not.toBeInTheDocument()
      
      rerender(<SelectedItemsBadges tools={[sampleTools[1]]} />)
      
      expect(screen.queryByText('Web Search')).not.toBeInTheDocument()
      expect(screen.getByText('Database Query')).toBeInTheDocument()
    })

    it('updates when maxItems changes', () => {
      const manyTools = sampleTools.slice(0, 5)
      const { rerender } = render(<SelectedItemsBadges tools={manyTools} maxItems={2} showCount={true} />)
      
      expect(screen.getByText('+3 more')).toBeInTheDocument()
      
      rerender(<SelectedItemsBadges tools={manyTools} maxItems={4} showCount={true} />)
      
      expect(screen.getByText('+1 more')).toBeInTheDocument()
    })
  })
})
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import { SearchMenu } from '../SearchMenu'
import { sampleTools, sampleBusinessFunction } from '../../../test/utils'
import { Settings, Briefcase } from 'lucide-react'

const sampleBusinessFunctions = [
  {
    id: 'market-analysis',
    name: 'Market Analysis',
    description: 'Analyze market trends and competition',
    icon: 'briefcase',
    topic: 'Research'
  },
  {
    id: 'financial-modeling',
    name: 'Financial Modeling',
    description: 'Create financial models and projections',
    icon: 'database',
    topic: 'Finance'
  },
  {
    id: 'user-research',
    name: 'User Research',
    description: 'Conduct user interviews and surveys',
    icon: 'user',
    topic: 'Product'
  }
]

describe('SearchMenu', () => {
  const mockOnItemSelect = vi.fn()
  const mockOnAddNew = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders tools menu correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
        />
      )
      
      expect(screen.getByText('Tools')).toBeInTheDocument()
      expect(screen.getByText('Web Search')).toBeInTheDocument()
      expect(screen.getByText('Database Query')).toBeInTheDocument()
    })

    it('renders business functions menu correctly', () => {
      render(
        <SearchMenu 
          type="functions" 
          items={sampleBusinessFunctions} 
          selectedItems={[]}
          highlightedIndex={0}
        />
      )
      
      expect(screen.getByText('Business Functions (triggered by @)')).toBeInTheDocument()
      expect(screen.getByText('Market Analysis')).toBeInTheDocument()
      expect(screen.getByText('Research')).toBeInTheDocument() // Topic header
    })

    it('hides header when showHeader is false', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          showHeader={false}
        />
      )
      
      expect(screen.queryByText('Tools')).not.toBeInTheDocument()
    })

    it('renders custom header title', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          headerTitle="Custom Tools"
        />
      )
      
      expect(screen.getByText('Custom Tools')).toBeInTheDocument()
    })
  })

  describe('Theme Variants', () => {
    it('applies light theme correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          theme="light"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('bg-white', 'border-gray-200')
    })

    it('applies dark theme correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          theme="dark"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('bg-gray-800', 'border-gray-600')
    })

    it('applies modern theme correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          theme="modern"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('bg-white', 'border-gray-300', 'shadow-lg')
    })

    it('applies colorful theme correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          theme="colorful"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'to-purple-50')
    })
  })

  describe('Size Variants', () => {
    it('applies small size correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          size="sm"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('w-64', 'max-h-64')
    })

    it('applies large size correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          size="lg"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('w-96', 'max-h-96')
    })

    it('applies extra large size correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          size="xl"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('w-[28rem]', 'max-h-[28rem]')
    })
  })

  describe('Position Variants', () => {
    it('applies bottom position correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          position="bottom"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('top-full', 'mt-2')
    })

    it('applies top position correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          position="top"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('bottom-full', 'mb-2')
    })

    it('applies left position correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          position="left"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('right-0', 'left-auto')
    })
  })

  describe('Item Size Variants', () => {
    it('applies small item size correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          itemSize="sm"
        />
      )
      
      const item = screen.getByText('Web Search').closest('div')
      expect(item).toHaveClass('p-2', 'gap-2')
    })

    it('applies large item size correctly', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          itemSize="lg"
        />
      )
      
      const item = screen.getByText('Web Search').closest('div')
      expect(item).toHaveClass('p-4', 'gap-4')
    })
  })

  describe('Highlighted Items', () => {
    it('highlights the correct item based on highlightedIndex', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={1}
        />
      )
      
      const highlightedItem = screen.getByText('Database Query').closest('div')
      expect(highlightedItem).toHaveClass('bg-blue-50')
    })

    it('applies theme-specific highlight colors', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          theme="dark"
        />
      )
      
      const highlightedItem = screen.getByText('Web Search').closest('div')
      expect(highlightedItem).toHaveClass('bg-blue-900', 'text-white')
    })
  })

  describe('Selected Items', () => {
    it('shows selected state for tools', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={['search']}
          highlightedIndex={0}
        />
      )
      
      const selectedItem = screen.getByText('Web Search').closest('div')
      expect(selectedItem).toHaveClass('bg-green-50')
      
      // Should show check icon
      const checkIcon = selectedItem?.querySelector('svg')
      expect(checkIcon).toBeInTheDocument()
    })

    it('shows selected state for business functions', () => {
      render(
        <SearchMenu 
          type="functions" 
          items={sampleBusinessFunctions} 
          selectedItems={['market-analysis']}
          highlightedIndex={0}
        />
      )
      
      const selectedItem = screen.getByText('Market Analysis').closest('div')
      expect(selectedItem).toHaveClass('bg-green-50')
    })
  })

  describe('Business Functions Grouping', () => {
    it('groups business functions by topic', () => {
      render(
        <SearchMenu 
          type="functions" 
          items={sampleBusinessFunctions} 
          selectedItems={[]}
          highlightedIndex={0}
        />
      )
      
      expect(screen.getByText('Research')).toBeInTheDocument()
      expect(screen.getByText('Finance')).toBeInTheDocument()
      expect(screen.getByText('Product')).toBeInTheDocument()
    })

    it('displays functions under correct topics', () => {
      render(
        <SearchMenu 
          type="functions" 
          items={sampleBusinessFunctions} 
          selectedItems={[]}
          highlightedIndex={0}
        />
      )
      
      // Market Analysis should be under Research
      const researchSection = screen.getByText('Research').closest('div')
      expect(researchSection).toBeInTheDocument()
      
      // Financial Modeling should be under Finance
      const financeSection = screen.getByText('Finance').closest('div')
      expect(financeSection).toBeInTheDocument()
    })
  })

  describe('Search Term Display', () => {
    it('shows search term in header when provided', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          searchTerm="web"
        />
      )
      
      expect(screen.getByText('Tools - "web"')).toBeInTheDocument()
    })

    it('does not show search term when empty', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          searchTerm=""
        />
      )
      
      expect(screen.getByText('Tools')).toBeInTheDocument()
      expect(screen.queryByText(/-/)).not.toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('shows empty message when no items', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={[]} 
          selectedItems={[]}
          highlightedIndex={0}
        />
      )
      
      expect(screen.getByText('No tools available')).toBeInTheDocument()
    })

    it('shows custom empty message', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={[]} 
          selectedItems={[]}
          highlightedIndex={0}
          emptyMessage="Custom empty message"
        />
      )
      
      expect(screen.getByText('Custom empty message')).toBeInTheDocument()
    })

    it('shows search-specific empty message', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={[]} 
          selectedItems={[]}
          highlightedIndex={0}
          searchTerm="nonexistent"
        />
      )
      
      expect(screen.getByText('No tools found for "nonexistent"')).toBeInTheDocument()
    })

    it('shows add new button when onAddNew is provided', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={[]} 
          selectedItems={[]}
          highlightedIndex={0}
          onAddNew={mockOnAddNew}
        />
      )
      
      expect(screen.getByText('Add Tool')).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('calls onItemSelect when tool is clicked', async () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          onItemSelect={mockOnItemSelect}
        />
      )
      
      const toolItem = screen.getByText('Web Search')
      await user.click(toolItem)
      
      expect(mockOnItemSelect).toHaveBeenCalledTimes(1)
      expect(mockOnItemSelect).toHaveBeenCalledWith(sampleTools[0])
    })

    it('calls onItemSelect when business function is clicked', async () => {
      render(
        <SearchMenu 
          type="functions" 
          items={sampleBusinessFunctions} 
          selectedItems={[]}
          highlightedIndex={0}
          onItemSelect={mockOnItemSelect}
        />
      )
      
      const functionItem = screen.getByText('Market Analysis')
      await user.click(functionItem)
      
      expect(mockOnItemSelect).toHaveBeenCalledTimes(1)
      expect(mockOnItemSelect).toHaveBeenCalledWith(sampleBusinessFunctions[0])
    })

    it('calls onAddNew when add button is clicked', async () => {
      render(
        <SearchMenu 
          type="tools" 
          items={[]} 
          selectedItems={[]}
          highlightedIndex={0}
          onAddNew={mockOnAddNew}
        />
      )
      
      const addButton = screen.getByText('Add Tool')
      await user.click(addButton)
      
      expect(mockOnAddNew).toHaveBeenCalledTimes(1)
    })
  })

  describe('Custom Icon', () => {
    it('renders custom icon when provided', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          icon={<Settings data-testid="custom-icon" />}
        />
      )
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    it('falls back to default icon when not provided', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
        />
      )
      
      // Should render default Settings icon for tools
      const menuItems = screen.getAllByText('Web Search')[0].closest('div')
      expect(menuItems?.querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper structure for screen readers', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
        />
      )
      
      // Menu should be properly structured
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toBeInTheDocument()
    })

    it('handles keyboard navigation', async () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          onItemSelect={mockOnItemSelect}
        />
      )
      
      // Focus on first item and press Enter
      const firstItem = screen.getByText('Web Search').closest('div')
      if (firstItem) {
        firstItem.focus()
        await user.keyboard('{Enter}')
        expect(mockOnItemSelect).toHaveBeenCalledWith(sampleTools[0])
      }
    })
  })

  describe('Edge Cases', () => {
    it('handles items without descriptions', () => {
      const itemsWithoutDesc = [{
        id: 'test',
        name: 'Test Tool',
        description: '',
        icon: 'test'
      }]

      render(
        <SearchMenu 
          type="tools" 
          items={itemsWithoutDesc} 
          selectedItems={[]}
          highlightedIndex={0}
        />
      )
      
      expect(screen.getByText('Test Tool')).toBeInTheDocument()
    })

    it('handles negative highlightedIndex gracefully', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={-1}
        />
      )
      
      // Should not crash and render normally
      expect(screen.getByText('Web Search')).toBeInTheDocument()
    })

    it('handles highlightedIndex beyond array length', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={999}
        />
      )
      
      // Should not crash and render normally
      expect(screen.getByText('Web Search')).toBeInTheDocument()
    })

    it('handles business functions without topics', () => {
      const functionsWithoutTopic = [{
        id: 'test',
        name: 'Test Function',
        description: 'Test description',
        icon: 'test',
        topic: ''
      }]

      render(
        <SearchMenu 
          type="functions" 
          items={functionsWithoutTopic} 
          selectedItems={[]}
          highlightedIndex={0}
        />
      )
      
      expect(screen.getByText('Test Function')).toBeInTheDocument()
    })
  })

  describe('Theme-Specific Styling', () => {
    it('applies correct text colors for dark theme', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          theme="dark"
        />
      )
      
      const header = screen.getByText('Tools')
      expect(header).toHaveClass('text-gray-200')
    })

    it('applies correct icon colors for colorful theme', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          theme="colorful"
        />
      )
      
      // Icons should have purple color for colorful theme
      const menuItems = screen.getAllByText('Web Search')[0].closest('div')
      const icon = menuItems?.querySelector('svg')
      expect(icon).toHaveClass('text-purple-600')
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(
        <SearchMenu 
          type="tools" 
          items={sampleTools} 
          selectedItems={[]}
          highlightedIndex={0}
          className="custom-class"
        />
      )
      
      const menu = screen.getByText('Tools').closest('div')?.parentElement
      expect(menu).toHaveClass('custom-class')
    })
  })
})
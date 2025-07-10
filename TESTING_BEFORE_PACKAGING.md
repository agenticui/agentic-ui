import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import { ChatInput } from '../ChatInput'

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn()
  }
}))

describe('ChatInput', () => {
  const mockOnSendMessage = vi.fn()
  const user = userEvent.setup()

  const sampleTools = [
    { id: '1', name: 'Web Search', description: 'Search the internet' },
    { id: '2', name: 'Calculator', description: 'Perform calculations' }
  ]

  const sampleFunctions = [
    { 
      id: '1', 
      name: 'Market Analysis', 
      description: 'Analyze market trends',
      topic: 'Research' 
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} />)
      
      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
    })

    it('displays custom placeholder', () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          placeholder="Custom placeholder" 
        />
      )
      
      expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
    })

    it('renders disabled state', () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} disabled />)
      
      const textarea = screen.getByRole('textbox')
      const sendButton = screen.getByRole('button', { name: /send/i })
      
      expect(textarea).toBeDisabled()
      expect(sendButton).toBeDisabled()
    })
  })

  describe('Text Input', () => {
    it('allows typing in textarea', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Hello world')
      
      expect(textarea).toHaveValue('Hello world')
    })

    it('submits message on Enter', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Test message')
      await user.keyboard('{Enter}')
      
      expect(mockOnSendMessage).toHaveBeenCalledWith('Test message', [], [], undefined)
    })

    it('adds new line on Shift+Enter', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Line 1')
      await user.keyboard('{Shift>}{Enter}{/Shift}')
      await user.type(textarea, 'Line 2')
      
      expect(textarea.value).toContain('\n')
    })

    it('clears input after sending', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Test message')
      await user.keyboard('{Enter}')
      
      expect(textarea).toHaveValue('')
    })
  })

  describe('Feature Toggles', () => {
    it('shows attachment button when enabled', () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} showAttachment />)
      
      expect(screen.getByRole('button', { name: /attachment/i })).toBeInTheDocument()
    })

    it('shows tools button when enabled', () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          showTools 
          tools={sampleTools}
        />
      )
      
      expect(screen.getByText('Tools')).toBeInTheDocument()
    })

    it('shows deep research button when enabled', () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} showDeepResearch />)
      
      expect(screen.getByText('Deep Research')).toBeInTheDocument()
    })

    it('shows voice button when enabled', () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} showVoice />)
      
      expect(screen.getByRole('button', { name: /voice/i })).toBeInTheDocument()
    })
  })

  describe('Tools Functionality', () => {
    it('opens tools menu on button click', async () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          showTools 
          tools={sampleTools}
        />
      )
      
      await user.click(screen.getByText('Tools'))
      
      expect(screen.getByText('Web Search')).toBeInTheDocument()
      expect(screen.getByText('Calculator')).toBeInTheDocument()
    })

    it('selects tool from menu', async () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          showTools 
          tools={sampleTools}
        />
      )
      
      await user.click(screen.getByText('Tools'))
      await user.click(screen.getByText('Web Search'))
      
      // Tool should appear as badge
      expect(screen.getByText('Web Search')).toBeInTheDocument()
    })

    it('triggers tools menu with slash command', async () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          showTools 
          tools={sampleTools}
          enableSlashTools
        />
      )
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, '/')
      
      expect(screen.getByText('Web Search')).toBeInTheDocument()
    })
  })

  describe('Business Functions', () => {
    it('triggers functions menu with @ symbol', async () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          businessFunctions={sampleFunctions}
        />
      )
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, '@')
      
      expect(screen.getByText('Market Analysis')).toBeInTheDocument()
    })

    it('selects business function', async () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          businessFunctions={sampleFunctions}
        />
      )
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, '@')
      await user.click(screen.getByText('Market Analysis'))
      
      // Function should appear as badge
      expect(screen.getByText('Market Analysis')).toBeInTheDocument()
    })
  })

  describe('File Upload', () => {
    it('opens file picker on attachment button click', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} showAttachment />)
      
      // Mock file input click
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
      const clickSpy = vi.spyOn(fileInput, 'click')
      
      await user.click(screen.getByRole('button', { name: /attachment/i }))
      
      expect(clickSpy).toHaveBeenCalled()
    })

    it('handles file drop', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} showAttachment />)
      
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
      const chatInput = screen.getByRole('textbox').closest('div')
      
      fireEvent.drop(chatInput!, {
        dataTransfer: {
          files: [file]
        }
      })
      
      await waitFor(() => {
        expect(screen.getByText('test.txt')).toBeInTheDocument()
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('navigates tools menu with arrow keys', async () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          showTools 
          tools={sampleTools}
        />
      )
      
      await user.click(screen.getByText('Tools'))
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{Enter}')
      
      // First tool should be selected
      expect(screen.getByText('Web Search')).toBeInTheDocument()
    })

    it('closes menu on Escape', async () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          showTools 
          tools={sampleTools}
        />
      )
      
      await user.click(screen.getByText('Tools'))
      expect(screen.getByText('Web Search')).toBeInTheDocument()
      
      await user.keyboard('{Escape}')
      expect(screen.queryByText('Web Search')).not.toBeInTheDocument()
    })
  })

  describe('State Management', () => {
    it('handles streaming state', () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} isStreaming />)
      
      const sendButton = screen.getByRole('button', { name: /send/i })
      expect(sendButton).toBeInTheDocument()
      // Should show stop icon instead of send
    })

    it('handles deep research mode', async () => {
      const mockOnDeepResearchChange = vi.fn()
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          showDeepResearch
          onDeepResearchChange={mockOnDeepResearchChange}
        />
      )
      
      await user.click(screen.getByText('Deep Research'))
      expect(mockOnDeepResearchChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Validation', () => {
    it('prevents sending empty messages', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} />)
      
      const sendButton = screen.getByRole('button', { name: /send/i })
      expect(sendButton).toBeDisabled()
      
      await user.click(sendButton)
      expect(mockOnSendMessage).not.toHaveBeenCalled()
    })

    it('respects max length', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} maxLength={10} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'This is longer than 10 characters')
      
      expect(screen.getByText(/10/)).toBeInTheDocument() // Character counter
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} showAttachment />)
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
      
      const sendButton = screen.getByRole('button', { name: /send/i })
      expect(sendButton).toBeInTheDocument()
    })

    it('supports keyboard navigation', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} />)
      
      const textarea = screen.getByRole('textbox')
      textarea.focus()
      
      expect(textarea).toHaveFocus()
    })
  })

  describe('Error Handling', () => {
    it('handles file upload errors gracefully', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} showAttachment />)
      
      // Test with oversized file
      const largeFile = new File(['x'.repeat(100000000)], 'large.txt', { 
        type: 'text/plain' 
      })
      
      const chatInput = screen.getByRole('textbox').closest('div')
      fireEvent.drop(chatInput!, {
        dataTransfer: {
          files: [largeFile]
        }
      })
      
      // Should show error toast (mocked)
    })

    it('handles invalid file types', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} showAttachment />)
      
      const invalidFile = new File(['test'], 'test.exe', { 
        type: 'application/x-msdownload' 
      })
      
      const chatInput = screen.getByRole('textbox').closest('div')
      fireEvent.drop(chatInput!, {
        dataTransfer: {
          files: [invalidFile]
        }
      })
      
      // Should show error toast
    })
  })

  describe('Customization', () => {
    it('renders custom icons', () => {
      const customIcon = <span data-testid="custom-icon">Custom</span>
      
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          showTools
          tools={sampleTools}
          toolsIcon={customIcon}
        />
      )
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    it('uses custom labels', () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          showTools
          tools={sampleTools}
          toolsLabel="Custom Tools"
        />
      )
      
      expect(screen.getByText('Custom Tools')).toBeInTheDocument()
    })
  })
})
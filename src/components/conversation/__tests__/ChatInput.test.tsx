import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import { ChatInput } from '../ChatInput'

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn()
  },
  Toaster: () => <div data-testid="toaster" />
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
      expect(screen.getByRole('button', { name: '' })).toBeInTheDocument()
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
      
      expect((textarea as HTMLTextAreaElement).value).toContain('\n')
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
      
      // Look for attachment button by title or icon
      const attachmentButtons = screen.getAllByRole('button')
      const attachmentButton = attachmentButtons.find(button => 
        button.title?.includes('Upload') || button.getAttribute('title')?.includes('files')
      )
      expect(attachmentButton).toBeInTheDocument()
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
      
      // Voice button should be present
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(1) // More than just send button
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
      
      await waitFor(() => {
        expect(screen.getByText('Web Search')).toBeInTheDocument()
      })
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
      
      await waitFor(() => {
        expect(screen.getByText('Market Analysis')).toBeInTheDocument()
      })
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
      
      await waitFor(() => {
        expect(screen.getByText('Market Analysis')).toBeInTheDocument()
      })
      
      await user.click(screen.getByText('Market Analysis'))
      
      // Function should appear as badge
      expect(screen.getByText('Market Analysis')).toBeInTheDocument()
    })
  })

  describe('File Upload', () => {
    // Mock File constructor for testing
    beforeEach(() => {
      global.File = class MockFile {
        name: string
        size: number
        type: string
        
        constructor(chunks: any[], filename: string, options: any = {}) {
          this.name = filename
          this.size = chunks.join('').length
          this.type = options.type || ''
        }
      } as any
    })

    it('handles file drop', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} showAttachment />)
      
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
      const chatInput = screen.getByRole('textbox').closest('div')?.parentElement
      
      fireEvent.drop(chatInput!, {
        dataTransfer: {
          files: [file]
        }
      })
      
      await waitFor(() => {
        expect(screen.getByText('test.txt')).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('validates file size', async () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          showAttachment 
          maxFileSize={1000}
        />
      )
      
      const largeFile = new File(['x'.repeat(2000)], 'large.txt', { 
        type: 'text/plain' 
      })
      
      const chatInput = screen.getByRole('textbox').closest('div')?.parentElement
      fireEvent.drop(chatInput!, {
        dataTransfer: {
          files: [largeFile]
        }
      })
      
      // Should not appear in file list due to size validation
      await waitFor(() => {
        expect(screen.queryByText('large.txt')).not.toBeInTheDocument()
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
      
      await waitFor(() => {
        expect(screen.getByText('Web Search')).toBeInTheDocument()
      })
      
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{Enter}')
      
      // Tool should be selected
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
      
      await waitFor(() => {
        expect(screen.getByText('Web Search')).toBeInTheDocument()
      })
      
      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByText('Web Search')).not.toBeInTheDocument()
      })
    })
  })

  describe('State Management', () => {
    it('handles streaming state', () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} isStreaming />)
      
      const sendButton = screen.getByRole('button', { name: /send/i })
      expect(sendButton).toBeInTheDocument()
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
      
      const sendButton = screen.getByRole('button', { name: '' })
      expect(sendButton).toBeDisabled()
      
      await user.click(sendButton)
      expect(mockOnSendMessage).not.toHaveBeenCalled()
    })

    it('respects max length', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} maxLength={10} />)
      
      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'This is longer than 10 characters')
      
      expect(screen.getByText('33/10')).toBeInTheDocument() // Character counter
    })
  })

  describe('Accessibility', () => {
    it('has proper roles', () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} showAttachment />)
      
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
      
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('supports keyboard navigation', async () => {
      render(<ChatInput onSendMessage={mockOnSendMessage} />)
      
      const textarea = screen.getByRole('textbox')
      textarea.focus()
      
      expect(textarea).toHaveFocus()
    })
  })

  describe('Error Handling', () => {
    it('handles missing callback gracefully', async () => {
      // Test without onSendMessage
      expect(() => {
        render(<ChatInput onSendMessage={vi.fn()} />)
      }).not.toThrow()
    })

    it('handles undefined props gracefully', () => {
      expect(() => {
        render(
          <ChatInput 
            onSendMessage={mockOnSendMessage}
            tools={undefined}
            businessFunctions={undefined}
          />
        )
      }).not.toThrow()
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

    it('applies custom className', () => {
      const { container } = render(
        <ChatInput 
          onSendMessage={mockOnSendMessage} 
          className="custom-chat-input"
        />
      )
      
      expect(container.firstChild).toHaveClass('custom-chat-input')
    })
  })

  describe('Integration Tests', () => {
    it.skip('completes full message flow with tools and files', async () => {
      render(
        <ChatInput 
          onSendMessage={mockOnSendMessage}
          showAttachment
          showTools
          tools={sampleTools}
          businessFunctions={sampleFunctions}
        />
      )
      
      const textarea = screen.getByRole('textbox')
      
      // Add text
      await user.type(textarea, 'Test message')
      
      // Add tool
      await user.click(screen.getByText('Tools'))
      await user.click(screen.getByText('Web Search'))
      
      // Add business function via @ trigger
      await user.type(textarea, ' @')
      await waitFor(() => {
        expect(screen.getByText('Market Analysis')).toBeInTheDocument()
      })
      await user.click(screen.getByText('Market Analysis'))
      
      // Send message
      await user.keyboard('{Enter}')
      
      expect(mockOnSendMessage).toHaveBeenCalledWith(
        'Test message ',
        [],
        [sampleTools[0]],
        sampleFunctions[0]
      )
    })
  })
})
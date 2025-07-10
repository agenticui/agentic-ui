# Agentic UI

A focused React component library providing ChatInput and essential UI components for building AI chat applications.

## 🌟 Features

- **💬 ChatInput Component**: Advanced chat input with file uploads, tool selection, and business function integration
- **🎯 AI-First Design**: Purpose-built for AI chat applications with drag-and-drop, search menus, and badge management
- **⚡ Real-time Features**: Built-in support for streaming, file handling, and interactive selections
- **🎨 Modern Design**: Built with Tailwind CSS and class-variance-authority for consistent styling
- **♿ Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **📱 Responsive**: Works perfectly on mobile, tablet, and desktop
- **🔧 Customizable**: Extensive theming and variant options
- **📚 TypeScript**: Full type safety with comprehensive TypeScript definitions

## 📦 Installation

```bash
npm install agentic-ui
# or
yarn add agentic-ui
# or
pnpm add agentic-ui
```

## 🚀 Quick Start

```tsx
import { ChatInput, Toaster } from 'agentic-ui'
import 'agentic-ui/dist/index.css'

function ChatInterface() {
  const [messages, setMessages] = useState([])
  
  const handleSendMessage = (content, files, tools, businessFunction) => {
    const newMessage = {
      id: Date.now(),
      content,
      files,
      tools,
      businessFunction,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const tools = [
    { id: '1', name: 'Web Search', description: 'Search the internet' },
    { id: '2', name: 'Calculator', description: 'Perform calculations' }
  ]

  const businessFunctions = [
    { 
      id: '1', 
      name: 'Market Analysis', 
      description: 'Analyze market trends',
      topic: 'Research' 
    }
  ]

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4">
        {/* Your messages display here */}
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        placeholder="Type your message..."
        showAttachment={true}
        showTools={true}
        tools={tools}
        businessFunctions={businessFunctions}
        maxLength={2000}
      />
      
      <Toaster />
    </div>
  )
}
```

## 🧩 Components

### ChatInput

The main chat input component with advanced features for AI applications.

```tsx
<ChatInput
  onSendMessage={(content, files, tools, businessFunction) => {
    // Handle message sending
  }}
  placeholder="Type a message..."
  showAttachment={true}
  showTools={true}
  showDeepResearch={false}
  tools={tools}
  businessFunctions={businessFunctions}
  selectedTools={selectedTools}
  selectedBusinessFunction={selectedBusinessFunction}
  onToolsChange={setSelectedTools}
  onBusinessFunctionChange={setSelectedBusinessFunction}
  maxLength={2000}
  disabled={false}
  className="custom-chat-input"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSendMessage` | `(content: string, files: File[], tools: Tool[], businessFunction?: BusinessFunction) => void` | - | Callback when message is sent |
| `placeholder` | `string` | `"Type your message..."` | Input placeholder text |
| `showAttachment` | `boolean` | `false` | Show file attachment button |
| `showTools` | `boolean` | `false` | Show tools selection button |
| `showDeepResearch` | `boolean` | `false` | Show deep research toggle |
| `tools` | `Tool[]` | `[]` | Available tools for selection |
| `businessFunctions` | `BusinessFunction[]` | `[]` | Available business functions |
| `maxLength` | `number` | `undefined` | Maximum character limit |
| `disabled` | `boolean` | `false` | Disable the input |

### Badge

Displays selected items with subtle variants and remove functionality.

```tsx
<Badge 
  variant="blue-subtle" 
  size="sm" 
  removable={true}
  onRemove={() => handleRemove()}
>
  Selected Item
</Badge>
```

### UI Components

Supporting components included for ChatInput functionality:

- **AttachmentButton**: File upload button with drag-and-drop
- **ToolsButton**: Tools selection with dropdown menu
- **SearchMenu**: Searchable menu for tools and functions
- **FileDisplay**: File preview with remove functionality
- **SelectedItemsBadges**: Display selected tools and functions as badges
- **DragDropOverlay**: Drag and drop file upload overlay
- **Button**: Base button component with variants

## 🎨 Styling & Variants

### Badge Variants

```tsx
// Subtle variants (recommended for ChatInput)
<Badge variant="blue-subtle">Tool</Badge>
<Badge variant="green-subtle">Function</Badge>
<Badge variant="purple-subtle">Category</Badge>
<Badge variant="gray-subtle">Tag</Badge>

// Standard variants
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Destructive</Badge>
```

### Button Variants

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

## 🔧 Advanced Usage

### Custom File Handling

```tsx
<ChatInput
  onSendMessage={(content, files) => {
    files.forEach(file => {
      console.log(`File: ${file.name}, Size: ${file.size}`)
    })
  }}
  showAttachment={true}
  acceptedFileTypes=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx"
  maxFileSize={10485760} // 10MB
/>
```

### Tool and Function Integration

```tsx
const tools = [
  {
    id: 'web-search',
    name: 'Web Search',
    description: 'Search the internet for information',
    icon: 'search'
  },
  {
    id: 'calculator',
    name: 'Calculator', 
    description: 'Perform mathematical calculations',
    icon: 'calculator'
  }
]

const businessFunctions = [
  {
    id: 'market-analysis',
    name: 'Market Analysis',
    description: 'Analyze market trends and data',
    topic: 'Research',
    icon: 'trending-up'
  }
]

<ChatInput
  tools={tools}
  businessFunctions={businessFunctions}
  onSendMessage={(content, files, selectedTools, selectedFunction) => {
    // selectedTools: Array of selected tool objects
    // selectedFunction: Selected business function object
  }}
/>
```

### Streaming Support

```tsx
const [isStreaming, setIsStreaming] = useState(false)

<ChatInput
  onSendMessage={handleSend}
  disabled={isStreaming}
  placeholder={isStreaming ? "AI is responding..." : "Type your message..."}
/>
```

## 🎯 Use Cases

- **AI Chat Applications**: Full-featured chat input for AI assistants
- **Agent Management**: Tool and function selection for AI agents
- **File Upload**: Document and image upload for AI processing
- **Research Tools**: Integration with business functions and search capabilities
- **Multi-modal Chat**: Support for text, files, and structured selections

## 📱 Responsive Design

All components are built mobile-first:

```tsx
<ChatInput 
  className="w-full max-w-4xl mx-auto"
  // Automatically adapts to screen size
/>
```

## ♿ Accessibility

- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader support with ARIA labels
- ✅ Focus management and visual indicators  
- ✅ Semantic HTML structure
- ✅ High contrast support

## 📚 TypeScript Support

```tsx
import type { 
  Tool, 
  BusinessFunction, 
  UploadedFile,
  ChatInputProps 
} from 'agentic-ui'

const tool: Tool = {
  id: 'search',
  name: 'Web Search',
  description: 'Search the internet'
}

const handleSend = (
  content: string,
  files: UploadedFile[],
  tools: Tool[],
  businessFunction?: BusinessFunction
) => {
  // Fully typed parameters
}
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/agenticui/agentic-ui.git

# Install dependencies
npm install

# Start development
npm run dev

# Build the library
npm run build

# Run tests
npm run test

# Start Storybook
npm run storybook
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Component variants with [Class Variance Authority](https://cva.style/)
- Icons by [Lucide React](https://lucide.dev/)
- Toast notifications by [Sonner](https://sonner.emilkowal.ski/)

---

Made with ❤️ for the AI development community.

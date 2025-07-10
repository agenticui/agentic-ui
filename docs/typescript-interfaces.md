# TypeScript Interfaces Reference

Complete TypeScript interface documentation for the ChatInput component and its related types.

## Core Interfaces

### ChatInputProps

The main props interface for the ChatInput component:

```tsx
interface ChatInputProps {
  // Message handler - receives all context
  onSendMessage: (
    message: string,
    files?: UploadedFile[],
    tools?: Tool[],
    businessFunction?: BusinessFunction
  ) => void
  
  // Basic configuration
  placeholder?: string
  disabled?: boolean
  className?: string
  maxLength?: number
  
  // Feature toggles
  showAttachment?: boolean
  showVoice?: boolean
  showTools?: boolean
  showDeepResearch?: boolean
  
  // Data configuration
  tools?: Tool[]
  businessFunctions?: BusinessFunction[]
  
  // State management
  isStreaming?: boolean
  isDeepResearch?: boolean
  onDeepResearchChange?: (enabled: boolean) => void
  
  // Dynamic content management
  onAddTool?: (tool: Omit<Tool, 'id'>) => void
  onAddBusinessFunction?: (func: Omit<BusinessFunction, 'id'>) => void
  
  // File upload configuration
  maxFiles?: number
  maxFileSize?: number
  allowedFileTypes?: string[]
  fileUploadHandlers?: FileUploadHandlers
  
  // UI customization
  toolsIcon?: React.ReactNode
  toolsLabel?: string
  deepResearchIcon?: React.ReactNode
  deepResearchLabel?: string
  attachmentAccept?: string
  attachmentTooltip?: string
  enableSlashTools?: boolean
}
```

### Tool Interface

Represents a tool that can be selected and used:

```tsx
interface Tool {
  id: string              // Unique identifier
  name: string           // Display name
  description: string    // Tool description
  icon?: string         // Optional icon (emoji or identifier)
}
```

**Usage Example:**
```tsx
const tools: Tool[] = [
  {
    id: 'web-search',
    name: 'Web Search',
    description: 'Search the internet for information',
    icon: '🔍'
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Perform mathematical calculations',
    icon: '🧮'
  }
]
```

### BusinessFunction Interface

Represents a business function that provides context:

```tsx
interface BusinessFunction {
  id: string              // Unique identifier
  name: string           // Display name
  description: string    // Function description
  icon?: string         // Optional icon
  topic: string         // Category/topic for grouping
}
```

**Usage Example:**
```tsx
const businessFunctions: BusinessFunction[] = [
  {
    id: 'sales-analysis',
    name: 'Sales Analysis',
    description: 'Analyze sales data and performance metrics',
    icon: '📊',
    topic: 'Sales'
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Handle customer inquiries and issues',
    icon: '🎧',
    topic: 'Support'
  }
]
```

## File Upload Interfaces

### UploadedFile Interface

Represents a successfully uploaded file:

```tsx
interface UploadedFile {
  id: string              // Unique file identifier
  name: string           // Original filename
  size: number           // File size in bytes
  type: string           // MIME type
  isImage?: boolean      // Whether file is an image
  uploadedAt: string     // ISO timestamp of upload
  url?: string          // Accessible URL for the file
}
```

### FileUploadHandlers Interface

Custom handlers for file operations:

```tsx
interface FileUploadHandlers {
  onUpload?: (file: File) => Promise<FileUploadResult>
  onRemove?: (fileId: string) => Promise<{ success: boolean; error?: string }>
  onProgress?: (fileId: string, progress: FileUploadProgress) => void
}
```

### FileUploadResult Interface

Result of a file upload operation:

```tsx
interface FileUploadResult {
  success: boolean        // Whether upload succeeded
  file?: UploadedFile    // File info if successful
  error?: string         // Error message if failed
}
```

### FileUploadProgress Interface

Progress information for file uploads:

```tsx
interface FileUploadProgress {
  progress: number        // Progress percentage (0-100)
  isUploading: boolean   // Whether upload is in progress
  error?: string         // Error message if applicable
}
```

## Handler Function Types

### OnSendMessage Handler

The main message handler that receives all context:

```tsx
type OnSendMessage = (
  message: string,
  files?: UploadedFile[],
  tools?: Tool[],
  businessFunction?: BusinessFunction
) => void
```

**Parameters:**
- `message`: The user's text input
- `files`: Array of uploaded files (optional)
- `tools`: Array of selected tools (optional)
- `businessFunction`: Selected business function (optional)

### OnDeepResearchChange Handler

Handler for deep research mode changes:

```tsx
type OnDeepResearchChange = (enabled: boolean) => void
```

### OnAddTool Handler

Handler for dynamically adding new tools:

```tsx
type OnAddTool = (tool: Omit<Tool, 'id'>) => void
```

### OnAddBusinessFunction Handler

Handler for dynamically adding new business functions:

```tsx
type OnAddBusinessFunction = (func: Omit<BusinessFunction, 'id'>) => void
```

## Usage Examples

### Basic Implementation

```tsx
import { ChatInput, type ChatInputProps, type Tool, type BusinessFunction } from 'agentic-ui'

const MyComponent: React.FC = () => {
  const handleMessage: ChatInputProps['onSendMessage'] = (
    message,
    files,
    tools,
    businessFunction
  ) => {
    console.log('Message:', message)
    console.log('Files:', files)
    console.log('Tools:', tools)
    console.log('Business Function:', businessFunction)
  }

  return (
    <ChatInput
      onSendMessage={handleMessage}
      showAttachment={true}
      showTools={true}
      showDeepResearch={true}
    />
  )
}
```

### Advanced Implementation with All Features

```tsx
import { 
  ChatInput, 
  type ChatInputProps, 
  type Tool, 
  type BusinessFunction,
  type FileUploadHandlers,
  type UploadedFile 
} from 'agentic-ui'

const AdvancedChatComponent: React.FC = () => {
  const [isDeepResearch, setIsDeepResearch] = useState(false)
  
  const tools: Tool[] = [
    { id: 'search', name: 'Search', description: 'Web search' },
    { id: 'calc', name: 'Calculator', description: 'Math calculations' }
  ]
  
  const businessFunctions: BusinessFunction[] = [
    { 
      id: 'sales', 
      name: 'Sales', 
      description: 'Sales analysis', 
      topic: 'Business' 
    }
  ]
  
  const fileUploadHandlers: FileUploadHandlers = {
    onUpload: async (file: File) => {
      // Custom upload logic
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      return {
        success: true,
        file: {
          id: data.id,
          name: file.name,
          size: file.size,
          type: file.type,
          isImage: file.type.startsWith('image/'),
          uploadedAt: new Date().toISOString(),
          url: data.url
        }
      }
    },
    
    onRemove: async (fileId: string) => {
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE'
      })
      return { success: response.ok }
    }
  }
  
  const handleMessage: ChatInputProps['onSendMessage'] = (
    message,
    files,
    tools,
    businessFunction
  ) => {
    // Type-safe message handling
    const context = {
      message,
      files: files || [],
      tools: tools || [],
      businessFunction,
      isDeepResearch,
      timestamp: new Date().toISOString()
    }
    
    processMessage(context)
  }
  
  const processMessage = (context: {
    message: string
    files: UploadedFile[]
    tools: Tool[]
    businessFunction?: BusinessFunction
    isDeepResearch: boolean
    timestamp: string
  }) => {
    // Process with full type safety
    if (context.isDeepResearch) {
      performDeepResearch(context)
    } else {
      processRegularMessage(context)
    }
  }
  
  return (
    <ChatInput
      onSendMessage={handleMessage}
      tools={tools}
      businessFunctions={businessFunctions}
      fileUploadHandlers={fileUploadHandlers}
      isDeepResearch={isDeepResearch}
      onDeepResearchChange={setIsDeepResearch}
      showAttachment={true}
      showTools={true}
      showDeepResearch={true}
      maxFiles={5}
      maxFileSize={50 * 1024 * 1024} // 50MB
      allowedFileTypes={[
        'application/pdf',
        'image/jpeg',
        'image/png',
        'text/plain'
      ]}
      placeholder="Type your message..."
    />
  )
}
```

## Type Guards and Utilities

### Type Guards

```tsx
// Type guard for checking if a file is an image
const isImageFile = (file: UploadedFile): boolean => {
  return file.isImage || file.type.startsWith('image/')
}

// Type guard for checking if tools are selected
const hasTools = (tools?: Tool[]): tools is Tool[] => {
  return Boolean(tools && tools.length > 0)
}

// Type guard for checking if business function is selected
const hasBusinessFunction = (func?: BusinessFunction): func is BusinessFunction => {
  return Boolean(func)
}
```

### Utility Types

```tsx
// Message context type
type MessageContext = {
  message: string
  files: UploadedFile[]
  tools: Tool[]
  businessFunction?: BusinessFunction
  isDeepResearch: boolean
  timestamp: string
}

// Tool execution result
type ToolResult = {
  toolId: string
  success: boolean
  result?: any
  error?: string
}

// Business function execution result
type BusinessFunctionResult = {
  functionId: string
  success: boolean
  result?: any
  error?: string
}
```

### Generic Handler Types

```tsx
// Generic message processor
type MessageProcessor<T = any> = (context: MessageContext) => Promise<T>

// Generic tool executor
type ToolExecutor<T = any> = (tool: Tool, message: string, files: UploadedFile[]) => Promise<T>

// Generic business function processor
type BusinessFunctionProcessor<T = any> = (
  func: BusinessFunction,
  message: string,
  files: UploadedFile[],
  tools: Tool[]
) => Promise<T>
```

## Configuration Patterns

### Default Configuration

```tsx
const defaultChatConfig: Partial<ChatInputProps> = {
  placeholder: "Type your message...",
  maxFiles: 10,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'text/plain'
  ],
  showAttachment: true,
  showTools: false,
  showDeepResearch: false,
  enableSlashTools: true
}
```

### Production Configuration

```tsx
const productionChatConfig: Partial<ChatInputProps> = {
  ...defaultChatConfig,
  maxFiles: 5,
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedFileTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/webp',
    'text/plain',
    'text/csv'
  ],
  showTools: true,
  showDeepResearch: true
}
```

This comprehensive TypeScript interface documentation provides type safety and better development experience when working with the ChatInput component.
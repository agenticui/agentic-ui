# Claude Integration Guide for Agentic UI

This guide helps Claude understand how to use the agentic-ui library to create AI chat applications with the ChatInput component.

## 🎯 Purpose

The agentic-ui library provides a complete ChatInput component designed specifically for AI applications like Claude interfaces. It handles file uploads, tool selection, business function integration, and provides a polished chat experience.

## 📋 Quick Reference

### Installation
```bash
npm install agentic-ui
```

### Basic Import
```tsx
import { ChatInput, Toaster } from 'agentic-ui'
import 'agentic-ui/dist/index.css'
```

## 🚀 Creating a New Project

### 1. Initialize React Project
```bash
# Create new React project with TypeScript
npx create-react-app my-ai-chat --template typescript
cd my-ai-chat

# Install agentic-ui
npm install agentic-ui

# Install additional dependencies for styling
npm install tailwindcss@latest @tailwindcss/typography
```

### 2. Configure Tailwind CSS
Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/agentic-ui/dist/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
```

Add to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Basic Chat Interface Setup
Replace `src/App.tsx`:
```tsx
import React, { useState } from 'react'
import { ChatInput, Toaster } from 'agentic-ui'
import 'agentic-ui/dist/index.css'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  files?: File[]
  tools?: any[]
  businessFunction?: any
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Sample tools for Claude to use
  const tools = [
    { id: 'web-search', name: 'Web Search', description: 'Search the internet for information' },
    { id: 'calculator', name: 'Calculator', description: 'Perform mathematical calculations' },
    { id: 'code-analyzer', name: 'Code Analyzer', description: 'Analyze and review code' }
  ]

  // Sample business functions
  const businessFunctions = [
    { 
      id: 'research', 
      name: 'Research Analysis', 
      description: 'Conduct deep research on topics',
      topic: 'Research' 
    },
    { 
      id: 'writing', 
      name: 'Content Writing', 
      description: 'Generate various types of content',
      topic: 'Writing' 
    }
  ]

  const handleSendMessage = async (
    content: string, 
    files: File[], 
    selectedTools: any[], 
    selectedBusinessFunction: any
  ) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      files,
      tools: selectedTools,
      businessFunction: selectedBusinessFunction
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // TODO: Integrate with Claude API here
      // This is where you would call Claude's API
      const response = await callClaudeAPI(content, files, selectedTools, selectedBusinessFunction)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error calling Claude API:', error)
      // Handle error appropriately
    } finally {
      setIsLoading(false)
    }
  }

  // Placeholder for Claude API integration
  const callClaudeAPI = async (
    content: string, 
    files: File[], 
    tools: any[], 
    businessFunction: any
  ): Promise<string> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let response = `I received your message: "${content}"`
    
    if (files.length > 0) {
      response += `\n\nFiles uploaded: ${files.map(f => f.name).join(', ')}`
    }
    
    if (tools.length > 0) {
      response += `\n\nTools selected: ${tools.map(t => t.name).join(', ')}`
    }
    
    if (businessFunction) {
      response += `\n\nBusiness function: ${businessFunction.name}`
    }
    
    return response
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-semibold text-gray-900">Claude AI Chat</h1>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg">Start a conversation with Claude</p>
            <p className="text-sm">Upload files, select tools, or choose business functions to enhance your chat</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-3xl mx-auto ${
                message.role === 'user' ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <div
                className={`rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white ml-12'
                    : 'bg-white shadow-sm border mr-12'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                
                {/* Show file attachments */}
                {message.files && message.files.length > 0 && (
                  <div className="mt-2 text-sm opacity-75">
                    📎 {message.files.map(f => f.name).join(', ')}
                  </div>
                )}
                
                {/* Show selected tools */}
                {message.tools && message.tools.length > 0 && (
                  <div className="mt-2 text-sm opacity-75">
                    🛠️ {message.tools.map(t => t.name).join(', ')}
                  </div>
                )}
                
                {/* Show business function */}
                {message.businessFunction && (
                  <div className="mt-2 text-sm opacity-75">
                    💼 {message.businessFunction.name}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="max-w-3xl mx-auto mr-12">
            <div className="bg-white shadow-sm border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span className="text-gray-600">Claude is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            onSendMessage={handleSendMessage}
            placeholder="Message Claude..."
            showAttachment={true}
            showTools={true}
            tools={tools}
            businessFunctions={businessFunctions}
            disabled={isLoading}
            maxLength={4000}
          />
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  )
}

export default App
```

## 🔧 Advanced Integration Patterns

### 1. File Processing
```tsx
const handleSendMessage = async (content: string, files: File[]) => {
  // Process files before sending to Claude
  const processedFiles = await Promise.all(
    files.map(async (file) => {
      if (file.type.startsWith('image/')) {
        // Convert images to base64 for Claude vision
        const base64 = await fileToBase64(file)
        return { type: 'image', data: base64, name: file.name }
      } else if (file.type === 'text/plain' || file.name.endsWith('.md')) {
        // Read text files
        const text = await file.text()
        return { type: 'text', data: text, name: file.name }
      }
      return { type: 'file', name: file.name, size: file.size }
    })
  )
  
  // Send to Claude with file context
  await callClaudeWithFiles(content, processedFiles)
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}
```

### 2. Tool Integration
```tsx
const executeToolCall = async (toolId: string, parameters: any) => {
  switch (toolId) {
    case 'web-search':
      return await performWebSearch(parameters.query)
    case 'calculator':
      return await calculate(parameters.expression)
    case 'code-analyzer':
      return await analyzeCode(parameters.code)
    default:
      throw new Error(`Unknown tool: ${toolId}`)
  }
}

const handleSendMessage = async (
  content: string, 
  files: File[], 
  selectedTools: any[]
) => {
  // Include tool capabilities in Claude prompt
  const toolContext = selectedTools.map(tool => 
    `Available tool: ${tool.name} - ${tool.description}`
  ).join('\n')
  
  const enhancedPrompt = `${toolContext}\n\nUser message: ${content}`
  
  // Send to Claude API
  const response = await callClaudeAPI(enhancedPrompt, files)
  
  // Parse tool calls from Claude response if needed
  // Execute tools and send results back to Claude
}
```

### 3. Streaming Responses
```tsx
const [streamingMessage, setStreamingMessage] = useState('')

const handleSendMessage = async (content: string) => {
  // ... add user message ...
  
  // Start streaming response
  const stream = await callClaudeStreamingAPI(content)
  
  setStreamingMessage('')
  
  for await (const chunk of stream) {
    setStreamingMessage(prev => prev + chunk)
  }
  
  // Finalize message
  const finalMessage: Message = {
    id: Date.now().toString(),
    content: streamingMessage,
    role: 'assistant',
    timestamp: new Date()
  }
  
  setMessages(prev => [...prev, finalMessage])
  setStreamingMessage('')
}

// In your messages rendering:
{streamingMessage && (
  <div className="max-w-3xl mx-auto mr-12">
    <div className="bg-white shadow-sm border rounded-lg p-4">
      <p className="whitespace-pre-wrap">{streamingMessage}</p>
      <div className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-1"></div>
    </div>
  </div>
)}
```

## 🎨 Customization Examples

### 1. Custom Styling
```tsx
<ChatInput
  className="border-2 border-blue-200 rounded-2xl"
  onSendMessage={handleSendMessage}
  placeholder="Ask Claude anything..."
/>
```

### 2. Custom Tool Configuration
```tsx
const claudeTools = [
  {
    id: 'vision',
    name: 'Image Analysis',
    description: 'Analyze and describe images',
    icon: 'eye'
  },
  {
    id: 'reasoning',
    name: 'Step-by-step Reasoning',
    description: 'Break down complex problems',
    icon: 'brain'
  },
  {
    id: 'code',
    name: 'Code Assistant',
    description: 'Help with programming tasks',
    icon: 'code'
  }
]
```

### 3. Custom Business Functions
```tsx
const claudeFunctions = [
  {
    id: 'analysis',
    name: 'Deep Analysis',
    description: 'Thorough analysis of complex topics',
    topic: 'Research'
  },
  {
    id: 'creative',
    name: 'Creative Writing',
    description: 'Generate creative content',
    topic: 'Writing'
  },
  {
    id: 'technical',
    name: 'Technical Documentation',
    description: 'Create technical documentation',
    topic: 'Documentation'
  }
]
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Create `.env` file:
```env
REACT_APP_CLAUDE_API_KEY=your_api_key_here
REACT_APP_CLAUDE_API_URL=https://api.anthropic.com/v1/messages
```

## 📚 Key Features for Claude

1. **File Upload**: Supports images, documents, and text files for Claude's vision and document analysis capabilities
2. **Tool Selection**: Predefined tools that Claude can use to enhance responses
3. **Business Functions**: Specialized modes for different types of interactions
4. **Responsive Design**: Works on desktop and mobile devices
5. **Accessibility**: Full keyboard navigation and screen reader support
6. **TypeScript**: Complete type safety for robust development

## 🔗 Additional Resources

- **NPM Package**: https://www.npmjs.com/package/agentic-ui
- **GitHub Repository**: https://github.com/agenticui/agentic-ui
- **Component Documentation**: See README.md for detailed API documentation

## 💡 Tips for Claude Integration

1. Use the `disabled` prop during API calls to prevent multiple submissions
2. Implement proper error handling for API failures
3. Use the `maxLength` prop to respect Claude's token limits
4. Process files appropriately for Claude's input format
5. Implement streaming for better user experience with long responses
6. Use business functions to set different interaction modes
7. Leverage tools to extend Claude's capabilities

This guide provides everything needed to create a professional Claude chat interface using the agentic-ui library.
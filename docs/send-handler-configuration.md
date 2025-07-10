# Send Handler Configuration Guide

The `ChatInput` component provides a powerful `onSendMessage` handler that receives rich context about the user's message, including selected tools, business functions, deep research mode, and uploaded files. This guide shows how to configure and use these handlers effectively.

## Quick Overview

The `onSendMessage` handler receives:
- **Message content** - The user's text input
- **Uploaded files** - Array of files with URLs ready for use
- **Selected tools** - Array of tools the user wants to use
- **Business function** - Selected business function context
- **Deep research mode** - Available through component props

## Complete Handler Interface

```tsx
interface ChatInputProps {
  onSendMessage: (
    message: string,
    files?: UploadedFile[],
    tools?: Tool[],
    businessFunction?: BusinessFunction
  ) => void
  
  // Component state
  isDeepResearch?: boolean
  onDeepResearchChange?: (enabled: boolean) => void
  
  // Configuration
  tools?: Tool[]
  businessFunctions?: BusinessFunction[]
  fileUploadHandlers?: FileUploadHandlers
}
```

## Type Definitions

### Message Handler Types

```tsx
interface Tool {
  id: string
  name: string
  description: string
  icon?: string
}

interface BusinessFunction {
  id: string
  name: string
  description: string
  icon?: string
  topic: string
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  isImage?: boolean
  uploadedAt: string
  url?: string
}
```

## Configuration Stories

### Story 1: Basic Message Handling

```tsx
import { ChatInput } from 'agentic-ui'

function BasicMessageHandler() {
  const handleMessage = (message: string) => {
    console.log('User said:', message)
    // Simple message processing
  }

  return (
    <ChatInput
      onSendMessage={handleMessage}
      placeholder="Type your message..."
    />
  )
}
```

### Story 2: File Upload Integration

```tsx
function FileUploadHandler() {
  const uploadHandlers = {
    onUpload: async (file: File) => {
      // Upload to your storage
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
    }
  }

  const handleMessage = (message: string, files?: UploadedFile[]) => {
    console.log('Message:', message)
    console.log('Files:', files)
    
    // Process message with files
    if (files?.length) {
      console.log('Processing files:')
      files.forEach(file => {
        console.log(`- ${file.name} (${file.url})`)
      })
    }
  }

  return (
    <ChatInput
      onSendMessage={handleMessage}
      fileUploadHandlers={uploadHandlers}
      showAttachment={true}
      maxFiles={5}
      placeholder="Type your message and attach files..."
    />
  )
}
```

### Story 3: Tools Integration

```tsx
function ToolsIntegration() {
  const availableTools = [
    {
      id: 'search',
      name: 'Web Search',
      description: 'Search the web for information',
      icon: '🔍'
    },
    {
      id: 'calculator',
      name: 'Calculator',
      description: 'Perform calculations',
      icon: '🧮'
    },
    {
      id: 'translator',
      name: 'Translator',
      description: 'Translate text between languages',
      icon: '🌐'
    }
  ]

  const handleMessage = (
    message: string,
    files?: UploadedFile[],
    tools?: Tool[]
  ) => {
    console.log('Message:', message)
    console.log('Selected tools:', tools)
    
    // Process message with tools
    if (tools?.length) {
      console.log('Using tools:')
      tools.forEach(tool => {
        console.log(`- ${tool.name}: ${tool.description}`)
        // Execute tool-specific logic
        executeToolLogic(tool.id, message, files)
      })
    } else {
      // Process without tools
      processRegularMessage(message, files)
    }
  }

  const executeToolLogic = (toolId: string, message: string, files?: UploadedFile[]) => {
    switch (toolId) {
      case 'search':
        // Perform web search
        performWebSearch(message)
        break
      case 'calculator':
        // Perform calculations
        performCalculation(message)
        break
      case 'translator':
        // Translate text
        translateText(message)
        break
    }
  }

  return (
    <ChatInput
      onSendMessage={handleMessage}
      tools={availableTools}
      showTools={true}
      enableSlashTools={true}
      placeholder="Type your message or use /tool to select tools..."
    />
  )
}
```

### Story 4: Business Functions Integration

```tsx
function BusinessFunctionsIntegration() {
  const businessFunctions = [
    {
      id: 'sales-analysis',
      name: 'Sales Analysis',
      description: 'Analyze sales data and trends',
      topic: 'Sales',
      icon: '📊'
    },
    {
      id: 'customer-support',
      name: 'Customer Support',
      description: 'Handle customer inquiries',
      topic: 'Support',
      icon: '🎧'
    },
    {
      id: 'marketing-campaign',
      name: 'Marketing Campaign',
      description: 'Plan marketing campaigns',
      topic: 'Marketing',
      icon: '📢'
    }
  ]

  const handleMessage = (
    message: string,
    files?: UploadedFile[],
    tools?: Tool[],
    businessFunction?: BusinessFunction
  ) => {
    console.log('Message:', message)
    console.log('Business function:', businessFunction)
    
    if (businessFunction) {
      // Route to specific business function handler
      routeToBusinessFunction(businessFunction, message, files, tools)
    } else {
      // Handle as general message
      processGeneralMessage(message, files, tools)
    }
  }

  const routeToBusinessFunction = (
    func: BusinessFunction,
    message: string,
    files?: UploadedFile[],
    tools?: Tool[]
  ) => {
    console.log(`Processing with ${func.name} context`)
    
    switch (func.id) {
      case 'sales-analysis':
        // Handle sales-related queries
        handleSalesAnalysis(message, files)
        break
      case 'customer-support':
        // Handle support queries
        handleCustomerSupport(message, files)
        break
      case 'marketing-campaign':
        // Handle marketing queries
        handleMarketingCampaign(message, files, tools)
        break
    }
  }

  return (
    <ChatInput
      onSendMessage={handleMessage}
      businessFunctions={businessFunctions}
      showTools={true}
      placeholder="Type your message or use @ to select business functions..."
    />
  )
}
```

### Story 5: Deep Research Mode Integration

```tsx
function DeepResearchIntegration() {
  const [isDeepResearch, setIsDeepResearch] = useState(false)
  const [researchResults, setResearchResults] = useState<any[]>([])

  const handleMessage = (
    message: string,
    files?: UploadedFile[],
    tools?: Tool[],
    businessFunction?: BusinessFunction
  ) => {
    console.log('Message:', message)
    console.log('Deep research mode:', isDeepResearch)
    
    if (isDeepResearch) {
      // Handle as deep research query
      performDeepResearch(message, files, tools, businessFunction)
    } else {
      // Handle as regular message
      processRegularMessage(message, files, tools, businessFunction)
    }
  }

  const performDeepResearch = async (
    message: string,
    files?: UploadedFile[],
    tools?: Tool[],
    businessFunction?: BusinessFunction
  ) => {
    console.log('Starting deep research on:', message)
    
    // Multi-step research process
    const researchSteps = [
      'Analyzing query intent',
      'Gathering relevant sources',
      'Processing information',
      'Synthesizing insights',
      'Generating comprehensive report'
    ]
    
    for (const step of researchSteps) {
      console.log(`Research step: ${step}`)
      // Perform research step
      await performResearchStep(step, message, files, tools, businessFunction)
    }
    
    console.log('Deep research completed')
  }

  const performResearchStep = async (
    step: string,
    message: string,
    files?: UploadedFile[],
    tools?: Tool[],
    businessFunction?: BusinessFunction
  ) => {
    // Implement research logic based on context
    const context = {
      step,
      message,
      files,
      tools,
      businessFunction,
      isDeepResearch: true
    }
    
    // Use different research strategies based on context
    if (businessFunction) {
      // Business-focused research
      await performBusinessResearch(context)
    } else if (tools?.length) {
      // Tool-enhanced research
      await performToolEnhancedResearch(context)
    } else {
      // General research
      await performGeneralResearch(context)
    }
  }

  return (
    <ChatInput
      onSendMessage={handleMessage}
      isDeepResearch={isDeepResearch}
      onDeepResearchChange={setIsDeepResearch}
      showDeepResearch={true}
      deepResearchLabel="Deep Research"
      tools={availableTools}
      businessFunctions={businessFunctions}
      placeholder={
        isDeepResearch 
          ? "Enter your research topic for comprehensive analysis..."
          : "Type your message..."
      }
    />
  )
}
```

### Story 6: Complete Integration Example

```tsx
function CompleteIntegrationExample() {
  const [isDeepResearch, setIsDeepResearch] = useState(false)
  const [chatHistory, setChatHistory] = useState<any[]>([])

  // Available tools
  const tools = [
    { id: 'search', name: 'Web Search', description: 'Search the web' },
    { id: 'calculator', name: 'Calculator', description: 'Perform calculations' },
    { id: 'analyzer', name: 'Data Analyzer', description: 'Analyze data files' }
  ]

  // Business functions
  const businessFunctions = [
    { id: 'sales', name: 'Sales Analysis', description: 'Sales insights', topic: 'Sales' },
    { id: 'support', name: 'Customer Support', description: 'Help customers', topic: 'Support' },
    { id: 'marketing', name: 'Marketing', description: 'Marketing campaigns', topic: 'Marketing' }
  ]

  // File upload handlers
  const fileUploadHandlers = {
    onUpload: async (file: File) => {
      // Upload to cloud storage
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

  // Complete message handler
  const handleMessage = (
    message: string,
    files?: UploadedFile[],
    tools?: Tool[],
    businessFunction?: BusinessFunction
  ) => {
    console.log('=== MESSAGE RECEIVED ===')
    console.log('Content:', message)
    console.log('Files:', files)
    console.log('Tools:', tools)
    console.log('Business Function:', businessFunction)
    console.log('Deep Research:', isDeepResearch)
    
    // Create message context
    const messageContext = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      content: message,
      files: files || [],
      tools: tools || [],
      businessFunction,
      isDeepResearch,
      metadata: {
        hasFiles: Boolean(files?.length),
        hasTools: Boolean(tools?.length),
        hasBusinessFunction: Boolean(businessFunction),
        isDeepResearch
      }
    }
    
    // Add to chat history
    setChatHistory(prev => [...prev, messageContext])
    
    // Process based on context
    processMessageWithContext(messageContext)
  }

  const processMessageWithContext = (context: any) => {
    const { content, files, tools, businessFunction, isDeepResearch } = context
    
    if (isDeepResearch) {
      // Deep research mode
      performDeepResearch(context)
    } else if (businessFunction) {
      // Business function mode
      processBusinessFunction(context)
    } else if (tools?.length) {
      // Tools mode
      processWithTools(context)
    } else if (files?.length) {
      // Files mode
      processWithFiles(context)
    } else {
      // Regular message
      processRegularMessage(context)
    }
  }

  const performDeepResearch = async (context: any) => {
    console.log('🔍 Starting deep research...')
    
    // Research pipeline
    const steps = [
      'Query analysis',
      'Source gathering',
      'Information processing',
      'Insight generation',
      'Report compilation'
    ]
    
    for (const step of steps) {
      console.log(`📝 ${step}...`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Use context for research
      if (context.businessFunction) {
        console.log(`   Using ${context.businessFunction.name} context`)
      }
      
      if (context.files?.length) {
        console.log(`   Analyzing ${context.files.length} files`)
      }
      
      if (context.tools?.length) {
        console.log(`   Using tools: ${context.tools.map(t => t.name).join(', ')}`)
      }
    }
    
    console.log('✅ Deep research completed')
  }

  const processBusinessFunction = (context: any) => {
    const { businessFunction, content, files, tools } = context
    
    console.log(`🏢 Processing with ${businessFunction.name}`)
    
    // Business-specific processing
    switch (businessFunction.id) {
      case 'sales':
        processSalesQuery(content, files, tools)
        break
      case 'support':
        processCustomerSupport(content, files, tools)
        break
      case 'marketing':
        processMarketingQuery(content, files, tools)
        break
    }
  }

  const processWithTools = (context: any) => {
    const { tools, content, files } = context
    
    console.log(`🔧 Using tools: ${tools.map(t => t.name).join(', ')}`)
    
    tools.forEach(tool => {
      switch (tool.id) {
        case 'search':
          performWebSearch(content)
          break
        case 'calculator':
          performCalculation(content)
          break
        case 'analyzer':
          analyzeFiles(files)
          break
      }
    })
  }

  const processWithFiles = (context: any) => {
    const { files, content } = context
    
    console.log(`📁 Processing ${files.length} files`)
    
    files.forEach(file => {
      console.log(`Processing: ${file.name} (${file.type})`)
      
      if (file.isImage) {
        processImageFile(file)
      } else if (file.type.includes('pdf')) {
        processPDFFile(file)
      } else {
        processTextFile(file)
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Current Configuration</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Tools: {tools.length} available</p>
            <p>• Business Functions: {businessFunctions.length} available</p>
            <p>• Deep Research: {isDeepResearch ? 'Enabled' : 'Disabled'}</p>
            <p>• File Upload: Enabled</p>
            <p>• Chat History: {chatHistory.length} messages</p>
          </div>
        </div>

        <ChatInput
          onSendMessage={handleMessage}
          
          // Deep research configuration
          isDeepResearch={isDeepResearch}
          onDeepResearchChange={setIsDeepResearch}
          showDeepResearch={true}
          deepResearchLabel="Deep Research"
          
          // Tools configuration
          tools={tools}
          showTools={true}
          enableSlashTools={true}
          toolsLabel="Tools"
          
          // Business functions configuration
          businessFunctions={businessFunctions}
          
          // File upload configuration
          fileUploadHandlers={fileUploadHandlers}
          showAttachment={true}
          maxFiles={10}
          maxFileSize={50 * 1024 * 1024} // 50MB
          
          // UI configuration
          placeholder={
            isDeepResearch 
              ? "Enter your research topic for comprehensive analysis..."
              : "Type your message, use @ for business functions, / for tools..."
          }
        />
        
        {/* Chat History Display */}
        <div className="bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">
          <h3 className="font-semibold mb-2">Message History</h3>
          {chatHistory.map((msg, index) => (
            <div key={index} className="mb-4 p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-600 mb-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
              <div className="font-medium">{msg.content}</div>
              {msg.files.length > 0 && (
                <div className="text-sm text-blue-600 mt-1">
                  📎 {msg.files.length} files attached
                </div>
              )}
              {msg.tools.length > 0 && (
                <div className="text-sm text-green-600 mt-1">
                  🔧 Tools: {msg.tools.map(t => t.name).join(', ')}
                </div>
              )}
              {msg.businessFunction && (
                <div className="text-sm text-purple-600 mt-1">
                  🏢 {msg.businessFunction.name}
                </div>
              )}
              {msg.isDeepResearch && (
                <div className="text-sm text-orange-600 mt-1">
                  🔍 Deep Research Mode
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

## Handler Implementation Patterns

### Pattern 1: Context-Aware Processing

```tsx
const handleMessage = (message, files, tools, businessFunction) => {
  const context = {
    message,
    files: files || [],
    tools: tools || [],
    businessFunction,
    timestamp: new Date().toISOString(),
    userId: getCurrentUserId(),
    sessionId: getSessionId()
  }
  
  // Route based on context
  if (context.businessFunction) {
    return processBusinessContext(context)
  }
  
  if (context.tools.length > 0) {
    return processToolContext(context)
  }
  
  return processGeneralContext(context)
}
```

### Pattern 2: Async Processing Pipeline

```tsx
const handleMessage = async (message, files, tools, businessFunction) => {
  try {
    // Pre-process files
    const processedFiles = await preprocessFiles(files)
    
    // Execute tools
    const toolResults = await executeTools(tools, message, processedFiles)
    
    // Apply business function
    const businessResult = await applyBusinessFunction(
      businessFunction, 
      message, 
      processedFiles, 
      toolResults
    )
    
    // Generate response
    const response = await generateResponse({
      message,
      files: processedFiles,
      toolResults,
      businessResult
    })
    
    return response
  } catch (error) {
    console.error('Message processing failed:', error)
    handleError(error)
  }
}
```

### Pattern 3: Event-Driven Architecture

```tsx
const handleMessage = (message, files, tools, businessFunction) => {
  // Emit message event
  eventBus.emit('message:received', {
    message,
    files,
    tools,
    businessFunction,
    timestamp: Date.now()
  })
  
  // Process files
  if (files?.length) {
    eventBus.emit('files:process', files)
  }
  
  // Execute tools
  if (tools?.length) {
    eventBus.emit('tools:execute', tools, message)
  }
  
  // Apply business function
  if (businessFunction) {
    eventBus.emit('business:process', businessFunction, message)
  }
}
```

## Best Practices

1. **Always handle all parameters** - Check for files, tools, and business functions
2. **Use TypeScript** - Leverage type safety for better development experience
3. **Implement error handling** - Gracefully handle processing failures
4. **Log context** - Track what features are being used
5. **Validate inputs** - Ensure files and tools are properly formatted
6. **Consider performance** - Handle large files and multiple tools efficiently
7. **Provide feedback** - Give users indication of processing status

This comprehensive configuration allows you to build sophisticated chat interfaces that can handle complex user interactions with full context awareness.
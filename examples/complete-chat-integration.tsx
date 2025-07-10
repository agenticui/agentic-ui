import React, { useState, useCallback, useRef, useEffect } from 'react'
import { 
  ChatInput, 
  type ChatInputProps, 
  type Tool, 
  type BusinessFunction, 
  type FileUploadHandlers,
  type UploadedFile,
  type FileUploadResult
} from '../src/components/conversation/ChatInput'

// Complete Chat Integration Story
// This example demonstrates all ChatInput features working together:
// - File upload with custom handlers
// - Tools integration with execution
// - Business functions with routing
// - Deep research mode
// - Real-time processing feedback
// - Message history and context

interface MessageContext {
  id: string
  timestamp: string
  content: string
  files: UploadedFile[]
  tools: Tool[]
  businessFunction?: BusinessFunction
  isDeepResearch: boolean
  processingStatus: 'pending' | 'processing' | 'completed' | 'error'
  results?: any
  error?: string
}

interface ChatState {
  messages: MessageContext[]
  isProcessing: boolean
  currentOperation: string
  statistics: {
    totalMessages: number
    filesUploaded: number
    toolsUsed: number
    businessFunctionsUsed: number
    deepResearchQueries: number
  }
}

export function CompleteChatIntegration() {
  const [isDeepResearch, setIsDeepResearch] = useState(false)
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isProcessing: false,
    currentOperation: '',
    statistics: {
      totalMessages: 0,
      filesUploaded: 0,
      toolsUsed: 0,
      businessFunctionsUsed: 0,
      deepResearchQueries: 0
    }
  })
  
  const processingRef = useRef<AbortController | null>(null)

  // Available tools configuration
  const tools: Tool[] = [
    {
      id: 'web-search',
      name: 'Web Search',
      description: 'Search the internet for current information',
      icon: '🔍'
    },
    {
      id: 'calculator',
      name: 'Calculator',
      description: 'Perform mathematical calculations',
      icon: '🧮'
    },
    {
      id: 'data-analyzer',
      name: 'Data Analyzer',
      description: 'Analyze uploaded data files',
      icon: '📊'
    },
    {
      id: 'document-processor',
      name: 'Document Processor',
      description: 'Process and extract information from documents',
      icon: '📄'
    },
    {
      id: 'image-analyzer',
      name: 'Image Analyzer',
      description: 'Analyze and describe images',
      icon: '🖼️'
    },
    {
      id: 'translator',
      name: 'Translator',
      description: 'Translate text between languages',
      icon: '🌐'
    }
  ]

  // Business functions configuration
  const businessFunctions: BusinessFunction[] = [
    {
      id: 'sales-analysis',
      name: 'Sales Analysis',
      description: 'Analyze sales data, trends, and performance metrics',
      topic: 'Sales',
      icon: '📈'
    },
    {
      id: 'customer-support',
      name: 'Customer Support',
      description: 'Handle customer inquiries and support requests',
      topic: 'Support',
      icon: '🎧'
    },
    {
      id: 'marketing-campaign',
      name: 'Marketing Campaign',
      description: 'Plan and analyze marketing campaigns',
      topic: 'Marketing',
      icon: '📢'
    },
    {
      id: 'financial-reporting',
      name: 'Financial Reporting',
      description: 'Generate financial reports and analysis',
      topic: 'Finance',
      icon: '💰'
    },
    {
      id: 'hr-management',
      name: 'HR Management',
      description: 'Human resources management and analytics',
      topic: 'HR',
      icon: '👥'
    },
    {
      id: 'inventory-management',
      name: 'Inventory Management',
      description: 'Track and manage inventory levels',
      topic: 'Operations',
      icon: '📦'
    }
  ]

  // File upload handlers with realistic implementation
  const fileUploadHandlers: FileUploadHandlers = {
    onUpload: async (file: File): Promise<FileUploadResult> => {
      try {
        console.log(`🔄 Uploading file: ${file.name}`)
        
        // Simulate realistic upload process
        const formData = new FormData()
        formData.append('file', file)
        formData.append('timestamp', new Date().toISOString())
        formData.append('userId', 'user-123')
        
        // Simulate upload delay based on file size
        const uploadTime = Math.min(file.size / 1024 / 1024 * 500, 3000) // 500ms per MB, max 3s
        await new Promise(resolve => setTimeout(resolve, uploadTime))
        
        // Simulate upload to cloud storage
        const mockUploadResponse = {
          id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          url: `https://storage.example.com/files/${file.name}`,
          thumbnailUrl: file.type.startsWith('image/') 
            ? `https://storage.example.com/thumbnails/${file.name}`
            : undefined,
          metadata: {
            uploadedBy: 'user-123',
            uploadedAt: new Date().toISOString(),
            processed: false
          }
        }
        
        // Update statistics
        setChatState(prev => ({
          ...prev,
          statistics: {
            ...prev.statistics,
            filesUploaded: prev.statistics.filesUploaded + 1
          }
        }))
        
        console.log(`✅ File uploaded successfully: ${file.name}`)
        
        return {
          success: true,
          file: {
            id: mockUploadResponse.id,
            name: file.name,
            size: file.size,
            type: file.type,
            isImage: file.type.startsWith('image/'),
            uploadedAt: new Date().toISOString(),
            url: mockUploadResponse.url
          }
        }
      } catch (error) {
        console.error('❌ Upload failed:', error)
        return {
          success: false,
          error: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      }
    },
    
    onRemove: async (fileId: string) => {
      try {
        console.log(`🗑️ Removing file: ${fileId}`)
        
        // Simulate API call to remove file
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Simulate removal from cloud storage
        const response = await fetch(`/api/files/${fileId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer token-123',
            'Content-Type': 'application/json'
          }
        }).catch(() => ({ ok: true })) // Mock success for demo
        
        console.log(`✅ File removed successfully: ${fileId}`)
        
        return { success: true }
      } catch (error) {
        console.error('❌ File removal failed:', error)
        return {
          success: false,
          error: `Removal failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      }
    }
  }

  // Main message handler with comprehensive processing
  const handleMessage: ChatInputProps['onSendMessage'] = useCallback(async (
    message: string,
    files?: UploadedFile[],
    tools?: Tool[],
    businessFunction?: BusinessFunction
  ) => {
    console.log('=== NEW MESSAGE RECEIVED ===')
    console.log('📝 Content:', message)
    console.log('📁 Files:', files?.length || 0)
    console.log('🔧 Tools:', tools?.map(t => t.name) || [])
    console.log('🏢 Business Function:', businessFunction?.name || 'None')
    console.log('🔍 Deep Research:', isDeepResearch)
    
    // Create message context
    const messageContext: MessageContext = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      content: message,
      files: files || [],
      tools: tools || [],
      businessFunction,
      isDeepResearch,
      processingStatus: 'pending'
    }
    
    // Add message to state
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, messageContext],
      isProcessing: true,
      currentOperation: 'Processing message...',
      statistics: {
        ...prev.statistics,
        totalMessages: prev.statistics.totalMessages + 1,
        toolsUsed: prev.statistics.toolsUsed + (tools?.length || 0),
        businessFunctionsUsed: prev.statistics.businessFunctionsUsed + (businessFunction ? 1 : 0),
        deepResearchQueries: prev.statistics.deepResearchQueries + (isDeepResearch ? 1 : 0)
      }
    }))
    
    // Process message with context
    await processMessageWithContext(messageContext)
  }, [isDeepResearch])

  // Process message with full context
  const processMessageWithContext = async (context: MessageContext) => {
    try {
      // Create abort controller for this operation
      processingRef.current = new AbortController()
      
      // Update message status
      updateMessageStatus(context.id, 'processing')
      
      if (context.isDeepResearch) {
        await performDeepResearchAnalysis(context)
      } else if (context.businessFunction) {
        await processBusinessFunctionContext(context)
      } else if (context.tools.length > 0) {
        await processToolsContext(context)
      } else if (context.files.length > 0) {
        await processFilesContext(context)
      } else {
        await processRegularMessage(context)
      }
      
      // Mark as completed
      updateMessageStatus(context.id, 'completed')
      
    } catch (error) {
      console.error('❌ Message processing failed:', error)
      updateMessageStatus(context.id, 'error', error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setChatState(prev => ({
        ...prev,
        isProcessing: false,
        currentOperation: ''
      }))
      processingRef.current = null
    }
  }

  // Deep research analysis
  const performDeepResearchAnalysis = async (context: MessageContext) => {
    console.log('🔍 Starting deep research analysis...')
    
    const researchSteps = [
      'Analyzing query intent and scope',
      'Identifying key research areas',
      'Gathering relevant information sources',
      'Processing and analyzing data',
      'Cross-referencing information',
      'Generating comprehensive insights',
      'Compiling research report'
    ]
    
    for (let i = 0; i < researchSteps.length; i++) {
      const step = researchSteps[i]
      console.log(`📋 Research step ${i + 1}/${researchSteps.length}: ${step}`)
      
      setChatState(prev => ({
        ...prev,
        currentOperation: `Deep Research: ${step}...`
      }))
      
      // Simulate research step processing
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
      
      // Use context for enhanced research
      if (context.files.length > 0) {
        console.log(`   📄 Analyzing ${context.files.length} uploaded files`)
        await analyzeFilesForResearch(context.files)
      }
      
      if (context.tools.length > 0) {
        console.log(`   🔧 Using tools: ${context.tools.map(t => t.name).join(', ')}`)
        await executeResearchTools(context.tools, context.content)
      }
      
      if (context.businessFunction) {
        console.log(`   🏢 Applying ${context.businessFunction.name} context`)
        await applyBusinessContextToResearch(context.businessFunction, context.content)
      }
    }
    
    console.log('✅ Deep research analysis completed')
    
    // Generate research results
    const researchResults = {
      summary: `Comprehensive research analysis completed for: "${context.content}"`,
      keyFindings: [
        'Finding 1: Relevant market trends identified',
        'Finding 2: Key performance indicators analyzed',
        'Finding 3: Competitive landscape assessed'
      ],
      recommendations: [
        'Recommendation 1: Focus on emerging opportunities',
        'Recommendation 2: Optimize current processes',
        'Recommendation 3: Implement strategic improvements'
      ],
      sources: context.files.map(f => f.name),
      toolsUsed: context.tools.map(t => t.name),
      businessContext: context.businessFunction?.name
    }
    
    updateMessageResults(context.id, researchResults)
  }

  // Business function processing
  const processBusinessFunctionContext = async (context: MessageContext) => {
    const func = context.businessFunction!
    console.log(`🏢 Processing with ${func.name} context`)
    
    setChatState(prev => ({
      ...prev,
      currentOperation: `Processing ${func.name} request...`
    }))
    
    // Route to specific business function handler
    let results: any
    
    switch (func.id) {
      case 'sales-analysis':
        results = await processSalesAnalysis(context)
        break
      case 'customer-support':
        results = await processCustomerSupport(context)
        break
      case 'marketing-campaign':
        results = await processMarketingCampaign(context)
        break
      case 'financial-reporting':
        results = await processFinancialReporting(context)
        break
      case 'hr-management':
        results = await processHRManagement(context)
        break
      case 'inventory-management':
        results = await processInventoryManagement(context)
        break
      default:
        results = await processGenericBusinessFunction(context)
    }
    
    updateMessageResults(context.id, results)
  }

  // Tools processing
  const processToolsContext = async (context: MessageContext) => {
    console.log(`🔧 Processing with tools: ${context.tools.map(t => t.name).join(', ')}`)
    
    const toolResults = []
    
    for (const tool of context.tools) {
      console.log(`⚙️ Executing tool: ${tool.name}`)
      
      setChatState(prev => ({
        ...prev,
        currentOperation: `Executing ${tool.name}...`
      }))
      
      try {
        const result = await executeToolLogic(tool, context.content, context.files)
        toolResults.push({
          tool: tool.name,
          success: true,
          result
        })
      } catch (error) {
        toolResults.push({
          tool: tool.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }
    
    updateMessageResults(context.id, { toolResults })
  }

  // Files processing
  const processFilesContext = async (context: MessageContext) => {
    console.log(`📁 Processing ${context.files.length} files`)
    
    const fileResults = []
    
    for (const file of context.files) {
      console.log(`📄 Processing file: ${file.name}`)
      
      setChatState(prev => ({
        ...prev,
        currentOperation: `Processing ${file.name}...`
      }))
      
      try {
        const result = await processFileContent(file, context.content)
        fileResults.push({
          file: file.name,
          success: true,
          result
        })
      } catch (error) {
        fileResults.push({
          file: file.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }
    
    updateMessageResults(context.id, { fileResults })
  }

  // Regular message processing
  const processRegularMessage = async (context: MessageContext) => {
    console.log('💬 Processing regular message')
    
    setChatState(prev => ({
      ...prev,
      currentOperation: 'Processing message...'
    }))
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const results = {
      type: 'regular',
      processed: true,
      response: `Processed message: "${context.content}"`
    }
    
    updateMessageResults(context.id, results)
  }

  // Helper functions for specific business functions
  const processSalesAnalysis = async (context: MessageContext) => {
    console.log('📈 Processing sales analysis')
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return {
      type: 'sales-analysis',
      metrics: {
        revenue: '$125,000',
        growth: '+15%',
        conversions: '8.5%'
      },
      insights: [
        'Q4 showing strong performance',
        'Mobile sales increasing',
        'Customer retention improved'
      ]
    }
  }

  const processCustomerSupport = async (context: MessageContext) => {
    console.log('🎧 Processing customer support')
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return {
      type: 'customer-support',
      ticketStatus: 'processed',
      category: 'general-inquiry',
      priority: 'medium',
      suggestedActions: [
        'Send follow-up email',
        'Schedule callback',
        'Provide documentation'
      ]
    }
  }

  const processMarketingCampaign = async (context: MessageContext) => {
    console.log('📢 Processing marketing campaign')
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    return {
      type: 'marketing-campaign',
      campaign: {
        name: 'Q1 Product Launch',
        budget: '$50,000',
        channels: ['social', 'email', 'display'],
        timeline: '4 weeks'
      },
      projectedResults: {
        reach: '100,000 users',
        engagement: '5.2%',
        conversions: '2.8%'
      }
    }
  }

  const processFinancialReporting = async (context: MessageContext) => {
    console.log('💰 Processing financial reporting')
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return {
      type: 'financial-reporting',
      report: {
        period: 'Q4 2023',
        revenue: '$500,000',
        expenses: '$350,000',
        profit: '$150,000',
        margin: '30%'
      }
    }
  }

  const processHRManagement = async (context: MessageContext) => {
    console.log('👥 Processing HR management')
    await new Promise(resolve => setTimeout(resolve, 1800))
    
    return {
      type: 'hr-management',
      employee: {
        count: 45,
        newHires: 3,
        turnover: '5%',
        satisfaction: '4.2/5'
      }
    }
  }

  const processInventoryManagement = async (context: MessageContext) => {
    console.log('📦 Processing inventory management')
    await new Promise(resolve => setTimeout(resolve, 2200))
    
    return {
      type: 'inventory-management',
      inventory: {
        totalItems: 1250,
        lowStock: 15,
        outOfStock: 3,
        value: '$85,000'
      }
    }
  }

  const processGenericBusinessFunction = async (context: MessageContext) => {
    console.log('🏢 Processing generic business function')
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return {
      type: 'business-function',
      function: context.businessFunction?.name,
      processed: true
    }
  }

  // Tool execution logic
  const executeToolLogic = async (tool: Tool, message: string, files: UploadedFile[]) => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    switch (tool.id) {
      case 'web-search':
        return {
          query: message,
          results: [
            { title: 'Search Result 1', url: 'https://example.com/1' },
            { title: 'Search Result 2', url: 'https://example.com/2' }
          ]
        }
      case 'calculator':
        return {
          expression: message,
          result: 'Calculation completed'
        }
      case 'data-analyzer':
        return {
          filesAnalyzed: files.length,
          insights: ['Data trend 1', 'Data trend 2']
        }
      case 'document-processor':
        return {
          documentsProcessed: files.filter(f => !f.isImage).length,
          extractedText: 'Document content extracted'
        }
      case 'image-analyzer':
        return {
          imagesAnalyzed: files.filter(f => f.isImage).length,
          description: 'Image analysis completed'
        }
      case 'translator':
        return {
          originalText: message,
          translatedText: 'Translated text result'
        }
      default:
        return { processed: true }
    }
  }

  // File processing
  const processFileContent = async (file: UploadedFile, context: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (file.isImage) {
      return {
        type: 'image',
        analysis: 'Image processed successfully',
        metadata: {
          dimensions: '1920x1080',
          format: file.type,
          size: file.size
        }
      }
    } else {
      return {
        type: 'document',
        extracted: 'Content extracted successfully',
        wordCount: Math.floor(Math.random() * 1000) + 100
      }
    }
  }

  // Helper functions for research
  const analyzeFilesForResearch = async (files: UploadedFile[]) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log(`   📊 Analyzed ${files.length} files for research context`)
  }

  const executeResearchTools = async (tools: Tool[], query: string) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    console.log(`   🔍 Executed ${tools.length} research tools`)
  }

  const applyBusinessContextToResearch = async (businessFunction: BusinessFunction, query: string) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    console.log(`   🏢 Applied ${businessFunction.name} business context`)
  }

  // State management helpers
  const updateMessageStatus = (messageId: string, status: MessageContext['processingStatus'], error?: string) => {
    setChatState(prev => ({
      ...prev,
      messages: prev.messages.map(msg =>
        msg.id === messageId
          ? { ...msg, processingStatus: status, error }
          : msg
      )
    }))
  }

  const updateMessageResults = (messageId: string, results: any) => {
    setChatState(prev => ({
      ...prev,
      messages: prev.messages.map(msg =>
        msg.id === messageId
          ? { ...msg, results }
          : msg
      )
    }))
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (processingRef.current) {
        processingRef.current.abort()
      }
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Complete Chat Integration Demo
        </h1>
        <p className="text-gray-600">
          Demonstrates all ChatInput features: file uploads, tools, business functions, and deep research
        </p>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {chatState.statistics.totalMessages}
          </div>
          <div className="text-sm text-gray-600">Total Messages</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {chatState.statistics.filesUploaded}
          </div>
          <div className="text-sm text-gray-600">Files Uploaded</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">
            {chatState.statistics.toolsUsed}
          </div>
          <div className="text-sm text-gray-600">Tools Used</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-orange-600">
            {chatState.statistics.businessFunctionsUsed}
          </div>
          <div className="text-sm text-gray-600">Business Functions</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600">
            {chatState.statistics.deepResearchQueries}
          </div>
          <div className="text-sm text-gray-600">Deep Research</div>
        </div>
      </div>

      {/* Current Processing Status */}
      {chatState.isProcessing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-blue-800 font-medium">Processing...</span>
          </div>
          <div className="text-blue-600 text-sm mt-1">
            {chatState.currentOperation}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Chat Interface</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Use <code>@</code> to select business functions</p>
            <p>• Use <code>/</code> to select tools</p>
            <p>• Upload files by clicking the attachment button or drag & drop</p>
            <p>• Enable Deep Research for comprehensive analysis</p>
          </div>
        </div>

        <ChatInput
          onSendMessage={handleMessage}
          
          // Deep research configuration
          isDeepResearch={isDeepResearch}
          onDeepResearchChange={setIsDeepResearch}
          showDeepResearch={true}
          deepResearchLabel="Deep Research"
          deepResearchIcon={<span>🔍</span>}
          
          // Tools configuration
          tools={tools}
          showTools={true}
          enableSlashTools={true}
          toolsLabel="Tools"
          toolsIcon={<span>🔧</span>}
          
          // Business functions configuration
          businessFunctions={businessFunctions}
          
          // File upload configuration
          fileUploadHandlers={fileUploadHandlers}
          showAttachment={true}
          maxFiles={10}
          maxFileSize={50 * 1024 * 1024} // 50MB
          allowedFileTypes={[
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/webp',
            'text/plain',
            'text/csv',
            'application/json'
          ]}
          attachmentTooltip="Upload files (PDF, Word, Images, Text)"
          
          // UI configuration
          placeholder={
            isDeepResearch 
              ? "🔍 Enter your research topic for comprehensive analysis..."
              : "💬 Type your message, use @ for business functions, / for tools..."
          }
          disabled={chatState.isProcessing}
        />
      </div>

      {/* Message History */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Message History</h2>
        {chatState.messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet. Start by typing a message above!</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {chatState.messages.map((message) => (
              <div key={message.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      message.processingStatus === 'completed' ? 'bg-green-100 text-green-800' :
                      message.processingStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
                      message.processingStatus === 'error' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {message.processingStatus}
                    </span>
                  </div>
                  {message.isDeepResearch && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                      🔍 Deep Research
                    </span>
                  )}
                </div>
                
                <div className="font-medium mb-2">{message.content}</div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {message.files.map((file) => (
                    <span key={file.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      📎 {file.name}
                    </span>
                  ))}
                  {message.tools.map((tool) => (
                    <span key={tool.id} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      🔧 {tool.name}
                    </span>
                  ))}
                  {message.businessFunction && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      🏢 {message.businessFunction.name}
                    </span>
                  )}
                </div>
                
                {message.results && (
                  <div className="bg-gray-50 p-3 rounded mt-3">
                    <div className="text-sm font-medium mb-1">Results:</div>
                    <pre className="text-xs text-gray-600 overflow-x-auto">
                      {JSON.stringify(message.results, null, 2)}
                    </pre>
                  </div>
                )}
                
                {message.error && (
                  <div className="bg-red-50 border border-red-200 p-3 rounded mt-3">
                    <div className="text-sm font-medium text-red-800 mb-1">Error:</div>
                    <div className="text-xs text-red-600">{message.error}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CompleteChatIntegration
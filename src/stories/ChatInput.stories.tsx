import type { Meta, StoryObj } from '@storybook/react'
import React, { useState, useCallback } from 'react'
import { ChatInput, type FileUploadHandlers, type UploadedFile, type Tool, type BusinessFunction } from '../components/conversation/ChatInput'
import { Toaster } from '../components/ui/Toaster'
import { Brain, Zap, Upload, Database, Code, TrendingUp, Calculator, Shield, Search } from 'lucide-react'

const meta: Meta<typeof ChatInput> = {
  title: 'Conversation/ChatInput',
  component: ChatInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
  argTypes: {
    onSendMessage: { action: 'message sent' },
    onDeepResearchChange: { action: 'deep research toggled' },
    fileUploadHandlers: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleTools: Tool[] = [
  { 
    id: 'web-search', 
    name: 'Web Search', 
    description: 'Search the web for current information',
    icon: '🔍'
  },
  { 
    id: 'database-query', 
    name: 'Database Query', 
    description: 'Query internal databases for specific data',
    icon: '🗄️'
  },
  { 
    id: 'code-analysis', 
    name: 'Code Analysis', 
    description: 'Analyze and review code repositories',
    icon: '💻'
  },
  { 
    id: 'calculator', 
    name: 'Calculator', 
    description: 'Perform mathematical calculations',
    icon: '🧮'
  },
  { 
    id: 'translator', 
    name: 'Translator', 
    description: 'Translate text between languages',
    icon: '🌐'
  },
]

const sampleBusinessFunctions: BusinessFunction[] = [
  {
    id: 'market-analysis',
    name: 'Market Analysis',
    description: 'Analyze market trends and opportunities',
    icon: '📈',
    topic: 'Analysis'
  },
  {
    id: 'financial-modeling',
    name: 'Financial Modeling',
    description: 'Create financial models and forecasts',
    icon: '💰',
    topic: 'Finance'
  },
  {
    id: 'risk-assessment',
    name: 'Risk Assessment',
    description: 'Evaluate potential risks and mitigation strategies',
    icon: '🛡️',
    topic: 'Analysis'
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Handle customer inquiries and support requests',
    icon: '🎧',
    topic: 'Support'
  },
  {
    id: 'sales-optimization',
    name: 'Sales Optimization',
    description: 'Optimize sales processes and strategies',
    icon: '🚀',
    topic: 'Sales'
  },
  {
    id: 'inventory-management',
    name: 'Inventory Management',
    description: 'Track and manage inventory levels',
    icon: '📦',
    topic: 'Operations'
  },
]

// Mock file upload handlers for demo
const createMockFileUploadHandlers = (): FileUploadHandlers => ({
  onUpload: async (file: File) => {
    console.log('📤 Uploading file:', file.name)
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    // Simulate occasional upload failure
    if (Math.random() < 0.1) {
      return {
        success: false,
        error: 'Upload failed - network error'
      }
    }
    
    return {
      success: true,
      file: {
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        isImage: file.type.startsWith('image/'),
        uploadedAt: new Date().toISOString(),
        url: `https://example.com/files/${file.name}`,
      }
    }
  },
  
  onRemove: async (fileId: string) => {
    console.log('🗑️ Removing file:', fileId)
    
    // Simulate removal delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return { success: true }
  }
})

// Create message handler for stories
const createMessageHandler = (storyName: string) => {
  return (message: string, files?: UploadedFile[], tools?: Tool[], businessFunction?: BusinessFunction, isDeepResearch?: boolean) => {
    console.log(`📨 [${storyName}] Message received:`, {
      message,
      files: files?.map(f => ({ name: f.name, size: f.size, url: f.url })),
      tools: tools?.map(t => ({ name: t.name, description: t.description })),
      businessFunction: businessFunction ? { name: businessFunction.name, topic: businessFunction.topic } : undefined,
      isDeepResearch
    })
  }
}

// Basic Example

export const Simple: Story = {
  args: {
    placeholder: "Type your message...",
    disabled: false,
    showAttachment: false,
    showVoice: false,
    showTools: false,
    showDeepResearch: false,
    onSendMessage: createMessageHandler('Simple'),
  },
}

// onSendMessage Function Signature Example

export const OnSendMessageSignature: Story = {
  name: 'onSendMessage Function Signature',
  parameters: {
    docs: {
      description: {
        story: `
## onSendMessage Function Signature

The \`onSendMessage\` prop receives all context from the ChatInput component:

\`\`\`typescript
// Function signature
onSendMessage: (
  message: string,                    // User's text input
  files?: UploadedFile[],            // Uploaded files with URLs ready to use
  tools?: Tool[],                    // Selected tools array
  businessFunction?: BusinessFunction, // Selected business function
  isDeepResearch?: boolean           // Deep research mode flag
) => void

// Example implementation
const handleMessage = (message, files, tools, businessFunction, isDeepResearch) => {
  console.log('Message:', message)
  console.log('Files:', files)          // Array of files with URLs
  console.log('Tools:', tools)          // Array of selected tools
  console.log('Business Function:', businessFunction)  // Single selected function
  console.log('Deep Research Mode:', isDeepResearch)   // Boolean flag
  
  // Your processing logic here...
}

// Usage
<ChatInput 
  onSendMessage={handleMessage}
  // ... other props
/>
\`\`\`

**File Structure:**
\`\`\`typescript
interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  isImage?: boolean
  uploadedAt: string
  url?: string           // Ready-to-use URL
}

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
\`\`\`
        `,
      },
    },
  },
  render: (args) => {
    const [isDeepResearch, setIsDeepResearch] = useState(false)
    
    const handleMessage = useCallback((
      message: string,
      files?: UploadedFile[],
      tools?: Tool[],
      businessFunction?: BusinessFunction,
      isDeepResearch?: boolean
    ) => {
      console.log('📋 onSendMessage Function Called:')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('1. MESSAGE CONTENT (string):', message)
      console.log('2. FILES (UploadedFile[]):', files)
      console.log('3. TOOLS (Tool[]):', tools)
      console.log('4. BUSINESS FUNCTION (BusinessFunction):', businessFunction)
      console.log('5. DEEP RESEARCH MODE (boolean):', isDeepResearch)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      
      // Show parameter details
      if (files?.length) {
        console.log('📁 FILE DETAILS:')
        files.forEach((file, index) => {
          console.log(`  ${index + 1}. ${file.name}`)
          console.log(`     URL: ${file.url}`)
          console.log(`     Type: ${file.type}`)
          console.log(`     Size: ${file.size} bytes`)
        })
      }
      
      if (tools?.length) {
        console.log('🔧 TOOL DETAILS:')
        tools.forEach((tool, index) => {
          console.log(`  ${index + 1}. ${tool.name}: ${tool.description}`)
        })
      }
      
      if (businessFunction) {
        console.log('🏢 BUSINESS FUNCTION DETAILS:')
        console.log(`  Name: ${businessFunction.name}`)
        console.log(`  Topic: ${businessFunction.topic}`)
        console.log(`  Description: ${businessFunction.description}`)
      }
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    }, [])
    
    return (
      <ChatInput
        {...args}
        onSendMessage={handleMessage}
        isDeepResearch={isDeepResearch}
        onDeepResearchChange={setIsDeepResearch}
      />
    )
  },
  args: {
    placeholder: "Type a message, upload files, use /web or @market, toggle Deep Research - check console!",
    disabled: false,
    showAttachment: true,
    showVoice: false,
    showTools: true,
    showDeepResearch: true,
    tools: sampleTools,
    businessFunctions: sampleBusinessFunctions,
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    toolsIcon: <Zap className="w-4 h-4" />,
    toolsLabel: 'AI Tools',
    deepResearchIcon: <Brain className="w-4 h-4" />,
    deepResearchLabel: 'Deep Research',
  },
}

// Complete onSendMessage Handler Example - Shows all parameters

export const CompleteOnSendHandler: Story = {
  name: 'Complete onSendMessage Handler',
  parameters: {
    docs: {
      description: {
        story: `
## Complete onSendMessage Handler Implementation

This story shows how to implement the complete onSendMessage handler with access to all parameters:

\`\`\`typescript
const handleMessage = async (
  message: string,              // User's text input
  files?: UploadedFile[],      // Uploaded files with URLs
  tools?: Tool[],              // Selected tools
  businessFunction?: BusinessFunction, // Selected business function
  isDeepResearch?: boolean     // Deep research mode flag
) => {
  // isDeepResearch is now passed as a parameter!
  
  // Process based on context
  if (isDeepResearch) {
    // Deep research processing
    const queryAnalysis = await analyzeQueryIntent(message)
    
    // Process files
    if (files?.length) {
      for (const file of files) {
        if (file.isImage) {
          const imageAnalysis = await analyzeImage(file.url)
        } else if (file.type.includes('pdf')) {
          const pdfText = await extractPDFText(file.url)
        }
      }
    }
    
    // Execute tools
    if (tools?.length) {
      for (const tool of tools) {
        switch (tool.id) {
          case 'web-search':
            const searchResults = await performWebSearch(message)
            break
          case 'calculator':
            const calcResults = await performCalculation(message)
            break
        }
      }
    }
    
    // Apply business context
    if (businessFunction) {
      const businessContext = await applyBusinessContext(
        businessFunction.id, message, fileContext, toolResults
      )
    }
    
    // Generate research report
    const researchReport = await generateResearchReport({
      query: message,
      fileContext,
      toolResults,
      businessContext,
      isDeepResearch: true
    })
    
    // Send to AI service
    await sendToAIService({
      type: 'deep-research',
      message,
      files,
      tools,
      businessFunction,
      report: researchReport
    })
  } else if (businessFunction) {
    // Business function processing
    switch (businessFunction.id) {
      case 'market-analysis':
        const marketData = await processMarketAnalysis(message, files)
        await sendToAIService({ type: 'market-analysis', message, files, data: marketData })
        break
    }
  } else if (tools?.length) {
    // Tool execution
    const toolResults = []
    for (const tool of tools) {
      switch (tool.id) {
        case 'web-search':
          const searchResults = await performWebSearch(message)
          toolResults.push({ tool: tool.name, results: searchResults })
          break
      }
    }
    await sendToAIService({ type: 'tool-enhanced', message, files, toolResults })
  } else if (files?.length) {
    // File processing
    const processedFiles = []
    for (const file of files) {
      if (file.isImage) {
        const imageAnalysis = await analyzeImage(file.url)
        processedFiles.push({ file: file.name, type: 'image', analysis: imageAnalysis })
      }
    }
    await sendToAIService({ type: 'file-processing', message, files, processedFiles })
  } else {
    // Regular message
    await sendToAIService({ type: 'chat', message })
  }
}
\`\`\`

**Try the demo**: Upload files, use /web or @market, toggle Deep Research and check the console for detailed execution logs.
        `,
      },
    },
  },
  render: (args) => {
    const [isDeepResearch, setIsDeepResearch] = useState(false)
    
    const fileUploadHandlers = useCallback(() => createMockFileUploadHandlers(), [])()
    
    const handleMessage = useCallback(async (
      message: string,
      files?: UploadedFile[],
      tools?: Tool[],
      businessFunction?: BusinessFunction,
      isDeepResearch?: boolean
    ) => {
      console.log('🚀 Complete onSendMessage Handler Called:')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      
      // 1. MESSAGE CONTENT
      console.log('📝 Message Content:', message)
      
      // 2. FILES (with URLs ready for use)
      if (files?.length) {
        console.log('📁 Files:', files.length)
        files.forEach((file, index) => {
          console.log(`   ${index + 1}. ${file.name} (${(file.size / 1024).toFixed(1)}KB)`)
          console.log(`      URL: ${file.url}`)
          console.log(`      Type: ${file.type}`)
          console.log(`      Uploaded: ${new Date(file.uploadedAt).toLocaleString()}`)
        })
      } else {
        console.log('📁 Files: None')
      }
      
      // 3. TOOLS (selected by user)
      if (tools?.length) {
        console.log('🔧 Tools:', tools.length)
        tools.forEach((tool, index) => {
          console.log(`   ${index + 1}. ${tool.name}: ${tool.description}`)
        })
      } else {
        console.log('🔧 Tools: None')
      }
      
      // 4. BUSINESS FUNCTION (selected by user)
      if (businessFunction) {
        console.log('🏢 Business Function:', businessFunction.name)
        console.log(`   Topic: ${businessFunction.topic}`)
        console.log(`   Description: ${businessFunction.description}`)
      } else {
        console.log('🏢 Business Function: None')
      }
      
      // 5. DEEP RESEARCH MODE (passed as parameter)
      console.log('🔍 Deep Research Mode:', isDeepResearch)
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      
      // ACTUAL IMPLEMENTATION EXAMPLES
      
      try {
        if (isDeepResearch) {
          console.log('🧠 DEEP RESEARCH IMPLEMENTATION:')
          
          // Step 1: Analyze query intent
          const queryAnalysis = await analyzeQueryIntent(message)
          console.log('   ✅ Query analysis complete:', queryAnalysis)
          
          // Step 2: Process uploaded files for research context
          let fileContext = ''
          if (files?.length) {
            console.log('   📄 Processing files for research context...')
            for (const file of files) {
              if (file.isImage) {
                // Process image files
                const imageAnalysis = await analyzeImage(file.url)
                fileContext += `Image ${file.name}: ${imageAnalysis}\n`
              } else if (file.type.includes('pdf')) {
                // Process PDF files
                const pdfText = await extractPDFText(file.url)
                fileContext += `PDF ${file.name}: ${pdfText}\n`
              } else {
                // Process other documents
                const docText = await processDocument(file.url)
                fileContext += `Document ${file.name}: ${docText}\n`
              }
            }
            console.log('   ✅ File processing complete')
          }
          
          // Step 3: Execute tools for research
          let toolResults = ''
          if (tools?.length) {
            console.log('   🔧 Executing research tools...')
            for (const tool of tools) {
              switch (tool.id) {
                case 'web-search':
                  const searchResults = await performWebSearch(message)
                  toolResults += `Web Search: ${searchResults}\n`
                  break
                case 'database-query':
                  const dbResults = await queryDatabase(message)
                  toolResults += `Database: ${dbResults}\n`
                  break
                case 'calculator':
                  const calcResults = await performCalculation(message)
                  toolResults += `Calculation: ${calcResults}\n`
                  break
              }
            }
            console.log('   ✅ Tool execution complete')
          }
          
          // Step 4: Apply business function context
          let businessContext = ''
          if (businessFunction) {
            console.log(`   🏢 Applying ${businessFunction.name} business context...`)
            businessContext = await applyBusinessContext(
              businessFunction.id,
              message,
              fileContext,
              toolResults
            )
            console.log('   ✅ Business context applied')
          }
          
          // Step 5: Generate comprehensive research report
          console.log('   📊 Generating comprehensive research report...')
          const researchReport = await generateResearchReport({
            query: message,
            fileContext,
            toolResults,
            businessContext,
            isDeepResearch: true
          })
          
          console.log('   ✅ DEEP RESEARCH COMPLETE')
          console.log('   📋 Research Report:', researchReport)
          
          // Send to AI service for final processing
          await sendToAIService({
            type: 'deep-research',
            message,
            files,
            tools,
            businessFunction,
            report: researchReport
          })
          
        } else if (businessFunction) {
          console.log('🏢 BUSINESS FUNCTION IMPLEMENTATION:')
          
          // Route to specific business function handler
          switch (businessFunction.id) {
            case 'market-analysis':
              console.log('   📈 Processing market analysis...')
              const marketData = await processMarketAnalysis(message, files)
              await sendToAIService({
                type: 'market-analysis',
                message,
                files,
                data: marketData
              })
              break
              
            case 'financial-modeling':
              console.log('   💰 Creating financial models...')
              const financialModel = await createFinancialModel(message, files)
              await sendToAIService({
                type: 'financial-modeling',
                message,
                files,
                model: financialModel
              })
              break
              
            case 'customer-support':
              console.log('   🎧 Handling customer support...')
              const supportTicket = await createSupportTicket(message, files)
              await sendToAIService({
                type: 'customer-support',
                message,
                files,
                ticket: supportTicket
              })
              break
              
            default:
              console.log(`   Processing ${businessFunction.name}...`)
              await sendToAIService({
                type: 'business-function',
                message,
                files,
                businessFunction
              })
          }
          
        } else if (tools?.length) {
          console.log('🔧 TOOL EXECUTION IMPLEMENTATION:')
          
          const toolResults = []
          
          // Execute each selected tool
          for (const tool of tools) {
            console.log(`   ⚙️ Executing ${tool.name}...`)
            
            switch (tool.id) {
              case 'web-search':
                const searchResults = await performWebSearch(message)
                toolResults.push({
                  tool: tool.name,
                  results: searchResults
                })
                break
                
              case 'calculator':
                const calcResults = await performCalculation(message)
                toolResults.push({
                  tool: tool.name,
                  results: calcResults
                })
                break
                
              case 'translator':
                const translation = await translateText(message)
                toolResults.push({
                  tool: tool.name,
                  results: translation
                })
                break
                
              case 'database-query':
                const dbResults = await queryDatabase(message)
                toolResults.push({
                  tool: tool.name,
                  results: dbResults
                })
                break
                
              case 'code-analysis':
                const codeAnalysis = await analyzeCode(message, files)
                toolResults.push({
                  tool: tool.name,
                  results: codeAnalysis
                })
                break
            }
          }
          
          console.log('   ✅ All tools executed')
          
          // Send to AI service with tool results
          await sendToAIService({
            type: 'tool-enhanced',
            message,
            files,
            toolResults
          })
          
        } else if (files?.length) {
          console.log('📁 FILE PROCESSING IMPLEMENTATION:')
          
          const processedFiles = []
          
          // Process each uploaded file
          for (const file of files) {
            console.log(`   📄 Processing ${file.name}...`)
            
            if (file.isImage) {
              // Process image files
              const imageAnalysis = await analyzeImage(file.url)
              processedFiles.push({
                file: file.name,
                type: 'image',
                analysis: imageAnalysis
              })
            } else if (file.type.includes('pdf')) {
              // Extract text from PDF
              const pdfText = await extractPDFText(file.url)
              processedFiles.push({
                file: file.name,
                type: 'pdf',
                content: pdfText
              })
            } else if (file.type.includes('csv')) {
              // Process CSV data
              const csvData = await processCSV(file.url)
              processedFiles.push({
                file: file.name,
                type: 'csv',
                data: csvData
              })
            } else {
              // Process other documents
              const docContent = await processDocument(file.url)
              processedFiles.push({
                file: file.name,
                type: 'document',
                content: docContent
              })
            }
          }
          
          console.log('   ✅ All files processed')
          
          // Send to AI service with processed files
          await sendToAIService({
            type: 'file-processing',
            message,
            files,
            processedFiles
          })
          
        } else {
          console.log('💬 REGULAR MESSAGE IMPLEMENTATION:')
          
          // Send regular message to AI service
          await sendToAIService({
            type: 'chat',
            message
          })
        }
        
        console.log('✅ Message processing complete')
        
      } catch (error) {
        console.error('❌ Error processing message:', error)
        // Handle error appropriately
        showErrorToUser('Failed to process message. Please try again.')
      }
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    }, [])
    
    // Helper functions that would be implemented in your app
    const analyzeQueryIntent = async (query: string) => {
      // Simulate API call to analyze query intent
      await new Promise(resolve => setTimeout(resolve, 500))
      return `Intent: ${query.includes('analyze') ? 'analysis' : 'general'}`
    }
    
    const analyzeImage = async (imageUrl: string) => {
      // Simulate image analysis API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      return 'Image contains charts and data visualizations'
    }
    
    const extractPDFText = async (pdfUrl: string) => {
      // Simulate PDF text extraction
      await new Promise(resolve => setTimeout(resolve, 1500))
      return 'Extracted text from PDF document...'
    }
    
    const processDocument = async (docUrl: string) => {
      // Simulate document processing
      await new Promise(resolve => setTimeout(resolve, 800))
      return 'Processed document content...'
    }
    
    const performWebSearch = async (query: string) => {
      // Simulate web search API call
      await new Promise(resolve => setTimeout(resolve, 1200))
      return `Search results for: ${query}`
    }
    
    const queryDatabase = async (query: string) => {
      // Simulate database query
      await new Promise(resolve => setTimeout(resolve, 600))
      return `Database results for: ${query}`
    }
    
    const performCalculation = async (expression: string) => {
      // Simulate calculation
      await new Promise(resolve => setTimeout(resolve, 300))
      return `Calculation result: ${expression}`
    }
    
    const translateText = async (text: string) => {
      // Simulate translation API call
      await new Promise(resolve => setTimeout(resolve, 800))
      return `Translated: ${text}`
    }
    
    const analyzeCode = async (message: string, files?: UploadedFile[]) => {
      // Simulate code analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      return 'Code analysis complete'
    }
    
    const processCSV = async (csvUrl: string) => {
      // Simulate CSV processing
      await new Promise(resolve => setTimeout(resolve, 1000))
      return 'CSV data processed'
    }
    
    const processMarketAnalysis = async (message: string, files?: UploadedFile[]) => {
      // Simulate market analysis processing
      await new Promise(resolve => setTimeout(resolve, 1500))
      return 'Market analysis data processed'
    }
    
    const createFinancialModel = async (message: string, files?: UploadedFile[]) => {
      // Simulate financial modeling
      await new Promise(resolve => setTimeout(resolve, 2000))
      return 'Financial model created'
    }
    
    const createSupportTicket = async (message: string, files?: UploadedFile[]) => {
      // Simulate support ticket creation
      await new Promise(resolve => setTimeout(resolve, 800))
      return 'Support ticket created'
    }
    
    const applyBusinessContext = async (functionId: string, message: string, fileContext: string, toolResults: string) => {
      // Simulate applying business context
      await new Promise(resolve => setTimeout(resolve, 700))
      return `Business context applied for ${functionId}`
    }
    
    const generateResearchReport = async (data: any) => {
      // Simulate research report generation
      await new Promise(resolve => setTimeout(resolve, 1500))
      return 'Comprehensive research report generated'
    }
    
    const sendToAIService = async (data: any) => {
      // Simulate sending to AI service (OpenAI, Claude, etc.)
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('📤 Sent to AI service:', data.type)
      return 'AI response received'
    }
    
    const showErrorToUser = (message: string) => {
      // Show error to user
      console.error('User Error:', message)
    }
    
    return (
      <ChatInput
        {...args}
        onSendMessage={handleMessage}
        fileUploadHandlers={fileUploadHandlers}
        isDeepResearch={isDeepResearch}
        onDeepResearchChange={setIsDeepResearch}
      />
    )
  },
  args: {
    placeholder: "Try all features: upload files, use /web or @market, toggle Deep Research - check console!",
    disabled: false,
    showAttachment: true,
    showVoice: false,
    showTools: true,
    showDeepResearch: true,
    tools: sampleTools,
    businessFunctions: sampleBusinessFunctions,
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    toolsIcon: <Zap className="w-4 h-4" />,
    toolsLabel: 'AI Tools',
    deepResearchIcon: <Brain className="w-4 h-4" />,
    deepResearchLabel: 'Deep Research',
    // This will be overridden by the render function
    onSendMessage: () => {},
  },
}

// File Upload Handler Example

export const FileUploadHandlerExample: Story = {
  name: 'File Upload Handler',
  render: (args) => {
    const fileUploadHandlers: FileUploadHandlers = {
      onUpload: async (file: File) => {
        console.log('📤 Custom Upload Handler:')
        console.log('  File:', file.name, file.size, 'bytes')
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        return {
          success: true,
          file: {
            id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            size: file.size,
            type: file.type,
            isImage: file.type.startsWith('image/'),
            uploadedAt: new Date().toISOString(),
            url: `https://your-storage.com/files/${file.name}`,
          }
        }
      },
      
      onRemove: async (fileId: string) => {
        console.log('🗑️ Custom Remove Handler:', fileId)
        await new Promise(resolve => setTimeout(resolve, 500))
        return { success: true }
      }
    }
    
    const handleMessage = useCallback((message: string, files?: UploadedFile[]) => {
      console.log('📨 Message with files:', message, files?.length || 0)
      
      if (files?.length) {
        console.log('📁 Files ready for processing:')
        files.forEach(file => {
          console.log(`  • ${file.name} - ${file.url}`)
        })
      }
    }, [])
    
    return (
      <ChatInput
        {...args}
        onSendMessage={handleMessage}
        fileUploadHandlers={fileUploadHandlers}
      />
    )
  },
  args: {
    placeholder: "Upload files and send - check console for file handler...",
    disabled: false,
    showAttachment: true,
    showVoice: false,
    showTools: false,
    showDeepResearch: false,
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
}

export const AllFeatures: Story = {
  name: 'All Features Demo',
  render: (args) => {
    const [isDeepResearch, setIsDeepResearch] = useState(false)
    
    return (
      <ChatInput
        {...args}
        isDeepResearch={isDeepResearch}
        onDeepResearchChange={setIsDeepResearch}
      />
    )
  },
  args: {
    placeholder: "Try all features: upload files, use /web or @market, toggle Deep Research",
    disabled: false,
    showAttachment: true,
    showVoice: false,
    showTools: true,
    showDeepResearch: true,
    tools: sampleTools,
    businessFunctions: sampleBusinessFunctions,
    maxFiles: 5,
    toolsIcon: <Zap className="w-4 h-4" />,
    toolsLabel: 'AI Tools',
    deepResearchIcon: <Brain className="w-4 h-4" />,
    deepResearchLabel: 'Deep Research',
    onSendMessage: createMessageHandler('All Features'),
  },
}
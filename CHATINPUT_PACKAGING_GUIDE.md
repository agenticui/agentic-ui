# ChatInput Component Packaging Guide

This guide provides step-by-step instructions to package the ChatInput component for npm distribution in your agentic-ui library.

## Table of Contents

- [Pre-Packaging Checklist](#pre-packaging-checklist)
- [Component Analysis](#component-analysis)
- [Dependencies Audit](#dependencies-audit)
- [Packaging Steps](#packaging-steps)
- [Testing Checklist](#testing-checklist)
- [Distribution Checklist](#distribution-checklist)
- [Usage Documentation](#usage-documentation)
- [Troubleshooting](#troubleshooting)

## Pre-Packaging Checklist

### ✅ Current Status Check

- [x] **ChatInput component exists** - Located at `src/components/conversation/ChatInput.tsx`
- [x] **Component is exported** - Already included in `src/index.ts` exports
- [x] **Dependencies identified** - Uses UI components, utils, external libraries
- [x] **TypeScript definitions** - Component has proper TypeScript interfaces
- [x] **Build system configured** - Rollup configured for library building

### 🔍 Component Dependencies Analysis

**Internal Dependencies (agentic-ui):**
- `Button` - from `../ui/Button`
- `Badge` - from `../ui/Badge` 
- `cn` - from `../../lib/utils`

**External Dependencies:**
- `lucide-react` - Icons (17 different icons used)
- `sonner` - Toast notifications (`toast` function)
- `react` - Core React hooks and types

**Browser APIs Used:**
- File API (FileReader, File, etc.)
- Clipboard API (for paste functionality)
- Drag and Drop API

## Component Analysis

### Core Features
1. **Text Input** - Multi-line textarea with auto-resize
2. **File Upload** - Drag & drop, click to upload, paste support
3. **Tool Selection** - Slash command triggered tool menu
4. **Business Functions** - @ symbol triggered function menu  
5. **Voice Input** - Microphone button (placeholder)
6. **Deep Research** - Toggle mode for research tasks
7. **Real-time Validation** - File size, type, count limits
8. **Keyboard Navigation** - Full keyboard support for menus
9. **State Management** - Loading, uploading, streaming states
10. **Accessibility** - ARIA labels, keyboard navigation

### Interface Complexity
- **Props**: 25+ customizable properties
- **Internal State**: 15+ state variables
- **Event Handlers**: 10+ complex event handlers
- **File Size**: 945 lines of code
- **TypeScript**: Fully typed with 3 main interfaces

## Dependencies Audit

### ✅ Required Dependencies

```json
{
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0", 
    "lucide-react": "^0.525.0",
    "sonner": "^2.0.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

### 🔧 Internal Components to Include

These UI components are required by ChatInput:

1. **Button Component** (`src/components/ui/Button.tsx`)
2. **Badge Component** (`src/components/ui/Badge.tsx`) 
3. **Utils** (`src/lib/utils.ts`)

## Packaging Steps

### Step 1: Verify Current Exports ✅

The ChatInput is already properly exported in `src/index.ts`:

```typescript
// Conversation Components
export { ChatMessage, MessageList, ChatInput } from './components/conversation'
```

### Step 2: Build the Library

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Verify build output
ls -la dist/
```

Expected output in `dist/`:
- `index.js` - CommonJS build
- `index.esm.js` - ES modules build  
- `index.d.ts` - TypeScript definitions
- CSS files if included

### Step 3: Test the Build

```bash
# Test the built package locally
npm pack

# This creates agentic-ui-0.1.0.tgz
# Test in another project:
npm install ./agentic-ui-0.1.0.tgz
```

### Step 4: Update Package.json

Ensure your package.json has the correct fields:

```json
{
  "name": "agentic-ui",
  "version": "0.1.0",
  "description": "React components for building AI applications",
  "main": "dist/index.js",
  "module": "dist/index.esm.js", 
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "src"
  ],
  "keywords": [
    "react",
    "ai", 
    "components",
    "chat",
    "chatinput",
    "agent",
    "ui"
  ]
}
```

### Step 5: Create Usage Examples

Create example files in `examples/` directory:

```typescript
// examples/ChatInputBasic.tsx
import React from 'react'
import { ChatInput } from 'agentic-ui'
import 'agentic-ui/dist/styles.css' // If CSS is built separately

function BasicExample() {
  const handleSendMessage = (message: string, files?: any[], tools?: any[]) => {
    console.log('Message:', message)
    console.log('Files:', files)
    console.log('Tools:', tools)
  }

  return (
    <ChatInput
      onSendMessage={handleSendMessage}
      placeholder="Type your message..."
      showAttachment={true}
      showTools={true}
      maxFiles={5}
    />
  )
}
```

## Testing Checklist

### ✅ Manual Testing

#### Basic Functionality
- [ ] **Text Input** - Can type and send messages
- [ ] **Enter to Send** - Enter key sends message, Shift+Enter adds new line
- [ ] **Auto-resize** - Textarea grows/shrinks with content
- [ ] **Placeholder** - Shows appropriate placeholder text

#### File Upload
- [ ] **Click Upload** - Click attachment button opens file picker
- [ ] **Drag & Drop** - Can drag files onto component
- [ ] **Paste Files** - Can paste images from clipboard  
- [ ] **File Validation** - Rejects invalid file types/sizes
- [ ] **File Display** - Shows uploaded files with icons
- [ ] **File Removal** - Can remove uploaded files
- [ ] **File Limits** - Respects maxFiles limit

#### Tool Selection  
- [ ] **Slash Commands** - `/` triggers tools menu
- [ ] **Tool Search** - Can filter tools by typing
- [ ] **Tool Selection** - Can select/deselect tools
- [ ] **Keyboard Navigation** - Arrow keys navigate menu
- [ ] **Badge Display** - Selected tools show as badges

#### Business Functions
- [ ] **@ Trigger** - `@` triggers functions menu
- [ ] **Function Search** - Can filter by typing
- [ ] **Function Selection** - Can select functions
- [ ] **Function Grouping** - Functions grouped by topic

#### States & Modes
- [ ] **Loading States** - Shows loading indicators
- [ ] **Disabled State** - Component disables properly
- [ ] **Deep Research Mode** - Toggle works correctly
- [ ] **Streaming State** - Shows stop button when streaming

#### Accessibility
- [ ] **Keyboard Navigation** - Tab order is logical
- [ ] **Screen Reader** - ARIA labels present
- [ ] **Focus Management** - Focus moves correctly
- [ ] **High Contrast** - Works with system themes

### ✅ Integration Testing

Test ChatInput with a sample application:

```typescript
// Test with minimal setup
import { ChatInput } from 'agentic-ui'

const sampleTools = [
  { id: '1', name: 'Web Search', description: 'Search the web' },
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

function TestApp() {
  return (
    <ChatInput
      onSendMessage={(msg, files, tools, func) => console.log({msg, files, tools, func})}
      showAttachment={true}
      showTools={true}
      showDeepResearch={true}
      tools={sampleTools}
      businessFunctions={sampleFunctions}
    />
  )
}
```

### ✅ Bundle Analysis

```bash
# Analyze bundle size
npm install -g bundle-analyzer
bundle-analyzer dist/index.esm.js

# Check for common issues
npm audit
npm outdated
```

## Distribution Checklist

### Step 1: Pre-Publishing Checks

- [ ] **Version bump** - Update version in package.json
- [ ] **Build successful** - `npm run build` completes without errors
- [ ] **Tests pass** - All tests pass (if implemented)
- [ ] **Dependencies up to date** - No critical vulnerabilities
- [ ] **Documentation updated** - README reflects new features

### Step 2: NPM Publishing

```bash
# Login to npm (if not already)
npm login

# Publish to npm
npm publish

# For beta versions
npm publish --tag beta

# For scoped packages  
npm publish --access public
```

### Step 3: Post-Publishing

- [ ] **Verify on npmjs.com** - Package appears correctly
- [ ] **Test installation** - `npm install agentic-ui` works
- [ ] **Check bundle size** - Review at bundlephobia.com
- [ ] **Update documentation** - Add installation/usage docs

## Usage Documentation

### Installation

```bash
npm install agentic-ui
# or
yarn add agentic-ui
# or  
pnpm add agentic-ui
```

### Basic Usage

```typescript
import React from 'react'
import { ChatInput } from 'agentic-ui'

function MyApp() {
  const handleMessage = (message: string, files?: any[]) => {
    // Handle the message
    console.log('User message:', message)
    console.log('Attached files:', files)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ChatInput 
        onSendMessage={handleMessage}
        placeholder="Ask me anything..."
        showAttachment={true}
        maxFiles={5}
        maxFileSize={10 * 1024 * 1024} // 10MB
      />
    </div>
  )
}
```

### Advanced Usage

```typescript
import React, { useState } from 'react'
import { ChatInput } from 'agentic-ui'

function AdvancedChat() {
  const [isStreaming, setIsStreaming] = useState(false)
  
  const tools = [
    { id: 'search', name: 'Web Search', description: 'Search the internet' },
    { id: 'calc', name: 'Calculator', description: 'Perform calculations' }
  ]

  const functions = [
    { 
      id: 'analysis',
      name: 'Market Analysis', 
      description: 'Deep market research',
      topic: 'Research' 
    }
  ]

  const handleMessage = async (message, files, selectedTools, businessFunction) => {
    setIsStreaming(true)
    
    // Process message with AI
    await processMessage(message, files, selectedTools, businessFunction)
    
    setIsStreaming(false)
  }

  return (
    <ChatInput 
      onSendMessage={handleMessage}
      placeholder="What would you like to know?"
      showAttachment={true}
      showTools={true}
      showDeepResearch={true}
      showVoice={true}
      tools={tools}
      businessFunctions={functions}
      isStreaming={isStreaming}
      maxFiles={10}
      allowedFileTypes={['application/pdf', 'image/*', 'text/*']}
    />
  )
}
```

### Styling

The component uses Tailwind CSS classes. Include Tailwind in your project:

```css
/* Import Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Or import component styles if provided */
@import 'agentic-ui/dist/styles.css';
```

### Props Reference

```typescript
interface ChatInputProps {
  // Core functionality
  onSendMessage: (message: string, files?: UploadedFile[], tools?: Tool[], businessFunction?: BusinessFunction) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  maxLength?: number

  // Feature toggles
  showAttachment?: boolean
  showVoice?: boolean  
  showTools?: boolean
  showDeepResearch?: boolean

  // Data
  tools?: Tool[]
  businessFunctions?: BusinessFunction[]

  // States
  isStreaming?: boolean
  isDeepResearch?: boolean
  onDeepResearchChange?: (enabled: boolean) => void

  // File handling
  maxFiles?: number
  maxFileSize?: number
  allowedFileTypes?: string[]
  fileUploadHandlers?: FileUploadHandlers
  attachmentAccept?: string
  attachmentTooltip?: string

  // Customization
  toolsIcon?: React.ReactNode
  toolsLabel?: string
  deepResearchIcon?: React.ReactNode  
  deepResearchLabel?: string
  enableSlashTools?: boolean

  // Callbacks
  onAddTool?: (tool: Omit<Tool, 'id'>) => void
  onAddBusinessFunction?: (func: Omit<BusinessFunction, 'id'>) => void
}

// File upload types
interface FileUploadHandlers {
  onUpload?: (file: File) => Promise<FileUploadResult>
  onRemove?: (fileId: string) => Promise<{ success: boolean; error?: string }>
  onProgress?: (fileId: string, progress: FileUploadProgress) => void
}

interface FileUploadResult {
  success: boolean
  file?: UploadedFile
  error?: string
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
```

## Send Handler Configuration

The `onSendMessage` handler receives comprehensive context about the user's message:

### Handler Interface

```typescript
onSendMessage: (
  message: string,           // User's text input
  files?: UploadedFile[],   // Uploaded files with URLs ready for use
  tools?: Tool[],           // Selected tools for processing
  businessFunction?: BusinessFunction  // Selected business function context
) => void
```

### Usage Examples

#### Basic Handler

```typescript
const handleMessage = (message: string, files?: UploadedFile[], tools?: Tool[], businessFunction?: BusinessFunction) => {
  console.log('Message:', message)
  console.log('Files:', files)
  console.log('Tools:', tools)  
  console.log('Business Function:', businessFunction)
  console.log('Deep Research Mode:', isDeepResearch) // from component props
}
```

#### Advanced Handler with Context Processing

```typescript
const handleMessage = async (message: string, files?: UploadedFile[], tools?: Tool[], businessFunction?: BusinessFunction) => {
  const context = {
    message,
    files: files || [],
    tools: tools || [],
    businessFunction,
    isDeepResearch, // from component state
    timestamp: new Date().toISOString()
  }

  // Route based on context
  if (context.isDeepResearch) {
    await performDeepResearch(context)
  } else if (context.businessFunction) {
    await processBusinessFunction(context)
  } else if (context.tools.length > 0) {
    await processWithTools(context)
  } else {
    await processRegularMessage(context)
  }
}
```

#### Business Function Processing

```typescript
const processBusinessFunction = async (context) => {
  const { businessFunction, message, files, tools } = context
  
  switch (businessFunction.id) {
    case 'sales-analysis':
      // Sales-specific processing
      await analyzeSalesData(message, files)
      break
    case 'customer-support':
      // Support-specific processing
      await handleSupportTicket(message, files)
      break
    case 'marketing-campaign':
      // Marketing-specific processing
      await planMarketingCampaign(message, files, tools)
      break
  }
}
```

#### Tool Execution

```typescript
const processWithTools = async (context) => {
  const { tools, message, files } = context
  
  for (const tool of tools) {
    switch (tool.id) {
      case 'web-search':
        await performWebSearch(message)
        break
      case 'data-analyzer':
        await analyzeFiles(files)
        break
      case 'calculator':
        await performCalculation(message)
        break
    }
  }
}
```

## File Upload Handler Configuration

Configure custom file upload handlers to integrate with your storage solution:

### Basic Upload Handler

```typescript
const fileUploadHandlers: FileUploadHandlers = {
  onUpload: async (file: File) => {
    try {
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
    } catch (error) {
      return {
        success: false,
        error: error.message
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
```

### AWS S3 Integration

```typescript
const s3UploadHandlers: FileUploadHandlers = {
  onUpload: async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload/s3', {
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
          url: data.url // S3 URL
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'AWS S3 upload failed'
      }
    }
  }
}
```

### Complete Integration Example

```typescript
import { ChatInput, type FileUploadHandlers } from 'agentic-ui'

function CompleteChatExample() {
  const [isDeepResearch, setIsDeepResearch] = useState(false)
  
  const tools = [
    { id: 'search', name: 'Web Search', description: 'Search the internet' },
    { id: 'calculator', name: 'Calculator', description: 'Perform calculations' }
  ]
  
  const businessFunctions = [
    { id: 'sales', name: 'Sales Analysis', description: 'Analyze sales data', topic: 'Business' },
    { id: 'support', name: 'Customer Support', description: 'Handle support tickets', topic: 'Support' }
  ]
  
  const fileUploadHandlers: FileUploadHandlers = {
    onUpload: async (file: File) => {
      // Your upload logic here
      const result = await uploadToYourStorage(file)
      return result
    },
    onRemove: async (fileId: string) => {
      // Your removal logic here
      const result = await removeFromYourStorage(fileId)
      return result
    }
  }
  
  const handleMessage = async (message: string, files?: UploadedFile[], tools?: Tool[], businessFunction?: BusinessFunction) => {
    // Complete context processing
    const context = {
      message,
      files: files || [],
      tools: tools || [],
      businessFunction,
      isDeepResearch,
      timestamp: new Date().toISOString()
    }
    
    // Process based on full context
    await processMessage(context)
  }
  
  return (
    <ChatInput
      onSendMessage={handleMessage}
      fileUploadHandlers={fileUploadHandlers}
      tools={tools}
      businessFunctions={businessFunctions}
      isDeepResearch={isDeepResearch}
      onDeepResearchChange={setIsDeepResearch}
      showAttachment={true}
      showTools={true}
      showDeepResearch={true}
      maxFiles={5}
      maxFileSize={50 * 1024 * 1024} // 50MB
      placeholder="Type your message, use @ for business functions, / for tools..."
    />
  )
}
```

For more detailed examples and advanced configurations, see:
- [Send Handler Configuration Guide](./docs/send-handler-configuration.md)
- [File Upload Integration Guide](./docs/file-upload-integration.md)
- [TypeScript Interfaces Reference](./docs/typescript-interfaces.md)
- [Complete Integration Example](./examples/complete-chat-integration.tsx)

## Troubleshooting

### Common Issues

#### 1. **Styles Not Applied**

**Problem**: Component appears unstyled

**Solutions**:
```typescript
// Option 1: Import Tailwind CSS
import 'tailwindcss/tailwind.css'

// Option 2: Add Tailwind to your build
// Install: npm install tailwindcss
// Configure tailwind.config.js to scan node_modules/agentic-ui

// Option 3: Import component styles (if built separately)
import 'agentic-ui/dist/styles.css'
```

#### 2. **Toast Notifications Not Working**

**Problem**: File upload errors don't show toasts

**Solutions**:
```typescript
// Install and setup sonner
npm install sonner

// Add Toaster to your app
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <ChatInput {...props} />
      <Toaster />
    </>
  )
}
```

#### 3. **Icons Not Displaying**

**Problem**: Lucide icons don't show up

**Solutions**:
```bash
# Ensure lucide-react is installed
npm install lucide-react

# Or provide custom icons
<ChatInput 
  toolsIcon={<CustomIcon />}
  deepResearchIcon={<AnotherIcon />}
/>
```

#### 4. **TypeScript Errors**

**Problem**: Type definitions not found

**Solutions**:
```typescript
// Option 1: Install types
npm install @types/react @types/react-dom

// Option 2: Add to tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}

// Option 3: Use type assertion if needed
const ChatInput = require('agentic-ui').ChatInput as any
```

#### 5. **Build Errors**

**Problem**: Module resolution issues

**Solutions**:
```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      'agentic-ui': path.resolve(__dirname, 'node_modules/agentic-ui/dist')
    }
  }
}

// vite.config.js  
export default {
  resolve: {
    alias: {
      'agentic-ui': path.resolve(__dirname, 'node_modules/agentic-ui/dist')
    }
  }
}
```

### Performance Considerations

#### Bundle Size Optimization

```typescript
// Use tree shaking - import only what you need
import { ChatInput } from 'agentic-ui'
// Instead of: import * as AgenticUI from 'agentic-ui'

// For very large bundles, consider code splitting
const ChatInput = React.lazy(() => 
  import('agentic-ui').then(module => ({ default: module.ChatInput }))
)
```

#### Large File Handling

```typescript
// Configure appropriate limits
<ChatInput 
  maxFiles={5}                    // Limit concurrent files
  maxFileSize={10 * 1024 * 1024} // 10MB limit
  allowedFileTypes={[             // Restrict file types
    'application/pdf',
    'image/jpeg', 
    'image/png'
  ]}
/>
```

## Final Checklist

### ✅ Pre-Release

- [ ] Component builds successfully
- [ ] All dependencies resolved
- [ ] TypeScript definitions included
- [ ] Examples work correctly
- [ ] Documentation is complete
- [ ] Version number updated

### ✅ Release

- [ ] Package published to npm
- [ ] Installation tested
- [ ] Bundle size acceptable (<100KB recommended)
- [ ] No console errors in usage
- [ ] All props work as documented

### ✅ Post-Release

- [ ] README updated with ChatInput docs
- [ ] Examples published (CodeSandbox/StackBlitz)
- [ ] Community informed (if applicable)
- [ ] Monitor for issues/feedback

## Success Metrics

- **Bundle Size**: Target <50KB gzipped for ChatInput + dependencies
- **Performance**: Smooth interactions, <100ms response times
- **Accessibility**: WCAG AA compliance
- **Browser Support**: Modern browsers (ES2018+)
- **Mobile**: Works on touch devices
- **TypeScript**: Full type safety with IntelliSense

The ChatInput component is feature-rich and ready for npm distribution. Follow this guide systematically to ensure a smooth packaging and deployment process.
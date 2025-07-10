# Pre-Packaging Testing Guide for ChatInput Component

## 🚨 **CRITICAL: Test Before Publishing**

**NEVER** publish to npm without comprehensive testing. This guide ensures your ChatInput component works perfectly for end users.

## Table of Contents

- [Testing Strategy](#testing-strategy)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [Manual Testing](#manual-testing)
- [Package Testing](#package-testing)
- [Cross-Environment Testing](#cross-environment-testing)
- [Performance Testing](#performance-testing)
- [Accessibility Testing](#accessibility-testing)
- [Pre-Publish Checklist](#pre-publish-checklist)

## Testing Strategy

### 🎯 **Testing Pyramid for ChatInput**

```
    ┌─────────────────┐
    │   Manual E2E    │  ← Final validation
    │   Testing       │
    ├─────────────────┤
    │  Integration    │  ← Component workflows
    │  Testing        │
    ├─────────────────┤
    │  Unit Testing   │  ← Individual features
    │  (Most Tests)   │
    └─────────────────┘
```

### ✅ **What We Test**

1. **Core Functionality** - Text input, sending, clearing
2. **Feature Integration** - Tools, functions, file upload
3. **User Interactions** - Keyboard, mouse, touch
4. **Error Handling** - Invalid files, network errors
5. **Accessibility** - Screen readers, keyboard navigation
6. **Performance** - Large files, many tools
7. **Cross-browser** - Chrome, Firefox, Safari, Edge
8. **Package Integration** - Import/export, TypeScript

## Unit Testing

### Step 1: Run Existing Tests

```bash
# Run ChatInput tests
npm run test ChatInput.test.tsx

# Run with coverage
npm run test:coverage ChatInput.test.tsx

# Run in watch mode during development
npm run test:watch ChatInput.test.tsx
```

### Step 2: Verify Test Coverage

**Expected Coverage:**
- **Statements**: >90%
- **Branches**: >85%
- **Functions**: >95%
- **Lines**: >90%

**Key Areas to Test:**

#### ✅ Text Input Functionality
```typescript
// Basic text input
it('allows typing and editing text')
it('auto-resizes textarea')
it('handles multi-line input')
it('clears input after sending')

// Keyboard shortcuts
it('sends on Enter')
it('adds new line on Shift+Enter')
it('maintains cursor position')
```

#### ✅ File Upload System
```typescript
// Upload methods
it('opens file picker on click')
it('handles drag and drop')
it('processes pasted files')

// Validation
it('validates file types')
it('validates file sizes')
it('enforces max file count')
it('shows appropriate error messages')

// File management
it('displays uploaded files')
it('allows file removal')
it('shows upload progress')
```

#### ✅ Tools & Functions
```typescript
// Tools menu
it('opens tools menu on button click')
it('triggers menu with slash commands')
it('filters tools by search term')
it('selects/deselects tools')

// Business functions
it('triggers functions with @ symbol')
it('groups functions by topic')
it('replaces @ trigger with selection')

// Keyboard navigation
it('navigates menus with arrow keys')
it('selects items with Enter')
it('closes menus with Escape')
```

### Step 3: Run Tests

```bash
# Full test suite
npm run test:run

# Should output:
✓ ChatInput > Basic Rendering (15 tests)
✓ ChatInput > Text Input (8 tests)
✓ ChatInput > Feature Toggles (4 tests)
✓ ChatInput > Tools Functionality (6 tests)
✓ ChatInput > Business Functions (4 tests)
✓ ChatInput > File Upload (5 tests)
✓ ChatInput > Keyboard Navigation (6 tests)
✓ ChatInput > State Management (4 tests)
✓ ChatInput > Validation (3 tests)
✓ ChatInput > Accessibility (4 tests)
✓ ChatInput > Error Handling (3 tests)
✓ ChatInput > Customization (5 tests)
✓ ChatInput > Integration Tests (2 tests)

Total: 69 tests passing
```

## Integration Testing

### Step 1: Create Test Application

```bash
# Create test app in separate directory
cd ../
npx create-react-app chatinput-test-app --template typescript
cd chatinput-test-app

# Install your package locally
npm install ../agentic-ui/agentic-ui-0.1.0.tgz

# Install required dependencies
npm install tailwindcss sonner
```

### Step 2: Basic Integration Test

```typescript
// src/App.tsx
import React, { useState } from 'react'
import { ChatInput } from 'agentic-ui'
import { Toaster } from 'sonner'
import './App.css'

function App() {
  const [messages, setMessages] = useState<any[]>([])
  
  const tools = [
    { id: '1', name: 'Web Search', description: 'Search the internet' },
    { id: '2', name: 'Calculator', description: 'Perform calculations' },
    { id: '3', name: 'Code Generator', description: 'Generate code snippets' }
  ]

  const businessFunctions = [
    { id: '1', name: 'Market Analysis', description: 'Analyze market trends', topic: 'Research' },
    { id: '2', name: 'Financial Planning', description: 'Create financial plans', topic: 'Finance' },
    { id: '3', name: 'User Research', description: 'Conduct user studies', topic: 'Product' }
  ]

  const handleSendMessage = (message: string, files?: any[], tools?: any[], businessFunction?: any) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      files: files || [],
      tools: tools || [],
      businessFunction,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, newMessage])
    console.log('New message:', newMessage)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ChatInput Test Application</h1>
      
      {/* Message History */}
      <div className="mb-6 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className="p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">Message: {msg.text}</p>
            {msg.files.length > 0 && (
              <p className="text-sm text-gray-600">Files: {msg.files.map(f => f.name).join(', ')}</p>
            )}
            {msg.tools.length > 0 && (
              <p className="text-sm text-blue-600">Tools: {msg.tools.map(t => t.name).join(', ')}</p>
            )}
            {msg.businessFunction && (
              <p className="text-sm text-green-600">Function: {msg.businessFunction.name}</p>
            )}
          </div>
        ))}
      </div>

      {/* ChatInput Component */}
      <ChatInput
        onSendMessage={handleSendMessage}
        placeholder="Type your message here..."
        showAttachment={true}
        showTools={true}
        showDeepResearch={true}
        showVoice={true}
        tools={tools}
        businessFunctions={businessFunctions}
        maxFiles={5}
        maxFileSize={10 * 1024 * 1024}
        allowedFileTypes={['application/pdf', 'image/*', 'text/*']}
      />
      
      <Toaster />
    </div>
  )
}

export default App
```

### Step 3: Integration Test Checklist

#### ✅ Basic Functionality
- [ ] Component renders without errors
- [ ] Text input works correctly
- [ ] Send button functions properly
- [ ] Message callback receives data

#### ✅ Features Integration
- [ ] File upload works (click, drag, paste)
- [ ] Tools menu opens and selects items
- [ ] Business functions menu works
- [ ] @ and / triggers function correctly
- [ ] Keyboard navigation works in menus

#### ✅ State Management
- [ ] Selected tools appear as badges
- [ ] Selected functions appear as badges
- [ ] Uploaded files display correctly
- [ ] State clears after sending message

#### ✅ Error Handling
- [ ] Invalid files show error toasts
- [ ] File size limits enforced
- [ ] File count limits enforced
- [ ] Network errors handled gracefully

## Manual Testing

### Step 1: Core User Flows

#### ✅ **Flow 1: Basic Message Sending**
1. Type a message
2. Press Enter
3. ✓ Message should be sent
4. ✓ Input should clear

#### ✅ **Flow 2: File Upload Workflow**
1. Click attachment button
2. Select files
3. ✓ Files should appear in file list
4. Remove a file
5. ✓ File should be removed
6. Type message and send
7. ✓ Files should be included in callback

#### ✅ **Flow 3: Tools Selection**
1. Click Tools button
2. ✓ Menu should open
3. Select a tool
4. ✓ Tool badge should appear
5. Select another tool
6. ✓ Multiple tools should be visible
7. Remove a tool badge
8. ✓ Tool should be deselected

#### ✅ **Flow 4: Slash Commands**
1. Type `/` in textarea
2. ✓ Tools menu should open
3. Type `web` to filter
4. ✓ Menu should filter to Web Search
5. Press Enter to select
6. ✓ Tool should be selected, menu closed

#### ✅ **Flow 5: Business Functions**
1. Type `@` in textarea
2. ✓ Functions menu should open
3. Select a function
4. ✓ Function badge should appear
5. ✓ @ trigger should be removed from text

### Step 2: Edge Cases

#### ✅ **Large Files**
- Upload 50MB file → Should show error
- Upload 100 files → Should show error after limit
- Drag multiple file types → Should validate each

#### ✅ **Long Text**
- Type 1000+ character message → Should handle gracefully
- Paste large text block → Should auto-resize
- Test with emojis and special characters

#### ✅ **Rapid Interactions**
- Quickly open/close menus → Should not crash
- Rapidly type triggers (@, /) → Should handle smoothly
- Spam click buttons → Should remain responsive

### Step 3: Browser Testing

#### ✅ **Chrome** (Latest)
- [ ] All features work
- [ ] No console errors
- [ ] File upload works
- [ ] Keyboard navigation works

#### ✅ **Firefox** (Latest)
- [ ] All features work
- [ ] No console errors
- [ ] File upload works
- [ ] Keyboard navigation works

#### ✅ **Safari** (Latest)
- [ ] All features work
- [ ] No console errors
- [ ] File upload works
- [ ] Keyboard navigation works

#### ✅ **Edge** (Latest)
- [ ] All features work
- [ ] No console errors
- [ ] File upload works
- [ ] Keyboard navigation works

## Package Testing

### Step 1: Build and Pack

```bash
# Build the package
npm run build

# Create package tarball
npm pack
# Creates: agentic-ui-0.1.0.tgz
```

### Step 2: Test Package Installation

```bash
# Test in new project
mkdir chatinput-package-test
cd chatinput-package-test
npm init -y

# Install the packed version
npm install ../agentic-ui/agentic-ui-0.1.0.tgz

# Check installation
ls node_modules/agentic-ui/
# Should contain: dist/ package.json README.md (if exists)
```

### Step 3: Import Testing

```typescript
// test-imports.js
// Test different import methods

// Named import
import { ChatInput } from 'agentic-ui'
console.log('Named import:', ChatInput)

// Default import (should work)
import AgenticUI from 'agentic-ui'
console.log('Default import:', AgenticUI)

// Namespace import
import * as AUI from 'agentic-ui'
console.log('Namespace import:', AUI.ChatInput)

// CommonJS (Node.js)
const { ChatInput: CJSChatInput } = require('agentic-ui')
console.log('CommonJS import:', CJSChatInput)
```

### Step 4: TypeScript Testing

```typescript
// test-types.ts
import { ChatInput } from 'agentic-ui'
import type { UploadedFile, Tool, BusinessFunction } from 'agentic-ui'

// Test prop types
const handleMessage = (
  message: string, 
  files?: UploadedFile[], 
  tools?: Tool[], 
  businessFunction?: BusinessFunction
) => {
  console.log({ message, files, tools, businessFunction })
}

// Should have full TypeScript support
const TestComponent = () => (
  <ChatInput
    onSendMessage={handleMessage}
    placeholder="Test placeholder"
    showAttachment={true}
    showTools={true}
    // TypeScript should provide autocomplete for all props
  />
)
```

## Cross-Environment Testing

### Step 1: Different Node Versions

```bash
# Test with different Node versions using nvm
nvm use 18
npm run build && npm test

nvm use 20  
npm run build && npm test

nvm use 21
npm run build && npm test
```

### Step 2: Different Package Managers

```bash
# Test with npm
npm install && npm run build

# Test with yarn
yarn install && yarn build

# Test with pnpm
pnpm install && pnpm build
```

### Step 3: Different Bundlers

#### ✅ **Webpack** (Create React App)
```bash
npx create-react-app test-webpack --template typescript
cd test-webpack
npm install ../agentic-ui/agentic-ui-0.1.0.tgz
# Test import and usage
```

#### ✅ **Vite**
```bash
npm create vite@latest test-vite -- --template react-ts
cd test-vite
npm install ../agentic-ui/agentic-ui-0.1.0.tgz
# Test import and usage
```

#### ✅ **Next.js**
```bash
npx create-next-app@latest test-nextjs --typescript
cd test-nextjs
npm install ../agentic-ui/agentic-ui-0.1.0.tgz
# Test import and usage
```

## Performance Testing

### Step 1: Bundle Size Analysis

```bash
# Analyze bundle size
npm install -g bundle-analyzer
bundle-analyzer dist/index.esm.js

# Expected results:
# - Total bundle size: <100KB
# - ChatInput component: <50KB
# - Dependencies clearly identified
```

### Step 2: Runtime Performance

```typescript
// performance-test.tsx
import React, { useState, useEffect } from 'react'
import { ChatInput } from 'agentic-ui'

function PerformanceTest() {
  const [renderTime, setRenderTime] = useState(0)
  
  // Large datasets for testing
  const manyTools = Array.from({ length: 1000 }, (_, i) => ({
    id: `tool-${i}`,
    name: `Tool ${i}`,
    description: `Description for tool ${i}`
  }))

  const manyFunctions = Array.from({ length: 500 }, (_, i) => ({
    id: `func-${i}`,
    name: `Function ${i}`,
    description: `Description for function ${i}`,
    topic: `Topic ${i % 10}`
  }))

  useEffect(() => {
    const start = performance.now()
    
    // Force re-render
    setTimeout(() => {
      const end = performance.now()
      setRenderTime(end - start)
    }, 0)
  }, [])

  return (
    <div>
      <p>Render time: {renderTime}ms (should be &lt;100ms)</p>
      <ChatInput
        onSendMessage={() => {}}
        showTools={true}
        tools={manyTools}
        businessFunctions={manyFunctions}
      />
    </div>
  )
}
```

### Step 3: Memory Usage

```typescript
// memory-test.tsx
function MemoryTest() {
  const [components, setComponents] = useState<React.ReactNode[]>([])
  
  const addComponent = () => {
    setComponents(prev => [...prev, 
      <ChatInput key={prev.length} onSendMessage={() => {}} />
    ])
  }
  
  const clearComponents = () => {
    setComponents([])
    // Force garbage collection (dev tools)
    if (window.gc) window.gc()
  }

  return (
    <div>
      <button onClick={addComponent}>Add ChatInput ({components.length})</button>
      <button onClick={clearComponents}>Clear All</button>
      {components}
    </div>
  )
}
```

## Accessibility Testing

### Step 1: Automated A11y Testing

```bash
# Install accessibility testing tools
npm install -D @axe-core/react axe-playwright

# Run accessibility tests
npm run test:a11y
```

### Step 2: Manual A11y Testing

#### ✅ **Keyboard Navigation**
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Arrow keys navigate menus
- [ ] Escape closes menus
- [ ] Focus visible on all elements

#### ✅ **Screen Reader Testing**
- [ ] Test with VoiceOver (macOS)
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] All elements have proper labels
- [ ] State changes are announced

#### ✅ **Color & Contrast**
- [ ] Text meets WCAG AA contrast ratios
- [ ] Focus indicators are visible
- [ ] No information conveyed by color alone
- [ ] Works with high contrast mode

## Pre-Publish Checklist

### ✅ **Code Quality**
- [ ] All tests pass (`npm run test:run`)
- [ ] Code coverage >85%
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] Code formatted and linted

### ✅ **Functionality**
- [ ] All major features work
- [ ] File upload/validation works
- [ ] Tools and functions work
- [ ] Keyboard navigation works
- [ ] Error handling works

### ✅ **Package**
- [ ] Builds successfully
- [ ] Package installs correctly
- [ ] Imports work in test projects
- [ ] TypeScript definitions included
- [ ] Bundle size acceptable

### ✅ **Cross-Environment**
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Works with Webpack, Vite, Next.js
- [ ] Works with npm, yarn, pnpm
- [ ] Works on Node 18, 20, 21

### ✅ **Documentation**
- [ ] Usage examples work
- [ ] Props are documented
- [ ] Installation instructions correct
- [ ] Troubleshooting guide helpful

### ✅ **Performance**
- [ ] Bundle size <100KB
- [ ] Render time <100ms
- [ ] No memory leaks
- [ ] Handles large datasets

### ✅ **Accessibility**
- [ ] WCAG AA compliant
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] High contrast support

## Testing Command Summary

```bash
# Complete testing workflow
npm run test:run                    # Unit tests
npm run test:coverage               # Coverage report
npm run build                       # Build package
npm pack                           # Create package
npm install ./agentic-ui-0.1.0.tgz # Test installation

# Manual testing checklist
# - Test in 4 browsers
# - Test with keyboard only
# - Test with screen reader
# - Test file upload/download
# - Test all features work together

# Performance testing
# - Check bundle size
# - Check render performance
# - Check memory usage

# Cross-environment testing
# - Test in CRA, Vite, Next.js
# - Test with different Node versions
# - Test TypeScript integration

# Only after ALL tests pass:
npm publish
```

## 🚫 **DO NOT PUBLISH IF:**

- ❌ Any tests fail
- ❌ Bundle size >200KB
- ❌ Console errors in browser
- ❌ TypeScript errors
- ❌ Accessibility violations
- ❌ Performance issues
- ❌ Import/export problems
- ❌ Missing documentation

## ✅ **SAFE TO PUBLISH WHEN:**

- ✅ All tests pass (100%)
- ✅ Code coverage >85%
- ✅ Works in all target browsers
- ✅ Bundle size acceptable
- ✅ No accessibility violations
- ✅ Performance benchmarks met
- ✅ Documentation complete
- ✅ Examples work correctly

**Remember: Your users trust your package to work correctly. Comprehensive testing ensures a great developer experience!** 🌟
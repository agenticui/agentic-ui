# Testing Documentation

This document provides comprehensive information about the testing setup, approach, and coverage for the Agentic UI component library.

## Table of Contents

- [Testing Framework Overview](#testing-framework-overview)
- [Testing Stack](#testing-stack)
- [Project Structure](#project-structure)
- [Test Configuration](#test-configuration)
- [Testing Patterns](#testing-patterns)
- [Component Test Coverage](#component-test-coverage)
- [Integration Testing](#integration-testing)
- [Running Tests](#running-tests)
- [Coverage Reporting](#coverage-reporting)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Testing Framework Overview

The Agentic UI library uses a modern, comprehensive testing approach designed to ensure component reliability, accessibility, and maintainability. Our testing strategy covers unit tests, integration tests, and visual regression testing through a carefully chosen tech stack.

### Why This Testing Approach?

- **Component-First**: Each UI component is tested in isolation with all variants and states
- **User-Centric**: Tests focus on user interactions and accessibility, not implementation details
- **Integration Coverage**: Components are tested together to ensure proper workflows
- **Performance Aware**: Tests include performance considerations and large dataset handling
- **Accessibility Focused**: Every component is tested for keyboard navigation and screen reader compatibility

## Testing Stack

### Core Testing Framework

- **[Vitest](https://vitest.dev/)** - Fast, modern test runner built for Vite
  - Hot module replacement for instant test feedback
  - Native ES modules support
  - Built-in TypeScript support
  - Excellent performance with parallel test execution

- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** - Component testing utilities
  - Encourages best practices by testing components as users would interact with them
  - Provides utilities for finding elements by accessibility attributes
  - Supports user event simulation and async testing

- **[Jest DOM](https://github.com/testing-library/jest-dom)** - Custom matchers
  - Provides semantic matchers for DOM assertions
  - Improves test readability with descriptive assertions
  - Examples: `toBeVisible()`, `toHaveClass()`, `toBeDisabled()`

### Supporting Libraries

- **[User Event](https://testing-library.com/docs/user-event/intro/)** - Realistic user interactions
  - Simulates real user behavior (typing, clicking, keyboard navigation)
  - Handles complex interactions like drag and drop
  - Async-aware event simulation

- **[JSdom](https://github.com/jsdom/jsdom)** - Browser environment simulation
  - Provides DOM APIs in Node.js environment
  - Supports CSS selectors and styling
  - Mock browser APIs like `IntersectionObserver`

## Project Structure

```
src/
├── test/                          # Test utilities and setup
│   ├── setup.ts                   # Global test configuration
│   └── utils.tsx                  # Custom render functions and helpers
├── components/
│   └── ui/
│       ├── __tests__/             # Component test files
│       │   ├── AttachmentButton.test.tsx
│       │   ├── ToolsButton.test.tsx
│       │   ├── FileDisplay.test.tsx
│       │   ├── SearchMenu.test.tsx
│       │   ├── SelectedItemsBadges.test.tsx
│       │   ├── DragDropOverlay.test.tsx
│       │   └── integration.test.tsx
│       ├── AttachmentButton.tsx   # Component implementations
│       └── ...
└── vitest.config.ts               # Vitest configuration
```

## Test Configuration

### Vitest Configuration (`vitest.config.ts`)

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,                 // Global test functions (describe, it, expect)
    environment: 'jsdom',          // Browser-like environment
    setupFiles: ['./src/test/setup.ts'],
    css: true,                     # CSS processing for styled components
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.stories.tsx'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

### Test Setup (`src/test/setup.ts`)

```typescript
import '@testing-library/jest-dom'  // Custom matchers
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock browser APIs not available in jsdom
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn()
}))
```

### Custom Test Utilities (`src/test/utils.tsx`)

```typescript
// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export { customRender as render }

// Sample data for consistent testing
export const sampleFiles = [
  {
    id: '1',
    name: 'document.pdf',
    size: 1024000,
    type: 'application/pdf',
    uploadedAt: '2024-01-15T10:30:00Z'
  }
  // ... more sample data
]
```

## Testing Patterns

### 1. Component Structure Testing

Every component test follows this structure:

```typescript
describe('ComponentName', () => {
  // Setup and cleanup
  const mockCallback = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    // Basic rendering tests
  })

  describe('Variants', () => {
    // All variant combinations
  })

  describe('Interaction', () => {
    // User interaction tests
  })

  describe('Accessibility', () => {
    // A11y and keyboard navigation
  })

  describe('Edge Cases', () => {
    // Error handling and edge cases
  })
})
```

### 2. Accessibility Testing

Every component includes comprehensive accessibility tests:

```typescript
describe('Accessibility', () => {
  it('has proper role', () => {
    render(<ComponentName />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('is keyboard accessible', async () => {
    render(<ComponentName onAction={mockAction} />)
    const element = screen.getByRole('button')
    element.focus()
    await user.keyboard('{Enter}')
    expect(mockAction).toHaveBeenCalled()
  })

  it('supports screen readers', () => {
    render(<ComponentName aria-label="Custom label" />)
    expect(screen.getByLabelText('Custom label')).toBeInTheDocument()
  })
})
```

### 3. Variant Testing

All component variants are systematically tested:

```typescript
describe('Variant Styles', () => {
  const variants = ['default', 'success', 'warning', 'error']
  
  variants.forEach(variant => {
    it(`applies ${variant} variant correctly`, () => {
      render(<ComponentName variant={variant} />)
      const element = screen.getByRole('button')
      expect(element).toHaveClass(`variant-${variant}`)
    })
  })
})
```

### 4. User Interaction Testing

Realistic user interactions are tested:

```typescript
describe('Interaction', () => {
  it('handles click events', async () => {
    render(<ComponentName onClick={mockClick} />)
    await user.click(screen.getByRole('button'))
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard navigation', async () => {
    render(<ComponentName onKeyDown={mockKeyDown} />)
    const element = screen.getByRole('button')
    element.focus()
    await user.keyboard('{ArrowDown}')
    expect(mockKeyDown).toHaveBeenCalled()
  })
})
```

## Component Test Coverage

### 1. AttachmentButton Component (338 lines)

**What's Tested:**
- **Rendering**: Default props, custom tooltips, custom icons
- **Size Variants**: sm, md, lg with proper dimensions
- **Style Variants**: solid, outline, ghost appearances
- **State Management**: default, uploading, error, success, warning states
- **File Count Display**: Count badges, max file limits, visibility controls
- **Interaction**: Click handling, disabled states, keyboard navigation
- **Loading States**: Upload progress, cursor changes, disabled behavior
- **Accessibility**: ARIA labels, focus management, screen reader support
- **Edge Cases**: Large counts, missing callbacks, rapid clicking
- **State Transitions**: Dynamic state changes, prop updates

### 2. ToolsButton Component (444 lines)

**What's Tested:**
- **Rendering**: Default and custom labels, icon positioning
- **Size Variants**: sm, md, lg button dimensions
- **Style Variants**: default, active, success, warning, danger, ghost, outline
- **Active State**: Visual feedback, state overrides
- **Loading State**: Spinner animation, disabled behavior
- **Icon Position**: Left/right icon placement
- **Count Badge**: Numeric badges, positioning, size scaling
- **Full Width**: Layout flexibility
- **Interaction**: Click events, keyboard navigation, disabled handling
- **Complex Combinations**: Multiple props working together
- **Dynamic Updates**: Real-time state changes

### 3. FileDisplay Component (481 lines)

**What's Tested:**
- **Rendering**: File lists, count display, total size calculation
- **File Size Formatting**: Bytes, KB, MB, GB, TB conversion
- **File Icons**: Type-specific icons (image, PDF, text, generic)
- **Variant Styles**: default, success, error, uploading, warning, processing
- **Size Variants**: sm, md, lg component sizing
- **Layout Options**: horizontal, vertical arrangements
- **Density Options**: compact, normal, relaxed spacing
- **File Removal**: Remove buttons, hover states, callback handling
- **Status Icons**: Success, error, loading indicators
- **Text Colors**: Variant-specific color schemes
- **File Name Truncation**: Long name handling, tooltips
- **Accessibility**: Button roles, keyboard access, screen reader support
- **Edge Cases**: Missing properties, large files, empty names

### 4. SearchMenu Component (722 lines)

**What's Tested:**
- **Rendering**: Tools and business function menus
- **Theme Variants**: light, dark, modern, minimal, colorful
- **Size Variants**: sm, md, lg, xl menu dimensions
- **Position Variants**: bottom, top, left positioning
- **Item Size Variants**: sm, md, lg item spacing
- **Highlighted Items**: Keyboard navigation, theme-specific colors
- **Selected Items**: Visual feedback, check icons
- **Business Function Grouping**: Topic-based organization
- **Search Term Display**: Search query highlighting
- **Empty States**: No items, custom messages, add new functionality
- **Interaction**: Item selection, keyboard navigation
- **Custom Icons**: Icon customization, fallbacks
- **Accessibility**: Screen reader structure, keyboard support
- **Edge Cases**: Invalid indices, missing descriptions, empty topics

### 5. SelectedItemsBadges Component (587 lines)

**What's Tested:**
- **Rendering**: Tools, business functions, categories, tags
- **Layout Options**: horizontal, vertical arrangements
- **Density Options**: compact, normal, relaxed spacing
- **Size Variants**: sm, md, lg badge sizing
- **Variant Styles**: default, outline, subtle appearances
- **Item Type Styling**: Type-specific colors and styling
- **Icons**: Show/hide icons, custom icon support
- **Removal Functionality**: Remove buttons, callback handling
- **Max Items & Count**: Item limiting, overflow indicators
- **Variant by Type**: Different styling per item type
- **Accessibility**: Button roles, keyboard navigation
- **Edge Cases**: Empty arrays, missing properties, long names
- **Custom Styling**: CSS classes, variant combinations
- **Dynamic Updates**: Real-time prop changes

### 6. DragDropOverlay Component (625 lines)

**What's Tested:**
- **Rendering**: Active/inactive states, custom content
- **Variant Styles**: default, success, warning, error, minimal, dark, colorful
- **Size Variants**: sm, md, lg, full border radius
- **Animation Variants**: none, pulse, bounce, fade
- **Text Colors**: Variant-specific color schemes
- **File Information**: Accepted types, size limits, custom messages
- **File Size Formatting**: Comprehensive size conversion testing
- **Icon Customization**: Custom icons, animation effects
- **Layout & Positioning**: Absolute positioning, centering, backdrop blur
- **Background Colors**: Theme-appropriate backgrounds
- **Accessibility**: Heading structure, descriptive text
- **Edge Cases**: Empty file types, large sizes, missing content
- **State Management**: Show/hide transitions, prop updates

### 7. Integration Testing (400+ lines)

**What's Tested:**
- **File Management Workflow**: Upload, state changes, removal
- **Tools Selection Workflow**: Menu interaction, badge display
- **Selected Items Management**: Multiple item types, max limits
- **Drag and Drop Integration**: Overlay show/hide
- **State Synchronization**: Cross-component state consistency
- **Rapid User Interactions**: Quick successive actions
- **Accessibility Integration**: Focus management, ARIA attributes
- **Error Handling**: Graceful error recovery
- **Performance**: Large dataset handling, render performance

## Integration Testing

Integration tests verify that components work together correctly:

```typescript
describe('Component Integration Tests', () => {
  describe('File Management Workflow', () => {
    it('handles complete file upload and removal workflow', async () => {
      // Test complete user workflow across multiple components
      render(<MockChatInput />)
      
      // Upload file
      await user.click(screen.getByRole('button', { name: /attachment/i }))
      
      // Verify state changes
      await waitFor(() => {
        expect(screen.getByText('new-document.pdf')).toBeInTheDocument()
      })
      
      // Remove file
      const removeButton = screen.getByRole('button', { name: /remove/i })
      await user.click(removeButton)
      
      // Verify removal
      await waitFor(() => {
        expect(screen.queryByText('new-document.pdf')).not.toBeInTheDocument()
      })
    })
  })
})
```

## Running Tests

### Available Scripts

```bash
# Run tests in watch mode (development)
npm run test

# Run tests once (CI/CD)
npm run test:run

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Development Workflow

1. **During Development**: Use `npm run test` for instant feedback
2. **Before Commits**: Run `npm run test:run` to ensure all tests pass
3. **Coverage Analysis**: Use `npm run test:coverage` to check test coverage
4. **Visual Debugging**: Use `npm run test:ui` for interactive test exploration

### Continuous Integration

```yaml
# Example GitHub Actions workflow
- name: Run Tests
  run: npm run test:run

- name: Generate Coverage
  run: npm run test:coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## Coverage Reporting

### Coverage Configuration

```typescript
coverage: {
  reporter: ['text', 'json', 'html'],  // Multiple output formats
  exclude: [
    'node_modules/',                   // Third-party code
    'src/test/',                       // Test utilities
    '**/*.d.ts',                       // Type definitions
    '**/*.stories.tsx'                 // Storybook stories
  ],
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

### Coverage Reports

- **Text**: Console output during test runs
- **HTML**: Interactive coverage browser (`coverage/index.html`)
- **JSON**: Machine-readable format for CI/CD integration

### Coverage Metrics

- **Statements**: Individual executable statements
- **Branches**: Conditional branches (if/else, ternary operators)
- **Functions**: Function declarations and calls
- **Lines**: Lines of code executed

## Best Practices

### 1. Test Organization

- **Group related tests** using `describe` blocks
- **Use descriptive test names** that explain the expected behavior
- **Follow the AAA pattern**: Arrange, Act, Assert
- **Keep tests focused** on a single behavior

### 2. Accessibility Testing

- **Test keyboard navigation** for all interactive elements
- **Verify ARIA attributes** and semantic HTML
- **Check focus management** and tab order
- **Test with screen reader expectations**

### 3. User-Centric Testing

- **Find elements by role/label** rather than class names
- **Simulate real user interactions** using userEvent
- **Test the complete user journey**, not just isolated functions
- **Verify visual feedback** users would see

### 4. Mock Management

- **Clear mocks** between tests to avoid test pollution
- **Mock external dependencies** but not internal logic
- **Use realistic mock data** that represents actual usage
- **Verify mock calls** to ensure proper integration

### 5. Async Testing

- **Use waitFor** for asynchronous operations
- **Test loading states** and transitions
- **Handle promises properly** with async/await
- **Set appropriate timeouts** for slow operations

### 6. Edge Case Coverage

- **Test with empty data** (empty arrays, null values)
- **Test with maximum values** (large numbers, long strings)
- **Test error conditions** and recovery
- **Test rapid user interactions**

## Troubleshooting

### Common Issues

#### 1. Tests Not Finding Elements

```typescript
// ❌ Bad: Finding by implementation details
const button = container.querySelector('.btn-primary')

// ✅ Good: Finding by user-visible attributes
const button = screen.getByRole('button', { name: /submit/i })
```

#### 2. Async Operations Not Working

```typescript
// ❌ Bad: Not waiting for async operations
fireEvent.click(button)
expect(mockCallback).toHaveBeenCalled()

// ✅ Good: Waiting for async operations
await user.click(button)
await waitFor(() => {
  expect(mockCallback).toHaveBeenCalled()
})
```

#### 3. Mock Cleanup Issues

```typescript
// ✅ Always clean up mocks
beforeEach(() => {
  vi.clearAllMocks()
})
```

#### 4. CSS/Styling Issues

```typescript
// Ensure CSS is processed in test environment
// vitest.config.ts
export default defineConfig({
  test: {
    css: true  // Enable CSS processing
  }
})
```

### Debugging Tests

#### 1. Visual Debugging

```typescript
import { screen } from '@testing-library/react'

// Debug the current DOM state
screen.debug()

// Debug a specific element
screen.debug(screen.getByRole('button'))
```

#### 2. Log Element Queries

```typescript
// See all available queries for debugging
screen.logRoles()

// Get suggestions for queries
screen.getByRole('button') // Will suggest alternatives if not found
```

#### 3. Test Environment Logging

```typescript
// Add logging to understand test flow
console.log('Test state:', { prop1, prop2 })

// Use data-testid for complex queries when needed
<button data-testid="complex-button">Submit</button>
screen.getByTestId('complex-button')
```

### Performance Optimization

#### 1. Selective Test Running

```bash
# Run specific test file
npm run test AttachmentButton.test.tsx

# Run tests matching pattern
npm run test --grep "accessibility"

# Run only changed files
npm run test --changed
```

#### 2. Parallel Execution

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    pool: 'threads',      // Use worker threads
    poolOptions: {
      threads: {
        singleThread: false
      }
    }
  }
})
```

## Summary

This testing setup provides:

- **Comprehensive Coverage**: All components tested across variants, states, and interactions
- **Modern Tooling**: Fast, reliable test execution with excellent developer experience
- **Accessibility Focus**: Every component verified for inclusive design
- **Integration Testing**: Components tested together for real-world workflows
- **Performance Awareness**: Tests designed to catch performance regressions
- **Maintainable Architecture**: Clear patterns and utilities for scaling

The testing framework ensures the Agentic UI library delivers reliable, accessible, and performant components for AI application development.
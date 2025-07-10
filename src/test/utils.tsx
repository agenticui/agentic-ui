import React from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Mock Toaster for testing
const MockToaster = () => <div data-testid="toaster" />

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <MockToaster />
    </>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Common test utilities
export const createFile = (name: string, size: number, type: string = 'text/plain') => {
  const file = new File([''], name, { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

export const createDataTransfer = (files: File[]) => {
  const dataTransfer = new DataTransfer()
  files.forEach(file => dataTransfer.items.add(file))
  return dataTransfer
}

export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  })
  window.IntersectionObserver = mockIntersectionObserver
}

// Sample data for tests
export const sampleTools = [
  {
    id: 'search',
    name: 'Web Search',
    description: 'Search the internet for information',
    icon: 'search'
  },
  {
    id: 'database',
    name: 'Database Query',
    description: 'Query your database with SQL',
    icon: 'database'
  },
  {
    id: 'code',
    name: 'Code Generator',
    description: 'Generate code in multiple languages',
    icon: 'code'
  }
]

export const sampleBusinessFunction = {
  id: 'market-analysis',
  name: 'Market Analysis',
  description: 'Analyze market trends and competition',
  icon: 'briefcase',
  topic: 'Research'
}

export const sampleFiles = [
  {
    id: '1',
    name: 'document.pdf',
    size: 2457600,
    type: 'application/pdf',
    uploadedAt: '2024-01-15T10:30:00Z',
    url: '/files/document.pdf'
  },
  {
    id: '2',
    name: 'image.jpg',
    size: 1048576,
    type: 'image/jpeg',
    isImage: true,
    uploadedAt: '2024-01-15T10:32:00Z',
    url: '/files/image.jpg'
  }
]
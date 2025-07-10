export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface Agent {
  id: string
  name: string
  description: string
  avatar?: string
  capabilities: string[]
  status: 'online' | 'offline' | 'thinking' | 'busy'
  metadata?: Record<string, any>
}

export interface StreamingState {
  isStreaming: boolean
  currentMessage: string
  complete: boolean
}

export interface UsageMetricsData {
  tokensUsed: number
  tokensRemaining: number
  cost: number
  requestCount: number
  averageResponseTime: number
}

export interface ConversationContext {
  messages: Message[]
  activeAgent?: Agent
  metadata?: Record<string, any>
}

export interface ContextItem {
  id: string
  type: 'conversation' | 'document' | 'memory' | 'system'
  title: string
  content: string
  timestamp: Date
  tokens?: number
  relevance?: number
  metadata?: Record<string, any>
}

export interface PromptTemplate {
  id: string
  name: string
  content: string
  variables: Variable[]
}

export interface Variable {
  name: string
  value: string
  type: 'text' | 'number' | 'select'
  options?: string[]
}
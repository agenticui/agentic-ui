import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import { ChatMessage, MessageList, ChatInput } from '../components/conversation'
import { AgentCard, AgentSelector, AgentGrid } from '../components/agent'
import { StreamingText, ThinkingAnimation } from '../components/ui'
import { Message, Agent } from '../types'

const meta: Meta = {
  title: 'Examples/Complete Chat Interface',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

// Sample data
const sampleAgents: Agent[] = [
  {
    id: 'claude',
    name: 'Claude Assistant',
    description: 'A helpful AI assistant for general tasks',
    capabilities: ['Question Answering', 'Writing', 'Analysis', 'Coding'],
    status: 'online',
  },
  {
    id: 'coder',
    name: 'Code Reviewer',
    description: 'Specialized in code review and programming',
    capabilities: ['Code Review', 'Debugging', 'Architecture', 'Testing'],
    status: 'thinking',
  },
  {
    id: 'researcher',
    name: 'Research Assistant',
    description: 'Helps with research and data analysis',
    capabilities: ['Research', 'Data Analysis', 'Citations', 'Summarization'],
    status: 'online',
  },
  {
    id: 'creative',
    name: 'Creative Writer',
    description: 'Assists with creative writing and storytelling',
    capabilities: ['Creative Writing', 'Storytelling', 'Poetry', 'Brainstorming'],
    status: 'busy',
  },
]

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'system',
    content: 'Welcome to Agentic UI! Select an agent to start chatting.',
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: '2',
    role: 'user',
    content: 'Hello! I need help with building a React component library.',
    timestamp: new Date(Date.now() - 45000),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'I\'d be happy to help you build a React component library! This is a great project. Let me break down the key steps you\'ll need to consider...',
    timestamp: new Date(Date.now() - 30000),
  },
]

interface ChatInterfaceProps {
  layout?: 'split' | 'stacked' | 'sidebar'
  showAgentGrid?: boolean
  enableStreaming?: boolean
}

function ChatInterface({ 
  layout = 'split',
  showAgentGrid = true,
  enableStreaming = true
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedAgent, setSelectedAgent] = useState<Agent>(sampleAgents[0])
  const [isThinking, setIsThinking] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState('')

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsThinking(true)

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsThinking(false)

    // Simulate streaming response
    const responses = [
      "That's a great question! Let me help you with that.",
      "Here's what I would recommend for your React component library project:",
      "1. Start with a solid project structure using TypeScript and modern build tools\n2. Implement a design system with consistent styling\n3. Add comprehensive documentation with Storybook\n4. Include proper testing and accessibility features",
    ]

    const selectedResponse = responses[Math.floor(Math.random() * responses.length)]

    if (enableStreaming) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])

      // Stream the response
      for (let i = 0; i <= selectedResponse.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50))
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id 
              ? { ...msg, content: selectedResponse.slice(0, i) }
              : msg
          )
        )
      }
    } else {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: selectedResponse,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
    }
  }

  const layoutClasses = {
    split: 'grid grid-cols-1 lg:grid-cols-3 gap-6',
    stacked: 'flex flex-col gap-6',
    sidebar: 'grid grid-cols-1 xl:grid-cols-4 gap-6',
  }

  return (
    <div className="h-screen bg-background p-6">
      <div className={layoutClasses[layout]}>
        {/* Agent Selection */}
        {showAgentGrid && (
          <div className={layout === 'sidebar' ? 'xl:col-span-1' : 'lg:col-span-1'}>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Select Agent</h3>
                <AgentSelector
                  agents={sampleAgents}
                  selectedAgent={selectedAgent}
                  onSelectAgent={setSelectedAgent}
                />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Available Agents</h3>
                <AgentGrid
                  agents={sampleAgents}
                  selectedAgent={selectedAgent}
                  onSelectAgent={setSelectedAgent}
                  columns={1}
                />
              </div>
            </div>
          </div>
        )}

        {/* Chat Interface */}
        <div className={`flex flex-col h-full ${
          layout === 'sidebar' 
            ? showAgentGrid ? 'xl:col-span-3' : 'xl:col-span-4'
            : showAgentGrid ? 'lg:col-span-2' : 'lg:col-span-3'
        }`}>
          <div className="border rounded-lg flex flex-col h-full bg-card">
            {/* Header */}
            <div className="border-b p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {selectedAgent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-semibold">{selectedAgent.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedAgent.description}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0">
              <MessageList
                messages={messages}
                showAvatars={true}
                showTimestamps={false}
              />
              {isThinking && (
                <div className="p-4">
                  <ThinkingAnimation message={`${selectedAgent.name} is thinking...`} />
                </div>
              )}
            </div>

            {/* Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              placeholder={`Message ${selectedAgent.name}...`}
              disabled={isThinking}
              showAttachments={true}
              showVoice={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const SplitLayout: StoryObj = {
  render: () => <ChatInterface layout="split" />,
  name: 'Split Layout with Agent Grid',
}

export const StackedLayout: StoryObj = {
  render: () => <ChatInterface layout="stacked" />,
  name: 'Stacked Layout',
}

export const SidebarLayout: StoryObj = {
  render: () => <ChatInterface layout="sidebar" />,
  name: 'Sidebar Layout',
}

export const ChatOnly: StoryObj = {
  render: () => <ChatInterface layout="split" showAgentGrid={false} />,
  name: 'Chat Interface Only',
}

export const WithoutStreaming: StoryObj = {
  render: () => <ChatInterface layout="split" enableStreaming={false} />,
  name: 'Instant Responses',
}
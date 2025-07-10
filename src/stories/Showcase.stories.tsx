import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ChatMessage, MessageList, ChatInput } from '../components/conversation'
import { AgentCard, AgentSelector, AgentGrid } from '../components/agent'
import { StreamingText, Typewriter, TypingIndicator, ThinkingAnimation, MessageSkeleton, LoadingSpinner } from '../components/ui'
import { Badge } from '../components/ui/Badge'
import { Message, Agent } from '../types'

const meta: Meta = {
  title: 'Examples/Component Showcase',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

const agents: Agent[] = [
  {
    id: '1',
    name: 'Claude Assistant',
    description: 'General purpose AI assistant',
    capabilities: ['Chat', 'Analysis', 'Writing'],
    status: 'online',
  },
  {
    id: '2',
    name: 'Code Expert',
    description: 'Programming specialist',
    capabilities: ['Coding', 'Debug', 'Review'],
    status: 'thinking',
  },
  {
    id: '3',
    name: 'Research Bot',
    description: 'Research and analysis',
    capabilities: ['Research', 'Data', 'Reports'],
    status: 'busy',
  },
]

const messages: Message[] = [
  {
    id: '1',
    role: 'system',
    content: 'Welcome to Agentic UI Component Library!',
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: '2',
    role: 'user',
    content: 'Hello! Can you show me what this library can do?',
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Absolutely! This library provides a comprehensive set of components for building AI chat interfaces. Let me show you the key features...',
    timestamp: new Date(Date.now() - 180000),
  },
]

function ComponentShowcase() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0])
  const [showLoading, setShowLoading] = useState(false)
  const [currentSection, setCurrentSection] = useState<string>('overview')

  const sections = [
    { id: 'overview', name: 'Overview' },
    { id: 'conversation', name: 'Conversation' },
    { id: 'agents', name: 'Agents' },
    { id: 'streaming', name: 'Streaming' },
    { id: 'loading', name: 'Loading States' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Agentic UI Showcase</h1>
              <p className="text-muted-foreground">Interactive demo of all components</p>
            </div>
            <div className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              <Badge variant="secondary">v0.1.0</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-6">
          <nav className="flex gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  currentSection === section.id
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {section.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {currentSection === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-semibold mb-2">Conversation Components</h3>
                <p className="text-muted-foreground mb-4">
                  Build chat interfaces with message display, input handling, and real-time features.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline">ChatMessage</Badge>
                  <Badge variant="outline">MessageList</Badge>
                  <Badge variant="outline">ChatInput</Badge>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-semibold mb-2">Agent Management</h3>
                <p className="text-muted-foreground mb-4">
                  Manage multiple AI agents with cards, selectors, and grid layouts.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline">AgentCard</Badge>
                  <Badge variant="outline">AgentSelector</Badge>
                  <Badge variant="outline">AgentGrid</Badge>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-semibold mb-2">Streaming & Animation</h3>
                <p className="text-muted-foreground mb-4">
                  Real-time text streaming with various animation effects and loading states.
                </p>
                <div className="space-y-2">
                  <Badge variant="outline">StreamingText</Badge>
                  <Badge variant="outline">Typewriter</Badge>
                  <Badge variant="outline">Loading States</Badge>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-semibold mb-4">Live Demo</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Typewriter Effect:</p>
                  <Typewriter
                    words={['Welcome to Agentic UI', 'Build AI Interfaces', 'Stream Text in Real-time', 'Manage Multiple Agents']}
                    speed={100}
                    deleteSpeed={50}
                    delayBetweenWords={2000}
                  />
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Streaming Text:</p>
                  <StreamingText
                    text="This text appears character by character, simulating real-time AI responses!"
                    speed={50}
                    showCursor={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === 'conversation' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Conversation Components</h2>
              <p className="text-muted-foreground mb-6">
                Components for building chat interfaces with support for different message types, timestamps, and avatars.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Individual Messages</h3>
                <div className="border rounded-lg p-4 bg-card space-y-4">
                  <ChatMessage
                    message={{
                      id: '1',
                      role: 'user',
                      content: 'Hello! How are you doing?',
                      timestamp: new Date(),
                    }}
                    showTimestamp={true}
                  />
                  <ChatMessage
                    message={{
                      id: '2',
                      role: 'assistant',
                      content: "I'm doing great! Thanks for asking. How can I help you today?",
                      timestamp: new Date(),
                    }}
                    showTimestamp={true}
                  />
                  <ChatMessage
                    message={{
                      id: '3',
                      role: 'system',
                      content: 'System message example',
                      timestamp: new Date(),
                    }}
                    showTimestamp={true}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Message List with Input</h3>
                <div className="border rounded-lg bg-card flex flex-col h-96">
                  <MessageList
                    messages={messages}
                    showAvatars={true}
                    showTimestamps={true}
                    className="flex-1"
                  />
                  <ChatInput
                    onSendMessage={(msg) => console.log('Sent:', msg)}
                    placeholder="Type a message..."
                    showAttachments={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === 'agents' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Agent Management</h2>
              <p className="text-muted-foreground mb-6">
                Components for managing and displaying AI agents with different statuses and capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Agent Selector</h3>
                <AgentSelector
                  agents={agents}
                  selectedAgent={selectedAgent}
                  onSelectAgent={setSelectedAgent}
                />
                
                <h3 className="text-lg font-medium">Selected Agent Card</h3>
                <AgentCard
                  agent={selectedAgent}
                  showCapabilities={true}
                  showStatus={true}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Agent Grid</h3>
                <AgentGrid
                  agents={agents}
                  selectedAgent={selectedAgent}
                  onSelectAgent={setSelectedAgent}
                  columns={1}
                  showCapabilities={true}
                  showStatus={true}
                />
              </div>
            </div>
          </div>
        )}

        {currentSection === 'streaming' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Streaming & Animation</h2>
              <p className="text-muted-foreground mb-6">
                Text streaming effects and animations for real-time AI responses.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="border rounded-lg p-6 bg-card">
                  <h3 className="text-lg font-medium mb-4">Streaming Text</h3>
                  <StreamingText
                    text="This is an example of streaming text that appears character by character, just like a real AI response!"
                    speed={50}
                    showCursor={true}
                  />
                </div>

                <div className="border rounded-lg p-6 bg-card">
                  <h3 className="text-lg font-medium mb-4">Typewriter Effect</h3>
                  <Typewriter
                    words={['AI Assistant', 'Chat Interface', 'Smart Responses', 'Real-time Streaming']}
                    speed={100}
                    deleteSpeed={50}
                    delayBetweenWords={2000}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="border rounded-lg p-6 bg-card">
                  <h3 className="text-lg font-medium mb-4">Typing Indicator</h3>
                  <div className="flex items-center gap-3">
                    <TypingIndicator />
                    <span className="text-sm text-muted-foreground">AI is typing...</span>
                  </div>
                </div>

                <div className="border rounded-lg p-6 bg-card">
                  <h3 className="text-lg font-medium mb-4">Thinking Animation</h3>
                  <ThinkingAnimation message="Processing your request..." />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSection === 'loading' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Loading States</h2>
              <p className="text-muted-foreground mb-6">
                Various loading indicators and skeleton screens for better user experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6 bg-card space-y-4">
                <h3 className="text-lg font-medium">Message Skeletons</h3>
                <MessageSkeleton role="assistant" />
                <MessageSkeleton role="user" />
              </div>

              <div className="border rounded-lg p-6 bg-card space-y-4">
                <h3 className="text-lg font-medium">Thinking Animation</h3>
                <ThinkingAnimation />
                <ThinkingAnimation message="Analyzing code..." />
              </div>

              <div className="border rounded-lg p-6 bg-card space-y-4">
                <h3 className="text-lg font-medium">Loading Indicators</h3>
                <div className="flex items-center gap-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                </div>
                <TypingIndicator />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const FullShowcase: StoryObj = {
  render: () => <ComponentShowcase />,
  name: 'Complete Component Showcase',
}
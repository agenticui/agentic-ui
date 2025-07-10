import React, { useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'
import { Message } from '../../types'
import { ChatMessage } from './ChatMessage'

interface MessageListProps {
  messages: Message[]
  className?: string
  showAvatars?: boolean
  showTimestamps?: boolean
  autoScroll?: boolean
  emptyState?: React.ReactNode
}

export function MessageList({
  messages,
  className,
  showAvatars = true,
  showTimestamps = false,
  autoScroll = true,
  emptyState,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, autoScroll])

  if (messages.length === 0) {
    return (
      <div className={cn(
        'flex-1 flex items-center justify-center p-8',
        className
      )}>
        {emptyState || (
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Start a conversation to see messages here</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100',
        className
      )}
    >
      <div className="flex flex-col gap-4 p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            showAvatar={showAvatars}
            showTimestamp={showTimestamps}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
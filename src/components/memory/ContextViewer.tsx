import { useState } from 'react'
import { ChevronDown, ChevronRight, Eye, EyeOff, Clock, Hash } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'

interface ContextItem {
  id: string
  type: 'conversation' | 'document' | 'memory' | 'system'
  title: string
  content: string
  timestamp: Date
  tokens?: number
  relevance?: number
  metadata?: Record<string, any>
}

interface ContextViewerProps {
  contexts: ContextItem[]
  className?: string
  maxHeight?: string
  showTokenCount?: boolean
  showRelevance?: boolean
  collapsible?: boolean
  onContextToggle?: (contextId: string, visible: boolean) => void
}

export function ContextViewer({
  contexts,
  className,
  maxHeight = '400px',
  showTokenCount = true,
  showRelevance = true,
  collapsible = true,
  onContextToggle,
}: ContextViewerProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const toggleVisibility = (id: string) => {
    const newHidden = new Set(hiddenItems)
    const isCurrentlyHidden = newHidden.has(id)
    
    if (isCurrentlyHidden) {
      newHidden.delete(id)
    } else {
      newHidden.add(id)
    }
    
    setHiddenItems(newHidden)
    onContextToggle?.(id, isCurrentlyHidden)
  }

  const getTypeIcon = (type: ContextItem['type']) => {
    switch (type) {
      case 'conversation':
        return '💬'
      case 'document':
        return '📄'
      case 'memory':
        return '🧠'
      case 'system':
        return '⚙️'
      default:
        return '📝'
    }
  }

  const getTypeColor = (type: ContextItem['type']) => {
    switch (type) {
      case 'conversation':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'document':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'memory':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'system':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date)
  }

  const totalTokens = contexts.reduce((sum, context) => sum + (context.tokens || 0), 0)
  const visibleContexts = contexts.filter(context => !hiddenItems.has(context.id))

  return (
    <div className={cn('border rounded-lg bg-card', className)}>
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            <h3 className="font-semibold">Active Context</h3>
            <Badge variant="secondary" className="text-xs">
              {visibleContexts.length} items
            </Badge>
          </div>
          {showTokenCount && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{totalTokens.toLocaleString()} tokens</span>
            </div>
          )}
        </div>
      </div>

      {/* Context Items */}
      <div className="overflow-y-auto" style={{ maxHeight }}>
        {contexts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Hash className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No context items available</p>
          </div>
        ) : (
          <div className="divide-y">
            {contexts.map((context) => {
              const isExpanded = expandedItems.has(context.id)
              const isHidden = hiddenItems.has(context.id)

              return (
                <div
                  key={context.id}
                  className={cn(
                    'p-4 transition-opacity',
                    isHidden && 'opacity-50'
                  )}
                >
                  {/* Item Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      {collapsible && (
                        <button
                          onClick={() => toggleExpanded(context.id)}
                          className="p-0.5 hover:bg-muted rounded"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                      )}

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{getTypeIcon(context.type)}</span>
                          <span className="font-medium text-sm">{context.title}</span>
                          <Badge
                            variant="outline"
                            className={cn('text-xs', getTypeColor(context.type))}
                          >
                            {context.type}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTimestamp(context.timestamp)}
                          </div>
                          {showTokenCount && context.tokens && (
                            <span>{context.tokens} tokens</span>
                          )}
                          {showRelevance && context.relevance && (
                            <span>
                              {Math.round(context.relevance * 100)}% relevant
                            </span>
                          )}
                        </div>

                        {/* Content Preview */}
                        {!isExpanded && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {context.content}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleVisibility(context.id)}
                        className="p-1 hover:bg-muted rounded transition-colors"
                        title={isHidden ? 'Show in context' : 'Hide from context'}
                      >
                        {isHidden ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-3 ml-7">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                          {context.content}
                        </pre>
                      </div>

                      {/* Metadata */}
                      {context.metadata && Object.keys(context.metadata).length > 0 && (
                        <div className="mt-3">
                          <h4 className="text-xs font-medium text-muted-foreground mb-2">
                            Metadata
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(context.metadata).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-muted-foreground">{key}:</span>
                                <span className="font-mono">
                                  {typeof value === 'object' 
                                    ? JSON.stringify(value) 
                                    : String(value)
                                  }
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {contexts.length > 0 && (
        <div className="border-t p-3 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {visibleContexts.length} of {contexts.length} contexts active
            </span>
            {showTokenCount && (
              <span>
                {totalTokens.toLocaleString()} total tokens
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
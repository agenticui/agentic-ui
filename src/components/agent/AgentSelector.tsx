import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Agent } from '../../types'

interface AgentSelectorProps {
  agents: Agent[]
  selectedAgent?: Agent
  onSelectAgent: (agent: Agent) => void
  className?: string
  placeholder?: string
  disabled?: boolean
}

export function AgentSelector({
  agents,
  selectedAgent,
  onSelectAgent,
  className,
  placeholder = 'Select an agent...',
  disabled = false,
}: AgentSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (agent: Agent) => {
    onSelectAgent(agent)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background',
          'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isOpen && 'ring-2 ring-ring ring-offset-2'
        )}
      >
        <div className="flex items-center gap-2">
          {selectedAgent ? (
            <>
              {selectedAgent.avatar ? (
                <img
                  src={selectedAgent.avatar}
                  alt={selectedAgent.name}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-semibold">
                  {selectedAgent.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="truncate">{selectedAgent.name}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-popover p-1 shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => handleSelect(agent)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground',
                  'focus:outline-none focus:bg-accent focus:text-accent-foreground',
                  selectedAgent?.id === agent.id && 'bg-accent text-accent-foreground'
                )}
              >
                {agent.avatar ? (
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-semibold">
                    {agent.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 text-left">
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {agent.description}
                  </div>
                </div>
                {selectedAgent?.id === agent.id && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
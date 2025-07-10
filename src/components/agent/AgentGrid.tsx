import { cn } from '../../lib/utils'
import { Agent } from '../../types'
import { AgentCard } from './AgentCard'

interface AgentGridProps {
  agents: Agent[]
  selectedAgent?: Agent
  onSelectAgent?: (agent: Agent) => void
  className?: string
  columns?: 1 | 2 | 3 | 4
  showCapabilities?: boolean
  showStatus?: boolean
  emptyState?: React.ReactNode
}

export function AgentGrid({
  agents,
  selectedAgent,
  onSelectAgent,
  className,
  columns = 2,
  showCapabilities = true,
  showStatus = true,
  emptyState,
}: AgentGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  if (agents.length === 0) {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        {emptyState || (
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-medium">No agents available</p>
            <p className="text-sm">Add some agents to get started</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('grid gap-4', gridClasses[columns], className)}>
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onClick={onSelectAgent}
          showCapabilities={showCapabilities}
          showStatus={showStatus}
          className={cn(
            selectedAgent?.id === agent.id && 'ring-2 ring-primary ring-offset-2'
          )}
        />
      ))}
    </div>
  )
}
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Agent } from '../../types'
import { Badge } from '../ui/Badge'

const agentCardVariants = cva(
  'group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md',
  {
    variants: {
      variant: {
        default: 'hover:border-primary/50',
        compact: 'p-3',
        detailed: 'p-6',
      },
      status: {
        online: 'border-green-200 bg-green-50/50',
        offline: 'border-gray-200 bg-gray-50/50',
        thinking: 'border-yellow-200 bg-yellow-50/50',
        busy: 'border-red-200 bg-red-50/50',
      },
    },
    defaultVariants: {
      variant: 'default',
      status: 'offline',
    },
  }
)

const statusIndicatorVariants = cva(
  'absolute top-2 right-2 h-3 w-3 rounded-full',
  {
    variants: {
      status: {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        thinking: 'bg-yellow-500 animate-pulse',
        busy: 'bg-red-500',
      },
    },
    defaultVariants: {
      status: 'offline',
    },
  }
)

interface AgentCardProps extends VariantProps<typeof agentCardVariants> {
  agent: Agent
  className?: string
  onClick?: (agent: Agent) => void
  showCapabilities?: boolean
  showStatus?: boolean
}

export function AgentCard({
  agent,
  variant,
  status = agent.status,
  className,
  onClick,
  showCapabilities = true,
  showStatus = true,
  ...props
}: AgentCardProps) {
  const handleClick = () => {
    onClick?.(agent)
  }

  return (
    <div
      className={cn(
        agentCardVariants({ variant, status }),
        onClick && 'cursor-pointer',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {showStatus && (
        <div className={statusIndicatorVariants({ status })} />
      )}
      
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {agent.avatar ? (
            <img
              src={agent.avatar}
              alt={agent.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              {agent.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-foreground truncate">
              {agent.name}
            </h3>
            {showStatus && (
              <Badge variant={status === 'online' ? 'default' : 'secondary'} className="text-xs">
                {status}
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {agent.description}
          </p>
          
          {showCapabilities && agent.capabilities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {agent.capabilities.slice(0, 3).map((capability, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {capability}
                </Badge>
              ))}
              {agent.capabilities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{agent.capabilities.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
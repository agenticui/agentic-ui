import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Message } from '../../types'

const chatMessageVariants = cva(
  'flex w-full gap-3 p-4 rounded-lg transition-colors',
  {
    variants: {
      role: {
        user: 'bg-primary/10 ml-auto max-w-[80%] flex-row-reverse',
        assistant: 'bg-muted/50 mr-auto max-w-[80%]',
        system: 'bg-yellow-50 border border-yellow-200 mx-auto max-w-[60%] text-sm text-yellow-800',
      },
    },
    defaultVariants: {
      role: 'assistant',
    },
  }
)

const avatarVariants = cva(
  'rounded-full flex items-center justify-center font-semibold text-white shrink-0',
  {
    variants: {
      role: {
        user: 'bg-primary w-8 h-8 text-sm',
        assistant: 'bg-gradient-to-br from-purple-500 to-pink-500 w-8 h-8 text-sm',
        system: 'bg-yellow-500 w-6 h-6 text-xs',
      },
    },
    defaultVariants: {
      role: 'assistant',
    },
  }
)

interface ChatMessageProps extends VariantProps<typeof chatMessageVariants> {
  message: Message
  className?: string
  showAvatar?: boolean
  showTimestamp?: boolean
}

export function ChatMessage({ 
  message, 
  role = message.role, 
  className,
  showAvatar = true,
  showTimestamp = false,
  ...props 
}: ChatMessageProps) {
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getInitials = (role: string) => {
    switch (role) {
      case 'user':
        return 'U'
      case 'assistant':
        return 'AI'
      case 'system':
        return 'S'
      default:
        return 'AI'
    }
  }

  return (
    <div
      className={cn(chatMessageVariants({ role }), className)}
      {...props}
    >
      {showAvatar && (
        <div className={avatarVariants({ role })}>
          {getInitials(message.role)}
        </div>
      )}
      <div className="flex flex-col gap-1 min-w-0">
        <div className="prose prose-sm max-w-none break-words">
          <p className="m-0 leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        {showTimestamp && (
          <time className="text-xs text-muted-foreground">
            {formatTimestamp(message.timestamp)}
          </time>
        )}
      </div>
    </div>
  )
}
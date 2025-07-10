import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        success:
          'bg-green-500 text-white hover:bg-green-600',
        warning:
          'bg-yellow-500 text-white hover:bg-yellow-600',
        info:
          'bg-blue-500 text-white hover:bg-blue-600',
        // Subtle variants for ChatInput usage
        'blue-subtle':
          'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100',
        'green-subtle':
          'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100',
        'purple-subtle':
          'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100',
        'orange-subtle':
          'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100',
        'gray-subtle':
          'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean
  onRemove?: () => void
}

function Badge({ className, variant, size, removable, onRemove, children, ...props }: BadgeProps) {
  // Get variant-specific hover styles for the remove button
  const getRemoveButtonHover = () => {
    switch (variant) {
      case 'blue-subtle':
        return 'hover:bg-blue-200/60 hover:text-blue-800'
      case 'green-subtle':
        return 'hover:bg-green-200/60 hover:text-green-800'
      case 'purple-subtle':
        return 'hover:bg-purple-200/60 hover:text-purple-800'
      case 'orange-subtle':
        return 'hover:bg-orange-200/60 hover:text-orange-800'
      case 'gray-subtle':
        return 'hover:bg-gray-200/60 hover:text-gray-800'
      case 'success':
        return 'hover:bg-green-700 hover:text-white'
      case 'warning':
        return 'hover:bg-yellow-700 hover:text-white'
      case 'info':
        return 'hover:bg-blue-700 hover:text-white'
      case 'destructive':
        return 'hover:bg-red-700 hover:text-white'
      case 'secondary':
        return 'hover:bg-secondary/60'
      case 'outline':
        return 'hover:bg-accent hover:text-accent-foreground'
      default:
        return 'hover:bg-primary/20'
    }
  }

  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className={cn(
            "ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-current",
            getRemoveButtonHover()
          )}
          type="button"
          aria-label="Remove"
        >
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  )
}

export { Badge, badgeVariants }
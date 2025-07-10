import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { Settings } from 'lucide-react'

const toolsButtonVariants = cva(
  'border rounded-full transition-all duration-200 flex items-center justify-center gap-2',
  {
    variants: {
      variant: {
        default: 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-400',
        active: 'text-blue-600 border-blue-200 bg-blue-50',
        success: 'text-green-600 border-green-200 bg-green-50',
        warning: 'text-yellow-600 border-yellow-200 bg-yellow-50',
        danger: 'text-red-600 border-red-200 bg-red-50',
        ghost: 'border-transparent hover:border-gray-200 hover:bg-gray-50',
        outline: 'bg-transparent border-gray-300 hover:bg-gray-50',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
    },
  }
)

interface ToolsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toolsButtonVariants> {
  icon?: React.ReactNode
  label?: string
  isActive?: boolean
  onToggle?: () => void
  loading?: boolean
  iconPosition?: 'left' | 'right'
  count?: number
  showCount?: boolean
}

export function ToolsButton({
  className,
  variant,
  size,
  fullWidth,
  icon = <Settings className="w-4 h-4" />,
  label = "Tools",
  isActive = false,
  onToggle,
  disabled,
  loading = false,
  iconPosition = 'left',
  count,
  showCount = true,
  ...props
}: ToolsButtonProps) {
  const buttonVariant = isActive ? 'active' : variant || 'default'
  
  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
  
  const renderIcon = () => {
    if (loading) {
      return <div className={cn('animate-spin', iconSize)}>⟳</div>
    }
    if (icon) {
      return React.cloneElement(icon as React.ReactElement, { className: iconSize })
    }
    return null
  }

  const renderContent = () => {
    const iconElement = renderIcon()
    
    if (!label) {
      return iconElement
    }
    
    if (iconPosition === 'right') {
      return (
        <>
          <span>{label}</span>
          {iconElement}
        </>
      )
    }
    
    return (
      <>
        {iconElement}
        <span>{label}</span>
      </>
    )
  }

  return (
    <div className="relative group">
      <Button
        type="button"
        variant="ghost"
        className={cn(toolsButtonVariants({ variant: buttonVariant, size, fullWidth }), className)}
        onClick={onToggle}
        disabled={disabled || loading}
        {...props}
      >
        {renderContent()}
      </Button>
      {showCount && count !== undefined && count > 0 && (
        <span className={cn(
          "absolute -top-1 -right-1 rounded-full flex items-center justify-center font-medium text-xs",
          size === 'sm' ? 'w-3 h-3 text-xs' : size === 'lg' ? 'w-5 h-5 text-sm' : 'w-4 h-4 text-xs',
          "bg-blue-500 text-white"
        )}>
          {count}
        </span>
      )}
    </div>
  )
}
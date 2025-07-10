import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { Plus, Loader2, AlertCircle } from 'lucide-react'

const attachmentButtonVariants = cva(
  'rounded-full border transition-all duration-200',
  {
    variants: {
      state: {
        default: 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-400',
        uploading: 'border-blue-300 bg-blue-50 text-blue-600 cursor-not-allowed',
        error: 'border-red-300 bg-red-50 text-red-600 cursor-not-allowed',
        maxFiles: 'border-red-300 bg-red-50 text-red-600 cursor-not-allowed',
        success: 'border-green-300 bg-green-50 text-green-600',
        warning: 'border-yellow-300 bg-yellow-50 text-yellow-600',
      },
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
      variant: {
        solid: '',
        outline: 'bg-transparent',
        ghost: 'border-transparent hover:border-gray-200',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
      variant: 'solid',
    },
  }
)

interface AttachmentButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof attachmentButtonVariants> {
  isUploading?: boolean
  fileCount?: number
  maxFiles?: number
  tooltip?: string
  onFileSelect?: () => void
  showCount?: boolean
  icon?: React.ReactNode
  loadingIcon?: React.ReactNode
  errorIcon?: React.ReactNode
}

export function AttachmentButton({
  className,
  state,
  size,
  variant,
  isUploading = false,
  fileCount = 0,
  maxFiles = 10,
  tooltip,
  onFileSelect,
  disabled,
  showCount = true,
  icon = <Plus className="h-4 w-4" />,
  loadingIcon = <Loader2 className="h-4 w-4 animate-spin" />,
  errorIcon = <AlertCircle className="h-4 w-4" />,
  ...props
}: AttachmentButtonProps) {
  const buttonState = isUploading 
    ? 'uploading' 
    : fileCount >= maxFiles 
    ? 'maxFiles' 
    : state || 'default'

  const isDisabled = disabled || isUploading || fileCount >= maxFiles

  const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
  const countSize = size === 'sm' ? 'w-3 h-3 text-xs' : size === 'lg' ? 'w-5 h-5 text-sm' : 'w-4 h-4 text-xs'

  const renderIcon = () => {
    if (isUploading) {
      return React.cloneElement(loadingIcon as React.ReactElement, { className: iconSize })
    }
    if (fileCount >= maxFiles) {
      return React.cloneElement(errorIcon as React.ReactElement, { className: iconSize })
    }
    return React.cloneElement(icon as React.ReactElement, { className: iconSize })
  }

  return (
    <div className="relative group" title={tooltip}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(attachmentButtonVariants({ state: buttonState, size, variant }), className)}
        onClick={onFileSelect}
        disabled={isDisabled}
        {...props}
      >
        {renderIcon()}
      </Button>
      {showCount && fileCount > 0 && (
        <span className={cn(
          "absolute -top-1 -right-1 rounded-full flex items-center justify-center font-medium",
          countSize,
          fileCount >= maxFiles ? "bg-red-500 text-white" : "bg-blue-500 text-white"
        )}>
          {fileCount}
        </span>
      )}
    </div>
  )
}
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Upload } from 'lucide-react'

const overlayVariants = cva(
  'absolute inset-0 border-2 border-dashed z-50 flex items-center justify-center backdrop-blur-sm rounded-lg transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br from-blue-50 to-indigo-100 bg-opacity-95 border-blue-400',
        success: 'bg-gradient-to-br from-green-50 to-emerald-100 bg-opacity-95 border-green-400',
        warning: 'bg-gradient-to-br from-yellow-50 to-amber-100 bg-opacity-95 border-yellow-400',
        error: 'bg-gradient-to-br from-red-50 to-rose-100 bg-opacity-95 border-red-400',
        minimal: 'bg-gray-50 bg-opacity-90 border-gray-400',
        dark: 'bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-95 border-gray-600',
        colorful: 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 bg-opacity-95 border-purple-400',
      },
      size: {
        sm: 'rounded-md',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        full: 'rounded-none',
      },
      animation: {
        none: '',
        pulse: 'animate-pulse',
        bounce: '',
        fade: 'animate-fade-in',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      animation: 'none',
    },
  }
)

interface DragDropOverlayProps extends VariantProps<typeof overlayVariants> {
  isActive: boolean
  maxFileSize?: number
  className?: string
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  acceptedFileTypes?: string[]
  showFileInfo?: boolean
  showAnimation?: boolean
}

export function DragDropOverlay({
  isActive,
  maxFileSize,
  className,
  title = 'Drop your files here',
  subtitle = 'Supports PDF, images, and text files',
  icon = <Upload className="w-16 h-16 mx-auto mb-4" />,
  acceptedFileTypes = ['PDF', 'images', 'text files'],
  showFileInfo = true,
  showAnimation = true,
  variant = 'default',
  size = 'md',
  animation = 'none',
}: DragDropOverlayProps) {
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getTextColors = () => {
    switch (variant) {
      case 'success': return 'text-green-700 text-green-600 text-green-500'
      case 'warning': return 'text-yellow-700 text-yellow-600 text-yellow-500'
      case 'error': return 'text-red-700 text-red-600 text-red-500'
      case 'minimal': return 'text-gray-700 text-gray-600 text-gray-500'
      case 'dark': return 'text-gray-100 text-gray-200 text-gray-300'
      case 'colorful': return 'text-purple-700 text-purple-600 text-purple-500'
      default: return 'text-blue-700 text-blue-600 text-blue-500'
    }
  }

  const getBackgroundColors = () => {
    switch (variant) {
      case 'dark': return 'bg-gray-800 bg-opacity-80'
      default: return 'bg-white bg-opacity-80'
    }
  }

  const [titleColor, subtitleColor, iconColor] = getTextColors().split(' ')
  const bgColor = getBackgroundColors()

  if (!isActive) return null

  return (
    <div className={cn(overlayVariants({ variant, size, animation }), className)}>
      <div className={cn("text-center p-8 rounded-xl shadow-lg", bgColor)}>
        {showAnimation && animation === 'bounce' ? (
          <div className="animate-bounce">
            {React.isValidElement(icon) 
              ? React.cloneElement(icon as React.ReactElement<any>, { 
                  className: cn("w-16 h-16 mx-auto mb-4", iconColor)
                })
              : icon
            }
          </div>
        ) : showAnimation && animation === 'pulse' ? (
          <div className="animate-pulse">
            {React.isValidElement(icon) 
              ? React.cloneElement(icon as React.ReactElement<any>, { 
                  className: cn("w-16 h-16 mx-auto mb-4", iconColor)
                })
              : icon
            }
          </div>
        ) : (
          <div>
            {React.isValidElement(icon) 
              ? React.cloneElement(icon as React.ReactElement<any>, { 
                  className: cn("w-16 h-16 mx-auto mb-4", iconColor)
                })
              : icon
            }
          </div>
        )}
        
        <h3 className={cn("text-xl font-semibold mb-2", titleColor)}>{title}</h3>
        
        {showFileInfo && (
          <>
            <p className={cn("text-sm", subtitleColor)}>
              {subtitle || `Supports ${acceptedFileTypes.join(', ')}`}
            </p>
            {maxFileSize && (
              <p className={cn("text-xs mt-2", iconColor)}>
                Maximum {formatFileSize(maxFileSize)} per file
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
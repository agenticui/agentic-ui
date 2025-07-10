import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { X, Check, Image, FileText, FileIcon } from 'lucide-react'

const fileDisplayVariants = cva(
  'group flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-gray-50 border border-gray-200',
        success: 'bg-green-50 border border-green-200',
        error: 'bg-red-50 border border-red-200',
        uploading: 'bg-blue-50 border border-blue-200',
        warning: 'bg-yellow-50 border border-yellow-200',
        processing: 'bg-purple-50 border border-purple-200',
        outline: 'bg-transparent border border-gray-300',
        ghost: 'bg-transparent border-transparent hover:bg-gray-50',
      },
      size: {
        sm: 'px-2 py-1 text-xs gap-1',
        md: 'px-3 py-2 text-xs gap-2',
        lg: 'px-4 py-3 text-sm gap-3',
      },
      density: {
        compact: 'space-y-1',
        normal: 'space-y-2',
        relaxed: 'space-y-3',
      },
    },
    defaultVariants: {
      variant: 'success',
      size: 'md',
      density: 'normal',
    },
  }
)

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  isImage?: boolean
  uploadedAt: string
  url?: string
}

interface FileDisplayProps extends VariantProps<typeof fileDisplayVariants> {
  files: UploadedFile[]
  maxFiles?: number
  onRemoveFile?: (fileId: string) => void
  className?: string
  showTotal?: boolean
  showCount?: boolean
  layout?: 'horizontal' | 'vertical'
}

export function FileDisplay({
  files,
  maxFiles = 10,
  onRemoveFile,
  variant = 'success',
  size = 'md',
  density = 'normal',
  className,
  showTotal = true,
  showCount = true,
  layout = 'horizontal',
}: FileDisplayProps) {
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4 text-blue-500" />
    if (type.includes('pdf')) return <FileText className="w-4 h-4 text-red-500" />
    if (type.includes('text')) return <FileText className="w-4 h-4 text-gray-600" />
    return <FileIcon className="w-4 h-4 text-gray-500" />
  }

  if (files.length === 0) return null

  const getTextColor = (variant: string) => {
    switch (variant) {
      case 'success': return 'text-green-800'
      case 'error': return 'text-red-800'
      case 'uploading': return 'text-blue-800'
      case 'warning': return 'text-yellow-800'
      case 'processing': return 'text-purple-800'
      default: return 'text-gray-800'
    }
  }

  const getSubTextColor = (variant: string) => {
    switch (variant) {
      case 'success': return 'text-green-600'
      case 'error': return 'text-red-600'
      case 'uploading': return 'text-blue-600'
      case 'warning': return 'text-yellow-600'
      case 'processing': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (variant: string) => {
    switch (variant) {
      case 'success': return <Check className="w-3 h-3 text-green-500" />
      case 'error': return <X className="w-3 h-3 text-red-500" />
      case 'uploading': return <div className="w-3 h-3 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      case 'warning': return <div className="w-3 h-3 rounded-full bg-yellow-500" />
      case 'processing': return <div className="w-3 h-3 animate-pulse rounded-full bg-purple-500" />
      default: return <Check className="w-3 h-3 text-gray-500" />
    }
  }

  return (
    <div className={cn("mb-3", density && { 'space-y-1': density === 'compact', 'space-y-2': density === 'normal', 'space-y-3': density === 'relaxed' }, className)}>
      {(showCount || showTotal) && (
        <div className="flex items-center justify-between">
          {showCount && (
            <div className="text-xs text-gray-600 font-medium">
              Files ({files.length}/{maxFiles}):
            </div>
          )}
          {showTotal && (
            <div className="text-xs text-gray-500">
              Total: {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
            </div>
          )}
        </div>
      )}

      <div className={cn(
        layout === 'vertical' ? 'space-y-2' : 'flex flex-wrap gap-2'
      )}>
        {files.map((file) => (
          <div key={file.id} className={cn(fileDisplayVariants({ variant, size }))}>
            {getFileIcon(file.type)}
            <div className="flex flex-col">
              <span className={cn("font-medium truncate max-w-[120px]", getTextColor(variant))} title={file.name}>
                {file.name}
              </span>
              <span className={getSubTextColor(variant)}>
                {formatFileSize(file.size)}
              </span>
            </div>
            {getStatusIcon(variant)}
            {onRemoveFile && (
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                onClick={() => onRemoveFile(file.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
import React, { useState, useRef } from 'react'
import { Mic, ArrowUp, Square } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { toast } from 'sonner'
import {
  AttachmentButton,
  ToolsButton,
  SearchMenu,
  FileDisplay,
  SelectedItemsBadges,
  DragDropOverlay
} from '../ui'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  isImage?: boolean
  uploadedAt: string
  url?: string
}

interface Tool {
  id: string
  name: string
  description: string
  icon?: string
}

interface BusinessFunction {
  id: string
  name: string
  description: string
  icon?: string
  topic: string
}

interface ChatInputProps {
  onSendMessage: (message: string, files?: UploadedFile[], tools?: Tool[], businessFunction?: BusinessFunction) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  maxLength?: number
  showAttachment?: boolean
  showVoice?: boolean
  showTools?: boolean
  showDeepResearch?: boolean
  tools?: Tool[]
  businessFunctions?: BusinessFunction[]
  isStreaming?: boolean
  isDeepResearch?: boolean
  onDeepResearchChange?: (enabled: boolean) => void
  onAddTool?: (tool: Omit<Tool, 'id'>) => void
  onAddBusinessFunction?: (func: Omit<BusinessFunction, 'id'>) => void
  maxFiles?: number
  maxFileSize?: number
  allowedFileTypes?: string[]
  // Customization props
  toolsIcon?: React.ReactNode
  toolsLabel?: string
  deepResearchIcon?: React.ReactNode
  deepResearchLabel?: string
  attachmentAccept?: string
  attachmentTooltip?: string
  enableSlashTools?: boolean
}

export function ChatInput({
  onSendMessage,
  placeholder = "Type your message...",
  disabled = false,
  className,
  maxLength,
  showAttachment = false,
  showVoice = false,
  showTools = false,
  showDeepResearch = false,
  tools = [],
  businessFunctions = [],
  isStreaming = false,
  isDeepResearch = false,
  onDeepResearchChange,
  onAddTool,
  onAddBusinessFunction,
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'text/plain'],
  // Customization props with defaults
  toolsIcon,
  toolsLabel = "Tools",
  deepResearchIcon,
  deepResearchLabel = "Deep Research",
  attachmentAccept = ".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx",
  attachmentTooltip = "Upload files or paste images",
  enableSlashTools = true,
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedTools, setSelectedTools] = useState<Tool[]>([])
  const [selectedBusinessFunction, setSelectedBusinessFunction] = useState<BusinessFunction | null>(null)
  const [showToolMenu, setShowToolMenu] = useState(false)
  const [showFunctionMenu, setShowFunctionMenu] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [, setCursorPosition] = useState(0)
  const [selectedMenuItem, setSelectedMenuItem] = useState(0)
  const [toolsSearchTerm, setToolsSearchTerm] = useState('')
  const [functionsSearchTerm, setFunctionsSearchTerm] = useState('')
  const [triggerPosition, setTriggerPosition] = useState<{start: number, end: number} | null>(null)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toolMenuRef = useRef<HTMLDivElement>(null)
  const functionMenuRef = useRef<HTMLDivElement>(null)

  // Trigger detection functions
  const detectAtTrigger = (text: string, position: number) => {
    const beforeCursor = text.substring(0, position)
    const lastAtIndex = beforeCursor.lastIndexOf('@')
    
    if (lastAtIndex === -1) return { isTriggered: false, searchTerm: '', triggerStart: -1 }
    
    const afterAt = beforeCursor.substring(lastAtIndex + 1)
    const isValid = /^\\w*$/.test(afterAt)
    
    return {
      isTriggered: isValid,
      searchTerm: afterAt,
      triggerStart: lastAtIndex
    }
  }

  const detectSlashTrigger = (text: string, position: number) => {
    if (!enableSlashTools) return { isTriggered: false, searchTerm: '', triggerStart: -1 }
    
    const beforeCursor = text.substring(0, position)
    const lastSlashIndex = beforeCursor.lastIndexOf('/')
    
    if (lastSlashIndex === -1) return { isTriggered: false, searchTerm: '', triggerStart: -1 }
    
    const beforeSlash = beforeCursor.substring(0, lastSlashIndex)
    if (beforeSlash.length > 0 && !/\\s$/.test(beforeSlash)) return { isTriggered: false, searchTerm: '', triggerStart: -1 }
    
    const afterSlash = beforeCursor.substring(lastSlashIndex + 1)
    const isValid = /^\\w*$/.test(afterSlash)
    
    return {
      isTriggered: isValid,
      searchTerm: afterSlash,
      triggerStart: lastSlashIndex
    }
  }

  // Filter tools and functions based on search terms
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(toolsSearchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(toolsSearchTerm.toLowerCase())
  )

  const filteredBusinessFunctions = businessFunctions.filter(func =>
    func.name.toLowerCase().includes(functionsSearchTerm.toLowerCase()) ||
    func.description.toLowerCase().includes(functionsSearchTerm.toLowerCase()) ||
    func.topic.toLowerCase().includes(functionsSearchTerm.toLowerCase())
  )

  // File validation
  const validateFiles = (files: File[]): File[] => {
    const validFiles: File[] = []
    const errors: string[] = []

    files.forEach(file => {
      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File size exceeds ${formatFileSize(maxFileSize)} limit`)
        return
      }

      const isAllowedType = allowedFileTypes.some(type => file.type === type) ||
        /\\.(pdf|txt|csv|xlsx?|docx?|jpe?g|png|webp|gif|bmp|svg)$/i.test(file.name)

      if (!isAllowedType) {
        errors.push(`${file.name}: File type not supported`)
        return
      }

      validFiles.push(file)
    })

    if (errors.length > 0) {
      toast.error('File Validation Failed', {
        description: errors.join(', '),
      })
    }

    return validFiles
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // File upload logic
  const uploadFiles = async (files: File[]) => {
    setIsUploading(true)
    
    try {
      for (const file of files) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const uploadedFile: UploadedFile = {
          id: Math.random().toString(36).substring(2, 11),
          name: file.name,
          size: file.size,
          type: file.type,
          isImage: file.type.startsWith('image/'),
          uploadedAt: new Date().toISOString(),
        }
        
        setUploadedFiles(prev => [...prev, uploadedFile])
      }
    } catch (error) {
      toast.error('Upload Failed', {
        description: 'Failed to upload files. Please try again.',
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Event handlers
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      
      if (uploadedFiles.length + newFiles.length > maxFiles) {
        toast.error('File Limit Exceeded', {
          description: `Maximum ${maxFiles} files allowed.`,
        })
        return
      }

      const validFiles = validateFiles(newFiles)
      if (validFiles.length > 0) {
        uploadFiles(validFiles)
      }
    }
    e.target.value = ''
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    const newCursorPosition = e.target.selectionStart || 0
    
    setMessage(newValue)
    setCursorPosition(newCursorPosition)
    
    // Check for @ trigger
    const atTrigger = detectAtTrigger(newValue, newCursorPosition)
    if (atTrigger.isTriggered && businessFunctions.length > 0) {
      setShowFunctionMenu(true)
      setShowToolMenu(false)
      setSelectedMenuItem(0)
      setFunctionsSearchTerm(atTrigger.searchTerm)
      setTriggerPosition({ start: atTrigger.triggerStart, end: newCursorPosition })
    } else {
      setShowFunctionMenu(false)
      setFunctionsSearchTerm('')
    }
    
    // Check for / trigger for tools
    const slashTrigger = detectSlashTrigger(newValue, newCursorPosition)
    if (slashTrigger.isTriggered && tools.length > 0) {
      setShowToolMenu(true)
      setShowFunctionMenu(false)
      setSelectedMenuItem(0)
      setToolsSearchTerm(slashTrigger.searchTerm)
      setTriggerPosition({ start: slashTrigger.triggerStart, end: newCursorPosition })
    } else if (!atTrigger.isTriggered) {
      setShowToolMenu(false)
      setToolsSearchTerm('')
    }
    
    // Clear trigger position if no triggers are active
    if (!atTrigger.isTriggered && !slashTrigger.isTriggered) {
      setTriggerPosition(null)
    }
    
    // Auto-resize textarea
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const maxHeight = 7 * 24
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px'
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled && !isUploading) {
      onSendMessage(message.trim(), uploadedFiles, selectedTools, selectedBusinessFunction || undefined)
      setMessage('')
      setUploadedFiles([])
      setSelectedTools([])
      setSelectedBusinessFunction(null)
      resetTextareaHeight()
    }
  }

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX
      const y = e.clientY

      if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
        setDragActive(false)
      }
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files)
      
      if (uploadedFiles.length + files.length > maxFiles) {
        toast.error('File Limit Exceeded', {
          description: `Maximum ${maxFiles} files allowed.`,
        })
        return
      }

      const validFiles = validateFiles(files)
      if (validFiles.length > 0) {
        uploadFiles(validFiles)
      }
    }
  }

  return (
    <div 
      className={cn("w-full relative", className)}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <DragDropOverlay isActive={dragActive} maxFileSize={maxFileSize} />
      
      <FileDisplay 
        files={uploadedFiles}
        maxFiles={maxFiles}
        onRemoveFile={(fileId) => setUploadedFiles(prev => prev.filter(f => f.id !== fileId))}
      />

      <form onSubmit={handleSubmit}>
        <div className="w-full bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm space-y-3 relative">
          <SelectedItemsBadges
            tools={selectedTools}
            businessFunction={selectedBusinessFunction}
            toolsIcon={toolsIcon}
            onRemoveTool={(tool) => setSelectedTools(prev => prev.filter(t => t.id !== tool.id))}
            onRemoveFunction={() => setSelectedBusinessFunction(null)}
          />

          <div className="w-full">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              rows={2}
              placeholder={isDeepResearch ? `${deepResearchLabel}: Comprehensive analysis on your topic` : placeholder}
              className="w-full bg-transparent resize-none outline-none text-sm leading-6 placeholder:text-gray-500 max-h-[168px] overflow-auto"
              disabled={disabled || isUploading}
            />

            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                {showAttachment && (
                  <AttachmentButton
                    isUploading={isUploading}
                    fileCount={uploadedFiles.length}
                    maxFiles={maxFiles}
                    tooltip={attachmentTooltip}
                    onFileSelect={() => fileInputRef.current?.click()}
                  />
                )}

                {showTools && (
                  <ToolsButton
                    icon={toolsIcon}
                    label={toolsLabel}
                    isActive={showToolMenu}
                    onToggle={() => {
                      setShowToolMenu(!showToolMenu)
                      setShowFunctionMenu(false)
                      setSelectedMenuItem(0)
                      setToolsSearchTerm('')
                      setFunctionsSearchTerm('')
                      setTriggerPosition(null)
                    }}
                    disabled={disabled}
                  />
                )}

                {showDeepResearch && (
                  <ToolsButton
                    icon={deepResearchIcon}
                    label={deepResearchLabel}
                    isActive={isDeepResearch}
                    onToggle={() => onDeepResearchChange?.(!isDeepResearch)}
                    disabled={disabled}
                  />
                )}

                {showVoice && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full border border-gray-200"
                    disabled={disabled}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Button
                type="submit"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full transition-all duration-200",
                  isUploading 
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800 hover:shadow-lg"
                )}
                disabled={!message.trim() || disabled || isUploading}
              >
                {isStreaming ? (
                  <Square className="h-4 w-4 text-white" />
                ) : (
                  <ArrowUp className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={attachmentAccept}
            onChange={handleFileInputChange}
            className="hidden"
          />

          {showToolMenu && (
            <SearchMenu
              ref={toolMenuRef}
              type="tools"
              items={filteredTools}
              selectedItems={selectedTools.map(t => t.id)}
              highlightedIndex={selectedMenuItem}
              searchTerm={toolsSearchTerm}
              onItemSelect={(item) => {
                const tool = item as Tool
                if (triggerPosition && showToolMenu) {
                  const newText = message.substring(0, triggerPosition.start) + 
                                 message.substring(triggerPosition.end)
                  setMessage(newText)
                  
                  setTimeout(() => {
                    if (textareaRef.current) {
                      textareaRef.current.setSelectionRange(triggerPosition.start, triggerPosition.start)
                    }
                  }, 0)
                }
                
                setSelectedTools(prev => {
                  const exists = prev.find(t => t.id === tool.id)
                  if (exists) {
                    return prev.filter(t => t.id !== tool.id)
                  }
                  return [...prev, tool]
                })
                setShowToolMenu(false)
                setSelectedMenuItem(0)
                setToolsSearchTerm('')
                setTriggerPosition(null)
              }}
              onAddNew={onAddTool ? () => {
                const name = prompt('Tool name:')
                const description = prompt('Tool description:')
                if (name && description) {
                  onAddTool({ name, description })
                }
              } : undefined}
              icon={toolsIcon}
            />
          )}

          {showFunctionMenu && (
            <SearchMenu
              ref={functionMenuRef}
              type="functions"
              items={filteredBusinessFunctions}
              selectedItems={selectedBusinessFunction ? [selectedBusinessFunction.id] : []}
              highlightedIndex={selectedMenuItem}
              searchTerm={functionsSearchTerm}
              onItemSelect={(item) => {
                const func = item as BusinessFunction
                if (triggerPosition && showFunctionMenu) {
                  const newText = message.substring(0, triggerPosition.start) + 
                                 message.substring(triggerPosition.end)
                  setMessage(newText)
                  
                  setTimeout(() => {
                    if (textareaRef.current) {
                      textareaRef.current.setSelectionRange(triggerPosition.start, triggerPosition.start)
                    }
                  }, 0)
                }
                
                setSelectedBusinessFunction(func)
                setShowFunctionMenu(false)
                setSelectedMenuItem(0)
                setFunctionsSearchTerm('')
                setTriggerPosition(null)
              }}
              onAddNew={onAddBusinessFunction ? () => {
                const name = prompt('Function name:')
                const description = prompt('Function description:')
                const topic = prompt('Function topic:')
                if (name && description && topic) {
                  onAddBusinessFunction({ name, description, topic })
                }
              } : undefined}
            />
          )}
        </div>
      </form>

      {maxLength && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-muted-foreground">
            {message.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  )
}
import React, { useState, useRef, useEffect } from 'react'
import { 
  Mic, 
  FileText, 
  Settings,
  Briefcase,
  ArrowUp,
  Square
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { AttachmentButton } from '../ui/AttachmentButton'
import { DragDropOverlay } from '../ui/DragDropOverlay'
import { FileDisplay } from '../ui/FileDisplay'
import { SearchMenu } from '../ui/SearchMenu'
import { SelectedItemsBadges } from '../ui/SelectedItemsBadges'
import { ToolsButton } from '../ui/ToolsButton'
import { toast } from 'sonner'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  isImage?: boolean
  uploadedAt: string
  url?: string
}

interface FileUploadProgress {
  progress: number
  isUploading: boolean
  error?: string
}

interface FileUploadResult {
  success: boolean
  file?: UploadedFile
  error?: string
}

interface FileUploadHandlers {
  onUpload?: (file: File) => Promise<FileUploadResult>
  onRemove?: (fileId: string) => Promise<{ success: boolean; error?: string }>
  onProgress?: (fileId: string, progress: FileUploadProgress) => void
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
  onSendMessage: (message: string, files?: UploadedFile[], tools?: Tool[], businessFunction?: BusinessFunction, isDeepResearch?: boolean) => void
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
  // File upload handlers
  fileUploadHandlers?: FileUploadHandlers
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
  // File upload handlers
  fileUploadHandlers,
  // Customization props with defaults
  toolsIcon = <Settings className="w-4 h-4" />,
  toolsLabel = "Tools",
  deepResearchIcon = <FileText className="w-4 h-4" />,
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

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }


  // Validate files
  const validateFiles = (files: File[]): File[] => {
    const validFiles: File[] = []
    const errors: string[] = []

    files.forEach(file => {
      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File size exceeds ${formatFileSize(maxFileSize)} limit`)
        return
      }

      const isAllowedType = allowedFileTypes.some(type => file.type === type) ||
        /\.(pdf|txt|csv|xlsx?|docx?|jpe?g|png|webp|gif|bmp|svg)$/i.test(file.name)

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

  // Handle file input change
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

  // Upload files - uses custom handler if provided, otherwise fallback to mock
  const uploadFiles = async (files: File[]) => {
    setIsUploading(true)
    
    try {
      if (fileUploadHandlers?.onUpload) {
        // Use custom upload handler
        for (const file of files) {
          const result = await fileUploadHandlers.onUpload(file)
          
          if (result.success && result.file) {
            setUploadedFiles(prev => [...prev, result.file!])
          } else {
            toast.error('Upload Failed', {
              description: result.error || `Failed to upload ${file.name}`,
            })
          }
        }
      } else {
        // Fallback to mock implementation
        for (const file of files) {
          await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate upload time
          
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
      }
      
      // Files uploaded successfully - no toast needed
    } catch (error) {
      toast.error('Upload Failed', {
        description: 'Failed to upload files. Please try again.',
      })
    } finally {
      setIsUploading(false)
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

  // Handle paste
  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    const files: File[] = []
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile()
        if (file) {
          files.push(file)
        }
      }
    }

    if (files.length > 0) {
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

  // Remove file - uses custom handler if provided, otherwise fallback to local removal
  const removeFile = async (fileId: string) => {
    try {
      if (fileUploadHandlers?.onRemove) {
        // Use custom remove handler
        const result = await fileUploadHandlers.onRemove(fileId)
        
        if (result.success) {
          setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
        } else {
          toast.error('Error removing file', {
            description: result.error || 'Failed to remove file from server',
          })
        }
      } else {
        // Fallback to local removal
        setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
      }
    } catch (error) {
      toast.error('Error removing file')
    }
  }

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled && !isUploading) {
      onSendMessage(message.trim(), uploadedFiles, selectedTools, selectedBusinessFunction || undefined, isDeepResearch)
      setMessage('')
      setUploadedFiles([])
      setSelectedTools([])
      setSelectedBusinessFunction(null)
      resetTextareaHeight()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle menu navigation if any menu is open
    if (showToolMenu || showFunctionMenu) {
      if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
        handleMenuKeyDown(e, showToolMenu ? 'tools' : 'functions')
        return
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
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

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  // Handle tool selection
  const handleToolSelect = (tool: Tool) => {
    // Remove trigger and replace with tool name if triggered via slash
    if (triggerPosition && showToolMenu) {
      const newText = message.substring(0, triggerPosition.start) + 
                     message.substring(triggerPosition.end)
      setMessage(newText)
      
      // Update cursor position
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
  }

  // Handle tools menu open
  const handleToolsMenuOpen = () => {
    setShowToolMenu(!showToolMenu)
    setShowFunctionMenu(false)
    setSelectedMenuItem(0)
    setToolsSearchTerm('')
    setFunctionsSearchTerm('')
    setTriggerPosition(null)
  }

  // Handle function selection
  const handleFunctionSelect = (func: BusinessFunction | null) => {
    // Remove trigger and replace with function name if triggered via @
    if (triggerPosition && showFunctionMenu && func) {
      const newText = message.substring(0, triggerPosition.start) + 
                     message.substring(triggerPosition.end)
      setMessage(newText)
      
      // Update cursor position
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
  }

  // Wrapper for SearchMenu function selection
  const handleSearchMenuFunctionSelect = (item: Tool | BusinessFunction) => {
    handleFunctionSelect(item as BusinessFunction)
  }

  // Wrapper for onAddNew handlers
  const handleAddTool = () => {
    if (onAddTool) {
      const name = prompt('Tool name:')
      const description = prompt('Tool description:')
      if (name && description) {
        onAddTool({ name, description })
      }
    }
  }

  const handleAddBusinessFunction = () => {
    if (onAddBusinessFunction) {
      const name = prompt('Function name:')
      const description = prompt('Function description:')
      const topic = prompt('Function topic:')
      if (name && description && topic) {
        onAddBusinessFunction({ name, description, topic })
      }
    }
  }

  // Filter tools based on search term
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(toolsSearchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(toolsSearchTerm.toLowerCase())
  )

  // Filter business functions based on search term
  const filteredBusinessFunctions = businessFunctions.filter(func =>
    func.name.toLowerCase().includes(functionsSearchTerm.toLowerCase()) ||
    func.description.toLowerCase().includes(functionsSearchTerm.toLowerCase()) ||
    func.topic.toLowerCase().includes(functionsSearchTerm.toLowerCase())
  )


  // Detect @ trigger for business functions
  const detectAtTrigger = (text: string, position: number) => {
    const beforeCursor = text.substring(0, position)
    const lastAtIndex = beforeCursor.lastIndexOf('@')
    
    if (lastAtIndex === -1) return { isTriggered: false, searchTerm: '', triggerStart: -1 }
    
    const afterAt = beforeCursor.substring(lastAtIndex + 1)
    // Check if there's only word characters after @
    const isValid = /^\w*$/.test(afterAt)
    
    return {
      isTriggered: isValid,
      searchTerm: afterAt,
      triggerStart: lastAtIndex
    }
  }

  // Detect / trigger for tools
  const detectSlashTrigger = (text: string, position: number) => {
    if (!enableSlashTools) return { isTriggered: false, searchTerm: '', triggerStart: -1 }
    
    const beforeCursor = text.substring(0, position)
    const lastSlashIndex = beforeCursor.lastIndexOf('/')
    
    if (lastSlashIndex === -1) return { isTriggered: false, searchTerm: '', triggerStart: -1 }
    
    // Check if slash is at start or after whitespace
    const beforeSlash = beforeCursor.substring(0, lastSlashIndex)
    if (beforeSlash.length > 0 && !/\s$/.test(beforeSlash)) return { isTriggered: false, searchTerm: '', triggerStart: -1 }
    
    const afterSlash = beforeCursor.substring(lastSlashIndex + 1)
    // Check if there's only word characters after /
    const isValid = /^\w*$/.test(afterSlash)
    
    return {
      isTriggered: isValid,
      searchTerm: afterSlash,
      triggerStart: lastSlashIndex
    }
  }


  // Handle keyboard navigation in menus
  const handleMenuKeyDown = (e: React.KeyboardEvent, menuType: 'tools' | 'functions') => {
    const currentMenu = menuType === 'tools' ? filteredTools : filteredBusinessFunctions
    const maxIndex = currentMenu.length - 1

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedMenuItem(prev => (prev < maxIndex ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedMenuItem(prev => (prev > 0 ? prev - 1 : maxIndex))
        break
      case 'Enter':
        e.preventDefault()
        if (menuType === 'tools') {
          handleToolSelect(currentMenu[selectedMenuItem] as Tool)
        } else {
          handleFunctionSelect(currentMenu[selectedMenuItem] as BusinessFunction)
        }
        break
      case 'Escape':
        e.preventDefault()
        setShowToolMenu(false)
        setShowFunctionMenu(false)
        setSelectedMenuItem(0)
        break
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = `${Math.min(scrollHeight, 168)}px` // Max 7 lines
    }
  }, [message])

  // Auto-collapse when message is cleared
  useEffect(() => {
    if (message.length === 0 && textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }, [message])

  return (
    <div 
      className={cn("w-full relative", className)}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      <DragDropOverlay
        isActive={dragActive}
        maxFileSize={maxFileSize}
        acceptedFileTypes={allowedFileTypes}
        title="Drop your files here"
        subtitle={`Maximum ${formatFileSize(maxFileSize)} per file`}
        variant="default"
        showFileInfo={true}
        showAnimation={true}
      />

      {/* File display */}
      {uploadedFiles.length > 0 && (
        <FileDisplay
          files={uploadedFiles}
          onRemoveFile={removeFile}
          maxFiles={maxFiles}
          showTotal={true}
          showCount={true}
          variant="success"
          size="md"
          className="mb-3"
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="w-full bg-white border border-gray-200 rounded-3xl px-5 py-4 shadow-sm space-y-3 relative">
          {/* Selected tools and functions */}
          {(selectedTools.length > 0 || selectedBusinessFunction) && (
            <SelectedItemsBadges
              tools={selectedTools}
              businessFunction={selectedBusinessFunction}
              onRemoveTool={handleToolSelect}
              onRemoveFunction={() => handleFunctionSelect(null)}
              toolsIcon={toolsIcon}
              className="flex flex-wrap gap-2"
            />
          )}

          <div className="w-full">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              rows={2}
              placeholder={isDeepResearch ? `${deepResearchLabel}: Comprehensive analysis on your topic` : placeholder}
              className="w-full bg-transparent resize-none outline-none text-sm leading-6 placeholder:text-gray-500 max-h-[168px] overflow-auto"
              disabled={disabled || isUploading}
            />

            {/* Controls */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                {/* Upload button */}
                {showAttachment && (
                  <AttachmentButton
                    isUploading={isUploading}
                    fileCount={uploadedFiles.length}
                    maxFiles={maxFiles}
                    tooltip={attachmentTooltip}
                    onFileSelect={() => fileInputRef.current?.click()}
                    showCount={uploadedFiles.length > 0}
                    state={isUploading ? 'uploading' : uploadedFiles.length >= maxFiles ? 'maxFiles' : 'default'}
                    size="md"
                    variant="solid"
                  />
                )}

                {/* Tools button */}
                {showTools && (
                  <ToolsButton
                    icon={toolsIcon}
                    label={toolsLabel}
                    onClick={handleToolsMenuOpen}
                    disabled={disabled}
                    variant="outline"
                    size="md"
                  />
                )}

                {/* Deep Research button */}
                {showDeepResearch && (
                  <div className="relative group">
                    <Button
                      type="button"
                      variant="ghost"
                      className={cn(
                        "h-10 px-3 border border-gray-200 rounded-full text-sm transition-all duration-200",
                        isDeepResearch
                          ? "text-blue-600 border-blue-200 bg-blue-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-400"
                      )}
                      onClick={() => onDeepResearchChange?.(!isDeepResearch)}
                      disabled={disabled}
                    >
                      {deepResearchIcon}
                      <span className="ml-2">{deepResearchLabel}</span>
                    </Button>
                  </div>
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

              {/* Send button */}
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

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={attachmentAccept}
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* Tools menu */}
          {showToolMenu && (
            <SearchMenu
              ref={toolMenuRef}
              type="tools"
              items={filteredTools}
              selectedItems={selectedTools.map(t => t.id)}
              highlightedIndex={selectedMenuItem}
              onItemSelect={handleToolSelect}
              searchTerm={toolsSearchTerm}
              emptyMessage={toolsSearchTerm ? `No tools found for "${toolsSearchTerm}"` : 'No tools available'}
              onAddNew={handleAddTool}
              headerTitle="Tools"
              icon={toolsIcon}
              theme="light"
              size="md"
            />
          )}

          {/* Functions menu (triggered by @) */}
          {showFunctionMenu && (
            <SearchMenu
              ref={functionMenuRef}
              type="functions"
              items={filteredBusinessFunctions}
              selectedItems={selectedBusinessFunction ? [selectedBusinessFunction.id] : []}
              highlightedIndex={selectedMenuItem}
              onItemSelect={handleSearchMenuFunctionSelect}
              searchTerm={functionsSearchTerm}
              emptyMessage={functionsSearchTerm ? `No functions found for "${functionsSearchTerm}"` : 'No business functions available'}
              onAddNew={handleAddBusinessFunction}
              headerTitle="Business Functions"
              icon={<Briefcase className="w-4 h-4" />}
              theme="light"
              size="md"
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

// Export types for external use
export type { 
  UploadedFile, 
  FileUploadProgress, 
  FileUploadResult, 
  FileUploadHandlers,
  Tool,
  BusinessFunction,
  ChatInputProps 
}
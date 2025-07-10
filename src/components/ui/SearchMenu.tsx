import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Button } from './Button'
import { Check, Settings, Briefcase } from 'lucide-react'

const searchMenuVariants = cva(
  'absolute left-0 w-80 border rounded-xl shadow-md p-2 max-h-80 overflow-y-auto z-50 top-full mt-2',
  {
    variants: {
      theme: {
        light: 'bg-white border-gray-200',
        dark: 'bg-gray-800 border-gray-600',
        modern: 'bg-white border-gray-300 shadow-lg',
        minimal: 'bg-white border-gray-100 shadow-sm',
        colorful: 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200',
      },
      size: {
        sm: 'w-64 max-h-64',
        md: 'w-80 max-h-80',
        lg: 'w-96 max-h-96',
        xl: 'w-[28rem] max-h-[28rem]',
      },
      position: {
        bottom: 'top-full mt-2',
        top: 'bottom-full mb-2',
        left: 'right-0 left-auto',
        right: 'left-0',
      },
    },
    defaultVariants: {
      theme: 'light',
      size: 'md',
      position: 'bottom',
    },
  }
)

const menuItemVariants = cva(
  'flex items-center gap-3 p-3 cursor-pointer border-b last:border-none transition-colors rounded-md',
  {
    variants: {
      variant: {
        default: 'hover:bg-gray-100 border-gray-200',
        highlighted: 'bg-blue-50 border-blue-200',
        selected: 'bg-green-50 border-green-200',
        dark: 'hover:bg-gray-700 border-gray-600 text-white',
        darkHighlighted: 'bg-blue-900 border-blue-700 text-white',
        darkSelected: 'bg-green-900 border-green-700 text-white',
        modern: 'hover:bg-gray-50 border-gray-300',
        modernHighlighted: 'bg-blue-100 border-blue-300',
        colorful: 'hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 border-purple-200',
        colorfulHighlighted: 'bg-gradient-to-r from-blue-200 to-purple-200 border-purple-300',
      },
      type: {
        tool: '',
        function: '',
      },
      size: {
        sm: 'p-2 gap-2',
        md: 'p-3 gap-3',
        lg: 'p-4 gap-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      type: 'tool',
      size: 'md',
    },
  }
)

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

interface SearchMenuProps extends VariantProps<typeof searchMenuVariants> {
  className?: string
  type: 'tools' | 'functions'
  items: Tool[] | BusinessFunction[]
  selectedItems?: string[]
  highlightedIndex?: number
  searchTerm?: string
  onItemSelect?: (item: Tool | BusinessFunction) => void
  onAddNew?: () => void
  emptyMessage?: string
  headerTitle?: string
  icon?: React.ReactNode
  showHeader?: boolean
  itemSize?: 'sm' | 'md' | 'lg'
}

export const SearchMenu = forwardRef<HTMLDivElement, SearchMenuProps>(({
  className,
  type,
  items,
  selectedItems = [],
  highlightedIndex = 0,
  searchTerm = '',
  onItemSelect,
  onAddNew,
  emptyMessage,
  headerTitle,
  icon,
  theme = 'light',
  size = 'md',
  position = 'bottom',
  showHeader = true,
  itemSize = 'md',
}, ref: React.Ref<HTMLDivElement>) => {
  const getVariantForTheme = (isHighlighted: boolean, isSelected: boolean) => {
    if (theme === 'dark') {
      if (isSelected) return 'darkSelected'
      if (isHighlighted) return 'darkHighlighted'
      return 'dark'
    }
    if (theme === 'modern') {
      if (isHighlighted) return 'modernHighlighted'
      return 'modern'
    }
    if (theme === 'colorful') {
      if (isHighlighted) return 'colorfulHighlighted'
      return 'colorful'
    }
    // Default/light theme
    if (isSelected) return 'selected'
    if (isHighlighted) return 'highlighted'
    return 'default'
  }

  const getIconColor = () => {
    switch (theme) {
      case 'dark': return 'text-gray-300'
      case 'colorful': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  const getTextColor = () => {
    switch (theme) {
      case 'dark': return 'text-gray-200'
      default: return 'text-gray-500'
    }
  }

  const defaultIcon = type === 'tools' ? <Settings className={`w-5 h-5 ${getIconColor()} flex-shrink-0`} /> : <Briefcase className={`w-5 h-5 ${getIconColor()} flex-shrink-0`} />
  const displayIcon = icon || defaultIcon
  
  const defaultHeader = type === 'tools' ? 'Tools' : 'Business Functions (triggered by @)'
  const displayHeader = headerTitle || defaultHeader
  
  const defaultEmptyMessage = searchTerm 
    ? `No ${type} found for "${searchTerm}"`
    : `No ${type} available`
  const displayEmptyMessage = emptyMessage || defaultEmptyMessage

  const renderItems = () => {
    if (type === 'functions') {
      const functions = items as BusinessFunction[]
      const groupedFunctions = functions.reduce((acc, func) => {
        if (!acc[func.topic]) {
          acc[func.topic] = []
        }
        acc[func.topic].push(func)
        return acc
      }, {} as Record<string, BusinessFunction[]>)

      return Object.keys(groupedFunctions).map((topic) => (
        <div key={topic} className="mb-2">
          <div className="px-2 py-1 font-semibold text-gray-700 text-xs">
            {topic}
          </div>
          {groupedFunctions[topic].map((func) => {
            const globalIndex = functions.indexOf(func)
            const isHighlighted = globalIndex === highlightedIndex
            const isSelected = selectedItems?.includes(func.id) || false
            
            return (
              <div
                key={func.id}
                onClick={() => onItemSelect?.(func)}
                className={cn(
                  menuItemVariants({ 
                    variant: getVariantForTheme(isHighlighted, isSelected),
                    type: 'function',
                    size: itemSize
                  })
                )}
              >
                <Briefcase className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <div className="flex-1 flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">{func.name}</span>
                  <span className="text-xs text-gray-500">{func.description}</span>
                </div>
                {isSelected ? (
                  <div className="flex items-center justify-center rounded-full bg-green-500 p-1">
                    <Check className="w-2 h-2 text-white" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center rounded-full bg-gray-400 p-1 invisible">
                    <Check className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))
    } else {
      const tools = items as Tool[]
      return tools.map((tool, index) => {
        const isHighlighted = index === highlightedIndex
        const isSelected = selectedItems?.includes(tool.id) || false
        
        return (
          <div
            key={tool.id}
            onClick={() => onItemSelect?.(tool)}
            className={cn(
              menuItemVariants({ 
                variant: getVariantForTheme(isHighlighted, isSelected),
                type: 'tool',
                size: itemSize
              })
            )}
          >
            {React.isValidElement(displayIcon) 
              ? React.cloneElement(displayIcon as React.ReactElement<any>, { 
                  className: "w-5 h-5 text-gray-600 flex-shrink-0" 
                })
              : <Settings className="w-5 h-5 text-gray-600 flex-shrink-0" />
            }
            <div className="flex-1 flex flex-col">
              <span className="text-sm font-semibold text-gray-800">{tool.name}</span>
              <span className="text-xs text-gray-500">{tool.description}</span>
            </div>
            {isSelected ? (
              <div className="flex items-center justify-center rounded-full bg-blue-500 p-1">
                <Check className="w-2 h-2 text-white" />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-full bg-gray-400 p-1 invisible">
                <Check className="w-2 h-2 text-white" />
              </div>
            )}
          </div>
        )
      })
    }
  }

  return (
    <div ref={ref} className={cn(searchMenuVariants({ theme, size, position }), className)}>
      {showHeader && (
        <div className={cn("px-2 py-1 text-xs border-b mb-2", getTextColor())}>
          {displayHeader}{searchTerm && ` - "${searchTerm}"`}
        </div>
      )}
      {items.length > 0 ? (
        renderItems()
      ) : (
        <div className="p-4 text-center">
          <div className="text-gray-500 text-sm mb-2">
            {displayEmptyMessage}
          </div>
          {onAddNew && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAddNew}
            >
              Add {type === 'tools' ? 'Tool' : 'Function'}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
)

SearchMenu.displayName = 'SearchMenu'
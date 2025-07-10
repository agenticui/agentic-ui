import React from 'react'
import { cn } from '../../lib/utils'
import { Badge } from './Badge'
import { Settings, Briefcase } from 'lucide-react'

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

interface SelectedItemsBadgesProps {
  tools?: Tool[]
  businessFunction?: BusinessFunction | null
  categories?: string[]
  tags?: string[]
  toolsIcon?: React.ReactNode
  functionsIcon?: React.ReactNode
  onRemoveTool?: (tool: Tool) => void
  onRemoveFunction?: () => void
  onRemoveCategory?: (category: string) => void
  onRemoveTag?: (tag: string) => void
  className?: string
  layout?: 'horizontal' | 'vertical'
  showIcons?: boolean
  maxItems?: number
  showCount?: boolean
}

export function SelectedItemsBadges({
  tools = [],
  businessFunction,
  categories = [],
  tags = [],
  toolsIcon = <Settings className="w-3 h-3" />,
  functionsIcon = <Briefcase className="w-3 h-3" />,
  onRemoveTool,
  onRemoveFunction,
  onRemoveCategory,
  onRemoveTag,
  className,
  layout = 'horizontal',
  showIcons = true,
  maxItems,
  showCount = false,
}: SelectedItemsBadgesProps) {
  const allItems = [
    ...tools.map(tool => ({ ...tool, itemType: 'tool' as const })),
    ...(businessFunction ? [{ ...businessFunction, itemType: 'function' as const }] : []),
    ...categories.map(cat => ({ id: cat, name: cat, itemType: 'category' as const })),
    ...tags.map(tag => ({ id: tag, name: tag, itemType: 'tag' as const }))
  ]

  const displayItems = maxItems ? allItems.slice(0, maxItems) : allItems
  const hiddenCount = maxItems && allItems.length > maxItems ? allItems.length - maxItems : 0

  const hasItems = allItems.length > 0

  if (!hasItems) return null

  const getIconForType = (itemType: string) => {
    switch (itemType) {
      case 'tool': return showIcons ? toolsIcon : null
      case 'function': return showIcons ? functionsIcon : null
      default: return null
    }
  }

  const getRemoveHandler = (item: any) => {
    switch (item.itemType) {
      case 'tool': return onRemoveTool ? () => onRemoveTool(item) : undefined
      case 'function': return onRemoveFunction
      case 'category': return onRemoveCategory ? () => onRemoveCategory(item.name) : undefined
      case 'tag': return onRemoveTag ? () => onRemoveTag(item.name) : undefined
      default: return undefined
    }
  }

  const getBadgeVariant = (itemType: string) => {
    switch (itemType) {
      case 'tool': return 'blue-subtle'
      case 'function': return 'green-subtle'
      case 'category': return 'purple-subtle'
      case 'tag': return 'gray-subtle'
      default: return 'blue-subtle'
    }
  }

  return (
    <div className={cn(
      layout === 'vertical' ? 'flex flex-col gap-2' : 'flex flex-wrap gap-2',
      className
    )}>
      {displayItems.map((item) => {
        const icon = getIconForType(item.itemType)
        const removeHandler = getRemoveHandler(item)
        const badgeVariant = getBadgeVariant(item.itemType)

        return (
          <Badge 
            key={item.id} 
            variant={badgeVariant as any}
            size="sm"
            removable={!!removeHandler}
            onRemove={removeHandler}
            className="flex items-center gap-1"
          >
            {icon && React.isValidElement(icon) 
              ? React.cloneElement(icon as React.ReactElement<any>, { 
                  className: "w-3 h-3"
                })
              : null
            }
            {item.name}
          </Badge>
        )
      })}
      {hiddenCount > 0 && showCount && (
        <Badge variant="gray-subtle" size="sm" className="text-xs">
          +{hiddenCount} more
        </Badge>
      )}
    </div>
  )
}
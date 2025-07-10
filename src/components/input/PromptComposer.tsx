import { useState, useRef, KeyboardEvent } from 'react'
import { Send, Plus, X, Hash } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'

interface Variable {
  name: string
  value: string
  type: 'text' | 'number' | 'select'
  options?: string[]
}

interface PromptTemplate {
  id: string
  name: string
  content: string
  variables: Variable[]
}

interface PromptComposerProps {
  onSendPrompt: (prompt: string, variables?: Record<string, string>) => void
  templates?: PromptTemplate[]
  placeholder?: string
  className?: string
  maxLength?: number
  disabled?: boolean
  showVariables?: boolean
  showTemplates?: boolean
}

export function PromptComposer({
  onSendPrompt,
  templates = [],
  placeholder = 'Compose your prompt...',
  className,
  maxLength = 5000,
  disabled = false,
  showVariables = true,
  showTemplates = true,
}: PromptComposerProps) {
  const [prompt, setPrompt] = useState('')
  const [variables, setVariables] = useState<Variable[]>([])
  const [variableValues, setVariableValues] = useState<Record<string, string>>({})
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }

  const handleSend = () => {
    if (prompt.trim() && !disabled) {
      const processedPrompt = processPromptWithVariables(prompt, variableValues)
      onSendPrompt(processedPrompt, variableValues)
      setPrompt('')
      setVariableValues({})
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSend()
    }
  }

  const processPromptWithVariables = (text: string, vars: Record<string, string>) => {
    let processed = text
    Object.entries(vars).forEach(([key, value]) => {
      processed = processed.replace(new RegExp(`{{${key}}}`, 'g'), value)
    })
    return processed
  }

  const extractVariables = (text: string) => {
    const matches = text.match(/{{(\w+)}}/g)
    if (!matches) return []
    
    const uniqueVars = [...new Set(matches.map(match => match.slice(2, -2)))]
    return uniqueVars.map(name => ({
      name,
      value: variableValues[name] || '',
      type: 'text' as const,
    }))
  }

  const addVariable = () => {
    const varName = `variable${variables.length + 1}`
    const newVar: Variable = {
      name: varName,
      value: '',
      type: 'text',
    }
    setVariables([...variables, newVar])
    setPrompt(prompt + `{{${varName}}}`)
  }

  const removeVariable = (index: number) => {
    const varToRemove = variables[index]
    setVariables(variables.filter((_, i) => i !== index))
    setPrompt(prompt.replace(new RegExp(`{{${varToRemove.name}}}`, 'g'), ''))
    const { [varToRemove.name]: removed, ...rest } = variableValues
    setVariableValues(rest)
  }

  const updateVariableValue = (name: string, value: string) => {
    setVariableValues(prev => ({ ...prev, [name]: value }))
  }

  const applyTemplate = (template: PromptTemplate) => {
    setPrompt(template.content)
    setVariables(template.variables)
    setSelectedTemplate(template)
    const initialValues: Record<string, string> = {}
    template.variables.forEach(variable => {
      initialValues[variable.name] = variable.value
    })
    setVariableValues(initialValues)
    adjustTextareaHeight()
  }

  // Extract variables from current prompt
  const detectedVariables = extractVariables(prompt)

  return (
    <div className={cn('border rounded-lg bg-card', className)}>
      {/* Templates */}
      {showTemplates && templates.length > 0 && (
        <div className="border-b p-3">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="h-4 w-4" />
            <span className="text-sm font-medium">Templates</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => applyTemplate(template)}
                className={cn(
                  'px-3 py-1 text-sm rounded-full border transition-colors',
                  selectedTemplate?.id === template.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Variables */}
      {showVariables && (detectedVariables.length > 0 || variables.length > 0) && (
        <div className="border-b p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Variables</span>
            <button
              onClick={addVariable}
              className="p-1 rounded hover:bg-muted transition-colors"
              title="Add variable"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            {detectedVariables.map((variable) => (
              <div key={variable.name} className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {variable.name}
                </Badge>
                <input
                  type="text"
                  value={variableValues[variable.name] || ''}
                  onChange={(e) => updateVariableValue(variable.name, e.target.value)}
                  placeholder={`Enter value for ${variable.name}`}
                  className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ))}
            
            {variables.map((variable, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {variable.name}
                </Badge>
                <input
                  type={variable.type}
                  value={variableValues[variable.name] || ''}
                  onChange={(e) => updateVariableValue(variable.name, e.target.value)}
                  placeholder={`Enter value for ${variable.name}`}
                  className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={() => removeVariable(index)}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  title="Remove variable"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prompt Input */}
      <div className="p-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value)
                adjustTextareaHeight()
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              className={cn(
                'w-full resize-none border-0 bg-transparent px-0 py-2 text-sm',
                'placeholder:text-muted-foreground focus:outline-none',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'min-h-[60px] max-h-[200px]'
              )}
              style={{ overflow: 'hidden' }}
            />
            {maxLength && (
              <div className="absolute bottom-1 right-1 text-xs text-muted-foreground">
                {prompt.length}/{maxLength}
              </div>
            )}
          </div>
          
          <button
            onClick={handleSend}
            disabled={disabled || !prompt.trim()}
            className={cn(
              'self-end p-2 rounded-lg transition-colors',
              'bg-primary text-primary-foreground hover:bg-primary/90',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        <div className="text-xs text-muted-foreground mt-2">
          Use {`{{variableName}}`} for variables • Cmd/Ctrl+Enter to send
        </div>
      </div>
    </div>
  )
}
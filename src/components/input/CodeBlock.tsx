import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '../../lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  fileName?: string
  showLineNumbers?: boolean
  className?: string
  copyable?: boolean
}

export function CodeBlock({
  code,
  language = 'text',
  fileName,
  showLineNumbers = false,
  className,
  copyable = true,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const lines = code.split('\n')

  return (
    <div
      className={cn(
        'relative rounded-lg border bg-muted/50 overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Header */}
      {(fileName || copyable) && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            {fileName && (
              <span className="text-sm font-medium text-foreground">
                {fileName}
              </span>
            )}
            {language && (
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                {language}
              </span>
            )}
          </div>
          {copyable && (
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-muted-foreground/20 transition-colors"
              title={copied ? 'Copied!' : 'Copy code'}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      )}

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className={cn('block', `language-${language}`)}>
            {showLineNumbers ? (
              <div className="grid grid-cols-[auto_1fr] gap-4">
                <div className="select-none text-muted-foreground text-right">
                  {lines.map((_, index) => (
                    <div key={index} className="leading-6">
                      {index + 1}
                    </div>
                  ))}
                </div>
                <div>
                  {lines.map((line, index) => (
                    <div key={index} className="leading-6">
                      {line || '\u00A0'}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}
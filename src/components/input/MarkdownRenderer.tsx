import React from 'react'
import { cn } from '../../lib/utils'
import { CodeBlock } from './CodeBlock'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({
  content,
  className,
  ...props
}: MarkdownRendererProps) {
  // Simple markdown parsing for demo purposes
  // In a real implementation, you'd use a library like react-markdown
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n')
    const elements: React.ReactElement[] = []
    let currentCodeBlock = ''
    let codeLanguage = ''
    let inCodeBlock = false
    let lineIndex = 0

    for (const line of lines) {
      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <CodeBlock
              key={lineIndex}
              code={currentCodeBlock.trim()}
              language={codeLanguage}
              className="my-4"
            />
          )
          currentCodeBlock = ''
          codeLanguage = ''
          inCodeBlock = false
        } else {
          // Start code block
          codeLanguage = line.slice(3).trim()
          inCodeBlock = true
        }
        lineIndex++
        continue
      }

      if (inCodeBlock) {
        currentCodeBlock += line + '\n'
        lineIndex++
        continue
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={lineIndex} className="text-lg font-semibold mt-6 mb-2">
            {line.slice(4)}
          </h3>
        )
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={lineIndex} className="text-xl font-semibold mt-8 mb-3">
            {line.slice(3)}
          </h2>
        )
      } else if (line.startsWith('# ')) {
        elements.push(
          <h1 key={lineIndex} className="text-2xl font-bold mt-8 mb-4">
            {line.slice(2)}
          </h1>
        )
      }
      // Lists
      else if (line.startsWith('- ')) {
        elements.push(
          <ul key={lineIndex} className="list-disc list-inside my-2">
            <li>{line.slice(2)}</li>
          </ul>
        )
      } else if (/^\d+\. /.test(line)) {
        elements.push(
          <ol key={lineIndex} className="list-decimal list-inside my-2">
            <li>{line.replace(/^\d+\. /, '')}</li>
          </ol>
        )
      }
      // Inline code
      else if (line.includes('`')) {
        const parts = line.split('`')
        const formatted = parts.map((part, index) =>
          index % 2 === 1 ? (
            <code key={index} className="bg-muted px-1 py-0.5 rounded text-sm">
              {part}
            </code>
          ) : (
            part
          )
        )
        elements.push(
          <p key={lineIndex} className="my-2">
            {formatted}
          </p>
        )
      }
      // Bold text
      else if (line.includes('**')) {
        const formatted = line.replace(
          /\*\*(.*?)\*\*/g,
          '<strong>$1</strong>'
        )
        elements.push(
          <p
            key={lineIndex}
            className="my-2"
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        )
      }
      // Regular paragraphs
      else if (line.trim()) {
        elements.push(
          <p key={lineIndex} className="my-2 leading-relaxed">
            {line}
          </p>
        )
      }
      // Empty lines
      else {
        elements.push(<br key={lineIndex} />)
      }

      lineIndex++
    }

    // Handle unclosed code block
    if (inCodeBlock && currentCodeBlock) {
      elements.push(
        <CodeBlock
          key={lineIndex}
          code={currentCodeBlock.trim()}
          language={codeLanguage}
          className="my-4"
        />
      )
    }

    return elements
  }

  return (
    <div
      className={cn(
        'prose prose-sm max-w-none',
        'prose-headings:text-foreground',
        'prose-p:text-foreground',
        'prose-strong:text-foreground',
        'prose-code:text-foreground',
        'prose-li:text-foreground',
        className
      )}
      {...props}
    >
      {parseMarkdown(content)}
    </div>
  )
}
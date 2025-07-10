import { useState, useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'

interface StreamingTextProps {
  text: string
  speed?: number
  className?: string
  showCursor?: boolean
  onComplete?: () => void
  streaming?: boolean
  disabled?: boolean
}

export function StreamingText({
  text,
  speed = 30,
  className,
  showCursor = true,
  onComplete,
  streaming = true,
  disabled = false,
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const timeoutRef = useRef<number | null>(null)
  const indexRef = useRef(0)

  useEffect(() => {
    if (disabled || !streaming) {
      setDisplayedText(text)
      setIsComplete(true)
      return
    }

    setDisplayedText('')
    setIsComplete(false)
    indexRef.current = 0

    const streamText = () => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1))
        indexRef.current += 1
        timeoutRef.current = window.setTimeout(streamText, speed)
      } else {
        setIsComplete(true)
        onComplete?.()
      }
    }

    streamText()

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [text, speed, streaming, disabled, onComplete])

  return (
    <span className={cn('inline-block', className)}>
      <span className="whitespace-pre-wrap">{displayedText}</span>
      {showCursor && !isComplete && (
        <span className="animate-blink ml-0.5 font-mono">|</span>
      )}
    </span>
  )
}

interface TypewriterProps {
  words: string[]
  speed?: number
  deleteSpeed?: number
  delayBetweenWords?: number
  className?: string
  loop?: boolean
  onComplete?: () => void
}

export function Typewriter({
  words,
  speed = 150,
  deleteSpeed = 100,
  delayBetweenWords = 2000,
  className,
  loop = true,
  onComplete,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (isCompleted) return

    const currentWord = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => {
            const nextIndex = (prev + 1) % words.length
            if (nextIndex === 0 && !loop) {
              setIsCompleted(true)
              onComplete?.()
            }
            return nextIndex
          })
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        
        if (currentText === currentWord) {
          if (loop || currentWordIndex < words.length - 1) {
            setTimeout(() => setIsDeleting(true), delayBetweenWords)
          } else {
            setIsCompleted(true)
            onComplete?.()
          }
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, delayBetweenWords, loop, isCompleted, onComplete])

  return (
    <span className={cn('inline-block', className)}>
      <span>{currentText}</span>
      <span className="animate-blink ml-0.5 font-mono">|</span>
    </span>
  )
}

interface TypingIndicatorProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function TypingIndicator({ className, size = 'md' }: TypingIndicatorProps) {
  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className={cn('rounded-full bg-muted-foreground/60 animate-bounce', dotSizes[size])} 
           style={{ animationDelay: '0ms' }} />
      <div className={cn('rounded-full bg-muted-foreground/60 animate-bounce', dotSizes[size])} 
           style={{ animationDelay: '150ms' }} />
      <div className={cn('rounded-full bg-muted-foreground/60 animate-bounce', dotSizes[size])} 
           style={{ animationDelay: '300ms' }} />
    </div>
  )
}
import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock } from '../components/input/CodeBlock'

const meta: Meta<typeof CodeBlock> = {
  title: 'Input/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    language: {
      control: 'select',
      options: ['javascript', 'typescript', 'python', 'css', 'html', 'json', 'bash'],
    },
    showLineNumbers: {
      control: 'boolean',
    },
    copyable: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const javascriptCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`

const typescriptCode = `interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}`

const pythonCode = `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quicksort(numbers)
print(sorted_numbers)`

export const JavaScript: Story = {
  args: {
    code: javascriptCode,
    language: 'javascript',
    fileName: 'fibonacci.js',
    showLineNumbers: false,
    copyable: true,
  },
}

export const TypeScript: Story = {
  args: {
    code: typescriptCode,
    language: 'typescript',
    fileName: 'users.ts',
    showLineNumbers: true,
    copyable: true,
  },
}

export const Python: Story = {
  args: {
    code: pythonCode,
    language: 'python',
    fileName: 'quicksort.py',
    showLineNumbers: true,
    copyable: true,
  },
}

export const WithoutHeader: Story = {
  args: {
    code: 'const greeting = "Hello, World!";',
    language: 'javascript',
    showLineNumbers: false,
    copyable: false,
  },
}

export const LongCode: Story = {
  args: {
    code: `// React Chat Component Example
import React, { useState, useEffect } from 'react';
import { ChatMessage, MessageList, ChatInput } from 'agentic-ui';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} />
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        placeholder="Type your message..."
      />
    </div>
  );
}`,
    language: 'typescript',
    fileName: 'ChatInterface.tsx',
    showLineNumbers: true,
    copyable: true,
  },
}
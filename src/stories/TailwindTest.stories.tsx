import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

function TailwindTest() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold text-blue-600">Tailwind CSS Test</h1>
      <div className="bg-red-100 p-4 rounded-lg border border-red-300">
        <p className="text-red-800">This should have a red background and border</p>
      </div>
      <div className="flex gap-4">
        <div className="bg-green-500 text-white px-4 py-2 rounded">Green Button</div>
        <div className="bg-purple-500 text-white px-4 py-2 rounded">Purple Button</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-200 p-4 rounded">Grid Item 1</div>
        <div className="bg-gray-200 p-4 rounded">Grid Item 2</div>
        <div className="bg-gray-200 p-4 rounded">Grid Item 3</div>
      </div>
    </div>
  )
}

const meta: Meta<typeof TailwindTest> = {
  title: 'Test/TailwindTest',
  component: TailwindTest,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
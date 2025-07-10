import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

function SimpleTest() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h1>Simple Test Component</h1>
      <p>This is a basic test without any external dependencies.</p>
    </div>
  )
}

const meta: Meta<typeof SimpleTest> = {
  title: 'Test/SimpleTest',
  component: SimpleTest,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
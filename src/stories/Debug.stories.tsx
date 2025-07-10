import type { Meta, StoryObj } from '@storybook/react'

const DebugComponent = () => {
  console.log('DebugComponent is rendering')
  return <div>Debug Component Working</div>
}

const meta: Meta<typeof DebugComponent> = {
  title: 'Debug/Test',
  component: DebugComponent,
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
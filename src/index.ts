// ChatInput and its dependencies only
export { ChatInput } from './components/conversation'

// Required UI Components for ChatInput
export { 
  Badge,
  Button,
  AttachmentButton,
  ToolsButton,
  SearchMenu,
  FileDisplay,
  SelectedItemsBadges,
  DragDropOverlay,
  Toaster
} from './components/ui'

// Types needed for ChatInput
export type { 
  Message
} from './types'

// Utils
export { cn } from './lib/utils'

// Styles - import this in your app
import './globals.css'
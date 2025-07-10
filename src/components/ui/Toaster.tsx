import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      expand={true}
      visibleToasts={9}
      closeButton
    />
  )
}
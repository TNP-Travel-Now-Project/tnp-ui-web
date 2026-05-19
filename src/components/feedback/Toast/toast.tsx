'use client'

import { Toaster as SonnerToaster } from '@/components/ui/feedback/sonner'

export type ToasterProps = React.ComponentProps<typeof SonnerToaster>

const Toaster = (props: ToasterProps) => {
  return <SonnerToaster richColors closeButton {...props} />
}

export { Toaster }

/// code template
// <Toaster position="top-right" />
// toast.success('Thao tác thành công')
///

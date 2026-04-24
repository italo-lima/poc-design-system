import React from 'react'

interface GenericDocumentationLayoutProps {
  children: React.ReactNode
}

export const GenericDocumentationLayout = ({ children }: GenericDocumentationLayoutProps) => {
  return (
    <div className="sb-unstyled min-h-svh container mx-auto px-16 py-64 w-full max-w-full">
      {children}
    </div>
  )
}

import React from 'react'

interface ComponentDocumentationLayoutProps {
  children: React.ReactNode
}

export const ComponentDocumentationLayout = ({ children }: ComponentDocumentationLayoutProps) => {
  return (
    <div className="sb-unstyled min-h-svh bg-white">
      <div className="container mx-auto px-16 py-64">{children}</div>
    </div>
  )
}

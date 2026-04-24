import React, { type ComponentProps } from 'react'
import { Story, Controls } from '@storybook/addon-docs/blocks'
import { GenericDocumentationLayout } from './generic'
import { ComponentDocumentationLayout } from './component'

interface DocumentationLayoutProps {
  genericDocumentationPage?: boolean
  title?: string
  subtitle?: string
  description?: string
  version?: string
  playgroundStory?: unknown
  documentationStory?: React.ReactNode
}

export const DocumentationLayout = ({
  title,
  subtitle,
  description,
  version,
  playgroundStory,
  documentationStory,
  genericDocumentationPage,
}: DocumentationLayoutProps) => {
  if (documentationStory && genericDocumentationPage) {
    return <GenericDocumentationLayout>{documentationStory}</GenericDocumentationLayout>
  }

  return (
    <ComponentDocumentationLayout>
      <div className="grid xs:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-32">
        <div className="xs:col-span-4 md:col-span-6 lg:col-span-8 flex flex-col gap-32">
          <section className="flex flex-col gap-16 text-base text-neutral-800">
            <div className="flex items-end gap-16">
              <span className="text-2xl-bold">{title}</span>
              {version && <span className="text-m-semibold">({version})</span>}
            </div>
            <div className="flex flex-col gap-2">
              {description && <p className="text-m-regular text-neutral-500">{description}</p>}
              {subtitle && <p className="text-m-regular text-neutral-500">{subtitle}</p>}
            </div>
          </section>
          <section>
            {!!playgroundStory && (
              <section className="flex flex-col gap-6">
                <h2 className="text-2xl-bold">Playground</h2>
                <div className="rounded-xl border border-neutral-100 overflow-hidden">
                  <Story of={playgroundStory as ComponentProps<typeof Story>['of']} />
                </div>
                <Controls of={playgroundStory as ComponentProps<typeof Controls>['of']} />
              </section>
            )}
          </section>
          <section>
            {documentationStory != null && (
              <>
                <div className="h-px bg-neutral-100" />
                <section>{documentationStory as React.ReactNode}</section>
              </>
            )}
          </section>
        </div>
      </div>
    </ComponentDocumentationLayout>
  )
}

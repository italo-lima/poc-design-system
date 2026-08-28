import React from 'react'
import { DocumentationLayout } from '../layout'

const stack = [
  'React 19',
  'TypeScript',
  'Tailwind CSS v4',
  'tailwind-variants',
  'Storybook 10',
  'Vitest',
]

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="text-neutral-900">{children}</strong>
)

const WelcomeContent = () => (
  <div className="mx-auto flex max-w-2xl flex-col gap-48">
    <header className="flex flex-col gap-16">
      <span className="text-s-semibold uppercase tracking-widest text-brand-600">
        Design System
      </span>
      <h1 className="text-3xl-bold text-neutral-900">CRM&amp;Bonus Design System</h1>
      <p className="text-l-regular text-neutral-500">
        Uma base visual e técnica compartilhada para os produtos da CRM&amp;Bonus.
      </p>
    </header>

    <div className="flex flex-col gap-24 text-m-regular leading-relaxed text-neutral-600">
      <p>
        A CRM&amp;Bonus atua com múltiplos produtos voltados para o mercado de benefícios e gestão
        de pessoas. Com o crescimento do time e o aumento da superfície de produto, ficou claro que
        cada squad tomava decisões visuais de forma independente — gerando interfaces inconsistentes
        e retrabalho constante entre design e desenvolvimento.
      </p>
      <p>
        Este design system nasceu dessa necessidade: uma <B>base técnica compartilhada</B> que
        reflete a identidade visual da empresa e permite que novos produtos e funcionalidades sejam
        entregues com mais velocidade e menos fricção entre as disciplinas.
      </p>
    </div>

    <div className="flex flex-col gap-12">
      <span className="text-s-semibold uppercase tracking-widest text-neutral-300">
        Construído com
      </span>
      <div className="flex flex-wrap gap-8">
        {stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-neutral-100 bg-neutral-50 px-12 py-6 text-s-medium text-neutral-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-8 border-t border-neutral-100 pt-24 md:flex-row md:items-center md:justify-between">
      <span className="text-s-regular text-neutral-300">
        Mantido pelo time de produto · CRM&amp;Bonus
      </span>
      <div className="flex items-center gap-8">
        <span className="text-s-regular text-neutral-300">v0.1.0</span>
        <span className="h-1 w-1 rounded-full bg-neutral-200" />
        <span className="text-s-regular text-neutral-300">Em desenvolvimento</span>
      </div>
    </div>
  </div>
)

export const Welcome = () => (
  <DocumentationLayout genericDocumentationPage documentationStory={<WelcomeContent />} />
)

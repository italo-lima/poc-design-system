import React from 'react'
import { DocumentationLayout } from '../layout'

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="text-m-bold text-neutral-800">{children}</strong>
)

const WelcomeContent = () => (
  <div className="grid grid-cols-12 gap-32 container mx-auto text-neutral-700">
    <p className="col-span-8 col-end-9 text-2xl-regular">Bem-vindo ao </p>
    <h1 className="col-span-8 col-end-9 text-3xl-bold text-black">CRM&Bonus Design System</h1>
    <div className="col-span-8 col-end-9 flex max-w-2xl flex-col gap-32 text-m-regular text-neutral-600">
      <p>
        A CRM&Bonus atua com múltiplos produtos voltados para o mercado de benefícios e gestão de
        pessoas. Com o crescimento do time e o aumento da superfície de produto, ficou claro que
        cada squad tomava decisões visuais de forma independente — gerando interfaces inconsistentes
        e retrabalho constante entre design e desenvolvimento.
      </p>
      <p>
        A decisão de construir um design system próprio veio da necessidade de ter uma{' '}
        <B>base técnica compartilhada</B> que refletisse a identidade visual da empresa e permitisse
        que novos produtos e funcionalidades fossem entregues com mais velocidade e menos fricção
        entre as disciplinas.
      </p>
      <p>
        É construído sobre <B>React 19</B> e <B>TypeScript</B>, estilizado com{' '}
        <B>Tailwind CSS v4</B> usando tokens CSS nativos, com{' '}
        <B>tailwind-variants</B> e <B>tailwind-merge</B> (via helper <B>cn</B> em <B>src/utils/cn</B>)
        para variantes e merge de classes, empacotado com <B>Vite 8</B> e documentado no{' '}
        <B>Storybook 10</B>. Os testes rodam via <B>Vitest</B>.
      </p>
    </div>

    <div className="col-span-8 col-end-9 gap-1 border-t border-neutral-100 pt-8 md:flex-row md:items-center md:justify-between">
      <span className="text-s-regular text-neutral-300">
        Mantido pelo time de produto · CRM&Bonus
      </span>
      <div className="flex items-center gap-3">
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

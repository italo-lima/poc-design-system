import React from 'react'
import { DocumentationLayout } from '../layout'

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded-4 bg-neutral-100 px-6 py-2 font-mono text-s-regular text-neutral-700">
    {children}
  </code>
)

const Block = ({ label, children }: { label?: string; children: React.ReactNode }) => (
  <div className="flex flex-col overflow-hidden rounded-8 border border-neutral-100">
    {label && (
      <div className="border-b border-neutral-100 bg-neutral-50 px-16 py-8">
        <span className="font-mono text-s-regular text-neutral-400">{label}</span>
      </div>
    )}
    <pre className="overflow-x-auto bg-neutral-900 px-20 py-16 font-mono text-s-regular leading-relaxed text-neutral-300">
      <code>{children}</code>
    </pre>
  </div>
)

const Step = ({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-16">
    <div className="flex items-baseline gap-12">
      <span className="text-s-regular text-neutral-300">{number}</span>
      <h2 className="text-l-semibold text-neutral-900">{title}</h2>
    </div>
    <div className="flex flex-col gap-16 pl-24">{children}</div>
  </div>
)

const Note = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-8 border border-brand-200 bg-brand-50 px-16 py-12">
    <p className="text-s-regular text-brand-700">{children}</p>
  </div>
)

const InstallationContent = () => (
  <div className="mx-auto flex w-full max-w-2xl flex-col gap-48">
    <header className="flex flex-col gap-16">
      <span className="text-s-semibold uppercase tracking-widest text-brand-600">
        Design System
      </span>
      <h1 className="text-3xl-bold text-neutral-900">Installation Guide</h1>
      <p className="text-l-regular text-neutral-500">
        Como instalar e configurar o design system em outro projeto.
      </p>
    </header>

    <Note>
      O pacote ainda não foi publicado no npm — publicação prevista em breve. Esta documentação já
      reflete o fluxo definitivo de instalação para quando o pacote estiver disponível.
    </Note>

    <div className="flex flex-col gap-32">
      <span className="text-s-semibold uppercase tracking-widest text-neutral-300">
        Configuração
      </span>

      <Step number="01" title="Instale o pacote">
        <p className="text-m-regular text-neutral-600">
          Adicione o design system como dependência no seu projeto.
        </p>
        <Block label="terminal">npm install @crmbonus/design-system</Block>
        <p className="text-m-regular text-neutral-600">
          A fonte <Code>Inter</Code> já está incluída no pacote. Não é necessário instalar
          separadamente.
        </p>
      </Step>

      <Step number="02" title="Importe o CSS">
        <p className="text-m-regular text-neutral-600">
          No ponto de entrada da sua aplicação (geralmente <Code>main.tsx</Code> ou{' '}
          <Code>main.ts</Code>), importe o CSS já compilado do design system. Ele carrega a fonte
          Inter, os tokens de cor, tipografia e o reset base — funciona com ou sem Tailwind no seu
          projeto.
        </p>
        <Block label="src/main.tsx">{"import '@crmbonus/design-system/styles'"}</Block>
      </Step>

      <Step number="03" title="Configure o Tailwind CSS (opcional)">
        <p className="text-m-regular text-neutral-600">
          Se o seu projeto usa <Code>Tailwind CSS v4</Code>, importe os tokens do design system no
          seu arquivo CSS principal para ter acesso às mesmas classes de cor, tipografia e
          breakpoints — em vez do CSS pronto do passo anterior.
        </p>
        <Block label="src/styles/global.css">
          {'@import "tailwindcss";\n@import "@crmbonus/design-system/tokens";'}
        </Block>
        <p className="text-m-regular text-neutral-600">
          Se o seu projeto <strong>não usa</strong> Tailwind, ignore este passo — o CSS importado no
          passo anterior já aplica os estilos necessários.
        </p>
      </Step>

      <Step number="04" title="Use os componentes">
        <p className="text-m-regular text-neutral-600">
          Importe os componentes diretamente do pacote. Todos são exportados com tipagem completa
          via TypeScript.
        </p>
        <Block label="src/components/MyPage.tsx">
          {
            'import { Button, Badge } from \'@crmbonus/design-system\'\n\nexport const MyPage = () => (\n  <div>\n    <Badge variant="primary">Novo</Badge>\n    <Button variant="solid" color="primary">Confirmar</Button>\n  </div>\n)'
          }
        </Block>
      </Step>
    </div>

    {/* Requisitos */}
    <div className="flex flex-col gap-16">
      <span className="text-s-semibold uppercase tracking-widest text-neutral-300">
        Requisitos do projeto consumidor
      </span>
      <div className="flex flex-col">
        {[
          ['React', '19 ou superior'],
          ['TypeScript', 'Recomendado, não obrigatório'],
          ['Tailwind CSS v4', 'Apenas se quiser usar os tokens utilitários'],
        ].map(([req, note], i, arr) => (
          <div
            key={req}
            className={`flex flex-col gap-4 py-14 md:flex-row md:items-baseline md:justify-between ${
              i < arr.length - 1 ? 'border-b border-neutral-100' : ''
            }`}
          >
            <Code>{req}</Code>
            <span className="text-s-regular text-neutral-400">{note}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-8 border-t border-neutral-100 pt-24 md:flex-row md:items-center md:justify-between">
      <span className="text-s-regular text-neutral-300">
        Mantido pelo time de produto · CRM&Bonus
      </span>
      <div className="flex items-center gap-8">
        <span className="text-s-regular text-neutral-300">v0.1.0</span>
        <span className="h-1 w-1 rounded-full bg-neutral-200" />
        <span className="text-s-regular text-neutral-300">Em desenvolvimento</span>
      </div>
    </div>
  </div>
)

export const InstallationGuide = () => (
  <DocumentationLayout genericDocumentationPage documentationStory={<InstallationContent />} />
)

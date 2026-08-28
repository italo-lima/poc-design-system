# CRM&Bonus Design System

Componentes React do design system oficial da CRM&Bonus — estilizados com Tailwind CSS v4, documentados no Storybook e prontos para uso em outros produtos da empresa.

**[Ver componentes no Storybook →](https://italo-lima.github.io/poc-design-system/)**

> ⚠️ O pacote ainda não foi publicado no npm — publicação prevista em breve. As instruções abaixo já refletem o fluxo definitivo de uso assim que ele estiver disponível.

## Stack

React 19 · TypeScript · Tailwind CSS v4 · [tailwind-variants](https://www.tailwind-variants.org/) · Vite · Storybook 10 · Vitest

## Instalação

```bash
npm install @crmbonus/design-system
```

Importe o CSS do design system uma única vez no ponto de entrada da sua aplicação (ele já inclui a fonte Inter, os tokens de cor/tipografia e o reset base):

```ts
// src/main.tsx
import '@crmbonus/design-system/styles'
```

Se o seu projeto já usa Tailwind CSS v4, você pode importar apenas os tokens e deixar seu próprio build gerar as classes utilitárias:

```css
/* src/styles/global.css */
@import 'tailwindcss';
@import '@crmbonus/design-system/tokens';
```

## Uso

```tsx
import { Button, Badge } from '@crmbonus/design-system'

export function Example() {
  return (
    <div>
      <Badge variant="primary">Novo</Badge>
      <Button variant="solid" color="primary">
        Confirmar
      </Button>
    </div>
  )
}
```

Guia completo de instalação e configuração: [Documentation/Installation Guide](https://italo-lima.github.io/poc-design-system/) no Storybook.

## Componentes disponíveis

Accordion · AccordionGroup · Alert · Avatar · AvatarGroup · Badge · Breadcrumb · Button · EmptyState · Popover · Tag · Tooltip

Cada componente tem sua documentação (props, variações e exemplos) no Storybook.

## Requisitos

| Dependência     | Versão                                       |
| --------------- | --------------------------------------------- |
| React            | 19 ou superior                                |
| TypeScript       | Recomendado, não obrigatório                  |
| Tailwind CSS v4  | Apenas se quiser usar os tokens utilitários   |

## Desenvolvimento

```bash
npm install        # instala as dependências
npm run dev        # sandbox local (Vite)
npm run storybook  # Storybook em http://localhost:6006
npm test           # testes unitários (Vitest)
npm run lint       # lint (ESLint + Prettier)
npm run build      # gera a lib publicável em dist/ (JS, types, CSS e tokens)
```

Convenções do projeto:

- [`docs/component-structure.md`](docs/component-structure.md) — estrutura de pastas e stories de cada componente.
- [`docs/styling-utilities.md`](docs/styling-utilities.md) — quando usar `tailwind-variants` (`tv`) vs. `cn`.

## Licença

UNLICENSED — uso interno CRM&Bonus. Veja [LICENSE](LICENSE).

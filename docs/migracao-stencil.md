# Plano de Migração — Design System → Stencil.js

> Status: **IMPLEMENTADO** (Fases 0–4) · Decisões fixadas: **Shadow DOM** · wrapper **React**
> Data: 2026-06-11 · Concluído: 2026-06-12

## Status de execução

Todos os 12 componentes migrados de React → Stencil (web components, shadow DOM):
badge, tag, avatar, empty-state, button, alert, breadcrumb, tooltip, popover,
accordion, avatar-group, accordion-group.

Validação (tudo verde):
- `npm run build` → build finished (dist-custom-elements + dist + www + docs-readme + react-output-target).
- `npm test` → **207 testes / 12 suites** (`@stencil/vitest`).
- `npm run build-storybook` → **12 stories** (`@storybook/web-components-vite` + lit-html). Pré-build do core via `prebuild-storybook`.
- Wrapper `@ds/react` → `react/lib` (14 módulos, `tsc` limpo). `src/index.ts` exporta os tipos públicos para o root `@ds/core`.

Infra entregue: `src/utils/icons.ts` (lucide-static, SVG strings, ~53 ícones, `getIcon`),
`src/utils/cn.ts`, Tailwind compilado (`build:css`) injetado como `styleUrl` (adoptedStyleSheets).

### Follow-ups conhecidos (não-bloqueantes)
- **Prop `title` reservado** (accordion, alert, empty-state, popover): Stencil emite WARN
  (`title` colide com `HTMLElement.title` nativo → tooltip do browser). Funciona (setado como
  propriedade; 207 testes passam), mas para limpar o warning renomear o prop (ex. `heading`)
  e atualizar stories/specs/wrapper.
- **`::slotted(_button)`** em `ds-accordion-group`: borda do último filho via `::slotted(ds-accordion:last-child)`
  resolvida; o `button` interno do accordion não é alcançável por `::slotted` (limitação shadow DOM) —
  resolver via `::part()` no `ds-accordion` se necessário.
- **Fase 5 (publicar):** versionar/publicar `@ds/core` + `@ds/react`, deploy do Storybook (GitHub Pages).

## Objetivo

Migrar todos os componentes do design system (hoje React 19 + Tailwind v4) para
**Stencil.js**, distribuídos como web components agnósticos de framework, com
wrappers para React, Vue e Angular.

---

## Inventário atual

**Stack:** React 19 · Tailwind v4 · `tailwind-variants` (`tv`/`cn`) · `lucide-react` ·
Storybook 10 (`@storybook/react-vite`) · Vitest browser + Testing-Library.

**12 componentes** — cada um com `Component.tsx` + `stories/` + `tests/` +
`stories/configs/argTypes.ts` + `stories/configs/docs-pages.tsx`:

| Componente      | Complexidade  | Motivo                                            |
|-----------------|---------------|---------------------------------------------------|
| Badge, Tag, Avatar, EmptyState | Baixa        | só props → classes                  |
| Button, Alert, Breadcrumb      | Baixa-Média  | ícones, slots                       |
| Tooltip, Popover               | Média        | posicionamento CSS (arrow/placement)|
| AvatarGroup, AccordionGroup    | Média        | composição de filhos (`React.Children`) |
| Accordion                      | Alta         | estado (`useState`/`useEffect`), eventos |

**Tokens** (`src/styles/global.css`, Tailwind v4 `@theme`/`@utility`):
paletas de cor, `radius`, `shadow`, `z-index`, utilities tipográficas `text-*`,
breakpoints.

---

## Decisões de arquitetura (FIXADAS)

### 1. Shadow DOM — `shadow: true`
Distribuição multi-framework = consumidores têm CSS/reset/Tailwind próprios.
`scoped` (light DOM) colidiria + dependeria de folha Tailwind global do consumidor.
Shadow DOM dá encapsulamento real → motivo de distribuir como web component.

### 2. Multi-framework output
```
dist                    // lazy loader (CDN / vanilla)
dist-custom-elements    // tree-shakable, base p/ wrappers
@stencil/react-output-target
```
Cada wrapper = pacote npm próprio. **Monorepo** recomendado:
`@ds/core`, `@ds/react` — versionados juntos.

### 3. Estilo dentro do Shadow DOM
- **Tokens (CSS custom properties) ATRAVESSAM o shadow boundary** (herdam).
  `@theme` → CSS vars em `:root` continuam funcionando dentro de cada componente. ✓
- **Utility classes (`bg-brand-500`, `text-s-semibold`) NÃO atravessam.** ✗

**Solução:** compilar Tailwind num único `tailwind.css` (tokens + todas as utilities
usadas) → importar como `styleUrl` em **todo** componente. Stencil usa
`adoptedStyleSheets` → folha compartilhada/injetada em cada shadow root, sem duplicar
bytes. `tv`/`cn` continuam gerando as strings de classe; resolvem dentro do shadow
porque a folha foi adotada ali.

```tsx
@Component({
  tag: 'ds-button',
  styleUrl: 'tailwind.css',   // mesma folha em todos → adoptedStyleSheets dedup
  shadow: true,
})
```

Build Tailwind precisa escanear os `.tsx` Stencil para gerar as utilities certas
(configurar `@source` apontando para os componentes).

### 4. Ícones
`lucide-react` (JSX React) não serve. Trocar por **`lucide`** (vanilla) ou
`lucide-static` (SVG strings). Reescrever `utils/icons` → mapa retornando SVG string,
render via `innerHTML` em JSX Stencil. API `IconName` preservada.

### 5. Composição / `children`
`children` → `<slot/>` nativo (funciona melhor em shadow que em scoped).
`AccordionGroup`/`AvatarGroup`: usar `::slotted()` em vez de `[&>*]`.
Lógica de overflow do AvatarGroup via `slot.assignedElements()` (`@Element` +
`componentDidLoad`).

### 6. Estado e eventos
`useState` → `@State`; `useEffect([defaultOpen])` → `@Watch('defaultOpen')`;
`onClick` callbacks → `@Event` (custom events, ex. `accordionToggle`).

### 7. Storybook
`@storybook/react-vite` → `@storybook/web-components-vite` (renderer `lit-html`).
`argTypes` portam quase 1:1; `render` reescrito de JSX React → template `` html`...` ``.
Addons (a11y, docs, vitest) compatíveis.

### 8. Testes
Testing-Library/React não roda em web components nativamente.
`newSpecPage` (`@stencil/core/testing`, Jest) p/ unit + Stencil e2e (Puppeteer) p/
interação. Asserções de classe (`toHaveClass('bg-brand-500')`) portam quase 1:1;
o runner muda. Maior custo da migração.

---

## Fases

### Fase 0 — Setup & PoC
- Monorepo + `npm init stencil`; output-targets: `dist`, `dist-custom-elements`,
  `loader` + React/Vue/Angular targets.
- Pipeline Tailwind → `tailwind.css` único, adotado via `styleUrl` em cada componente.
- Portar tokens (`@theme`/`@utility`) → CSS vars/utilities.
- Migrar **Badge** ponta-a-ponta (componente shadow DOM + story web-components + teste
  `newSpecPage`), validado nos 3 wrappers. Componente de referência.

### Fase 1 — Infra compartilhada
- `utils/icons` → vanilla (`lucide`/`lucide-static`).
- `cn`/`tv` (sem mudança). Tipos compartilhados.
- Storybook web-components rodando com tokens.

### Fase 2 — Componentes simples (sem estado/composição)
Badge ✓ · Tag · Avatar · EmptyState · Button · Alert · Breadcrumb · Tooltip · Popover.
Converter passthrough de `className`/`children` p/ `class` prop + `<slot/>`.

### Fase 3 — Composição
AvatarGroup · AccordionGroup. Slots + `::slotted()` + `slot.assignedElements()`.

### Fase 4 — Estado/eventos
Accordion (`@State`/`@Watch`/`@Event`).

### Fase 5 — Empacotar & publicar
4 pacotes (core + 3 wrappers) versionados juntos. Docs de consumo por framework.
Deploy Storybook (GitHub Pages já configurado).

---

## Mapa de conversão (referência rápida)

| React                       | Stencil                                          |
|-----------------------------|--------------------------------------------------|
| `export function X(props)`  | `@Component({tag:'ds-x', shadow:true})` class    |
| `interface XProps`          | `@Prop()` por campo                              |
| `children: ReactNode`       | `<slot/>`                                         |
| `useState`                  | `@State()`                                        |
| `useEffect([dep])`          | `@Watch('dep')`                                   |
| `onClick?: () => void`      | `@Event()` + `emit()`                             |
| `useId()`                   | gerar id em `connectedCallback`                  |
| `lucide-react` `<Icon/>`    | SVG string + `innerHTML`                          |
| `tv` / `cn`                 | **inalterado**                                    |
| `className` passthrough     | `class` prop / `@Prop() customClass`             |
| `[&>*:last-child]`          | `::slotted(*:last-child)`                          |
| `React.Children` iteração   | `slot.assignedElements()`                          |

---

## Riscos

- **Tailwind dentro do shadow:** build precisa escanear `.tsx` Stencil corretamente
  (`@source`); utility ausente = estilo faltando. Validar na PoC.
- **Reescrita de testes:** maior esforço; asserções portam, runner não.
- **AvatarGroup overflow / AccordionGroup:** lógica baseada em filhos React precisa
  ser repensada via slots + DOM real (`assignedElements`).
- **Versionamento dos 4 pacotes:** manter sincronizados (tooling de monorepo:
  changesets/nx/turborepo).

# Estilização: `tailwind-variants` e `tailwind-merge`

Este design system usa **`tailwind-variants`** (`tv`) e **`tailwind-merge`** (via helper **`cn`**) para classes Tailwind previsíveis e sem conflitos.

---

## Dependências

| Pacote               | Uso |
| -------------------- | --- |
| `tailwind-variants`  | API de variantes (`tv`), `compoundVariants`, slots e merge integrado ao passar `class` / `className`. |
| `tailwind-merge`     | Resolução de classes conflitantes (ex.: dois `px-*`); exposto indiretamente pelo `cn` abaixo. |

O arquivo **`src/utils/cn.ts`** reexporta **`cn`** de `tailwind-variants`, que já combina composição (incluindo objetos condicionais) com **tailwind-merge**.

---

## Quando usar `tv` (`tailwind-variants`)

Use **`tv({ ... })`** no componente quando existirem **eixos de variante** combináveis, por exemplo:

- variante visual (`solid` / `outlined` / `ghost`);
- cor (`primary` / `neutral` / `danger`);
- tamanho (`sm` / `md` / `lg`);
- `iconOnly`, `fullWidth`, tom claro/escuro, alinhamento, etc.

**Padrões:**

- `base`: classes comuns a todas as instâncias.
- `variants`: mapas por prop (cada valor com suas classes).
- `compoundVariants`: combinações entre duas ou mais variantes (ex.: `size` × `iconOnly` × `fullWidth`).
- `defaultVariants`: valores padrão quando a prop é omitida.
- Classes vindas de fora: `minhaVariante({ ..., class: className })` ou `className` conforme a API do `tv` no projeto — o merge de Tailwind é aplicado.

**Exemplos no repositório:** `Button`, `Tag`, `Badge`, `Alert`, `Popover`, `Tooltip`, `EmptyState`, `Accordion` (trechos com `tv`).

---

## Quando usar `cn` (`src/utils/cn`)

Use **`import { cn } from '../../utils/cn'`** (ajuste o caminho) quando:

- o trecho for **só composição de layout** ou condicionais simples, **sem** modelo de variantes do `tv`;
- stories precisarem montar `className` de container (`flex`, `gap`, padding de demo), etc.

O `cn` aceita o mesmo estilo de argumentos que utilitários tipo `clsx` (strings, objetos booleanos) e **faz merge** de utilitários Tailwind conflitantes.

**Exemplos no repositório:** `AccordionGroup`, `Breadcrumb`, `Avatar`, `AvatarGroup`, `*.story.tsx` que montam layout do canvas.

---

## O que evitar

- **`classnames`** — removido do stack; use **`cn`** para merge + condicionais ou **`tv`** para variantes.
- Estilos de variante **soltos** em `global.css` — mantenha variantes no módulo do componente (`tv` / classes em TSX).

---

## Resumo

| Situação                                      | Ferramenta        |
| --------------------------------------------- | ------------------ |
| Várias props que mudam classes (e combinações) | `tv`               |
| Apenas juntar classes / layout / `className` externo com merge | `cn` em `src/utils/cn` |

Para a estrutura de pastas e stories, continue seguindo **`docs/component-structure.md`**.

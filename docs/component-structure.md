# Component Structure – Design System

This document defines the standard layout for every component under **`src/components/`**. Storybook discovers stories via `src/**/stories/*.story.tsx` (see `.storybook/main.ts`).

---

## Standard structure

Each component lives in its own folder (usually **kebab-case**, matching the component name in URLs and imports):

```text
src/components/component-name/
├── ComponentName.tsx          # implementation + exported types
├── ComponentName.test.tsx     # optional but recommended when behavior is tested
└── stories/
    ├── configs/
    │   ├── argTypes.ts          # Storybook controls / docs table
    │   └── docs-pages.tsx       # Docs tab layout (often uses documentation/layout)
    ├── general.story.tsx        # default / overview story (typical entry)
    ├── …                        # more *.story.tsx files per real use case
    └── with-background.story.tsx   # only if that scenario exists for the component
```

**Naming**

- **`ComponentName.tsx`** – PascalCase, matches the primary export.
- **Stories** – `*.story.tsx`; name files after the scenario (`general`, `sizes`, `colors`, `read-only`). See [One story file per variation](#one-story-file-per-variation-or-rule) below.

---

## Elements

### `ComponentName.tsx`

- Main component file: rendering and minimal UI logic.
- Export the component and a typed props interface (e.g. `AvatarProps`).
- Avoid domain or app-specific rules; move reusable non-UI logic to hooks or `src/utils/` when shared.
- **Tailwind class composition** – Prefer **`tailwind-variants`** (`tv`) when the component has structured variant axes (color, size, surface, placement, etc.); use **`cn`** from `src/utils/cn` for layout-only composition and safe merging of conflicting utilities. See **`docs/styling-utilities.md`**.

### `stories/`

Visual and interactive documentation for Storybook.

#### `stories/configs/`

| File            | Purpose                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| `argTypes.ts`   | Controls, descriptions, and defaults for the Storybook panel and docs. |
| `docs-pages.tsx`| Custom Docs page: title, description, playground story, extra content. |

#### `*.story.tsx`

- Prefer **args** over hardcoded props where possible.
- Avoid duplication: share args through imports or small helpers under `configs/` when needed (some components use `configs/args/` for that).

### One story file per variation (or rule)

Every **meaningful axis** of the component—anything product/design needs to see at a glance—should have **coverage in Storybook via its own `*.story.tsx` file** (or a dedicated story file named after that axis). Do not hide whole families of UI only behind controls on a single story.

Typical dimensions (name files after the scenario, kebab-case):

| Kind | Examples of story files |
| ---- | ------------------------ |
| **Size** | `sizes.story.tsx`, `small-medium-large.story.tsx` |
| **Color / tone** | `colors.story.tsx`, `semantic-tones.story.tsx` |
| **Variant / style** | `solid.story.tsx`, `outlined.story.tsx`, `ghost.story.tsx` (see `button`) |
| **State / behavior** | `disabled.story.tsx`, `read-only.story.tsx`, `loading.story.tsx` |
| **Layout / context** | `with-background.story.tsx`, `overflow.story.tsx` |

**`general.story.tsx`** should stay the default overview (meta, autodocs, playground). Use **additional files** so each variation remains easy to find in the sidebar and in visual regression tests.

If a dimension has many values (e.g. 6 sizes), one story file may render **all values on one canvas**—the rule is **one file dedicated to that dimension**, not necessarily one file per enum value.

---

## Example: `Avatar`

The **Avatar** component is a concrete reference in this repo: image, icon, or initials; optional rounding and dark presentation.

### Folder layout (as in the codebase)

```text
src/components/avatar/
├── Avatar.tsx
└── stories/
    ├── configs/
    │   ├── argTypes.ts
    │   └── docs-pages.tsx
    ├── general.story.tsx
    ├── icon.story.tsx
    ├── image.story.tsx
    └── initials.story.tsx
```

### Responsibilities

1. **`Avatar.tsx`** – Implements `Avatar` and types such as `AvatarProps`, `AvatarType`; uses Tailwind classes and shared helpers (e.g. icons from `src/utils/icons`).
2. **`stories/configs/argTypes.ts`** – Centralizes control metadata (types, options, descriptions) for all Avatar stories.
3. **`stories/configs/docs-pages.tsx`** – Wires the Docs tab to `documentation/layout` and picks which story drives the playground (here, `GeneralStory` from `general.story.tsx`).
4. **`general.story.tsx`** – Defines the Storybook `meta` (`title`, `component`, `tags`, `parameters.docs.page`, `argTypes`) and the primary **General** story.
5. **`icon.story.tsx`**, **`image.story.tsx`**, **`initials.story.tsx`** – Focused stories for each display mode instead of a single oversized file.

### Snippets (patterns to copy)

**Meta + shared config in a story file** (`general.story.tsx`):

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DocumentationPage } from './configs/docs-pages'
import { argTypes } from './configs/argTypes'
import { Avatar } from '../Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocumentationPage,
    },
  },
  argTypes,
}

export default meta
type Story = StoryObj<typeof Avatar>
```

**Docs page delegating to shared documentation layout** (`docs-pages.tsx`):

```tsx
import { DocumentationLayout } from '../../../../../documentation/layout'
import { GeneralStory } from '../general.story'

export function DocumentationPage() {
  return (
    <DocumentationLayout
      title="Avatar"
      description="Componente para exibição de identidade visual de usuários. Suporta 3 tipos (image, icon, initials), formato circular ou quadrado arredondado e dark mode."
      version="1.0.0"
      playgroundStory={GeneralStory}
      documentationStory={<p>Documentação em breve.</p>}
    />
  )
}
```

Use **Avatar** as the template when adding a new component: same `configs/` split, one `general.story.tsx` for `meta`, then add **`*.story.tsx` per variation** (type, size, color, state, etc.) as in `icon.story.tsx` / `image.story.tsx` / `initials.story.tsx`.

---

## Best practices

- Components stay isolated and reusable; stories are the living spec.
- **Split by variation**: size, color, variant, disabled/read-only, and similar rules each get their own story file (or one file that exhaustively shows that dimension on the canvas).
- Keep shared story configuration under `stories/configs/` (and optional `configs/args/`).
- No business or CRM-specific logic inside primitives—only presentation and generic behavior.

import type { Preview } from '@storybook/react-vite'

// Stencil custom elements: importing the bundle auto-defines all <ds-*> tags
// (output target dist-custom-elements with customElementsExportBehavior:
// 'auto-define-custom-elements'). More bundler-friendly than the lazy loader.
import '../dist/components'

// Global Tailwind utilities for the story layout containers (e.g. bg-neutral-900).
// Components ship their own styles inside the shadow DOM; this is only for the
// light-DOM wrappers used by the stories.
import '../src/styles/tailwind.generated.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: 'alphabetical',
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Documentation', ['Welcome', 'Installation Guide'], 'Components', '*'],
        locales: 'pt-BR',
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview

import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { Title, Subtitle, Description, Primary, Controls } from '@storybook/addon-docs/blocks'

import { storybookDocsTheme } from './theme'
import '../src/styles/global.css'
import './stoybook.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    viewMode: 'docs',
    actions: {
      disabled: true,
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: 'alphabetical',
      disabledSaveFromUI: true,
    },
    docs: {
      codePanel: true,
      theme: storybookDocsTheme,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
        </>
      ),
    },
    jsx: {
      useBooleanShorthand: true,
      showFunctions: false,
      filterProps: (props) => {
        return typeof props !== 'function'
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Documentation', ['Welcome', 'Installation Guide'], 'Example', 'Components', '*'],
        locales: 'pt-BR',
      },
    },
    viewport: {
      defaultViewport: 'md',
      options: {
        mobile: {
          name: 'Phone',
          styles: { width: '360px', height: '800px' },
          type: 'mobile',
        },
        sm: {
          name: 'Tablet',
          styles: { width: '640px', height: '900px' },
          type: 'tablet',
        },
        md: {
          name: 'Desktop',
          styles: { width: '1024px', height: '768px' },
          type: 'desktop',
        },
        lg: {
          name: 'Large Desktop',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview

import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

const isProd = process.env.NODE_ENV === 'production'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.base = isProd ? '/poc-design-system/' : '/'
    // Wire the generated Stencil React wrappers (@ds/react) and their internal
    // `@ds/core/...` imports to local source/build output, since neither package
    // is installed in node_modules (they live in this repo).
    config.resolve ??= {}
    const aliases = [
      {
        find: '@ds/react',
        replacement: fileURLToPath(new URL('../react/src/index.ts', import.meta.url)),
      },
      { find: '@ds/core', replacement: repoRoot.replace(/\/$/, '') },
    ]
    const existing = config.resolve.alias
    if (Array.isArray(existing)) {
      config.resolve.alias = [...aliases, ...existing]
    } else {
      config.resolve.alias = {
        '@ds/react': aliases[0].replacement,
        '@ds/core': aliases[1].replacement,
        ...(existing as Record<string, string> | undefined),
      }
    }
    // Force the React automatic JSX runtime for the stories. The root
    // tsconfig.json sets `jsxFactory: 'h'` for the Stencil components, which
    // Vite's esbuild would otherwise apply to the `.stories.tsx` files,
    // compiling JSX to `h(...)` and throwing `h is not defined` at runtime.
    config.esbuild = {
      ...(config.esbuild || {}),
      jsx: 'automatic',
      jsxImportSource: 'react',
    }
    return config
  },
}

export default config

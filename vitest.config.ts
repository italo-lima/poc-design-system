import { defineVitestConfig } from '@stencil/vitest/config'
import { stencilVitestPlugin } from '@stencil/vitest/plugin'

export default defineVitestConfig({
  stencilConfig: './stencil.config.ts',
  test: {
    projects: [
      {
        // Compile component source on-the-fly (no pre-built dist required).
        plugins: [stencilVitestPlugin()],
        test: {
          name: 'spec',
          include: ['src/**/*.spec.{ts,tsx}'],
          exclude: ['**/node_modules/**', '**/old-reference/**'],
          environment: 'stencil',
        },
      },
    ],
  },
})

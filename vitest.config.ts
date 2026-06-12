import { defineVitestConfig } from '@stencil/vitest/config'
import { stencilVitestPlugin } from '@stencil/vitest/plugin'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

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
      {
        plugins: [storybookTest({ configDir: '.storybook' })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})

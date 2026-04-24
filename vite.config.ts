/// <reference types="vitest/config" />
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { playwright } from '@vitest/browser-playwright'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const unitTestProject = {
  extends: true as const,
  test: {
    name: 'unit',
    include: ['src/**/*.test.{ts,tsx}', 'src/**/tests/**/*.test.{ts,tsx}'],
    environment: 'jsdom' as const,
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
}

const storybookTestPlugins =
  process.env.VITEST_STORYBOOK === 'true'
    ? await storybookTest({
        configDir: path.join(dirname, '.storybook'),
      })
    : []

const testProjects =
  storybookTestPlugins.length > 0
    ? [
        unitTestProject,
        {
          extends: true as const,
          plugins: storybookTestPlugins,
          test: {
            browser: {
              enabled: true,
              headless: true,
              provider: playwright(),
              instances: [{ browser: 'chromium' as const }],
            },
          },
        },
      ]
    : [unitTestProject]

export default defineConfig({
  base: 'poc-design-system',
  plugins: [
    tailwindcss(),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
  test: {
    projects: testProjects,
    coverage: {
      provider: 'istanbul',
      include: ['src/components/*/[A-Z]*.{ts,tsx}'],
      exclude: [
        'src/components/**/*.stories.{ts,tsx}',
        'src/components/**/*.story.tsx',
        'src/components/**/*.test.{ts,tsx}',
        'src/components/**/tests/**',
        'src/components/**/stories/**',
        'src/components/**/*Doc.tsx',
        'src/components/**/*.mdx',
      ],
      thresholds: {
        lines: 94,
        functions: 100,
      },
      reporter: ['text', 'html', 'lcov'],
    },
  },
})

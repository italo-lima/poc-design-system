import type { StorybookConfig } from '@storybook/web-components-vite'

const isProd = process.env.NODE_ENV === 'production'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.base = isProd ? '/poc-design-system/' : '/'
    return config
  },
}

export default config

import type { StorybookConfig } from '@storybook/react-vite'

const isProd = process.env.NODE_ENV === 'production'

const config: StorybookConfig = {
  stories: ['../src/**/stories/*.story.@(js|jsx|mjs|ts|tsx)', '../documentation/**/*.mdx'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  features: {
    sidebarOnboardingChecklist: false,
  },
  viteFinal: async (config) => {
    config.base = isProd ? '/poc-design-system/' : '/'
    return config
  },
}
export default config

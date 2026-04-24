import { addons } from 'storybook/manager-api'

import { storybookManagerTheme } from './theme'

addons.setConfig({
  theme: storybookManagerTheme,
  enableOnboarding: false,
  showOnboarding: false,
})

import { Config } from '@stencil/core'
import { reactOutputTarget } from '@stencil/react-output-target'

export const config: Config = {
  namespace: 'dscore',
  sourceMap: true,
  outputTargets: [
    // Tree-shakable custom elements — base para wrappers (React/Vue/Angular)
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    // Wrapper React — gera componentes React tipados em @ds/react
    reactOutputTarget({
      outDir: 'react/src',
      customElementsDir: 'dist/components',
      esModules: true,
    }),
    // Lazy loader (CDN / vanilla)
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    // README por componente
    {
      type: 'docs-readme',
    },
    // Playground dev local
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
}

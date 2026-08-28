import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist',
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'tailwind-variants', 'tailwind-merge'],
    },
  },
})

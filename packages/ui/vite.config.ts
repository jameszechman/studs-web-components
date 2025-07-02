/// <reference types="vitest" />
// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    setupFiles: [resolve(__dirname, 'tests/setup/setup.ts')],
    // happy-dom not working with onslotchange event
    // related issue: https://github.com/whatwg/dom/issues/447
    environment: 'jsdom', 
  },
  build: {
    target: 'ES2020',
    minify: 'terser',
    terserOptions: {
      ecma: 2020,
      module: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    },
    rollupOptions: {
      output: [{
        dir: 'dist', // Output directory for the main library file
        entryFileNames: '[name].js',
        format: 'es',
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
      }, {
        dir: 'dist', // Output directory for the main library file
        entryFileNames: '[name].cjs',
        format: 'cjs',
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
      }],
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'StudsUI',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },

    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/src',
      styles: '/src/styles/lib/components',
    },
  },
});
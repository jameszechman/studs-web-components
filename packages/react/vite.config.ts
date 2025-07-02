import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'LibraryUIReact',
      fileName: 'index',
    },
    target: 'esnext', // Changed to 'esnext' for better compatibility
    rollupOptions: {
      // Add or modify as needed for tree shaking
      treeshake: true,
      // Externalize React and ReactDOM to prevent duplication
      external: ['react', 'react-dom', '@studs/styles', '@studs/ui'],
      output: [{
        dir: 'dist', // Output directory for the main library file
        entryFileNames: '[name].js',
        format: 'module', // Changed format to 'es' for ES module
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      }, {
        dir: 'dist', // Output directory for the main library file
        entryFileNames: '[name].cjs',
        format: 'cjs',
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      }]
    },
  },
});

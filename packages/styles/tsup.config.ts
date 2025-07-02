import { defineConfig, Options } from 'tsup'
import {sassPlugin} from 'esbuild-sass-plugin'

const options: Options = {
    splitting: true,
    clean: true,
    dts: true,
    format: ['esm'],
    loader: {
      '.css': 'local-css',
      '.scss': 'local-css'
    },
    watch: false,
    target: 'es2020',
    
}

export default defineConfig([{
  entry: ['lib/components/*.scss', '!lib/components/_*.scss'],
  outDir: 'dist/components',
  esbuildPlugins: [sassPlugin({
    type: 'lit-css',
  })],
  ...options
},
{
  entry: ['lib/styles.scss'],
  outDir: 'dist',

  esbuildPlugins: [sassPlugin({
    type: 'css'
  })],
  ...options
}])
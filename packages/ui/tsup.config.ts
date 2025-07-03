import { defineConfig, Options } from 'tsup';
import envFilePlugin from 'esbuild-envfile-plugin';

const config: Options = {
  splitting: true,
  clean: true, // clean up the dist folder
  dts: true, // generate dts files
  format: ['cjs', 'esm'], // generate cjs and esm files
  skipNodeModulesBundle: true,
  watch: false,
  target: 'es2020',
  treeshake: true,
  outDir: 'dist',
  metafile: true,
  esbuildPlugins: [envFilePlugin]
}
export default defineConfig([{
  minify: true,
  bundle: true,
  noExternal: ["@studs/styles"],
  entry: ['src/**/*.ts', '!src/**/stories', "!src/vite-env.d.ts", "!src/utils/demo.ts", "!src/utils/_argTypes.ts"], //include all files under src
  ...config,
}, {
  minify: false,
  bundle: false,
  entry: ['src/index.ts'],
]);

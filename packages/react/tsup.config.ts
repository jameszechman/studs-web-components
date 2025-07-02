import { defineConfig, Options } from 'tsup';
import envFilePlugin from "esbuild-envfile-plugin";

const config: Options = {
  splitting: true,
  clean: true, // clean up the dist folder
  dts: true, // generate dts files
  format: ['cjs', 'esm'], // generate cjs and esm files
  skipNodeModulesBundle: true,
  external: ['react', 'react-dom', '@studs/styles'],
  watch: false,
  target: 'es2020',
  treeshake: true,
  outDir: 'dist',
  metafile: true,
  esbuildPlugins: [envFilePlugin]
}
export default defineConfig([{
  minify: true, // env === 'production',
  bundle: true, //env === 'production',
  noExternal: ["@studs/styles"],
  entry: ['src/**/*.tsx', 'src/**/*.ts', "!src/vite-env.d.ts", "!src/App.tsx"], //include all files under src
  ...config
}, {
  minify: false,
  bundle: false,
  entry: ['src/index.tsx'],
  ...config
}]);

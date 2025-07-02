const path = require('path');

module.exports = {
  components: './components.ts',
  outputPath: './dist',
  title: "STUDS",
  widths: [320, 768, 1024],
  baseUrl: '/playroom/',
  frameComponent: './src/FrameComponent.tsx',
  themes: './themes.ts',
  iframeSandbox: 'allow-scripts',
  defaultVisibleWidths: [
    320, 1024
    // subset of widths to display on first load
  ],
  defaultVisibleThemes: [
    'generalTools'// subset of themes to display on first load
  ],
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [path.resolve(__dirname,'./src')],
          use: [
            {
              loader: 'swc-loader',
            },
          ],
        },
        {
          test: /\.css$/i,
          include: [path.resolve(__dirname, '../../packages/react/dist')],
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  }),
  typeScriptFiles: [
    './**/*.{ts,tsx}',
    '!**/node_modules',
    'node_modules/@studs/react/**/*.{ts,tsx}',
    'node_modules/@studs/react/**/*.d.ts'],
}

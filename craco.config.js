const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: {
    alias: {},
    plugins: [
      new MonacoWebpackPlugin({
        languages: ["json", "javascript", "typescript", 'markdown'],
      })
    ],
    configure: { /* Any webpack configuration options: https://webpack.js.org/configuration */ },
    configure: (webpackConfig, { env, paths }) => webpackConfig
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
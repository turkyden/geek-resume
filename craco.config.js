const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    configure: { /* Any webpack configuration options: https://webpack.js.org/configuration */ },
    configure: (webpackConfig, { env, paths }) => { 
      webpackConfig.plugins.push(new MonacoWebpackPlugin({
        languages: ['json']
      }))
      return webpackConfig; 
    }
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
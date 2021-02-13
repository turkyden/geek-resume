const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  webpack: {
    alias: {},
    plugins: [
      new MonacoWebpackPlugin({
        languages: ["json", "javascript", "typescript", 'markdown'],
      })
    ],
    configure: {
      module: {
        rules: [
          {
            test: /\.md$/i,
            use: [
              {
                loader: 'raw-loader',
                options: {
                  esModule: false,
                },
              },
            ],
          },
        ],
      },
    },
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
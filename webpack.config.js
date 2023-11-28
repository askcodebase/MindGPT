const path = require('path')
const { DefinePlugin } = require('webpack')
const copy = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              modules: {
                auto: true,
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      }
    ]
  },
  plugins: [
    new copy({
      patterns: [{ from: 'public' }]
    })
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: process.env.PORT || 1234
  }
}

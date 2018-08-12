const path = require('path');

module.exports = {
  resolve: {
    modules: [
      path.resolve('./lib'),
      path.resolve('./node_modules')
    ]
  },
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'prop-types',
      'axios',
      'lodash.debounce',
      'lodash.pickby',
    ],
    app: ['./lib/renderers/dom.js']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [{ 
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env', 'stage-2']
        }
      }
    }]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
};
import path from 'path'
import {DefinePlugin} from 'webpack'

const CONTEXT = path.resolve(__dirname),
      {NODE_ENV} = process.env

var createPath = function(nPath) {
  return path.resolve(CONTEXT, nPath)
}

var config = {
  context: CONTEXT,
  entry: './src/index.ts',

  output: {
    path: createPath('dist'),
    library: 'angular2-locker',
    libraryTarget: 'umd',
    filename: 'locker.js'
  },

  plugins: [
    new DefinePlugin({
      __DEV__: NODE_ENV === 'development' || NODE_ENV === 'test'
    })
  ],

  module: {
    loaders: [{
      test: /\.ts/,
      loader: 'babel!ts',
      include: [createPath('src'), createPath('test')],
      exclude: [createPath('node_modules')]
    }]
  },

  externals: NODE_ENV === 'test' ? [] : [
    'angular2/core',
    'angular2/http'
  ],  

  resolve: {
    extensions: ['.ts', '.js','']
  }
}

module.exports = config

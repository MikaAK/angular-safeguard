import path from 'path'
import {DefinePlugin} from 'webpack'
import {devDependencies} from './package.json'

const CONTEXT = path.resolve(__dirname),
      {NODE_ENV} = process.env,
      IS_DEV = NODE_ENV === 'development',
      IS_TEST = NODE_ENV === 'test'

var createPath = function(nPath) {
  return path.resolve(CONTEXT, nPath)
}

var config = {
  context: CONTEXT,
  entry: './src/index.ts',
  devtool: IS_TEST ? '#inline-source-map' : false,

  output: {
    path: createPath('dist'),
    library: 'angular2-locker',
    libraryTarget: 'umd',
    filename: 'locker.js'
  },

  plugins: [
    new DefinePlugin({
      __DEV__: IS_DEV || IS_TEST
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

  externals: IS_TEST ? [] : Object.values(devDependencies),  

  resolve: {
    extensions: ['.ts', '.js','']
  }
}

module.exports = config

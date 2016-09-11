import path from 'path'
import {DefinePlugin} from 'webpack'
import {devDependencies} from './package.json'

const CONTEXT = path.resolve(__dirname),
      {NODE_ENV} = process.env,
      IS_DEV = NODE_ENV === 'development',
      IS_TEST = NODE_ENV === 'test',
      createPath = (nPath) => path.resolve(CONTEXT, nPath),
      SRC_PATH = createPath('src'),
      NODE_MODULES_PATH = createPath('node_modules')

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
      include: [SRC_PATH, createPath('test')],
      exclude: [NODE_MODULES_PATH]
    }, {
      test: /\.js/,
      loader: 'babel',
      include: [createPath('karma-shim')],
      exclude: [NODE_MODULES_PATH]
    }]
  },

  externals: IS_TEST ? [] : Object.keys(devDependencies),

  resolve: {
    extensions: ['.ts', '.js',''],
    root: SRC_PATH
  }
}

module.exports = config

import path from 'path'
import {DefinePlugin, ContextReplacementPlugin, LoaderOptionsPlugin} from 'webpack'
import {devDependencies} from './package.json'
import {AotPlugin} from '@ngtools/webpack'

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
  devtool: IS_TEST ? '#inline-source-map' : '#source-map',

  output: {
    path: createPath('dist'),
    library: 'angular-safeguard',
    libraryTarget: 'umd',
    filename: 'locker.js'
  },

  plugins: [
    new DefinePlugin({
      __DEV__: IS_DEV,
      __TEST__: IS_TEST
    }),

    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
      createPath('src')
    ),

    new AotPlugin({
      tsConfigPath: './tsconfig.json'
    })
  ],

  module: {
    rules: [{
      test: /\.ts$/,
      use: '@ngtools/webpack',
      include: [SRC_PATH, createPath('test')],
      exclude: [NODE_MODULES_PATH]
    }, {
      test: /\.js$/,
      use: 'babel',
      include: [createPath('karma-shim')],
      exclude: [NODE_MODULES_PATH]
    }]
  },

  externals: IS_TEST ? [] : Object.keys(devDependencies),

  resolve: {
    modules: ['node_modules', SRC_PATH],
    extensions: ['.ts', '.js']
  },

  resolveLoader: {
    moduleExtensions: ['-loader']
  }
}

if (IS_TEST)
  config.performance = {hints: false}

module.exports = config

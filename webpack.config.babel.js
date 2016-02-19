import path from 'path'

const CONTEXT = path.resolve(__dirname)

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

  module: {
    loaders: [{
      test: /\.ts/,
      loader: 'babel!ts',
      include: [createPath('src'), createPath('test')],
      exclude: [createPath('node_modules')]
    }]
  },

  resolve: {
    extensions: ['.ts', '.js','']
  }
}

module.exports = config

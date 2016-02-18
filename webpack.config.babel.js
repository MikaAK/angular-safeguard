import path from 'path'

const CONTEXT = path.resolve(__dirname)

var createPath = function(nPath) {
  return path.resolve(CONTEXT, nPath)
}

var config = {
  context: CONTEXT,
  entry: './src/Locker.ts',

  output: {
    path: createPath('dist'),
    filename: 'locker.js'
  },

  module: {
    loaders: [{
      test: /\.ts/,
      loader: 'babel!ts',
      include: [createPath('src')]
    }]
  },

  resolve: {
    extensions: ['.ts', '.js','']
  }
}

module.exports = config

import path from 'path'

const CONTEXT = path.resolve(__dirname)

var createPath = function(nPath) {
  return path.resolve(CONTEXT, nPath)
}

var config = {
  output: {
    path: createPath('dist'),
    filename: 'locker.js'
  },

  modules: [{
    test: /\.ts/,
    loader: 'babel!ts'
  }],

  resolve: {
    extensions: ['.ts', '.js','']
  }
}

module.exports = config

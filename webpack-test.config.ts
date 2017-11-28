import * as webpack from 'webpack'
import * as path from 'path'

export default {
  resolve: {
    extensions: [ '.ts', '.js', '.json' ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.spec.json'
            }
          }
        ],
        exclude: [
          /node_modules/
        ]
      },

      {
        test: /.ts$/,
        exclude: /(node_modules|\.spec\.ts|\.e2e\.ts$)/,
        loader: 'istanbul-instrumenter-loader',
        enforce: 'post'
      },

      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i
    }),

    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)esm5/,
      path.join(__dirname, 'src')
    )
  ],
  devServer: {
    color: true
  }
} as webpack.Configuration

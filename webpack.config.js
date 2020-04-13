const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'
const devMode = mode === 'development'

module.exports = {
  entry: {
    bundle: [
      '@webcomponents/custom-elements',
      './src/index.js'
    ]
  },
  mode,
  devtool: devMode ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /(\.m?js?$)|(\.svelte$)/,
				exclude: /\bcore-js\b/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  "browsers": [
                    "ie >= 10"
                  ]
                },
                useBuiltIns: "entry",
                corejs: 3
              }]
            ],
            sourceType: 'unambiguous'
          }
        }
      },
      {
        test: /\.svelte$/,
        exclude: /public/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2 } },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public', 'index.html'),
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new TerserPlugin({
        cache: false,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    host: '0.0.0.0',
    port: 9001,
    historyApiFallback: true
  }
}

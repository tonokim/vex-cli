'use strict'
const path = require('path')
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer')


module.exports = {
  mode:'production',
  entry: {
    bundle: [
      // "babel-polyfill", 
      "./src/index"
    ],
    vendor: [
      "vue", 
      "vue-router",
    ],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: "/",
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "[name].[chunkhash:8].js"
  },
  optimization:{
    minimize: true,
    // minimizer:{
    //     new UglifyJsPlugin({
    //         cache: true,
    //         parallel: true,
    //         sourceMap: true // set to true if you want JS source maps
    //     }),
    //     new OptimizeCSSAssetsPlugin({})
    // },
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -20,
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: `${__dirname}/public`,
        to: `${__dirname}/dist`
      },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': `${__dirname}/src`,
    }
  },
}
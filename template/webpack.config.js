'use strict'
const path = require('path')
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode:'development',
  entry: {
    app: './src/index'
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: "/",
    filename: "main.js",
  },
  devServer: {
    hot: true,
    contentBase: `${__dirname}/public`,
    port: 3599,
    host: '0.0.0.0',
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      '/v1': {
        target: 'http://localhost:3580',
        secure: false
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
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': `${__dirname}/src`,
    }
  },
}
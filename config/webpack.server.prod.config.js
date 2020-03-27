const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const uglifyjs = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base.config');
module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]/[name].[hash:8].css',
    }),
    new uglifyjs()
  ]
});
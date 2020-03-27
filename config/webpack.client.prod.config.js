const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const uglifyjs = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base.config');
module.exports = merge(base, {
  plugins: [
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, '../src/index.html'), to: path.resolve(__dirname, '../dist')}]),
    new MiniCssExtractPlugin({
      filename: 'css/[name]/[name].[hash:8].css',
    }),
    new uglifyjs()
  ]
});
const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const base = require('./webpack.base.config');
module.exports = merge(base, {
  plugins: [
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, '../src/index.html'), to: path.resolve(__dirname, '../dist')}])
  ]
});
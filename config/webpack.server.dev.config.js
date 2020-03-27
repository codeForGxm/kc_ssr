const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const base = require('./webpack.base.config');
module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
  ]
});
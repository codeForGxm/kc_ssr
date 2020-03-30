const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const uglifyjs = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base.config');
module.exports = merge(base, {
  optimization: {
    splitChunks:{
      cacheGroups: {
        publicSource: {
          chunks: 'all',
          name: 'publicSource',
          // test: /[\\/]src[\\/]common[\\/]public-source[\\/]/,
          test: /[\\/]src[\\/]common[\\/]/,
          minSize: 0,
          minChunks: 2
        },
        nodeCommon: {
          name: 'nodeCommon',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all',
          enforce: true
        },
        vue: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          name: 'vue',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: 2
        },
        swiper: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]swiper[\\/]/,
          name: 'swiper',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: 2
        },
        fastclick: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]fastclick[\\/]/,
          name: 'fastclick',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: 2
        },
        qrcode: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]qrcode[\\/]/,
          name: 'qrcode',
          minChunks: 3,
          maxInitialRequests: 10,
          minSize: 0,
          priority: -1
        },
        'html2canvas': {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]html2canvas[\\/]/,
          name: 'html2canvas',
          minChunks: 4,
          maxInitialRequests: 10,
          minSize: 0,
          priority: -1
        },
        'kc-log': {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]kc-log[\\/]/,
          name: 'kc-log',
          minChunks: 1,
          maxInitialRequests: 10,
          minSize: 0,
          priority: -1
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, '../src/index.html'), to: path.resolve(__dirname, '../dist')}]),
    new MiniCssExtractPlugin({
      filename: 'css/[name]/[name].[hash:8].css',
    }),
    new uglifyjs()
  ]
});
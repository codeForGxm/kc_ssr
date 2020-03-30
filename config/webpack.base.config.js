const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV == 'production'
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.js', '.css', '.vue', '.json', '.less'],
    alias:{
      '@': path.resolve('./src'),
      '@api': path.resolve('./src/api'),
      '@common': path.resolve('./src/common')
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader?cacheDirectory']
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory']
      },
      {
        test: /\.(less|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,    // 10Kb
            name: 'static/imgs/[name].[hash].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/medias/[name].[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
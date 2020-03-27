/**
 * 根据基础配置，根据路由配置，生成多个页面各自的webpack配置。主要功能是：把js和server文件分开不同目录，按文件划分目录。
 */
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
function getPages() {
  // 匹配基础项
  const fileConfig = {
    html: 'index.html',
    pattern: ['../src/pages/*']
  };
  const _pages = {};
  const _pageEntries = fileConfig.pattern.map(e => {
    const _matches = glob.sync(path.resolve(__dirname, e));
    return _matches.filter(match => fs.existsSync(`${match}`))
  });
  [].concat.apply([], _pageEntries).forEach(dir => {
    const _filename = dir.split('pages/')[1];
    const _pathName = `./src${dir.split('src')[1]}`;
    _pages[_filename] = {
      entry: `${_pathName}`,
      filename: `html/${_filename}`,
      chunks: ['publicSource', 'nodeCommon', 'vue', 'swiper', 'kc-log', 'fastclick', _filename],
      dirName: _filename
    }
  });
  return _pages;
}
let allPages = getPages()
let webpackConfigMap = {};
for (let key in allPages) {
    let page = allPages[key]
    // let hashName = '[chunkhash:8]'
    // console.log(hashName, hashName)
    let cConfig = merge({}, clientConfig, {
      entry: {
        [page.dirName]: `${page.entry}/entry-client.js`        //buildEntryFiles生成的配置文件
      },
      output: {
        filename: isProd ? `js/${page.dirName}/[name].[chunkhash:8].js` : `js/${page.dirName}/[name].js` //dist目录
      },
      plugins: [
        new VueSSRClientPlugin({
          filename: `server/${page.dirName}/vue-ssr-client-manifest.json`//dist目录
        }),
        // new HtmlWebpackPlugin({
        //   template: path.resolve(__dirname, '../src/index.html'),
        //   filename: `${page.filename}/index.html`
        // })
      ]
    });
    let sConfig = merge({}, serverConfig, {
      entry: {
        [page.dirName]: `${page.entry}/entry-server.js`        //buildEntryFiles生成的配置文件
      },
      output: {
        filename: isProd ? `js/${page.dirName}/[name].[chunkhash:8].js` : `js/${page.dirName}/[name].js` //dist目录
      },
      plugins: [
        new VueSSRServerPlugin({
            filename: `server/${page.dirName}/vue-ssr-server-bundle.json`       //dist目录
        })
      ]
    });
    webpackConfigMap[page.dirName] = {clientConfig: cConfig, serverConfig: sConfig};
}
module.exports = webpackConfigMap;
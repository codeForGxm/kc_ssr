/**
 * 根据基础配置，根据路由配置，生成多个页面各自的webpack配置。主要功能是：把js和server文件分开不同目录，按文件划分目录。
 */
const isProd = process.env.NODE_ENV === 'production';
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const clientConfig = isProd?require('./webpack.client.prod.config'):require('./webpack.client.dev.config');
const serverConfig = isProd?require('./webpack.server.prod.config'):require('./webpack.server.dev.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

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
        filename: isProd ? `${page.dirName}/[name].[chunkhash:8].js` : `${page.dirName}/[name].js`, //dist目录
        // chunkFilename: isProd ? 'chunks/[name]/[name].[chunkhash:8].js':'chunks/[name]/[name].js'
      },
      plugins: [
        new VueSSRClientPlugin({
          filename: `${page.dirName}/vue-ssr-client-manifest.json`//dist目录
        }),
      ]
    });
    let sConfig = merge({}, serverConfig, {
      entry: {
        [page.dirName]: `${page.entry}/entry-server.js`        //buildEntryFiles生成的配置文件
      },
      output: {
        filename: isProd ? `${page.dirName}/[name].[chunkhash:8].js` : `${page.dirName}/[name].js` //dist目录
      },
      plugins: [
        new VueSSRServerPlugin({
            filename: `${page.dirName}/vue-ssr-server-bundle.json`       //dist目录
        })
      ]
    });
    webpackConfigMap[page.dirName] = {clientConfig: cConfig, serverConfig: sConfig};
}
module.exports = webpackConfigMap;
const fs = require('fs')
const path = require('path')
// memory-fs可以使webpack将文件写入到内存中，而不是写入到磁盘。
const MFS = require('memory-fs')
const webpack = require('webpack')
const appEntry = require('./mutipageConfig');
const chokidar = require('chokidar')

// webpack热加载需要
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
// 配合热加载实现模块热替换
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
  
module.exports = function setupDevServer(app, pageName, cb) {
  const clientConfig = appEntry[pageName].clientConfig
  const serverConfig = appEntry[pageName].serverConfig
  let bundle
  let clientManifest
  let template
 // 读取vue-ssr-webpack-plugin生成的文件
  const readFile = (fs, file) => {
    try {
      return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    } catch (e) {
      console.log('读取文件错误：', e)
    }
  }
  // 监听改变后更新函数
  const update = () => {
    if (bundle && clientManifest) {
      cb(bundle, clientManifest)
    }
  }

  // 修改webpack配合模块热替换使用
  // 多页开发环境下制定 hot middleware 配置工作目录 __webpack_hmr_，否则后续打包的页面无法正常工作
  let HMRPath = '/__webpack_hmr_' + clientConfig.entry[pageName]
  clientConfig.entry = ['webpack-hot-middleware/client?timeout=2000&reload=true&path='+HMRPath, clientConfig.entry[pageName]]
  // clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  // 编译clinetWebpack 插入Koa中间件
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  app.use(devMiddleware)
 
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      `${pageName}/vue-ssr-client-manifest.json`
    ))
    update()
  })
 
  // 插入Koa中间件(模块热替换)
  app.use(webpackHotMiddleware(clientCompiler, {
    heartbeat: 5000,
    path:HMRPath
  }))
 
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return
 
    //  vue-ssr-webpack-plugin 生成的bundle
    bundle = JSON.parse(readFile(mfs, `${pageName}/vue-ssr-server-bundle.json`))
    update()
  })
}
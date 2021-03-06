const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const titleConfig = require('../common-conf-files/title/index')
const fs = require('fs');
const glob = require('glob');
const setupDevServer = require('../config/set-dev-server')
const { createBundleRenderer } = require('vue-server-renderer');
const backendApp = new Koa();
const backendRouter = new Router();

// 跨域配置
const crosConfig = require('./cors')
backendApp.use(crosConfig)
// 代理配置(跨域一定要注册在代理之前。坑。。。。。。大坑)
const proxyConig = require('./proxy')
backendApp.use(proxyConig)

function getPages() {
  // 匹配基础项
  const fileConfig = {
    pattern: ['../src/pages/*']
  };
  const _pages = [];
  const _pageEntries = fileConfig.pattern.map(e => {
    const _matches = glob.sync(path.resolve(__dirname, e));
    return _matches.filter(match => fs.existsSync(`${match}`))
  });
  [].concat.apply([], _pageEntries).forEach(dir => {
    const _filename = dir.split('pages/')[1];
    _pages.push(_filename)
  });
  return _pages;
}
let allPages = getPages()
if (process.env.NODE_ENV === 'production') {
  allPages.forEach(ele => {
    const serverBundle = require(path.resolve(__dirname, `../dist/${ele}/vue-ssr-server-bundle.json`));
    const clientManifest = require(path.resolve(__dirname, `../dist/${ele}/vue-ssr-client-manifest.json`));
    const template = fs.readFileSync(path.resolve(__dirname, `../dist/index.html`), 'utf-8');
    let bundleRenderer = createBundleRenderer(serverBundle, {
      runInNewContext: false,
      template: template,
      clientManifest: clientManifest
    });
    const render = (ctx) => {
      // 渲染上下文
      const context = {
        url: ctx.url,
        title: titleConfig[ele] || '考虫'
      }
      const ssrStream = bundleRenderer.renderToStream(context);
      ctx.status = 200;
      ctx.type = 'html';
      ctx.body = ssrStream;
    }
    // backendRouter.get('*', render)
    backendRouter.get(`/${ele}/index.html*`, render)
  });
} else {
  allPages.forEach(ele => {
    let bundleRenderer = null
    setupDevServer(backendApp, ele, (bundle, clientManifest) => {
      // 赋值
      const template = fs.readFileSync(path.resolve(__dirname, `../src/index.html`), 'utf-8');
      bundleRenderer = createBundleRenderer(bundle, {
        runInNewContext: false,
        template: template,
        clientManifest
      })
      const render = (ctx) => {
        // 渲染上下文
        const context = {
          url: ctx.url,
          title: titleConfig[ele] || '考虫'
        }
        const ssrStream = bundleRenderer.renderToStream(context);
        ctx.status = 200;
        ctx.type = 'html';
        ctx.body = ssrStream
      }
      backendRouter.get(`/${ele}/index.html*`, render)
    })
  })
}
// 后端Server
backendApp.use(serve(path.resolve(__dirname, '../dist')));

backendApp
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods());
backendApp.listen(3000, () => {
  console.log('服务器端渲染地址： http://localhost:3000');
});

const proxy = require('koa2-proxy-middleware'); //引入代理模块
const options = {
  targets: {
      '/api/(.*)': {
          target: 'http://kcapp.rdtest.xuanke.com',
          changeOrigin: true,
      },
  }
}
module.exports = proxy(options)
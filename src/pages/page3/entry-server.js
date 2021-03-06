import { createApp } from './app.js';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, store, router, App } = createApp();
    let allRequests = []
    if (App.asyncData && App.asyncData.length > 0) {
        App.asyncData.forEach(ele => {
          allRequests.push(ele)
        })
    }
    Promise.all(allRequests.map(req => {
      return req({store})
    })).then(() => {
      // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中
      context.state = store.state;
      // 返回根组件
      resolve(app);
    });
  });
}
// import { createApp } from './app.js';

// export default context => {
//   return new Promise((resolve, reject) => {
//     console.log('--00----')
//     const { app, store, router, App } = createApp();
//     console.log('------', context.url, App)
//     router.push(context.url);

//     router.onReady(() => {
//       const matchedComponents = router.getMatchedComponents();

//       if (!matchedComponents.length) {
//         return reject({ code: 404 });
//       }
//       let allRequests = []
//       matchedComponents.forEach(component => {
//         if (component.asyncData && component.asyncData.length > 0) {
//           component.asyncData.forEach(ele => {
//             allRequests.push(ele)
//           })
//         }
//       });
//       Promise.all(allRequests.map(req => {
//         return req({store})
//       })).then(() => {
//         // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中
//         context.state = store.state;
//         // 返回根组件
//         resolve(app);
//       });
//     }, reject);
//   });
// }
// export default context => {
//   return new Promise((resolve, reject) => {
//       setTimeout(() => {              //模拟拉取接口获取数据
//           var data = {
//             msg: 'page1 data'
//           };
//           context.state = data;        //生成到tpl.html中作为浏览器端全局变量
//           const { app } = createApp(data);
//           console.log(a)
//           resolve(app);
//       }, 100);
//       //reject({code: 500});  //对应server.js的baseRender方法
//   })
// }




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
      return req(store)
    })).then(() => {
      // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 状态，自动嵌入到最终的 HTML 中
      context.state = store.state;
      // 返回根组件
      resolve(app);
    });
  });
}
## 项目名称
kc_ssr

## 项目介绍
该项目为了-旧有项目的freemarker方式 进行vue-ssr的升级改造：

# install dependencies
npm install
# serve in dev mode, with hot reload at localhost:3000
npm run dev
# build for production 
npm run build
# build for production and start server
npm run dev_build
# 其他介绍
- 1、server/server.js 配置http server，开dev方式下，引用了config/set-dev-server.js（进行热重载）

- 2、src/pages/** entry-client.js entry-server.js 分别用以区分客户端和服务端入口，entry-client.js：server进行渲染初始状态之后，由客户端进行接管进行后续

- 3、entry-server.js 检测page中所需要的异步数据，由server进行预操作（检测asyncData进行预取，这里用VUEX进行配合，主要为满足one page 多个server接口返回初始数据，需要进行预取数据的复杂情形，如果one page one api进行初始数据渲染，可以采用props这种更加简单的方式）

- 4、page中 asyncData 采用数组的方式（满足多个api需要预取数据）

  预取方式：store.dispatch('getInitData', {initData: fetchBar, 'key': 'bar'})

  其中 fetchBar 为异步获取数据的接口

  bar 为取到数据之后，数据存放在 state.initPageData 的键值（如果one page 多个api进行语句，主要key值不要重复，负责后面的数据会覆盖前面的数据）

  store中根据initData，和 key 用来获取 page中传入的异步接口和数据存放key，值

- 5、store 中 initPageData带个per page的预取数据，在切换页面的时候，会进行覆盖。（这里并没有采用 per page or compennt懒注册的方式，因为切换会覆盖，不存在 muti page 公用数据 造成数据污染的问题）



文档和技术方案还要很多有待完善。。。。。
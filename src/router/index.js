import Vue from 'vue';
import Router from 'vue-router';
import Test1 from '../views/test1/index'
Vue.use(Router);

function createRouter() {
  const routes = [
    {
      path: '/page1/index.html/test1',
      component: Test1
    }
    // {
    //   path: '/test2',
    //   component: () => import('../views/test2/index.vue')   // 异步路由
    // }
  ];

  const router = new Router({
    mode: 'history',
    routes
  });

  return router;
}

export default createRouter;
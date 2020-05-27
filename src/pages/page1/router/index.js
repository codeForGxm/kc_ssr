import Vue from 'vue';
import Router from 'vue-router';
import Test1 from '../views/test1'
import Test2 from '../views/test2'
import Index from '../views/index'
Vue.use(Router);

function createRouter() {
  const routes = [
        {
          path:'/page1/index.html/index',
          component: Index
        },
        {
          path:'/page1/index.html/test1',
          component: Test1
        },
        {
          path: '/page1/index.html/test2',
          component: Test2
        },
        {
        path: "*",
        redirect: () => {
          return '/page1/index.html/index'
        }
      }
  ];
  const router = new Router({
    mode: 'history',
    routes
  });

  return router;
}

export default createRouter;
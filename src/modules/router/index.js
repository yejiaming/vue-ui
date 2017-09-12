/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/10/24 17:33
 * @version $ 路由
 */

/* name module */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component(resolve) {
      require(["@views/home"],resolve);
    },
  },
  {
    path: '/picker',
    name: 'picker',
    component(resolve) {
      require(["@views/picker/"],resolve);
    },
  },
  {
    path: '*', redirect: '/'
  }
];

const router = new Router({
  mode: 'hash',
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;

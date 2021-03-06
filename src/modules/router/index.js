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
    path: '/selfScroll',
    name: 'selfScroll',
    component(resolve) {
      require(["@views/self-scroll"],resolve);
    },
  },
  {
    path: '/scroll',
    name: 'scroll',
    component(resolve) {
      require(["@views/scroll"],resolve);
    },
  },
  {
    path: '/spinner',
    name: 'spinner',
    component(resolve) {
      require(["@views/spinner"],resolve);
    },
  },

  {
    path: '/sticky',
    name: 'sticky',
    component(resolve) {
      require(["@views/sticky"],resolve);
    },
  },
  {
    path: '/stickyComponentDemo',
    name: 'stickyComponentDemo',
    component(resolve) {
      require(["@views/sticky-component-demo"],resolve);
    },
  },
  {
    path: '/stickyFirstEdition',
    name: 'stickyFirstEdition',
    component(resolve) {
      require(["@views/sticky-first-edition"],resolve);
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
    path: '/pickerFirstEdition',
    name: 'pickerFirstEdition',
    component(resolve) {
      require(["@views/picker-first-edition/"],resolve);
    },
  },
  {
    path: '/datePicker',
    name: 'datePicker',
    component(resolve) {
      require(["@views/date-picker/"],resolve);
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

import Vue from 'vue';
import Router from 'vue-router';
import Terminal from './views/Terminal.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Terminal',
      component: Terminal,
    },
    {
      path: '/human',
      name: 'Human',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Human.vue'),
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('./views/404.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

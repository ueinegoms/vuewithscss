import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/grower/:id',
      name: 'grower-id',
      component: () => import(/* webpackChunkName: "about" */ './views/Grower.vue')
    },
    {
      path: '/grower',
      name: 'grower',
      component: () => import(/* webpackChunkName: "about" */ './views/Grower.vue')
    },
    {
      path: '/properties',
      name: 'properties',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Properties.vue')
    },
    {
      path: '/properties/:grower',
      name: 'properties-params',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Properties.vue')
    },
    {
      path: '/propertie/:prop',
      name: 'propertie-forms',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Properties.vue')
    },
    {
      path: '/propertie',
      name: 'propertie',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Properties.vue')
    },
  ]
})

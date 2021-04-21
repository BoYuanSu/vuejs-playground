import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/oh-bot',
    name: 'OhBot',
    component: () => import(/* webpackChunkName: "oh-bot" */ '../pages/OhBot')
  },
  {
    path: '*',
    redirect: 'Home'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

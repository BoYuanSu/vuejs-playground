import Vue from 'vue'
import VueRouter from 'vue-router'
import OhBot from '../pages/OhBot'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'OhBot',
    component: OhBot
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

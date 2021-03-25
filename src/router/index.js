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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

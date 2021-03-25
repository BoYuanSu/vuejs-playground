import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './plugins/boostrap'
import dayjs from './plugins/dayjs'

Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

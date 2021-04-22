import Vue from 'vue'
import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 5000
})

Vue.prototype.$service = service

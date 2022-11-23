import Vue from 'vue'
// import 'windi.css'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import { PiniaVuePlugin, createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  pinia,
})

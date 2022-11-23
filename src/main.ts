import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
// elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'windi.css'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import 'virtual:svg-icons-register'

import { PiniaVuePlugin, createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'

Vue.use(PiniaVuePlugin)
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

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

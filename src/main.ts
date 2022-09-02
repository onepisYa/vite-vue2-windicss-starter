import VueTailwind from 'vue-tailwind'

import Vue from 'vue'
import 'windi.css'
import { PiniaVuePlugin, createPinia } from 'pinia'
import { components } from '@/setting-tailwind-vue'
import router from '@/router'
import App from '@/App.vue'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(VueTailwind, components)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  pinia,
})

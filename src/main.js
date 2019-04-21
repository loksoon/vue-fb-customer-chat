import Vue from 'vue'
import App from './App.vue'
import VueFbCustomerchat from '../dist/vue-fb-customerchat.umd.js'

Vue.use(VueFbCustomerchat, {
  page_id: 562547237566000,
  theme_color: '#2c3e50',
  minimized: true,
  locale: 'en_US'
})

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')

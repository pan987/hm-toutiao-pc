import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/index.js'
import axios from '@/api'
// import myBread from '@/components/my-bread'
// Vue.component('my-bread', myBread)
import plugin from '@/components'
Vue.use(plugin)

Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

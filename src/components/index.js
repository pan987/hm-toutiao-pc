import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel.vue'
import MyImage from '@/components/my-image.vue'
export default {
  install (Vue) {
    // Vue 是一个构造函数
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', MyChannel)
    Vue.component('MyImage', MyImage)
  }
}

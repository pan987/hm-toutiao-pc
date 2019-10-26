import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import notFound from '@/views/notfind'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [{
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: Home,
    children: [{
      path: '',
      component: Welcome
    }]
  },
  {
    path: '*',
    component: notFound
  }
  ]
})

export default router

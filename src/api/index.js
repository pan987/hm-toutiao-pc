import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器,监听响应状态码,如果是401(你传递一个失效的token给服务器/用户可能没有传token),跳转到登录页
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(error)
})
export default axios

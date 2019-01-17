/* 获取axios模块 */
import axios from 'axios'
/* 设置基准路径 */
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
/* axios拦截器判断请求中是否携带token， 设置token请求头 */
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('token')
  if (token) {
    /* 设置请求头 */
    // Authorization字段不是随便加的，它是前后台约定好的字段
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
/* 发送请求 */
export const login = obj => axios.post('login', obj)

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
// import 'https://cdn.bootcss.com/animate.css/3.7.0/animate.css'

// 使用element-ui插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* 添加路由守卫，进行登录跳转限制 */
router.beforeEach((to, from, next) => {
  // ...
  /* 判断是否有token值，有就表示已经  登录  直接跳到下一步 */
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    /* 没有token值，是否访问登录页，是就跳到登录页 */
    if (to.name === 'login') {
      next()
    } else {
      next('/login')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

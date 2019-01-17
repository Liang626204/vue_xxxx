import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Login from './views/login.vue'
import Home from './views/home.vue'
import Welcome from './views/welcome.vue'

Vue.use(Router)

/* 设置 */

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      /* 重定向 */
      redirect: { name: 'welcome' },
      children: [
        { name: 'welcome', path: 'welcome', component: Welcome },
        { name: 'userlist', path: 'userlist', component: () => import(/* webpackChunkName: "userlist" */ './views/userlist.vue') }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

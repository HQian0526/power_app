// import Router from 'vue-router' //vue2
import { createRouter, createWebHashHistory } from "vue-router" //vue3

// Vue.use(Router) //vue2

const routes = [
  {
    path: '/',
    redirect:'/home',
  },
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/components/login.vue'),
    meta: { needLogin:false }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/components/home.vue'),
    meta: { needLogin:true }
  },
  {
    path: '/analyse',
    name: 'analyse',
    component: () => import('@/views/analyse/components/analyse.vue'),
    meta: { needLogin:true }
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@/views/store/components/store.vue'),
    meta: { needLogin:true }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/userInfo/components/userInfo.vue'),
    meta: { needLogin:true }
  },
  {
    path: '/rankList',
    name: 'rankList',
    component: () => import('@/views/home/components/rankList.vue'),
    meta: { needLogin:true }
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router

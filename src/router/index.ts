/*
 * @Author:
 * @Date: 2022-08-30 10:32:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-30 22:19:38
 * @FilePath: /vite-vue2-windicss-starter/src/router/index.ts
 * @Description:
 */
import Vue from 'vue'
import type { RouteConfig } from 'vue-router'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import Test from '@/views/Test/Test.vue'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    // NOTE: you can also apply meta information
    // meta: {authRequired: false }
    component: Home,
    // NOTE: you can also lazy-load the component
    // component: () => import("@/views/About.vue")
  },
  {
    path: '/onepisya',
    name: 'Test',
    component: Test,
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
})

export default router

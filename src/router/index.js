import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutPage.vue')
  },
  {
    path: '/slot',
    name: 'Slot',
    component: () => import('@/views/Slot/parent.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router

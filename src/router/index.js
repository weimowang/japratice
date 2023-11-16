import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        return { path: '/practice' }
      }
    },
    {
      path: '/practice',
      meta: { title: '練習' },
      component: () => import('../views/layout/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'practice',
          meta: { title: '練習' },
          component: () => import('../views/practice/index.vue')
        }
      ]
    },
    {
      path: '/note',
      name: 'note',
      component: () => import('../views/layout/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'note',
          meta: { title: '筆記' },
          component: () => import('../views/note/index.vue')
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/layout/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'test',
          meta: { title: '測驗' },
          component: () => import('../views/test/index.vue')
        },
        {
          path: 'simpletest/:category',
          name: 'simpletest',
          meta: { title: '簡單測驗' },
          component: () => import('../views/test/category/simpletest.vue')
        }
      ]
    }
  ]
})

export default router

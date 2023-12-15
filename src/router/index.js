// Composables
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/admin',
    component: () => import('../layouts/default/Default.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/HomePage.vue'),
      },
      {
        path: 'user',
        component: () => import('../views/UserList.vue'),
      },
      {
        path: 'product',
        component: () => import('../views/ListProduct.vue'),
      },
      {
        path: 'category',
        component: () => import('../views/Category.vue'),
      },
      {
        path: 'account_staff',
        component: () => import('../views/AccountStaff.vue'),
      },
      {
        path: 'transactionList',
        component: () => import('../views/TransactionList.vue'),
      },
      {
        path: 'userEdit',
        component: () => import('../views/UserProfileEdit.vue'),
      },

    ],
  },
  {
    path: '/',
    component: () => import('../components/Login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



export default router

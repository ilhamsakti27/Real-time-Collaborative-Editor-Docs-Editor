import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line import/no-cycle
// import store from '@/store'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: 'App',
  // },
  {
    path: '/',
    redirect: 'dashboard',
  },
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   component: () => import('@/views/Home.vue'),
  //   meta: {
  //     pageTitle: 'Dashboard',
  //   },
  // },
  // {
  //   path: '/customers',
  //   name: 'customers',
  //   component: () => import('@/views/customer/Customer.vue'),
  //   meta: {
  //     pageTitle: 'Pelanggan',
  //   },
  // },
  // {
  //   path: '/customers/add',
  //   name: 'customer-add',
  //   component: () => import('@/views/customer/CustomerAdd.vue'),
  //   meta: {
  //     pageTitle: 'Tambah Pelanggan',
  //   },
  // },
  // {
  //   path: '/customers/detail/:id',
  //   name: 'customer-detail',
  //   component: () => import('@/views/customer/CustomerDetail.vue'),
  //   meta: {
  //     pageTitle: 'Detail Pelanggan',
  //   },
  //   props: true,
  // },
  // {
  //   path: '/products',
  //   name: 'products',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Produk',
  //   },
  // },
  // {
  //   path: '/chats',
  //   name: 'chats',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Chat',
  //   },
  // },
  // {
  //   path: '/prospects',
  //   name: 'prospects',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Prospek',
  //   },
  // },
  // {
  //   path: '/tickets',
  //   name: 'tickets',
  //   component: () => import('@/views/ticket/Ticket.vue'),
  //   meta: {
  //     pageTitle: 'Tiket',
  //   },
  // },
  // {
  //   path: '/reports',
  //   name: 'reports',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Laporan',
  //   },
  // },
  // {
  //   path: '/activities',
  //   name: 'activities',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Aktivitas',
  //   },
  // },
  // {
  //   path: '/users',
  //   name: 'users',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Pengguna',
  //   },
  // },
  // {
  //   path: '/teams',
  //   name: 'teams',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Tim',
  //   },
  // },
  // {
  //   path: '/integrations',
  //   name: 'integrations',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Integrasi',
  //   },
  // },
  // {
  //   path: '/marketings',
  //   name: 'marketings',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Marketing',
  //   },
  // },
  // {
  //   path: '/workflows',
  //   name: 'workflows',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Workflow',
  //   },
  // },
  // {
  //   path: '/corporationsetting',
  //   name: 'corporationsetting',
  //   component: () => import('@/views/SecondPage.vue'),
  //   meta: {
  //     pageTitle: 'Pengaturan',
  //   },
  // },
  // {
  //   path: '/login',
  //   name: 'auth-login',
  //   component: () => import('@/views/Login.vue'),
  //   meta: {
  //     layout: 'blank',
  //     public: true,
  //   },
  //   beforeEnter: (to, from, next) => {
  //     const { isAuthenticated } = store.state.auth
  //     if (isAuthenticated) {
  //       next(from)
  //     } else {
  //       next()
  //     }
  //   },
  // },
  // {
  //   path: '*',
  //   redirect: 'error-404',
  // },
  // {
  //   path: '/404',
  //   name: 'error-404',
  //   component: () => import('@/views/Error404.vue'),
  //   meta: {
  //     layout: 'blank',
  //   },
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

// router.beforeEach(async (to, from, next) => {
//   window.document.title = to.meta && to.meta.pageTitle ? `${to.meta.pageTitle} | AdminCRM - Next-gen CRM Solution` : 'AdminCRM - Next-gen CRM Solution'

//   const hasToken = localStorage.getItem('token')
//   const { isAuthenticated } = store.state.auth

//   if (!isAuthenticated) {
//     if (hasToken) {
//       store.dispatch('checkExpiredToken')
//       next()
//     } else {
//       // eslint-disable-next-line no-lonely-if
//       if (to.path !== '/login') {
//         next('/login')
//       } else {
//         next()
//       }
//     }
//   } else {
//     next()
//   }
// })

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Init from '../views/Init.vue'

Vue.use(VueRouter)

const constantRouterMap = [
  {
    path: '/',
    name: 'Init',
    component: Init,
    meta: {
      fillUser: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      fillUser: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register.vue'),
    meta: {
      fillUser: false
    }
  },
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: () => import('../views/userInfo.vue'),
    meta: {
      fillUser: true
    }
  },
  {
    path: '/dataCenter',
    name: 'dataCenter',
    component: () => import('../views/dataCenter/index.vue'),
    meta: {
      fillUser: true
    }
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('../views/content/index.vue'),
    meta: {
      fillUser: true
    }
  },
  {
    path: '/publicAssets',
    name: 'publicAssets',
    component: () => import('../views/publicAssets/index.vue'),
    meta: {
      fillUser: true
    }
  }, {
    path: '/edit_h5',
    name: 'edit_h5',
    component: () => import('../views/h5/index'),
    meta: {
      fillUser: true
    }
  }, {
    path: '/edit_video',
    name: 'edit_video',
    component: () => import('../views/video/index'),
    meta: {
      fillUser: true
    }
  },
  // 权限路由
  {
    path: '/myAssets',
    name: 'myAssets',
    component: () => import('../views/myAssets/index.vue'),
    meta: {
      roles: 1,
      fillUser: true
    }
  },
  {
    path: '/manageMer',
    name: 'manageMer',
    component: () => import('../views/manageMer/index.vue'),
    meta: {
      roles: 2,
      fillUser: true
    }
  },
  {
    path: '/addM',
    name: 'addM',
    component: () => import('../views/manageMer/addM.vue'),
    meta: {
      roles: 2,
      fillUser: true
    }
  },
  {
    path: '/updateInfo',
    name: 'updateInfo',
    component: () => import('../views/manageMer/updateInfo.vue'),
    meta: {
      roles: 2,
      fillUser: true
    }
  },
  {
    path: '/statement',
    name: 'statement',
    component: () => import('../views/statement.vue'),
    meta: {
      fillUser: true
    }
  },
  {
    path: '/actionTutorial',
    name:'actionTutorial',
    component: () => import('../views/operatingManual/index.vue'),
    meta: {
      fillUser: true
    }
  }
]

export const asyncRouteMap = []

const router = new VueRouter({
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') return next()
  const tokenStr = window.sessionStorage.getItem('id')
  if (!tokenStr) return next('/login')
  next()
})

export default router

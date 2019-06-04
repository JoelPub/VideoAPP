import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import passwordLogin from '@/components/passwordLogin'
import PersonalCenter from '@/components/PersonalCenter'
import Redeem from '@/components/Redeem'
import productInfo from '@/components/productInfo'
import configInfo from '@/components/configInfo'
import shoppCart from '@/components/shoppCart'
import activityCenter from '@/components/activityCenter'
import expressStatus from '@/components/expressStatus'
import wechatLogin from '@/components/wechatLogin'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/2',
    //   name: 'login',
    //   component: resolve => require(['@/components/login'], resolve)
    // },
    {
      path: '/',
      name: 'indexPage',
      component: resolve => require(['@/components/indexPage'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/wechatLogin'], resolve)
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: resolve => require(['@/components/login'], resolve)
    // },
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: resolve => require(['@/components/PersonalCenter'], resolve)
    },
    {
      path: '/Redeem',
      name: 'Redeem',
      component: resolve => require(['@/components/Redeem'], resolve)
    },
    {
      path: '/passwordLogin',
      name: 'passwordLogin',
      component: resolve => require(['@/components/passwordLogin'], resolve)
    },
    {
      path: '/registered',
      name: 'registered',
      component: resolve => require(['@/components/registered'], resolve)
    },
    {
      path: '/configInfo',
      name: 'configInfo',
      component: resolve => require(['@/components/configInfo'], resolve)
    },
    {
      path: '/productInfo',
      name: 'productInfo',
      component: resolve => require(['@/components/productInfo'], resolve)
    },
    {
      path: '/shoppCart',
      name: 'shoppCart',
      component: resolve => require(['@/components/shoppCart'], resolve)
    },

    {
      path: '/activityCenter',
      name: 'activityCenter',
      component: resolve => require(['@/components/activityCenter'], resolve)
    },

    {
      path: '/cardList',
      name: 'cardList',
      component: resolve => require(['@/components/cardList'], resolve)
    },

    {
      path: '/collection',
      name: 'collection',
      // meta: {
      //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // },
      component: resolve => require(['@/components/collection'], resolve)
    },

    {
      path: '/integralList',
      name: 'integralList',
      component: resolve => require(['@/components/integralList'], resolve)
    },

    {
      path: '/vip',
      name: 'vip',
      component: resolve => require(['@/components/vip'], resolve)
    },

    {
      path: '/checkIn',
      name: 'checkIn',
      component: resolve => require(['@/components/checkIn'], resolve)
    },

    {
      path: '/taskList',
      name: 'taskList',
      component: resolve => require(['@/components/taskList'], resolve)
    },

    {
      path: '/logisticsStatus',
      name: 'logisticsStatus',
      component: resolve => require(['@/components/logisticsStatus'], resolve)
    },

    {
      path: '/invitedGift',
      name: 'invitedGift',
      component: resolve => require(['@/components/invitedGift'], resolve)
    },

    {
      path: '/testDrive',
      name: 'testDrive',
      component: resolve => require(['@/components/testDrive'], resolve)
    },

    {
      path: '/indexPage',
      name: 'indexPage',
      component: resolve => require(['@/components/indexPage'], resolve)
    },

    {
      path: '/vinSubmit',
      name: 'vinSubmit',
      component: resolve => require(['@/components/vinSubmit'], resolve)
    },

    {
      path: '/sendPoints',
      name: 'sendPoints',
      component: resolve => require(['@/components/sendPoints'], resolve)
    },

    {
      path: '/testDriveRecord',
      name: 'testDriveRecord',
      component: resolve => require(['@/components/testDriveRecord'], resolve)
    },

    {
      path: '/dealer',
      name: 'dealer',
      component: resolve => require(['@/components/dealer'], resolve)
    },

    {
      path: '/orderInfo',
      name: 'orderInfo',
      component: resolve => require(['@/components/orderInfo'], resolve)
    },

    {
      path: '/addressList',
      name: 'addressList',
      component: resolve => require(['@/components/addressList'], resolve)
    },

    {
      path: '/turntableDraw',
      name: 'turntableDraw',
      component: resolve => require(['@/components/turntableDraw'], resolve)
    },
    {
      path: '/comeStoreOrderInfo',
      name: 'comeStoreOrderInfo',
      component: resolve => require(['@/components/comeStoreOrderInfo'], resolve)
    },

    {
      path: '/pendingOrderInfo',
      name: 'pendingOrderInfo',
      component: resolve => require(['@/components/pendingOrderInfo'], resolve)
    },

    {
      path: '/deliveredOrderInfo',
      name: 'deliveredOrderInfo',
      component: resolve => require(['@/components/deliveredOrderInfo'], resolve)
    },

    {
      path: '/receiptOrderInfo',
      name: 'receiptOrderInfo',
      component: resolve => require(['@/components/receiptOrderInfo'], resolve)
    },

    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: resolve => require(['@/components/resetPassword'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/components/test'], resolve)
    },

    {
      path: '/serverTerms',
      name: 'serverTerms',
      component: resolve => require(['@/components/serverTerms'], resolve)
    },

    {
      path: '/cruiseActivity',
      name: 'cruiseActivity',
      component: resolve => require(['@/components/cruiseActivity'], resolve)
    },

    {
      path: '/expressStatus',
      name: 'expressStatus',
      component: resolve => require(['@/components/expressStatus'], resolve)


    },

    {
      path: '/pickCar',
      name: 'pickCar',
      component: resolve => require(['@/components/pickCar'], resolve)
    },



    {
      path: '/Evaluation',
      name: 'Evaluation',
      component: resolve => require(['@/components/Evaluation'], resolve)

    },

    {
      path: '/invitationRegister',
      name: 'invitationRegister',
      component: resolve => require(['@/components/invitation-register'], resolve),
      meta: {
        display: "邀请注册"
      }
    },
    {
      path: '/select',
      name: 'select',
      component: resolve => require(['@/components/select'], resolve)
    },
    {
      path: '/bindPhone',
      name: 'bindPhone',
      component: resolve => require(['@/components/bind-phone'], resolve),
      meta: {
        display: "绑定手机号"
      }
    },
    {
      path: '/ownerRecommendationActivity',
      name: 'ownerRecommendationActivity',
      component: resolve => require(['@/components/ownerRecommendationActivity'], resolve)
    },
    {
      path: '/wordOfMouthInformation',
      name: 'wordOfMouthInformation',
      component: resolve => require(['@/components/wordOfMouthInformation'], resolve)
    },
    {
      path: '/IntegralRules',
      name: 'IntegralRules',
      component: resolve => require(['@/components/IntegralRules'], resolve)
    }

  ]
})




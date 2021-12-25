// 路由配置文件
// 角色1 经销商
// 角色2 区域、总部
// 角色3 总部
// 角色4 超管
const routeMap = [
  {
    path: '/publicAssets',
    name: '素材管理',
    icon: require('../assets/imgs/icon-attr.png'),
    meta: {
      role: [4]
    }
  },
  {
    path: '/manageMer',
    name: '经销商管理',
    icon: require('../assets/imgs/icon-m.png'),
    meta: {
      role: [2, 3, 4]
    }
  },
  {
    path: '/publicAssets',
    name: '公共素材',
    icon: require('../assets/imgs/icon-attr.png'),
    meta: {
      role: [1, 2, 3]
    }
  },
  {
    path: '/myAssets',
    name: '个人中心',
    icon: require('../assets/imgs/icon-attr.png'),
    meta: {
      role: [1, 4]
    }
  },
  {
    path: '/content',
    name: '热门选择',
    icon: require('../assets/imgs/icon-content.png'),
    meta: {
      role: [1, 2, 3, 4]
    }
  },
  {
    path: '/dataCenter',
    name: '数据中心',
    icon: require('../assets/imgs/icon-data.png'),
    meta: {
      role: [1, 2, 3, 4]
    }
  }
]

export default routeMap

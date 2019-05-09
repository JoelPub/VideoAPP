import GDMap from '@/utils/GDMap.js'
import getThePoint from '@/utils/filter.js'
// import vue from 'vue'

const state = {
  start: '', // ‘出发地’输入框
  end: '', // ‘目的地’输入框
  map: null, // 高德地图实例
  routeCondition: {
    origin: null, // 起点的坐标
    destination: null, // 终点的坐标
    opts: null // 途径点坐标组成的数组
  },
  path: [],
  sign: true, // 收缩的flag
  ctrl: require('@/assets/order-up.svg'), // 控制收缩的图标
  height: 724, // 地图的高度
  routeData: null, // 路径信息
  breakthroughValue: 300, // 临界值
  scope: 5, // 临界值上下波动范围
  influence: {
    lowSpeed: true, // true: 低速, false: 高速
    temp: 0, // -1,0,1 分别代表‘低温’，‘常温’，‘高温’
    acClose: true // true: 空调关了 false: 空调开了
  }
}

const getters = {}

const mutations = {
  // 更新输入框的value值
  SET_INPUT_VALUE: (state, { name, value }) => {
    state[name] = value
  },

  // 初始化地图实例
  INIT_MAP: (state, mapContainer) => {
    state.map = new GDMap(mapContainer)
  },

  // 定位并且搜索附近poi
  LOCATE_AND_POI: state => {},

  // 销毁地图
  DESTROY_THE_MAP: state => {
    state.map && state.map.destroy()
  },

  // 更新起点和终点的坐标信息
  SET_ROUTE_CONDITION: (state, { origin, destination }) => {
    state.routeCondition.origin = origin
    state.routeCondition.destination = destination
  },

  // 更新起点的坐标信息
  SET_ORIGIN_LANLAT: (state, origin) => {
    state.routeCondition.origin = origin
  },

  // 更新终点的坐标信息
  SET_DESTINATION_LANLAT: (state, destination) => {
    state.routeCondition.destination = destination
  },

  // 控制输入框的收缩
  CHANGE_CTRL_STATE: state => {
    state.ctrl = state.sign
      ? require('@/assets/order-down.svg')
      : require('@/assets/order-up.svg')
    state.height = state.sign ? 952 : 724
    state.sign = !state.sign
  },

  // 存储路径信息
  SET_ROUTEDATA: (state, data) => {
    state.routeData = data
  },

  // 更新影响条件值
  CHANGE_INFLUENCE: (state, { type, value }) => {
    state.influence[type] = value
  },

  // 更新续航里程
  CHANGE_MILEAGE: (state, payload) => {
    state.breakthroughValue *= 1 + payload / 100
  }
}

const actions = {
  /* 初始化 */
  initMap: async ({ commit, state, dispatch }, mapContainer) => {
    // 初始化地图
    commit('INIT_MAP', mapContainer)

    // 定位
    const currentPositionData = await state.map.locate()

    // 拿到当前位置信息
    const { LanLat, name } = currentPositionData

    // 更新state中起点的坐标
    commit('SET_ORIGIN_LANLAT', LanLat)

    // 把当前位置的名称呈递给“出发地”输入框
    commit('SET_INPUT_VALUE', {
      name: 'start',
      value: name
    })

    // 添加marker并且搜索poi
    dispatch('markerAndPoi')
  },

  /* 初始化路径规划所需要的条件（把起点和终点转化成坐标，存储到state.routeCondition里面） */
  initRouteCondition: async ({ commit, state }) => {
    // 把出发地和目的地的名称换成坐标
    const origin = await state.map.nameToCoord(state.start)
    const destination = await state.map.nameToCoord(state.end)
    // 更新state
    commit('SET_ROUTE_CONDITION', { origin, destination })
  },

  setOriginLanLat: async ({ commit, state }) => {
    console.log('state.start =', state.start)
    const origin = await state.map.nameToCoord(state.start)
    commit('SET_ORIGIN_LANLAT', origin)
  },

  /* 添加标记并且搜索充电站 */
  markerAndPoi: async ({ dispatch }) => {
    await dispatch('setOriginLanLat')
    dispatch('setCenter')
    dispatch('addMarkerForLocation')
    dispatch('searchPoi')
  },

  // 重置地图中心点
  setCenter: ({ dispatch }) => {
    console.log('进入setCenter')
    const { origin } = state.routeCondition
    state.map.setCenter(origin)
  },

  /* 为起始点添加marker（红色旗帜🚩） */
  addMarkerForLocation: ({ state }) => {
    console.log('进入addMarkerForLocation')
    const { origin } = state.routeCondition
    state.map.addMarkerForLocation(origin)
  },

  /* 搜索给定的LanLat附近5公里的充电桩 */
  searchPoi: ({ state }) => {
    console.log('进入searchPoi')
    const { origin } = state.routeCondition
    state.map.poiByLanLat(origin)
  },

  searchPlace: () => {},

  /* 开始规划路线 */
  planTheRoute: async ({ commit, dispatch }) => {
    // 初始化路径规划所需要的条件
    await dispatch('initRouteCondition')
    // 开始规划路径
    dispatch('drawDrivingPath')
  },

  /* 规划路径的过程 */
  async drawDrivingPath({ state, commit, dispatch }) {
    const { breakthroughValue: value, scope, start, end } = state

    // routeData 包含出发地和目的地之间路径的所有重要数据
    const routeData = await state.map.drawDrivingRoute(state.routeCondition)

    commit('SET_ROUTEDATA', routeData)

    const { pointsArr, distance, districts } = routeData

    // 按路径经过的区域坐poi搜索
    districts.forEach(e => state.map.poiBykeyword(e.adcode, '充电站'))

    dispatch('addBatterySign')
    // const findTheBatteryPoints = async (value, percentage) => {
    //   // 只有两地的距离大于临界值的情况才会进行递归查找目标点（电量提醒标志）
    //   if (distance > value) {
    //     await getThePoint(pointsArr, async e => {
    //       // x 表示坐标数组递归过程中当前时刻对应的坐标离出发地的距离
    //       const x = await state.map.caclDistance([
    //         state.routeCondition.origin,
    //         e
    //       ])

    //       console.log('当前点离出发地的距离x =', x)

    //       if (x >= value - scope && x <= value + scope) {
    //         return 0
    //       } else if (x > value + scope) {
    //         return 1
    //       } else {
    //         return -1
    //       }
    //     })

    //     const goal = window.sessionStorage.getItem('goal').split(',')

    //     console.log('goal =', goal)

    //     state.map.addMarkerForLowBattery(goal, percentage, {
    //       start,
    //       end,
    //       distance
    //     })
    //   }
    // }

    // if (distance < value * 0.5) {
    //   let LanLat = pointsArr[Math.round(pointsArr.length / 2)]
    //   let number = Math.floor(value / distance)
    //   state.map.openInfoWindow({ start, end, distance, LanLat, number })
    // } else {
    //   findTheBatteryPoints(value * 0.5, 50)

    //   findTheBatteryPoints(value * 0.8, 20)

    //   findTheBatteryPoints(value * 0.9, 10)
    // }
  },

  // 在规划好的路径上面添加电池标记
  async addBatterySign({ state }) {
    const { breakthroughValue: value, scope, start, end, map } = state

    const { pointsArr, distance } = state.routeData

    const findTheBatteryPoints = async (value, percentage, index) => {
      // 只有两地的距离大于临界值的情况才会进行递归查找目标点（电量提醒标志）
      if (distance > value) {
        await getThePoint(pointsArr, async e => {
          // x 表示坐标数组递归过程中当前时刻对应的坐标离出发地的距离
          const x = await state.map.caclDistance([
            state.routeCondition.origin,
            e
          ])

          console.log('当前点离出发地的距离x =', x)

          if (x >= value - scope && x <= value + scope) {
            return 0
          } else if (x > value + scope) {
            return 1
          } else {
            return -1
          }
        })

        const goal = window.sessionStorage.getItem('goal').split(',')

        console.log('goal =', goal)

        state.map.addMarkerForLowBattery(goal, percentage, {
          start,
          end,
          distance
        }),
          index
      }
    }

    if (distance < value * 0.5) {
      let LanLat = pointsArr[Math.round(pointsArr.length / 2)]
      let number = Math.floor(value / distance)
      state.map.openInfoWindow({ start, end, distance, LanLat, number })
    } else {
      findTheBatteryPoints(value * 0.5, 50, 1)

      findTheBatteryPoints(value * 0.8, 20, 2)

      findTheBatteryPoints(value * 0.9, 10, 3)
    }
  },

  // 更改影响因素的条件
  changeInfluence({ state, commit }, { type, value }) {
    commit('CHANGE_INFLUENCE', { type, value })

    type === 'lowSpeed' && value === true && commit('CHANGE_MILEAGE', 5)
    type === 'lowSpeed' && value === false && commit('CHANGE_MILEAGE', -5)

    type === 'temp' && value === -1 && commit('CHANGE_MILEAGE', -5)
    type === 'temp' && value === 0 && commit('CHANGE_MILEAGE', 5)
    type === 'temp' && value === 1 && commit('CHANGE_MILEAGE', -5)

    type === 'acClose' && value === true && commit('CHANGE_MILEAGE', 5)
    type === 'acClose' && value === false && commit('CHANGE_MILEAGE', -5)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

/*
 * @Author: Tom 
 * @Date: 2018-09-03 16:44:19 
 * @Last Modified by: Tom
 * @Last Modified time: 2018-09-12 17:05:52
 */

const AMap = window.AMap

const AMapUI = window.AMapUI

/**
 * Description: This class contains all the map services we need
 *
 * @class GDMap
 */
class GDMap {
  /* 定义静态属性 */

  static options = {
    resizeEnable: true,
    features: ['bg', 'point', 'building']
  }

  /* 定义实例属性 */

  map = null // 高德地图实例

  geocoder = null // 用于地点名称和坐标相互转换的插件实例

  geolocation = null // 用于定位的插件实例

  placeSearch = null // 用于搜索poi的插件实例

  driving = null // 用于汽车驾驶路线的插件实例

  marker = null // 用于标记的插件实例

  isLocating = false // flag：当前是否存在定位插件

  /**
   * 构造器：创建高德地图实例
   *
   * @param { String/Object(HTMLElement) } container 地图容器id或者html元素
   * @param { Object(LanLat) } centerOfMap 地图中心点（可选）
   * @memberof GDMap
   */
  constructor(container, centerOfMap) {
    const options = centerOfMap
      ? { ...GDMap.options, center: centerOfMap }
      : { ...GDMap.options }

    this.map = new AMap.Map(container, options)

    AMapUI.loadUI(['control/BasicControl'], BasicControl => {
      //添加一个缩放控件
      this.map.addControl(
        new BasicControl.Zoom({
          position: 'lt'
        })
      )

      // //缩放控件，显示Zoom值
      // this.map.addControl(
      //   new BasicControl.Zoom({
      //     position: "lb",
      //     showZoomNum: true
      //   })
      // )

      // //图层切换控件
      // this.map.addControl(
      //   new BasicControl.LayerSwitcher({
      //     position: "rt"
      //   })
      // )
    })
  }

  /* 定义实例方法 */

  /**
   * 销毁地图实例
   *
   * @memberof GDMap
   */
  destroy() {
    this.map.destroy()
  }

  /**
   * 清除所有覆盖物
   *
   * @memberof GDMap
   */
  clearMap() {
    this.map.clearMap()
  }

  /**
   * 清除指定覆盖物
   *
   * @memberof GDMap
   */
  remove(arr) {
    this.map.remove(arr)
  }

  /* 清除指定点标记 */
  removeMarker() {
    this.remove([this.marker1, this.marker2])
  }

  /**
   * 添加一个控件对象
   *
   * @param { Object } whichCtrl
   * @memberof GDMap
   */
  addControl(whichCtrl) {
    this.map.addControl(whichCtrl)
  }

  /**
   * 移除指定的控件对象
   *
   * @param { Object } whichCtrl
   * @memberof GDMap
   */
  removeControl(whichCtrl) {
    this.map.removeControl(whichCtrl)
  }

  /**
   * 清楚所有信息窗口
   *
   * @memberof GDMap
   */
  clearInfoWindow() {
    this.map.clearInfoWindow()
  }

  /**
   * 添加事件监听
   *
   * @param { Object } obj
   * @param { String } eventType
   * @param { Function } callback
   * @memberof GDMap
   */
  addListener(obj, eventType, callback) {
    AMap.event.addListener(obj, eventType, callback)
  }

  /**
   * remove event listener
   *
   * @param { Object } obj
   * @param { String } eventType
   * @param { Function } callback
   * @memberof GDMap
   */
  removeListener(obj, eventType, callback) {
    AMap.event.removeListener(obj, eventType, callback)
  }

  /**
   *  调整视野以展示所有的marker
   *
   * @memberof GDMap
   */
  setFitView() {
    this.map.setFitView()
  }

  /**
   * 获取地图中心点坐标
   *
   * @returns LanLat
   * @memberof GDMap
   */
  getCenter() {
    this.map.getCenter()
  }

  /**
   * 重置地图中心点
   *
   * @param { Object(LanLat)/Array } LanLat
   * @memberof GDMap
   */
  setCenter(LanLat) {
    this.map.setCenter(LanLat)
  }

  /**
   * 设置地图缩放级别
   *
   * @param { Number } level
   * @memberof GDMap
   */
  setZoom(level) {
    this.map.setZoom(level)
  }

  /**
   * 设置地图上显示的元素种类，支持bg（地图背景）、point（兴趣点）、road（道路）、building（建筑物）
   *
   * @param { Array } features
   * @memberof GDMap
   */
  setFeatures(features) {
    this.map.setFeatures(features)
  }

  /**
   * 地点名 => 坐标  async!
   *
   * @param { String } name  name of place
   * @returns { Object(Promise) } if resolve, data represent LanLat
   * @memberof GDMap
   */
  nameToCoord(name) {
    return new Promise((resolve, reject) => {
      this.geocoder = new AMap.Geocoder()

      this.geocoder.getLocation(name, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          const LngLat = result.geocodes[0].location
          resolve(LngLat)
        } else {
          reject('通过关键字获取经纬度失败')
        }
      })
    })
  }

  /**
   * 定位当前位置，并且可以在回调中获取当前的位置信息
   *
   * @memberof GDMap
   */
  locate() {
    return new Promise((resolve, reject) => {
      this.geolocation = new AMap.Geolocation({
        timeout: 10000, //超过10秒后停止定位
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB'
      })

      this.addControl(this.geolocation) // 在地图实例上添加定位控件，这里因为我们想要自定义图标，所以可以不添加该控件，

      this.getCurrentPosition()

      this.geolocation.on('complete', data => {
        console.log('当前位置的信息data =', data)
        console.log('当前位置的名称 name =', data.formattedAddress)
        console.log('data.position =', data.position)
        console.log('当前的纬度为', data.position.getLat())
        console.log('当前的经度为', data.position.getLng())

        const { formattedAddress: name, position: LanLat } = data

        // TODO: Ford定制化服务，不需要此功能可以将这行代码注释掉
        // 定位完成后添加一个标记
        // this.addMarkerForLocation(LanLat)

        // TODO: Ford定制化服务，不需要此功能可以将这行代码注释掉
        // 定位完成后立马搜索附近的充电桩
        // this.poiByLanLat(LanLat)

        // 把当前位置对应的名称和坐标抛出，因为之后的步骤可能会需要这两个数据
        resolve({ name, LanLat })
      })
    })
  }

  /**
   * 重置当前位置
   *
   * @memberof GDMap
   */
  getCurrentPosition() {
    this.geolocation.getCurrentPosition((status, result) => {
      if ((status = 'complete')) console.log('result =', result)
      else console.log('result =', result)
    })
  }

  /**
   *  基于坐标规划汽车驾驶路线
   *
   * @param { Object } routeCondition 该参数包含三个属性，分别对应出发地，目的地以及途径点的坐标信息
   * @memberof GDMap
   */
  drawDrivingRoute(routeCondition) {
    // 每次规划路线之前先清楚上一次搜索的路线
    this.clearMap()

    const { origin, destination, opts } = routeCondition

    return new Promise((resolve, reject) => {
      this.driving = new AMap.Driving({
        policy: AMap.DrivingPolicy.LEAST_DISTANCE, // 距离最短的策略
        map: this.map
      })

      const callback = (status, result) => {
        // 路线步骤
        const steps = result.routes[0].steps
        // 途经所有的区域组成的数组
        const districts = steps.reduce(
          (p, c) =>
            p.concat(c.cities.reduce((p2, c2) => p2.concat(c2.districts), [])),
          []
        )
        // 途径的所有散点坐标组成的数组
        const pointsArr = steps.reduce((p, c) => p.concat(c.path), [])
        // 起点和终点的距离
        const distance = (result.routes[0].distance / 1000).toFixed()

        // console.log('status =', status)
        // console.log('result =', result)
        // console.log('steps =', result.routes[0].steps)
        // console.log('pointsArr = ', pointsArr)
        // console.log('districts =', districts)
        console.log(
          '两地的距离 =',
          (result.routes[0].distance / 1000).toFixed(),
          '公里'
        )

        // 抛出关键数据，在该实例方法被调用时决定如何使用这些数据
        resolve({ pointsArr, distance, districts })
      }

      // 途径点如果存在就使用4个参数，否则使用三个参数
      opts
        ? this.driving.search(origin, destination, opts, callback)
        : this.driving.search(origin, destination, callback)
    })
  }

  /**
   * 计算两个点的路径距离函数
   *
   * @param { Array } Arr 该数组的第一项是起点坐标，第二项是终点坐标
   * @returns
   * @memberof GDMap
   */
  caclDistance(Arr) {
    return new Promise((resolve, reject) => {
      this.driving = new AMap.Driving({
        policy: AMap.DrivingPolicy.LEAST_DISTANCE // 距离最短的策略
        // map: this.map
      })

      const callback = (status, result) => {
        // 起点和终点的距离
        const distance = (result.routes[0].distance / 1000).toFixed()

        console.log(
          '两地的距离 =',
          (result.routes[0].distance / 1000).toFixed(),
          '公里'
        )

        // 抛出关键数据distance，在该实例方法被调用时决定如何使用这个数据
        resolve(distance)
      }

      this.driving.search(Arr[0], Arr[1], callback)
    })
  }

  // 根据坐标绘制驾车路线

  /**
   * 基于关键词或者坐标添加marker
   * 1⃣️ keyword -> LanLat
   * 2⃣️ LanLat -> position
   *
   * @param { String || Object || Array } condition
   * @memberof GDMap
   */
  async addMarker(condition) {
    // 如果入参condition是关键词（字符串），则先把关键词转换成坐标
    const LanLat =
      typeof condition === 'string'
        ? await this.nameToCoord(condition)
        : condition

    this.marker = new AMap.Marker({
      map: this.map,
      position: LanLat,
      // offset: new AMap.Pixel(-2, -40),//相对于基点的位置
      icon: new AMap.Icon({
        size: new AMap.Size(50, 50),
        imageSize: new AMap.Size(50, 50),
        image: require('@/assets/location.svg'),
        imageOffset: new AMap.Pixel(-15, 3)
      })
    })

    this.setFitView()
  }

  /* 为定位服务定制的marker */
  async addMarkerForLocation(condition) {
    this.clearMap()

    // 如果入参condition是关键词（字符串），则先把关键词转换成坐标
    const LanLat =
      typeof condition === 'string'
        ? await this.nameToCoord(condition)
        : condition

    this.marker = new AMap.Marker({
      map: this.map,
      zIndex: 200,
      position: LanLat,
      offset: new AMap.Pixel(-2, -40), //相对于基点的位置
      icon: new AMap.Icon({
        size: new AMap.Size(40, 40),
        imageSize: new AMap.Size(40, 40), // 图标大小
        image: require('@/assets/location20.svg'), //大图地址
        imageOffset: new AMap.Pixel(-4, 0) //相对于大图的取图位置
      })
    })

    this.setFitView()
  }

  /* 为电池电量低定制的marker */
  async addMarkerForLowBattery(
    condition,
    percentage,
    { start, end, distance },
    index
  ) {
    // 如果入参condition是关键词（字符串），则先把关键词转换成坐标
    const LanLat =
      typeof condition === 'string'
        ? await this.nameToCoord(condition)
        : condition

    this.marker = new AMap.Marker({
      map: this.map,
      position: LanLat,
      zIndex: 200,
      // animation: "AMAP_ANIMATION_BOUNCE",
      // offset: new AMap.Pixel(-2, -40), //相对于基点的位置
      icon: new AMap.Icon({
        size: new AMap.Size(40, 40),
        imageSize: new AMap.Size(40, 40), // 图标大小
        // image: require("@/assets/LB.png"), //大图地址
        image: require(`@/assets/${percentage}.svg`), //大图地址
        imageOffset: new AMap.Pixel(-4, 0) //相对于大图的取图位置
      })
    })

    // this.map.add(this[`marker${index}`])

    // const zzz = this.map.getAllOverlays('marker')

    // console.log('marker =')

    // console.table(zzz)

    // const htmlStr = `<div class="lowBattery">
    //     当您驾驶到该地点时，电动车电量已经不足10%，建议您在此之前寻找合适的充电桩补充电池电量！
    // </div>`

    // this.InfoWindow = new AMap.InfoWindow({
    //   isCustom: true, //使用自定义窗体
    //   content: htmlStr,
    //   offset: new AMap.Pixel(16, -30),
    //   closeWhenClickMap: true
    // })

    // this.addInfoWindow({
    //   percentage,
    //   start,
    //   end,
    //   distance
    // })

    // this.marker.on("click", () => this.InfoWindow.open(this.map, LanLat))

    this.marker.on('mouseover', () => {
      this.openInfoWindow({
        percentage,
        start,
        end,
        distance,
        LanLat
      })
    })

    this.marker.on('mouseout', () => this.clearInfoWindow())

    this.setFitView()
  }

  /**
   * 打开信息窗体
   *
   * @param {*} { percentage, start, end, distance, LanLat }
   * @memberof GDMap
   */
  openInfoWindow({ percentage, start, end, distance, LanLat, number }) {
    this.addInfoWindow({
      percentage,
      start,
      end,
      distance
    })

    setTimeout(() => {
      const remind = document.querySelector('.remind')
      const ctrl = document.querySelector('.remind .header .ctrl')
      const logo = document.querySelector('.remind .header .logo')
      const title = document.querySelector('.remind .header .title')
      const header = document.querySelector('.remind .header')
      const main = document.querySelector('.remind .main')
      let ctrlFlag = true

      ctrl.src = require('@/assets/add.svg')

      ctrl.addEventListener('click', () => {
        if (ctrlFlag) {
          header.style.borderBottom = '1px dashed black'
          main.style.display = 'block'
          ctrl.src = require('@/assets/minus.svg')
          ctrlFlag = false
        } else {
          header.style.borderBottom = 'none'
          main.style.display = 'none'
          ctrl.src = require('@/assets/add.svg')
          ctrlFlag = true
        }
      })

      if (percentage === 10) {
        logo.src = require('@/assets/warning1.svg')
        title.innerHTML = `请在<span id="keyword" style="color:red"> 30 </span>公里内充电`
      } else if (percentage === 20) {
        logo.src = require('@/assets/warning2.svg')
        title.innerHTML = `剩余<span id="keyword" style="color:#e27902"> 20 </span>%的电量`
      } else if (percentage === 50) {
        logo.src = require('@/assets/correct.svg')
        title.innerHTML = `剩余<span id="keyword" style="color:#1ba923"> 50 </span>%的电量`
      } else {
        remind.style.top = '36px'
        logo.src = require('@/assets/correct.svg')
        title.innerHTML = `您可以往返<span id="keyword" style="color:#1ba923"> ${number} </span>次`
      }

      console.log('ctrl =', ctrl)
      console.log('logo =', logo)
    }, 100)

    this.InfoWindow.open(this.map, LanLat)
  }

  /**
   * 添加信息窗体
   *
   * @param {*} { percentage, start, end, distance }
   * @memberof GDMap
   */
  addInfoWindow({ start, end, distance }) {
    const htmlStr = `
        <section class="remind">
            <header class="header">
                <img src="./assets/warning1.svg" alt="" class="logo">
                <span class="title"></span>
                <img src="./assets/minus.svg" alt="" class="ctrl">
            </header>
            <main class="main">
                <div class="origin">
                    起点：${start}
                </div>
                <div class="destination">
                    终点：${end}
                </div>
                <div class="distance">
                    路程：${distance}公里
                </div>
            </main>
            <footer class="bot"></footer>
        </section>
    `

    this.InfoWindow = new AMap.InfoWindow({
      isCustom: true, //使用自定义窗体
      content: htmlStr,
      offset: new AMap.Pixel(16, -55)
      // closeWhenClickMap: true
    })
  }

  /**
   * 基于给定坐标和关键词进行poi搜索
   *
   * @param { string } keyword
   * @memberof GDMap
   */
  poiBykeyword(cityCode, keyword) {
    return new Promise((resolve, reject) => {
      this.placeSearch = new AMap.PlaceSearch({
        // FIXME: city option has a problem if I want get pois nationwide
        pageSize: 2,
        city: cityCode,
        map: this.map
        // autoFitView: true
      })

      this.placeSearch.search(keyword, (status, result) => {
        console.log('status', status)
        console.log('result', result)

        let pointsArr = result.poiList.pois

        pointsArr.forEach(e => this.addMarker(e.location))

        this.setFitView()

        status === 'complete'
          ? resolve(result)
          : reject('通过关键词获取POI失败')
      })
    })
  }

  /**
   * 基于给定坐标搜索poi
   *
   * @param { Object(LanLat)/Array } LanLat
   * @param { Number } scope
   * @param { String } keyword
   * @memberof GDMap
   */
  poiByLanLat(LanLat, scope = 1000, keyword = '充电站') {
    // return new Promise((resolve, reject) => {
    this.placeSearch = new AMap.PlaceSearch({
      // type: '汽车服务',
      map: this.map
      //autoFitView: true
    })

    this.placeSearch.searchNearBy(keyword, LanLat, scope, (status, result) => {
      console.log('status', status)
      console.log('result', result)
      // status === 'complete' ? resolve(result) : reject('通过关键词获取POI失败')
    })
  }

  /**
   * 清除poi插件
   *
   * @memberof GDMap
   */
  clearPoi() {
    this.placeSearch.clear()
  }
}

export default GDMap

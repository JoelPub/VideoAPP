/*
 * @Author: Tom
 * @Date: 2018-08-15 11:24:33 
 * @Last Modified by: Tom
 * @Last Modified time: 2018-09-04 14:29:30
 */

const AMap = window.AMap

/**
 * Description: This class contains all the map services we need
 *
 * @class GDMap
 */
class GDMap {

    // TODO: centerOfMap need or not?
    /**
     * Creates an instance of GDMap.
     * 
     * @param { String/Object(HTMLElement) } root Where to place the map in Html
     * @param { Object(LanLat) } centerOfMap center point when the map is initialized
     * @memberof GDMap
     */
    constructor(container, centerOfMap) {

        /* member artributes */

        this.map = null // instance of map

        this.geocoder = null // instance of name < == > LanLat

        this.geolocation = null // instance of locating current position

        this.placeSearch = null // instance of searching poi

        this.driving = null // instance of providing route plan for driving

        this.isLocating = false // a sign (whether the current position is being positioned)

        this.isDriving = false

        /* do something at the beginning */
        this.init(container)
    }

    /* do some preparatory at the beginning */
    init(container) {
        /* initialize the map */
        this.initMap(container)

        /* navigate to the current location */
        // this.locate()
    }

    /**
     * initialize the map
     *
     * @param { String/Object(HTMLElement) } container
     * @memberof GDMap
     */
    initMap(container) {
        this.map = new AMap.Map(container, {
            resizeEnable: true,
            features: ['bg', 'point', 'building']
        })
    }

    /**
     * destroy the instance of map
     *
     * @memberof GDMap
     */
    destroy() {
        this.map.destroy()
    }

    /**
     * clear all covers on the map
     *
     * @memberof GDMap
     */
    clearMap() {
        this.map.clearMap()
    }

    /**
     * add a control on the map
     *
     * @param { Object } whichCtrl 
     * @memberof GDMap
     */
    addControl(whichCtrl) {
        this.map.addControl(whichCtrl)
    }

    /**
     * remove the control on the map
     *
     * @param { Object } whichCtrl 
     * @memberof GDMap
     */
    removeControl(whichCtrl) {
        this.map.removeControl(whichCtrl)
    }

    /**
     * clear all InfoWindow on the map
     *
     * @memberof GDMap
     */
    clearInfoWindow() {
        this.map.clearInfoWindow()
    }

    /**
     * add event listener
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

    // TODO: getCenter
    /**
     * get the LanLat of map's center
     *
     * @memberof GDMap
     */
    getCenter() { }

    // TODO: setCenter
    /**
     * reset the center of the map
     *
     * @memberof GDMap
     */
    setCenter() { }

    /**
     * name => LanLat  async!
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
     * get and locate the current location for the first time
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

            this.addControl(this.geolocation)

            this.getCurrentPosition()

            this.geolocation.on('complete', data => {
                console.log('当前位置的信息data =', data)
                console.log('当前位置的名称 name =', data.formattedAddress)
                console.log('当前的纬度为', data.position.getLat())
                console.log('当前的经度为', data.position.getLng())
                // 添加图标
                this.addMarker([data.position.getLng(), data.position.getLat()])
                // 搜索当前位置的poi
                this.poiByLanLat([data.position.getLng(), data.position.getLat()])
                resolve(data.formattedAddress)
            })

        })

    }

    /**
     * reset current location
     *
     * @memberof GDMap
     */
    getCurrentPosition() {
        this.geolocation.getCurrentPosition()
        this.isLocating = true
    }

    /**
     * mark location based on keywords
     *
     * @param { String } keyword
     * @memberof GDMap
     */
    searchPlace(keyword) {
        //构造地点查询类
        this.placeSearch = new AMap.PlaceSearch({
            pageSize: 1,
            pageIndex: 1,
            map: this.map,
            // panel: "panel"
        });
        //通过关键字查询
        this.placeSearch.search(keyword)
    }

    /**
     *  draw driving route based on keywords Array
     *
     * @param { Array } keywordsArr
     * @memberof GDMap
     */
    drawDrivingRoute(keywordsArr) {

        return new Promise((resolve, reject) => {

            this.driving = new AMap.Driving({
                policy: AMap.DrivingPolicy.LEAST_DISTANCE,
                map: this.map
            })

            const points = keywordsArr.map(e => ({ keyword: e, city: '全国' }))

            this.driving.search(points, (status, result) => {
                console.log('status =', status)
                console.log('result =', result)
                console.log('steps =', result.routes[0].steps)
                const steps = result.routes[0].steps
                const districts = steps.reduce((p, c) => p.concat(c.cities.reduce((p2, c2) => p2.concat(c2.districts), [])), [])
                // const pointArr = steps.map(e => {
                //     const path = e.path.map(item => ({
                //         LanLat: item,
                //         adcode: e.cities[0].adcode
                //     }))
                //     return { ...e, path }
                // }).reduce((p, c) => p.concat(c.path), [])
                const pointsArr = steps.reduce((p, c) => p.concat(c.path), [])
                const distance = (result.routes[0].distance / 10000).toFixed()
                console.log('pointsArr = ', pointsArr)
                console.log('districts =', districts)
                console.log('两地的距离 =', (result.routes[0].distance / 10000).toFixed(), '公里')
                resolve({
                    pointsArr,
                    distance,
                    districts
                })
            })
        })

    }

    // 根据坐标绘制驾车路线

    /**
     * add marker by keyword or LanLat
     * 1⃣️ keyword -> LanLat
     * 2⃣️ LanLat -> position
     *
     * @param { String || Object || Array } condition
     * @memberof GDMap
     */
    async addMarker(condition) {

        // if (typeof condition === 'string') {
        //     const LanLat = await this.nameToCoord(condition)
        // } else {
        //     const LanLat = condition
        // }

        const LanLat = typeof condition === 'string' ? await this.nameToCoord(condition) : condition


        const marker = this.marker = new AMap.Marker({
            map: this.map,
            position: LanLat,
            icon: new AMap.Icon({
                size: new AMap.Size(50, 50),
                imageSize: new AMap.Size(50, 50),
                image: require('@/assets/location.svg'),
                imageOffset: new AMap.Pixel(-15, 3)
            })
        })

        this.map.setFitView()
    }

    // FIXME: wait to fix
    placeSearchLayer(keyword) {

        const searchLayer = new AMap.PlaceSearchLayer({
            map: this.map,
            keywords: '饭店'
        })

        searchLayer.setMap(this.map)
    }


    /**
     * get poi distuibution
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
                map: this.map,
                // autoFitView: true
            })

            this.placeSearch.search(keyword, (status, result) => {
                console.log('status', status)
                console.log('result', result)

                let pointsArr = result.poiList.pois

                let htmlStr = `<div class="chargeBox">
                                    <h3 class="name">特来汽车充电站（桐乡下湾镇政府）</h3>
                                    <div class="address">
                                        <span>地址：</span>
                                        <span>永丰路17号附近</span>
                                    </div>
                                    <div class="tel">
                                        <span>电话：</span>
                                        <span>400130001</span>
                                    </div><br>
                                    <button class="btn">添加至路线</button>
                                </div>`

                // let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)})
                // let marker = new AMap.Marker({
                //     position: lnglats[i],
                //     map: map
                // })
                // marker.content = '我是第' + (i + 1) + '个Marker'
                // marker.on('click', markerClick)
                // marker.emit('click', {target: marker})

                // this.clearMap()

                pointsArr.forEach(e => {
                    this.addMarker(e.location)
                })

                this.map.setFitView()

                status === 'complete' ? resolve(result) : reject('通过关键词获取POI失败')
            })
        })
    }

    /**
     * get poi distuibution
     *
     * @param { Object(LanLat)/Array } LanLat
     * @memberof GDMap
     */
    poiByLanLat(LanLat) {
        // return new Promise((resolve, reject) => {
        this.placeSearch = new AMap.PlaceSearch({
            type: '汽车服务',
            map: this.map,
            //autoFitView: true
        })

        this.placeSearch.searchNearBy('充电站', LanLat, 5000, (status, result) => {
            console.log('status', status)
            console.log('result', result)
            // status === 'complete' ? resolve(result) : reject('通过关键词获取POI失败')
        })
        // })
    }

    clearPoi() {
        this.placeSearch.clear()
    }
}

export default GDMap
<template>
    <div>
        <h1>高德地图测试</h1>

        <div id="zzz"></div>
    </div>
</template>

<script>
import remoteLoad from '@/utils/remoteLoad.js'

export default {

    async mounted () {
        // 已载入高德地图API，则直接初始化地图
        if (window.AMap && window.AMapUI) {
            this.init()
        // 未载入高德地图API，则先载入API再初始化
        } else {
            await remoteLoad(`https://webapi.amap.com/maps?v=1.4.8&key=ed11b5594bc7bfbafd53c3c1e04d7773`)
            await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
            this.init()
        }
    },

    methods: {
        init (name) {
            const map = new AMap.Map('zzz', {
                features: ['bg', 'point'],
                resizeEnable: true,
                center: [116.397428, 39.90923],//地图中心点
                zoom: 13 //地图显示的缩放级别
            })

            // 添加点标记，并使用自己的icon
            const marker = new AMap.Marker({
                map: map,
                position: [116.405467, 39.907761],
                icon: new AMap.Icon({      
                    size: new AMap.Size(40, 40),
                    imageSize: new AMap.Size(40, 40),
                    image: require('@/assets/location.svg')
                })  
            })

            // map.add(marker)

            // marker.setMap(map)

    }
}

    
}
</script>

<style lang="less" scoped>
    #zzz {
        width: 800px;
        height: 400px;
    }
</style>


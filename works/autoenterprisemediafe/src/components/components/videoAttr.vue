<template>
  <div class="flex-box">
    <video class="video" :width="width">
      <source v-for="(item, i) in sourceArray" :key="i" :src="item.src" :type="item.type ? item.type : 'video/mp4'" />
    </video>
    <!-- 视频播放控件 -->
    <div v-if="controls" class="control-box">
      <div class="vc-time">0:00/0:110</div>
      <!-- <el-progress :percentage="percentage" :show-text="false"></el-progress> -->
      <!-- 进度条 -->
      <div class="vc-bar">
        <div class="vc-bar-current"></div>
      </div>
    </div>
    <!-- 播放按钮 -->
    <img src="../../assets/imgs/icon-play.png" class="video-btn click-area" @click="$emit('playVideo')" />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 260
    },
    source: {
      type: [Array, Object],
      required: true
    },
    controls: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      percentage: 0,
      imgPlay: require('../../assets/imgs/icon-play.png'),
      imgPause: require('../../assets/imgs/icon-pause.png'),
      config: {
        video: '.video',
        video_btn: '.video-btn',
        vc_time: '.vc-time',
        vc_muted: '.vc-muted',
        vc_bar: '.vc-bar',
        vc_bar_cur: '.vc-bar-current'
      }
    }
  },
  mounted() {
    // 初始化视频组件
    if (this.controls) this.InitVideo()
  },
  methods: {
    InitVideo() {
      const video = document.querySelector(this.config.video) // 获取video
      const videoBtn = document.querySelector(this.config.video_btn) // 获取播放按钮
      const vcTime = document.querySelector(this.config.vc_time) // 获取时间容器
      const vcBar = document.querySelector(this.config.vc_bar)
      const currentBar = vcBar.querySelector(this.config.vc_bar_cur)
      video.ondurationchange = () => {
        console.log('ondurationchange')
        // 播放按钮事件
        this.bindPlayEvent(video, videoBtn)
        // 设置视频时间
        this.setTime(video, vcTime)
        // 设置进度
        this.setBar(video, currentBar)
        // 播放时改变时间和进度条
        this.changeBarAndTime(video, videoBtn, vcTime, currentBar)
        // 进度条点击事件
        this.clickBar(video, vcBar)
      }
    },
    bindPlayEvent(video, videoBtn) {
      video.onclick = () => {
        if (!video.paused) {
          video.pause()
          videoBtn.setAttribute('src', this.imgPlay)
          videoBtn.style.opacity = 1
        }
      }
      videoBtn.onclick = () => {
        if (video.paused) {
          video.play()
          videoBtn.setAttribute('src', this.imgPause)
          videoBtn.style.opacity = 0
        } else {
          video.pause()
          videoBtn.setAttribute('src', this.imgPlay)
        }
      }
    },
    setTime(video, vcTime) {
      const totalTime = Math.round(video.duration) // 视频时长，单位秒
      const curTime = Math.round(video.currentTime) // 视频当前播放时长，单位秒
      const mi = Math.floor(Math.round(video.duration) / 60) // 计算视频分钟数
      const curMi = Math.floor(Math.round(video.currentTime) / 60) // 计算视频当前播放分钟数
      vcTime.innerHTML = curMi + ':' + (curTime - curMi * 60) + ' / ' + mi + ':' + (totalTime - mi * 60)
    },
    // setVolume(video) {
    //   document.querySelector(this.config.vc_muted).onclick = () => {
    //     video.muted = !video.muted
    //   }
    // },
    setBar(video, currentBar) {
      currentBar.setAttribute('style', 'width:' + (video.currentTime / video.duration) * 100 + '%')
    },
    changeBarAndTime(video, videoBtn, vcTime, currentBar) {
      video.ontimeupdate = () => {
        if (video.duration === video.currentTime) {
          video.currentTime = 0
          video.pause()
          videoBtn.setAttribute('src', this.imgPlay)
          videoBtn.style.opacity = 1
        }
        // 改变时间
        this.setTime(video, vcTime)
        // 改变进度条
        this.setBar(video, currentBar)
      }
    },
    clickBar(video, vcBar) {
      const vcBarwidth = vcBar.clientWidth
      let flag = false
      vcBar.onclick = e => {
        const x = e.offsetX || e.layerX
        video.currentTime = Math.round((x / vcBarwidth) * video.duration)
      }
      document.body.onmousedown = function(e) {
        flag = true
      }
      document.body.onmouseup = function() {
        flag = false
      }
      vcBar.onmousemove = e => {
        if (flag) {
          const x = e.offsetX || e.layerX
          video.currentTime = Math.round((x / vcBarwidth) * video.duration)
        }
      }
    }
  },
  computed: {
    sourceArray: function() {
      return Array.isArray(this.source) ? this.source : [this.source]
    }
  }
}
</script>

<style lang="less" scoped>
.flex-box {
  position: relative;
}
.video-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 34px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.control-box {
  position: absolute;
  bottom: 10px;
  left: 50%;
  width: 90%;
  transform: translate(-50%, 0);
  .vc-time {
    color: #fff;
    margin-bottom: 4px;
  }
  .vc-bar {
    width: 100%;
    height: 6px;
    background: #ebeef5;
    position: relative;
    .vc-bar-current {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: #63bbff;
      &::after {
        content: '';
        display: block;
        height: 5px;
        width: 5px;
        background: #fff;
        position: absolute;
        top: 0;
        right: 0;
        transform: scale(2);
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
}
</style>

<style lang="less">
.control-box {
  .el-progress-bar__outer {
    overflow: visible;
    .el-progress-bar__inner {
      &::after {
        content: '';
        display: block;
        height: 5px;
        width: 5px;
        background: #fff;
        position: absolute;
        top: 0;
        right: 0;
        transform: scale(2);
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
}
</style>

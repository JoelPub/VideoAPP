<template>
  <div class="video-editor-components-music" v-loading="isLoading">
    <div class="tab-title">个人中心</div>
    <div class="wrapper">
      <el-scrollbar v-if="audioList.length" style="height: 100%">
        <div class="wrapper-content-scroll">
          <MaterialItem
            v-for="item in audioList"
            :key="item.id"
            :filename="item.fileName"
            icon="fa fa-music"
            can-remove
            @click="itemClick(item)"
            @remove="deleteAudio(item)"
          />
        </div>
      </el-scrollbar>

      <div v-if="!audioList.length" style="padding: 50px 0;text-align: center;color: #999;width: 100%">暂无数据</div>
    </div>

    <div class="bottom-box">
      <div class="upload-button">
        <div class="button-text" @click="$refs.upload.dialogVisible = true">上传文件</div>
        <div class="button-des">支持格式：MP3</div>
      </div>
    </div>

    <Upload ref="upload" uploadType="music" @saveSuccess="getUserAudioList"></Upload>
  </div>
</template>

<script>
import Upload from '@/components/DistributorUpload/index'
import MaterialItem from "@/views/video/components/MaterialItem"

export default {
  components: {
    Upload,
    MaterialItem,
  },
  data() {
    return {
      isLoading: false,
      audioList: [],
    }
  },
  mounted() {
    this.getUserAudioList()
  },
  methods: {
    getUserAudioList() {
      this.isLoading = true
      this.$http.getAudioList({
        userId: localStorage.getItem('id'),
      }).then((resp) => {
        this.isLoading = false
        if (resp.status === 200) {
          this.audioList = resp.data

        } else {
          this.$message.error(resp.message)
        }
      })
    },
    itemClick(item) {
      this.$emit('onEditAudioClip', {
        fileName: item.fileName,
        source: item.sourceUrl,
        path: item.absolutelyUrl,
      })
    },
    deleteAudio(item) {
      this.$http.DelteUserInfo({ id: item.id }).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getUserAudioList()
        } else {
          this.$message.error(res.message)
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  .video-editor-components-music {
    display: flex;
    flex-direction: column;
  }

  .wrapper {
    flex: 1;
  }
  .tab-title,
  .wrapper,
  .bottom-box {
    padding-left: 18px;
    padding-right: 18px;
  }

.tab-title {
  height: 44px;
  line-height: 44px;
  background: #ececec;
  color: #949494;
  margin: 0 0 15px;
}
.search-input {
  width: 200px;
}

.bottom-box {
  height: 64px;
  margin-top: 30px;
}

.upload-button {
  width: 250px;
}

.button-text {
  background: #d3d4d6;
  width: 98px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  color: #909399;
  font-size: 14px;
}

.button-des {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  color: #bababa;
}
</style>

<style lang="less" scoped>
@import '../css/components.less';
</style>

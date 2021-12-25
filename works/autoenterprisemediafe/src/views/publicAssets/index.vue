<template>
  <div class="page-attr">
    <!-- 资源预览 -->
    <attr-play
      v-if="ifPlayAttr"
      :preCard="preCard"
      :ifBtnDelete="false"
      :ifBtnFavorite="role == 1 || role == 4"
      :ifSuperBtnDelete="role == 4"
      :materialType="materialType"
      :ifPublicAttr="1"
      @pauseVideo="pauseVideo()"
      @downAttr="downAttr({ src: preCard.sourceUrl || preCard.coverUrl, fileName: preCard.fileName, type: attrType })"
    >
      <template v-slot:attr>
        <video-attr
          v-if="preCard.typeName == '视频'"
          :width="600"
          :source="{ src: preCard.sourceUrl }"
          :controls="true"
        ></video-attr>
        <img v-else :src="preCard.coverUrl || preCard.sourceUrl" alt="loading" class="click-area img-pre" />
      </template>
    </attr-play>
    <create-attr v-if="openCreateDialog" @closeCreateDialog="openCreateDialog = false" />
    <!-- 素材上传 -->
    <multiple-file-upload
      v-if="openMultipleFileUploadDialog"
      @closeMultipleFileUploadDialog="closeMultipleFileUploadDialog"
    />
    <div class="page-attr-content-scroll">
      <div class="page-attr-content">
        <!-- tabs -->
        <div class="params-box">
          <div class="params-box-header flex-box">
            <div
              class="role-tab-pane click-area"
              @click="setMaterialType(1)"
              :class="{ 'role-tab-pane--active': materialType == 1 }"
            >
              总部素材
            </div>
            <div
              class="role-tab-pane click-area"
              @click="setMaterialType(2)"
              :class="{ 'role-tab-pane--active': materialType == 2 }"
            >
              区域素材
            </div>
            <div class="role-tab-pane flex-box" :class="{ 'role-tab-pane--active': materialType == 3 }">
              <span class="click-area" @click="setMaterialType(3)">经销商素材</span>
            </div>
            <!-- 搜索栏 -->
            <div class="search-box">
              <el-input
                v-model="fileName"
                prefix-icon="el-icon-search"
                placeholder="请输入素材关键词"
                @keyup.enter.native="searchTemplate()"
              ></el-input>
            </div>
            <el-button v-if="role == 2 || role == 3" @click="openMultipleFileUploadDialogM()">上传素材</el-button>
            <el-button @click="openCreateDialog = true">创建空白页</el-button>
          </div>
          <keep-alive>
            <attr-types
              v-if="materialType == 1"
              id="headquarters"
              :materialType="1"
              key="video"
              @switchTab="switchTab"
            />
            <attr-types v-if="materialType == 2" id="area" :materialType="2" key="hypo" @switchTab="switchTab" />
            <attr-types v-if="materialType == 3" id="dealer" :materialType="3" key="kv" @switchTab="switchTab" />
          </keep-alive>
        </div>
        <div class="content-box">
          <p class="list-header">
            模板素材{{ attrType !== 'KV' ? '--仅供线上传播使用' : '' }}
            <el-button type="text" @click="selectVlookupByTime()">
              时间排序
              <i v-if="sort" class="el-icon--right el-icon-caret-bottom"></i>
              <i v-else class="el-icon--right el-icon-caret-top"></i>
            </el-button>
          </p>
          <data-list
            ref="dataList1"
            key="headquartersDataList"
            @playVideo="playVideo"
            :materialType="1"
            v-show="materialType == 1"
          ></data-list>
          <data-list
            ref="dataList2"
            @playVideo="playVideo"
            key="areaDataList"
            :materialType="2"
            v-show="materialType == 2"
          ></data-list>
          <data-list
            ref="dataList3"
            @playVideo="playVideo"
            key="dealerDataList"
            :materialType="3"
            v-show="materialType == 3"
          ></data-list>
        </div>
        <div style="flex: 0 0 40px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import attrTypes from './components/attrTypes'
import videoAttr from '../../components/components/videoAttr'
import attrPlay from '../../components/components/attrplay'
import createAttr from '../../components/components/createAttr'
import multipleFileUpload from '../../components/components/multipleFileUpload'
import dataList from './components/dataList'
import { downLoadAttr } from "@/tools"

export default {
  components: { attrTypes, videoAttr, attrPlay, createAttr, multipleFileUpload, dataList },
  watch: {
    fileName: {
      handler(newValue) {
        this.$nextTick(() => {
          this.$refs['dataList' + this.materialType]
            && this.$refs['dataList' + this.materialType].updateFileName(newValue)
        })
      }
    }
  },
  created() {
    this.$bus.$on('setSearchParam', res => {
      this.setSearchParam(res)
    })
    this.$bus.$on('playVideo', res => {
      this.playVideo(res)
      // ...日期、品类、车型
    })
    this.$bus.$on('setFavorite', id => {
      const index = this.pageList.findIndex(element => element.id === id)
      // const copyOb = {}
      if (index !== -1) {
        // Object.keys(this.pageList[index]).forEach((key) => (copyOb[key] = this.pageList[index][key]))
        this.pageList.splice(
          index,
          1,
          Object.assign(this.pageList[index], {
            isCollect: 1
          })
        )
        // copyOb.isCollect = 1
      }
    })
    this.initPage()
    this.getCarMap()
    // this.getAttrTypeMap()
  },
  data() {
    return {
      sort: 0,
      role: localStorage.getItem('role') || '',
      param4: 0,
      materialType: 1,
      fileName: '',
      list: '',
      videoSource: {
        src: '',
      },
      ifPlayAttr: false,
      videoList: '',
      hypoList: '',
      kvList: '',
      openCreateDialog: false,
      currentParams1: {
        typeName: '海报',
        carModelName: '全部',
        pageIndex: 1,
        pageSize: 8,
        pageList: []
      },
      pageList1: [],
      currentParams2: {
        typeName: '海报',
        carModelName: '全部',
        pageIndex: 1,
        pageSize: 8,
        pageList: []
      },
      pageList2: [],
      currentParams3: {
        typeName: '海报',
        carModelName: '全部',
        pageIndex: 1,
        pageSize: 8,
        pageList: []
      },
      pageList3: [],
      pageList: [],
      carModelMap: [],
      categoryMap: [],
      openMultipleFileUploadDialog: false,
      preCard: {},
      total: 0,
      attrType: '海报'
    }
  },
  methods: {
    setMaterialType(type) {
      this.sort = 0
      this.materialType = type
      this.$nextTick(() => {
        this.inFormComponent(this.carModelMap, 'setCarMap')
      })
    },
    initPage() {},
    closeMultipleFileUploadDialog() {
      this.openMultipleFileUploadDialog = false
      this.initPage()
    },
    openMultipleFileUploadDialogM() {
      this.openMultipleFileUploadDialog = true
      this.$nextTick(() => {
        this.inFormComponent(this.carModelMap, 'setCarMap')
        this.inFormComponent(this.categoryMap, 'setCategoryMap')
      })
    },
    // 获得素材类型
    getAttrTypeMap(type) {
      const typeName = type || this.$data['currentParams' + this.materialType].typeName
      this.$http.getCategoryInfoList({ typeName }).then(res => {
        if (res.status === 200) {
          if (Array.isArray(res.data)) {
            this.categoryMap = res.data.map(item => item)
            // res.data.map((item) => this.categoryMap.push(item))
            this.inFormComponent(res.data, 'setCategoryMap')
          }
        }
      })
    },
    // 获得车型
    getCarMap() {
      this.$http.getCarInfoList({}).then(res => {
        if (res.status === 200) {
          if (Array.isArray(res.data)) {
            res.data.map(item => this.carModelMap.push(item))
            this.inFormComponent(res.data, 'setCarMap')
          }
        }
      })
    },
    inFormComponent(data, eventName) {
      this.$bus.$emit(eventName, data)
    },
    playVideo(res) {
      console.log(res)
      if (!this.ifPlayAttr) {
        this.ifPlayAttr = true
        this.videoSource = res.source
        this.preCard = res
      }
    },
    pauseVideo() {
      if (this.ifPlayAttr) {
        this.ifPlayAttr = false
        this.$nextTick(() => {
          const node = document.querySelector('.page-attr')
          if (node) node.style.overflow = 'scroll'
        })
      }
    },
    // 切换资源类型标签（视频、海报、kv）
    switchTab(tab) {
      // 更改查询参数
      this.sort = 0
      this.attrType = tab.label.replace(/\u4e13\u533a/, '')
      // this.$refs['dataList' + this.materialType].setTypeName(tab.label.replace(/\u4e13\u533a/, ''))
    },
    setSearchParam(params) {
      this.sort = 0
      this.$nextTick(() => {
        this.$refs['dataList' + this.materialType] && this.$refs['dataList' + this.materialType].setQueryParams(params)
      })
    },
    // 查询
    searchTemplate() {
      this.sort = 0
      this.$refs['dataList' + this.materialType] && this.$refs['dataList' + this.materialType].searchTemplate(this.fileName)
    },
    // 排序
    selectVlookupByTime() {
      this.sort = this.sort ? 0 : 1
      this.$refs['dataList' + this.materialType] && this.$refs['dataList' + this.materialType].selectVlookupByTime(this.sort)
    },
    downAttr(videoSource) {
      downLoadAttr(this, videoSource)
    },
    editAttr() {
      this.$router.push('/edit_video')
    },
    superDeleteAttr(id, index) {
      this.$http
        .deleteMedia({
          id
        })
        .then(() => {
          this.pageList.splice(index, 1)
        })
    },
    replaceListItem(oldMap, newMap) {
      const oldLength = oldMap.length
      const newLength = newMap.length
      newMap.forEach((item, i) => oldMap.splice(i, 1, item))
      if (oldLength > newLength) oldMap.splice(newLength, oldLength - newLength)
    }
  }
}
</script>

<style lang="less" scoped>
.page-attr {
  flex: 0 0 auto;
  height: calc(100vh - 56px - 66px);
  position: relative;
  background: url('../../assets/imgs/content_bg.png');
  background-size: cover;
  background-repeat: no-repeat;
}
.page-attr-content-scroll {
  height: 100%;
  padding: 62px 40px 10px;
  overflow: scroll;
}
.page-attr-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 auto;
  max-width: 1200px;
  min-width: 900px;
  height: 100%;
}

.params-box,
.content-box {
  background: #fff;
}
.params-box {
  padding: 0 40px;
  margin: 0 0 20px;
  position: relative;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.content-box {
  border-radius: 10px;
  position: relative;
  flex: 1 0 auto;
}
.list-header {
  background: #005596;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 16px;
  padding: 6px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.params-box-header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  transform: translate(0, -100%);
  .role-tab-pane {
    color: #606266;
    flex: 0 0 auto;
    line-height: 44px;
    background: #fff;
    align-self: stretch;
    padding: 0 15px;
    font-size: 14px;
    border-bottom: 1px solid #e4e7ed;
    border-left: 1px solid #e4e7ed;
    span {
      padding: 0 15px;
      background: #fff;
      border-top-right-radius: 10px;
      border-bottom: 1px solid #e4e7ed;
    }
    &:nth-child(1) {
      border-top-left-radius: 10px;
      border-left-color: transparent;
    }
    &:nth-child(3) {
      flex: 1 0 auto;
      padding: 0;
      background: transparent;
      justify-content: flex-start;
      border-bottom: none;
    }
    &:hover {
      color: #005596;
    }
  }
  .role-tab-pane--active {
    border-bottom-color: transparent;
    color: #005596;
    span {
      border-bottom-color: transparent;
      color: #005596;
    }
  }
}
</style>

<style lang="less">
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-color: transparent;
}
.page-attr {
  .el-button--text {
    text-decoration: none;
  }
  .params-box {
    .el-button--text {
      padding: 4px 8px;
      border-radius: 5px;
      span {
        font-size: 14px;
        font-weight: normal;
        color: #909399;
      }
    }
    .el-button--text.button-active {
      background: #63bbff;
      span {
        color: #fff;
      }
    }
  }
  .params-box-header {
    .el-button--small {
      color: #005596;
      background-color: #e6eef5;
      border-color: transparent;
      padding: 8px 15px;
      margin-left: 15px;
      span {
        font-size: 14px;
      }
    }
  }
  .list-header {
    color: #fff;
    .el-button--text {
      padding: 4px 8px;
      border-radius: 5px;
      span {
        font-size: 14px;
        font-weight: normal;
        color: #fff;
      }
    }
  }
  .el-tabs__active-bar {
    background-color: #1890ff;
  }
  .el-tabs__item.is-active {
    color: #63bbff;
  }
  .el-tabs__item {
    border-color: transparent;
    font-size: 14px;
    font-weight: normal;
    color: #bebebe;
    &:hover {
      color: #63bbff;
    }
  }
  .attr-card {
    &:nth-of-type(2) {
      flex: 0 0 auto;
    }
  }
}
</style>

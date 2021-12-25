<template>
  <div class="attr-list">
    <template v-if="pageList.length">
      <card
        v-for="item in pageList"
        :key="item.id"
        :card="item"
        :typeName="typeName"
        :ifBtnDelete="false"
        :ifBtnFavorite="role == 1 || role == 4"
        :ifSuperBtnDelete="role == 4"
        :materialType="materialType"
        :ifPublicAttr="1"
        @superDeleteAttr="superDeleteAttr(item.id)"
      >
        <template v-slot:attr>
          <video-attr
            v-if="item.typeName == '视频'"
            :source="{ src: item.sourceUrl }"
            @playVideo="playVideo(item)"
          ></video-attr>
          <img
            v-else
            :src="item.coverUrl || item.sourceUrl"
            alt="loading"
            class="click-area"
            @click="playVideo(item)"
          />
        </template>
      </card>
      <el-pagination
        class="public-attr-pagination"
        :current-page="pageIndex"
        :page-size="pageSize"
        :page-sizes="[8, 16, 32, 64]"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </template>
    <div class="public-attr-empty flex-box" v-else>暂无数据</div>
  </div>
</template>

<script>
import card from '../../../components/components/card'
import videoAttr from '../../../components/components/videoAttr'
import { replaceListItem } from '../../../tools/index'
export default {
  components: { card, videoAttr },
  props: ['materialType'],
  created() {
    this.initComponentData()
  },
  data() {
    return {
      typeName: '海报',
      categoryName: '全部',
      carModelName: '全部',
      videoTime: '全部',
      pageIndex: 1,
      pageSize: 8,
      total: 0,
      pageList: [],
      role: localStorage.getItem('role'),
      userId: localStorage.getItem('id'),
      sTime: '',
      eTime: '',
      fileName: '',
      sort: 0
    }
  },
  methods: {
    initComponentData(apiName = 'selectInfoBycarModel', extraParams) {
      const { typeName, carModelName, pageIndex, pageSize, userId } = this
      const queryParams = { typeName, carModelName, pageIndex, pageSize, userId }
      queryParams.materialType = this.materialType
      // 视频时长
      if (typeName === '视频') queryParams.videoTime = this.videoTime
      // 非海报有品类查询
      if (typeName !== '海报') queryParams.categoryName = this.categoryName
      if (this.sTime && this.eTime) {
        queryParams.sTime = this.sTime
        queryParams.eTime = this.eTime
      }
      if (this.fileName) queryParams.fileName = this.fileName
      if (extraParams) Object.keys(extraParams).forEach(key => (queryParams[key] = extraParams[key]))
      this.$http[apiName](queryParams).then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          replaceListItem(this.pageList, res.data.list)
        }
      })
    },
    // 排序
    selectVlookupByTime(sort) {
      this.initComponentData('selectVlookupByTime', {
        sort
      })
    },
    // 查找
    searchTemplate(fileName) {
      this.fileName = fileName
      this.initComponentData('searchTemplate')
    },
    handleSizeChange(size) {
      this.pageIndex = 1
      this.pageSize = size
      this.initComponentData()
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.initComponentData()
    },
    superDeleteAttr() {},
    setTypeName(typeName) {
      this.pageIndex = 1
      this.sort = 0
      if (typeName !== this.typeName) {
        this.typeName = typeName
        this.initComponentData()
      }
    },
    setQueryParams(query) {
      this.pageIndex = 1
      this.sort = 0
      Object.keys(query).forEach(key => {
        this.$data[key] = query[key]
      })
      this.initComponentData()
    },
    playVideo(attr) {
      this.$emit('playVideo', attr)
    },
    updateFileName(fileName) {
      this.fileName = fileName
    }
  }
}
</script>

<style lang="less" scoped>
.attr-list {
  display: grid;
  padding: 18px 20px 130px;
  grid-template-columns: repeat(auto-fill, 260px);
  grid-column-gap: 40px;
  grid-row-gap: 22px;
  position: relative;
  .public-attr-pagination {
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .public-attr-empty {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>

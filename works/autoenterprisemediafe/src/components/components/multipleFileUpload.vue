<template>
  <div class="multiple-file-upload">
    <transition name="el-fade-in-linear">
      <statement
        @saveDisclaimer="isDis = 1"
        @cancelUpload="$emit('closeMultipleFileUploadDialog')"
        v-show="isDis == 2"
      ></statement>
    </transition>
    <transition name="el-fade-in-linear">
      <div class="upload-table" v-show="isDis == 1">
        <g-progress
          v-if="uploadLoading"
          :ifEndUp="ifuploadEndUp"
          :ifInterrupt="ifInterrupt"
          @closeProgressDialog="closeProgressDialog($event)"
        />
        <p class="upload-table-title">
          内容选择
          <img
            class="click-area"
            @click="$emit('closeMultipleFileUploadDialog')"
            src="../../assets/imgs/icon-close1.png"
          />
        </p>
        <el-table :data="tableData" height="450">
          <el-table-column align="center" width="100">
            <template slot-scope="scope">
              <!-- psd 需要上传预览图 -->
              <template
                v-if="scope.row.fileType == '.psd' || scope.row.fileType == '.zip' || scope.row.fileType == '.rar'"
              >
                <!-- <template v-if="scope.row.fileType == 'image/vnd.adobe.photoshop' || scope.row.fileType=='.psd'"> -->
                <div class="flex-box" v-if="scope.row.coverUrl">
                  <img class="attr-column" :src="scope.row.coverUrl" />
                </div>
                <div v-else class="upload-box" style="margin-left: 0">
                  <el-button size="small" type="primary" icon="el-icon-plus">封面</el-button>
                  <input
                    id="psd-upload"
                    type="file"
                    accept="image/png,.jpg"
                    @input="importCoverImg($event, scope.$index)"
                  />
                </div>
              </template>
              <template v-else>
                <div class="flex-box" style="height: 45px; width: 45px; margin-left: 20px">
                  <video class="attr-column video" v-if="scope.row.typeName == '视频'">
                    <source :src="scope.row.sourceUrl" />
                  </video>
                  <!-- <img
                    v-else-if="scope.row.fileType == 'audio/mpeg' || scope.row.fileType == 'audio/wav'"
                    src="../../assets/imgs/icon-audio.png"
                  /> -->
                  <img v-else class="attr-column" :src="scope.row.coverUrl || scope.row.sourceUrl" />
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="文件名" align="center" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fileName" placeholder="文件名"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="使用期限" align="center" width="360" v-if="role != 1">
            <!-- :picker-options="pickerOptions" -->
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.daterange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="是否可以编辑" align="center" width="120" v-if="role != 1">
            <template slot-scope="scope">
              <el-select v-model="scope.row.isEdit">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="车型" width="120" align="center" v-if="role != 1">
            <template slot-scope="scope">
              <el-select v-model="scope.row.carModelName" placeholder="选择车型">
                <el-option v-for="(item, i) in carModelMap" :key="i" :label="item.name" :value="item.name"> </el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- 海报不选择品类 -->
          <el-table-column label="品类" width="120" align="center" v-if="role != 1">
            <template slot-scope="scope">
              <el-select
                :disabled="scope.row.typeName == '海报'"
                v-model="scope.row.categoryName"
                placeholder="选择品类"
              >
                <template v-if="scope.row.typeName == '视频'">
                  <el-option v-for="(item, i) in categoryMap" :key="i" :label="item.name" :value="item.name">
                  </el-option>
                </template>
                <template v-else>
                  <el-option v-for="(item, i) in categoryMapKv" :key="i" :label="item.name" :value="item.name">
                  </el-option>
                </template>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="视频时长" width="120" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.videoTime" :disabled="scope.row.typeName != '视频'">
                <el-option
                  v-for="(item, i) in videoTimeMap"
                  :key="i"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="文件类型" align="center" width="120" prop="typeName"></el-table-column>
          <el-table-column label="上传账号" align="center" width="120" prop="accountNumber"></el-table-column>
          <el-table-column label="上传时间" align="center" width="120" prop="uploadData"></el-table-column>
          <el-table-column fixed="right">
            <template slot-scope="scope">
              <i class="el-icon-delete click-area" @click="deleteItem(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
        <div class="btn-box">
          <div class="upload-box" v-if="role != 1">
            <el-button size="small" type="primary" :disabled="currentAttr && currentAttr != '海报' ? true : false"
              >上传海报</el-button
            >
            <input
              id="hypo-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.psd,.zip,.rar"
              multiple
              :disabled="currentAttr && currentAttr != '海报' ? true : false"
              @change="importL($event)"
            />
          </div>
          <div class="upload-box" v-if="role == 1">
            <el-button size="small" type="primary" :disabled="currentAttr && currentAttr != '图片' ? true : false"
              >上传图片</el-button
            >
            <input
              id="img-upload"
              type="file"
              accept="image/png,image/jpeg"
              multiple
              :disabled="currentAttr && currentAttr != '图片' ? true : false"
              @change="importL($event)"
            />
          </div>
          <div class="upload-box">
            <el-button size="small" type="primary" :disabled="currentAttr && currentAttr != '视频' ? true : false"
              >上传视频</el-button
            >
            <input
              id="video-upload"
              type="file"
              accept="video/quicktime,video/mp4,video/mv,video/avi"
              multiple
              :disabled="currentAttr && currentAttr != '视频' ? true : false"
              @change="importL($event)"
            />
          </div>
          <div class="upload-box" v-if="role == 1">
            <el-button size="small" type="primary" :disabled="currentAttr && currentAttr != '音频' ? true : false"
              >上传音频</el-button
            >
            <input
              id="audio-upload"
              type="file"
              accept="audio/mp3,audio/wav"
              multiple
              :disabled="currentAttr && currentAttr != '音频' ? true : false"
              @change="importL($event)"
            />
          </div>
          <div class="upload-box" v-if="role != 1">
            <el-button
              size="small"
              type="primary"
              :disabled="currentAttr && (currentAttr != 'kv' || currentAttr != 'KV') ? true : false"
              >上传KV</el-button
            >
            <input
              id="kv-upload"
              type="file"
              accept="image/png,image/jpeg,.psd,application/zip,application/x-rar-compressed"
              multiple
              :disabled="currentAttr && (currentAttr != 'kv' || currentAttr != 'KV') ? true : false"
              @change="importL($event)"
            />
          </div>
          <div class="upload-box" style="flex: 1 0 auto">
            <el-button :disabled="tableData.length > 0 ? false : true" @click="clearTableData()">清空</el-button>
          </div>
          <el-button :disabled="tableData.length > 0 ? false : true" @click="fileUpload()">开始上传</el-button>
          <p class="btn-box-tip">
            <span>*</span>
            支持格式：{{ setAttrFormat }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import statement from './statement'
import { formatDateString } from '@/utils'
import { buildVideoTemplateFromMetadata } from '@/tools/videoUtils'

export default {
  components: { statement },
  created() {
    this.$bus.$on('setCarMap', res => {
      if (!this.carModelMap.length) res.map(item => this.carModelMap.push(item))
    })
    this.$http
      .selectDisclaimer({
        userId: localStorage.getItem('id')
      })
      .then(res => {
        this.isDis = res.data.isDis
        console.log(this.isDis)
      })
  },
  methods: {
    deleteItem(index) {
      this.tableData.splice(index, 1)
      if (!this.tableData.length) this.clearTableData()
    },
    clearTableData() {
      this.currentAttr = ''
      this.tableData.splice(0, this.tableData.length)
    },
    importCoverImg(event, index) {
      const fileList = event.target.files
      if (!fileList) return
      const formData = new FormData()
      fileList.forEach(file => formData.append('file', file))
      this.$http.upLoadFile(formData).then(res => {
        if (res.status === 200) {
          this.tableData.splice(
            index,
            Object.assign(this.tableData[index], {
              coverUrl: res.data[0].sourceUrl,
              pictureHeight: res.data[0].pictureHeight,
              pictureWidth: res.data[0].pictureWidth
            })
          )
        } else {
          this.$alert(res.data, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    importL(event) {
      if (!event.target.files) return
      if (event.target.files.length + this.tableData.length > 10) {
        this.$alert('最多只能同时上传10份资源', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.fileList = event.target.files
      const typeName = {
        hypo: '海报',
        video: '视频',
        kv: 'KV',
        audio: '音频',
        img: '图片'
      }[event.target.id.replace('-upload', '')]
      this.currentAttr = typeName
      this.getAttrTypeMap()
      this.multipleFileUpload(typeName)
    },
    getAttrTypeMap() {
      this.$http.getCategoryInfoList({ typeName: this.currentAttr }).then(res => {
        if (res.status === 200) {
          if (Array.isArray(res.data)) {
            if (this.currentAttr === '视频') this.categoryMap = res.data
            else this.categoryMapKv = res.data
          }
        }
      })
    },
    closeProgressDialog(status) {
      if (status) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.uploadLoading = false
            this.$confirm('您已上传成功，请对素材文件做标签定义，点击跳转前往标签定义', '提示', {
              confirmButtonText: '跳转',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            })
              .then(() => {})
              .catch(() => {})
          }, 1000)
        })
      } else this.uploadLoading = false
    },
    multipleFileUpload(typeName) {
      this.ifInterrupt = false
      this.ifuploadEndUp = false
      this.uploadLoading = true
      const formData = new FormData()
      const psdFormData = new FormData()
      let psdUpload = false
      let normalUpload = false
      for(let i = 0; i < this.fileList.length; i++) {
        const item = this.fileList[i]
        const itemFile = item.name.split('.')
        const filePatten = itemFile[itemFile.length - 1] == 'psd'
        const size = item.size / 1024 /1024
        if (typeName === '海报') {
          // 判断上传文件是否大于2M
          if (size > 2) {
            this.$alert("海报最大上传2M", '提示', {
              confirmButtonText: '确定'
            })
            this.uploadLoading = false
            return
          }
        } else if (typeName === '视频') {
          if (size > 100) {
            this.$alert("视频最大上传100M", '提示', {
              confirmButtonText: '确定'
            })
            this.uploadLoading = false
            return
          }
        } else if (typeName === 'KV') {
          if (size > 20) {
            this.$alert("KV最大上传20M", '提示', {
              confirmButtonText: '确定'
            })
            this.uploadLoading = false
            return
          }
        }
        if (filePatten) {
          psdFormData.append('file', item)
          psdUpload = true
        } else {
          formData.append('file', item)
          normalUpload = true
        }
      }
      // this.fileList.forEach(i => {
      //   const itemFile = i.name.split('.')
      //   const filePatten = itemFile[itemFile.length - 1] == 'psd'
      //   if (typeName === '海报') {
      //     console.log(i)
      //     if (i.size / 1024 /1024 > 2) {

      //       return
      //     }
      //   }
      //   if (filePatten) {
      //     psdFormData.append('file', i)
      //     psdUpload = true
      //   } else {
      //     formData.append('file', i)
      //     normalUpload = true
      //   }
      // })
      if (psdUpload) {
        this.psdUpload(psdFormData, typeName)
      }
      if (normalUpload) {
        this.$http.upLoadFile(formData).then(res => {
          // this.ifuploadEndUp = true
          if (res.status === 200) {
            this.ifuploadEndUp = true
            this.flag = true
            res.data.forEach((attrInfo, index) => {
              if (!this.tableData.some(element => element.sourceUrl === attrInfo.sourceUrl)) {
                console.log(this.fileList[index].type)
                this.tableData.push(
                  Object.assign(attrInfo, {
                    width: '',
                    height: '',
                    fileType: this.getFileType(attrInfo.sourceUrl),
                    fileName: '',
                    typeName: typeName,
                    userId: localStorage.getItem('id') || '',
                    accountNumber: localStorage.getItem('accountNumber') || '',
                    templateJson:
                      typeName === '视频'
                        ? buildVideoTemplateFromMetadata(
                            attrInfo.fileName,
                            attrInfo.sourceUrl,
                            attrInfo.absolutelyUrl,
                            attrInfo.pictureWidth,
                            attrInfo.pictureHeight,
                            attrInfo.duration
                          )
                        : '',
                    isEdit: '是',
                    carModelName: '',
                    categoryName: '',
                    videoTime: typeName === '视频' ? attrInfo.duration : '',
                    uploadData: formatDateString(new Date()),
                    role: this.role,
                    daterange: '',
                    coverUrl: this.getCoverUrl(attrInfo.sourceUrl)
                  })
                )
              }
            })
          } else {
            this.ifInterrupt = true
            this.$alert(res.data, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      }
    },
    getFileType(sourceUrl) {
      return sourceUrl.substring(sourceUrl.lastIndexOf('.')).toLowerCase()
    },
    getCoverUrl(sourceUrl) {
      const fileType = sourceUrl.substring(sourceUrl.lastIndexOf('.')).toLowerCase()
      if (fileType === '.mp3' || fileType === '.wav') return 'https://iit.axiwenhua.cn/gtb/img/music.png'
      // if (fileType !== '.psd' && fileType !== '.zip' && fileType !== '.rar') return sourceUrl
      return ''
    },
    preCheck() {
      // 判断是否有空值 车型、文件名、使用期限、品类
      for (const item of this.tableData) {
        try {
          if (!item.fileName) throw new Error('请将表格中的文件名填写完整')
          if (item.typeName === '视频' && !item.videoTime) throw new Error('请将表格中的视频时长填写完整')
          if (this.role !== '1') {
            if (!item.startTime || !item.endTime) throw new Error('请将表格中的使用期限填写完整')
            if (!item.carModelName) throw new Error('请将表格中的车型填写完整')
            if (item.typeName !== '海报') {
              if (!item.categoryName && item.typeName === '海报') throw new Error('请将表格中的品类填写完整')
            }
            const ext = item.sourceUrl
              .split('.')
              .pop()
              .toLowerCase()
            if (['zip', 'rar', 'psd'].indexOf(ext) >= 0 && !item.coverUrl)
              throw new Error('zip,rar,psd文件需上传封面图')
          }
        } catch (error) {
          this.$alert(error.message, '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            center: true
          })
          return error.message
        }
      }
    },
    fileUpload() {
      if (this.tableData.length > 10) {
        this.$alert('最多只能同时上传10份资源', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      const role = localStorage.getItem('role') || ''
      const apiName = role === '1' ? 'saveWorksInfo' : 'savaPoster'
      this.tableData = this.tableData.map(item => {
        if (item.daterange) {
          item.startTime = item.daterange[0]
          item.endTime = item.daterange[1]
          item.materialType = this.materialType
        }
        if (item.fileType === '.mp3' || item.fileType === '.wav') {
          item.pictureHeight = ''
          item.pictureWidth = ''
        }
        // delete item.daterange
        return item
      })
      // 预检验
      if (this.preCheck()) return
      const postData =
        role === '1'
          ? { userWorkJson: JSON.stringify(this.tableData) }
          : { templateJson: JSON.stringify(this.tableData) }
      // const roleLabel = role === '1' ? '个人' : '区域'
      const roleLabel = {
        1: '个人',
        2: '区域',
        3: '总部',
        4: '个人'
      }[role]
      this.$http[apiName](postData).then(res => {
        if (res.status === 200) {
          this.$confirm('您的素材已上传至' + roleLabel + '素材库，点击确定前往查看。', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
            .then(() => {
              this.$emit('closeMultipleFileUploadDialog')
            })
            .catch(() => {
              // this.$emit('closeMultipleFileUploadDialog')
              this.clearTableData()
            })
        } else {
          this.$confirm(res.message, '提示', {
            confirmButtonText: '跳转',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
            .then(() => {})
            .catch(() => {})
        }
      })
    },
    psdUpload(psdFormData, typeName) {
      this.$http
        .parsePsd(psdFormData)
        .then(templateJson => {
          this.$http.upLoadFile(psdFormData).then(res => {
            // this.ifuploadEndUp = true
            if (res.status === 200) {
              this.ifuploadEndUp = true
              this.flag = true
              res.data.forEach((attrInfo, index) => {
                if (!this.tableData.some(element => element.sourceUrl === attrInfo.sourceUrl)) {
                  console.log(this.fileList[index].type)
                  console.log(attrInfo)
                  this.tableData.push(
                    Object.assign(attrInfo, {
                      width: '',
                      height: '',
                      fileType: this.getFileType(attrInfo.sourceUrl),
                      fileName: '',
                      typeName: typeName,
                      userId: localStorage.getItem('id') || '',
                      accountNumber: localStorage.getItem('accountNumber') || '',
                      templateJson: templateJson,
                      isEdit: '是',
                      carModelName: '',
                      categoryName: '',
                      videoTime: '',
                      uploadData: formatDateString(new Date()),
                      role: this.role,
                      daterange: ''
                    })
                  )
                }
              })
            } else {
              this.ifInterrupt = true
              this.$alert(res.data, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  data() {
    return {
      isDis: '',
      role: localStorage.getItem('role') || '',
      fileList: [],
      flag: false,
      tableData: [],
      currentAttr: '',
      carModelMap: [],
      categoryMap: [], // 视频品类列表
      categoryMapKv: [],
      uploadLoading: false,
      ifuploadEndUp: true,
      ifInterrupt: false,
      videoTimeMap: [
        { name: '15s', value: 15 },
        { name: '30s', value: 30 },
        { name: '45s', value: 45 },
        { name: '60s', value: 60 },
        { name: '120s', value: 120 },
        { name: '其他', value: '其他' }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  computed: {
    materialType() {
      return {
        1: '',
        2: 2,
        3: 1,
        4: 1
      }[this.role]
    },
    setAttrFormat() {
      return {
        海报: 'PSD≤20M；JPG、PNG≤2M；',
        视频: 'MOV、MP4、MV、AVI≤100M；',
        图片: 'JPG、PNG≤2M；',
        音频: 'MP3、WAV≤20M；',
        kv: 'PSD≤20M；JPG、PNG≤2M；',
        '': 'PSD≤20M；JPG、PNG≤2M；MOV、MP4、MV、AVI≤100M；'
      }[this.currentAttr]
    }
  }
}
</script>

<style lang="less" scoped>
.multiple-file-upload {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(51, 51, 51, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.upload-table {
  margin: 10px 10px;
  background: #fff;
  border-radius: 5px;
  position: relative;
  min-width: 600px;
  padding-bottom: 90px;
  position: relative;
  .upload-table-title {
    display: flex;
    justify-content: space-between;
    height: 47px;
    padding: 0 30px;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .btn-box {
    position: absolute;
    bottom: 0;
    width: 100%;
    // border-top: 1px solid #dcdfe6;
    padding: 15px 0;
    display: flex;
    align-items: center;
    background: #fff;
    padding-right: 30px;
    flex-wrap: wrap;
    .el-upload-demo {
      margin-left: 5px;
      flex: 0 0 auto;
    }
    .btn-box-tip {
      flex: 1 0 100%;
      margin-top: 10px;
      padding: 0 0 0 15px;
      span {
        color: #f32323;
      }
    }
  }
}
.upload-box {
  position: relative;
  flex: 0 0 auto;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  input[type='file'] {
    width: 80px;
    height: 30px;
    position: relative;
    outline: medium none;
    -moz-opacity: 0;
    opacity: 0;
    appearance: none;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
<style lang="less">
.multiple-file-upload {
  // .el-table {
  //   height: calc(100vh - 150px);
  // }
  .el-table--enable-row-hover {
    .el-table__body {
      tr:hover {
        td {
          background: #ffffff;
        }
      }
    }
  }
  .upload-box {
    .el-button--small {
      position: absolute;
      top: 0;
      left: 0;
      margin-left: 0;
    }
    #file-upload-button {
      &:hover {
        cursor: pointer;
      }
    }
  }
  .el-button--small {
    color: #1989fa;
    background-color: #ecf5ff;
    border-color: #a3d0fd;
    font-size: 14px;
    padding: 7px 15px;
    &:hover,
    &:active {
      color: #1989fa;
      background-color: #ecf5ff;
      border-color: #a3d0fd;
    }
  }
  .el-button--small.is-disabled {
    color: #d0d0d0;
    background-image: none;
    background-color: #fff;
    border-color: #ebeef5;
  }
  .el-table__row {
    position: relative;
    .attr-column {
      width: 45px;
      &:hover {
        position: absolute;
        top: 0;
        left: 10px;
        width: 200px;
        height: auto;
        z-index: 1;
      }
    }
    .attr-pre-box {
      position: absolute;
      top: 0;
      z-index: 1;
      opacity: 0;
      img {
        width: 200px;
        height: auto;
      }
    }
  }
  .el-table {
    .el-table__header-wrapper {
      border-top: 1px solid #dcdfe6;
    }
    th {
      background: #f7f7f7;
    }
    .el-input__inner {
      background-color: #f6f6f6;
      border-color: transparent;
      &:focus,
      &:active {
        background-color: #eff9ff;
        border-color: transparent;
      }
      .el-range-input {
        background-color: #f6f6f6;
      }
    }
  }
}
</style>

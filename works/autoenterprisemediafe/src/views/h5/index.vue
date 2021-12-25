<template>
  <div v-loading="loading" class="main-editor-content">
    <div class="control-bar-wrapper">
      <controlBar v-model="fileName" :scale.sync="canvasConfig.scale" @import-psd-data="importPsdData"
                  @showPreview="showPreviewFn" @cancel="cancelFn" @publish="publishFn" @shareFun="shareFun"
                  @save="saveFn"
                  @saveAndShare='saveFn(true)'
      />
    </div>
    <div class="page-editor editor-wrapper">
      <!--左侧导航-->
      <div class="editor-side-bar border-R">
        <div class="l">
          <div class="item_btn cursor-pointer" :class="{active: activeSideBar=='componentLibs'}">
            <i class="el-icon-takeaway-box"></i>
            <div>功能区</div>
          </div>
        </div>
        <div v-if="activeSideBar=='componentLibs'" class="r">
          <div class="item_btn cursor-pointer" @click="changeFunc('background')"
               :class="{active: activeTabMenu=='background'}">
            <i class="el-icon-s-open"></i>
            <div>背景</div>
          </div>
          <div class="item_btn cursor-pointer" @click="changeFunc('txt')" :class="{active: activeTabMenu=='txt'}">
            <i class="iconfont iconwenben"></i>
            <div>文字</div>
          </div>
          <div class="item_btn cursor-pointer" @click="changeFunc('shape')" :class="{active: activeTabMenu=='shape'}">
            <i class="iconfont iconjuxing"></i>
            <div>形状</div>
          </div>
          <div class="item_btn cursor-pointer" @click="changeFunc('excel')" :class="{active: activeTabMenu=='excel'}">
            <i class="el-icon-s-data"></i>
            <div>图表</div>
          </div>
          <div class="item_btn cursor-pointer" @click="changeFunc('image')" :class="{active: activeTabMenu=='image'}">
            <i class="el-icon-picture-outline" style="font-size: 15px"></i>
            <div>图片</div>
          </div>
        </div>
        <!--<el-tabs tab-position="left" v-model="activeSideBar" style="height: 100%;">
          <template v-for="(item, index) in sidebarMenus">
            <el-tab-pane :name="item.value" :key="index"
                         v-if="!item.pageMode || (item.pageMode && item.pageMode === pageMode)">
              <el-tooltip slot="label" class="item" effect="dark" :content="item.label" placement="right">
                <div style="text-align: center">
                  <i :class="item.elementUiIcon"></i>
                  <div>功能区</div>
                </div>
              </el-tooltip>
            </el-tab-pane>
          </template>
        </el-tabs>-->

      </div>
      <!--组件&页面&模板-->
      <div class="editor-page-edit-wrapper" style="flex: none">
        <componentLibs v-if="activeTabMenu === 'componentLibs'"/>
        <background v-if="activeTabMenu === 'background'"></background>
        <txt v-if="activeTabMenu === 'txt'"></txt>
        <image_component v-if="activeTabMenu === 'image'"></image_component>
        <svg_component v-if="activeTabMenu === 'shape'"></svg_component>
        <excel_compoent v-if="activeTabMenu === 'excel'"></excel_compoent>
        <pageManage v-if="activeTabMenu === 'pageManage'"/>
        <templateLibs v-if="activeTabMenu === 'templateLibs'"/>
      </div>
      <!--页面编辑区域-->
      <div class="editor-main" ref='editPanelContainer'>
        <editorPan :scale.sync="canvasConfig.scale" @size-change="sizeChange"/>
      </div>
      <element-operation-menu />
      <!--属性编辑区域-->
      <div class="el-attr-edit-wrapper scrollbar-wrapper">
        <el-scrollbar style='height: 100%; overflow-x: hidden'>
          <div style="height: 35px;line-height: 35px;text-align: center;background: #F7F7F7;color: #606266">属性</div>
          <div style="padding: 20px">
            <attrEdit></attrEdit>
          </div>
        </el-scrollbar>
      </div>
      <!--我的图片-->
      <imageLibs/>
    </div>
    <Modal v-if="dialogLevelFormVisible"
           :ifSuperBtnDelete='false'
           :ifBtnDelete='false'
           :ifCanEdit='false'
           :ifBtnFavorite='false'
           :is-show-download='false'
           :preCard='previewInfo'
           @pauseVideo="dialogLevelFormVisible = false"
           @downAttr='saveFn'
    >
      <div slot="attr">
        <img class="real_pic" :src="resulImg" crossorigin="anonymous"/>
      </div>
      <div slot="attr-dec" style="padding: 3px; font-size: 12px">
        <div style="color: #606266;margin-bottom: 20px"><span style="color: #949494">文件名：</span>{{fileName}}</div>
        <div style="display: flex;color: #606266;justify-content: space-between">
          <div><span style="color: #949494">上传账号：</span>{{accountNumber}}</div>
          <!-- <div><span style="color: 949494">上传时间：</span>{{new Date().toLocaleString()}}</div> -->
        </div>
      </div>
    </Modal>

    <image-corp-dialog />
  </div>
</template>

<script>
  import componentLibs from './components/component-libs/Index'
  import background from './components/background/index'
  import txt from './components/txt/index'
  import image_component from './components/image/index'
  import svg_component from './components/svg/index'
  import excel_compoent from './components/excel/index.vue'
  import pageManage from './components/page-manage'
  import templateLibs from './components/template-libs'
  import editorPan from './components/editor-panel/Index'
  // 属性编辑相关组件
  import attrEdit from './components/attr-configure/attr-edit'
  import eventEdit from './components/attr-configure/event-edit'
  import pageAttrEdit from './components/attr-configure/page-attr-edit'
  import scriptEdit from './components/attr-configure/script-edit'
  import controlBar from './components/control-bar'
  import imageLibs from '@client/components/image-libs'
  import ElementOperationMenu from '@/views/h5/components/editor-panel/ElementOperationMenu'
  import ImageCorpDialog from '@/views/h5/components/ImageCorpDialog'
  import { mapState, mapGetters } from 'vuex'
  import html2canvas from 'html2canvas'
  import _ from 'lodash'
  import Modal from '../../components/components/attrplay'
  import {formatDateString, createUUID} from '@/utils'

  export default {
    components: {
      componentLibs,
      pageManage,
      templateLibs,
      imageLibs,
      editorPan,
      attrEdit,
      eventEdit,
      pageAttrEdit,
      scriptEdit,
      controlBar,
      background,
      txt,
      image_component,
      svg_component,
      excel_compoent,
      Modal,
      ElementOperationMenu,
      ImageCorpDialog,
    },
    data() {
      return {
        id: this.$route.query.id || '', // 当前页面id
        loading: false,
        activeAttr: '属性',
        activeSideBar: 'componentLibs',
        sidebarMenus: [{
          label: '功能区',
          value: 'componentLibs',
          elementUiIcon: 'el-icon-s-operation'
        }
        ],
        canvasConfig: {
          scale: 1
        },
        activeTabMenu: 'background',
        resulImg: null,
        dialogLevelFormVisible: false,
        imgUrl: null,
        fileName: this.$route.query.fileName,
        accountNumber: '',
        postData: {},
        startTime: '',
        endTime: '',
        isEdit: '',
        carModelName: '',
        categoryName: '',
        ifCreateEmptyTemplate: !!+this.$route.query.ifCreateEmptyTemplate, // true 保存；false 更新
        ifPublicAttr: !!+this.$route.query.ifPublicAttr // true 总部；false 经销商
      }
    },
    computed: {
      ...mapState({
        projectData: state => state.editor.projectData,
        activePageUUID: state => state.editor.activePageUUID,
        activeElementUUID: state => state.editor.activeElementUUID
      }),
      ...mapGetters([
        'pageMode',
        'activeElement'
      ]),
      previewInfo() {
        return {
          typeName: '海报',
          fileName: this.fileName,
          startTime: this.startTime,
          endTime: this.endTime,
        }
      },
    },
    created() {
      this.accountNumber = localStorage.getItem('accountNumber')
      this.$store.dispatch('setPrjectData')
      this.$store.dispatch('setIfAsideNav', false)
      this.initPageData()
    },
    beforeDestroy() {
      this.$store.commit('clearHistoryCache')
    },
    methods: {
      sizeChange(pos) {
        if (this.activeElement.elName == 'qk-svg') {
          this.activeElement.commonStyle.fontSize = pos.height - 10
        }
      },

      // 更换功能区
      changeFunc(type) {
        this.activeTabMenu = type
      },

      /**
       * 初始化页面数据
       */
      initPageData() {
        // 清空操作历史
        this.$store.commit('clearHistoryCache')

        this.loading = false
        if (this.id) {
          // 素材id存在，再判断登录账户的类型是 总部（true）还是经销商（false）
          if (this.ifPublicAttr) {
            //调用总部区域的接口
            this.$http.GetInfoByIdPublic({
              id: this.id
            }).then(res => {
              this.postData = res.data
              this.fileName = res.data.fileName
              this.startTime = res.data.startTime
              this.endTime = res.data.endTime
              this.isEdit = res.data.isEdit
              this.carModelName = res.data.carModelName
              this.categoryName = res.data.categoryName
              this.importPsdData(res.data.templateJson)
            })
          } else {

            this.$http.H5GetInfoById({
              id: this.id
            }).then(res => {
              this.$store.dispatch('setPrjectData', JSON.parse(res.data.templateJson))
              this.fileName = res.data.fileName
              this.calcDefaultScaleRatio()
            })
          }
        } else {
          // 如果素材id不存在则创建一个页面初始配置页面
          this.$store.dispatch('setPrjectData', {
            width: this.$route.query.width || 375,
            height: this.$route.query.height || 644,
            background: 'transparent',
            _id: '605c2dbf1547c15104a6074b',
            pages: [{
              uuid: createUUID(),
              name: '',
              elements: [],
              commonStyle: {
                backgroundColor: '',
                backgroundImage: '',
                backgroundSize: 'cover'
              }
            }],
            __v: 0
          })
          this.calcDefaultScaleRatio()
        }
      },

      /**
       * 保存
       */
      saveFn(isShare = false) {
        this.$store.dispatch('setActiveElementUUID', '')
        this.screenshots(true, coverUrl => {
          const templateJson = _.cloneDeep(this.projectData)
          this.imgUrl = coverUrl
          const postData = {
            id: this.id || undefined,
            fileName: this.fileName,
            width: this.projectData.width,
            height: this.projectData.height,
            typeName: '海报',
            userId: localStorage.getItem('id'),
            accountNumber: localStorage.getItem('accountNumber'),
            coverUrl: coverUrl,
            templateJson: JSON.stringify(templateJson),
            sourceUrl: coverUrl,
            role: localStorage.getItem('role'),
            uploadData: formatDateString(new Date()),
            absolutelyUrl: coverUrl,
            pictureHeight: '',
            pictureWidth: '',
            videoTime: '',
          }

          let resultPromise
          let isCreate = this.ifCreateEmptyTemplate, isPublic = this.ifPublicAttr
          let role = +postData.role

          if (!this.id) {
            isCreate = true
            isPublic = role !== 1  // 1 是经销商
          }

          if (isPublic && isCreate && role !== 1) {
            // 总部，创建
            postData.isEdit = this.isEdit
            postData.startTime = this.startTime
            postData.endTime = this.endTime
            postData.carModelName = this.carModelName
            postData.categoryName = this.categoryName
            postData.materialType = { '1': '3', '2': '2', '3': '1' }[postData.role]

            resultPromise = this.$http.SavePosters(postData)

          } else if ((!isPublic && isCreate) || (isPublic && isCreate && role === 1)) {
            // 经销商，创建
            postData.isShare = (isShare & 1) + ''
            resultPromise = this.$http.SaveWorksInfo(postData)

          } else if (isPublic && !isCreate && role !== 1) {
            // 总部，更新
            postData.isEdit = this.isEdit
            postData.startTime = this.startTime
            postData.endTime = this.endTime
            postData.carModelName = this.carModelName
            postData.categoryName = this.categoryName
            postData.materialType = { '1': '3', '2': '2', '3': '1' }[postData.role]
            resultPromise = this.$http.UpdatePoster(postData)

          } else {
            // 经销商，更新
            postData.isShare = (isShare & 1) + ''
            resultPromise = this.$http.UpdateWorksInfo(postData)
          }

          resultPromise.then((resp) => {
            if (resp.status === 200) {
              this.$confirm(this.ifCreateEmptyTemplate ? '保存成功，是否将此海报下至本地' : '更新成功，是否将此海报下至本地', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true,
              }).then(() => {
                this.downLoadImg()
                setTimeout(() => {
                  this._gotoListPage()
                }, 200)

              }).catch(() => {
                this._gotoListPage()
              })

            } else {
              this.$message.error(resp.message)
            }
          })
        })
      },
      // 保存成功后用于跳转到列表页面
      _gotoListPage() {
        const role = +localStorage.getItem('role')
        if (role === 1) {
          this.$router.replace('/myAssets')
        } else {
          this.$router.replace('/publicAssets')
        }
      },
      /**
       * 下载图片
       */
      downLoadImg() {
        // 这里是获取到的图片base64编码,这里只是个例子哈，要自行编码图片替换这里才能测试看到效果
        const imgsrc = this.imgUrl
        const name = 'pic'
        var image = new Image()
        // 解决跨域 Canvas 污染问题
        image.setAttribute('crossOrigin', 'anonymous')
        image.onload = function() {
          var canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          var context = canvas.getContext('2d')
          context.drawImage(image, 0, 0, image.width, image.height)
          var url = canvas.toDataURL('image/png') // 得到图片的base64编码数据

          var a = document.createElement('a') // 生成一个a元素
          var event = new MouseEvent('click') // 创建一个单击事件
          a.download = name || 'photo' // 设置图片名称
          a.href = url // 将生成的URL设置为a.href属性
          a.dispatchEvent(event) // 触发a的单击事件
        }
        image.src = imgsrc
      },

      /**
       * 保存
       */
      async publishFn() {
        // await this.screenshots()
        // 提交数据再预览
        this.$axios.post('/page/publish/' + this.id, this.projectData).then(() => {
          this.$message.success('发布成功!')
          // this.showPreview = false
          this.$router.push({
            path: 'page-list',
            query: {
              previewId: this.id
            }
          })
        })
      },

      // 分享
      shareFun() {
        this.$http.DoShare({
          typeName: '海报',
          userId: localStorage.getItem('id')
        }).then(res => {
          console.log(res)
        })
      },

      // 预览
      async showPreviewFn() {
        await this.screenshots()
      },
      /**
       * 退出
       */
      cancelFn() {
        this.$confirm('确认退出编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/publicAssets')
        }).catch(() => {
        })
      },
      /**
       * 提供截屏作为项目主图
       * flag: 是否为保存
       */
      screenshots(flag, ck) {
        this.$store.dispatch('setActiveElementUUID', '')
        this.$nextTick(() => {
          this.loading = true
          const el = document.querySelector('#canvas-panel')
          html2canvas(el, {
            scale: 2,
            allowTaint: false,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
          }).then(canvas => {
            this.loading = false
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6)
            // 保存时候
            if (flag) {
              const blob = this.$mUtils.dataURItoBlob(dataUrl)
              const file = new window.File([blob], +new Date() + '.png', {
                type: 'image/png'
              })
              const params = new FormData()
              params.append('file', file)
              this.$http.UploadFile(params).then(res => {
                // 替换主图链接
                this.projectData.coverImage = res.data[0].sourceUrl
                console.log('保存后')
                ck && ck(res.data[0].sourceUrl)
              }).catch(err => {
                ck && ck(err)
              })
            } else {
              this.projectData.coverImage = dataUrl
              this.resulImg = dataUrl
              this.dialogLevelFormVisible = true
            }
          })
        })
      },
      importPsdData(psdData) {
        psdData = JSON.parse(psdData)
        if (psdData.document) {
          // 根据 psd 文件大小重置画布尺寸
          const {width, height} = psdData.document
          if (width && height) {
            this.$store.commit('setCanvasSize', {width, height})
          }

          psdData.elements.forEach(item => {
            this.$store.dispatch('addElementWithoutCache', {
              elName: 'qk-image',
              defaultStyle: {
                width: item.width,
                height: item.height,
                top: item.top,
                left: item.left,
                zIndex: item.zIndex,
                opacity: item.opacity
              },
              needProps: {
                imageSrc: item.imageSrc
              }
            })
          })

          this.$store.dispatch('addHistoryCache')

        } else {
          this.$store.dispatch('setPrjectData', psdData)
        }

       this.calcDefaultScaleRatio()
      },
      // 根据图片尺寸计算默认缩放比
      calcDefaultScaleRatio() {
        setTimeout(() => {
          const panelContainer = this.$refs.editPanelContainer.querySelector('.editor-pane-inner')
          const panelWidth = +panelContainer.clientWidth
          const canvasWidth = +this.projectData.width
          if (panelWidth < canvasWidth) {
            const editorMain = this.$refs.editPanelContainer.querySelector('.editor-main')
            editorMain.style.transformOrigin = '0 0'
            editorMain.style.WebkitTransformOrigin = '0 0'
            this.canvasConfig.scale = panelWidth / (canvasWidth + 120)
          }

        }, 100)
      },
    }
  }
</script>

<style lang="scss" scoped>
  $active-color: #005596;

  .main-editor-content {
    //flex: 1 1 auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .editor-wrapper {
    flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;

    .editor-side-bar {
      width: 131px;
      display: flex;

      .item_btn {
        text-align: center;
        padding: 20px 0;
      }

      .active {
        background: #eee;
        color: $active-color;
      }

      .l {
        width: 65px;
        background: #E8E8E8;
      }

      .r {
        width: 65px;
        background: #eee;
      }
    }

    .editor-page-edit-wrapper {
      width: 280px;
      padding: 0 1px;
    }

    .editor-main {
      flex: 1;
      background: #E7E8F1;
      position: relative;
      overflow: hidden;
    }

    /*@media screen and (min-width:1000px){
      .editor-main {
        max-width: 550px;
      }
    }
    @media screen and (min-width:1500px){
      .editor-main {
        max-width: 550px;
      }
    }*/
    .el-attr-edit-wrapper {
      width: 320px;
      padding: 0;
    }
  }

  .imageWrapper {
    opacity: 1;
  }

  .el-dialog__header {
    background: #ecf5ff;
  }

  .control-bar-wrapper {
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    z-index: 10;
  }
</style>
<style lang="scss">
  .editor-side-bar {
    .el-tabs__item.is-active {
      background: rgba(37, 165, 137, 0.09);
    }
  }

  .el-attr-edit-wrapper {
    .el-tabs {
      height: 100%;
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 10px;
    }

    .el-tabs__content {
      height: calc(100% - 55px);

      & > div {
        height: 100%;
      }

      .attr-edit-inner {
        padding-left: 16px;
        padding-right: 16px;
      }
    }
  }
</style>

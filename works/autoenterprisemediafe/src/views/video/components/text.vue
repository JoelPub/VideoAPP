<template>
  <div class="video-editor-components-subtitle">
    <div style="margin-top: 44px; margin-bottom: 48px;">
      <el-button type="primary" @click="insertSubtitle">插入字幕</el-button>
    </div>

    <div v-if="selectedItem && selectedItem.type === 'subtitle'" style="width: 500px;">
      <el-form ref="form" label-width="90px" size="mini">
        <el-form-item label="字号：">
          <el-input-number :value="selectedItem.fontSize" controls-position="right"
                           @change="setProperty('fontSize', $event)"
          />
        </el-form-item>
        <el-form-item label="样式：">
          <el-row :gutter="5">
            <el-col :span="4">
              <el-tooltip class="item" effect="dark" content="颜色" placement="top">
                <el-color-picker :value="selectedItem.color" @change="setProperty('color', $event)"></el-color-picker>
              </el-tooltip>
            </el-col>
            <el-col :span="4">
              <el-tooltip class="item" effect="dark" content="加粗" placement="top">
                <div class="item_choose_btn" @click.stop="toggleBold"
                     :class="{active: bold}">B
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form-item>
<!--        <el-form-item label="对齐方式：">-->
<!--          <el-select :value="selectedItem.textAlign" @change="setProperty('textAlign', $event)">-->
<!--            <el-option label="左对齐" value="left"></el-option>-->
<!--            <el-option label="居中对齐" value="center"></el-option>-->
<!--            <el-option label="右对齐" value="right"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import {createUUID} from "@/utils"

export default {
  data () {
    return {
      activeData: {
        color: '#000'
      },
      bold: false,
      fontStyle: false,
    }
  },
  computed: {
    selectedItem() {
      return this.$store.getters.selectedItem
    },
  },
  methods: {
    setProperty(prop, value) {
      this.selectedItem[prop] = value
      this.$store.commit('ADD_HISTORY_CACHE')
    },
    toggleBold() {
      this.setProperty('fontWeight', this.selectedItem.fontWeight > 400 ? 400 : 700)
    },
    insertSubtitle() {
      const uuid = createUUID()

      this.$store.dispatch('INSERT_MEDIA', {
        type: 'subtitle',
        data: {
          uuid: uuid,
          text: '双击这里输入字幕内容',
          startTime: this.$store.state.video.currentPlaybackPosition,
          endTime: this.$store.state.video.currentPlaybackPosition + 10,
          "fontSize": 40, // 字号（像素）
          "fontWeight": 400, // 字重。400 为标准，700 为加粗
          "color": "#FFFFFF", // 文本颜色
          "textAlign": "text", // 对齐方式。可选值为 left / center / right
          // 字幕在视频中显示的位置及大小。文本不自动换行，超出容器的部分不显示
          "left": 40,
          "top": this.$store.state.video.height - 80,
          "width": this.$store.state.video.width - 80,
          "height": 50,
        },
      })
      this.$store.commit('SET_SELECTED_ITEM', uuid)
    },
  }
}
</script>

<style scoped lang="scss">
  .video-editor-components-subtitle {
    padding: 18px;
  }

  .item_choose_btn {
    border-radius: 4px;
    width: 28px;
    height: 28px;
    border: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active {
    border-color: #f7c200;
  }
</style>

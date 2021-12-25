<template>
  <div class="material-item">
    <div class="material-preview" :style="`background-image: url(${thumbnail})`" @click="onClick">
      <i v-if="icon" class="preview-icon" :class="icon" aria-hidden="true"></i>
      <video v-if="video" class="preview-video" :src="video" preload="metadata" type="video/mp4"></video>
    </div>
    <i v-if="canRemove" class="remove-icon fa fa-times-circle" aria-hidden="true" @click="removeItem"></i>
    <div class="file-name">{{ filename }}</div>
  </div>
</template>

<script>
  export default {
    name: "MaterialItem",
    props: {
      filename: String,
      // 显示为图标时值为图标的 class
      icon: {
        type: String,
        default: '',
      },
      // 显示为缩略图时图片的 URL
      thumbnail: {
        type: String,
        default: '',
      },
      // 显示为视频时，视频的 URL
      video: {
        type: String,
        default: '',
      },
      // 是否允许删除
      canRemove: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {}
    },
    methods: {
      onClick() {
        this.$emit('click')
      },
      removeItem() {
        this.$confirm('是否确认删除该素材？', {
          title: '提示',
          type: 'warning',
        })
          .then(() => {
            this.$emit('remove')
          })
          .catch(() => {})
      },
    },
  }
</script>

<style scoped lang="scss">
  .material-item {
    position: relative;
    width: 180px;
    margin: 0 10px 10px 0;
    text-align: center;
  }

  .material-preview {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    background: no-repeat center / contain;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
  }

  .preview-icon {
    font-size: 48px;
    line-height: 1;
  }

  .preview-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .remove-icon {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }

  .file-name {
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

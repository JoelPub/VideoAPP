<template>
  <div class="component-create-attr flex-box">
    <div class="create-attr-dialog">
      <p class="dialog-title">
        创建模板 <img class="click-area" src="../../assets/imgs/icon-close1.png" @click="$emit('closeCreateDialog')" />
      </p>
      <el-form :model="temParams" :rules="rules" ref="ruleForm" label-width="130px" label-position="left">
        <el-form-item label="输入文件名：" prop="fileName">
          <el-input v-model="temParams.fileName" placeholder="请输入文件名"></el-input>
        </el-form-item>
        <el-form-item label="创建模板类型：" prop="typeName">
          <el-select v-model="temParams.typeName" style="width: 100%">
            <el-option label="视频" value="video"></el-option>
            <el-option label="海报" value="hypo"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="0" class="el-form-item-content-inline">
          <el-radio v-model="sizeType" :label="0">选择尺寸：</el-radio>
          <el-select style="flex: 1 0 auto" v-model="temParams.sizeName" clearable value-key="value">
            <template v-if="temParams.typeName == 'video'">
              <el-option v-for="(item, i) in videoSize" :key="i" :label="item.label" :value="item"></el-option>
            </template>
            <template v-else-if="temParams.typeName == 'hypo'">
              <el-option v-for="(item, i) in hypoSize" :key="i" :label="item.label" :value="item"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label-width="0" class="el-form-item-content-inline">
          <el-radio :disabled="temParams.typeName == 'video'" v-model="sizeType" :label="1">自定义尺寸：</el-radio>
          <div class="custom-box">
            <el-input placeholder="宽" v-model="temParams.customSize.width" clearable></el-input>X<el-input
              placeholder="高"
              v-model="temParams.customSize.height"
              clearable
            ></el-input>
            <div style="text-align: right; flex: 1 1 auto">Px（像素）</div>
            <!-- <el-select v-model="temParams.customSize.unit" clearable>
              <el-option label="Px（像素）" value="px"></el-option>
              <el-option label="Cm（厘米）" value="cm"></el-option>
              <el-option label="mm（毫米）" value="mm"></el-option>
            </el-select> -->
          </div>
        </el-form-item>
      </el-form>
      <p style="color: #F56C6C; padding-left: 25px">*目前仅支持视频和海报</p>
      <el-button class="form-btn" type="primary" style="margin: 40px auto 25px" @click="skipEditor">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temParams: {
        fileName: '',
        typeName: '',
        sizeName: '',
        customSize: {
          width: '',
          height: ''
        }
      },
      sizeDisabled: false,
      videoSize: [
        { label: '16：9', value: { width: 1280, height: 720 } },
        { label: '9：16', value: { width: 720, height: 1280 } }
      ],
      hypoSize: [
        { label: '手机壁纸（720*1280px）', value: { width: 720, height: 1280 } },
        { label: '移动端BANNER（560*260px）', value: { width: 560, height: 260 } },
        { label: '手机海报（640*1008px）', value: { width: 640, height: 1008 } }
      ],
      rules: {
        fileName: [{ required: true, message: '请输入文件名', trigger: 'blur' }],
        typeName: [{ required: true, message: '请选择模板类型', trigger: 'blur' }]
      },
      sizeType: 0
    }
  },
  methods: {
    skipEditor() {
      // 跳转到编辑
      // if (this.temParams.typeName === 'video') {
      //   this.$alert('视频编辑功能暂未开放，预计2021年05月上旬上线开放。敬请期待！', '提示', {
      //     confirmButtonText: '确定',
      //     type: 'warning',
      //     center: true
      //   })
      //   return
      // }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { fileName, typeName, sizeName, customSize } = this.temParams
          // const query = { ...sizeName, fileName }
          // query.typeName = typeName === 'video' ? '视频' : '海报'
          // 选择尺寸
          let query = { fileName }
          query.typeName = typeName === 'video' ? '视频' : '海报'
          if (!this.sizeType) {
            if (!sizeName) {
              this.$confirm('请选择尺寸', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                center: true
              })
                .then(() => {})
                .catch(() => {})
              return
            }
            query = Object.assign(query, sizeName.value)
          } else {
            if (!customSize.width || !customSize.height) {
              this.$confirm('请将自定义尺寸的宽高填写完整', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
                center: true
              })
                .then(() => {})
                .catch(() => {})
              return
            }
            query = Object.assign(query, customSize)
          }
          this.$emit('closeCreateDialog')
          this.$router.push({
            path: typeName === 'video' ? '/edit_video' : '/edit_h5',
            query
          })
          // if (!this.sizeType) {
          //   this.$emit('closeCreateDialog')
          //   this.$router.push({
          //     path: typeName === 'video' ? '/edit_video' : '/edit_h5',
          //     query
          //   })
          // } else if (customSize !== ':px') {
          //   console.log(customSize)
          //   query.customSize = customSize
          //   this.$emit('closeCreateDialog')
          //   this.$router.push({
          //     path: typeName === 'video' ? '/edit_video' : '/edit_h5',
          //     query
          //   })
          // }
        }
      })
    },
    clearCustom() {
      for (const key in this.temParams.customSize) {
        this.temParams.customSize[key] = ''
      }
    }
  },
  watch: {
    'temParams.typeName': {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        if (newValue !== oldValue) this.temParams.sizeName = ''
      },
      deep: true
    },
    'temParams.customSize': {
      handler(newValue) {
        let unNull = 0
        for (const key in newValue) {
          if (newValue[key]) unNull++
        }
        if (unNull >= 1) this.sizeDisabled = true
        else this.sizeDisabled = false
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.component-create-attr {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(51, 51, 51, 0.8);
  z-index: 997;
  flex-direction: column;
}
.create-attr-dialog {
  background: #fff;
  box-shadow: 0px 6px 10px rgba(14, 40, 56, 0.16);
  border-radius: 5px;
  max-width: 568px;
}
.dialog-title {
  padding: 20px 25px 12px;
  // vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 400;
  img {
    width: 24px;
    height: 24px;
  }
}
.custom-box {
  display: flex;
}
.form-btn {
  display: block;
  width: 330px;
  font-size: 18px;
}
</style>
<style lang="less">
.component-create-attr {
  .el-form {
    padding: 0 40px 0 25px;
    .el-form-item-content-inline {
      .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .el-radio {
          flex: 0 0 130px;
          margin-right: 0;
        }
        .custom-box {
          flex: 0 1 auto;
        }
      }
    }
  }
}
.custom-box {
  .el-input--small {
    flex: 0 0 35%;
    &:nth-of-type(1) {
      margin-right: 5px;
    }
    &:nth-of-type(2) {
      margin-left: 5px;
    }
    .el-input__inner {
      text-align: center;
    }
  }
  .el-select--small {
    margin-left: 10px;
    .el-input__inner {
      text-align: left;
    }
  }
}
</style>

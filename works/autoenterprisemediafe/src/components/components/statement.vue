<template>
  <div class="component-statement">
    <span class="btn-close click-area" @click="cancelUpload()"><i class="el-icon-close"></i></span>
    <p class="title">免责声明</p>
    <div class="statement-content">
      <p>
        欢迎使用智互通运营系统（以下称"本平台"）。在您使用本平台各项服务之前，请仔细阅读本《免责声明》。本平台为上海蓝瀚广告有限公司运营的智互通运营系统，域名为www.gtb-zht.cn.com。<span
          >凡以任何方式登陆浏览本平台内容或直接、间接使用本平台内容者，视为同意本平台《免责声明》。</span
        >
      </p>
      <p>1、本平台用户应依法对其提供的内容承担全部责任，本平台不承担任何责任。</p>
      <p>2、本平台用户上传的内容仅代表作者观点，不代表本平台观点。</p>
      <p>
        3、本平台内容，包括以链接形式推荐的其他网站内容，在法律允许的最大范围内，本平台不担保这些内容、产品、服务或其他材料的真实性、完整性、安全性和合法性。用户应谨慎判断并自担风险，避免任何因使用或信赖此类内容、产品、服务或其他材料而造成的任何直接或间接损失。
      </p>
      <p>4、本平台内容仅供参考，不做为任何行为的指导和建议。</p>
      <p>5、用户或其他媒体、企业、网站、其他组织或个人对本平台内容如需使用，必须先与作者、相关权利人或本平台联系。</p>
      <p>
        6、本平台部分频道提供上传空间，供用户自行上传作品，用户上传作品禁止上传非法信息，竞品信息，非福特品牌以外的车型信息，如上传内容侵犯了第三方的知识产权或其他权利，由上传该内容的用户承担责任，本平台不承担任何责任。
      </p>
      <p>
        7、用户应妥善保管账户及密码信息，如用户将密码告知他人或与他人共享同一ID，从而导致任何资料泄露、丢失等任何损失，由用户自行承担。
      </p>
      <p>
        8、本平台可能因合作方或相关电信部门的互联网软硬件设备故障或失灵、或人为操作疏忽而全部或部分中断、延迟、遗漏、误导或造成资料传输或储存上的错误、或遭第三人侵入系统篡改或伪造变造资料等，对此用户同意理解和接受。
      </p>
      <p>
        9、本平台可能因黑客攻击、计算机病毒侵入或发作、政府管制而造成的暂时性关闭，或因前述原因以及与本网站链接的其它网站原因导致个人资料泄露、丢失、被盗用或被篡改等，对此用户同意理解和接受。
      </p>
      <p>10、本平台有权在任何时候，修改或暂停、终止本平台全部或部分服务，对此用户可以理解和接受。</p>
      <p>11、最终解释权归本平台所有。</p>
    </div>
    <div class="radio-box">
      <el-checkbox v-model="checked">我以阅读并同意上述条款</el-checkbox>
    </div>
    <div class="btn-list">
      <el-button @click="cancelUpload()">取消</el-button>
      <el-button v-preventReClick :disabled="!checked" type="primary" @click="saveDisclaimer()">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  },
  methods: {
    saveDisclaimer() {
      this.$http
        .saveDisclaimer({
          userId: localStorage.getItem('id')
        })
        .then(() => {
          this.$emit('saveDisclaimer')
        })
    },
    cancelUpload() {
      this.$emit('cancelUpload')
    }
  }
}
</script>
<style lang="less" scoped>
.component-statement {
  background: #fff;
  width: 420px;
  border-radius: 4px;
  height: 500px;
  position: relative;
  .btn-close {
    color: #909399;
    font-size: 18px;
    right: 20px;
    top: 10px;
    position: absolute;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
  }
  .statement-content {
    height: calc(500px - 62px - 62px - 55px);
    overflow: scroll;
    padding: 0 0 20px;
    p {
      padding: 0 40px;
      &:nth-of-type(2) {
        margin-top: 20px;
      }
      span {
        color: #005596;
      }
    }
  }
  .btn-list {
    padding: 16px 0;
    text-align: center;
  }
  .radio-box {
    margin: 16px auto 20px;
    padding: 0 40px;
  }
}
</style>
<style lang="less">
.component-statement {
  .el-button--small.el-button--primary {
    background-color: #0486fe;
    border-color: #0486fe;
    font-size: 14px;
    color: #fff;
    &:hover {
      background-color: #0486fe;
      border-color: #0486fe;
      color: #fff;
      &:disabled {
        color: #d0d0d0;
        background-image: none;
        background-color: #fff;
        border-color: #ebeef5;
      }
    }
  }
  .el-button--small.el-button--default {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #606266;
    font-size: 14px;
    &:hover {
      background-color: #fff;
      border-color: #dcdfe6;
      color: #606266;
    }
  }
  .el-button + .el-button {
    margin-left: 16px;
  }
}
</style>

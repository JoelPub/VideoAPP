<template>
  <div class="vinSubmit">
    <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
    <div class="vinSubmitTitle">
      <p>
        添加车辆识别码
        <span>(VIN)</span>
      </p>
      <p>请扫描或在下方手动识别你的车辆识别码</p>
    </div>
    <div class="vinSubmitInput">
      <input placeholder="车辆识别码 (VIN)" v-model="vinCode" @keyup="changeVin" maxlength="17">
      <!-- <div class="vinSubmitUpdate">
        <img src="../../static/img/xiangji.png" @click="qrVin">
        <input type="file" id="img-upload" accept="image/gif, image/jpeg, image/jpg, image/png">
      </div> -->
    </div>
    <span class="vinSubmitMark" @click="modal1 = true">如何找到我的车辆识别码 (VIN) ?</span>
    <Modal v-model="modal1" footer-hide title="如何找到您的车辆识别码 (VIN)" class-name="vinModal">
      <p style="margin-bottom:20px;">
        <img src="../../static/img/vinshibie.png" style="width:120px;
        height:70px;">
        <br>
        <span>驾驶员车门内侧</span>
      </p>
      <p style="margin-bottom:20px;">
        <img src="../../static/img/vinshibie2.png" style="width:120px;
        height:70px;">
        <br>
        <span>仪表盘左侧挡风玻璃</span>
      </p>
      <p>
        <img src="../../static/img/vinshibie3.png" style="width:120px;
        height:70px;">
        <br>
        <span>您的车辆档案</span>
      </p>
    </Modal>
    <button class="nextButton" @click="certificationVin">提交</button>
  </div>
</template>


<script  src="../../static/js/vinSubmit.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/vinSubmit.css";
</style>

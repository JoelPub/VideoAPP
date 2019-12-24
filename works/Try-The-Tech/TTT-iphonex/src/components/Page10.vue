<template>
    <div class="page10">
        <img src="@/assets/c10-1.png" class="fullScreen" alt="图片无法加载">
        <div class="input">
            <Input v-model="value1" size="large" placeholder="输入您的电话号码" />
        </div>

        <div class="contact">
            我们会尽快联系您
        </div>

        <div class="btn">
            <Button type="primary">去XX商城查看最新的电动车</Button>
        </div>
        
        <img src="@/assets/c10-2.png" class="fullScreen" alt="图片无法加载">
    </div>
</template>

<script>
export default {
  data() {
    return {
      value1: ''
    }
  }
}
</script>


<style lang="less">
.page10 {
  .input {
    width: 80%;
    margin: 0 auto;
  }

  .contact {
    font-size: 18px;
    color: #4f4f4f;
    text-align: center;
    margin: 10px 0 50px 0;
  }

  .btn {
    width: 80%;
    margin: 0 auto;

    button {
      width: 100%;
      height: 50px;
      font-size: 18px;
      cursor: pointer;
    }

    button:hover {
      background: #4c75a1e1;
    }
  }
}
</style>


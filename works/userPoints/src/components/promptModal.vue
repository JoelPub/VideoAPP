<template>
  <div>
    <div class="promptMoal" v-if="messsage">{{messsage}}</div>
  </div>
</template>

<script>
export default {
  name: "promptModal",
  data() {
    return {};
  },
  props: ["messsage", "timeout"],
  watch: {
    messsage(newV, oldV) {
      console.log(this.$parent);
      if (newV) {
        console.log(newV);
        var _this = this;
        setTimeout(function() {
          _this.$emit("hideModal");
        }, _this.timeout);
      }
    }
  }
};
</script>


<style>
.promptMoal {
  width: 140px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  position: absolute;
  left: 50%;
  top: 48%;
  margin-left: -70px;
  z-index: 100000000;
  background: #333;
  color: #ffffff;
  border-radius: 10px;
}
</style>

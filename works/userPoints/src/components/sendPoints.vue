<template>
  <div class="sendPoints">
    <ul>
      <li>
        <span>领界</span>
        <span>
          <i-switch v-model="testSwith.one" @on-change="change" class-name="switchFlag"></i-switch>
        </span>
      </li>
      <li>
        <span>福特派</span>
        <span>
          <i-switch v-model="testSwith.two" @on-change="change" class-name="switchFlag"></i-switch>
        </span>
      </li>
      <li>
        <span>福特中国</span>
        <span>
          <i-switch v-model="testSwith.three" @on-change="change" class-name="switchFlag"></i-switch>
        </span>
      </li>
    </ul>
  </div>
</template>

<script  src="../../upresource/js/sendPoints.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../upresource/css/sendPoints.css";
</style>
   

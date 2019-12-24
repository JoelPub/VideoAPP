<template>
  <div class="sendPoints">
    <ul>
      <li>
        <span>JJ</span>
        <span>
          <i-switch v-model="testSwith.one" @on-change="change" class-name="switchFlag"></i-switch>
        </span>
      </li>
      <li>
        <span>XX派</span>
        <span>
          <i-switch v-model="testSwith.two" @on-change="change" class-name="switchFlag"></i-switch>
        </span>
      </li>
      <li>
        <span>XX中国</span>
        <span>
          <i-switch v-model="testSwith.three" @on-change="change" class-name="switchFlag"></i-switch>
        </span>
      </li>
    </ul>
  </div>
</template>

<script  src="../../static/js/sendPoints.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/sendPoints.css";
</style>
   

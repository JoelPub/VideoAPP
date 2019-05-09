<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {}
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.TryTheTech {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  .nav {
    margin-bottom: 20px;
  }
}

// 高德地图info window的样式
.lowBattery {
  width: 300px;
  color: #dcdee2;
  padding: 10px;
  background: #b75858;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
}

// 电池电量
.remind {
  width: 00px;
  background: #c5cecaed;
  // background: #c0c7c5;
  /* background: #8bdc90ab; */
  border-radius: 7px;
  position: relative;
  // border: 1px solid #c3bcbc;
}

.remind .header {
  position: relative;
  padding: 6px 0;
  text-align: center;
  // border-bottom: 1px dashed black;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  font-size: 19px;
}

.remind .header .logo {
  margin: 0 30px;
  width: 30px;
}

.remind .header #keyword {
  color: #c51414;
  font-weight: bold;
}

.remind .ctrl {
  width: 20px;
  position: absolute;
  bottom: -10px;
  left: 130px;
  cursor: pointer;
  z-index: 20;
}

.remind .close {
  position: absolute;
  right: 3px;
  top: 3px;
  width: 17px;
}

.remind .main {
  /* padding: 5px */
  display: none;
}

.remind .main div {
  padding: 10px 20px;
  text-align: left;
}

.remind .bot {
  width: 0;
  height: 0;
  font-size: 0;
  overflow: hidden;
  position: absolute;
  border-width: 20px;
  border-style: solid dashed dashed;
  // border-color: #ece4cde8 transparent transparent;
  border-color: #c5cecaed transparent transparent;
  left: 121px;
  bottom: -40px;
}
</style>

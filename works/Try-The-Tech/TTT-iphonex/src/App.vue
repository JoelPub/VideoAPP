<template>
  <div id="app">
    <Page1/>
    <Page2/>
    <Page3/>
    <Page4/>
    <Page5/>
    <Page6/>
    <Page7/>
    <Page8/>
    <Page9/>
    <Page10/>
  </div>
</template>

<script>
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import Page3 from './components/Page3'
import Page4 from './components/Page4'
import Page5 from './components/Page5'
import Page6 from './components/Page6'
import Page7 from './components/Page7'
import Page8 from './components/Page8'
import Page9 from './components/Page9'
import Page10 from './components/Page10'

export default {
  name: 'app',
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
    Page8,
    Page9,
    Page10
  }
}
</script>

<style>
html {
  /* font-size: 1vw; */
}

ul {
  list-style: none;
}

.ivu-slider-bar {
  background-color: gray;
}

.ivu-slider-button {
  border: 0.125rem solid gray;
}

.ivu-slider-button {
  width: 1rem;
  height: 1rem;
}

#app {
  width: 375px;
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.fullScreen {
  width: 100%;
}
</style>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Ford"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/views/home/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<template>
  <div class="TryTheTech">
      <Nav />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/views/TryTheTech/Nav.vue'

export default {
  name: 'home',
  components: {
    Nav
  }
}
</script>

<style lang="less" scoped>
  .TryTheTech {
    width: 100%;
  }
</style>


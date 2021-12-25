<template>
  <div class="position-wrapper">
    <div class="item-position" title="上左" :class="{'choose': value == 'topLeft'}" @click="itemClick('topLeft')"></div>
    <div class="item-position" title="上中" :class="{'choose': value == 'top'}" @click="itemClick('top')"></div>
    <div class="item-position" title="上右" :class="{'choose': value == 'topRight'}" @click="itemClick('topRight')"></div>
    <div class="item-position" title="中左" :class="{'choose': value == 'middleLeft'}" @click="itemClick('middleLeft')"></div>
    <div class="item-position" title="居中" :class="{'choose': value == 'center'}" @click="itemClick('center')"></div>
    <div class="item-position" title="中右" :class="{'choose': value == 'middleRight'}" @click="itemClick('middleRight')"></div>
    <div class="item-position" title="底左" :class="{'choose': value == 'bottomLeft'}" @click="itemClick('bottomLeft')"></div>
    <div class="item-position" title="底中" :class="{'choose': value == 'bottom'}" @click="itemClick('bottom')"></div>
    <div class="item-position" title="底右" :class="{'choose': value == 'bottomRight'}" @click="itemClick('bottomRight')"></div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String
      }
    },

    data() {
      return {
        innerPos: 'top'
      }
    },

    methods: {
      itemClick(val) {
        this.$emit("input", val)
      }
    }
  }
</script>

<style scoped lang="scss">
  .position-wrapper {
    overflow: hidden;
    width: 120px;
    display: flex;
    flex-wrap: wrap;
    .item-position {
      border: 1px dashed #ddd;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      position: relative;
      &:hover {
        border-style: solid;
        border-color: #005596;
      }
    }
    .choose {
      border-style: solid;
      border-color: #005596;
    }
  }
</style>

<template>
  <div class="qk-excel table">
    <div v-for="item in row" class="tr">
      <div class="td" v-for="items in column">
        <!--<input type="text" style="width: 100%; height: 100%; border: none;text-align: center">-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QkExcel', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
    props: {
      row: {
        type: Number,
        default: 2
      },
      column: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        defaultStyle: {
          fontSize: 40
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .table {
    width: 80%;
    border-top: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
    cursor: pointer;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tr {
      display: flex;
      border-bottom: 1px solid;
      flex: 1;
      .td {
        flex: 1;
        text-align: center;
        padding: 0 10px;
        border-right: 1px solid;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
</style>

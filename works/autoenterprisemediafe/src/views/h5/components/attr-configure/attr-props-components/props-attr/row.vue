<template>
  <el-form-item label="表格行数：">
    <el-input-number size="mini"
                     v-model="rowNumber"
                     :min="1" :max="100"/>
  </el-form-item>
</template>

<script>
  export default {
    name: "attr-qk-row",
    props: {
      row: Number
    },
    data() {
      return {
        rowNumber: ''
      }
    },
    mounted() {
      this.rowNumber = this.row;
    },
    watch: {
      row() {
        this.rowNumber = this.row;
      },
      rowNumber() {
        this.$emit('update:row', this.rowNumber)
      }
    }
  }
</script>

<style scoped>

</style>

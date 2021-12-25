<template>
  <el-form-item label="表格列数：">
    <el-input-number size="mini"
                     v-model="columnNumber"
                     :min="1" :max="100"/>
  </el-form-item>
</template>

<script>
  export default {
    name: "attr-qk-column",
    props: {
      column: Number
    },
    data() {
      return {
        columnNumber: ''
      }
    },
    mounted() {
      this.columnNumber = this.column;
    },
    watch: {
      column() {
        this.columnNumber = this.column;
      },
      columnNumber() {
        this.$emit('update:column', this.columnNumber)
      }
    }
  }
</script>

<style scoped>

</style>

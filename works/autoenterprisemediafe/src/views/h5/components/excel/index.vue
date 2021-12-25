<template>
  <div class="components-libs-wrapper scrollbar-wrapper">
    <div class="table"  @click="handleClick()">
      <div v-for="item in 2" class="tr">
        <div class="td" v-for="items in 2"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import txtList from './index'
  import {camelCase} from 'lodash'
  import {_qk_register_components_object} from '@client/plugins/index'
  window._qk_register_components_object=_qk_register_components_object;
  export default {
    name: '',

    data() {
      return {
        txtList: txtList
      }
    },

    methods: {
      handleClick(item) {
        let props = this.getComponentProps('qk-excel');
        props.row = 3
        this.$store.dispatch('addElement', {elName: 'qk-excel', defaultStyle: {borderColor: 'red'}, needProps: props})
      },
      /**
       * 根据elname获取组件默认props数据
       * @param elName
       */
      getComponentProps(elName) {
        let elComponentData
        for (let key in _qk_register_components_object) {
          if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
            elComponentData = _qk_register_components_object[key];
            break;
          }
        }
        if (!elComponentData) return {}

        let props = {}
        for (let key in elComponentData.props) {
          props[key] = [Object, Array].includes(elComponentData.props[key].type) ? elComponentData.props[key].default() : elComponentData.props[key].default
        }
        return props;
      },
    }
  }
</script>

<style scoped lang="scss">
  .table {
    width: 80%;
    margin-left: 10%;
    margin-top: 10%;
    border-top: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
    cursor: pointer;
    .tr {
      display: flex;
      border-bottom: 1px solid;
      .td {
        flex: 1;
        text-align: center;
        padding: 10px;
        border-right: 1px solid;
        &:last-child {
          border-right: none;
        }
      }
    }
  }

</style>

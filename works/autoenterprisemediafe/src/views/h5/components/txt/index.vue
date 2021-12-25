<template>
  <div class="components-libs-wrapper scrollbar-wrapper">
    <el-scrollbar style="height: 100%;">
      <ul class="scrollbar-wrapper">
        <li v-for="(item, index) in txtList" :key="index" class="clearfix paddingB30">
          <el-button type="info" plain @click="handleClick(item)" size="medium"
          :style="{fontSize:((txtList.length-index)*8+'px')}"
                     style="width: 90%;margin-left: 5%;margin-top: 20px">{{item.title}}</el-button>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
  import txtList from '../txt'
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
        let props = this.getComponentProps(item.elName);
        console.log(item)
        this.$store.dispatch('addElement', {...item, needProps: props})
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

<style scoped>

</style>

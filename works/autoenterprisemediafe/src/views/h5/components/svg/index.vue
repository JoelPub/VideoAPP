<template>
  <div class="components-libs-wrapper scrollbar-wrapper">
    <el-scrollbar style='height: 100%'>
      <div class="wrapper">
        <div @click="handleClick(item)"
             v-for="(item,i) in svgList" class="item_svg"
             :key="i"
        >
          <div v-html="item.type"></div>

        </div>
      </div>
    </el-scrollbar>
  </div>

</template>

<script>
import { camelCase } from 'lodash'
import { _qk_register_components_object } from '@client/plugins/index'

window._qk_register_components_object = _qk_register_components_object

export default {
  name: '',
  data () {
    return {
      el_name_obj: {
        elName: 'qk-svg',
        title: '文字',
        icon: 'iconfont iconwenben',
        // 每个组件设置props来展示哪些显示哪些编辑项
        valueType: '', // 标识数据类型，用于表单组件
        defaultStyle: {
          width: 40,
          height: 40,
          fontSize: 30
        }
      },
      svgList: [
        {
          type: '<svg t="1618064657991" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5099" width="128" height="128"><path d="M350.419716 1023.863467C348.439982 1023.863467 346.494382 1023.658667 344.582916 1023.317333 334.445316 1021.303467 326.082649 1014.4768 322.191449 1005.021867L230.611716 784.930133 19.394649 701.713067C9.803182 697.9584 2.805849 689.664 0.655449 679.5264-1.460818 669.422933 1.611182 659.012267 8.949849 651.639467L73.803182 586.786133C79.469316 581.085867 87.388249 577.8432 95.409582 577.8432L97.559982 577.911467 255.153582 589.824 395.066116 449.8432 50.285316 281.224533C41.444782 276.957867 35.198382 268.561067 33.559982 258.833067 31.955716 249.070933 35.164249 239.104 42.093316 232.1408L105.478916 168.721067C111.145049 163.054933 119.063982 159.778133 127.221849 159.778133 129.065049 159.778133 130.942382 159.9488 132.751449 160.290133L602.903982 249.5488 818.865582 33.450667C839.925849 12.424533 869.929049 0.375467 901.229316 0.375467 932.529582 0.375467 962.532782 12.424533 983.593049 33.450667L989.327449 39.2192C1034.724782 84.650667 1034.758916 158.583467 989.395716 204.049067L775.004249 418.542933 868.802649 884.906667C870.816516 894.976 867.676249 905.3184 860.405849 912.554667L795.620782 977.408C789.886382 983.108267 782.035716 986.385067 774.082649 986.385067 772.444249 986.385067 770.771716 986.248533 769.133316 985.975467 759.644249 984.4736 751.281582 978.397867 746.810116 969.728L574.334382 633.685333 438.278916 769.809067 451.454382 919.9616C452.239449 929.006933 448.996782 937.847467 442.613849 944.2304L371.991982 1014.920533C366.359982 1020.6208 358.475182 1023.863467 350.419716 1023.863467L350.419716 1023.863467ZM265.052249 732.672C272.732249 735.744 278.944516 741.819733 282.084782 749.397333L361.035182 939.3152 389.297582 911.0528 376.156249 760.9344C375.371182 751.889067 378.613849 743.048533 384.996782 736.631467L560.749316 560.776533C566.415449 555.076267 574.300249 551.8336 582.355716 551.8336 583.925849 551.8336 585.495982 551.970133 587.066116 552.209067 596.691716 553.710933 605.088516 559.786667 609.525849 568.456533L782.001582 904.465067 805.587716 880.878933 711.823449 414.5152C709.775449 404.445867 712.915716 394.103467 720.186116 386.8672L946.148782 160.802133C967.721049 139.229867 967.721049 104.072533 946.148782 82.432L940.414382 76.663467C930.481582 66.7648 916.213849 61.098667 901.263449 61.098667 886.278916 61.098667 872.011182 66.7648 862.078382 76.6976L634.682116 304.2304C629.050116 309.930667 621.165316 313.207467 613.075716 313.207467 611.164249 313.207467 609.252782 313.0368 607.341316 312.661333L137.257049 223.402667 115.548249 245.111467 460.329049 413.627733C469.203716 417.962667 475.450116 426.325333 477.088516 436.053333 478.658649 445.815467 475.450116 455.748267 468.521049 462.711467L288.433582 642.935467C282.801582 648.635733 274.985049 651.8784 266.997849 651.8784 266.110382 651.8784 265.257049 651.8784 264.369582 651.776L107.083182 639.8976 85.169582 661.845333 265.052249 732.672 265.052249 732.672Z" p-id="5100"></path></svg>'
        },
        { type: '<svg t="1618821793542" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1535" width="64" height="64"><path d="M512 122.176l423.509333 266.752-34.112 54.144-58.752-37.013333L842.666667 906.666667h-661.333334l-0.021333-500.608-58.709333 37.013333-34.112-54.144L512 122.176z m0 75.648l-266.688 167.936L245.333333 842.666667h533.333334l-0.021334-476.928L512 197.824z m150.4 454.592v64H363.306667v-64H662.4z m0-170.666667v64H363.306667v-64H662.4z" p-id="1536"></path></svg>' }
      ],
      total: 0
    }
  },

  created () {
    this.getSvgList()
  },
  methods: {
    handleClick (svg) {
      const props = this.getComponentProps(this.el_name_obj.elName)
      const obj = {
        ...props,
        text: svg.type
      }
      this.$store.dispatch('addElement', { ...this.el_name_obj, needProps: obj })
    },

    /**
     * 网络请求svg列表
     */
    getSvgList () {
      this.$http.H5GetXZList(
      ).then(res => {
        if (res.status === 200) {
          // 此处后端应该做分页处理，因为没有做，所以暂时不使用
          console.log(res)
          this.svgList = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    /**
       * 根据elname获取组件默认props数据
       * @param elName
       */
    getComponentProps (elName) {
      let elComponentData
      for (const key in _qk_register_components_object) {
        if (key.toLowerCase() === camelCase(elName).toLowerCase()) {
          elComponentData = _qk_register_components_object[key]
          break
        }
      }
      if (!elComponentData) return {}

      const props = {}
      for (const key in elComponentData.props) {
        props[key] = [Object, Array].includes(elComponentData.props[key].type) ? elComponentData.props[key].default() : elComponentData.props[key].default
      }
      return props
    }
  }
}
</script>

<style scoped lang="scss">
  .wrapper {
    padding: 20px;
    cursor: pointer;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;;
    .item_svg {
      background: #faf7fa;
      text-align: center;
      padding: 10px;
      font-size: 50px;
      margin: 4px;
      display: block;
      width: 70px;
      height: 70px;
    }
  }
</style>

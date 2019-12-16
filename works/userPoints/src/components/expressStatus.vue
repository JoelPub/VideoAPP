<template>
  <div>
    <div class="express_container" >
          <div class="express_tab_container " >
              <div @click="changeActive(1)" class="express_tab" :class="{express_tab_active:activeFlag==1} " >
                <span class="express_tab_item" >
                  <span class="express_tab_item_word" >所有订单</span>
                </span>
                <span class="express_tab_item_split" >|</span>
              </div>
              <div @click="changeActive(2)" class="express_tab" :class="{express_tab_active:activeFlag==2} ">
                <span class="express_tab_item" >
                  <span class="express_tab_item_word" >待发货</span>
                </span>
                <span class="express_tab_item_split" >|</span>
              </div>
              <div @click="changeActive(3)" class="express_tab" :class="{express_tab_active:activeFlag==3} ">
                <span class="express_tab_item" >
                  <span class="express_tab_item_word" >已发货</span>
                </span>
                <span class="express_tab_item_split" >|</span>
              </div>
          </div>


          <div class="express_search_tab" >
            <input type="text" placeholder="输入商品标题或订单号进行搜索" class="express_search_input" v-model="orderNumber" >
            <button @click="searchOrder()" class="express_search_btn" >订单搜索</button>
          </div>


          <table class="express_search_result_contain express_search_result" >
            <colgroup >
              <col class="express_search_result__col1" >
                <col class="express_search_result__col2" >
                  <col class="express_search_result__col3" >
                    <col class="express_search_result__col4" >
                      <col class="express_search_result__col5" >
                        <col class="express_search_result__col6" >
                          <col class="express_search_result__col7" >
            </colgroup>
            <tbody >
              <tr >
                <th >宝贝</th>
                <th  colspan="2">积分</th>
                <th  colspan="2">数量</th>
                <th  colspan="2">交易操作</th></tr>
            </tbody>
          </table>

          <div v-if="activeFlag==1" >
            <paginated-list :list-data="orderAll"/>
          </div>
          <div v-if="activeFlag==2" >
            <paginated-list :list-data="orderTodoArr"/>
          </div>
          <div v-if="activeFlag==3" >
            <paginated-list :list-data="orderDoneArr"/>
          </div>
      </div>
      <Modal v-model="modal2" width="360" footer-hide class-name="shopCarModal">
        <input type="text" placeholder="输入快递公司" class="express_search_input" v-model="expressCompany">
        <input type="text" placeholder="输入快递单号" class="express_search_input" v-model="expressNo">

        <div >
          <p style="margin-bottom:3px;" >
          <a  @click="submitOrder" class="express_modal_btn express_modal_btn_secondary " target="_blank"  >确定</a></p>
        </div>
      </Modal>
  </div>
</template>

<script  src="../../upresource/js/expressStatus.js">
</script>

<style >
@import "../../upresource/css/expressStatus.css";
</style>


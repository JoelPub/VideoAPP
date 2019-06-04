<script>
export default {
  name: "paginatedList",
  data(){
    return {
      pageNumber: 0
    }
  },
  props:{
    listData:{
      type:Array,
      required:true
    },
    size:{
      type:Number,
      required:false,
      default: 2
    }
  },
  methods:{
      nextPage(){
         this.pageNumber++;
      },
      prevPage(){
        this.pageNumber--;
      },
      processOrder(id){
        this.$parent.processOrder(id)
      }
  },
  computed:{
    pageCount(){
      let l = this.listData.length,
          s = this.size;
      return Math.round(l/s);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
            end = start + this.size;
      return this.listData.slice(start, end);
    }
  },
  template: `<div>
                 <div v-for="(item,index) in paginatedData" class="express_order_list_container ">
                       <table class="express_search_result_contain express_search_result_contain_secondary" >
                         <colgroup >
                           <col class="express_search_result__col1" >
                             <col class="express_search_result__col2" >
                               <col class="express_search_result__col3" >
                                 <col class="express_search_result__col4" >
                                   <col class="express_search_result__col5" >
                                     <col class="express_search_result__col6" >
                                       <col class="express_search_result__col7" ></colgroup>
                         <tbody class="express_search_result_header" >
                           <tr >
                             <td class="express_search_result_header_cell" >
                               <span >
                                 <span >订单号</span>
                                 <span >:</span>
                                 <span >{{item.orderId}}</span></span>
                             </td>
                             <td colspan="2" class="express_search_result_header_cell_fill" >
                               </td>
                             <td >

                             </td>
                             <td colspan="3" class="express_search_result_header_cell_tail" >
                               </td>
                           </tr>
                         </tbody>
                         <tbody >
                           <tr >
                             <td class="express_search_result_body_cell" >
                               <div class="express_search_result_body_cell_head express_search_result_body_cell_head_secondary express_search_result_body_cell_head_third" >
                                 <div class="express_search_result_body_cell_head_img_container" >
                                   <a class="express_search_result_body_cell_head_img" target="_blank" >
                                     <img :src="item.imageList[0]" >
                                     <span ></span>
                                   </a>
                                 </div>
                                 <div style="margin-left:90px;" >
                                   <p >{{item.singleProductName}}
                                   </p>
                                 </div>
                               </div>
                             </td>
                             <td class="express_search_result_body_cell" colspan="2" >
                               <div>
                                 <p >
                                   <span >{{item.price}}</span></p>
                               </div>
                             </td>
                             <td class="express_search_result_body_cell" colspan="2" >
                               <div >
                                 <p >{{item.quality}}</p></div>
                             </td>
                             <td class="" colspan="2" >
                               <div >
                                 <p style="margin-bottom:3px;" >
                                 <a  @click="processOrder(item.orderId)" class="express_modal_btn express_modal_btn_secondary " target="_blank"   v-if="item.statusId==2" >发货</a></p>
                                 </div>
                             </td>
                           </tr>
                         </tbody>
                       </table>
                 </div>

                  <button
                      :disabled="pageNumber === 0"
                      @click="prevPage">
                      Previous
                  </button>
                  <button
                      :disabled="pageNumber >= pageCount-1 "
                      @click="nextPage">
                      Next
                  </button>
          </div>
  `
};

</script>


<style>
button{
  width:100px;
  height:40px;
  background-color:#eef;
}

button:hover{
  cursor:pointer;
}
button:hover:disabled{
  cursor:not-allowed;
}
</style>

<template>
  <div class="invitedGift">

    <div style="padding:0px 15px;">
      <prompt-modal :messsage="messsage" timeout="2500" @hideModal="messsage=''"></prompt-modal>
      <img src="../../static/img/share1.png" @click="goshare('register')">
      <img src="../../static/img/share2.png" @click="goshare('drive')">
    </div>
  </div>
</template>

<script>
import baseUrlChange from '../assets/environmentalSets'
import {apiAll} from '../request/api'
  export default {
    props:{},
    components:{
    },
    data() {
      return {
      };
    },
    computed: {},
    methods: {
      goshare(name){
  this.$router.push({
    path:"/invitationRegister",
    query:{
      'from':name
    }
  });
     }
    },
    watch: {

    },
    async mounted() {

    },
   async created() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/invitedGift.css";
</style>


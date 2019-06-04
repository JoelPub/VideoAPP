<template>
  <div class="record">
    <img src="../../static/img/emptyList.png" class="emptyLsit" v-if="testDriveList.length==0">
    <ul class="recordUl" v-else>
      <li v-for="  item in testDriveList">
        <Row>
          <Col span="20">
            <ul class="recordUlLeft">
              <li>{{item.dealerName}}</li>
              <li>{{item.dealerAddress}}</li>
              <li>{{item.name}} {{item.phone}}</li>
              <li>提交日期 :{{item.lastModifyTime}}</li>
            </ul>
          </Col>
          <!-- <Col span="4">
            <img src="../../static/img/iphone.jpg">
          </Col>-->
        </Row>
      </li>
    </ul>
  </div>
</template>


<script  src="../../static/js/testDriveRecord.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/css/testDriveRecord.css";
</style>


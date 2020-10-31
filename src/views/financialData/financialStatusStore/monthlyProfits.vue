<template>
  <div class="monthlyProfits">
    <!-- 头部选项卡 -->
    <div class="monthly_tab">
      <p :class="{ pActive: monthlyTab === 0 }" @click="monthlyTab = 0">店铺利润月报</p>
      <p :class="{ pActive: monthlyTab === 1 }" @click="monthlyTab = 1">ASIN利润月报</p>
      <p :class="{ pActive: monthlyTab === 2 }" @click="monthlyTab = 2">iSKU利润月报</p>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div v-show="monthlyTab == 0">
        <storeMonthlyReport></storeMonthlyReport>
      </div>
      <div v-show="monthlyTab == 1">
        <ASINmonthlyProfits></ASINmonthlyProfits>
      </div>
      <div v-show="monthlyTab == 2">
        <iSKUmonthlyProfits></iSKUmonthlyProfits>
      </div>
    </div>
  </div>
</template>

<script>
import storeMonthlyReport from "./monthlyComponents/storeMonthlyReport"; //店铺利润月报
import ASINmonthlyProfits from "./monthlyComponents/ASINmonthlyProfits"; //ASIN利润月报
import iSKUmonthlyProfits from "./monthlyComponents/iSKUmonthlyProfits"; //iSKU利润月报
export default {
  components: {
    storeMonthlyReport,
    ASINmonthlyProfits,
    iSKUmonthlyProfits,
  },
  data(){
    return{
      monthlyTab:0
    }
  }
};
</script>

<style lang="scss" scoped>
.monthly_tab {
  width: 100%;
  height: 32px;
  p {
    float: left;
    padding: 7px 10px;
    min-width: 40px;
    text-align: center;
    color: #409EFF;
    border-left: 1px solid #409EFF;
    border-top: 1px solid #409EFF;
    border-bottom: 1px solid #409EFF;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
  }
  .pActive{
    color: #fff;
    background: #409EFF;
  }
  p:hover {
    color: #fff;
    background: #409EFF;
  }
  p:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  p:last-child {
    border-right: 1px solid #409EFF;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>

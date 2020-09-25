<template>
  <div class="purchasePriceChart">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-input placeholder="请输入商品民或SKU查询" style="width:260px;"></el-input>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
    </div>
    <!-- 折线图 -->
    <div class="content">
      <div class="echarts">
        <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Crumbs from "@/components/crumbs";
export default {
  components: {
    Crumbs,
  },
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        // title: {
        //   text: "在Vue中使用echarts",
        //   left: "center",
        // },
        tooltip: {},
        legend: {
          data: ["采购价格"],
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name:'采购价格',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 300px;
}
</style>
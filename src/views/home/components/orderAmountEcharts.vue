<template>
  <!-- 订单金额 -->
  <div
    id="orderAmountEcharts"
    :style="{ width: '100%', height: '200px' }"
     v-on-echart-resize
  ></div>
</template>

<script>
// import "../../../utils/chart.resize";
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("orderAmountEcharts")
      );
      // 绘制图表
      myChart.setOption({
        title: {},
        tooltip: {
          trigger: "axis",
        },
        legend: {
          padding: [20, 0, 0, 0],
          data: ["今天", "昨天", "上周同日"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "6%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "今天",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "昨天",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "上周同日",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      });
      window.onresize = myChart.resize;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
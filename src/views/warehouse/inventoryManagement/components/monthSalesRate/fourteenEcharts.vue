<template>
  <div id="cost" :style="{ width: '100%', height: '200px' }"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.costEcharts();
  },
  methods: {
    costEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("cost"));
      // 绘制图表
      myChart.setOption({
        title: {},
        tooltip: {
          trigger: "axis",
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
        ],
      });
      window.onresize = myChart.resize;
    },
  },
};
</script>

<style>
</style>
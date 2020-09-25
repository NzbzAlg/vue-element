<template>
  <div class="uesr">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 选择店铺 -->
    <div class="selectStore">
      <el-select v-model="store" placeholder="请选择您的店铺">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <!-- 卡片 -->
    <div class="panel_group">
      <div class="panel_card" v-for="item in cardList" :key="item.id">
        <div class="card_left">
          <img :src="item.img" alt />
        </div>
        <div class="card_right">
          <div class="card-panel-text">{{item.text}}</div>
          <span class="card-panel-num">{{item.num}}</span>
        </div>
      </div>
    </div>
    <!-- echarts -->
    <div class="lineChart">
      <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
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
    return {
      store: "", //店铺
      options: [
        {
          id: 0,
          name: "店铺1",
        },
        {
          id: 1,
          name: "店铺2",
        },
        {
          id: 2,
          name: "店铺3",
        },
        {
          id: 3,
          name: "店铺4",
        },
      ],
      cardList: [
        {
          id: 1,
          img: require("../../assets/image/mine.png"),
          text: "New Visits",
          num: 1110,
        },
        {
          id: 2,
          img: require("../../assets/image/news.png"),
          text: "New Visits",
          num: 1110,
        },
        {
          id: 3,
          img: require("../../assets/image/money.png"),
          text: "New Visits",
          num: 1110,
        },
        {
          id: 4,
          img: require("../../assets/image/shoppingCar.png"),
          text: "New Visits",
          num: 1110,
        },
      ],
    };
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
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["直接访问", "搜索引擎"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
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
            name: "直接访问",
            type: "line",
            smooth: true,
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            smooth: true,
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
//选择店铺
.selectStore{
  margin-bottom: 25px;
}
// 卡片
.panel_group {
  width: 100%;
  height: 108px;
  display: flex;
  justify-content: space-between;
  .panel_card {
    width: 23%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: space-between;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    .card_left {
      margin: 14px 0 0 14px;
      padding: 16px;
    }
    .card_right {
      margin: 26px 26px 26px 0;
      .card-panel-text {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        font-weight: bold;
      }
      .card-panel-num {
        font-size: 20px;
        color: #666;
        font-weight: bold;
      }
    }
  }
}
.lineChart {
  width: 100%;
  height: 350px;
  background: #fff;
  margin-top: 30px;
}
</style>
<template>
  <!-- 上个月商品动销率 -->
  <div class="boardContent_echarts">
    <div class="echartsLeft">
      <div class="echarts">
        <p>总店铺数：1</p>
        <div id="store" :style="{ width: '100%', height: '100%' }"></div>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="店铺名" width="100"> </el-table-column>
          <el-table-column prop="name" label="占比" align="center"> </el-table-column>
          <el-table-column prop="address" label="在库总成本"> </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="echartsRight">
      <div class="eRight_top">
        <p>上个月商品动销率</p>
        <div>
          <span @click="isActive = 1" :class="{ dayActive: isActive === 1 }"
            >7日</span
          >
          <span @click="isActive = 2" :class="{ dayActive: isActive === 2 }"
            >14日</span
          >
          <span @click="isActive = 3" :class="{ dayActive: isActive === 3 }"
            >30日</span
          >
        </div>
      </div>
      <div class="eRight_bottom">
        <sevenEcharts v-if="isActive == 1"></sevenEcharts>
        <fourteenEcharts v-if="isActive == 2"></fourteenEcharts>
        <mounthEcharts v-if="isActive == 3"></mounthEcharts>
      </div>
    </div>
  </div>
</template>

<script>
import sevenEcharts from "./sevenEcharts"; //七日
import fourteenEcharts from "./fourteenEcharts"; //14日
import mounthEcharts from "./mounthEcharts"; //30日
export default {
  components: {
    sevenEcharts,
    fourteenEcharts,
    mounthEcharts,
  },
  data() {
    return {
      isActive: 1,
      tableData: [
        {
          date: "tomotime_US",
          name: "0.00%",
          address: "￥0.00",
        },
      ],
    };
  },
  mounted() {
    this.storeEcharts();
  },
  methods: {
    storeEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("store"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        title: {
          text: "80%",
          left: "center",
          top: "44%",
          textStyle: {
            color: "#27D9C8",
            fontSize: 20,
            align: "center",
          },
        },
        graphic: {
          type: "text",
          left: "center",
          top: "38%",
          style: {
            text: "运动达标率",
            textAlign: "center",
            fill: "#333",
            fontSize: 16,
            fontWeight: 600,
          },
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "43%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [{ value: 335, name: "直接访问",itemStyle: { color: '#27b8d0' } }],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/table{
    font-size: 12px!important;
}
.boardContent_echarts {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 255px;
  margin-top: 20px;
  .echartsLeft {
    width: 30%;
    height: 100%;
    // background: saddlebrown;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    border-right: 1px solid #ddd;
    .echarts {
      width: 40%;
      height: 100%;
      // background: darkcyan;
      p {
        color: #073b49;
        font-weight: bold;
        font-size: 14px;
      }
    }
    .table {
      width: 60%;
      height: 100%;
      // background: salmon;
    }
  }
  .echartsRight {
    width: 70%;
    height: 100%;
    padding: 0 20px;
    .eRight_top {
      display: flex;
      justify-content: space-between;
      p {
        border: 1px solid #e6e6e6;
        height: 28px;
        line-height: 28px;
        background: #e6e6e6;
        padding: 0 10px;
        border-radius: 4px;
        vertical-align: middle;
        cursor: pointer;
        opacity: 0.7;
        font-size: 12px;
        transition: all 0.2s ease-in 0s;
      }
      div {
        // margin-right: 10px;
        span {
          padding: 7px 10px;
          min-width: 40px;
          text-align: center;
          color: #27b8d0;
          border-left: 1px solid #27b8d0;
          border-top: 1px solid #27b8d0;
          border-bottom: 1px solid #27b8d0;
          border-right: 1px solid #27b8d0;
          font-size: 12px;
          font-weight: normal;
          cursor: pointer;
        }
        .dayActive {
          padding: 7px 10px;
          min-width: 40px;
          text-align: center;
          color: #fff;
          border-left: 1px solid #27b8d0;
          border-top: 1px solid #27b8d0;
          border-bottom: 1px solid #27b8d0;
          border-right: 1px solid #27b8d0;
          font-size: 12px;
          font-weight: normal;
          cursor: pointer;
          background: #27b8d0;
        }
        span:hover {
          padding: 7px 10px;
          min-width: 40px;
          text-align: center;
          color: #fff;
          border-left: 1px solid #27b8d0;
          border-top: 1px solid #27b8d0;
          border-bottom: 1px solid #27b8d0;
          border-right: 1px solid #27b8d0;
          font-size: 12px;
          font-weight: normal;
          cursor: pointer;
          background: #27b8d0;
        }
        span:nth-of-type(1) {
          border-right: none;
        }
        span:nth-of-type(2) {
          border-right: none;
        }
      }
    }
  }
}
</style>
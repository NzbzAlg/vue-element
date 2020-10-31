
<template>
  <div class="storeProfitReport">
    <!-- 搜索 -->
    <div class="title">
      <!-- 日期 -->
      <el-date-picker
        v-model="date"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        size="medium"
        style="width: 255px"
      >
      </el-date-picker>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="echarts">
        <input id="check" type="checkbox" />
        <label for="check" class="check-in">
          <i class="el-icon-s-grid"></i>
          <span>展开图表</span>
        </label>
        <label for="check" class="check-out">
          <i class="el-icon-s-grid"></i>
          <span>收起图表</span>
        </label>
        <div class="echarts_item">
          <div class="echarts_content">
            <p>总利润：$5200.41</p>
            <div class="echarts_detail">
              <!-- 收入明细 -->
              <div class="detailEarnings">
                <div
                  id="detailEcharts"
                  :style="{ width: '100%', height: '100%' }"
                ></div>
              </div>
              <!-- 支出明细 -->
              <div class="statementExpenditures">
                <div
                  id="statementEcharts"
                  :style="{ width: '100%', height: '100%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <div class="homemadeForm">
        <div
          class="homemadeForm_item"
          v-for="item in profitReport"
          :key="item.id"
        >
          <div class="tableParent">
            <p>
              <span
                style="font-size: 24px; padding-right: 10px"
                v-if="item.children.length !== 0"
                @click="item.isChildren = !item.isChildren"
                >{{ item.isChildren ? "-" : "+" }}</span
              >
              {{ item.title }}
            </p>
            <p>{{ item.date1 }}</p>
            <p>{{ item.date2 }}</p>
            <p>{{ item.date3 }}</p>
            <p>{{ item.date4 }}</p>
            <p>{{ item.date5 }}</p>
            <p>{{ item.date6 }}</p>
            <p>{{ item.date7 }}</p>
            <p>{{ item.total }}</p>
          </div>
          <div
            class="tableChildren"
            v-show="item.isChildren"
            v-for="itemChild in item.children"
            :key="itemChild.id"
          >
            <p>{{ itemChild.title }}</p>
            <p>{{ itemChild.date1 }}</p>
            <p>{{ itemChild.date2 }}</p>
            <p>{{ itemChild.date3 }}</p>
            <p>{{ itemChild.date4 }}</p>
            <p>{{ itemChild.date5 }}</p>
            <p>{{ itemChild.date6 }}</p>
            <p>{{ itemChild.date7 }}</p>
            <p>{{ itemChild.total }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "", //日期
      // 利润报告
      profitReport: [
        {
          id: 1,
          title: "分组",
          date1: "2020-10-15",
          date2: "2020-10-14",
          date3: "2020-10-13",
          date4: "2020-10-12",
          date5: "2020-10-11",
          date6: "2020-10-10",
          date7: "2020",
          total: "总计",
          isChildren: false,
          children: [
            {
              id: 111,
              title: "起",
              date1: "2020-10-15",
              date2: "2020-10-14",
              date3: "2020-10-13",
              date4: "2020-10-12",
              date5: "2020-10-11",
              date6: "2020-10-10",
              date7: "2020",
              total: "总计",
            },
            {
              id: 222,
              title: "止",
              date1: "2020-10-15",
              date2: "2020-10-14",
              date3: "2020-10-13",
              date4: "2020-10-12",
              date5: "2020-10-11",
              date6: "2020-10-10",
              date7: "2020",
              total: "总计",
            },
          ],
        },
        {
          id: 2,
          title: "销量",
          date1: "179",
          date2: "112",
          date3: "57",
          date4: "44",
          date5: "42",
          date6: "42",
          date7: "2020",
          total: "849",
          isChildren: false,
          children: [],
        },
        {
          id: 3,
          title: "商品销售额",
          date1: "$2513.27",
          date2: "$1525.28",
          date3: "$839.16",
          date4: "$816.57",
          date5: "$680.62",
          date6: "$724.59",
          date7: "$",
          total: "$13278.27",
          isChildren: false,
          children: [],
        },
        {
          id: 4,
          title: "亚马逊费用",
          date1: "-$1357.41",
          date2: "-$811.43",
          date3: "-$379.41",
          date4: "-$319.58",
          date5: "-$282.54",
          date6: "-$299.40",
          date7: "-$",
          total: "-$6210.35",
          isChildren: false,
          children: [],
        },
        {
          id: 5,
          title: "促销",
          date1: "-$4.14",
          date2: "-$18.78",
          date3: "-$30.06",
          date4: "-$33.52",
          date5: "-$45.47",
          date6: "-$35.20",
          date7: "-$",
          total: "-$796.42",
          isChildren: false,
          children: [],
        },
        {
          id: 6,
          title: "广告",
          date1: "$0.00",
          date2: "-$502.26",
          date3: "$0.00",
          date4: "$0.00",
          date5: "$0.00",
          date6: "$0.00",
          date7: "-$",
          total: "-$1112.37",
          isChildren: false,
          children: [],
        },
        {
          id: 7,
          title: "商品调整",
          date1: "$0.00",
          date2: "$0.00",
          date3: "-$12.09",
          date4: "$29.19",
          date5: "$0.00",
          date6: "$24.18",
          date7: "-$",
          total: "$41.28",
          isChildren: false,
          children: [],
        },
        {
          id: 8,
          title: "其他",
          date1: "$0.00",
          date2: "$0.00",
          date3: "$0.00",
          date4: "$0.00",
          date5: "$0.00",
          date6: "$0.00",
          date7: "-$",
          total: "$0.00",
          isChildren: false,
          children: [],
        },
        {
          id: 9,
          title: "测评费用",
          date1: "$0.00",
          date2: "$0.00",
          date3: "$0.00",
          date4: "$0.00",
          date5: "$0.00",
          date6: "$0.00",
          date7: "-$",
          total: "$0.00",
          isChildren: false,
          children: [],
        },
        {
          id: 10,
          title: " 结款额",
          date1: "$0.00",
          date2: "$0.00",
          date3: "$0.00",
          date4: "$0.00",
          date5: "$0.00",
          date6: "$0.00",
          date7: "-$",
          total: "$0.00",
          isChildren: false,
          children: [],
        },
        {
          id: 11,
          title: " 商品成本",
          date1: "$0.00",
          date2: "$0.00",
          date3: "$0.00",
          date4: "$0.00",
          date5: "$0.00",
          date6: "$0.00",
          date7: "-$",
          total: "$0.00",
          isChildren: false,
          children: [],
        },
        {
          id: 12,
          title: " 物流",
          date1: "$0.00",
          date2: "$0.00",
          date3: "$0.00",
          date4: "$0.00",
          date5: "$0.00",
          date6: "$0.00",
          date7: "-$",
          total: "$0.00",
          isChildren: false,
          children: [],
        },
        {
          id: 13,
          title: " 运营费用",
          date1: "$0.00",
          date2: "$0.00",
          date3: "$0.00",
          date4: "$0.00",
          date5: "$0.00",
          date6: "$0.00",
          date7: "-$",
          total: "$0.00",
          isChildren: false,
          children: [],
        },
        {
          id: 14,
          title: " 毛利润",
          date1: "$0.00",
          date2: "$0.00",
          date3: "$0.00",
          date4: "$0.00",
          date5: "$0.00",
          date6: "$0.00",
          date7: "-$",
          total: "$0.00",
          isChildren: false,
          children: [],
        },
      ],
      currentPage1: 1,
      // 日期快捷方式
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.incomeEcharts(); //店铺收入明细
    this.expenditureEcharts(); //店铺支出明细
  },
  methods: {
    // 店铺收入明细echarts
    incomeEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("detailEcharts")
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "店铺收入明细",
          subtext: "2020-10-01至2020-10-15",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      window.onresize = myChart.resize;
    },
    // 店铺支出明细
    expenditureEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("statementEcharts")
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "店铺支出明细",
          subtext: "2020-10-01至2020-10-15",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      window.onresize = myChart.resize;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 15px;
}
.table {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0px 0px 6px #d4d4d4;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  .echarts {
    width: 100%;
    .echarts_item {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s;
      .echarts_content {
        p {
          font-size: 24px;
          color: #26b6ce;
          font-weight: bold;
          text-align: center;
          padding: 30px 0 20px;
        }
        .echarts_detail {
          display: flex;
          justify-content: center;
          // 店铺收入明细
          .detailEarnings {
            width: 500px;
            height: 380px;
            background: #fff;
            border-radius: 6px;
            box-shadow: 0 0 10px #e7e7e7;
            margin: 0 20px 40px;
          }
          // 店铺支出明细
          .statementExpenditures {
            width: 500px;
            height: 380px;
            background: #fff;
            border-radius: 6px;
            box-shadow: 0 0 10px #e7e7e7;
            margin: 0 20px 40px;
          }
        }
      }
    }
    :checked ~ .echarts_item {
      max-height: 500px;
    }
    input[type="checkbox"] {
      position: absolute;
      clip: rect(0 0 0 0);
    }
    :checked ~ .check-in {
      display: none;
    }
    :checked ~ .check-out {
      display: inline-block;
    }
    .check-out {
      display: none;
    }
    .check-in,
    .check-out {
      color: #409eff;
      cursor: pointer;
    }
  }
  // 表格
  .homemadeForm {
    // .positiveNumber{//正数颜色
    //   color: #409EFF;
    // }
    // .minus{//负数颜色
    //   color: #ec435d;
    // }
    margin-top: 20px;
    .homemadeForm_item {
      border-bottom: 1px solid #fff;
      cursor: pointer;
      .tableParent {
        height: 50px;
        line-height: 50px;
        background: #f8f8f8;
        display: flex;
        justify-content: space-between;
        p {
          font-size: 14px;
          font-weight: bold;
          width: 10%;
          // background: salmon;
          display: flex;
          justify-content: center;
        }
      }
      .tableChildren {
        display: flex;
        justify-content: space-between;
        p {
          font-size: 12px;
          height: 50px;
          background: #fff;
          line-height: 50px;
          width: 10%;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>
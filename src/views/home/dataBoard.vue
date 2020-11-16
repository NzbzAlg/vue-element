<template>
  <div class="dataBoard">
    <div class="title">
      <el-date-picker
        v-model="date"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        value-format="yyyy-MM-dd"
        size="medium"
        style="width: 255px;"
        @change="dateChange"
      >
      </el-date-picker>
    </div>
    <!-- 选择店铺 -->
    <!-- <div class="selectStore">
      <el-select v-model="store" placeholder="全部店铺">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div> -->
    <div class="content">
      <!-- 报表 -->
      <div class="statement">
        <!-- 即时销售报告 -->
        <div class="saleReports">
          <!-- 报表名称 -->
          <div class="statement_title">
            <p>
              <span>即时销售报告</span>
              <span>更新时间：2020-10-08 01:48:55</span>
            </p>
            <p>更多></p>
          </div>
          <!-- 订单金额 -->
          <div class="statement_money">
            <div
              class="money_item"
              @click="msg = 0"
              :class="{ money_item_active: msg === 0 }"
            >
              <p>订单金额</p>
              <p>$0.00</p>
              <p>
                <span>昨日</span>
                <span>$584.34∨</span>
              </p>
            </div>
            <div
              class="money_item"
              @click="msg = 1"
              :class="{ money_item_active: msg === 1 }"
            >
              <p>销售量</p>
              <p>26</p>
              <p>
                <span>昨日</span>
                <span>33</span>
              </p>
            </div>
            <div
              class="money_item"
              @click="msg = 2"
              :class="{ money_item_active: msg === 2 }"
            >
              <p>订单量</p>
              <p>23</p>
              <p>
                <span>昨日</span>
                <span>30</span>
              </p>
            </div>
            <div class="money_item">
              <p>退货量</p>
              <p>0</p>
              <p>
                <span>昨日</span>
                <span>0</span>
              </p>
            </div>
          </div>
          <!-- 折线图 -->
          <div class="statement_money_show">
            <!-- 订单金额 -->
            <orderAmountEcharts v-if="msg === 0"></orderAmountEcharts>
            <!-- 销售量 -->
            <salesVolumeEcharts v-if="msg === 1"></salesVolumeEcharts>
            <!-- 订单量 -->
            <orderQuantityEcharts v-if="msg === 2"></orderQuantityEcharts>
          </div>
        </div>
        <!-- 近七天利润费用 -->
        <div class="profit">
          <!-- 头部 -->
          <div class="profit_title">
            <p>
              <span>近7天利润费用 </span>
            </p>
            <p>更多></p>
          </div>
          <!-- 内容 -->
          <div class="profit_content">
            <div class="profit_item">
              <p>总收入</p>
              <p>$5245.00</p>
            </div>
            <div class="profit_item">
              <p>总支出</p>
              <p>-$5245.00</p>
            </div>
            <div class="profit_item">
              <p>毛利润</p>
              <p>$5245.00</p>
            </div>
            <div class="profit_item">
              <p>利润率</p>
              <p>77.77%</p>
            </div>
          </div>
          <div class="profit_echarts">
            <div
              id="profitEcharts"
              :style="{ width: '100%', height: '110%' }"
              v-on-echart-resize
            ></div>
          </div>
        </div>
        <!-- 销售榜 -->
        <div class="salesList">
          <!-- 头部 -->
          <div class="salesList_title">
            <p>销售榜</p>
            <p>
              <span
                class="salesList_size"
                @click="salesListTab = 0"
                :class="{ salesList_size_active: salesListTab === 0 }"
                >子ASIN</span
              >
              <span
                class="salesList_size"
                @click="salesListTab = 1"
                :class="{ salesList_size_active: salesListTab === 1 }"
                >父ASIN</span
              >
              <span
                class="salesList_size"
                @click="salesListTab = 2"
                :class="{ salesList_size_active: salesListTab === 2 }"
                >SKU</span
              >
            </p>
            <p>更多></p>
          </div>
          <!-- 表格 -->
          <div class="salesList_table">
            <div class="tabItem">
              <el-table
                :data="tableData"
                style="width: 100%; padding: 0 15px"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              >
                <el-table-column prop="date" label="商品 " align="center">
                </el-table-column>
                <el-table-column prop="name" label="ASIN" align="center">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="商品销售额"
                  align="center"
                >
                </el-table-column>
                <el-table-column prop="quantity" label="销售量" align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <!-- cpc -->
      <div class="CPC">
        <!-- cpcitem -->
        <div class="custom-cpc">
          <div class="cpc_title">
            <p>
              <span>CPC</span>
              <span>更新时间：--</span>
            </p>
            <p>更多></p>
          </div>
          <div class="cpc_content">
            <div class="cpc_item">
              <p>扣费</p>
              <p>0.00</p>
              <p>昨日 0.00</p>
            </div>
            <div class="cpc_item">
              <p>销售额</p>
              <p>0.00</p>
              <p>昨日 0.00</p>
            </div>
            <div class="cpc_item">
              <p>展现量</p>
              <p>0</p>
              <p>昨日 0</p>
            </div>
            <div class="cpc_item">
              <p>点击量</p>
              <p>0</p>
              <p>昨日 0</p>
            </div>
            <div class="cpc_item">
              <p>ACOS</p>
              <p>0</p>
              <p>昨日 0</p>
            </div>
          </div>
          <div class="cpc_echarts">
            <div
              id="cpcEcharts"
              :style="{ width: '100%', height: '100%' }"
              v-on-echart-resize
            ></div>
          </div>
        </div>
        <!-- 今日卖调价 + 店铺绩效 -->
        <div class="pricing-claim">
          <!-- 今日卖调价 -->
          <div class="todayPricing">
            <div class="todayPricing_title">
              <p>
                <span>今日跟卖调价</span>
              </p>
              <p>更多></p>
            </div>
            <div class="todayPricing_content">
              <div class="todayPricing_item">
                <p>被跟卖商品数</p>
                <p>0</p>
                <p>
                  <span>昨日</span>
                  <span>0</span>
                </p>
              </div>
              <div class="todayPricing_item">
                <p>被跟卖商品数</p>
                <p>0</p>
                <p>
                  <span>昨日</span>
                  <span>0</span>
                </p>
              </div>
              <div class="todayPricing_item">
                <p>被跟卖商品数</p>
                <p>0</p>
                <p>
                  <span>昨日</span>
                  <span>0</span>
                </p>
              </div>
            </div>
          </div>
          <!-- 店铺绩效 -->
          <div class="storePerformance">
            <div class="storePerformance_title">
              <p>
                <span>店铺绩效</span>
              </p>
              <p>更多></p>
            </div>
            <div class="storePerformance_content">
              <div class="storePerformance_item">
                <p>
                  <span>订单缺陷率</span>
                  <span>0.00%</span>
                </p>
                <p>目标：低于10%</p>
              </div>
              <div class="storePerformance_item">
                <p>
                  <span>退货不满意度</span>
                  <span>0.00%</span>
                </p>
                <p>目标：低于10%</p>
              </div>
              <div class="storePerformance_item">
                <p>
                  <span>商品政策合规性</span>
                  <span>0.00%</span>
                </p>
                <p>目标：低于10%</p>
              </div>
              <div class="storePerformance_item">
                <p>
                  <span>迟发率</span>
                  <span>0.00%</span>
                </p>
                <p>目标：低于10%</p>
              </div>
              <div class="storePerformance_item">
                <p>
                  <span>订单取消率</span>
                  <span>0.00%</span>
                </p>
                <p>目标：低于10%</p>
              </div>
              <div class="storePerformance_item">
                <p>
                  <span>有效跟踪率</span>
                  <span>0.00%</span>
                </p>
                <p>目标：低于10%</p>
              </div>
            </div>
          </div>
        </div>
        <!-- FBA库存状况 -->
        <div class="fba-infor">
          <div class="fab_stock">
            <div class="fab_title">
              <p>FBA库存状况</p>
            </div>
            <div class="fab_content">
              <div class="fab_item">
                <p>需补货SKU数</p>
                <p>0</p>
                <p>
                  <span>昨日</span>
                  <span>0</span>
                </p>
              </div>
              <div class="fab_item">
                <p>预计LTSF</p>
                <p>$0.00</p>
              </div>
              <div class="fab_item">
                <p>在库总成本</p>
                <p>0</p>
                <p>
                  <span>昨日</span>
                  <span>￥0.00</span>
                </p>
              </div>
            </div>
          </div>
          <div class="fab_compensation">
            <div class="compensation_title">
              <p>FBA索赔</p>
              <p>更多></p>
            </div>
            <div class="compensation_echarts">
              <div
                id="compensationEcharts"
                style="width: 100%; height: 100%"
                v-on-echart-resize
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单 -->
      <div class="order">
        <!-- 订单分布 -->
        <div class="orderDistribution">
          <div class="orderDistribution_title">
            <p>近7天订单分布</p>
          </div>
          <div class="orderDistribution_content">
            <div class="orderDistribution_map"></div>
          </div>
        </div>
        <!-- 销量排名 -->
        <div class="consider">
          <div class="consider_title">
            <p>
              <span>近7天地区销量排名</span>
            </p>
            <p>更多></p>
          </div>
          <div class="consider_content">
            <el-table
              :data="tableData"
              style="width: 100%; padding: 0 15px"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            >
              <el-table-column prop="date" label="地区 " align="center">
              </el-table-column>
              <el-table-column prop="name" label="订单量" align="center">
              </el-table-column>
              <el-table-column prop="quantity" label="占比" align="center">
                <template>
                  <el-progress :percentage="50"></el-progress>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 客户获取 -->
        <div class="customerAcquisition">
          <div class="customerAcquisition_title">
            <p>近7天客户获取</p>
          </div>
          <div class="customerAcquisition_echarts">
            <div
              id="customerAcquisitionEcharts"
              style="width: 100%; height: 100%"
              v-on-echart-resize
            ></div>
          </div>
        </div>
      </div>
      <!-- 公告 -->
      <div class="notice">
        <div class="updateLog">
          <div class="updateLog_title">
            <p>公告和更新日志</p>
          </div>
          <div class="updateLog_content">
            <ul>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
              <li>
                <p>通告：日本站部分邮件变量将停用，请尽快修改</p>
                <p>
                  <span>[2019-09-20 10:55:50]</span>
                  <i style="padding-left: 80px" class="el-icon-arrow-right"></i>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="accountManagement">
          <div class="accountManagement_content">
            <div class="accountManagement_item">
              <div class="accountManagement_title">
                <p>账号管理</p>
              </div>
              <div class="management_content">
                <div class="content_item">
                  <p>已授权运营店铺</p>
                  <p>
                    <span>6</span>
                    <span>+添加</span>
                  </p>
                </div>
                <div class="content_item">
                  <p>已授权CPC店铺</p>
                  <p>
                    <span>6</span>
                    <span>+添加</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="accountManagement_item">
              <div class="accountManagement_title">
                <p>客服邮件</p>
                <p>更多></p>
              </div>
              <div class="management_content">
                <div class="content_item">
                  <p>需回复</p>
                  <p>
                    <span>6</span>
                    <span>+添加</span>
                  </p>
                </div>
                <div class="content_item">
                  <p>今日已回</p>
                  <p>
                    <span>6</span>
                    <span>+添加</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="accountManagement_item">
              <div class="accountManagement_title">
                <p>近7日中差评</p>
              </div>
              <div class="management_content">
                <div class="content_item">
                  <p>Reviews</p>
                  <p>
                    <span>6</span>
                    <span>+添加</span>
                  </p>
                </div>
                <div class="content_item">
                  <p>Feedback</p>
                  <p>
                    <span>6</span>
                    <span>+添加</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import "../../utils/chart.resize";
import orderAmountEcharts from "./components/orderAmountEcharts"; //订单金额echarts
import salesVolumeEcharts from "./components/salesVolumeEcharts"; //销售量echarts
import orderQuantityEcharts from "./components/orderQuantityEcharts"; //订单量echarts
export default {
  components: {
    orderAmountEcharts,
    salesVolumeEcharts,
    orderQuantityEcharts,
  },
  data() {
    return {
      date: "", //日期
      msg: 0,
      salesListTab: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "B07YCY7WD2",
          address: "$199.90",
          quantity: 11,
        },
        {
          date: "2016-05-04",
          name: "B07YCY7WD2",
          address: "$199.90",
          quantity: 11,
        },
        {
          date: "2016-05-01",
          name: "B07YCY7WD2",
          address: "$199.90",
          quantity: 11,
        },
        {
          date: "2016-05-03",
          name: "B07YCY7WD2",
          address: "$199.90",
          quantity: 11,
        },
        {
          date: "2016-05-03",
          name: "B07YCY7WD2",
          address: "$199.90",
          quantity: 11,
        },
      ],
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
    // 近七天利润费用图表
    this.profitsSevenDays();
    // cpc图表
    this.cpcChart();
    // FBA索赔
    this.compensationChart();
    // 近7天客户获取
    this.customerAcquisitionChart();
  },
  methods: {
    dateChange(){
      console.log(this.date[0])
      console.log(this.date[1])
    },
    // 近七天利润费用图表
    profitsSevenDays() {
      let sevenDayChart = this.$echarts.init(
        document.getElementById("profitEcharts")
      );
      // 绘制图表
      sevenDayChart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      });
      window.onresize = sevenDayChart.resize;
    },
    // cpc图表
    cpcChart() {
      // 基于准备好的dom，初始化echarts实例
      let cpcEchart = this.$echarts.init(document.getElementById("cpcEcharts"));
      // 绘制图表
      cpcEchart.setOption({
        title: {},
        tooltip: {
          trigger: "axis",
        },
        legend: {
          padding: [20, 0, 0, 0],
          data: ["扣费", "销售额"],
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
            name: "扣费",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      });
      window.onresize = cpcEchart.resize;
    },
    // FBA索赔
    compensationChart() {
      // 基于准备好的dom，初始化echarts实例
      let fbaChart = this.$echarts.init(
        document.getElementById("compensationEcharts")
      );
      // 绘制图表
      fbaChart.setOption({
        // title: {
        //   x:'center',
        //   x:'center',
        //   x:'center',
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          // orient: "vertical",//字体平铺
          x: "center",
          y: "bottom",
          data: ["待索赔", "索赔中", "已索赔"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "40%"],
            // avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "15",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: "待索赔" },
              { value: 310, name: "索赔中" },
              { value: 234, name: "已索赔" },
            ],
          },
        ],
      });
      window.onresize = fbaChart.resize
    },
    customerAcquisitionChart() {
      // 基于准备好的dom，初始化echarts实例
      let clientChart = this.$echarts.init(
        document.getElementById("customerAcquisitionEcharts")
      );
      // 绘制图表
      clientChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["新客户", "复购客户"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "新客户",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "复购客户",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      });
      window.onresize = clientChart.resize
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table td,
.el-table th {
  padding: 11px 0 !important;
}
//选择店铺
.title {
  margin-bottom: 15px;
}
// 数据看板
.content {
  // 报表
  .statement {
    width: 100%;
    height: 345px;
    // background: saddlebrown;
    display: flex;
    justify-content: space-between;
    //   即时销售报告
    .saleReports {
      width: 40%;
      height: 100%;
      background: #fdfdfd;
      border-radius: 4px;
      box-shadow: 2px 2px 3px #cfcece;
      // 即时销售报告头部
      .statement_title {
        display: flex;
        justify-content: space-between;
        padding: 2px 20px;
        margin-top: 10px;
        p {
          display: inline-block;
          span:nth-of-type(1) {
            color: #252b33;
            font-size: 14px;
            font-weight: bold;
          }
          span:nth-of-type(2) {
            color: #a8a8a8;
            font-size: 12px;
            font-weight: bold;
            padding-left: 20px;
          }
        }
        p:nth-of-type(2) {
          color: #a8a8a8;
          font-size: 14px;
          font-weight: bold;
        }
      }
      // 订单金额
      .statement_money {
        display: flex;
        justify-content: space-between;
        // 未选中元素1
        .money_item:nth-of-type(1) {
          width: 25%;
          position: relative;
          cursor: pointer;
          p:nth-of-type(1) {
            font-size: 12px;
            color: #333;
            font-weight: bold;
            padding-left: 20px;
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            font-weight: bold;
            font-size: 20px;
            color: #27b8d0;
            padding-left: 20px;
            padding-top: 5px;
          }
          p:nth-of-type(3) {
            font-size: 12px;
            color: #333;
            padding: 5px 0px 10px 20px;
          }
        }
        // 未选中元素2
        .money_item:nth-of-type(2) {
          width: 25%;
          position: relative;
          cursor: pointer;
          p:nth-of-type(1) {
            font-size: 12px;
            color: #333;
            font-weight: bold;
            padding-left: 20px;
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            font-weight: bold;
            font-size: 20px;
            color: #ffc533;
            padding-left: 20px;
            padding-top: 5px;
          }
          p:nth-of-type(3) {
            font-size: 12px;
            color: #333;
            padding: 5px 0px 10px 20px;
          }
        }
        // 未选中元素3
        .money_item:nth-of-type(3) {
          width: 25%;
          position: relative;
          cursor: pointer;
          p:nth-of-type(1) {
            font-size: 12px;
            color: #333;
            font-weight: bold;
            padding-left: 20px;
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            font-weight: bold;
            font-size: 20px;
            color: #5d62b5;
            padding-left: 20px;
            padding-top: 5px;
          }
          p:nth-of-type(3) {
            font-size: 12px;
            color: #333;
            padding: 5px 0px 10px 20px;
          }
        }
        // 未选中元素4
        .money_item:nth-of-type(4) {
          width: 25%;
          position: relative;
          cursor: pointer;
          p:nth-of-type(1) {
            font-size: 12px;
            color: #333;
            font-weight: bold;
            padding-left: 20px;
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            font-weight: bold;
            font-size: 20px;
            color: #f2726f;
            padding-left: 20px;
            padding-top: 5px;
          }
          p:nth-of-type(3) {
            font-size: 12px;
            color: #333;
            padding-left: 20px;
            padding: 5px 0px 10px 20px;
          }
        }
        // 最右侧竖线
        .money_item::before {
          content: "";
          position: absolute;
          right: 0;
          top: 15%;
          width: 1px;
          height: 70%;
          background: #a1aaaf;
        }
        // 去除最后一个竖线
        .money_item:last-child::before {
          background: inherit;
        }
        // 选中元素1
        .money_item_active:nth-of-type(1) {
          width: 25%;
          position: relative;
          cursor: pointer;
          border-bottom: 3px solid #27b8d0;
          p:nth-of-type(1) {
            font-size: 12px;
            color: #333;
            padding-left: 20px;
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            font-weight: bold;
            font-size: 20px;
            color: #27b8d0;
            padding-left: 20px;
          }
          p:nth-of-type(3) {
            font-size: 12px;
            color: #333;
            padding-left: 20px;
          }
        }
        // 选中元素2
        .money_item_active:nth-of-type(2) {
          width: 25%;
          position: relative;
          cursor: pointer;
          border-bottom: 3px solid #ffc533;
          p:nth-of-type(1) {
            font-size: 12px;
            color: #333;
            padding-left: 20px;
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            font-weight: bold;
            font-size: 20px;
            color: #ffc533;
            padding-left: 20px;
          }
          p:nth-of-type(3) {
            font-size: 12px;
            color: #333;
            padding-left: 20px;
          }
        }
        // 选中元素3
        .money_item_active:nth-of-type(3) {
          width: 25%;
          position: relative;
          cursor: pointer;
          border-bottom: 3px solid #5d62b5;
          p:nth-of-type(1) {
            font-size: 12px;
            color: #333;
            padding-left: 20px;
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            font-weight: bold;
            font-size: 20px;
            color: #5d62b5;
            padding-left: 20px;
          }
          p:nth-of-type(3) {
            font-size: 12px;
            color: #333;
            padding-left: 20px;
          }
        }
        // 选中元素倒三角1
        .money_item_active:nth-of-type(1)::after {
          content: "";
          position: absolute;
          left: 46%;
          bottom: -9px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #27b8d0;
        }
        // 选中元素倒三角2
        .money_item_active:nth-of-type(2)::after {
          content: "";
          position: absolute;
          left: 46%;
          bottom: -9px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #ffc533;
        }
        // 选中元素倒三角3
        .money_item_active:nth-of-type(3)::after {
          content: "";
          position: absolute;
          left: 46%;
          bottom: -9px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #5d62b5;
        }
        // 未选中元素hover下划线1
        .money_item:nth-of-type(1):hover {
          border-bottom: 3px solid #27b8d0;
        }
        .money_item:nth-of-type(1):hover:after {
          content: "";
          position: absolute;
          left: 46%;
          bottom: -9px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #27b8d0;
        }
        // 未选中元素hover下划线2
        .money_item:nth-of-type(2):hover {
          border-bottom: 3px solid #ffc533;
        }
        .money_item:nth-of-type(2):hover:after {
          content: "";
          position: absolute;
          left: 46%;
          bottom: -9px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #ffc533;
        }
        // 未选中元素hover下划线3
        .money_item:nth-of-type(3):hover {
          border-bottom: 3px solid #5d62b5;
        }
        .money_item:nth-of-type(3):hover:after {
          content: "";
          position: absolute;
          left: 46%;
          bottom: -9px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid #5d62b5;
        }
      }
      // 折线图
      .statement_money_show {
        width: 100%;
        height: 205px;
        // background: seagreen;
      }
    }
    //   近七天利润费用
    .profit {
      width: 29%;
      height: 100%;
      background: #fdfdfd;
      border-radius: 4px;
      box-shadow: 2px 2px 3px #cfcece;
      // 头部
      .profit_title {
        display: flex;
        justify-content: space-between;
        padding: 2px 20px;
        margin-top: 10px;
        p {
          display: inline-block;
          span:nth-of-type(1) {
            color: #252b33;
            font-size: 14px;
            font-weight: bold;
          }
        }
        p:nth-of-type(2) {
          color: #a8a8a8;
          font-size: 14px;
          font-weight: bold;
        }
      }
      // 内容
      .profit_content {
        display: flex;
        justify-content: space-around;
        .profit_item {
          width: 25%;
          padding-left: 20px;
          position: relative;
          p:nth-of-type(1) {
            font-size: 12px;
            color: #333333;
            margin-top: 10px;
            font-weight: bold;
          }
          p:nth-of-type(2) {
            font-size: 14px;
            color: #073b49;
            margin-top: 6px;
          }
        }
        .profit_item::before {
          content: "";
          position: absolute;
          right: 0;
          top: 15%;
          width: 1px;
          height: 80%;
          background: #a1aaaf;
        }
        .profit_item:last-child::before {
          background: inherit;
        }
      }
      // echarts
      .profit_echarts {
        width: 100%;
        height: 244px;
      }
    }
    //   销售榜
    .salesList {
      width: 29%;
      height: 100%;
      background: #fdfdfd;
      border-radius: 4px;
      box-shadow: 2px 2px 3px #cfcece;
      .salesList_title {
        display: flex;
        justify-content: space-between;
        padding: 2px 20px;
        margin-top: 10px;
        p:nth-of-type(1) {
          color: #252b33;
          font-size: 14px;
          font-weight: bold;
        }
        p:nth-of-type(2) {
          font-size: 14px;
          font-weight: bold;
          margin-top: 6px;
          span {
            padding: 0 10px;
          }
          .salesList_size {
            color: #073b49;
          }
          .salesList_size_active {
            font-weight: bold;
            color: #27b8d0;
            border-bottom: 3px solid #27b8d0;
          }
        }
        p:nth-of-type(3) {
          color: #a8a8a8;
          font-size: 14px;
          font-weight: bold;
        }
      }
      // 表格
      .salesList_table {
        margin-top: 4px;
      }
    }
  }
  // CPC
  .CPC {
    width: 100%;
    height: 350px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    //  cpcitem
    .custom-cpc {
      width: 40%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 2px 2px 3px #cfcece;
      background: #fdfdfd;
      .cpc_title {
        display: flex;
        justify-content: space-between;
        padding: 2px 20px;
        margin-top: 10px;
        p {
          display: inline-block;
          span:nth-of-type(1) {
            color: #252b33;
            font-size: 14px;
            font-weight: bold;
          }
          span:nth-of-type(2) {
            color: #a8a8a8;
            font-size: 12px;
            font-weight: bold;
            padding-left: 20px;
          }
        }
        p:nth-of-type(2) {
          color: #a8a8a8;
          font-size: 14px;
          font-weight: bold;
        }
      }
      .cpc_content {
        display: flex;
        justify-content: space-around;
        // 元素1
        .cpc_item {
          position: relative;
          width: 20%;
          p {
            padding-left: 20px;
          }
          p:nth-of-type(1) {
            font-size: 12px;
            color: #333333;
            margin-top: 10px;
          }
          p:nth-of-type(2) {
            font-size: 20px;
            color: #78bbf3;
            margin-top: 5px;
          }
          p:nth-of-type(3) {
            font-size: 12px;
            color: #333333;
            margin-top: 5px;
          }
        }
        // 元素2
        .cpc_item:nth-of-type(2) {
          p:nth-of-type(2) {
            font-size: 20px;
            color: #f2726f;
            margin-top: 5px;
          }
        }
        // 元素3
        .cpc_item:nth-of-type(3) {
          p:nth-of-type(2) {
            font-size: 20px;
            color: #5d62b5;
            margin-top: 5px;
          }
        }
        // 元素4
        .cpc_item:nth-of-type(4) {
          p:nth-of-type(2) {
            font-size: 20px;
            color: #ffc533;
            margin-top: 5px;
          }
        }
        // 元素5
        .cpc_item:nth-of-type(5) {
          p:nth-of-type(2) {
            font-size: 20px;
            color: #27b8d0;
            margin-top: 5px;
          }
        }
        .cpc_item::before {
          content: "";
          position: absolute;
          right: 0;
          top: 15%;
          width: 1px;
          height: 80%;
          background: #a1aaaf;
        }
        .cpc_item:last-child::before {
          background: inherit;
        }
      }
      .cpc_echarts {
        width: 100%;
        height: 225px;
      }
    }
    //  今日卖调价 + 店铺绩效
    .pricing-claim {
      width: 29%;
      height: 100%;
      // background: seashell;
      display: flex;
      justify-content: space-between;
      .todayPricing {
        width: 48%;
        height: 100%;
        border-radius: 4px;
        box-shadow: 2px 2px 3px #cfcece;
        background: #fdfdfd;
        .todayPricing_title {
          display: flex;
          justify-content: space-between;
          padding: 2px 20px;
          margin-top: 10px;
          p {
            display: inline-block;
            span:nth-of-type(1) {
              color: #252b33;
              font-size: 14px;
              font-weight: bold;
            }
          }
          p:nth-of-type(2) {
            color: #a8a8a8;
            font-size: 14px;
            font-weight: bold;
          }
        }
        .todayPricing_content {
          .todayPricing_item {
            width: 100%;
            // height: 33%;
            // background: skyblue;
            p {
              padding: 0 20px;
            }
            p:nth-of-type(1) {
              margin-top: 15px;
              font-size: 12px;
              color: #333;
            }
            p:nth-of-type(2) {
              color: #66db8d;
              font-size: 20px;
              margin-top: 7px;
            }
            p:nth-of-type(3) {
              font-size: 12px;
              color: #333;
              margin-top: 5px;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
      .storePerformance {
        width: 48%;
        height: 100%;
        border-radius: 4px;
        box-shadow: 2px 2px 3px #cfcece;
        background: #fdfdfd;
        .storePerformance_title {
          display: flex;
          justify-content: space-between;
          padding: 2px 20px;
          margin-top: 10px;
          p {
            display: inline-block;
            span:nth-of-type(1) {
              color: #252b33;
              font-size: 14px;
              font-weight: bold;
            }
          }
          p:nth-of-type(2) {
            color: #a8a8a8;
            font-size: 14px;
            font-weight: bold;
          }
        }
        .storePerformance_content {
          padding: 0 20px;
          margin-top: 10px;
          .storePerformance_item {
            margin-top: 10px;
            p:nth-of-type(1) {
              display: flex;
              justify-content: space-between;
              span:nth-of-type(1) {
                font-size: 12px;
                color: #333;
              }
              span:nth-of-type(2) {
                color: #77baf3;
                font-size: 14px;
              }
            }
            p:nth-of-type(2) {
              color: #999;
              font-size: 12px;
            }
          }
        }
      }
    }
    //  FBA库存状况
    .fba-infor {
      width: 29%;
      height: 100%;
      // background: wheat;
      // fab库存状况
      .fab_stock {
        width: 100%;
        height: 35%;
        border-radius: 4px;
        box-shadow: 2px 2px 3px #cfcece;
        background: #fdfdfd;
        .fab_title {
          p {
            font-size: 14px;
            padding-top: 10px;
            padding-left: 20px;
            font-weight: bold;
            color: #073b49;
          }
        }
        .fab_content {
          display: flex;
          padding: 0 20px;
          justify-content: space-between;
          .fab_item {
            width: 33%;
            margin-top: 12px;
            p:nth-of-type(1) {
              font-size: 12px;
              color: #333;
            }
            p:nth-of-type(2) {
              font-size: 20px;
              color: #5d62b5;
            }
            p:nth-of-type(3) {
              font-size: 12px;
              color: #333;
              margin-top: 5px;
              display: flex;
              justify-content: space-between;
              span:nth-of-type(2) {
                padding-right: 25px;
              }
            }
          }
          .fab_item:nth-of-type(2) {
            p:nth-of-type(2) {
              font-size: 20px;
              color: #38bcd3;
            }
          }
          .fab_item:nth-of-type(3) {
            p:nth-of-type(2) {
              font-size: 20px;
              color: #ffc533;
            }
          }
        }
      }
      // fba索赔
      .fab_compensation {
        width: 100%;
        height: 60%;
        border-radius: 4px;
        box-shadow: 2px 2px 3px #cfcece;
        background: #fdfdfd;
        margin-top: 15px;
        .compensation_title {
          display: flex;
          justify-content: space-between;
          p:nth-of-type(1) {
            font-size: 14px;
            padding-top: 10px;
            padding-left: 20px;
            font-weight: bold;
            color: #073b49;
          }
          p:nth-of-type(2) {
            font-size: 14px;
            padding-top: 10px;
            padding-right: 20px;
            font-weight: bold;
            color: #a8a8a8;
          }
        }
        .compensation_echarts {
          width: 100%;
          height: 170px;
          // background: slateblue;
        }
      }
    }
  }
  // 订单分布
  .order {
    width: 100%;
    height: 340px;
    // background: slateblue;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .orderDistribution {
      width: 40%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 2px 2px 3px #cfcece;
      background: #fdfdfd;
      .orderDistribution_title {
        margin-top: 10px;
        padding: 2px 20px;
        p {
          color: #073b49;
          font-size: 14px;
          font-weight: bold;
        }
      }
      .orderDistribution_content {
        width: 100%;
        height: 270px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        .orderDistribution_map {
          width: 95%;
          height: 100%;
          // background: springgreen;
        }
      }
    }
    .consider {
      width: 29%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 2px 2px 3px #cfcece;
      background: #fdfdfd;
      .consider_title {
        display: flex;
        justify-content: space-between;
        padding: 2px 20px;
        margin-top: 10px;
        p {
          display: inline-block;
          span:nth-of-type(1) {
            color: #252b33;
            font-size: 14px;
            font-weight: bold;
          }
          span:nth-of-type(2) {
            color: #a8a8a8;
            font-size: 12px;
            font-weight: bold;
            padding-left: 20px;
          }
        }
        p:nth-of-type(2) {
          color: #a8a8a8;
          font-size: 14px;
          font-weight: bold;
        }
      }
      .consider_content {
        margin-top: 10px;
      }
    }
    .customerAcquisition {
      width: 29%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 2px 2px 3px #cfcece;
      background: #fdfdfd;
      .customerAcquisition_title {
        margin-top: 10px;
        padding: 2px 20px;
        p {
          color: #073b49;
          font-size: 14px;
          font-weight: bold;
        }
      }
      .customerAcquisition_echarts {
        width: 100%;
        height: 300px;
      }
    }
  }
  // 公告更新日志
  .notice {
    width: 100%;
    height: 380px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .updateLog {
      width: 70%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 2px 2px 3px #cfcece;
      background: #fdfdfd;
      .updateLog_title {
        margin-top: 10px;
        padding: 2px 20px;
        p {
          color: #073b49;
          font-size: 14px;
          font-weight: bold;
        }
      }
      .updateLog_content {
        padding: 0 20px;
        ul {
          margin-top: 10px;
          height: 310px;
          overflow-y: auto;
          li {
            p {
              color: #7b7b7b;
              font-size: 12px;
            }
            p:nth-of-type(1) {
              display: inline-block;
              width: 80%;
              height: 40px;
              // background: darkgoldenrod;
              line-height: 40px;
            }
            p:nth-of-type(2) {
              display: inline-block;
              width: 20%;
              height: 40px;
              // background: greenyellow;
              line-height: 40px;
            }
          }
        }
      }
    }
    .accountManagement {
      width: 29%;
      height: 100%;
      // background: antiquewhite;
      .accountManagement_content {
        width: 100%;
        height: 100%;
        .accountManagement_item {
          width: 100%;
          height: 31%;
          // background: steelblue;
          border-radius: 4px;
          box-shadow: 2px 2px 3px #cfcece;
          background: #fdfdfd;
          margin-top: 12px;
          overflow: hidden;
          .accountManagement_title {
            padding: 2px 20px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            p {
              color: #073b49;
              font-size: 14px;
              font-weight: bold;
            }
            p:nth-of-type(2) {
              color: #a8a8a8;
              font-weight: bold;
              font-size: 14px;
            }
          }

          .management_content {
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: space-between;
            // background: greenyellow;
            .content_item {
              padding: 0 20px;
              width: 50%;
              height: 100%;
              position: relative;
              p:nth-of-type(1) {
                padding-top: 10px;
                padding-left: 10px;
                margin-bottom: 10px;
                font-size: 12px;
                color: #323232;
              }
              p:nth-of-type(2) {
                display: flex;
                justify-content: space-between;
                padding-left: 20px;
                span:nth-of-type(1) {
                  color: #69db8e;
                  font-size: 24px;
                }
                span:nth-of-type(2) {
                  color: #323232;
                  font-size: 14px;
                }
              }
            }
            .content_item:nth-of-type(2) {
              p:nth-of-type(2) {
                span:nth-of-type(1) {
                  color: #78bbf3;
                  font-size: 24px;
                }
              }
            }
            .content_item::before {
              content: "";
              position: absolute;
              right: 0;
              top: 15%;
              width: 1px;
              height: 70%;
              background: #a1aaaf;
            }
            .content_item:last-child::before {
              background: inherit;
            }
          }
        }
        .accountManagement_item:nth-of-type(1) {
          margin-top: 0 !important;
        }
      }
      // 选中第二行的第一个元素加颜色
      .accountManagement_content {
        .accountManagement_item:nth-of-type(2) {
          .management_content {
            .content_item:nth-of-type(1) {
              p:nth-of-type(2) {
                display: flex;
                justify-content: space-between;
                padding-left: 20px;
                span:nth-of-type(1) {
                  color: #27b8d0;
                  font-size: 24px;
                }
              }
            }
          }
        }
      }
      // 选中第二行的第二个元素加颜色
      .accountManagement_content {
        .accountManagement_item:nth-of-type(2) {
          .management_content {
            .content_item:nth-of-type(2) {
              p:nth-of-type(2) {
                display: flex;
                justify-content: space-between;
                padding-left: 20px;
                span:nth-of-type(1) {
                  color: #ffc533;
                  font-size: 24px;
                }
              }
            }
          }
        }
      }
      // 选中第三行的第一个元素加颜色
      .accountManagement_content {
        .accountManagement_item:nth-of-type(3) {
          .management_content {
            .content_item:nth-of-type(1) {
              p:nth-of-type(2) {
                display: flex;
                justify-content: space-between;
                padding-left: 20px;
                span:nth-of-type(1) {
                  color: #5d62b5;
                  font-size: 24px;
                }
              }
            }
          }
        }
      }
      // 选中第三行的第二个元素加颜色
      .accountManagement_content {
        .accountManagement_item:nth-of-type(3) {
          .management_content {
            .content_item:nth-of-type(2) {
              p:nth-of-type(2) {
                display: flex;
                justify-content: space-between;
                padding-left: 20px;
                span:nth-of-type(1) {
                  color: #f2726f;
                  font-size: 24px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="SummaryDials">
    <!-- 搜索 -->
    <div class="title">
      <!-- 国家 -->
      <el-select
        v-model="country"
        placeholder="国家"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in countryDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 店铺 -->
      <el-select
        v-model="shop"
        placeholder="店铺"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in shopDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 状态 -->
      <el-select
        v-model="state"
        placeholder="状态"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in stateDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 配对 -->
      <el-select
        v-model="pairSelect"
        placeholder="配对"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in pairSelectDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 配送方式 -->
      <el-select
        v-model="modeDistribution"
        placeholder="配送方式"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in modeDistributionDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
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
        style="margin-left: 10px; width: 255px"
      >
      </el-date-picker>
      <!-- 搜索 -->
      <el-input
        placeholder="搜索内容"
        v-model="searchContent"
        class="input-with-select"
        style="width: 275px; margin-left: 10px"
        size="medium"
      >
        <el-select
          v-model="multipleDrop"
          clearable
          filterable
          slot="prepend"
          size="medium"
          style="width: 105px"
        >
          <el-option
            v-for="item in multipleConditions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="tabItem">
        <p>
          <el-button type="primary" size="small" @click="pair"
            >批量配对</el-button
          >
          <el-button size="small" @click="ImportPair">导入配对</el-button>
          <el-button size="small" @click="assignedCharge"
            >批量分配负责人</el-button
          >
          <el-button size="small" @click="ImportAllocation"
            >导入分配负责人</el-button
          >
        </p>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="channel_name"
          label="图片"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="MSKU/FNSKU"
          align="center"
          width="120px"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="ASIN"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="operator"
          label="标题"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="品名/SKU"
          align="center"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="国家"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="价格"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="FBA可售"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="销量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="销售额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="广告费"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="排名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="评论"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="负责人"
          align="center"
        ></el-table-column>
        <el-table-column prop="SKU" label="操作" align="center" width="110px">
          <template>
            <el-dropdown split-button size="small" @click="pair">
              配对
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="statistics">统计</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="brandLabel">打印标签</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="assignedCharge">分配负责人</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 配对弹窗 -->
    <el-dialog title="配对" :visible.sync="pairPop" width="40%">
      <el-input
        placeholder="请输入品名、SKU搜索"
        style="width: 300px; margin-bottom: 10px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="品名" align="center">
        </el-table-column>
        <el-table-column prop="address" label="SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="分类" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品牌" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <span>配对</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pairPop = false">取 消</el-button>
        <el-button type="primary" @click="pairPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导入配对弹窗 -->
    <el-dialog title="导入配对" :visible.sync="ImportPairPop" width="30%">
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入配对</el-button>
          <span style="color: #006eff">下载配对模板</span>
        </div>
        <div class="import-info">
          <div>注意事项：</div>
          <p>支持导入格式为xlsx的文件</p>
          <p>模板中的表头不可更改，不可删除</p>
          <p>数据记录不要超过5000条</p>
          <p>发货单支持导入多个物流单</p>
          <p>同一发货单，物流商单号或跟踪号存在相同时覆盖该条物流信息</p>
          <p>Excel表中，同一发货单存在相同=物流商单号和跟踪号时取第一条记录</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ImportPairPop = false">取 消</el-button>
        <el-button type="primary" @click="ImportPairPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 批量分配负责人弹窗 -->
    <el-dialog
      title="批量设置负责人"
      :visible.sync="assignedChargePop"
      width="25%"
    >
      <div style="margin: 20px 0 10px 0">
        <span style="padding-right: 15px">负责人</span>
        <el-input style="width: 85%"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignedChargePop = false">取 消</el-button>
        <el-button type="primary" @click="assignedChargePop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导入分配负责人弹窗 -->
    <el-dialog
      title="导入负责人"
      :visible.sync="ImportAllocationPop"
      width="30%"
    >
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入负责人</el-button>
          <span style="color: #006eff">下载导入模板</span>
        </div>
        <div class="import-info">
          <div>注意事项：</div>
          <p>支持导入格式为xlsx的文件</p>
          <p>模板中的表头不可更改，不可删除</p>
          <p>数据记录不要超过5000条</p>
          <p>发货单支持导入多个物流单</p>
          <p>同一发货单，物流商单号或跟踪号存在相同时覆盖该条物流信息</p>
          <p>Excel表中，同一发货单存在相同=物流商单号和跟踪号时取第一条记录</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ImportAllocationPop = false">取 消</el-button>
        <el-button type="primary" @click="ImportAllocationPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 统计弹窗 -->
    <el-dialog title="统计" :visible.sync="statisticsPop" width="50%">
      <div class="statistics">
        <div class="statistics_title">
          <img
            src="https://m.media-amazon.com/images/I/41+ds5YaSIL._SL75_.jpg"
            alt=""
          />
          <p>
            <span
              >Pukomc French Press Coffee Maker 34 oz,Tea Maker with 4 Level
              Filtration System Heat Resistant Removable Borosilicate Glass 304
              Grade Stainless Steel Stylish Durable</span
            >
            <br />
            <span>MSKU：PUKOMC01A</span>
          </p>
        </div>
        <div class="statistics_echarts">
          <div
            id="statisticalChart"
            :style="{ width: '100%', height: '200px' }"
          ></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statisticsPop = false">取 消</el-button>
        <el-button type="primary" @click="statisticsPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 打印标签弹窗 -->
    <el-dialog title="打印商品标签" :visible.sync="brandLabelPop" width="45%">
      <div class="brandLabel">
        <p>FNSKU标签打印设置</p>
        <div class="brandLabel_title">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="12" style="margin-top: 10px">
              <el-form-item label="请选择打印纸张类型" label-width="160px">
                <el-select v-model="form.status" clearable>
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="margin-top: 10px">
              <el-form-item>
                <el-checkbox
                  v-model="checked"
                  style="margin-right: 15px"
                ></el-checkbox>
                <el-select
                  v-model="form.status"
                  clearable
                  placeholder="打印SKU"
                >
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="160px">
                <el-checkbox v-model="checked" style="margin-left: 40px"
                  >打印自定义内容</el-checkbox
                >
                <el-select v-model="form.status" clearable>
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <p>打印FNSKU标签</p>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="图片" align="center">
          </el-table-column>
          <el-table-column prop="name" label="MSKU/FNSKU" align="center">
          </el-table-column>
          <el-table-column prop="address" label="标题" align="center">
          </el-table-column>
          <el-table-column prop="address" label="打印数量" align="center">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="brandLabelPop = false">取 消</el-button>
        <el-button type="primary" @click="brandLabelPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      pairPop: false, //详情弹窗的添加商品
      ImportPairPop: false, //导入商品弹窗
      assignedChargePop: false, //批量分配负责人弹窗
      ImportAllocationPop: false, //导入分配负责人弹窗
      statisticsPop: false, //统计弹窗
      brandLabelPop: false, //打印标签弹窗
      checked: false,
      country: "", //国家
      // 国家下拉
      countryDrop: [
        {
          id: 1,
          name: "中国",
        }
      ],
      shop: "", //店铺
      //店铺下拉
      shopDrop: [
        {
          id: 1,
          name: "店铺",
        }
      ],
      state: "", //状态
      // 状态下拉
      stateDrop: [
        {
          id: 1,
          name: "在售",
        },
        {
          id: 2,
          name: "停售",
        },
        {
          id: 3,
          name: "已删除",
        },
      ],
      pairSelect: "", //配对
      // 配对下拉
      pairSelectDrop: [
        {
          id: 1,
          name: "已配对",
        },
        {
          id: 2,
          name: "未配对",
        }
      ],
       modeDistribution: "", //配送方式
      // 配送方式下拉
      modeDistributionDrop: [
        {
          id: 1,
          name: "FBA",
        },
        {
          id: 2,
          name: "FBM",
        }
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "MSKU",
        },
        {
          id: 2,
          name: "FNSKU",
        },
        {
          id: 3,
          name: "ASIN",
        },
        {
          id: 4,
          name: "ParentASIN",
        },
        {
          id: 5,
          name: "SKU",
        },
        {
          id: 6,
          name: "品名",
        },
        {
          id: 7,
          name: "标题",
        },
      ],
      currentPage1: 1,
      value1: "",
      formInline: {},
      activeName: "first",
      isShow: false,
      form: {
        name: "",
        departmentPull: "",
        status: "",
      },
      departmentPull: [],
      replenishment: [
        //是否当前补货
        {
          id: 1,
          name: "全部",
        },
        {
          id: 2,
          name: "是",
        },
        {
          id: 3,
          name: "否",
        },
        {
          id: 4,
          name: "无需提醒",
        },
      ],
      state: [
        //状态
        {
          id: 1,
          label: "启用",
        },
        {
          id: 2,
          label: "禁用",
        },
      ],
      tableData: [
        {
          id: "58259",
          number: 1,
          operator: "admin",
          children: [
            {
              size: 1,
            },
          ],
        },
        {
          id: "58259a",
          number: 1,
          operator: "admin1",
          children: [
            {
              size: 1,
            },
          ],
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
    // this.drawLine();
  },
  methods: {
    // 详情弹窗的添加商品
    pair() {
      this.pairPop = true;
    },
    // 添加商品 - 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 导入商品弹窗
    ImportPair() {
      this.ImportPairPop = true;
    },
    // 批量分配负责人弹窗
    assignedCharge() {
      this.assignedChargePop = true;
    },
    // 导入分配负责人弹窗
    ImportAllocation() {
      this.ImportAllocationPop = true;
    },
    // 统计弹窗
    statistics() {
      this.statisticsPop = true;
      this.$nextTick(() => {
        //  执行echarts方法
        this.statisticalLine();
      });
    },
    // 统计折线图
    statisticalLine() {
      let myChart = this.$echarts.init(
        document.getElementById("statisticalChart")
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
    // 打印标签弹窗
    brandLabel() {
      this.brandLabelPop = true;
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
  .tabItem {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
// 导入商品信息
.ImportLogistics {
  .ImportLogistics_title {
    margin-top: 15px;
    span {
      padding-left: 35px;
    }
  }
  .import-info {
    font-size: 12px;
    padding: 14px;
    color: #003b80;
    margin-top: 20px;
    background-color: #e5f0ff;
    border: 1px solid #97c7ff;
    line-height: 16px;
    p {
      padding-left: 20px;
    }
  }
}
//统计弹窗
.statistics {
  .statistics_title {
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: start;
    img {
      width: 60px;
      height: 60px;
    }
    p {
      padding-left: 15px;
      span:nth-of-type(1) {
        display: inline-block;
        width: 400px;
        max-height: 40px;
        font-size: 16px;
        line-clamp: 2;
        overflow: hidden;
        color: #000;
      }
      span:nth-of-type(2) {
        font-size: 12px;
        color: #888;
      }
    }
  }
}
// 打印商品标签
.brandLabel {
  p {
    margin-bottom: 15px;
  }
  p:nth-of-type(2) {
    margin-top: 15px;
  }
  .brandLabel_title {
    width: 100%;
    height: 120px;
    border: 1px solid #ddd;
  }
}

.paging {
  float: right;
  margin-top: 20px;
}
</style>
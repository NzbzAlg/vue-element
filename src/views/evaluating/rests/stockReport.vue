
<template>
  <div class="stockReport">
    <!-- 搜索 -->
    <div class="title">
      <!-- 仓库 -->
      <el-select
        v-model="warehouse"
        placeholder="仓库"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in warehouseDrop"
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="自建仓库" name="first">
          <div class="tab_control">
            <div class="radiogroup">
              <span
                @click="summaryDetail = 1"
                :class="{ summaryDetail_active: summaryDetail === 1 }"
                >汇总</span
              >
              <span
                @click="summaryDetail = 2"
                :class="{ summaryDetail_active: summaryDetail === 2 }"
                >明细</span
              >
            </div>
            <div class="radiogroup">
              <span
                @click="volumeCost = 1"
                :class="{ volumeCost_active: volumeCost === 1 }"
                >数量</span
              >
              <span
                @click="volumeCost = 2"
                :class="{ volumeCost_active: volumeCost === 2 }"
                >成本</span
              >
            </div>
          </div>
          <el-table
            :data="tableData"
            border
            show-summary
            style="width: 100%"
            v-show="summaryDetail === 1"
          >
            <el-table-column prop="name" label="仓库名称" align="center"> </el-table-column>
            <el-table-column prop="amount1" sortable label="商品种类" align="center">
            </el-table-column>
            <el-table-column prop="amount2" sortable label="初期库存" align="center">
            </el-table-column>
            <el-table-column prop="amount3" sortable label="采购入库" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="调拨入库" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="其他入库" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="库存调整" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="FBA出库" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="FBM出库" align="center" width="110">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="调拨出库" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="采购退货" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="其他出库" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="期末库存" align="center">
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="库存周转率"
              align="center"
              width="120px"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="库存周转天数"
              align="center"
              width="130px"
            >
            </el-table-column>
          </el-table>
          <el-table
            :data="tableData1"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            border
            :default-expand-all="false"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            v-show="summaryDetail === 2"
          >
            <el-table-column prop="date" label="SKU" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="name" label="FNSKU" sortable width="180" align="center">
            </el-table-column>
            <el-table-column prop="address" label="品名" align="center"> </el-table-column>
            <el-table-column prop="address" label="仓库" align="center"> </el-table-column>
            <el-table-column prop="address" label="库存属性" align="center"> </el-table-column>
            <el-table-column prop="address" label="期初库存" align="center"> </el-table-column>
            <el-table-column prop="address" label="采购入库" align="center"> </el-table-column>
            <el-table-column prop="address" label="调拨入库" align="center"> </el-table-column>
            <el-table-column prop="address" label="其他入库" align="center"> </el-table-column>
            <el-table-column prop="address" label="库存调整" align="center"> </el-table-column>
            <el-table-column prop="address" label="FBA出库" align="center"> </el-table-column>
            <el-table-column prop="address" label="FBM出库" align="center"> </el-table-column>
            <el-table-column prop="address" label="调拨出库" align="center"> </el-table-column>
            <el-table-column prop="address" label="采购退货" align="center"> </el-table-column>
            <el-table-column prop="address" label="其他出库" align="center"> </el-table-column>
            <el-table-column prop="address" label="期末库存" align="center"> </el-table-column>
            <el-table-column prop="address" label="库存周转率" align="center">
            </el-table-column>
            <el-table-column prop="address" label="库存周转天数" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="FBA仓库" name="second">
          <div class="tab_control">
            <div class="radiogroup">
              <span
                @click="summaryDetail"
                :class="{ summaryDetail_active: summaryDetail === 1 }"
                >汇总</span
              >
              <span
                @click="summaryDetail"
                :class="{ summaryDetail_active: summaryDetail === 2 }"
                >明细</span
              >
            </div>
            <div class="radiogroup">
              <span
                @click="volumeCost = 1"
                :class="{ volumeCost_active: volumeCost === 1 }"
                >数量</span
              >
              <span
                @click="volumeCost = 2"
                :class="{ volumeCost_active: volumeCost === 2 }"
                >成本</span
              >
            </div>
          </div>
          <el-table
            :data="tableData"
            border
            show-summary
            style="width: 100%"
            v-show="summaryDetail === 1"
          >
            <el-table-column prop="name" label="仓库名称" align="center"> </el-table-column>
            <el-table-column prop="amount1" label="月份" align="center"> </el-table-column>
            <el-table-column prop="amount2" label="商品种类" align="center"> </el-table-column>
            <el-table-column prop="amount3" sortable label="月初库存" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="货件补货" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="订单发货" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="买家退货" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="库存调整" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="库存移除" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="库存差异" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="月末库存" align="center">
            </el-table-column>
            <el-table-column prop="amount4" sortable label="月末在途" align="center">
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="库存周转率"
              width="120px"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="库存周转天数"
              width="130px"
              align="center"
            >
            </el-table-column>
          </el-table>
          <el-table
            :data="tableData1"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            border
            :default-expand-all="false"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            v-show="summaryDetail === 2"
          >
            <el-table-column prop="date" label="ASIN" width="180" align="center">
            </el-table-column>
            <el-table-column prop="name" label="MSKU" align="center"> </el-table-column>
            <el-table-column prop="name" label="FNSKU" align="center"> </el-table-column>
            <el-table-column prop="name" label="SKU" align="center"> </el-table-column>
            <el-table-column prop="address" label="品名" align="center"> </el-table-column>
            <el-table-column prop="address" label="仓库" align="center"> </el-table-column>
            <el-table-column prop="address" label="分类" align="center"> </el-table-column>
            <el-table-column prop="address" label="品牌" align="center"> </el-table-column>
            <el-table-column prop="address" label="库存属性" align="center"> </el-table-column>
            <el-table-column prop="address" label="月初库存" align="center"> </el-table-column>
            <el-table-column prop="address" label="货件补货" align="center"> </el-table-column>
            <el-table-column prop="address" label="订单发货" align="center"> </el-table-column>
            <el-table-column prop="address" label="买家退后" align="center"> </el-table-column>
            <el-table-column prop="address" label="库存调整" align="center"> </el-table-column>
            <el-table-column prop="address" label="库存移除" align="center"> </el-table-column>
            <el-table-column prop="address" label="库存差异" align="center"> </el-table-column>
            <el-table-column prop="address" label="月末库存" align="center"> </el-table-column>
            <el-table-column prop="address" label="月末在途" align="center"> </el-table-column>
            <el-table-column prop="address" label="库存周转率" align="center">
            </el-table-column>
            <el-table-column prop="address" label="库存周转天数" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
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
      summaryDetail: 1, //汇总明细选项卡
      volumeCost: 1, //数量成本选项卡
      warehouse: "", //仓库
      // 仓库下拉
      warehouseDrop: [
        {
          id: 1,
          name: "仓库",
        },
      ],
      state: "", //状态
      // 状态下拉
      stateDrop: [
        {
          id: 1,
          name: "全部",
        },
        {
          id: 2,
          name: "可售",
        },
        {
          id: 3,
          name: "待检",
        },
        {
          id: 4,
          name: "不可售",
        },
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "品名",
        },
        {
          id: 2,
          name: "SKU",
        },
        {
          id: 3,
          name: "FNSKU",
        }
      ],
      currentPage1: 1,
      activeName: "first",
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
      ],
      tableData1: [
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海",
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
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
  .tab_control {
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
    .radiogroup {
      float: left;
      cursor: pointer;
      span {
        display: inline-block;
        width: 56px;
        height: 32px;
        border: 1px solid #ddd;
        text-align: center;
        line-height: 32px;
      }
      .summaryDetail_active {
        display: inline-block;
        width: 56px;
        height: 32px;
        color: #409eff;
        border: 1px solid #409eff;
        text-align: center;
        line-height: 32px;
      }
      .volumeCost_active {
        display: inline-block;
        width: 56px;
        height: 32px;
        color: #409eff;
        border: 1px solid #409eff;
        text-align: center;
        line-height: 32px;
      }
    }
    .radiogroup:nth-of-type(2) {
      margin-left: 20px;
    }
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>
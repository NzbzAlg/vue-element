
<template>
  <div class="purchaseReport">
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
      <!-- 国家 -->
      <el-select
        v-model="country"
        placeholder="国家"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
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
      <!-- 供应商 -->
      <el-select
        v-model="supplier"
        placeholder="供应商"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in supplierDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 采购员 -->
      <el-select
        v-model="buyer"
        placeholder="采购员"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in buyerDrop"
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
        <el-tab-pane label="商品" name="first">
          <el-table :data="tableData" border show-summary style="width: 100%">
            <el-table-column prop="name" label="图片" align="center">
            </el-table-column>
            <el-table-column
              prop="amount1"
              sortable
              label="品名/SKU"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount2"
              sortable
              label="MSKU/FNSKU"
              width="150px"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="供应商"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="采购量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="到货量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="次品量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="订货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="到货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="次品率"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货率"
              align="center"
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="供应商" name="second">
          <el-table :data="tableData" border show-summary style="width: 100%">
            <el-table-column prop="name" label="供应商" align="center">
            </el-table-column>
            <el-table-column
              prop="amount1"
              sortable
              label="仓库"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount2"
              sortable
              label="采购员"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="采购类型"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="单据号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="采购量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="到货量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="次品量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="采购总金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="订货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="到货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="次品率"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货率"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="采购单据量"
              align="center"
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="采购员" name="third">
          <el-table :data="tableData" border show-summary style="width: 100%">
            <el-table-column prop="name" label="供应商" align="center">
            </el-table-column>
            <el-table-column
              prop="amount1"
              sortable
              label="采购员"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount2"
              sortable
              label="采购量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="到货量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="良品量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="次品量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="订货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="到货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="次品率"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货率"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="采购单据量"
              align="center"
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="明细" name="fourth">
          <el-table :data="tableData" border show-summary style="width: 100%">
            <el-table-column prop="name" label="操作时间" align="center">
            </el-table-column>
            <el-table-column
              prop="amount1"
              sortable
              label="类型"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount2"
              sortable
              label="单据号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="品名/SKU"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="MSKU/FNSKU"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="采购单号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="仓库"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="供应商"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="采购员"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="到货量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="实际采购量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="良品量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="次品量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货量"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="单价"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="订货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="到货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="退货金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="amount4"
              sortable
              label="预计到货时间"
              align="center"
            >
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
      warehouse: "", //仓库
      warehouseDrop: [
        {
          id: 1,
          name: "仓库",
        },
      ],
      country: "", //国家
      // 国家下拉
      countryDrop: [
        {
          id: 1,
          name: "中国",
        },
      ],
      shop: "", //店铺
      //店铺下拉
      shopDrop: [
        {
          id: 1,
          name: "店铺",
        },
      ],
      supplier: "", //供应商
      // 供应商下拉
      supplierDrop: [
        {
          id: 1,
          name: "供应商",
        },
      ],
      buyer: "", //采购员
      // 采购员下拉
      buyerDrop: [
        {
          id: 1,
          name: "采购员",
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
          name: "MSKU",
        },
        {
          id: 5,
          name: "FNSKU",
        },
        {
          id: 6,
          name: "单据号",
        },
        {
          id: 7,
          name: "采购单号",
        },
        {
          id: 8,
          name: "计划编号",
        },
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
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>
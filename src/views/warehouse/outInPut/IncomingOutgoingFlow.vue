
<template>
  <div class="transferSlip">
    <!-- 搜索 -->
    <div class="title">
      <!-- 类型 -->
      <el-select
        v-model="type"
        placeholder="类型"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in typeDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 仓库 -->
      <el-select
        v-model="warehouse"
        placeholder="仓库"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in warehouseDrop"
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
      <div class="tabItem"></div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="channel_name"
          label="操作时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="单据号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="品名/SKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="FNSKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="仓库"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="可用量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="次品量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="待检量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="待发货量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="采购单价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="单位费用"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="单位库存成本"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="货值"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="费用"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="库存成本"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="操作人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="备注"
          align="center"
        ></el-table-column>
      </el-table>
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
      type: "", //类型
      // 类型下拉
      typeDrop: [
        {
          id: 1,
          name: "其他入库",
        },
        {
          id: 2,
          name: "采购入库",
        },
        {
          id: 3,
          name: "调拨入库",
        },
        {
          id: 4,
          name: "其他入库",
        },
        {
          id: 5,
          name: "FBA出库",
        },
        {
          id: 6,
          name: "调拨出库",
        },
        {
          id: 7,
          name: "退货出库",
        },
        {
          id: 8,
          name: "库存调整",
        },
        {
          id: 9,
          name: "FBM出库",
        },
        {
          id: 10,
          name: "成本补录",
        },
        {
          id:11,
          name: "已撤销",
        },
      ],
      date: "", //日期
      warehouse: "", //仓库
      //仓库下拉
      warehouseDrop: [
        {
          id: 1,
          name: "仓库1",
        },
      ],
      shop:'',//店铺
      // 店铺下拉
      shopDrop:[
        {
          id: 1,
          name: "店铺",
        },
      ],
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
        },
        {
          id: 4,
          name: "出入库单号",
        },
        {
          id: 5,
          name: "操作人",
        },
        {
          id: 6,
          name: "备注",
        }
      ],
      currentPage1: 1,
      tableData: [],
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
.paging {
  float: right;
  margin-top: 20px;
}
</style>
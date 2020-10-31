
<template>
  <div class="paymentRecord">
    <!-- 搜索 -->
    <div class="title">
      <!-- 状态 -->
      <el-select
        v-model="state"
        placeholder="状态"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in stateDrop"
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
        v-model="supplier"
        placeholder="搜索供应商、采购单名称"
        clearable
        size="medium"
        style="width: 210px; margin-left: 10px"
      ></el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="table_button">
        <el-button size="small">批量标记付款</el-button>
        <el-button size="small">批量通过审核</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="channel_name"
          label="申请时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="采购单"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="采购单状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="采购员"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="供应商"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="支付方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="结算方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="到货量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="入库金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="采购量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="采购金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="本次付款"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="付款状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="附件"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="操作"
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
      state: "", //状态
      // 状态下拉
      stateDrop: [
        {
          id: 1,
          name: "待审核",
        },
        {
          id: 2,
          name: "待付款",
        },
      ],
      buyer: "", //采购员
      //采购员下拉
      buyerDrop: [
        {
          id: 1,
          name: "采购员",
        },
      ],
      date: "", //日期
      supplier: "", //供应商、采购单
      currentPage1: 1,
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
    // 搜索框展开收起
    dropDisplays() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.$refs.title.style.height = "100px";
      } else {
        this.$refs.title.style.height = "30px";
      }
    },
    // 列表详情
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
  .table_button {
    margin-bottom: 10px;
  }
}
// 列表详情弹窗
.listDetails {
  .listDetails_title {
    font-size: 15px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
    span:nth-of-type(2) {
      padding-left: 15px;
    }
    span:nth-of-type(3) {
      display: inline-block;
      padding: 0 10px;
      background-color: #0abf5b;
      color: #fff;
      height: 16px;
      line-height: 16px;
      border: none;
      margin-left: 15px;
      font-size: 12px;
      font-weight: 400;
    }
  }
  .listDetails_content {
    height: 330px;
    p {
      font-size: 15px;
      font-weight: bold;
      color: #000;
    }
  }
  .listDetails_table {
    p {
      font-size: 15px;
      font-weight: bold;
      color: #000;
      margin-bottom: 15px;
    }
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>

<template>
  <div class="customerList">
    <!-- 搜索 -->
    <div class="title">
      <!-- 搜索 -->
      <div class="title">
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
        <!-- 邮箱 -->
        <el-input
          placeholder="搜索邮箱"
          clearable
          style="width: 270px;margin-left:10px"
          size="medium"
        ></el-input>
        <el-button type="primary" size="medium" style="margin-left: 10px"
          >搜索</el-button
        >
      </div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="number"
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="店铺国家"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="邮箱"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="总订单数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="退款订单数"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="最早购买时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="最近购买时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="买家国家"
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
      date: "", //日期
      currentPage1: 1,
      disabled: false,
      checked: false,
      radio: 3,
      form: {
        name: "",
      },
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
          id: 1,
          number: 2,
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
  mounted() {},
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
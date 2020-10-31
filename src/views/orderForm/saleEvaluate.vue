
<template>
  <div class="saleEvaluate">
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
      <!-- 负责人 -->
      <el-select
        v-model="principal"
        placeholder="负责人"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in principalDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 星级 -->
      <el-select
        v-model="starLevel"
        placeholder="星级"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in starLevelDrop"
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
          label="图片"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="ASIN"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="评级"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="评价内容"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="买家信息"
          align="center"
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
          label="评价时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="更新时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="订单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="状态"
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
      principal: "", //负责人
      // 负责人下拉
      principalDrop: [
        {
          id: 1,
          name: "负责人",
        }
      ],
      starLevel: "", //星级
      // 星级下拉
      starLevelDrop: [
        {
          id: 1,
          name: "一星",
        },
        {
          id: 2,
          name: "二星",
        },
        {
          id: 3,
          name: "三星",
        },
        {
          id: 4,
          name: "四星",
        },
        {
          id: 5,
          name: "五星",
        }
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "ASIN",
        },
        {
          id: 2,
          name: "备注",
        },
        {
          id: 3,
          name: "订单号",
        },
        {
          id: 4,
          name: "买家信息",
        }
      ],
      currentPage1: 1,
      value1: "",
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
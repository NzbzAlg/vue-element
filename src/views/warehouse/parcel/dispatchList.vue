
<template>
  <div class="dispatchList">
    <!-- 搜索 -->
    <div class="title">
      <!-- 打印状态 -->
      <el-select
        v-model="printingStatus"
        placeholder="打印状态"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in printingStatusDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 发货仓库 -->
      <el-select
        v-model="warehouse"
        placeholder="发货仓库"
        clearable
        filterable
        size="medium"
        style="width: 150px;margin-left:10px"
      >
        <el-option
          v-for="item in warehouseDrop"
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
        style="width: 255px; margin-left: 10px"
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
        <el-tab-pane label="全部" name="first">
          <All></All>
        </el-tab-pane>
        <el-tab-pane label="待配货" name="second">
          <ForDistribution></ForDistribution>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="third">
          <SendGoods></SendGoods>
        </el-tab-pane>
        <el-tab-pane label="已发货" name="fourth">
          <Shipped></Shipped>
        </el-tab-pane>
        <el-tab-pane label="已作废" name="cancellation">
          <Cancellation></Cancellation>
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
import All from "./dispatchListComponents/all"; // 全部
import ForDistribution from "./dispatchListComponents/forDistribution"; // 待配货
import SendGoods from "./dispatchListComponents/sendGoods"; // 待发货
import Shipped from "./dispatchListComponents/shipped"; // 已发货
import Cancellation from "./dispatchListComponents/cancellation"; // 已作废
export default {
  components: {
    All,
    ForDistribution,
    SendGoods,
    Shipped,
    Cancellation,
  },
  data() {
    return {
      printingStatus: "", //打印状态
      // 打印状态下拉
      printingStatusDrop: [
        {
          id: 1,
          name: "已打印",
        },
        {
          id: 2,
          name: "未打印",
        },
      ],
      warehouse:'',//发货仓库
      // 发货仓库下拉
      warehouseDrop:[
        {
          id:1,
          name:'发货仓库'
        }
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "发货单号",
        },
        {
          id: 2,
          name: "货件单号",
        },
        {
          id: 3,
          name: "物流商单号",
        },
        {
          id: 4,
          name: "跟踪单号",
        },
      ],
      currentPage1: 1,
      activeName: "first",
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
  .table_button {
    margin-bottom: 10px;
  }
}
.logisticsTable {
  p {
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
  }
}
// 导入物流信息
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
.paging {
  float: right;
  margin-top: 20px;
}
</style>
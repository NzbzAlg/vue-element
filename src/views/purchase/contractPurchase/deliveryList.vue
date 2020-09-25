<template>
  <div class="deliveryList">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-date-picker
          v-model="value"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-select v-model="value" placeholder="请选择供应商查询" filterable style="margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择状态查询" style="margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
      <div class="title_right">
        <el-button type="primary">生成出货明细</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="厂家" align="center"></el-table-column>
        <el-table-column prop="name" label="合同单号" align="center"></el-table-column>
        <el-table-column prop="name" label="运输方式" align="center"></el-table-column>
        <el-table-column prop="name" label="出货时间" align="center"></el-table-column>
        <el-table-column prop="name" label="最后审核时间" align="center"></el-table-column>
        <el-table-column prop="name" label="图片" align="center"></el-table-column>
        <el-table-column prop="name" label="名称/SKU" align="center"></el-table-column>
        <el-table-column prop="name" label="国家" align="center"></el-table-column>
        <el-table-column prop="name" label="出货数量" align="center"></el-table-column>
        <el-table-column prop="name" label="总箱数" align="center"></el-table-column>
        <el-table-column prop="name" label="总重量(kg)" align="center"></el-table-column>
        <el-table-column prop="name" label="总体积(m3)" align="center"></el-table-column>
        <el-table-column prop="name" label="出货明细量" align="center"></el-table-column>
        <el-table-column prop="name" label="出货数量" align="center"></el-table-column>
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
import Crumbs from "@/components/crumbs";
export default {
  components: {
    Crumbs,
  },
  data() {
    return {
      value: "",
      currentPage1: 1,
      activeName: "first",
      form: {
        name: "",
      },
      state: [
        {
          id: 1,
          label: "全部国家",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
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
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  .title_left {
    float: left;
  }
  .title_right {
    float: right;
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>
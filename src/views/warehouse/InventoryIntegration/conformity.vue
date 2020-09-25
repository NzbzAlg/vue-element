<template>
  <div class="conformity">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-select v-model="value" placeholder="请选择分类查询">
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="value"
          placeholder="请选择品牌查询"
          style="margin-left: 20px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-select
          v-model="value"
          placeholder="请选择状态查询"
          style="margin-left: 20px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入品名或SKU查询"
          style="width: 210px; margin-left: 20px"
        ></el-input>
      </div>
      <el-button type="primary" style="margin-left: 20px">查询</el-button>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="图片"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="品名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="SKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="分类"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="品牌"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
            <template>
                <el-button size="mini" type="success">整合</el-button>
            </template>
        </el-table-column>
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
      state: [
        {
          id: 1,
          label: "全部国家",
        },
      ],
      form: {
        name: "",
        checked: false,
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀6 弄",
        },
      ],
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
// /deep/.el-dialog__body {
//   height: 600px !important;
// }
</style>
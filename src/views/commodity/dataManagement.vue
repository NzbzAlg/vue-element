<template>
  <div class="dataManagement">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-select v-model="value" placeholder="请选择分类查询">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择品牌查询" style="margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-input placeholder="请输入品名或SKU查询" style="width:210px;margin-left:20px"></el-input>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
      <div class="title_right">
        <el-button type="success">
          <i class="el-icon-upload el-icon--right"></i>下载辅料表
        </el-button>
        <el-button type="success">
          <i class="el-icon-upload el-icon--right"></i>下载产品详情表
        </el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center"></el-table-column>
        <el-table-column prop="name" label="sku" align="center"></el-table-column>
        <el-table-column prop="address" label="名字" align="center"></el-table-column>
        <el-table-column prop="address" label="国家" align="center"></el-table-column>
        <el-table-column prop="address" label="店铺" align="center"></el-table-column>
        <el-table-column prop="address" label="A SIN" align="center"></el-table-column>
        <el-table-column prop="address" label="耗材费" align="center"></el-table-column>
        <el-table-column prop="address" label="装箱数" align="center"></el-table-column>
        <el-table-column prop="address" label="店铺备货时间" align="center"></el-table-column>
        <el-table-column prop="address" label="厂家备货时间" align="center"></el-table-column>
        <el-table-column prop="address" label="海运时间" align="center"></el-table-column>
        <el-table-column prop="address" label="历史ASIN" align="center"></el-table-column>
        <el-table-column prop="address" label="产品标签" align="center"></el-table-column>
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
</style>
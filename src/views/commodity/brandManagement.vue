<template>
  <div class="brandManagement">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-input placeholder="请输入品牌查询" style="width:210px;"></el-input>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
      <div class="title_right">
        <el-button type="primary" @click="updateProductPop">添加品牌</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="品牌名称" align="center"></el-table-column>
        <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template>
            <el-button size="mini" type="success" @click="updateProductPop">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 品牌管理弹窗 -->
    <el-dialog title="编辑" :visible.sync="productUpdate" width="30%">
      <el-form :model="productForm">
        <el-row>
          <el-col>
            <el-form-item label="品牌名称：" label-width="120px">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="productUpdate = false">取 消</el-button>
        <el-button type="primary" @click="productUpdate = false">确 定</el-button>
      </span>
    </el-dialog>
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
      currentPage1: 1,
      productUpdate: false,
      productForm:{},
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
    //   更新产品弹窗
    updateProductPop() {
      this.productUpdate = true;
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
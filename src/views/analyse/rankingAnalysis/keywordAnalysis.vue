<template>
  <div class="keywordAnalysis">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <el-button type="primary" @click="productPop">录入产品</el-button>
      <el-select v-model="value" placeholder="请选择国家查询" style="margin-left:20px">
        <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择店铺查询" style="margin-left:20px">
        <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
      </el-select>
      <el-input placeholder="请输入asin查询" style="width:210px;margin-left:20px"></el-input>
      <el-input placeholder="请输入标题查询" style="width:210px;margin-left:20px"></el-input>
      <el-button type="primary" style="margin-left:20px">查询</el-button>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center"></el-table-column>
        <el-table-column prop="name" label="国家" align="center"></el-table-column>
        <el-table-column prop="address" label="店铺" align="center"></el-table-column>
        <el-table-column prop="address" label="标题" align="center"></el-table-column>
        <el-table-column prop="address" label="asin" align="center"></el-table-column>
        <el-table-column prop="address" label="时间" align="center"></el-table-column>
        <el-table-column prop="address" label="操作" align="center" width="300">
          <template>
            <el-button size="mini" type="success" @click="productPop">更新产品</el-button>
            <el-button size="mini" type="primary">关键词分析</el-button>
            <el-button size="mini" type="danger">删除产品</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗 -->
    <div class="popUp">
      <el-dialog title="录入产品" :visible.sync="dialogVisible" width="40%">
        <el-form :model="productForm">
          <el-row>
            <el-col>
              <el-form-item label="产品图片：" label-width="120px">
                <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" />
              </el-form-item>
              <el-form-item label="产品标题：" label-width="120px">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="asin(产品编码)：" label-width="120px">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="选择所属店铺：" label-width="120px">
                <el-select v-model="value" placeholder="请选择国家查询" style="width:100%">
                  <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="品类：" label-width="120px">
                <el-select v-model="value" placeholder="请选择国家查询" style="width:100%">
                  <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="同类asin(多个asin请以英文逗号隔开)：">
                <el-input type="textarea" style="width:600px;float:right"></el-input>
              </el-form-item>
              <el-form-item label="关键词(多个关键词请换行)：">
                <el-input type="textarea" style="width:600px;float:right"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
      dialogVisible: false,
      productForm: {},
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
      state: [
        {
          id: 1,
          label: "全部国家",
        },
      ],
    };
  },
  methods: {
    //   录入产品弹窗
    productPop() {
      this.dialogVisible = true;
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
  margin-bottom: 20px;
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>
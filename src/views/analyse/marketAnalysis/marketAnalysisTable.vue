<template>
  <div class="marketAnalysisTable">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <div>
          <el-input
            placeholder="请输入查询内容"
            v-model="dropDown"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option
                v-for="item in dropDownValue"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-input>
        </div>
        <div style="margin-left: 20px">
          <el-select v-model="value" placeholder="请选择店铺查询">
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
          <el-button type="primary" style="margin-left: 20px">查询</el-button>
        </div>
      </div>
      <div class="title_right">
        <el-button type="primary" @click="productUpdate">创建</el-button>
      </div>
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
          prop="date"
          label="国家"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="品名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="asin"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button size="mini" type="primary" @click="productUpdate"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 补发货弹窗 -->
    <el-dialog title="提示" :visible.sync="productUpdatePop" width="30%">
      <el-form :model="form">
        <el-col :span="24">
          <el-form-item label="市场表名：" label-width="90px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所属国家：" label-width="90px">
            <el-select v-model="value" placeholder="请选择店铺查询" style="width:100%">
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="采集链接：" label-width="90px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="产品asin：" label-width="90px">
            <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="productUpdatePop = false">取 消</el-button>
        <el-button type="primary" @click="productUpdatePop = false"
          >确 定</el-button
        >
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
      dropDown: "", //下拉框input值
      select: "",
      dropDownValue: [
        {
          id: 1,
          name: "ASIN",
        },
        {
          id: 2,
          name: "品名",
        },
      ],
      productUpdatePop: false, //补发货弹窗
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
    // 补发货弹窗
    productUpdate() {
      this.productUpdatePop = true;
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
    div {
      float: left;
    }
  }
  .title_right {
    float: right;
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
// /deep/.el-select .el-input {
//   width: 160px !important;
// }
</style>
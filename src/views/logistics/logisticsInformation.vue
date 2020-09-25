<template>
  <div class="logisticsInformation">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <el-select v-model="value" placeholder="请选择物流商查询">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
      <div class="title_right">
        <el-button type="primary" @click="addSupplierPop">添加物流商</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="物流商" align="center"></el-table-column>
        <el-table-column prop="name" label="承运方式" align="center"></el-table-column>
        <el-table-column prop="address" label="国家" align="center"></el-table-column>
        <el-table-column prop="address" label="计算方式" align="center"></el-table-column>
        <el-table-column prop="address" label="结款方式" align="center"></el-table-column>
        <el-table-column prop="address" label="汇款账户" align="center"></el-table-column>
        <el-table-column prop="address" label="联系人" align="center"></el-table-column>
        <el-table-column prop="address" label="电话" align="center"></el-table-column>
        <el-table-column prop="address" label="备注" align="center"></el-table-column>
        <el-table-column label="备注" align="center">
          <template>
            <el-button type="success" size="mini" @click="addSupplierPop">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="编辑物流商" :visible.sync="dialogVisible" width="35%">
      <el-form :model="productForm" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="物流商：">
              <el-input style="width:210px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="承运方式：">
              <el-input style="width:210px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人：">
              <el-input style="width:210px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：">
              <el-input style="width:210px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国家：">
              <el-input style="width:210px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计费方式：">
              <el-input style="width:210px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结款方式：">
              <el-input style="width:210px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="汇款账户：">
              <el-input style="width:210px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input type="textarea" style="width:525px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      value: "",
      currentPage1: 1,
      productForm: {},
      dialogVisible: false,
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
    //   添加供应商弹窗
    addSupplierPop() {
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
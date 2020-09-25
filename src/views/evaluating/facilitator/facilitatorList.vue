<template>
  <div class="facilitatorList">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 选择下拉框 -->
    <div class="drop" v-show="isShow">
      <el-form ref="form" :model="form" label-width="60px">
        <el-col :span="4">
          <el-form-item label="服务商">
            <el-input
              v-model="form.name"
              placeholder="请选择服务商名称查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="title">
      <el-button icon="el-icon-search" @click="dropDisplays"></el-button>
      <el-button type="success" @click="details">添加服务商</el-button>
      <el-button type="primary">上传服务商详情表</el-button>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="服务商"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="添加时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="微信/qq"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="站点"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="汇率"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="留评"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="免评"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="FB"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="QA仅提问"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="QA提问和回复"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="直评"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="删评"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="RATING"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="类目审核"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="首页无差评"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="站外推广"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="留评率"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="其他要求"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="返款方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="转账方式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="审核"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template>
            <el-button size="mini" type="primary" @click="details"
              >详情</el-button
            >
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="提示" :visible.sync="detailsPop" width="40%">
      <el-form :model="form" label-width="100px">
        <el-col :span="12">
          <el-form-item label="服务商：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信/qq：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款方式：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算汇率：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="留评：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="免评：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="FB：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QA仅提问：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QA提问：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="直评：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="删评：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类目审核：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="首页无差评：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="站外推广：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="RATING：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="留评率：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="站点：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转账：">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="其他要求：">
            <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsPop = false">取 消</el-button>
        <el-button type="primary" @click="detailsPop = false">确 定</el-button>
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
      select: "",
      isShow: false,
      detailsPop: false, //详情弹窗
      value: "",
      currentPage1: 1,
      addPurchasedGoodsPop: false, //添加采购单弹窗下面的添加采购商品弹窗
      activeName: "first",
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
          number: 0,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市1517 弄",
          number: 0,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普",
          number: 0,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀6 弄",
          number: 0,
        },
      ],
    };
  },
  methods: {
    dropDisplays() {
      this.isShow = !this.isShow;
    },
    // 详情弹窗
    details() {
      this.detailsPop = true;
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
}
.paging {
  float: right;
  margin-top: 20px;
}
// /deep/.el-dialog__body {
//   height: 600px !important;
// }
.drop {
  width: 100%;
  height: 62px;
  //   background: saddlebrown;
  //   padding: 0 50px;
}
</style>
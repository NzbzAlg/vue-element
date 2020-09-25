<template>
  <div class="otherOrders">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 选择下拉框 -->
    <div class="drop" v-show="isShow">
      <el-form ref="form" :model="form" label-width="120px">
        <el-col :span="6">
          <el-form-item label="服务商">
            <el-select
              v-model="value"
              placeholder="请选择服务商查询"
              style="width: 100%"
            >
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="评价">
            <el-select
              v-model="value"
              placeholder="请选择评价查询"
              style="width: 100%"
            >
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="建单部门">
            <el-select
              v-model="value"
              placeholder="请选择建单部门查询"
              style="width: 100%"
            >
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发货模式">
            <el-select
              v-model="value"
              placeholder="请选择发货模式查询"
              style="width: 100%"
            >
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="店铺">
            <el-select
              v-model="value"
              placeholder="请选择店铺查询"
              style="width: 100%"
            >
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select
              v-model="value"
              placeholder="请选择状态查询"
              style="width: 100%"
            >
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单号">
            <el-input
              v-model="form.name"
              placeholder="请选择订单号查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="买家姓名">
            <el-input
              v-model="form.name"
              placeholder="请选择买家姓名查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="买家邮箱">
            <el-input
              v-model="form.name"
              placeholder="请选择买家邮箱查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="ASIN">
            <el-input
              v-model="form.name"
              placeholder="请选择ASIN查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Title">
            <el-input
              v-model="form.name"
              placeholder="请选择Title查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="SellerSKU">
            <el-input
              v-model="form.name"
              placeholder="请选择SellerSKU查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="建单时间">
            <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
            ></el-date-picker>
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
      <el-button type="primary" @click="addOtherOrders"
        >添加其他单</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="建单部门"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="建单人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="建单日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="订单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="订单日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="名称/sku/单价/税金/数量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="订单总额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="评价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="佣金"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="汇率"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="服务商"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="请款金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加其他单弹窗 -->
    <el-dialog title="提示" :visible.sync="addOtherOrdersPop" width="30%">
      <el-form :model="form" label-width="90px">
        <el-form-item label="类型：">
          <el-select
            v-model="value"
            placeholder="请选择类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in state"
              :key="item.id"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务商：">
          <el-select
            v-model="value"
            placeholder="请选择服务商"
            style="width: 100%"
          >
            <el-option
              v-for="item in state"
              :key="item.id"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺：">
          <el-select
            v-model="value"
            placeholder="请选择店铺"
            style="width: 100%"
          >
            <el-option
              v-for="item in state"
              :key="item.id"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品sku：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="数量：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="佣金：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.name" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addOtherOrdersPop = false">取 消</el-button>
        <el-button type="primary" @click="addOtherOrdersPop = false"
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
      isShow: false,
      dropDownValue: [
        {
          id: 1,
          name: "出入库编号",
        },
        {
          id: 2,
          name: "sku",
        },
        {
          id: 3,
          name: "备注",
        },
        {
          id: 4,
          name: "操作人",
        },
      ],

      value: "",
      currentPage1: 1,
      addOtherOrdersPop: false, //添加其他单弹窗
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
    //   添加其他单弹窗
    addOtherOrders() {
      this.addOtherOrdersPop = true;
    },
    dropDisplays() {
      this.isShow = !this.isShow;
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
// /deep/.el-dialog__body {
//   height: 600px !important;
// }
.drop {
  width: 100%;
  height: 250px;
  //   background: saddlebrown;
  //   padding: 0 50px;
}
</style>
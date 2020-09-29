<template>
  <div class="orderList">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="drop" v-show="isShow">
      <el-form ref="form" :model="form" label-width="120px">
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
              placeholder="请输入订单号查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="买家姓名">
            <el-input
              v-model="form.name"
              placeholder="请输入买家姓名查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="买家邮箱">
            <el-input
              v-model="form.name"
              placeholder="请输入买家邮箱查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="ASIN">
            <el-input
              v-model="form.name"
              placeholder="请输入ASIN查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Title">
            <el-input
              v-model="form.name"
              placeholder="请输入Title查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="SellerSKU">
            <el-input
              v-model="form.name"
              placeholder="请输入SellerSKU查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="下单时间">
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
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="订单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="订单详情"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="订单金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="发货模式"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="买家姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="买家邮箱"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="下单时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="转换后时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="发货状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="追踪物流单号"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button size="mini" type="primary" @click="replenishDispatch"
              >补发货</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 补发货弹窗 -->
    <el-dialog title="提示" :visible.sync="replenishDispatchPop" width="40%">
      <el-divider content-position="left">编辑</el-divider>
      <el-form :model="form" style="height: 300px">
        <el-col :span="12">
          <el-form-item label="姓名：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="城市：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="省份：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="国家：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮编：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：" label-width="120px">
            <el-input
              v-model="form.name"
              autocomplete="off"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="addGoods">
        <el-divider content-position="left">添加商品</el-divider>
        <el-button
          type="primary"
          size="small"
          style="margin-bottom: 20px"
          @click="addPurchasedGoods"
          >添加采购商品</el-button
        >
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
            label="sku"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="可用量"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="出库量"
            align="center"
          ></el-table-column>
          <el-table-column align="center">
            <template>
              <span>移除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="replenishDispatchPop = false">取 消</el-button>
        <el-button type="primary" @click="replenishDispatchPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 补发货弹窗下面的添加采购商品弹窗 -->
    <el-dialog title="提示" :visible.sync="addPurchasedGoodsPop" width="40%">
      <div class="title">
        <el-select
          v-model="value"
          placeholder="请选择分类查询"
          style="width: 150px"
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
          placeholder="请选择品牌查询"
          style="width: 150px; margin-left: 20px"
        >
          <el-option
            v-for="item in state"
            :key="item.id"
            :label="item.label"
            :value="item"
          ></el-option>
        </el-select>
        <el-input
          placeholder="请输入SKU查询"
          style="width: 170px; margin-left: 20px"
        ></el-input>
        <el-button type="primary" style="margin-left: 20px">查询</el-button>
      </div>
      <div class="content">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          ref="multipleTable"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="date"
            label="关联编号"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="创建人"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="创建时间"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="运营审核人"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="运营审核时间"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPurchasedGoodsPop = false">取 消</el-button>
        <el-button type="primary" @click="addPurchasedGoodsPop = false"
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
      replenishDispatchPop: false, //补发货弹窗
      addPurchasedGoodsPop: false, //补发货弹窗下面的添加采购商品弹窗
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
    replenishDispatch() {
      this.replenishDispatchPop = true;
    },
    //补发货弹窗下面的添加采购商品弹窗
    addPurchasedGoods() {
      this.addPurchasedGoodsPop = true;
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
.title{
  margin-bottom: 20px;
}
.drop {
  width: 100%;
  height: 186px;
}
.paging {
  float: right;
  margin-top: 20px;
}
// /deep/.el-select .el-input {
//   width: 160px !important;
// }
</style>
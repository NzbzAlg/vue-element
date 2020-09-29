<template>
  <div class="financialReceipt">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 选择下拉框 -->
    <div class="drop" v-show="isShow">
      <el-form ref="form" :model="form" label-width="120px">
        <el-col :span="6">
          <el-form-item label="供应商">
            <el-select
              v-model="value"
              placeholder="请选择供应商查询"
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
          <el-form-item label="仓库">
            <el-select
              v-model="value"
              placeholder="请选择仓库查询"
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
          <el-form-item label="合同单号">
            <el-input
              v-model="form.name"
              placeholder="请输入合同单号查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="入库单号">
            <el-input
              v-model="form.name"
              placeholder="请输入入库单号查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品sku">
            <el-input
              v-model="form.name"
              placeholder="请输入商品sku查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="入库单备注">
            <el-input
              v-model="form.name"
              placeholder="请输入入库单备注查询"
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
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @expand-change="clickDetails"
      >
        <el-table-column label="详情" type="expand">
          <template>
            <span style="color: red">商品规格：</span>
            <el-table :data="tableData" border>
              <el-table-column
                prop="goodsSupId"
                label="店铺名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsName"
                label="组别"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsOriginPrice"
                label="预付款"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsPrice"
                label="减免金额"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsType"
                label="物流费"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="本次入库金额"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="总金额"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="物流单"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="出货计划"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="上次采购价"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="付款方式"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="采购员"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="创建人"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="物流审核人"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="财务审核人"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="财务审核时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="打款人"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="打款时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="质检员"
                align="center"
              ></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="单据类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          align="center"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="物流审核时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="入库编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="采购合同单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="供应商"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="仓库"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="商品名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="商品SKU码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="入库状态"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="采购量"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="总共待质检"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="出货计划数"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="置弃数"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="入库数量"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="不含税价"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="税率(%)"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="金额"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="耗材单价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="商品总额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="耗材总额"
          align="center"
        ></el-table-column>
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
          number: 3840,
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
    // 表格详情下拉
    clickDetails() {
      console.log(1);
      // if (row.goodsSupDetails == [] || row.goodsSpecs == []) {
      //   console.log(1);
      // } else {
      //   this.commodityDetails = row.goodsSupDetails;
      //   this.commercialSpecification = row.goodsSpecs;
      // }
    },

    dropDisplays() {
      this.isShow = !this.isShow;
    },
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
//   height: 550px !important;
// }
.drop {
  width: 100%;
  height: 186px;
  //   background: saddlebrown;
  //   padding: 0 50px;
}
</style>
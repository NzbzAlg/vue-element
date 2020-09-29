<template>
  <div class="financialTransfer">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 选择下拉框 -->
    <div class="drop" v-show="isShow">
      <el-form ref="form" :model="form" label-width="120px">
        <el-col :span="6">
          <el-form-item label="出库仓">
            <el-select
              v-model="value"
              placeholder="请选择出库仓查询"
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
          <el-form-item label="入仓库">
            <el-select
              v-model="value"
              placeholder="请选择入库仓查询"
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
          <el-form-item label="部门">
            <el-select
              v-model="value"
              placeholder="请选部门查询"
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
          <el-form-item label="运输方式">
            <el-select
              v-model="value"
              placeholder="请选择运输方式查询"
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
          <el-form-item label="国家">
            <el-select
              v-model="value"
              placeholder="请选择国家查询"
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
          <el-form-item label="调拨单号">
            <el-input
              v-model="form.name"
              placeholder="请输入调拨单号查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="品名/sku">
            <el-input
              v-model="form.name"
              placeholder="请输入品名或sku查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货件编号">
            <el-input
              v-model="form.name"
              placeholder="请输入货件查询"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运单号">
            <el-input
              v-model="form.name"
              placeholder="请输入运单号查询"
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
                label="店品名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsName"
                label="调拨量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsOriginPrice"
                label="本次运营上架数量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsPrice"
                label="上架总数量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsType"
                label="商品单价"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="耗材单价"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="商品总额"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="耗材总额"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="供应商名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="物流商"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="FBA物流单号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="物流方式"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="FBA预估运费"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="FBA差额运费"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="FBA实际运费"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="关税"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="VAT税"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="物流商应付账款"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="国内物流单号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="国内运费"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="货件编号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="操作人"
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
          label="单据状态"
          align="center"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="操作时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="大船开船日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="实际到货日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="上架日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="截仓日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="预计到货日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="调拨单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="出库仓库"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="入库仓库"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="商品SKU码"
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
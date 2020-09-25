<template>
  <div class="outboundOrder">
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
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-select
            v-model="value"
            placeholder="请选择状态"
            style="margin-left: 20px"
          >
            <el-option
              v-for="item in state"
              :key="item.id"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <el-button type="primary" style="margin-left: 20px">查询</el-button>
      </div>
      <div class="title_right">
        <el-button type="primary" @click="addOutboundOrder"
          >添加出库单</el-button
        >
      </div>
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
                label="图片"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsName"
                label="标签"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsOriginPrice"
                label="类型"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsPrice"
                label="单价"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsType"
                label="数量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsType"
                label="货值"
                align="center"
              ></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="出库仓库"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
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
          label="物流审核人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="物流审核时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="财务审核人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="财务审核时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template>
            <el-button
              size="mini"
              type="danger"
              style="margin-left: 0px"
              @click="financialAudit"
              >财务审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加采购单 -->
    <el-dialog title="提示" :visible.sync="addOutboundPop" width="40%">
      <el-divider content-position="left">编辑</el-divider>
      <el-form :model="form" style="height: 120px">
        <el-col :span="12">
          <el-form-item label="出库仓库：" label-width="120px">
            <el-select
              v-model="value"
              placeholder="请选择采购类型"
              filterable
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
        <el-col :span="12">
          <el-form-item label="类型：" label-width="120px">
            <el-select
              v-model="value"
              placeholder="请选择采购类型"
              filterable
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
        <el-col :span="24">
          <el-form-item label="供应商：" label-width="120px">
            <el-input
              v-model="form.name"
              autocomplete="off"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="addGoods">
        <el-divider content-position="left">出库商品</el-divider>
        <el-button
          type="primary"
          size="small"
          style="margin-bottom: 20px"
          @click="addPurchasedGoods"
          >添加出库商品</el-button
        >
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            prop="address"
            label="图片"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
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
        <el-button @click="addOutboundPop = false">取 消</el-button>
        <el-button type="primary" @click="addOutboundPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加采购单弹窗下面的添加采购商品弹窗 -->
    <el-dialog title="提示" :visible.sync="addPurchasedGoodsPop" width="40%">
      <div class="title">
        <el-input placeholder="请输入SKU查询" style="width: 170px"></el-input>
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
            label="次品量"
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
      dropDownValue: [
        {
          id: 1,
          name: "出库编号",
        },
        {
          id: 2,
          name: "sku",
        },
      ],

      value: "",
      currentPage1: 1,
      addOutboundPop: false, //添加采购单弹窗
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
    // 财务审核
    financialAudit() {
      this.$confirm("确认审核该条数据吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "审核成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核",
          });
        });
    },
    // 添加采购单弹窗
    addOutboundOrder() {
      this.addOutboundPop = true;
    },
    //添加采购单弹窗下面的添加采购商品弹窗
    addPurchasedGoods() {
      this.addPurchasedGoodsPop = true;
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
//   height: 600px !important;
// }
</style>
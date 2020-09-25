<template>
  <div class="logisticsBill">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
        <div>
          <el-input placeholder="请输入查询内容" v-model="dropDown" class="input-with-select">
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
        <div style="margin-left:20px">
          <el-select v-model="value" placeholder="请选择类别" filterable style="margin-left:20px;">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择状态" filterable style="margin-left:20px;">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
        </div>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" @expand-change="clickDetails">
        <el-table-column label="查看商品" type="expand">
          <template>
            <span style="color:red">商品规格：</span>
            <el-table :data="tableData" border>
              <el-table-column prop="goodsSupId" label="图片" align="center"></el-table-column>
              <el-table-column prop="specsName" label="品名" align="center"></el-table-column>
              <el-table-column prop="specsOriginPrice" label="sku" align="center"></el-table-column>
              <el-table-column prop="specsPrice" label="数量" align="center"></el-table-column>
              <el-table-column prop="specsType" label="总箱数" align="center"></el-table-column>
              <el-table-column prop="stock" label="总体积" align="center"></el-table-column>
              <el-table-column prop="stock" label="总重量" align="center"></el-table-column>
              <el-table-column prop="stock" label="体积重" align="center"></el-table-column>
              <el-table-column prop="stock" label="预估运费(均摊后单个)" align="center"></el-table-column>
              <el-table-column prop="stock" label="差额运费(均摊后单个)" align="center"></el-table-column>
              <el-table-column prop="stock" label="实际运费(均摊后单个)" align="center"></el-table-column>
              <el-table-column prop="stock" label="耗材(单个)" align="center"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="FBA物流单号" align="center"></el-table-column>
        <el-table-column prop="date" label="状态" align="center"></el-table-column>
        <el-table-column prop="name" label="分类" align="center"></el-table-column>
        <el-table-column prop="name" label="预计到货时间" align="center"></el-table-column>
        <el-table-column prop="name" label="大船开船时间" align="center"></el-table-column>
        <el-table-column prop="name" label="实际到货时间" align="center"></el-table-column>
        <el-table-column prop="name" label="发出仓库" align="center"></el-table-column>
        <el-table-column prop="name" label="送达仓库" align="center"></el-table-column>
        <el-table-column prop="name" label="FBA预估运费(分摊)" align="center"></el-table-column>
        <el-table-column prop="name" label="FBA差额运费(分摊)" align="center"></el-table-column>
        <el-table-column prop="name" label="FBA实际运费(分摊)" align="center"></el-table-column>
        <el-table-column prop="name" label="国内物流单号" align="center"></el-table-column>
        <el-table-column prop="name" label="国内运费(元)" align="center"></el-table-column>
        <el-table-column prop="name" label="国内均摊运费" align="center"></el-table-column>
        <el-table-column prop="name" label="总箱数" align="center"></el-table-column>
        <el-table-column prop="name" label="总体积" align="center"></el-table-column>
        <el-table-column prop="name" label="总重量" align="center"></el-table-column>
        <el-table-column prop="name" label="体积重" align="center"></el-table-column>
        <el-table-column prop="name" label="备注" align="center"></el-table-column>
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
      dropDownValue: [
        {
          id: 1,
          name: "物流单号",
        },
        {
          id: 2,
          name: "品名/SKU",
        },
      ],
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
    // 物流审核
    logisticsAudit() {
      this.$confirm("此操作将采购入库单审核进行审核, 是否继续?", "提示", {
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
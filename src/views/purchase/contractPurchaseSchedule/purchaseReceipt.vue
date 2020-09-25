<template>
  <div class="purchaseReceipt">
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
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-select v-model="value" placeholder="请选择状态" filterable style="margin-left:20px;">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择仓库" filterable style="margin-left:20px;">
            <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择供应商" style="margin-left:20px">
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
              <el-table-column prop="specsName" label="品名/sku" align="center"></el-table-column>
              <el-table-column prop="specsOriginPrice" label="入库状态" align="center"></el-table-column>
              <el-table-column prop="specsPrice" label="采购量" align="center"></el-table-column>
              <el-table-column prop="specsType" label="总共待质检" align="center"></el-table-column>
              <el-table-column prop="stock" label="出货计划数" align="center"></el-table-column>
              <el-table-column prop="stock" label="弃置数" align="center"></el-table-column>
              <el-table-column prop="stock" label="入库数量" align="center"></el-table-column>
              <el-table-column prop="stock" label="不含税价" align="center"></el-table-column>
              <el-table-column prop="stock" label="税率(%)" align="center"></el-table-column>
              <el-table-column prop="stock" label="金额" align="center"></el-table-column>
              <el-table-column prop="stock" label="上次采购价" align="center"></el-table-column>
              <el-table-column prop="stock" label="出货计划" align="center"></el-table-column>
              <el-table-column prop="stock" label="备注" align="center"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="采购合同单号" align="center"></el-table-column>
        <el-table-column prop="date" label="入库编号" align="center"></el-table-column>
        <el-table-column prop="name" label="状态" align="center"></el-table-column>
        <el-table-column prop="name" label="创建人" align="center"></el-table-column>
        <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="name" label="物流审核人" align="center"></el-table-column>
        <el-table-column prop="name" label="物流审核时间" align="center"></el-table-column>
        <el-table-column prop="name" label="财务审核人" align="center"></el-table-column>
        <el-table-column prop="name" label="财务审核时间" align="center"></el-table-column>
        <el-table-column prop="name" label="打款人" align="center"></el-table-column>
        <el-table-column prop="name" label="打款时间" align="center"></el-table-column>
        <el-table-column prop="name" label="供应商" align="center"></el-table-column>
        <el-table-column prop="name" label="仓库" align="center"></el-table-column>
        <el-table-column prop="name" label="付款方式" align="center"></el-table-column>
        <el-table-column prop="name" label="采购员" align="center"></el-table-column>
        <el-table-column prop="name" label="质检员" align="center"></el-table-column>
        <el-table-column prop="name" label="预付款" align="center"></el-table-column>
        <el-table-column prop="name" label="减免金额" align="center"></el-table-column>
        <el-table-column prop="name" label="物流费" align="center"></el-table-column>
        <el-table-column prop="name" label="总金额" align="center"></el-table-column>
        <el-table-column prop="name" label="物流单" align="center"></el-table-column>
        <el-table-column prop="name" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="380">
          <template>
            <el-button size="mini" type="success" @click="details">详情</el-button>
            <el-button size="mini" type="primary" @click="logisticsAudit">物流审核</el-button>
            <el-button size="mini" type="warning">查看附件</el-button>
            <el-button size="mini" type="warning">上传附件</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="提示" :visible.sync="detailsPop" width="60%">
      <el-divider content-position="left">编辑</el-divider>
      <el-form :model="form" style="height:500px">
        <el-col :span="12">
          <el-form-item label="合同编号：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供应商：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预付款：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款方式：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实付款：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退款收款账号：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退款/减免金额：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="算入成本：" label-width="120px">
            <el-checkbox v-model="form.checked"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="厂家出货时间：" label-width="120px">
            <el-date-picker v-model="form.name" type="date" placeholder="选择日期" style="width:240px"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="辅料备货时间：" label-width="120px">
            <el-date-picker v-model="form.name" type="date" placeholder="选择日期" style="width:240px"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="物流单号：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="物流费用：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="采购备注：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="addGoods">
        <el-divider content-position="left">商品</el-divider>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="图片" align="center"></el-table-column>
          <el-table-column prop="name" label="品名" align="center"></el-table-column>
          <el-table-column prop="address" label="sku" align="center"></el-table-column>
          <el-table-column prop="address" label="采购需求量" align="center"></el-table-column>
          <el-table-column prop="address" label="剩余采购量" align="center"></el-table-column>
          <el-table-column prop="address" label="不含税价" align="center"></el-table-column>
          <el-table-column prop="address" label="税率(%)" align="center"></el-table-column>
          <el-table-column prop="address" label="税额" align="center"></el-table-column>
          <el-table-column prop="address" label="总额" align="center"></el-table-column>
          <el-table-column prop="address" label="上次采购价" align="center"></el-table-column>
          <el-table-column prop="address" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
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
      dropDown: "", //下拉框input值
      select: "",
      dropDownValue: [
        {
          id: 1,
          name: "合同单号",
        },
        {
          id: 2,
          name: "入库单号",
        },
        {
          id: 3,
          name: "商品sku",
        },
        {
          id: 4,
          name: "入库单备注",
        },
      ],
      value: "",
      currentPage1: 1,
      detailsPop: false, //详情弹窗
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
    // 详情弹窗
    details() {
      this.detailsPop = true;
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
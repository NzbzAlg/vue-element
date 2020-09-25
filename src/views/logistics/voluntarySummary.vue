<template>
  <div class="voluntarySummary">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 头部 -->
    <div class="title">
      <div class="title_left">
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
        <el-select v-model="value" placeholder="请选择物流商" filterable style="margin-left:20px;">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-input v-model="value" placeholder="请输入物流单号" style="width:210px;margin-left:20px"></el-input>
      </div>
      <el-button type="primary" style="margin-left:20px">查询</el-button>
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
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="发货日期" align="center"></el-table-column>
        <el-table-column prop="date" label="店铺单号" align="center"></el-table-column>
        <el-table-column prop="name" label="物流商" align="center"></el-table-column>
        <el-table-column prop="name" label="物流单号" align="center"></el-table-column>
        <el-table-column prop="name" label="状态" align="center"></el-table-column>
        <el-table-column prop="name" label="发布仓库" align="center"></el-table-column>
        <el-table-column prop="name" label="店铺名称" align="center"></el-table-column>
        <el-table-column prop="name" label="箱数" align="center"></el-table-column>
        <el-table-column prop="volume" label="长" align="center" width="60"></el-table-column>
        <el-table-column prop="volume" label="宽" align="center" width="60"></el-table-column>
        <el-table-column prop="volume" label="高" align="center" width="60"></el-table-column>
        <el-table-column prop="volume" label="实际重量" align="center" width="60"></el-table-column>
        <el-table-column prop="volume" label="体积重" align="center" width="60"></el-table-column>
        <el-table-column prop="name" label="到货日期" align="center"></el-table-column>
        <el-table-column prop="name" label="派送时效" align="center"></el-table-column>
        <el-table-column prop="name" label="关税" align="center"></el-table-column>
        <el-table-column prop="name" label="运费" align="center"></el-table-column>
        <el-table-column prop="name" label="总额" align="center"></el-table-column>
        <el-table-column prop="name" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template>
            <el-button size="mini" type="success" @click="details">编辑</el-button>
            <el-button size="mini" type="primary" @click="audit">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="提示" :visible.sync="detailsPop" width="40%">
      <el-divider content-position="left">编辑</el-divider>
      <el-form :model="form">
        <el-col :span="12">
          <el-form-item label="发货日期：" label-width="120px">
            <el-date-picker v-model="value" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="到货日期：" label-width="120px">
            <el-date-picker v-model="value" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="箱数：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="长：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="宽：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="高：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实际重量：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="体积重：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关税：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运费：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注：" label-width="120px">
            <el-input v-model="form.name" autocomplete="off"></el-input>
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
          volume: 0,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          volume: 0,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          volume: 0,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          volume: 0,
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
    audit() {
      this.$confirm("审核后无法再进行修改, 是否继续?", "提示", {
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
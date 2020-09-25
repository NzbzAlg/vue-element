<template>
  <div class="rejectedPurchase">
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
        <el-input placeholder="请输入sku查询" style="width:210px;margin-left:20px"></el-input>
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
              <el-table-column prop="specsOriginPrice" label="采购需求量" align="center"></el-table-column>
              <el-table-column prop="specsPrice" label="实际采购量" align="center"></el-table-column>
              <el-table-column prop="specsType" label="上次采购价" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template>
                  <el-button size="mini">利润表</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="关联编号" align="center"></el-table-column>
        <el-table-column prop="name" label="创建人" align="center"></el-table-column>
        <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="name" label="厂家出货时间" align="center"></el-table-column>
        <el-table-column prop="name" label="采购模式" align="center"></el-table-column>
        <el-table-column prop="name" label="驳回理由" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template>
            <el-button size="mini" type="primary" @click="dismissDemand">重新提交</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 驳回需求弹窗 -->
    <el-dialog title="提示" :visible.sync="dismissDemandPop" width="30%">
      <el-form :model="form">
        <el-form-item label="理由：" label-width="90px">
          <el-input v-model="form.name" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dismissDemandPop = false">取 消</el-button>
        <el-button type="primary" @click="dismissDemandPop = false">确 定</el-button>
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
      dismissDemandPop: false, //驳回需求弹窗
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
    // 驳回需求
    dismissDemand() {
      this.dismissDemandPop = true;
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
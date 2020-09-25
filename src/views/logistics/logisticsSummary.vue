<template>
  <div class="LogisticsSummary">
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
        <el-select v-model="value" placeholder="调拨单是否审核" style="margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择状态查询" style="margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-select v-model="value" placeholder="请选择物流商查询" style="margin-left:20px">
          <el-option v-for="item in state" :key="item.id" :label="item.label" :value="item"></el-option>
        </el-select>
        <el-input placeholder="请输入物流单号查询" style="width:210px;margin-left:20px"></el-input>
        <el-button type="primary" style="margin-left:20px">查询</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="FBA物流单号" align="center"></el-table-column>
        <el-table-column prop="name" label="物流商" align="center"></el-table-column>
        <el-table-column prop="address" label="状态" align="center"></el-table-column>
        <el-table-column prop="address" label="发出仓库" align="center"></el-table-column>
        <el-table-column prop="address" label="箱数" align="center"></el-table-column>
        <el-table-column prop="address" label="体积m3" align="center"></el-table-column>
        <el-table-column prop="address" label="重量kg" align="center"></el-table-column>
        <el-table-column prop="address" label="预估运费" align="center"></el-table-column>
        <el-table-column prop="address" label="均摊事件" align="center"></el-table-column>
        <el-table-column prop="address" label="保存时间" align="center"></el-table-column>
        <el-table-column prop="address" label="代理报价" align="center"></el-table-column>
        <el-table-column prop="address" label="代理测量体积m3" align="center"></el-table-column>
        <el-table-column prop="address" label="代理测量重量kg" align="center"></el-table-column>
        <el-table-column prop="address" label="截仓日期" align="center"></el-table-column>
        <el-table-column prop="address" label="开船日期" align="center"></el-table-column>
        <el-table-column prop="address" label="到岗日期" align="center"></el-table-column>
        <el-table-column prop="address" label="预计到货时间" align="center"></el-table-column>
        <el-table-column prop="address" label="船期时效" align="center"></el-table-column>
        <el-table-column prop="address" label="派送时效" align="center"></el-table-column>
        <el-table-column prop="address" label="关税" align="center"></el-table-column>
        <el-table-column prop="address" label="增值税" align="center"></el-table-column>
        <el-table-column prop="address" label="国内运费" align="center"></el-table-column>
        <el-table-column prop="address" label="其他费用" align="center"></el-table-column>
        <el-table-column prop="address" label="运费" align="center"></el-table-column>
        <el-table-column prop="address" label="订单总额" align="center"></el-table-column>
        <el-table-column prop="address" label="物流总额" align="center"></el-table-column>
        <el-table-column prop="address" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="290">
          <template>
            <el-button size="mini" type="primary" @click="InBetween">进行均摊</el-button>
            <el-button size="mini" type="warning">上传附件</el-button>
            <el-button size="mini" type="warning">查看附件</el-button>
          </template>
        </el-table-column>
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
      value: "",
      currentPage1: 1,
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
          address: "上海市",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀弄",
        },
      ],
    };
  },
  methods: {
    // 进行均摊
    InBetween() {
      this.$confirm("此操作将用预估运费进行均摊, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
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
</style>
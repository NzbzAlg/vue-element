<template>
  <div class="IncomingOutgoingFlow">
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
            placeholder="请选择仓库查询"
            style="margin-left: 20px"
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
            placeholder="请选择类型查询"
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
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="操作时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="出入库单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="品名/sku"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="仓库"
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
        <el-table-column
          prop="address"
          label="质检量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="待发货量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="单价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="操作人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="备注"
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
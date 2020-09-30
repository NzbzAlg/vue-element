<template>
  <div class="storeSalesReport">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <!-- 选择下拉框 -->
    <div class="drop" v-show="isShow">
      <el-form ref="form" :model="form" label-width="120px">
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
          <el-form-item label="时间">
            <el-date-picker v-model="value" type="date" placeholder="选择日期">
            </el-date-picker>
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
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="昨日销量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="销售额(外币)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="汇率(实时)"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="销售额(本币)"
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
  height: 65px;
  //   background: saddlebrown;
  //   padding: 0 50px;
}
</style>
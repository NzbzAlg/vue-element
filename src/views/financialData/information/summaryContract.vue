<template>
  <div class="evaluateOrder">
    <!-- 面包屑 -->
    <Crumbs></Crumbs>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="按合同查看合同概况" name="first">
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
              <el-form-item label="建单时间">
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
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="详情" type="expand">
              <template>
                <span style="color: red">商品规格：</span>
                <el-table :data="tableData" border>
                  <el-table-column
                    prop="goodsSupId"
                    label="商品名称"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsName"
                    label="单位"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsOriginPrice"
                    label="单价"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsPrice"
                    label="采购数量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsType"
                    label="合同总额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="无效数量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="有效数量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="有效采购总额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="入库数量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="入库金额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="未入库数量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="未入库总额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="调整金额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="付款金额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="已入库未付款金额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="有效采购总额未付款金额"
                    align="center"
                  ></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="厂家名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="合同编码"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="签订日期"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="按厂家查看合同概况" name="second">
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
              <el-form-item label="建单时间">
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
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="address"
              label="厂家名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="合同编码"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="签订日期"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="specsPrice"
              label="采购数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="specsType"
              label="合同总额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="无效数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="有效采购数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="有效采购总额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="入库数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="入库金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="未入库数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="未入库总额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="调整金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="付款金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="已入库未付款金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="有效采购总额未付款金额"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="汇总查看合同概况" name="third">
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
              <el-form-item label="建单时间">
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
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="address"
              label="厂家名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="specsPrice"
              label="采购数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="specsType"
              label="合同总额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="无效数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="有效采购数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="有效采购总额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="入库数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="入库金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="未入库数量"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="未入库总额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="调整金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="付款金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="已入库未付款金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="stock"
              label="有效采购总额未付款金额"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
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
//   height: 600px !important;
// }
.drop {
  width: 100%;
  height: 65px;
  //   background: saddlebrown;
  //   padding: 0 50px;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
  background: #fff;
}
</style>
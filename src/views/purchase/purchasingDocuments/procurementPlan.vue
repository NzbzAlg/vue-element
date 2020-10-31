
<template>
  <div class="purchaseNote">
    <!-- 搜索 -->
    <div class="title">
      <!-- 国家 -->
      <el-select
        v-model="country"
        placeholder="国家"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in countryDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 店铺 -->
      <el-select
        v-model="shop"
        placeholder="店铺"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in shopDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 日期 -->
      <el-date-picker
        v-model="date"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        size="medium"
        style="margin-left: 10px; width: 255px"
      >
      </el-date-picker>
      <!-- 搜索 -->
      <el-input
        placeholder="搜索内容"
        v-model="searchContent"
        class="input-with-select"
        style="width: 275px; margin-left: 10px"
        size="medium"
      >
        <el-select
          v-model="multipleDrop"
          clearable
          filterable
          slot="prepend"
          size="medium"
          style="width: 105px"
        >
          <el-option
            v-for="item in multipleConditions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="tabItem">
        <p>
          <el-button type="primary" size="small" @click="shippingPlan"
            >添加采购计划</el-button
          >
          <el-button size="small">批量审核</el-button>
          <el-button size="small">批量删除</el-button>
        </p>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="详情" type="expand" width="50px">
          <template slot-scope="scope">
            <el-table :data="scope.row.children" border>
              <el-table-column
                prop="number"
                label="计划编号"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsName"
                label="图片"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsOriginPrice"
                label="品名/SKU"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsPrice"
                label="店铺"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsType"
                label="国家"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="FNSKU"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="供应商"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="采购员"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="计划采购量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="审核人"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="审核时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="状态"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="备注"
                align="center"
              ></el-table-column>
              <el-table-column prop="SKU" label="操作" align="center">
                <template>
                  <el-dropdown split-button size="small" @click="listDetails">
                    详情
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <span>审核</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span>删除</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          prop="channel_name"
          label="创建人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="附件"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <!-- 列表详情弹窗 -->
    <el-dialog title="采购计划详情" :visible.sync="listDetailsPop" width="40%">
      <div class="listDetails">
        <div class="listDetails_title">
          <span>计划编号</span>
          <span>PP201023003</span>
          <span>待审核</span>
        </div>
        <div class="listDetails_content">
          <div class="listDetails_info">
            <div class="listDetails_pic">
              <img
                src="https://image.umaicloud.com/saas/20201021/eec9e92eb5bd343330ee62cc59089ea8_s.jpg"
                alt=""
              />
            </div>
            <div class="listDetails_size">
              <p>
                Pukomc French Press Coffee Maker 34 oz,Tea Maker with 4 Level
                Filtration System Heat Resistant Removable Borosilicate Glass
                304 Grade Stainless Steel Stylish Durable
              </p>
              <p>SKU:213132132</p>
            </div>
          </div>
        </div>
        <div class="listDetails_form">
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-width="100px"
          >
            <el-col :span="12">
              <el-form-item label="店铺：">
                <span>STRONELI-US 美国</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="FNSKU：">
                <span>X002LEWKKH</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划采购量：">
                <span>1</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采购员：">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商：">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建人：">
                <span>超级管理员</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="创建时间：">
                <span>2020-10-23 10:32</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核人：">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核时间：">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <span>11</span>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="listDetailsPop = false">取 消</el-button>
        <el-button type="primary" @click="listDetailsPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加发货计划弹窗 -->
    <el-dialog title="生成采购单" :visible.sync="shippingPlanPop" width="60%">
      <div class="searchBox" style="margin-top: 20px">
        <div class="deliveryGoods">
          <span>采购商品</span>
          <span @click="addGoods">
            <i class="el-icon-plus"></i>
            添加商品
          </span>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="备注">
            <el-input type="textarea" placeholder="请输入内容" v-model="value1">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="品名/SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="店铺" align="center">
        </el-table-column>
        <el-table-column prop="address" label="FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="供应商" align="center">
        </el-table-column>
        <el-table-column prop="address" label="单箱数量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="计划采购量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shippingPlanPop = false">取 消</el-button>
        <el-button type="primary" @click="shippingPlanPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加发货计划的添加商品弹窗 -->
    <el-dialog title="添加商品" :visible.sync="addGoodsPop" width="40%">
      <el-input
        placeholder="请输入MSKU、FNSKU搜索"
        style="width: 300px; margin-bottom: 10px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="MSKU/FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="ASIN" align="center">
        </el-table-column>
        <el-table-column prop="address" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品名/SKU" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodsPop = false">取 消</el-button>
        <el-button type="primary" @click="addGoodsPop = false">确 定</el-button>
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
export default {
  data() {
    return {
      listDetailsPop: false, //列表详情弹窗
      shippingPlanPop: false, //添加发货计划弹窗
      addGoodsPop: false, //添加弹窗弹窗
      country: "", //国家
      // 国家下拉
      countryDrop: [
        {
          id: 1,
          name: "中国",
        },
      ],
      date: "", //日期
      shop: "", //店铺
      //店铺下拉
      shopDrop: [
        {
          id: 1,
          name: "店铺",
        },
      ],
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "采购员",
        },
        {
          id: 2,
          name: "供应商",
        },
        {
          id: 3,
          name: "品名",
        },
        {
          id: 4,
          name: "SKU",
        },
        {
          id: 5,
          name: "编号",
        },
        {
          id: 6,
          name: "创建人",
        },
      ],
      currentPage1: 1,
      radio: "",
      checked: "",
      formInline: {},
      value1: "",
      form: {
        name: "",
        departmentPull: "",
        status: "",
      },
      departmentPull: [],
      replenishment: [
        //是否当前补货
        {
          id: 1,
          name: "全部",
        },
        {
          id: 2,
          name: "是",
        },
        {
          id: 3,
          name: "否",
        },
        {
          id: 4,
          name: "无需提醒",
        },
      ],
      state: [
        //状态
        {
          id: 1,
          label: "启用",
        },
        {
          id: 2,
          label: "禁用",
        },
      ],
      tableData: [
        {
          id: "58259",
          channel_name: "tomotime_US",
          children: [
            {
              id: 1,
              number: 312412,
            },
          ],
        },
      ],
      // 日期快捷方式
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    // 列表详情弹窗
    listDetails() {
      this.listDetailsPop = true;
    },
    // 添加发货计划弹窗
    shippingPlan() {
      this.shippingPlanPop = true;
    },
    // 生成采购单 - 的添加商品
    addGoods() {
      this.addGoodsPop = true;
    },
    // 生成采购单 - 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
  margin-bottom: 15px;
}
.table {
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: center;
  box-shadow: 0px 0px 6px #d4d4d4;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  .tabItem {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
// 列表详情
.listDetails {
  .listDetails_title {
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 24px;
    color: #000;
    span:nth-of-type(2) {
      padding-left: 15px;
    }
    span:nth-of-type(3) {
      display: inline-block;
      padding: 0 10px;
      background-color: #0abf5b;
      color: #fff;
      height: 16px;
      line-height: 16px;
      border: none;
      margin-left: 15px;
      font-size: 12px;
      font-weight: 400;
    }
  }
  .listDetails_content {
    .listDetails_info {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      .listDetails_pic {
        width: 10%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .listDetails_size {
        width: 87%;
        height: 100%;
        p:nth-of-type(1) {
          line-height: 22px;
        }
        p:nth-of-type(2) {
          font-size: 12px;
          margin-top: 4px;
        }
      }
    }
  }
  .listDetails_form {
    margin-top: 20px;
  }
}
// 添加商品
.deliveryGoods {
  margin-bottom: 20px;
  span:nth-of-type(1) {
    font-weight: bold;
    color: #000;
    font-size: 14px;
  }
  span:nth-of-type(2) {
    padding-left: 10px;
    color: #338bff;
    cursor: pointer;
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
/deep/.el-textarea__inner {
  height: 38px !important;
}
</style>
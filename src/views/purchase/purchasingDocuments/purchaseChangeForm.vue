
<template>
  <div class="purchaseChangeForm">
    <!-- 搜索 -->
    <div class="title">
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
        style="width: 255px"
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div class="table_button">
            <el-button size="small">批量审核</el-button>
            <el-button size="small">批量下单</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="详情" type="expand" width="50">
              <template slot-scope="scope">
                <el-table :data="scope.row.children" border>
                  <el-table-column
                    prop="goodsSupId"
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
                    label="店铺/FNSKU"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsType"
                    label="单价"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="采购量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="金额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="到货量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="待到货量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="待检量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="预计到货时间"
                    align="center"
                  ></el-table-column>
                  <el-table-column prop="SKU" label="操作" align="center">
                    <template>
                      <el-dropdown
                        split-button
                        size="small"
                        @click="listDetails"
                      >
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
              label="计划单号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_name"
              label="创建时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="供应商"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="总金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="采购员"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="备注"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="已处理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="已驳回" name="fourth">定时补偿</el-tab-pane>
      </el-tabs>
    </div>
    <!-- 列表详情弹窗 -->
    <el-dialog title="采购变更详情" :visible.sync="listDetailsPop" width="60%">
      <div class="listDetails">
        <div class="listDetails_title">
          <span>采购变更单号</span>
          <span>PP201023003</span>
          <span>待审核</span>
        </div>
        <div class="listDetails_content">
          <p>基本信息</p>
          <el-form label-width="120px">
            <el-col :span="8">
              <el-form-item label="采购仓库：">
                <span>北京仓库</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商：">
                <span>广州晨光文具有限公司</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人：">
                <span>周女士</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式：">
                <span>123123</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算方式：">
                <span>广州晨光文具有限公司</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="付款方式：">
                <span>周女士</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购币种：">
                <span>北京仓库</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="运费：">
                <span>广州晨光文具有限公司</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他费用：">
                <span>周女士</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="变更时间：">
                <span>北京仓库</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="费用分配方式：">
                <span>广州晨光文具有限公司</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购单号：">
                <span>周女士</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="变更单备注：">
                <span>周女士</span>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="listDetails_table">
          <p>商品信息</p>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="图片" align="center">
            </el-table-column>
            <el-table-column prop="name" label="品名/SKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="店铺/FNSKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="原数量" align="center">
            </el-table-column>
            <el-table-column prop="address" label="原单价(￥)" align="center">
            </el-table-column>
            <el-table-column prop="address" label="原含税" align="center">
            </el-table-column>
            <el-table-column prop="address" label="原金额(￥)" align="center">
            </el-table-column>
            <el-table-column prop="address" label="到货量" align="center">
            </el-table-column>
            <el-table-column prop="address" label="新数量" align="center">
            </el-table-column>
            <el-table-column prop="address" label="新单价￥" align="center">
            </el-table-column>
            <el-table-column prop="address" label="新含税" align="center">
            </el-table-column>
            <el-table-column prop="address" label="新金额￥" align="center">
            </el-table-column>
            <el-table-column prop="address" label="备注" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="listDetailsPop = false">取 消</el-button>
        <el-button type="primary" @click="listDetailsPop = false"
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
export default {
  data() {
    return {
      listDetailsPop: false, //列表详情弹窗
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "变更单号",
        },
        {
          id: 2,
          name: "采购单号",
        },
        {
          id: 3,
          name: "供应商",
        },
        {
          id: 4,
          name: "采购员",
        },
        {
          id: 5,
          name: "创建人",
        },
        {
          id: 6,
          name: "品名",
        },
        {
          id: 7,
          name: "SKU",
        },
        {
          id: 8,
          name: "备注",
        },
      ],
      currentPage1: 1,
      activeName: "first",
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
    // 列表详情
    listDetails() {
      this.listDetailsPop = true;
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
  margin-bottom: 15px;
}
.table {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0px 0px 6px #d4d4d4;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  .table_button {
    margin-bottom: 10px;
  }
}
// 列表详情弹窗
.listDetails {
  .listDetails_title {
    font-size: 15px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
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
    height: 330px;
    p {
      font-size: 15px;
      font-weight: bold;
      color: #000;
    }
  }
  .listDetails_table {
    p {
      font-size: 15px;
      font-weight: bold;
      color: #000;
      margin-bottom: 15px;
    }
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>
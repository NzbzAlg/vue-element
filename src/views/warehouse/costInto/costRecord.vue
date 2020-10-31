
<template>
  <div class="costRecord">
    <!-- 搜索 -->
    <div class="title">
      <!-- 类型 -->
      <el-select
        v-model="type"
        placeholder="类型"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in typeDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 仓库 -->
      <el-select
        v-model="warehouse"
        placeholder="仓库"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in warehouseDrop"
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div class="table_button">
            <el-button type="primary" size="small" @click="addSupplement"
              >添加成本补录单</el-button
            >
            <el-button size="small">批量审核</el-button>
            <el-button size="small">批量删除</el-button>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="详情" type="expand" width="50">
              <template slot-scope="scope">
                <el-table border :data="scope.row.children">
                  <el-table-column
                    prop="size"
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
                    label="FNSKU"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsType"
                    label="关联单号"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="数量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="单价"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="金额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="调整金额"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="状态"
                    align="center"
                  ></el-table-column>
                  <el-table-column prop="SKU" label="操作" align="center">
                    <template>
                      <el-dropdown
                        split-button
                        size="small"
                        @click="detailList"
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
              label="类型"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="创建时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="创建人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="备注"
              align="center"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待审核" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="已处理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="已驳回" name="fourth">定时补偿</el-tab-pane>
      </el-tabs>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="成本补录单" :visible.sync="detailListPop" width="65%">
      <div class="detailList">
        <div class="detailList_title">
          <span>成本补录单</span>
          <span>RP201022003</span>
          <span>计划中</span>
        </div>
        <div class="basic-info">
          <p>基本信息</p>
          <el-form :model="formInline" label-width="75px">
            <el-col :span="8">
              <el-form-item label="补录类型">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="仓库">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="deliveryGoods">
          <span>发货商品</span>
          <span @click="addGoods">
            <i class="el-icon-plus"></i>
            添加商品
          </span>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="date" label="店铺/货件单号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="MSKU/FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品名/SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="包装规格(cm)" align="center">
        </el-table-column>
        <el-table-column prop="address" label="单品重量(g)" align="center">
        </el-table-column>
        <el-table-column prop="address" label="报关税费" align="center">
        </el-table-column>
        <el-table-column prop="address" label="发货仓库FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="可用量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="申报量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="发货量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailListPop = false">取 消</el-button>
        <el-button type="primary" @click="detailListPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 列表详情的添加商品弹窗 -->
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
    <!-- 添加成本补录单弹窗 -->
    <el-dialog
      title="添加成本补录单"
      :visible.sync="addSupplementPop"
      width="60%"
    >
      <div class="addSupplement">
        <div class="addSupplement_title">
          <p>基本信息</p>
          <el-form label-width="90px">
            <el-col :span="8">
              <el-form-item label="补录类型">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in replenishment"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="仓库">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in replenishment"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="addSupplement_content">
          <p>
            <span>商品信息</span>
            <span @click="addGoods">
              <i class="el-icon-plus"></i>
              添加商品
            </span>
            <span>
              <i class="el-icon-plus"></i>
              导入商品
            </span>
          </p>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="图片" align="center">
            </el-table-column>
            <el-table-column prop="name" label="品名/SKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="FNSKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="入库单号" align="center">
            </el-table-column>
            <el-table-column prop="address" label="入库量" align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="单位入库成本(￥)"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="address" label="入库成本(￥)" align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="货值调整金额(￥)"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="费用调整金额(￥)"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="入库成本调整金额(￥)"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
              <template> </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSupplementPop = false">取 消</el-button>
        <el-button type="primary" @click="addSupplementPop = false"
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
      detailListPop: false, //详情弹窗
      addGoodsPop: false, //详情弹窗的添加商品
      addSupplementPop: false, //添加成本补录单弹窗
      type: "", //类型
      // 类型下拉
      typeDrop: [
        {
          id: 1,
          name: "入库成本补录",
        },
        {
          id: 2,
          name: "出库成本补录",
        },
        {
          id: 3,
          name: "库存成本补录",
        },
      ],
      date: "", //日期
      warehouse: "", //仓库
      //仓库下拉
      warehouseDrop: [
        {
          id: 1,
          name: "仓库1",
        },
      ],
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "补录单号",
        },
        {
          id: 2,
          name: "关联单号",
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
          name: "FNSKU",
        },
        {
          id: 6,
          name: "备注",
        },
      ],
      currentPage1: 1,
      value1: "",
      formInline: {},
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
          number: 1,
          children: [
            {
              size: 1,
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
    // 详情弹窗
    detailList() {
      this.detailListPop = true;
    },
    // 详情弹窗的添加商品
    addGoods() {
      this.addGoodsPop = true;
    },
    // 添加商品 - 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 添加成本补录单弹窗
    addSupplement() {
      this.addSupplementPop = true;
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
.detailList {
  .detailList_title {
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 16px;
    color: #000;
    span:nth-of-type(2) {
      padding-left: 10px;
    }
    span:nth-of-type(3) {
      color: #fff;
      height: 16px;
      line-height: 16px;
      border: none;
      background-color: #0abf5b;
      padding: 0 10px;
      font-size: 12px;
      display: inline-block;
      margin-left: 10px;
      border-radius: 2px;
    }
  }
  .basic-info {
    width: 100%;
    height: 155px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
  }
}
// 添加成本补录单
.addSupplement {
  .addSupplement_title {
    p {
      color: #000;
      font-weight: bold;
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .addSupplement_content {
    p {
      margin-bottom: 10px;
      span:nth-of-type(1) {
        color: #000;
        font-weight: bold;
        font-size: 14px;
        margin-top: 10px;
      }
      span:nth-of-type(2) {
        padding-left: 15px;
        color: #006eff;
        cursor: pointer;
      }
      span:nth-of-type(3) {
        padding-left: 15px;
        color: #006eff;
        cursor: pointer;
      }
    }
  }
}
// 添加商品
.deliveryGoods {
  margin-bottom: 10px;
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
</style>
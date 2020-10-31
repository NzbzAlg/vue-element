
<template>
  <div class="purchaseNote">
    <!-- 搜索 -->
    <div class="title">
      <!-- 状态 -->
      <el-select
        v-model="status"
        placeholder="状态"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in statusDrop"
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
      <div class="tabItem">
        <p>
          <el-button size="small" @click="printLabel">打印标签</el-button>
        </p>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="详情" type="expand" width="50">
          <template slot-scope="scope">
            <el-table :data="scope.row.children" border>
              <el-table-column
                prop="number"
                label="图片"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsName"
                label="品名/SKU"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsOriginPrice"
                label="店铺/FNSKU"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsPrice"
                label="到货量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsType"
                label="已检量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="待检量"
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
                    @click="qualityTesting"
                  >
                    质检
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <span @click="exemption">免检</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="printLabel">打印标签</span>
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
          label="采购单"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="到货时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
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
          label="采购员"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="收货人"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <!-- 打印标签 -->
    <el-dialog title="打印标签" :visible.sync="printLabelPop" width="40%">
      <div class="printLabel">
        <el-button
          type="primary"
          size="small"
          style="margin-bottom: 15px"
          @click="addGood"
          >添加商品</el-button
        >
        <div class="operate-section">
          <span>设定统一打印量</span>
          <el-input style="width: 135px" placeholder="请输入"></el-input>
        </div>
        <div class="operate-table">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="图片" align="center">
            </el-table-column>
            <el-table-column prop="name" label="品名/SKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="打印" align="center">
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="printLabelPop = false">取 消</el-button>
        <el-button type="primary" @click="printLabelPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加商品弹窗 -->
    <el-dialog title="添加商品" :visible.sync="addGoodPop" width="40%">
      <el-input
        placeholder="请输入品名、SKU搜索"
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
        <el-table-column prop="name" label="品名/SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品牌" align="center">
        </el-table-column>
        <el-table-column prop="address" label="分类" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodPop = false">取 消</el-button>
        <el-button type="primary" @click="addGoodPop = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 质检弹窗 -->
    <el-dialog title="质检" :visible.sync="qualityTestingPop" width="50%">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="品名/SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="店铺/FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="未质检" align="center">
        </el-table-column>
        <el-table-column prop="address" label="本次质检量" align="center">
          <template>
            <el-input></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qualityTestingPop = false">取 消</el-button>
        <el-button type="primary" @click="qualityTestingPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 免检弹窗 -->
    <el-dialog title="免检" :visible.sync="exemptionPop" width="50%">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="品名/SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="店铺/FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="未质检" align="center">
        </el-table-column>
        <el-table-column prop="address" label="本次免检量" align="center">
          <template>
            <el-input></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exemptionPop = false">取 消</el-button>
        <el-button type="primary" @click="exemptionPop = false"
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
      printLabelPop: false, //打印标签弹窗
      addGoodPop: false, //添加商品弹窗
      qualityTestingPop: false, //质检弹窗
      exemptionPop: false, //质检弹窗
      status: "", //状态
      // 状态下拉
      statusDrop: [
        {
          id: 1,
          name: "未质检",
        },
        {
          id: 2,
          name: "部分质检",
        },
        {
          id: 3,
          name: "全部质检",
        },
        {
          id: 4,
          name: "已撤销",
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
          name: "采购单号",
        },
        {
          id: 2,
          name: "供应商",
        },
        {
          id: 3,
          name: "采购员",
        },
        {
          id: 4,
          name: "品名",
        },
        {
          id: 5,
          name: "SKU",
        }
      ],
      currentPage1: 1,
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
    // 打印标签弹窗
    printLabel() {
      this.printLabelPop = true;
    },
    // 添加商品弹窗
    addGood() {
      this.addGoodPop = true;
    },
    // 添加商品 - 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 质检弹窗
    qualityTesting() {
      this.qualityTestingPop = true;
    },
    // 免检弹窗
    exemption() {
      this.exemptionPop = true;
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
// 打印标签
.printLabel {
  .operate-section {
    width: 100%;
    height: 60px;
    background: #fafafa;
    border: 1px solid #ddd;
    line-height: 60px;
    span {
      padding: 0 15px;
    }
  }
  .operate-table {
    margin-top: 15px;
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>
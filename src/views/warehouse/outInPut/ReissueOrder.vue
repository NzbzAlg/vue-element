
<template>
  <div class="transferSlip">
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
      <div class="tabItem">
        <p>
          <el-button type="primary" size="small" @click="addSupplement"
            >添加调整单</el-button
          >
        </p>
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
                label="良品量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="次品量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="待检量"
                align="center"
              ></el-table-column>
              <el-table-column prop="SKU" label="操作" align="center">
                <template>
                  <el-dropdown split-button size="small" @click="detailList">
                    详情
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <span>撤销</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span>打印</span>
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
          label="入库仓库"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="操作人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="操作时间"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="调整单号" :visible.sync="detailListPop" width="50%">
      <div class="detailList">
        <div class="detailList_title">
          <span>调整单号</span>
          <span>RP201022003</span>
        </div>
        <div class="basic-info">
          <el-form :model="formInline" label-width="100px">
            <el-col :span="8" style="height: 50px">
              <el-form-item label="仓库名称">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height: 50px">
              <el-form-item label="调整类型">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height: 50px">
              <el-form-item label="操作日期">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height: 50px">
              <el-form-item label="操作人">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="height: 50px">
              <el-form-item label="备注">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="deliveryGoods">
          <span>商品详情</span>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="date" label="品名/SKU" align="center">
        </el-table-column>
        <el-table-column prop="name" label="FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="可用调拨量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="次品调拨量" align="center">
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
    <!-- 添加调拨单弹窗 -->
    <el-dialog title="添加调整单" :visible.sync="addSupplementPop" width="50%">
      <div class="addSupplement">
        <div class="addSupplement_title">
          <el-form label-width="100px">
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
              <el-form-item label="调整类型">
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
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="addSupplement_content">
          <p>
            <span>调整商品</span>
            <span @click="addGoods">
              <i class="el-icon-plus"></i>
              添加商品
            </span>
            <span @click="ImportGoods">
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
            <el-table-column prop="address" label="可用量" align="center">
            </el-table-column>
            <el-table-column prop="address" label="可用量调整" align="center">
            </el-table-column>
            <el-table-column prop="address" label="次品量" align="center">
            </el-table-column>
            <el-table-column prop="address" label="次品量调整" align="center">
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
    <!-- 导入物流信息弹窗 -->
    <el-dialog title="导入入库商品" :visible.sync="ImportGoodsPop" width="30%">
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入入库商品</el-button>
          <span style="color: #006eff">下载模板</span>
        </div>
        <div class="import-info">
          <div>注意事项：</div>
          <p>支持导入格式为xlsx的文件</p>
          <p>模板中的表头不可更改，不可删除</p>
          <p>数据记录不要超过5000条</p>
          <p>发货单支持导入多个物流单</p>
          <p>同一发货单，物流商单号或跟踪号存在相同时覆盖该条物流信息</p>
          <p>Excel表中，同一发货单存在相同=物流商单号和跟踪号时取第一条记录</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ImportGoodsPop = false">取 消</el-button>
        <el-button type="primary" @click="ImportGoodsPop = false"
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
      ImportGoodsPop: false, //导入商品弹窗
      type: "", //类型
      // 类型下拉
      typeDrop: [
        {
          id: 1,
          name: "FBA出库",
        },
        {
          id: 2,
          name: "其他出库",
        },
        {
          id: 3,
          name: "退货出库",
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
          name: "调整单号",
        },
        {
          id: 2,
          name: "SKU",
        },
        {
          id: 3,
          name: "品名",
        },
        {
          id: 4,
          name: "FNSKU",
        },
        {
          id: 5,
          name: "操作人",
        }
      ],
      currentPage1: 1,
      formInline: {},
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
    // 搜索框展开收起
    dropDisplays() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.$refs.title.style.height = "100px";
      } else {
        this.$refs.title.style.height = "30px";
      }
    },
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
    // 导入商品弹窗
    ImportGoods() {
      this.ImportGoodsPop = true;
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
  .tabItem {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
// 列表详情弹窗
.detailList {
  .detailList_title {
    margin-bottom: 20px;
    margin-top: 5px;
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
    height: 105px;
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
    height: 125px;
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
// 导入商品信息
.ImportLogistics {
  .ImportLogistics_title {
    margin-top: 15px;
    span {
      padding-left: 35px;
    }
  }
  .import-info {
    font-size: 12px;
    padding: 14px;
    color: #003b80;
    margin-top: 20px;
    background-color: #e5f0ff;
    border: 1px solid #97c7ff;
    line-height: 16px;
    p {
      padding-left: 20px;
    }
  }
}

.paging {
  float: right;
  margin-top: 20px;
}
</style>

<template>
  <div class="dispatchList">
    <!-- 搜索 -->
    <div class="title">
      <!-- 打印状态 -->
      <el-select
        v-model="printingStatus"
        placeholder="打印状态"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in printingStatusDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 发货仓库 -->
      <el-select
        v-model="warehouse"
        placeholder="发货仓库"
        clearable
        filterable
        size="medium"
        style="width: 150px;margin-left:10px"
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
        style="width: 255px; margin-left: 10px"
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
            <el-button type="primary" size="small">分配库存</el-button>
            <el-button type="primary" size="small">发货</el-button>
            <el-dropdown
              split-button
              size="small"
              @click="handleClick"
              style="margin-left: 10px"
            >
              更多操作
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>释放库存</el-dropdown-item>
                <el-dropdown-item>
                  <span @click="ImportLogistics">导入物流信息</span>
                </el-dropdown-item>
                <el-dropdown-item>批量删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column label="详情" type="expand" width="60">
              <template>
                <el-table border>
                  <el-table-column
                    prop="goodsSupId"
                    label="图片"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsName"
                    label="MSKU/FNSKU"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsOriginPrice"
                    label="品名/SKU"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsPrice"
                    label="发货量"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="specsType"
                    label="店铺"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    prop="stock"
                    label="货件单号"
                    align="center"
                  ></el-table-column>
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
              label="发货仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="shipment_id"
              label="默认仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="物流方式"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="创建时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="发货时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="预计到货时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="配送地址"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="物流信息"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="SKU"
              label="状态"
              align="center"
            ></el-table-column>
            <el-table-column prop="SKU" label="操作" align="center">
              <template>
                <el-dropdown split-button size="small" @click="detailList">
                  详情
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span @click="allocationInventory">分配库存</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span>生成加工单</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span>打印</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <span>删除</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待配货" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="待发货" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="已发货" name="fourth">定时补偿</el-tab-pane>
        <el-tab-pane label="已作废" name="cancellation">定时补偿</el-tab-pane>
      </el-tabs>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="货件计划详情" :visible.sync="detailListPop" width="65%">
      <div class="detailList">
        <div class="detailList_title">
          <span>计划单号</span>
          <span>RP201022003</span>
          <span>计划中</span>
        </div>
        <div class="basic-info">
          <p>仓储和物流</p>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="8">
              <el-form-item label="发货仓库" label-width="75px">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择发货仓库"
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
              <el-form-item label="物流方式">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择物流方式"
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
              <el-form-item label="预计到货时间">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分摊方式" label-width="75px">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择分摊方式"
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
              <el-form-item label="配送地址">
                <span>A8E8</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item> </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="logisticsInformation">
          <p>物流信息</p>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="8">
              <el-form-item label="物流商单号" label-width="90px">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="跟踪号">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物流费用">
                <el-input
                  placeholder="请输入内容"
                  v-model="value1"
                  class="input-with-select"
                >
                  <el-select v-model="value1" slot="prepend" placeholder="EUR">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他费用" label-width="90px">
                <el-input
                  placeholder="请输入内容"
                  v-model="value1"
                  class="input-with-select"
                >
                  <el-select v-model="value1" slot="prepend" placeholder="EUR">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                  </el-select>
                </el-input>
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
    <!-- 分配库存弹窗 -->
    <el-dialog
      title="货件计划详情"
      :visible.sync="allocationInventoryPop"
      width="65%"
    >
      <div class="detailList">
        <div class="detailList_title">
          <span>计划单号</span>
          <span>RP201022003</span>
          <span>计划中</span>
        </div>
        <div class="basic-info">
          <p>仓储和物流</p>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="8">
              <el-form-item label="发货仓库" label-width="75px">
                <span>默认仓库</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物流方式"> </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预计到货时间"> </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分摊方式" label-width="75px">
                <span>按计费重</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配送地址">
                <span>A8E8</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item> </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="logisticsInformation">
          <p>物流信息</p>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="8">
              <el-form-item label="物流商单号" label-width="90px">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="跟踪号">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物流费用">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他费用" label-width="90px">
                <span></span>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <div class="logisticsTable">
        <p>货件商品</p>
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
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocationInventoryPop = false">取 消</el-button>
        <el-button type="primary" @click="allocationInventoryPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导入物流信息弹窗 -->
    <el-dialog
      title="导入物流信息"
      :visible.sync="ImportLogisticsPop"
      width="30%"
    >
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入物流信息</el-button>
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
        <el-button @click="ImportLogisticsPop = false">取 消</el-button>
        <el-button type="primary" @click="ImportLogisticsPop = false"
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
      allocationInventoryPop: false, //分配库存弹窗
      ImportLogisticsPop: false, //导入物流信息商品
      printingStatus: "", //打印状态
      // 打印状态下拉
      printingStatusDrop: [
        {
          id: 1,
          name: "已打印",
        },
        {
          id: 2,
          name: "未打印",
        },
      ],
      warehouse:'',//发货仓库
      // 发货仓库下拉
      warehouseDrop:[
        {
          id:1,
          name:'发货仓库'
        }
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "发货单号",
        },
        {
          id: 2,
          name: "货件单号",
        },
        {
          id: 3,
          name: "物流商单号",
        },
        {
          id: 4,
          name: "跟踪单号",
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
          area_id: "1",
          user_id: "277734",
          merchant_id: "A2H9VTZEEV3RMA",
          name: "Roaring Skate",
          shipment_id: "FBA15LLFLLP9",
          address_line1: "Room 3035 Building 4 Shenzhou Road NO.580",
          city: "Shanghai",
          state_or_province_code: "Shanghai",
          country_code: "CN",
          postal_code: "FENGXIAN",
          destination_fulfillment_center_id: "AVP1",
          shipment_status: "5",
          shipment_status_str: "DELETED",
          label_prep_type: "SELLER_LABEL",
          are_cases_required: "1",
          total_fee_currency_code: "",
          total_fee_currency_value: "0.00",
          fee_per_unit_currency_code: "",
          fee_per_unit_currency_value: "0.00",
          total_units: "0",
          box_contents_source: "",
          currency_code: "",
          total_freight: "0.00",
          sku_number: "3",
          send_quantity: "1836",
          receive_quantity: "0",
          created_on: "0",
          create_time: "1602165532",
          modified_time: "1602165568",
          channel_name: "tomotime_US",
          channel_id: "232990",
          site_id: "1",
          shop_url: "https://www.amazon.com/sp?seller=A2H9VTZEEV3RMA",
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
    // 分配库存
    allocationInventory() {
      this.allocationInventoryPop = true;
    },
    // 导入物流信息
    ImportLogistics() {
      this.ImportLogisticsPop = true;
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
    font-size: 15px;
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
  .logisticsInformation {
    width: 100%;
    height: 155px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
    /deep/.el-select {
      width: 76px;
    }
  }
}
.logisticsTable {
  p {
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
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
// 导入物流信息
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
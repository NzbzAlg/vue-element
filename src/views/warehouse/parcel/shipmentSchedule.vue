
<template>
  <div class="shipmentSchedule">
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
      <!-- 状态 -->
      <el-select
        v-model="state"
        placeholder="状态"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in stateDrop"
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
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in warehouseDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 物流方式 -->
      <el-select
        v-model="logistics"
        placeholder="物流方式"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in logisticsDrop"
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
      <div class="tabItem">
        <p>
          <el-button type="primary" size="small" @click="shippingPlan"
            >添加发货计划</el-button
          >
          <el-button size="small">标记已完成</el-button>
          <el-button size="small">打印出货计划</el-button>
          <el-button size="small">创建货件</el-button>
          <el-button size="small">生成采购计划</el-button>
          <el-button size="small" @click="brandLabel">打印商品标签</el-button>
        </p>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="商品详情" type="expand">
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
                label="计划发货量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="specsType"
                label="单箱数量/箱数"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="物流方式"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="发货仓库"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="可用量/待检量/待到货量"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="stock"
                label="备注"
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
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="创建人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="创建时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="预计发货时间"
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
        <el-table-column prop="SKU" label="操作" align="center">
          <template>
            <el-dropdown split-button @click="detailList" size="small">
              详情
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span>打印</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="createCondition">创建货件</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span>标记已完成</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span>删除</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="货件计划详情" :visible.sync="detailListPop" width="60%">
      <div class="detailList">
        <div class="detailList_title">
          <span>计划单号</span>
          <span>RP201022003</span>
          <span>计划中</span>
        </div>
        <div class="basic-info">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="店铺" label-width="70px">
              <span>STRONELI-US 美国</span>
            </el-form-item>
            <el-form-item label="预计发货日期" label-width="130px">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" label-width="65px">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model="value1"
              >
              </el-input>
            </el-form-item>
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
        <el-table-column prop="name" label="MSKU/FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品名/SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="计划发货量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="单箱数量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="箱数" align="center">
        </el-table-column>
        <el-table-column prop="address" label="物流方式" align="center">
        </el-table-column>
        <el-table-column prop="address" label="发货仓库" align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="可用量/待检量/待到货量"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="address" label="备注" align="center">
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
    <!-- 创建货件弹窗 -->
    <el-dialog title="创建货件" :visible.sync="createConditionPop" width="50%">
      <div class="createCondition">
        <div class="createCondition_title">
          <el-form :model="formInline" class="demo-form-inline">
            <el-col :span="8">
              <el-form-item label="店铺">
                <span>STRONELI-US 美国</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标签类型">
                <el-select v-model="form.status" clearable>
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="货件名称">
                <el-input
                  style="width: 200px; float: left"
                  placeholder="请输入/系统自动获取"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="包装类型">
                <el-radio v-model="radio" label="1">备选项</el-radio>
                <el-radio v-model="radio" label="2">备选项</el-radio>
              </el-form-item>
            </el-col>
            <div class="createCondition_search">
              <el-col :span="24">
                <el-form-item label="发货地址">
                  <el-input style="width: 150px; float: left"></el-input>
                  <el-input
                    style="width: 90px; float: left; margin-left: 15px"
                  ></el-input>
                  <el-input
                    style="width: 60px; float: left; margin-left: 15px"
                  ></el-input>
                  <el-input
                    style="width: 130px; float: left; margin-left: 15px"
                  ></el-input>
                  <el-input
                    style="width: 100px; float: left; margin-left: 15px"
                  ></el-input>
                  <el-input
                    style="width: 100px; float: left; margin-left: 15px"
                  ></el-input>
                  <el-input
                    style="width: 110px; float: left; margin-left: 15px"
                  ></el-input>
                </el-form-item>
              </el-col>
            </div>
          </el-form>
        </div>
        <p>货件商品</p>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="图片" align="center">
          </el-table-column>
          <el-table-column prop="name" label="MSKU/FNSKU" align="center">
          </el-table-column>
          <el-table-column prop="address" label="标题" align="center">
          </el-table-column>
          <el-table-column prop="address" label="品名/SKU" align="center">
          </el-table-column>
          <el-table-column prop="address" label="申报量" align="center">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createConditionPop = false">取 消</el-button>
        <el-button type="primary" @click="createConditionPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 打印商品标签 -->
    <el-dialog title="打印商品标签" :visible.sync="brandLabelPop" width="45%">
      <div class="brandLabel">
        <p>FNSKU标签打印设置</p>
        <div class="brandLabel_title">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="12" style="margin-top: 10px">
              <el-form-item label="请选择打印纸张类型" label-width="160px">
                <el-select v-model="form.status" clearable>
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="margin-top: 10px">
              <el-form-item>
                <el-checkbox
                  v-model="checked"
                  style="margin-right: 15px"
                ></el-checkbox>
                <el-select
                  v-model="form.status"
                  clearable
                  placeholder="打印SKU"
                >
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="160px">
                <el-checkbox v-model="checked" style="margin-left: 40px"
                  >打印自定义内容</el-checkbox
                >
                <el-select v-model="form.status" clearable>
                  <el-option
                    v-for="item in state"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <p>打印FNSKU标签</p>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="图片" align="center">
          </el-table-column>
          <el-table-column prop="name" label="MSKU/FNSKU" align="center">
          </el-table-column>
          <el-table-column prop="address" label="标题" align="center">
          </el-table-column>
          <el-table-column prop="address" label="建单数量" align="center">
          </el-table-column>
          <el-table-column prop="address" label="打印数量" align="center">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="brandLabelPop = false">取 消</el-button>
        <el-button type="primary" @click="brandLabelPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 添加发货计划弹窗 -->
    <el-dialog title="生成采购单" :visible.sync="shippingPlanPop" width="60%">
      <div class="searchBox" style="margin-top: 20px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="店铺">
            <el-select
              v-model="form.status"
              placeholder="请选择店铺查询"
              clearable
            >
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计发货日期" label-width="100px">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="value1"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="deliveryGoods">
        <span>发货商品</span>
        <span @click="addGoods">
          <i class="el-icon-plus"></i>
          添加商品
        </span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="图片" align="center">
        </el-table-column>
        <el-table-column prop="name" label="MSKU/FNSKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="address" label="品名/SKU" align="center">
        </el-table-column>
        <el-table-column prop="address" label="计划发货量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="单箱数量" align="center">
        </el-table-column>
        <el-table-column prop="address" label="箱数" align="center">
        </el-table-column>
        <el-table-column prop="address" label="物流方式" align="center">
        </el-table-column>
        <el-table-column prop="address" label="发货仓库" align="center">
        </el-table-column>
        <el-table-column prop="address" label="备注" align="center">
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
      detailListPop: false, //列表详情弹窗
      createConditionPop: false, //创建货件弹窗
      brandLabelPop: false, //打印商品标签弹窗
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
      shop: "", //店铺
      //店铺下拉
      shopDrop: [
        {
          id: 1,
          name: "店铺",
        },
      ],
      state: "", //状态
      // 状态下拉
      stateDrop: [
        {
          id: 1,
          name: "状态",
        },
      ],
      warehouse: "", //发货仓库
      // 发货仓库下拉
      warehouseDrop: [
        {
          id: 1,
          name: "发货仓库",
        },
      ],
      logistics:'',//物流方式
      // 物流方式下拉
      logisticsDrop:[
        {
          id:1,
          name:'物流'
        }
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "创建人",
        },
        {
          id: 2,
          name: "计划单号",
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
          name: "MSKU",
        },
        {
          id: 6,
          name: "FNSKU",
        }
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
    // 创建货件弹窗
    createCondition() {
      this.createConditionPop = true;
    },
    brandLabel() {
      this.brandLabelPop = true;
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
}
// 创建货件弹窗
.createCondition {
  .createCondition_search {
    /deep/.el-input__inner {
      border: none;
      border-bottom: 1px solid #000;
      border-radius: 0px;
    }
  }
  p {
    margin-top: 20px;
    margin-bottom: 20px;
    color: #000;
    font-size: 14px;
    font-weight: bold;
  }
}
// 打印商品标签
.brandLabel {
  p {
    margin-bottom: 15px;
  }
  p:nth-of-type(2) {
    margin-top: 15px;
  }
  .brandLabel_title {
    width: 100%;
    height: 120px;
    border: 1px solid #ddd;
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
/deep/.el-textarea__inner {
  height: 38px !important;
}
</style>
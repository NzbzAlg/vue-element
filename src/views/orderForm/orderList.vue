
<template>
  <div class="orderList">
    <!-- 搜索 -->
    <div class="title">
      <!-- 订单 -->
      <el-select
        v-model="orderForm"
        placeholder="订单"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in orderFormDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 国家 -->
      <el-select
        v-model="country"
        placeholder="国家"
        clearable
        filterable
        size="medium"
        style="width: 150px;margin-left:10px"
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
          <el-button type="primary" size="small" @click="dispatchList"
            >创建多渠道订单</el-button
          >
          <el-dropdown
            split-button
            size="small"
            @click="orderEntryCost"
            style="margin-left: 10px"
          >
            录入订单费用
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="importOrderCost">导入订单费用</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </p>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="channel_name"
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="国家"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="订单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="商品信息"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="品名/SKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="买家信息"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="订单总金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="订购时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="状态"
          align="center"
        ></el-table-column>
        <el-table-column prop="SKU" label="操作" align="center">
          <template>
            <el-dropdown split-button size="small" @click="listDetails">
              详情
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span>创建多渠道订单</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情 -->
    <el-dialog title="订单详情" :visible.sync="listDetailsPop" width="65%">
      <div class="detailList">
        <div class="detailList_title">
          <span>订单号</span>
          <span>CUSTOMER-1223622020102953575455</span>
          <span>计划中</span>
        </div>
        <div class="basic-info">
          <p>基本信息</p>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="8">
              <el-form-item label="店铺">
                <span>STRONELI-US 美国 </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交时间">
                <span>2020-10-28 </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="销售渠道">
                <span>Non-Amazon</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配送服务">
                <span>标准配送</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="装箱单备注">
                <span>Thank you for your order!</span>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="logisticsInformation">
          <p>收货地址</p>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-col :span="8">
              <el-form-item label="收件人">
                <span>2020-10-28 </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话">
                <span>Non-Amazon</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮编">
                <span>标准配送</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱">
                <span>Thank you for your order!</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址">
                <span>Thank you for your order!</span>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="deliveryGoods">
          <p>商品信息</p>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="商品信息" align="center">
            </el-table-column>
            <el-table-column prop="date" label="品名/SKU" align="center">
            </el-table-column>
            <el-table-column prop="address" label="已订购" align="center">
            </el-table-column>
            <el-table-column prop="address" label="已发货" align="center">
            </el-table-column>
            <el-table-column prop="address" label="已取消" align="center">
            </el-table-column>
            <el-table-column prop="address" label="不可售" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div class="shippingDetails">
          <p>配送详情</p>
          <div class="shipping_item">
            货件编号1 ，分成 0 个包裹于 2020-11-03 23:59 配送
          </div>
        </div>
        <div class="remark">
          <p>备注</p>
          <el-input type="textarea" :rows="2"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="listDetailsPop = false">取 消</el-button>
        <el-button type="primary" @click="listDetailsPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 创建多渠道订单弹窗 -->
    <el-dialog
      title="创建多渠道订单"
      :visible.sync="dispatchListPop"
      width="65%"
    >
      <div class="createMultiple">
        <div class="basic-info">
          <p>基本信息</p>
          <el-form :model="formInline" label-width="80px">
            <el-col :span="8">
              <el-form-item label="店铺">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择店铺"
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
              <el-form-item label="订单号">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="logisticsInformation">
          <p>收货信息</p>
          <el-form :model="formInline" label-width="80px">
            <el-col :span="8">
              <el-form-item label="收件人">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="国家">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择国家"
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
              <el-form-item label="地区">
                <el-select
                  v-model="form.departmentPull"
                  placeholder="请选择地区"
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
              <el-form-item label="城市">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址一">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地址二">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮编">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话号码">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="买家email">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="packingList">
          <p>装箱单</p>
          <el-form :model="formInline" label-width="80px">
            <el-col :span="8">
              <el-form-item label="店铺">
                <el-input
                  placeholder="若不填，系统将自动生成"
                  style="width: 230px"
                ></el-input>
                <el-checkbox v-model="checked" style="margin-left: 20px"
                  >同上</el-checkbox
                >
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="订单日期">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="装箱备注">
                <el-input type="textarea"></el-input>
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
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="商品信息" align="center">
          </el-table-column>
          <el-table-column prop="address" label="品名/SKU" align="center">
          </el-table-column>
          <el-table-column prop="address" label="可售" align="center">
          </el-table-column>
          <el-table-column prop="address" label="调仓" align="center">
          </el-table-column>
          <el-table-column prop="address" label="入库" align="center">
          </el-table-column>
          <el-table-column prop="address" label="发货量" align="center">
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
          </el-table-column>
        </el-table>
        <div class="remark">
          <p>备注</p>
          <el-form :model="formInline" label-width="80px">
            <el-col :span="16">
              <el-form-item label="装箱备注">
                <el-input type="textarea" :rows="2"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dispatchListPop = false">取 消</el-button>
        <el-button type="primary" @click="dispatchListPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 创建多渠道订单下面的添加商品 -->
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
    <!-- 录入订单费用弹窗 -->
    <el-dialog
      title="录入订单费用"
      :visible.sync="orderEntryCostPop"
      width="50%"
    >
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="订单号" align="center">
        </el-table-column>
        <el-table-column prop="name" label="商品信息" align="center">
        </el-table-column>
        <el-table-column prop="address" label="测评费" align="center">
          <template>
            <el-input
              placeholder="请输入内容"
              v-model="value1"
              class="input-with-select"
            >
              <el-select
                v-model="form.name"
                slot="prepend"
                placeholder="请选择"
                size="small"
                style="width: 90px"
              >
                <el-option label="CNY" value="1"></el-option>
                <el-option label="USD" value="2"></el-option>
                <el-option label="EUR" value="3"></el-option>
              </el-select>
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-checkbox v-model="checked" style="margin-top: 10px"
        >同时标记为测评订单</el-checkbox
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderEntryCostPop = false">取 消</el-button>
        <el-button type="primary" @click="orderEntryCostPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 导入订单费用弹窗 -->
    <el-dialog
      title="导入订单费用"
      :visible.sync="importOrderCostPop"
      width="30%"
    >
      <div class="ImportLogistics">
        <div class="ImportLogistics_title">
          <el-button type="primary" size="small">导入订单费用</el-button>
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
        <el-button @click="importOrderCostPop = false">取 消</el-button>
        <el-button type="primary" @click="importOrderCostPop = false"
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
      dispatchListPop: false, //创建多渠道订单弹窗
      addGoodsPop: false, //创建多渠道订单下面的添加商品
      orderEntryCostPop: false, //录入订单费用弹窗
      importOrderCostPop: false, //导入订单费用弹窗
      orderForm:"",//订单
      // 订单下拉
      orderFormDrop:[
        {
          id: 1,
          name: "全部订单",
        },
        {
          id: 2,
          name: "测评订单",
        }
      ],
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
        }
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "订单号",
        },
        {
          id: 2,
          name: "品名",
        },
        {
          id: 3,
          name: "SKU",
        },
        {
          id: 4,
          name: "ASIN",
        },
        {
          id: 5,
          name: "MSKU",
        },
        {
          id: 6,
          name: "标题",
        },
        {
          id: 7,
          name: "买家姓名",
        },
        {
          id: 8,
          name: "买家邮箱",
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
    // 列表详情
    listDetails() {
      this.listDetailsPop = true;
    },
    // 创建多渠道订单弹窗
    dispatchList() {
      this.dispatchListPop = true;
    },
    // 创建多渠道订单下面的添加商品
    addGoods() {
      this.addGoodsPop = true;
    },
    // 创建多渠道订单下面的添加商品 - 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 录入订单费用弹窗
    orderEntryCost() {
      this.orderEntryCostPop = true;
    },
    // 导入订单费用弹窗
    importOrderCost() {
      this.importOrderCostPop = true;
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
// 详情
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
  // 创建多渠道订单
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
  }
  .packingList {
    width: 100%;
    height: 95px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
    /deep/.el-textarea__inner {
      height: 38px !important;
    }
  }
  .deliveryGoods {
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
  }
  .shippingDetails {
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
    .shipping_item {
      font-size: 12px;
      color: #444;
      font-weight: bold;
    }
  }
  .remark {
    margin-top: 10px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
  }
}
// 创建多渠道弹窗
.createMultiple {
  // 创建多渠道订单
  .basic-info {
    width: 100%;
    height: 95px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
  }
  .logisticsInformation {
    width: 100%;
    height: 215px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
  }
  .packingList {
    width: 100%;
    height: 95px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
    /deep/.el-textarea__inner {
      height: 38px !important;
    }
  }
  .remark {
    width: 100%;
    height: 95px;
    margin-top: 20px;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
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
// 导入订单费用弹窗
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
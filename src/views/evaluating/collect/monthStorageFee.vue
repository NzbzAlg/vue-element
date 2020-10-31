
<template>
  <div class="monthStorageFee">
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
      <!-- 币种 -->
      <el-select
        v-model="currency"
        placeholder="币种"
        clearable
        filterable
        size="medium"
        style="width: 150px; margin-left: 10px"
      >
        <el-option
          v-for="item in currencyDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 日期 -->
      <el-date-picker
        v-model="date"
        type="month"
        placeholder="选择月"
        size="medium"
        style="margin-left: 10px; width: 150px"
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
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="channel_name"
          label="图片"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="ASIN"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="FNSKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="品名/SKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="标题"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="国家"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="仓库编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="长边"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="中间边"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="短边"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="重量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="体积"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="产品标准"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="库存量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="待移除量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="总体积"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="收费月份"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="收费标准"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="币种"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="预估仓储费"
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
export default {
  data() {
    return {
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
      currency: "", //币种
      // 币种下拉
      currencyDrop: [
        {
          id: 1,
          name: "原币种",
        },
        {
          id: 2,
          name: "CNY",
        },
        {
          id: 3,
          name: "USD",
        },
      ],
      date: "", //日期
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "ASIN",
        },
        {
          id: 2,
          name: "FNSKU",
        },
        {
          id: 3,
          name: "标题",
        }
      ],
      currentPage1: 1,
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
    };
  },
  methods: {
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
.paging {
  float: right;
  margin-top: 20px;
}
</style>
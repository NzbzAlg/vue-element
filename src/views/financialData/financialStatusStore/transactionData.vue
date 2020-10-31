
<template>
  <div class="transactionData">
    <!-- 搜索 -->
    <div class="title">
      <!-- 交易事件 -->
      <el-select
        v-model="tradingEvent"
        placeholder="交易事件"
        clearable
        filterable
        size="medium"
        style="width: 150px;"
      >
        <el-option
          v-for="item in tradingEventDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 交易名目 -->
      <el-select
        v-model="tradeNames"
        placeholder="交易名目"
        clearable
        filterable
        size="medium"
        style="width: 150px;margin-left:10px"
      >
        <el-option
          v-for="item in tradeNamesDrop"
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
        style="width: 255px;margin-left:10px"
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
          label="交易日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="订单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="店铺名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="ASIN"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="数量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="交易金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="交易事件"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="交易名目"
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
      tradingEvent:'',//交易事件
      // 交易事件下拉
      tradingEventDrop:[
        {
          id:1,
          name:'交易事件'
        }
      ],
      tradeNames:'',//交易名目
      // 交易名目下拉
      tradeNamesDrop:[
        {
          id:1,
          name:'交易名目'
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
          name: "子ASIN",
        },
        {
          id: 3,
          name: "父ASIN",
        },
        {
          id: 4,
          name: "SKU",
        },
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
          shipment_name:
            "FBA (3/16/20, 3:43 AM) - 美国3.20海派山海陶瓷杯1836个",
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
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>
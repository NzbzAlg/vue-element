
<template>
  <div class="vatReport">
    <!-- 搜索 -->
    <div class="title">
      <!-- 保税国家 -->
      <el-select
        v-model="declareCountry"
        placeholder="报税国家"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in declareCountryDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 保税状态 -->
      <el-select
        v-model="declareState"
        placeholder="报税状态"
        clearable
        filterable
        size="medium"
        style="width: 150px;margin-left:10px"
      >
        <el-option
          v-for="item in declareStateDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="address" label="报税国家" align="center">
        </el-table-column>
        <el-table-column prop="address" label="时间周期" align="center">
        </el-table-column>
        <el-table-column prop="address" label="申报周期" align="center">
        </el-table-column>
        <el-table-column prop="address" label="申报规则" align="center">
        </el-table-column>
        <el-table-column prop="address" label="含税总销售额" align="center">
        </el-table-column>
        <el-table-column prop="address" label="税率" align="center">
        </el-table-column>
        <el-table-column prop="address" label="销项税" align="center">
        </el-table-column>
        <el-table-column prop="address" label="进项税" align="center">
        </el-table-column>
        <el-table-column prop="address" label="应报税额" align="center">
        </el-table-column>
        <el-table-column prop="address" label="状态" align="center">
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
        </el-table-column>
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
      declareCountry: "", //报税国家
      // 报税国家下拉
      declareCountryDrop: [
        {
          id: 1,
          name: "中国",
        }
      ],
      declareState:'',//报税状态
      // 报税状态下拉
      declareStateDrop:[
        {
          id:1,
          name:'进行中'
        },
        {
          id:2,
          name:'已完成'
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
  .tabItem {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>
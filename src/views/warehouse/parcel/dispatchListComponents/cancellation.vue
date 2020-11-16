<template>
  <div class="cancellation">
    <div class="table_button">
      <!-- <el-button type="primary" size="small">分配库存</el-button>
      <el-button type="primary" size="small">发货</el-button>
      <el-dropdown split-button size="small" style="margin-left: 10px">
        更多操作
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>释放库存</el-dropdown-item>
          <el-dropdown-item>
            <span @click="ImportLogistics">导入物流信息</span>
          </el-dropdown-item>
          <el-dropdown-item>批量删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
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
            <el-table-column prop="SKU" label="操作" align="center">
              <template>
                <el-dropdown split-button size="small" @click="details">
                  详情
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span>分配库存</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <!-- <span>生成加工单</span> -->
                    </el-dropdown-item>
                    <!-- <el-dropdown-item>
                <span>打印</span>
              </el-dropdown-item> -->
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
      <el-table-column prop="SKU" label="状态" align="center"></el-table-column>
    </el-table>
    <!-- 详情 -->
    <Details :detailsClose.sync="detailsClose" />
  </div>
</template>

<script>
import Details from "./details"; // 详情
export default {
  components: {
    Details,
  },
  data() {
    return {
      detailsClose: false, //详情弹窗关闭
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
    details() {
      console.log(1);
      this.detailsClose = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.table_button {
  margin-bottom: 10px;
}
</style>
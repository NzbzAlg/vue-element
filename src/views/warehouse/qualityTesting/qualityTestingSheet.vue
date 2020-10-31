
<template>
  <div class="dispatchList">
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
          label="质检单号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="图片"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="品名/SKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="店铺/FNSKU"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="采购单号"
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
        <el-table-column
          prop="SKU"
          label="到货时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="质检量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="质检员"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="质检时间"
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
                  <span>完成质检</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span>撤销</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="货件计划详情" :visible.sync="detailListPop" width="50%">
      <div class="detailList">
        <div class="detailList_title">
          <span>计划单号</span>
          <span>RP201022003</span>
          <span>计划中</span>
        </div>
        <div class="basic-info">
          <div class="basic_title">
            <img
              src="https://image.umaicloud.com/saas/20201021/eec9e92eb5bd343330ee62cc59089ea8_s.jpg"
              alt=""
            />
            <p>ZWLING ZL596S 台式宽显示屏</p>
            <br />
            <p>SKU：ZL-10-100</p>
            <br />
            <p>FNSKU：</p>
          </div>
          <el-form>
            <el-col :span="8">
              <el-form-item label="采购单号" label-width="90px">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购仓库" label-width="90px">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购员" label-width="90px">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="质检量" label-width="90px">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签收人" label-width="90px">
                <span></span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="到货时间" label-width="90px">
                <span></span>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="logisticsInformation">
          <p>质检结果</p>
          <el-form :model="formInline" label-width="90px">
            <el-col :span="8">
              <el-form-item label="抽检量">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="抽检次品量">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="抽检合格率">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="抽样比例">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总良品量">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总次品量">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="图片">
                <span>
                  <i class="el-icon-plus"></i>
                  上传图片
                </span>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailListPop = false">取 消</el-button>
        <el-button type="primary" @click="detailListPop = false"
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
      status: "", //状态
      // 状态下拉
      statusDrop: [
        {
          id: 1,
          name: "质检中",
        },
        {
          id: 2,
          name: "已质检",
        },
        {
          id: 3,
          name: "已免检",
        },
        {
          id: 4,
          name: "已撤销",
        },
      ],
      searchContent: "", //搜索
      multipleDrop: "", //多个下拉值
      multipleConditions: [
        {
          id: 1,
          name: "品名",
        },
        {
          id: 2,
          name: "SKU",
        },
        {
          id: 3,
          name: "FNSKU",
        },
        {
          id: 4,
          name: "采购单号",
        },
        {
          id: 5,
          name: "质检员",
        },
        {
          id: 6,
          name: "采购员",
        },
      ],
      currentPage1: 1,
      formInline: {},
      form: {
        name: "",
        departmentPull: "",
        status: "",
      },
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
    // 详情弹窗
    detailList() {
      this.detailListPop = true;
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
    margin-bottom: 20px;
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
    .basic_title {
      width: 100%;
      height: 100px;
      img {
        width: 60px;
        height: 60px;
        float: left;
        padding: 0 10px 10px 15px;
        // vertical-align: middle;
      }
      p {
        float: left;
        font-size: 12px;
      }
      p:nth-of-type(1) {
        font-weight: bold;
        font-size: 14px;
        color: #000;
      }
    }
  }
  .logisticsInformation {
    width: 100%;
    p {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
    }
  }
}
.paging {
  float: right;
  margin-top: 20px;
}
</style>
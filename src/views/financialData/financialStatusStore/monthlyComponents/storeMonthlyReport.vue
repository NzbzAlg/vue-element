<template>
  <div class="storeMonthlyReport">
    <!-- 头部 -->
    <div class="storeMonthly_title">
      <div class="store_left">
        <div class="infor_tit">
          <span>数据来源 . . <b>Payment</b></span>
        </div>
        <div class="infor">
          <div class="infor_item" v-for="item in dataSources" :key="item.id">
            <span>{{ item.size }}</span>
            <span>{{ item.number }}</span>
          </div>
        </div>
      </div>
      <div class="store_right">
        <div class="infor_tit">
          <span>数据来源 . . <b>船长BI</b></span>
        </div>
        <div class="infor">
          <div class="infor_item" v-for="item in costData" :key="item.id">
            <span>{{ item.size }}</span>
            <span>{{ item.number }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table">
      
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="channel_name"
          label="店铺"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="sales_volume"
          label="销量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sales_quota"
          label="多渠道数量"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="return_money"
          label="销售总额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="amz_fee"
          label="退款"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="promotion"
          label="亚马逊费用"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="advert"
          label="促销"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="goods_adjust"
          label="广告"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="other"
          label="商品调整"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cost"
          label="其他"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="logistics"
          label="商品成本"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="yunying_fee"
          label="物流"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="vat"
          label="运营费用"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="note_cost"
          label="VAT"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="profit"
          label="测评费用"
          align="center"
        ></el-table-column>
        <el-table-column label="备注费用" align="center">
          <template slot-scope="scope" style="position: relative">
            <span>{{ scope.row.brush_order_amount }}</span>
            <i
              class="el-icon-edit"
              style="padding-left: 5px; font-size: 16px; cursor: pointer"
              @click="editBoxShow(scope.row)"
            ></i>
            <div class="editBox" v-show="scope.row.isEditBox">
              <input type="text" style="width: 70px; float: left" />
              <span>确定</span>
              <span @click="cancelBoxShow(scope.row)">取消</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="brush_order_num"
          label="毛利润"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="multi_num"
          label="毛利率"
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
      currentPage1: 1,
      num: 0,
      dataSources: [
        {
          id: 1,
          size: "店铺数",
          number: 1,
        },
        {
          id: 2,
          size: "亚马逊费用",
          number: "$0.00",
        },
        {
          id: 3,
          size: "销量",
          number: 0,
        },
        {
          id: 4,
          size: "促销",
          number: "$0.00",
        },
        {
          id: 5,
          size: "多渠道数量",
          number: 0,
        },
        {
          id: 6,
          size: "广告",
          number: "$0.00",
        },
        {
          id: 7,
          size: "销售总额",
          number: "$0.00",
        },
        {
          id: 8,
          size: "店铺数",
          number: 1,
        },
        {
          id: 9,
          size: "退款",
          number: "$-0.00",
        },
        {
          id: 10,
          size: "其他",
          number: "$0.00",
        },
      ],
      costData: [
        {
          id: 1,
          size: "商品成本",
          number: 1,
        },
        {
          id: 2,
          size: "物流",
          number: "$0.00",
        },
        {
          id: 3,
          size: "运营费用",
          number: 0,
        },
        {
          id: 4,
          size: "VAT",
          number: "$0.00",
        },
        {
          id: 5,
          size: "测评费用",
          number: 0,
        },
        {
          id: 6,
          size: "备注费用",
          number: "$0.00",
        },
        {
          id: 7,
          size: "毛利润",
          number: "$0.00",
        },
        {
          id: 8,
          size: "毛利率",
          number: 1,
        },
      ],
      tableData: [
        {
          id:1,
          Merchant_ID: "A2H9VTZEEV3RMA",
          area_id: "1",
          channel_id: "232990",
          site_id: "1",
          id: "4512",
          year: "2020",
          month: "9",
          sales_volume: 0,
          sales_quota: 0,
          return_money: 0,
          amz_fee: 0,
          promotion: 0,
          advert: 0,
          goods_adjust: 0,
          other: 0,
          cost: 0,
          logistics: 0,
          yunying_fee: 0,
          vat: 0,
          note_cost: 0,
          profit: 0,
          brush_order_amount: 0,
          brush_order_num: 0,
          multi_num: 0,
          currency_symbol: "$",
          channel_name: "tomotime_US",
          isEditBox:false
        },
        {
          id:2,
          Merchant_ID: "A2H9VTZEEV3RMA",
          area_id: "1",
          channel_id: "232990",
          site_id: "1",
          id: "4512",
          year: "2020",
          month: "9",
          sales_volume: 0,
          sales_quota: 0,
          return_money: 0,
          amz_fee: 0,
          promotion: 0,
          advert: 0,
          goods_adjust: 0,
          other: 0,
          cost: 0,
          logistics: 0,
          yunying_fee: 0,
          vat: 0,
          note_cost: 0,
          profit: 0,
          brush_order_amount: 0,
          brush_order_num: 0,
          multi_num: 0,
          currency_symbol: "$",
          channel_name: "tomotime_US",
          isEditBox:false
        },
      ],
      form: {
        name: "",
        departmentPull: "",
        status: "",
      },
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
    };
  },
  methods: {
    // 编辑弹窗
    editBoxShow(row) {
      row.isEditBox = true
    },
    // 取消弹窗
    cancelBoxShow(row) {
      row.isEditBox = false
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
.storeMonthlyReport {
  margin-top: 10px;
  .storeMonthly_title {
    width: 100%;
    height: 200px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 6px #d4d4d4;
    display: flex;
    justify-content: space-between;
    .store_left {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .infor_tit {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        width: 5%;
        background: salmon;
        height: 100%;
        font-size: 12px;
        color: #999999;
        background: #f5f5f5;
        text-align: center;
        span {
          display: inline-block;
          width: 15px;
          padding-top: 25px;
          b {
            writing-mode: tb-rl;
          }
        }
      }
      .infor {
        width: 95%;
        height: 100%;
        background: #fff;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 20px 0;
        flex-wrap: wrap;
        .infor_item {
          width: 40%;
          height: 30px;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          span:nth-of-type(1) {
            color: #073b49;
            font-size: 14px;
          }
          span:nth-of-type(2) {
            font-weight: bold;
            color: #f37571;
          }
        }
        .infor_item:nth-of-type(1) {
          span:nth-of-type(2) {
            font-weight: bold;
            color: #65d3e3;
          }
        }
      }
    }
    .store_right {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .infor_tit {
        width: 5%;
        background: salmon;
        height: 100%;
        font-size: 12px;
        color: #999999;
        background: #f5f5f5;
        text-align: center;

        span {
          display: inline-block;
          width: 15px;
          padding-top: 25px;
        }
      }
      .infor {
        width: 95%;
        height: 100%;
        background: #fff;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 20px 0;
        flex-wrap: wrap;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        .infor_item {
          width: 40%;
          height: 30px;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          span:nth-of-type(1) {
            color: #073b49;
            font-size: 14px;
          }
          span:nth-of-type(2) {
            font-weight: bold;
            color: #f37571;
          }
        }
        .infor_item:nth-of-type(1) {
          span:nth-of-type(2) {
            font-weight: bold;
            color: #65d3e3;
          }
        }
      }
    }
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
    margin-top: 20px;
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
  //   表格弹出编辑框
  .editBox {
    width: 160px;
    height: 30px;
    position: absolute;
    top: 8px;
    left: 0px;
    background: #fff;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0 0 10px #dfdfdf;
    z-index: 999;
    input {
      vertical-align: middle;
    }
    span {
      font-size: 12px;
      cursor: pointer;
      color: #409EFF;
    }
    span:nth-of-type(1) {
      padding-right: 10px;
    }
  }
}
</style>

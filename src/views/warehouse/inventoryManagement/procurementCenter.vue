
<template>
  <div class="procurementCenter">
    <!-- 搜索 -->
    <div class="title">
      <!-- 货物状态 -->
      <el-select
        v-model="stateGoods"
        placeholder="货物状态"
        clearable
        filterable
        size="medium"
        style="width: 150px"
      >
        <el-option
          v-for="item in stateGoodsDrop"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <!-- 货件编号 -->
      <el-input
        v-model="cargoNumber"
        placeholder="货件编号搜索"
        clearable
        size="medium"
        style="width: 200px; margin-left: 10px"
      ></el-input>
      <el-button type="primary" size="medium" style="margin-left: 10px"
        >搜索</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <div class="tabItem">
        <p>
          <el-button type="primary" size="small" @click="replenishmentList"
            >上传补货列表</el-button
          >
        </p>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="SKU" label="货物状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.area_id == '1'">处理中</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="channel_name"
          label="店铺"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_name"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="shipment_id"
          label="货件编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="更新时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="MSKUs"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="已发货"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="已收到"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="SKU"
          label="目的地"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-tooltip
              class="item"
              effect="dark"
              content="追踪货件"
              placement="top"
            >
              <i
                style="font-size: 24px; color: #409eff; cursor: pointer"
                class="el-icon-document-copy"
                @click="tracking"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 上传补货列表 -->
    <el-dialog
      title="上传补货列表"
      :visible.sync="replenishmentListPop"
      width="30%"
    >
      <div class="replenishmentTable">
        <div style="padding: 15px 0">
          <p class="uploadReport">上传报告：</p>
          <p class="upload">
            <input type="text" style="" placeholder="请选择文件上传" />
            <el-button type="primary" size="small" style="margin-left: 3px"
              >上传</el-button
            >
          </p>
        </div>

        <el-table
          :data="tableData"
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column prop="date" label="店铺名称" align="center">
          </el-table-column>
          <el-table-column prop="name" label="操作者" align="center">
          </el-table-column>
          <el-table-column prop="address" label="上传时间" align="center">
          </el-table-column>
          <el-table-column prop="address" label="状态" align="center">
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="replenishmentListPop = false">取 消</el-button>
        <el-button type="primary" @click="replenishmentListPop = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 货件追踪弹窗框 -->
    <el-dialog title="补货计划详情" :visible.sync="trackingPop" width="40%">
      <div class="contentPop">
        <!-- 头部 -->
        <div class="popTitle">
          <span>姓名：8/25海运按摩器3118个（477箱）</span>
          <span>货件编号：FBA15PX6XGHR</span>
        </div>
        <!-- 概览 -->
        <div class="popOverview">
          <p class="size">概览</p>
          <div class="overview">
            <!-- 一 -->
            <div class="overviewItem">
              <p>发货地址</p>
              <p>
                Cherry Skate
                <br />
                Room 3035 Building 4 Shenzhou Road NO.580
                <br />
                Shanghai Shanghai 201400
                <br />
                CN
              </p>
            </div>
            <!-- 二 -->
            <div class="overviewItemTwo">
              <p>货件名称/编号</p>
              <p>货件名称：</p>
              <p>8/30海运 珐琅锅*7（2954个/1031箱）</p>
              <p>编号：</p>
              <p>FBA15PX30NCD</p>
            </div>
            <!-- 三 -->
            <div class="overviewItemThree">
              <p>配送地址</p>
              <p>货LAX9</p>
            </div>
            <!-- 四 -->
            <div class="overviewItemFour">
              <p>货件内商品</p>
              <p>28 MSKUs</p>
              <p>2954 商品数量</p>
            </div>
            <!-- 五 -->
            <div class="overviewItemFive">
              <p>亚马逊物流人工处理费用：</p>
              <p>0.00</p>
              <p>亚马逊合作承运人运费：</p>
              <p>0.00</p>
              <p>贴标和预处理：</p>
              <p>SELLER_LABEL</p>
            </div>
            <!-- 六 -->
            <div class="overviewItemSix">
              <p>货件状态</p>
              <p>处理中</p>
              <p>已创建：</p>
              <p>-</p>
              <p>已更新：</p>
              <p>2020-10-15</p>
            </div>
            <!-- 七 -->
            <div class="overviewItemSeven">
              <p>运输方式和承运人</p>
            </div>
            <!-- 八 -->
            <div class="overviewItemEight">
              <p>运输估算</p>
              <p>0.00</p>
            </div>
          </div>
        </div>
      </div>
      <div class="popTable">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="追踪货件" name="first">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="箱号" width="180">
                </el-table-column>
                <el-table-column prop="name" label="追踪编号" width="180">
                </el-table-column>
                <el-table-column prop="address" label="承运人状态">
                </el-table-column>
                <el-table-column prop="address" label="重量(lb.)">
                </el-table-column>
                <el-table-column prop="address" label="尺寸(in.)">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="货件内的商品" name="second">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="MSKU" width="180">
                </el-table-column>
                <el-table-column prop="name" label="标题" width="180">
                </el-table-column>
                <el-table-column prop="address" label="已发货">
                </el-table-column>
                <el-table-column prop="address" label="已收货">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="trackingPop = false">取 消</el-button>
        <el-button type="primary" @click="trackingPop = false">确 定</el-button>
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
      stateGoods: "", //货物状态
      // 货物状态下拉
      stateGoodsDrop: [
        {
          id: 1,
          name: "全部",
        },
        {
          id: 2,
          name: "处理中",
        },
        {
          id: 3,
          name: "在途",
        },
        {
          id: 4,
          name: "在运营中心",
        },
        {
          id: 5,
          name: "已完成",
        },
        {
          id: 6,
          name: "已删除/已取消",
        },
      ],
      cargoNumber: "", //货件编号
      currentPage1: 1,
      replenishmentListPop: false, //上传补货列表弹窗框
      trackingPop: false, //货件追踪弹窗框
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
    // 上传补货列表弹窗
    replenishmentList() {
      this.replenishmentListPop = true;
    },
    // 货件追踪弹窗
    tracking() {
      this.trackingPop = true;
    },
    // 货件追踪弹窗表格选项卡
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
// 上传补货列表弹窗
.replenishmentTable {
  .uploadReport {
    color: #073b49;
    font-weight: bold;
    font-size: 14px;
    display: inline-block;
  }
  .upload {
    display: inline-block;
    input {
      width: 320px;
      height: 29px;
    }
  }
}
// 补货计划详情
.contentPop {
  margin: 10px 0px 0px;
  background: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: rgb(212, 212, 212) 0px 0px 6px;
  //   头部
  .popTitle {
    padding: 20px;
    span {
      color: #073b49;
      font-weight: bold;
    }
    span:nth-of-type(2) {
      padding-left: 35px;
    }
  }
  //   概览
  .popOverview {
    padding: 20px;
    height: 330px;
    box-shadow: 0px 8px 5px -4px #e8e8e8 inset;
    .size {
      color: #073b49;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .overview {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      //   一
      .overviewItem {
        width: 24%;
        margin-bottom: 60px;
        p:nth-of-type(1) {
          margin-bottom: 10px;
          font-weight: bold;
        }
        p:nth-of-type(2) {
          font-size: 12px;
          color: #333333;
        }
      }
      //   二
      .overviewItemTwo {
        width: 24%;
        p {
          line-height: 20px;
        }
        p:nth-of-type(1) {
          margin-bottom: 10px;
          font-weight: bold;
        }
        p:nth-of-type(2) {
          font-size: 12px;
          color: #333333;
          font-weight: bold;
        }
        p:nth-of-type(3) {
          font-size: 12px;
          color: #333333;
        }
        p:nth-of-type(4) {
          font-size: 12px;
          color: #333333;
          font-weight: bold;
        }
        p:nth-of-type(5) {
          font-size: 12px;
          color: #333333;
        }
      }
      //   三
      .overviewItemThree {
        width: 24%;
        p:nth-of-type(1) {
          margin-bottom: 10px;
          font-weight: bold;
        }
        p:nth-of-type(2) {
          font-size: 12px;
          color: #333333;
        }
      }
      //   四
      .overviewItemFour {
        width: 24%;
        p:nth-of-type(1) {
          margin-bottom: 10px;
          font-weight: bold;
        }
        p:nth-of-type(2) {
          font-size: 12px;
          color: #333333;
        }
        p:nth-of-type(3) {
          font-size: 12px;
          color: #333333;
        }
      }
      //   五
      .overviewItemFive {
        width: 24%;
        margin-bottom: 60px;
        p:nth-of-type(1) {
          font-size: 13px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        p:nth-of-type(2) {
          font-size: 12px;
          color: #333333;
        }
        p:nth-of-type(3) {
          font-size: 12px;
          color: #333333;
          font-weight: bold;
        }
        p:nth-of-type(4) {
          font-size: 12px;
          color: #333333;
        }
        p:nth-of-type(5) {
          font-size: 12px;
          color: #333333;
          font-weight: bold;
        }
        p:nth-of-type(6) {
          font-size: 12px;
          color: #333333;
        }
      }
      //   六
      .overviewItemSix {
        width: 24%;
        p:nth-of-type(1) {
          font-size: 13px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        p:nth-of-type(2) {
          font-size: 12px;
          color: #333333;
          font-weight: bold;
          margin-bottom: 10px;
        }
        p:nth-of-type(3) {
          font-size: 12px;
          color: #333333;
          font-weight: bold;
        }
        p:nth-of-type(4) {
          font-size: 12px;
          color: #333333;
        }
        p:nth-of-type(5) {
          font-size: 12px;
          color: #333333;
          font-weight: bold;
        }
        p:nth-of-type(6) {
          font-size: 12px;
          color: #333333;
        }
      }
      //   七
      .overviewItemSeven {
        width: 24%;
        p:nth-of-type(1) {
          font-size: 13px;
          margin-bottom: 10px;
          font-weight: bold;
        }
      }
      //   八
      .overviewItemEight {
        width: 24%;
        p:nth-of-type(1) {
          font-size: 13px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        p:nth-of-type(2) {
          font-size: 12px;
          color: #333333;
        }
      }
    }
  }
}
.popTable {
  background: #fff;
  border-radius: 8px;
  overflow: visible;
  box-shadow: 0px 0px 6px #d4d4d4;
  margin: 20px 0;
  padding: 0 20px;
}

.paging {
  float: right;
  margin-top: 20px;
}
</style>